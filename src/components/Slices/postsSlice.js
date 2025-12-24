import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ after = null, category }) => {
    // Map "rising" (or "all") to safe Reddit endpoint
    let safeCategory = category === "rising" ? "top" : category;

    const url = after
      ? `/.netlify/functions/redditProxy/r/${safeCategory}.json?sort=rising&after=${after}&limit=20`
      : `/.netlify/functions/redditProxy/r/${safeCategory}.json?sort=rising&limit=20`;

    const response = await fetch(url);
    const data = await response.json();

    return {
      posts: data.data.children,
      after: data.data.after,
    };
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
    after: null,
  },
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
      state.after = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = [
          ...state.posts,
          ...action.payload.posts.filter(
            (newPost) =>
              !state.posts.some(
                (oldPost) => oldPost.data.id === newPost.data.id
              )
          ),
        ];
        state.after = action.payload.after;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
export const { clearPosts } = postsSlice.actions;
