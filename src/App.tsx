import React, { useEffect } from 'react';
import WritingShare from './components/WritingShare';
import WritingAnalysis from './components/WritingAnalysis';
import Header from './components/Header';
import { useStore } from './store';

export default function App() {
  const [currentView, setCurrentView] = React.useState('share');
  const { settings = { theme: 'light' } } = useStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
  }, [settings.theme]);

  return (
    <div className="min-h-screen bg-amethyst">
      <Header onAnalysisClick={() => setCurrentView('analysis')} />
      <main className="container mx-auto px-4 py-8">
        {currentView === 'share' ? <WritingShare /> : <WritingAnalysis />}
      </main>
    </div>
  );
}