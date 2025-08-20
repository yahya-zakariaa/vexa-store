"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

import Image from "next/image";
import { useState, useEffect } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
export default function Hero() {
  const width = useWindowWidth();
  return (
    <>
      <section className="slider-container  w-full h-screen flex place-center items-center">
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect={"fade"}
          speed={200}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="mySwiper w-full h-full  overflow-hidden"
        >
          <SwiperSlide>
            <div className="w-full h-full relative">
              <div className="content absolute z-[222] top-[65%] translate-x-[-50%] left-[50%]">
                <button className="bg-[#ccc] dark:bg-[#555] dark:text-white rounded-full px-5 py-2 font-bold">
                  SHOP NOW !!
                </button>
              </div>
              <Image
                className="w-full h-full object-cover   object-[80%_20%]"
                src={"/main-section/video1-pc.webp"}
                alt="Hero Image"
                width={2000}
                height={1000}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full relative">
              <div className="content absolute z-[222] top-[65%] translate-x-[-50%] left-[50%]">
                <button className="bg-[#ccc] dark:bg-[#555] dark:text-white rounded-full px-5 py-2 font-bold">
                  SHOP NOW !!
                </button>
              </div>
              <Image
                className=" w-full h-full object-cover   object-[80%_60%]"
                src={
                  width >= 1024
                    ? "/main-section/video2-pc.gif"
                    : "/main-section/video2-mobile.gif"
                }
                alt="Hero Image"
                width={2000}
                height={1000}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  );
}
