"use client";

import { FaSearch, FaShoppingCart, FaHeart } from "react-icons/fa";
import Link from "next/link";
import LocationSelector from "@/app/component/layout/LocationSelector";
import ProfileMenu from "@/app/component/layout/ProfileMenu";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false); // State to manage dropdown menu visibility

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
        <nav className="hidden md:flex gap-4 text-gray-700 text-base font-medium">
          <Link
            href="/pages/landingpage"
            className="px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/pages/about"
            className="px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/pages/blog"
            className="px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
          >
            Blog
          </Link>
          <Link
            href="/pages/contact"
            className="px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
          >
            Contact
          </Link>
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
              <span className="text-sm font-semibold text-black hover:underline">
                Hi..User
              </span>
              <span className="text-sm font-bold text-black hover:underline">
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
