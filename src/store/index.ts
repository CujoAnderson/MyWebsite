import { create } from 'zustand';
import { createAuthSlice } from './slices/authSlice';
import { createWritingSlice } from './slices/writingSlice';
import { createSettingsSlice } from './slices/settingsSlice';
import type { AppState } from './types';
import { devtools, persist } from 'zustand/middleware';

const DEFAULT_STATE = {
  settings: {
    fontSize: 'large',
    fontFamily: 'sans',
    autoSave: true,
    autoSaveInterval: 60,
    autoAnalyze: false,
    theme: 'light',
    highContrast: false
  },
  content: '',
  wordCount: 0,
  analysis: null,
  analyzing: false,
  aiSuggestions: [],
  user: null,
  users: [],
  isLoading: false,
  error: null
};

export const useStore = create<AppState>()(
  devtools(
    persist(
      (...args) => ({
        ...DEFAULT_STATE,
        ...createAuthSlice(...args),
        ...createWritingSlice(...args),
        ...createSettingsSlice(...args),
      }),
      {
        name: 'mythosforge-storage',
        partialize: (state) => ({
          settings: state.settings,
          content: state.content,
          wordCount: state.wordCount,
          user: state.user
        })
      }
    )
  )
);