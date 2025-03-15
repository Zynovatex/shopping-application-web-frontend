"use client";

import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaCartPlus, FaShoppingCart } from "react-icons/fa"; 
import { FaTruck } from "react-icons/fa"; // Free Shipping Icon
import Image from "next/image";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    image: string;
    rating: number;
    isInStock: boolean;
    isBestSeller: boolean;
    isFavorite: boolean;
    discount?: number;
    isFreeDelivery: boolean;
    isDiscounted: boolean;
    price: number;
    isAdd: boolean;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(product.isFavorite);
  const [isAdd, setIsAdd] = useState(product.isAdd);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative bg-white rounded-lg w-[246px] h-[270px] overflow-hidden transition-all duration-300 ease-out
      ${isHovered ? "shadow-2xl scale-105" : "shadow-lg border-transparent"}
      border-[1px] cursor-pointer`}
      
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Product Image Section */}
      <div className="relative w-full h-[150px]">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />

        {/* Favorite Button (Appears on Hover) */}
        <div
          className={`absolute top-3 right-3 bg-white p-2 rounded-full cursor-pointer shadow-md transition-transform duration-300 
          ${isHovered ? "opacity-100 scale-110" : "opacity-0 scale-90"}
          hover:scale-125`}
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering card click
            setIsFavorite(!isFavorite);
          }}
        >
          {isFavorite ? (
            <FaHeart className="text-red-500" size={18} />
          ) : (
            <FaRegHeart className="text-black" size={18} />
          )}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <span className="font-bold text-sm text-[#000000]">{product.name}</span>

          </div>
          <div className="flex items-center font-semibold">
            <span className={`ml-2 text-[#7b5af7] text-xs flex items-center bg-[#bdadfb] px-3 py-1 rounded-full font-semibold 
              ${product.isDiscounted ? "visible" : "invisible"}`}>
              -{product.discount}%
            </span>
            <span className="ml-2 text-xs text-[#5A31F5]">Rs {product.price}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-1">  
            <span className={`text-red-600 text-[11px] font-semibold italic flex ${product.isBestSeller ? "visible" : "invisible"}`}>
              Best Seller
            </span>
          </div>
          <div className="flex items-center">
            <span className={`text-xs ${product.isInStock ? "text-green-600" : "text-red-500"}`}>
              {product.isInStock ? "In stock" : "Out of stock"}
            </span>
            <span className="ml-2 font-semibold text-xs text-[#000000]">{product.rating}⭐</span>
          </div>
        </div>
      </div>
      <div>

          {/* Free Shipping Icon */}
          {product.isFreeDelivery && (
              <span className="text-green-600 text-xs flex items-center px-2 -mt-1 rounded-full font-semibold">
                <FaTruck className="mr-1" size={12} /> Free Shipping
              </span>
            )}
  
      {/* Add to Cart Button (Always Visible) */}
      <div
        className="absolute bottom-3 right-3 bg-white p-2 rounded-full cursor-pointer shadow-md transition-transform duration-300 hover:scale-110 hover:shadow-lg"
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering card click
          setIsAdd(!isAdd);
        }}
      >
        {isAdd ? (
          <FaCartPlus className="text-red-500" size={20} />
        ) : (
          <FaShoppingCart className="text-[#5A31F5]" size={20} />
        )}
      </div>
    </div>
    </div>
  );
};

export default ProductCard;
