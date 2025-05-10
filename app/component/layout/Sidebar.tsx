"use client";
import { useState } from "react";
import { FaStore } from "react-icons/fa";
import { FiShoppingCart, FiTruck, FiList, FiStar, FiTag } from "react-icons/fi";

const sidebarItems = [
  { id: "all", icon: <FaStore />, label: "All Shops" },
  { id: "grocery", icon: <FiShoppingCart />, label: "Grocery Stores" },
  { id: "delivery", icon: <FiTruck />, label: "Delivery Services" },
  { id: "categories", icon: <FiList />, label: "Categories" },
  { id: "favorites", icon: <FiStar />, label: "Favorites" },
  { id: "discounts", icon: <FiTag />, label: "Discounts" },
];

const Sidebar = () => {
  const [active, setActive] = useState<string>("all");

  return (
    <div className="w-16 md:w-20 lg:w-24 min-h-screen bg-white shadow-lg flex flex-col items-center py-6 space-y-6">
      {sidebarItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300
            ${
              active === item.id
                ? "bg-blue-700 text-white"
                : "text-blue-700 hover:bg-blue-100"
            }`}
          title={item.label} // Tooltip on hover
        >
          <span className="text-2xl">{item.icon}</span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
