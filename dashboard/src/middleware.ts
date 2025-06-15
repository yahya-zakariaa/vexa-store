import { NextResponse } from "next/server";

export default function middleware(req) {
  const url = req.nextUrl;

  const token = req.cookies.get("TOKEN");
  // if (!token && url.pathname !== "/") {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  return NextResponse.next(); 
}


export const config = {
  matcher: ["/dashboard/:path*"],
};
