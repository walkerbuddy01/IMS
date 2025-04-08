import { useMutation } from "@tanstack/react-query";
import axios from "axios";
interface Product {
    title: string;
    sku: string;
    barcode?: string;
    category?: string;
    price: number;
    stock: number;
    description?: string;
    status?: "active" | "draft";
    dimensions: {
      length: number;
      width: number;
      height: number;
      weight: number;
    };
    shipping: {
      carton: {
        weight: number;
        length: number;
        width: number;
        height: number;
      };
      countryOrigin?: string;
      hsCode?: string;
      customsDescription?: string;
      freight?: string[];
    };
    inventory: {
      warehouses: string[];
      emergencyStockLevel: number;
      moq: number;
      leadTime: number;
    };
    pricing: {
      cogs: number;
      retail: number;
    };
    supplier?: string;
    paymentTerms?: string;
    customFields: {
      name: string;
      value: string;
    }[];
    imageUrl?: string;
    createdAt?: string;
  }
  
export function useCreateProduct() {

  return useMutation({
    mutationFn: async (newProduct: Product) => {
      const response = await axios.post(
        ` http://localhost:8000/api/v1/product`,
        newProduct
      );
      return response.data;
    },
  });
}
