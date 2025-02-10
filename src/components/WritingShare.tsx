import React, { useState } from 'react';
import { Share2, Eye, MessageSquare, Edit } from 'lucide-react';
import ShareDialog from '../features/sharing/components/ShareDialog';
import SharedList from '../features/sharing/components/SharedList';

const SAMPLE_WRITING = {
  id: '1',
  title: 'The Ancient Scroll',
  content: 'In the depths of time, where shadows dance...',
  author: 'Mysterious Scribe'
};

export default function WritingShare() {
  const [showShareDialog, setShowShareDialog] = useState(false);

  return (
    <div className="min-h-screen bg-[#663399] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="ancient-panel p-6 rounded-lg mb-6">
          <h1 className="text-2xl font-cinzel text-[#CFB53B] mb-4">{SAMPLE_WRITING.title}</h1>
          <p className="text-gray-300 mb-6">{SAMPLE_WRITING.content}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-[#CFB53B]">By {SAMPLE_WRITING.author}</span>
            <button
              onClick={() => setShowShareDialog(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>Share Writing</span>
            </button>
          </div>
        </div>

        <div className="ancient-panel p-6 rounded-lg">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <Eye className="w-6 h-6 text-[#CFB53B] mx-auto mb-2" />
              <h3 className="text-[#CFB53B] font-medium">View Access</h3>
              <p className="text-sm text-gray-300">Read-only access to your writing</p>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <MessageSquare className="w-6 h-6 text-[#CFB53B] mx-auto mb-2" />
              <h3 className="text-[#CFB53B] font-medium">Comment Access</h3>
              <p className="text-sm text-gray-300">Leave feedback and suggestions</p>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <Edit className="w-6 h-6 text-[#CFB53B] mx-auto mb-2" />
              <h3 className="text-[#CFB53B] font-medium">Edit Access</h3>
              <p className="text-sm text-gray-300">Full collaboration rights</p>
            </div>
          </div>

          <SharedList writingId={SAMPLE_WRITING.id} />
        </div>
      </div>

      {showShareDialog && (
        <ShareDialog
          writingId={SAMPLE_WRITING.id}
          onClose={() => setShowShareDialog(false)}
        />
      )}
    </div>
  );
}