"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/store/useAuthStore";
import { Label } from "@/components/ui/label";

export default function ResetPassword({ userEmail }) {
  const { passwordRecovery } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [activePassword, setActivePassword] = useState(false);

  const handleSubmit = async (data) => {
    data.email = userEmail;
    try {
      setIsLoading(true);
      await passwordRecovery(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Minimum length is 6 characters")
      .max(20, "Maximum length is 20 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
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
      <div className="header mb-5 md:text-start text-center">
        <h2 className="text-[1.5rem] mb-1 md:text-[1.8rem] font-bold tracking-wide text-black dark:text-white">
          Reset Your Password
        </h2>
        <p className="font-normal text-[#555] dark:text-[#ffffffb6] text-md">
          Please enter a new password for your account associated with:
          <span className="md:inline block md:ms-2 ms-0 font-medium mt-1 text-black dark:text-white">
            {userEmail}
          </span>
        </p>
      </div>

      <div className="form-group flex flex-col w-full mx-auto  gap-1 my-10">
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="password">Password</Label>
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
          Reset
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
