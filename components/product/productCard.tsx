"use client";

import { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaCartPlus,
  FaShoppingCart,
  FaTruck,
} from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleCardClick = () => {
    router.push("/pages/productpage");
  };

  return (
    <div
      className="relative bg-white border border-[#4827c4] rounded-lg shadow-lg w-[230px] h-[265px] overflow-visible
        transition-transform duration-300 ease-out hover:scale-105 hover:shadow-2xl cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative w-full h-[160px] rounded-t-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />

        {/* Favorite Icon (Always Visible) */}
        <div
          className="absolute top-3 right-3 bg-white p-2 rounded-full cursor-pointer shadow-md transition-transform duration-300 hover:scale-110 z-20"
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }
          }}
        >
          {isFavorite ? (
            <FaHeart className="text-red-500" size={18} />
          ) : (
            <FaRegHeart className="text-black" size={18} />
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-2 flex flex-col justify-between h-[105px]">
        <div>
          <h3 className="font-bold text-sm mb-1">{product.name}</h3>

          {/* Discount and Price */}
          <div className="flex items-center justify-between">
            <span
              className={`text-xs px-2 py-1 rounded-full font-semibold text-blue-700 bg-purple-200 ${
                product.isDiscounted ? "visible" : "invisible"
              }`}
            >
              -{product.discount}%
            </span>
            <span className="text-xs text-blue-700 font-semibold">
              Rs {product.price.toFixed(2)}
            </span>
          </div>

          {/* Best Seller, Stock & Rating */}
          <div className="flex items-center justify-between mt-1">
            <span
              className={`text-red-600 text-[11px] italic font-semibold ${
                product.isBestSeller ? "visible" : "invisible"
              }`}
            >
              Best Seller
            </span>
            <span
              className={`text-xs ${
                product.isInStock ? "text-green-600" : "text-red-500"
              }`}
            >
              {product.isInStock ? "In stock" : "Out of stock"}
            </span>
            <span className="ml-2 font-semibold text-xs text-[#000000]">
              {product.rating}⭐
            </span>
          </div>
        </div>

        {/* Container div relative to position absolute inside */}
        <div className="relative mt-auto flex items-center min-h-[32px]">
          {/* Free Shipping text (if any) */}
          {product.isFreeDelivery && (
            <span className="text-green-600 text-xs flex items-center px-2 rounded-full font-semibold">
              <FaTruck className="mr-1" size={12} /> Free Shipping
            </span>
          )}

          {/* Cart button absolute at right bottom corner */}
          <button
            className="absolute right-0 bottom-0 z-20 bg-white p-2 rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform"
            onClick={(e) => {
              e.stopPropagation();
              setIsAdd(!isAdd);
            }}
            aria-label={isAdd ? "Remove from cart" : "Add to cart"}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsAdd(!isAdd);
              }
            }}
          >
            {isAdd ? (
              <FaCartPlus className="text-red-500" size={20} />
            ) : (
              <FaShoppingCart className="text-blue-700" size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
