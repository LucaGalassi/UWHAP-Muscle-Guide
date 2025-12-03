import React, { useState } from 'react';
import { Play, Download, AlertTriangle, Timer, CheckCircle, ArrowRight, GraduationCap, Brain, Save, ShieldAlert, ChevronRight, Palette, Sparkles, Moon, Ruler, Leaf } from 'lucide-react';
import { THEME_CONFIG } from '../constants';
import appPackage from '../package.json';
import { AppTheme } from '../types';

interface WelcomeModalProps {
  onDismiss: () => void;
  onResume: (url: string) => void;
  daysUntilExam: number;
  currentTheme: AppTheme;
  onSelectTheme: (theme: AppTheme) => void;
  isNewUser?: boolean;
}

const APP_VERSION = appPackage.version ?? 'dev';

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onDismiss, onResume, daysUntilExam, currentTheme, onSelectTheme, isNewUser = false }) => {
  const [resumeLink, setResumeLink] = useState('');
  const [error, setError] = useState('');
  const [tutorialStep, setTutorialStep] = useState<number>(0); // 0 = Landing, 1+ = Tutorial
  const [resumeMode, setResumeMode] = useState<'CODE' | 'LINK'>('CODE');

  const currentThemeConfig = THEME_CONFIG[currentTheme];
  const overlayBg =
    currentTheme === 'midnight' || currentTheme === 'blueprint'
      ? 'bg-slate-950/80'
      : currentTheme === 'nature'
        ? 'bg-emerald-900/15'
        : 'bg-slate-900/50';

  const isDarkTutorial = currentTheme === 'midnight' || currentTheme === 'blueprint';
  const tutorialText = currentThemeConfig.text;
  const tutorialMuted = currentThemeConfig.subText;
  const tutorialPanel = `${currentThemeConfig.cardBg} border ${currentThemeConfig.border}`;
  const tutorialGoal = `${currentThemeConfig.badge} border ${currentThemeConfig.border}`;
  const tutorialWarning = `${currentThemeConfig.cardBg} border ${currentThemeConfig.border} ${
    isDarkTutorial ? 'bg-amber-900/40 text-amber-100' : 'bg-amber-50 text-amber-700'
  }`;
  const tutorialNumberVariants = [
    currentThemeConfig.iconFunc,
    currentThemeConfig.iconLoc,
    `${currentThemeConfig.accent} text-white`
  ];

  const themeShowcase: Record<AppTheme, { tagline: string; highlight: string; swatch: string; icon: React.ReactNode }> = {
    modern: {
      tagline: 'Clinically clean gradients and crisp panels built for bright classrooms.',
      highlight: 'Matches UW Health UI cues so everything feels familiar.',
      swatch: 'bg-gradient-to-r from-brand-400 via-blue-400 to-blue-600',
      icon: <Sparkles className="w-5 h-5" />
    },
    midnight: {
      tagline: 'Dim, high-contrast palette for late-night focus without the glare.',
      highlight: 'Protects tired eyes during 11pm cram sessions.',
      swatch: 'bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-700',
      icon: <Moon className="w-5 h-5" />
    },
    blueprint: {
      tagline: 'Engineered grid overlays that feel like your anatomy lab schematics.',
      highlight: 'Great for visual thinkers who love diagrams.',
      swatch: 'bg-gradient-to-r from-blue-700 via-blue-600 to-sky-400',
      icon: <Ruler className="w-5 h-5" />
    },
    nature: {
      tagline: 'Warm, grounded neutrals inspired by sketchbooks and cafe study sessions.',
      highlight: 'Keeps anxiety low with softer contrast.',
      swatch: 'bg-gradient-to-r from-emerald-200 via-emerald-100 to-amber-100',
      icon: <Leaf className="w-5 h-5" />
    }
  };

  const handleResume = () => {
    if (!resumeLink.trim()) {
      setError("Please paste a link first.");
      return;
    }
    try {
      onResume(resumeLink);
      setError(''); // Clear error on success
      onDismiss();
    } catch (e) {
      console.error('Resume link error:', e);
      setError("Could not read that code/link. Double-check and try again.");
    }
  };

  const TUTORIAL_STEPS = [
    {
      title: "Welcome, RN Apprentice",
      subtitle: "Customized for UW Health A&P",
      icon: <GraduationCap className="w-12 h-12 text-brand-600" />,
      content: (
        <div className={`space-y-4 text-sm leading-relaxed ${tutorialMuted}`}>
          <p className={tutorialText}>
            Welcome to your digital study companion, designed specifically for the <strong>UW Health RN Apprenticeship</strong> Anatomy & Physiology curriculum.
          </p>
          <p className={tutorialText}>
            This tool is built to help you master the <strong>Group A & Group B muscles</strong> before your final exam on December 8th.
          </p>
          <div className={`p-4 rounded-xl flex items-start gap-3 ${tutorialGoal}`}>
            <Timer className="w-5 h-5 text-inherit mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-xs uppercase tracking-wide">Goal</p>
              <p className="text-xs">Master origins, insertions, and actions through active recall.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "How to Study",
      subtitle: "Smart Guide, Flashcards & More",
      icon: <Brain className="w-12 h-12 text-blue-600" />,
      content: (
        <div className={`space-y-4 text-sm leading-relaxed ${tutorialMuted}`}>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${tutorialNumberVariants[0]}`}>1</div>
              <div>
                <span className={`block font-bold ${tutorialText}`}>Smart Guide Mode</span>
                <span className={tutorialMuted}>Uses "Spaced Repetition" to calculate exactly when you need to review a muscle so you never forget it. Best for daily study.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${tutorialNumberVariants[1]}`}>2</div>
              <div>
                <span className={`block font-bold ${tutorialText}`}>Flashcards</span>
                <span className={tutorialMuted}>Flip cards to test your memory. Rate yourself "Hard", "Good", or "Easy" to adjust your study schedule.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${tutorialNumberVariants[2]}`}>3</div>
              <div>
                <span className={`block font-bold ${tutorialText}`}>Lightning Round</span>
                <span className={tutorialMuted}>A fast-paced game! Start with 60 seconds. Correct answers add time, wrong answers subtract it. How long can you last?</span>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">4</div>
              <div>
                <span className={`block font-bold ${tutorialText}`}>Quiz Mode</span>
                <span className={tutorialMuted}>Generate custom multiple-choice quizzes to simulate exam conditions.</span>
              </div>
            </li>
          </ul>
          <div className={`p-4 rounded-xl ${tutorialPanel}`}>
            <p className={`text-xs font-bold uppercase tracking-wide ${tutorialText}`}>Pro Tip</p>
            <p className={`text-xs mt-1 ${tutorialMuted}`}>Save progress often! Export your study data to re-import later.</p>
          </div>
        </div>
      )
    },
    {
      title: "Saving Your Progress",
      subtitle: "CRITICAL: The Save Code System",
      icon: <Save className="w-12 h-12 text-emerald-600" />,
      content: (
        <div className={`space-y-4 text-sm leading-relaxed ${tutorialMuted}`}>
          <div className={`border-l-4 p-4 rounded-r-xl ${isDarkTutorial ? 'bg-red-900/40 border-red-500/80 text-red-100' : 'bg-red-50 border-red-500 text-red-700'}`}>
             <h4 className={`font-bold flex items-center gap-2 mb-1 ${tutorialText}`}>
               <AlertTriangle className="w-4 h-4" /> No Accounts = Privacy
             </h4>
             <p className={`text-xs ${isDarkTutorial ? 'text-red-100' : 'text-red-600'}`}>
               We do not store your data on a server. Your progress lives in your browser or your custom save code.
             </p>
          </div>
          <p className={tutorialText}>
            To save your progress across devices or browsers, open the <strong>Sidebar</strong> and click the <strong>Settings / Save</strong> button.
          </p>
          <p className={tutorialText}>
            This will generate your unique <strong>Save Code</strong>. Copy that code and keep it safe.
          </p>
          <div className={`p-3 rounded-lg relative overflow-hidden border ${currentThemeConfig.border} ${currentThemeConfig.cardBg}`}>
            <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">EXAMPLE ONLY</div>
            <code className={`text-xs font-mono break-all opacity-80 ${isDarkTutorial ? 'text-emerald-200' : 'text-emerald-700'}`}>
              eyJtdXNjbGVzIjp7InRlc3QiOiJ2YWx1ZSJ9fQ==...
            </code>
          </div>
          <p className={`text-xs ${tutorialText}`}>
            <strong className={`text-red-600 ${isDarkTutorial ? 'text-red-300' : ''}`}>DO NOT COPY THE CODE ABOVE.</strong> It is just an example. You must generate your own code from the sidebar.
          </p>
        </div>
      )
    },
    {
      title: "Content Disclaimer",
      subtitle: "AI Assisted & Lab Manual",
      icon: <ShieldAlert className="w-12 h-12 text-purple-600" />,
      content: (
        <div className={`space-y-4 text-sm leading-relaxed ${tutorialMuted}`}>
          <p className={tutorialText}>
            The core muscle list and information matches your <strong>Lab Manual</strong>.
          </p>
          <p className={tutorialText}>
            <strong>Note on Descriptions:</strong> Web and app scripting, detailed descriptions, demonstrations, mnemonics, were generated using AI to accelerate app production.
          </p>
          <div className={`p-4 rounded-xl ${tutorialPanel}`}>
            <p className={`text-xs font-bold ${tutorialText}`}>
              <span className={`font-black ${isDarkTutorial ? 'text-red-300' : 'text-red-600'}`}>IMPORTANT:</span> ALWAYS verify specific origin/insertion, muscle information, text, etc with the official course materials if in doubt. The Lab Manual is your absolute source of truth for the exam. Once again this content was made heavly assited with AI, so mistakes are likely. Report any issues or mistakes to Luca for fixing.
            </p>
          </div>
        </div>
      )
    }
  ];

  // RENDER TUTORIAL VIEW
  if (tutorialStep > 0) {
    const stepIndex = tutorialStep - 1;
    const step = TUTORIAL_STEPS[stepIndex];
    const isLast = stepIndex === TUTORIAL_STEPS.length - 1;
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300 transition-colors ${overlayBg}`}>
        <div className={`w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col relative h-[80vh] md:h-auto md:min-h-[500px] transition-all duration-500 ${currentThemeConfig.cardBg} ${currentThemeConfig.border} border-2`}>
          
          {/* Progress Bar */}
          <div className="flex gap-1 p-2 shrink-0">
             {TUTORIAL_STEPS.map((_, i) => (
               <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= stepIndex ? currentThemeConfig.accent : currentThemeConfig.border}`} />
             ))}
          </div>

          <div className={`flex-1 p-4 md:p-8 flex flex-col items-center text-center animate-in slide-in-from-right-4 duration-300 key={stepIndex} overflow-y-auto transition-colors ${currentThemeConfig.appBg}`}>
             <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-sm border shrink-0 transition-all ${currentThemeConfig.iconFunc}`}>
               {step.icon}
             </div>
             
             <h2 className={`text-xl md:text-2xl font-black mb-1 transition-colors ${currentThemeConfig.text}`}>{step.title}</h2>
             <p className={`font-bold text-xs uppercase tracking-widest mb-6 md:mb-8 transition-colors ${
               currentTheme === 'blueprint' || currentTheme === 'midnight' 
               ? 'text-indigo-400' 
               : 'text-brand-600'
             }`}>{step.subtitle}</p>
             
             <div className={`w-full text-left rounded-xl p-4 transition-all ${currentThemeConfig.cardBg}`}>
               {step.content}
             </div>
          </div>

          <div className={`p-4 md:p-6 border-t flex justify-between items-center shrink-0 transition-colors ${currentThemeConfig.border} ${currentThemeConfig.cardBg}`}>
             <button 
               onClick={() => {
                 if (stepIndex === 0) setTutorialStep(0);
                 else setTutorialStep(prev => prev - 1);
               }}
               className={`hover:opacity-70 text-sm font-bold px-4 py-2 transition-colors ${currentThemeConfig.subText}`}
             >
               Back
             </button>

             <button 
               onClick={() => {
                 if (isLast) onDismiss();
                 else setTutorialStep(prev => prev + 1);
               }}
               className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg hover:scale-105 text-white ${
                 isLast 
                 ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200' 
                 : currentThemeConfig.accent
               }`}
             >
               {isLast ? "Let's Study!" : "Next"} <ChevronRight className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    );
  }

  // RENDER LANDING VIEW (Resume vs New)
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300 transition-colors ${overlayBg}`}>
      <div className={`w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ${currentThemeConfig.cardBg} ${currentThemeConfig.border} border-2`}>
        
        {/* Hero Header */}
        <div className={`p-6 md:p-8 relative overflow-hidden shrink-0 transition-all duration-500 ${currentThemeConfig.accent}`}>
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-20 -mt-20 transition-all duration-700 ${currentThemeConfig.blobColor1} ${currentThemeConfig.blobOpacity}`}></div>
          <div className={`absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl -ml-16 -mb-16 transition-all duration-700 ${currentThemeConfig.blobColor2} ${currentThemeConfig.blobOpacity}`}></div>
          <div className="absolute top-6 right-6 z-10 text-right">
            <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">Release</span>
            <div className="mt-2 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 text-[12px] font-semibold text-white">
              <Sparkles className="w-3.5 h-3.5" /> v{APP_VERSION}
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">Welcome to A&P Muscle Guide</h1>
                <p className="text-white/90 text-sm font-medium mt-1">UW Health RN Apprenticeship Edition</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className={`p-6 md:p-8 overflow-y-auto transition-colors duration-500 ${currentThemeConfig.appBg}`}>
           {!isNewUser && (
             <>
               <div className="mb-8">
                 <h2 className={`text-2xl font-bold mb-3 flex items-center gap-2 transition-colors ${currentThemeConfig.text}`}>
                   <CheckCircle className="w-6 h-6 text-emerald-500" />
                   Resume Your Progress
                 </h2>
                 <p className={`leading-relaxed transition-colors ${currentThemeConfig.subText}`}>
                   Have a save code? Paste it below to restore your progress, themes, and study queue.
                 </p>
               </div>

               <div className="space-y-4 mb-8">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${currentThemeConfig.subText}`}>
                        <Save className="w-3 h-3" />
                        Resume Options
                      </label>
                      <div className={`p-1 rounded-lg flex text-[11px] font-bold uppercase tracking-wider border ${currentThemeConfig.border} ${currentThemeConfig.cardBg}`}>
                        <button
                          onClick={() => setResumeMode('CODE')}
                          className={`px-3 py-1 rounded-md transition-all border ${
                            resumeMode === 'CODE'
                              ? `${currentThemeConfig.cardBg} ${currentThemeConfig.text} shadow ${currentThemeConfig.border}`
                              : `${currentThemeConfig.subText} border-transparent`
                          }`}
                        >Code</button>
                        <button
                          onClick={() => setResumeMode('LINK')}
                          className={`px-3 py-1 rounded-md transition-all border ${
                            resumeMode === 'LINK'
                              ? `${currentThemeConfig.cardBg} ${currentThemeConfig.text} shadow ${currentThemeConfig.border}`
                              : `${currentThemeConfig.subText} border-transparent`
                          }`}
                        >Link</button>
                      </div>
                    </div>
                    {resumeMode === 'CODE' ? (
                      <textarea 
                        rows={3}
                        placeholder="Paste your save code here...\nExample: eyJ2ZXJzaW9uIjoxLCJwYXJhbXMiOnt9fQ=="
                        className={`w-full border-2 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all resize-none ${currentThemeConfig.inputBg} ${currentThemeConfig.border} ${currentThemeConfig.text}`}
                        value={resumeLink}
                        onChange={(e) => {
                          setResumeLink(e.target.value);
                          setError('');
                        }}
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder="Paste your magic link (https://...)"
                        className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all ${currentThemeConfig.inputBg} ${currentThemeConfig.border} ${currentThemeConfig.text}`}
                        value={resumeLink}
                        onChange={(e) => {
                          setResumeLink(e.target.value);
                          setError('');
                        }}
                      />
                    )}
                    {error && (
                      <div
                        className={`mt-1 p-3 rounded-lg flex items-start gap-2 border ${
                          isDarkTutorial ? 'bg-red-950/40 border-red-700 text-red-100' : 'bg-red-50 border-red-200 text-red-700'
                        }`}
                      >
                        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-xs font-medium">{error}</p>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={handleResume}
                    disabled={!resumeLink.trim()}
                    className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                      resumeLink.trim()
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-200'
                      : `${currentThemeConfig.inputBg} ${currentThemeConfig.subText} cursor-not-allowed shadow-none border ${currentThemeConfig.border}`
                    }`}
                  >
                    <Download className="w-4 h-4" /> Restore My Progress
                  </button>
               </div>

               {/* Feature Highlights */}
               <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className={`flex items-center gap-3 text-sm p-3 rounded-xl transition-all ${currentThemeConfig.cardBg} ${currentThemeConfig.border} border`}>
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className={`font-medium ${currentThemeConfig.text}`}>No account needed</span>
                  </div>
                  <div className={`flex items-center gap-3 text-sm p-3 rounded-xl transition-all ${currentThemeConfig.cardBg} ${currentThemeConfig.border} border`}>
                    <Save className="w-5 h-5 text-blue-500 shrink-0" />
                    <span className={`font-medium ${currentThemeConfig.text}`}>Save via code</span>
                  </div>
               </div>
             </>
           )}

           <div className="mb-10">
             <div className="flex items-center gap-3 mb-6">
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${currentThemeConfig.iconFunc}`}>
                 <Palette className="w-6 h-6" />
               </div>
               <div>
                 <p className="text-xs font-bold text-brand-500 uppercase tracking-widest">Live Preview</p>
                 <p className={`text-xl font-black transition-colors ${currentThemeConfig.text}`}>Choose Your Theme</p>
               </div>
             </div>
             <div className="grid gap-4 md:grid-cols-2">
               {Object.entries(themeShowcase).map(([key, story]) => {
                 const themeKey = key as AppTheme;
                 const isActive = themeKey === currentTheme;
                 const themeConf = THEME_CONFIG[themeKey];
                 return (
                   <button
                     key={key}
                     type="button"
                     onClick={() => onSelectTheme(themeKey)}
                     aria-pressed={isActive}
                     className={`text-left rounded-2xl border-2 p-4 transition-all duration-300 backdrop-blur-sm relative overflow-hidden group ${
                       isActive
                         ? 'border-emerald-500 shadow-xl scale-[1.02] ring-2 ring-emerald-400/50'
                         : `${currentThemeConfig.border} hover:border-brand-400 hover:shadow-lg hover:scale-[1.01]`
                     } ${currentThemeConfig.cardBg}`}
                   >
                     {/* Animated background on hover */}
                     <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${story.swatch}`} style={{ opacity: isActive ? 0.1 : 0 }}></div>
                     
                     <div className="relative z-10">
                       <div className="flex items-center justify-between gap-3 mb-3">
                         <div className="flex items-center gap-3">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isActive ? story.swatch : themeConf.iconFunc}`}>
                             {story.icon}
                           </div>
                           <div>
                             <p className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${currentThemeConfig.subText}`}>Theme</p>
                             <p className={`text-lg font-black transition-colors ${currentThemeConfig.text}`}>{themeConf.label}</p>
                           </div>
                         </div>
                         {isActive && (
                           <span className="text-[10px] font-black uppercase tracking-widest text-white bg-emerald-500 px-3 py-1.5 rounded-full shadow-lg animate-in slide-in-from-right">
                             ✓ Active
                           </span>
                         )}
                       </div>
                       <p className={`text-sm mt-3 transition-colors ${currentThemeConfig.text} opacity-90`}>{story.tagline}</p>
                       <p className={`text-xs mt-1.5 font-semibold transition-colors ${currentThemeConfig.subText}`}>{story.highlight}</p>
                       
                       {/* Color Swatch Preview */}
                       <div className="mt-4 flex items-center gap-2">
                         <div className={`flex-1 h-10 rounded-xl ${story.swatch} shadow-inner`}></div>
                         {isActive && (
                           <div className="text-emerald-500 animate-pulse">
                             <CheckCircle className="w-6 h-6" />
                           </div>
                         )}
                       </div>
                     </div>
                   </button>
                 );
               })}
             </div>
           </div>

           <button 
             onClick={() => setTutorialStep(1)}
             className={`w-full py-5 text-white hover:opacity-90 rounded-xl font-bold transition-all flex items-center justify-center gap-3 group shadow-lg hover:shadow-2xl hover:scale-[1.02] ${currentThemeConfig.accent}`}
           >
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30 shadow-sm">
                 <Play className="w-5 h-5 text-white" />
               </div>
               <div className="text-left">
                 <span className="block text-xs uppercase tracking-wider text-white/80 font-bold">{isNewUser ? 'Let\'s Get Started' : 'New Student?'}</span>
                 <span className="text-xl font-black">Start Tutorial</span>
               </div>
             </div>
             <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;