"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ShopResponse } from "@/app/api/auth/shopService";

interface ShopCardProps {
  shop: ShopResponse;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  // Static/demo values for now
  const isOpen = true;
  const isTopRated = true;
  const rating = 4.5;

  const handleCardClick = () => {
    // 🔄 UPDATED: navigate to the dynamic route so ShopPage/[id]/page.tsx picks it up
    router.push(`/pages/shoppage/${shop.id}`);
  };

  return (
    <div
      className="relative bg-white border border-[#4827c4] rounded-lg shadow-lg
                 w-[220px] h-[260px] overflow-hidden transition-transform
                 duration-300 ease-out hover:scale-105 hover:shadow-2xl"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative w-full h-[170px]">
        <Image
          src={shop.shopImages[0] ?? "/placeholder.png"}
          alt={shop.shopName}
          fill
          className="object-cover rounded-t-lg"
        />

        {/* Favorite Toggle */}
        <div
          className="absolute top-3 right-3 bg-white p-2 rounded-full
                     cursor-pointer shadow-md transition-transform
                     duration-300 hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
        >
          {isFavorite ? (
            <FaHeart className="text-red-500" size={18} />
          ) : (
            <FaRegHeart className="text-black" size={18} />
          )}
        </div>

        {/* Category Badge */}
        <div
          className="absolute bottom-2 left-2 bg-[#4827c4] text-white text-xs
                     font-semibold px-2 py-1 rounded-md shadow-md"
        >
          {shop.category}
        </div>
      </div>

      {/* Details Section */}
      <div className="p-3">
        {/* Name & Open/Closed */}
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-gray-800 truncate">
            {shop.shopName}
          </h3>
          <span
            className={`text-xs ${isOpen ? "text-green-600" : "text-red-500"}`}
          >
            {isOpen ? "Open" : "Closed"}
          </span>
        </div>

        {/* Top Rated & Rating */}
        <div className="flex justify-between items-center mt-1">
          <span
            className={`text-red-600 flex items-center ${
              isTopRated ? "visible" : "invisible"
            }`}
          >
            🏆
            <span className="ml-1 italic font-semibold text-[10px]">
              Top Rated
            </span>
          </span>
          <div className="flex items-center font-semibold">
            <span className="ml-2 text-xs text-[#000000]">{rating}⭐</span>
          </div>
        </div>

        {/* Address */}
        <p className="mt-2 text-xs text-gray-600 line-clamp-2">
          {shop.address}
        </p>
      </div>
    </div>
  );
};

export default ShopCard;
