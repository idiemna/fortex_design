import axios, { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  config.withCredentials = true;
  return config;
});

export default api;
