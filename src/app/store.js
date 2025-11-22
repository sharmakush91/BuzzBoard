import postSlice from "../components/Slices/postsSlice";
import { configureStore } from "@reduxjs/toolkit";
import subRedditsSlice from "../components/Slices/subredditSlice";
import subRedditPostsSlice from "../components/Slices/subRedditPostSlice";
import searchResultSlice from "../components/Slices/searchBarSlice";
import subRedditSearchResult from "../components/Slices/searchSubredditsSlice";

const store = configureStore({
  reducer: {
    posts: postSlice,
    subReddits: subRedditsSlice,
    subRedditPosts: subRedditPostsSlice,
    searchResults: searchResultSlice,
    subRedditsSearch: subRedditSearchResult,
  },
});

export default store;
