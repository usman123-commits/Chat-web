import axios from "axios";

const localUrl = import.meta.env.VITE_AXIOS_INSTANCE_URL;

export const axiosInstance = axios.create({
 
  baseURL: localUrl,
  withCredentials: true,
});
