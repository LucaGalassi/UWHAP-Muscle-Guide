import React, { useEffect, useMemo, useState } from 'react';
import {
  X,
  Search,
  Sparkles,
  Info,
  MapPin,
  Activity,
  ExternalLink,
  BookOpen,
  Filter,
  PlayCircle,
  Brain,
  RotateCcw,
} from 'lucide-react';
import { AppTheme } from '../types';
import { THEME_CONFIG } from '../constants';
import {
  MotionDefinition,
  MOTIONS,
  getMotionsForMuscle,
  getLearningTipsForMotion,
  getClinicalRelevanceForMotion,
  getCommonErrorsForMotion,
  getAntagonistMotion,
  getHighlightedNodesForMotion,
} from '../services/animationService';

interface AdvancedAnimationViewerProps {
  muscleName: string;
  muscleId?: string;
  currentTheme: AppTheme;
  onClose: () => void;
  actionString?: string;
  demonstrationText?: string;
  originString?: string;
  insertionString?: string;
  browserMode?: boolean;
  initialMotionId?: string;
}

const AdvancedAnimationViewer: React.FC<AdvancedAnimationViewerProps> = ({
  muscleName,
  muscleId,
  currentTheme,
  onClose,
  actionString,
  demonstrationText,
  originString,
  insertionString,
  browserMode = false,
  initialMotionId,
}) => {
  const theme = THEME_CONFIG[currentTheme];

  const availableMotions = useMemo(() => {
    if (browserMode || !muscleId) {
      return Object.values(MOTIONS);
    }
    const motions = getMotionsForMuscle(muscleId);
    return motions.length > 0 ? motions : Object.values(MOTIONS).slice(0, 8);
  }, [browserMode, muscleId]);

  const [selectedMotion, setSelectedMotion] = useState<MotionDefinition>(
    () => availableMotions[0] ?? Object.values(MOTIONS)[0]
  );
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'actions' | 'guides'>('actions');

  useEffect(() => {
    if (!initialMotionId) return;
    const fromBrowser = availableMotions.find((m) => m.id === initialMotionId);
    if (fromBrowser) setSelectedMotion(fromBrowser);
  }, [initialMotionId, availableMotions]);

  useEffect(() => {
    if (!selectedMotion || !availableMotions.some((m) => m.id === selectedMotion.id)) {
      setSelectedMotion(availableMotions[0] ?? Object.values(MOTIONS)[0]);
    }
  }, [availableMotions, selectedMotion]);

  const filteredMotions = useMemo(() => {
    return availableMotions.filter((motion) => {
      const matchesRegion = regionFilter === 'all' || motion.region === regionFilter;
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        term.length === 0 ||
        motion.displayName.toLowerCase().includes(term) ||
        motion.description.toLowerCase().includes(term) ||
        motion.keywords.some((kw) => kw.toLowerCase().includes(term));
      return matchesRegion && matchesSearch;
    });
  }, [availableMotions, regionFilter, searchTerm]);

  const overlayBg =
    currentTheme === 'midnight' || currentTheme === 'blueprint'
      ? 'bg-slate-950/85'
      : currentTheme === 'nature'
        ? 'bg-emerald-950/10'
        : 'bg-slate-900/60';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayBg} backdrop-blur-sm`}
    >
      <div
        className={`w-full max-w-6xl h-[90vh] rounded-2xl border ${theme.border} ${theme.cardBg} shadow-2xl overflow-hidden flex flex-col`}
      >
        <div className={`px-5 py-4 border-b ${theme.border} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-brand-500" />
            <div>
              <h3 className={`font-bold ${theme.text} text-lg`}>
                {browserMode ? 'Animation Library' : `${muscleName} — Study View`}
              </h3>
              <p className={`text-xs ${theme.subText}`}>
                Curated learning resources and motion context (no 3D viewer required)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${theme.inputBg} ${theme.subText} hover:bg-opacity-80 transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-[320px_1fr]">
          <aside className={`border-r ${theme.border} ${theme.sidebarBg} flex flex-col overflow-hidden`}>
            <div className="p-4 space-y-4 flex-shrink-0 border-b border-dashed border-current/10">
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-wider ${theme.subText} flex items-center gap-2`}>
                  <Search className="w-3 h-3" />
                  Find a motion
                </label>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or keywords"
                  className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.inputBg} ${theme.text} text-sm`}
                />
              </div>

              {browserMode && (
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme.subText} flex items-center gap-2`}>
                    <Filter className="w-3 h-3" />
                    Region filter
                  </label>
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.inputBg} ${theme.text} text-sm`}
                  >
                    <option value="all">All Regions</option>
                    <option value="upper">Upper Body</option>
                    <option value="lower">Lower Body</option>
                    <option value="axial">Trunk/Spine</option>
                    <option value="hand">Hand/Wrist</option>
                    <option value="foot">Foot/Ankle</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar min-h-0">
              <div className="flex items-center justify-between mb-1">
                <p className={`text-xs uppercase tracking-wider ${theme.subText}`}>
                  Motions ({filteredMotions.length})
                </p>
              </div>

              <div className="space-y-2">
                {filteredMotions.map((motion) => (
                  <button
                    key={motion.id}
                    onClick={() => setSelectedMotion(motion)}
                    className={`w-full text-left px-3 py-2 rounded-lg border ${theme.border} transition-all overflow-hidden ${
                      selectedMotion.id === motion.id
                        ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                        : `${theme.cardBg} ${theme.text} hover:border-brand-300`
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm break-words flex-1">{motion.displayName}</span>
                      <span className="text-[10px] opacity-80 flex-shrink-0">
                        {motion.joint.minDeg}°–{motion.joint.maxDeg}°
                      </span>
                    </div>
                    <div className={`text-[11px] break-words ${selectedMotion.id === motion.id ? 'text-white/90' : theme.subText}`}>
                      {motion.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className={`p-4 border-t ${theme.border} ${theme.cardBg}`}>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-brand-500" />
                <p className={`text-sm font-semibold ${theme.text}`}>Quick facts</p>
              </div>
              <div className={`grid grid-cols-2 gap-2 text-xs ${theme.subText}`}>
                <div className="rounded-lg px-3 py-2 border border-dashed border-current/20">
                  <p className="font-semibold text-[11px] text-brand-600">Range</p>
                  <p className={theme.text}>
                    {selectedMotion.joint.minDeg}° to {selectedMotion.joint.maxDeg}°
                  </p>
                </div>
                <div className="rounded-lg px-3 py-2 border border-dashed border-current/20">
                  <p className="font-semibold text-[11px] text-brand-600">Joint</p>
                  <p className={theme.text}>{selectedMotion.joint.name}</p>
                </div>
                <div className="rounded-lg px-3 py-2 border border-dashed border-current/20">
                  <p className="font-semibold text-[11px] text-brand-600">Region</p>
                  <p className={theme.text}>{selectedMotion.region}</p>
                </div>
                <div className="rounded-lg px-3 py-2 border border-dashed border-current/20">
                  <p className="font-semibold text-[11px] text-brand-600">Type</p>
                  <p className={theme.text}>{selectedMotion.displayName.split(' ').pop()}</p>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar min-h-0">
            {/* Tab Navigation */}
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setActiveTab('actions')}
                aria-label="Tab 1: Muscle Actions - GIF search and study requirements"
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  activeTab === 'actions'
                    ? 'bg-brand-500 text-white shadow-lg'
                    : `${theme.cardBg} ${theme.text} border ${theme.border} hover:border-brand-400`
                }`}
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 font-bold" aria-hidden="true">1</span>
                Muscle Actions
              </button>
              <button
                onClick={() => setActiveTab('guides')}
                aria-label="Tab 2: Study Guides - Learning aids and resources"
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  activeTab === 'guides'
                    ? 'bg-brand-500 text-white shadow-lg'
                    : `${theme.cardBg} ${theme.text} border ${theme.border} hover:border-brand-400`
                }`}
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 font-bold" aria-hidden="true">2</span>
                Study Guides
              </button>
            </div>

            {/* Selected Motion Info (Always visible) */}
            <section className={`rounded-xl border ${theme.border} ${theme.cardBg} p-4 shadow-sm overflow-hidden`}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <p className={`text-xs uppercase tracking-wider ${theme.subText} flex items-center gap-2`}>
                    <Activity className="w-4 h-4" />
                    Selected Motion
                  </p>
                  <h2 className={`text-xl font-bold ${theme.text} break-words`}>{selectedMotion.displayName}</h2>
                  <p className={`${theme.subText} mt-1 break-words`}>{selectedMotion.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold">
                    <span className={`px-2 py-1 rounded-full border ${theme.border} ${theme.subText} break-words`}>
                      {selectedMotion.joint.name}
                    </span>
                    <span className={`px-2 py-1 rounded-full border ${theme.border} ${theme.subText}`}>
                      {selectedMotion.region}
                    </span>
                    <span className={`px-2 py-1 rounded-full border ${theme.border} ${theme.subText}`}>
                      {selectedMotion.joint.minDeg}° – {selectedMotion.joint.maxDeg}°
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Tab 1: Muscle Actions - GIF Search focused */}
            {activeTab === 'actions' && (
              <>
                {/* Study Requirements (Priority) */}
                {!browserMode && (actionString || demonstrationText) && (
                  <section className={`p-5 rounded-xl border-2 ${theme.border} ${theme.cardBg} space-y-4`}>
                    <div className="flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-500" />
                      <p className={`text-base font-bold ${theme.text}`}>Study Requirements</p>
                    </div>
                    {actionString && (
                      <div className={`p-4 rounded-lg border ${theme.border} ${theme.infoBox} overflow-hidden`}>
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Required Actions</p>
                        <p className={`text-sm leading-relaxed ${theme.text} break-words`}>{actionString}</p>
                      </div>
                    )}
                    {demonstrationText && (
                      <div className={`p-4 rounded-lg border ${theme.border} ${theme.infoBox} overflow-hidden`}>
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Demonstration</p>
                        <p className={`text-sm leading-relaxed ${theme.text} break-words`}>{demonstrationText}</p>
                      </div>
                    )}
                  </section>
                )}

                {/* Animation & Video Search Section */}
                <section className={`rounded-xl border ${theme.border} ${theme.cardBg} p-5 shadow-sm`}>
                  <div className="flex items-center gap-2 mb-4">
                    <PlayCircle className="w-5 h-5 text-brand-500" />
                    <p className={`text-base font-bold ${theme.text}`}>Find Animations</p>
                  </div>
                  
                  {/* Motion Search Buttons */}
                  <div className="space-y-3">
                    {/* Google GIF Search */}
                    <div className={`p-3 rounded-lg border ${theme.border} ${theme.infoBox}`}>
                      <p className={`text-[11px] uppercase tracking-wider ${theme.subText} mb-2`}>Google GIF Search</p>
                      <div className={`grid gap-2 ${browserMode ? 'grid-cols-2' : 'grid-cols-3'}`}>
                        {!browserMode && (
                          <button
                            onClick={() =>
                              window.open(
                                `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${muscleName} muscle action animation gif`)}`,
                                '_blank'
                              )
                            }
                            className={`px-3 py-2.5 rounded-lg border ${theme.border} ${theme.cardBg} text-xs font-medium hover:border-brand-400 hover:bg-brand-50/50 transition-colors flex flex-col items-center justify-center gap-1.5 ${theme.text}`}
                          >
                            <Search className="w-4 h-4 text-brand-500 flex-shrink-0" />
                            <span className="truncate text-center">Muscle GIF</span>
                          </button>
                        )}
                        <button
                          onClick={() =>
                            window.open(
                              `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${selectedMotion.displayName} movement anatomy gif`)}`,
                              '_blank'
                            )
                          }
                          className={`px-3 py-2.5 rounded-lg border ${theme.border} ${theme.cardBg} text-xs font-medium hover:border-brand-400 hover:bg-brand-50/50 transition-colors flex flex-col items-center justify-center gap-1.5 ${theme.text}`}
                        >
                          <PlayCircle className="w-4 h-4 text-brand-500 flex-shrink-0" />
                          <span className="truncate text-center">Motion GIF</span>
                        </button>
                        <button
                          onClick={() =>
                            window.open(
                              `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${selectedMotion.joint.name} joint movements gif`)}`,
                              '_blank'
                            )
                          }
                          className={`px-3 py-2.5 rounded-lg border ${theme.border} ${theme.cardBg} text-xs font-medium hover:border-brand-400 hover:bg-brand-50/50 transition-colors flex flex-col items-center justify-center gap-1.5 ${theme.text}`}
                        >
                          <Activity className="w-4 h-4 text-brand-500 flex-shrink-0" />
                          <span className="truncate text-center">Joint GIF</span>
                        </button>
                      </div>
                    </div>

                    {/* YouTube Animation Search */}
                    <div className={`p-3 rounded-lg border ${theme.border} ${theme.infoBox}`}>
                      <p className={`text-[11px] uppercase tracking-wider ${theme.subText} mb-2`}>YouTube Animation Search</p>
                      <div className={`grid gap-2 ${browserMode ? 'grid-cols-2' : 'grid-cols-3'}`}>
                        {!browserMode && (
                          <button
                            onClick={() =>
                              window.open(
                                `https://www.youtube.com/results?search_query=${encodeURIComponent(`${muscleName} muscle anatomy animation`)}`,
                                '_blank'
                              )
                            }
                            className={`px-3 py-2.5 rounded-lg border ${theme.border} ${theme.cardBg} text-xs font-medium hover:border-red-400 hover:bg-red-50/50 transition-colors flex flex-col items-center justify-center gap-1.5 ${theme.text}`}
                          >
                            <ExternalLink className="w-4 h-4 text-red-500 flex-shrink-0" />
                            <span className="truncate text-center">Muscle Video</span>
                          </button>
                        )}
                        <button
                          onClick={() =>
                            window.open(
                              `https://www.youtube.com/results?search_query=${encodeURIComponent(`${selectedMotion.displayName} motion demonstration`)}`,
                              '_blank'
                            )
                          }
                          className={`px-3 py-2.5 rounded-lg border ${theme.border} ${theme.cardBg} text-xs font-medium hover:border-red-400 hover:bg-red-50/50 transition-colors flex flex-col items-center justify-center gap-1.5 ${theme.text}`}
                        >
                          <PlayCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <span className="truncate text-center">Motion Video</span>
                        </button>
                        <button
                          onClick={() =>
                            window.open(
                              `https://www.youtube.com/results?search_query=${encodeURIComponent(`${selectedMotion.joint.name} joint movements anatomy`)}`,
                              '_blank'
                            )
                          }
                          className={`px-3 py-2.5 rounded-lg border ${theme.border} ${theme.cardBg} text-xs font-medium hover:border-red-400 hover:bg-red-50/50 transition-colors flex flex-col items-center justify-center gap-1.5 ${theme.text}`}
                        >
                          <Activity className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <span className="truncate text-center">Joint Video</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Anatomy Images Section */}
                <section className="grid md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${theme.border} ${theme.infoBox} overflow-hidden`}>
                    <p className={`text-xs uppercase tracking-wider ${theme.subText} flex items-center gap-2 mb-3`}>
                      <MapPin className="w-4 h-4" />
                      Anatomy Images
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          window.open(
                            `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
                            `${muscleName} muscle origin anatomy diagram`
                          )}`,
                          '_blank'
                        )
                      }
                        className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.cardBg} text-xs font-medium hover:border-emerald-400 transition-colors ${theme.text} overflow-hidden`}
                      >
                        <span className="text-blue-600 font-semibold truncate">Origin</span>
                      </button>
                      <button
                        onClick={() =>
                          window.open(
                            `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
                            `${muscleName} muscle insertion anatomy diagram`
                          )}`,
                          '_blank'
                        )
                      }
                        className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.cardBg} text-xs font-medium hover:border-rose-400 transition-colors ${theme.text} overflow-hidden`}
                      >
                        <span className="text-rose-600 font-semibold truncate">Insertion</span>
                      </button>
                      <button
                        onClick={() =>
                          window.open(
                            `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
                              `${muscleName} muscle anatomy labeled diagram`
                            )}`,
                            '_blank'
                          )
                        }
                        className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.cardBg} text-xs font-medium hover:border-brand-400 transition-colors ${theme.text} overflow-hidden`}
                      >
                        <span className="truncate">Labeled diagram</span>
                      </button>
                    </div>
                  </div>

                  {/* Origin & Insertion Text */}
                  {(originString || insertionString) && (
                    <div className={`p-4 rounded-xl border ${theme.border} ${theme.cardBg} space-y-3`}>
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4 text-emerald-500" />
                        <p className={`text-sm font-semibold ${theme.text}`}>Origin & Insertion</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        {originString && (
                          <div className={`p-3 rounded-lg border ${theme.border} ${theme.infoBox} overflow-hidden`}>
                            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Origin</p>
                            <p className={`${theme.text} text-blue-600 break-words`}>{originString}</p>
                          </div>
                        )}
                        {insertionString && (
                          <div className={`p-3 rounded-lg border ${theme.border} ${theme.infoBox} overflow-hidden`}>
                            <p className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-1">Insertion</p>
                            <p className={`${theme.text} text-rose-600 break-words`}>{insertionString}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </section>
              </>
            )}

            {/* Tab 2: Study Guides - Learning aids and resources */}
            {activeTab === 'guides' && (
              <>
                {/* Learning Aids Section */}
                <section className={`p-4 rounded-xl border ${theme.border} ${theme.cardBg} space-y-4`}>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-brand-500" />
                    <p className={`text-sm font-semibold ${theme.text}`}>Learning Aids</p>
                  </div>
                  {getLearningTipsForMotion(selectedMotion.id).length > 0 && (
                    <div className={`p-3 rounded-lg ${theme.infoBox} overflow-hidden`}>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 mb-2">
                        Key Points
                      </p>
                      <ul className={`text-sm ${theme.text} space-y-1`}>
                        {getLearningTipsForMotion(selectedMotion.id).map((tip, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-emerald-500 flex-shrink-0">•</span>
                            <span className="break-words">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {getClinicalRelevanceForMotion(selectedMotion.id) && (
                    <div className={`p-3 rounded-lg ${currentTheme === 'midnight' || currentTheme === 'blueprint' ? 'bg-blue-900/30' : 'bg-blue-50'} border border-blue-400/30 overflow-hidden`}>
                      <p className={`text-[11px] font-bold uppercase tracking-wider ${currentTheme === 'midnight' || currentTheme === 'blueprint' ? 'text-blue-300' : 'text-blue-600'} mb-1`}>Clinical Relevance</p>
                      <p className={`text-sm ${theme.text} break-words`}>{getClinicalRelevanceForMotion(selectedMotion.id)}</p>
                    </div>
                  )}

                  {getCommonErrorsForMotion(selectedMotion.id).length > 0 && (
                    <div className={`p-3 rounded-lg ${currentTheme === 'midnight' || currentTheme === 'blueprint' ? 'bg-amber-900/30' : 'bg-amber-50'} border border-amber-400/30 overflow-hidden`}>
                      <p className={`text-[11px] font-bold uppercase tracking-wider ${currentTheme === 'midnight' || currentTheme === 'blueprint' ? 'text-amber-300' : 'text-amber-600'} mb-1`}>Common Mistakes</p>
                      <ul className={`text-sm ${theme.text} space-y-1`}>
                        {getCommonErrorsForMotion(selectedMotion.id).map((error, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-amber-500 flex-shrink-0">✗</span>
                            <span className="break-words">{error}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {getAntagonistMotion(selectedMotion.id) && (
                    <button
                      onClick={() => {
                        const antagonist = getAntagonistMotion(selectedMotion.id);
                        if (antagonist) setSelectedMotion(antagonist);
                      }}
                      className={`w-full px-3 py-2 rounded-lg border ${theme.border} ${theme.cardBg} text-sm font-semibold hover:border-purple-400 transition-colors flex items-center justify-center gap-2 ${theme.text}`}
                    >
                      <RotateCcw className="w-4 h-4" />
                      View Antagonist: {getAntagonistMotion(selectedMotion.id)?.displayName}
                    </button>
                  )}

                  {getHighlightedNodesForMotion(selectedMotion.id).length > 0 && (
                    <div className={`p-3 rounded-lg ${theme.infoBox}`}>
                      <p className={`text-[11px] font-bold uppercase tracking-wider ${theme.subText} mb-1`}>
                        Key Muscles Involved
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {getHighlightedNodesForMotion(selectedMotion.id)
                          .slice(0, 8)
                          .map((muscle, i) => (
                            <span
                              key={i}
                              className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
                                currentTheme === 'midnight' || currentTheme === 'blueprint'
                                  ? 'bg-purple-900/50 text-purple-200'
                                  : 'bg-purple-100 text-purple-700'
                              }`}
                            >
                              {muscle.replace(/\.r$/, '').replace(/ muscle/i, '')}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </section>

                {/* General Resources Section */}
                <section className={`p-4 rounded-xl border ${theme.border} ${theme.cardBg}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <ExternalLink className="w-4 h-4 text-brand-500" />
                    <p className={`text-sm font-semibold ${theme.text}`}>General Resources</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    <button
                      onClick={() =>
                        window.open(
                          `https://www.google.com/search?q=${encodeURIComponent(`${muscleName} muscle kinesiology`)}`,
                          '_blank'
                        )
                      }
                      className={`px-3 py-3 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.text} font-semibold hover:border-brand-400 transition-colors flex items-center gap-2 justify-center`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Kinesiology Overview
                    </button>
                    <button
                      onClick={() =>
                        window.open(
                          `https://www.google.com/search?q=${encodeURIComponent(`${muscleName} ${selectedMotion.displayName} rehab exercises`)}`,
                          '_blank'
                        )
                      }
                      className={`px-3 py-3 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.text} font-semibold hover:border-emerald-400 transition-colors flex items-center gap-2 justify-center`}
                    >
                      <Sparkles className="w-4 h-4 text-emerald-500" />
                      Rehab & Training Ideas
                    </button>
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnimationViewer;
