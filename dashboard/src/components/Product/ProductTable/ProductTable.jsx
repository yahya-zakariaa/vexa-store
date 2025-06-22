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
export default function ProductTable() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-3 ">
      <div className="searchBar w-full flex items-center justify-start gap-6 ">
        <input
          type="text"
          placeholder="search"
          className="flex-1 min-w-[50%] px-3 py-2.5 bg-slate-100 border border-gray-300 rounded-md"
        />
        <div className="filters flex items-center justify-center gap-4 max-w-[40%]">
          <Select
            // name="category"
            // disabled={!isEditable}
            // onValueChange={(value) => formik.setFieldValue("category", value)}
            // onBlur={formik.handleBlur}
            value={""}
          >
            <SelectTrigger
              className={`max-w-[300px] shadow-none w-[50%] bg-slate-100 border border-gray-300 py-2.5 `}
            >
              <SelectValue
                className="placeholder:text-black text-black"
                placeholder="Filter"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M15 2v1.67l-5 4.759V14H6V8.429l-5-4.76V2zM7 8v5h2V8l5-4.76V3H2v.24z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="mt-[-3px]">Filter</span>
                </SelectLabel>
                <SelectItem value="Product">Product name</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            // name="category"
            // disabled={!isEditable}
            // onValueChange={(value) => formik.setFieldValue("category", value)}
            // onBlur={formik.handleBlur}
            value={""}
          >
            <SelectTrigger
              className={`max-w-[300px] shadow-none w-[50%] py-2.5 bg-slate-100 border border-gray-300 `}
            >
              <SelectValue
                className="placeholder:text-black text-black"
                placeholder="Sort"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M16.29 14.29L12 18.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l5 5a1 1 0 0 0 1.42 0l5-5a1 1 0 0 0-1.42-1.42M7.71 9.71L12 5.41l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42l-5-5a1 1 0 0 0-1.42 0l-5 5a1 1 0 0 0 1.42 1.42"
                    />
                  </svg>
                  <span className="mt-[-3px]">sort</span>
                </SelectLabel>
                <SelectItem value="Product">A-Z</SelectItem>
                <SelectItem value="Product">Z-A</SelectItem>
                <SelectItem value="Product">High price</SelectItem>
                <SelectItem value="Product">Low price</SelectItem>
                <SelectItem value="Product">High stock</SelectItem>
                <SelectItem value="Product">Low stock</SelectItem>
                <SelectItem value="Product">Availibale</SelectItem>
                <SelectItem value="Product">Unavailibale</SelectItem>
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
        <div className="col w-full h-full flex items-center justify-center ms-16">
          Stock
        </div>

        <div className="col w-full h-full  min-[1200px]:flex hidden items-center justify-end  md:col-start-8">
          Availability
        </div>
        <div className="col w-full h-full flex items-center justify-end  md:col-start-9">
          Actions
        </div>
      </div>
      <TableBody />
    </div>
  );
}
