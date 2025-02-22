import { getCookie, getHeader } from "h3";

export const request = async <T>(
  endpoint: string,
  options: any = {}
): Promise<T> => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiUrl || "";

  // Xác định URL đầy đủ
  let url: string = endpoint.startsWith("http://") || endpoint.startsWith("https://")
    ? endpoint
    : `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  // Lấy token nếu `auth: true` (chỉ lấy từ headers hoặc cookies trên server)
  let token: string | null = null;
  if (options.auth) {
    token = getHeader(options?.event, "authorization") || getCookie(options?.event, "accessToken") || null;
  }

  // Thiết lập headers mặc định
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Nếu có token, thêm vào headers
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return await $fetch(url, {
    ...options,
    headers,
  });
};

export const fetchConfig = {
  get: async <T>(endpoint: string, event: any = null, options: any = {}) => {
    return await request<T>(endpoint, { ...options, method: "GET", event });
  },
  post: async <T>(endpoint: string, event: any = null, body: any = null, options: any = {}) => {
    return await request<T>(endpoint, { ...options, method: "POST", body, event });
  },
  put: async <T>(endpoint: string, event: any = null, body: any = null, options: any = {}) => {
    return await request<T>(endpoint, { ...options, method: "PUT", body, event });
  },
  patch: async <T>(endpoint: string, event: any = null, body: any = null, options: any = {}) => {
    return await request<T>(endpoint, { ...options, method: "PATCH", body, event });
  },
  delete: async <T>(endpoint: string, event: any = null, options: any = {}) => {
    return await request<T>(endpoint, { ...options, method: "DELETE", event });
  },
};
