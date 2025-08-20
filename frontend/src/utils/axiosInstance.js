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

    if (!error.response && error.message === "Network Error") {
      return toast.error("Connection Error", {
        description: "Please check your internet connection.",
      });
    }
    if (error?.response?.data?.message?.includes("buffering timed out")) {
      return toast.error("Server connection time out");
    }

    return Promise.reject(error.response);
  }
);
export default axiosInstance;
