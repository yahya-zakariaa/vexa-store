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
      formData.append("images", img.file); // 👈 نرسل الـ File الفعلي
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
}


}));

export default useProductStore;
