import axios from 'axios';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api';

export const createApiClient = (token?: string) => {
  const client = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  // Response interceptor
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Handle specific error cases
      if (error.response?.status === 401) {
        // Handle unauthorized on client side only
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );

  return client;
}; 