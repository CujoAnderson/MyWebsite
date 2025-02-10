import React from 'react';

interface WordCounterProps {
  count: number;
}

export default function WordCounter({ count = 0 }: WordCounterProps) {
  const formattedCount = count.toLocaleString();
  
  return (
    <div 
      className="word-counter bg-purple-100 dark:bg-purple-900 
                 px-4 py-2 rounded-lg shadow-md"
      role="status" 
      aria-live="polite"
    >
      <span className="text-xl font-bold text-purple-900 dark:text-purple-100">
        {formattedCount}
      </span>
      <span className="ml-2 text-lg font-medium text-purple-700 dark:text-purple-300">
        {count === 1 ? 'word' : 'words'}
      </span>
    </div>
  );
}