import axiosInstance from "@/lib/axiosInstance"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const buildFormData = (data) => {
  const formData = new FormData();
  if (!data || typeof data !== "object") return;

  Object.keys(data).forEach((k) => {
    if (k !== "images") {
      formData.append(k, data[k]);
    }
  });

  if ("images" in data && Array.isArray(data.images)) {
    data.images.forEach((img) => {
      if (typeof img === "object" && img?.file) {
        formData.append("files", img.file);
      } else if (
        typeof img === "string" &&
        img.startsWith("https://res.cloudinary.com/")
      ) {
        formData.append("images[]", img);
      } else {
        throw new Error("Something went wrong with image upload");
      }
    });
  } else {
    throw new Error("Must select at least one image");
  }

  return formData;
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const formData = buildFormData(data);
      const res = await axiosInstance.post("/dashboard/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Category created successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.error(error.data.message || "Failed to create category");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryId) => {
      const res = await axiosInstance.delete(
        `/dashboard/categories/${categoryId}`
      );
      return res.data;
    },
    onSuccess: (_, { categoryId }) => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", categoryId] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete category");
    },
  });
};
