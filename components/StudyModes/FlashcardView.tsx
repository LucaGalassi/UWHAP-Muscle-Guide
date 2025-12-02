import React, { useState, useEffect } from 'react';
import { MuscleItem, MuscleContent, ConfidenceRating } from '../../types';
import { fetchMuscleDetails } from '../../services/geminiService';
import { Sparkles, Activity, RotateCw, MapPin, Play, Target, List } from 'lucide-react';

interface FlashcardViewProps {
  muscle: MuscleItem;
  onRate?: (rating: ConfidenceRating) => void; // Optional for pure browse mode
  onNext: (correct: boolean) => void; // Legacy support
  apiKey: string;
  mode?: 'BROWSE' | 'SRS'; // Default to BROWSE for backward compat
}

const FlashcardView: React.FC<FlashcardViewProps> = ({ muscle, onRate, onNext, apiKey, mode = 'SRS' }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [content, setContent] = useState<MuscleContent | null>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setIsFlipped(false); // Reset flip on new muscle
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchMuscleDetails(muscle, apiKey);
        if (mounted) setContent(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [muscle, apiKey]);

  const handleRating = (rating: ConfidenceRating) => {
    if (onRate) {
      onRate(rating);
    } else {
      // Fallback for simple mode
      onNext(rating === 'GOOD' || rating === 'EASY');
    }
  };

  const isFallback = content && content.origin.includes("Consult textbook");
  const showAiPrompt = isFallback && !apiKey;

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 space-y-6">
        <Activity className="w-10 h-10 text-brand-300 animate-pulse" />
        <p className="text-slate-400 text-sm font-medium">Preparing flashcard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto p-4 md:p-8 relative">
      
      {showAiPrompt && (
        <div className="absolute top-4 left-4 right-4 bg-purple-50 border border-purple-100 p-3 rounded-xl flex items-center gap-3 z-10 animate-in fade-in slide-in-from-top-2 shadow-sm">
          <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
          <p className="text-xs text-purple-800">
            <strong>AI Features:</strong> Data missing. Add API key in Settings to auto-generate.
          </p>
        </div>
      )}

      {/* Card Container - Increased Size */}
      <div 
        className="relative w-full h-[65vh] md:h-[70vh] cursor-pointer perspective-1000 group mb-6"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d shadow-2xl rounded-3xl ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front (Question) */}
          <div className="absolute inset-0 backface-hidden bg-white rounded-3xl flex flex-col items-center justify-center p-8 text-center border border-slate-100 relative overflow-hidden ring-1 ring-slate-900/5">
            {/* Decoration */}
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-brand-400 to-blue-600"></div>
            <div className="absolute top-0 right-0 p-32 bg-slate-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute bottom-0 left-0 p-32 bg-brand-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-6 bg-white/80 px-4 py-1.5 rounded-full border border-brand-100 shadow-sm backdrop-blur-sm">
                Active Recall
              </span>
              
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-2 tracking-tight">{muscle.name}</h2>
              <span className="text-sm md:text-base font-bold text-slate-400 uppercase tracking-wider mb-8">Group {muscle.group}</span>
              
              {/* Detailed Guide Info Box */}
              <div className="bg-white/80 border border-slate-200 rounded-2xl p-6 w-full max-w-sm backdrop-blur-sm shadow-sm space-y-4">
                 <div className="text-xs font-bold text-slate-400 uppercase text-center mb-2 tracking-widest">Required Knowledge</div>
                 
                 <div className="space-y-3">
                   <div className="flex items-center gap-4 text-slate-700">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <span className="block text-xs font-bold text-slate-400 uppercase">Location</span>
                        <span className="font-bold text-sm">Origin & Insertion</span>
                      </div>
                   </div>

                   <div className="flex items-center gap-4 text-slate-700">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                        <Play className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <span className="block text-xs font-bold text-slate-400 uppercase">Function</span>
                        <span className="font-bold text-sm">Primary Action</span>
                      </div>
                   </div>
                 </div>
              </div>
            </div>

            <div className="absolute bottom-8 flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest animate-pulse">
              <RotateCw className="w-3.5 h-3.5" /> Tap card to flip
            </div>
          </div>

          {/* Back (Answer) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 text-white rounded-3xl flex flex-col overflow-hidden border border-slate-800 shadow-2xl">
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 space-y-8">
               <div className="flex items-center justify-between border-b border-slate-700 pb-6">
                 <div>
                   <h3 className="text-3xl font-bold text-white mb-1">{muscle.name}</h3>
                   <span className="text-sm font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Group {muscle.group}</span>
                 </div>
                 <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
                   <List className="w-5 h-5 text-slate-400" />
                 </div>
               </div>
               
               <div className="grid grid-cols-1 gap-6">
                 <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
                    <span className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">
                       <MapPin className="w-4 h-4" /> Origin
                    </span>
                    <p className="text-lg font-medium leading-relaxed text-slate-200">{content?.origin || "..."}</p>
                 </div>
                 <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
                    <span className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-widest mb-3">
                       <MapPin className="w-4 h-4" /> Insertion
                    </span>
                    <p className="text-lg font-medium leading-relaxed text-slate-200">{content?.insertion || "..."}</p>
                 </div>
                 <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
                    <span className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">
                       <Play className="w-4 h-4" /> Action
                    </span>
                    <p className="text-lg font-medium leading-relaxed text-slate-200">{content?.action || "..."}</p>
                 </div>
               </div>
            </div>
            <div className="p-3 bg-slate-950 border-t border-slate-800 text-center text-[10px] text-slate-500 uppercase tracking-wider font-bold">
               Tap card to flip back
            </div>
          </div>
        </div>
      </div>

      {/* SRS Controls - Only visible when flipped */}
      <div className={`w-full max-w-2xl transition-all duration-300 ${isFlipped ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">How well did you know this?</p>
        <div className="grid grid-cols-4 gap-4">
          <button 
            onClick={(e) => { e.stopPropagation(); handleRating('AGAIN'); }}
            className="group flex flex-col items-center justify-center py-4 bg-white border-b-4 border-red-500 rounded-xl hover:bg-red-50 transition-all shadow-lg hover:-translate-y-1"
          >
            <span className="font-bold text-base text-slate-700 group-hover:text-red-700">Again</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold mt-1">Forgot</span>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); handleRating('HARD'); }}
            className="group flex flex-col items-center justify-center py-4 bg-white border-b-4 border-orange-500 rounded-xl hover:bg-orange-50 transition-all shadow-lg hover:-translate-y-1"
          >
            <span className="font-bold text-base text-slate-700 group-hover:text-orange-700">Hard</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold mt-1">Struggled</span>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); handleRating('GOOD'); }}
            className="group flex flex-col items-center justify-center py-4 bg-white border-b-4 border-blue-500 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:-translate-y-1"
          >
            <span className="font-bold text-base text-slate-700 group-hover:text-blue-700">Good</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold mt-1">Recalled</span>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); handleRating('EASY'); }}
            className="group flex flex-col items-center justify-center py-4 bg-white border-b-4 border-emerald-500 rounded-xl hover:bg-emerald-50 transition-all shadow-lg hover:-translate-y-1"
          >
            <span className="font-bold text-base text-slate-700 group-hover:text-emerald-700">Easy</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold mt-1">Instant</span>
          </button>
        </div>
      </div>
      
      {!isFlipped && (
        <div className="text-slate-400 text-xs font-medium animate-pulse mt-4 text-center">
          Take your time. Visualize the anatomy before flipping.
        </div>
      )}
    </div>
  );
};

export default FlashcardView;