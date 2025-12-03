import React, { useState } from 'react';
import { Play, Filter, Grid3x3, List } from 'lucide-react';
import { AppTheme } from '../types';
import { THEME_CONFIG } from '../constants';
import { MOTIONS, MotionDefinition } from '../services/animationService';
import AdvancedAnimationViewer from './AdvancedAnimationViewer';

interface AnimationBrowserProps {
  currentTheme: AppTheme;
  onClose: () => void;
}

type ViewType = 'grid' | 'list';

/**
 * AnimationBrowser
 * Standalone component to explore all available animations.
 * Filterable by region, searchable, with grid/list views.
 */
const AnimationBrowser: React.FC<AnimationBrowserProps> = ({ currentTheme, onClose }) => {
  const theme = THEME_CONFIG[currentTheme];
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [selectedMotion, setSelectedMotion] = useState<MotionDefinition | null>(null);

  const allMotions = Object.values(MOTIONS);

  // Filter motions
  const filteredMotions = allMotions.filter(motion => {
    const matchesRegion = regionFilter === 'all' || motion.region === regionFilter;
    const matchesSearch = searchQuery === '' || 
      motion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      motion.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      motion.keywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesRegion && matchesSearch;
  });

  // Group by region for organized display
  const motionsByRegion = filteredMotions.reduce((acc, motion) => {
    if (!acc[motion.region]) acc[motion.region] = [];
    acc[motion.region].push(motion);
    return acc;
  }, {} as Record<string, MotionDefinition[]>);

  const regionLabels: Record<string, string> = {
    upper: 'Upper Body',
    lower: 'Lower Body',
    axial: 'Trunk & Spine',
    hand: 'Hand & Wrist',
    foot: 'Foot & Ankle'
  };

  if (selectedMotion) {
    return (
      <AdvancedAnimationViewer
        muscleName="Animation Browser"
        currentTheme={currentTheme}
        onClose={() => setSelectedMotion(null)}
        browserMode={true}
        initialMotionId={selectedMotion.id}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`w-full max-w-7xl h-[90vh] rounded-2xl border ${theme.border} ${theme.cardBg} shadow-2xl overflow-hidden flex flex-col`}>
        {/* Header */}
        <div className={`px-6 py-4 border-b ${theme.border} bg-gradient-to-r ${theme.accent} text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Animation Library</h2>
              <p className="text-sm opacity-90">
                Browse {allMotions.length} anatomical motions across all body regions and open the resource-only study view
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Controls Bar */}
        <div className={`px-6 py-4 border-b ${theme.border} ${theme.sidebarBg} flex flex-wrap items-center gap-4`}>
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search motions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.inputBg} ${theme.text} placeholder:${theme.subText}`}
            />
          </div>

          {/* Region Filter */}
          <div className="flex items-center gap-2">
            <Filter className={`w-4 h-4 ${theme.subText}`} />
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.inputBg} ${theme.text}`}
            >
              <option value="all">All Regions</option>
              <option value="upper">Upper Body</option>
              <option value="lower">Lower Body</option>
              <option value="axial">Trunk/Spine</option>
              <option value="hand">Hand/Wrist</option>
              <option value="foot">Foot/Ankle</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className={`flex rounded-lg border ${theme.border} overflow-hidden`}>
            <button
              onClick={() => setViewType('grid')}
              className={`px-3 py-2 ${viewType === 'grid' ? 'bg-brand-500 text-white' : `${theme.inputBg} ${theme.text}`}`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewType('list')}
              className={`px-3 py-2 border-l ${theme.border} ${viewType === 'list' ? 'bg-brand-500 text-white' : `${theme.inputBg} ${theme.text}`}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {filteredMotions.length === 0 ? (
            <div className={`text-center py-16 ${theme.subText}`}>
              <p className="text-lg font-semibold mb-2">No motions found</p>
              <p className="text-sm">Try adjusting your search or filter</p>
            </div>
          ) : viewType === 'grid' ? (
            <div className="space-y-8">
              {Object.entries(motionsByRegion).map(([region, motions]) => (
                <div key={region}>
                  <h3 className={`text-lg font-bold ${theme.text} mb-4 flex items-center gap-2`}>
                    <div className={`w-1 h-6 rounded ${theme.accent}`} />
                    {regionLabels[region] || region}
                    <span className={`text-sm ${theme.subText} font-normal`}>
                      ({motions.length})
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {motions.map(motion => (
                      <button
                        key={motion.id}
                        onClick={() => setSelectedMotion(motion)}
                        className={`group p-4 rounded-xl border ${theme.border} ${theme.cardBg} hover:border-brand-500 hover:shadow-lg transition-all text-left`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className={`font-bold ${theme.text} group-hover:text-brand-600 transition-colors`}>
                            {motion.displayName}
                          </h4>
                          <Play className="w-5 h-5 text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className={`text-sm ${theme.subText} line-clamp-2 mb-3`}>
                          {motion.description}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className={`px-2 py-1 rounded ${theme.badge} font-mono`}>
                            {motion.joint.minDeg}° to {motion.joint.maxDeg}°
                          </span>
                          <span className={theme.subText}>
                            {motion.joint.axis || 'Multi-axis'}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-semibold">
                          <span className={`px-2 py-1 rounded-full border ${theme.border} ${theme.subText}`}>
                            {regionLabels[motion.region] || motion.region}
                          </span>
                          <span className={`px-2 py-1 rounded-full border ${theme.border} ${theme.subText}`}>
                            {motion.joint.name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(motionsByRegion).map(([region, motions]) => (
                <div key={region}>
                  <h3 className={`text-lg font-bold ${theme.text} mb-3 flex items-center gap-2`}>
                    <div className={`w-1 h-6 rounded ${theme.accent}`} />
                    {regionLabels[region] || region}
                    <span className={`text-sm ${theme.subText} font-normal`}>
                      ({motions.length})
                    </span>
                  </h3>
                  <div className="space-y-2">
                    {motions.map(motion => (
                      <button
                        key={motion.id}
                        onClick={() => setSelectedMotion(motion)}
                        className={`group w-full p-4 rounded-lg border ${theme.border} ${theme.cardBg} hover:border-brand-500 transition-all text-left flex items-center gap-4`}
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-brand-500 to-blue-600 flex items-center justify-center">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-bold ${theme.text} group-hover:text-brand-600 transition-colors mb-1`}>
                            {motion.displayName}
                          </h4>
                          <p className={`text-sm ${theme.subText} line-clamp-1`}>
                            {motion.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0 flex flex-col items-end gap-2">
                          <span className={`px-3 py-1 rounded-full ${theme.badge} font-mono text-xs`}>
                            {motion.joint.minDeg}° to {motion.joint.maxDeg}°
                          </span>
                          <span className={`text-xs ${theme.subText}`}>
                            {motion.joint.name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className={`px-6 py-3 border-t ${theme.border} ${theme.sidebarBg} flex items-center justify-between text-sm ${theme.subText}`}>
          <span>
            Showing {filteredMotions.length} of {allMotions.length} motions
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Resource-focused study tools
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnimationBrowser;
