import { useMutation } from "@tanstack/react-query";
import {
  SignUpCredentials,
  LoginCredentials,
  AuthResponse,
  AuthError,
  LoginResponse,
} from "../types/auth.types";
import { clientFetch } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/utils/utils";
import { BASE_URL } from "@/lib/api/apiClient";

export const useAuth = () => {
  const router = useRouter();

  const fetchSignUp = async (credentials: SignUpCredentials) => {
    const response = await fetch(`${BASE_URL}/auth/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Authentication failed');
    }
    return response.json();
  };

  const useSignUp = () => {
    return useMutation<AuthResponse, AuthError, SignUpCredentials>({
      mutationFn: async (credentials) => {
        return fetchSignUp(credentials);
      },
      onError: (error) => {
        showToast.error(error.message);
      },
    });
  };

  const fetchLogin = async (credentials: LoginCredentials) => {
    // dont use clientFetch here because it will be used in the interceptor
    const response = await fetch(`${BASE_URL}/auth/jwt/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Authentication failed');
    }
    return response.json();
  };
  const useLogin = () => {
    return useMutation<LoginResponse, AuthError, LoginCredentials>({
      mutationFn: async (credentials) => {
        const response = await fetchLogin(credentials);
        console.log("Login response:", response);
        document.cookie = `access=${response.access}; path=/`;
        document.cookie = `refresh=${response.refresh}; path=/`;
        localStorage.setItem('access', response.access);
        localStorage.setItem('refresh', response.refresh);
        return response;
      },
    });
  };

  const useLogout = () => {
    return useMutation<void, AuthError, void>({
      mutationFn: async () => {
        //await clientFetch.post("/auth/logout");
        document.cookie = "access=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        document.cookie = "refresh=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("isLogin");
      },
      onSuccess: () => {
        router.push("/login");
      },
    });
  };

  return {
    useSignUp,
    useLogin,
    useLogout,
  };
};
