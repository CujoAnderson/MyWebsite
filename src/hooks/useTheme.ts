import { useCallback, useEffect } from 'react';
import { useStore } from '../store';

export function useTheme() {
  const { settings, updateSettings } = useStore();

  const toggleTheme = useCallback(() => {
    const newTheme = settings.theme === 'dark' ? 'light' : 'dark';
    updateSettings({ theme: newTheme });
  }, [settings.theme, updateSettings]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
  }, [settings.theme]);

  return {
    theme: settings.theme,
    toggleTheme
  };
}