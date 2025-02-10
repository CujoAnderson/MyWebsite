import { create } from 'zustand';
import type { TextAnalysis, Character, Setting } from './types/analysis';
import type { User, LoginCredentials, RegisterData, UserRole } from './types/auth';
import * as authService from './lib/auth';

interface StoreState {
  // Previous state properties...
  user: User | null;
  users: User[];
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUserRole: (userId: string, role: UserRole) => Promise<void>;
}

export const useStore = create<StoreState>((set) => ({
  // Previous state...
  user: null,
  users: [],
  login: async (credentials) => {
    const { user, token } = await authService.login(credentials);
    localStorage.setItem('token', token);
    set({ user });
  },
  register: async (data) => {
    const { user, token } = await authService.register(data);
    localStorage.setItem('token', token);
    set({ user });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null });
  },
  updateUserRole: async (userId, role) => {
    // Implementation for updating user roles
    // This would make an API call and update the local state
  },
}));