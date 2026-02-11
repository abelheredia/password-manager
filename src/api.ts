import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios';
import { ApiResponse } from './types/api';

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3030/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 20000
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
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
      const { status, data } = error.response;

      switch (status) {
        case 401:
          localStorage.removeItem('token');
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
          break;
        case 403:
          console.error('No tienes permisos para esta acción');
          break;
        case 404:
          console.error('Recurso no encontrado');
          break;
        default:
          console.error(data?.message || 'Ocurrió un error inesperado');
      }
    } else if (error.request) {
      console.error('Error de red: No se recibió respuesta del servidor');
    }

    return Promise.reject(error);
  }
);

export default api;
