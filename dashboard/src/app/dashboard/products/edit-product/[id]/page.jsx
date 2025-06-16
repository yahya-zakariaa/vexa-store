import ProductForm from "@/components/Product/ProductForm/ProductForm";
import React from "react";

export default function page({ params }) {
  const { id } = params;
  return <ProductForm status="update" productId={id} />;
}
