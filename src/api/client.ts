import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('sp_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('sp_token');
      localStorage.removeItem('sp_user_type');
      window.location.href = '/candidate/login';
    } else if (error.response?.status === 403) {
      toast.error('No tenés permisos para esta acción');
    } else if (error.response?.status && error.response.status >= 500) {
      toast.error('Error del servidor. Intentá de nuevo más tarde.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
