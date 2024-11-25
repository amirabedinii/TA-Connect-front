import axios from 'axios';
import { showToast } from '../utils/utils';

export const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8000';

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
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('isLogin');
        showToast.error('لطفا مجددا وارد حساب کاربری خود شوید');
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