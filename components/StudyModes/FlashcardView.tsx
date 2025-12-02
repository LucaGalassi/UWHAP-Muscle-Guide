import React, { useState, useEffect } from 'react';
import { MuscleItem, MuscleContent, ConfidenceRating, AppTheme } from '../../types';
import { fetchMuscleDetails } from '../../services/geminiService';
import { THEME_CONFIG } from '../../constants';
import { Sparkles, Activity, RotateCw, MapPin, Play, List } from 'lucide-react';

interface FlashcardViewProps {
  muscle: MuscleItem;
  onRate?: (rating: ConfidenceRating) => void;
  onNext: (correct: boolean) => void;
  apiKey: string;
  mode?: 'BROWSE' | 'SRS';
  currentTheme?: AppTheme; // Now accepts theme from parent
}

const FlashcardView: React.FC<FlashcardViewProps> = ({ muscle, onRate, onNext, apiKey, mode = 'SRS', currentTheme = 'modern' }) => {
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

  const theme = THEME_CONFIG[currentTheme];

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 space-y-6">
        <Activity className="w-10 h-10 text-brand-300 animate-pulse" />
        <p className="text-slate-400 text-sm font-medium">Preparing flashcard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-6xl mx-auto p-4 md:p-6 relative">
      
      {showAiPrompt && (
        <div className="absolute top-4 left-4 right-4 bg-purple-50 border border-purple-100 p-3 rounded-xl flex items-center gap-3 z-10 animate-in fade-in slide-in-from-top-2 shadow-sm max-w-md mx-auto">
          <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
          <p className="text-xs text-purple-800">
            <strong>AI Features:</strong> Data missing. Add API key in Settings to auto-generate.
          </p>
        </div>
      )}

      {/* Card Container - Widened */}
      <div 
        className="relative w-full h-[65vh] md:h-[70vh] cursor-pointer perspective-1000 group mb-6"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d shadow-2xl rounded-3xl ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front (Question) */}
          <div className={`absolute inset-0 backface-hidden rounded-3xl flex flex-col items-center justify-center p-6 md:p-10 text-center border relative overflow-hidden ring-1 ring-black/5 transition-colors duration-300 ${theme.cardBg} ${theme.border}`}>
            {/* Decoration */}
            <div className={`absolute top-0 left-0 w-full h-3 ${theme.accent}`}></div>
            
            {/* Blobs */}
            {currentTheme !== 'blueprint' && (
              <>
                <div className="absolute top-0 right-0 p-32 bg-current rounded-full mix-blend-multiply filter blur-3xl opacity-[0.03] animate-blob text-slate-400"></div>
                <div className="absolute bottom-0 left-0 p-32 bg-current rounded-full mix-blend-multiply filter blur-3xl opacity-[0.03] animate-blob animation-delay-2000 text-slate-400"></div>
              </>
            )}
            
            <div className="relative z-10 flex flex-col items-center w-full h-full justify-center">
              <span className={`text-xs font-bold uppercase tracking-widest mb-8 px-5 py-2 rounded-full border backdrop-blur-sm transition-colors ${theme.badge}`}>
                Active Recall
              </span>
              
              <div className="flex-1 flex flex-col items-center justify-center w-full">
                <h2 className={`text-5xl md:text-7xl font-black mb-4 tracking-tight leading-tight transition-colors ${theme.text}`}>{muscle.name}</h2>
                <span className={`text-base md:text-lg font-bold uppercase tracking-widest mb-10 transition-colors ${theme.subText}`}>Group {muscle.group}</span>
                
                {/* Detailed Guide Info Box */}
                <div className={`rounded-2xl p-6 md:p-8 w-full max-w-2xl backdrop-blur-sm shadow-sm space-y-6 border transition-colors ${theme.infoBox}`}>
                   <div className={`text-xs font-bold uppercase text-center mb-2 tracking-widest opacity-70 ${theme.text}`}>Required Knowledge</div>
                   
                   <div className="grid md:grid-cols-2 gap-6">
                     <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-colors ${theme.iconLoc}`}>
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <span className={`block text-[10px] font-bold uppercase opacity-60 ${theme.text}`}>Location</span>
                          <span className={`font-bold text-sm ${theme.text}`}>Origin & Insertion</span>
                        </div>
                     </div>

                     <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-colors ${theme.iconFunc}`}>
                          <Play className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <span className={`block text-[10px] font-bold uppercase opacity-60 ${theme.text}`}>Function</span>
                          <span className={`font-bold text-sm ${theme.text}`}>Primary Action</span>
                        </div>
                     </div>
                   </div>
                </div>
              </div>

              <div className={`mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest animate-pulse opacity-50 ${theme.text}`}>
                <RotateCw className="w-3.5 h-3.5" /> Tap card to flip
              </div>
            </div>
          </div>

          {/* Back (Answer) - Now uses Theme Config! */}
          <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-3xl flex flex-col overflow-hidden border shadow-2xl transition-colors duration-300 ${theme.cardBg} ${theme.border}`}>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 space-y-8">
               <div className={`flex items-center justify-between border-b pb-6 sticky top-0 z-10 pt-2 ${theme.cardBg} ${currentTheme === 'midnight' ? 'border-slate-800' : 'border-slate-100'}`}>
                 <div>
                   <h3 className={`text-3xl font-bold mb-1 ${theme.text}`}>{muscle.name}</h3>
                   <span className={`text-sm font-mono px-2 py-0.5 rounded ${theme.infoBox} ${theme.subText}`}>Group {muscle.group}</span>
                 </div>
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${theme.border}`}>
                   <List className={`w-5 h-5 ${theme.subText}`} />
                 </div>
               </div>
               
               <div className="grid grid-cols-1 gap-6 pb-4">
                 <div className={`p-6 rounded-2xl border transition-colors ${theme.infoBox}`}>
                    <span className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-widest mb-3">
                       <MapPin className="w-4 h-4" /> Origin
                    </span>
                    <p className={`text-lg font-medium leading-relaxed ${theme.text}`}>{content?.origin || "..."}</p>
                 </div>
                 <div className={`p-6 rounded-2xl border transition-colors ${theme.infoBox}`}>
                    <span className="flex items-center gap-2 text-xs font-bold text-rose-500 uppercase tracking-widest mb-3">
                       <MapPin className="w-4 h-4" /> Insertion
                    </span>
                    <p className={`text-lg font-medium leading-relaxed ${theme.text}`}>{content?.insertion || "..."}</p>
                 </div>
                 <div className={`p-6 rounded-2xl border transition-colors ${theme.infoBox}`}>
                    <span className="flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">
                       <Play className="w-4 h-4" /> Action
                    </span>
                    <p className={`text-lg font-medium leading-relaxed ${theme.text}`}>{content?.action || "..."}</p>
                 </div>
               </div>
            </div>
            <div className={`p-4 border-t text-center text-[10px] uppercase tracking-wider font-bold ${currentTheme === 'midnight' ? 'bg-slate-950 border-slate-800 text-slate-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
               Tap card to flip back
            </div>
          </div>
        </div>
      </div>

      {/* SRS Controls */}
      <div className={`w-full max-w-2xl transition-all duration-300 ${isFlipped ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <p className={`text-center text-xs font-bold uppercase tracking-widest mb-4 ${theme.subText}`}>How well did you know this?</p>
        <div className="grid grid-cols-4 gap-3 md:gap-4">
          <button 
            onClick={(e) => { e.stopPropagation(); handleRating('AGAIN'); }}
            className="group flex flex-col items-center justify-center py-4 bg-white border-b-4 border-red-500 rounded-xl hover:bg-red-50 transition-all shadow-lg hover:-translate-y-1"
          >
            <span className="font-bold text-sm md:text-base text-slate-700 group-hover:text-red-700">Again</span>
            <span className="text-[9px] md:text-[10px] text-slate-400 uppercase font-bold mt-1">Forgot</span>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); handleRating('HARD'); }}
            className="group flex flex-col items-center justify-center py-4 bg-white border-b-4 border-orange-500 rounded-xl hover:bg-orange-50 transition-all shadow-lg hover:-translate-y-1"
          >
            <span className="font-bold text-sm md:text-base text-slate-700 group-hover:text-orange-700">Hard</span>
            <span className="text-[9px] md:text-[10px] text-slate-400 uppercase font-bold mt-1">Struggled</span>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); handleRating('GOOD'); }}
            className="group flex flex-col items-center justify-center py-4 bg-white border-b-4 border-blue-500 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:-translate-y-1"
          >
            <span className="font-bold text-sm md:text-base text-slate-700 group-hover:text-blue-700">Good</span>
            <span className="text-[9px] md:text-[10px] text-slate-400 uppercase font-bold mt-1">Recalled</span>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); handleRating('EASY'); }}
            className="group flex flex-col items-center justify-center py-4 bg-white border-b-4 border-emerald-500 rounded-xl hover:bg-emerald-50 transition-all shadow-lg hover:-translate-y-1"
          >
            <span className="font-bold text-sm md:text-base text-slate-700 group-hover:text-emerald-700">Easy</span>
            <span className="text-[9px] md:text-[10px] text-slate-400 uppercase font-bold mt-1">Instant</span>
          </button>
        </div>
      </div>
      
      {!isFlipped && (
        <div className={`text-xs font-medium animate-pulse mt-4 text-center ${theme.subText}`}>
          Take your time. Visualize the anatomy before flipping.
        </div>
      )}
    </div>
  );
};

export default FlashcardView;