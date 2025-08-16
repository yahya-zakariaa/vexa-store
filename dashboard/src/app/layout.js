"use client";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
