"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
export default function page() {
  const [activePassword, setActivePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();
  const handleSubmit = async (data, e) => {
    try {
      setIsLoading(true);
      const admin = await login(data);
      if (admin) {
        setIsNavigating(true);
        console.time("navigate");
        router.push("/dashboard");
        console.timeEnd("navigate");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    identifier: Yup.string().required("Email or Phone numebar is required"),
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
    <section className="signup overflow-hidden h-screen ">
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
      <nav className="flex items-center   md:px-10 py-3 bg-[#eee] border-b border-[#ccc] fixed w-full top-0 left-0 ">
        <div className="containerr flex items-center justify-between  w-[90%] md:w-full  mx-auto">
          <h1 className="text-[28px] font-bold tracking-wider">
            VEXA<span className="font-medium text-[20px] ms-[3px]">PANEL</span>
          </h1>

          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M17.293 13.293A8 8 0 0 1 6.707 2.707a8.001 8.001 0 1 0 10.586 10.586"
              />
            </svg>
          </button>
        </div>
      </nav>
      <div className="container w-[90%] flex items-center justify-center md:w-[50%]  mx-auto  min-h-screen pb-10 pt-20 md:pt-32 ">
        <form
          action={"#"}
          onSubmit={formik.handleSubmit}
          className="form mt-10 w-full md:w-[90%] lg:w-[65%] mx-auto mb-20 bg-[#eee] border border-[#ccc] rounded-lg px-5 pb-7 pt-3"
        >
          <div className="header mb-5 ">
            <h2 className="text-start text-[1.7rem] md:text-[2rem] font-bold   tracking-wide text-black">
              Login
            </h2>
          </div>
          <div className="form-group flex flex-col w-full mx-auto mb-6 gap-1">
            <label
              htmlFor="identifier"
              className="label text-md font-medium text-black "
            >
              Email or Phone
            </label>
            <input
              type="text"
              name="identifier"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.identifier}
              id="identifier"
              placeholder="John Doe"
              className="input focus:border-[#555]  caret-black focus:bg-[#e9e7e748] duration-300 outline-none bg-[#cccccc53]   text-black placeholder:text-[#444] border border-[#555] px-3 py-2 rounded-md w-full"
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
              className="label text-md font-medium text-black "
            >
              Password
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
                className="input focus:border-[#555]  caret-black focus:bg-[#e9e7e748] duration-300 outline-none bg-[#cccccc53] bg-opacity-50 text-black placeholder:text-[#444] focus:outline-[.5] border border-[#555] px-3 py-2 rounded-md w-full"
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
                      fill="#555"
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
                      fill="#555"
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
            <Link href={"#"} className="text-black">
              Forgot your password?{" "}
            </Link>
          </div>
          <div className="form-group flex md:flex-row flex-col md:items-center items-start md:gap-6 gap-3 mt-10  w-full">
            <button
              type="submit"
              disabled={!formik.isValid || isLoading}
              className={`btn ${
                !formik.isValid || !formik.dirty || isLoading
                  ? " cursor-not-allowed"
                  : "btn-fx "
              } duration-200 transition-all bg-[#000] text-white font-medium text-lg border tracking-[3px] rounded-md border-[#555] px-5 md:px-10 py-2 lg w-full md:w-fit`}
            >
              Login
            </button>
            <Link
              href="#"
              className="duration-200 transition-all  text-black font-medium text-lg border text-center tracking-[3px] rounded-md border-[#555] px-5 md:px-10 py-2 lg w-full md:w-fit"
            >
              Vesit Store
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
