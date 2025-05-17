"use client";
import { useState , useEffect } from 'react';
import ProductCard from '@/components/product/productCard';
import ProductFilter from '@/components/product/productFilter';
import Pagination from '@/app/component/layout/Pagination';
import { FaFilter, FaTimes, FaStar } from 'react-icons/fa';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const ITEMS_PER_PAGE = 24;

const productsData = [
  { id: 1, name: 'Van Light', image: '/products/product1.jpg', price: 30000, discount: 10, rating: 4.8, category: 'Electronics', isBestSelling: false, isTrending: true, isInStock: true, isBestSeller: false, isFavorite: false, isFreeDelivery: true, isDiscounted: true, isAdd: false },
  { id: 2, name: 'Smart Bottle', image: '/products/product2.jpg', price: 15000, discount: 5, rating: 4.5, category: 'Lifestyle', isBestSelling: true, isTrending: true, isInStock: true, isBestSeller: false, isFavorite: true, isFreeDelivery: true, isDiscounted: true, isAdd: false },
  { id: 3, name: 'Luxury Perfume', image: '/products/product3.jpg', price: 50000, discount: 15, rating: 4.9, category: 'Beauty', isBestSelling: false, isTrending: true, isInStock: true, isBestSeller: false, isFavorite: true, isFreeDelivery: true, isDiscounted: true, isAdd: false },
  { id: 4, name: 'Wireless Earbuds', image: '/products/product4.jpg', price: 20000, discount: 20, rating: 4.6, category: 'Electronics', isBestSelling: true, isTrending: false, isInStock: true, isBestSeller: true, isFavorite: false, isFreeDelivery: true, isDiscounted: true, isAdd: false },
  { id: 5, name: 'Designer Bag', image: '/products/product5.jpg', price: 60000, discount: 12, rating: 4.7, category: 'Fashion', isBestSelling: false, isTrending: true, isInStock: true, isBestSeller: false, isFavorite: true, isFreeDelivery: true, isDiscounted: true, isAdd: false },
  { id: 6, name: 'Gaming Mouse', image: '/products/product6.jpg', price: 12000, discount: 8, rating: 4.4, category: 'Gaming', isBestSelling: true, isTrending: false, isInStock: true, isBestSeller: true, isFavorite: false, isFreeDelivery: false, isDiscounted: true, isAdd: false },
  { id: 7, name: 'Organic Shampoo', image: '/products/product7.jpg', price: 8000, discount: 10, rating: 4.5, category: 'Beauty', isBestSelling: false, isTrending: true, isInStock: true, isBestSeller: false, isFavorite: true, isFreeDelivery: true, isDiscounted: true, isAdd: false },
  { id: 8, name: 'LED Desk Lamp', image: '/products/product8.jpg', price: 18000, discount: 7, rating: 4.6, category: 'Home', isBestSelling: false, isTrending: true, isInStock: true, isBestSeller: false, isFavorite: true, isFreeDelivery: false, isDiscounted: true, isAdd: false },
  { id: 9, name: 'Van Light', image: '/products/product1.jpg', price: 30000, discount: 10, rating: 4.8, category: 'Electronics', isBestSelling: true, isTrending: false, isInStock: true, isBestSeller: true, isFavorite: false, isFreeDelivery: true, isDiscounted: true, isAdd: false },
  { id: 10, name: 'Smart Bottle', image: '/products/product2.jpg', price: 15000, discount: 5, rating: 4.5, category: 'Lifestyle', isBestSelling: false, isTrending: true, isInStock: true, isBestSeller: true, isFavorite: true, isFreeDelivery: true, isDiscounted: true, isAdd: false },
  { id: 11, name: 'Luxury Perfume', image: '/products/product3.jpg', price: 50000, discount: 15, rating: 4.9, category: 'Beauty', isBestSelling: false, isTrending: true, isInStock: true, isBestSeller: false, isFavorite: true, isFreeDelivery: true, isDiscounted: true, isAdd: false },
  { id: 12, name: 'Wireless Earbuds', image: '/products/product4.jpg', price: 20000, discount: 20, rating: 4.6, category: 'Electronics', isBestSelling: true, isTrending: false, isInStock: true, isBestSeller: true, isFavorite: false, isFreeDelivery: false, isDiscounted: true, isAdd: false },
  { id: 13, name: 'Designer Bag', image: '/products/product5.jpg', price: 60000, discount: 12, rating: 4.7, category: 'Fashion', isBestSelling: false, isTrending: true, isInStock: true, isBestSeller: false, isFavorite: true, isFreeDelivery: true, isDiscounted: true, isAdd: false },
  { id: 14, name: 'Gaming Mouse', image: '/products/product6.jpg', price: 12000, discount: 8, rating: 4.4, category: 'Gaming', isBestSelling: true, isTrending: false, isInStock: true, isBestSeller: true, isFavorite: false, isFreeDelivery: true, isDiscounted: true, isAdd: false },
  { id: 15, name: 'Organic Shampoo', image: '/products/product7.jpg', price: 8000, discount: 10, rating: 4.5, category: 'Beauty', isBestSelling: false, isTrending: true, isInStock: true, isBestSeller: false, isFavorite: true, isFreeDelivery: true, isDiscounted: true, isAdd: false },
  { id: 16, name: 'LED Desk Lamp', image: '/products/product8.jpg', price: 18000, discount: 7, rating: 4.6, category: 'Home', isBestSelling: true, isTrending: false, isInStock: true, isBestSeller: true, isFavorite: false, isFreeDelivery: false, isDiscounted: true, isAdd: false }
];

  const bannerImages = [
    "/ShopDiscountBanner1.png",
    "/ShopDiscountBanner2.png",
    "/ShopDiscountBanner3.png",
  ];

  

export default function ProductListingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentBanner = bannerImages[currentIndex];

   useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const allTopSellingProducts = productsData.filter(product => product.isBestSeller);
  const allBestSellingProducts = productsData.filter(product => product.isBestSelling);
  
  const topSellingProducts = allTopSellingProducts.slice(0, 12);
  const bestSellingProducts = allBestSellingProducts.slice(0, 12);
  const remainingProducts = [...productsData.filter(product => !product.isBestSelling)];

  const totalRemainingPages = Math.ceil(remainingProducts.length / ITEMS_PER_PAGE);
  const totalPages = totalRemainingPages + 1;

  const displayedProducts = currentPage === 1 
    ? []
    : remainingProducts.slice((currentPage - 2) * ITEMS_PER_PAGE, (currentPage - 1) * ITEMS_PER_PAGE);
  
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* <div className="min-h-screen flex flex-col "> */}
      {/* Shop Banner */}
      <div className="w-full bg-white shadow-lg rounded-lg p-6 flex flex-col lg:flex-row items-center text-center lg:text-left mr-12">
        <Image src="/shoplogo.png" alt="Shop Logo" width={300} height={300} className="mb-6 lg:mr-12" />
        <div className="flex-1 mr-48">
          <h1 className="text-5xl font-bold text-gray-900">Shop Name <sup>®</sup></h1>
          <p className="text-gray-700 text-center mt-4 text-base">🛍️ Welcome to [Shop Name], your one-stop destination for high-quality products at the best prices. Explore our wide range of items, carefully selected to meet your needs!</p>
          
          <hr className="my-4 border-gray-300" />  
          <div className="flex justify-end mr-20 items-center mt-4 space-x-8 ">
  {/* Left Side - Rating Score */}
  <div className="flex flex-col items-start space-y-2">
    <div className="flex items-center space-x-2">
      <span className="text-7xl text-blue-700 font-bold">4.5</span>
      <FaStar className="text-yellow-300" size={40} />
    </div>
    <span className="text-gray-700 text-lg font-medium">653 reviews</span>
  </div>

  {/* Right Side - Rating Breakdown */}
  <div className="ml-4">
    {[5, 4, 3, 2, 1].map((rating) => (
      <div key={rating} className="flex items-center space-x-2">
        <span className="text-gray-600 text-sm">{rating} ★</span>
        <div className="w-36 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            style={{ width: `${rating * 20}%` }}
          ></div>
        </div>
      </div>
    ))}
  </div>
</div>

        </div>
      </div>


      
 {/* Animated Rotating Banner */}
<div className="w-full h-80 mt-6 flex justify-center items-center overflow-hidden relative">
  <AnimatePresence mode="popLayout">
  <motion.div
    key={currentBanner}
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -300, opacity: 0 }}
    transition={{
      x: { type: "spring", stiffness: 70, damping: 10 },
      opacity: { duration: 0.5 }
    }}
    className="absolute w-auto h-80 flex justify-center"
  >
    <Image
      src={currentBanner}
      alt="Sale Banner"
      width={1000}
      height={300}
      className="rounded-lg shadow-lg object-cover"
      priority
    />
  </motion.div>
</AnimatePresence>


</div>

      <button 
        className="lg:hidden fixed top-4 right-4 bg-gray-200 text-gray-800 p-3 rounded-full shadow-xl z-50"
        onClick={() => setIsFilterVisible(!isFilterVisible)}>
        {isFilterVisible ? <FaTimes size={24} /> : <FaFilter size={24} />}
      </button>

      <div className="container mx-auto py-6 flex flex-col lg:flex-row gap-x-10 mt-6">
        <aside className={`w-full mt-12 lg:w-[300px] xl:w-[350px] mr-3 ml-10 ${isFilterVisible ? 'block' : 'hidden lg:block'}`}>
          <ProductFilter />
        </aside>

        <main className="flex-1">
          {currentPage === 1 && (
            <>
              <h2 className="text-3xl font-semibold mt-5 mb-10">Top Selling Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10">
                {topSellingProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              <h2 className="text-3xl font-semibold mt-12 mb-8">Best Selling Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10">
                {bestSellingProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}

          {currentPage > 1 && (
            <>
              <h2 className="text-3xl font-semibold mt-12 mb-8">Other Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}

          <div className="mt-12 flex justify-center mr-80">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
         
      </main>
      </div>
      <div className="container mx-auto py-6 justify-start">
     {/* Shop Description */}
     <div className="text-gray-700 text-justify w-full mx-auto leading-relaxed px-36">
      
  <p>
    Welcome to <strong>Shop Name</strong>, your trusted store for quality products. We are dedicated to bringing you the best items with a focus on dependability, customer service, and uniqueness.
     Our store has been serving happy customers for years, and we strive to continue providing excellent products and services. Shop Name started with a simple vision – to offer a wide range of quality
      products that cater to the needs of our customers. Over the years, we have built a strong reputation for excellence, expanding our selection to include the latest trends, everyday essentials, and exclusive 
      deals. With years of experience in the industry, we understand what our customers value the most – quality, affordability, and convenience. Our dedicated team works tirelessly to ensure that every product 
      we offer meets the highest standards, giving you the confidence to shop with us. At Shop Name, we believe in making shopping easy, enjoyable, and hassle-free. Our commitment to customer satisfaction drives 
      us to provide reliable products, excellent service, and a shopping experience that keeps our customers coming back. Thank you for being a part of our journey. We look forward to serving you and continuing to grow together!
  </p>
</div>


      {/* Shop Owners Section */}
      <div className="mt-12 flex flex-wrap w-full justify-center gap-20">
  {[
    { name: "Elias Watsica", image: "/shopOwner/owner1.jpg" },
    { name: "Jane Cooper", image: "/shopOwner/owner2.jpg" },
    { name: "Kathryn Murphy", image: "/shopOwner/owner3.jpg" },
  ].map((owner, index) => (
    <div key={index} className="flex flex-col items-center">
      {/* Owner Image */}
      <div className="w-16 h-16 rounded-full overflow-hidden">
        <Image src={owner.image} alt={owner.name} width={64} height={64} className="object-cover" />
      </div>
      {/* Owner Name */}
      <h3 className="text-lg font-semibold mt-2">{owner.name}</h3>
    </div>
  ))}
</div>

    </div>
    </div>
  );
}
