import { useCallback } from 'react';
import { useStore } from '../store';
import type { LoginCredentials, RegisterData } from '../types/auth';
import { isAppError } from '../lib/error';

export function useAuth() {
  const { login, register, logout, user, error, clearError, isLoading } = useStore();

  const handleLogin = useCallback(async (credentials: LoginCredentials) => {
    try {
      await login(credentials);
    } catch (error) {
      if (isAppError(error)) {
        // Handle specific error types
        console.error(error.code, error.message);
      } else {
        console.error('Login failed:', error);
      }
      throw error;
    }
  }, [login]);

  const handleRegister = useCallback(async (data: RegisterData) => {
    try {
      await register(data);
    } catch (error) {
      if (isAppError(error)) {
        console.error(error.code, error.message);
      } else {
        console.error('Registration failed:', error);
      }
      throw error;
    }
  }, [register]);

  return {
    user,
    error,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    logout,
    clearError
  };
}