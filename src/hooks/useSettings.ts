import { useCallback } from 'react';
import { useStore } from '../store';
import type { Settings } from '../types/settings';

export function useSettings() {
  const { settings, updateSettings: update } = useStore();

  const updateSettings = useCallback((newSettings: Partial<Settings>) => {
    update(newSettings);
  }, [update]);

  return {
    settings,
    updateSettings
  };
}