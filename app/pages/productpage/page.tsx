"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Truck, ChevronLeft, ChevronRight } from "lucide-react";
import ProductReview from "@/components/product/productReview";
import ProductCard from "@/components/product/productCard";

const productImages = [
  "/product1/product1.2.jpg",
  "/product1/product1.1.jpg",
  "/product1/product1.3.jpg",
  "/product1/product1.5.jpg",
  "/product1/product1.4.jpg"
];

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(productImages[0]);
  const [currentIndex, setCurrentIndex] = useState(0); 

  const handleQuantityChange = (type: "increase" | "decrease") => {
    setQuantity((prev) => (type === "increase" ? prev + 1 : prev > 1 ? prev - 1 : 1));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : productImages.length - 1));
    setSelectedImage(productImages[currentIndex > 0 ? currentIndex - 1 : productImages.length - 1]);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < productImages.length - 1 ? prevIndex + 1 : 0));
    setSelectedImage(productImages[currentIndex < productImages.length - 1 ? currentIndex + 1 : 0]);
  };

// Color and Size Selection
  const colors = ["Black","Red", "Yellow", "Navy", "Gray"];
const sizes = ["4XL", "3XL", "2XL", "XL", "L", "M", "S"];
const [selectedColor, setSelectedColor] = useState(colors[0]);
const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <div>
      {/* <Header /> */}
      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image Gallery */}
          <div>
            <div className="relative flex justify-center items-center">
              <Image 
                src={selectedImage} 
                alt="Product" 
                width={400} 
                height={400} 
                className="rounded-lg object-cover w-[400px] h-[400px]" 
              />
            </div>
            <div className="flex items-center mt-2 space-x-2 overflow-x-auto">
              <button onClick={handlePrevious} className="p-2 border rounded-full">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex space-x-2">
                {productImages.map((img, index) => (
                  <div key={index} className="cursor-pointer border border-gray-300 rounded-lg p-1">
                    <Image 
                      src={img} 
                      alt="Thumbnail" 
                      width={80} 
                      height={80} 
                      className={`rounded-lg object-cover w-[80px] h-[80px] ${selectedImage === img ? 'border-2 border-blue-500' : ''}`}
                      onClick={() => setSelectedImage(img)}
                    />
                  </div>
                ))}
              </div>
              <button onClick={handleNext} className="p-2 border rounded-full">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="ml-5">
            <h2 className="text-4xl font-bold mt-3">Name Of The Product | Detail</h2>
            <p className="text-gray-800 mt-5">Brand: Sample Brand</p>
            <p className="text-gray-800 ">Model: Sample Model</p>
            <p className="text-gray-800">Availability: Only 2 in Stock</p>
            
            <div className="text-yellow-300 text-lg mt-2">★★★★★ (45)</div>
            

            <p className="text-xl font-bold text-red-500 mt-4 mr-10">
              Rs. 1,865 <span className="line-through text-gray-400 text-sm ml-5">Rs. 6,856</span> 
                        <span className="text-black text-sm ml-2"> -73%</span>
            </p>


            {/* Free Delivery Section */}
            <div className="flex items-center text-green-600 mt-2">
              <Truck className="w-6 h-6 mr-2" />
              <span className="text-sm">Free Delivery Available</span>
            </div>

            <div className="mt-5 space-y-4">
  {/* Quantity Selection */}
  <div className="flex items-center">
    <span className="text-gray-700 font-semibold mr-4">Quantity:</span>
    <div className="flex items-center border border-gray-300 rounded-md">
      <button
        onClick={() => handleQuantityChange("decrease")}
        className="px-3 py-1 border-r border-gray-300"
      >-</button>
      <span className="px-4">{quantity}</span>
      <button
        onClick={() => handleQuantityChange("increase")}
        className="px-3 py-1 border-l border-gray-300"
      >+</button>
    </div>
  </div>

  {/* Color Selection */}
  <div>
    <p className="text-gray-700 font-semibold">Color Family: <span className="text-black">{selectedColor}</span></p>
    <div className="flex flex-wrap gap-2 mt-2">
      {colors.map((color, index) => (
        <button
          key={index}
          className={`px-4 py-1 border rounded-md transition-colors duration-300 ${selectedColor === color ? 'border-orange-500' : 'border-gray-300'}`}
          onClick={() => setSelectedColor(color)}
        >
          {color}
        </button>
      ))}
    </div>
  </div>

  {/* Size Selection */}
  <div>
    <p className="text-gray-700 font-semibold">Size: <span className="text-black">{selectedSize}</span></p>
    <div className="flex flex-wrap gap-2 mt-2">
      {sizes.map((size, index) => (
        <button
          key={index}
          className={`px-4 py-1 border rounded-md transition-colors duration-300 ${selectedSize === size ? 'border-orange-500' : 'border-gray-300'}`}
          onClick={() => setSelectedSize(size)}
        >
          {size}
        </button>
      ))}
    </div>
  </div>
</div>


            <div className="mt-6">
              <button 
                className="bg-blue-500 text-white px-6 py-2 rounded-lg mr-2 transition-colors duration-300 hover:bg-blue-700 active:bg-blue-800"
                onClick={() => setShowPopup(true)}
              >Buy Now</button>
              <button className="bg-gray-300 px-6 py-2 rounded-lg transition-colors duration-300 hover:bg-gray-500 active:bg-gray-200">Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-6 border-t pt-4">
          <div className="flex flex-wrap space-x-6 border-b">
            {["description", "specification", "reviews"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 px-4 ${activeTab === tab ? "border-b-2 border-blue-500 font-bold" : ""}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="mt-4 text-gray-600">
          {activeTab === "description" && (
  <>
    <p className="mb-4 text-justify">
      Elevate your streetwear collection with the Heartbeat Line Fishing Hook Hoodie, a statement piece designed for those who live and breathe adventure. This hoodie seamlessly blends fashion with passion, featuring an eye-catching heartbeat line intertwined with a fishing hook, symbolizing the excitement of the great outdoors. Crafted from ultra-soft, breathable fabric, it provides all-day comfort while keeping you stylish in any setting. Its Harajuku-inspired pullover design adds a modern, relaxed touch, making it a must-have for casual outings, streetwear enthusiasts, and fishing lovers alike.
    </p>

    <p className="mb-4 text-justify">
      Designed with versatility in mind, the hoodie offers a perfect balance of warmth and breathability. The adjustable drawstring hood provides customizable coverage, while the spacious kangaroo pocket keeps your essentials close at hand. Available in multiple color options and sizes, this hoodie is tailored to suit different styles and preferences. Whether paired with joggers for a laid-back weekend look or layered over jeans for an effortlessly cool vibe, the Heartbeat Line Fishing Hook Hoodie is the ultimate fusion of comfort, creativity, and individuality.
    </p>

  </>
)}




{activeTab === "specification" && (
  <>
    <h3 className="text-lg font-semibold mb-4 ">Item specifics - </h3>
    <div className="grid grid-cols-2 gap-y-32 text-gray-700 mt-5">
    <div className="space-y-2 ml-28 text-justify">
        <p><strong>Material:</strong> Ultra-soft, breathable fabric</p>
        <p><strong>Design:</strong> Unique heartbeat line & fishing hook graphic</p>
        <p><strong>Fit:</strong> Relaxed Harajuku-style pullover</p>
        <p><strong>Hood:</strong> Adjustable drawstring for a custom fit</p>
        <p><strong>Pocket:</strong> Spacious kangaroo pocket</p>
        <p><strong>Style:</strong> Ideal for streetwear & adventure lovers</p>
        <p><strong>Features:</strong> Lightweight, warm, and soft fleece lining</p>
      </div>
      <div className="space-y-2 ml-28 text-justify">
        <p><strong>Care Instructions:</strong> Machine washable, shrink-resistant</p>
        <p><strong>Sizes:</strong> Available in S, M, L, XL, 2XL, 3XL, 4XL</p>
        <p><strong>Colors:</strong> Multiple vibrant & neutral shades</p>
        <p><strong>Season:</strong> Suitable for all seasons</p>
        <p><strong>Occasion:</strong> Casual outings, travel, or lounging</p>
        <p><strong>Fabric Type:</strong> High-quality cotton blend</p>
        <p><strong>Garment Care:</strong> Fade-resistant, easy maintenance</p>
      </div>
    </div>
  </>
)}
  
  {/* productreviw component create for this */}
 {activeTab === "reviews" && <ProductReview />}

          </div>
        </div>
      </div>

      {/* Popup Card */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-bold">Order Confirmation</h3>
            <p className="mt-2">Your order has been placed successfully!</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Related Products Section */}
      <div className="mt-16 text-center">
    <h2 className="text-4xl font-bold mb-10">Related Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-10 gap-8 px-4 md:px-12 lg:px-20">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="flex justify-center">
          <ProductCard 
            product={{ 
              id: index, 
              name: "Sample Product", 
              price: 100, 
              image: "/product1/product1.5.jpg", 
              rating: 4.5, 
              discount: 20,
              isInStock: true, 
              isBestSeller: true, 
              isFavorite: true, 
              isFreeDelivery: true, 
              isDiscounted: true, 
              isAdd: false 
            }} 
          />
        </div>
      ))}
    </div>
  </div>

    </div>
  );
};

export default ProductPage;
