"use client";
import React, { useMemo, useState } from "react";
import { useFormik } from "formik";
import useProductStore from "@/store/useProductStore";
import * as Yup from "yup";
import { toast } from "sonner";
import GeneralInfo from "@/components/Product/ProductForm/GeneralInfo";
import PriceStock from "@/components/Product/ProductForm/PriceStock";
import ImageUploader from "@/components/Product/ProductForm/ImageUploader";
import CategorySelect from "@/components/Product/ProductForm/CategorySelect";
import SubmitAvailability from "@/components/Product/ProductForm/SubmitAvailability";

const defaultInitialValues = {
  name: "",
  description: "",
  sizes: {
    XS: false,
    S: false,
    M: false,
    XL: false,
    XXL: false,
  },
  gender: "Unisex",
  price: 0,
  stock: 1,
  discount: null,
  discountType: "",
  category: "",
  availability: false,
};

export default function ProductForm({
  status = "create",
  initialValues,
  productId,
}) {
  const { createProduct, updateProduct } = useProductStore();
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
        sizes: Yup.object({
          XS: Yup.boolean(),
          S: Yup.boolean(),
          M: Yup.boolean(),
          XL: Yup.boolean(),
          XXL: Yup.boolean(),
        }).test("at-least-one-size", "Select at least one size", (value) =>
          Object.values(value).some(Boolean)
        ),
      })
        .test(
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
        )
        .test(
          "update-has-at-least-one-field",
          "You must change at least one field when updating",
          function (values) {
            if (status === "update") {
              const initial = this.options.context?.initialValues || {};
              const hasChange = Object.keys(values).some((key) => {
                if (typeof values[key] === "object") {
                  return (
                    JSON.stringify(values[key]) !== JSON.stringify(initial[key])
                  );
                }
                return values[key] !== initial[key];
              });

              if (!hasChange) {
                return this.createError({
                  message: "You must change at least one field to update",
                });
              }
            }
            return true;
          }
        ),
    [status]
  );

  const handleSubmit = async (values) => {
    try {
      if (images.length < 1)
        return toast.error("must be select at least 1 image");
      values.images = images;
      if (status === "create") {
        await createProduct(values);
        toast.success("Product created successfully!");
      } else {
        if (!productId)
          return toast.error("please back and select a product again");
        await updateProduct(values, productId);
        toast.success("Product updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Operation failed");
    }
  };

  const formik = useFormik({
    initialValues: initialValues || defaultInitialValues,
    validationSchema,
    onSubmit: handleSubmit,
    context: { initialValues: initialValues || defaultInitialValues },
    enableReinitialize: true,
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
        <SubmitAvailability formik={formik} status={status} />
        <div className="px-4 py-8 h-full w-full grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr]">
          <div className="md:pe-4 md:mb-0 mb-5">
            <GeneralInfo formik={formik} />
            <PriceStock formik={formik} />
          </div>
          <div className="uploadImage md:sticky md:top-[20px] md:h-[650px] md:mb-0">
            <ImageUploader setImages={setImages} images={images} />
            <CategorySelect formik={formik} />
          </div>
        </div>
      </form>
    </section>
  );
}
