import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "./postService";

export const createPost = createAsyncThunk(
  "post/createPost",
  async (postData, thunkAPI) => {
    try {
      return await postService.createPost(postData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (_, thunkAPI) => {
    try {
      return await postService.getPosts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getSinglePost = createAsyncThunk(
  "post/getSinglePost",
  async (postId, thunkAPI) => {
    try {
      return await postService.getSinglePost(postId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
);

const initialState = {
  posts: {
    posts: [],
    isError: false,
    isLoading: false,
    errorMessages: {},
    isSuccess: false,
  },
  post: {
    post: null,
    isError: false,
    isLoading: false,
    errorMessages: {},
    isSuccess: false,
  },
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetPost (state) {
      state.post = {
        post: null,
        isError: false,
        isLoading: false,
        errorMessages: {},
        isSuccess: false,
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.post.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.post.isLoading = false;
        state.posts.posts.unshift(action.payload.post); //maybe lol
        state.post.isSuccess = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.post.isLoading = false;
        state.post.isError = true;
        state.post.errorMessages = action.payload;
      })
      .addCase(getAllPosts.pending, (state) => {
        state.posts.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts.isLoading = false;
        state.posts.posts = state.posts.posts.concat(action.payload.posts);
        state.posts.isSuccess = true;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.posts.isLoading = false;
        state.posts.isError = true;
        state.posts.errorMessages = action.payload;
      })
      .addCase(getSinglePost.pending, (state) => {
        state.post.isLoading = true;
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.post.isLoading = false;
        state.post.post = action.payload.post;
        state.post.isSuccess = true;
      })
      .addCase(getSinglePost.rejected, (state, action) => {
        state.post.isLoading = false;
        state.post.isError = true;
        state.post.errorMessages = action.payload;
      })
  },
});

export const postActions = postSlice.actions;

export default postSlice;
