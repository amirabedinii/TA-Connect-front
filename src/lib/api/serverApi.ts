import { cookies } from 'next/headers';
import { createApiClient } from './apiClient';

export async function getServerSideAPI() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  return createApiClient(token);
}

export async function serverFetch<T>(endpoint: string, options?: RequestInit , params?: any): Promise<T> {
  const api = await getServerSideAPI();
  const response = await api.get<T>(endpoint);
  return response.data;
} 