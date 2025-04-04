import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

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
  });
};
