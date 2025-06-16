import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";
import { create } from "zustand";

const useProductStore = create((set, get) => ({
  createProduct: async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("gender", data.gender);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("discount", data.discount);
      formData.append("discountType", data.discountType);
      formData.append("category", data.category);
      formData.append("availability", data.availability);

      formData.append("sizes", JSON.stringify(data.sizes));

      data.images.forEach((img) => {
        formData.append("images", img.file);
      });

      const res = await axiosInstance.post("/dashboard/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        return toast.success("Product Created Successfully");
      }
    } catch (error) {
      console.log(error);
      if (error?.data?.message) {
        return toast.error(error.data.message);
      }
      return toast.error("Something went wrong");
    }
  },
  updateProduct: async (data, productId) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("gender", data.gender);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("discount", data.discount);
      formData.append("discountType", data.discountType);
      formData.append("category", data.category);
      formData.append("availability", data.availability);

      formData.append("sizes", JSON.stringify(data.sizes));

      data.images.forEach((img) => {
        if (typeof img === "object" && img.file) {
          formData.append("images", img.file);
        } else if (
          typeof img === "string" &&
          img.startsWith("https://res.cloudinary.com/docsb24m0/image/upload")
        ) {
          formData.append("images", img);
        } else {
          return toast.error("Something went worng when upload images");
        }
      });

      const res = await axiosInstance.patch("/dashboard/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        return toast.success("Product Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      if (error?.data?.message) {
        return toast.error(error.data.message);
      }
      return toast.error("Something went wrong");
    }
  },
  getProducts: async () => {
    try {
      const res = await axiosInstance.get("/dashboard/products");
      console.log(res);
      return res.data.data;
    } catch (error) {
      console.log(error);
      if (error?.data?.message) {
        return toast.error(error.data.message);
      }
      return toast.error("Something went wrong");
    }
  },
}));

export default useProductStore;
