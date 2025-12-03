import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X, PlayCircle, PauseCircle, ChevronDown } from 'lucide-react';
import { AppTheme } from '../types';
import { THEME_CONFIG } from '../constants';

interface BetaAnimationViewerProps {
  muscleName: string;
  currentTheme: AppTheme;
  defaultMotion?: string;
  onClose: () => void;
}

const MOTIONS = [
  'Flexion', 'Extension',
  'Abduction', 'Adduction',
  'Medial Rotation', 'Lateral Rotation',
  'Pronation', 'Supination',
  'Dorsiflexion', 'Plantarflexion',
  'Elevation', 'Depression',
  'Protraction', 'Retraction'
];

// Very simple parametric animations using SVG; these are approximations
type ArcAnim = { description: string; type: 'arc'; startDeg: number; endDeg: number };
type RotateAnim = { description: string; type: 'rotate'; startDeg: number; endDeg: number };
type LineAnim = { description: string; type: 'line'; axis: 'x' | 'y'; start: number; end: number };
type AnimDef = ArcAnim | RotateAnim | LineAnim;

function useAnimationPath(motion: string): AnimDef {
  switch (motion) {
    case 'Flexion':
      return { description: 'Joint flexion (e.g., elbow/hip): decreasing angle.', type: 'arc', startDeg: 10, endDeg: 90 };
    case 'Extension':
      return { description: 'Joint extension: increasing angle back to neutral.', type: 'arc', startDeg: 90, endDeg: 10 };
    case 'Abduction':
      return { description: 'Move away from midline.', type: 'line', axis: 'y', start: 0, end: -60 };
    case 'Adduction':
      return { description: 'Move toward midline.', type: 'line', axis: 'y', start: -60, end: 0 };
    case 'Medial Rotation':
      return { description: 'Rotate toward midline.', type: 'rotate', startDeg: 0, endDeg: -35 };
    case 'Lateral Rotation':
      return { description: 'Rotate away from midline.', type: 'rotate', startDeg: 0, endDeg: 35 };
    case 'Pronation':
      return { description: 'Forearm pronation.', type: 'rotate', startDeg: 0, endDeg: 150 };
    case 'Supination':
      return { description: 'Forearm supination.', type: 'rotate', startDeg: 150, endDeg: 0 };
    case 'Dorsiflexion':
      return { description: 'Ankle dorsiflexion.', type: 'line', axis: 'y', start: 0, end: -25 };
    case 'Plantarflexion':
      return { description: 'Ankle plantarflexion.', type: 'line', axis: 'y', start: -25, end: 15 };
    case 'Elevation':
      return { description: 'Scapular elevation.', type: 'line', axis: 'y', start: 0, end: -20 };
    case 'Depression':
      return { description: 'Scapular depression.', type: 'line', axis: 'y', start: -20, end: 10 };
    case 'Protraction':
      return { description: 'Scapular protraction.', type: 'line', axis: 'x', start: 0, end: 40 };
    case 'Retraction':
      return { description: 'Scapular retraction.', type: 'line', axis: 'x', start: 40, end: 0 };
    default:
      return { description: 'Generic motion.', type: 'line', axis: 'x', start: 0, end: 20 };
  }
}

export const BetaAnimationViewer: React.FC<BetaAnimationViewerProps> = ({ muscleName, currentTheme, defaultMotion = 'Flexion', onClose }) => {
  const theme = THEME_CONFIG[currentTheme];
  const [motion, setMotion] = useState(defaultMotion);
  const [playing, setPlaying] = useState(true);
  const anim = useAnimationPath(motion);
  const tRef = useRef<number | null>(null);
  const [t, setT] = useState(0); // 0..1

  useEffect(() => {
    // simple raf loop
    const loop = (ts: number) => {
      setT(prev => {
        const next = playing ? (prev + 0.01) : prev;
        return next > 1 ? 0 : next;
      });
      tRef.current = requestAnimationFrame(loop);
    };
    tRef.current = requestAnimationFrame(loop);
    return () => { if (tRef.current) cancelAnimationFrame(tRef.current); };
  }, [playing]);

  const transform = useMemo(() => {
    if (anim.type === 'arc') {
      const deg = anim.startDeg + (anim.endDeg - anim.startDeg) * t;
      return `rotate(${deg} 100 160)`; // pivot about joint center
    }
    if (anim.type === 'rotate') {
      const deg = anim.startDeg + (anim.endDeg - anim.startDeg) * t;
      return `rotate(${deg} 100 160)`;
    }
    // line
    const delta = anim.start + (anim.end - anim.start) * t;
    if (anim.axis === 'x') return `translate(${delta} 0)`;
    return `translate(0 ${delta})`;
  }, [anim, t]);

  const overlayBg =
    currentTheme === 'midnight' || currentTheme === 'blueprint'
      ? 'bg-slate-950/80'
      : currentTheme === 'nature'
        ? 'bg-emerald-950/15'
        : 'bg-slate-900/50';

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayBg} backdrop-blur-sm`}>
      <div className={`w-full max-w-2xl rounded-2xl border ${theme.border} ${theme.cardBg} shadow-2xl overflow-hidden`}>
        <div className={`px-4 py-3 border-b ${theme.border} flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <PlayCircle className="w-5 h-5" />
            <h3 className={`font-bold ${theme.text}`}>Beta Animation Viewer</h3>
          </div>
          <button onClick={onClose} className={`p-2 rounded-full border ${theme.border} ${theme.inputBg} ${theme.subText} hover:opacity-80`}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className={`${theme.text} text-sm font-semibold`}>{muscleName}</p>
              <p className={`text-xs ${theme.subText}`}>{anim.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <select 
                value={motion}
                onChange={(e) => setMotion(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${theme.border} text-sm ${theme.text} ${theme.inputBg}`}
              >
                {MOTIONS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <button onClick={() => setPlaying(p => !p)} className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.inputBg} ${theme.text} text-sm font-semibold`}>
                {playing ? <PauseCircle className="w-4 h-4 inline-block mr-1" /> : <PlayCircle className="w-4 h-4 inline-block mr-1" />} {playing ? 'Pause' : 'Play'}
              </button>
            </div>
          </div>

          <div className={`rounded-2xl border ${theme.border} ${theme.inputBg} p-3`}>
            {/* Simple stick-figure joint representation */}
            <svg viewBox="0 0 300 220" className="w-full h-64">
              {/* ground/midline */}
              <line x1="20" y1="200" x2="280" y2="200" stroke="#cbd5e1" strokeWidth="2" />
              {/* body base */}
              <circle cx="100" cy="160" r="8" fill="#94a3b8" />
              {/* proximal segment */}
              <rect x="92" y="120" width="16" height="40" rx="8" fill="#64748b" />
              {/* distal segment: animated */}
              <g transform={transform}>
                <rect x="92" y="160" width="16" height="40" rx="8" fill="#0ea5e9" />
              </g>
            </svg>
          </div>

          <div className={`text-xs ${theme.subText} space-y-2`}>
            <p>
              Beta: This animation is an approximation for educational visualization only. It does not reflect exact biomechanics for all joints or muscles and may be inaccurate or incomplete.
            </p>
            <p>
              Ideas to improve: use WebGL/Three.js for articulated models, import rigged GLTF skeletons, or generate motion paths via kinematics libraries. We can also overlay labels and angles to better match specific joint axes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaAnimationViewer;
