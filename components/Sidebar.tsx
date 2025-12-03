import React, { useState, useMemo, useEffect } from 'react';
import { MUSCLE_DATA, THEME_CONFIG } from '../constants';
import { MuscleItem, StudyMode, MuscleProgress, AppTheme } from '../types';
import { Search, ChevronRight, BookOpen, CheckCircle2, Share2, Circle, X, Copy, Check, GraduationCap, LayoutList, Settings, Key, Trash2, Trophy, Clock, Sun, Moon, DraftingCompass, Leaf, Palette, Save, AlertTriangle, Timer, Play, User } from 'lucide-react';
import pkg from '../package.json';

interface SidebarProps {
  onSelectMuscle: (muscle: MuscleItem) => void;
  selectedMuscleId: string | null;
  isOpen: boolean;
  onCloseMobile: () => void;
  learnedIds: Set<string>;
  toggleLearned: (id: string) => void;
  getShareLink: (name: string) => string;
  getSaveCode: (name: string) => string;
  currentMode: StudyMode;
  onSetMode: (mode: StudyMode) => void;
  apiKey: string;
  onSetApiKey: (key: string) => void;
  progressMap: Record<string, MuscleProgress>;
  onResetProgress?: () => void;
  currentTheme: AppTheme;
  onSetTheme: (theme: AppTheme) => void;
  daysUntilExam: number;
  studentName: string;
  onSetStudentName: (name: string) => void;
  onOpenAnimationBrowser?: () => void; // NEW
  examDate: number;
  onSetExamDate: (date: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onSelectMuscle, 
  selectedMuscleId, 
  isOpen, 
  onCloseMobile,
  learnedIds,
  toggleLearned,
  getShareLink,
  getSaveCode,
  currentMode,
  onSetMode,
  apiKey,
  onSetApiKey,
  progressMap,
  onResetProgress,
  currentTheme,
  onSetTheme,
  daysUntilExam,
  studentName,
  onSetStudentName,
  onOpenAnimationBrowser,
  examDate,
  onSetExamDate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState<'ALL' | 'A' | 'B'>('ALL');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [copyCodeFeedback, setCopyCodeFeedback] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);
  // Removed local shareName state in favor of prop
  const [skipWelcome, setSkipWelcome] = useState<boolean>(() => {
    try { return localStorage.getItem('welcome_dismissed') === '1'; } catch { return false; }
  });
  const [autoResume, setAutoResume] = useState<boolean>(() => {
    try { return localStorage.getItem('settings_auto_resume') === '1'; } catch { return false; }
  });
  const [hideSplash, setHideSplash] = useState<boolean>(() => {
    try { return localStorage.getItem('settings_hide_splash') === '1'; } catch { return false; }
  });
  const [tempExamDate, setTempExamDate] = useState<string>('');
  const [statsPreview, setStatsPreview] = useState<any>(() => {
    try { const raw = localStorage.getItem('app_stats'); return raw ? JSON.parse(raw) : null; } catch { return null; }
  });

  // Initialize temp exam date when modal opens
  useEffect(() => {
    if (showSettingsModal) {
      const date = new Date(examDate);
      const formatted = date.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:MM
      setTempExamDate(formatted);
    }
  }, [showSettingsModal, examDate]);

  const theme = THEME_CONFIG[currentTheme];
  const isDarkTheme = currentTheme === 'midnight' || currentTheme === 'blueprint';

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
    navigator.clipboard.writeText(getShareLink(studentName));
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getSaveCode(studentName));
    setCopyCodeFeedback(true);
    setTimeout(() => setCopyCodeFeedback(false), 2000);
  };

  const handleSaveKey = () => {
    onSetApiKey(tempKey);
    // Save exam date if changed
    if (tempExamDate) {
      const parsed = new Date(tempExamDate).getTime();
      if (!isNaN(parsed) && parsed > Date.now()) {
        onSetExamDate(parsed);
      }
    }
    try {
      localStorage.setItem('welcome_dismissed', skipWelcome ? '1' : '0');
      localStorage.setItem('settings_auto_resume', autoResume ? '1' : '0');
      localStorage.setItem('settings_hide_splash', hideSplash ? '1' : '0');
    } catch {}
    setShowSettingsModal(false);
  };

  const handleRemoveKey = () => {
    setTempKey('');
    onSetApiKey('');
    setShowSettingsModal(false);
  };

  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-30 w-80 ${theme.sidebarBg} ${theme.sidebarBorder} border-r transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 flex flex-col h-full shadow-2xl`}>
        {/* Header */}
        <div className={`p-5 border-b ${theme.sidebarBorder}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h1 className={`text-lg font-black tracking-tight leading-none ${theme.sidebarText}`}>
                  Muscle<br/>Guide <span className="text-[10px] font-normal opacity-50 ml-1">v{pkg.version}</span>
                </h1>
                {studentName && (
                  <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${theme.sidebarSubText}`}>
                    Welcome, {studentName}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {onOpenAnimationBrowser && (
                <button 
                  onClick={onOpenAnimationBrowser}
                  className={`p-2 rounded-full transition-all bg-gradient-to-r from-brand-500 to-blue-600 text-white hover:scale-110 hover:shadow-lg shadow-brand-500/30`}
                  title="Open Animation Browser"
                >
                  <Play className="w-4 h-4" />
                </button>
              )}
              <button 
                onClick={() => {
                  setTempKey(apiKey);
                  setShowSettingsModal(true);
                }}
                className={`p-2 rounded-full transition-all ${theme.sidebarSubText} hover:bg-black/5 hover:${theme.sidebarText}`}
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Exam Countdown Widget */}
          <div className={`mb-6 p-4 rounded-2xl border ${theme.sidebarBorder} bg-gradient-to-br from-brand-500/5 to-blue-500/5 flex items-center gap-4 relative overflow-hidden group`}>
             <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer`}></div>
             <div className="p-2.5 bg-white rounded-xl shadow-sm text-red-500 ring-1 ring-black/5">
               <Timer className="w-5 h-5" />
             </div>
             <div>
               <p className={`text-[10px] font-bold uppercase tracking-wider ${theme.sidebarSubText} mb-0.5`}>Final Exam</p>
               <p className={`text-sm font-black ${theme.sidebarText}`}>{daysUntilExam} Days Left</p>
             </div>
          </div>

          {/* Mode Switcher */}
          <div className={`flex ${theme.inputBg} p-1.5 rounded-xl mb-6`}>
            <button 
              onClick={() => onSetMode('REFERENCE')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                currentMode === 'REFERENCE' 
                ? `${theme.cardBg} shadow-sm ${theme.sidebarText} ring-1 ring-black/5`
                : `${theme.sidebarSubText} hover:${theme.sidebarText}`
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" /> List
            </button>
            <button 
              onClick={() => onSetMode('STUDY')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                currentMode === 'STUDY' 
                ? `${theme.cardBg} shadow-sm text-brand-600 ring-1 ring-black/5`
                : `${theme.sidebarSubText} hover:${theme.sidebarText}`
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" /> Study
            </button>
          </div>

          {/* REFERENCE MODE: Progress & Filters */}
          {currentMode === 'REFERENCE' && (
            <>
              {/* Progress Tracker */}
              <div className="mb-5 bg-gradient-to-br from-brand-500/10 to-blue-500/10 p-5 rounded-2xl border border-brand-500/20 relative overflow-hidden">
                <div className="flex justify-between items-end mb-3 relative z-10">
                  <span className="text-xs font-bold text-brand-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5" /> Mastery
                  </span>
                  <span className="text-sm font-black text-brand-700">{learnedIds.size} / {MUSCLE_DATA.length}</span>
                </div>
                <div className="h-3 w-full bg-white/50 rounded-full overflow-hidden mb-4 ring-1 ring-black/5">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <button 
                  onClick={() => setShowShareModal(true)}
                  className="w-full flex items-center justify-center gap-2 text-xs font-bold text-brand-700 hover:text-brand-800 py-2.5 bg-white/80 hover:bg-white border border-brand-200/50 rounded-xl shadow-sm hover:shadow transition-all backdrop-blur-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Progress
                </button>
              </div>
              
              <div className="relative mb-4">
                <Search className={`absolute left-3.5 top-3 w-4 h-4 ${theme.sidebarSubText}`} />
                <input
                  type="text"
                  placeholder="Search muscles..."
                  className={`w-full pl-10 pr-4 py-2.5 ${theme.inputBg} border-none rounded-xl text-sm ${theme.sidebarText} placeholder-${theme.sidebarSubText} focus:ring-2 focus:ring-brand-500/20 transition-all outline-none font-medium`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className={`flex ${theme.inputBg} p-1 rounded-xl transition-opacity duration-200 ${searchTerm ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                {(['ALL', 'A', 'B'] as const).map(g => (
                  <button
                    key={g}
                    onClick={() => setFilterGroup(g)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      filterGroup === g 
                        ? `${theme.cardBg} ${theme.sidebarText} shadow-sm ring-1 ring-black/5` 
                        : `${theme.sidebarSubText} hover:${theme.sidebarText}`
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
              {/* Overall Progress Tracker - Same as Reference Mode */}
              <div className="mb-2 bg-gradient-to-br from-brand-500/10 to-blue-500/10 p-5 rounded-2xl border border-brand-500/20 relative overflow-hidden">
                <div className="flex justify-between items-end mb-3 relative z-10">
                  <span className="text-xs font-bold text-brand-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5" /> Mastery
                  </span>
                  <span className="text-sm font-black text-brand-700">{learnedIds.size} / {MUSCLE_DATA.length}</span>
                </div>
                <div className="h-3 w-full bg-white/50 rounded-full overflow-hidden mb-4 ring-1 ring-black/5">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <button 
                  onClick={() => setShowShareModal(true)}
                  className="w-full flex items-center justify-center gap-2 text-xs font-bold text-brand-700 hover:text-brand-800 py-2.5 bg-white/80 hover:bg-white border border-brand-200/50 rounded-xl shadow-sm hover:shadow transition-all backdrop-blur-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Progress
                </button>
              </div>

              {/* Smart Learning Stats */}
              <div className={`p-4 rounded-xl flex items-center gap-4 border ${
                currentTheme === 'midnight' || currentTheme === 'blueprint' 
                ? 'bg-red-900/20 border-red-700/30' 
                : 'bg-red-50 border-red-100'
              }`}>
                <div className={`p-2 rounded-lg shadow-sm ${
                  currentTheme === 'midnight' || currentTheme === 'blueprint'
                  ? 'bg-red-800/30 text-red-300'
                  : 'bg-white text-red-600'
                }`}>
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${theme.sidebarText}`}>{dueCount} Muscles</h4>
                  <p className={`text-xs font-medium ${
                    currentTheme === 'midnight' || currentTheme === 'blueprint'
                    ? 'text-red-300'
                    : 'text-red-600'
                  }`}>Due for spaced repetition</p>
                </div>
              </div>
              
              <p className={`text-xs text-center pt-2 ${theme.sidebarSubText}`}>
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
                <h3 className={`px-3 text-[10px] font-bold uppercase tracking-widest mb-2 sticky top-0 py-1 z-10 ${theme.sidebarBg} ${theme.sidebarSubText}`}>
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
                           isSelected ? theme.sidebarActive : theme.sidebarHover
                        }`}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLearned(muscle.id);
                          }}
                          className={`p-3 focus:outline-none transition-colors ${
                            isSelected 
                            ? 'text-brand-500' 
                            : `${theme.sidebarSubText} hover:text-brand-500`
                          }`}
                          title={isLearned ? "Mark as unlearned" : "Mark as learned"}
                        >
                          {isLearned ? (
                            <CheckCircle2 className={`w-4 h-4 ${
                              currentTheme === 'midnight'
                              ? 'text-green-400 fill-green-900/30'
                              : currentTheme === 'blueprint'
                              ? 'text-green-300 fill-green-900/20'
                              : 'text-green-500 fill-green-50'
                            }`} />
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
                          <span className={`text-sm font-medium truncate ${isSelected ? '' : theme.sidebarText} ${isLearned && !isSelected ? 'opacity-50' : ''}`}>
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
                <p className={`text-sm ${theme.sidebarSubText}`}>No muscles found.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1"></div>
        )}
        
        {/* Footer */}
        <div className={`p-4 border-t ${theme.sidebarBorder} ${theme.sidebarBg}`}>
          <div className="flex items-center justify-between text-[10px] font-bold">
            <span className={`${theme.sidebarSubText} opacity-50`}>v{pkg.version}</span>
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1 ${apiKey ? 'text-emerald-600' : theme.sidebarSubText}`}>
                <Key className="w-3 h-3" />
                <span className="uppercase tracking-wider">{apiKey ? 'AI' : 'No AI'}</span>
              </div>
              <span className={`${theme.sidebarSubText} opacity-30`}>|</span>
              <button
                onClick={() => setShowSettingsModal(true)}
                className={`flex items-center gap-1 ${theme.sidebarSubText} hover:text-brand-600 transition-colors uppercase tracking-wider`}
              >
                <Settings className="w-3 h-3" />
                <span>Settings</span>
              </button>
            </div>
          </div>
          <div className={`text-center mt-2 text-[9px] ${theme.sidebarSubText} opacity-50 uppercase tracking-wider`}>
            Made by Luca G
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200 ${isDarkTheme ? 'bg-slate-950/80' : 'bg-slate-900/60'}`}>
           <div className={`rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all scale-100 border ${isDarkTheme ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-100'}`}>
            <div className={`p-4 border-b flex items-center justify-between ${isDarkTheme ? 'bg-slate-900 border-slate-700' : 'bg-gradient-to-r from-brand-50 to-blue-50 border-slate-100'}`}>
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-brand-400 to-blue-600 p-1.5 rounded-lg shadow-sm">
                  <Share2 className="w-4 h-4 text-white" />
                </div>
                <h3 className={`font-bold ${isDarkTheme ? 'text-slate-100' : 'text-slate-900'}`}>Save Progress</h3>
              </div>
              <button 
                onClick={() => setShowShareModal(false)}
                className={`p-1 rounded-full transition-colors ${isDarkTheme ? 'hover:bg-slate-800' : 'hover:bg-white/50'}`}
              >
                <X className={`w-5 h-5 ${isDarkTheme ? 'text-slate-300 hover:text-slate-100' : 'text-slate-400 hover:text-slate-600'}`} />
              </button>
            </div>
            
            <div className={`p-6 space-y-6 ${isDarkTheme ? 'bg-slate-900' : 'bg-white'}`}>
               <div className={`p-4 rounded-xl border-2 flex items-start gap-3 ${isDarkTheme ? 'bg-amber-900/20 border-amber-700/40' : 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200'}`}>
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <p className={`text-xs font-bold mb-1 ${isDarkTheme ? 'text-amber-100' : 'text-amber-900'}`}>No Account Required</p>
                    <p className={`text-xs leading-relaxed ${isDarkTheme ? 'text-amber-200' : 'text-amber-800'}`}>
                      We don't store your data. Use a Save Code to backup your progress, or a Share Link to send it to another device.
                    </p>
                  </div>
               </div>

               <div className="space-y-3">
                 <label className={`text-xs font-bold uppercase tracking-wider block ${isDarkTheme ? 'text-slate-300' : 'text-slate-500'}`}>Personalize (optional)</label>
                 <input 
                    type="text" 
                    placeholder="Add a label (e.g. Dr. Muscle)" 
                    value={studentName}
                    onChange={(e) => onSetStudentName(e.target.value)}
                    className={`w-full pl-3 pr-3 py-3 border-2 rounded-xl text-sm font-semibold focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all placeholder:font-normal ${isDarkTheme ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-100 text-slate-900'}`}
                 />
               </div>

               <div className="grid gap-4 md:grid-cols-2">
                 {/* Save Code */}
                 <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-slate-100 flex flex-col gap-3 shadow-lg">
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="text-xs uppercase tracking-widest text-slate-400">Offline Friendly</p>
                       <h4 className="font-bold text-white">Save Code</h4>
                     </div>
                     <div className="px-2 py-1 text-[10px] bg-slate-800 rounded-full uppercase tracking-wider">Encrypted</div>
                   </div>
                   <textarea
                      readOnly 
                      value={getSaveCode(studentName)} 
                      rows={4}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-[11px] text-emerald-400 font-mono focus:outline-none resize-none"
                      onClick={(e) => e.currentTarget.select()}
                   />
                   <button 
                      onClick={handleCopyCode}
                      className={`w-full py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                        copyCodeFeedback
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                   >
                      {copyCodeFeedback ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copyCodeFeedback ? 'Code Copied!' : 'Copy Save Code'}
                   </button>
                   <p className="text-[11px] text-slate-400">
                      Perfect for paper planners or when switching devices later.
                   </p>
                 </div>

                 {/* Share Link */}
                 <div className={`p-4 rounded-2xl border flex flex-col gap-3 shadow-sm ${isDarkTheme ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                   <div>
                     <p className={`text-xs uppercase tracking-widest ${isDarkTheme ? 'text-slate-300' : 'text-slate-400'}`}>Instant Resume</p>
                     <h4 className={`font-bold ${isDarkTheme ? 'text-slate-100' : 'text-slate-900'}`}>Shareable Link</h4>
                   </div>
                   <input 
                    readOnly 
                    value={getShareLink(studentName)} 
                    className={`w-full border rounded-xl px-3 py-2 text-[11px] font-mono focus:outline-none truncate cursor-text transition-colors ${isDarkTheme ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-950' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                    onClick={(e) => e.currentTarget.select()}
                   />
                   <button 
                      onClick={handleCopyLink}
                      className={`w-full py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                        copyFeedback
                        ? 'bg-brand-600 text-white'
                        : isDarkTheme ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                   >
                      {copyFeedback ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copyFeedback ? 'Link Copied!' : 'Copy Link'}
                   </button>
                   <p className={`text-[11px] ${isDarkTheme ? 'text-slate-400' : 'text-slate-500'}`}>
                      Great for texting or emailing yourself a quick resume link.
                   </p>
                 </div>
               </div>

               <div className={`p-3 rounded-lg border ${isDarkTheme ? 'bg-blue-900/20 border-blue-700/40' : 'bg-blue-50 border-blue-100'}`}>
                 <p className={`text-xs leading-relaxed ${isDarkTheme ? 'text-blue-200' : 'text-blue-800'}`}>
                   <strong>💡 Pro tip:</strong> Save both the code <em>and</em> the link for maximum safety.
                 </p>
               </div>
              
              <div className={`pt-4 border-t space-y-3 ${isDarkTheme ? 'border-slate-700' : 'border-slate-100'}`}>
                 <div className={`flex items-center gap-2 text-xs ${isDarkTheme ? 'text-slate-300' : 'text-slate-500'}`}>
                   <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                   <span>Progress: <strong className={isDarkTheme ? 'text-slate-100' : 'text-slate-700'}>{learnedIds.size}/{MUSCLE_DATA.length}</strong> muscles</span>
                 </div>
                 <div className={`flex items-center gap-2 text-xs ${isDarkTheme ? 'text-slate-300' : 'text-slate-500'}`}>
                   <Palette className="w-4 h-4 text-purple-500" />
                   <span>Theme: <strong className={isDarkTheme ? 'text-slate-100' : 'text-slate-700'}>{THEME_CONFIG[currentTheme].label}</strong></span>
                 </div>
              </div>
            </div>
           </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200 ${
            currentTheme === 'blueprint'
              ? 'bg-[#0d1a2f]/70'
              : isDarkTheme
                ? 'bg-slate-900/50'
                : 'bg-slate-900/30'
          }`}
        >
          <div className={`rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border ${theme.border} ${theme.cardBg} ${theme.text}`}>
            <div
              className={`p-4 border-b ${theme.border} flex items-center justify-between sticky top-0 z-10 ${
                currentTheme === 'blueprint'
                  ? 'bg-[#0d1a2f]/70'
                  : isDarkTheme
                    ? 'bg-slate-900/70'
                    : currentTheme === 'nature'
                      ? 'bg-[#f5f5f4]/80'
                      : 'bg-slate-50/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className={`w-4 h-4 ${isDarkTheme ? 'text-slate-200' : 'text-slate-600'}`} />
                <h3 className="font-bold">App Settings</h3>
              </div>
               <button
                onClick={() => setShowSettingsModal(false)}
                className={`p-1 rounded-full transition-colors ${isDarkTheme ? 'hover:bg-slate-800' : 'hover:bg-slate-200'}`}
               >
                 <X className={`w-5 h-5 ${isDarkTheme ? 'text-slate-400 hover:text-slate-200' : 'text-slate-400 hover:text-slate-600'}`} />
               </button>
             </div>
             <div className={`p-6 space-y-6 max-h-[75vh] overflow-y-auto ${theme.text}`}>

                {/* Student Profile */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                     <div className={`p-2 rounded-lg ${isDarkTheme ? 'bg-brand-900/40 text-brand-200' : 'bg-brand-50 text-brand-600'}`}>
                       <User className="w-5 h-5" />
                     </div>
                     <div>
                       <h4 className="text-sm font-bold">Student Profile</h4>
                       <p className={`text-xs mt-1 ${theme.subText}`}>
                         Your name is embedded in save codes.
                       </p>
                     </div>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => onSetStudentName(e.target.value)}
                      placeholder="Enter your name..."
                      className={`w-full px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 outline-none border ${theme.border} ${isDarkTheme ? 'bg-slate-900' : currentTheme === 'nature' ? 'bg-[#f5f5f4]' : 'bg-slate-50'}`}
                    />
                  </div>
                </div>

                <div className={`border-t pt-6 space-y-4 ${theme.border}`}>
                  {/* Theme Selector */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                     <div className={`p-2 rounded-lg ${isDarkTheme ? 'bg-indigo-900/40 text-indigo-200' : 'bg-purple-50 text-purple-600'}`}>
                       <Palette className="w-5 h-5" />
                     </div>
                     <div>
                       <h4 className="text-sm font-bold">Visual Theme</h4>
                       <p className={`text-xs mt-1 ${theme.subText}`}>
                         Customize your study environment.
                       </p>
                     </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => onSetTheme('modern')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${currentTheme === 'modern' ? 'bg-slate-50 border-brand-500 text-brand-600 shadow-sm' : isDarkTheme ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'}`}
                    >
                      <Sun className="w-5 h-5" />
                      <span className="text-[10px] font-bold">Modern</span>
                    </button>
                    <button
                      onClick={() => onSetTheme('midnight')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${currentTheme === 'midnight' ? 'bg-slate-800 border-indigo-500 text-white shadow-sm' : isDarkTheme ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'}`}
                    >
                      <Moon className="w-5 h-5" />
                      <span className="text-[10px] font-bold">Midnight</span>
                    </button>
                    <button
                      onClick={() => onSetTheme('blueprint')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${currentTheme === 'blueprint' ? 'bg-[#0f2038] border-blue-400 text-slate-100 shadow-sm' : isDarkTheme ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'}`}
                    >
                      <DraftingCompass className="w-5 h-5" />
                      <span className="text-[10px] font-bold">Print</span>
                    </button>
                    <button
                      onClick={() => onSetTheme('nature')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${currentTheme === 'nature' ? 'bg-stone-50 border-emerald-500 text-emerald-600 shadow-sm' : isDarkTheme ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'}`}
                    >
                      <Leaf className="w-5 h-5" />
                      <span className="text-[10px] font-bold">Nature</span>
                    </button>
                  </div>
                </div>

                <div className={`border-t pt-6 space-y-4 ${theme.border}`}>
                  {/* Exam Date Settings */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${isDarkTheme ? 'bg-red-900/40 text-red-200' : 'bg-red-50 text-red-600'}`}>
                        <Timer className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">Exam Date & Study Planning</h4>
                        <p className={`text-xs mt-1 ${theme.subText}`}>
                          Set your exam date to optimize study intervals and receive smart reminders.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className={`text-xs font-bold uppercase tracking-wider ${theme.subText}`}>Exam Date & Time</label>
                      <input
                        type="datetime-local"
                        value={tempExamDate}
                        onChange={(e) => setTempExamDate(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 outline-none border ${theme.border} ${isDarkTheme ? 'bg-slate-900' : currentTheme === 'nature' ? 'bg-[#f5f5f4]' : 'bg-slate-50'}`}
                      />
                      <p className={`text-xs italic ${theme.subText}`}>
                        The SRS algorithm will adjust review intervals to ensure you review all material before your exam.
                      </p>
                    </div>
                  </div>

                  {/* Session & Resume Settings */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${isDarkTheme ? 'bg-green-900/40 text-green-200' : 'bg-green-50 text-green-600'}`}>
                        <Save className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">Session</h4>
                        <p className={`text-xs mt-1 ${theme.subText}`}>Control intros and auto-resume behavior.</p>
                      </div>
                    </div>
                    <div className={`${theme.text} space-y-2`}>
                      <label className={`flex items-center gap-2 text-sm ${theme.subText}`}>
                        <input
                          type="checkbox"
                          checked={autoResume}
                          onChange={(e) => setAutoResume(e.target.checked)}
                          className={`rounded ${isDarkTheme ? 'border-slate-600 text-brand-300 focus:ring-brand-500/40' : 'border-slate-300 text-brand-500 focus:ring-brand-500/40'}`}
                        />
                        Auto-resume learning sessions
                      </label>
                      <label className={`flex items-center gap-2 text-sm ${theme.subText}`}>
                        <input
                          type="checkbox"
                          checked={skipWelcome}
                          onChange={(e) => setSkipWelcome(e.target.checked)}
                          className={`rounded ${isDarkTheme ? 'border-slate-600 text-brand-300 focus:ring-brand-500/40' : 'border-slate-300 text-brand-500 focus:ring-brand-500/40'}`}
                        />
                        Skip welcome screen
                      </label>
                      <label className={`flex items-center gap-2 text-sm ${theme.subText}`}>
                        <input
                          type="checkbox"
                          checked={hideSplash}
                          onChange={(e) => setHideSplash(e.target.checked)}
                          className={`rounded ${isDarkTheme ? 'border-slate-600 text-brand-300 focus:ring-brand-500/40' : 'border-slate-300 text-brand-500 focus:ring-brand-500/40'}`}
                        />
                        Hide splash animation
                      </label>
                    </div>
                  </div>

                  {/* API Key Entry */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${isDarkTheme ? 'bg-amber-900/40 text-amber-200' : 'bg-amber-50 text-amber-600'}`}>
                        <Key className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">AI Features (Optional)</h4>
                        <p className={`text-xs mt-1 leading-relaxed ${theme.subText}`}>
                          Add a Gemini API key for extra content. Core lab manual data is free.
                        </p>
                      </div>
                    </div>

                    <input
                      type="password"
                      placeholder="Enter Gemini API Key..."
                      value={tempKey}
                      onChange={(e) => setTempKey(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 outline-none border ${theme.border} ${isDarkTheme ? 'bg-slate-900' : currentTheme === 'nature' ? 'bg-[#f5f5f4]' : 'bg-slate-50'}`}
                    />

                    <div className="flex justify-between items-center">
                      <button
                        onClick={handleRemoveKey}
                        className={`text-xs font-semibold flex items-center gap-1 ${isDarkTheme ? 'text-red-200 hover:text-red-100' : 'text-red-500 hover:underline'}`}
                      >
                        <Trash2 className="w-3 h-3" /> Remove Key
                      </button>
                    </div>
                  </div>
                </div>

                {onResetProgress && (
                   <div className={`pt-6 border-t ${theme.border}`}>
                     <div className="flex items-start gap-3 mb-4">
                       <div className={`p-2 rounded-lg ${isDarkTheme ? 'bg-red-900/40 text-red-200' : 'bg-red-50 text-red-600'}`}>
                         <AlertTriangle className="w-5 h-5" />
                       </div>
                       <div>
                         <h4 className="text-sm font-bold">Danger Zone</h4>
                         <p className={`text-xs mt-1 ${theme.subText}`}>
                           Resetting progress clears all learned statuses and spaced repetition history.
                         </p>
                       </div>
                     </div>
                     <button
                       onClick={() => {
                         onResetProgress();
                         setShowSettingsModal(false);
                       }}
                       className={`w-full py-2 font-bold text-xs rounded-lg transition-colors ${isDarkTheme ? 'bg-red-900 text-red-100 border border-red-700 hover:bg-red-800' : 'bg-white border border-red-200 text-red-600 hover:bg-red-50'}`}
                     >
                       Reset All Progress
                     </button>
                   </div>
                )}

                {/* Stats & Insights Preview */}
                <div className={`pt-6 border-t ${theme.border}`}>
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${isDarkTheme ? 'bg-amber-900/40 text-amber-200' : 'bg-amber-50 text-amber-600'}`}>
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">Stats & Insights</h4>
                      <p className={`text-xs mt-1 ${theme.subText}`}>Saved locally and used to show progress over time.</p>
                    </div>
                  </div>
                  <div className={`grid grid-cols-2 gap-2 text-xs ${theme.subText}`}>
                    <div className={`p-3 rounded-lg border ${theme.border} ${theme.cardBg}`}>
                      <div className={`font-bold ${theme.text}`}>Sessions</div>
                      <div>{statsPreview?.totalSessions ?? 0}</div>
                    </div>
                    <div className={`p-3 rounded-lg border ${theme.border} ${theme.cardBg}`}>
                      <div className={`font-bold ${theme.text}`}>Muscles Viewed</div>
                      <div>{statsPreview?.musclesViewed ?? 0}</div>
                    </div>
                    <div className={`p-3 rounded-lg border ${theme.border} ${theme.cardBg}`}>
                      <div className={`font-bold ${theme.text}`}>Flashcards</div>
                      <div>{statsPreview?.flashcardsAnswered ?? 0}</div>
                    </div>
                    <div className={`p-3 rounded-lg border ${theme.border} ${theme.cardBg}`}>
                      <div className={`font-bold ${theme.text}`}>Last Session</div>
                      <div>{statsPreview?.lastSessionAt ? new Date(statsPreview.lastSessionAt).toLocaleString() : '—'}</div>
                    </div>
                  </div>
                </div>

                <div className={`pt-2 sticky bottom-0 ${isDarkTheme ? 'bg-slate-900/80' : 'bg-white/90'} backdrop-blur`}>
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