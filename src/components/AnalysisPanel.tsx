import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Brain, BarChart2, MessageSquare } from 'lucide-react';
import { useStore } from '../store';

export default function AnalysisPanel() {
  const { analysis } = useStore();

  if (!analysis) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
        <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          Your writing analysis will appear here
        </p>
      </div>
    );
  }

  const showTellData = {
    labels: ['Showing', 'Telling'],
    datasets: [{
      data: [analysis.showVsTell.showing, analysis.showVsTell.telling],
      backgroundColor: ['#818CF8', '#E5E7EB'],
    }],
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg divide-y divide-gray-200 dark:divide-gray-700">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <BarChart2 className="w-5 h-5 text-indigo-600" />
          <span>Writing Analysis</span>
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Show vs Tell Ratio
            </h4>
            <div className="h-48">
              <Bar data={showTellData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Emotional Tone
            </h4>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm">
                Primary: <span className="font-medium">{analysis.emotionalTone.primary}</span>
              </p>
              <p className="text-sm mt-1">
                Intensity: <span className="font-medium">{analysis.emotionalTone.intensity}%</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-indigo-600" />
          <span>Suggestions</span>
        </h3>
        <div className="space-y-3">
          {analysis.suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm"
            >
              {suggestion}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}