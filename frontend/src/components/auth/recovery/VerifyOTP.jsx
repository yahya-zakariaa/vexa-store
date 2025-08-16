"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
export default function VerifyOTP({ userEmail, setIsOTP }) {
  const { verifyOTP } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!userEmail) setIsOTP(false);
  }, [userEmail]);
  const handleSubmit = async (data) => {
    data.email = userEmail;
    try {
      setIsLoading(true);
      await verifyOTP(data);
      router.push(
        `/account/recovery/reset-password?email=${encodeURIComponent(
          userEmail
        )}`
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    code: Yup.string()
      .min(4, "max length is 4 digets")
      .required("OTP Code is required"),
  });

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <form
      action={"#"}
      onSubmit={formik.handleSubmit}
      className="form mt-10 w-full  max-w-[450px] mx-auto mb-20 bg-[#eee] dark:bg-[#35353573] dark:border-[#9994] border border-[#ccc] rounded-lg md:px-5 px-3 pb-7 pt-3"
    >
      <div className="header mb-5 text-center">
        <h2 className="text-[1.5rem] mb-1 md:text-[2rem] font-bold tracking-wide text-black dark:text-white">
          Verify Recovery Code
        </h2>
        <p className="font-normal text-[#555] dark:text-[#ffffffb6] text-md">
          We have sent a (OTP) code to your email <br />
          <span
            className="text-black dark:text-white  cursor-pointer font-medium transition hover:opacity-80"
            onClick={() => setIsOTP(false)}
          >
            {userEmail} — Tap to edit
          </span>
        </p>
      </div>

      <div className="form-group flex flex-col w-full mx-auto  my-10">
        <div className="grid w-full items-center ">
          <InputOTP
            maxLength={4}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={formik.values.code}
            onChange={(value) => formik.setFieldValue("code", value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          {formik.touched.code && formik.errors.code && (
            <span className="text-red-500 text-sm">{formik.errors.code}</span>
          )}
        </div>
      </div>

      <div className="form-group flex flex-col md:gap-5 gap-3 mt-5  w-full max-w-[450px] mx-auto">
        <button
          type="submit"
          disabled={!formik.isValid || isLoading}
          className={`btn ${
            !formik.isValid || !formik.dirty || isLoading
              ? " cursor-not-allowed"
              : "btn-fx "
          } duration-200 transition-all bg-[#000] text-white dark:text-black dark:bg-white font-medium text-lg border tracking-[2px] rounded-md border-[#555] px-5 w-full md:px-10 py-2 `}
        >
          Verify
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
