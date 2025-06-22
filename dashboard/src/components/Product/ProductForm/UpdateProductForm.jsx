"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import useProductStore from "@/store/useProductStore";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/queries/product.queries";
import * as Yup from "yup";
import GeneralInfo from "@/components/Product/ProductForm/GeneralInfo";
import PriceStock from "@/components/Product/ProductForm/PriceStock";
import ImageUploader from "@/components/Product/ProductForm/ImageUploader";
import CategorySelect from "@/components/Product/ProductForm/CategorySelect";
import Submit from "@/components/Product/ProductForm/Submit";
import { useUpdateProduct } from "@/mutations/product.mutations";

const defaultValues = {
  name: "",
  description: "",
  sizes: [],
  gender: "Unisex",
  price: 0,
  stock: 1,
  discount: null,
  discountType: "",
  category: "",
  availability: false,
};

export default function UpdateProductForm({ productId }) {
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const [images, setImages] = useState([]);
  const [initialValues, setInitialValues] = useState(defaultValues);
  const initialImagesRef = useRef([]);
  const [initialFetched, setInitialFetched] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      toast.error(
        error?.message || "An error occurred while fetching product."
      );
    },
  });

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
        discount: Yup.number()
          .transform((value, originalValue) =>
            originalValue === "" ? null : value
          )
          .nullable()
          .min(0),
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
          const hasDiscount =
            discount !== null && discount !== undefined && discount > 0;
          if (hasDiscount && !discountType) {
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

  useEffect(() => {
    if (product) {
      setInitialValues({
        name: product?.name,
        description: product?.description,
        sizes: product?.sizes || [],
        gender: product?.gender,
        price: product?.price,
        stock: product?.stock,
        discount: product?.discount,
        discountType: product?.discountType,
        category: product?.category?.name || "",
        availability: product?.availability,
      });

      setImages(product?.images || []);
      initialImagesRef.current = product?.images || [];
      setInitialFetched(true);
    }
  }, [product?._id]);

  const getUpdatedFields = (current, initial) => {
    const changedFields = {};

    Object.keys(current).forEach((key) => {
      const currentValue = current[key];
      const initialValue = initial?.[key];

      // Special handling for discount - treat null and 0 as equivalent
      if (key === "discount") {
        const currentDiscount = currentValue === null ? 0 : currentValue;
        const initialDiscount = initialValue === null ? 0 : initialValue;
        if (currentDiscount !== initialDiscount) {
          changedFields[key] = currentValue;
        }
        return;
      }

      // Compare arrays
      if (Array.isArray(currentValue) && Array.isArray(initialValue)) {
        const currentSorted = [...currentValue].sort();
        const initialSorted = [...initialValue].sort();
        if (JSON.stringify(currentSorted) !== JSON.stringify(initialSorted)) {
          changedFields[key] = currentValue;
        }
        return;
      }

      // Compare objects
      if (
        typeof currentValue === "object" &&
        currentValue !== null &&
        typeof initialValue === "object" &&
        initialValue !== null
      ) {
        const nested = getUpdatedFields(currentValue, initialValue);
        if (Object.keys(nested).length > 0) {
          changedFields[key] = currentValue;
        }
        return;
      }

      // Compare primitives
      if (currentValue !== initialValue) {
        changedFields[key] = currentValue;
      }
    });

    return changedFields;
  };

  const handleSubmit = async (values) => {
    try {
      if (!navigator.onLine) {
        return toast.error(
          "No internet connection. Please check your network."
        );
      }

      if (images.length < 1) {
        toast.error("Must select at least 1 image");
        return;
      }

      const updatedFormikFields = getUpdatedFields(values, initialValues);

      const imagesChanged = !arraysEqual(images, initialImagesRef.current);

      const updatedFields = { ...updatedFormikFields };
      if (imagesChanged) {
        updatedFields.images = [...images];
      }

      if (Object.keys(updatedFields).length === 0) {
        toast.error("You haven't changed anything");
        return;
      }
      
      await updateProduct({ productId, data: updatedFields });

      initialImagesRef.current = images;
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Operation failed");
    }
  };

  const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleSubmit,
    context: { initialValues },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const errors = await formik.validateForm();

    // Flatten nested errors
    const errorMessages = Object.values(errors)
      .flatMap((error) =>
        typeof error === "object" ? Object.values(error) : error
      )
      .filter((msg) => typeof msg === "string");

    // Show errors if any
    if (errorMessages.length > 0) {
      Array.from(new Set(errorMessages)).forEach((msg) => toast.error(msg));
      return;
    }

    // Submit the form
    formik.handleSubmit(e);
  };

  return (
    <section className="min-h-screen">
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center justify-center flex-col"
      >
        <Submit
          status="update"
          isEditable={isEditable}
          formik={formik}
          setIsEditable={setIsEditable}
        />
        <div className="px-4 py-8 h-full w-full grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr]">
          <div className="md:pe-4 md:mb-0 mb-5">
            <GeneralInfo formik={formik} isEditable={isEditable} />
            <PriceStock formik={formik} isEditable={isEditable} />
          </div>
          <div className="uploadImage md:sticky md:top-[20px] md:h-[650px] md:mb-0">
            <ImageUploader
              setImages={setImages}
              images={images}
              isEditable={isEditable}
            />
            <CategorySelect formik={formik} isEditable={isEditable} />
          </div>
        </div>
      </form>
    </section>
  );
}
