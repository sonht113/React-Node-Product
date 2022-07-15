import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    const token = localStorage.getItem("jwt_token");
    const clonedConfig = { ...config };
    clonedConfig.headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      clonedConfig.headers["Authorization"] = `Bearer ${token}`;
    }
    return clonedConfig;
  },
  function (error: Error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    if (response.data) {
      return response.data;
    }
    return response;
  },
  function (error: Error) {
    const statusCode = error?.message;
    if (statusCode === "404") {
      window.location.href = "/not-found";
      return;
    }
    if (statusCode === "401") {
      window.location.href = "/login";
      return;
    }

    if (statusCode === "403") {
      window.location.href = "/forbidden";
      return;
    }

    if (statusCode === "500") {
      // show notification
      toast.error("System has an error");
      console.log("error", error);
    }

    throw error;
  }
);

export default axiosClient;
