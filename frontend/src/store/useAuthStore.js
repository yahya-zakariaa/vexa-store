import axiosInstance from "@/utils/axiosInstance";
import { create } from "zustand";
const useAuthStore = create((set, get) => ({
  signup: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },
  login: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useAuthStore;
