import React, { useState, useMemo } from 'react';
import { MUSCLE_DATA } from '../constants';
import { MuscleItem, StudyMode, MuscleProgress, AppTheme } from '../types';
import { Search, ChevronRight, BookOpen, CheckCircle2, Share2, Circle, X, Copy, Check, GraduationCap, LayoutList, Settings, Key, Trash2, Trophy, Clock, Sun, Moon, DraftingCompass, Leaf, Palette, Save, AlertTriangle } from 'lucide-react';

interface SidebarProps {
  onSelectMuscle: (muscle: MuscleItem) => void;
  selectedMuscleId: string | null;
  isOpen: boolean;
  onCloseMobile: () => void;
  learnedIds: Set<string>;
  toggleLearned: (id: string) => void;
  getShareLink: (name: string) => string;
  currentMode: StudyMode;
  onSetMode: (mode: StudyMode) => void;
  apiKey: string;
  onSetApiKey: (key: string) => void;
  progressMap: Record<string, MuscleProgress>;
  onResetProgress?: () => void;
  currentTheme: AppTheme;
  onSetTheme: (theme: AppTheme) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onSelectMuscle, 
  selectedMuscleId, 
  isOpen, 
  onCloseMobile,
  learnedIds,
  toggleLearned,
  getShareLink,
  currentMode,
  onSetMode,
  apiKey,
  onSetApiKey,
  progressMap,
  onResetProgress,
  currentTheme,
  onSetTheme
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState<'ALL' | 'A' | 'B'>('ALL');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);
  const [shareName, setShareName] = useState('');

  const filteredMuscles = useMemo(() => {
    return MUSCLE_DATA.filter((muscle) => {
      const matchesSearch = muscle.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            muscle.subCategory?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGroup = searchTerm ? true : (filterGroup === 'ALL' || muscle.group === filterGroup);
      
      return matchesSearch && matchesGroup;
    });
  }, [searchTerm, filterGroup]);

  const groupedDisplay = useMemo(() => {
    const groups: Record<string, MuscleItem[]> = {};
    filteredMuscles.forEach(m => {
      const key = m.subCategory || 'General';
      if (!groups[key]) groups[key] = [];
      groups[key].push(m);
    });
    return groups;
  }, [filteredMuscles]);

  const progress = Math.round((learnedIds.size / MUSCLE_DATA.length) * 100);
  const dueCount = (Object.values(progressMap) as MuscleProgress[]).filter(p => p.dueDate <= Date.now()).length;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getShareLink(shareName));
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleSaveKey = () => {
    onSetApiKey(tempKey);
    setShowSettingsModal(false);
  };

  const handleRemoveKey = () => {
    setTempKey('');
    onSetApiKey('');
    setShowSettingsModal(false);
  };

  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-30 w-80 bg-slate-50 border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 flex flex-col h-full`}>
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white shadow-brand-200 shadow-lg">
                <BookOpen className="w-4 h-4" />
              </div>
              <h1 className="text-lg font-extrabold tracking-tight text-slate-900 leading-none">
                A&P Muscle<br/>Guide
              </h1>
            </div>
            <button 
              onClick={() => {
                setTempKey(apiKey);
                setShowSettingsModal(true);
              }}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
            <button 
              onClick={() => onSetMode('REFERENCE')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                currentMode === 'REFERENCE' 
                ? 'bg-white shadow-sm text-slate-900' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" /> List
            </button>
            <button 
              onClick={() => onSetMode('STUDY')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                currentMode === 'STUDY' 
                ? 'bg-white shadow-sm text-brand-700' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" /> Study
            </button>
          </div>

          {/* REFERENCE MODE: Progress & Filters */}
          {currentMode === 'REFERENCE' && (
            <>
              {/* Progress Tracker */}
              <div className="mb-5 bg-gradient-to-br from-brand-50 to-white p-4 rounded-xl border border-brand-100 shadow-sm">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-brand-800 uppercase tracking-wider flex items-center gap-1">
                    <Trophy className="w-3 h-3" /> Mastery
                  </span>
                  <span className="text-xs font-bold text-brand-600">{learnedIds.size} / {MUSCLE_DATA.length}</span>
                </div>
                <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden mb-3">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-500" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <button 
                  onClick={() => setShowShareModal(true)}
                  className="w-full flex items-center justify-center gap-2 text-xs font-bold text-brand-700 hover:text-brand-800 py-2 bg-white border border-brand-200 hover:border-brand-300 rounded-lg shadow-sm hover:shadow transition-all"
                >
                  <Save className="w-3 h-3" />
                  Save & Share Stats
                </button>
              </div>
              
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search all muscles..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-100 border-none rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-500/20 focus:bg-white transition-all outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className={`flex bg-slate-100 p-1 rounded-lg transition-opacity duration-200 ${searchTerm ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                {(['ALL', 'A', 'B'] as const).map(g => (
                  <button
                    key={g}
                    onClick={() => setFilterGroup(g)}
                    className={`flex-1 py-1 text-xs font-semibold rounded-md transition-all ${
                      filterGroup === g 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {g === 'ALL' ? 'All' : `Group ${g}`}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* STUDY MODE: Stats */}
          {currentMode === 'STUDY' && (
            <div className="space-y-3">
              <div className="bg-red-50 p-4 rounded-xl flex items-center gap-4 border border-red-100">
                <div className="p-2 bg-white rounded-lg text-red-600 shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{dueCount} Muscles</h4>
                  <p className="text-xs text-red-600 font-medium">Due for spaced repetition</p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl flex items-center gap-4 border border-blue-100">
                <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{learnedIds.size} Mastered</h4>
                  <p className="text-xs text-blue-600 font-medium">Keep hitting the books!</p>
                </div>
              </div>
              
              <p className="text-xs text-slate-400 text-center pt-4">
                Exam Dec 8th. You got this.
              </p>
            </div>
          )}
        </div>

        {/* List (Only visible in Reference Mode) */}
        {currentMode === 'REFERENCE' ? (
          <div className="flex-1 overflow-y-auto px-2 py-4 space-y-6 custom-scrollbar">
            {(Object.entries(groupedDisplay) as [string, MuscleItem[]][]).sort().map(([category, muscles]) => (
              <div key={category} className="space-y-1">
                <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 sticky top-0 bg-slate-50 py-1 z-10">
                  {category}
                </h3>
                <div className="space-y-0.5">
                  {muscles.map((muscle) => {
                    const isLearned = learnedIds.has(muscle.id);
                    const isSelected = selectedMuscleId === muscle.id;
                    
                    return (
                      <div 
                        key={muscle.id}
                        className={`group flex items-center w-full rounded-md transition-all ${
                           isSelected ? 'bg-white shadow-sm ring-1 ring-slate-200' : 'hover:bg-slate-100'
                        }`}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLearned(muscle.id);
                          }}
                          className="p-3 focus:outline-none text-slate-300 hover:text-brand-500 transition-colors"
                          title={isLearned ? "Mark as unlearned" : "Mark as learned"}
                        >
                          {isLearned ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500 fill-green-50" />
                          ) : (
                            <Circle className="w-4 h-4" />
                          )}
                        </button>
                        
                        <button
                          onClick={() => {
                            onSelectMuscle(muscle);
                            onCloseMobile();
                          }}
                          className="flex-1 py-2 pr-3 text-left flex items-center justify-between"
                        >
                          <span className={`text-sm font-medium truncate ${isSelected ? 'text-brand-700' : 'text-slate-600'} ${isLearned && !isSelected ? 'text-slate-400' : ''}`}>
                            {muscle.name}
                          </span>
                          {isSelected && <ChevronRight className="w-3.5 h-3.5 text-brand-500" />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {Object.keys(groupedDisplay).length === 0 && (
              <div className="p-8 text-center">
                <p className="text-sm text-slate-500">No muscles found.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 bg-slate-50"></div>
        )}
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-white text-[10px] text-slate-400 text-center uppercase tracking-wider font-semibold">
          Lab Manual Edition • {apiKey ? 'AI Enabled' : 'AI Optional'}
        </div>
      </div>

      {/* Share Modal - Kept same as before but using passed in getShareLink */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
           {/* ... existing share modal code ... */}
           {/* Assuming the original Share Modal content is sufficient, abbreviated here for brevity in diff unless changes needed.
               However, since I need to return full file content, I must include the full modal code below.
            */}
           <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 border border-slate-100">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-brand-400 to-blue-600 p-1.5 rounded-lg shadow-sm">
                  <Share2 className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-slate-900">Save Your Journey</h3>
              </div>
              <button 
                onClick={() => setShowShareModal(false)}
                className="p-1 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
               {/* Progress content ... */}
               <div className="space-y-3">
                 <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Customize your link (Fun!)</label>
                 <div className="relative group">
                   <input 
                      type="text" 
                      placeholder="Enter your name (e.g. Dr. Muscle)" 
                      value={shareName}
                      onChange={(e) => setShareName(e.target.value)}
                      className="w-full pl-3 pr-3 py-3 bg-white border-2 border-slate-100 rounded-xl text-sm font-semibold focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all placeholder:font-normal"
                   />
                 </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Your Unique Magic Link</label>
                <div className="flex gap-2">
                  <input 
                    readOnly 
                    value={getShareLink(shareName)} 
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-600 font-mono focus:outline-none truncate cursor-text hover:bg-slate-100 transition-colors"
                    onClick={(e) => e.currentTarget.select()}
                  />
                  <button 
                    onClick={handleCopyLink}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 min-w-[110px] justify-center transform active:scale-95 ${
                      copyFeedback 
                      ? 'bg-green-500 text-white shadow-green-200 shadow-lg' 
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xl hover:shadow-2xl'
                    }`}
                  >
                    {copyFeedback ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copyFeedback ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
           </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
             <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
               <div className="flex items-center gap-2">
                 <Settings className="w-4 h-4 text-slate-600" />
                 <h3 className="font-bold text-slate-900">App Settings</h3>
               </div>
               <button 
                onClick={() => setShowSettingsModal(false)}
                className="p-1 hover:bg-slate-200 rounded-full transition-colors"
               >
                 <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
               </button>
             </div>
             <div className="p-6 space-y-6">
                
                {/* Theme Selector */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                     <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                       <Palette className="w-5 h-5" />
                     </div>
                     <div>
                       <h4 className="text-sm font-bold text-slate-900">Visual Theme</h4>
                       <p className="text-xs text-slate-500 mt-1">
                         Customize your study environment.
                       </p>
                     </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <button 
                      onClick={() => onSetTheme('modern')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${currentTheme === 'modern' ? 'bg-slate-50 border-brand-500 text-brand-600 shadow-sm' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'}`}
                    >
                      <Sun className="w-5 h-5" />
                      <span className="text-[10px] font-bold">Modern</span>
                    </button>
                    <button 
                      onClick={() => onSetTheme('midnight')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${currentTheme === 'midnight' ? 'bg-slate-800 border-indigo-500 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'}`}
                    >
                      <Moon className="w-5 h-5" />
                      <span className="text-[10px] font-bold">Midnight</span>
                    </button>
                    <button 
                      onClick={() => onSetTheme('blueprint')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${currentTheme === 'blueprint' ? 'bg-blue-50 border-blue-500 text-blue-600 shadow-sm' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'}`}
                    >
                      <DraftingCompass className="w-5 h-5" />
                      <span className="text-[10px] font-bold">Print</span>
                    </button>
                    <button 
                      onClick={() => onSetTheme('nature')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${currentTheme === 'nature' ? 'bg-stone-50 border-emerald-500 text-emerald-600 shadow-sm' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'}`}
                    >
                      <Leaf className="w-5 h-5" />
                      <span className="text-[10px] font-bold">Nature</span>
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <Key className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">AI Features (Optional)</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Add a Gemini API key for extra content. Core lab manual data is free.
                      </p>
                    </div>
                  </div>
                  
                  <input 
                    type="password"
                    placeholder="Enter Gemini API Key..."
                    value={tempKey}
                    onChange={(e) => setTempKey(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 outline-none"
                  />
                  
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={handleRemoveKey}
                      className="text-xs text-red-500 font-semibold hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Remove Key
                    </button>
                  </div>
                </div>

                {onResetProgress && (
                   <div className="pt-6 border-t border-slate-100">
                     <div className="flex items-start gap-3 mb-4">
                       <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                         <AlertTriangle className="w-5 h-5" />
                       </div>
                       <div>
                         <h4 className="text-sm font-bold text-slate-900">Danger Zone</h4>
                         <p className="text-xs text-slate-500 mt-1">
                           Resetting progress clears all learned statuses and spaced repetition history.
                         </p>
                       </div>
                     </div>
                     <button 
                       onClick={() => {
                         onResetProgress();
                         setShowSettingsModal(false);
                       }}
                       className="w-full py-2 bg-white border border-red-200 text-red-600 font-bold text-xs rounded-lg hover:bg-red-50 transition-colors"
                     >
                       Reset All Progress
                     </button>
                   </div>
                )}

                <div className="pt-2">
                  <button 
                    onClick={handleSaveKey}
                    className="w-full px-4 py-2 bg-brand-600 text-white text-sm font-bold rounded-lg hover:bg-brand-700"
                  >
                    Save Settings
                  </button>
                </div>
             </div>
           </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;