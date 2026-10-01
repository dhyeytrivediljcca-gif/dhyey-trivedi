import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Users, Palette } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/sound';

export const BeyondTheCode: React.FC = () => {
  const items = PORTFOLIO_DATA.beyondCode;

  const icons = [Trophy, Users, Palette];

  return (
    <section className="relative py-20 px-4 sm:px-6 md:px-12 bg-white dark:bg-[#07090D] overflow-hidden transition-colors duration-400">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="pb-10 border-b border-zinc-200 dark:border-white/10 space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>SECTION [07] // CULTURAL &amp; CREATIVE DIMENSION</span>
          </div>

          <h2 className="font-syne font-bold text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight uppercase">
            BEYOND THE <span className="text-emerald-500 dark:text-emerald-400">CODE.</span>
          </h2>
        </div>

        {/* 3 Lightweight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {items.map((item, idx) => {
            const Icon = icons[idx] || Sparkles;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => sounds.playHover()}
                className="p-6 rounded-2xl bg-zinc-50 dark:bg-[#0B0E16]/70 border border-zinc-200 dark:border-white/5 hover:border-emerald-500/30 transition-all duration-300 space-y-3 group shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-zinc-200 dark:bg-white/5 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-200 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 font-mono text-[10px] border border-zinc-300 dark:border-white/10">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-space font-bold text-lg text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                    {item.subtitle}
                  </div>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 font-sans text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
