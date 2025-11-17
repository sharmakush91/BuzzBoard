import postSlice from "../components/Slices/postsSlice";
import { configureStore } from "@reduxjs/toolkit";
import subRedditsSlice from "../components/Slices/subredditSlice";
import subRedditPostsSlice from "../components/Slices/subRedditPostSlice";
import fetchSearchResultsSlice from "../components/Slices/searchBarSlice";

const store = configureStore({
  reducer: {
    posts: postSlice,
    subReddits: subRedditsSlice,
    subRedditPosts: subRedditPostsSlice,
    searchResults: fetchSearchResultsSlice,
  },
});

export default store;
