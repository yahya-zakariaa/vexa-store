"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { usePathname } from "next/navigation";
import ToggleMode from "./ToggleMode";

const unProtectedRoutes = [
  "/account/login",
  "/account/create",
  "/account/recovery",
  "/account/recovery/reset-password",
];

const unVesableNavRoutes = ["products/[id]"];

const navLinks = [
  { title: "HOME", href: "/" },
  { title: "NEWS", href: "/news" },
  { title: "SHOP", href: "/shop" },
  { title: "ACCESSORIES", href: "/accessories" },
  { title: "SALE", href: "/sale" },
  { title: "CONTACT US", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [atTop, setAtTop] = useState(true);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [showBottom, setShowBottom] = useState(false);
  const [showBottomManual, setShowBottomManual] = useState(false);
  const isProductPage = /^\/products\/[^/]+$/.test(pathname);
  const lastScrollY = useRef(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY < 20) {
      setAtTop(true);
      setNavbarVisible(true);
      if (!isProductPage) {
        setShowBottom(true);
      }
      return;
    }

    setAtTop(false);
    if (Math.abs(currentScrollY - lastScrollY.current) > 50) {
      if (currentScrollY > lastScrollY.current) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
      lastScrollY.current = currentScrollY;
    }
  };

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    if (isProductPage) {
      setShowBottom(false);
    } else {
      setShowBottom(true);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (unProtectedRoutes.includes(pathname)) return null;

  return (
    <nav
      className={`w-full fixed z-[9999] left-0 main-navbar ${
        navbarVisible ? "top-0" : "top-[-300px]"
      } transition-all duration-500 ease-in-out ${
        !atTop ? "shadow-md bg-white shadow-black/10  dark:bg-black" : ""
      }`}
    >
      {atTop && !isProductPage && (
        <Marquee
          className="py-2.5 bg-white dark:bg-black"
          pauseOnHover={true}
          speed={80}
        >
          <div className="flex justify-between items-center gap-20 px-10">
            {[...Array(4)].map((_, i) => (
              <p
                key={i}
                className="dark:text-[#fff] text-black text-[14px] tracking-widest font-medium"
              >
                GET 20% OFF ON ORDERS OVER 1000 EGP
              </p>
            ))}
          </div>
        </Marquee>
      )}

      <div className="nav w-full ">
        {/* Desktop Navigation */}
        <div className="container lg:flex flex-col hidden gap-5 w-full items-center justify-center py-2 mx-auto">
          <div className="top flex justify-between w-full items-center">
            <div className="flex items-center justify-start gap-5 w-[100px] flex-0">
              {(!atTop && !isProductPage) ||
                (isProductPage && (
                  <button
                    onClick={() => {
                      setShowBottomManual(!showBottomManual);
                      setShowBottom(!showBottom);
                    }}
                    className="dark:text-[#eee] text-[#111] hover:text-gray-500 dark:hover:text-gray-300 transition-all"
                    aria-label="Toggle menu"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="fill-current"
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
                ))}

              <Link
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
                href={"/account/login"}
                aria-label="Account"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="6" r="4" />
                    <path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z" />
                  </g>
                </svg>
              </Link>

              <Link
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
                href={"/search"}
                aria-label="Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path
                    fill="currentColor"
                    d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
                  />
                </svg>
              </Link>
            </div>

            <Link
              href="/"
              className="text-[34px] mx-5 font-bold dark:text-[#eee] text-black tracking-widest hover:opacity-80 transition-all"
            >
              VEXA
            </Link>

            <div className="flex items-center justify-end gap-5 w-[100px] flex-0">
              <Link
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative transition-all"
                href={"/cart"}
                aria-label="Cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
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
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link>

              <div className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                <ToggleMode />
              </div>
            </div>
          </div>

          {(showBottomManual || (atTop && !isProductPage)) && (
            <div className="bottom w-full mb-2">
              <div className="links lg:flex hidden items-center justify-center mx-auto">
                <ul className="flex justify-start items-center gap-8 w-fit">
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="dark:text-[#eee] text-[#111] hover:text-gray-500 dark:hover:text-gray-300 transition-all font-medium tracking-wider text-sm uppercase py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="container lg:hidden flex gap-5 items-center justify-between py-3 px-2  rounded-full w-[90%] md:w-[80%] mx-auto  ">
          <div className="menu flex items-center justify-start md:gap-5 gap-6 w-[100px] flex-0">
            <button
              className="dark:text-[#eee] text-[#111] hover:text-gray-500 dark:hover:text-gray-300 transition-all"
              aria-label="Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
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

            <button
              className="dark:text-[#eee] text-[#111] hover:text-gray-500 dark:hover:text-gray-300 transition-all"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path
                  fill="currentColor"
                  d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
                />
              </svg>
            </button>
          </div>

          <Link
            href="/"
            className="md:text-[34px] text-[30px] max-[350px]:text-[25px] font-bold dark:text-[#eee] text-black tracking-widest"
          >
            VEXA
          </Link>

          <div className="cart-account flex items-center justify-end md:gap-5 gap-6 w-[100px] flex-0">
            <Link
              className="dark:text-[#eee] text-[#111] hover:text-gray-500 dark:hover:text-gray-300 transition-all relative"
              href={"/cart"}
              aria-label="Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
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
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>

            <div className="dark:text-[#eee] text-[#111] hover:text-gray-500 dark:hover:text-gray-300 transition-all">
              <ToggleMode />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
