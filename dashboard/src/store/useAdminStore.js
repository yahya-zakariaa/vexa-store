import axiosInstance from "@/lib/axiosInstance"
import { create } from "zustand";

const useAdminStore = create((set, get) => ({
  admin: null,
  setAdmin: (admin) => set({ admin }),

  getMe: async () => {
    try {
      const res = await axiosInstance.get(`/users/me`);
      console.log(res);
      set({ admin: res.data.data });
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useAdminStore;
