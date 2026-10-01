import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Volume2, 
  Pause, 
  Square, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Play
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/sound';
import { setCustomCursor, resetCustomCursor } from './CustomCursor';

// High-Fidelity 2.5D/3D Vector Basketball with Authentic Curved Seams & Sphere Shading
const BasketballGraphic: React.FC<{ isHovered?: boolean }> = ({ isHovered = false }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className="w-full h-full drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)] select-none pointer-events-none"
    >
      <defs>
        {/* Sphere Shading Gradient */}
        <radialGradient id="ballSphere" cx="35%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#FFA24C" />
          <stop offset="35%" stopColor="#EA580C" />
          <stop offset="72%" stopColor="#C2410C" />
          <stop offset="95%" stopColor="#9A3412" />
          <stop offset="100%" stopColor="#7C2D12" />
        </radialGradient>
        
        {/* Specular Ambient Glow */}
        <linearGradient id="ballGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
        </linearGradient>

        <filter id="ballInnerShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feComponentTransfer in="SourceAlpha">
            <feFuncA type="linear" slope="0.7"/>
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feOffset dx="-2" dy="-2"/>
          <feComposite operator="out" in2="SourceGraphic"/>
        </filter>
      </defs>

      {/* Main Spherical Body */}
      <circle cx="50" cy="50" r="47" fill="url(#ballSphere)" stroke="#7C2D12" strokeWidth="1.5" />

      {/* Authentic Curved Basketball Rib/Seam Lines */}
      {/* 1. Horizontal Equator Arc */}
      <path 
        d="M 3.5 50 Q 50 48 96.5 50" 
        stroke="#271003" 
        strokeWidth="3.2" 
        strokeLinecap="round" 
        fill="none" 
        opacity="0.9"
      />
      
      {/* 2. Vertical Meridian Arc */}
      <path 
        d="M 50 3.5 Q 52 50 50 96.5" 
        stroke="#271003" 
        strokeWidth="3.2" 
        strokeLinecap="round" 
        fill="none" 
        opacity="0.9"
      />

      {/* 3. Left Curved Seam */}
      <path 
        d="M 16 16 C 41 33, 41 67, 16 84" 
        stroke="#271003" 
        strokeWidth="3.2" 
        strokeLinecap="round" 
        fill="none" 
        opacity="0.9"
      />

      {/* 4. Right Curved Seam */}
      <path 
        d="M 84 16 C 59 33, 59 67, 84 84" 
        stroke="#271003" 
        strokeWidth="3.2" 
        strokeLinecap="round" 
        fill="none" 
        opacity="0.9"
      />

      {/* Ambient Lighting Sheen Overlay */}
      <ellipse cx="36" cy="28" rx="22" ry="14" fill="white" opacity={isHovered ? 0.28 : 0.18} />
      
      {/* Subtle Rim Edge Light */}
      <circle cx="50" cy="50" r="46.5" fill="none" stroke="url(#ballGlow)" strokeWidth="1.8" />
    </svg>
  );
};

export const HackathonBasketball: React.FC = () => {
  const milestones = PORTFOLIO_DATA.hackathonsAndJourney;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // STATE MACHINE:
  // 'ready': Ball at start position (bottom-left), button is 'SHOOT 🏀'
  // 'shooting': Ball traveling in 3D/2.5D curved arc towards hoop (button disabled)
  // 'swish': Ball entering and passing through net, net deforming/swaying
  // 'goal': Goal confirmation shown, button converted to 'NEXT HACKATHON →'
  const [shotState, setShotState] = useState<'ready' | 'shooting' | 'swish' | 'goal'>('ready');
  const [unlockedIndices, setUnlockedIndices] = useState<Set<number>>(new Set([0]));
  const [showGoalBanner, setShowGoalBanner] = useState<boolean>(false);
  const [isBallHovered, setIsBallHovered] = useState<boolean>(false);

  // Voice Synthesis States
  const [speechSupported, setSpeechSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const currentMilestone = milestones[currentIndex];
  const isLastHackathon = currentIndex === milestones.length - 1;

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      setSpeechSupported(true);
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // 1. SHOOT TRIGGER (Always scores smoothly into the hoop)
  const handleShoot = () => {
    if (shotState !== 'ready') return;

    sounds.playClick();
    setShotState('shooting');
    setShowGoalBanner(false);

    // Stop active speech if speaking
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }

    // Sound effect in flight
    setTimeout(() => {
      sounds.playHover();
    }, 280);

    // Ball reaches hoop & swishes through net (at 600ms)
    setTimeout(() => {
      setShotState('swish');
      sounds.playSuccess();
      setShowGoalBanner(true);
      setUnlockedIndices((prev) => new Set([...prev, currentIndex]));
    }, 600);

    // Ball passes through net, net settles, goal state reached (at 880ms)
    setTimeout(() => {
      setShotState('goal');
    }, 880);

    // Hide goal celebration banner after 2.4s
    setTimeout(() => {
      setShowGoalBanner(false);
    }, 2400);
  };

  // 2. NEXT HACKATHON TRIGGER (Animates basketball goal & advances to next event)
  const handleNextHackathon = () => {
    if (shotState === 'shooting' || shotState === 'swish') return;

    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }

    sounds.playClick();
    const nextIndex = (currentIndex + 1) % milestones.length;
    setCurrentIndex(nextIndex);
    
    // Animate basketball shot into basket for the next milestone
    setShotState('shooting');
    setShowGoalBanner(false);

    setTimeout(() => {
      sounds.playHover();
    }, 280);

    setTimeout(() => {
      setShotState('swish');
      sounds.playSuccess();
      setShowGoalBanner(true);
      setUnlockedIndices((prev) => new Set([...prev, nextIndex]));
    }, 600);

    setTimeout(() => {
      setShotState('goal');
    }, 880);

    setTimeout(() => {
      setShowGoalBanner(false);
    }, 2400);
  };

  // Previous Hackathon Trigger (Animates basketball goal for previous event)
  const handlePrevHackathon = () => {
    if (shotState === 'shooting' || shotState === 'swish') return;

    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }

    sounds.playClick();
    const prevIndex = (currentIndex - 1 + milestones.length) % milestones.length;
    setCurrentIndex(prevIndex);
    
    setShotState('shooting');
    setShowGoalBanner(false);

    setTimeout(() => {
      sounds.playHover();
    }, 280);

    setTimeout(() => {
      setShotState('swish');
      sounds.playSuccess();
      setShowGoalBanner(true);
      setUnlockedIndices((prev) => new Set([...prev, prevIndex]));
    }, 600);

    setTimeout(() => {
      setShotState('goal');
    }, 880);

    setTimeout(() => {
      setShowGoalBanner(false);
    }, 2400);
  };

  // Direct Index Selection (Animates basketball goal for selected event)
  const handleSelectIndex = (idx: number) => {
    if (idx === currentIndex || shotState === 'shooting' || shotState === 'swish') return;

    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }

    sounds.playClick();
    setCurrentIndex(idx);
    setShotState('shooting');
    setShowGoalBanner(false);

    setTimeout(() => {
      sounds.playHover();
    }, 280);

    setTimeout(() => {
      setShotState('swish');
      sounds.playSuccess();
      setShowGoalBanner(true);
      setUnlockedIndices((prev) => new Set([...prev, idx]));
    }, 600);

    setTimeout(() => {
      setShotState('goal');
    }, 880);

    setTimeout(() => {
      setShowGoalBanner(false);
    }, 2400);
  };

  // Voice narration using Web Speech API
  const handleToggleVoice = () => {
    if (!synthRef.current) return;

    if (isSpeaking && !isPaused) {
      synthRef.current.pause();
      setIsPaused(true);
      return;
    }

    if (isSpeaking && isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
      return;
    }

    synthRef.current.cancel();
    const textToSpeak = `${currentMilestone.title}. ${currentMilestone.roleOrPrize} by ${currentMilestone.organization}. Project: ${currentMilestone.projectOrTopic}. ${currentMilestone.description}`;
    
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    synthRef.current.speak(utterance);
  };

  const handleStopVoice = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  return (
    <section id="journey" className="relative py-24 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#06080C] dark:bg-[#06080C] light:bg-[#F4F6F9] overflow-hidden border-y border-zinc-200 dark:border-white/10 transition-colors">
      
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-circuit-grid opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-zinc-200 dark:border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span>INTERACTIVE MILESTONES // SECTION [04]</span>
            </div>

            <h2 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl text-zinc-900 dark:text-white tracking-tight uppercase">
              SHOOT THE <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500">
                HACKATHON.
              </span>
            </h2>
            
            <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm sm:text-base max-w-lg">
              Every hackathon is another shot. Click <strong>SHOOT</strong> to launch the basketball into the hoop, unlock the event dossier, and advance to the next milestone.
            </p>
          </div>

          {/* Minimal Navigation & Progress Counter */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-white dark:bg-[#0D121D] border border-zinc-200 dark:border-white/10 shadow-sm font-mono text-xs text-zinc-600 dark:text-zinc-300">
              <span className="text-emerald-500 dark:text-emerald-400 font-bold">HACKATHON {(currentIndex + 1).toString().padStart(2, '0')}</span>
              <span className="text-zinc-400 dark:text-zinc-600 mx-1.5">/</span>
              <span>{milestones.length.toString().padStart(2, '0')}</span>
            </div>

            {/* Quick Step Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevHackathon}
                aria-label="Previous hackathon"
                disabled={shotState === 'shooting' || shotState === 'swish'}
                className="p-2.5 rounded-xl bg-white dark:bg-[#0D121D] hover:bg-zinc-100 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-200 transition-all cursor-pointer shadow-sm disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextHackathon}
                aria-label="Next hackathon"
                disabled={shotState === 'shooting' || shotState === 'swish'}
                className="p-2.5 rounded-xl bg-white dark:bg-[#0D121D] hover:bg-zinc-100 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-200 transition-all cursor-pointer shadow-sm disabled:opacity-50"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Progress Indicator Bar */}
        <div className="flex items-center justify-between gap-2 py-4 overflow-x-auto no-scrollbar">
          {milestones.map((m, idx) => {
            const isActive = idx === currentIndex;
            const isUnlocked = unlockedIndices.has(idx);
            return (
              <button
                key={m.id}
                onClick={() => handleSelectIndex(idx)}
                aria-label={`Jump to milestone ${idx + 1}`}
                disabled={shotState === 'shooting' || shotState === 'swish'}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[11px] transition-all shrink-0 cursor-pointer border ${
                  isActive
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                    : isUnlocked
                    ? 'bg-white/80 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400'
                    : 'bg-zinc-100/60 dark:bg-white/[0.02] border-transparent text-zinc-400 dark:text-zinc-600 hover:text-zinc-300'
                }`}
              >
                <span>0{idx + 1}</span>
                <span className="hidden sm:inline truncate max-w-[90px]">{m.title.split(' ')[0]}</span>
                {isUnlocked && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
              </button>
            );
          })}
        </div>

        {/* 2-COLUMN LAYOUT: LEFT = BASKETBALL ARENA, RIGHT = HACKATHON DOSSIER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
          
          {/* ============================================================ */}
          {/* LEFT SIDE: MINIMAL 2.5D/3D BASKETBALL INTERACTION CARD       */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-3xl bg-white dark:bg-[#090D17] border-2 border-zinc-200 dark:border-white/10 p-6 sm:p-8 shadow-xl relative overflow-hidden min-h-[440px] sm:min-h-[480px]">
            
            {/* Subtle Minimal Court Markings */}
            <div className="absolute inset-0 pointer-events-none opacity-25 dark:opacity-20">
              <div className="absolute top-8 right-6 w-36 h-36 rounded-full border border-emerald-500/40" />
              <div className="absolute top-0 right-16 bottom-0 w-[1px] bg-dashed border-r border-zinc-300 dark:border-white/10" />
              <div className="absolute bottom-16 left-0 right-0 h-[1px] bg-zinc-200 dark:border-white/5" />
            </div>

            {/* TOP RIGHT: BASKETBALL HOOP & REACTIVE NET */}
            <div className="absolute top-8 right-8 z-20 flex flex-col items-center select-none pointer-events-none">
              
              {/* Backboard */}
              <div className="w-28 h-20 rounded-xl bg-white/95 dark:bg-zinc-900/90 border-2 border-zinc-300 dark:border-zinc-600 shadow-lg flex items-center justify-center relative">
                {/* Target Square */}
                <div className="w-12 h-9 border-2 border-orange-500/90 rounded-sm" />
                {/* Backboard Bracket Mount */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-2 bg-zinc-400 dark:bg-zinc-600 rounded-r-sm" />
              </div>

              {/* 3D Rim Assembly */}
              <motion.div 
                animate={
                  shotState === 'swish'
                    ? { y: [0, 3, -1.5, 0] }
                    : { y: 0 }
                }
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="relative -mt-3 -mr-6 flex flex-col items-center"
              >
                {/* Glowing Orange Rim */}
                <div className="w-14 h-4 rounded-full border-[3px] border-orange-500 bg-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.7)] z-30" />
                
                {/* Reactive 2D/3D Net */}
                <motion.svg
                  viewBox="0 0 40 40"
                  animate={
                    shotState === 'swish'
                      ? { 
                          scaleY: [1, 1.35, 0.9, 1],
                          skewX: [0, 5, -3, 0],
                          y: [0, 4, -1, 0]
                        }
                      : { scaleY: 1, skewX: 0, y: 0 }
                  }
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="w-10 h-10 -mt-1 origin-top text-zinc-400 dark:text-zinc-200 z-10"
                >
                  {/* Net Cords Pattern */}
                  <path 
                    d="M 4 2 L 10 36 M 12 2 L 16 36 M 20 2 L 20 36 M 28 2 L 24 36 M 36 2 L 30 36" 
                    stroke="currentColor" 
                    strokeWidth="1.6" 
                    strokeDasharray="2,2" 
                    opacity="0.85" 
                  />
                  <path 
                    d="M 6 10 Q 20 12 34 10 M 8 20 Q 20 22 32 20 M 10 30 Q 20 32 30 30" 
                    stroke="currentColor" 
                    strokeWidth="1.4" 
                    opacity="0.75" 
                    fill="none" 
                  />
                  {/* Net Bottom Loop */}
                  <ellipse cx="20" cy="36" rx="10" ry="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
                </motion.svg>
              </motion.div>
            </div>

            {/* Goal Success Banner Overlay */}
            <AnimatePresence>
              {showGoalBanner && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, y: -15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.15 }}
                  className="absolute top-6 left-6 z-40 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-black font-syne font-black text-sm sm:text-base tracking-widest shadow-2xl shadow-emerald-500/50 flex items-center gap-2 uppercase"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>SWISH! MILESTONE UNLOCKED 🏆</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ball Ground Drop Shadow in Ready State */}
            <AnimatePresence>
              {shotState === 'ready' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: isBallHovered ? 0.6 : 0.4, 
                    scale: isBallHovered ? 1.15 : 1 
                  }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  className="absolute left-[18%] top-[78%] -translate-x-1/2 -translate-y-1/2 w-14 h-4 bg-black/40 dark:bg-black/70 rounded-full blur-[3px] pointer-events-none z-10"
                />
              )}
            </AnimatePresence>

            {/* ======================================================= */}
            {/* ANIMATED 2.5D/3D BASKETBALL WITH SMOOTH DETERMINISTIC ARC */}
            {/* ======================================================= */}
            <AnimatePresence>
              {shotState !== 'goal' && (
                <motion.div
                  key={`ball-${currentIndex}`}
                  onMouseEnter={() => setIsBallHovered(true)}
                  onMouseLeave={() => setIsBallHovered(false)}
                  onClick={shotState === 'ready' ? handleShoot : undefined}
                  initial={{ 
                    left: '18%', 
                    top: '72%', 
                    opacity: 1, 
                    scale: 0.95, 
                    rotate: 0 
                  }}
                  animate={
                    shotState === 'ready'
                      ? { 
                          left: '18%', 
                          top: isBallHovered ? '68%' : '72%', 
                          opacity: 1, 
                          scale: isBallHovered ? 1.08 : 0.95, 
                          rotate: isBallHovered ? -12 : 0 
                        }
                      : shotState === 'shooting'
                      ? {
                          // Smooth 3D Curved Arc Trajectory from Left to Hoop
                          left: ['18%', '48%', '78%'],
                          top: ['72%', '12%', '26%'],
                          rotate: [0, 360, 720],
                          scale: [0.95, 1.25, 0.95],
                          opacity: 1
                        }
                      : shotState === 'swish'
                      ? {
                          // Clean descent through net into oblivion
                          left: '78%',
                          top: ['26%', '42%'],
                          rotate: 780,
                          scale: [0.95, 0.65],
                          opacity: [1, 0]
                        }
                      : { opacity: 0 }
                  }
                  transition={
                    shotState === 'ready'
                      ? { duration: 0.25, ease: 'easeOut' }
                      : shotState === 'shooting'
                      ? { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
                      : { duration: 0.28, ease: 'easeOut' }
                  }
                  className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 select-none ${
                    shotState === 'ready' ? 'cursor-pointer hover:scale-105 transition-transform' : 'pointer-events-none'
                  }`}
                >
                  <BasketballGraphic isHovered={isBallHovered} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interaction State Title & Instruction */}
            <div className="relative z-10 space-y-1 text-left">
              <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">
                STEP [01] // SHOOT TO ADVANCE
              </span>
              <h3 className="font-space font-bold text-xl sm:text-2xl text-zinc-900 dark:text-white">
                {shotState === 'goal'
                  ? 'Goal Scored! Milestone Ready.'
                  : shotState === 'shooting' || shotState === 'swish'
                  ? 'Ball in Flight...'
                  : 'Take the Shot'}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans max-w-sm">
                {shotState === 'goal'
                  ? 'Milestone unlocked on the right. Press Next Hackathon to shoot the next event.'
                  : shotState === 'shooting' || shotState === 'swish'
                  ? 'Swishing cleanly through the net...'
                  : 'Click SHOOT or click the basketball to throw it into the hoop along a smooth arc.'}
              </p>
            </div>

            {/* ======================================================= */}
            {/* BOTTOM BUTTON CONTROLS (CONVERTS TO 'NEXT HACKATHON →') */}
            {/* ======================================================= */}
            <div className="relative z-20 pt-6 mt-auto flex flex-col sm:flex-row items-center gap-3">
              
              {/* PRIMARY ACTION BUTTON: 'SHOOT 🏀' -> 'NEXT HACKATHON →' */}
              {shotState === 'goal' ? (
                <button
                  onClick={handleNextHackathon}
                  aria-label="Next hackathon"
                  onMouseEnter={() => {
                    sounds.playHover();
                    setCustomCursor('NEXT', 'hover');
                  }}
                  onMouseLeave={resetCustomCursor}
                  className="w-full shimmer-btn flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-black font-mono font-bold text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-xl shadow-emerald-500/30 hover:scale-[1.02]"
                >
                  <span>{isLastHackathon ? 'REPLAY FROM START ↺' : 'NEXT HACKATHON →'}</span>
                  {isLastHackathon ? <RotateCcw className="w-4 h-4 text-black" /> : <ArrowRight className="w-4 h-4 text-black" />}
                </button>
              ) : (
                <button
                  onClick={handleShoot}
                  disabled={shotState === 'shooting' || shotState === 'swish'}
                  aria-label="Shoot basketball"
                  onMouseEnter={() => {
                    sounds.playHover();
                    setCustomCursor('SHOOT', 'play');
                    setIsBallHovered(true);
                  }}
                  onMouseLeave={() => {
                    resetCustomCursor();
                    setIsBallHovered(false);
                  }}
                  className={`w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-mono font-bold text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-lg ${
                    shotState === 'shooting' || shotState === 'swish'
                      ? 'bg-zinc-300 dark:bg-white/10 text-zinc-500 cursor-not-allowed opacity-75'
                      : 'shimmer-btn bg-emerald-400 hover:bg-emerald-300 text-black shadow-emerald-500/30 hover:scale-[1.02]'
                  }`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{shotState === 'shooting' || shotState === 'swish' ? 'SHOOTING...' : 'SHOOT 🏀'}</span>
                </button>
              )}
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT SIDE: SELECTED HACKATHON VERIFIED DOSSIER              */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMilestone.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="bg-white dark:bg-[#0B0F19] border-2 border-zinc-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden text-left flex flex-col justify-between min-h-full"
              >
                <div>
                  {/* Top Badge & Voice Controller */}
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-white/10 gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold">
                        {currentMilestone.roleOrPrize}
                      </span>
                      <span className="font-mono text-xs text-zinc-400 font-semibold">
                        {currentMilestone.year}
                      </span>
                    </div>

                    {/* Web Speech API Narration Button */}
                    {speechSupported && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={handleToggleVoice}
                          aria-label="Listen to hackathon summary"
                          onMouseEnter={() => setCustomCursor('AUDIO', 'audio')}
                          onMouseLeave={resetCustomCursor}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer ${
                            isSpeaking
                              ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                              : 'bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-200 hover:bg-emerald-500/20 hover:text-emerald-500'
                          }`}
                        >
                          {isSpeaking && !isPaused ? (
                            <>
                              <Pause className="w-3.5 h-3.5" />
                              <span>PAUSE</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>LISTEN</span>
                            </>
                          )}
                        </button>

                        {isSpeaking && (
                          <button
                            onClick={handleStopVoice}
                            title="Stop Voice"
                            aria-label="Stop audio"
                            className="p-1.5 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors cursor-pointer"
                          >
                            <Square className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Event Title & Organization */}
                  <div className="pt-4 space-y-1">
                    <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      {currentMilestone.organization}
                    </div>
                    <h3 className="font-space font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-white">
                      {currentMilestone.title}
                    </h3>
                  </div>

                  {/* Project / Topic Card */}
                  <div className="mt-4 p-4 rounded-2xl bg-zinc-50 dark:bg-[#111726] border border-zinc-200 dark:border-white/10 space-y-1">
                    <div className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
                      PROJECT / TOPIC FOCUS
                    </div>
                    <div className="font-space font-bold text-zinc-900 dark:text-zinc-100 text-sm sm:text-base">
                      {currentMilestone.projectOrTopic}
                    </div>
                  </div>

                  {/* Verified Description */}
                  <div className="mt-4 space-y-1.5">
                    <div className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
                      PARTICIPATION &amp; RESULT HIGHLIGHT
                    </div>
                    <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {currentMilestone.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {currentMilestone.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 font-mono text-xs text-zinc-700 dark:text-zinc-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Footer with Next Hackathon Button */}
                <div className="pt-6 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="font-mono text-[11px] text-zinc-500">
                    <span>RECORD {currentIndex + 1} OF {milestones.length}</span>
                  </div>

                  <button
                    onClick={handleNextHackathon}
                    disabled={shotState === 'shooting' || shotState === 'swish'}
                    onMouseEnter={() => {
                      sounds.playHover();
                      setCustomCursor('NEXT', 'hover');
                    }}
                    onMouseLeave={resetCustomCursor}
                    aria-label="Next hackathon dossier"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 hover:text-black dark:hover:bg-emerald-400 dark:hover:text-black transition-all cursor-pointer shadow-md disabled:opacity-50"
                  >
                    <span>{isLastHackathon ? 'REPLAY FROM START' : 'NEXT HACKATHON'}</span>
                    {isLastHackathon ? <RotateCcw className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 15 Activity Certificates Verified Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-left">
            <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>OFFICIAL ACTIVITY RECORD</span>
            </div>
            <div className="font-space font-bold text-lg sm:text-xl text-zinc-900 dark:text-white">
              15 Certificates across Academic, Technical, Cultural &amp; Innovation Activities
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 font-sans">
              SIH 2026 Internal 2nd Rank, Hack Baroda Semi-Finalist, IIM Indore Finalist, AI Prompt/Contest Wins, and Zonal Mime Championships.
            </div>
          </div>

          <div className="px-5 py-2.5 rounded-full bg-emerald-400 text-black font-mono font-bold text-xs uppercase tracking-wider shrink-0 shadow-md shadow-emerald-500/20">
            VERIFIED RESUME RECORD
          </div>
        </div>

      </div>
    </section>
  );
};
