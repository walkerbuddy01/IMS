import { useMutation } from "@tanstack/react-query";
import axios from "axios";


interface ProductPayload {
  title: string;
  sku: string;
  barcode: string;
  originalPrice: number;
  cogs: number;
  retail: number;
  supplierId: string;
  warehouseId: string;
  emergencyStockLevel: number;
  moq: number;
  productionLeadTime: number;
  freightId: string;
  paymentTerms: string;
  ProductImageUrl: string;
  status: string;
  cartonWeight: number;
  cartonLength: number;
  cartonWidth: number;
  cartonHeight: number;
  countryOrigin: string;
  hsCode: string;
  customsDescription: string;
  productLength: number;
  productWidth: number;
  productHeight: number;
  productWeight: number;
}

/**
 * Hook to create a product via API.
 */
export function useCreateProduct(
  onSuccess?: () => void,
  onError?: (err: unknown) => void
) {
  return useMutation({
    mutationFn: async (data: ProductPayload) => {
      const response = await axios.post(
        "http://localhost:8000/api/v1/product",
        data
      );
      return response.data;
    },
    onSuccess,
    onError,
  });
}
