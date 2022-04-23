import { createContext, useReducer, useState } from "react";
// import { postReducer } from "../reducers/postReducer";
import {
  apiUrl,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FIND_POST,
} from "./constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import PostSlice from "../components/posts/PostSlice";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  // Get all posts
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        dispatch(PostSlice.actions.getPosts(response.data.posts));
      }
    } catch (error) {
      dispatch(PostSlice.actions.getPostsFail());
    }
  };

  // Add post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost);
      if (response.data.success) {
        dispatch(PostSlice.actions.addPost(response.data.post));
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Delete post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`);
      if (response.data.success) dispatch(PostSlice.actions.deletePost(postId));
    } catch (error) {
      console.log(error);
    }
  };

  // Update post
  const updatePost = async (updatedPost) => {
    try {
      const response = await axios.put(
        `${apiUrl}/posts/${updatedPost._id}`,
        updatedPost
      );
      if (response.data.success) {
        dispatch(PostSlice.actions.updatePost(response.data.post));
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Post context data
  const postContextData = {
    PostSlice,
    dispatch,
    getPosts,
    addPost,
    deletePost,
    updatePost,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
