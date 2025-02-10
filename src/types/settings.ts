export interface Settings {
  fontSize: 'small' | 'medium' | 'large' | 'xl';
  fontFamily: 'serif' | 'sans' | 'mono' | 'dyslexic';
  autoSave: boolean;
  autoSaveInterval: number;
  autoAnalyze: boolean;
  theme: 'light' | 'dark';
  highContrast: boolean;
}