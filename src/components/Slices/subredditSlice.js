import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSubreddits = createAsyncThunk(
  "subReddit/fetchsubreddits",
  async ({ after, query }) => {
    const url = query
      ? `/api/subreddits/popular.json?q=${query}&limit=20&after=${after || ""}`
      : after
      ? `/api/subreddits/popular.json?after=${after}&limit=20`
      : `/api/subreddits/popular.json?limit=20`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  }
);

const subRedditSlice = createSlice({
  name: "subReddit",
  initialState: {
    category: [],
    status: "idle",
    error: null,
    after: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddits.pending, (state) => {
        if (state.category.length === 0) {
          state.status = "loading";
        }
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.category = [
          ...state.category,
          ...action.payload.children.filter(
            (newSub) =>
              !state.category.some(
                (oldSub) => oldSub.data.id === newSub.data.id
              )
          ),
        ];
        state.after = action.payload.after;
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default subRedditSlice.reducer;
