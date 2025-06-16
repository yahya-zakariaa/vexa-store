import React from "react";

export default function GeneralInfo({ formik }) {
  return (
    <div className="general-info bg-gray-100 rounded-md p-4 w-full ">
      <div className="header">
        <h2 className="text-[20px] font-bold">General Information</h2>
      </div>
      <div className="form-group flex flex-col gap-2 items-start mt-5  ">
        <label htmlFor="name" className="text-[16px] font-bold">
          Product Name
        </label>

        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name || ""}
          className="bg-slate-200 border border-gray-300  rounded-md px-3 py-2 w-full "
        />
      </div>
      <div className="form-group flex flex-col gap-2 items-start mt-7  ">
        <label htmlFor="name" className="text-[16px] font-bold">
          Product Descraption
        </label>

        <textarea
          type="text"
          name="description"
          rows={4}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description || ""}
          className="bg-slate-200 border border-gray-300  rounded-md px-3 py-2 w-full "
        ></textarea>
      </div>
      <div className="form-group mt-7 flex md:flex-row flex-col md:items-center items-start md:gap-0 gap-10 justify-between">
        <div className="1">
          <div className="header mb-4 ">
            <h3 className="font-bold text-black text-[16px]">Size</h3>
            <p className="text-[#333] text-sm font-medium">
              Pick Available Size
            </p>
          </div>
          <ul className="items-center w-full flex gap-3">
            <li className="flex">
              <input
                type="checkbox"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sizes.XS || false}
                name="sizes.XS"
                id="XS"
                className="peer hidden"
              />
              <label
                htmlFor="XS"
                className="select-none cursor-pointer rounded-lg border-2 border-black
   py-2 flex items-center justify-center w-[50px] font-medium text-black transition-colors duration-200 ease-in-out peer-checked:bg-black peer-checked:text-white peer-checked:border-black "
              >
                XS
              </label>
            </li>
            <li className="flex">
              <input
                type="checkbox"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sizes.S || false}
                name="sizes.S"
                id="S"
                className="peer hidden"
              />
              <label
                htmlFor="S"
                className="select-none cursor-pointer rounded-lg border-2 border-black
   py-2 flex items-center justify-center w-[50px] font-medium text-black transition-colors duration-200 ease-in-out peer-checked:bg-black peer-checked:text-white peer-checked:border-black "
              >
                S
              </label>
            </li>
            <li className="flex">
              <input
                type="checkbox"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sizes.M || false}
                name="sizes.M"
                id="M"
                className="peer hidden"
              />
              <label
                htmlFor="M"
                className="select-none cursor-pointer rounded-lg border-2 border-black
   py-2 flex items-center justify-center w-[50px] font-medium text-black transition-colors duration-200 ease-in-out peer-checked:bg-black peer-checked:text-white peer-checked:border-black "
              >
                M
              </label>
            </li>
            <li className="flex">
              <input
                type="checkbox"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sizes.XL || false}
                name="sizes.XL"
                id="XL"
                className="peer hidden"
              />
              <label
                htmlFor="XL"
                className="select-none cursor-pointer rounded-lg border-2 border-black
   py-2 flex items-center justify-center w-[50px] font-medium text-black transition-colors duration-200 ease-in-out peer-checked:bg-black peer-checked:text-white peer-checked:border-black "
              >
                XL
              </label>
            </li>
            <li className="flex">
              <input
                type="checkbox"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sizes.XXL || false}
                name="sizes.XXL"
                id="XXL"
                className="peer hidden"
              />
              <label
                htmlFor="XXL"
                className="select-none cursor-pointer rounded-lg border-2 border-black
   py-2 flex items-center justify-center w-[50px] font-medium text-black transition-colors duration-200 ease-in-out peer-checked:bg-black peer-checked:text-white peer-checked:border-black "
              >
                XXL
              </label>
            </li>
          </ul>
        </div>
        <div className="2">
          <div className="header mb-4 ">
            <h3 className="font-bold text-black text-[16px]">Gender</h3>
            <p className="text-[#333] text-sm font-medium">
              Pick Available Gender
            </p>
          </div>
          <div className="flex gap-10">
            <div className="inline-flex items-center">
              <label
                className="relative flex items-center cursor-pointer"
                htmlFor="women"
              >
                <input
                  name="gender"
                  value="Women"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="radio"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black transition-all"
                  id="women"
                />
                <span className="absolute bg-black w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </label>
              <label
                className="ml-2 text-black cursor-pointer text-md font-medium"
                htmlFor="women"
              >
                Women
              </label>
            </div>
            <div className="inline-flex items-center">
              <label
                className="relative flex items-center cursor-pointer"
                htmlFor="Men"
              >
                <input
                  name="gender"
                  value="Men"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="radio"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black transition-all"
                  id="Men"
                />
                <span className="absolute bg-black w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </label>
              <label
                className="ml-2 text-black cursor-pointer text-md font-medium"
                htmlFor="Men"
              >
                Men
              </label>
            </div>
            <div className="inline-flex items-center">
              <label
                className="relative flex items-center cursor-pointer"
                htmlFor="unisex"
              >
                <input
                  name="gender"
                  value="Unisex"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="radio"
                  checked={formik.values.gender === "Unisex"}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black transition-all"
                  id="unisex"
                />
                <span className="absolute bg-black w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </label>
              <label
                className="ml-2 text-black cursor-pointer text-md font-medium"
                htmlFor="unisex"
              >
                Unisex
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
