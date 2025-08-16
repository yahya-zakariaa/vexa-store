"use client";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/queries/product.queries";
import {
  useDeleteProduct,
  useUpdateProduct,
} from "@/mutations/product.mutations";
export default function TableBody({ sortOption, searchTerm }) {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    onError: (error) => {
      toast.error(
        error?.message || "An error occurred while fetching products."
      );
    },
  });
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { mutateAsync: deleteProduct } = useDeleteProduct();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let result = [...products];

    // Filter by search
    if (searchTerm) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    switch (sortOption) {
      case "a_z":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z_a":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "high_price":
        result.sort((a, b) => b.totalPrice - a.totalPrice);
        break;
      case "low_price":
        result.sort((a, b) => a.totalPrice - b.totalPrice);
        break;
      case "low_stock":
        result.sort((a, b) => a.stock - b.stock);
        break;
      case "unavailable":
        result = result.filter((p) => !p.availability);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [products, sortOption, searchTerm]);
  return (
    <>
      {Array.isArray(filteredProducts) &&
        filteredProducts?.map((product) => (
          <div
            key={product._id}
            className="row grid min-[1200px]:grid-cols-9 grid-cols-5 place-items-center w-full min-h-[90px] bg-gray-100 shadow rounded-md px-3 py-2"
          >
            <div className="col w-full h-full min-[1200px]:flex hidden items-center justify-start">
              <Image
                className="rounded object-cover"
                alt={"none"}
                src={product.images[0]}
                width={50}
                height={50}
              />
            </div>
            <div className="col w-full h-full font-bold col-span-2 flex items-center justify-start min-[500px]:text-[16px]  text-[14px] ">
              {product.name}
            </div>
            <div className="col w-full h-full font-bold min-[1200px]:flex hidden  items-center justify-start">
              {product.category.name}
            </div>
            <div className="col w-full h-full font-bold flex items-center justify-center min-[500px]:text-[16px]  text-[14px]">
              {product.totalPrice} EGP
            </div>
            <div className="col w-full h-full flex items-center justify-center min-[500px]:text-[16px]  text-[14px] md:ms-16">
              <div className="div flex flex-col items-center font-bold">
                <span className="flex items-center gap-1">
                  {" "}
                  {product.stock}{" "}
                </span>
                <span className="font-medium text-[15px] text-green-500 min-[1200px]:block hidden ">
                  - {product.totalSold} Sold
                </span>
              </div>
            </div>

            <div className="col w-full h-full  min-[1200px]:flex hidden items-center justify-end  md:col-start-8 me-8">
              <div className="toggler ">
                <input
                  id={`toggler-${product._id}`}
                  name={`toggler-${product._id}`}
                  type="checkbox"
                  onChange={async () => {
                    console.log(product);
                    await updateProduct({
                      productId: product?._id,
                      data: {
                        availability: !product?.availability,
                      },
                    });
                  }}
                  defaultChecked={product?.availability}
                  value={"0"}
                />
                <label htmlFor={`toggler-${product._id}`}>
                  <svg
                    className="toggler-on"
                    version="0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 130.2 130.2"
                  >
                    <polyline
                      className="path check"
                      points="100.2,40.2 51.5,88.8 29.8,67.5"
                    ></polyline>
                  </svg>
                  <svg
                    className="toggler-off"
                    version="0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 130.2 130.2"
                  >
                    <line
                      className="path line"
                      x1="34.4"
                      y1="34.4"
                      x2="95.8"
                      y2="95.8"
                    ></line>
                    <line
                      className="path line"
                      x1="95.8"
                      y1="34.4"
                      x2="34.4"
                      y2="95.8"
                    ></line>
                  </svg>
                </label>
              </div>
            </div>
            <div className="col w-full h-full flex items-center justify-end  md:col-start-9 pe-4">
              <DropdownMenu className="h-full">
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="sm"
                    className="data-[state=open]:bg-sidebar-accent cursor-pointer hover:bg-transparent w-fit h-full data-[state=open]:text-sidebar-accent-foreground border-none outline-none focus:outline-none focus:border-none ring-0 focus-visible:ring-0"
                  >
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
                        strokeWidth="2"
                        d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0 7a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0-14a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
                      />
                    </svg>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="md:mt-5 md:me-2 mt-8  rounded-lg"
                  side={"left"}
                  align="start"
                  sideOffset={1}
                >
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link
                        href={`/dashboard/products/${product._id}`}
                        className="w-full h-full cursor-pointer"
                      >
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href={`/dashboard/products/edit-product/${product._id}`}
                        className="w-full h-full cursor-pointer"
                      >
                        Edit
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-500 hover:text-red-500 focus:text-red-500 cursor-pointer font-medium flex items-center"
                    onClick={() => {
                      setSelectedProductId(product._id);
                      setTimeout(() => {
                        setOpenDialog(true);
                      }, 100);
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Product Deletion</AlertDialogTitle>
                  <AlertDialogDescription className="md:text-[16px] text-[14px]">
                    This action is irreversible. The product and all related
                    data will be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-500 hover:bg-red-600"
                    onClick={async () => {
                      try {
                        await deleteProduct(selectedProductId);
                        setOpenDialog(false);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
    </>
  );
}
