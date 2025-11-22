import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSearchSubreddits = createAsyncThunk(
  "fetchSearchSubreddits/searchResults",
  async ({ query }) => {
    const response = await fetch(
      `/api/subreddits/search.json?q=${query}&limit=20`
    );
    const data = await response.json();
    console.log(data);
    return data.data;
  }
);

const subRedditSearchResult = createSlice({
  name: "subRedditSearchResult",
  initialState: {
    results: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchSubreddits.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchSubreddits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload.children;
      })
      .addCase(fetchSearchSubreddits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default subRedditSearchResult.reducer;
