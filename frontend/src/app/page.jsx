"use client";

import Hero from "../components/sections/hero/Hero";
import ProductsCarousel from "@/components/sections/ProductsCarousel/ProductsCarousel";
import DropHighlight from "@/components/sections/dropHighlight/DropHighlight";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <section className="w-full my-5 flex items-center px-5 overflow-hidden">
        <ProductsCarousel
          preView={4}
          title={"NEW DROPS"}
          params={{ limit: 6, sort: "newest", collection: "t-shirt" }}
          link={"/"}
        />
      </section>
      <DropHighlight />
      <section className="w-full px-5 flex items-center mt-16 overflow-hidden">
        <ProductsCarousel
          preView={4}
          title={"BEST DEALS"}
          params={{ limit: 6, sort: "price_asc", onSale: true }}
          link={"/"}

        />
      </section>
    </main>
  );
}
