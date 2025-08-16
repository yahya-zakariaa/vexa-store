import axios from "@/lib/axiosInstance";

export const getProducts = async () => {
  const res = await axios.get("/dashboard/products");
  return res.data.data;
};

export const getProduct = async (productId) => {
  if (!productId) throw new Error("please back and select product again");
  const res = await axios.get(`/dashboard/products/${productId}`);
  return res.data.data;
};
