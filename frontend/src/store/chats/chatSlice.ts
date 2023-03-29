import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatService from "./chatService";
import { v4 as uuidv4 } from 'uuid';

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
    data: {
      messages: []
    },
    hasMore: true,
    isError: false,
    isLoading: false,
    errorMessages: {},
    isSuccess: false,
  },
  sendMessage: {
    data: null,
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
  async (args, thunkAPI) => {
    try {
      return await chatService.getConversation(
        args.conversationId,
        args.page,
        args.date,
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
    resetConversation (state) {
      state.conversation = {
        data: [],
        hasMore: true,
        isError: false,
        isLoading: false,
        errorMessages: {},
        isSuccess: false,
      }
    },
    setUserToChat(state, action) {
      state.userToChat = action.payload;
    },
    receiveMessage(state, action) {
      // chats
      if (state.chats.data.find(c => c._id === action.payload.conversationId)) {
        const chatIndex = state.chats.data.indexOf(state.chats.data.find(c => c._id === action.payload.conversationId))
          state.chats.data.unshift(state.chats.data.splice(chatIndex, 1)[0]);
          state.chats.data = state.chats.data.map((chat) => {
            if (chat._id === state.activeChat) {
              return {
                ...chat,
                messages: [
                  {
                    body: action.payload.messageBody,
                    author: action.payload.sender,
                    createdAt: new Date().toISOString(),
                  },
                ],
              };
            } else {
              return chat;
            }
          });
      } else {
        state.chats.data.unshift({
          _id: action.payload.conversationId,
          participants: [
            {
              _id: action.payload.senderData._id,
              name: action.payload.senderData.name,
              image: action.payload.senderData.image
            },
          ],
          messages: [
            {
              body: action.payload.messageBody,
              author: action.payload.sender,
              createdAt: new Date().toISOString(),
            },
          ],
        });
      }

      // conversation
      if (state.activeChat === action.payload.conversationId) {
        state.conversation.data.messages.push({
          body: action.payload.messageBody,
          author: action.payload.sender,
          createdAt: new Date().toISOString(),
          _id: uuidv4()
        });
      }
    }
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
        if (action.payload.conversation._id === state.conversation.data._id) {
          state.conversation.data = {...action.payload.conversation, messages: [...action.payload.conversation.messages, ...state.conversation.data.messages]};
        } else {
          state.conversation.data = action.payload.conversation;
        }
        state.activeChat = action.payload.conversation._id;
        state.conversation.hasMore = action.payload.hasMore;
        // state.userToChat = action.payload.conversation.participants.find(
        //   (u) => u._id !== action.payload.userId
        // );
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
        state.sendMessage.isSuccess = false;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sendMessage.isLoading = false;
        if (!state.activeChat) {
          state.conversation.hasMore = false;
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
            messages: [
              {
                body: action.payload.sentMessage.messageBody,
                author: action.payload.sentMessage.sender,
                createdAt: new Date().toISOString(),
              },
            ],
          });

          state.conversation.data = {
            participants: [
              {
              _id: state.userToChat._id,
              name: state.userToChat.name,
              image: state.userToChat.image
            },
            {
              _id: action.payload.sentMessage.senderData._id,
              name: action.payload.sentMessage.senderData.name,
              image: action.payload.sentMessage.senderData.image
            }],
            messages: [{
              body: action.payload.sentMessage.messageBody,
              author: action.payload.sentMessage.sender,
              createdAt: new Date().toISOString(),
              _id: uuidv4()
            }]
          };
        } else {
          const chatIndex = state.chats.data.indexOf(state.chats.data.find(c => c._id === action.payload.sentMessage.conversationId))
          state.chats.data.unshift(state.chats.data.splice(chatIndex, 1)[0]);
          state.chats.data = state.chats.data.map((chat) => {
            if (chat._id === state.activeChat) {
              return {
                ...chat,
                messages: [
                  {
                    body: action.payload.sentMessage.messageBody,
                    author: action.payload.sentMessage.sender,
                    createdAt: new Date().toISOString(),
                  },
                ],
              };
            } else {
              return chat;
            }
          });

          state.conversation.data.messages.push({
            body: action.payload.sentMessage.messageBody,
            author: action.payload.sentMessage.sender,
            createdAt: new Date().toISOString(),
            _id: uuidv4()
          });
        }

        // send the message to sockets
        state.sendMessage.data = action.payload.sentMessage
        state.sendMessage.isSuccess = true;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sendMessage.isSuccess = false;
        state.sendMessage.isLoading = false;
        state.sendMessage.isError = true;
        state.sendMessage.errorMessages = action.payload;
      });
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice;
