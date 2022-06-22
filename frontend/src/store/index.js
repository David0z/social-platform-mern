import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import postSlice from "./post/postSlice";
import hashtagSlice from "./hashtag/hashtagSlice";
import chatSlice from "./chats/chatSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    post: postSlice.reducer,
    hashtag: hashtagSlice.reducer,
    chat: chatSlice.reducer
  },
});

export default store;
