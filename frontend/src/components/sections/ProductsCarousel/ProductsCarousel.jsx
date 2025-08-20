"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ImagesSlider from "@/components/sliders/ImagesSlider";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getProducts } from "@/queries/products.queries";
import { Skeleton } from "@/components/ui/skeleton";
export default function ProductCarousel({ title, link, params, preView }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    onError: (error) => {
      console.log("error from component:", error);
      toast.error(
        error?.message || "An error occurred while fetching products."
      );
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance, products]);

  return (
    <>
      <section className="w-full py-5">
        <div className="container new-arrive w-[90%] mx-auto">
          <div className="header flex items-center justify-between mb-5 w-full">
            <h2 className="dark:text-white text-black font-bold text-[32px]">
              {title}
            </h2>
            <Link
              className="text-white font-medium md:text-[16px] text-[14px] underline flex items-center"
              href={link}
            >
              <span className="mb-1">SEE ALL NOW</span>
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
          {isError && !isLoading ? (
            <div className="text-red-500 text-lg font-semibold w-full text-center">
              something went happend try again later
            </div>
          ) : isLoading ? (
            <div className="w-full h-full grid grid-cols-4 gap-[30px]">
              <Skeleton className="h-[400px] rounded-lg" />
              <Skeleton className="h-[400px] rounded-lg" />
              <Skeleton className="h-[400px] rounded-lg" />
              <Skeleton className="h-[400px] rounded-lg" />
            </div>
          ) : products?.length > 0 ? (
            <div className="w-full h-full relative">
              <div className="w-full h-full relative">
                <button
                  ref={prevRef}
                  className="custom-prev absolute left-[-50px] text-black dark:text-white top-1/2 -translate-y-1/2 z-10"
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
                  className="custom-next absolute right-[-50px] text-black dark:text-white top-1/2 -translate-y-1/2 z-10"
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

                <Swiper
                  modules={[Navigation]}
                  speed={600}
                  loop={true}
                  slidesPerView={preView}
                  spaceBetween={30}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  onSwiper={setSwiperInstance}
                  className="w-full h-full pb-20"
                >
                  {products.map((product, i) => (
                    <SwiperSlide key={i}>
                      <Link
                        href={`collections/${params.collection}/${product._id}`}
                        className="product relative group cursor-pointer"
                      >
                        {product.onSale && (
                          <span className="absolute top-1.5 left-1.5 bg-[#111]  text-center px-5 py-1 text-[14px] tracking-widest font-medium rounded-md z-20 text-white">
                            SALE
                          </span>
                        )}
                        <div className="image relative">
                          <ImagesSlider
                            navigation={false}
                            imgs={product.images}
                          />
                          <div className="buttonContainer  absolute top-[80%] z-50 w-[90%] left-[50%] translate-x-[-50%] h-[60px] overflow-hidden p-2 ">
                            <button className="font-medium group-hover:mt-0 opacity-0 group-hover:opacity-100 transation-all duration-300 text-lg w-full bg-[#111] text-[#fff] py-1 rounded mt-20">
                              CHOOSE
                            </button>
                          </div>
                        </div>
                        <div className="details py-2 px-1">
                          <h3 className="text-[16px]  dark:text-[#ddd] text-[#222] mb-1 group-hover:underline">
                            {product?.name}
                          </h3>
                          <div className="price flex justify-start items-center gap-3">
                            {product.onSale && (
                              <h3 className="text-[16px] font-medium dark:text-[#ccc] text-[#777] line-through">
                                {product?.price} EGP
                              </h3>
                            )}
                            <h3 className="text-[16px] font-medium ">
                              {product?.totalPrice} EGP
                            </h3>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No products here right now
            </div>
          )}
        </div>
      </section>
    </>
  );
}
