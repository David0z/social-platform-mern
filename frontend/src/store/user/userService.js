import axios from "axios";

const authConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const signup = async (userData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/users/signup`,
    userData
  );

  if (response.data) {
    localStorage.setItem("uid", JSON.stringify(response.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("image", JSON.stringify(response.data.image));
    localStorage.setItem("userName", JSON.stringify(response.data.userName));
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/users/login`,
    userData
  );

  if (response.data) {
    localStorage.setItem("uid", JSON.stringify(response.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("image", JSON.stringify(response.data.image));
    localStorage.setItem("userName", JSON.stringify(response.data.userName));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("uid");
  localStorage.removeItem("token");
  localStorage.removeItem("image");
  localStorage.removeItem("userName");
};

const fetchUser = async (userId, page, date, followerId) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/users/${userId}?page=${page}&date=${new Date(date).toISOString()}`,
    { followerId }
  );

  return response.data;
};

const followUser = async (userId, token) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/users/follow/${userId}`,
    null,
    authConfig(token)
  );

  return response.data;
}

const getFollowedUsers = async (token, page, date) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/users/followed?page=${page}&date=${new Date(date).toISOString()}`,
    authConfig(token)
  );

  return response.data;
}

const userService = {
  signup,
  login,
  logout,
  fetchUser,
  followUser,
  getFollowedUsers
};

export default userService;
