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
    <div className="flex flex-col items-center justify-center w-full gap-3 ">
      <div className="header grid min-[1200px]:grid-cols-10 grid-cols-6  place-items-center w-full bg-gray-100 shadow rounded-md px-5 py-5">
        <div className="col w-full h-full min-[1200px]:flex hidden items-center justify-start">Image</div>
        <div className="col w-full h-full col-span-2 flex items-center justify-start  ">Name</div>
        <div className="col w-full h-full  min-[1200px]:flex hidden  items-center justify-start">Category</div>
        <div className="col w-full h-full flex items-center justify-center">Price</div>
        <div className="col w-full h-full flex items-center justify-center">Stock</div>
        <div className="col w-full h-full flex items-center justify-center"> Sold</div>
        <div className="col w-full h-full  min-[1200px]:flex hidden items-center justify-end  md:col-start-9">Status</div>
        <div className="col w-full h-full flex items-center justify-end  md:col-start-10">Actions</div>
      </div>

      {Array.isArray(products) &&
        products?.map((product) => (
          <div className="row grid min-[1200px]:grid-cols-10 grid-cols-6 place-items-center w-full min-h-[90px] bg-gray-100 shadow rounded-md px-3 py-2">
            <div className="col w-full h-full min-[1200px]:flex hidden items-center justify-start">
              <Image
                className="rounded object-cover"
                alt={"none"}
                src={product.images[0]}
                width={50}
                height={50}
              />
            </div>
            <div className="col w-full h-full col-span-2 flex items-center justify-start min-[500px]:text-[16px]  text-[14px] ">
              {product.name}
            </div>
            <div className="col w-full h-full  min-[1200px]:flex hidden  items-center justify-start">{product.category.name}</div>
            <div className="col w-full h-full flex items-center justify-center min-[500px]:text-[16px]  text-[14px]">{product.totalPrice} EGP</div>
            <div className="col w-full h-full flex items-center justify-center min-[500px]:text-[16px]  text-[14px]">{product.stock}</div>
            <div className="col w-full h-full flex items-center justify-center min-[500px]:text-[16px]  text-[14px]">{product.totalSold}</div>
            <div className="col w-full h-full  min-[1200px]:flex hidden items-center justify-end  md:col-start-9">
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
            </div>
            <div className="col w-full h-full flex items-center justify-end  md:col-start-10 pe-4">
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
            </div>
          </div>
        ))}
    </div>
  );
}

// <Table className={"rounded-xl bg-gray-100"}>
//   <TableCaption>A list of Products.</TableCaption>
//   <TableHeader className={"py-10"}>
//     <TableRow>
//       <TableHead className="w-[100px]  text-center max-[1000px]:hidden">
//         Image
//       </TableHead>
//       <TableHead className="w-[500px]  text-center">Name</TableHead>
//       <TableHead className="text-center w-[200px]  max-[1000px]:hidden">
//         Category
//       </TableHead>
//       <TableHead className="text-center min-[1200px]:w-[150px] w-[350px]  ">
//         Price
//       </TableHead>
//       <TableHead className="max-[1000px]:w-[150px]  text-center">
//         Stock
//       </TableHead>
//       <TableHead className="text-center max-[1000px]:w-[150px]  ">
//         Total Sold
//       </TableHead>
//       <TableHead className=" text-center min-[1200px]:ps-[100px] w-[500px]">
//         Status
//       </TableHead>
//       <TableHead className="text-right pe-13 w-[200px]">Actions</TableHead>
//     </TableRow>
//   </TableHeader>
//   <TableBody className="w-full">
//     {Array.isArray(products) &&
//       products?.map((product) => (
//         <TableRow className="w-full" key={product._id}>
//           <TableCell className=" text-center font-medium ps-7 max-[1000px]:hidden">
//             <Image
//               className="rounded object-cover"
//               alt={product.name}
//               src={product.images[0]}
//               width={50}
//               height={50}
//             />
//           </TableCell>
//           <TableCell className="text-center font-medium ">
//             {product.name}
//           </TableCell>
//           <TableCell className="tracking-widest font-medium text-center max-[1000px]:hidden">
//             {product.category.name}
//           </TableCell>
//           <TableCell className="text-center text-green-500 font-bold">
//             {product.totalPrice}
//           </TableCell>
//           <TableCell className="text-center font-medium">
//             {product.stock}
//           </TableCell>
//           <TableCell className="text-center font-medium">
//             {product.totalSold}
//           </TableCell>
//           <TableCell className=" ps-[95px] w-[200px]">
//             <div className="toggler ">
//               <input
//                 id={`toggler-${product._id}`}
//                 name={`toggler-${product._id}`}
//                 type="checkbox"
//                 defaultChecked={product?.availability}
//                 value={"0"}
//               />
//               <label htmlFor={`toggler-${product._id}`}>
//                 <svg
//                   className="toggler-on"
//                   version="0.5"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 130.2 130.2"
//                 >
//                   <polyline
//                     className="path check"
//                     points="100.2,40.2 51.5,88.8 29.8,67.5"
//                   ></polyline>
//                 </svg>
//                 <svg
//                   className="toggler-off"
//                   version="0.5"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 130.2 130.2"
//                 >
//                   <line
//                     className="path line"
//                     x1="34.4"
//                     y1="34.4"
//                     x2="95.8"
//                     y2="95.8"
//                   ></line>
//                   <line
//                     className="path line"
//                     x1="95.8"
//                     y1="34.4"
//                     x2="34.4"
//                     y2="95.8"
//                   ></line>
//                 </svg>
//               </label>
//             </div>
//           </TableCell>
//           <TableCell className=" text-end   ps-[80px] h-full ">
//             <DropdownMenu className="h-full">
//               <DropdownMenuTrigger asChild>
//                 <SidebarMenuButton
//                   size="sm"
//                   className="data-[state=open]:bg-sidebar-accent hover:bg-transparent w-fit h-full data-[state=open]:text-sidebar-accent-foreground"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       fill="none"
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0 7a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0-14a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
//                     />
//                   </svg>
//                 </SidebarMenuButton>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent
//                 className="mt-5 me-2  rounded-lg"
//                 side={isMobile ? "bottom" : "left"}
//                 align="start"
//                 sideOffset={1}
//               >
//                 <DropdownMenuGroup>
//                   <DropdownMenuItem>Veiw</DropdownMenuItem>
//                   <DropdownMenuItem>Edit</DropdownMenuItem>
//                 </DropdownMenuGroup>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem className="text-red-500 font-medium [hover]:text-red-500 flex items-center">
//                   Delete
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </TableCell>
//         </TableRow>
//       ))}
//   </TableBody>
// </Table>
