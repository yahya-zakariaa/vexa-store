import axiosInstance from "@/lib/axiosInstance
import { toast } from "sonner";
import { create } from "zustand";

const useCategoryStore = create((set, get) => ({
  fetchCategories: async () => {
    try {
      const res = await axiosInstance.get("/dashboard/categories");
      console.log(res);
      return res.data.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Internal Server Error");
    }
  },
}));
