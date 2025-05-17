"use client";

import { FaSearch, FaShoppingCart, FaHeart } from "react-icons/fa";
import Link from "next/link";
import LocationSelector from "@/app/component/layout/LocationSelector";
import ProfileMenu from "@/app/component/layout/ProfileMenu";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full flex items-center justify-between px-6 py-3 shadow-sm border-b bg-blue-30">
      {/* Logo and Navigation */}
      <div className="flex items-center gap-8">
        <Link href="/pages/landingpage">
          <span className="text-3xl font-bold flex items-center px-2">
            <span className="text-blue-700">Virtual</span>
            <span className="text-black">City</span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-4 text-base font-medium">
          {[
            { href: "/pages/landingpage", label: "Home" },
            { href: "/pages/about", label: "About" },
            { href: "/pages/blog", label: "Blog" },
            { href: "/pages/contact", label: "Contact" },
          ].map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-full  font-medium transition ${
                  isActive
                    ? "bg-gray-100 text-gray-700 "
                    : "bg-white text-blue-800  hover:bg-gray-100"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
      {/* Search */}
      <div className="flex items-center gap-4 flex-grow max-w-md mx-auto">
        <input
          type="text"
          placeholder=" Search..."
          className="w-full border border-gray-500 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="text-gray-600 hover:text-blue-600">
          <FaSearch />
        </button>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-10">
        {/* Location Button */}
        <LocationSelector />

        {/* Icons */}
        <div className="flex items-center gap-8 text-gray-700">
          {/* Cart */}
          <div className="relative flex items-center  hover:text-blue-600">
            <button
              onClick={() => console.log("Cart icon clicked")}
              className="flex items-center focus:outline-none"
            >
              <FaShoppingCart />
            </button>
          </div>

          {/* Favorites */}
          <div className="relative flex items-center  hover:text-red-600">
            <button
              onClick={() => console.log("Favorites icon clicked")}
              className="flex items-center focus:outline-none"
            >
              <FaHeart />
            </button>
          </div>
        </div>

        {/* Profile */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <div className="flex items-center gap-2">
            {/* Your profile dropdown menu */}
            <ProfileMenu />

            {/* Text */}
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-black ">
                Hi..User
              </span>
              <span className="text-sm font-bold text-black">
                Account
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;