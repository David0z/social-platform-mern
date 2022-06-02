import axios from "axios";

const authConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

const createPost = async (postData, token) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/posts/`,
    postData,
    authConfig(token)
  );

  return response.data;
};

const getPosts = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/posts/`
  );

  return response.data;
};

const getSinglePost = async (postId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/posts/${postId}`
  );

  return response.data;
};

const commentPost = async (commentData, token) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/posts/${commentData.postId}`,
    { ...commentData.body },
    authConfig(token)
  );

  return response.data;
};

const voteForPost = async (voteData, token) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/posts/vote/${voteData.postId}`,
    { ...voteData.body },
    authConfig(token)
  );

  return response.data;
};

const getVotes = async (postId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/posts/votes/${postId}`
  );

  return response.data;
};

const getComments = async (postId, token) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/posts/comments/${postId}`
  );

  return response.data;
};

const postService = {
  createPost,
  getPosts,
  getSinglePost,
  commentPost,
  voteForPost,
  getVotes,
  getComments,
};

export default postService;
