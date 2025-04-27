import axios from "axios";
import { BASE_URL } from "@/config/baseUrl";

export interface ProductResponse {
  id: number;
  productName: string;
  description: string;
  quantity: number;
  brand: string;
  images: string[];
  categories: string[];
  price: number;
  discountPrice: number;
  seoTitle: string;
  // add more fields if you need them…
}

export async function fetchProductById(id: string): Promise<ProductResponse> {
  const response = await axios.get<ProductResponse>(
    `${BASE_URL}/products/${id}`
  );
  return response.data;
}

// New function to fetch related products based on category
export async function fetchRelatedProducts(
  category: string
): Promise<ProductResponse[]> {
  const response = await axios.get<ProductResponse[]>(
    `${BASE_URL}/products?category=${category}`
  );
  return response.data;
}
