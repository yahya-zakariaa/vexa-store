"use client";
import ResetPassword from "@/components/auth/recovery/ResetPassword";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ToggleMode from "@/components/ui/ToggleMode";
import { useRouter } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const userEmail = searchParams.get("email");
  const router = useRouter();
  useEffect(() => {
    if (!userEmail) router.push("/account/login");
  }, []);
  return (
    <section className="signup overflow-hidden h-screen ">
      <nav className="flex items-center   md:px-10 py-3 bg-[#eeeeee91] border-b border-[#ccc] backdrop-blur-md dark:bg-[#35353573] dark:border-[#9994] fixed w-full top-0 left-0 ">
        <div className="containerr flex items-center justify-between  w-[90%] md:w-full  mx-auto">
          <h1 className="text-[28px] font-bold tracking-wider">
            VEXA<span className="font-medium text-[20px] ms-[3px]">Store</span>
          </h1>
          <ToggleMode />
        </div>
      </nav>
      <div className="container w-[90%] flex items-center justify-center md:w-[50%]  mx-auto  min-h-screen pb-10 pt-20 md:pt-32 ">
        <ResetPassword userEmail={userEmail} />
      </div>
    </section>
  );
}
