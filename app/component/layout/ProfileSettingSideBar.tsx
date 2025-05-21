import React from "react";
import Link from "next/link";

const SidebarMenu: React.FC = () => {
  return (
    <nav className="bg-white rounded-lg shadow p-6 w-64">
      {/* Manage My Account Section */}
      <div className="mb-6">
        <h3 className="text-teal-600 font-semibold mb-2">Manage My Account</h3>
        <ul className="text-gray-600 space-y-1">
          <li>
            <Link href="/account/profile" className="hover:text-teal-600 block">
              My Profile
            </Link>
          </li>
          <li>
            <Link
              href="/account/address-book"
              className="hover:text-teal-600 block"
            >
              Address Book
            </Link>
          </li>
          <li>
            <Link
              href="/account/payment-options"
              className="hover:text-teal-600 block"
            >
              My Payment Options
            </Link>
          </li>
          <li>
            <Link href="/account/points" className="hover:text-teal-600 block">
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
            <Link href="/orders/returns" className="hover:text-teal-600 block">
              My Returns
            </Link>
          </li>
          <li>
            <Link
              href="/orders/cancellations"
              className="hover:text-teal-600 block"
            >
              My Cancellations
            </Link>
          </li>
        </ul>
      </div>

      {/* My Reviews Section */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">
          <Link href="/reviews" className="hover:text-teal-600">
            My Reviews
          </Link>
        </h3>
      </div>

      {/* My Wishlist & Followed Stores */}
      <div>
        <h3 className="font-bold mb-2">
          <Link href="/wishlist" className="hover:text-teal-600">
            My Wishlist &amp; Followed Stores
          </Link>
        </h3>
      </div>
    </nav>
  );
};

export default SidebarMenu;