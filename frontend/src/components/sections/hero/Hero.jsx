"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ramadan_bannar from "../../../../public/assets/sliders/ramadan-bannar.jpg";
import ramadan_bannar_mobile from "../../../../public/assets/sliders/ramadan-bannar-mobile.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export default function Hero() {
  return (
    <>
      <section className="slider-container  w-full h-screen flex place-center items-center">
        <Swiper
          effect="fade"
          speed={200}
          className="mySwiper w-full  mt-9 h-[94.8%]  overflow-hidden"
        >
          <SwiperSlide>
            <div className="w-full h-full relative">
              <div className="content absolute z-[222] top-[65%] translate-x-[-50%] left-[50%]">
                <button className="bg-[#ccc] dark:bg-[#555] dark:text-white rounded-full px-5 py-2 font-bold">
                  SHOP NOW !!
                </button>
              </div>
              <Image
                className="w-full h-full md:inline-block hidden object-cover cursor-grab image-slides relative object-top "
                src={ramadan_bannar}
                quality={100}
                priority
                sizes="150vw"
                width={100}
                height={100}
                alt={"bannar"}
              />
              <Image
                className="w-full h-full md:hidden inline-block object-cover cursor-grab image-slides relative object-middle  "
                src={ramadan_bannar_mobile}
                quality={100}
                priority
                sizes="150vw"
                width={100}
                height={100}
                alt={"bannar"}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  );
}
