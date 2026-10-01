import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Layers, 
  Palette, 
  FlaskConical, 
  Terminal, 
  Sparkles 
} from 'lucide-react';
import { PORTFOLIO_DATA, TechSkill } from '../data/portfolioData';
import { sounds } from '../utils/sound';

export const TechConstellation: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'CODE' | 'BUILD' | 'DESIGN' | 'EXPERIMENT'>('CODE');
  const [hoveredSkill, setHoveredSkill] = useState<TechSkill>(PORTFOLIO_DATA.techSkills[0]);

  const categories = [
    { key: 'CODE', label: 'CODE', icon: Code2, desc: 'Languages & Core Computation' },
    { key: 'BUILD', label: 'BUILD', icon: Layers, desc: 'Frameworks, PWAs & Frontend Systems' },
    { key: 'DESIGN', label: 'DESIGN', icon: Palette, desc: 'UI Systems, Claymorphism & Layouts' },
    { key: 'EXPERIMENT', label: 'EXPERIMENT', icon: FlaskConical, desc: 'AI Workflows, Cloud & Dev Ecosystem' },
  ] as const;

  const currentSkills = PORTFOLIO_DATA.techSkills.filter(s => s.category === activeCategory);

  return (
    <section id="tech" className="relative py-28 px-4 sm:px-6 md:px-12 bg-zinc-50 dark:bg-[#06080C] overflow-hidden transition-colors duration-400">
      
      {/* Background Constellation Mesh */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="pb-16 border-b border-zinc-200 dark:border-white/10 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <span>SECTION [02] // INTERACTIVE CONSTELLATION</span>
          </div>

          <h2 className="font-syne font-extrabold text-4xl sm:text-5xl md:text-6xl text-zinc-900 dark:text-white tracking-tight uppercase">
            THE TECH <br className="hidden sm:inline" />
            <span className="text-outline-strong text-zinc-900 dark:text-white hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
              CONSTELLATION.
            </span>
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm sm:text-base max-w-xl">
            A dynamic network of verified technologies mapped across four operational domains.
          </p>
        </div>

        {/* 4 Core Concept Nodes Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  sounds.playClick();
                  setActiveCategory(cat.key);
                  const firstInCat = PORTFOLIO_DATA.techSkills.find(s => s.category === cat.key);
                  if (firstInCat) setHoveredSkill(firstInCat);
                }}
                onMouseEnter={() => sounds.playHover()}
                className={`relative p-5 rounded-2xl border text-left transition-all duration-300 group shadow-sm ${
                  isActive
                    ? 'bg-white dark:bg-[#101624] border-emerald-500 dark:border-emerald-400/50 shadow-xl shadow-emerald-500/10'
                    : 'bg-white/80 dark:bg-[#0A0D15]/80 border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 hover:bg-white dark:hover:bg-[#0E121D]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePillarGlow"
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_#00f59b]"
                  />
                )}

                <div className="flex items-center justify-between pb-3">
                  <span className={`font-mono text-xs font-bold ${isActive ? 'text-emerald-500 dark:text-emerald-400' : 'text-zinc-400 dark:text-zinc-500'}`}>
                    0{categories.findIndex(c => c.key === cat.key) + 1}
                  </span>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-500 dark:text-emerald-400' : 'text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300'}`} />
                </div>

                <div className="font-space font-bold text-lg sm:text-xl text-zinc-900 dark:text-white">
                  {cat.label}
                </div>
                <div className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">
                  {cat.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Constellation Orbit Stage & Real-Time Skill Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
          
          {/* Interactive Nodes Area */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0B0E17]/90 border border-zinc-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 relative min-h-[380px] flex flex-col justify-between shadow-lg">
            <div className="flex items-center justify-between font-mono text-xs text-zinc-500 pb-4 border-b border-zinc-100 dark:border-white/5">
              <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ACTIVE NODES // {activeCategory}</span>
              </span>
              <span>{currentSkills.length} Verified Modules</span>
            </div>

            {/* Orbiting / Floating Interactive Technology Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-auto py-6">
              {currentSkills.map((skill) => {
                const isSelected = hoveredSkill.name === skill.name;
                return (
                  <motion.button
                    key={skill.name}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      sounds.playClick();
                      setHoveredSkill(skill);
                    }}
                    onMouseEnter={() => {
                      sounds.playHover();
                      setHoveredSkill(skill);
                    }}
                    className={`p-4 rounded-2xl border text-left font-mono transition-all duration-300 flex flex-col justify-between min-h-[100px] ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500 dark:border-emerald-400/60 shadow-lg shadow-emerald-500/20 text-zinc-900 dark:text-white'
                        : 'bg-zinc-50 dark:bg-[#121724]/80 border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{skill.level}</span>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />}
                    </div>
                    <div className="font-space font-bold text-base text-zinc-900 dark:text-white mt-2">
                      {skill.name}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-white/5 font-mono text-[11px] text-zinc-500 flex items-center justify-between">
              <span>HOVER / CLICK TO INSPECT CONTEXT</span>
              <span className="text-emerald-600 dark:text-emerald-400">SOURCE: VERIFIED RESUME</span>
            </div>
          </div>

          {/* Right Column: Dynamic Deep Inspector Dossier */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredSkill.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-[#0E1320] border-2 border-zinc-200 dark:border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden"
              >
                {/* Scanline overlay */}
                <div className="absolute inset-0 bg-circuit-grid opacity-20 pointer-events-none" />

                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-4 relative z-10">
                  <div className="flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400">
                    <Terminal className="w-4 h-4" />
                    <span>NODE INSPECTOR</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-white/10 font-mono text-[10px] text-zinc-700 dark:text-zinc-300 uppercase">
                    {hoveredSkill.category}
                  </span>
                </div>

                <div className="space-y-1 relative z-10">
                  <div className="font-space font-bold text-3xl text-zinc-900 dark:text-white">
                    {hoveredSkill.name}
                  </div>
                  <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                    Proficiency: {hoveredSkill.level}
                  </div>
                </div>

                <div className="space-y-2 relative z-10">
                  <div className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    TECHNICAL CONTEXT &amp; APPLICATION
                  </div>
                  <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {hoveredSkill.description}
                  </p>
                </div>

                <div className="space-y-2.5 relative z-10 pt-2 border-t border-zinc-200 dark:border-white/10">
                  <div className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    APPLIED IN PORTFOLIO PROJECTS
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {hoveredSkill.projectsUsedIn.map((proj) => (
                      <span
                        key={proj}
                        className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 font-mono text-xs text-emerald-600 dark:text-emerald-300"
                      >
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
