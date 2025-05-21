"use client";

import { useEffect, useState } from "react";
import {
  fetchCart,
  removeFromCart,
  updateCartQuantity,
} from "@/app/api/auth/cartService";

interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

interface Cart {
  items: {
    [key: number]: CartItem;
  };
}

const CartPage = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCart();
  }, []);

  // ✅ Load cart
  const loadCart = async () => {
    try {
      const cartData = await fetchCart();
      setCart(cartData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle quantity change
  const handleQuantityChange = async (productId: number, quantity: number) => {
    try {
      await updateCartQuantity(productId, quantity);
      loadCart();
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  // ✅ Handle product removal
  const handleRemoveProduct = async (productId: number) => {
    try {
      await removeFromCart(productId);
      loadCart();
    } catch (error) {
      console.error("Failed to remove product", error);
    }
  };

  // ✅ Calculate total cart amount
  const calculateTotalAmount = () => {
    if (!cart) return 0;
    return Object.values(cart.items).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // ✅ Handle checkout click
  const handleCheckout = () => {
    // For now just redirect to a placeholder page (can later create checkout page)
    window.location.href = "/checkout";
  };

  if (loading) {
    return <p>Loading your cart...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!cart || Object.keys(cart.items).length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Price (LKR)</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Total</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(cart.items).map((item) => (
              <tr key={item.productId}>
                <td className="border border-gray-300 p-2">
                  {item.productName}
                </td>
                <td className="border border-gray-300 p-2">
                  {item.price.toFixed(2)}
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.productId,
                        parseInt(e.target.value)
                      )
                    }
                    className="border border-gray-300 w-16 text-center"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  {(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleRemoveProduct(item.productId)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Cart Total Amount Display */}
      <div className="flex justify-end mt-6">
        <div className="text-right">
          <h2 className="text-xl font-bold">
            Total Amount: LKR {calculateTotalAmount().toFixed(2)}
          </h2>
          {/* ✅ Checkout Button */}
          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
