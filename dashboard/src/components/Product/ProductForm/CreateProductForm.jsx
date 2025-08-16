"use client";

import React, { useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import GeneralInfo from "@/components/Product/ProductForm/GeneralInfo";
import PriceStock from "@/components/Product/ProductForm/PriceStock";
import ImageUploader from "@/components/Product/ProductForm/ImageUploader";
import CategorySelect from "@/components/Product/ProductForm/CategorySelect";
import Submit from "@/components/Product/ProductForm/Submit";
import { useCreateProduct } from "@/mutations/product.mutations";

export default function CreateProductForm() {
  const { mutateAsync: createProduct } = useCreateProduct();
  const [images, setImages] = useState([]);
  const validationSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
        category: Yup.string().required("Category is required"),
        gender: Yup.string()
          .oneOf(["Unisex", "Men", "Women"], "Invalid gender")
          .required("Gender is required"),
        price: Yup.number().min(1).required("Price is required"),
        stock: Yup.number().min(0).required("Stock is required"),
        discount: Yup.number().min(0).nullable(),
        discountType: Yup.string().nullable(),
        availability: Yup.boolean(),
        sizes: Yup.array()
          .of(Yup.string().oneOf(["XS", "S", "M", "L", "XL", "XXL"]))
          .min(1, "Select at least one size")
          .required("Sizes are required"),
      }).test(
        "discount-and-type",
        "If discount > 0, discountType is required",
        function (values) {
          const { discount, discountType } = values;
          const hasDiscount = discount !== null && discount >= 1;
          const hasType = !!discountType;
          if (hasDiscount && !hasType) {
            return this.createError({
              path: "discountType",
              message: "Please select a discount type",
            });
          }
          return true;
        }
      ),

    []
  );

  const handleSubmit = async (values) => {
    try {
      if (!navigator.onLine) {
        return toast.error(
          "No internet connection. Please check your network."
        );
      }

      if (images.length < 1) {
        return toast.error("Must select at least 1 image");
      }
      if (formik.errors.length > 0) return;

      values.images = images;
      values.discount = Number(values.discount) || 0;
      values.price = Number(values.price);
      values.stock = Number(values.stock);
      await toast.promise(createProduct(values), {
        loading: "Creating product, please wait...",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      sizes: [],
      gender: "Unisex",
      price: 0,
      stock: 1,
      discount: 0,
      discountType: "none",
      category: "",
      availability: false,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const errors = await formik.validateForm();
    const hasNestedErrors = Object.values(errors).some(
      (err) => typeof err === "object"
    );

    if (Object.keys(errors).length > 0 || hasNestedErrors) {
      const errorMessages = [];

      Object.entries(errors).forEach(([key, value]) => {
        if (typeof value === "string") {
          errorMessages.push(value);
        } else if (typeof value === "object") {
          Object.values(value).forEach((nestedValue) => {
            if (typeof nestedValue === "string") {
              errorMessages.push(nestedValue);
            }
          });
        }
      });

      Array.from(new Set(errorMessages)).forEach((msg) => toast.error(msg));
      return;
    }

    formik.handleSubmit();
  };

  return (
    <section className="min-h-screen">
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center justify-center flex-col"
      >
        <Submit status={"create"} isEditable={true} formik={formik} />
        <div className="px-4 py-8 h-full w-full grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr]">
          <div className="md:pe-4 md:mb-0 mb-5">
            <GeneralInfo formik={formik} isEditable={true} />
            <PriceStock formik={formik} isEditable={true} />
          </div>
          <div className="uploadImage md:sticky md:top-[20px] md:h-[650px] md:mb-0">
            <ImageUploader
              setImages={setImages}
              images={images}
              isEditable={true}
            />
            <CategorySelect formik={formik} isEditable={true} />
          </div>
        </div>
      </form>
    </section>
  );
}
