import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MuscleView from './components/MuscleView';
import StudyDashboard from './components/StudyDashboard';
import FlashcardView from './components/StudyModes/FlashcardView';
import QuizView from './components/StudyModes/QuizView';
import SmartGuideView from './components/StudyModes/SmartGuideView';
import { MuscleItem, StudyMode, LearningTool, MuscleProgress } from './types';
import { MUSCLE_DATA } from './constants';
import { Menu, ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleItem>(MUSCLE_DATA[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Navigation State
  const [currentMode, setCurrentMode] = useState<StudyMode>('REFERENCE');
  const [activeTool, setActiveTool] = useState<LearningTool>('NONE');

  // SRS Progress State
  const [progressMap, setProgressMap] = useState<Record<string, MuscleProgress>>({});

  // AI Settings State
  const [apiKey, setApiKey] = useState<string>('');

  // Initialize state from URL params and LocalStorage on mount
  useEffect(() => {
    // 1. Load API Key
    const storedKey = localStorage.getItem('user_gemini_key');
    if (storedKey) setApiKey(storedKey);

    // 2. Load Progress
    const storedProgress = localStorage.getItem('srs_progress');
    if (storedProgress) {
      try {
        setProgressMap(JSON.parse(storedProgress));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }

    // 3. Load URL Params for Sharing
    const params = new URLSearchParams(window.location.search);
    const currentParam = params.get('current');
    if (currentParam) {
      const found = MUSCLE_DATA.find(m => m.id === currentParam);
      if (found) setSelectedMuscle(found);
    }
  }, []);

  // Save Progress whenever it changes
  useEffect(() => {
    localStorage.setItem('srs_progress', JSON.stringify(progressMap));
  }, [progressMap]);

  const handleSetApiKey = (key: string) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem('user_gemini_key', key);
    } else {
      localStorage.removeItem('user_gemini_key');
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
    // If it exists in SRS, toggle between MASTERED and LEARN
    // If not, create a dummy MASTERED entry
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

  const getShareLink = () => {
     const params = new URLSearchParams();
     params.set('current', selectedMuscle.id);
     return `${window.location.protocol}//${window.location.host}${window.location.pathname}?${params.toString()}`;
  };

  const renderMainContent = () => {
    if (currentMode === 'REFERENCE') {
      return (
        <MuscleView 
          muscle={selectedMuscle} 
          onSelectMuscle={setSelectedMuscle}
          isLearned={progressMap[selectedMuscle.id]?.status === 'MASTERED'}
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
        <div className="p-4 border-b border-slate-200 bg-white">
          <button 
            onClick={() => setActiveTool('NONE')}
            className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          {activeTool === 'FLASHCARDS' && (
            <FlashcardView 
              muscle={selectedMuscle} 
              onNext={(correct) => {
                 // Pick random muscle for next card
                 const random = MUSCLE_DATA[Math.floor(Math.random() * MUSCLE_DATA.length)];
                 setSelectedMuscle(random);
              }}
              apiKey={apiKey}
              mode="BROWSE" // Generic mode for manual flashcards
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
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-brand-900 text-white rounded-md shadow-lg"
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
        learnedIds={new Set(Object.values(progressMap).filter(p => p.status === 'MASTERED').map(p => p.muscleId))}
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
      />

      {/* Main Content */}
      <main className="flex-1 relative w-full h-full flex flex-col">
        {renderMainContent()}
      </main>
    </div>
  );
};

export default App;