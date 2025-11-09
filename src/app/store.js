import postSlice from "../components/Slices/postsSlice";
import { configureStore } from "@reduxjs/toolkit";
import subRedditsSlice from "../components/Slices/subredditSlice";

const store = configureStore({
  reducer: {
    posts: postSlice,
    subReddits: subRedditsSlice,
  },
});

export default store;
