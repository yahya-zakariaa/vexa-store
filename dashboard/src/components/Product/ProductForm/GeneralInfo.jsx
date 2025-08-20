import React from "react";

export default function GeneralInfo({ formik, isEditable }) {
  const sizesList = ["XS", "S", "M", "L", "XL", "XXL"];

  const handleSizeToggle = (size) => {
    const currentSizes = formik.values.sizes || [];
    const updatedSizes = currentSizes.includes(size)
      ? currentSizes.filter((s) => s !== size)
      : [...currentSizes, size];

    formik.setFieldValue("sizes", updatedSizes);
  };

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
          readOnly={!isEditable}
          disabled={!isEditable}
          value={formik.values.name || ""}
          className={`bg-slate-200 border border-gray-300  rounded-md px-3 py-2 w-full ${
            !isEditable ? "opacity-50 curosr-default" : ""
          } `}
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
          readOnly={!isEditable}
          disabled={!isEditable}
          value={formik.values.description || ""}
          className={`bg-slate-200 border border-gray-300  rounded-md px-3 py-2 w-full ${
            !isEditable ? "opacity-50 curosr-default" : ""
          } `}
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
          <ul className="items-center w-full flex gap-3 flex-wrap">
            {sizesList.map((size, i) => (
              <li key={i} className="flex">
                <input
                  type="checkbox"
                  id={size}
                  checked={formik.values.sizes.includes(size)}
                  onChange={() => handleSizeToggle(size)}
                  disabled={!isEditable}
                  className="peer hidden"
                />
                <label
                  htmlFor={size}
                  className={`select-none  rounded-lg border-2 
          py-2 flex items-center justify-center w-[50px] font-medium  
          transition-colors duration-200 ease-in-out 
          border-black text-black peer-checked:border-black peer-checked:text-white peer-checked:bg-black
             ${!isEditable ? "opacity-50" : "cursor-pointer "}`}
                >
                  {size}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="2">
          <div className="header mb-4 ">
            <h3 className="font-bold text-black text-[16px]">Gender</h3>
            <p className="text-[#333] text-sm font-medium">
              Pick Available Gender
            </p>
          </div>
          <div className="flex md:gap-10 gap-7 flex-wrap">
            <div
              className={`inline-flex items-center ${
                !isEditable ? "opacity-50" : ""
              }`}
            >
              <label
                className="relative flex items-center cursor-pointer"
                htmlFor="Women"
              >
                <input
                  name="gender"
                  value="Women"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={!isEditable}
                  checked={formik.values.gender === "Women"}
                  type="radio"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black transition-all"
                  id="Women"
                />
                <span className="absolute bg-black w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </label>
              <label
                className="ml-2 text-black cursor-pointer text-md font-medium"
                htmlFor="Women"
              >
                Women
              </label>
            </div>
            <div
              className={`inline-flex items-center ${
                !isEditable ? "opacity-50" : ""
              }`}
            >
              <label
                className="relative flex items-center cursor-pointer"
                htmlFor="Men"
              >
                <input
                  name="gender"
                  value="Men"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={!isEditable}
                  checked={formik.values.gender === "Men"}
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
            <div
              className={`inline-flex items-center ${
                !isEditable ? "opacity-50" : ""
              }`}
            >
              <label
                className="relative flex items-center cursor-pointer"
                htmlFor="Unisex"
              >
                <input
                  name="gender"
                  value="Unisex"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={!isEditable}
                  type="radio"
                  checked={formik.values.gender === "Unisex"}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black transition-all"
                  id="Unisex"
                />
                <span className="absolute bg-black w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </label>
              <label
                className="ml-2 text-black cursor-pointer text-md font-medium"
                htmlFor="Unisex"
              >
                Unisex
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group mt-7 flex md:flex-row flex-col md:items-center items-start md:gap-0 gap-10 justify-between">
        <div className="1">
          <div className="header mb-4 ">
            <h3 className="font-bold text-black text-[16px]">Availability</h3>
            <p className="text-[#333] text-sm font-medium">
              Toggle Availability
            </p>
          </div>
          <label
            htmlFor="Toggle3"
            className={`inline-flex items-center  rounded-md  ${
              !isEditable ? "opacity-50 " : " cursor-pointer"
            }`}
          >
            <input
              id="Toggle3"
              type="checkbox"
              name="availability"
              checked={formik.values.availability}
              disabled={!isEditable}
              onChange={(e) =>
                formik.setFieldValue("availability", e.target.checked)
              }
              className="hidden peer"
            />
            <span className="px-4 py-2 rounded-l-lg bg-gray-300 text-black peer-checked:text-white peer-checked:bg-black">
              Available
            </span>
            <span className="px-4 py-2 rounded-r-lg bg-black text-white peer-checked:text-black peer-checked:bg-gray-300">
              Unavailable
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
