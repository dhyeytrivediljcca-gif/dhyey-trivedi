import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  ArrowUpRight, 
  ShieldCheck, 
  Cpu, 
  Code,
  Flame,
  Sparkles
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/sound';
import { setCustomCursor, resetCustomCursor } from './CustomCursor';

interface HeroProps {
  onOpenProject: (projectId: string) => void;
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenProject, onOpenResumeModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 4-Stage Cinematic Intro Sequence States:
  // Step 1: 'typing' (Name types out letter-by-letter)
  // Step 2: 'silhouette' (Shadow/silhouette of portrait emerges)
  // Step 3: 'reveal' (Portrait smoothly fades in and settles)
  // Step 4: 'settled' (Final interactive hero state)
  const [introStage, setIntroStage] = useState<'typing' | 'silhouette' | 'reveal' | 'settled'>('typing');
  
  const fullName = "DHYEY TRIVEDI";
  const [typedName, setTypedName] = useState("");

  useEffect(() => {
    let charIndex = 0;
    let step2Timer: ReturnType<typeof setTimeout>;
    let step3Timer: ReturnType<typeof setTimeout>;
    let step4Timer: ReturnType<typeof setTimeout>;

    // Safety fallback: ensure hero is fully settled after 2.2s no matter what
    const fallbackTimer = setTimeout(() => {
      setTypedName(fullName);
      setIntroStage('settled');
    }, 2200);

    // STEP 1: Typewriter Name Animation (~1s)
    const typeInterval = setInterval(() => {
      charIndex++;
      if (charIndex <= fullName.length) {
        setTypedName(fullName.slice(0, charIndex));
      } else {
        clearInterval(typeInterval);
        setTypedName(fullName);
        
        // STEP 2: Reveal shadow/silhouette after typing completes (300ms)
        step2Timer = setTimeout(() => {
          setIntroStage('silhouette');

          // STEP 3: Reveal transparent portrait (400ms)
          step3Timer = setTimeout(() => {
            setIntroStage('reveal');

            // STEP 4: Settle into permanent interactive state
            step4Timer = setTimeout(() => {
              setIntroStage('settled');
            }, 500);
          }, 400);
        }, 300);
      }
    }, 60);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(fallbackTimer);
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
      clearTimeout(step4Timer);
    };
  }, []);

  // Scroll Progress for Gentle Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax for Background Typography & Aura
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yTypography = useTransform(scrollYProgress, [0, 1], [0, -45]);

  // Desktop Mouse Parallax
  const springConfig = { damping: 28, stiffness: 120 };
  const mouseXPortrait = useSpring(0, springConfig);
  const mouseYPortrait = useSpring(0, springConfig);
  const mouseXText = useSpring(0, springConfig);
  const mouseYText = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || window.innerWidth < 768) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      mouseXPortrait.set(x * 14);
      mouseYPortrait.set(y * 14);
      mouseXText.set(x * -20);
      mouseYText.set(y * -12);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseXPortrait, mouseYPortrait, mouseXText, mouseYText]);

  const scrollToWork = () => {
    sounds.playClick();
    const workSection = document.querySelector('#work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    sounds.playClick();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const parts = typedName.split(' ');
  const firstRow = parts[0] || (typedName ? typedName : (introStage !== 'typing' ? 'DHYEY' : ''));
  const secondRow = parts.length > 1 ? parts.slice(1).join(' ') : (introStage !== 'typing' ? 'TRIVEDI' : '');
  const isTypingDone = introStage !== 'typing';

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen lg:min-h-[105vh] flex flex-col justify-between pt-20 sm:pt-24 md:pt-32 pb-8 sm:pb-12 px-3.5 sm:px-6 md:px-12 overflow-hidden select-none"
    >
      {/* 1. BACKGROUND AMBIENCE LAYER */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-circuit-grid opacity-25" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[700px] md:w-[900px] h-[350px] sm:h-[500px] bg-emerald-500/10 rounded-full blur-[120px] sm:blur-[170px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-teal-500/5 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      </motion.div>

      {/* Top Metadata HUD */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-2 sm:gap-4 font-mono text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-white/10 pb-3 sm:pb-4 relative z-20"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-[10px] sm:text-[11px] tracking-wider">SYSTEM ONLINE</span>
          </div>
          <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">|</span>
          <span className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 truncate max-w-[170px] sm:max-w-none">
            <MapPin className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
            <span>{PORTFOLIO_DATA.personal.location} ({PORTFOLIO_DATA.personal.coordinates})</span>
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] text-zinc-600 dark:text-zinc-400">
          <span className="hidden md:flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            Advanced Research and Analytics Lab (AiRA LAB)
          </span>
          <span className="hidden lg:inline text-zinc-300 dark:text-zinc-700">//</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span>{PORTFOLIO_DATA.personal.degree} • {PORTFOLIO_DATA.personal.semester}</span>
          </span>
        </div>
      </motion.div>

      {/* 2. MAIN ART-DIRECTED HERO STAGE */}
      <div className="relative max-w-7xl mx-auto w-full my-auto py-4 sm:py-6 md:py-10 flex flex-col items-center justify-center min-h-0 lg:min-h-[700px]">
        
        {/* GIANT "DHYEY TRIVEDI" TYPOGRAPHY */}
        <motion.div 
          style={{ 
            y: yTypography,
            x: mouseXText,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10 overflow-hidden"
        >
          <div className="w-full text-center">
            <h1 
              style={{ fontFamily: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif" }}
              className="font-space font-black text-[14vw] sm:text-[16vw] lg:text-[14vw] tracking-tighter text-zinc-900/40 dark:text-white/30 leading-[0.88] uppercase transition-colors select-none"
            >
              {firstRow}
              {introStage === 'typing' && parts.length <= 1 && (
                <span className="inline-block w-1.5 sm:w-2 md:w-3.5 h-8 sm:h-12 md:h-20 bg-emerald-400 animate-pulse ml-1 align-middle" />
              )}
            </h1>
          </div>
          <div className="w-full text-center">
            <h1 
              style={{ fontFamily: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif" }}
              className="font-space font-black text-[14vw] sm:text-[16vw] lg:text-[14vw] tracking-tighter text-zinc-900/30 dark:text-white/20 leading-[0.88] uppercase select-none"
            >
              {secondRow}
              {introStage === 'typing' && parts.length > 1 && (
                <span className="inline-block w-1.5 sm:w-2 md:w-3.5 h-8 sm:h-12 md:h-20 bg-emerald-400 animate-pulse ml-1 align-middle" />
              )}
            </h1>
          </div>
        </motion.div>

        {/* PROTAGONIST CENTER STAGE & EDITORIAL GRID */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full">
          
          {/* Left Column: Vision Statement & Identity */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: introStage !== 'typing' ? 1 : 0, x: introStage !== 'typing' ? 0 : -30 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-4 flex flex-col space-y-4 sm:space-y-5 order-2 lg:order-1 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-zinc-900/5 dark:bg-white/5 border border-zinc-300 dark:border-white/10 w-fit backdrop-blur-md shadow-sm">
              <Code className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-emerald-600 dark:text-emerald-300 font-bold">
                THE DEVELOPER IS THE INTERFACE
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="font-space font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-zinc-900 dark:text-white leading-[1.15] sm:leading-[1.1]">
                Tactile code, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500">
                  responsive systems
                </span> <br />
                &amp; AI products.
              </h2>
              
              <p className="text-zinc-600 dark:text-zinc-400 font-sans text-xs sm:text-base leading-relaxed max-w-md">
                BCA student at Gujarat University, Advanced Research and Analytics Lab contributor, and hackathon finalist engineering high-polish web applications, Python backends, and IoT prototypes.
              </p>
            </div>

            {/* Quick Context Chips */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-1">
              <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-[#0E121B]/80 border border-zinc-200 dark:border-white/10 backdrop-blur-md shadow-sm">
                <div className="font-mono text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400">15+</div>
                <div className="font-mono text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Activity Certificates
                </div>
              </div>
              <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-[#0E121B]/80 border border-zinc-200 dark:border-white/10 backdrop-blur-md shadow-sm">
                <div className="font-mono text-lg sm:text-xl font-bold text-teal-600 dark:text-teal-300">2nd Rank</div>
                <div className="font-mono text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  SIH Internal '26
                </div>
              </div>
            </div>

            {/* CTA Buttons - Mobile Thumb Friendly */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2 sm:pt-3 w-full">
              <button
                onClick={scrollToWork}
                onMouseEnter={() => {
                  sounds.playHover();
                  setCustomCursor('PROJECTS', 'project');
                }}
                onMouseLeave={resetCustomCursor}
                className="shimmer-btn flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-black font-mono font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-xl shadow-emerald-500/25 hover:scale-[1.02] w-full sm:w-auto cursor-pointer"
              >
                <span>EXPLORE SELECTED WORK</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={scrollToContact}
                onMouseEnter={() => {
                  sounds.playHover();
                  setCustomCursor('CONTACT', 'hover');
                }}
                onMouseLeave={resetCustomCursor}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-zinc-900/5 dark:bg-white/5 hover:bg-zinc-900/10 dark:hover:bg-white/10 border border-zinc-300 dark:border-white/15 text-zinc-900 dark:text-white font-mono text-xs tracking-wider uppercase transition-all duration-300 backdrop-blur-md w-full sm:w-auto cursor-pointer"
              >
                <span>INIT CONTACT</span>
              </button>
            </div>
          </motion.div>

          {/* Center Column: Portrait Reveal Sequence */}
          <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 relative z-30 my-2 sm:my-4 lg:my-0">
            
            {/* STEP 2: Pre-reveal Shadow / Silhouette Aura */}
            <AnimatePresence>
              {introStage === 'silhouette' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, filter: 'blur(20px)' }}
                  animate={{ opacity: 0.6, scale: 0.96, filter: 'blur(12px)' }}
                  exit={{ opacity: 0, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute w-48 sm:w-64 h-64 sm:h-80 bg-emerald-500/30 rounded-full blur-2xl pointer-events-none"
                />
              )}
            </AnimatePresence>

            {/* STEP 3 & 4: Transparent Cutout Portrait with Smooth Intro Reveal */}
            <motion.div 
              style={{
                x: mouseXPortrait,
                y: mouseYPortrait,
              }}
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={{ 
                opacity: introStage === 'typing' ? 0 : 1, 
                y: introStage === 'typing' ? 40 : 0, 
                scale: 1 
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[260px] sm:max-w-[340px] lg:max-w-[420px] aspect-[4/5] flex items-end justify-center pointer-events-none select-none overflow-visible"
            >
              {/* Backing Ambient Aura */}
              <div className="absolute bottom-4 sm:bottom-6 w-3/4 h-3/4 bg-gradient-to-t from-emerald-500/30 via-teal-500/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

              {/* Pure Transparent Cutout Image */}
              <motion.img
                src="/dhyey.png"
                alt="Dhyey Trivedi - Frontend & Software Developer"
                className="w-full h-auto max-h-[105%] object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] contrast-105"
              />

              {/* Minimal floating signature label */}
              {introStage === 'settled' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/85 dark:bg-[#0A0D15]/90 border border-zinc-300 dark:border-emerald-500/30 backdrop-blur-xl shadow-lg flex items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[10px] text-zinc-900 dark:text-zinc-200 z-30 whitespace-nowrap"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                  <span className="font-bold tracking-wider">DHYEY TRIVEDI</span>
                  <span className="text-zinc-400 dark:text-zinc-500">//</span>
                  <span className="text-emerald-600 dark:text-emerald-400">AiRA LAB</span>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Specializations & Dossier Link */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: introStage !== 'typing' ? 1 : 0, x: introStage !== 'typing' ? 0 : 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3 flex flex-col space-y-3 sm:space-y-4 order-3 text-left"
          >
            <div className="font-mono text-[11px] sm:text-xs text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              <span>CORE SPECIALIZATIONS</span>
            </div>

            {/* Specialization 1 */}
            <div 
              onClick={() => onOpenProject('habit-tracker')}
              onMouseEnter={() => sounds.playHover()}
              className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-[#0B0E17]/80 hover:bg-white dark:hover:bg-[#111522] border border-zinc-200 dark:border-white/10 hover:border-emerald-500/40 transition-all duration-300 group cursor-pointer shadow-sm"
            >
              <div className="flex items-center justify-between pb-1">
                <span className="font-mono text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-bold">[01] FRONTEND &amp; PWA</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                React, TypeScript, Tailwind CSS, tactile claymorphism UI &amp; Supabase cloud synchronization.
              </p>
            </div>

            {/* Specialization 2 */}
            <div 
              onClick={() => onOpenProject('smart-agri-yield')}
              onMouseEnter={() => sounds.playHover()}
              className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-[#0B0E17]/80 hover:bg-white dark:hover:bg-[#111522] border border-zinc-200 dark:border-white/10 hover:border-emerald-500/40 transition-all duration-300 group cursor-pointer shadow-sm"
            >
              <div className="flex items-center justify-between pb-1">
                <span className="font-mono text-[11px] sm:text-xs text-teal-600 dark:text-teal-300 font-bold">[02] PYTHON &amp; AI DATA</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-teal-500 transition-colors" />
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                Satellite NDVI telemetry pipelines, Redis architecture concepts &amp; backend data logic.
              </p>
            </div>

            {/* Specialization 3 */}
            <div 
              onClick={() => onOpenProject('project-amrit')}
              onMouseEnter={() => sounds.playHover()}
              className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-[#0B0E17]/80 hover:bg-white dark:hover:bg-[#111522] border border-zinc-200 dark:border-white/10 hover:border-emerald-500/40 transition-all duration-300 group cursor-pointer shadow-sm"
            >
              <div className="flex items-center justify-between pb-1">
                <span className="font-mono text-[11px] sm:text-xs text-cyan-600 dark:text-cyan-300 font-bold">[03] IOT &amp; AiRA LAB</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-cyan-500 transition-colors" />
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                Hardware sensor telemetry, physical-to-digital prototyping under Prof. Parth Joshi.
              </p>
            </div>

            {/* Resume Action */}
            <button
              onClick={onOpenResumeModal}
              onMouseEnter={() => {
                sounds.playHover();
                setCustomCursor('DOSSIER', 'hover');
              }}
              onMouseLeave={resetCustomCursor}
              className="w-full flex items-center justify-between p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-zinc-900/5 dark:bg-white/5 hover:bg-emerald-500/10 border border-zinc-300 dark:border-white/10 hover:border-emerald-500/40 text-[11px] sm:text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-300 transition-all group shadow-sm cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span>VERIFIED RESUME DOSSIER</span>
              </span>
              <span className="text-emerald-500 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <motion.div 
        className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] sm:text-xs text-zinc-500 pt-4 border-t border-zinc-200 dark:border-white/5 relative z-20"
      >
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="text-emerald-500 dark:text-emerald-400">01</span>
          <span>//</span>
          <span>EXPLORE DHYEY'S DIGITAL WORLD</span>
        </div>

        <button
          onClick={scrollToWork}
          className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer group"
        >
          <span className="tracking-widest uppercase text-[10px]">SCROLL TO DISCOVER</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-emerald-500 dark:text-emerald-400"
          >
            ↓
          </motion.span>
        </button>
      </motion.div>
    </section>
  );
};
