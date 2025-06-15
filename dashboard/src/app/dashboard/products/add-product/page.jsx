"use client";
import ImageUploader from "@/components/ImageUploader";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryDialog } from "@/components/CategoryDialog";
import { useFormik } from "formik";
import useProductStore from "@/store/useProductStore";
import * as Yup from "yup";
import { toast } from "sonner";

export default function page() {
  const [images, setImages] = useState([]);
  const { createProduct } = useProductStore();
  const handleSubmit = async (values) => {
    console.log(values);
    values.images = images;
    try {
      await createProduct(values);
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    gender: Yup.string()
      .oneOf(["Unisex", "Male", "Female"], "Invalid gender")
      .required("Gender is required"),
    price: Yup.number()
      .min(1, "Price must be at least 1")
      .required("Price is required"),
    stock: Yup.number()
      .min(1, "Stock must be at least 1")
      .required("Stock is required"),
    discount: Yup.number().min(0, "Discount must be 0 or more").nullable(),
    discountType: Yup.string().nullable(),
    availability: Yup.boolean(),

    sizes: Yup.object({
      XS: Yup.boolean(),
      S: Yup.boolean(),
      M: Yup.boolean(),
      XL: Yup.boolean(),
      XXL: Yup.boolean(),
    }).test("at-least-one-size", "You must select at least one size", (value) =>
      Object.values(value).some((v) => v)
    ),
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
          message: "Please select a discount type when discount is more than 0",
        });
      }

      return true;
    }
  );

  const formik = useFormik({
    initialValues: {
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
      discount: 0,
      discountType: "",
      category: "",
      availability: false,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <section className=" min-h-screen ">
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const errors = await formik.validateForm();
          if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach((err) => {
              if (typeof err === "string") {
                toast.error(err);
              } else if (typeof err === "object") {
                Object.values(err).forEach((nestedErr) => {
                  if (typeof nestedErr === "string") {
                    toast.error(nestedErr);
                  }
                });
              }
            });
            return;
          }

          formik.handleSubmit();
        }}
        action="#"
        className="  flex items-center justify-center flex-col"
      >
        <nav className="w-full px-4 ">
          <div className="container  w-full flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 10.5V15c0 2.828 0 4.243.879 5.121C4.757 21 6.172 21 9 21h3.5M21 10.5v2M7 17h4m4 1.5h7M18.5 22v-7m-.705-12.997L6.149 2.03c-1.738-.085-2.184 1.182-2.184 1.8c0 .554-.075 1.361-1.14 2.878c-1.066 1.517-.986 1.967-.385 3.017c.498.872 1.766 1.212 2.428 1.27A2.976 2.976 0 0 0 7.99 8.118c1.042 3.03 4.005 3.03 5.325 2.684c1.323-.348 2.456-1.59 2.723-2.684c.156 1.36.63 2.153 2.027 2.698c1.448.564 2.694-.299 3.319-.852s1.026-1.781-.088-3.131c-.768-.931-1.089-1.808-1.194-2.717c-.06-.527-.114-1.093-.506-1.453c-.572-.526-1.393-.686-1.801-.66"
                  color="currentColor"
                />
              </svg>
              <h1 className="font-medium md:text-2xl text-xl mt-[-3px]">New Product</h1>
            </div>
            <div className="flex items-center md:gap-5 gap-3">
              <div className="toggleActive flex items-center">
                <label className="switch">
                  <input
                    type="checkbox"
                    name="availability"
                    checked={formik.values.availability}
                    onChange={formik.handleChange}
                  />
                  <span className="text md:px-6 px-4 py-2.5 rounded-full font-medium">
                    Available?
                  </span>
                </label>
              </div>
              <button
                type="submit"
                className="md:px-6 px-4 py-2.5 cursor-pointer bg-[#111111] font-medium rounded-full text-white"
              >
                Add Product
              </button>
            </div>
          </div>
        </nav>
        <div className="px-4 py-8 h-full w-full grid grid-cols-1  md:grid-cols-[1.2fr_0.8fr]">
          <div className=" md:pe-4 md:mb-0 mb-5">
            <div className="general-info bg-gray-100 rounded-md p-4 w-full ">
              <div className="header">
                <h2 className="text-[20px] font-bold">General Information</h2>
              </div>
              <div className="form-group flex flex-col gap-2 items-start mt-5  ">
                <label htmlFor="name" className="text-[16px] font-bold">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="bg-slate-200 border border-gray-300  rounded-md px-3 py-2 w-full "
                />
              </div>
              <div className="form-group flex flex-col gap-2 items-start mt-7  ">
                <label htmlFor="name" className="text-[16px] font-bold">
                  Product Descraption
                </label>

                <textarea
                  type="text"
                  name="description"
                  rows={4}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  className="bg-slate-200 border border-gray-300  rounded-md px-3 py-2 w-full "
                ></textarea>
              </div>
              <div className="form-group mt-7 flex md:flex-row flex-col md:items-center items-start md:gap-0 gap-10 justify-between">
                <div className="1">
                  <div className="header mb-4 ">
                    <h3 className="font-bold text-black text-[16px]">Size</h3>
                    <p className="text-[#333] text-sm font-medium">
                      Pick Available Size
                    </p>
                  </div>
                  <ul className="items-center w-full flex gap-3">
                    <li className="flex">
                      <input
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sizes.XS}
                        name="sizes.XS"
                        id="XS"
                        className="peer hidden"
                      />
                      <label
                        htmlFor="XS"
                        className="select-none cursor-pointer rounded-lg border-2 border-black
   py-2 flex items-center justify-center w-[50px] font-medium text-black transition-colors duration-200 ease-in-out peer-checked:bg-black peer-checked:text-white peer-checked:border-black "
                      >
                        XS
                      </label>
                    </li>
                    <li className="flex">
                      <input
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sizes.S}
                        name="sizes.S"
                        id="S"
                        className="peer hidden"
                      />
                      <label
                        htmlFor="S"
                        className="select-none cursor-pointer rounded-lg border-2 border-black
   py-2 flex items-center justify-center w-[50px] font-medium text-black transition-colors duration-200 ease-in-out peer-checked:bg-black peer-checked:text-white peer-checked:border-black "
                      >
                        S
                      </label>
                    </li>
                    <li className="flex">
                      <input
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sizes.M}
                        name="sizes.M"
                        id="M"
                        className="peer hidden"
                      />
                      <label
                        htmlFor="M"
                        className="select-none cursor-pointer rounded-lg border-2 border-black
   py-2 flex items-center justify-center w-[50px] font-medium text-black transition-colors duration-200 ease-in-out peer-checked:bg-black peer-checked:text-white peer-checked:border-black "
                      >
                        M
                      </label>
                    </li>
                    <li className="flex">
                      <input
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sizes.XL}
                        name="sizes.XL"
                        id="XL"
                        className="peer hidden"
                      />
                      <label
                        htmlFor="XL"
                        className="select-none cursor-pointer rounded-lg border-2 border-black
   py-2 flex items-center justify-center w-[50px] font-medium text-black transition-colors duration-200 ease-in-out peer-checked:bg-black peer-checked:text-white peer-checked:border-black "
                      >
                        XL
                      </label>
                    </li>
                    <li className="flex">
                      <input
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sizes.XXL}
                        name="sizes.XXL"
                        id="XXL"
                        className="peer hidden"
                      />
                      <label
                        htmlFor="XXL"
                        className="select-none cursor-pointer rounded-lg border-2 border-black
   py-2 flex items-center justify-center w-[50px] font-medium text-black transition-colors duration-200 ease-in-out peer-checked:bg-black peer-checked:text-white peer-checked:border-black "
                      >
                        XXL
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="2">
                  <div className="header mb-4 ">
                    <h3 className="font-bold text-black text-[16px]">Gender</h3>
                    <p className="text-[#333] text-sm font-medium">
                      Pick Available Gender
                    </p>
                  </div>
                  <div className="flex gap-10">
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex items-center cursor-pointer"
                        htmlFor="women"
                      >
                        <input
                          name="gender"
                          value="Women"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="radio"
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black transition-all"
                          id="women"
                        />
                        <span className="absolute bg-black w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                      </label>
                      <label
                        className="ml-2 text-black cursor-pointer text-md font-medium"
                        htmlFor="women"
                      >
                        Women
                      </label>
                    </div>
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex items-center cursor-pointer"
                        htmlFor="Men"
                      >
                        <input
                          name="gender"
                          value="Men"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="radio"
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black transition-all"
                          id="Men"
                        />
                        <span className="absolute bg-black w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                      </label>
                      <label
                        className="ml-2 text-black cursor-pointer text-md font-medium"
                        htmlFor="Men"
                      >
                        Men
                      </label>
                    </div>
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex items-center cursor-pointer"
                        htmlFor="unisex"
                      >
                        <input
                          name="gender"
                          value="Unisex"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="radio"
                          checked={formik.values.gender === "Unisex"}
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black transition-all"
                          id="unisex"
                        />
                        <span className="absolute bg-black w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                      </label>
                      <label
                        className="ml-2 text-black cursor-pointer text-md font-medium"
                        htmlFor="unisex"
                      >
                        Unisex
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pricing-stock  bg-gray-100 rounded-md p-4 mt-4">
              <div className="header">
                <h2 className="text-[20px] font-bold">Pricing & Stock</h2>
              </div>
              <div className="form-group flex  gap-4 justify-between mt-5  ">
                <div className="input-group flex flex-col gap-3  items-start flex-1">
                  <label htmlFor="price" className="text-[16px] font-bold">
                    Base Price (EGP)
                  </label>

                  <input
                    id="price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                    name="price"
                    type="number"
                    className="bg-slate-200 border border-gray-300 appearance-none  rounded-md px-3 py-2 w-full "
                  />
                </div>
                <div className="input-group flex flex-col gap-3  items-start flex-1">
                  <label htmlFor="stock" className="text-[16px] font-bold">
                    Stock
                  </label>

                  <input
                    id="stock"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.stock}
                    name="stock"
                    type="number"
                    className="bg-slate-200 border border-gray-300 appearance-none  rounded-md px-3 py-2 w-full "
                  />
                </div>
              </div>
              <div className="form-group flex  gap-4 justify-between mt-5  ">
                <div className="input-group flex flex-col gap-3  items-start flex-1">
                  <label htmlFor="discount" className="text-[16px] font-bold">
                    Discount
                  </label>

                  <input
                    id="discount"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.discount}
                    name="discount"
                    maxLength={100}
                    className="bg-slate-200 border border-gray-300 appearance-none  rounded-md px-3 py-2 w-full "
                  />
                </div>
                <div className="input-group flex flex-col gap-3  items-start flex-1">
                  <label
                    htmlFor="discountType"
                    className="text-[16px] font-bold"
                  >
                    Discount Type
                  </label>
                  <Select
                    name="discountType"
                    onValueChange={(value) =>
                      formik.setFieldValue("discountType", value)
                    }
                    onBlur={formik.handleBlur}
                    value={formik.values.discountType}
                  >
                    <SelectTrigger
                      id="discountType"
                      className="w-full  shadow-none bg-slate-200 border border-gray-300"
                    >
                      <SelectValue
                        className="placeholder:text-black text-black"
                        placeholder="Select a Discount type"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Discount Type</SelectLabel>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="uploadImage md:sticky md:top-[20px]   md:h-[650px] md:mb-0  ">
            <ImageUploader setImages={setImages} images={images} />
            <div className="category bg-gray-100 p-4 mt-4 rounded-md">
              <div className="header">
                <h2 className="text-[20px] font-bold">Category</h2>
              </div>
              <div className="input-group flex flex-col gap-3 mt-5  items-start flex-1">
                <label htmlFor="discount" className="text-[16px] font-bold">
                  Product Category
                </label>
                <Select
                  name="category"
                  onValueChange={(value) =>
                    formik.setFieldValue("category", value)
                  }
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                >
                  <SelectTrigger className="w-full  shadow-none bg-slate-200 border border-gray-300">
                    <SelectValue
                      className="placeholder:text-black text-black"
                      placeholder="Select a Category"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <CategoryDialog />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
