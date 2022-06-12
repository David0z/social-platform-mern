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

export const followHashtag = createAsyncThunk(
  "hashtag/followHashtag",
  async (hashtagId, thunkAPI) => {
    try {
      const result = await hashtagService.followHashtag(
        hashtagId,
        thunkAPI.getState().user.token
      );
      return { ...result, uid: thunkAPI.getState().user.uid };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getPopularAndFollowed = createAsyncThunk(
  "hashtag/getPopularAndFollowed",
  async (_, thunkAPI) => {
    try {
      return await hashtagService.getPopularAndFollowed(
        thunkAPI.getState().user.uid
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getFollowedHashtags = createAsyncThunk(
  "hashtag/getFollowedHashtags",
  async (_, thunkAPI) => {
    try {
      return await hashtagService.getFollowedHashtags(
        thunkAPI.getState().user.uid
      );
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
  hashtags: {
    followed: [],
    popular: [],
    isError: false,
    isLoading: false,
    errorMessages: {},
    isSuccess: false,
  },
  follow: {
    isError: false,
    isLoading: false,
    errorMessages: {},
    isSuccess: false,
  },
  followed: {
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
      };
    },
    resetFollowed: (state) => {
      state.followed = {
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
      })

      .addCase(followHashtag.pending, (state) => {
        state.follow.isLoading = true;
      })
      .addCase(followHashtag.fulfilled, (state, action) => {
        state.follow.isLoading = false;
        switch (action.payload.result) {
          case "followed":
            state.hashtag.hashtag.followers.push(action.payload.uid);
            break;
          case "unfollowed":
            state.hashtag.hashtag.followers =
              state.hashtag.hashtag.followers.filter(
                (userId) => userId !== action.payload.uid
              );
            break;
          default:
            break;
        }
      })
      .addCase(followHashtag.rejected, (state, action) => {
        state.follow.isLoading = false;
        state.follow.isError = true;
        state.follow.errorMessages = action.payload;
      })

      .addCase(getPopularAndFollowed.pending, (state) => {
        state.hashtags.isLoading = true;
      })
      .addCase(getPopularAndFollowed.fulfilled, (state, action) => {
        state.hashtags.isLoading = false;
        state.hashtags.isSuccess = true;
        state.hashtags.followed = action.payload.followedHashtags;
        state.hashtags.popular = action.payload.popularHashtags;
      })
      .addCase(getPopularAndFollowed.rejected, (state, action) => {
        state.hashtags.isLoading = false;
        state.hashtags.isError = true;
        state.hashtags.errorMessages = action.payload;
      })
      
      .addCase(getFollowedHashtags.pending, (state) => {
        state.followed.isLoading = true;
      })
      .addCase(getFollowedHashtags.fulfilled, (state, action) => {
        state.followed.isLoading = false;
        state.followed.isSuccess = true;
      })
      .addCase(getFollowedHashtags.rejected, (state, action) => {
        state.followed.isLoading = false;
        state.followed.isError = true;
        state.followed.errorMessages = action.payload;
      })
  },
});

export const hashtagActions = hashtagSlice.actions;

export default hashtagSlice;
