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

export default function PriceStock({ formik, isEditable }) {
  const inputClass = `bg-slate-200 border border-gray-300 appearance-none rounded-md px-3 py-2 w-full ${
    !isEditable ? "opacity-50" : ""
  }`;

  return (
    <div className="pricing-stock bg-gray-100 rounded-md p-4 mt-4">
      <div className="header">
        <h2 className="text-[20px] font-bold">Pricing & Stock</h2>
      </div>

      <div className="form-group flex gap-4 justify-between mt-5">
        <div className="input-group flex flex-col gap-3 items-start flex-1">
          <label htmlFor="price" className="text-[16px] font-bold">
            Base Price (EGP)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price || ""}
            disabled={!isEditable}
            className={inputClass}
          />
        </div>

        <div className="input-group flex flex-col gap-3 items-start flex-1">
          <label htmlFor="stock" className="text-[16px] font-bold">
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.stock || ""}
            disabled={!isEditable}
            className={inputClass}
          />
        </div>
      </div>

      <div className="form-group flex gap-4 justify-between mt-5">
        <div className="input-group flex flex-col gap-3 items-start flex-1">
          <label htmlFor="discount" className="text-[16px] font-bold">
            Discount
          </label>
          <input
            id="discount"
            name="discount"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.discount || ""}
            disabled={!isEditable}
            className={inputClass}
          />
        </div>

        <div className="input-group flex flex-col gap-3 items-start flex-1">
          <label htmlFor="discountType" className="text-[16px] font-bold">
            Discount Type
          </label>
          <Select
            name="discountType"
            disabled={!isEditable}
            onValueChange={(value) =>
              formik.setFieldValue("discountType", value)
            }
            onBlur={formik.handleBlur}
            value={formik.values.discountType}
          >
            <SelectTrigger
              id="discountType"
              className={`w-full shadow-none bg-slate-200 border border-gray-300 ${
                !isEditable ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <SelectValue
                className="placeholder:text-black text-black"
                placeholder="Select a Discount type"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Discount Type</SelectLabel>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed">Fixed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
