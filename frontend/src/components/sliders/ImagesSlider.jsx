"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // افترض أنك عندك Skeleton جاهز

export default function ImagesSlider({
  effect = "fade",
  speed = 600,
  loop = true,
  imgs = [],
  pagination = { clickable: true },
  navigation = true,
}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [navigationReady, setNavigationReady] = useState(false);
  const [loadedImages, setLoadedImages] = useState(() =>
    Array(imgs.length).fill(false)
  );

  useEffect(() => {
    if (navigation) {
      setNavigationReady(true);
    }
  }, [navigation]);

  const localNavigation =
    navigation && navigationReady
      ? {
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }
      : false;

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  return (
    <div className="w-full h-full relative">
      <Swiper
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        effect={effect}
        speed={speed}
        loop={loop}
        pagination={pagination}
        navigation={localNavigation}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        className="w-full h-full"
      >
        {imgs.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full relative">
              {!loadedImages[index] && (
                <Skeleton className="absolute inset-0 w-full h-[400px] rounded-lg" />
              )}
              <Image
                alt={`Image ${index + 1}`}
                width={200}
                height={400}
                className={`w-full h-full rounded-lg object-cover transition-opacity duration-300 ${
                  loadedImages[index] ? "opacity-100" : "opacity-0"
                }`}
                src={img}
                onLoad={() => handleImageLoad(index)}
                quality={100}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {navigation && navigationReady && (
        <>
          <button
            ref={prevRef}
            className="custom-prev absolute left-5 text-black top-1/2 -translate-y-1/2 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 48 48"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M31 36L19 24l12-12"
              />
            </svg>
          </button>
          <button
            ref={nextRef}
            className="custom-next absolute right-5 text-black top-1/2 -translate-y-1/2 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 48 48"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="m19 12l12 12l-12 12"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
