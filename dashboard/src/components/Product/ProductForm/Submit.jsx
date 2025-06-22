import React from "react";

export default function Submit({ status, isEditable, setIsEditable, formik }) {
  return (
    <nav className="w-full px-4 ">
      <div className="container  w-full flex items-center justify-between">
        <div className="flex items-center gap-1.5 px-1">
          {status === "create" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10.5V15c0 2.828 0 4.243.879 5.121C4.757 21 6.172 21 9 21h3.5M21 10.5v2M7 17h4m4 1.5h7M18.5 22v-7m-.705-12.997L6.149 2.03c-1.738-.085-2.184 1.182-2.184 1.8c0 .554-.075 1.361-1.14 2.878c-1.066 1.517-.986 1.967-.385 3.017c.498.872 1.766 1.212 2.428 1.27A2.976 2.976 0 0 0 7.99 8.118c1.042 3.03 4.005 3.03 5.325 2.684c1.323-.348 2.456-1.59 2.723-2.684c.156 1.36.63 2.153 2.027 2.698c1.448.564 2.694-.299 3.319-.852s1.026-1.781-.088-3.131c-.768-.931-1.089-1.808-1.194-2.717c-.06-.527-.114-1.093-.506-1.453c-.572-.526-1.393-.686-1.801-.66"
                color="currentColor"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
              </g>
            </svg>
          )}
          <h1 className="font-medium md:text-2xl text-lg mt-[-3px]">
            {status === "create" ? "New Product" : "Edit Product"}
          </h1>
        </div>
        <div className={`flex items-center md:gap-5 gap-3 `}>
          {status === "create" ? (
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="md:px-6 px-4 py-2.5 cursor-pointer bg-[#111111] font-medium rounded-full text-[14px] tracking-wider text-white"
            >
              Add Product
            </button>
          ) : (
            <>
              {isEditable ? (
                <>
                  <button
                    type="submit"
                    disabled={!isEditable || formik.isSubmitting}
                    className="md:px-6 px-4 cursor-pointer py-2.5 bg-[#111111] font-medium text-nowrap rounded-full text-[14px] tracking-wider text-white"
                  >
                    Save changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditable(false)}
                    className="md:px-6 p-2.5 md:py-2.5 cursor-pointer bg-[#111111] font-medium rounded-full text-[14px] tracking-wider text-white"
                  >
                    <span className="span flex items-center gap-2">
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          >
                            <path d="M21.544 11.045c.304.426.456.64.456.955c0 .316-.152.529-.456.955C20.178 14.871 16.689 19 12 19c-4.69 0-8.178-4.13-9.544-6.045C2.152 12.529 2 12.315 2 12c0-.316.152-.529.456-.955C3.822 9.129 7.311 5 12 5c4.69 0 8.178 4.13 9.544 6.045" />
                            <path d="M15 12a3 3 0 1 0-6 0a3 3 0 0 0 6 0" />
                          </g>
                        </svg>
                        <span className="md:inline-block hidden">View</span>
                      </>
                    </span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditable(!isEditable)}
                  className="md:px-6 p-2.5 md:py-2.5 cursor-pointer bg-[#111111] font-medium rounded-full text-[14px] tracking-wider text-white"
                >
                  <span className="span flex items-center gap-2">
                    {isEditable ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          >
                            <path d="M21.544 11.045c.304.426.456.64.456.955c0 .316-.152.529-.456.955C20.178 14.871 16.689 19 12 19c-4.69 0-8.178-4.13-9.544-6.045C2.152 12.529 2 12.315 2 12c0-.316.152-.529.456-.955C3.822 9.129 7.311 5 12 5c4.69 0 8.178 4.13 9.544 6.045" />
                            <path d="M15 12a3 3 0 1 0-6 0a3 3 0 0 0 6 0" />
                          </g>
                        </svg>
                        <span className="md:inline-block hidden">View</span>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          >
                            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                          </g>
                        </svg>
                        <span className="md:inline-block hidden">Edit</span>
                      </>
                    )}
                  </span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
