import React from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
export default function DropHighlight() {
  return (
    <section className="w-full h-[100vh] relative">
      <div className="content absolute w-[80%] h-[50%] left-[50%] top-[50%] translate-x-[-50%] flex items-center flex-col justify-start ">
        <h3 className="text-white font-bold md:text-[32px] text-[24px] mb-2 ">
          Unisex Drop. Wear it Your Way.
        </h3>
        <Link
          className="text-white font-medium md:text-[16px] text-[14px] underline  flex items-center"
          href="#"
        >
          <span className="mb-1">SEE THE DROP</span>
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
              strokeMiterlimit="10"
              strokeWidth="2"
              d="m14 16l4-4m0 0l-4-4m4 4H6"
            />
          </svg>
        </Link>
      </div>
      <video
        className="w-full h-full object-cover"
        src={"/video.mp4"}
        autoPlay
        muted
        loop
        playsInline
      />{" "}
      <Marquee className=" py-3 " pauseOnHover={true} speed={80}>
        <div className="contaier flex justify-between pt-1 items-center gap-20 px-10">
          <p className=" dark:text-[#eee] uppercase text-black text-[17px] tracking-widest font-medium">
            Buy Confidently, Exchange Easily.
          </p>
          <p className=" dark:text-[#eee] uppercase text-black text-[17px] tracking-widest font-medium">
            Buy Confidently, Exchange Easily.
          </p>
          <p className=" dark:text-[#eee] uppercase text-black text-[17px] tracking-widest font-medium">
            Buy Confidently, Exchange Easily.
          </p>
          <p className=" dark:text-[#eee] uppercase text-black text-[17px] tracking-widest font-medium">
            Buy Confidently, Exchange Easily.
          </p>
        </div>
      </Marquee>
    </section>
  );
}
