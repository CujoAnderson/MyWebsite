import { StateCreator } from 'zustand';
import type { User, LoginCredentials, RegisterData, UserRole } from '../../types/auth';
import * as authService from '../../lib/auth';
import { AppState } from '../types';

export interface AuthSlice {
  user: User | null;
  users: User[];
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUserRole: (userId: string, role: UserRole) => Promise<void>;
  clearError: () => void;
}

export const createAuthSlice: StateCreator<AppState, [], [], AuthSlice> = (set) => ({
  user: null,
  users: [],
  isLoading: false,
  error: null,
  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });
      const { user, token } = await authService.login(credentials);
      localStorage.setItem('token', token);
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Login failed', isLoading: false });
      throw error;
    }
  },
  register: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const { user, token } = await authService.register(data);
      localStorage.setItem('token', token);
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Registration failed', isLoading: false });
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null });
  },
  updateUserRole: async (userId, role) => {
    try {
      set({ isLoading: true, error: null });
      await authService.updateUserRole(userId, role);
      set((state) => ({
        users: state.users.map((user) =>
          user.id === userId ? { ...user, role } : user
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Role update failed', isLoading: false });
      throw error;
    }
  },
  clearError: () => set({ error: null })
});