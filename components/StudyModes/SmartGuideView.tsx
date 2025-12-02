import React, { useState, useEffect } from 'react';
import { MuscleItem, MuscleProgress, ConfidenceRating } from '../../types';
import { MUSCLE_DATA } from '../../constants';
import MuscleView from '../MuscleView';
import FlashcardView from './FlashcardView';
import QuizView from './QuizView';
import { createInitialProgress, calculateNextReview } from '../../utils/srs';
import { BookOpen, Brain, CheckCircle, ArrowRight, TrendingUp, Clock, Target, Repeat, X } from 'lucide-react';

interface SmartGuideViewProps {
  progressMap: Record<string, MuscleProgress>;
  onUpdateProgress: (progress: MuscleProgress) => void;
  apiKey: string;
}

type GuidePhase = 'DASHBOARD' | 'LEARN' | 'QUIZ' | 'REVIEW_CARD';

const SmartGuideView: React.FC<SmartGuideViewProps> = ({ progressMap, onUpdateProgress, apiKey }) => {
  const [sessionQueue, setSessionQueue] = useState<string[]>([]);
  const [currentMuscleId, setCurrentMuscleId] = useState<string | null>(null);
  const [phase, setPhase] = useState<GuidePhase>('DASHBOARD');
  const [relatedMusclePopup, setRelatedMusclePopup] = useState<MuscleItem | null>(null);
  
  // Calculate stats
  const dueCount = Object.values(progressMap).filter(p => p.dueDate <= Date.now()).length;
  const newCount = MUSCLE_DATA.length - Object.keys(progressMap).length;
  const masteredCount = Object.values(progressMap).filter(p => p.status === 'MASTERED').length;

  const startSession = (type: 'DUE' | 'NEW' | 'MIXED') => {
    let queue: string[] = [];
    const now = Date.now();
    
    // 1. Find overdue items
    const overdue = Object.values(progressMap)
      .filter(p => p.dueDate <= now)
      .sort((a, b) => a.dueDate - b.dueDate) // Oldest due first
      .map(p => p.muscleId);
      
    // 2. Find new items
    const learnedIds = new Set(Object.keys(progressMap));
    const newItems = MUSCLE_DATA
      .filter(m => !learnedIds.has(m.id))
      .map(m => m.id);
      
    if (type === 'DUE') {
      queue = overdue.slice(0, 10);
    } else if (type === 'NEW') {
      queue = newItems.slice(0, 5);
    } else {
      // Mixed: 7 due, 3 new
      queue = [...overdue.slice(0, 7), ...newItems.slice(0, 3)];
    }
    
    if (queue.length === 0 && type === 'DUE' && overdue.length === 0) {
       // Fallback if user clicked Review but nothing is due
       alert("Nothing is due right now! Great job. Starting a session with new muscles instead.");
       queue = newItems.slice(0, 5);
    }

    if (queue.length > 0) {
      setSessionQueue(queue);
      setCurrentMuscleId(queue[0]);
      
      // Determine start phase based on if it's new or review
      const isNew = !progressMap[queue[0]];
      setPhase(isNew ? 'LEARN' : 'REVIEW_CARD');
    }
  };

  const handleProgressUpdate = (rating: ConfidenceRating) => {
    if (!currentMuscleId) return;
    
    const currentProgress = progressMap[currentMuscleId] || createInitialProgress(currentMuscleId);
    const updated = calculateNextReview(currentProgress, rating);
    
    onUpdateProgress(updated);
    
    // Move to next in queue
    const nextQueue = sessionQueue.slice(1);
    if (nextQueue.length > 0) {
      setSessionQueue(nextQueue);
      setCurrentMuscleId(nextQueue[0]);
      
      const isNextNew = !progressMap[nextQueue[0]];
      setPhase(isNextNew ? 'LEARN' : 'REVIEW_CARD');
    } else {
      setPhase('DASHBOARD');
      setCurrentMuscleId(null);
    }
  };

  const currentMuscle = currentMuscleId ? MUSCLE_DATA.find(m => m.id === currentMuscleId) : null;

  if (phase === 'DASHBOARD') {
    return (
      <div className="p-8 max-w-4xl mx-auto h-full flex flex-col justify-center">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Smart Study Guide</h1>
          <p className="text-slate-500">Your personalized spaced-repetition plan.</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{dueCount}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Due for Review</div>
          </div>
          
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{newCount}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">New Muscles</div>
          </div>
          
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{masteredCount}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mastered</div>
          </div>
        </div>

        <div className="space-y-4">
          {dueCount > 0 && (
            <button 
              onClick={() => startSession('DUE')}
              className="w-full p-4 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-all flex items-center justify-between group shadow-lg shadow-brand-200"
            >
              <div className="flex items-center gap-3">
                <Repeat className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-sm">Review Due Items</div>
                  <div className="text-[10px] opacity-80 font-normal">Focus on {Math.min(dueCount, 10)} overdue muscles</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          <button 
            onClick={() => startSession('NEW')}
            className="w-full p-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5 text-brand-500" />
              <div className="text-left">
                <div className="text-sm">Learn New Content</div>
                <div className="text-xs text-slate-400 font-normal">Start with 5 unstudied muscles</div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  if (!currentMuscle) return <div>Loading...</div>;

  return (
    <div className="h-full flex flex-col relative">
      {/* Related Muscle Popup Overlay */}
      {relatedMusclePopup && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
             <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                   <BookOpen className="w-4 h-4 text-brand-600" />
                   <h3 className="font-bold text-slate-900">Reference: {relatedMusclePopup.name}</h3>
                </div>
                <button 
                  onClick={() => setRelatedMusclePopup(null)}
                  className="p-1.5 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
             </div>
             <div className="flex-1 overflow-y-auto custom-scrollbar">
                <MuscleView 
                   muscle={relatedMusclePopup} 
                   onSelectMuscle={() => {}} // Disable selecting inside popup
                   isLearned={false}
                   toggleLearned={() => {}}
                   apiKey={apiKey}
                />
             </div>
           </div>
        </div>
      )}

      {/* Progress Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Session Progress</span>
           <div className="flex gap-1">
             {sessionQueue.map((id, i) => (
               <div key={id} className={`w-2 h-2 rounded-full ${id === currentMuscleId ? 'bg-brand-500 animate-pulse' : 'bg-slate-200'}`} />
             ))}
           </div>
        </div>
        <button onClick={() => setPhase('DASHBOARD')} className="text-xs font-bold text-slate-400 hover:text-slate-600">
          Exit Session
        </button>
      </div>

      <div className="flex-1 overflow-hidden relative">
        {phase === 'LEARN' && (
          <div className="h-full flex flex-col">
            <div className="bg-brand-50 p-3 text-center border-b border-brand-100">
               <p className="text-xs font-bold text-brand-700 uppercase tracking-widest flex items-center justify-center gap-2">
                 <BookOpen className="w-4 h-4" /> New Material • Read Carefully
               </p>
            </div>
            <div className="flex-1 overflow-hidden relative">
               <MuscleView 
                 muscle={currentMuscle} 
                 onSelectMuscle={() => {}} 
                 isLearned={false} 
                 toggleLearned={() => {}} 
                 apiKey={apiKey} 
                 onRelatedMuscleClick={(m) => setRelatedMusclePopup(m)}
               />
               <div className="absolute bottom-8 right-8 z-20">
                 <button 
                   onClick={() => setPhase('QUIZ')}
                   className="px-6 py-3 bg-brand-600 text-white font-bold rounded-xl shadow-lg hover:bg-brand-700 flex items-center gap-2 animate-bounce"
                 >
                   I've Read It <ArrowRight className="w-4 h-4" />
                 </button>
               </div>
            </div>
          </div>
        )}

        {phase === 'QUIZ' && (
           <div className="h-full flex flex-col">
              <div className="bg-purple-50 p-3 text-center border-b border-purple-100">
                <p className="text-xs font-bold text-purple-700 uppercase tracking-widest flex items-center justify-center gap-2">
                  <Brain className="w-4 h-4" /> Knowledge Check
                </p>
              </div>
              <div className="flex-1">
                <QuizView 
                  questionCount={1}
                  onComplete={() => setPhase('REVIEW_CARD')} 
                />
              </div>
           </div>
        )}

        {phase === 'REVIEW_CARD' && (
          <div className="h-full flex flex-col">
             <div className="bg-blue-50 p-3 text-center border-b border-blue-100">
               <p className="text-xs font-bold text-blue-700 uppercase tracking-widest flex items-center justify-center gap-2">
                 <Repeat className="w-4 h-4" /> Active Recall
               </p>
             </div>
             <FlashcardView 
               muscle={currentMuscle} 
               onRate={handleProgressUpdate} 
               onNext={() => {}} 
               apiKey={apiKey} 
               mode="SRS"
             />
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartGuideView;