import axios from "@/lib/axiosInstance"

export const getCategories = async () => {
  const res = await axios.get("/dashboard/categories");
  return res.data.data;
};
