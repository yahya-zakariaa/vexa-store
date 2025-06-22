import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import { create } from "zustand";

const useProductStore = create((set, get) => ({
  createProduct: async (data) => {
    const formData = new FormData();

    // جمع البيانات
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

    // الصور
    if ("images" in data && Array.isArray(data.images)) {
      data.images.forEach((img) => {
        if (typeof img === "object" && img?.file) {
          formData.append("files", img.file);
        } else {
          throw new Error("Something went wrong when uploading images");
        }
      });
    } else {
      throw new Error("Must select at least one image");
    }

    try {
      const res = await axiosInstance.post("/dashboard/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      console.error(error);

      if (error?.response?.data?.message) {
        throw new Error(error.response.data.message);
      }

      throw new Error("Something went wrong while creating the product");
    }
  },
  updateProduct: async (data, productId) => {
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

    if ("images" in data && Array.isArray(data.images)) {
      data.images.forEach((img) => {
        if (typeof img === "object" && img?.file) {
          formData.append("files", img?.file);
        } else if (
          typeof img === "string" &&
          img.startsWith("https://res.cloudinary.com/")
        ) {
          formData.append("images[]", img);
        } else {
          throw new Error("Something went wrong when uploading images");
        }
      });
    }

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
  getProduct: async (productId) => {
    try {
      const res = await axiosInstance.get(`/dashboard/products/${productId}`);
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
