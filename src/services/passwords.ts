import api from '../api';
import { ApiResponse } from '../types/api';
import { Password, PasswordResponse } from '../types';
import { passwordAdapter } from '../adapters/passwords';

export const passwordService = {
  getAll: async (): Promise<Password[]> => {
    const response =
      await api.get<ApiResponse<PasswordResponse[]>>('/passwords');
    return passwordAdapter(response.data.data);
  },

  create: async (
    passwordData: Omit<Password, 'id' | 'main'>
  ): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/passwords', passwordData);
    return response.data;
  },

  update: async (
    id: number,
    passwordData: Partial<Password>
  ): Promise<ApiResponse> => {
    const response = await api.put<ApiResponse>(
      `/passwords/${id}`,
      passwordData
    );
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse> => {
    const response = await api.delete<ApiResponse>(`/passwords/${id}`);
    return response.data;
  }
};
