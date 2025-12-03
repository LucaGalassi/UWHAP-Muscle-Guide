import React, { useState, useEffect } from 'react';
import { MuscleItem, MuscleProgress, ConfidenceRating } from '../../types';
import { MUSCLE_DATA } from '../../constants';
import MuscleView from '../MuscleView';
import FlashcardView from './FlashcardView';
import QuizView from './QuizView';
import { createInitialProgress, calculateNextReview } from '../../utils/srs';
import { BookOpen, Brain, CheckCircle, ArrowRight, TrendingUp, Clock, Target, Repeat, X, Settings, ListFilter, Play, Sparkles } from 'lucide-react';

interface SmartGuideViewProps {
  progressMap: Record<string, MuscleProgress>;
  onUpdateProgress: (progress: MuscleProgress) => void;
  apiKey: string;
}

type GuidePhase = 'DASHBOARD' | 'LEARN' | 'QUIZ' | 'REVIEW_CARD';
type LearnFilter = 'ALL' | 'A' | 'B';

const SmartGuideView: React.FC<SmartGuideViewProps> = ({ progressMap, onUpdateProgress, apiKey }) => {
  const [sessionQueue, setSessionQueue] = useState<string[]>([]);
  const [currentMuscleId, setCurrentMuscleId] = useState<string | null>(null);
  const [phase, setPhase] = useState<GuidePhase>('DASHBOARD');
  const [relatedMusclePopup, setRelatedMusclePopup] = useState<MuscleItem | null>(null);
  
  // Customization State
  const [learnBatchSize, setLearnBatchSize] = useState(5);
  const [learnFilter, setLearnFilter] = useState<LearnFilter>('ALL');
  const [showLearnSettings, setShowLearnSettings] = useState(false);
  
  // Calculate stats
  const dueCount = (Object.values(progressMap) as MuscleProgress[]).filter(p => p.dueDate <= Date.now()).length;
  const learnedIds = new Set(Object.keys(progressMap));
  const newItems = MUSCLE_DATA.filter(m => !learnedIds.has(m.id));
  
  // Apply Dashboard Filters
  const filteredNewItems = newItems.filter(m => learnFilter === 'ALL' || m.group === learnFilter);

  const masteredCount = (Object.values(progressMap) as MuscleProgress[]).filter(p => p.status === 'MASTERED').length;
  const learningCount = (Object.values(progressMap) as MuscleProgress[]).filter(p => p.status === 'LEARNING' || p.status === 'NEW').length;
  const reviewCount = (Object.values(progressMap) as MuscleProgress[]).filter(p => p.status === 'REVIEW').length;

  const startSession = (type: 'DUE' | 'NEW') => {
    let queue: string[] = [];
    const now = Date.now();
    
    if (type === 'DUE') {
      // Find overdue items
      const overdue = (Object.values(progressMap) as MuscleProgress[])
        .filter(p => p.dueDate <= now)
        .sort((a, b) => a.dueDate - b.dueDate)
        .map(p => p.muscleId);
        
      queue = overdue.slice(0, 15); // Cap review at 15 to avoid burnout
      
      if (queue.length === 0) {
         alert("No items match your criteria. Try learning new content!");
         return;
      }
    } else {
      // New Items
      if (filteredNewItems.length === 0) {
        alert("No new muscles found in this category!");
        return;
      }
      queue = filteredNewItems.slice(0, learnBatchSize).map(m => m.id);
    }

    setSessionQueue(queue);
    setCurrentMuscleId(queue[0]);
    
    // Determine start phase based on if it's new or review
    const isNew = !progressMap[queue[0]];
    setPhase(isNew ? 'LEARN' : 'REVIEW_CARD');
  };

  const handleProgressUpdate = (rating: ConfidenceRating) => {
    if (!currentMuscleId) return;
    
    const currentProgress = progressMap[currentMuscleId] || createInitialProgress(currentMuscleId);
    const updated = calculateNextReview(currentProgress, rating);
    
    onUpdateProgress(updated);
    
    // Move to next in queue
    const nextQueue = sessionQueue.slice(1);
    if (nextQueue.length > 0) {
      // Validate that next muscle exists
      const nextMuscle = MUSCLE_DATA.find(m => m.id === nextQueue[0]);
      if (!nextMuscle) {
        console.error('Invalid muscle ID in queue:', nextQueue[0]);
        setPhase('DASHBOARD');
        setCurrentMuscleId(null);
        return;
      }
      
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
      <div className="p-4 md:p-8 max-w-5xl mx-auto h-full flex flex-col overflow-y-auto custom-scrollbar">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-extrabold text-slate-900">Smart Study Guide</h1>
            <span className="bg-brand-100 text-brand-700 text-xs font-bold px-2 py-1 rounded-md border border-brand-200">Dec 8 Exam Prep</span>
          </div>
          <p className="text-slate-500">Your intelligent dashboard. Prioritizes what you need to know, when you need to know it.</p>
        </div>

        {/* Detailed Tracking Bars - Enhanced */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-10">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
             <TrendingUp className="w-4 h-4" /> Progress Analytics
          </h3>
          
          <div className="space-y-6">
            {/* Mastered */}
            <div>
               <div className="flex justify-between text-sm font-bold mb-2">
                 <span className="text-emerald-700 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Mastered (Long Term)</span>
                 <span className="text-slate-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">{masteredCount}</span>
               </div>
               <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                 <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-1000" style={{width: `${(masteredCount / MUSCLE_DATA.length) * 100}%`}}></div>
               </div>
            </div>

            {/* In Review */}
            <div>
               <div className="flex justify-between text-sm font-bold mb-2">
                 <span className="text-blue-700 flex items-center gap-2"><Repeat className="w-4 h-4" /> Active Review</span>
                 <span className="text-slate-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{reviewCount}</span>
               </div>
               <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                 <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000" style={{width: `${(reviewCount / MUSCLE_DATA.length) * 100}%`}}></div>
               </div>
            </div>

             {/* Learning */}
             <div>
               <div className="flex justify-between text-sm font-bold mb-2">
                 <span className="text-orange-700 flex items-center gap-2"><Brain className="w-4 h-4" /> Learning Queue</span>
                 <span className="text-slate-900 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">{learningCount}</span>
               </div>
               <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                 <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-1000" style={{width: `${(learningCount / MUSCLE_DATA.length) * 100}%`}}></div>
               </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Review Column */}
          <div className="flex flex-col gap-4">
             <div className="bg-red-50 p-6 rounded-3xl border border-red-100 flex items-center gap-6">
               <div className="w-14 h-14 bg-white text-red-500 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-red-100">
                 <Clock className="w-7 h-7" />
               </div>
               <div>
                 <div className="text-4xl font-black text-slate-900 mb-1">{dueCount}</div>
                 <div className="text-xs font-bold text-red-600 uppercase tracking-widest">Items Due Today</div>
               </div>
             </div>
             
             <button 
                onClick={() => startSession('DUE')}
                disabled={dueCount === 0}
                className={`w-full p-5 rounded-2xl font-bold transition-all flex items-center justify-between group shadow-lg ${
                  dueCount > 0 
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:shadow-red-200 hover:-translate-y-1' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Repeat className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-base">Start Review Session</div>
                    <div className="text-xs opacity-80 font-normal">{dueCount === 0 ? "You're all caught up!" : "Clear your backlog"}</div>
                  </div>
                </div>
                {dueCount > 0 && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>
          </div>

          {/* Learn Column */}
          <div className="flex flex-col gap-4">
             <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-full">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                        <Target className="w-5 h-5" />
                      </div>
                      <div>
                         <h3 className="font-bold text-slate-900">New Content</h3>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Expand your knowledge</p>
                      </div>
                   </div>
                   <button 
                    onClick={() => setShowLearnSettings(!showLearnSettings)} 
                    className={`p-2 rounded-lg transition-colors ${showLearnSettings ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-blue-600 hover:bg-slate-50'}`}
                   >
                     <Settings className="w-5 h-5" />
                   </button>
                </div>
                
                {showLearnSettings ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Batch Size</label>
                      <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                        {[5, 10, 15].map(size => (
                          <button 
                            key={size}
                            onClick={() => setLearnBatchSize(size)}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${learnBatchSize === size ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
                          >
                            {size} Cards
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Focus Group</label>
                      <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                        {(['ALL', 'A', 'B'] as const).map(g => (
                          <button 
                            key={g}
                            onClick={() => setLearnFilter(g)}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${learnFilter === g ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
                          >
                            {g === 'ALL' ? 'All' : `Group ${g}`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-slate-500 mb-2 leading-relaxed">
                    Ready to learn <strong className="text-blue-700 bg-blue-50 px-1 rounded">{learnBatchSize}</strong> new muscles from <strong className="text-blue-700 bg-blue-50 px-1 rounded">{learnFilter === 'ALL' ? 'All Groups' : `Group ${learnFilter}`}</strong>.
                  </div>
                )}
             </div>

             <button 
                onClick={() => startSession('NEW')}
                disabled={filteredNewItems.length === 0}
                className={`w-full p-5 rounded-2xl font-bold transition-all flex items-center justify-between group shadow-lg ${
                  filteredNewItems.length > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200 hover:-translate-y-1'
                  : 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-blue-200" />
                  <div className="text-left">
                    <div className="text-base">Start Learning</div>
                    <div className="text-xs opacity-80 font-normal">{filteredNewItems.length} available to learn</div>
                  </div>
                </div>
                {filteredNewItems.length > 0 && <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform fill-white" />}
              </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentMuscle) return <div>Loading...</div>;

  return (
    <div className="h-full flex flex-col relative">
      {/* Related Muscle Popup Overlay */}
      {relatedMusclePopup && (
        <div className="absolute inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
           <div className="bg-white rounded-3xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden ring-1 ring-white/20">
             <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                   <div className="p-1.5 bg-brand-100 rounded-lg">
                      <BookOpen className="w-4 h-4 text-brand-600" />
                   </div>
                   <h3 className="font-bold text-slate-900">Quick Reference</h3>
                </div>
                <button 
                  onClick={() => setRelatedMusclePopup(null)}
                  className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
             </div>
             <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
                {/* KEY PROP ADDED HERE TO FORCE RE-RENDER ON CHANGE */}
                <MuscleView 
                   key={relatedMusclePopup.id}
                   muscle={relatedMusclePopup} 
                   onSelectMuscle={() => {}} 
                   isLearned={false}
                   toggleLearned={() => {}}
                   apiKey={apiKey}
                   onRelatedMuscleClick={(m) => setRelatedMusclePopup(m)}
                   currentTheme={'modern'}
                />
             </div>
           </div>
        </div>
      )}

      {/* Progress Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-4">
           <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${phase === 'LEARN' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
             {phase === 'LEARN' ? <BookOpen className="w-3 h-3"/> : <Repeat className="w-3 h-3"/>}
             {phase === 'LEARN' ? 'Learning Phase' : 'Recall Phase'}
           </div>
           <div className="flex gap-1.5 items-center">
             <span className="text-xs font-bold text-slate-400 mr-2">Progress:</span>
             {sessionQueue.map((id, i) => (
               <div key={id} className={`w-2.5 h-2.5 rounded-full transition-all border border-slate-100 ${id === currentMuscleId ? 'bg-brand-500 scale-125 shadow-sm' : 'bg-slate-200'}`} />
             ))}
           </div>
        </div>
        <button onClick={() => setPhase('DASHBOARD')} className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1">
          <X className="w-3 h-3" /> Exit Session
        </button>
      </div>

      <div className="flex-1 overflow-hidden relative bg-slate-50">
        {phase === 'LEARN' && (
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-hidden relative">
               <MuscleView 
                 muscle={currentMuscle} 
                 onSelectMuscle={() => {}} 
                 isLearned={false} 
                 toggleLearned={() => {}} 
                 apiKey={apiKey} 
                 onRelatedMuscleClick={(m) => setRelatedMusclePopup(m)}
                 currentTheme={'modern'}
               />
               <div className="absolute bottom-8 right-8 z-20">
                 <button 
                   onClick={() => setPhase('QUIZ')}
                   className="px-8 py-4 bg-brand-600 text-white font-bold rounded-2xl shadow-xl hover:bg-brand-700 flex items-center gap-3 animate-bounce border border-white/20"
                 >
                   I'm Ready to Test <ArrowRight className="w-5 h-5" />
                 </button>
               </div>
            </div>
          </div>
        )}

        {phase === 'QUIZ' && (
           <div className="h-full flex flex-col">
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