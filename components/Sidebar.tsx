import React, { useState, useMemo } from 'react';
import { MUSCLE_DATA } from '../constants';
import { MuscleItem } from '../types';
import { Search, ChevronRight, BookOpen, CheckCircle2, Share2, Circle, X, Copy, Check } from 'lucide-react';

interface SidebarProps {
  onSelectMuscle: (muscle: MuscleItem) => void;
  selectedMuscleId: string | null;
  isOpen: boolean;
  onCloseMobile: () => void;
  learnedIds: Set<string>;
  toggleLearned: (id: string) => void;
  getShareLink: () => string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onSelectMuscle, 
  selectedMuscleId, 
  isOpen, 
  onCloseMobile,
  learnedIds,
  toggleLearned,
  getShareLink
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState<'ALL' | 'A' | 'B'>('ALL');
  const [showShareModal, setShowShareModal] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const filteredMuscles = useMemo(() => {
    return MUSCLE_DATA.filter((muscle) => {
      const matchesSearch = muscle.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            muscle.subCategory?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // If searching, ignore group filter (search everything)
      const matchesGroup = searchTerm ? true : (filterGroup === 'ALL' || muscle.group === filterGroup);
      
      return matchesSearch && matchesGroup;
    });
  }, [searchTerm, filterGroup]);

  // Group by subcategory for display
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getShareLink());
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-30 w-80 bg-slate-50 border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 flex flex-col`}>
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
              <BookOpen className="w-4 h-4" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">A&P Muscle Guide</h1>
          </div>

          {/* Progress Tracker */}
          <div className="mb-5 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Progress</span>
              <span className="text-xs font-bold text-brand-600">{learnedIds.size} / {MUSCLE_DATA.length} Learned</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-500 rounded-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <button 
              onClick={() => setShowShareModal(true)}
              className="mt-3 w-full flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 hover:text-brand-600 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow transition-all"
            >
              <Share2 className="w-3 h-3" />
              Save & Share Progress
            </button>
          </div>
          
          {/* Search */}
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

          {/* Filters */}
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
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-6 custom-scrollbar">
          {Object.entries(groupedDisplay).sort().map(([category, muscles]) => (
            <div key={category} className="space-y-1">
              <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
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
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-white text-[10px] text-slate-400 text-center uppercase tracking-wider font-semibold">
          Lab Manual Edition
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-brand-600" />
                <h3 className="font-bold text-slate-900">Save Your Progress</h3>
              </div>
              <button 
                onClick={() => setShowShareModal(false)}
                className="p-1 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <p className="text-sm text-slate-600 leading-relaxed">
                We've generated a unique link that contains all your learned muscles and current selection.
                <br /><br />
                <strong>Copy this link</strong> to save your progress or share it with others. When you open this link later, everything will be exactly as you left it.
              </p>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Your Smart Link</label>
                <div className="flex gap-2">
                  <input 
                    readOnly 
                    value={getShareLink()} 
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-600 font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/20 truncate cursor-text"
                    onClick={(e) => e.currentTarget.select()}
                  />
                  <button 
                    onClick={handleCopyLink}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 min-w-[100px] justify-center ${
                      copyFeedback 
                      ? 'bg-green-600 text-white shadow-inner' 
                      : 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm hover:shadow'
                    }`}
                  >
                    {copyFeedback ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copyFeedback ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;