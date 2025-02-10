import { useCallback } from 'react';
import { useStore } from '../store';
import { isAppError } from '../lib/error';

export function useWriting() {
  const {
    content,
    wordCount,
    analysis,
    analyzing,
    aiSuggestions,
    setContent,
    updateWordCount,
    analyzeText,
    setAISuggestions
  } = useStore();

  const handleAnalysis = useCallback(async () => {
    try {
      await analyzeText();
    } catch (error) {
      if (isAppError(error)) {
        console.error(error.code, error.message);
      } else {
        console.error('Analysis failed:', error);
      }
      throw error;
    }
  }, [analyzeText]);

  return {
    content,
    wordCount,
    analysis,
    analyzing,
    aiSuggestions,
    setContent,
    updateWordCount,
    analyzeText: handleAnalysis,
    setAISuggestions
  };
}