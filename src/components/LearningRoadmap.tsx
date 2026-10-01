import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/sound';

export const LearningRoadmap: React.FC = () => {
  const roadmap = PORTFOLIO_DATA.learningRoadmap;

  return (
    <section id="roadmap" className="relative py-28 px-4 sm:px-6 md:px-12 bg-zinc-50 dark:bg-[#06080C] overflow-hidden transition-colors duration-400">
      
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="pb-16 border-b border-zinc-200 dark:border-white/10 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <span>SECTION [06] // FUTURISTIC ROADMAP</span>
          </div>

          <h2 className="font-syne font-extrabold text-4xl sm:text-5xl md:text-6xl text-zinc-900 dark:text-white tracking-tight uppercase">
            CURRENTLY <br className="hidden sm:inline" />
            <span className="text-outline-strong text-zinc-900 dark:text-white hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
              LEARNING.
            </span>
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm sm:text-base max-w-xl">
            A real-time roadmap of engineering frontiers, research expansions, and technical architectures.
          </p>
        </div>

        {/* 4 Phase Cards: NOW -> NEXT -> EXPLORING -> BUILDING */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {roadmap.map((item, idx) => (
            <motion.div
              key={item.phase}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onMouseEnter={() => sounds.playHover()}
              className="relative p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0A0E17]/90 hover:bg-white dark:hover:bg-[#0E1422] border border-zinc-200 dark:border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group space-y-6 shadow-md"
            >
              {/* Phase Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span 
                    className="px-3 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-widest shadow-sm"
                    style={{ 
                      backgroundColor: `${item.color}15`, 
                      color: item.color,
                      borderColor: `${item.color}40`,
                      borderWidth: '1px'
                    }}
                  >
                    {item.phase}
                  </span>

                  <span className="font-mono text-[10px] text-zinc-400 uppercase font-semibold">
                    0{idx + 1}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-space font-bold text-xl text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                    {item.focus}
                  </p>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="pt-4 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between font-mono text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <span 
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.status}</span>
                </span>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
