import React, { useCallback } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { BookOpen, Wand2 } from 'lucide-react';
import { useStore } from '../store';
import { debounce } from '../utils';
import EmotionIndicator from './EmotionIndicator';
import WordCounter from './WordCounter';

export default function Editor() {
  const { 
    content = '',
    setContent, 
    wordCount = 0,
    updateWordCount, 
    analyzing = false,
    setAnalyzing,
    analyzeText,
    settings = {
      fontSize: 'large',
      fontFamily: 'sans',
      theme: 'light',
      highContrast: false
    }
  } = useStore();

  const debouncedAnalyze = useCallback(
    debounce((text: string) => {
      updateWordCount(text);
    }, 500),
    [updateWordCount]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    debouncedAnalyze(newContent);
  };

  const handleAnalyze = async () => {
    if (!content?.trim() || analyzing) return;
    
    try {
      setAnalyzing(true);
      await analyzeText(content);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className={`editor-container rounded-xl shadow-xl p-6 
      ${settings.theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}
      ${settings.highContrast ? 'high-contrast' : ''}`}>
      
      <div className="mb-6 border-b border-current pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BookOpen className="w-8 h-8 text-purple-600" aria-hidden="true" />
            <WordCounter count={wordCount} />
          </div>
          <EmotionIndicator />
        </div>
      </div>
      
      <div className="space-y-4">
        <label htmlFor="editor" className="sr-only">Writing Editor</label>
        <TextareaAutosize
          id="editor"
          className={`w-full min-h-[400px] p-4 rounded-lg border-2 
            focus:ring-4 focus:ring-purple-500 focus:border-purple-500
            transition-all duration-200 ease-in-out
            ${settings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}
            font-${settings.fontFamily} text-${settings.fontSize}`}
          placeholder="Paste your prose here..."
          value={content}
          onChange={handleChange}
          minRows={20}
          style={{ 
            fontSize: settings.fontSize === 'large' ? '1.25rem' : 
                     settings.fontSize === 'xl' ? '1.5rem' : '1rem',
            lineHeight: '1.8'
          }}
        />

        <button
          onClick={handleAnalyze}
          disabled={analyzing || !content?.trim()}
          className={`w-full md:w-auto px-6 py-3 text-lg font-semibold rounded-lg
            focus:ring-4 focus:ring-offset-2 focus:ring-purple-500
            transition-all duration-200 ease-in-out
            ${analyzing || !content?.trim() 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800'}
            text-white shadow-lg`}
          aria-live="polite"
        >
          <div className="flex items-center justify-center gap-2">
            <Wand2 className="w-6 h-6" aria-hidden="true" />
            <span className="font-bold">
              {analyzing ? 'Analyzing...' : 'Analyze Writing'}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}