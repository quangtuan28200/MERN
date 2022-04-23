import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "auth",
  initialState: {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    setAuth: (state, action) => {
      const { isAuthenticated, user } = action.payload;
      state.authLoading = false;
      state.isAuthenticated = isAuthenticated;
      state.user = user;
    },
  },
});
