import axios from "axios";

// const serverUrl = "http://localhost:8000/api/user";
const serverUrl = "https://auth-crud-contact-api.onrender.com/api/user";

export const loginUser = async (user) => {
  return await axios.post(`${serverUrl}/login`, user);
};

export const registerUser = async (user) => {
  return await axios.post(`${serverUrl}/register`, user);
};
