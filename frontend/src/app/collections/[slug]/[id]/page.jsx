"use client";
import React, { useState } from "react";
import { getProduct } from "@/queries/products.queries.js";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ImagesSlider from "@/components/sliders/ImagesSlider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useAddToCart } from "@/mutations/cart.mutations.js";

export default function Product() {
  const { id } = useParams();
  const [size, setSize] = useState("M");
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    onError: (error) => {
      console.log("error from component:", error);
      toast.error(
        error?.message || "An error occurred while fetching product."
      );
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
  const { mutate: addToCart, isPending } = useAddToCart();
  console.log(product);
  return (
    <section>
      <div className="container md:px-10 px-5 w-full flex items-start justify-center mx-auto">
        <div className="product w-full h-fit flex md:flex-row flex-col items-start justify-between mt-[80px]  md:mt-[130px] gap-5 md:gap-10">
          <div className="image  w-[50%]   flex items-center justify-start">
            <div className="w-full md:w-[70%] bg-white rounded-lg overflow-hidden">
              <ImagesSlider imgs={product?.images} navigation={true} />
            </div>
          </div>
          <div className="detailes flex flex-col items-start justify-center w-full md:w-[45%] md:min-w-[45%] gap-4 ">
            <div className=" flex flex-col items-start justify-start w-full gap-3">
              <div className="name font-bold text-2xl">{product?.name}</div>
              <div className="flex flex-col">
                <span className="price text-xl font-medium">
                  {product?.totalPrice} EGP
                </span>{" "}
                <span className="text-sm">
                  Tax included. Shipping calculated at checkout.
                </span>
              </div>
            </div>
            <div className="size grid w-full items-center gap-3 mt-4">
              <Label htmlFor="sizes">Sizes</Label>
              <Select
                onValueChange={(value) => {
                  setSize(value);
                  console.log("Selected size:", size);
                }}
              >
                <SelectTrigger id={"select"}>
                  <SelectValue placeholder="select a size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sizes</SelectLabel>
                    {product?.sizes.map((s, i) => (
                      <SelectItem value={s} key={i}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="description mt-5">{product?.description}</div>
            <div className="actions flex flex-col gap-2 w-full my-5">
              <button
                onClick={() => {
                  addToCart({ id: product._id, size, quantity: 1 });
                }}
                className="border border-black dark:border-white w-full text-center py-2 font-bold tracking-wdist"
              >
                ADD TO CART
              </button>
              <button
                onClick={() => {
                  console.log("Buy it now clicked");
                }}
                className="dark:bg-white bg-black text-white dark:text-black w-full text-center py-2 font-bold tracking-wdist"
              >
                BUY IT NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
