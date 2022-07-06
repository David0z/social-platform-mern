import axios from "axios";

const authConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

const getChats = async (token) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/chats/`,
    authConfig(token)
  );

  return response.data;
};

const getConversation = async (conversationId, page, token) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/chats/${conversationId}?page=${page}`,
    authConfig(token)
  );

  return response.data;
};

const sendMessage = async (messageData, token) => {
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