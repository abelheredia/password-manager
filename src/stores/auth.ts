import { persist } from 'zustand/middleware';
import { type StateCreator, create } from 'zustand';
import { Profile, User } from '../types';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
  profile: Profile;
  setProfile: (token: string) => void;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  profile: {
    user: {
      id: 0,
      username: '',
      iat: 0,
      exp: 0
    },
    token: ''
  },

  setProfile: (token) => {
    const decode = jwtDecode<User>(token);
    set(() => ({
      profile: {
        user: decode,
        token
      }
    }));
  }
});

export const useAuthStore = create<AuthState>()(
  persist(storeApi, { name: 'profile' })
);
