import React, { useEffect, useState } from 'react';
import { Activity, Clock, AlertTriangle, Settings, Key } from 'lucide-react';
import pkg from '../package.json';

interface SplashScreenProps {
  onFinish: () => void;
  studentName?: string;
  hasSavedSession?: boolean;
  autoResume?: boolean;
  onResume?: () => void;
  onReset?: () => void;
  onImport?: (input: string) => void;
}

// Format timestamp to relative time string
const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return days === 1 ? '1 day ago' : `${days} days ago`;
  if (hours > 0) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  if (minutes > 0) return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  return 'Just now';
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, studentName, hasSavedSession=false, autoResume=false, onResume, onReset, onImport }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [importValue, setImportValue] = useState('');
  const [lastSaveTime, setLastSaveTime] = useState<number | null>(null);

  useEffect(() => {
    // Load last save timestamp
    try {
      const savedTimestamp = localStorage.getItem('last_save_timestamp');
      if (savedTimestamp) {
        setLastSaveTime(parseInt(savedTimestamp, 10));
      }
    } catch {}
    
    if (hasSavedSession) {
      if (autoResume) {
        // brief pause for visual continuity
        const t = setTimeout(() => { setIsExiting(true); setTimeout(() => { onResume?.(); onFinish(); }, 300); }, 400);
        return () => clearTimeout(t);
      }
      setShowPrompt(true);
      return;
    }
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onFinish, 700);
    }, 1800);
    return () => clearTimeout(timer);
  }, [onFinish, hasSavedSession]);

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 transition-all duration-700 ease-in-out ${isExiting ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'}`}>
      {/* Version Badge - Top Right Corner */}
      <div className="absolute top-4 right-4 flex items-center gap-2 text-slate-500 text-xs font-bold z-10">
        <span className="opacity-50">v{pkg.version}</span>
        <span className="opacity-30">|</span>
        <div className="flex items-center gap-1 opacity-50">
          <Key className="w-3 h-3" />
          <span>AI</span>
        </div>
        <span className="opacity-30">|</span>
        <Settings className="w-3 h-3 opacity-50" />
      </div>

      <div className="relative mb-12">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
        
        {/* Emoji Cloud Animation */}
        <div className="relative z-10 grid grid-cols-3 gap-8 md:gap-12">
           <div className="animate-[bounce_2s_infinite] text-6xl md:text-7xl filter drop-shadow-lg hover:scale-110 transition-transform cursor-default select-none">💪</div>
           <div className="animate-[bounce_2.2s_infinite] delay-100 text-6xl md:text-7xl filter drop-shadow-lg hover:scale-110 transition-transform cursor-default select-none">🧠</div>
           <div className="animate-[bounce_1.8s_infinite] delay-200 text-6xl md:text-7xl filter drop-shadow-lg hover:scale-110 transition-transform cursor-default select-none">🫀</div>
           <div className="animate-[bounce_2.5s_infinite] delay-300 text-6xl md:text-7xl filter drop-shadow-lg hover:scale-110 transition-transform cursor-default select-none">🦴</div>
           <div className="animate-[bounce_2.1s_infinite] delay-500 text-6xl md:text-7xl filter drop-shadow-lg hover:scale-110 transition-transform cursor-default select-none">🧬</div>
           <div className="animate-[bounce_1.9s_infinite] delay-700 text-6xl md:text-7xl filter drop-shadow-lg hover:scale-110 transition-transform cursor-default select-none">🩸</div>
        </div>
      </div>

      <h1 className="relative z-10 text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 animate-in slide-in-from-bottom-8 fade-in duration-1000 text-center px-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500">UWH AP1</span> Muscle Guide
      </h1>
      
      {studentName && (
        <div className="relative z-10 text-xl md:text-2xl font-bold text-slate-300 mb-8 animate-in fade-in slide-in-from-bottom-4 delay-300 duration-1000">
          Welcome back, <span className="text-sky-400">{studentName}</span>
        </div>
      )}
      
      {!showPrompt && (
        <div className="relative z-10 flex items-center gap-3 text-slate-400 text-xs md:text-sm font-bold uppercase tracking-[0.2em] animate-in fade-in delay-500 duration-1000">
          <Activity className="w-4 h-4 text-sky-500 animate-spin" />
          Initializing Learning Engine...
        </div>
      )}

      {showPrompt && (
        <div className="relative z-20 w-full max-w-lg mx-auto px-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-2xl p-5 space-y-4">
            <div className="text-center">
              <h2 className="text-lg font-black text-slate-900">Resume previous session?</h2>
              <p className="text-xs text-slate-600 mt-1">We found saved progress and preferences in this browser.</p>
              
              {/* Last Save Indicator */}
              {lastSaveTime && (
                <div className="mt-2 flex items-center justify-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-lg py-1.5 px-3">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Last saved: {formatRelativeTime(lastSaveTime)}</span>
                </div>
              )}
            </div>
            
            {/* Browser Storage Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800">
                <span className="font-bold">Your data is stored locally in this browser.</span>{' '}
                Clearing browser data will erase your progress. For backup, go to Settings → Copy Save Code after resuming.
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setIsExiting(true); setTimeout(() => { onResume?.(); onFinish(); }, 300); }}
                className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700"
              >Resume</button>
              <button
                onClick={() => { onReset?.(); setShowPrompt(false); setIsExiting(true); setTimeout(onFinish, 300); }}
                className="px-3 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 border border-slate-200"
              >Start Fresh</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
