"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaTimes, FaFilter } from "react-icons/fa";

const filterOptions = [
  {
    title: "Shops",
    options: ["Top Rated", "Ratings", "Authorized Seller", "Brand"],
  },
  {
    title: "Categories",
    options: [
      "Main Categories",
      "Fruits & Vegetables",
      "Dairy & Eggs",
      "Meat & Seafood",
      "Bakery & Snacks",
      "Beverages",
      "Frozen Foods",
      "Grains & Pulses",
      "Spices & Condiments",
      "Personal Care & Hygiene",
      "Household Essentials",
    ],
  },
  { title: "Delivery", options: ["Delivery", "Takeaway"] },
  {
    title: "Type",
    options: [
      "Supermart",
      "Local Grocery Store",
      "Organic Store",
      "Wholesale Market",
    ],
  },
  { title: "Ratings", options: ["Above 1", "Above 2", "Above 3", "Above 4"] },
  { title: "Status", options: ["Open", "Closed"] },
  { title: "Offers", options: ["Seasonal Offers", "Special Offers"] },
  { title: "Others", options: ["Best Sellers", "New Arrivals"] },
];

export default function ShopFilter() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      const expandedSections = filterOptions.reduce(
        (acc, filter) => ({ ...acc, [filter.title]: true }),
        {}
      );
      setOpenSections(expandedSections);
    } else {
      setOpenSections({});
    }
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div>
      {/* Mobile Filter Icon */}
      <button
        className="lg:hidden fixed top-4 right-4 bg-gray-200 text-gray-800 p-3 rounded-full shadow-lg z-50"
        onClick={() => setIsMobileFilterOpen(true)}
      >
        <FaFilter size={20} />
      </button>

      {/* Sidebar Filter */}
      <div
        className={`w-full h-auto max-w-xs md:max-w-sm lg:max-w-md bg-white shadow-lg rounded-lg p-5 ${
          isMobileFilterOpen
            ? "fixed inset-0 z-50 w-full bg-white"
            : "hidden lg:block"
        }`}
      >
        {/* Mobile Close Button */}
        {isMobileFilterOpen && (
          <button
            className="absolute top-4 right-4 text-gray-600 text-xl"
            onClick={() => setIsMobileFilterOpen(false)}
          >
            <FaTimes />
          </button>
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Filter</h2>
          <button
            className="text-blue-600 text-sm font-semibold flex items-center"
            onClick={toggleExpand}
          >
            {isExpanded ? "Collapse All" : "Expand All"}
            {isExpanded ? (
              <FaTimes className="ml-2" />
            ) : (
              <FaChevronDown className="ml-2" />
            )}
          </button>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          {filterOptions.map((filter, index) => (
            <div key={index} className="mb-3">
              {/* Section Header */}
              <div
                className="flex justify-between items-center cursor-pointer py-2 border-b"
                onClick={() => toggleSection(filter.title)}
              >
                <h3 className="text-md font-semibold">{filter.title}</h3>
                {openSections[filter.title] ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </div>

              {/* Section Options */}
              {openSections[filter.title] && (
                <div className="mt-2 space-y-2 pl-4">
                  {filter.options.map((option, idx) => (
                    <label key={idx} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-00 rounded focus:ring-blue-900 checked:bg-blue-600 checked:border-transparent"
                      />
                      <span className="text-gray-700 text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button className="border border-blue-600 text-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-purple-100 transition">
            Reset
          </button>
          <button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Show Result
          </button>
        </div>
      </div>
    </div>
  );
}
