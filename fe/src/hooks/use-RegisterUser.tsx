import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";
import { useNavigate } from "react-router-dom";

interface RegisterPayload {
  fullname: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  statusCode: number;
  data: any; // adjust based on your API
  message: string;
}

export const useRegisterUser = () => {
  const navigate = useNavigate();
  return useMutation<RegisterResponse, unknown, RegisterPayload>({
    mutationFn: async (userData) => {
      console.log(userData);
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: () => {
      toast({
        title: "Sign Up completed",
        description: "Welcome to Kovora Inventory Management System",
      });
      navigate("/dashboard");
    },
    onError: (error) => {
      toast({
        title: "ERROR OCCURED",
        description: error as string,
        variant: "destructive",
      });
    },
  });
};
