import axios from "axios";
import { MessageData } from '../../types/chatTypes'

const authConfig = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

const getChats = async (token: string) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/chats/`,
    authConfig(token)
  );

  return response.data;
};

const getConversation = async (conversationId: string, page: number, date: Date, token: string) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/chats/${conversationId}?page=${page}&date=${new Date(date).toISOString()}`,
    authConfig(token)
  );

  return response.data;
};

const sendMessage = async (messageData: MessageData, token: string) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/chats/send`,
    messageData,
    authConfig(token)
  );

  return response.data;
};

const chatService = {
  getChats,
  getConversation,
  sendMessage
};

export default chatService;