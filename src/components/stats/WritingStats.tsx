import React from 'react';
import { X, Calendar, Clock, Edit3, TrendingUp } from 'lucide-react';
import { useWriting } from '../../hooks/useWriting';
import { formatDistanceToNow } from 'date-fns';

export default function WritingStats({ onClose }: { onClose: () => void }) {
  const { stats } = useWriting();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="ancient-panel p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#CFB53B]">Writing Statistics</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
            <Edit3 className="w-5 h-5 text-[#CFB53B]" />
            <div>
              <p className="text-gray-300">Total Words</p>
              <p className="text-lg font-semibold text-white">{stats.totalWords}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
            <Calendar className="w-5 h-5 text-[#CFB53B]" />
            <div>
              <p className="text-gray-300">Writing Streak</p>
              <p className="text-lg font-semibold text-white">{stats.streak} days</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
            <Clock className="w-5 h-5 text-[#CFB53B]" />
            <div>
              <p className="text-gray-300">Average Session</p>
              <p className="text-lg font-semibold text-white">{stats.avgWordsPerSession} words</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-[#CFB53B]" />
            <div>
              <p className="text-gray-300">Last Session</p>
              <p className="text-lg font-semibold text-white">
                {formatDistanceToNow(stats.lastSession)} ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}