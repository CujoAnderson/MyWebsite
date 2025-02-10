import React from 'react';
import { Brain, Sparkles } from 'lucide-react';
import { useStore } from '../store';

export default function AIFeedback() {
  const { aiSuggestions } = useStore();

  return (
    <div className="ancient-panel rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="w-5 h-5 text-[#CFB53B]" />
        <h2 className="text-lg font-semibold text-[#CFB53B]">AI Feedback</h2>
      </div>
      
      {(!aiSuggestions || aiSuggestions.length === 0) ? (
        <div className="text-center py-8">
          <Sparkles className="w-12 h-12 text-[#CFB53B] mx-auto mb-3" />
          <p className="text-gray-300">
            Start writing to receive AI-powered suggestions and feedback
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {aiSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-3 bg-gray-800/50 rounded-lg border border-[#CFB53B]/30"
            >
              <p className="text-sm text-gray-300">
                {suggestion}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}