import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../components/auth/AuthSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
  },
});

export default store;
