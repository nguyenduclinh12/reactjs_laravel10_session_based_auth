import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

axios.interceptors.request.use(
  (config) => {
    // if (typeof document !== "undefined") {
    //   const token = document.cookie
    //     .split("; ")
    //     .find((row) => row.startsWith("XSRF-TOKEN"))
    //     ?.split("=")[1];
    //   if (token) {
    //     config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
    //   }
    // }
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;
      if (response?.status === 401) {
        localStorage.removeItem("auth_token");
      }
    } catch (err) {
      console.log(err);
    }
    throw error;
  }
);

export default axios;
