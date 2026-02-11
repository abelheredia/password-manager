import api from '../api';
import { ApiResponse } from '../types/api';
import { Password } from '../types';

export const passwordService = {
  getAll: async (): Promise<Password[]> => {
    const response = await api.get<ApiResponse<Password[]>>('/passwords');
    return response.data.data;
  },

  create: async (passwordData: Omit<Password, 'id'>): Promise<Password> => {
    const response = await api.post<ApiResponse<Password>>(
      '/passwords',
      passwordData
    );
    return response.data.data;
  },

  update: async (
    id: number,
    passwordData: Partial<Password>
  ): Promise<Password> => {
    const response = await api.put<ApiResponse<Password>>(
      `/passwords/${id}`,
      passwordData
    );
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete<ApiResponse<null>>(`/passwords/${id}`);
  }
};
