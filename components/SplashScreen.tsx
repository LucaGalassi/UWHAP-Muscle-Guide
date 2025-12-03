import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
  studentName?: string;
  hasSavedSession?: boolean;
  onResume?: () => void;
  onReset?: () => void;
  onImport?: (input: string) => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, studentName, hasSavedSession=false, onResume, onReset, onImport }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [importValue, setImportValue] = useState('');

  useEffect(() => {
    if (hasSavedSession) {
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
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500">UWHAP</span> Muscle Guide
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
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setIsExiting(true); setTimeout(() => { onResume?.(); onFinish(); }, 300); }}
                className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700"
              >Resume</button>
              <button
                onClick={() => { onReset?.(); setIsExiting(true); setTimeout(onFinish, 300); }}
                className="px-3 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 border border-slate-200"
              >Start Fresh</button>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600">Or paste a Save Code / Link</label>
              <input
                value={importValue}
                onChange={(e)=>setImportValue(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                placeholder="Paste code or URL here"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => { if (importValue.trim()) { try { onImport?.(importValue.trim()); } catch {} } setIsExiting(true); setTimeout(onFinish, 300); }}
                  className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700"
                >Load</button>
                <button
                  onClick={() => { setShowPrompt(false); setIsExiting(true); setTimeout(onFinish, 300); }}
                  className="px-3 py-2 rounded-lg bg-white text-slate-700 text-sm font-bold border border-slate-200 hover:bg-slate-50"
                >Skip</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
