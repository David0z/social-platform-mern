import axios from "axios";

const createPost = async (postData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/posts/`,
    postData
  );

  console.log(response.data);
  return response.data;
};

const postService = {
  createPost,
};

export default postService;
