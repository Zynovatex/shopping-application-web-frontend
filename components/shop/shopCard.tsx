"use client";

import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Favorite icons
import Image from "next/image";
import { useRouter } from "next/navigation"; 


interface ShopCardProps {
  shop: {
    id: number;
    name: string;
    image: string;
    category: string;
    rating: number;
    isOpen: boolean;
    isTopRated: boolean;
    isFavorite: boolean;
  };
}


const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  const [isFavorite, setIsFavorite] = useState(shop.isFavorite);
  const router = useRouter();

  const handleCardClick = () => {
    // router.push(`/shop/${shop.id}`); // Navigate to shop page when clicking the card
    router.push("/pages/shoppage");
  };


  return (
    <div
      className="relative bg-white border border-[#4827c4] rounded-lg shadow-lg w-[220px] h-[235px] overflow-hidden
        transition-transform duration-300 ease-out hover:scale-105 hover:shadow-2xl"
        onClick={handleCardClick} // Navigate to shop page on card click
    >
      {/* Image Section */}
      <div className="relative w-full h-[170px]">
        <Image
          src={shop.image}
          alt={shop.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />

        {/* Favorite Button */}
        <div
          className="absolute top-3 right-3 bg-white p-2 rounded-full cursor-pointer shadow-md transition-transform duration-300 hover:scale-110"
          onClick={(e) => {
            e.stopPropagation(); // Prevents navigation when clicking the favorite button
            setIsFavorite(!isFavorite);
          }}

        >
          {isFavorite ? (
            <FaHeart className="text-red-500" size={18} />
          ) : (
            <FaRegHeart className="text-black" size={18} />
          )}
        </div>

        {/* Shop Category Overlapping the Image */}
        <div className="absolute bottom-2 left-2 bg-[#4827c4] text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
          {shop.category}
        </div>
      </div>

      {/* Shop Details Section */}
      <div className="p-3">
        {/* Shop Name & Open/Closed Status */}
        <div className="flex justify-between items-center">
          <div className="flex items-center text-[#000000] space-x-1">
            <span className="font-bold text-sm">{shop.name}</span>
            <span className="font-bold">®</span>
          </div>
          <span
            className={`text-xs ${shop.isOpen ? "text-green-600" : "text-red-500"}`}
          >
            {shop.isOpen ? "Open" : "Closed"}
          </span>
        </div>

        {/* Top Rated Badge & Rating */}
        <div className="flex justify-between items-center mt-1">
          <span
            className={`text-red-600 flex items-center ${
              shop.isTopRated ? "visible" : "invisible"
            }`}
          >
            🏆 <span className="ml-1 italic font-semibold text-[10px]">Top Rated</span>
          </span>

          <div className="flex items-center font-semibold">
            <span className="ml-2 text-xs text-[#000000]">{shop.rating}⭐</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
