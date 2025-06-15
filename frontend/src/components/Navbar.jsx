"use client";
import React from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <nav className="w-full  z-[9999999] fixed top-0 left-0">
      <Marquee className=" py-2.5 bg-black" pauseOnHover={true} speed={80}>
        <div className="contaier flex justify-between items-center gap-20 px-10">
          <p className=" text-white text-[17px] tracking-widest font-normal">
            GET 20% OFF ON ORDERS OVER 1000 EGP
          </p>
          <p className=" text-white text-[17px] tracking-widest font-normal">
            GET 20% OFF ON ORDERS OVER 1000 EGP
          </p>
          <p className=" text-white text-[17px] tracking-widest font-normal">
            GET 20% OFF ON ORDERS OVER 1000 EGP
          </p>
          <p className=" text-white text-[17px] tracking-widest font-normal">
            GET 20% OFF ON ORDERS OVER 1000 EGP
          </p>
        </div>
      </Marquee>
      <div className="nav w-full ">
        <div className="container lg:flex hidden mt-5 gap-10   items-center justify-center  py-2 bg-white px-10 rounded-full bg-opacity-50 backdrop-blur-lg hover:bg-opacity-70 duration-200 transition-all  w-fit mx-auto">
          <button className="me-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#000"
                d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
              />
            </svg>
          </button>
          <ul className="flex justify-start items-center gap-8 w-fit">
            <li>
              <Link
                href={"#"}
                className="text-[#1e1e1e] font-medium tracking-wider"
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="text-[#1e1e1e] font-medium tracking-wider"
              >
                NEW
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="text-[#1e1e1e] font-medium tracking-wider"
              >
                SUMMER25
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="text-[#1e1e1e] font-medium tracking-wider"
              >
                CLOTHES
              </Link>
            </li>
          </ul>
          <Link
            href="/#"
            className="text-[34px] mx-5 font-bold text-black tracking-widest "
          >
            VEXA
          </Link>
          <ul className="flex justify-start items-center gap-8 w-fit">
            <li>
              <Link
                href={"#"}
                className="text-[#1e1e1e] font-medium tracking-wider"
              >
                ACCESSORIS
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="text-[#1e1e1e] font-medium tracking-wider"
              >
                SHOES
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="text-[#1e1e1e] font-medium tracking-wider"
              >
                SALE
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="text-[#1e1e1e] font-medium tracking-wider"
              >
                CONTACT US
              </Link>
            </li>
          </ul>
          <div className="cart-account ms-5 flex items-center justify-between gap-5">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16.5 21a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-8 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M3.71 5.4h15.214c1.378 0 2.373 1.27 1.995 2.548l-1.654 5.6C19.01 14.408 18.196 15 17.27 15H8.112c-.927 0-1.742-.593-1.996-1.452zm0 0L3 3"
                />
              </svg>
            </button>
            <Link href={"/account/login"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="#000" strokeWidth="1.5">
                  <circle cx="12" cy="6" r="4" />
                  <path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z" />
                </g>
              </svg>
            </Link>
          </div>
        </div>
        <div className="container lg:hidden flex mt-5 gap-10  items-center justify-between  py-2 bg-white px-6 rounded-full bg-opacity-50 backdrop-blur-md  w-[90%] md:w-[80%] mx-auto">
          <div className="menue   flex items-center justify-between gap-5">
            <button className="">
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
            <button className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#000"
                  d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
                />
              </svg>
            </button>
          </div>

          <Link
            href="/#"
            className="md:text-[34px] text-[30px]  font-bold text-black tracking-widest "
          >
            VEXA
          </Link>

          <div className="cart-account  flex items-center justify-between gap-5">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16.5 21a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-8 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M3.71 5.4h15.214c1.378 0 2.373 1.27 1.995 2.548l-1.654 5.6C19.01 14.408 18.196 15 17.27 15H8.112c-.927 0-1.742-.593-1.996-1.452zm0 0L3 3"
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="#000" strokeWidth="1.5">
                  <circle cx="12" cy="6" r="4" />
                  <path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z" />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
