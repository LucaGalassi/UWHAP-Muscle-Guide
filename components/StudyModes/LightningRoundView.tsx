import React, { useState, useEffect, useRef } from 'react';
import { generateQuizQuestion } from './QuizGenerator';
import { QuizQuestion, AppTheme } from '../../types';
import { Trophy, RefreshCw, ArrowLeft, Timer, Zap, Play } from 'lucide-react';
import { THEME_CONFIG } from '../../constants';

interface LightningRoundViewProps {
  onExit: () => void;
  currentTheme?: AppTheme;
}

const INITIAL_TIME = 60;
const TIME_BONUS = 5;
const TIME_PENALTY = 5;

const LightningRoundView: React.FC<LightningRoundViewProps> = ({ onExit, currentTheme = 'modern' }) => {
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAME_OVER'>('START');
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'CORRECT' | 'WRONG' | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const theme = THEME_CONFIG[currentTheme];
  const isDarkTheme = currentTheme === 'midnight' || currentTheme === 'blueprint';

  // Timer Logic
  useEffect(() => {
    if (gameState === 'PLAYING') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(INITIAL_TIME);
    setGameState('PLAYING');
    loadNextQuestion();
  };

  const endGame = () => {
    setGameState('GAME_OVER');
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const loadNextQuestion = () => {
    try {
      setQuestion(generateQuizQuestion());
      setSelectedOption(null);
      setFeedback(null);
    } catch (e) {
      console.error("Failed to generate question", e);
    }
  };

  const handleAnswer = (option: string) => {
    if (selectedOption || gameState !== 'PLAYING') return;
    
    setSelectedOption(option);
    const isCorrect = option === question?.correctAnswer;

    if (isCorrect) {
      setFeedback('CORRECT');
      setScore(s => s + 1);
      setTimeLeft(t => Math.min(t + TIME_BONUS, 90));
    } else {
      setFeedback('WRONG');
      setTimeLeft(t => Math.max(t - TIME_PENALTY, 0));
    }

    // Delay for next question
    setTimeout(() => {
      if (gameState === 'PLAYING') {
         loadNextQuestion();
      }
    }, 800);
  };

  if (gameState === 'START') {
    return (
      <div className={`h-full flex flex-col items-center justify-center p-6 text-center space-y-8 max-w-md mx-auto ${theme.cardBg} rounded-3xl shadow-sm border ${theme.border}`}>
        <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl ${theme.iconFunc} animate-bounce`}>
          <Zap className="w-12 h-12 text-amber-500" />
        </div>
        <div>
          <h1 className={`text-4xl font-black mb-2 ${theme.text}`}>Lightning Round</h1>
          <p className={`text-sm ${theme.subText} leading-relaxed`}>
            Race against the clock! Answer correctly to gain time. Wrong answers cost you time.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
           <div className={`p-4 rounded-2xl border ${theme.border} ${theme.cardBg}`}>
              <div className="text-2xl font-bold text-green-500 mb-1">+{TIME_BONUS}s</div>
              <div className={`text-[10px] font-bold uppercase tracking-wider ${theme.subText}`}>Correct</div>
           </div>
           <div className={`p-4 rounded-2xl border ${theme.border} ${theme.cardBg}`}>
              <div className="text-2xl font-bold text-red-500 mb-1">-{TIME_PENALTY}s</div>
              <div className={`text-[10px] font-bold uppercase tracking-wider ${theme.subText}`}>Wrong</div>
           </div>
        </div>

        <button
          onClick={startGame}
          className="w-full py-4 bg-brand-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-brand-700 hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5 fill-white" /> Start Game
        </button>
      </div>
    );
  }

  if (gameState === 'GAME_OVER') {
    return (
      <div className={`h-full flex flex-col items-center justify-center p-6 text-center space-y-6 animate-in zoom-in duration-300 ${theme.cardBg} rounded-3xl shadow-sm border ${theme.border}`}>
        <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-inner ${theme.iconLoc} mb-4`}>
          <Trophy className="w-10 h-10 text-yellow-500" />
        </div>
        <div>
          <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${theme.subText}`}>Time's Up!</p>
          <h2 className={`text-6xl font-black ${theme.text} mb-2`}>{score}</h2>
          <p className={`text-sm font-bold ${theme.subText}`}>Questions Answered Correctly</p>
        </div>
        
        <div className="flex flex-col w-full max-w-xs gap-3 mt-8">
          <button
            onClick={startGame}
            className={`w-full py-3 rounded-xl font-bold text-sm flex items-center gap-2 justify-center ${theme.sidebarActive} shadow-md`}
          >
            <RefreshCw className="w-4 h-4" />
            Play Again
          </button>
          <button
            onClick={onExit}
            className={`w-full py-3 rounded-xl font-bold text-sm border flex items-center gap-2 justify-center ${theme.border} ${theme.text} hover:opacity-80`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // PLAYING STATE
  if (!question) return <div>Loading...</div>;

  return (
    <div className={`h-full flex flex-col max-w-3xl mx-auto p-4 md:p-6 ${theme.cardBg} rounded-3xl shadow-sm border ${theme.border}`}>
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-6">
         <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${theme.border} ${theme.cardBg}`}>
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className={`font-black text-lg ${theme.text}`}>{score}</span>
         </div>
         
         <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${timeLeft < 10 ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' : `${theme.cardBg} ${theme.border} ${theme.text}`}`}>
            <Timer className="w-4 h-4" />
            <span className="font-black text-lg font-mono">{timeLeft}s</span>
         </div>
      </div>

      {/* Timer Bar */}
      <div className={`w-full h-2 ${isDarkTheme ? 'bg-slate-800/60' : 'bg-slate-100'} rounded-full mb-8 overflow-hidden`}>
         <div 
            className={`h-full transition-all duration-1000 ease-linear ${timeLeft < 10 ? 'bg-red-500' : 'bg-brand-500'}`}
            style={{ width: `${(timeLeft / 60) * 100}%` }}
         />
      </div>

      {/* Question Card */}
      <div className={`flex-1 flex flex-col justify-center`}>
        <div className={`rounded-3xl shadow-sm border p-6 md:p-10 mb-6 text-center relative overflow-hidden ${theme.cardBg} ${theme.border}`}>
           {/* Feedback Overlay */}
           {feedback && (
             <div className={`absolute inset-0 flex items-center justify-center z-10 backdrop-blur-sm animate-in fade-in duration-200 ${feedback === 'CORRECT' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                <div className={`px-6 py-3 rounded-2xl font-black text-xl shadow-xl transform scale-110 ${feedback === 'CORRECT' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {feedback === 'CORRECT' ? `+${TIME_BONUS}s` : `-${TIME_PENALTY}s`}
                </div>
             </div>
           )}

           <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest mb-4 ${theme.infoBox}`}>
             {question.type} Question
           </span>
           <h2 className={`text-2xl md:text-3xl font-bold leading-tight ${theme.text}`}>
             {question.question}
           </h2>
        </div>

        {/* Options */}
        <div className="grid gap-3 md:grid-cols-2">
          {question.options.map((option, idx) => {
            let stateStyles = `${theme.cardBg} ${theme.border} hover:border-brand-300 ${theme.text} hover:shadow-md`;
            
            if (selectedOption) {
               if (option === question.correctAnswer) {
                 stateStyles = "bg-green-500 border-green-600 text-white shadow-green-200";
               } else if (option === selectedOption && feedback === 'WRONG') {
                 stateStyles = "bg-red-500 border-red-600 text-white shadow-red-200";
               } else {
                 stateStyles = "opacity-40 grayscale";
               }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                disabled={!!selectedOption}
                className={`p-4 md:p-5 rounded-xl text-left font-semibold text-sm md:text-base transition-all duration-200 border-2 ${stateStyles}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LightningRoundView;
