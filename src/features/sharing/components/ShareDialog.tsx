import React from 'react';
import { useForm } from 'react-hook-form';
import { Share2, Mail, Shield } from 'lucide-react';
import { useSharing } from '../hooks/useSharing';
import type { SharePermission } from '../types';

interface ShareFormData {
  email: string;
  permission: SharePermission;
}

interface ShareDialogProps {
  writingId: string;
  onClose: () => void;
}

export default function ShareDialog({ writingId, onClose }: ShareDialogProps) {
  const { register, handleSubmit } = useForm<ShareFormData>();
  const { shareWriting, isSharing } = useSharing();

  const onSubmit = async (data: ShareFormData) => {
    try {
      await shareWriting(writingId, data.email, data.permission);
      onClose();
    } catch (error) {
      console.error('Failed to share:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="ancient-panel p-6 rounded-lg w-full max-w-md">
        <div className="flex items-center space-x-2 mb-6">
          <Share2 className="w-6 h-6 text-[#CFB53B]" />
          <h2 className="text-xl font-semibold text-[#CFB53B]">Share Your Writing</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Share with (email)
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('email', { required: true })}
                type="email"
                className="ancient-input pl-10 w-full"
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Permission Level
            </label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                {...register('permission')}
                className="ancient-input pl-10 w-full"
              >
                <option value="view">Can View</option>
                <option value="comment">Can Comment</option>
                <option value="edit">Can Edit</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSharing}
              className="px-4 py-2 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors disabled:opacity-50"
            >
              {isSharing ? 'Sharing...' : 'Share'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}