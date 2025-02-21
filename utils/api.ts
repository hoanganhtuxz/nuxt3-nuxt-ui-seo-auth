// import type { ApiOptions } from "~/types/api";

// export const api = {
//   async request<T>(
//     endpoint: string,
//     options: ApiOptions = {}
//   ): Promise<T> {
//     const config = useRuntimeConfig();
//     const baseApiUrl = config.public.apiUrl || "";
//     // const token = useState("accessToken");
//     // const user = useState("user");
//     const token = "";

//     let url: string;
//     if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
//       url = endpoint;
//     } else {
//       url = `${baseApiUrl}/${
//         endpoint.startsWith("/") ? endpoint : `/${endpoint}`
//       }`;
//     }
//     try {
//       const response = await $fetch(url, {
//         method: options.method || "GET",
//         body: options.body || undefined,
//         query: options.query || undefined,
//         headers: {
//           Authorization: options.auth !== false ? `Bearer ${token}` : "",
//           "Content-Type": "application/json",
//           ...options.headers,
//         },
//       });
//       return response as T;
//     } catch (error: any) {
//       console.error("api error", error);
//       // Xử lý lỗi 401 Unauthorized
//       if (error.response?.status === 401) {
//         // Xóa thông tin người dùng và token
//         // user.value = null;
//         // token.value = null;
//       }
//       throw error;
//     }
//   },

//   get<T>(
//     endpoint: string,
//     query?: Record<string, any>,
//     options?: Omit<ApiOptions, "method" | "body">
//   ) {
//     return api.request<T>(endpoint, { ...options, method: "GET", query });
//   },

//   post<T>(endpoint: string, body: any, options?: Omit<ApiOptions, "method">) {
//     return api.request<T>(endpoint, { ...options, method: "POST", body });
//   },

//   put<T>(endpoint: string, body: any, options?: Omit<ApiOptions, "method">) {
//     return api.request<T>(endpoint, { ...options, method: "PUT", body });
//   },
//   patch<T>(endpoint: string, body: any, options?: Omit<ApiOptions, "method">) {
//     return api.request<T>(endpoint, { ...options, method: "PATCH", body });
//   },
//   delete<T>(endpoint: string, options?: Omit<ApiOptions, "method" | "body">) {
//     return api.request<T>(endpoint, { ...options, method: "DELETE" });
//   },
// };

// export default api;
