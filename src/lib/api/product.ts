
import axios from "axios";
import { Product } from "@/lib/types/productTypes";

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>("https://fakestoreapi.com/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw new Error("Unable to fetch featured products. Please try again later.");
  }
};


export const getProductById = async (id: string): Promise<Product | null> => {
    try {
      const response = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      return null; 
    }
  };
