import axios from "axios";

export const loginApi = async (payload) => {
  const res = await axios.post(
    "https://movie-app-6t5r.onrender.com/api/v1/auth/login",
    payload,
    { withCredentials: true }
  );
  return res.data;
};
export const registerApi = async (payload) => {
  const res = await axios.post(
    "https://movie-app-6t5r.onrender.com/api/v1/auth/register",
    payload
  );
  return res.data;
};
export const fetchMeApi = async () => {
  const res = await axios.get(
    "https://movie-app-6t5r.onrender.com/api/v1/auth/me",
    {
      withCredentials: true,
    }
  );
  return res.data.user;
};
export const logoutApi = async () => {
  const res = await axios.post(
    "https://movie-app-6t5r.onrender.com/api/v1/auth/logout",
    {},
    { withCredentials: true }
  );
  return res.data;
};
