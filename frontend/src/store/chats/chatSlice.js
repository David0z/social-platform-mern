import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatService from "./chatService";

const initialState = {
  activeChat: null,
  chats: {
    data: [],
    isError: false,
    isLoading: false,
    errorMessages: {},
    isSuccess: false,
  },
  userToChat: null,
  conversation: {
    data: [],
    isError: false,
    isLoading: false,
    errorMessages: {},
    isSuccess: false,
  },
  sendMessage: {
    isError: false,
    isLoading: false,
    errorMessages: {},
    isSuccess: false,
  },
};

export const getChats = createAsyncThunk(
  "chat/getChats",
  async (_, thunkAPI) => {
    try {
      return await chatService.getChats(thunkAPI.getState().user.token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getConversation = createAsyncThunk(
  "chat/getConversation",
  async (conversationId, thunkAPI) => {
    try {
      return await chatService.getConversation(
        conversationId,
        thunkAPI.getState().user.token
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (messageData, thunkAPI) => {
    try {
      return await chatService.sendMessage(
        messageData,
        thunkAPI.getState().user.token
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    reset: (state) => initialState,
    setUserToChat(state, action) {
      state.userToChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET CHATS -----------------------------------------------------------------
      .addCase(getChats.pending, (state) => {
        state.chats.isLoading = true;
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.chats.isLoading = false;
        state.chats.data = action.payload.chats;
        state.chats.isSuccess = true;
      })
      .addCase(getChats.rejected, (state, action) => {
        state.chats.isLoading = false;
        state.chats.isError = true;
        state.chats.errorMessages = action.payload;
      })
      // GET CONVERSATION ----------------------------------------------------------
      .addCase(getConversation.pending, (state) => {
        state.conversation.isLoading = true;
      })
      .addCase(getConversation.fulfilled, (state, action) => {
        state.conversation.isLoading = false;
        // state.conversation.data = action.payload.conversation;
        state.conversation.isSuccess = true;
      })
      .addCase(getConversation.rejected, (state, action) => {
        state.conversation.isLoading = false;
        state.conversation.isError = true;
        state.conversation.errorMessages = action.payload;
      })
      // SEND MESSAGE --------------------------------------------------------------
      .addCase(sendMessage.pending, (state) => {
        state.sendMessage.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sendMessage.isLoading = false;
        if (!state.activeChat) {
          state.activeChat = action.payload.sentMessage.conversationId;
          state.chats.data.unshift({
            _id: action.payload.sentMessage.conversationId,
            participants: [
              {
                _id: action.payload.sentMessage.recepient,
                name: state.userToChat.name,
                image: state.userToChat.image,
              },
            ],
            lastMessage: {
              body: action.payload.sentMessage.messageBody,
              author: action.payload.sentMessage.sender,
            },
          });
        }
        // send the message to sockets
        state.sendMessage.isSuccess = true;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sendMessage.isLoading = false;
        state.sendMessage.isError = true;
        state.sendMessage.errorMessages = action.payload;
      });
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice;
