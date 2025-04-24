import { supplierDetailsI } from "@/components/supplier/AddSupplierDialog";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useCreateSupplier(
  onSuccess?: () => void,
  onError?: (err: unknown) => void
) {
  return useMutation({
    mutationFn: async (data: supplierDetailsI) => {
      const response = await axios.post(
        import.meta.env.VITE_BE_URL + "/api/v1/supplier",
        data
      );
      return response.data;
    },
    onSuccess,
    onError,
  });
}
