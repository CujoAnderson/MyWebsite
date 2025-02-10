import type { AuthSlice } from './slices/authSlice';
import type { WritingSlice } from './slices/writingSlice';
import type { SettingsSlice } from './slices/settingsSlice';

export interface AppState extends AuthSlice, WritingSlice, SettingsSlice {}