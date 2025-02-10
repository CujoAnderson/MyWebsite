import React from 'react';
import { X, Type, Save, Brain, User } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';

export default function SettingsPanel({ onClose }: { onClose: () => void }) {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="ancient-panel p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#CFB53B]">Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <section className="space-y-4">
            <div className="flex items-center space-x-2 text-[#CFB53B]">
              <Type className="w-5 h-5" />
              <h3 className="font-medium">Editor Preferences</h3>
            </div>
            <div className="space-y-2">
              <label className="flex items-center justify-between text-gray-300">
                Font Size
                <select 
                  value={settings.fontSize} 
                  onChange={(e) => updateSettings({ fontSize: e.target.value })}
                  className="ancient-input ml-2"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </label>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center space-x-2 text-[#CFB53B]">
              <Save className="w-5 h-5" />
              <h3 className="font-medium">Auto-Save</h3>
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  checked={settings.autoSave}
                  onChange={(e) => updateSettings({ autoSave: e.target.checked })}
                  className="mr-2"
                />
                Enable Auto-Save
              </label>
              {settings.autoSave && (
                <select
                  value={settings.autoSaveInterval}
                  onChange={(e) => updateSettings({ autoSaveInterval: Number(e.target.value) })}
                  className="ancient-input w-full mt-2"
                >
                  <option value="30">Every 30 seconds</option>
                  <option value="60">Every minute</option>
                  <option value="300">Every 5 minutes</option>
                </select>
              )}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center space-x-2 text-[#CFB53B]">
              <Brain className="w-5 h-5" />
              <h3 className="font-medium">AI Analysis</h3>
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  checked={settings.autoAnalyze}
                  onChange={(e) => updateSettings({ autoAnalyze: e.target.checked })}
                  className="mr-2"
                />
                Auto-analyze while typing
              </label>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center space-x-2 text-[#CFB53B]">
              <User className="w-5 h-5" />
              <h3 className="font-medium">Account</h3>
            </div>
            <button 
              className="w-full py-2 px-4 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors"
              onClick={() => {/* Implement account settings navigation */}}
            >
              Manage Account
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}