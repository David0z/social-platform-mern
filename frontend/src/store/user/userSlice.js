import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";

const uid = JSON.parse(localStorage.getItem("uid"));
const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  uid,
  token,
  isLoading: false,
  isError: false,
  errorMessages: {},
  image: "",
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
      });
  },
});

export const userActions = userSlice.actions;

export default userSlice;
