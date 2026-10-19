import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios';
import { ApiResponse } from './types/api';

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 20000
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const storage = JSON.parse(
      localStorage.getItem('profile-storage') as string
    );
    if (storage) {
      const {
        state: {
          profile: { token }
        }
      } = storage;

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { data } = error.response;
      console.error(data?.message || 'Ocurrió un error inesperado');
    } else if (error.request) {
      console.error('Error de red: No se recibió respuesta del servidor');
    }

    return Promise.reject(error);
  }
);

export default api;
