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
import { CategoryDialog } from "./CategoryDialog";

export default function CategoryTable() {
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
    { value: "high_avg_price", label: "High price" },
    { value: "low_avg_price", label: "Low price" },
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

        <div className="flex items-center justify-between flex-1 w-full md:w-auto">
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
           <CategoryDialog />
        </div>
      </div>

      <div className="header grid min-[1200px]:grid-cols-6 grid-cols-4 place-items-center w-full bg-slate-100 shadow rounded-md px-5 py-5">
        <div className="w-full h-full hidden min-[1200px]:flex items-center justify-start">
          Image
        </div>

        <div className="w-full h-full flex items-center justify-start">
          Name
        </div>

        <div className="w-full h-full flex items-center justify-center">
          Price
        </div>

        <div className="w-full h-full flex items-center justify-center">
          Products
        </div>

        <div className="w-full h-full hidden min-[1200px]:flex items-center justify-end">
          Availability
        </div>

        <div className="w-full h-full flex items-center justify-end">
          Actions
        </div>
      </div>

      <TableBody sortOption={sortOption} searchTerm={searchTerm} />
    </div>
  );
}
