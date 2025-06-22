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
import { CategoryDialog } from "@/components/CategoryDialog";

export default function CategorySelect({ formik, isEditable }) {
  return (
    <div className="category bg-gray-100 p-4 mt-4 rounded-md">
      <div className="header">
        <h2 className="text-[20px] font-bold">Category</h2>
      </div>
      <div className="input-group flex flex-col gap-3 mt-5 items-start flex-1">
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
              <SelectItem value="Clothing">Clothing</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <CategoryDialog />
    </div>
  );
}
