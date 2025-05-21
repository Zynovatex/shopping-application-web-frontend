"use client";
import { useEffect, useState } from 'react';
import ShopCard from '@/components/shop/shopCard';
import ShopFilter from '@/components/shop/shopFilter';
import Pagination from '@/app/component/layout/Pagination';
import { FaFilter, FaTimes } from 'react-icons/fa';
import shopService, { ShopResponse } from '@/app/api/auth/shopService';

const ITEMS_PER_PAGE = 24;

// const shopsData = [
//   { id: 1, name: 'Bakery Delight', image: '/shop/shop1.jpg', category: 'Bakery', rating: 4.5, isOpen: true, isTopRated: true, isFavorite: false },
//   { id: 2, name: 'Fresh Mart', image: '/shop/shop2.jpg', category: 'Grocery', rating: 4.2, isOpen: false, isTopRated: false, isFavorite: true },
//   { id: 3, name: 'Organic Hub', image: '/shop/shop3.jpg', category: 'Organic', rating: 4.8, isOpen: true, isTopRated: true, isFavorite: false },
//   { id: 4, name: 'Daily Essentials', image: '/shop/shop4.jpg', category: 'Supermarket', rating: 4.0, isOpen: true, isTopRated: false, isFavorite: true },
//   { id: 5, name: 'Local Market', image: '/shop/shop5.jpg', category: 'Grocery', rating: 4.3, isOpen: false, isTopRated: false, isFavorite: false },
//   { id: 6, name: 'Tasty Bites', image: '/shop/shop6.jpg', category: 'Bakery', rating: 4.7, isOpen: true, isTopRated: true, isFavorite: true },
//   { id: 7, name: 'Quick Grocery', image: '/shop/shop7.jpg', category: 'Supermarket', rating: 4.1, isOpen: false, isTopRated: true, isFavorite: false },
//   { id: 8, name: 'Eco Fresh', image: '/shop/shop8.jpg', category: 'Organic', rating: 4.9, isOpen: true, isTopRated: true, isFavorite: true },
//   { id: 9, name: 'Healthy Choice', image: '/shop/shop9.jpg', category: 'Organic', rating: 4.6, isOpen: true, isTopRated: false, isFavorite: false },
//   { id: 10, name: 'Mega Mart', image: '/shop/shop10.jpg', category: 'Supermarket', rating: 4.2, isOpen: false, isTopRated: true, isFavorite: true },
//   { id: 11, name: 'Sweet Treats', image: '/shop/shop11.jpg', category: 'Bakery', rating: 4.4, isOpen: true, isTopRated: true, isFavorite: false },
//   { id: 12, name: 'Village Market', image: '/shop/shop12.jpg', category: 'Grocery', rating: 4.3, isOpen: true, isTopRated: false, isFavorite: true },
//   { id: 1, name: 'Bakery Delight', image: '/shop/shop1.jpg', category: 'Bakery', rating: 4.5, isOpen: true, isTopRated: true, isFavorite: false },
//   { id: 2, name: 'Fresh Mart', image: '/shop/shop2.jpg', category: 'Grocery', rating: 4.2, isOpen: false, isTopRated: false, isFavorite: true },
//   { id: 3, name: 'Organic Hub', image: '/shop/shop3.jpg', category: 'Organic', rating: 4.8, isOpen: true, isTopRated: true, isFavorite: false },
//   { id: 4, name: 'Daily Essentials', image: '/shop/shop4.jpg', category: 'Supermarket', rating: 4.0, isOpen: true, isTopRated: false, isFavorite: true },
//   { id: 5, name: 'Local Market', image: '/shop/shop5.jpg', category: 'Grocery', rating: 4.3, isOpen: false, isTopRated: false, isFavorite: false },
//   { id: 6, name: 'Tasty Bites', image: '/shop/shop6.jpg', category: 'Bakery', rating: 4.7, isOpen: true, isTopRated: true, isFavorite: true },
//   { id: 7, name: 'Quick Grocery', image: '/shop/shop7.jpg', category: 'Supermarket', rating: 4.1, isOpen: false, isTopRated: false, isFavorite: false },
//   { id: 8, name: 'Eco Fresh', image: '/shop/shop8.jpg', category: 'Organic', rating: 4.9, isOpen: true, isTopRated: true, isFavorite: true },
//   { id: 9, name: 'Healthy Choice', image: '/shop/shop9.jpg', category: 'Organic', rating: 4.6, isOpen: true, isTopRated: false, isFavorite: false },
//   { id: 10, name: 'Mega Mart', image: '/shop/shop10.jpg', category: 'Supermarket', rating: 4.2, isOpen: false, isTopRated: true, isFavorite: true },
//   { id: 11, name: 'Sweet Treats', image: '/shop/shop11.jpg', category: 'Bakery', rating: 4.4, isOpen: true, isTopRated: true, isFavorite: false },
//   { id: 12, name: 'Village Market', image: '/shop/shop12.jpg', category: 'Grocery', rating: 4.3, isOpen: true, isTopRated: true, isFavorite: true },{ id: 9, name: 'Healthy Choice', image: '/shop/shop9.jpg', category: 'Organic', rating: 4.6, isOpen: true, isTopRated: false, isFavorite: false },
//   { id: 10, name: 'Mega Mart', image: '/shop/shop10.jpg', category: 'Supermarket', rating: 4.2, isOpen: false, isTopRated: true, isFavorite: true },
//   { id: 11, name: 'Sweet Treats', image: '/shop/shop11.jpg', category: 'Bakery', rating: 4.4, isOpen: true, isTopRated: true, isFavorite: false },
//   { id: 12, name: 'Village Market', image: '/shop/shop12.jpg', category: 'Grocery', rating: 4.3, isOpen: true, isTopRated: true, isFavorite: true }
// ];

export default function ShopListingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [shopsData, setShopsData] = useState<ShopResponse[]>([]);

  
  const allTopRatedShops = shopsData;
  const topRatedShops = allTopRatedShops.slice(0, 12);
  // const remainingTopRatedShops = allTopRatedShops.slice(12);
  const otherShops = shopsData;

  const totalOtherShopsPages = Math.ceil((otherShops.length - 12) / ITEMS_PER_PAGE) + 1;
  const totalPages = totalOtherShopsPages;

  const displayedShops = currentPage === 1 
    ? otherShops.slice(0, 12)
    : otherShops.slice((currentPage - 2) * ITEMS_PER_PAGE + 12, (currentPage - 1) * ITEMS_PER_PAGE + 12);
 
  useEffect(() => {
    async function fetchShops() {
 
      try {
        const data = await shopService.getAllShops();
        setShopsData(data);
      } catch (err) {
        // setError("Failed to load shops.");
        console.error(err);
      } finally {
 
      }
    }
    fetchShops();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <button 
        className="lg:hidden fixed top-4 right-4 bg-gray-200 text-gray-800 p-3 rounded-full shadow-xl z-50"
        onClick={() => setIsFilterVisible(!isFilterVisible)}>
        {isFilterVisible ? <FaTimes size={24} /> : <FaFilter size={24} />}
      </button>

      <div className="container mx-auto py-6 flex flex-col lg:flex-row gap-x-10 ">
      <aside className={`w-full mt-12 lg:w-[300px] xl:w-[350px] mr-3 ml-10  ${isFilterVisible ? 'block' : 'hidden lg:block'}`}>
          <ShopFilter />
      </aside>

        
        <main className="flex-1">
          {currentPage === 1 && (
            <>
              <h2 className="text-3xl font-semibold mt-5 mb-10">Top Rated Shops</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 ">
                {topRatedShops && topRatedShops.map((shop, index) => (
                  <ShopCard key={index} shop={shop} />
                ))}
              </div>
            </>
          )}
          <h2 className="text-3xl font-semibold mt-12 mb-8">Other Shops</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10">

            {displayedShops && displayedShops.map((shop, index) => (
              <ShopCard key={index} shop={shop} />
            ))}
          </div>
          <div className="mt-12 flex justify-center mr-32">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </main>
      </div>
    </div>
  );
}