import axios from 'axios';

/**
 * Central Axios instance configured with environment-based base URL
 * and standard request/response interceptors.
 */
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor (Inject future auth tokens or request tracing)
axiosClient.interceptors.request.use(
  (config) => {
    // Read optional token for future authentication integration
    const token = localStorage.getItem('teamsync_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (Normalize API errors)
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const customError = {
      message:
        error.response?.data?.message ||
        error.message ||
        'Unable to communicate with TeamSync server',
      status: error.response?.status || 500,
      errors: error.response?.data?.errors || null,
    };
    return Promise.reject(customError);
  }
);

// API Service Methods
export const api = {
  // Health status check
  getHealth: () => axiosClient.get('/health'),
  
  // Generic helper methods for future feature expansions
  get: (url, config) => axiosClient.get(url, config),
  post: (url, data, config) => axiosClient.post(url, data, config),
  put: (url, data, config) => axiosClient.put(url, data, config),
  patch: (url, data, config) => axiosClient.patch(url, data, config),
  delete: (url, config) => axiosClient.delete(url, config),
};

export default axiosClient;
