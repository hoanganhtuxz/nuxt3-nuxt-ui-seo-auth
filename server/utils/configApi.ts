export const request = async <T>(
  endpoint: string,
  event: any = null,
  options: any = {}
): Promise<T> => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiUrl || "";
  const token = event ? getHeader(event, "authorization") : null;

  let url: string = endpoint.startsWith("http://") || endpoint.startsWith("https://")
    ? endpoint
    : `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  return await $fetch(url, {
    ...options,
    headers: {
      Authorization: token || "",
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
};

export const fetchConfig = {
  get: async <T>(endpoint: string, event: any = null, options: any = {}) => {
    return await request<T>(endpoint, event, { ...options, method: "GET" });
  },
  post: async <T>(endpoint: string, event: any = null, body: any = null, options: any = {}) => {
    return await request<T>(endpoint, event, { ...options, method: "POST", body });
  },
  put: async <T>(endpoint: string, event: any = null, body: any = null, options: any = {}) => {
    return await request<T>(endpoint, event, { ...options, method: "PUT", body });
  },
  patch: async <T>(endpoint: string, event: any = null, body: any = null, options: any = {}) => {
    return await request<T>(endpoint, event, { ...options, method: "PATCH", body });
  },
  delete: async <T>(endpoint: string, event: any = null, options: any = {}) => {
    return await request<T>(endpoint, event, { ...options, method: "DELETE" });
  },
};
