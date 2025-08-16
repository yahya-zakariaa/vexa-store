import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance"
import { toast } from "sonner";

const buildFormData = (data) => {
  const formData = new FormData();
  if (!data || typeof data !== "object") return;

  Object.keys(data).forEach((k) => {
    if (k === "sizes") {
      if (Array.isArray(data[k])) {
        data[k].forEach((size) => formData.append("sizes[]", size));
      } else {
        throw new Error("Sizes must be an array");
      }
    } else if (k !== "images") {
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

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const formData = buildFormData(data);
      const res = await axiosInstance.post("/dashboard/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product created successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create product");
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, data }) => {
      if (!productId) throw new Error("Missing product ID");

      if ("images" in data) {
        const formData = buildFormData(data);
        if (!(formData instanceof FormData)) {
          throw new Error("Something went wrong while building the form data!");
        }
        console.log(formData);
        const res = await axiosInstance.patch(
          `/dashboard/products/${productId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return res.data;
      }
      console.log(data);
      const formData = new FormData();
      Object.keys(data).forEach((k) => {
        if (k === "sizes") {
          if (Array.isArray(data[k])) {
            data[k].forEach((size) => formData.append("sizes[]", size));
          } else {
            throw new Error("Sizes must be an array");
          }
        } else if (k !== "images") {
          formData.append(k, data[k]);
        }
      });
      console.log(formData);
      const res = await axiosInstance.patch(
        `/dashboard/products/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);

      return res.data;
    },

    onSuccess: (_, { productId }) => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to update product"
      );
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const res = await axiosInstance.delete(
        `/dashboard/products/${productId}`
      );
      return res.data;
    },
    onSuccess: (_, { productId }) => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete product");
    },
  });
};
