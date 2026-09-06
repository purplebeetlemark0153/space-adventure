import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

interface OxygenGaugeProps {
  oxygen: number;
  deltaAnimation?: { value: number; id: number } | null;
}

export const OxygenGauge: React.FC<OxygenGaugeProps> = ({ oxygen, deltaAnimation }) => {
  const isLow = oxygen <= 2;

  return (
    <div
      id="oxygen-gauge-container"
      className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-2xl backdrop-blur-md border transition-all duration-300 shadow-lg ${
        isLow
          ? 'bg-rose-950/80 border-rose-500/80 ring-2 ring-rose-500/50 animate-pulse'
          : 'bg-slate-900/85 border-cyan-500/40 ring-1 ring-cyan-500/30'
      }`}
    >
      {/* Delta Floating Indicator Animation (+2, -1, -2, etc.) */}
      <AnimatePresence>
        {deltaAnimation && (
          <motion.div
            key={deltaAnimation.id}
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: 1, y: -28, scale: 1.25 }}
            exit={{ opacity: 0, y: -45, scale: 0.8 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className={`absolute -top-4 right-4 px-2 py-0.5 rounded-full font-black text-xs sm:text-sm border shadow-xl z-30 ${
              deltaAnimation.value > 0
                ? 'bg-emerald-500 text-white border-emerald-300 shadow-emerald-500/50'
                : 'bg-rose-600 text-white border-rose-300 shadow-rose-600/50'
            }`}
          >
            {deltaAnimation.value > 0 ? `+${deltaAnimation.value}` : deltaAnimation.value} 氧氣罐
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Oxygen Tank Icon */}
      <div className="relative w-8 h-10 flex-shrink-0">
        <svg viewBox="0 0 36 48" className="w-full h-full drop-shadow">
          <defs>
            <linearGradient id="tankBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isLow ? '#fb7185' : '#38bdf8'} />
              <stop offset="50%" stopColor={isLow ? '#f43f5e' : '#0284c7'} />
              <stop offset="100%" stopColor={isLow ? '#e11d48' : '#0369a1'} />
            </linearGradient>
            <linearGradient id="tankCapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          {/* Top Valve */}
          <rect x="14" y="2" width="8" height="4" rx="2" fill="url(#tankCapGrad)" />
          <rect x="16" y="6" width="4" height="4" fill="#64748b" />
          {/* Tank Cylinder Body */}
          <rect x="6" y="10" width="24" height="34" rx="7" fill="url(#tankBodyGrad)" />
          {/* Gauge Window */}
          <rect x="10" y="16" width="16" height="14" rx="3" fill="#0f172a" fillOpacity="0.85" />
          {/* Gauge Level Bar */}
          <rect
            x="12"
            y={28 - Math.min(oxygen, 10) * 1.0}
            width="12"
            height={Math.min(oxygen, 10) * 1.0}
            rx="2"
            fill={isLow ? '#f43f5e' : '#22c55e'}
          />
          {/* Tank Shine */}
          <path d="M 9 14 Q 10 24 9 38" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.5" fill="none" />
        </svg>

        {isLow && (
          <AlertTriangle className="absolute -top-2 -left-2 w-4 h-4 text-rose-400 animate-bounce" />
        )}
      </div>

      {/* Oxygen Info & Canister Icons */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-300">氧氣存量</span>
          <span
            id="oxygen-numeric-count"
            className={`text-lg sm:text-xl font-black font-mono tracking-wider ${
              isLow ? 'text-rose-400' : 'text-cyan-300'
            }`}
          >
            × {oxygen}
          </span>
          {isLow && (
            <span className="text-[10px] font-bold text-rose-400 px-1.5 py-0.2 rounded bg-rose-950/90 border border-rose-600/60 animate-pulse">
              警告
            </span>
          )}
        </div>

        {/* Visual Mini Tanks (cap at 12 displayable for compactness, but accurate number) */}
        <div className="flex items-center gap-1 mt-0.5">
          {Array.from({ length: Math.min(oxygen, 10) }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`w-2.5 h-4 rounded-sm border ${
                isLow
                  ? 'bg-rose-500 border-rose-300 shadow-[0_0_4px_rgba(244,63,94,0.6)]'
                  : 'bg-cyan-400 border-cyan-200 shadow-[0_0_4px_rgba(56,189,248,0.6)]'
              }`}
            />
          ))}
          {oxygen > 10 && (
            <span className="text-[10px] font-bold text-cyan-300">+{oxygen - 10}</span>
          )}
        </div>
      </div>
    </div>
  );
};
