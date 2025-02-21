export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
export interface ApiOptions<T = any> {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: T;
  query?: Record<string, any>;
  headers?: HeadersInit;
  auth?: boolean;
}
