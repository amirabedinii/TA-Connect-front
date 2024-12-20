import axios from "axios";
import { showToast } from "../utils/utils";
import { cookies } from "next/headers";

export const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:8000";

export const createApiClient = (access?: string , refresh?: string) => {
  const client = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ...(access && { Authorization: `JWT ${access}` }),
    },
  });

  // Response interceptor
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Handle specific error cases
      if (error.response?.status === 401 && !error.config._retry) {
        // clear the local storage and cookies
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        document.cookie = "access=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        document.cookie = "refresh=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        document.cookie = "isLogin=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        document.cookie = "user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        //window.location.href = "/login";
        showToast.error("لطفا مجددا وارد حساب کاربری خود شوید");
        // try {

        //   const response = await axios.post(`${BASE_URL}/auth/jwt/refresh/`, {
        //     refresh: refresh,
        //   });
        //   if (response.status === 200) {
        //     localStorage.setItem("access", response.data.access);
        //     localStorage.setItem("refresh", response.data.refresh);
        //     return client.request(error.config);
        //   }
        // } catch (error) {
        //   console.error("Error refreshing token:", error);
        //   localStorage.removeItem("access");
        //   localStorage.removeItem("refresh");
        //   window.location.href = "/login";
        //   showToast.error("لطفا مجددا وارد حساب کاربری خود شوید");
        // }
      }
      if (error.response?.status === 403) {
        showToast.error("عدم دسترسی!");
      }
      return Promise.reject(error);
    }
  );

  return client;
};
