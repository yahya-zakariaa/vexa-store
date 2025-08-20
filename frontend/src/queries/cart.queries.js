import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

const handleError = (error) => {
  if (axios.isAxiosError(error) && error.code === "ERR_NETWORK") {
    return new Error("Server not available now. Try again later.");
  }
  return error;
};

export const getCart = async () => {
  try {
    const res = await axiosInstance.get("/cart");
    console.log(res);
    return res.data.data;
  } catch (error) {
    throw handleError(error);
  }
};
