import React, { useState } from 'react';
import QuizView from './QuizView';
import { Trophy, RefreshCw, ArrowLeft } from 'lucide-react';

interface LightningRoundViewProps {
  onExit: () => void;
}

const QUESTIONS_PER_ROUND = 8;

const LightningRoundView: React.FC<LightningRoundViewProps> = ({ onExit }) => {
  const [roundKey, setRoundKey] = useState(0);
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);

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
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
          <Trophy className="w-8 h-8" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-1">Lightning Round Complete</p>
          <h2 className="text-4xl font-black text-slate-900">{result.score}/{result.total}</h2>
          <p className="text-sm text-slate-500 mt-2">Accuracy: {accuracy}%</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-xl font-bold text-sm bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-2 justify-center"
          >
            <RefreshCw className="w-4 h-4" />
            Try Another Round
          </button>
          <button
            onClick={onExit}
            className="px-6 py-3 rounded-xl font-bold text-sm border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-2 justify-center"
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
    />
  );
};

export default LightningRoundView;
