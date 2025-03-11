
/*import ProductFilter from "@/components/product/productFilter";
export default function ProductPage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <ProductFilter />
        </div>
    );
}*/

//import ProductCard from "@/component/ProductCard";
import ProductCard from "@/components/product/productCard";
const sampleProducts = [
  {
    id: 1,
    name: "Product Name",
    image: "/shopcard/bakery.jpg", 
    rating: 4.5,
    isInStock: false,
    isBestSeller: true,
    isFavorite: false,
    isFreeDelivery: true,
    isDiscounted: true,
    discount: 60,
    price: 300.00,
    isAdd: true,
  },

  {
    id: 2,
    name: "Product Name",
    image: "/shopcard/bevarage.jpg", 
    rating: 4.5,
    isInStock: true,
    isBestSeller: true,
    isFavorite: true,
    isFreeDelivery: false,
    isDiscounted: false,
    discount: 0,
    price: 500.00,
    isAdd: true,
  },
  {
    id: 3,
    name: "Product Name",
    image: "/shopcard/Coffe.jpg", 
    rating: 4.5,
    isInStock: true,
    isBestSeller: true,
    isFavorite: false,
    isFreeDelivery: true,
    isDiscounted: true,
    discount: 50,
    price: 1200.00,
    isAdd: true,
  },
  {
    id: 4,
    name: "Product Name",
    image: "/shopcard/ffood.jpg", 
    rating: 4.5,
    isInStock: false,
    isBestSeller: false,
    isFavorite: false,
    isFreeDelivery: true,
    isDiscounted: true,
    discount: 67,
    price: 700.00,
    isAdd: true,
  },
  {
    id: 5,
    name: "Product Name",
    image: "/shopcard/Meat.jpg", 
    rating: 4.5,
    isInStock: true,
    isBestSeller: true,
    isFavorite: false,
    isFreeDelivery: true,
    isDiscounted: true,
    discount: 67,
    price: 300.00,
    isAdd: false,
  },
  {
    id: 6,
    name: "Product Name",
    image: "/shopcard/accessories.jpg", 
    rating: 4.5,
    isInStock: false,
    isBestSeller: true,
    isFavorite: false,
    isFreeDelivery: false,
    isDiscounted: false,
    discount: 0,
    price: 99.99,
    isAdd: true,
  },
  {
    id: 7,
    name: "Product Name",
    image: "/shopcard/bakery.jpg", 
    rating: 4.5,
    isInStock: false,
    isBestSeller: true,
    isFavorite: false,
    isFreeDelivery: true,
    isDiscounted: true,
    discount: 67,
    price: 300.00,
    isAdd: true,
  },
  {
    id: 8,
    name: "Product Name",
    image: "/shopcard/Coffe.jpg", 
    rating: 4.5,
    isInStock: true,
    isBestSeller: true,
    isFavorite: false,
    isFreeDelivery: true,
    isDiscounted: true,
    discount: 67,
    price: 300.00,
    isAdd: false,
  },
  {
    id: 9,
    name: "Product Name",
    image: "/shopcard/bakery.jpg", 
    rating: 4.5,
    isInStock: false,
    isBestSeller: true,
    isFavorite: false,
    isFreeDelivery: true,
    isDiscounted: true,
    discount: 67,
    price: 300.00,
    isAdd: true,
  },
];

export default function Home() {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {sampleProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}


