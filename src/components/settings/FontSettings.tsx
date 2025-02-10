import React from 'react';
import { Type } from 'lucide-react';
import { useStore } from '../../store';

const FONT_SIZES = {
  'small': '16px',
  'medium': '18px',
  'large': '20px',
  'xl': '24px'
};

const FONT_FAMILIES = {
  'serif': 'Georgia, serif',
  'sans': 'Arial, sans-serif',
  'mono': 'Courier New, monospace',
  'dyslexic': 'OpenDyslexic, sans-serif'
};

export default function FontSettings() {
  const { settings, updateSettings } = useStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-[#CFB53B]">
        <Type className="w-5 h-5" />
        <h3 className="font-medium">Typography Settings</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-gray-300 text-lg mb-2" htmlFor="fontSize">
            Font Size
          </label>
          <select
            id="fontSize"
            value={settings.fontSize}
            onChange={(e) => updateSettings({ fontSize: e.target.value })}
            className="ancient-input w-full text-lg p-2"
          >
            {Object.entries(FONT_SIZES).map(([size, value]) => (
              <option key={size} value={size}>
                {size.charAt(0).toUpperCase() + size.slice(1)} ({value})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-300 text-lg mb-2" htmlFor="fontFamily">
            Font Family
          </label>
          <select
            id="fontFamily"
            value={settings.fontFamily}
            onChange={(e) => updateSettings({ fontFamily: e.target.value })}
            className="ancient-input w-full text-lg p-2"
          >
            {Object.entries(FONT_FAMILIES).map(([family, value]) => (
              <option key={family} value={family}>
                {family.charAt(0).toUpperCase() + family.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center space-x-2 text-gray-300 text-lg">
            <input
              type="checkbox"
              checked={settings.highContrast}
              onChange={(e) => updateSettings({ highContrast: e.target.checked })}
              className="w-4 h-4"
            />
            <span>High Contrast Mode</span>
          </label>
        </div>
      </div>
    </div>
  );
}