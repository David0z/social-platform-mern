import axios from "axios";

const signup = async (userData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/users/signup`,
    userData
  );

  if (response.data) {
    localStorage.setItem("uid", JSON.stringify(response.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.token));
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
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("uid");
  localStorage.removeItem("token");
};

const userService = {
  signup,
  login,
  logout,
};

export default userService;
