import axios from 'axios';
import { showToast } from '../utils/utils';
import { useRouter } from 'next/navigation';


export const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8000';

export const createApiClient = (access?: string, refresh?: string) => {
  const client = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(access && { Authorization: `Bearer ${access}` }),
    },
  });

  // Response interceptor
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const router = useRouter();
      
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
      if (error.response?.status === 403) {
        // try to refresh token and retry the request
        const refresh = localStorage.getItem('refresh');
        const response = await axios.post(`${BASE_URL}/auth/jwt/refresh/`, { refresh });
        if (response.status === 200) {
          localStorage.setItem('access', response.data.access);
          localStorage.setItem('refresh', response.data.refresh);
          if (error.config) {
            return client.request(error.config);
          }
        } else {
          showToast.error('لطفا مجددا وارد حساب کاربری خود شوید');
          router.push('/login');
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
        }
      }
      return Promise.reject(error);
    }
  );

  return client;
}; 