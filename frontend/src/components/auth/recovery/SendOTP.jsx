"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/store/useAuthStore";
export default function SendOTP({ setIsOTP, setUserEmail }) {
  const { sendOTP } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async (data, e) => {
    try {
      setIsLoading(true);
      await sendOTP(data);
      setIsOTP(true);
      setUserEmail(data.email);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleSendOTP,
  });
  return (
    <form
      action={"#"}
      onSubmit={formik.handleSubmit}
      className="form mt-10 w-full md:w-[90%] lg:w-[65%] mx-auto mb-20 bg-[#eee] dark:bg-[#35353573] dark:border-[#9994] border border-[#ccc] rounded-lg px-5 pb-7 pt-3"
    >
      <div className="header mb-5 text-center">
        <h2 className=" text-[1.5rem] mb-1 md:text-[2rem] font-bold   tracking-wide text-black dark:text-white">
          Get Recovery Code
        </h2>
        <p className="font-normal text-[#555] dark:text-[#ffffffb6] text-md">
          please enter the email address associated with your account. We will
          send you a (OTP) to verify your identity.
        </p>
      </div>

      <div className="form-group flex flex-col w-full mx-auto  gap-1 my-10">
        <div className="grid w-full items-center gap-3">
          <Input
            type="text"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            id="email"
            placeholder="John@gmail.com"
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-red-500 text-sm">{formik.errors.email}</span>
          )}
        </div>
      </div>

      <div className="form-group flex flex-col md:gap-5 gap-3 mt-5  w-full">
        <button
          type="submit"
          disabled={!formik.isValid || isLoading}
          className={`btn ${
            !formik.isValid || !formik.dirty || isLoading
              ? " cursor-not-allowed"
              : "btn-fx "
          } duration-200 transition-all bg-[#000] text-white dark:text-black dark:bg-white font-medium text-lg border tracking-[2px] rounded-md border-[#555] px-5 w-full md:px-10 py-2 `}
        >
          Submit
        </button>
        <Link
          href="/account/login"
          className="duration-200 transition-all  text-black dark:text-white font-medium text-lg border text-center tracking-[2px] rounded-md border-[#555] px-5 md:px-10 py-2 lg w-full"
        >
          Login
        </Link>
      </div>
    </form>
  );
}
