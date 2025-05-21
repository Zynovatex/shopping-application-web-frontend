"use client";
import { useState } from "react";

import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaBars,
} from "react-icons/fa";
import Link from "next/link";
import LocationSelector from "@/app/component/layout/LocationSelector";
import ProfileMenu1 from "@/app/component/layout/ProfileMenu1";
import router from "next/router";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false); // for mobile nav toggle


  return (
    <header className="w-full px-4 py-3 shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Left: Logo & Nav */}
        <div className="flex items-center gap-4">
          <Link href="/pages/landingpage">
            <span className="text-2xl font-bold flex items-center text-blue-700">
              Virtual <span className="text-black ml-1">City</span>
            </span>
          </Link>

          {/* Hamburger for mobile */}
          <button
            className="md:hidden text-gray-700 text-xl ml-4"
            onClick={() => setNavOpen(!navOpen)}
          >
            <FaBars />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4 text-gray-700 text-base font-medium ml-8">
            <Link
              href="/pages/landingpage"
              className="px-3 py-2 rounded hover:bg-gray-100"
            >
              Home
            </Link>
            <Link
              href="/pages/about"
              className="px-3 py-2 rounded hover:bg-gray-100"
            >
              About
            </Link>
            <Link
              href="/pages/blog"
              className="px-3 py-2 rounded hover:bg-gray-100"
            >
              Blog
            </Link>
            <Link
              href="/pages/contact"
              className="px-3 py-2 rounded hover:bg-gray-100"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden lg:flex flex-grow max-w-md mx-6 items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="text-gray-600 hover:text-blue-600">
            <FaSearch />
          </button>
        </div>

        {/* Right: Location, Icons, Profile */}
        <div className="flex items-center gap-4">
          <LocationSelector />

          <div className="flex items-center gap-4 text-gray-700">
            {/* Cart */}
          <button
             
              onClick={() => router.push("/auth/login")}
              className="flex items-center focus:outline-none"
            >
              <FaShoppingCart />
            </button>

            {/* Favorites */}
            <button
              onClick={() => console.log("Favorites icon clicked")}
              className="hover:text-red-600"
            >
              <FaHeart />
            </button>

            {/* Profile */}
            <div
              className="flex items-center gap-2 cursor-pointer relative"
              onClick={() => setOpen(!open)}
            >
              <ProfileMenu1 open={open} setOpen={setOpen} />
              <FaUser className="text-xl text-black" />
              <span className="text-sm font-semibold text-black hover:underline hover:text-blue-600 hidden sm:block">
                Sign in / Register
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Links */}
      {navOpen && (
        <div className="md:hidden mt-4 space-y-2 text-sm text-gray-700">
          <Link
            href="/pages/landingpage"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            Home
          </Link>
          <Link
            href="/pages/about"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            About
          </Link>
          <Link
            href="/pages/blog"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            Blog
          </Link>
          <Link
            href="/pages/contact"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
