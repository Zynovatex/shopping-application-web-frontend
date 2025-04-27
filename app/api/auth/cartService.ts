import axios from "axios";
import { BASE_URL } from "@/config/baseUrl";

export const addToCart = async (
  productId: number,
  productName: string,
  price: number,
  quantity: number
) => {
  const token = localStorage.getItem("authToken"); // Get the token from localStorage (ensure it's stored during login)
  console.log(token);

  try {
    const response = await axios.post(
      `${BASE_URL}/buyer/cart/add`,
      { productId, productName, price, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

// ✅ Remove product from cart
export const removeFromCart = async (productId: number) => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.delete(`${BASE_URL}/buyer/cart/remove`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        productId: productId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing product from cart", error);
    throw error;
  }
};

// ✅ Update product quantity in cart
export const updateCartQuantity = async (
  productId: number,
  quantity: number
) => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.put(`${BASE_URL}/buyer/cart/update`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        productId: productId,
        quantity: quantity,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating cart quantity", error);
    throw error;
  }
};

// Fetch cart
export const fetchCart = async () => {
  const token = localStorage.getItem("authToken"); // ✅ Get token inside the function

  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  try {
    const response = await axios.get(`${BASE_URL}/buyer/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cart", error);
    throw error;
  }
};
