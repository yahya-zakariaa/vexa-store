"use client";
import { useState } from "react";
import TableBody from "./TableBody";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SearchIcon, SortAscIcon } from "lucide-react";

export default function ProductTable() {
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (value) => {
    setSortOption(value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const sortOptions = [
    { value: "default", label: "default" },
    { value: "a_z", label: "A-Z" },
    { value: "z_a", label: "Z-A" },
    { value: "high_price", label: "High price" },
    { value: "low_price", label: "Low price" },
    { value: "low_stock", label: "Low stock" },
    { value: "unavailable", label: "Unavailable" },
  ];

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-col md:flex-row items-center justify-start gap-4 py-4  rounded-lg ">
        <div className="relative w-full md:w-1/2">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select value={sortOption} onValueChange={handleSort}>
            <SelectTrigger className="w-[160px]">
              <div className="flex items-center gap-2">
                <SortAscIcon className="w-4 h-4" />
                <SelectValue placeholder="Sort by" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort Options</SelectLabel>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="header grid min-[1200px]:grid-cols-9 grid-cols-5  place-items-center w-full bg-slate-100 shadow rounded-md px-5 py-5">
        <div className="col w-full h-full min-[1200px]:flex hidden items-center justify-start">
          Image
        </div>
        <div className="col w-full h-full col-span-2 flex items-center justify-start  ">
          Name
        </div>
        <div className="col w-full h-full  min-[1200px]:flex hidden  items-center justify-start">
          Category
        </div>
        <div className="col w-full h-full flex items-center justify-center">
          Price
        </div>
        <div className="col w-full h-full flex items-center justify-center md:ms-16">
          Stock
        </div>

        <div className="col w-full h-full  min-[1200px]:flex hidden items-center justify-end  md:col-start-8">
          Availability
        </div>
        <div className="col w-full h-full flex items-center justify-end  md:col-start-9">
          Actions
        </div>
      </div>

      <TableBody sortOption={sortOption} searchTerm={searchTerm} />
    </div>
  );
}
