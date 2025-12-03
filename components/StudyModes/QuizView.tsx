import React, { useState, useEffect } from 'react';
import { generateQuizQuestion } from './QuizGenerator';
import { QuizQuestion, AppTheme } from '../../types';
import { CheckCircle2, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { THEME_CONFIG } from '../../constants';

interface QuizViewProps {
  onComplete?: (score: number, total: number) => void;
  questionCount?: number; // Optional: If set, calls onComplete after this many questions
  currentTheme?: AppTheme;
}

const QuizView: React.FC<QuizViewProps> = ({ onComplete, questionCount, currentTheme = 'modern' }) => {
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);

  const theme = THEME_CONFIG[currentTheme];

  const loadNextQuestion = () => {
    // If we have a target count and reached it, finish
    if (questionCount && totalAnswered >= questionCount) {
      if (onComplete) onComplete(sessionScore, totalAnswered);
      return;
    }

    try {
      setQuestion(generateQuizQuestion());
      setSelectedOption(null);
      setIsCorrect(null);
    } catch (e) {
      console.error('Failed to generate quiz question:', e);
      alert('Unable to generate quiz question. Please try again.');
    }
  };

  useEffect(() => {
    loadNextQuestion();
  }, []);

  const handleOptionClick = (option: string) => {
    if (selectedOption) return; // Prevent double clicking
    
    setSelectedOption(option);
    const correct = option === question?.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setStreak(s => s + 1);
      setSessionScore(s => s + 1);
    } else {
      setStreak(0);
    }
    setTotalAnswered(t => t + 1);
  };

  if (!question) return <div className="p-10 text-center">Loading Quiz...</div>;

  const isLastQuestion = questionCount && totalAnswered >= questionCount;

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col h-full justify-center">
      {/* Header Stats */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold uppercase tracking-widest ${theme.subText}`}>Streak</span>
          <span className={`px-3 py-1 rounded-full font-bold ${theme.badge}`}>{streak} 🔥</span>
        </div>
        <div className={`text-sm font-bold ${theme.subText}`}>Total: {totalAnswered} {questionCount ? `/ ${questionCount}` : ''}</div>
      </div>

      {/* Question Card */}
      <div className={`rounded-2xl shadow-sm border p-8 mb-6 ${theme.cardBg} ${theme.border}`}>
        <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest mb-4 ${theme.infoBox}`}>
          {question.type} Question
        </span>
        <h2 className={`text-2xl font-bold leading-tight ${theme.text}`}>
          {question.question}
        </h2>
      </div>

      {/* Options Grid */}
      <div className="grid gap-4">
        {question.options.map((option, idx) => {
          let stateStyles = `${theme.cardBg} ${theme.border} hover:border-brand-300 ${theme.text}`;
          if (selectedOption) {
             if (option === question.correctAnswer) {
               stateStyles = "bg-green-50 border-green-500 text-green-700 ring-1 ring-green-500";
             } else if (option === selectedOption && !isCorrect) {
               stateStyles = "bg-red-50 border-red-500 text-red-700";
             } else {
               stateStyles = `opacity-50 ${theme.cardBg} ${theme.border} ${theme.text}`;
             }
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(option)}
              disabled={!!selectedOption}
              className={`p-5 rounded-xl border text-left font-medium transition-all duration-200 flex items-center justify-between ${stateStyles}`}
            >
              <span>{option}</span>
              {selectedOption && option === question.correctAnswer && <CheckCircle2 className="w-5 h-5 text-green-600" />}
              {selectedOption && option === selectedOption && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      {selectedOption && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4">
          <button 
            onClick={loadNextQuestion}
            className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {isLastQuestion ? "Complete & Continue" : "Next Question"} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizView;