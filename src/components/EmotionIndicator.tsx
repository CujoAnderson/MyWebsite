import React from 'react';
import { useStore } from '../store';

const emotions = {
  neutral: 'bg-gray-200 dark:bg-gray-600',
  joy: 'bg-yellow-200 dark:bg-yellow-600',
  sadness: 'bg-blue-200 dark:bg-blue-600',
  anger: 'bg-red-200 dark:bg-red-600',
  fear: 'bg-purple-200 dark:bg-purple-600',
  love: 'bg-pink-200 dark:bg-pink-600',
};

export default function EmotionIndicator() {
  const { currentEmotion } = useStore();
  
  return (
    <div className="flex items-center space-x-2">
      <div className={`w-3 h-3 rounded-full ${emotions[currentEmotion || 'neutral']}`} />
      <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
        {currentEmotion || 'Neutral'}
      </span>
    </div>
  );
}