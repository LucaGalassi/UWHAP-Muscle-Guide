import React, { useState, useEffect } from 'react';
import { MuscleItem, MuscleContent, ConfidenceRating } from '../../types';
import { fetchMuscleDetails } from '../../services/geminiService';
import { Sparkles, Activity, RotateCw, HelpCircle } from 'lucide-react';

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
        <Activity className="w-8 h-8 text-brand-300 animate-pulse" />
        <p className="text-slate-400 text-sm">Preparing flashcard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto p-6 relative">
      
      {showAiPrompt && (
        <div className="absolute top-0 left-4 right-4 bg-purple-50 border border-purple-100 p-3 rounded-lg flex items-center gap-3 z-10 animate-in fade-in slide-in-from-top-2 shadow-sm">
          <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
          <p className="text-xs text-purple-800">
            <strong>AI Features:</strong> Data missing. Add API key in Settings to auto-generate.
          </p>
        </div>
      )}

      {/* Card Container */}
      <div 
        className="relative w-full aspect-[4/3] cursor-pointer perspective-1000 group mt-4 mb-8"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d shadow-xl rounded-2xl border border-slate-200 ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front (Question) */}
          <div className="absolute inset-0 backface-hidden bg-white rounded-2xl flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-brand-50 text-brand-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
               <HelpCircle className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Muscle Name</span>
            <h2 className="text-4xl font-extrabold text-slate-900">{muscle.name}</h2>
            <div className="mt-8 flex items-center gap-2 text-slate-400 text-sm animate-pulse">
              <RotateCw className="w-4 h-4" /> Tap to flip
            </div>
          </div>

          {/* Back (Answer) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 text-white rounded-2xl flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-6">
               <h3 className="text-2xl font-bold text-white mb-2">{muscle.name}</h3>
               
               <div className="grid grid-cols-1 gap-4">
                 <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Origin</span>
                    <p className="text-sm font-medium leading-relaxed">{content?.origin || "..."}</p>
                 </div>
                 <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Insertion</span>
                    <p className="text-sm font-medium leading-relaxed">{content?.insertion || "..."}</p>
                 </div>
                 <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Action</span>
                    <p className="text-sm font-medium leading-relaxed">{content?.action || "..."}</p>
                 </div>
               </div>
            </div>
            <div className="p-4 bg-slate-800 border-t border-slate-700 text-center text-xs text-slate-500">
               Tap card to see front
            </div>
          </div>
        </div>
      </div>

      {/* SRS Controls - Only visible when flipped */}
      <div className={`w-full transition-opacity duration-300 ${isFlipped ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">How well did you know this?</p>
        <div className="grid grid-cols-4 gap-3">
          <button 
            onClick={(e) => { e.stopPropagation(); handleRating('AGAIN'); }}
            className="flex flex-col items-center justify-center py-3 bg-red-100 text-red-700 hover:bg-red-200 rounded-xl transition-colors"
          >
            <span className="font-bold text-sm">Again</span>
            <span className="text-[10px] opacity-75">&lt; 1 min</span>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); handleRating('HARD'); }}
            className="flex flex-col items-center justify-center py-3 bg-orange-100 text-orange-700 hover:bg-orange-200 rounded-xl transition-colors"
          >
            <span className="font-bold text-sm">Hard</span>
            <span className="text-[10px] opacity-75">1 day</span>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); handleRating('GOOD'); }}
            className="flex flex-col items-center justify-center py-3 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-xl transition-colors"
          >
            <span className="font-bold text-sm">Good</span>
            <span className="text-[10px] opacity-75">3 days</span>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); handleRating('EASY'); }}
            className="flex flex-col items-center justify-center py-3 bg-green-100 text-green-700 hover:bg-green-200 rounded-xl transition-colors"
          >
            <span className="font-bold text-sm">Easy</span>
            <span className="text-[10px] opacity-75">7 days</span>
          </button>
        </div>
      </div>
      
      {!isFlipped && (
        <div className="text-slate-400 text-sm animate-pulse mt-4">
          Think of the answer, then tap to flip.
        </div>
      )}
    </div>
  );
};

export default FlashcardView;