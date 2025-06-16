"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";

import { toast } from "sonner";
import Image from "next/image";
export default function ProductTable({ products }) {
  const { isMobile } = useSidebar();

  return (
    <Table className={"rounded-xl bg-gray-100"}>
      <TableCaption>A list of Products.</TableCaption>
      <TableHeader className={"py-10"}>
        <TableRow>
          <TableHead className="w-[100px]  text-center max-[1000px]:hidden">
            Image
          </TableHead>
          <TableHead className="w-[500px]  text-center">Name</TableHead>
          <TableHead className="text-center w-[200px]  max-[1000px]:hidden">
            Category
          </TableHead>
          <TableHead className="text-center min-[1000px]:w-[150px] w-[350px]  ">
            Price
          </TableHead>
          <TableHead className="max-[1000px]:w-[150px]  text-center">
            Stock
          </TableHead>
          <TableHead className="text-center max-[1000px]:w-[150px]  ">
            Total Sold
          </TableHead>
          <TableHead className=" text-center min-[1000px]:ps-[100px] w-[500px]">
            Status
          </TableHead>
          <TableHead className="text-right pe-13 w-[200px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="w-full">
        {Array.isArray(products) &&
          products?.map((product) => (
            <TableRow className="w-full" key={product._id}>
              <TableCell className=" text-center font-medium ps-7 max-[1000px]:hidden">
                <Image
                  className="rounded object-cover"
                  alt={product.name}
                  src={product.images[0]}
                  width={50}
                  height={50}
                />
              </TableCell>
              <TableCell className="text-center font-medium ">
                {product.name}
              </TableCell>
              <TableCell className="tracking-widest font-medium text-center max-[1000px]:hidden">
                {product.category.name}
              </TableCell>
              <TableCell className="text-center text-green-500 font-bold">
                {product.totalPrice}
              </TableCell>
              <TableCell className="text-center font-medium">
                {product.stock}
              </TableCell>
              <TableCell className="text-center font-medium">
                {product.totalSold}
              </TableCell>
              <TableCell className=" ps-[95px] w-[200px]">
                <div className="toggler ">
                  <input
                    id={`toggler-${product._id}`}
                    name={`toggler-${product._id}`}
                    type="checkbox"
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
              </TableCell>
              <TableCell className=" text-end   ps-[80px] h-full ">
                <DropdownMenu className="h-full">
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="sm"
                      className="data-[state=open]:bg-sidebar-accent hover:bg-transparent w-fit h-full data-[state=open]:text-sidebar-accent-foreground"
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
                    className="mt-5 me-2  rounded-lg"
                    side={isMobile ? "bottom" : "left"}
                    align="start"
                    sideOffset={1}
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Veiw</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500 font-medium [hover]:text-red-500 flex items-center">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
