import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSubRedditPosts = createAsyncThunk(
  "posts/subRedditPosts",
  async (subreddit) => {
    const response = await fetch(`/api/r/${subreddit}/.json?limit=20`);
    const data = await response.json();
    console.log(data);
    return data.data.children;
  }
);

const subRedditPostsSlice = createSlice({
  name: "subRedditPosts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
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
        state.posts = action.payload;
      })
      .addCase(fetchSubRedditPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default subRedditPostsSlice.reducer;
export const { clearPosts } = subRedditPostsSlice.actions;
