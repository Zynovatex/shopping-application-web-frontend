// //import Sidebar from "@/components/Sidebar";
// /*import Sidebar from "@/components/layout/Sidebar";
// export default function Home() {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold">Top Rated Shops</h1>
//         {/* Your shop list component */}
//       </main>
//     </div>
//   );
// }*/

//import ShopCard from "@/component/ShopCard";
import ShopCard from "@/components/shop/shopCard";

const sampleShops = [
  {
    id: 1,
    name: "Shop Name",
    image: "/shopcard/bakery.jpg", 
    category: "Bakery",
    rating: 4.5,
    isOpen: false,
    isTopRated: true,
    isFavorite: false,
  },
  {
    id: 2,
    name: "Shop Name",
    image: "/shopcard/Coffe.jpg", 
    category: "Coffee",
    rating: 3.6,
    isOpen: true,
    isTopRated: false,
    isFavorite: true,
  },
  {
    id: 3,
    name: "Shop Name",
    image: "/shopcard/bevarage.jpg", 
    category: "Baverages",
    rating: 4.5,
    isOpen: true,
    isTopRated: true,
    isFavorite: false,
  },
  {
    id: 4,
    name: "Shop Name",
    image: "/shopcard/ffood.jpg", 
    category: "Frozen Food",
    rating: 2.5,
    isOpen: false,
    isTopRated: false,
    isFavorite: false,
  },
  {
    id: 5,
    name: "Shop Name",
    image: "/shopcard/Meat.jpg", 
    category: "Meat & Seafood",
    rating: 4.5,
    isOpen: false,
    isTopRated: true,
    isFavorite: true,
  },
  {
    id: 6,
    name: "Shop Name",
    image: "/shopcard/bakery.jpg", 
    category: "Bakery",
    rating: 2.5,
    isOpen: false,
    isTopRated: false,
    isFavorite: false,
  },
  {
    id: 7,
    name: "Shop Name",
    image: "/shopcard/accessories.jpg", 
    category: "Accessories",
    rating: 4.5,
    isOpen: true,
    isTopRated: true,
    isFavorite: false,
  },
];

export default function Home() {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {sampleShops.map((shop) => (
        <ShopCard key={shop.id} shop={shop} />
      ))}
    </div>
  );
}
