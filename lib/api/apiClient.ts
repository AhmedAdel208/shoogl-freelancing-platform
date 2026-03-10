import axios, { AxiosError } from "axios";

const isProduction = process.env.NODE_ENV === "production";

export const apiClient = axios.create({
  baseURL: isProduction ? "/api-proxy" : "https://shogol.runasp.net/api",
  headers: {
    "Content-Type": "application/json",
    accept: "*/*",
  },
});

// Request Interceptor to add Auth Token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor for cleaner error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Extract backend error message
    const backendData = error.response?.data as
      | { message?: string; title?: string; errors?: any }
      | undefined;

    console.log("Raw error response:", error.response?.data);

    // Create a standardized error object
    const standardizedError = {
      message:
        backendData?.message || backendData?.title || "حدث خطأ غير متوقع",
      errors: backendData?.errors || {},
      status: error.response?.status,
      isBackendError: !!error.response,
    };

    console.log("Standardized error:", standardizedError);
    return Promise.reject(standardizedError);
  },
);
