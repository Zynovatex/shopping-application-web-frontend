"use client";

import { useState, useEffect } from "react";
// 🔄 UPDATED: import useParams instead of useSearchParams
import { useParams } from "next/navigation";

import ProductCard from "@/app/component/product/productCard";
import ProductFilter from "@/app/component/product/productFilter";
import Pagination from "@/app/component/layout/Pagination";
import { FaFilter, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";

import shopService, {
  ShopResponse,
  ShopWithProductsResponse,
  ProductResponse,
} from "@/app/api/auth/shopService";

const ITEMS_PER_PAGE = 24;

interface UIProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  discount: number;
  rating: number;
  isInStock: boolean;
  isBestSeller: boolean;
  isFavorite: boolean;
  isFreeDelivery: boolean;
  isDiscounted: boolean;
  isAdd: boolean;
}

export default function ShopPage() {
  const { id } = useParams(); // 🔄 UPDATED: pull dynamic segment
  const shopId = Number(id);

  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [shop, setShop] = useState<ShopResponse | null>(null);
  const [products, setProducts] = useState<UIProduct[]>([]);

  useEffect(() => {
    if (!shopId) return;

    shopService
      .getShopById(shopId)
      .then((res: ShopWithProductsResponse) => {
        setShop(res.shop);

        const ui = res.products.map((p: ProductResponse) => ({
          id: p.id,
          name: p.productName,
          image: p.images?.[0] || "/placeholder.png",

          // 🔄 UPDATED: if you have a discountPrice use that, otherwise fall back to full price
          price: p.price - p.discountPrice,

          // 🔄 UPDATED: discount percentage = (original – discounted) ÷ original × 100, rounded
          discount:
            p.discountPrice > 0
              ? Math.round((p.discountPrice / p.price) * 100)
              : 0,

          rating: 4.5,
          isInStock: p.quantity > 0,
          isBestSeller: true,
          isFavorite: false,
          isFreeDelivery: true,
          isDiscounted: p.discountPrice < p.price,
          isAdd: false,
        }));

        setProducts(ui);
      })
      .catch(console.error);
  }, [shopId]); // 🔄 UPDATED: depend on shopId instead of params

  // PAGINATION
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const displayed = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Shop Banner */}
      <div className="w-full bg-white shadow-lg rounded-lg p-6 flex flex-col lg:flex-row items-center">
        <Image
          src={shop?.shopImages[0] ?? "/shoplogo.png"}
          alt={shop?.shopName ?? "Shop Logo"}
          width={300}
          height={300}
          className="mb-6 lg:mr-12"
        />
        <div className="flex-1">
          <h1 className="text-5xl font-bold">
            {shop?.shopName ?? "Shop Name"} <sup>®</sup>
          </h1>
          <p className="mt-4 text-gray-700">
            {shop
              ? `Welcome to ${shop.shopName}, located at ${shop.address}.`
              : "Welcome — products will appear below."}
          </p>
        </div>
      </div>

      {/* Sale Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full mt-6 flex justify-center"
      >
        <Image
          src="/ShopDiscountBanner.png"
          alt="Mega Sale"
          width={1000}
          height={300}
          className="rounded-lg shadow-lg"
        />
      </motion.div>

      {/* Filter Toggle (mobile) */}
      <button
        className="lg:hidden fixed top-4 right-4 bg-gray-200 p-3 rounded-full shadow-xl z-50"
        onClick={() => setIsFilterVisible((v) => !v)}
      >
        {isFilterVisible ? <FaTimes size={24} /> : <FaFilter size={24} />}
      </button>

      <div className="container mx-auto py-6 flex flex-col lg:flex-row gap-x-10">
        {/* Sidebar Filter */}
        <aside
          className={`${
            isFilterVisible ? "block" : "hidden lg:block"
          } w-full lg:w-[300px] xl:w-[350px]`}
        >
          <ProductFilter />
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <h2 className="text-3xl font-semibold mb-6">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10">
            {displayed.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
