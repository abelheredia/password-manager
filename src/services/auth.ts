import api from '../api';
import { ApiResponse } from '../types/api';
import { LoginCredentials, AuthResponse, RegisterData } from '../types/auth';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      credentials
    );
    return response.data.data;
  },

  register: async (userData: RegisterData): Promise<string> => {
    const response = await api.post<ApiResponse<null>>(
      '/auth/registro',
      userData
    );
    return response.data.message;
  },

  forgotPassword: async (email: string): Promise<string> => {
    const response = await api.post<ApiResponse<null>>(
      '/auth/forgot-password',
      { email }
    );
    return response.data.message;
  }
};
