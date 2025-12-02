import React, { useState, useEffect } from 'react';
import { generateQuizQuestion } from './QuizGenerator';
import { QuizQuestion } from '../../types';
import { CheckCircle2, XCircle, ArrowRight, RefreshCw } from 'lucide-react';

interface QuizViewProps {
  onComplete?: (score: number, total: number) => void;
  questionCount?: number; // Optional: If set, calls onComplete after this many questions
}

const QuizView: React.FC<QuizViewProps> = ({ onComplete, questionCount }) => {
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);

  const loadNextQuestion = () => {
    // If we have a target count and reached it, finish
    if (questionCount && totalAnswered >= questionCount) {
      if (onComplete) onComplete(sessionScore, totalAnswered);
      return;
    }

    setQuestion(generateQuizQuestion());
    setSelectedOption(null);
    setIsCorrect(null);
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
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Streak</span>
          <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full font-bold">{streak} 🔥</span>
        </div>
        <div className="text-sm font-bold text-slate-400">Total: {totalAnswered} {questionCount ? `/ ${questionCount}` : ''}</div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
        <span className="inline-block px-3 py-1 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4">
          {question.type} Question
        </span>
        <h2 className="text-2xl font-bold text-slate-800 leading-tight">
          {question.question}
        </h2>
      </div>

      {/* Options Grid */}
      <div className="grid gap-4">
        {question.options.map((option, idx) => {
          let stateStyles = "bg-white border-slate-200 hover:border-brand-300 hover:bg-slate-50";
          if (selectedOption) {
             if (option === question.correctAnswer) {
               stateStyles = "bg-green-50 border-green-500 text-green-700 ring-1 ring-green-500";
             } else if (option === selectedOption && !isCorrect) {
               stateStyles = "bg-red-50 border-red-500 text-red-700";
             } else {
               stateStyles = "opacity-50 bg-slate-50";
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