import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "posts",
  initialState: {
    post: null,
    posts: [],
    postsLoading: true,
    isAddPostModal: false,
    isUpdatePostModal: false,
    isShowToast: {
      show: false,
      message: "",
      type: null,
    },
  },
  reducers: {
    getPosts: (state, action) => {
      state.postsLoading = false;
      state.posts = action.payload;
    },
    getPostsFail: (state) => {
      state.postsLoading = false;
      state.posts = [];
    },
    addPostModal: (state, action) => {
      state.isAddPostModal = action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    updatePost: (state, { payload }) => {
      state.posts = state.posts.map((post) =>
        post._id === payload._id ? payload : post
      );
    },
    findPost: (state, { payload }) => {
      state.post = state.posts.find((post) => post._id === payload);
    },
    updatePostModal: (state, action) => {
      state.isUpdatePostModal = action.payload;
    },
    showToast: (state, action) => {
      state.isShowToast = action.payload;
    },
  },
});
