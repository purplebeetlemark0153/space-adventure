import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CuteAstronaut } from './CuteAstronaut';
import { MissionType } from '../types';
import { Trophy, RotateCcw, CheckCircle2, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface VictoryModalProps {
  mission: MissionType;
  oxygenRemaining: number;
  exploredCount: number;
  onRestart: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  mission,
  oxygenRemaining,
  exploredCount,
  onRestart,
}) => {
  useEffect(() => {
    sounds.playVictory();

    // Trigger joyful celebration confetti
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#facc15', '#4ade80', '#ec4899', '#a855f7'],
      });
      const timer = setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 350);
      return () => clearTimeout(timer);
    } catch {
      // ignore in environments without canvas support
    }
  }, []);

  const getMissionCompletionText = () => {
    switch (mission) {
      case 'plant':
        return '你成功取得了外星植物生命 DNA 樣本！';
      case 'animal':
        return '你成功取得了外星動物生命 DNA 樣本！';
      case 'explore10':
        return '你成功探索了十個星球！';
    }
  };

  return (
    <div
      id="victory-screen"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border-2 border-yellow-400/80 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(250,204,21,0.35)] text-center flex flex-col items-center">
        {/* Glow halo */}
        <div className="absolute -top-12 inset-x-0 flex justify-center pointer-events-none">
          <div className="w-36 h-36 bg-yellow-400/20 rounded-full blur-2xl" />
        </div>

        {/* Victory Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/20 border border-yellow-400/60 text-yellow-300 text-sm font-black tracking-wider uppercase mb-3">
          <Trophy className="w-4 h-4 text-yellow-400 animate-bounce" />
          <span>恭喜過關！</span>
        </div>

        {/* Big Header */}
        <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-400 mb-2">
          任務成功！
        </h2>

        {/* Specific Mission accomplishment description required by prompt */}
        <div className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 font-black text-base sm:text-lg my-2 shadow-inner">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <span>{getMissionCompletionText()}</span>
        </div>

        <p className="text-sm sm:text-base text-cyan-200 font-semibold mb-3">
          你成功在有限的氧氣下完成任務，並活著返回地球母星！
        </p>

        {/* Super Happy Chibi Astronaut */}
        <div className="my-4 relative flex items-center justify-center">
          <div className="absolute -inset-6 bg-amber-400/20 rounded-full blur-2xl animate-pulse" />
          <CuteAstronaut expression="happy" size="xl" floating={true} />
        </div>

        {/* Exploration Stats summary */}
        <div className="grid grid-cols-2 gap-3 w-full my-4 text-left">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            <span className="text-xs text-slate-400 block font-medium">剩餘氧氣罐</span>
            <span className="text-xl font-mono font-black text-cyan-300">
              {oxygenRemaining} 罐
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            <span className="text-xs text-slate-400 block font-medium">探索外星星球</span>
            <span className="text-xl font-mono font-black text-amber-300">
              {exploredCount} / 17 顆
            </span>
          </div>
        </div>

        {/* Restart Button */}
        <button
          id="btn-victory-restart"
          onClick={() => {
            sounds.playClick();
            onRestart();
          }}
          className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-slate-950 font-black text-lg shadow-[0_4px_20px_rgba(251,191,36,0.4)] hover:shadow-[0_6px_25px_rgba(251,191,36,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 border-2 border-yellow-200"
        >
          <RotateCcw className="w-5 h-5" />
          <span>重新開始</span>
        </button>
      </div>
    </div>
  );
};
