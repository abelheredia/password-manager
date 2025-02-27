import { persist } from 'zustand/middleware';
import { type StateCreator, create } from 'zustand';
import { Password } from '../types';

interface PasswordsState {
  passwords: Password[];
  createPassword: (password: Password) => void;
  updatePassword: (password: Password) => void;
  deletePassword: (id: string) => void;
  readPasswords: () => void;
}

const storeApi: StateCreator<PasswordsState> = (set) => ({
  passwords: [],

  createPassword: (password) =>
    set((state) => ({
      passwords: [...state.passwords, password]
    })),

  updatePassword: (password) =>
    set((state) => ({
      passwords: state.passwords.map((p) => (p.id === password.id ? password : p))
    })),

  deletePassword: (id) =>
    set((state) => ({
      passwords: state.passwords.filter((password) => password.id !== id)
    })),

  readPasswords: () =>
    set((state) => ({
      passwords: state.passwords
    }))
});

export const usePasswordsStore = create<PasswordsState>()(persist(storeApi, { name: 'passwords' }));
