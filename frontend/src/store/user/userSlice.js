import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";

const uid = JSON.parse(localStorage.getItem("uid"));
const token = JSON.parse(localStorage.getItem("token"));
const image = JSON.parse(localStorage.getItem("image"));
const userName = JSON.parse(localStorage.getItem("userName"));

const initialState = {
  uid,
  token,
  userName,
  isLoading: false,
  isError: false,
  errorMessages: {},
  image: image || "",
  fetchedUser: {
    user: null,
    hasMore: true,
    isLoading: false,
    isError: false,
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
    hasMore: true,
    isError: false,
    isLoading: false,
    errorMessages: {},
    isSuccess: false,
  },
};

export const signup = createAsyncThunk(
  "user/signup",
  async (userData, thunkAPI) => {
    try {
      return await userService.signup(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      return await userService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  await userService.logout();
});

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (args, thunkAPI) => {
    try {
      return await userService.fetchUser(args.userId, args.page, thunkAPI.getState().user.uid);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const followUser = createAsyncThunk("user/followUser", async (userId, thunkAPI) => {
  try {
    return await userService.followUser(userId, thunkAPI.getState().user.token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
})

export const getFollowedUsers = createAsyncThunk("user/getFollowedUsers", async (page, thunkAPI) => {
  try {
    return await userService.getFollowedUsers(thunkAPI.getState().user.token, page);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetErrors(state) {
      state.isError = null;
      state.errorMessages = {};
    },
    resetSingleError(state, action) {
      state.errorMessages[action.payload] = "";
    },
    resetFetchedUser(state) {
      state.fetchedUser = {
        user: null,
        isLoading: false,
        isError: false,
        errorMessages: {},
        isSuccess: false,
      };
    },
    resetFollowed(state) {
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
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uid = action.payload.user;
        state.token = action.payload.token;
        state.image = action.payload.image;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessages = action.payload;
        state.uid = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uid = action.payload.user;
        state.token = action.payload.token;
        state.image = action.payload.image;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessages = action.payload;
        state.uid = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.uid = null;
        state.token = null;
      })
      .addCase(fetchUser.pending, (state) => {
        state.fetchedUser.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.fetchedUser.isLoading = false;
        state.fetchedUser.isSuccess = true;
        state.fetchedUser.hasMore = action.payload.hasMore;
        state.fetchedUser.user = Object.keys(action.payload.user)
          .filter((key) => key !== "posts")
          .reduce((obj, key) => {
            obj[key] = action.payload.user[key];
            return obj;
          }, {});
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.fetchedUser.isLoading = false;
        state.fetchedUser.isError = true;
        state.errorMessages = action.payload;
      })
      // followUser
      .addCase(followUser.pending, (state) => {
        state.follow.isLoading = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.follow.isLoading = false;
        switch (action.payload.result) {
          case "followed":
            state.fetchedUser.user.isUserFollowing = true;
            state.fetchedUser.user.followers++;
            break;
          case "unfollowed":
            state.fetchedUser.user.isUserFollowing = false;
            state.fetchedUser.user.followers--;
            break;
          default:
            break;
        }
      })
      .addCase(followUser.rejected, (state, action) => {
        state.follow.isLoading = false;
        state.follow.isError = true;
        state.follow.errorMessages = action.payload;
      })

      .addCase(getFollowedUsers.pending, (state) => {
        state.followed.isLoading = true;
      })
      .addCase(getFollowedUsers.fulfilled, (state, action) => {
        state.followed.isLoading = false;
        state.followed.isSuccess = true;
        state.followed.hasMore = action.payload.hasMore;
      })
      .addCase(getFollowedUsers.rejected, (state, action) => {
        state.followed.isLoading = false;
        state.followed.isError = true;
        state.followed.errorMessages = action.payload;
      });
  },
});

export const userActions = userSlice.actions;

export default userSlice;
