import type { ApiOptions } from "~/types/api";

export const useApiClient = () => {
  const config = useRuntimeConfig();
  const baseApiUrl = config.public.apiUrl || "";
  const accessToken = useCookie("accessToken");

  const buildUrl = (endpoint: string): string => {
    if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
      return endpoint;
    }
    return `${baseApiUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  };

  const request = async <T>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
    const url = buildUrl(endpoint);
    try {
      const response = await $fetch(url, {
        method: options.method || "GET",
        body: options.body || undefined,
        query: options.query || undefined,
        headers: {
          Authorization: options.auth !== false ? `Bearer ${accessToken.value}` : "",
          "Content-Type": "application/json",
          ...options.headers,
        },
      });
      return response as T;
    } catch (error: any) {
      console.error("API error", error);
      // Xử lý lỗi 401 Unauthorized
      if (error.response?.status === 401) {
        // Xóa thông tin người dùng và token nếu cần
        // Có thể thực hiện logout hoặc redirect
      }
      throw error;
    }
  };

  return {
    
    get<T>(
      endpoint: string,
      query?: Record<string, any>,
      options?: Omit<ApiOptions, "method" | "body">
    ) {
      return request<T>(endpoint, { ...options, method: "GET", query });
    },

    post<T>(endpoint: string, body?: any, options?: Omit<ApiOptions, "method">) {
      return request<T>(endpoint, { ...options, method: "POST", body });
    },

    put<T>(endpoint: string, body?: any, options?: Omit<ApiOptions, "method">) {
      return request<T>(endpoint, { ...options, method: "PUT", body });
    },
    
    patch<T>(endpoint: string, body?: any, options?: Omit<ApiOptions, "method">) {
      return request<T>(endpoint, { ...options, method: "PATCH", body });
    },
    
    delete<T>(endpoint: string, options?: Omit<ApiOptions, "method" | "body">) {
      return request<T>(endpoint, { ...options, method: "DELETE" });
    },
  };
};