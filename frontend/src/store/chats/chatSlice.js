import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeChat: null,
  chats: [],
  userToChat: null,
  conversation: []
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    reset: (state) => initialState,
    setUserToChat(state, action) {
      state.userToChat = action.payload
    }
  },
  extraReducers: (builder) => {
    // builder.addCase()
  }
})

export const chatActions = chatSlice.actions;

export default chatSlice