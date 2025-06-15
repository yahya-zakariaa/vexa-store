"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ramadan_bannar from "../../public/assets/sliders/ramadan-bannar.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export default function Slider() {
  return (
    <>
      <Swiper effect="fade" speed={200} className="mySwiper h-full w-full">
        <SwiperSlide>
          <Image
            className="w-full h-full object-cover cursor-grab image-slides relative object-top"
            src={ramadan_bannar}
            quality={100}
            priority
            sizes="100vw"
            
            width={100}
            height={100}
            alt={"bannar"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-full object-cover cursor-grab image-slides relative"
            src="https://swiperjs.com/demos/images/nature-2.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-full object-cover cursor-grab image-slides relative"
            src="https://swiperjs.com/demos/images/nature-3.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-full object-cover cursor-grab image-slides relative"
            src="https://swiperjs.com/demos/images/nature-4.jpg"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
