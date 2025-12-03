import React, { useEffect, useState } from 'react';
import { MuscleItem, MuscleContent, AppTheme } from '../types';
import { fetchMuscleDetails } from '../services/geminiService';
import { MUSCLE_DETAILS, MUSCLE_DATA, THEME_CONFIG } from '../constants';
import { 
  Play, 
  MapPin, 
  Target, 
  Lightbulb, 
  Info, 
  Search,
  Activity,
  AlertCircle,
  Image as ImageIcon,
  CheckCircle2,
  Circle,
  ArrowRight,
  PlayCircle,
  Sparkles,
  X,
  Move,
  Zap
} from 'lucide-react';
import { GROUP_A_REQUIREMENTS, GROUP_B_REQUIREMENTS } from '../constants';
import AdvancedAnimationViewer from './AdvancedAnimationViewer';
import { getMotionsForMuscle, getPrimaryMotionsForMuscle } from '../services/animationService';

const STANDARD_MOTIONS = [
  "Flexion", "Extension", 
  "Abduction", "Adduction", 
  "Medial Rotation", "Lateral Rotation",
  "Elevation", "Depression",
  "Protraction", "Retraction",
  "Pronation", "Supination",
  "Dorsiflexion", "Plantarflexion",
  "Inversion", "Eversion",
  "Circumduction", "Opposition"
];

interface MuscleViewProps {
  muscle: MuscleItem;
  onSelectMuscle: (muscle: MuscleItem) => void;
  isLearned: boolean;
  toggleLearned: () => void;
  apiKey: string;
  onRelatedMuscleClick?: (muscle: MuscleItem) => void; // New optional prop for Study Mode override
  currentTheme: AppTheme;
}

const MuscleView: React.FC<MuscleViewProps> = ({ muscle, onSelectMuscle, isLearned, toggleLearned, apiKey, onRelatedMuscleClick, currentTheme }) => {
  const [content, setContent] = useState<MuscleContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [showAdvancedAnim, setShowAdvancedAnim] = useState(false);
  const [selectedMotion, setSelectedMotion] = useState<string | null>(null);
  const [selectedActionRef, setSelectedActionRef] = useState<string | null>(null);
  const theme = THEME_CONFIG[currentTheme];

  // Check if we have static data for this muscle
  const hasStaticData = !!MUSCLE_DETAILS[muscle.id];

  useEffect(() => {
    // Reset banner dismissal when muscle changes
    setIsBannerDismissed(false);
    setShowAdvancedAnim(false);
    
    let mounted = true;
    const loadData = async () => {
      setLoading(true);
      setError(null);
      setContent(null);
      try {
        const data = await fetchMuscleDetails(muscle, apiKey);
        if (mounted) setContent(data);
      } catch (err) {
        if (mounted) setError("Failed to load muscle details.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadData();
    return () => { mounted = false; };
  }, [muscle, apiKey]);

  const openSearchPopup = (query: string) => {
    const url = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
    const width = 1000;
    const height = 800;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    window.open(url, 'ImageSearch', `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no`);
  };



  const handleRelatedClick = (relatedMuscle: MuscleItem) => {
    if (onRelatedMuscleClick) {
      onRelatedMuscleClick(relatedMuscle);
    } else {
      onSelectMuscle(relatedMuscle);
    }
  };

  if (loading) {
    return (
      <div className={`h-full flex flex-col items-center justify-center p-8 space-y-6 ${theme.cardBg}`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center border ${theme.border}`}>
          <Activity className={`w-8 h-8 ${theme.subText} animate-pulse`} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`h-full flex flex-col items-center justify-center p-8 text-center ${theme.cardBg}`}>
        <div className="bg-red-50 p-4 rounded-full mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <p className={`max-w-sm mt-2 ${theme.subText}`}>{error}</p>
      </div>
    );
  }

  // Determine if we should show the AI banner
  const showAiBanner = !hasStaticData && !apiKey && !isBannerDismissed;

  return (
    <div className={`h-full flex flex-col overflow-y-auto ${theme.cardBg} custom-scrollbar transition-colors duration-300`}>
      {/* Clean Header */}
      <div className={`${theme.cardBg} border-b ${theme.border} px-8 py-8 md:py-10 transition-colors`}>
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded tracking-wider uppercase ${
                  muscle.group === 'A' 
                  ? (currentTheme === 'blueprint' || currentTheme === 'midnight' ? 'bg-orange-800/30 text-orange-200 border border-orange-700/30' : 'bg-orange-100 text-orange-700')
                  : (currentTheme === 'blueprint' || currentTheme === 'midnight' ? 'bg-blue-800/30 text-blue-200 border border-blue-700/30' : 'bg-blue-100 text-blue-700')
                }`}>
                  Group {muscle.group}
                </span>
                {muscle.subCategory && (
                  <span className={`text-[11px] font-bold ${theme.subText} tracking-wider uppercase`}>
                    • {muscle.subCategory}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <h1 className={`text-4xl font-extrabold ${theme.text} tracking-tight`}>
                  {muscle.name}
                </h1>
                <button 
                  onClick={toggleLearned}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    isLearned 
                    ? (currentTheme === 'blueprint' || currentTheme === 'midnight' ? 'bg-green-800/30 text-green-200 border border-green-700/30 hover:bg-green-800/40' : 'bg-green-100 text-green-700 hover:bg-green-200')
                    : (currentTheme === 'blueprint' || currentTheme === 'midnight' ? 'bg-slate-800/30 text-slate-300 border border-slate-700/30 hover:bg-slate-800/40' : 'bg-slate-100 text-slate-500 hover:bg-slate-200')
                  }`}
                >
                  {isLearned ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                  {isLearned ? 'Learned' : 'Mark as Learned'}
                </button>
              </div>
            </div>
            
            {/* Header Icon Buttons */}
            <div className="flex gap-2">
              <button 
                onClick={() => setShowAdvancedAnim(true)}
                className={`p-2.5 rounded-xl border transition-all bg-gradient-to-r from-brand-500 to-blue-600 text-white border-brand-500 hover:scale-105 active:scale-95 shadow-lg`}
                title="Open 3D Animation Viewer"
              >
                <Zap className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
          

          {/* Requirements Box (centered container) */}
          <div className="px-8">
            <div className="max-w-5xl mx-auto w-full mt-8 pt-6">
              <h4 className={`text-xs font-bold ${theme.subText} uppercase tracking-wider mb-3 flex items-center gap-2`}>
                <Target className="w-3 h-3" />
                Study Requirements
              </h4>
              <ul className={`grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm ${theme.text}`}>
                {(muscle.group === 'A' ? GROUP_A_REQUIREMENTS : GROUP_B_REQUIREMENTS).map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${theme.subText.replace('text-', 'bg-')}`}></span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        

      {/* Main Content Grid */}
      {content && (
        <div className="flex-1 px-8 py-10 max-w-5xl mx-auto w-full space-y-10 pb-24">
          
          {/* AI Banner */}
          {showAiBanner && (
             <div className="relative p-4 bg-purple-50 border border-purple-100 rounded-xl flex items-start gap-4">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className={`text-sm font-bold ${theme.text}`}>AI Features Available</h4>
                  <p className={`text-sm mt-1 leading-relaxed ${theme.subText}`}>
                    Detailed content for <strong>{muscle.name}</strong> is not available in the local database. 
                    You can add a Gemini API key in Settings to generate details.
                  </p>
                </div>
                <button 
                  onClick={() => setIsBannerDismissed(true)}
                  className="text-purple-400 hover:text-purple-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
             </div>
          )}
          
          {/* Top Row: O/I/A */}
          <div className="grid md:grid-cols-3 gap-8">
            <InfoCard 
              title="Origin" 
              icon={<MapPin className="w-4 h-4 text-emerald-600" />}
              content={content.origin}
              className="md:col-span-1"
              onSearch={() => openSearchPopup(`${muscle.name} muscle origin anatomy`)}
              currentTheme={currentTheme}
            />
            <InfoCard 
              title="Insertion" 
              icon={<MapPin className="w-4 h-4 text-rose-600" />}
              content={content.insertion}
              className="md:col-span-1"
              onSearch={() => openSearchPopup(`${muscle.name} muscle insertion anatomy`)}
              currentTheme={currentTheme}
            />
            <InfoCard 
              title="Action" 
              icon={<Play className="w-4 h-4 text-blue-600" />}
              content={content.action}
              onSearch={() => setShowAdvancedAnim(true)}
              isAction={true}
              currentTheme={currentTheme}
              muscleName={muscle.name}
            />
          </div>

          {/* Demonstration */}
          {muscle.group === 'A' && (
            <div className={`${theme.infoBox} rounded-2xl p-8 border ${theme.border}`}>
              <h3 className={`text-lg font-bold ${theme.text} mb-4 flex items-center gap-2`}>
                <Activity className={`w-5 h-5 ${theme.subText}`} />
                Demonstration
              </h3>
              <div className={`${theme.text} leading-relaxed text-base whitespace-pre-line`}>
                {content.demonstration}
              </div>
              <p className={`mt-6 text-xs font-medium flex items-center gap-1.5 p-2 rounded-lg inline-block ${
                currentTheme === 'midnight' 
                ? 'bg-orange-900/30 text-orange-200' 
                : currentTheme === 'blueprint'
                ? 'bg-orange-800/20 text-orange-200 border border-orange-700/30'
                : 'bg-orange-50 text-orange-600'
              }`}>
                <Info className="w-3.5 h-3.5" />
                Must point to origin & insertion on an unpainted skeleton (not on your own body).
              </p>
            </div>
          )}

          {/* Bottom Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {content.tips && content.tips.length > 0 && (
              <div>
                <h3 className={`text-sm font-bold ${theme.subText} uppercase tracking-wider mb-4 flex items-center gap-2`}>
                  <Lightbulb className="w-4 h-4" />
                  Tips
                </h3>
                <ul className="space-y-4">
                  {content.tips.map((tip, idx) => (
                    <li key={idx} className={`flex gap-3 ${theme.text} text-sm`}>
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed pt-0.5">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-8">
              {content.clinicalConnection && (
                <div>
                  <h3 className={`text-sm font-bold ${theme.subText} uppercase tracking-wider mb-3 flex items-center gap-2`}>
                    <Info className="w-4 h-4" />
                    Clinical Connection
                  </h3>
                  <div className={`p-5 ${theme.cardBg} border ${theme.border} rounded-xl shadow-sm`}>
                    <p className={`text-sm ${theme.text} leading-relaxed`}>
                      {content.clinicalConnection}
                    </p>
                  </div>
                </div>
              )}

               {content.relatedMuscles && content.relatedMuscles.length > 0 && (
                <div>
                  <h3 className={`text-sm font-bold ${theme.subText} uppercase tracking-wider mb-3`}>
                    Related Muscles
                  </h3>
                  <div className="flex flex-col gap-2">
                    {content.relatedMuscles.map((rm, i) => {
                      const relatedMuscle = MUSCLE_DATA.find(m => m.id === rm.id);
                      
                      if (!relatedMuscle) return null;

                      return (
                        <button 
                          key={i}
                          onClick={() => handleRelatedClick(relatedMuscle)}
                          className={`group flex items-center justify-between p-3 ${theme.cardBg} border ${theme.border} hover:border-brand-300 hover:ring-1 hover:ring-brand-200 rounded-xl text-left transition-all shadow-sm`}
                        >
                          <div>
                            <span className={`block text-sm font-bold ${theme.text} group-hover:text-brand-700`}>{rm.name}</span>
                            <span className={`block text-xs ${theme.subText} mt-0.5`}>{rm.relation}</span>
                          </div>
                          {onRelatedMuscleClick ? (
                            <Info className={`w-4 h-4 ${theme.subText} group-hover:text-brand-500`} />
                          ) : (
                            <ArrowRight className={`w-4 h-4 ${theme.subText} group-hover:text-brand-500`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}



      {/* Advanced 3D Viewer (react-three-fiber) */}
      {showAdvancedAnim && (
        <AdvancedAnimationViewer 
          muscleName={muscle.name}
          muscleId={muscle.id}
          currentTheme={currentTheme}
          actionString={content?.action}
          demonstrationText={content?.demonstration}
          originString={content?.origin}
          insertionString={content?.insertion}
          onClose={() => setShowAdvancedAnim(false)}
          browserMode={false}
        />
      )}
    </div>
  );
};

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  content: string;
  className?: string;
  onSearch: () => void;
  isAction?: boolean;
  currentTheme: AppTheme;
  muscleName?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, content, className, onSearch, isAction, currentTheme, muscleName }) => {
  const theme = THEME_CONFIG[currentTheme];
  
  // Parse actions to extract individual movements for GIF search
  const extractedMotions = React.useMemo(() => {
    if (!isAction || !content) return [];
    
    const motionKeywords = [
      'flexion', 'extension', 'abduction', 'adduction',
      'rotation', 'medial rotation', 'lateral rotation',
      'pronation', 'supination', 'dorsiflexion', 'plantarflexion',
      'elevation', 'depression', 'protraction', 'retraction',
      'inversion', 'eversion', 'circumduction', 'opposition'
    ];
    
    const actionList = content
      .split(/[\n;]/)
      .map((s) => s.replace(/^\d+\.\s*/, '').trim())
      .filter((s) => s.length > 3 && !s.match(/^\d+$/));
    
    const found: string[] = [];
    actionList.forEach((action) => {
      const lower = action.toLowerCase();
      motionKeywords.forEach((keyword) => {
        if (lower.includes(keyword) && !found.includes(keyword)) {
          found.push(keyword);
        }
      });
    });
    
    return found;
  }, [isAction, content]);
  
  const openGifSearch = (motion: string) => {
    const query = `${muscleName} ${motion} animation gif`;
    const url = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
    const width = 1000;
    const height = 800;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    window.open(url, 'GifSearch', `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no`);
  };
  
  return (
    <div className={`p-6 rounded-2xl border ${theme.border} shadow-sm flex flex-col h-full hover:border-brand-400/50 transition-colors ${theme.cardBg} ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className={`p-1.5 rounded-md ${theme.inputBg}`}>{icon}</div>
          <h3 className={`font-bold ${theme.text} text-sm uppercase tracking-wide`}>{title}</h3>
        </div>
      </div>
      <div className={`text-sm ${theme.text} leading-relaxed whitespace-pre-line flex-1 mb-4 opacity-90`}>
        {content}
      </div>
      
      {/* GIF Search buttons for individual actions */}
      {isAction && extractedMotions.length > 0 && (
        <div className="mb-3">
          <p className={`text-xs font-semibold ${theme.subText} uppercase tracking-wider mb-2 flex items-center gap-1.5`}>
            <ImageIcon className="w-3 h-3" />
            Quick GIF Search
          </p>
          <div className="flex flex-wrap gap-2">
            {extractedMotions.map((motion, i) => (
              <button
                key={i}
                onClick={() => openGifSearch(motion)}
                className={`px-2.5 py-1.5 rounded-lg border ${theme.border} ${theme.inputBg} text-[11px] font-medium capitalize hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center gap-1.5 ${theme.text}`}
              >
                <Search className="w-3 h-3 text-blue-500" />
                {motion} gif
              </button>
            ))}
          </div>
        </div>
      )}
      
      <button 
        onClick={onSearch}
        className={`w-full mt-auto py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
          isAction 
          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' 
          : `${theme.inputBg} border ${theme.border} hover:border-brand-400 ${theme.text} hover:text-brand-600`
        }`}
      >
        {isAction ? <PlayCircle className="w-4 h-4" /> : <Search className="w-3.5 h-3.5" />}
        {isAction ? "Show Action Animation" : `Show ${title} Image`}
      </button>
    </div>
  );
};

export default MuscleView;
