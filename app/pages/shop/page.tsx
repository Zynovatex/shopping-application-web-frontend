'use client';
import { useState } from "react";
import ShopCard from "@/components/shop/shopCard";
import Pagination from "@/components/layout/Pagination";

const sampleShops = [
  { id: 1, name: "Shop Name", image: "/shopcard/bakery.jpg", category: "Bakery", rating: 4.5, isOpen: false, isTopRated: true, isFavorite: false },
  { id: 2, name: "Shop Name", image: "/shopcard/Coffe.jpg", category: "Coffee", rating: 3.6, isOpen: true, isTopRated: false, isFavorite: true },
  { id: 3, name: "Shop Name", image: "/shopcard/bevarage.jpg", category: "Baverages", rating: 4.5, isOpen: true, isTopRated: true, isFavorite: false },
  { id: 4, name: "Shop Name", image: "/shopcard/ffood.jpg", category: "Frozen Food", rating: 2.5, isOpen: false, isTopRated: false, isFavorite: false },
  { id: 5, name: "Shop Name", image: "/shopcard/Meat.jpg", category: "Meat & Seafood", rating: 4.5, isOpen: false, isTopRated: true, isFavorite: true },
  { id: 6, name: "Shop Name", image: "/shopcard/bakery.jpg", category: "Bakery", rating: 2.5, isOpen: false, isTopRated: false, isFavorite: false },
  { id: 7, name: "Shop Name", image: "/shopcard/accessories.jpg", category: "Accessories", rating: 4.5, isOpen: true, isTopRated: true, isFavorite: false },
];

// Pagination Settings
const itemsPerPage = 3; // Set how many shops per page

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(sampleShops.length / itemsPerPage);

  // Get Shops for Current Page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentShops = sampleShops.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col min-h-screen py-6">
    <div className="flex-grow p-6">
      <div className="flex flex-wrap justify-center gap-6">
        {currentShops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={sampleShops.length}
        onPageChange={handlePageChange} />
    </div>
  );
}
