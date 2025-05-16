import { BASE_URL } from "@/config/baseUrl";
import axios from "axios";

/**
 * Shape of the shop object your backend returns.
 */
export interface ShopResponse {
  isFavorite(isFavorite: any): [any, any];
  id: number;
  shopName: string;
  address: string;
  category: string;
  shopImages: string[];
}

/**
 * Shape of the combined shop+products response.
 * (You may not need this on the landing page, but it’s here for future use.)
 */
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
}

export interface ShopWithProductsResponse {
  shop: ShopResponse;
  products: ProductResponse[];
}

const shopService = {
  /**
   * GET /api/shops
   * Returns all approved shops.
   */
  getAllShops: async (): Promise<ShopResponse[]> => {
    const { data } = await axios.get<ShopResponse[]>(`${BASE_URL}/shops`);
    return data;
  },

  /**
   * GET /api/shops/{id}
   * Returns one shop with its products.
   */
  getShopById: async (id: number): Promise<ShopWithProductsResponse> => {
    const { data } = await axios.get<ShopWithProductsResponse>(
      `${BASE_URL}/shops/${id}`
    );
    return data;
  },
};

export default shopService;
