import axios from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api", //"https://vexa-dashboard-production.up.railway.app/api" // "http://localhost:3001/api"
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
    if (error?.response?.status === 401) {
      toast.error("Please login again", {
        description: error.response.data.message,
      });
      window.location.href = "/";
    }

    return Promise.reject(error.response);
  }
);

export default axiosInstance;
