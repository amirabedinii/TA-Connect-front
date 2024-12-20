import { cookies } from 'next/headers';
import { createApiClient } from './apiClient';

export async function getServerSideAPI() {
  const cookieStore = await cookies();
  const access = cookieStore.get('access')?.value;
  return createApiClient(access);
}

export async function serverFetch<T>(endpoint: string): Promise<T> {
  const api = await getServerSideAPI();
  const response = await api.get<T>(endpoint);
  return response.data;
} 