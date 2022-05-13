import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import postSlice from "./post/postSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    post: postSlice.reducer
  },
});

export default store;
