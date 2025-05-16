"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ShopCard from "@/app/component/shop/shopCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import shopService, { ShopResponse } from "@/app/api/auth/shopService";

type BannerPosition =
  | "top-left"
  | "top-right"
  | "center"
  | "bottom-right"
  | "top-center";

const banners: {
  id: number;
  image: string;
  title: string;
  description: string;
  position: BannerPosition;
}[] = [
  {
    id: 1,
    image: "/landingpage/banner3.png", // Replace with your image paths
    title: "Borem Ipsum Dolor Sit Amet",
    description: "",
    position: "top-center",
  },
  {
    id: 2,
    image: "/landingpage/banner4.png",
    title: "Borem Ipsum Dolor Sit Amet, Consectetur",
    description: "Jorem ipsum dolor sit amet, consectetur adipiscing elit.",
    position: "top-right",
  },
  {
    id: 3,
    image: "/landingpage/banner2.png",
    title: "Discover Amazing Deals",
    description: "Shop the best products at unbeatable prices!",
    position: "top-left",
  },
  {
    id: 4,
    image: "/landingpage/banner1.png",
    title: "Upgrade Your Lifestyle",
    description: "Latest trends and top-quality items just for you.",
    position: "center",
  },
];

const positionStyles = {
  "top-left": "top-20 left-16 text-left",
  "top-right": "top-10 right-10 text-right",
  center:
    "top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center",
  "bottom-right": "bottom-10 right-10 text-right",
  "top-center": "top-24 left-30 transform -translate-x-1/2 text-center",
};

const categories = [
  {
    image: "/landingpage/Fruits and vegetables.png",
    name: "Fruit & Vegitables",
  },
  {
    image: "/landingpage/Bakery & Snacks.png",
    name: "Bakery & Snacks",
  },
  {
    image: "/landingpage/personal care & hygiene.png",
    name: "Personal care & Hygiene",
  },
  { image: "/landingpage/clothes.png", name: "Clothes" },
  {
    image: "/landingpage/household essentials.png",
    name: "Household essentials",
  },
  {
    image: "/landingpage/electronics Item.png",
    name: "Electronics items",
  },
];

export default function LandingPage() {
  const router = useRouter();

  // === New: state for fetched shops + loading flag ===
  const [shops, setShops] = useState<ShopResponse[]>([]);
  const [loading, setLoading] = useState(true);

  // === Carousel state (unchanged) ===
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // === Shops slider state ===
  const [startIndex, setStartIndex] = useState(0);
  const visibleShops = 5;

  // === Fetch shops on mount ===
  useEffect(() => {
    shopService
      .getAllShops()
      .then((data) => {
        setShops(data);
      })
      .catch((err) => {
        console.error("Failed to load shops:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // === Banner auto-rotate (unchanged) ===
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFirstLoad(false);
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // === Handlers for shop slider ===
  const nextShops = () => {
    if (startIndex + visibleShops < shops.length) {
      setStartIndex(startIndex + 1);
    }
  };
  const prevShops = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  // === Show loading state if still fetching ===
  if (loading) {
    return <div className="text-center mt-20">Loading shops…</div>;
  }

  return (
    <div>
      {/* ===== Banner section (exactly as before) ===== */}
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
                  className={`absolute z-10 text-white ${
                    positionStyles[banner.position]
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
                    {banner.title}
                  </h2>
                  {banner.description && (
                    <p className="text-lg mb-4 drop-shadow-lg">
                      {banner.description}
                    </p>
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

      {/* ===== Categories section (unchanged) ===== */}
      <div className="mt-16 px-8 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Categories</h2>
          <a
            href="#"
            className="text-sm text-blue-600 font-semibold hover:underline"
          >
            See all
          </a>
        </div>
        <div className="flex justify-center gap-16 flex-wrap">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-40 h-40 bg-gray-100 flex items-center justify-center rounded-full shadow-md relative 
                      transition-transform duration-300 hover:shadow-xl hover:scale-110"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <p className="mt-4 text-base font-medium text-gray-700">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Top Rated Shops (now dynamic) ===== */}
      <div className="relative mt-12 mb-12 mx-auto max-w-[1400px]">
        <h2 className="text-3xl font-bold mb-8 ml-10">Top Rated Shops</h2>
        <div className="flex items-center ml-10">
          <button
            onClick={prevShops}
            disabled={startIndex === 0}
            className="bg-white shadow-lg rounded-full p-2 ml-2 disabled:opacity-50"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
          </button>

          <div className="flex gap-10 mx-4">
            {shops.slice(startIndex, startIndex + visibleShops).map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>

          <button
            onClick={nextShops}
            disabled={startIndex + visibleShops >= shops.length}
            className="bg-white shadow-lg rounded-full p-2 disabled:opacity-50"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
