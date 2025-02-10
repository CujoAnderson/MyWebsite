import React from 'react';
import { Moon, Sun, Save, BookOpen, Settings, Activity, PenTool } from 'lucide-react';
import Button from './ui/Button';
import { useStore } from '../store';
import { useWriting } from '../hooks/useWriting';
import SettingsPanel from './settings/SettingsPanel';
import WritingStats from './stats/WritingStats';

interface HeaderProps {
  onAnalysisClick: () => void;
}

export default function Header({ onAnalysisClick }: HeaderProps) {
  const { settings = { theme: 'light' }, toggleDarkMode } = useStore();
  const { content, saveWriting } = useWriting();
  const [showStats, setShowStats] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);

  const handleSave = async () => {
    if (!content?.trim()) return;
    await saveWriting();
  };

  const handleRefresh = () => {
    // Reset to title page
    window.location.href = '/';
  };

  return (
    <nav className={`site-header ${settings?.theme === 'dark' ? 'dark' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Button
              icon={BookOpen}
              onClick={handleRefresh}
              title="Return to Title Page"
              className="text-[#CFB53B] hover:text-[#CFB53B]/80 transition-colors"
            />
            <h1 className="site-title ml-2 text-3xl font-bold">
              MYTHOSFORGE: MASTERFUL WRITING
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              icon={PenTool}
              onClick={onAnalysisClick}
              title="Writing Analysis"
              className="bg-[#800020] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#800020]/80"
            >
              <span>Writing Analysis</span>
            </Button>
            <Button
              icon={Save}
              onClick={handleSave}
              title="Save your work"
              className="hover:text-[#CFB53B] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!content?.trim()}
            />
            <Button
              icon={Activity}
              onClick={() => setShowStats(!showStats)}
              title="View writing statistics"
              className="hover:text-[#CFB53B]"
            />
            <Button
              icon={Settings}
              onClick={() => setShowSettings(!showSettings)}
              title="Open settings"
              className="hover:text-[#CFB53B]"
            />
            <Button
              icon={settings?.theme === 'dark' ? Sun : Moon}
              onClick={toggleDarkMode}
              title={settings?.theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
              className="hover:text-[#CFB53B]"
            />
          </div>
        </div>
      </div>
      
      {showStats && <WritingStats onClose={() => setShowStats(false)} />}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </nav>
  );
}