"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ShopCard from '@/components/shop/shopCard';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";


type BannerPosition = "top-left" | "top-right" | "center" | "bottom-right" | "top-center";

const banners: { id: number; image: string; title: string; description: string; position: BannerPosition }[] = [
  {
    id: 1,
    image: "/landingpage/banner3.jpg", // Replace with your image paths
    title: "Borem Ipsum Dolor Sit Amet",
    description: "",
    position: "top-center",
  },
  {
    id: 2,
    image: "/landingpage/banner8.jpg",
    title: "Borem Ipsum Dolor Sit Amet, Consectetur",
    description: "Jorem ipsum dolor sit amet, consectetur adipiscing elit.",
    position: "top-right",
  },
  {
    id: 3,
    image: "/landingpage/banner5.jpg",
    title: "Discover Amazing Deals",
    description: "Shop the best products at unbeatable prices!",
    position: "top-left",
  },
  {
    id: 4,
    image: "/landingpage/banner2.jpg",
    title: "Upgrade Your Lifestyle",
    description: "Latest trends and top-quality items just for you.",
    position: "center",
  },
];

const positionStyles = {
  "top-left": "top-20 left-16 text-left",
  "top-right": "top-10 right-10 text-right",
  center: "top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center",
  "bottom-right": "bottom-10 right-10 text-right",
  "top-center": "top-24 left-30 transform -translate-x-1/2 text-center",
};

const categories = [
    { image: "/categories_Landingpage/fruit&vegi.jpg", name: "Fruit & Vegitables" },
    { image: "/categories_Landingpage/Bakery & Snacks.jpg", name: "Bakery & Snacks"},
    { image: "/categories_Landingpage/personal care & hygiene.jpg", name: "Personal care & Hygiene" },
    { image: "/categories_Landingpage/clothes.jpg", name: "clothes" },
    { image: "/categories_Landingpage/household essentials.jpg", name: "Household essentials" },
    { image: "/categories_Landingpage/electronics Item.jpg", name: "Electronics items"},
  ];


  const shopsData = [
    { id: 1, name: 'Bakery Delight', image: '/shop/shop1.jpg', category: 'Bakery', rating: 4.5, isOpen: true, isTopRated: true, isFavorite: false },
    { id: 2, name: 'Fresh Mart', image: '/shop/shop2.jpg', category: 'Grocery', rating: 4.2, isOpen: false, isTopRated: true, isFavorite: true },
    { id: 3, name: 'Organic Hub', image: '/shop/shop3.jpg', category: 'Organic', rating: 4.8, isOpen: true, isTopRated: true, isFavorite: false },
    { id: 4, name: 'Daily Essentials', image: '/shop/shop4.jpg', category: 'Supermarket', rating: 4.0, isOpen: true, isTopRated: true, isFavorite: true },
    { id: 5, name: 'Local Market', image: '/shop/shop5.jpg', category: 'Grocery', rating: 4.3, isOpen: false, isTopRated: true, isFavorite: false },
    { id: 6, name: 'Tasty Bites', image: '/shop/shop6.jpg', category: 'Bakery', rating: 4.7, isOpen: true, isTopRated: true, isFavorite: true },
    { id: 7, name: 'Quick Grocery', image: '/shop/shop7.jpg', category: 'Supermarket', rating: 4.1, isOpen: false, isTopRated: true, isFavorite: false },
    { id: 1, name: 'Bakery Delight', image: '/shop/shop1.jpg', category: 'Bakery', rating: 4.5, isOpen: true, isTopRated: true, isFavorite: false },
  ];

export default function LandingPage() {

  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);


  const allTopRatedShops = shopsData.filter(shop => shop.isTopRated);
  
  const [startIndex, setStartIndex] = useState(0);
  const visibleShops = 5;  // Default number of shops displayed
  const totalShops = allTopRatedShops.length;  // Total number of top-rated shops


  
  const nextShops = () => {
    if (startIndex + visibleShops < totalShops) {
      setStartIndex(startIndex + 1); // Move right by 1 shop
    }
  };

  const prevShops = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1); // Move left by 1 shop
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFirstLoad(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="relative rounded-3xl w-full max-w-[1400px] h-[350px] overflow-hidden mx-auto mt-10">
        <AnimatePresence>
          {banners.map((banner, index) =>
            index === currentIndex || (isFirstLoad && index === 0) ? (
              <motion.div
                key={banner.id}
                className="absolute w-full h-full flex items-center justify-center bg-gray-900"
                initial={
                  isFirstLoad && index === 0
                    ? { opacity: 0, scale: 0.8 }
                    : { x: "100%", opacity: 0 }
                }
                animate={
                  isFirstLoad && index === 0
                    ? { opacity: 1, scale: 1 }
                    : { x: "0%", opacity: 1 }
                }
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <Image
                  src={banner.image}
                  alt="Banner Image"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  className="absolute inset-0 w-full h-full"
                />
                <motion.div
                  className={`absolute z-10 text-white ${positionStyles[banner.position]}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">{banner.title}</h2>
                  {banner.description && (
                    <p className="text-lg mb-4 drop-shadow-lg">{banner.description}</p>
                  )}
                  <motion.button
                    className="px-6 py-3 bg-black text-white text-lg font-semibold rounded-lg hover:bg-gray-800 transition"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    onClick={() => router.push("/pages/shoplistpage")}
                  >
                    Shop Now →
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
        <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
            onClick={() => {
              setIsFirstLoad(false);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
      </div>
      
      <div className="mt-16 px-8 max-w-[1400px] mx-auto">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-3xl font-bold text-gray-800">Categories</h2>
    <a href="#" className="text-sm text-blue-600 font-semibold hover:underline">See all</a>
  </div>
  <div className="flex justify-center gap-16 flex-wrap">
  {categories.map((category, index) => (
    <div key={index} className="flex flex-col items-center">
      <div className="w-40 h-40 bg-gray-100 flex items-center justify-center rounded-full shadow-md relative 
                      transition-transform duration-300 hover:shadow-xl hover:scale-110">
        <Image
          src={category.image}
          alt={category.name}
          width={150}
          height={150}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <p className="mt-4 text-base font-medium text-gray-700">{category.name}</p>
    </div>
  ))}
</div>

</div>

 <div className="relative mt-12 mb-12 mx-auto max-w-[1400px]">
      <h2 className="text-3xl font-bold mb-8 ml-10">Top Rated Shops</h2>

      <div className="flex items-center ml-10">
        {/* Left Button */}
        <button
          onClick={prevShops}
          disabled={startIndex === 0}
          className="bg-white shadow-lg rounded-full p-2 ml-2 disabled:opacity-50"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
        </button>

        {/* Shops Display (Single Line) */}
        <div className="flex overflow-hidden gap-10 mx-4">
          {allTopRatedShops.slice(startIndex, startIndex + visibleShops).map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={nextShops}
          disabled={startIndex + visibleShops >= totalShops}
          className="bg-white shadow-lg rounded-full p-2 disabled:opacity-50"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </div>
    </div>
  );
}
