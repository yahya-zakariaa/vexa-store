"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import ToggleMode from "@/components/ui/ToggleMode";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
const egyptGovernorates = [
  "Cairo",
  "Giza",
  "Alexandria",
  "Dakahlia",
  "Red Sea",
  "Beheira",
  "Fayoum",
  "Gharbia",
  "Ismailia",
  "Menofia",
  "Minya",
  "Qaliubia",
  "New Valley",
  "Suez",
  "Aswan",
  "Assiut",
  "Beni Suef",
  "Port Said",
  "Damietta",
  "Sharkia",
  "South Sinai",
  "Kafr El Sheikh",
  "Matrouh",
  "Luxor",
  "Qena",
  "North Sinai",
  "Sohag",
];

export default function Page() {
  const [activePassword, setActivePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const { signup } = useAuthStore();
  const router = useRouter();
  const handleSubmit = async (data, e) => {
    console.log(data);
    try {
      setIsLoading(true);
      await signup(data);
      setIsNavigating(true);
      router.push("/account/login");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      address: {
        street: "",
        city: "",
        country: "",
        zipCode: "",
      },
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  const address = formik.values.address || {
    street: "",
    city: "",
    country: "",
    zipCode: "",
  };

  return (
    <section className="signup  h-screen ">
      {isNavigating && (
        <div className="navigate px-20 py-14 flex items-center justify-center  rounded-lg backdrop-blur-md bg-[#d8d8d88c] absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] z-[2000] ">
          <div className="message flex gap-5 items-center justify-center flex-col">
            <span className="loginLoader"></span>
            <span className="font-medium text-[18px]">
              Warming up the engines
            </span>
          </div>
        </div>
      )}
      <nav className="flex items-center   md:px-10 py-3 bg-[#eeeeee91] border-b border-[#ccc] backdrop-blur-md dark:bg-[#35353573] dark:border-[#9994] fixed w-full top-0 left-0 ">
        <div className="containerr flex items-center justify-between  w-[90%] md:w-full  mx-auto">
          <h1 className="text-[28px] font-bold tracking-wider">
            VEXA<span className="font-medium text-[20px] ms-[3px]">Store</span>
          </h1>

          <ToggleMode />
        </div>
      </nav>
      <div className="container w-[90%] flex items-center justify-center md:w-[50%]  mx-auto  min-h-screen pb-10 pt-16 ">
        <form
          action={"#"}
          onSubmit={formik.handleSubmit}
          className="form mt-10 w-full md:w-[90%] lg:w-[65%] mx-auto mb-20 bg-[#eee] dark:bg-[#35353573] dark:border-[#9994] border border-[#ccc] rounded-lg px-5 pb-7 pt-3"
        >
          <div className="header mb-7 ">
            <h2 className="text-start text-[1.7rem] mb-1 md:text-[2rem] font-bold   tracking-wide text-black dark:text-white">
              Create Your Account
            </h2>
            <p className="font-normal text-[#555] dark:text-[#ffffffb6] text-lg">
              Already have account?{" "}
              <Link
                href="/account/login"
                className="border-b text-black font-medium border-black dark:text-white dark:border-white"
              >
                Login
              </Link>
            </p>
          </div>
          <div className="group w-full mx-auto mb-5 flex gap-5">
            <div className="form-group flex flex-col w-full mx-auto  gap-1">
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  id="name"
                  placeholder="John Doe"
                />
                {formik.touched.name && formik.errors.name && (
                  <span className="text-red-500 text-sm">
                    {formik.errors.name}
                  </span>
                )}
              </div>
            </div>
            <div className="form-group flex flex-col w-full mx-auto  gap-1">
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="phone">Phone Nabmur *</Label>
                <Input
                  type="text"
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  id="phone"
                  placeholder="John Doe"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <span className="text-red-500 text-sm">
                    {formik.errors.phone}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="form-group flex flex-col w-full mx-auto  gap-1 mb-5">
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="email">Email *</Label>
              <Input
                type="text"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                id="email"
                placeholder="John Doe"
              />
              {formik.touched.email && formik.errors.email && (
                <span className="text-red-500 text-sm">
                  {formik.errors.email}
                </span>
              )}
            </div>
          </div>
          <div className="form-group flex flex-col w-full mx-auto  gap-1 mb-5">
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  type={activePassword ? "text" : "password"}
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  id="password"
                  placeholder="********"
                />
                <span
                  onClick={() => setActivePassword(!activePassword)}
                  className="text-[#fff] text-xs absolute right-4 bottom-[7px] cursor-pointer"
                >
                  {activePassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 15 15"
                    >
                      <path
                        fill="#777"
                        fillRule="evenodd"
                        d="M13.354 2.354a.5.5 0 0 0-.708-.708L10.683 3.61A8.5 8.5 0 0 0 7.5 3C4.308 3 1.656 4.706.076 7.235a.5.5 0 0 0 0 .53c.827 1.323 1.947 2.421 3.285 3.167l-1.715 1.714a.5.5 0 0 0 .708.708l1.963-1.964c.976.393 2.045.61 3.183.61c3.192 0 5.844-1.706 7.424-4.235a.5.5 0 0 0 0-.53c-.827-1.323-1.947-2.421-3.285-3.167zm-3.45 2.035A7.5 7.5 0 0 0 7.5 4C4.803 4 2.53 5.378 1.096 7.5c.777 1.15 1.8 2.081 3.004 2.693zM5.096 10.61L10.9 4.807c1.204.612 2.227 1.543 3.004 2.693C12.47 9.622 10.197 11 7.5 11a7.5 7.5 0 0 1-2.404-.389"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 15 15"
                    >
                      <path
                        fill="#777"
                        fillRule="evenodd"
                        d="M7.5 11c-2.697 0-4.97-1.378-6.404-3.5C2.53 5.378 4.803 4 7.5 4s4.97 1.378 6.404 3.5C12.47 9.622 10.197 11 7.5 11m0-8C4.308 3 1.656 4.706.076 7.235a.5.5 0 0 0 0 .53C1.656 10.294 4.308 12 7.5 12s5.844-1.706 7.424-4.235a.5.5 0 0 0 0-.53C13.344 4.706 10.692 3 7.5 3m0 6.5a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
              </div>
              {formik.touched.password && formik.errors.password && (
                <span className="text-red-500 text-sm">
                  {formik.errors.password}
                </span>
              )}
            </div>
          </div>
          <div className="form-group relative grid grid-cols-2 w-full mx-auto mt-5 mb-3 gap-5">
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="country">Country</Label>
              <Select
                name="address.country"
                onValueChange={(value) =>
                  formik.setFieldValue("address.country", value)
                }
                onBlur={() => formik.setFieldTouched("address.country", true)}
                value={formik.values.address.country}
              >
                <SelectTrigger id={"country"}>
                  <SelectValue placeholder="Select a Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Countries</SelectLabel>
                    <SelectItem value="egypt">Egypt</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="city">City</Label>
              <Select
                name="address.city"
                onValueChange={(value) =>
                  formik.setFieldValue("address.city", value)
                }
                onBlur={() => formik.setFieldTouched("address.city", true)}
                value={formik.values.address.city}
              >
                <SelectTrigger id={"city"}>
                  <SelectValue placeholder="Select a City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Governorates</SelectLabel>
                    {egyptGovernorates.map((e) => {
                      return (
                        <SelectItem key={e} value={e.toLowerCase()}>
                          {e}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="street">Street</Label>
              <Input
                type="text"
                name="address.street"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address?.street || ""}
                id="street"
                placeholder="John Doe"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                type="text"
                name="address.zipCode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address.zipCode || ""}
                id="zipCode"
                placeholder="John Doe"
              />
            </div>
          </div>
          <div className="form-group flex flex-col md:gap-5 gap-3 mt-10  w-full">
            <button
              type="submit"
              disabled={!formik.isValid || isLoading}
              className={`btn ${
                !formik.isValid || !formik.dirty || isLoading
                  ? " cursor-not-allowed"
                  : "btn-fx "
              } duration-200 transition-all bg-[#000] text-white dark:text-black dark:bg-white font-medium text-lg border tracking-[2px] rounded-md border-[#555] px-5 w-full md:px-10 py-2 `}
            >
              Create
            </button>
            <Link
              href="/"
              className="duration-200 transition-all  text-black dark:text-white font-medium text-lg border text-center tracking-[2px] rounded-md border-[#555] px-5 md:px-10 py-2 lg w-full"
            >
              Back to Store
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
