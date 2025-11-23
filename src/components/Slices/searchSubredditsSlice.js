import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSearchSubreddits = createAsyncThunk(
  "subRedditSearch/fetchSearchSubreddits",
  async ({ query, after }) => {
    const url = after
      ? `/api/subreddits/search.json?q=${query}&after=${after}&limit=20`
      : `/api/subreddits/search.json?q=${query}&limit=20`;

    const response = await fetch(url);
    const data = await response.json();

    return {
      children: data.data.children,
      after: data.data.after,
    };
  }
);

const subRedditSearchSlice = createSlice({
  name: "subRedditSearch",
  initialState: {
    results: [],
    status: "idle",
    error: null,
    after: null,
  },

  reducers: {
    clearSubReddits: (state) => {
      state.results = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchSubreddits.pending, (state) => {
        if (state.results.length === 0) {
          state.status = "loading";
        }
      })

      .addCase(fetchSearchSubreddits.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.results = [
          ...state.results,
          ...action.payload.children.filter(
            (newItem) =>
              !state.results.some(
                (oldItem) => oldItem.data.id === newItem.data.id
              )
          ),
        ];

        state.after = action.payload.after;
      })

      .addCase(fetchSearchSubreddits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default subRedditSearchSlice.reducer;
export const { clearSubReddits } = subRedditSearchSlice.actions;
