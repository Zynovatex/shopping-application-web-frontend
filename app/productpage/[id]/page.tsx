"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Truck, ChevronLeft, ChevronRight } from "lucide-react";
import ProductReview from "../../component/product/productReview";
import ProductCard from "../../component/product/productCard";
import {
  fetchProductById,
  fetchRelatedProducts,
  ProductResponse,
} from "../../api/auth/productService";
import { addToCart } from "@/app/api/auth/cartService";

const ProductPage = () => {
  const params = useParams();
  const id = params?.id as string | undefined;

  // Existing UI state
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(""); // Message for the popup

  // New: product data state
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Related products state
  const [relatedProducts, setRelatedProducts] = useState<ProductResponse[]>([]);

  // Existing UI state
  const colors = ["Black", "Red", "Yellow", "Navy", "Gray"];
  const sizes = ["4XL", "3XL", "2XL", "XL", "L", "M", "S"];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  // Determine whether to show the Size section
  const showSizeSection = (product?.categories ?? [])
    .map((c) => c.toLowerCase())
    .includes("clothing");

  // Fetch product on mount / id change
  useEffect(() => {
    if (!id) return;
    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        setProductImages(data.images);
        setSelectedImage(data.images[0]);
        // Fetch related products based on category
        if (data.categories.length > 0) {
          fetchRelatedProducts(data.categories[0]) // Assuming first category for simplicity
            .then((relatedData) => setRelatedProducts(relatedData));
        }
      })
      .catch((err) => console.error("Failed to load product:", err));
  }, [id]);

  // Loading state
  if (!product) {
    return <div>Loading product…</div>;
  }

  // Handlers (unchanged)
  const handleQuantityChange = (type: "increase" | "decrease") => {
    setQuantity((prev) =>
      type === "increase" ? prev + 1 : prev > 1 ? prev - 1 : 1
    );
  };

  const handlePrevious = () => {
    const prev = currentIndex > 0 ? currentIndex - 1 : productImages.length - 1;
    setCurrentIndex(prev);
    setSelectedImage(productImages[prev]);
  };

  const handleNext = () => {
    const next = currentIndex < productImages.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(next);
    setSelectedImage(productImages[next]);
  };

  // Add to Cart button handler
  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, product.productName, product.price, quantity)
        .then((data) => {
          setPopupMessage("Product successfully added to the cart!");
          setShowPopup(true);
        })
        .catch((err) => {
          setPopupMessage("Failed to add product to cart.");
          setShowPopup(true);
        });
    }
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image Gallery */}
          <div>
            <div className="relative flex justify-center items-center">
              <Image
                src={selectedImage}
                alt={product.productName}
                width={400}
                height={400}
                className="rounded-lg object-cover w-[400px] h-[400px]"
              />
            </div>
            <div className="flex items-center mt-2 space-x-2 overflow-x-auto">
              <button
                onClick={handlePrevious}
                className="p-2 border rounded-full"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex space-x-2">
                {productImages.map((img, index) => (
                  <div
                    key={index}
                    className="cursor-pointer border border-gray-300 rounded-lg p-1"
                  >
                    <Image
                      src={img}
                      alt="Thumbnail"
                      width={80}
                      height={80}
                      className={`rounded-lg object-cover w-[80px] h-[80px] ${
                        selectedImage === img ? "border-2 border-blue-500" : ""
                      }`}
                      onClick={() => {
                        setCurrentIndex(index);
                        setSelectedImage(img);
                      }}
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
            <h2 className="text-4xl font-bold mt-3">
              {product.productName}|{product.seoTitle}
            </h2>
            <p className="text-gray-800 mt-5">Brand: {product.brand}</p>
            <p className="text-gray-800 ">
              Category: {(product.categories ?? []).join(", ")}
            </p>
            <p className="text-gray-800">
              Availability:{" "}
              {product.quantity > 0
                ? `${product.quantity} in stock`
                : "Out of stock"}
            </p>

            <div className="text-yellow-300 text-lg mt-2">★★★★★ (45)</div>

            <p className="text-xl font-bold text-red-500 mt-4 mr-10">
              Rs. {product.price - product.discountPrice}{" "}
              <span className="line-through text-gray-400 text-sm ml-5">
                Rs. {product.price}
              </span>
              <span className="text-black text-sm ml-2">
                -{Math.round((product.discountPrice / product.price) * 100)}%
              </span>
            </p>

            {/* Free Delivery Section */}
            <div className="flex items-center text-green-600 mt-2">
              <Truck className="w-6 h-6 mr-2" />
              <span className="text-sm">Free Delivery Available</span>
            </div>

            <div className="mt-5 space-y-4">
              {/* Quantity Selection */}
              <div className="flex items-center">
                <span className="text-gray-700 font-semibold mr-4">
                  Quantity:
                </span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    className="px-3 py-1 border-r border-gray-300"
                  >
                    -
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="px-3 py-1 border-l border-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <p className="text-gray-700 font-semibold">
                  Color Family:{" "}
                  <span className="text-black">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      className={`px-4 py-1 border rounded-md transition-colors duration-300 ${
                        selectedColor === color
                          ? "border-orange-500"
                          : "border-gray-300"
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection (only if “cloths” category) */}
              {showSizeSection && (
                <div>
                  <p className="text-gray-700 font-semibold">
                    Size: <span className="text-black">{selectedSize}</span>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {sizes.map((size, index) => (
                      <button
                        key={index}
                        className={`px-4 py-1 border rounded-md transition-colors duration-300 ${
                          selectedSize === size
                            ? "border-orange-500"
                            : "border-gray-300"
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg mr-2 transition-colors duration-300 hover:bg-blue-700 active:bg-blue-800">
                Buy Now
              </button>
              <button
                className="bg-gray-300 px-6 py-2 rounded-lg transition-colors duration-300 hover:bg-gray-500 active:bg-gray-200"
                onClick={handleAddToCart} // Attach the function to Add to Cart
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Show Popup after Add to Cart action */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h3 className="text-lg font-bold">Cart Update</h3>
              <p className="mt-2">{popupMessage}</p>{" "}
              {/* Display success or error message */}
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowPopup(false)} // Close the popup
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Tabs Section */}
        <div className="mt-6 border-t pt-4">
          <div className="flex flex-wrap space-x-6 border-b">
            {["description", "specification", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 px-4 ${
                  activeTab === tab
                    ? "border-b-2 border-blue-500 font-bold"
                    : ""
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="mt-4 text-gray-600">
            {activeTab === "description" && (
              <>
                <p className="mb-4 text-justify">{product.description}</p>
              </>
            )}

            {activeTab === "specification" && (
              <>
                <h3 className="text-lg font-semibold mb-4 ">
                  Item specifics -{" "}
                </h3>
                <div className="grid grid-cols-2 gap-y-32 text-gray-700 mt-5">
                  <div className="space-y-2 ml-28 text-justify">
                    <p>
                      <strong>Material:</strong> Ultra-soft, breathable fabric
                    </p>
                    {/* ...other spec fields... */}
                  </div>
                  <div className="space-y-2 ml-28 text-justify">
                    {/* ...more spec fields... */}
                  </div>
                </div>
              </>
            )}

            {activeTab === "reviews" && <ProductReview />}
          </div>
        </div>
      </div>

      {/* Popup Card */}
      {/* {showPopup && (
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
      )} */}

      {/* Related Products Section */}
      <div className="mt-16 text-center">
        <h2 className="text-4xl font-bold mb-10">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-10 gap-8 px-4 md:px-12 lg:px-20">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="flex justify-center">
              <ProductCard
                product={{
                  id: relatedProduct.id,
                  name: relatedProduct.productName,
                  price: relatedProduct.price - relatedProduct.discountPrice,
                  image: relatedProduct.images[0],
                  rating: 4.5,
                  discount: Math.round(
                    (relatedProduct.discountPrice / relatedProduct.price) * 100
                  ),
                  isInStock: relatedProduct.quantity > 0,
                  isBestSeller: true,
                  isFavorite: true,
                  isFreeDelivery: true,
                  isDiscounted: relatedProduct.discountPrice > 0,
                  isAdd: false,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto mt-10 border-t border-gray-300 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Secure & Convenient Payment Methods
            </h2>
            <div className="flex justify-center md:justify-start items-center gap-4">
              <Image
                src="/paymentMethod.jpg"
                alt="Payment Methods"
                width={400}
                height={100}
                className="max-w-full h-auto"
              />
              <p className="text-gray-600 text-sm align-middle text-justify mt-2 items-center">
                We offer multiple payment options, including Credit/Debit Cards,
                Digital Wallets and Bank Transfers, ensuring a smooth and
                hassle-free shopping experience. Our platform supports Visa,
                Mastercard, American Express, and other local payment methods to
                provide seamless transactions. For high-value purchases, you can
                take advantage of Easy Monthly Installments (EMI), making
                payments more manageable. Additionally, we offer reward points
                on select payment methods, allowing you to save more on future
                purchases. To ensure the highest level of security, all
                transactions are PCI DSS compliant, protecting your financial
                data with advanced encryption and fraud prevention measures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
