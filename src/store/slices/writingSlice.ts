import { StateCreator } from 'zustand';
import type { TextAnalysis } from '../../types/analysis';
import { AppState } from '../types';
import * as aiService from '../../lib/ai';

const DEFAULT_WRITING_STATE = {
  content: '',
  wordCount: 0,
  analysis: null,
  analyzing: false,
  aiSuggestions: []
};

export interface WritingSlice {
  content: string;
  wordCount: number;
  analysis: TextAnalysis | null;
  analyzing: boolean;
  aiSuggestions: string[];
  setContent: (content: string) => void;
  updateWordCount: (text: string) => void;
  analyzeText: (text: string) => Promise<void>;
  setAnalyzing: (analyzing: boolean) => void;
  setAISuggestions: (suggestions: string[]) => void;
}

export const createWritingSlice: StateCreator<AppState, [], [], WritingSlice> = (set) => ({
  ...DEFAULT_WRITING_STATE,
  setContent: (content: string) => set({ content }),
  updateWordCount: (text: string) => {
    if (!text?.trim()) {
      set({ wordCount: 0 });
      return;
    }
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    set({ wordCount: words });
  },
  analyzeText: async (text: string) => {
    try {
      set({ analyzing: true });
      const analysis = await aiService.analyzeText(text);
      set({ analysis, analyzing: false });
    } catch (error) {
      set({ analyzing: false });
      console.error('Analysis failed:', error);
      throw error;
    }
  },
  setAnalyzing: (analyzing: boolean) => set({ analyzing }),
  setAISuggestions: (suggestions: string[]) => set({ aiSuggestions: suggestions })
});