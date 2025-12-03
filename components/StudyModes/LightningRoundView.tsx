import React, { useState } from 'react';
import QuizView from './QuizView';
import { Trophy, RefreshCw, ArrowLeft } from 'lucide-react';
import { AppTheme } from '../../types';
import { THEME_CONFIG } from '../../constants';

interface LightningRoundViewProps {
  onExit: () => void;
  currentTheme?: AppTheme;
}

const QUESTIONS_PER_ROUND = 8;

const LightningRoundView: React.FC<LightningRoundViewProps> = ({ onExit, currentTheme = 'modern' }) => {
  const [roundKey, setRoundKey] = useState(0);
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);
  
  const theme = THEME_CONFIG[currentTheme];

  const handleComplete = (score: number, total: number) => {
    setResult({ score, total });
  };

  const handleRestart = () => {
    setResult(null);
    setRoundKey((prev) => prev + 1);
  };

  if (result) {
    const accuracy = result.total > 0 ? Math.round((result.score / result.total) * 100) : 0;
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-inner ${theme.iconLoc}`}>
          <Trophy className="w-8 h-8" />
        </div>
        <div>
          <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${theme.subText}`}>Lightning Round Complete</p>
          <h2 className={`text-4xl font-black ${theme.text}`}>{result.score}/{result.total}</h2>
          <p className={`text-sm mt-2 ${theme.subText}`}>Accuracy: {accuracy}%</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleRestart}
            className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 justify-center ${theme.sidebarActive}`}
          >
            <RefreshCw className="w-4 h-4" />
            Try Another Round
          </button>
          <button
            onClick={onExit}
            className={`px-6 py-3 rounded-xl font-bold text-sm border flex items-center gap-2 justify-center ${theme.border} ${theme.text} hover:opacity-80`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <QuizView
      key={roundKey}
      questionCount={QUESTIONS_PER_ROUND}
      onComplete={handleComplete}
      currentTheme={currentTheme}
    />
  );
};

export default LightningRoundView;
