import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
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
