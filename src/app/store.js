import postSlice from "../features/posts/postsSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    posts: postSlice,
  },
});

export default store;
