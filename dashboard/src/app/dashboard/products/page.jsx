"use client"
import React, { useEffect, useState } from "react";
import ProductTable from "@/components/Product/ProductTable/ProductTable";
import useProductStore from "@/store/useProductStore";

export default function page() {
  const { getProducts } = useProductStore();
  const [products, setProducts] = useState([]);
  const fetchProduct = async () => {
    try {
      const res = await getProducts();
      setProducts(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
    console.log(products);
    
  }, []);
  return (
    <section className="md:px-16">
    <ProductTable products={products} />
    </section>
  );
}
