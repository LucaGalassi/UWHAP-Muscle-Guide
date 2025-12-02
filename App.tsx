import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MuscleView from './components/MuscleView';
import { MuscleItem } from './types';
import { MUSCLE_DATA } from './constants';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleItem>(MUSCLE_DATA[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Progress State
  const [learnedIds, setLearnedIds] = useState<Set<string>>(new Set());

  // Initialize state from URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Restore Learned Progress
    const learnedParam = params.get('learned');
    if (learnedParam) {
      const ids = learnedParam.split(',');
      setLearnedIds(new Set(ids));
    }
    
    // Restore Selected Muscle
    const currentParam = params.get('current');
    if (currentParam) {
      const found = MUSCLE_DATA.find(m => m.id === currentParam);
      if (found) setSelectedMuscle(found);
    }
  }, []);

  const toggleLearned = (id: string) => {
    const newSet = new Set(learnedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setLearnedIds(newSet);
  };

  const getShareLink = () => {
     const params = new URLSearchParams();
     if (learnedIds.size > 0) params.set('learned', Array.from(learnedIds).join(','));
     params.set('current', selectedMuscle.id);
     return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
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
        learnedIds={learnedIds}
        toggleLearned={toggleLearned}
        getShareLink={getShareLink}
      />

      {/* Main Content */}
      <main className="flex-1 relative w-full h-full flex flex-col">
        <MuscleView 
          muscle={selectedMuscle} 
          onSelectMuscle={setSelectedMuscle}
          isLearned={learnedIds.has(selectedMuscle.id)}
          toggleLearned={() => toggleLearned(selectedMuscle.id)}
        />
      </main>
    </div>
  );
};

export default App;