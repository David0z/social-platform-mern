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

const postService = {
  createPost,
  getPosts,
  getSinglePost
};

export default postService;
