import { useMutation } from '@tanstack/react-query';
import { SignUpCredentials, LoginCredentials, AuthResponse, AuthError } from '../types/auth.types';
import { clientFetch } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const router = useRouter();

  const useSignUp = () => {
    return useMutation<AuthResponse, AuthError, SignUpCredentials>({
      mutationFn: async (credentials) => {
        return clientFetch.post<AuthResponse>('/auth/signup', credentials);
      },
      onSuccess: (data) => {
        localStorage.setItem('token', data.token);
        document.cookie = `token=${data.token}; path=/`;
        router.push('/dashboard');
      },
    });
  };

  const useLogin = () => {
    return useMutation<AuthResponse, AuthError, LoginCredentials>({
      mutationFn: async (credentials) => {
        return clientFetch.post<AuthResponse>('/auth/login', credentials);
      },
      onSuccess: (data) => {
        localStorage.setItem('token', data.token);
        document.cookie = `token=${data.token}; path=/`;
        router.push('/dashboard');
      },
    });
  };

  const useLogout = () => {
    return useMutation<void, AuthError, void>({
      mutationFn: async () => {
        await clientFetch.post('/auth/logout');
        localStorage.removeItem('token');
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      },
      onSuccess: () => {
        router.push('/login');
      },
    });
  };

  return {
    useSignUp,
    useLogin,
    useLogout,
  };
}; 