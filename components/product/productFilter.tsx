"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import { Range } from "react-range";

const filterOptions = [
    { title: "Categories", options: ["Main Categories", "Fruits & Vegetables", "Dairy & Eggs", "Meat & Seafood", "Bakery & Snacks", "Beverages", "Frozen Foods", "Grains & Pulses", "Spices & Condiments", "Personal care & Hygiene", "Household Essentials"] },
    { title: "Delivery", options: ["Free Delivery"] },
    { title: "Price & Discount", options: ["Discount", "Special Discount", "Today only"] },
    { title: "Ratings", options: ["Above 1", "Above 2", "Above 3", "Above 4"] },
    { title: "Product Status", options: ["In Stock", "Out of Stock"] },
    { title: "Special Dietary", options: ["Organic", "Halal Certified", "Sugar Free", "Gluten Free", "Vegetarians"] }
];

export default function ProductFilter() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
    const [priceRange, setPriceRange] = useState([1500, 40000]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        if (!isExpanded) {
            const expandedSections = filterOptions.reduce((acc, filter) => ({ ...acc, [filter.title]: true }), {});
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
        <div className="w-full bg-white shadow-lg rounded-lg p-5 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Filter</h2>
                <button className="text-blue-600 text-sm font-semibold flex items-center" onClick={toggleExpand}>
                    {isExpanded ? "Collapse All" : "Expand All"}
                    {isExpanded ? <FaTimes className="ml-2" /> : <FaChevronDown className="ml-2" />}
                </button>
            </div>

            {/* Full Height Filters */}
            <div className="flex-grow">
                {filterOptions.map((filter, index) => (
                    <div key={index} className="mb-3">
                        {/* Section Header */}
                        <div 
                            className="flex justify-between items-center cursor-pointer py-2 border-b" 
                            onClick={() => toggleSection(filter.title)}
                        >
                            <h3 className="text-md font-semibold">{filter.title}</h3>
                            {openSections[filter.title] ? <FaChevronUp /> : <FaChevronDown />}
                        </div>

                        {/* Section Options */}
                        {openSections[filter.title] && (
                            <div className="mt-2 space-y-2 pl-4">
                                {filter.title === "Price & Discount" ? (
                                    // Price Range Slider
                                    // Price Range Slider
<div className="pt-2">
    <Range
        step={100}
        min={1000}
        max={50000}
        values={priceRange}
        onChange={(values) => setPriceRange(values)}
        renderTrack={({ props, children }) => {
            const min = 1000;
            const max = 50000;
            const left = ((priceRange[0] - min) / (max - min)) * 100;
            const right = ((priceRange[1] - min) / (max - min)) * 100;

            return (
                <div {...props} className="w-full h-2 bg-gray-300 rounded-md relative">
                    {/* Active range (blue line) */}
                    <div
                        className="absolute h-2 bg-blue-600 rounded-md"
                        style={{
                            left: `${left}%`,
                            right: `${100 - right}%`,
                        }}
                    />
                    {children}
                </div>
            );
        }}
        renderThumb={({ props }) => (
            <div {...props} className="w-4 h-4 bg-blue-600 rounded-full shadow-md cursor-pointer" />
        )}
    />
    <div className="flex justify-between text-xs text-gray-600 mt-2">
        <span>Rs.{priceRange[0].toLocaleString()}</span>
        <span>Rs.{priceRange[1].toLocaleString()}</span>
    </div>
</div>

                                ) : (
                                    // Normal Checkbox Filters
                                    filter.options.map((option, idx) => (
                                        <label key={idx} className="flex items-center space-x-2">
                                            <input type="checkbox" className="w-4 h-4 text-blue-600" />
                                            <span className="text-gray-700 text-sm">{option}</span>
                                        </label>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-between">
                <button className="border border-blue-600 text-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-blue-100 transition">
                    Reset
                </button>
                <button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    Show Result
                </button>
            </div>
        </div>
    );
}
