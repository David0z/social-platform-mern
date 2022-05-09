import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";

const store = configureStore({
  reducers: {
    user: userSlice.reducer
  },
});

export default store;
