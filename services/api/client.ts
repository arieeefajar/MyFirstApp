import { create } from "axios";
import {
  getToken,
  isTokenExpired,
  notifyUnauthorized,
} from "./authSession";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

const apiClient = create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: cek token sebelum setiap request dikirim.
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (!token || isTokenExpired()) {
      notifyUnauthorized("expired");
      return Promise.reject(new Error("Sesi login telah berakhir"));
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: tangani token tidak valid dari server.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      notifyUnauthorized("unauthorized");
    }

    return Promise.reject(error);
  },
);

export default apiClient;
