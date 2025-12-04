import React, { useState, useEffect } from 'react';
import { MuscleItem, MuscleContent, ConfidenceRating, AppTheme } from '../../types';
import { fetchMuscleDetails } from '../../services/muscleContentService';
import { THEME_CONFIG } from '../../constants';
import { Activity, PlayCircle } from 'lucide-react';
import AdvancedAnimationViewer from '../AdvancedAnimationViewer';

interface FlashcardViewProps {
  muscle: MuscleItem;
  onRate?: (rating: ConfidenceRating) => void;
  onNext: (correct: boolean) => void;
  mode?: 'BROWSE' | 'SRS';
  currentTheme?: AppTheme;
}

const FlashcardView: React.FC<FlashcardViewProps> = ({ muscle, onRate, onNext, mode = 'SRS', currentTheme = 'modern' }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [content, setContent] = useState<MuscleContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAdvancedAnim, setShowAdvancedAnim] = useState(false);
  
  useEffect(() => {
    setIsFlipped(false); // Reset flip on new muscle
    setContent(null); // Clear old content immediately
    setShowAdvancedAnim(false);
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchMuscleDetails(muscle);
        if (mounted) {
          setContent(data);
        }
      } catch (e) {
        console.error('Failed to load muscle details:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [muscle]);

  const handleRating = (rating: ConfidenceRating) => {
    console.log('Rating selected:', rating);
    if (onRate) {
      onRate(rating);
    }
    // Always advance after rating so the flow isn't stuck
    const isCorrect = rating === 'GOOD' || rating === 'EASY';
    onNext(isCorrect);
  };

  const theme = THEME_CONFIG[currentTheme];

  if (loading || !content) {
    return (
      <div className={`h-full flex flex-col items-center justify-center p-8 space-y-6 ${theme.cardBg}`}>
        <Activity className={`w-10 h-10 ${theme.subText} animate-pulse`} />
        <p className={`text-sm font-medium ${theme.subText}`}>Preparing flashcard...</p>
      </div>
    );
  }

  return (
    <>
    <div className="flex flex-col items-center justify-start h-full w-full max-w-5xl mx-auto p-4 md:p-6">
      <div className="w-full flex items-center justify-between gap-3 mb-4">
        <div>
          <p className={`text-xs uppercase font-semibold tracking-widest ${theme.subText}`}>Flashcard</p>
          <h2 className={`text-3xl font-bold ${theme.text}`}>{muscle.name}</h2>
          <p className={`text-xs mt-1 ${theme.subText}`}>{mode === 'SRS' ? 'Spaced Repetition' : 'Browse Mode'}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAdvancedAnim(true)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-semibold transition-colors ${theme.border} ${theme.inputBg} ${theme.text} hover:opacity-90`}
          >
            <PlayCircle className="w-5 h-5" />
            View Animation
          </button>
          <button
            onClick={() => setIsFlipped((prev) => !prev)}
            className={`px-3 py-2 rounded-lg border text-sm font-semibold transition-colors ${theme.border} ${theme.inputBg} ${theme.text} hover:opacity-90`}
          >
            {isFlipped ? 'Show Question' : 'Show Answer'}
          </button>
        </div>
      </div>

      <div
        className="relative w-full max-w-4xl h-[60vh] md:h-[55vh]"
        onClick={() => setIsFlipped((prev) => !prev)}
        style={{ perspective: '1000px' }}
      >
        <div
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.5s ease',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          <div
            className={`absolute inset-0 rounded-2xl border shadow-xl flex flex-col items-center justify-center p-8 text-center space-y-6 ${theme.cardBg} ${theme.border}`}
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <p className={`text-sm font-semibold uppercase tracking-widest ${theme.subText}`}>Prompt</p>
            <h3 className={`text-4xl font-black ${theme.text}`}>{muscle.name}</h3>
            <p className={`max-w-xl text-base ${theme.subText}`}>
              Think about the muscle's origin, insertion, and primary action before flipping.
            </p>
            <div className={`text-xs font-semibold uppercase tracking-widest ${theme.subText}`}>Tap to flip</div>
          </div>

          <div
            className={`absolute inset-0 rounded-2xl border shadow-xl p-8 flex flex-col gap-6 overflow-y-auto custom-scrollbar ${theme.cardBg} ${theme.border}`}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div>
              <p className={`text-xs font-semibold uppercase tracking-widest ${theme.subText}`}>Answer</p>
              <h3 className={`text-3xl font-bold ${theme.text}`}>{muscle.name}</h3>
              <p className={`text-sm mt-1 ${theme.subText}`}>Group {muscle.group}</p>
            </div>
            <div className="space-y-4">
              <div className={`p-4 rounded-xl border ${theme.infoBox}`}>
                <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-2">Origin</p>
                <p className={`text-base leading-relaxed ${theme.text}`}>{content?.origin || '...'}</p>
              </div>
              <div className={`p-4 rounded-xl border ${theme.infoBox}`}>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">Insertion</p>
                <p className={`text-base leading-relaxed ${theme.text}`}>{content?.insertion || '...'}</p>
              </div>
              <div className={`p-4 rounded-xl border ${theme.infoBox}`}>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">Action</p>
                <p className={`text-base leading-relaxed ${theme.text}`}>{content?.action || '...'}</p>
              </div>
            </div>
            <div className={`text-xs font-semibold uppercase tracking-widest ${theme.subText}`}>Tap to flip back</div>
          </div>
        </div>
      </div>

      {/* SRS Controls - Fixed z-index and visibility */}
      <div className={`w-full max-w-2xl transition-all duration-300 mt-8 ${isFlipped ? 'opacity-100' : 'opacity-60'}`}>
        <p className={`text-center text-xs font-bold uppercase tracking-widest mb-3 ${theme.subText}`}>
          Rate your recall
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {([
            { label: 'Again', value: 'AGAIN', color: 'text-red-500' },
            { label: 'Hard', value: 'HARD', color: 'text-orange-500' },
            { label: 'Good', value: 'GOOD', color: 'text-blue-500' },
            { label: 'Easy', value: 'EASY', color: 'text-emerald-500' }
          ] as const).map((option) => (
            <button
              key={option.value}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleRating(option.value);
              }}
              disabled={!isFlipped}
              className={`flex flex-col items-center justify-center gap-1 py-3 rounded-lg border shadow-sm text-sm font-semibold transition-colors ${theme.cardBg} ${theme.border} ${theme.text} ${!isFlipped ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
            >
              <span className={option.color}>{option.label}</span>
              <span className={`text-[10px] uppercase tracking-widest ${theme.subText}`}>
                {option.value === 'AGAIN' ? 'Forgot' : option.value === 'HARD' ? 'Struggled' : option.value === 'GOOD' ? 'Recalled' : 'Instant'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* Advanced 3D Viewer (react-three-fiber) */}
    {showAdvancedAnim && (
      <AdvancedAnimationViewer
        muscleName={muscle.name}
        muscleId={muscle.id}
        muscleGroup={muscle.group}
        currentTheme={currentTheme}
        onClose={() => setShowAdvancedAnim(false)}
        actionString={content?.action}
        demonstrationText={content?.demonstration}
        originString={content?.origin}
        insertionString={content?.insertion}
        browserMode={false}
      />
    )}
    </>
  );
};

export default FlashcardView;
