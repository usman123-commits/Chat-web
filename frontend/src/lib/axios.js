import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();
export const axiosInstance = axios.create({
  // baseURL:process.env.BASE_URL,
  baseURL: "http://localhost:5002/api",
  withCredentials: true,
});
