import { persist } from 'zustand/middleware';
import { type StateCreator, create } from 'zustand';
import { Profile } from '../types';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
  profile: Profile;
  setProfile: (token: string) => void;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  profile: {
    id: 0,
    username: '',
    iat: 0,
    exp: 0
  },

  setProfile: (token) => {
    const decode = jwtDecode<Profile>(token);
    set(() => ({
      profile: decode
    }));
  }
});

export const useAuthStore = create<AuthState>()(
  persist(storeApi, { name: 'profile' })
);
