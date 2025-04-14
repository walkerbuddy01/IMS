import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from './use-toast';
import { useNavigate } from 'react-router-dom';
 
interface LoginPayload {
  email: string;
  password: string;
}
 
interface LoginResponse {
  statusCode: number;
  data: any; // Update this to the actual shape if needed
  message: string;
}
 
export const useLoginUser = () => {
  const navigate = useNavigate();
  return useMutation<LoginResponse, unknown, LoginPayload>({
    mutationFn: async (credentials) => {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/v1/user/login',
          credentials,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      toast({
        title: "Login successful",
        description: "Welcome back to Kovora Inventory Management System",
      });
      navigate("/dashboard");
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: "Please enter valid credentials",
        variant: "destructive",
      });
    },
  });
};