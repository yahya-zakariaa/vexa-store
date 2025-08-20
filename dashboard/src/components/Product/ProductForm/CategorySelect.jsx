import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryDialog } from "@/components/Category/CategoryDialog";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/queries/categories.queries";

export default function CategorySelect({ formik, isEditable }) {
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
  return (
    <div className="category bg-gray-100 p-4 mt-4 rounded-md">
      <div className="header">
        <h2 className="text-[20px] font-bold">Category</h2>
      </div>
      <div className="input-group flex flex-col gap-3 my-5 items-start flex-1">
        <label htmlFor="category" className="text-[16px] font-bold">
          Product Category
        </label>
        <Select
          name="category"
          disabled={!isEditable}
          onValueChange={(value) => formik.setFieldValue("category", value)}
          onBlur={formik.handleBlur}
          value={formik.values.category}
        >
          <SelectTrigger
            className={`w-full shadow-none bg-slate-200 border border-gray-300 ${
              !isEditable ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <SelectValue
              className="placeholder:text-black text-black"
              placeholder="Select a Category"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {
                categories && categories.map((c,i)=>(
                  <SelectItem key={i} value={c.name}>{c.name}</SelectItem>
                ))
              }
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <CategoryDialog />
    </div>
  );
}
