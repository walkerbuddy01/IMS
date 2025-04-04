import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

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
  return useMutation<RegisterResponse, unknown, RegisterPayload>({
    mutationFn: async (userData) => {
      const response = await axios.post(
        'http://localhost:8000/api/v1/user/register',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    },
  });
};
