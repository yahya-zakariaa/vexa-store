"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuthStore from "@/store/useAuthStore";
export default function page() {
  const [activePassword, setActivePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const handleSubmit = async (data) => {
    console.log(data);
    
    try {
      setIsLoading(true);
      await login(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    identifier: Yup.string(),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <section className="signup ">
      <div className="container w-[90%] flex items-center justify-center md:w-[50%] lg:w-[50%] mx-auto  min-h-screen pb-10 pt-7 md:pt-32 ">
        <form
          action={"#"}
          onSubmit={formik.handleSubmit}
          className="form mt-10 w-full md:w-[90%] lg:w-[65%] mx-auto mb-20"
        >
          <div className="header mb-5 ">
            <h2 className="text-start text-[1.7rem] md:text-[2rem] font-bold mb-1  tracking-wide text-white">
              Login
            </h2>
            <span className="text-start text-[1rem] md:text-[20px] tracking-wide  text-[#edededb8]">
              Don't have an account yet?{" "}
              <Link
                href="/account/register"
                className="text-[#fff] font-medium ms-1 tracking-wide"
              >
                Create account
              </Link>
            </span>
          </div>
          <div className="form-group flex flex-col w-full mx-auto my-6 gap-1">
            <label
              htmlFor="identifier"
              className="label text-md font-medium text-white "
            >
              Email or Phone *
            </label>
            <input
              type="text"
              name="identifier"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.identifier}
              id="identifier"
              placeholder="John Doe"
              className="input focus:border-[#ccc] focus:bg-[#414141] duration-300 outline-none bg-[#414141] bg-opacity-50 text-white placeholder:text-[#d4d4d4b7] border border-[#7e7e7e8c] px-3 py-2 rounded-md w-full"
            />
            {formik.touched.identifier && formik.errors.identifier && (
              <span className="text-red-500 text-sm">
                {formik.errors.identifier}
              </span>
            )}
          </div>

          <div className="form-group relative flex flex-col w-full mx-auto mt-6 mb-3 gap-1">
            <label
              htmlFor="password"
              className="label text-md font-medium text-white "
            >
              Password *
            </label>
            <div className="relative">
              <input
                type={activePassword ? "text" : "password"}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                id="password"
                placeholder="********"
                className="input focus:border-[#ccc] focus:bg-[#414141] duration-300 outline-none bg-[#414141] bg-opacity-50 text-white placeholder:text-[#d4d4d4b7] focus:outline-[.5] border border-[#7e7e7e8c] px-3 py-2 rounded-md w-full"
              />
              <span
                onClick={() => setActivePassword(!activePassword)}
                className="text-[#fff] text-xs absolute right-4 bottom-[8px] cursor-pointer"
              >
                {activePassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 15 15"
                  >
                    <path
                      fill="currentColor"
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
                      fill="currentColor"
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
          <div className="recover">
            <Link href={"#"} className="text-white">Forgot your password? </Link>
          </div>
          <div className="form-group flex md:flex-row flex-col md:items-center items-start md:gap-8 gap-3 mt-10  w-full">
            <button
              type="submit"
              disabled={!formik.isValid || !formik.dirty || isLoading}
              className={`btn ${
                !formik.isValid || !formik.dirty || isLoading
                  ? "opacity-70"
                  : "btn-fx "
              } duration-200 transition-all bg-[#fff] text-black font-medium text-lg border tracking-[4px] rounded-md border-[#7e7e7e8c] px-5 md:px-10 py-2 lg w-full md:w-fit`}
            >
              CREATE
            </button>
            <Link
              href={"/"}
              className="btn  tracking-[3px] md:px-0 px-2 w-fit border-b-[.3px] text-white border-[#7070708c] py-1.5 font-medium text-md"
            >
              return to store
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
