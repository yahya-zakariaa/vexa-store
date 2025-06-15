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
import { toast } from "sonner";
export default function Component() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="lg:w-[100px] w-[70px]">Invoice</TableHead>
          <TableHead className="lg:w-[100px] w-[70px]">Status</TableHead>
          <TableHead className="lg:w-[100px] w-[120px]">Method</TableHead>
          <TableHead className="lg:w-[400px] w-[200px]">
            Date (yy/mm/dd)
          </TableHead>
          <TableHead className="text-left">Amount</TableHead>
          <TableHead className="text-right pe-5">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="tracking-widest">2025 / 10 / 12</TableCell>
          <TableCell className="text-left text-green-600 font-bold">
            $250.00
          </TableCell>
          <TableCell className="text-right flex items-center justify-end">
            <div className="flex items-center gap-3 justify-end">
              <button
                className=" bg-red-500 px-4 py-1.5 rounded-md text-white font-medium "
                onClick={() =>toast.success("Login successfully")
                }
              >
                Cancel
              </button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
