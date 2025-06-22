import UpdateProductForm from "@/components/Product/ProductForm/UpdateProductForm";
import React from "react";

export default async function page({ params }) {
  const { id } = await params;

  return <UpdateProductForm productId={id} />;
}
