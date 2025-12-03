import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MuscleView from './components/MuscleView';
import StudyDashboard from './components/StudyDashboard';
import FlashcardView from './components/StudyModes/FlashcardView';
import QuizView from './components/StudyModes/QuizView';
import SmartGuideView from './components/StudyModes/SmartGuideView';
import WelcomeModal from './components/WelcomeModal';
import { MuscleItem, StudyMode, LearningTool, MuscleProgress, AppTheme } from './types';
import { MUSCLE_DATA, THEME_CONFIG } from './constants';
import { Menu, ArrowLeft, AlertTriangle, Timer } from 'lucide-react';

// Compression Helpers
const STATUS_MAP = ['NEW', 'LEARNING', 'REVIEW', 'MASTERED'];

const compressProgress = (map: Record<string, MuscleProgress>): string => {
  const minified = Object.values(map).map(p => {
    // Validate progress data before compression
    if (!p || !p.muscleId) {
      console.warn('Skipping invalid progress entry:', p);
      return null;
    }
    
    const muscleIndex = MUSCLE_DATA.findIndex(m => m.id === p.muscleId);
    if (muscleIndex === -1) {
      console.warn('Muscle not found in data:', p.muscleId);
      return null;
    }
    
    const statusIdx = STATUS_MAP.indexOf(p.status);
    if (statusIdx === -1) {
      console.warn('Invalid status:', p.status);
      return null;
    }
    
    // Schema: [index, status, interval, ease, due_mins, last_mins, streak]
    return [
      muscleIndex,
      statusIdx,
      Math.max(0, p.interval || 0),
      Math.max(1.3, Math.round((p.easeFactor || 2.5) * 100) / 100), // Round ease to 2 decimals
      Math.floor((p.dueDate || Date.now()) / 60000), // Store minutes to save space
      Math.floor((p.lastReviewed || Date.now()) / 60000), // Store minutes to save space
      Math.max(0, p.streak || 0)
    ];
  }).filter(Boolean);
  
  // Convert to JSON string then Base64
  try {
    return btoa(JSON.stringify(minified));
  } catch (e) {
    console.error('Failed to compress progress:', e);
    return '';
  }
};

const decompressProgress = (encoded: string): Record<string, MuscleProgress> => {
  try {
    const json = atob(encoded);
    const parsed = JSON.parse(json);
    
    // Check if legacy format (standard object map) or new format (array of arrays)
    if (!Array.isArray(parsed)) {
      // Validate legacy format has expected structure
      if (typeof parsed === 'object' && parsed !== null) {
        return parsed;
      }
      throw new Error('Invalid legacy format');
    }

    const map: Record<string, MuscleProgress> = {};
    parsed.forEach((item: any) => {
      // Validate array structure
      if (!Array.isArray(item) || item.length !== 7) {
        console.warn('Skipping invalid progress item:', item);
        return;
      }
      
      const [mIdx, sIdx, interval, ease, due, last, streak] = item;
      
      // Validate indices and values
      if (typeof mIdx !== 'number' || mIdx < 0 || mIdx >= MUSCLE_DATA.length) {
        console.warn('Invalid muscle index:', mIdx);
        return;
      }
      
      const muscle = MUSCLE_DATA[mIdx];
      if (muscle) {
        map[muscle.id] = {
          muscleId: muscle.id,
          status: (STATUS_MAP[sIdx] || 'NEW') as any,
          interval: Math.max(0, interval),
          easeFactor: Math.max(1.3, ease),
          dueDate: due * 60000, // Convert back to ms
          lastReviewed: last * 60000,
          streak: Math.max(0, streak)
        };
      }
    });
    return map;
  } catch (e) {
    console.error("Failed to decompress progress, returning empty state", e);
    return {};
  }
};

const App: React.FC = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleItem>(MUSCLE_DATA[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [studentName, setStudentName] = useState<string>('');
  
  // Navigation State
  const [currentMode, setCurrentMode] = useState<StudyMode>('REFERENCE');
  const [activeTool, setActiveTool] = useState<LearningTool>('NONE');

  // SRS Progress State
  const [progressMap, setProgressMap] = useState<Record<string, MuscleProgress>>({});

  // AI Settings State
  const [apiKey, setApiKey] = useState<string>('');

  // Global Theme State
  const [theme, setTheme] = useState<AppTheme>('modern');

  // Welcome Modal State
  const [showWelcome, setShowWelcome] = useState(true);

  // Exam Date Logic
  const EXAM_DATE = new Date('2025-12-08T09:00:00'); // Exam Date
  const [daysUntilExam, setDaysUntilExam] = useState(0);

  useEffect(() => {
    const now = new Date();
    const diff = EXAM_DATE.getTime() - now.getTime();
    setDaysUntilExam(Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, []);

  const parseUrlParams = (search: string) => {
    const params = new URLSearchParams(search);
    
    // Muscle
    const currentParam = params.get('current');
    if (currentParam) {
      const found = MUSCLE_DATA.find(m => m.id === currentParam);
      if (found) setSelectedMuscle(found);
    }

    // Name
    const nameParam = params.get('name');
    if (nameParam) {
      setStudentName(decodeURIComponent(nameParam));
    }
    
    // Progress
    const sharedProgress = params.get('p');
    if (sharedProgress) {
      try {
        const parsedShared = decompressProgress(sharedProgress);
        if (Object.keys(parsedShared).length > 0) {
          setProgressMap(parsedShared);
          try {
            localStorage.setItem('srs_progress', JSON.stringify(parsedShared));
          } catch (storageError) {
            console.error('Failed to save shared progress to localStorage', storageError);
          }
        } else {
          console.warn('Decompressed progress was empty');
        }
      } catch (e) {
        console.error("Failed to parse shared progress", e);
      }
    }

    // Theme
    const themeParam = params.get('theme');
    if (themeParam && THEME_CONFIG[themeParam as AppTheme]) {
      setTheme(themeParam as AppTheme);
    }

    // Hide welcome if we have data or explicit action
    if (currentParam || sharedProgress || nameParam) {
      setShowWelcome(false);
    }
  };

  // Initialize state from URL params and LocalStorage on mount
  useEffect(() => {
    // 1. Load API Key
    try {
      const storedKey = localStorage.getItem('user_gemini_key');
      if (storedKey) setApiKey(storedKey);
    } catch (e) {
      console.error('Failed to load API key from localStorage', e);
    }

    // 2. Load Progress from LocalStorage (but allow URL to override)
    let hasUrlProgress = false;
    if (window.location.search) {
      const params = new URLSearchParams(window.location.search);
      hasUrlProgress = params.has('p');
    }
    
    if (!hasUrlProgress) {
      try {
        const storedProgress = localStorage.getItem('srs_progress');
        if (storedProgress) {
          setProgressMap(JSON.parse(storedProgress));
        }
      } catch (e) {
        console.error("Failed to parse local progress", e);
      }
    }

    // 3. Load Theme
    try {
      const storedTheme = localStorage.getItem('app_theme');
      if (storedTheme && THEME_CONFIG[storedTheme as AppTheme]) {
         setTheme(storedTheme as AppTheme);
      }
    } catch (e) {
      console.error('Failed to load theme from localStorage', e);
    }

    // 4. Load URL Params (Overrides local)
    if (window.location.search) {
      parseUrlParams(window.location.search);
    }
  }, []);

  // Save Progress whenever it changes
  useEffect(() => {
    if (Object.keys(progressMap).length > 0) {
      try {
        localStorage.setItem('srs_progress', JSON.stringify(progressMap));
      } catch (e) {
        console.error('Failed to save progress to localStorage', e);
        // Could show user notification here in production
      }
    }
  }, [progressMap]);

  // Save Theme whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('app_theme', theme);
    } catch (e) {
      console.error('Failed to save theme to localStorage', e);
    }
  }, [theme]);

  const handleSetApiKey = (key: string) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem('user_gemini_key', key);
    } else {
      localStorage.removeItem('user_gemini_key');
    }
  };
  
  const handleResetProgress = () => {
    if (confirm("Are you sure you want to reset all study progress? This cannot be undone.")) {
      setProgressMap({});
      localStorage.removeItem('srs_progress');
    }
  };

  const handleResumeFromLink = (url: string) => {
     try {
       const urlObj = new URL(url);
       parseUrlParams(urlObj.search);
     } catch (e) {
       console.error("Invalid URL");
       throw e;
     }
  };

  const updateMuscleProgress = (progress: MuscleProgress) => {
    setProgressMap(prev => ({
      ...prev,
      [progress.muscleId]: progress
    }));
  };

  // Helper for Reference Mode toggle (Simple "Learned" checkbox)
  const toggleLearnedSimple = (id: string) => {
    setProgressMap(prev => {
      const current = prev[id];
      const next = { ...prev };
      
      if (current && current.status === 'MASTERED') {
         delete next[id]; // Remove from learned
      } else {
         next[id] = {
           muscleId: id,
           status: 'MASTERED',
           interval: 100, // Arbitrary long time
           easeFactor: 2.5,
           dueDate: Date.now() + 10000000,
           lastReviewed: Date.now(),
           streak: 10
         };
      }
      return next;
    });
  };

  const getShareLink = (name: string) => {
     const params = new URLSearchParams();
     params.set('current', selectedMuscle.id);
     if (name) params.set('name', encodeURIComponent(name));
     params.set('theme', theme);
     
     // Encode progress map using compression
     if (Object.keys(progressMap).length > 0) {
       try {
         const encoded = compressProgress(progressMap);
         if (encoded) {
           params.set('p', encoded);
         } else {
           console.warn('Failed to encode progress - link will not include progress data');
         }
       } catch (e) {
         console.error("Failed to encode progress", e);
       }
     }
     
     return `${window.location.protocol}//${window.location.host}${window.location.pathname}?${params.toString()}`;
  };

  const currentThemeConfig = THEME_CONFIG[theme];

  const renderMainContent = () => {
    if (currentMode === 'REFERENCE') {
      return (
        <MuscleView 
          muscle={selectedMuscle} 
          onSelectMuscle={setSelectedMuscle}
          isLearned={(progressMap[selectedMuscle.id] as MuscleProgress | undefined)?.status === 'MASTERED'}
          toggleLearned={() => toggleLearnedSimple(selectedMuscle.id)}
          apiKey={apiKey}
        />
      );
    }

    // STUDY MODE
    if (activeTool === 'NONE') {
      return (
        <StudyDashboard 
          onSelectTool={setActiveTool} 
          learnedCount={Object.values(progressMap).filter(p => p.status === 'MASTERED').length} 
          totalCount={MUSCLE_DATA.length} 
        />
      );
    }

    // Wrapped tools with back button
    return (
      <div className="flex flex-col h-full">
        <div className={`p-4 border-b ${currentThemeConfig.border} ${currentThemeConfig.cardBg} flex items-center justify-between`}>
          <button 
            onClick={() => setActiveTool('NONE')}
            className={`flex items-center gap-2 text-sm font-bold hover:opacity-80 ${currentThemeConfig.text}`}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <div className={`text-xs font-bold uppercase tracking-wider ${currentThemeConfig.subText}`}>
            {activeTool.replace('_', ' ')} MODE
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          {activeTool === 'FLASHCARDS' && (
            <FlashcardView 
              muscle={selectedMuscle} 
              onNext={(correct) => {
                 const random = MUSCLE_DATA[Math.floor(Math.random() * MUSCLE_DATA.length)];
                 setSelectedMuscle(random);
              }}
              apiKey={apiKey}
              mode="BROWSE"
              currentTheme={theme}
            />
          )}
          {activeTool === 'QUIZ' && <QuizView />}
          {activeTool === 'SMART_GUIDE' && (
            <SmartGuideView 
              progressMap={progressMap}
              onUpdateProgress={updateMuscleProgress}
              apiKey={apiKey}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col h-screen overflow-hidden transition-colors duration-500 ${currentThemeConfig.appBg}`}>
      
      {/* Welcome Modal */}
      {showWelcome && (
        <WelcomeModal 
          onDismiss={() => setShowWelcome(false)}
          onResume={handleResumeFromLink}
          daysUntilExam={daysUntilExam}
          currentTheme={theme}
        />
      )}

      {/* EXAM COUNTDOWN BANNER */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-4 py-3 flex items-center justify-between shadow-md z-40 relative">
        <div className="flex items-center gap-4">
          <div className="bg-red-500/20 p-2 rounded-lg border border-red-500/50 animate-pulse">
            <Timer className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Final Exam Countdown</div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
               Monday, Dec 8 <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span> <span className="text-red-300">{daysUntilExam} Days Remaining</span>
            </div>
          </div>
        </div>
        
        {studentName && (
           <div className="hidden md:block text-sm font-medium text-slate-300 bg-slate-700/50 px-3 py-1 rounded-full border border-slate-600">
             Welcome back, <span className="text-white font-bold">{studentName}</span>
           </div>
        )}

        <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-900 bg-yellow-400 px-3 py-1.5 rounded-full shadow-lg shadow-yellow-500/20">
          <AlertTriangle className="w-3.5 h-3.5" />
          Focus: Group A
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden fixed top-24 left-4 z-40 p-2 bg-brand-600 text-white rounded-md shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-30 bg-black/50 md:hidden backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar Navigation */}
        <Sidebar 
          onSelectMuscle={setSelectedMuscle}
          selectedMuscleId={selectedMuscle.id}
          isOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          learnedIds={new Set((Object.values(progressMap) as MuscleProgress[]).filter(p => p.status === 'MASTERED').map(p => p.muscleId))}
          toggleLearned={toggleLearnedSimple}
          getShareLink={getShareLink}
          currentMode={currentMode}
          onSetMode={(m) => {
            setCurrentMode(m);
            setActiveTool('NONE');
          }}
          apiKey={apiKey}
          onSetApiKey={handleSetApiKey}
          progressMap={progressMap}
          onResetProgress={handleResetProgress}
          currentTheme={theme}
          onSetTheme={setTheme}
        />

        {/* Main Content */}
        <main className="flex-1 relative w-full h-full flex flex-col">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default App;