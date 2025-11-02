import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ after = null, category = "hot" }) => {
    const url = after
      ? `/api/r/all/${category}.json?after=${after}&limit=20`
      : `/api/r/all/${category}.json?limit=20`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = [...state.posts, ...action.payload.posts];
        state.after = action.payload.after;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
