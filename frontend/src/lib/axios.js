import axios from "axios";

const Url = import.meta.env.VITE_AXIOS_INSTANCE_URL;
export const axiosInstance = axios.create({
 
  baseURL: Url,
  withCredentials: true,
});
