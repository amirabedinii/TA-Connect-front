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
    const headers: HeadersInit = {};
    
    // Don't set Content-Type for FormData - browser will set it with boundary
    if (!(data instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      headers,
      credentials: 'include',
      body: data instanceof FormData ? data : JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        message: errorData.detail || 'An error occurred',
        status: response.status,
      };
    }

    return response.json();
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
