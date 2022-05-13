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
  "posts.getAllPosts",
  async (_, thunkAPI) => {
    try {
      return await postService.getPosts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  posts: {
    posts: [],
    isError: false,
    isLoading: false,
    errorMessages: {},
    isSuccess: false
  },
  post: {
    post: {},
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
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.post.isLoading = true;
        state.post.isSuccess = false;
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
        state.post.isSuccess = false;
      })
      .addCase(getAllPosts.pending, (state) => {
        state.posts.isLoading = true;
        state.posts.isSuccess = false;
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
        state.posts.isSuccess = false;
      });
  },
});

export const postActions = postSlice.actions;

export default postSlice;
