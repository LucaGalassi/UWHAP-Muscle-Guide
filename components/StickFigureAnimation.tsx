import React, { useEffect, useRef, useState } from 'react';
import { MotionDefinition } from '../services/animationService';
import { AppTheme } from '../types';
import { THEME_CONFIG } from '../constants';

interface StickFigureAnimationProps {
  motion: MotionDefinition;
  playing: boolean;
  currentTheme: AppTheme;
}

/**
 * StickFigureAnimation
 * SVG-based fallback animation system that accurately represents joint motions
 * when 3D models fail to load or for simplified visualization.
 */
export const StickFigureAnimation: React.FC<StickFigureAnimationProps> = ({
  motion,
  playing,
  currentTheme
}) => {
  const [progress, setProgress] = useState(0); // 0 to 1
  const [trail, setTrail] = useState<{x: number, y: number}[]>([]); // Motion trail
  const animFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const theme = THEME_CONFIG[currentTheme];

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
    };
  }, [playing, motion.duration]);

  // Calculate current angle based on progress
  // For one-directional motions (e.g., "abduction only"), use sawtooth wave (0→1→0 jump)
  // For bidirectional motions (e.g., "flexion/extension"), use smooth sine wave
  const isOneDirectional = motion.name.toLowerCase().includes('only') || 
                           (motion.targetDeg > motion.joint.neutralDeg && motion.joint.minDeg === motion.joint.neutralDeg) ||
                           (motion.targetDeg < motion.joint.neutralDeg && motion.joint.maxDeg === motion.joint.neutralDeg);
  
  const currentAngle = (() => {
    if (isOneDirectional) {
      // Sawtooth: go from neutral to target, then reset
      // 0→0.9: smooth motion, 0.9→1: instant reset
      if (progress < 0.9) {
        return motion.joint.neutralDeg + (motion.targetDeg - motion.joint.neutralDeg) * (progress / 0.9);
      } else {
        return motion.joint.neutralDeg; // Reset position
      }
    } else {
      // Smooth bidirectional sine wave
      return motion.joint.neutralDeg + 
        (motion.targetDeg - motion.joint.neutralDeg) * 
        Math.sin(progress * Math.PI);
    }
  })();
  
  // For one-directional: show if we're in "resetting" phase
  const isResetting = isOneDirectional && progress >= 0.9;

  // Determine figure type and render appropriate SVG
  const renderFigure = () => {
    const jointId = motion.joint.id;
    
    // UPPER BODY MOTIONS
    if (jointId.includes('shoulder')) {
      return renderShoulderFigure(currentAngle, jointId);
    }
    if (jointId === 'elbowFlexExt') {
      return renderElbowFigure(currentAngle);
    }
    if (jointId === 'forearmProSup') {
      return renderForearmFigure(currentAngle);
    }
    if (jointId.includes('wrist')) {
      return renderWristFigure(currentAngle, jointId);
    }
    
    // LOWER BODY MOTIONS
    if (jointId.includes('hip')) {
      return renderHipFigure(currentAngle, jointId);
    }
    if (jointId === 'kneeFlexExt') {
      return renderKneeFigure(currentAngle);
    }
    if (jointId.includes('ankle')) {
      return renderAnkleFigure(currentAngle, jointId);
    }
    
    // TRUNK/SPINE MOTIONS
    if (jointId.includes('spine')) {
      return renderSpineFigure(currentAngle, jointId);
    }
    
    // SCAPULA MOTIONS
    if (jointId.includes('scapula')) {
      return renderScapulaFigure(currentAngle, jointId);
    }
    
    // Default fallback
    return renderGenericFigure();
  };

  // ============================================================================
  // RENDERING FUNCTIONS FOR EACH JOINT TYPE
  // ============================================================================

  const renderShoulderFigure = (angle: number, jointId: string) => {
    const centerX = 200;
    const centerY = 150;
    const upperArmLength = 80;
    const forearmLength = 70;
    
    let armAngle = angle;
    
    if (jointId === 'shoulderFlexExt') {
      // Flexion: forward (positive), Extension: backward (negative)
      const rad = (armAngle - 90) * Math.PI / 180;
      const elbowX = centerX + upperArmLength * Math.cos(rad);
      const elbowY = centerY + upperArmLength * Math.sin(rad);
      const handX = elbowX + forearmLength * Math.cos(rad);
      const handY = elbowY + forearmLength * Math.sin(rad);
      
      return (
        <>
          {/* Torso - thicker and more visible */}
          <line x1={centerX} y1={centerY} x2={centerX} y2={centerY + 100} className="stroke-current opacity-40" strokeWidth="12" />
          <circle cx={centerX} cy={centerY - 20} r="20" className="stroke-current fill-none opacity-60" strokeWidth="4" />
          
          {/* Shoulder joint - larger */}
          <circle cx={centerX} cy={centerY} r="8" className="fill-blue-500" />
          
          {/* Upper Arm - brighter and thicker */}
          <line x1={centerX} y1={centerY} x2={elbowX} y2={elbowY} className="stroke-blue-600" strokeWidth="10" strokeLinecap="round" />
          
          {/* Elbow joint - larger */}
          <circle cx={elbowX} cy={elbowY} r="7" className="fill-blue-500" />
          
          {/* Forearm - brighter and thicker */}
          <line x1={elbowX} y1={elbowY} x2={handX} y2={handY} className="stroke-blue-500" strokeWidth="9" strokeLinecap="round" />
          
          {/* Hand - larger */}
          <circle cx={handX} cy={handY} r="9" className="fill-blue-400" />
          
          {/* Arc indicator - bigger and brighter */}
          <path
            d={describeArc(centerX, centerY, upperArmLength * 0.5, -90 + motion.joint.neutralDeg, -90 + angle)}
            fill="none"
            className="stroke-orange-500"
            strokeWidth="4"
            strokeDasharray="6 3"
          />
          
          {/* Reset indicator for one-directional motions */}
          {isResetting && isOneDirectional && (
            <>
              <path
                d={describeArc(centerX, centerY, upperArmLength * 0.6, -90 + angle, -90 + motion.joint.neutralDeg)}
                fill="none"
                className="stroke-red-500"
                strokeWidth="3"
                strokeDasharray="3 6"
                opacity="0.6"
              />
              <text x={centerX + 40} y={centerY - 60} className="fill-red-600 font-bold text-sm">↻ RESET</text>
            </>
          )}
          
          {/* Angle text label */}
          <text x={centerX + 50} y={centerY - 50} className="fill-orange-600 font-bold text-lg">{Math.round(angle)}°</text>
          
          {/* Direction label */}
          <text x={centerX - 80} y={centerY + 150} className="fill-current font-semibold text-sm">
            {angle > 90 ? 'FLEXION ↑' : 'EXTENSION ↓'}
          </text>
        </>
      );
    }
    
    if (jointId === 'shoulderAbdAdd') {
      // Abduction: lateral (positive), Adduction: toward body (negative)
      const rad = (angle) * Math.PI / 180;
      const elbowX = centerX + upperArmLength * Math.cos(rad);
      const elbowY = centerY + upperArmLength * Math.sin(rad);
      const handX = elbowX + forearmLength * Math.cos(rad);
      const handY = elbowY + forearmLength * Math.sin(rad);
      
      return (
        <>
          {/* Torso - thicker */}
          <line x1={centerX} y1={centerY} x2={centerX} y2={centerY + 100} className="stroke-current opacity-40" strokeWidth="12" />
          <circle cx={centerX} cy={centerY - 20} r="20" className="stroke-current fill-none opacity-60" strokeWidth="4" />
          
          {/* Shoulder joint - larger */}
          <circle cx={centerX} cy={centerY} r="8" className="fill-blue-500" />
          
          {/* Arm - brighter and thicker */}
          <line x1={centerX} y1={centerY} x2={elbowX} y2={elbowY} className="stroke-blue-600" strokeWidth="10" strokeLinecap="round" />
          <circle cx={elbowX} cy={elbowY} r="7" className="fill-blue-500" />
          <line x1={elbowX} y1={elbowY} x2={handX} y2={handY} className="stroke-blue-500" strokeWidth="9" strokeLinecap="round" />
          <circle cx={handX} cy={handY} r="9" className="fill-blue-400" />
          
          {/* Arc - bigger and brighter */}
          <path
            d={describeArc(centerX, centerY, upperArmLength * 0.5, 0, angle)}
            fill="none"
            className="stroke-orange-500"
            strokeWidth="4"
            strokeDasharray="6 3"
          />
          
          {/* Reset indicator for one-directional motions */}
          {isResetting && isOneDirectional && (
            <>
              {/* Dashed return arc */}
              <path
                d={describeArc(centerX, centerY, upperArmLength * 0.6, angle, 0)}
                fill="none"
                className="stroke-red-500"
                strokeWidth="3"
                strokeDasharray="3 6"
                opacity="0.6"
              />
              {/* Reset text */}
              <text x={centerX + 30} y={centerY - 30} className="fill-red-600 font-bold text-sm">↻ RESET</text>
            </>
          )}
          
          {/* Angle text */}
          <text x={centerX + 50} y={centerY + 20} className="fill-orange-600 font-bold text-lg">{Math.round(angle)}°</text>
          
          {/* Direction label */}
          <text x={centerX - 80} y={centerY + 150} className="fill-current font-semibold text-sm">
            {angle > motion.joint.neutralDeg ? 'ABDUCTION →' : '← ADDUCTION'}
          </text>
        </>
      );
    }
    
    if (jointId === 'shoulderRotation') {
      // Rotation visualization (top-down view implied)
      return renderRotationIndicator(centerX, centerY, angle, 'Shoulder Rotation');
    }
    
    return renderGenericFigure();
  };

  const renderElbowFigure = (angle: number) => {
    const shoulderX = 150;
    const shoulderY = 150;
    const upperArmLength = 80;
    const forearmLength = 70;
    
    // Elbow at fixed position
    const elbowX = shoulderX + upperArmLength;
    const elbowY = shoulderY;
    
    // Forearm angle from elbow
    const rad = (180 - angle) * Math.PI / 180;
    const handX = elbowX + forearmLength * Math.cos(rad);
    const handY = elbowY + forearmLength * Math.sin(rad);
    
    return (
      <>
        {/* Torso hint - thicker */}
        <rect x={shoulderX - 40} y={shoulderY - 20} width="30" height="80" className="fill-current opacity-20" rx="4" />
        
        {/* Shoulder joint - larger */}
        <circle cx={shoulderX} cy={shoulderY} r="8" className="fill-blue-500" />
        
        {/* Upper Arm - thicker and brighter */}
        <line x1={shoulderX} y1={shoulderY} x2={elbowX} y2={elbowY} className="stroke-blue-600" strokeWidth="10" strokeLinecap="round" />
        
        {/* Elbow Joint - larger and brighter */}
        <circle cx={elbowX} cy={elbowY} r="9" className="fill-orange-500" />
        
        {/* Forearm - thicker and brighter */}
        <line x1={elbowX} y1={elbowY} x2={handX} y2={handY} className="stroke-green-600" strokeWidth="10" strokeLinecap="round" />
        
        {/* Hand - larger */}
        <circle cx={handX} cy={handY} r="9" className="fill-green-400" />
        
        {/* Angle Arc - bigger and brighter */}
        <path
          d={describeArc(elbowX, elbowY, 40, 180, 180 - angle)}
          fill="none"
          className="stroke-orange-500"
          strokeWidth="4"
          strokeDasharray="6 3"
        />
        
        {/* Angle Text - larger */}
        <text x={elbowX + 50} y={elbowY - 15} className="fill-orange-600 font-bold text-lg">
          {Math.round(angle)}°
        </text>
      </>
    );
  };

  const renderForearmFigure = (angle: number) => {
    const centerX = 200;
    const centerY = 200;
    const handWidth = 50;
    const handHeight = 80;
    
    return (
      <>
        {/* Forearm (fixed) */}
        <rect x={centerX - 15} y={centerY - 100} width="30" height="100" className="fill-current opacity-30" rx="4" />
        
        {/* Elbow Joint */}
        <circle cx={centerX} cy={centerY - 100} r="8" className="fill-current" />
        
        {/* Hand rotating */}
        <g transform={`rotate(${angle} ${centerX} ${centerY})`}>
          <rect 
            x={centerX - handWidth/2} 
            y={centerY - handHeight/2} 
            width={handWidth} 
            height={handHeight} 
            className="stroke-current fill-current opacity-70"
            strokeWidth="2"
            rx="8"
          />
          {/* Thumb indicator */}
          <rect 
            x={centerX - handWidth/2 - 10} 
            y={centerY - 10} 
            width="10" 
            height="30" 
            className="fill-blue-500"
            rx="3"
          />
        </g>
        
        {/* Rotation arrows */}
        <text x={centerX - 80} y={centerY + 80} className="fill-current text-xs font-bold">
          {angle > 0 ? 'PRONATION' : 'SUPINATION'}
        </text>
      </>
    );
  };

  const renderWristFigure = (angle: number, jointId: string) => {
    const wristX = 200;
    const wristY = 200;
    
    if (jointId === 'wristFlexExt') {
      const rad = (90 + angle) * Math.PI / 180;
      const handLength = 60;
      const handEndX = wristX + handLength * Math.cos(rad);
      const handEndY = wristY + handLength * Math.sin(rad);
      
      return (
        <>
          {/* Forearm */}
          <rect x={wristX - 15} y={wristY - 100} width="30" height="100" className="fill-current opacity-30" rx="4" />
          
          {/* Wrist Joint */}
          <circle cx={wristX} cy={wristY} r="7" className="fill-current" />
          
          {/* Hand */}
          <line x1={wristX} y1={wristY} x2={handEndX} y2={handEndY} className="stroke-current" strokeWidth="8" strokeLinecap="round" />
          <circle cx={handEndX} cy={handEndY} r="12" className="fill-current opacity-70" />
          
          {/* Arc */}
          <path
            d={describeArc(wristX, wristY, 35, 90, 90 + angle)}
            fill="none"
            className="stroke-blue-500"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
        </>
      );
    }
    
    return renderGenericFigure();
  };

  const renderHipFigure = (angle: number, jointId: string) => {
    const hipX = 200;
    const hipY = 150;
    const thighLength = 90;
    const shinLength = 85;
    
    if (jointId === 'hipFlexExt') {
      const rad = (90 + angle) * Math.PI / 180;
      const kneeX = hipX + thighLength * Math.cos(rad);
      const kneeY = hipY + thighLength * Math.sin(rad);
      const footX = kneeX;
      const footY = kneeY + shinLength;
      
      return (
        <>
          {/* Pelvis/Torso */}
          <rect x={hipX - 25} y={hipY - 80} width="50" height="80" className="fill-current opacity-20" rx="4" />
          <circle cx={hipX} cy={hipY - 30} r="18" className="stroke-current fill-none" strokeWidth="3" />
          
          {/* Hip Joint */}
          <circle cx={hipX} cy={hipY} r="7" className="fill-current" />
          
          {/* Thigh */}
          <line x1={hipX} y1={hipY} x2={kneeX} y2={kneeY} className="stroke-current" strokeWidth="7" strokeLinecap="round" />
          
          {/* Knee */}
          <circle cx={kneeX} cy={kneeY} r="6" className="fill-current" />
          
          {/* Shin */}
          <line x1={kneeX} y1={kneeY} x2={footX} y2={footY} className="stroke-current" strokeWidth="6" strokeLinecap="round" />
          
          {/* Foot */}
          <ellipse cx={footX + 15} cy={footY} rx="20" ry="8" className="fill-current opacity-70" />
          
          {/* Arc */}
          <path
            d={describeArc(hipX, hipY, thighLength * 0.4, 90, 90 + angle)}
            fill="none"
            className="stroke-blue-500"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
        </>
      );
    }
    
    if (jointId === 'hipAbdAdd') {
      const rad = (90 - angle) * Math.PI / 180;
      const kneeX = hipX + thighLength * Math.cos(rad);
      const kneeY = hipY + thighLength * Math.sin(rad);
      const footX = kneeX;
      const footY = kneeY + shinLength;
      
      return (
        <>
          {/* Pelvis */}
          <rect x={hipX - 25} y={hipY - 80} width="50" height="80" className="fill-current opacity-20" rx="4" />
          
          {/* Hip */}
          <circle cx={hipX} cy={hipY} r="7" className="fill-current" />
          
          {/* Leg */}
          <line x1={hipX} y1={hipY} x2={kneeX} y2={kneeY} className="stroke-current" strokeWidth="7" strokeLinecap="round" />
          <circle cx={kneeX} cy={kneeY} r="6" className="fill-current" />
          <line x1={kneeX} y1={kneeY} x2={footX} y2={footY} className="stroke-current" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx={footX + 15} cy={footY} rx="20" ry="8" className="fill-current opacity-70" />
          
          {/* Arc */}
          <path
            d={describeArc(hipX, hipY, thighLength * 0.4, 90 - angle, 90)}
            fill="none"
            className="stroke-blue-500"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
        </>
      );
    }
    
    return renderGenericFigure();
  };

  const renderKneeFigure = (angle: number) => {
    const hipX = 200;
    const hipY = 100;
    const thighLength = 90;
    
    const kneeX = hipX;
    const kneeY = hipY + thighLength;
    
    const rad = (180 - angle) * Math.PI / 180;
    const shinLength = 85;
    const footX = kneeX + shinLength * Math.cos(rad);
    const footY = kneeY + shinLength * Math.sin(rad);
    
    return (
      <>
        {/* Pelvis hint */}
        <rect x={hipX - 25} y={hipY - 40} width="50" height="40" className="fill-current opacity-20" rx="4" />
        
        {/* Hip */}
        <circle cx={hipX} cy={hipY} r="6" className="fill-current" />
        
        {/* Thigh */}
        <line x1={hipX} y1={hipY} x2={kneeX} y2={kneeY} className="stroke-current" strokeWidth="7" strokeLinecap="round" />
        
        {/* Knee Joint */}
        <circle cx={kneeX} cy={kneeY} r="7" className="fill-current" />
        
        {/* Shin */}
        <line x1={kneeX} y1={kneeY} x2={footX} y2={footY} className="stroke-current" strokeWidth="6" strokeLinecap="round" />
        
        {/* Foot */}
        <ellipse cx={footX + 15} cy={footY} rx="20" ry="8" className="fill-current opacity-70" />
        
        {/* Angle Arc */}
        <path
          d={describeArc(kneeX, kneeY, 35, 180, 180 - angle)}
          fill="none"
          className="stroke-blue-500"
          strokeWidth="2"
          strokeDasharray="4 2"
        />
        
        <text x={kneeX + 45} y={kneeY - 10} className="fill-current text-xs font-mono">
          {Math.round(angle)}°
        </text>
      </>
    );
  };

  const renderAnkleFigure = (angle: number, jointId: string) => {
    const ankleX = 200;
    const ankleY = 250;
    
    if (jointId === 'ankleFlexExt') {
      const footAngle = angle;
      const footLength = 60;
      
      return (
        <>
          {/* Shin */}
          <rect x={ankleX - 12} y={ankleY - 120} width="24" height="120" className="fill-current opacity-30" rx="4" />
          
          {/* Ankle Joint */}
          <circle cx={ankleX} cy={ankleY} r="7" className="fill-current" />
          
          {/* Foot */}
          <g transform={`rotate(${footAngle} ${ankleX} ${ankleY})`}>
            <ellipse cx={ankleX + footLength/2} cy={ankleY} rx={footLength/2} ry="15" className="fill-current opacity-70" />
            <circle cx={ankleX + footLength - 10} cy={ankleY} r="4" className="fill-blue-500" />
          </g>
          
          {/* Arc */}
          <path
            d={describeArc(ankleX, ankleY, 40, 0, footAngle)}
            fill="none"
            className="stroke-blue-500"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
          
          <text x={ankleX - 80} y={ankleY + 50} className="fill-current text-xs font-bold">
            {footAngle > 0 ? 'DORSIFLEXION' : 'PLANTARFLEXION'}
          </text>
        </>
      );
    }
    
    return renderGenericFigure();
  };

  const renderSpineFigure = (angle: number, jointId: string) => {
    const baseX = 200;
    const baseY = 300;
    const segments = 6;
    const segmentHeight = 25;
    
    if (jointId === 'spineFlexExt') {
      // Flexion/Extension visualization
      const curvature = angle / 10; // Scale for visual effect
      
      return (
        <>
          {/* Pelvis */}
          <rect x={baseX - 30} y={baseY} width="60" height="30" className="fill-current opacity-30" rx="4" />
          
          {/* Spine segments */}
          {Array.from({ length: segments }).map((_, i) => {
            const y = baseY - (i + 1) * segmentHeight;
            const xOffset = Math.sin((i / segments) * Math.PI) * curvature;
            return (
              <g key={i}>
                <circle cx={baseX + xOffset} cy={y} r="8" className="fill-current" />
                {i > 0 && (
                  <line 
                    x1={baseX + Math.sin(((i-1) / segments) * Math.PI) * curvature} 
                    y1={baseY - i * segmentHeight}
                    x2={baseX + xOffset} 
                    y2={y}
                    className="stroke-current"
                    strokeWidth="6"
                  />
                )}
              </g>
            );
          })}
          
          {/* Head */}
          <circle cx={baseX} cy={baseY - segments * segmentHeight - 25} r="20" className="stroke-current fill-none" strokeWidth="3" />
          
          <text x={baseX + 50} y={baseY - 70} className="fill-current text-xs font-bold">
            {angle > 0 ? 'FLEXION' : 'EXTENSION'}
          </text>
        </>
      );
    }
    
    if (jointId.includes('Lateral')) {
      // Lateral flexion
      return renderSpineLateralFlex(angle, baseX, baseY);
    }
    
    return renderGenericFigure();
  };

  const renderSpineLateralFlex = (angle: number, baseX: number, baseY: number) => {
    const segments = 6;
    const segmentHeight = 25;
    const curvature = angle * 0.8;
    
    return (
      <>
        {/* Pelvis */}
        <rect x={baseX - 30} y={baseY} width="60" height="30" className="fill-current opacity-30" rx="4" />
        
        {/* Spine curve */}
        {Array.from({ length: segments }).map((_, i) => {
          const y = baseY - (i + 1) * segmentHeight;
          const xOffset = (i / segments) * curvature;
          return (
            <g key={i}>
              <circle cx={baseX + xOffset} cy={y} r="7" className="fill-current" />
              {i > 0 && (
                <line 
                  x1={baseX + ((i-1) / segments) * curvature} 
                  y1={baseY - i * segmentHeight}
                  x2={baseX + xOffset} 
                  y2={y}
                  className="stroke-current"
                  strokeWidth="5"
                />
              )}
            </g>
          );
        })}
        
        {/* Head */}
        <circle cx={baseX + curvature} cy={baseY - segments * segmentHeight - 20} r="18" className="stroke-current fill-none" strokeWidth="3" />
      </>
    );
  };

  const renderScapulaFigure = (angle: number, jointId: string) => {
    const centerX = 200;
    const centerY = 150;
    
    if (jointId === 'scapulaElevDep') {
      // Elevation/Depression (vertical movement)
      const yOffset = angle * 3; // Scale for visibility
      
      return (
        <>
          {/* Spine/torso reference */}
          <line x1={centerX} y1={50} x2={centerX} y2={300} className="stroke-current opacity-20" strokeWidth="4" />
          
          {/* Scapula (triangle shape) */}
          <g transform={`translate(0, ${yOffset})`}>
            <path
              d={`M ${centerX + 40} ${centerY - 30} L ${centerX + 70} ${centerY + 20} L ${centerX + 40} ${centerY + 40} Z`}
              className="fill-current opacity-60 stroke-current"
              strokeWidth="2"
            />
            <circle cx={centerX + 40} cy={centerY} r="5" className="fill-blue-500" />
          </g>
          
          <text x={centerX - 60} y={centerY + 80} className="fill-current text-xs font-bold">
            {angle > 0 ? 'ELEVATION' : 'DEPRESSION'}
          </text>
        </>
      );
    }
    
    if (jointId === 'scapulaProRet') {
      // Protraction/Retraction (horizontal)
      const xOffset = angle * 3;
      
      return (
        <>
          {/* Spine reference */}
          <line x1={centerX} y1={50} x2={centerX} y2={300} className="stroke-current opacity-20" strokeWidth="4" />
          
          {/* Scapula */}
          <g transform={`translate(${xOffset}, 0)`}>
            <path
              d={`M ${centerX + 40} ${centerY - 30} L ${centerX + 70} ${centerY + 20} L ${centerX + 40} ${centerY + 40} Z`}
              className="fill-current opacity-60 stroke-current"
              strokeWidth="2"
            />
          </g>
          
          {/* Arrow indicator */}
          <path
            d={`M ${centerX + 20} ${centerY} L ${centerX + 20 + xOffset} ${centerY}`}
            className="stroke-blue-500"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          
          <text x={centerX - 70} y={centerY + 80} className="fill-current text-xs font-bold">
            {angle > 0 ? 'PROTRACTION' : 'RETRACTION'}
          </text>
        </>
      );
    }
    
    return renderGenericFigure();
  };

  const renderRotationIndicator = (x: number, y: number, angle: number, label: string) => {
    return (
      <>
        {/* Top-down view circle */}
        <circle cx={x} cy={y} r="60" className="stroke-current fill-none" strokeWidth="2" strokeDasharray="5 5" />
        
        {/* Rotating indicator */}
        <g transform={`rotate(${angle} ${x} ${y})`}>
          <line x1={x} y1={y} x2={x + 55} y2={y} className="stroke-blue-500" strokeWidth="4" markerEnd="url(#arrowhead)" />
          <circle cx={x + 55} cy={y} r="8" className="fill-blue-500" />
        </g>
        
        {/* Center point */}
        <circle cx={x} cy={y} r="8" className="fill-current" />
        
        {/* Angle text */}
        <text x={x - 30} y={y + 90} className="fill-current text-xs font-bold text-center">
          {label}
        </text>
        <text x={x - 20} y={y + 105} className="fill-current text-sm font-mono">
          {Math.round(angle)}°
        </text>
      </>
    );
  };

  const renderGenericFigure = () => {
    // Fallback generic figure
    return (
      <>
        <circle cx={200} cy={80} r="25" className="stroke-current fill-none" strokeWidth="3" />
        <line x1={200} y1={105} x2={200} y2={200} className="stroke-current" strokeWidth="6" />
        <line x1={200} y1={130} x2={150} y2={180} className="stroke-current" strokeWidth="5" />
        <line x1={200} y1={130} x2={250} y2={180} className="stroke-current" strokeWidth="5" />
        <line x1={200} y1={200} x2={170} y2={280} className="stroke-current" strokeWidth="6" />
        <line x1={200} y1={200} x2={230} y2={280} className="stroke-current" strokeWidth="6" />
        
        <text x={200} y={320} textAnchor="middle" className="fill-current text-xs opacity-60">
          Generic Motion Representation
        </text>
      </>
    );
  };

  // Helper function to describe SVG arc path
  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    
    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg 
        viewBox="0 0 400 350" 
        className={`w-full h-full ${theme.text}`}
        style={{ maxHeight: '400px' }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            className="fill-blue-500"
          >
            <polygon points="0 0, 10 3, 0 6" />
          </marker>
        </defs>
        
        {renderFigure()}
        
        {/* Motion label */}
        <text x="200" y="30" textAnchor="middle" className="fill-current text-sm font-bold">
          {motion.displayName}
        </text>
      </svg>
      
      {/* Description below */}
      <div className={`absolute bottom-4 left-4 right-4 text-center text-xs ${theme.subText}`}>
        {motion.description}
      </div>
    </div>
  );
};
