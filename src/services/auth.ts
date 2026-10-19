import api from '../api';
import { ApiResponse } from '../types/api';
import { LoginCredentials, AuthResponse, RegisterData } from '../types/auth';

export const authService = {
  login: async (
    credentials: LoginCredentials
  ): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      credentials
    );
    return response.data;
  },

  register: async (userData: RegisterData): Promise<string> => {
    const response = await api.post<ApiResponse<string>>(
      '/auth/registro',
      userData
    );
    return response.data.message;
  },

  forgotPassword: async (email: string): Promise<string> => {
    const response = await api.post<ApiResponse<string>>(
      '/auth/forgot-password',
      { email }
    );
    return response.data.message;
  }
};
