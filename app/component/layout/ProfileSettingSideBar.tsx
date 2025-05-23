"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarMenu: React.FC = () => {
  const pathname = usePathname();

  // Helper to check if link is active
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="bg-white rounded-lg shadow p-6 w-64">
      {/* Manage My Account Section */}
      <div className="mb-6">
        <h3 className="text-teal-600 font-semibold mb-2">Manage My Account</h3>
        <ul className="text-gray-600 space-y-1">
          <li>
            <Link
              href="/pages/myprofile"
              className={`block px-3 py-2 rounded ${
                isActive("/pages/myprofile")
                  ? "text-white bg-teal-600 font-semibold"
                  : "hover:text-teal-600"
              }`}
            >
              My Profile
            </Link>
          </li>
          <li>
            <Link
              href="/pages/setting/AddressBook"
              className={`block px-3 py-2 rounded ${
                isActive("/pages/setting/AddressBook")
                  ? "text-white bg-teal-600 font-semibold"
                  : "hover:text-teal-600"
              }`}
            >
              Address Book
            </Link>
          </li>
          <li>
            <Link
              href="/account/payment-options"
              className={`block px-3 py-2 rounded ${
                isActive("/account/payment-options")
                  ? "text-white bg-teal-600 font-semibold"
                  : "hover:text-teal-600"
              }`}
            >
              My Payment Options
            </Link>
          </li>
          <li>
            <Link
              href="/account/points"
              className={`block px-3 py-2 rounded ${
                isActive("/account/points")
                  ? "text-white bg-teal-600 font-semibold"
                  : "hover:text-teal-600"
              }`}
            >
              Points
            </Link>
          </li>
        </ul>
      </div>

      {/* My Orders Section */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">My Orders</h3>
        <ul className="text-gray-600 space-y-1">
          <li>
            <Link
              href="/orders/returns"
              className={`block px-3 py-2 rounded ${
                isActive("/orders/returns")
                  ? "text-white bg-teal-600 font-semibold"
                  : "hover:text-teal-600"
              }`}
            >
              My Returns
            </Link>
          </li>
          <li>
            <Link
              href="/orders/cancellations"
              className={`block px-3 py-2 rounded ${
                isActive("/orders/cancellations")
                  ? "text-white bg-teal-600 font-semibold"
                  : "hover:text-teal-600"
              }`}
            >
              My Cancellations
            </Link>
          </li>
        </ul>
      </div>

      {/* My Reviews Section */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">
          <Link
            href="/reviews"
            className={`hover:text-teal-600 px-3 py-2 rounded block ${
              isActive("/reviews") ? "text-white bg-teal-600 font-semibold" : ""
            }`}
          >
            My Reviews
          </Link>
        </h3>
      </div>

      {/* My Wishlist & Followed Stores */}
      <div>
        <h3 className="font-bold mb-2">
          <Link
            href="/wishlist"
            className={`hover:text-teal-600 px-3 py-2 rounded block ${
              isActive("/wishlist")
                ? "text-white bg-teal-600 font-semibold"
                : ""
            }`}
          >
            My Wishlist &amp; Followed Stores
          </Link>
        </h3>
      </div>
    </nav>
  );
};

export default SidebarMenu;
