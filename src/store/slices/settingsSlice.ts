import { StateCreator } from 'zustand';
import type { Settings } from '../../types/settings';
import { AppState } from '../types';

export interface SettingsSlice {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  toggleDarkMode: () => void;
}

const DEFAULT_SETTINGS: Settings = {
  fontSize: 'large',
  fontFamily: 'sans',
  autoSave: true,
  autoSaveInterval: 60,
  autoAnalyze: false,
  theme: 'light',
  highContrast: false
};

export const createSettingsSlice: StateCreator<AppState, [], [], SettingsSlice> = (set) => ({
  settings: DEFAULT_SETTINGS,
  updateSettings: (newSettings) => 
    set((state) => ({
      settings: { ...DEFAULT_SETTINGS, ...state.settings, ...newSettings }
    })),
  toggleDarkMode: () =>
    set((state) => ({
      settings: {
        ...state.settings,
        theme: state.settings?.theme === 'dark' ? 'light' : 'dark'
      }
    }))
});