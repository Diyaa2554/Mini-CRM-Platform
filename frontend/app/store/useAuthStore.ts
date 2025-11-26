
import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  user: any; 
  login: (user: any) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  login: (user) => set({ isLoggedIn: true, user }),
  logout: () => {
    sessionStorage.removeItem('googleIdToken');
    sessionStorage.removeItem('user');
    set({ isLoggedIn: false, user: null });
  },
}));

export default useAuthStore;
