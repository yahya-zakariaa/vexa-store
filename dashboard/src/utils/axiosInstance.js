import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      console.error("Network error:", error);
      return Promise.reject(error);
    }

    const { status } = error.response;

    return Promise.reject(error.response); 
  }
);

export default axiosInstance;
