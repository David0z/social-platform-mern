import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import hashtagService from "./hashtagService";

export const getSingleHashtag = createAsyncThunk(
  "hashtag/getSingleHashtag",
  async (tagName, thunkAPI) => {
    try {
      return await hashtagService.getSinglePost(tagName);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  hashtag: {
    hashtag: null,
    isError: false,
    isLoading: false,
    errorMessages: {},
    isSuccess: false,
  },
};

const hashtagSlice = createSlice({
  name: "hashtag",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetSingleHashtag: (state) => {
      state.hashtag = {
        hashtag: null,
        isError: false,
        isLoading: false,
        errorMessages: {},
        isSuccess: false,
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleHashtag.pending, (state) => {
        state.hashtag.isLoading = true;
      })
      .addCase(getSingleHashtag.fulfilled, (state, action) => {
        state.hashtag.isLoading = false;
        state.hashtag.hashtag = Object.keys(action.payload.hashtag)
          .filter((key) => key !== "posts")
          .reduce((obj, key) => {
            obj[key] = action.payload.hashtag[key];
            return obj;
          }, {});
        state.hashtag.isSuccess = true;
      })
      .addCase(getSingleHashtag.rejected, (state, action) => {
        state.hashtag.isLoading = false;
        state.hashtag.isError = true;
        state.hashtag.errorMessages = action.payload;
      });
  },
});

export const hashtagActions = hashtagSlice.actions;

export default hashtagSlice;
