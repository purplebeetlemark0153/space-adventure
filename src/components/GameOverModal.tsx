import React, { useEffect } from 'react';
import { CuteAstronaut } from './CuteAstronaut';
import { RotateCcw, Skull } from 'lucide-react';
import { sounds } from '../utils/audio';

interface GameOverModalProps {
  exploredCount: number;
  reason?: string;
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  exploredCount,
  reason,
  onRestart,
}) => {
  useEffect(() => {
    sounds.playDefeat();
  }, []);

  return (
    <div
      id="game-over-screen"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-rose-950/40 to-slate-900 border-2 border-rose-500/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(244,63,94,0.25)] text-center flex flex-col items-center">
        {/* Defeat Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 text-sm font-black tracking-wider uppercase mb-3">
          <Skull className="w-4 h-4 text-rose-400" />
          <span>任務失敗</span>
        </div>

        {/* Prompt specific defeat message */}
        <h2 className="text-2xl sm:text-4xl font-black text-rose-200 mb-2">
          氧氣耗盡，太空探險結束了……
        </h2>

        {reason && (
          <p className="text-sm sm:text-base text-rose-300/90 font-medium mb-3 px-2">
            {reason}
          </p>
        )}

        {/* Cute dizzy/exhausted floating astronaut with soul floating out (Cute, not scary) */}
        <div className="my-6 relative flex items-center justify-center">
          <div className="absolute -inset-8 bg-sky-500/20 rounded-full blur-2xl animate-pulse" />
          <CuteAstronaut expression="dizzy" size="xl" floating={true} />
        </div>

        <p className="text-sm sm:text-base font-semibold text-slate-200 mb-5 leading-relaxed">
          太空人的氧氣罐用光了，在太空中無力地緩緩漂浮。
          <br />
          別灰心！吸取這次探索經驗，整裝出發再試一次吧！
        </p>

        {/* Stats */}
        <div className="w-full p-3 rounded-xl bg-slate-800/80 border border-slate-700 mb-5 flex justify-between items-center text-left">
          <span className="text-xs sm:text-sm text-slate-400">本次探險星球數</span>
          <span className="text-base sm:text-lg font-mono font-bold text-slate-200">
            {exploredCount} 顆
          </span>
        </div>

        {/* Restart Button */}
        <button
          id="btn-gameover-restart"
          onClick={() => {
            sounds.playClick();
            onRestart();
          }}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white font-black text-lg shadow-[0_4px_20px_rgba(14,165,233,0.4)] hover:shadow-[0_6px_25px_rgba(14,165,233,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 border border-cyan-300"
        >
          <RotateCcw className="w-5 h-5" />
          <span>重新開始</span>
        </button>
      </div>
    </div>
  );
};
