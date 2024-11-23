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

export const useAuth = () => {
  const router = useRouter();

  const useSignUp = () => {
    return useMutation<AuthResponse, AuthError, SignUpCredentials>({
      mutationFn: async (credentials) => {
        return clientFetch.post<AuthResponse>("/auth/users/", credentials);
      },
      onSuccess: (data) => {
        router.push("/login");
        showToast.success("برای ادامه دادن وارد حساب کاربری خود شوید");
      },
      onError: (error) => {
        showToast.error(error.message);
      },
    });
  };

  const useLogin = () => {
    return useMutation<LoginResponse, AuthError, LoginCredentials>({
      mutationFn: async (credentials) => {
        return clientFetch.post<LoginResponse>("/auth/jwt/create", credentials);
      },
      onSuccess: (data) => {
        // TODO: store tokens in cookies and local storage
        //   localStorage.setItem('access', data.access);
        //   localStorage.setItem('refresh', data.refresh);
        localStorage.setItem("isLogin", "true");
        router.push("/");
        showToast.success("به پنل کاربری خود خوش آمدید");
      },
    });
  };

  const useLogout = () => {
    return useMutation<void, AuthError, void>({
      mutationFn: async () => {
        await clientFetch.post("/auth/logout");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
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
