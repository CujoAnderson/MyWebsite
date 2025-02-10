import React from 'react';
import Editor from './Editor';
import AIFeedback from './AIFeedback';
import AnalysisPanel from './AnalysisPanel';

export default function WritingAnalysis() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Editor />
      </div>
      <div className="space-y-8">
        <AIFeedback />
        <AnalysisPanel />
      </div>
    </div>
  );
}