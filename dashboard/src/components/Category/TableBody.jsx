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
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/queries/categories.queries";
import { useDeleteCategory } from "@/mutations/category.mutations";

export default function TableBody({ sortOption, searchTerm }) {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    onError: (error) => {
      toast.error(
        error?.message || "An error occurred while fetching categories."
      );
    },
  });
    const { mutateAsync: deleteCategory } = useDeleteCategory();
  
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState([]);
  useEffect(() => {
    let result = [...categories];

    // Filter by search
    if (searchTerm) {
      result = result.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      case "high_avg_price":
        result.sort((a, b) => b.totalPrice - a.totalPrice);
        break;
      case "low_avg_price":
        result.sort((a, b) => a.totalPrice - b.totalPrice);
        break;
      case "unavailable":
        result = result.filter((c) => !c.isActive);
        break;
      default:
        break;
    }

    setFilteredCategories(result);
  }, [categories, sortOption, searchTerm]);
  return (
    <>
      {Array.isArray(filteredCategories) &&
        filteredCategories?.map((category) => (
          <div
            key={category._id}
            className="grid min-[1200px]:grid-cols-6 grid-cols-4 place-items-center w-full min-h-[90px] bg-gray-100 shadow rounded-md px-3 py-2"
          >
            <div className="col w-full h-full min-[1200px]:flex hidden items-center justify-start">
              <Image
                className="rounded object-cover"
                alt={"none"}
                src={category.images[0]}
                width={50}
                height={50}
              />
            </div>
            <div className="col w-full h-full font-bold  flex items-center justify-start min-[500px]:text-[16px]   text-[14px] ">
              {category.name}
            </div>
            <div className="col w-full h-full font-bold flex items-center justify-center min-[500px]:text-[16px]  text-[14px]">
              {category.avgPrice} EGP
            </div>
            <div className="col w-full h-full flex items-center justify-center min-[500px]:text-[16px]  text-[14px] ">
              <div className="div flex flex-col items-start font-bold">
                {category.productsCount}
              </div>
            </div>

            <div className="col w-full h-full  min-[1200px]:flex hidden items-center justify-end   me-8">
              <div className="toggler ">
                <input
                  id={`toggler-${category._id}`}
                  name={`toggler-${category._id}`}
                  type="checkbox"
                  onChange={async () => {
                    console.log(category);
                    // await updatecategories({
                    //   categoryId: category?._id,
                    //   data: {
                    //     availability: !category?.availability,
                    //   },
                    // });
                  }}
                  defaultChecked={category?.isActive}
                  value={"0"}
                />
                <label htmlFor={`toggler-${category._id}`}>
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
            <div className="col w-full h-full flex items-center justify-end   pe-4">
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
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-500 hover:text-red-500 focus:text-red-500 cursor-pointer font-medium flex items-center"
                    onClick={() => {
                      setSelectedCategoryId(category._id);
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
                  <AlertDialogTitle>Confirm Category Deletion</AlertDialogTitle>
                  <AlertDialogDescription className="md:text-[16px] text-[14px]">
                    This action is irreversible. The category and all related
                    data will be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-500 hover:bg-red-600"
                    onClick={async () => {
                      try {
                        await deleteCategory(selectedCategoryId);
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
