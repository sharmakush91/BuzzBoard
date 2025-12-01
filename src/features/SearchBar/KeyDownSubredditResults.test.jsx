import { configureStore } from "@reduxjs/toolkit";
import { KeyDownSubredditResults } from "./KeyDownSubredditResults";

const mockStore = configureStore({});

const initialState = {
  subRedditsSearch: {
    results: [],
    error: null,
    status: "loading",
    after: null,
  },
};
