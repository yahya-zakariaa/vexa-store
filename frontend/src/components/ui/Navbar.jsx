"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { usePathname } from "next/navigation";
import ToggleMode from "./ToggleMode";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getCart } from "@/queries/cart.queries";
import { useQuery } from "@tanstack/react-query";
import { Minus, X, Plus, Search, Menu, User, ShoppingCart } from "lucide-react";
import { Input } from "./input";
import { useSearchProducts } from "@/mutations/product.mutations";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";
const unProtectedRoutes = [
  "/account/login",
  "/account/create",
  "/account/recovery",
  "/account/recovery/reset-password",
];

const unVisibleNavRoutes = ["product", "collection", "collections"];

const navLinks = [
  { title: "HOME", href: "/" },
  { title: "NEWS", href: "/news" },
  { title: "SHOP", href: "/shop" },
  { title: "ACCESSORIES", href: "/accessories" },
  { title: "SALE", href: "/sale" },
  { title: "CONTACT US", href: "/contact" },
];

const getPageType = (pathname) => {
  if (/^\/collections\/[^/]+\/[^/]+\/?$/.test(pathname)) {
    return "product";
  } else if (/^\/collections\/[^/]+\/?$/.test(pathname)) {
    return "collection";
  } else if (/^\/collections\/?$/.test(pathname)) {
    return "collections";
  } else {
    return "other";
  }
};

export default function Navbar() {
  const pathname = usePathname();
  const [atTop, setAtTop] = useState(true);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [showBottom, setShowBottom] = useState(false);
  const [showBottomManual, setShowBottomManual] = useState(false);
  const pageType = getPageType(pathname);
  const isNavBar = unVisibleNavRoutes.includes(pageType);
  const lastScrollY = useRef(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const {
    data: cart = { items: [], totalItems: 0, totalPrice: 0 },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
    onError: (error) => {
      console.log("error from component:", error);
      toast.error(
        error?.message || "An error occurred while fetching products."
      );
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  const { mutate: searchProducts, isPending: isSearching } =
    useSearchProducts();

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 20) {
        setAtTop(true);
        setNavbarVisible(true);
        if (!isNavBar) {
          setShowBottom(true);
        }
        return;
      }

      setAtTop(false);
      if (Math.abs(currentScrollY - lastScrollY.current) > 50) {
        if (currentScrollY > lastScrollY.current) {
          setNavbarVisible(false);
        } else {
          setNavbarVisible(true);
        }
        lastScrollY.current = currentScrollY;
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      lastScrollY.current = window.scrollY;
      if (isNavBar) {
        setShowBottom(false);
      } else {
        setShowBottom(true);
      }
      if (typeof window !== "undefined") {
        window.addEventListener("scroll", handleScroll);
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isNavBar]);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      searchProducts(debouncedSearch, {
        onSuccess: (data) => {
          console.log("Search results:", data);
          setSearchedProducts(data || []);
        },
        onError: (error) => {
          console.error("Error searching products:", error);
          toast.error("Failed to search products");
        },
      });
    } else {
      setSearchedProducts([]);
    }
  }, [debouncedSearch, searchProducts]);

  if (unProtectedRoutes.includes(pathname)) return null;

  return (
    <nav
      className={`w-full fixed z-[9999] left-0 main-navbar ${
        navbarVisible ? "top-0" : "top-[-300px]"
      } transition-all duration-500 ease-in-out ${
        !atTop
          ? "shadow-lg bg-white shadow-black/10 dark:shadow-black/30  dark:bg-[#09090B]"
          : ""
      }`}
    >
      {atTop && !isNavBar && (
        <Marquee
          className="py-2.5 bg-white dark:bg-[#09090b]"
          pauseOnHover={true}
          speed={80}
        >
          <div className="flex justify-between items-center gap-20 px-10">
            {[...Array(4)].map((_, i) => (
              <p
                key={i}
                className="dark:text-[#fff] text-black text-[14px] tracking-widest font-medium"
              >
                GET 20% OFF ON ORDERS OVER 1000 EGP
              </p>
            ))}
          </div>
        </Marquee>
      )}

      <div className="nav w-full">
        {/* Desktop Navigation */}
        <div className="container lg:flex flex-col hidden gap-5 w-full items-center justify-center py-2 mx-auto">
          <div className="top flex justify-between w-full items-center">
            <div className="flex items-center justify-start gap-5 w-[100px] flex-0">
              {((!atTop && !isNavBar) || isNavBar) && (
                <button
                  onClick={() => {
                    setShowBottomManual(!showBottomManual);
                    setShowBottom(!showBottom);
                  }}
                  className="dark:text-[#eee] text-[#000] hover:text-gray-500 dark:hover:text-gray-300 transition-all"
                  aria-label="Toggle menu"
                >
                  {showBottom ? <X size={24} /> : <Menu size={24} />}
                </button>
              )}

              <Link
                className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-all"
                href={"/account/login"}
                aria-label="Account"
              >
                <User size={24} />
              </Link>

              <Sheet
                onOpenChange={() => {
                  setSearchQuery("");
                  setSearchedProducts([]);
                }}
              >
                <SheetTrigger className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-all">
                  <Search size={24} />
                </SheetTrigger>
                <SheetContent
                  side="top"
                  className="flex flex-col items-start justify-start "
                >
                  <SheetHeader className={"w-full"}>
                    <SheetTitle className="flex border-b  w-full py-4 items-center">
                      <h2 className="text-xl tracking-widest">SEARCH</h2>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="py-5 w-full flex items-center justify-center">
                    <div className="searchBar px-2 relative w-full flex items-center justify-center">
                      <Input
                        className="w-[100%]"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search"
                      />
                      {searchQuery &&
                        (!isSearching ? (
                          <button
                            className="absolute right-[1.5%]"
                            onClick={() => {
                              setSearchQuery("");
                              setSearchedProducts([]);
                            }}
                          >
                            CLEAR
                          </button>
                        ) : (
                          <span className="absolute right-[1.5%] text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-width="2"
                                d="M12 6.99998C9.1747 6.99987 6.99997 9.24998 7 12C7.00003 14.55 9.02119 17 12 17C14.7712 17 17 14.75 17 12"
                              >
                                <animateTransform
                                  attributeName="transform"
                                  attributeType="XML"
                                  dur="560ms"
                                  from="0,12,12"
                                  repeatCount="indefinite"
                                  to="360,12,12"
                                  type="rotate"
                                />
                              </path>
                            </svg>
                          </span>
                        ))}
                    </div>
                  </div>

                  {searchedProducts.length > 0 && !isSearching && (
                    <div className="w-full  pb-4">
                      <h3 className="font-medium mb-2 px-2">
                        Results ({searchedProducts.length})
                      </h3>
                      <div className="grid gap-2">
                        {searchedProducts.map((product) => (
                          <Link
                            key={product.id}
                            href={`/collections/${product.collection}/${product._id}`}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                            onClick={() => setSearchQuery("")}
                          >
                            {product.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </div>

            <Link
              href="/"
              className="text-[34px] mx-5 font-bold dark:text-[#eee] text-black tracking-widest hover:opacity-80 transition-all"
            >
              VEXA
            </Link>

            <div className="flex items-center justify-end gap-5 w-[100px] flex-0">
              <Sheet>
                <SheetTrigger className="p-2 relative hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-all">
                  <ShoppingCart size={24} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart?.totalItems || 0}
                  </span>
                </SheetTrigger>
                <SheetContent className="flex flex-col items-start justify-start">
                  <SheetHeader>
                    <SheetTitle className="flex border-b px-6 py-4 w-full items-center">
                      <span className="text-xl tracking-widest">CART</span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="body px-6 flex-1 divide-y divide-gray-300 dark:divide-white/20 flex flex-col items-center w-full overflow-auto max-h-[350px] py-3">
                    {cart?.items?.length > 0 ? (
                      cart.items.map((item) => (
                        <div
                          key={item.productId}
                          className="flex items-start w-full py-4"
                        >
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1 ml-3 flex flex-col justify-between h-full">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-sm font-semibold">
                                  {item.name}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Size: {item.size || "N/A"}
                                </p>
                              </div>
                              <button className="text-gray-500 hover:text-gray-700">
                                <X size={16} />
                              </button>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center border rounded-md">
                                <button className="p-1">
                                  <Minus size={14} />
                                </button>
                                <span className="px-2 text-sm">
                                  {item.quantity}
                                </span>
                                <button className="p-1">
                                  <Plus size={14} />
                                </button>
                              </div>
                              <span className="text-md font-medium">
                                LE {item.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-8">
                        Your cart is empty.
                      </p>
                    )}
                  </div>
                  {cart?.items?.length > 0 && (
                    <div className="border-t px-6 py-4 w-full">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-medium">Subtotal:</span>
                        <span className="font-medium">
                          LE {cart?.totalPrice || 0}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Tax included. Shipping calculated at checkout.
                      </p>
                      <Link
                        href="/checkout"
                        className="block w-full text-center bg-black dark:bg-white text-white dark:text-black py-2.5 font-medium tracking-wider transition-all hover:opacity-90"
                      >
                        CHECK OUT
                      </Link>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
              <div className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-all">
                <ToggleMode />
              </div>
            </div>
          </div>

          {(showBottomManual || (atTop && !isNavBar)) && (
            <div className="bottom w-full mb-2">
              <div className="links lg:flex hidden items-center justify-center mx-auto">
                <ul className="flex justify-start items-center gap-8 w-fit">
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="dark:text-[#eee] text-[#000] transition-all duration-300 font-medium tracking-wider text-sm uppercase py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="container lg:hidden flex gap-5 items-center justify-between py-3 px-2 rounded-full w-[90%] md:w-[80%] mx-auto">
          <div className="top flex items-center justify-between w-full">
            <div className="menu flex items-center justify-start md:gap-5 gap-6 w-[100px] flex-0">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="dark:text-[#eee] text-[#000] hover:text-gray-500 dark:hover:text-gray-300 transition-all"
                aria-label="Menu"
              >
                <Menu size={24} />
              </button>

              <Sheet
                onOpenChange={() => {
                  setSearchQuery("");
                  setSearchedProducts([]);
                }}
              >
                <SheetTrigger className="dark:text-[#eee] text-[#000] hover:text-gray-500 dark:hover:text-gray-300 transition-all">
                  <Search size={24} />
                </SheetTrigger>
                <SheetContent side="top">
                  <SheetHeader>
                    <SheetTitle className="border-b px-6 py-4">
                      SEARCH
                    </SheetTitle>
                  </SheetHeader>
                  <div className="py-4">
                    <div className="py-5 w-full flex items-center justify-center">
                      <div className="searchBar  relative w-full flex items-center justify-center">
                        <Input
                          className="w-[100%]"
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search"
                        />
                        {searchQuery &&
                          (!isSearching ? (
                            <button
                              className="absolute right-[3%] text-sm"
                              onClick={() => {
                                setSearchQuery("");
                                setSearchedProducts([]);
                              }}
                            >
                              CLEAR
                            </button>
                          ) : (
                            <span className="absolute right-[3%] text-gray-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-width="2"
                                  d="M12 6.99998C9.1747 6.99987 6.99997 9.24998 7 12C7.00003 14.55 9.02119 17 12 17C14.7712 17 17 14.75 17 12"
                                >
                                  <animateTransform
                                    attributeName="transform"
                                    attributeType="XML"
                                    dur="560ms"
                                    from="0,12,12"
                                    repeatCount="indefinite"
                                    to="360,12,12"
                                    type="rotate"
                                  />
                                </path>
                              </svg>
                            </span>
                          ))}
                      </div>
                    </div>

                    {searchedProducts.length > 0 && !isSearching && (
                      <div className="mt-4">
                        <h3 className="font-medium mb-3  ">
                          Results ({searchedProducts.length})
                        </h3>
                        <div className="grid divide-y divide-gray-300 dark:divide-white/20 w-full">
                          {searchedProducts.map((product) => (
                            <Link
                              key={product.id}
                              href={`collections/${product.collection}/${product._id}`}
                              className="px-2 py-4 hover:bg-gray-100 dark:hover:bg-white/10 "
                              onClick={() => setSearchQuery("")}
                            >
                              {product.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <Link
              href="/"
              className="md:text-[34px] text-[30px] max-[350px]:text-[25px] font-bold dark:text-[#eee] text-black tracking-widest"
            >
              VEXA
            </Link>

            <div className="cart-account flex items-center justify-end md:gap-5 gap-6 w-[100px] flex-0">
              <Sheet>
                <SheetTrigger className="p-2 relative hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-all">
                  <ShoppingCart size={24} />
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart?.totalItems || 0}
                  </span>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="border-b px-6 py-4">CART</SheetTitle>
                  </SheetHeader>
                  <div className="p-4 overflow-auto max-h-[60vh]">
                    {cart?.items?.length > 0 ? (
                      cart.items.map((item) => (
                        <div
                          key={item.productId}
                          className="flex items-start py-4 border-b"
                        >
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1 ml-3">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-sm font-semibold">
                                  {item.name}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Size: {item.size || "N/A"}
                                </p>
                              </div>
                              <button className="text-gray-500 hover:text-gray-700">
                                <X size={16} />
                              </button>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center border rounded-md">
                                <button className="p-1">
                                  <Minus size={14} />
                                </button>
                                <span className="px-2 text-sm">
                                  {item.quantity}
                                </span>
                                <button className="p-1">
                                  <Plus size={14} />
                                </button>
                              </div>
                              <span className="text-md font-medium">
                                LE {item.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-8">
                        Your cart is empty.
                      </p>
                    )}
                  </div>
                  {cart?.items?.length > 0 && (
                    <div className="border-t p-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-medium">Subtotal:</span>
                        <span className="font-medium">
                          LE {cart?.totalPrice || 0}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Tax included. Shipping calculated at checkout.
                      </p>
                      <Link
                        href="/checkout"
                        className="block w-full text-center bg-black dark:bg-white text-white dark:text-black py-2.5 font-medium tracking-wider transition-all hover:opacity-90"
                      >
                        CHECK OUT
                      </Link>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
              <div className="dark:text-[#eee] text-[#000] hover:text-gray-500 dark:hover:text-gray-300 transition-all mt-1.5">
                <ToggleMode />
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Menu Sheet */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="border-b px-6 py-4">MENU</SheetTitle>
            </SheetHeader>
            <div className="py-">
              <ul className="divide-y divide-gray-300 dark:divide-white/20">
                {navLinks.map((link, index) => (
                  <li
                    key={index}
                    className=" hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
                  >
                    <Link
                      href={link.href}
                      className="block py-4 px-2 text-lg font-medium "
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/account/login"
                    className="  py-4 px-2 text-lg font-medium flex gap-2 items-center "
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User size={24} /> LOGIN
                  </Link>
                </li>
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
