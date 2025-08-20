import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product) => {
      const response = await axiosInstance.post(`/cart/${product.id}`, {
        size: product.size,
        quantity: product.quantity || 1,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Product added to cart successfully!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Error adding product to cart:", error);
      toast.error(error?.data.message || "Failed to add product to cart.");
    },
  });
};
