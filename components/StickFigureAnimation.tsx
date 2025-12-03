import React, { useEffect, useRef, useState, useMemo } from 'react';
import { MotionDefinition, MUSCLE_ANIMATION_MAPS } from '../services/animationService';
import { AppTheme } from '../types';
import { THEME_CONFIG } from '../constants';

interface StickFigureAnimationProps {
  motion: MotionDefinition;
  playing: boolean;
  currentTheme: AppTheme;
  muscleId?: string; // Optional - to show which muscles are involved
}

/**
 * StickFigureAnimation v8.2
 * Comprehensive SVG-based animation system with:
 * - Accurate anatomical motion representation
 * - Clear phase labels (Starting Position, Active Motion, End Range)
 * - Anatomical plane indicators
 * - Muscle involvement highlighting
 * - Range of motion arc display
 */
export const StickFigureAnimation: React.FC<StickFigureAnimationProps> = ({
  motion,
  playing,
  currentTheme,
  muscleId
}) => {
  const [progress, setProgress] = useState(0); // 0 to 1
  const animFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const theme = THEME_CONFIG[currentTheme];
  const isDark = currentTheme === 'midnight' || currentTheme === 'blueprint';

  // Colors based on theme
  const colors = useMemo(() => ({
    bone: isDark ? '#94a3b8' : '#64748b',
    boneActive: isDark ? '#60a5fa' : '#3b82f6',
    joint: isDark ? '#f97316' : '#ea580c',
    arc: isDark ? '#fbbf24' : '#f59e0b',
    text: isDark ? '#f1f5f9' : '#1e293b',
    subText: isDark ? '#94a3b8' : '#64748b',
    phaseStart: isDark ? '#4ade80' : '#22c55e',
    phaseEnd: isDark ? '#f87171' : '#ef4444',
    muscle: isDark ? '#c084fc' : '#a855f7',
    background: isDark ? '#1e293b' : '#f8fafc',
  }), [isDark]);

  useEffect(() => {
    if (!playing) return;

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      setProgress(prev => {
        const speed = 1 / motion.duration;
        const next = prev + delta * speed;
        return next > 1 ? 0 : next;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      lastTimeRef.current = 0;
    };
  }, [playing, motion.duration]);

  // Calculate current angle with smooth easing
  const currentAngle = useMemo(() => {
    const neutralDeg = motion.joint.neutralDeg;
    const targetDeg = motion.targetDeg;
    
    // Smooth sine wave for natural motion - goes 0 -> 1 -> 0
    const easedProgress = Math.sin(progress * Math.PI);
    return neutralDeg + (targetDeg - neutralDeg) * easedProgress;
  }, [progress, motion.joint.neutralDeg, motion.targetDeg]);

  // Determine phase based on actual motion position (synced with animation)
  const phase = useMemo((): 'start' | 'moving' | 'end' => {
    const easedProgress = Math.sin(progress * Math.PI);
    if (easedProgress < 0.15) return 'start';
    if (easedProgress > 0.85) return 'end';
    return 'moving';
  }, [progress]);

  // Get anatomical plane label
  const getPlaneLabel = () => {
    const jointId = motion.joint.id.toLowerCase();
    if (jointId.includes('flexext') || jointId.includes('flex')) return 'Sagittal Plane';
    if (jointId.includes('abdadd') || jointId.includes('lateral')) return 'Frontal Plane';
    if (jointId.includes('rotation')) return 'Transverse Plane';
    return 'Multi-planar';
  };

  // Get direction label
  const getDirectionLabel = () => {
    const name = motion.name.toLowerCase();
    if (name.includes('flexion')) return '↑ FLEXION';
    if (name.includes('extension')) return '↓ EXTENSION';
    if (name.includes('abduction')) return '← ABDUCTION →';
    if (name.includes('adduction')) return '→ ADDUCTION ←';
    if (name.includes('medial') || name.includes('internal')) return '↻ MEDIAL ROTATION';
    if (name.includes('lateral') || name.includes('external')) return '↺ LATERAL ROTATION';
    if (name.includes('pronation')) return '↻ PRONATION';
    if (name.includes('supination')) return '↺ SUPINATION';
    if (name.includes('dorsiflexion')) return '↑ DORSIFLEXION';
    if (name.includes('plantarflexion')) return '↓ PLANTARFLEXION';
    if (name.includes('inversion')) return '↙ INVERSION';
    if (name.includes('eversion')) return '↗ EVERSION';
    if (name.includes('elevation')) return '↑ ELEVATION';
    if (name.includes('depression')) return '↓ DEPRESSION';
    if (name.includes('protraction')) return '→ PROTRACTION';
    if (name.includes('retraction')) return '← RETRACTION';
    return motion.displayName.toUpperCase();
  };

  // Helper: describe SVG arc path
  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = Math.abs(endAngle - startAngle) > 180 ? '1' : '0';
    const sweepFlag = endAngle > startAngle ? '1' : '0';
    
    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, sweepFlag, end.x, end.y
    ].join(' ');
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  // Render phase indicator badge
  const PhaseIndicator = ({ x, y }: { x: number; y: number }) => (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x="-50"
        y="-12"
        width="100"
        height="24"
        rx="12"
        fill={phase === 'start' ? colors.phaseStart : phase === 'end' ? colors.phaseEnd : colors.boneActive}
        opacity={0.9}
      />
      <text
        x="0"
        y="5"
        textAnchor="middle"
        fill="white"
        fontSize="11"
        fontWeight="bold"
      >
        {phase === 'start' ? '● START' : phase === 'end' ? '◆ END RANGE' : '▸ MOVING'}
      </text>
    </g>
  );

  // Angle display with degree symbol
  const AngleDisplay = ({ x, y, angle }: { x: number; y: number; angle: number }) => (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x="-30"
        y="-14"
        width="60"
        height="28"
        rx="6"
        fill={colors.arc}
        opacity={0.95}
      />
      <text
        x="0"
        y="6"
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontWeight="bold"
      >
        {Math.round(angle)}°
      </text>
    </g>
  );

  // Range of Motion arc with labels
  const ROMDisplay = ({ cx, cy, radius, startDeg, endDeg, currentDeg }: {
    cx: number; cy: number; radius: number; startDeg: number; endDeg: number; currentDeg: number;
  }) => {
    // Normalize angles so the arc always follows the shortest path and avoids backwards dashes
    const normalizeArc = (start: number, end: number) => {
      const delta = ((end - start + 360) % 360);
      const signedDelta = delta > 180 ? delta - 360 : delta;
      return { start, end: start + signedDelta };
    };

    const { start: svgStartDeg, end: svgEndDeg } = normalizeArc(startDeg, endDeg);
    const svgCurrentDeg = normalizeArc(svgStartDeg, currentDeg).end;

    return (
      <g>
        {/* Neutral baseline */}
        {(() => {
          const origin = polarToCartesian(cx, cy, radius * 0.7, svgStartDeg);
          return (
            <line
              x1={cx}
              y1={cy}
              x2={origin.x}
              y2={origin.y}
              stroke={colors.subText}
              strokeWidth="3"
              strokeDasharray="2 4"
              opacity={0.6}
            />
          );
        })()}

        {/* Full ROM arc (faded) */}
        <path
          d={describeArc(cx, cy, radius, svgStartDeg, svgEndDeg)}
          fill="none"
          stroke={colors.arc}
          strokeWidth="3"
          strokeDasharray="4 4"
          opacity={0.3}
        />

        {/* Current motion arc (solid) */}
        <path
          d={describeArc(cx, cy, radius, svgStartDeg, svgCurrentDeg)}
          fill="none"
          stroke={colors.arc}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Start marker */}
        {(() => {
          const pos = polarToCartesian(cx, cy, radius, svgStartDeg);
          return (
            <g>
              <circle cx={pos.x} cy={pos.y} r="5" fill={colors.phaseStart} />
              <text x={pos.x} y={pos.y - 10} textAnchor="middle" fill={colors.phaseStart} fontSize="9" fontWeight="bold">
                START/NEUTRAL
              </text>
            </g>
          );
        })()}

        {/* End marker */}
        {(() => {
          const pos = polarToCartesian(cx, cy, radius, svgEndDeg);
          return (
            <g>
              <circle cx={pos.x} cy={pos.y} r="5" fill={colors.phaseEnd} />
              <text x={pos.x} y={pos.y - 10} textAnchor="middle" fill={colors.phaseEnd} fontSize="9" fontWeight="bold">
                END RANGE
              </text>
            </g>
          );
        })()}
      </g>
    );
  };

  // Main figure renderer based on joint type
  const renderFigure = () => {
    const jointId = motion.joint.id;
    
    // Shoulder motions
    if (jointId.includes('shoulder') && !jointId.includes('Horiz')) {
      return renderShoulderFigure();
    }
    if (jointId.includes('shoulderHoriz')) {
      return renderShoulderHorizontalFigure();
    }
    
    // Elbow & Forearm
    if (jointId === 'elbowFlexExt') {
      return renderElbowFigure();
    }
    if (jointId === 'forearmProSup') {
      return renderForearmFigure();
    }
    
    // Wrist
    if (jointId.includes('wrist')) {
      return renderWristFigure();
    }
    
    // Hip
    if (jointId.includes('hip')) {
      return renderHipFigure();
    }
    
    // Knee
    if (jointId === 'kneeFlexExt') {
      return renderKneeFigure();
    }
    
    // Ankle
    if (jointId.includes('ankle')) {
      return renderAnkleFigure();
    }
    
    // Spine
    if (jointId.includes('spine')) {
      return renderSpineFigure();
    }
    
    // Scapula
    if (jointId.includes('scapula')) {
      return renderScapulaFigure();
    }
    
    return renderGenericFigure();
  };

  // ============================================================================
  // SHOULDER FIGURES
  // ============================================================================
  
  const renderShoulderFigure = () => {
    const centerX = 200;
    const centerY = 160;
    const upperArmLen = 80;
    const forearmLen = 70;
    
    const jointId = motion.joint.id;
    let armAngle = 0;
    let arcStart = 0;
    let arcEnd = 0;
    
    if (jointId === 'shoulderFlexExt') {
      // Flexion/Extension in sagittal plane
      armAngle = currentAngle - 90; // Convert to SVG coordinate
      arcStart = motion.joint.neutralDeg - 90;
      arcEnd = motion.targetDeg - 90;
    } else if (jointId === 'shoulderAbdAdd') {
      // Abduction/Adduction in frontal plane
      armAngle = currentAngle;
      arcStart = 0;
      arcEnd = motion.targetDeg;
    } else if (jointId === 'shoulderRotation') {
      // Rotation - show top-down view
      return renderShoulderRotationFigure();
    }
    
    const rad = armAngle * Math.PI / 180;
    const elbowX = centerX + upperArmLen * Math.cos(rad);
    const elbowY = centerY + upperArmLen * Math.sin(rad);
    const handX = elbowX + forearmLen * Math.cos(rad);
    const handY = elbowY + forearmLen * Math.sin(rad);
    
    return (
      <>
        {/* Body reference */}
        <rect x={centerX - 25} y={centerY - 10} width="50" height="120" rx="8" fill={colors.bone} opacity={0.3} />
        <circle cx={centerX} cy={centerY - 35} r="25" fill="none" stroke={colors.bone} strokeWidth="4" opacity={0.5} />
        
        {/* Shoulder joint */}
        <circle cx={centerX} cy={centerY} r="10" fill={colors.joint} />
        
        {/* Upper arm */}
        <line x1={centerX} y1={centerY} x2={elbowX} y2={elbowY} 
              stroke={colors.boneActive} strokeWidth="12" strokeLinecap="round" />
        
        {/* Elbow joint */}
        <circle cx={elbowX} cy={elbowY} r="8" fill={colors.joint} opacity={0.7} />
        
        {/* Forearm */}
        <line x1={elbowX} y1={elbowY} x2={handX} y2={handY}
              stroke={colors.boneActive} strokeWidth="10" strokeLinecap="round" opacity={0.8} />
        
        {/* Hand */}
        <circle cx={handX} cy={handY} r="10" fill={colors.boneActive} />
        
        {/* ROM arc */}
        <ROMDisplay
          cx={centerX}
          cy={centerY}
          radius={upperArmLen * 0.6}
          startDeg={arcStart}
          endDeg={arcEnd}
          currentDeg={armAngle}
        />
        
        {/* Angle display */}
        <AngleDisplay x={centerX + 90} y={centerY - 60} angle={currentAngle} />
        
        {/* Phase indicator */}
        <PhaseIndicator x={200} y={30} />
        
        {/* Direction label */}
        <text x={200} y={320} textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">
          {getDirectionLabel()}
        </text>
      </>
    );
  };

  const renderShoulderRotationFigure = () => {
    const centerX = 200;
    const centerY = 175;
    const armLen = 80;
    
    const rad = currentAngle * Math.PI / 180;
    const handX = centerX + armLen * Math.cos(rad);
    const handY = centerY + armLen * Math.sin(rad);
    
    return (
      <>
        {/* Top-down view indicator */}
        <text x={200} y={50} textAnchor="middle" fill={colors.subText} fontSize="11" fontWeight="bold">
          TOP-DOWN VIEW
        </text>
        
        {/* Body outline (top-down) */}
        <ellipse cx={centerX} cy={centerY} rx="30" ry="50" fill={colors.bone} opacity={0.3} />
        
        {/* Reference circle */}
        <circle cx={centerX} cy={centerY} r={armLen * 0.9} fill="none" stroke={colors.bone} 
                strokeWidth="2" strokeDasharray="5 5" opacity={0.4} />
        
        {/* Shoulder pivot */}
        <circle cx={centerX} cy={centerY} r="12" fill={colors.joint} />
        
        {/* Rotating arm */}
        <line x1={centerX} y1={centerY} x2={handX} y2={handY}
              stroke={colors.boneActive} strokeWidth="10" strokeLinecap="round" />
        
        {/* Hand marker */}
        <circle cx={handX} cy={handY} r="12" fill={colors.boneActive} />
        
        {/* Rotation arc */}
        <ROMDisplay
          cx={centerX}
          cy={centerY}
          radius={armLen * 0.6}
          startDeg={motion.joint.neutralDeg + 90}
          endDeg={motion.targetDeg + 90}
          currentDeg={currentAngle + 90}
        />
        
        {/* Angle display */}
        <AngleDisplay x={320} y={175} angle={currentAngle} />
        
        {/* Phase */}
        <PhaseIndicator x={200} y={80} />
        
        {/* Direction */}
        <text x={200} y={320} textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">
          {getDirectionLabel()}
        </text>
      </>
    );
  };

  const renderShoulderHorizontalFigure = () => {
    // Top-down view for horizontal abduction/adduction
    const centerX = 200;
    const centerY = 180;
    const armLen = 80;
    
    const rad = (currentAngle - 90) * Math.PI / 180;
    const handX = centerX + armLen * Math.cos(rad);
    const handY = centerY + armLen * Math.sin(rad);
    
    return (
      <>
        <text x={200} y={50} textAnchor="middle" fill={colors.subText} fontSize="11" fontWeight="bold">
          TOP-DOWN VIEW (ARM AT 90°)
        </text>
        
        {/* Body */}
        <ellipse cx={centerX} cy={centerY + 30} rx="35" ry="60" fill={colors.bone} opacity={0.3} />
        
        {/* Movement range indicator */}
        <path
          d={describeArc(centerX, centerY, armLen * 0.7, -30, 135)}
          fill="none"
          stroke={colors.arc}
          strokeWidth="3"
          strokeDasharray="6 3"
          opacity={0.3}
        />
        
        {/* Shoulder */}
        <circle cx={centerX} cy={centerY} r="12" fill={colors.joint} />
        
        {/* Arm */}
        <line x1={centerX} y1={centerY} x2={handX} y2={handY}
              stroke={colors.boneActive} strokeWidth="10" strokeLinecap="round" />
        
        <circle cx={handX} cy={handY} r="10" fill={colors.boneActive} />
        
        {/* Angle */}
        <AngleDisplay x={320} y={180} angle={currentAngle} />
        
        <PhaseIndicator x={200} y={80} />
        
        <text x={200} y={320} textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">
          {getDirectionLabel()}
        </text>
      </>
    );
  };

  // ============================================================================
  // ELBOW FIGURE
  // ============================================================================
  
  const renderElbowFigure = () => {
    const shoulderX = 140;
    const shoulderY = 150;
    const upperArmLen = 85;
    const forearmLen = 75;
    
    // Elbow at fixed position
    const elbowX = shoulderX + upperArmLen;
    const elbowY = shoulderY;
    
    // Forearm angle
    const angle = 180 - currentAngle;
    const rad = angle * Math.PI / 180;
    const handX = elbowX + forearmLen * Math.cos(rad);
    const handY = elbowY + forearmLen * Math.sin(rad);
    
    return (
      <>
        {/* Body hint */}
        <rect x={shoulderX - 50} y={shoulderY - 30} width="40" height="100" rx="6" fill={colors.bone} opacity={0.2} />
        
        {/* Shoulder */}
        <circle cx={shoulderX} cy={shoulderY} r="8" fill={colors.bone} opacity={0.5} />
        
        {/* Upper arm (fixed) */}
        <line x1={shoulderX} y1={shoulderY} x2={elbowX} y2={elbowY}
              stroke={colors.bone} strokeWidth="12" strokeLinecap="round" opacity={0.7} />
        
        {/* Elbow joint (highlighted) */}
        <circle cx={elbowX} cy={elbowY} r="12" fill={colors.joint} />
        <text x={elbowX} y={elbowY + 30} textAnchor="middle" fill={colors.joint} fontSize="10" fontWeight="bold">
          ELBOW
        </text>
        
        {/* Forearm (moving) */}
        <line x1={elbowX} y1={elbowY} x2={handX} y2={handY}
              stroke={colors.boneActive} strokeWidth="12" strokeLinecap="round" />
        
        {/* Hand */}
        <circle cx={handX} cy={handY} r="10" fill={colors.boneActive} />
        
        {/* ROM arc */}
        <ROMDisplay
          cx={elbowX}
          cy={elbowY}
          radius={45}
          startDeg={180}
          endDeg={180 - motion.targetDeg}
          currentDeg={angle}
        />
        
        {/* Angle */}
        <AngleDisplay x={elbowX + 70} y={elbowY - 40} angle={currentAngle} />
        
        <PhaseIndicator x={200} y={30} />
        
        <text x={200} y={320} textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">
          {getDirectionLabel()}
        </text>
      </>
    );
  };

  // ============================================================================
  // FOREARM (PRONATION/SUPINATION)
  // ============================================================================
  
  const renderForearmFigure = () => {
    const centerX = 200;
    const centerY = 175;
    const handWidth = 50;
    const handHeight = 70;
    
    return (
      <>
        <text x={200} y={50} textAnchor="middle" fill={colors.subText} fontSize="11" fontWeight="bold">
          ANTERIOR VIEW (LOOKING AT PALM)
        </text>
        
        {/* Forearm (fixed) */}
        <rect x={centerX - 20} y={centerY - 100} width="40" height="100" rx="8" fill={colors.bone} opacity={0.4} />
        
        {/* Wrist joint */}
        <ellipse cx={centerX} cy={centerY} rx="25" ry="12" fill={colors.joint} />
        
        {/* Hand rotating */}
        <g transform={`rotate(${currentAngle} ${centerX} ${centerY + 40})`}>
          <rect 
            x={centerX - handWidth/2} 
            y={centerY + 10} 
            width={handWidth} 
            height={handHeight} 
            fill={colors.boneActive}
            rx="12"
          />
          {/* Thumb indicator */}
          <rect 
            x={centerX - handWidth/2 - 15} 
            y={centerY + 30} 
            width="15" 
            height="30" 
            fill={colors.muscle}
            rx="5"
          />
          {/* Palm indicator */}
          <circle cx={centerX} cy={centerY + 45} r="8" fill={colors.phaseStart} />
          <text x={centerX} y={centerY + 48} textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
            P
          </text>
        </g>
        
        {/* Rotation indicator */}
        <path
          d={describeArc(centerX, centerY + 40, 55, -90 + motion.joint.minDeg, -90 + motion.joint.maxDeg)}
          fill="none"
          stroke={colors.arc}
          strokeWidth="3"
          strokeDasharray="4 4"
          opacity={0.4}
        />
        
        <AngleDisplay x={centerX + 85} y={centerY + 40} angle={currentAngle} />
        
        <PhaseIndicator x={200} y={80} />
        
        <text x={200} y={320} textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">
          {getDirectionLabel()}
        </text>
        
        {/* Label */}
        <text x={centerX - 75} y={centerY + 100} fill={colors.subText} fontSize="10">
          Thumb = Position Reference
        </text>
      </>
    );
  };

  // ============================================================================
  // WRIST FIGURES
  // ============================================================================
  
  const renderWristFigure = () => {
    const wristX = 200;
    const wristY = 180;
    const handLen = 65;
    
    const jointId = motion.joint.id;
    
    if (jointId === 'wristFlexExt') {
      const angle = 90 + currentAngle;
      const rad = angle * Math.PI / 180;
      const handEndX = wristX + handLen * Math.cos(rad);
      const handEndY = wristY + handLen * Math.sin(rad);
      
      return (
        <>
          {/* Forearm */}
          <rect x={wristX - 20} y={wristY - 100} width="40" height="100" rx="6" fill={colors.bone} opacity={0.4} />
          
          {/* Wrist */}
          <ellipse cx={wristX} cy={wristY} rx="22" ry="10" fill={colors.joint} />
          <text x={wristX} y={wristY + 25} textAnchor="middle" fill={colors.joint} fontSize="10" fontWeight="bold">
            WRIST
          </text>
          
          {/* Hand */}
          <line x1={wristX} y1={wristY} x2={handEndX} y2={handEndY}
                stroke={colors.boneActive} strokeWidth="14" strokeLinecap="round" />
          
          {/* Fingers indicator */}
          <circle cx={handEndX} cy={handEndY} r="15" fill={colors.boneActive} opacity={0.7} />
          
          {/* Arc */}
          <ROMDisplay
            cx={wristX}
            cy={wristY}
            radius={40}
            startDeg={90}
            endDeg={90 + motion.targetDeg}
            currentDeg={angle}
          />
          
          <AngleDisplay x={wristX + 80} y={wristY - 30} angle={currentAngle} />
          
          <PhaseIndicator x={200} y={40} />
          
          <text x={200} y={320} textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">
            {getDirectionLabel()}
          </text>
        </>
      );
    }
    
    // Radial/Ulnar deviation
    const angle = 90 + currentAngle;
    const rad = angle * Math.PI / 180;
    const handEndX = wristX + handLen * Math.cos(rad);
    const handEndY = wristY + handLen * Math.sin(rad);
    
    return (
      <>
        <text x={200} y={50} textAnchor="middle" fill={colors.subText} fontSize="11" fontWeight="bold">
          POSTERIOR VIEW
        </text>
        
        {/* Forearm */}
        <rect x={wristX - 20} y={wristY - 100} width="40" height="100" rx="6" fill={colors.bone} opacity={0.4} />
        
        {/* Wrist */}
        <ellipse cx={wristX} cy={wristY} rx="22" ry="10" fill={colors.joint} />
        
        {/* Hand */}
        <line x1={wristX} y1={wristY} x2={handEndX} y2={handEndY}
              stroke={colors.boneActive} strokeWidth="14" strokeLinecap="round" />
        <circle cx={handEndX} cy={handEndY} r="15" fill={colors.boneActive} opacity={0.7} />
        
        {/* Side labels */}
        <text x={wristX - 50} y={wristY + 60} fill={colors.subText} fontSize="9">RADIAL</text>
        <text x={wristX + 30} y={wristY + 60} fill={colors.subText} fontSize="9">ULNAR</text>
        
        <AngleDisplay x={wristX + 80} y={wristY - 30} angle={currentAngle} />
        
        <PhaseIndicator x={200} y={80} />
        
        <text x={200} y={320} textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">
          {getDirectionLabel()}
        </text>
      </>
    );
  };

  // ============================================================================
  // HIP FIGURES
  // ============================================================================
  
  const renderHipFigure = () => {
    const hipX = 200;
    const hipY = 140;
    const thighLen = 95;
    const shinLen = 85;
    
    const jointId = motion.joint.id;
    
    if (jointId === 'hipFlexExt') {
      const angle = 90 + currentAngle;
      const rad = angle * Math.PI / 180;
      const kneeX = hipX + thighLen * Math.cos(rad);
      const kneeY = hipY + thighLen * Math.sin(rad);
      const footX = kneeX;
      const footY = kneeY + shinLen;
      
      return (
        <>
          {/* Pelvis/Torso */}
          <rect x={hipX - 40} y={hipY - 80} width="80" height="80" rx="8" fill={colors.bone} opacity={0.25} />
          <circle cx={hipX} cy={hipY - 60} r="20" stroke={colors.bone} strokeWidth="3" fill="none" opacity={0.4} />
          
          {/* Hip joint */}
          <circle cx={hipX} cy={hipY} r="12" fill={colors.joint} />
          <text x={hipX - 35} y={hipY + 5} fill={colors.joint} fontSize="10" fontWeight="bold">
            HIP
          </text>
          
          {/* Thigh */}
          <line x1={hipX} y1={hipY} x2={kneeX} y2={kneeY}
                stroke={colors.boneActive} strokeWidth="14" strokeLinecap="round" />
          
          {/* Knee */}
          <circle cx={kneeX} cy={kneeY} r="10" fill={colors.bone} opacity={0.6} />
          
          {/* Shin */}
          <line x1={kneeX} y1={kneeY} x2={footX} y2={footY}
                stroke={colors.boneActive} strokeWidth="12" strokeLinecap="round" opacity={0.8} />
          
          {/* Foot */}
          <ellipse cx={footX + 20} cy={footY} rx="25" ry="10" fill={colors.boneActive} opacity={0.7} />
          
          {/* ROM arc */}
          <ROMDisplay
            cx={hipX}
            cy={hipY}
            radius={thighLen * 0.5}
            startDeg={90}
            endDeg={90 + motion.targetDeg}
            currentDeg={angle}
          />
          
          <AngleDisplay x={hipX + 90} y={hipY - 40} angle={currentAngle} />
          
          <PhaseIndicator x={200} y={30} />
          
          <text x={200} y={330} textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">
            {getDirectionLabel()}
          </text>
        </>
      );
    }
    
    if (jointId === 'hipAbdAdd') {
      const angle = 90 - currentAngle;
      const rad = angle * Math.PI / 180;
      const kneeX = hipX + thighLen * Math.cos(rad);
      const kneeY = hipY + thighLen * Math.sin(rad);
      const footX = kneeX;
      const footY = kneeY + shinLen;
      
      return (
        <>
          <text x={200} y={40} textAnchor="middle" fill={colors.subText} fontSize="11" fontWeight="bold">
            ANTERIOR VIEW
          </text>
          
          {/* Pelvis */}
          <rect x={hipX - 50} y={hipY - 30} width="100" height="40" rx="8" fill={colors.bone} opacity={0.25} />
          
          {/* Other leg (reference) */}
          <line x1={hipX - 30} y1={hipY} x2={hipX - 30} y2={hipY + 150}
                stroke={colors.bone} strokeWidth="10" strokeLinecap="round" opacity={0.3} />
          
          {/* Hip */}
          <circle cx={hipX + 30} cy={hipY} r="12" fill={colors.joint} />
          
          {/* Leg */}
          <line x1={hipX + 30} y1={hipY} x2={kneeX + 30} y2={kneeY}
                stroke={colors.boneActive} strokeWidth="14" strokeLinecap="round" />
          <circle cx={kneeX + 30} cy={kneeY} r="8" fill={colors.bone} opacity={0.6} />
          <line x1={kneeX + 30} y1={kneeY} x2={footX + 30} y2={footY}
                stroke={colors.boneActive} strokeWidth="12" strokeLinecap="round" opacity={0.8} />
          
          <AngleDisplay x={hipX + 110} y={hipY + 20} angle={currentAngle} />
          
          <PhaseIndicator x={200} y={70} />
          
          <text x={200} y={330} textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">
            {getDirectionLabel()}
          </text>
        </>
      );
    }
    
    // Hip rotation - top down view
    return renderHipRotationFigure();
  };

  const renderHipRotationFigure = () => {
    const centerX = 200;
    const centerY = 180;
    const legLen = 80;
    
    const rad = currentAngle * Math.PI / 180;
    const footX = centerX + legLen * Math.cos(rad);
    const footY = centerY + legLen * Math.sin(rad);
    
    return (
      <>
        <text x={200} y={50} textAnchor="middle" fill={colors.subText} fontSize="11" fontWeight="bold">
          TOP-DOWN VIEW (KNEE FLEXED 90°)
        </text>
        
        {/* Pelvis */}
        <ellipse cx={centerX} cy={centerY - 30} rx="40" ry="25" fill={colors.bone} opacity={0.3} />
        
        {/* Thigh (pointing down) */}
        <circle cx={centerX} cy={centerY} r="20" fill={colors.bone} opacity={0.5} />
        
        {/* Lower leg rotating */}
        <line x1={centerX} y1={centerY} x2={footX} y2={footY}
              stroke={colors.boneActive} strokeWidth="10" strokeLinecap="round" />
        <circle cx={footX} cy={footY} r="12" fill={colors.boneActive} />
        
        <ROMDisplay
          cx={centerX}
          cy={centerY}
          radius={55}
          startDeg={90 + motion.joint.minDeg}
          endDeg={90 + motion.targetDeg}
          currentDeg={90 + currentAngle}
        />
        
        <AngleDisplay x={320} y={180} angle={currentAngle} />
        
        <PhaseIndicator x={200} y={80} />
        
        <text x={200} y={320} textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">
          {getDirectionLabel()}
        </text>
      </>
    );
  };

  // ============================================================================
  // KNEE FIGURE
  // ============================================================================
  
  const renderKneeFigure = () => {
    const hipX = 180;
    const hipY = 100;
    const thighLen = 95;
    
    const kneeX = hipX;
    const kneeY = hipY + thighLen;
    
    const angle = 180 - currentAngle;
    const rad = angle * Math.PI / 180;
    const shinLen = 90;
    const footX = kneeX + shinLen * Math.cos(rad);
    const footY = kneeY + shinLen * Math.sin(rad);
    
    return (
      <>
        {/* Pelvis hint */}
        <rect x={hipX - 30} y={hipY - 35} width="60" height="35" rx="6" fill={colors.bone} opacity={0.2} />
        
        {/* Hip */}
        <circle cx={hipX} cy={hipY} r="8" fill={colors.bone} opacity={0.5} />
        
        {/* Thigh (fixed) */}
        <line x1={hipX} y1={hipY} x2={kneeX} y2={kneeY}
              stroke={colors.bone} strokeWidth="14" strokeLinecap="round" opacity={0.6} />
        
        {/* Knee joint (highlighted) */}
        <circle cx={kneeX} cy={kneeY} r="14" fill={colors.joint} />
        <text x={kneeX + 25} y={kneeY + 5} fill={colors.joint} fontSize="10" fontWeight="bold">
          KNEE
        </text>
        
        {/* Shin (moving) */}
        <line x1={kneeX} y1={kneeY} x2={footX} y2={footY}
              stroke={colors.boneActive} strokeWidth="12" strokeLinecap="round" />
        
        {/* Foot */}
        <ellipse cx={footX + 20} cy={footY} rx="25" ry="10" fill={colors.boneActive} opacity={0.7} />
        
        {/* ROM arc */}
        <ROMDisplay
          cx={kneeX}
          cy={kneeY}
          radius={45}
          startDeg={180}
          endDeg={180 - motion.targetDeg}
          currentDeg={angle}
        />
        
        <AngleDisplay x={kneeX + 80} y={kneeY - 30} angle={currentAngle} />
        
        <PhaseIndicator x={200} y={40} />
        
        <text x={200} y={330} textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">
          {getDirectionLabel()}
        </text>
      </>
    );
  };

  // ============================================================================
  // ANKLE FIGURE
  // ============================================================================
  
  const renderAnkleFigure = () => {
    const ankleX = 200;
    const ankleY = 220;
    const footLen = 70;
    
    const jointId = motion.joint.id;
    
    if (jointId === 'ankleFlexExt') {
      const angle = currentAngle;
      
      return (
        <>
          {/* Shin */}
          <rect x={ankleX - 18} y={ankleY - 130} width="36" height="130" rx="6" fill={colors.bone} opacity={0.4} />
          
          {/* Ankle joint */}
          <ellipse cx={ankleX} cy={ankleY} rx="20" ry="12" fill={colors.joint} />
          <text x={ankleX} y={ankleY - 20} textAnchor="middle" fill={colors.joint} fontSize="10" fontWeight="bold">
            ANKLE
          </text>
          
          {/* Foot */}
          <g transform={`rotate(${angle} ${ankleX} ${ankleY})`}>
            <rect x={ankleX - 10} y={ankleY - 5} width={footLen} height="20" rx="6" fill={colors.boneActive} />
            <circle cx={ankleX + footLen - 15} cy={ankleY + 5} r="6" fill={colors.muscle} />
          </g>
          
          {/* ROM arc */}
          <ROMDisplay
            cx={ankleX}
            cy={ankleY}
            radius={50}
            startDeg={motion.joint.minDeg}
            endDeg={motion.joint.maxDeg}
            currentDeg={angle}
          />
          
          <AngleDisplay x={ankleX + 90} y={ankleY - 40} angle={currentAngle} />
          
          <PhaseIndicator x={200} y={50} />
          
          <text x={200} y={320} textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">
            {getDirectionLabel()}
          </text>
        </>
      );
    }
    
    // Inversion/Eversion
    return (
      <>
        <text x={200} y={50} textAnchor="middle" fill={colors.subText} fontSize="11" fontWeight="bold">
          POSTERIOR VIEW
        </text>
        
        {/* Shin */}
        <rect x={ankleX - 18} y={ankleY - 130} width="36" height="130" rx="6" fill={colors.bone} opacity={0.4} />
        
        {/* Ankle */}
        <ellipse cx={ankleX} cy={ankleY} rx="20" ry="12" fill={colors.joint} />
        
        {/* Foot tilting */}
        <g transform={`rotate(${currentAngle} ${ankleX} ${ankleY + 20})`}>
          <ellipse cx={ankleX} cy={ankleY + 20} rx="45" ry="18" fill={colors.boneActive} />
        </g>
        
        {/* Side labels */}
        <text x={ankleX - 60} y={ankleY + 50} fill={colors.subText} fontSize="9">MEDIAL</text>
        <text x={ankleX + 40} y={ankleY + 50} fill={colors.subText} fontSize="9">LATERAL</text>
        
        <AngleDisplay x={ankleX + 90} y={ankleY - 40} angle={currentAngle} />
        
        <PhaseIndicator x={200} y={80} />
        
        <text x={200} y={320} textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">
          {getDirectionLabel()}
        </text>
      </>
    );
  };

  // ============================================================================
  // SPINE FIGURE
  // ============================================================================
  
  const renderSpineFigure = () => {
    const baseX = 200;
    const baseY = 290;
    const segments = 7;
    const segmentH = 28;
    
    const jointId = motion.joint.id;
    const curveFactor = currentAngle / 15;
    
    if (jointId === 'spineFlexExt') {
      return (
        <>
          {/* Pelvis */}
          <rect x={baseX - 45} y={baseY - 10} width="90" height="35" rx="8" fill={colors.bone} opacity={0.3} />
          
          {/* Spine segments with curvature */}
          {Array.from({ length: segments }).map((_, i) => {
            const y = baseY - (i + 1) * segmentH;
            const xOffset = Math.sin((i / segments) * Math.PI) * curveFactor * 3;
            const size = 10 - i * 0.5;
            return (
              <g key={i}>
                <circle cx={baseX + xOffset} cy={y} r={size} fill={i < 3 ? colors.boneActive : colors.bone} opacity={0.9 - i * 0.05} />
                {i > 0 && (
                  <line 
                    x1={baseX + Math.sin(((i-1) / segments) * Math.PI) * curveFactor * 3} 
                    y1={baseY - i * segmentH}
                    x2={baseX + xOffset} 
                    y2={y}
                    stroke={i < 3 ? colors.boneActive : colors.bone}
                    strokeWidth="8"
                    opacity={0.85}
                  />
                )}
              </g>
            );
          })}
          
          {/* Head */}
          <circle cx={baseX + Math.sin(Math.PI) * curveFactor * 3} cy={baseY - segments * segmentH - 25} r="22" 
                  stroke={colors.bone} strokeWidth="3" fill="none" opacity={0.5} />
          
          <AngleDisplay x={baseX + 90} y={baseY - 100} angle={currentAngle} />
          
          <PhaseIndicator x={200} y={40} />
          
          <text x={200} y={340} textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">
            {getDirectionLabel()}
          </text>
        </>
      );
    }
    
    // Lateral flexion or rotation
    if (jointId.includes('Lateral')) {
      const sideOffset = currentAngle * 1.2;
      
      return (
        <>
          <text x={200} y={40} textAnchor="middle" fill={colors.subText} fontSize="11" fontWeight="bold">
            POSTERIOR VIEW
          </text>
          
          {/* Pelvis */}
          <rect x={baseX - 45} y={baseY - 10} width="90" height="35" rx="8" fill={colors.bone} opacity={0.3} />
          
          {/* Spine curving laterally */}
          {Array.from({ length: segments }).map((_, i) => {
            const y = baseY - (i + 1) * segmentH;
            const xOffset = (i / segments) * sideOffset;
            return (
              <g key={i}>
                <circle cx={baseX + xOffset} cy={y} r={9 - i * 0.4} fill={colors.boneActive} opacity={0.9} />
                {i > 0 && (
                  <line 
                    x1={baseX + ((i-1) / segments) * sideOffset} 
                    y1={baseY - i * segmentH}
                    x2={baseX + xOffset} 
                    y2={y}
                    stroke={colors.boneActive}
                    strokeWidth="7"
                  />
                )}
              </g>
            );
          })}
          
          {/* Head */}
          <circle cx={baseX + sideOffset} cy={baseY - segments * segmentH - 20} r="20" 
                  stroke={colors.bone} strokeWidth="3" fill="none" opacity={0.5} />
          
          <AngleDisplay x={baseX + 100} y={baseY - 100} angle={currentAngle} />
          
          <PhaseIndicator x={200} y={70} />
          
          <text x={200} y={340} textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">
            {getDirectionLabel()}
          </text>
        </>
      );
    }
    
    // Rotation - top down
    return (
      <>
        <text x={200} y={50} textAnchor="middle" fill={colors.subText} fontSize="11" fontWeight="bold">
          TOP-DOWN VIEW
        </text>
        
        {/* Pelvis (fixed) */}
        <ellipse cx={baseX} cy={baseY - 100} rx="50" ry="30" fill={colors.bone} opacity={0.3} />
        
        {/* Shoulders rotating */}
        <g transform={`rotate(${currentAngle} ${baseX} ${baseY - 100})`}>
          <ellipse cx={baseX} cy={baseY - 160} rx="60" ry="25" fill={colors.boneActive} opacity={0.7} />
          {/* Head */}
          <circle cx={baseX} cy={baseY - 200} r="18" stroke={colors.bone} strokeWidth="3" fill="none" />
        </g>
        
        <ROMDisplay
          cx={baseX}
          cy={baseY - 100}
          radius={70}
          startDeg={90 + motion.joint.minDeg}
          endDeg={90 + motion.targetDeg}
          currentDeg={90 + currentAngle}
        />
        
        <AngleDisplay x={320} y={baseY - 100} angle={currentAngle} />
        
        <PhaseIndicator x={200} y={80} />
        
        <text x={200} y={340} textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">
          {getDirectionLabel()}
        </text>
      </>
    );
  };

  // ============================================================================
  // SCAPULA FIGURE
  // ============================================================================
  
  const renderScapulaFigure = () => {
    const centerX = 200;
    const centerY = 180;
    const jointId = motion.joint.id;
    
    if (jointId === 'scapulaElevDep') {
      const yOffset = currentAngle * 4;
      
      return (
        <>
          <text x={200} y={50} textAnchor="middle" fill={colors.subText} fontSize="11" fontWeight="bold">
            POSTERIOR VIEW
          </text>
          
          {/* Spine reference */}
          <line x1={centerX} y1={80} x2={centerX} y2={300} stroke={colors.bone} strokeWidth="4" opacity={0.3} />
          
          {/* Scapula (moving) */}
          <g transform={`translate(0, ${yOffset})`}>
            <path
              d={`M ${centerX + 30} ${centerY - 50} 
                  L ${centerX + 70} ${centerY + 10} 
                  L ${centerX + 45} ${centerY + 50}
                  L ${centerX + 30} ${centerY + 30}
                  Z`}
              fill={colors.boneActive}
              opacity={0.8}
            />
            {/* Spine of scapula */}
            <line x1={centerX + 30} y1={centerY - 20} x2={centerX + 70} y2={centerY - 30}
                  stroke={colors.muscle} strokeWidth="4" />
          </g>
          
          {/* Movement arrows */}
          <text x={centerX + 90} y={centerY - 60} fill={colors.phaseStart} fontSize="16">↑</text>
          <text x={centerX + 90} y={centerY + 80} fill={colors.phaseEnd} fontSize="16">↓</text>
          
          <AngleDisplay x={centerX - 70} y={centerY} angle={currentAngle} />
          
          <PhaseIndicator x={200} y={80} />
          
          <text x={200} y={320} textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">
            {getDirectionLabel()}
          </text>
        </>
      );
    }
    
    if (jointId === 'scapulaProRet') {
      const xOffset = currentAngle * 4;
      
      return (
        <>
          <text x={200} y={50} textAnchor="middle" fill={colors.subText} fontSize="11" fontWeight="bold">
            SUPERIOR VIEW
          </text>
          
          {/* Spine */}
          <rect x={centerX - 5} y={centerY - 40} width="10" height="120" rx="3" fill={colors.bone} opacity={0.3} />
          
          {/* Scapula */}
          <g transform={`translate(${xOffset}, 0)`}>
            <path
              d={`M ${centerX + 30} ${centerY - 30}
                  L ${centerX + 80} ${centerY}
                  L ${centerX + 60} ${centerY + 40}
                  L ${centerX + 25} ${centerY + 20}
                  Z`}
              fill={colors.boneActive}
              opacity={0.8}
            />
          </g>
          
          <text x={centerX + 100} y={centerY} fill={colors.subText} fontSize="10">→ PROTRACTION</text>
          <text x={centerX - 60} y={centerY} fill={colors.subText} fontSize="10">← RETRACTION</text>
          
          <AngleDisplay x={centerX - 70} y={centerY - 50} angle={currentAngle} />
          
          <PhaseIndicator x={200} y={80} />
          
          <text x={200} y={320} textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">
            {getDirectionLabel()}
          </text>
        </>
      );
    }
    
    // Upward/Downward rotation
    const rotAngle = currentAngle * 0.8;
    
    return (
      <>
        <text x={200} y={50} textAnchor="middle" fill={colors.subText} fontSize="11" fontWeight="bold">
          POSTERIOR VIEW
        </text>
        
        {/* Spine */}
        <line x1={centerX} y1={80} x2={centerX} y2={300} stroke={colors.bone} strokeWidth="4" opacity={0.3} />
        
        {/* Rotating scapula */}
        <g transform={`rotate(${rotAngle} ${centerX + 50} ${centerY})`}>
          <path
            d={`M ${centerX + 30} ${centerY - 50} 
                L ${centerX + 70} ${centerY + 10} 
                L ${centerX + 45} ${centerY + 50}
                L ${centerX + 30} ${centerY + 30}
                Z`}
            fill={colors.boneActive}
            opacity={0.8}
          />
          {/* Glenoid fossa indicator */}
          <circle cx={centerX + 65} cy={centerY - 10} r="8" fill={colors.muscle} />
        </g>
        
        <ROMDisplay
          cx={centerX + 50}
          cy={centerY}
          radius={60}
          startDeg={-30 + 90}
          endDeg={motion.targetDeg * 0.8 + 90}
          currentDeg={rotAngle + 90}
        />
        
        <AngleDisplay x={centerX - 70} y={centerY} angle={currentAngle} />
        
        <PhaseIndicator x={200} y={80} />
        
        <text x={200} y={320} textAnchor="middle" fill={colors.text} fontSize="14" fontWeight="bold">
          {getDirectionLabel()}
        </text>
      </>
    );
  };

  // ============================================================================
  // GENERIC FALLBACK
  // ============================================================================
  
  const renderGenericFigure = () => {
    return (
      <>
        <circle cx={200} cy={90} r="28" stroke={colors.bone} strokeWidth="4" fill="none" opacity={0.6} />
        <line x1={200} y1={118} x2={200} y2={210} stroke={colors.bone} strokeWidth="8" strokeLinecap="round" />
        <line x1={200} y1={140} x2={150} y2={195} stroke={colors.bone} strokeWidth="6" strokeLinecap="round" />
        <line x1={200} y1={140} x2={250} y2={195} stroke={colors.bone} strokeWidth="6" strokeLinecap="round" />
        <line x1={200} y1={210} x2={165} y2={290} stroke={colors.bone} strokeWidth="7" strokeLinecap="round" />
        <line x1={200} y1={210} x2={235} y2={290} stroke={colors.bone} strokeWidth="7" strokeLinecap="round" />
        
        <PhaseIndicator x={200} y={40} />
        
        <AngleDisplay x={300} y={150} angle={currentAngle} />
        
        <text x={200} y={330} textAnchor="middle" fill={colors.text} fontSize="12" fontWeight="bold">
          {motion.displayName}
        </text>
      </>
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <svg 
        viewBox="0 0 400 360" 
        className="w-full h-full"
        style={{ maxHeight: '450px', maxWidth: '500px' }}
      >
        {/* Background */}
        <rect x="0" y="0" width="400" height="360" fill={colors.background} rx="12" />
        
        {/* Anatomical plane label */}
        <text x="200" y="350" textAnchor="middle" fill={colors.subText} fontSize="10" opacity={0.7}>
          {getPlaneLabel()}
        </text>
        
        {renderFigure()}
      </svg>
      
      {/* Info panel below */}
      <div className={`mt-4 text-center max-w-md px-4`}>
        <p className={`text-sm font-medium ${theme.text}`}>{motion.description}</p>
        <p className={`text-xs mt-1 ${theme.subText}`}>
          Range: {motion.joint.minDeg}° to {motion.joint.maxDeg}° | Duration: {motion.duration}s
        </p>
        <div className={`mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs`}>
          <div className={`p-2 rounded-lg border ${theme.border} ${theme.cardBg}`}>
            <p className="font-semibold">Start</p>
            <p className={theme.subText}>{motion.joint.neutralDeg}° neutral</p>
          </div>
          <div className={`p-2 rounded-lg border ${theme.border} ${theme.cardBg}`}>
            <p className="font-semibold">Target</p>
            <p className={theme.subText}>{motion.targetDeg}° anatomical end</p>
          </div>
          <div className={`p-2 rounded-lg border ${theme.border} ${theme.cardBg}`}>
            <p className="font-semibold">Direction</p>
            <p className={theme.subText}>{getDirectionLabel()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
