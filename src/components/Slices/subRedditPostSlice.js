import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSubRedditPosts = createAsyncThunk(
  "posts/subRedditPosts",
  async ({ subreddit, after }) => {
    const url = after
      ? `/api/r/${subreddit}/.json?after=${after}&limit=20`
      : `/api/r/${subreddit}/.json?limit=20`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return {
      posts: data.data.children,
      after: data.data.after,
    };
  }
);

const subRedditPostsSlice = createSlice({
  name: "subRedditPosts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
    after: null,
  },
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubRedditPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubRedditPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload.posts;
        state.after = action.payload.after;
      })
      .addCase(fetchSubRedditPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default subRedditPostsSlice.reducer;
export const { clearPosts } = subRedditPostsSlice.actions;
