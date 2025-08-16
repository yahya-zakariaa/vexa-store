import axiosInstance from "@/lib/axiosInstance"
import { create } from "zustand";
import { toast } from "sonner";

const useAuthStore = create((set, get) => ({
  login: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/dashboard/login", data);
      console.log(res);
      if (res.status === 200) {
        toast.success("Login successfully");
        return res?.data?.data;
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Invalid credentials");
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.get("/auth/dashboard/logout");
      if (res.status === 200) {
        return toast.warning("Logged out");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  },
}));

export default useAuthStore;
