import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";
import { create } from "zustand";
const useAuthStore = create((set, get) => ({
  signup: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success("Account created successfully");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.data?.message || "Something went wrong. Please try again."
      );
      throw new Error(error?.data?.message || "Unknown error");
    }
  },
  login: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      toast.success("Logged In Success");
      return res;
    } catch (error) {
      console.log(error);
      toast.error(
        error.data.message || "Something went wrong. Please try again."
      );
      throw new Error(error.data.message);
    }
  },
  sendOTP: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/recovery/send-otp", data);
      console.log(res);
      toast.success(res.data.message || "OTP sent successfully.");
    } catch (error) {
      if (error?.status === 429) {
        toast.warning(error.data.message || "Too many attempts.");
        throw new Error(error.data.message);
      }
      toast.error(
        error?.data?.message || "Something went wrong. Please try again."
      );
      throw new Error(error?.data?.message || "Unknown error");
    }
  },
  verifyOTP: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/recovery/verify-otp", data);
      console.log(res);
      toast.success(res.data.message || "OTP verified successfully.");
    } catch (error) {
      if (error?.status === 429) {
        toast.warning(error.data.message || "Too many attempts.");
        throw new Error(error.data.message);
      }
      toast.error(
        error?.data?.message || "Something went wrong. Please try again."
      );
      throw new Error(error?.data?.message || "Unknown error");
    }
  },
  passwordRecovery: async (data) => {
    try {
      const res = await axiosInstance.post(
        "/auth/recovery/reset-password",
        data
      );
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);

      toast.error(
        error?.data?.message || "Something went wrong. Please try again."
      );
      throw new Error(error?.data?.message || "Unknown error");
    }
  },
}));

export default useAuthStore;
