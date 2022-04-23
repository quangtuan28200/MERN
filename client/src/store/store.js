import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../components/auth/AuthSlice";
import PostSlice from "../components/posts/PostSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    posts: PostSlice.reducer,
  },
});

export default store;
