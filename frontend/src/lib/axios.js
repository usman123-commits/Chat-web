import axios from "axios";

const localUrl = import.meta.env.VITE_AXIOS_INSTANCE_URL_DEVELOPMENT;
const mode =import.meta.env.VITE_MODE;
export const axiosInstance = axios.create({
 
  baseURL: mode==="development"?localUrl:"/api",
  withCredentials: true,
});
