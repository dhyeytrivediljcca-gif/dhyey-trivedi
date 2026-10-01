import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  Terminal, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  Database, 
  Flame, 
  Plus, 
  Activity,
  Calendar,
  Share2,
  Sliders
} from 'lucide-react';
import { Project } from '../data/portfolioData';
import { sounds } from '../utils/sound';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Interactive Simulator States
  // 1. Habit Tracker State
  const [habitStreak, setHabitStreak] = useState(14);
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [habitsList, setHabitsList] = useState([
    { name: 'Daily LeetCode & DSA', done: true },
    { name: 'Frontend Component Architecture', done: true },
    { name: 'AiRA LAB Research & IoT Review', done: false },
    { name: 'Python Async Pipelines', done: false },
  ]);

  // 2. SpendSnap State
  const [activeTimeframe, setActiveTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 3. Smart Agri Yield State
  const [ndviValue, setNdviValue] = useState(0.78);
  const [cropType, setCropType] = useState('Wheat / Grain');

  // 4. Campus360 State
  const [tickets, setTickets] = useState([
    { id: 'TKT-892', title: 'Lab 4 Projector Calibration', status: 'RESOLVED', dept: 'IT Systems' },
    { id: 'TKT-893', title: 'Campus Hackathon Auditorium Booking', status: 'IN_REVIEW', dept: 'Student Affairs' },
    { id: 'TKT-894', title: 'Library Digital Card Re-issue', status: 'OPEN', dept: 'Administration' },
  ]);

  // 5. Project Amrit IoT State
  const [sensorReading, setSensorReading] = useState(42.5);
  const [telemetryActive, setTelemetryActive] = useState(true);

  if (!project) return null;

  const handleToggleHabit = (index: number) => {
    sounds.playClick();
    const updated = [...habitsList];
    updated[index].done = !updated[index].done;
    setHabitsList(updated);
    
    if (updated.every(h => h.done)) {
      setCheckedInToday(true);
      setHabitStreak(prev => prev + 1);
      sounds.playSuccess();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0A0D15] border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black z-10 p-4 sm:p-8 md:p-10 text-white"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-white/10 gap-2">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] sm:text-xs font-semibold">
                {project.category}
              </span>
              <span className="font-mono text-[11px] sm:text-xs text-zinc-500">{project.year}</span>
              {project.badge && (
                <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 font-mono text-[10px] border border-teal-500/20 hidden sm:inline">
                  {project.badge}
                </span>
              )}
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              aria-label="Close modal"
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title and Tagline */}
          <div className="py-4 sm:py-6 space-y-2">
            <h2 className="font-space font-bold text-2xl sm:text-3xl md:text-4xl text-white">
              {project.title}
            </h2>
            <p className="text-emerald-400 font-mono text-xs sm:text-base">
              {project.tagline}
            </p>
          </div>

          {/* Interactive Prototype Simulator Window */}
          <div className="my-6 p-6 rounded-2xl bg-[#0F131E] border border-white/10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs text-zinc-400">
              <span className="flex items-center gap-2 text-emerald-400">
                <Terminal className="w-4 h-4" />
                <span>LIVE SYSTEM PROTOTYPE SIMULATOR</span>
              </span>
              <span className="text-[10px] uppercase text-zinc-500">Interactive Preview</span>
            </div>

            {/* 1. Habit Tracker Claymorphic Simulator */}
            {project.interactiveType === 'habits' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-[#141A29] border border-emerald-500/30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)]">
                    <div className="font-mono text-xs text-zinc-400">CURRENT STREAK</div>
                    <div className="font-mono text-3xl font-black text-emerald-400 flex items-center gap-1.5 mt-1">
                      <Flame className="w-6 h-6 text-orange-400 fill-orange-400" />
                      {habitStreak} Days
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#141A29] border border-white/10">
                    <div className="font-mono text-xs text-zinc-400">COMPLETION RATE</div>
                    <div className="font-mono text-3xl font-black text-teal-300 mt-1">
                      {Math.round((habitsList.filter(h => h.done).length / habitsList.length) * 100)}%
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#141A29] border border-white/10">
                    <div className="font-mono text-xs text-zinc-400">CLOUD SYNC</div>
                    <div className="font-mono text-sm font-semibold text-emerald-400 mt-2 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Supabase Live</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#090C12] border border-white/10 space-y-2.5">
                  <div className="font-mono text-xs text-zinc-400 flex items-center justify-between mb-3">
                    <span>DAILY HABIT MATRIX (CLICK TO TEST)</span>
                    <span className="text-[10px] text-emerald-400">Claymorphism UI Active</span>
                  </div>

                  {habitsList.map((habit, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleToggleHabit(idx)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl font-mono text-xs transition-all ${
                        habit.done
                          ? 'bg-emerald-500/15 border border-emerald-500/40 text-white shadow-[0_4px_12px_rgba(0,245,155,0.1)]'
                          : 'bg-[#121622] border border-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                          habit.done ? 'bg-emerald-400 text-black font-bold' : 'border border-zinc-600'
                        }`}>
                          {habit.done ? '✓' : ''}
                        </span>
                        <span>{habit.name}</span>
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        {habit.done ? 'COMPLETED' : 'PENDING'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. SpendSnap Expense Simulator */}
            {project.interactiveType === 'expenses' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex gap-2">
                    {(['daily', 'weekly', 'monthly'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          sounds.playClick();
                          setActiveTimeframe(t);
                        }}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs uppercase transition-all ${
                          activeTimeframe === t
                            ? 'bg-cyan-500 text-black font-bold'
                            : 'bg-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <div className="font-mono text-xs text-zinc-400">
                    <span>Export Pipeline: </span>
                    <span className="text-cyan-400 font-semibold">CSV / JSON Enabled</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#131926] border border-cyan-500/30">
                    <div className="font-mono text-xs text-zinc-400">TOTAL EXPENDITURE</div>
                    <div className="font-mono text-2xl font-bold text-white mt-1">₹ 24,850</div>
                    <div className="text-[11px] text-zinc-400 mt-1">Essential Categories: Food, Cloud, Hardware</div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#131926] border border-emerald-500/30">
                    <div className="font-mono text-xs text-zinc-400">INVESTMENT ALLOCATION</div>
                    <div className="font-mono text-2xl font-bold text-emerald-400 mt-1">₹ 45,000</div>
                    <div className="text-[11px] text-zinc-400 mt-1">SIPs, Equity &amp; Tech Development Funds</div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Smart Agri Yield Simulator */}
            {project.interactiveType === 'agriculture' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-300">NDVI SATELLITE SPECTRUM INDEX</span>
                  <span className="font-mono text-xs text-lime-400 font-bold">{ndviValue.toFixed(2)} (High Vigor)</span>
                </div>

                <input
                  type="range"
                  min="0.2"
                  max="0.95"
                  step="0.01"
                  value={ndviValue}
                  onChange={(e) => {
                    sounds.playHover();
                    setNdviValue(parseFloat(e.target.value));
                  }}
                  className="w-full accent-lime-400 cursor-pointer"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-[#141A25] border border-lime-500/20">
                    <div className="text-zinc-500 text-[10px]">PREDICTED YIELD</div>
                    <div className="text-lime-300 font-bold text-base mt-1">
                      {(ndviValue * 4.8).toFixed(1)} Tons / Hectare
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#141A25] border border-white/10">
                    <div className="text-zinc-500 text-[10px]">CACHE LAYER</div>
                    <div className="text-white font-bold text-base mt-1">Redis In-Memory</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#141A25] border border-white/10">
                    <div className="text-zinc-500 text-[10px]">HACKATHON CONTEXT</div>
                    <div className="text-white font-bold text-base mt-1">SIH 2025 Architecture</div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Campus360 Simulator */}
            {project.interactiveType === 'campus' && (
              <div className="space-y-3">
                <div className="font-mono text-xs text-zinc-400 flex items-center justify-between pb-2 border-b border-white/5">
                  <span>CAMPUS STUDENT SERVICES &amp; TICKETING</span>
                  <span className="text-pink-400">Active SQL Database Mock</span>
                </div>

                {tickets.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 rounded-xl bg-[#141926] border border-white/10 flex items-center justify-between font-mono text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-500">{t.id}</span>
                      <span className="text-white font-sans text-xs">{t.title}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      t.status === 'RESOLVED'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : t.status === 'IN_REVIEW'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* 5. Project Amrit IoT Simulator */}
            {project.interactiveType === 'iot' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2 text-orange-400">
                    <Activity className="w-4 h-4 animate-pulse" />
                    <span>AiRA LAB HARDWARE TELEMETRY STREAM</span>
                  </div>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setSensorReading(+(35 + Math.random() * 20).toFixed(1));
                    }}
                    className="px-2.5 py-1 rounded bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 border border-orange-500/40 text-[10px]"
                  >
                    RE-PING SENSOR
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#141824] border border-orange-500/30 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="font-mono text-[10px] text-zinc-400">CURRENT SENSOR TELEMETRY</div>
                    <div className="font-mono text-3xl font-black text-orange-400 mt-1">
                      {sensorReading} <span className="text-sm font-normal text-zinc-400">Units/sec</span>
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-1">Hardware Interface: Embedded C / Microcontroller</div>
                  </div>

                  <div className="border-l border-white/10 pl-4 space-y-1">
                    <div className="font-mono text-[10px] text-zinc-400">AiRA LAB INVOLVEMENT</div>
                    <div className="text-xs text-zinc-300 leading-relaxed font-sans">
                      Guided by Prof. Parth Joshi. First IoT project presented during official AiRA LAB showcasing events.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Detailed Content & Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
            <div className="md:col-span-2 space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Project Narrative &amp; Implementation</span>
              </h3>
              <p className="text-zinc-300 font-sans text-sm sm:text-base leading-relaxed">
                {project.longDescription}
              </p>

              <div className="pt-2">
                <h4 className="font-mono text-xs text-zinc-400 mb-2">KEY HIGHLIGHTS</h4>
                <ul className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300 font-sans">
                      <span className="text-emerald-400 font-mono font-bold">0{i+1}.</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Architecture Column */}
            <div className="space-y-4 p-5 rounded-2xl bg-[#0F131D] border border-white/10">
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Tech Stack</span>
              </h3>

              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-[11px] text-zinc-300"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 space-y-1.5">
                <div className="font-mono text-[10px] text-zinc-500 uppercase">Architecture Blueprint</div>
                <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                  {project.architectureNotes}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="font-mono text-xs text-zinc-500">
              VERIFIED RESUME RECORD • DHYEY TRIVEDI
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sounds.playClick();
                  onClose();
                }}
                className="px-6 py-2.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-black font-mono font-bold text-xs uppercase tracking-wider transition-colors"
              >
                CLOSE BLUEPRINT
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
