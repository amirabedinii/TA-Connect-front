import { createApiClient } from './apiClient';

export function getClientSideAPI() {
  let accessToken: string | undefined;
    
  // Only access localStorage on client side
  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('access') || undefined;
    //console.log(accessToken, "accessToken");
  }

  return createApiClient(accessToken);
}

export const clientFetch = {
  get: async <T>(endpoint: string): Promise<T> => {
    const api = getClientSideAPI();
    const response = await api.get<T>(endpoint);
    return response.data;
  },
  
  post: async <T, D = unknown>(endpoint: string, data?: D): Promise<T> => {
    const api = getClientSideAPI();
    const response = await api.post<T>(endpoint, data);
    return response.data;
  },
  
  put: async <T>(url: string, data: FormData | object): Promise<T> => {
    const api = getClientSideAPI();
    
    try {
      let response;
      if (data instanceof FormData) {
        response = await api.put<T>(url, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await api.put<T>(url, data);
      }
      
      return response.data;
    } catch (error) {
      console.error('API put request failed:', error);
      throw error;
    }
  },
  
  delete: async <T>(endpoint: string): Promise<T> => {
    const api = getClientSideAPI();
    const response = await api.delete<T>(endpoint);
    return response.data;
  },

  patch: async <T, D = unknown>(endpoint: string, data?: D): Promise<T> => {
    const api = getClientSideAPI();
    const response = await api.patch<T>(endpoint, data);
    return response.data;
  },
}; 
