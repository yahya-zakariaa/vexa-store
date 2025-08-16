import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

const handleError = (error) => {
  if (axios.isAxiosError(error) && error.code === "ERR_NETWORK") {
    return new Error("Server not available now. Try again later.");
  }
  return error;
};
export const getProducts = async (params) => {
  try {
    const res = await axiosInstance.get("/products", { params });
    console.log(res);
    return res.data.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getProduct = async (productId) => {
  if (!productId) throw new Error("Please select product again");

  try {
    const res = await axiosInstance.get(`/products/${productId}`);
    return res.data.data;
  } catch (error) {
    throw handleError(error);
  }
};
