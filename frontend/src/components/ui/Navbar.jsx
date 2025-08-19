"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { usePathname } from "next/navigation";
import ToggleMode from "./ToggleMode";
const unProtectedRoutes = [
  "/account/login",
  "/account/create",
  "/account/recovery",
  "/account/recovery/reset-password",
  "/products",
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [showBottom, setShowBottom] = useState(true);
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollUpDistance = 0;
    let scrollDownDistance = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        scrollDownDistance += currentScrollY - lastScrollY;
        scrollUpDistance = 0;

        if (scrollDownDistance > 300) {
          setScrollDirection("down");
        }
      } else if (currentScrollY < lastScrollY) {
        scrollUpDistance += lastScrollY - currentScrollY;
        scrollDownDistance = 0;

        if (scrollUpDistance > 300) {
          setScrollDirection("up");
        }
      }

      lastScrollY = currentScrollY;
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const atTop = scrollY < 50;
  if (unProtectedRoutes.includes(pathname)) return;
  return (
    (atTop || scrollDirection === "up") && (
      <nav className={`w-full fixed z-[9999999] left-0 top-0 main-navbar`}>
        {atTop && (
          <Marquee className=" py-2.5 bg-black" pauseOnHover={true} speed={80}>
            <div className="contaier flex justify-between items-center gap-20 px-10">
              <p className=" dark:text-[#eee] text-black transition-all duration-300 text-[14px] tracking-widest font-medium">
                GET 20% OFF ON ORDERS OVER 1000 EGP
              </p>
              <p className=" dark:text-[#eee] text-black transition-all duration-300 text-[14px] tracking-widest font-medium">
                GET 20% OFF ON ORDERS OVER 1000 EGP
              </p>
              <p className=" dark:text-[#eee] text-black transition-all duration-300 text-[14px] tracking-widest font-medium">
                GET 20% OFF ON ORDERS OVER 1000 EGP
              </p>
              <p className=" dark:text-[#eee] text-black transition-all duration-300 text-[14px] tracking-widest font-medium">
                GET 20% OFF ON ORDERS OVER 1000 EGP
              </p>
            </div>
          </Marquee>
        )}

        <div className="nav w-full ">
          <div className="container lg:flex flex-col hidden  gap-5  w-full  items-center justify-center  py-2   duration-500 transition-all   mx-auto">
            <div className="top flex justify-between w-full items-center ">
              <div className="flex items-center justify-start gap-5 w-[100px] flex-0">
                <button
                  onClick={() => setShowBottom(!showBottom)}
                  className="dark:text-[#eee] text-[#111] duration-500 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6h10M4 12h16M7 12h13M4 18h10"
                    />
                  </svg>
                </button>
                <Link
                  className="p-4    rounded-full    duration-500 transition-all  w-fit mx-auto"
                  href={"/account/login"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="6" r="4" />
                      <path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z" />
                    </g>
                  </svg>
                </Link>
                <Link
                  className="p-4    rounded-full    duration-500 transition-all  w-fit mx-auto"
                  href={"/account/login"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
                    />
                  </svg>
                </Link>
              </div>

              <Link
                href="/#"
                className="text-[34px] mx-5 font-bold dark:text-[#eee] text-black tracking-widest duration-500 transition-all"
              >
                VEXA
              </Link>
              <div className="flex items-center justify-end gap-5 w-[100px] flex-0">
                {" "}
                <Link
                  className="p-4    rounded-full    duration-500 transition-all  w-fit mx-auto"
                  href={"/account/login"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M16.5 21a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-8 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M3.71 5.4h15.214c1.378 0 2.373 1.27 1.995 2.548l-1.654 5.6C19.01 14.408 18.196 15 17.27 15H8.112c-.927 0-1.742-.593-1.996-1.452zm0 0L3 3"
                    />
                  </svg>
                </Link>
                <div className=" flex items-center justify-center p-4    rounded-full    duration-500 transition-all  w-fit mx-auto">
                  <ToggleMode />
                </div>
              </div>
            </div>
            <div className="bottom  w-full mb-2">
              <div className="links lg:flex hidden duration-500 transition-all items-center justify-center mx-auto">
                <ul className="flex justify-start items-center gap-16 w-fit ">
                  <li>
                    <Link
                      href={"#"}
                      className="dark:text-[#eee] text-[#111] duration-500 transition-all font-medium tracking-wider  "
                    >
                      HOME
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"#"}
                      className="dark:text-[#eee] text-[#111] duration-500 transition-all font-medium  tracking-wider  "
                    >
                      NEWS
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"#"}
                      className="dark:text-[#eee] text-[#111] duration-500 transition-all font-medium  tracking-wider  "
                    >
                      SHOP
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={"#"}
                      className="dark:text-[#eee] text-[#111] duration-500 transition-all font-medium  tracking-wider "
                    >
                      ACCESSORIS
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"#"}
                      className="dark:text-[#eee] text-[#111] duration-500 transition-all font-medium  tracking-wider  "
                    >
                      SALE
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"#"}
                      className="dark:text-[#eee] text-[#111] duration-500 transition-all font-medium  tracking-wider  "
                    >
                      CONTACT US
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container lg:hidden flex gap-5  items-center justify-between  py-2  px-6     rounded-full  duration-500 transition-all w-[90%] md:w-[80%] mx-auto">
            <div className="menue   flex items-center justify-start md:gap-5 gap-3 w-[100px] flex-0">
              <button className="dark:text-[#eee] text-[#111] duration-500 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6h10M4 12h16M7 12h13M4 18h10"
                  />
                </svg>
              </button>
              <button className="dark:text-[#eee] text-[#111] duration-500 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
                  />
                </svg>
              </button>
            </div>

            <Link
              href="/#"
              className="md:text-[34px] text-[30px] max-[350px]:text-[25px]  font-bold dark:text-[#eee]  duration-500 transition-all text-black tracking-widest "
            >
              VEXA
            </Link>

            <div className="cart-account  flex items-center justify-end md:gap-5 gap-4 w-[100px] flex-0">
              <button className="dark:text-[#eee] text-[#111] duration-500 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M16.5 21a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-8 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M3.71 5.4h15.214c1.378 0 2.373 1.27 1.995 2.548l-1.654 5.6C19.01 14.408 18.196 15 17.27 15H8.112c-.927 0-1.742-.593-1.996-1.452zm0 0L3 3"
                  />
                </svg>
              </button>
              <div className="mt-[3px] dark:text-[#eee] text-[#111] duration-500 transition-all">
                <ToggleMode />
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  );
}
