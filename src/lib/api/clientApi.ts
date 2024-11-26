import { createApiClient } from './apiClient';

export function getClientSideAPI() {
  let accessToken: string | undefined;
  let refreshToken: string | undefined;
  
  // Only access localStorage on client side
  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('access') || undefined;
  }
  if (typeof window !== 'undefined') {
    refreshToken = localStorage.getItem('refresh') || undefined;
  }
  return createApiClient(accessToken, refreshToken);
}

export const clientFetch = {
  get: async <T>(endpoint: string): Promise<T> => {
    const api = getClientSideAPI();
    const response = await api.get<T>(endpoint);
    return response.data;
  },
  
  post: async <T>(endpoint: string, data?: any): Promise<T> => {
    const api = getClientSideAPI();
    const response = await api.post<T>(endpoint, data);
    return response.data;
  },
  
  put: async <T>(endpoint: string, data?: any): Promise<T> => {
    const api = getClientSideAPI();
    const response = await api.put<T>(endpoint, data);
    return response.data;
  },
  
  delete: async <T>(endpoint: string): Promise<T> => {
    const api = getClientSideAPI();
    const response = await api.delete<T>(endpoint);
    return response.data;
  },
}; 