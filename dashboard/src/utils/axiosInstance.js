import axios from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);

    if (
      error?.response?.data?.message.includes("buffering timed out") ||
      !error.response
    ) {
      return toast.error("Please check your internet connection");
    }

    const { status } = error.response;

    return Promise.reject(error.response);
  }
);

export default axiosInstance;
