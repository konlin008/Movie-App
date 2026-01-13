import axios from "axios";

export const loginApi = async (payload) => {
  const res = await axios.post(
    "http://localhost:3000/api/v1/auth/login",
    payload,
    { withCredentials: true }
  );
  return res.data;
};
export const registerApi = async (payload) => {
  const res = await axios.post(
    "http://localhost:3000/api/v1/auth/register",
    payload
  );
  return res.data;
};
export const fetchMeApi = async () => {
  const res = await axios.get("http://localhost:3000/api/v1/auth/me", {
    withCredentials: true,
  });
  return res.data.user;
};
export const logoutApi = async () => {
  const res = await axios.post(
    "http://localhost:3000/api/v1/auth/logout",
    {},
    { withCredentials: true }
  );
  return res.data;
};
