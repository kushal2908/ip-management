import axios from "axios";
import { getToken } from "./token";

const API_URL = "http://127.0.0.1:8000/api/";

// For accessing Public routes that requires token
export const axiosPublic = axios.create({
  baseURL: API_URL,
  timeout: 3000,
  headers: { "Content-Type": "application/json" },
});

// For accessing private routes that requires token
export const axiosPrivate = axios.create({
  baseURL: API_URL,
  timeout: 3000,
  headers: { "Content-Type": "application/json" },
});

//Interceptor Request for private routes
axiosPrivate.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = "Bearer " + getToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Interceptor Response for private routes
axiosPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      console.log("Please Check Your Internet Connection");
    }
    return Promise.reject(error);
  }
);
