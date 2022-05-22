import axios from "axios";

const createPost = async (postData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/posts/`,
    postData
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

const commentPost = async (commentData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/posts/${commentData.postId}`,
    { ...commentData.body }
  );

  return response.data;
};

const voteForPost = async (voteData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/posts/vote/${voteData.postId}`,
    { ...voteData.body }
  );

  return response.data;
};

const getVotes = async (postId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/posts/votes/${postId}`
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
};

export default postService;
