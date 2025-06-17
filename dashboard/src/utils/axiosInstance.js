import axios from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: "https://vexa-dashboard-production.up.railway.app/api",
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

    return Promise.reject(error.response);
  }
);

export default axiosInstance;
