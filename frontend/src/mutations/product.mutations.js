import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";

export const useSearchProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (searchQuery) => {
      const res = await axiosInstance.get("/products/search-suggestions", {
        params: { q: searchQuery },
      });
      return res.data.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["searchResults"], data);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to search products");
    },
  });
};
