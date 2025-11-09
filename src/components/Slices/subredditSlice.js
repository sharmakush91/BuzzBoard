import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSubreddits = createAsyncThunk(
  "subReddit/fetchsubreddits",
  async () => {
    const response = await fetch("/api/subreddits/popular.json");
    const data = await response.json();
    console.log(data);
    return data.data.children;
  }
);

const subRedditSlice = createSlice({
  name: "subReddit",
  initialState: {
    category: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddits.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.category = action.payload;
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default subRedditSlice.reducer;
