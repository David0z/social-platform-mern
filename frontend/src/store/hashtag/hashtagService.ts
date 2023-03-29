import axios from "axios";

const authConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getSingleHashtag = async (tagName, page, date, userId) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/hashtags/${tagName}?page=${page}&date=${new Date(date).toISOString()}`,
    { userId }
  );

  return response.data;
};

const followHashtag = async (hashtagId, token) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/hashtags/follow/${hashtagId}`,
    null,
    authConfig(token)
  );

  return response.data;
};

const getPopularAndFollowed = async (userId) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/hashtags/popular`,
    { userId }
  );

  return response.data;
};

const getFollowedHashtags = async (page, date, userId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/hashtags/followed/${userId}?page=${page}&date=${new Date(date).toISOString()}`
  );

  return response.data;
};

const hashtagService = {
  getSingleHashtag,
  followHashtag,
  getPopularAndFollowed,
  getFollowedHashtags
};

export default hashtagService;
