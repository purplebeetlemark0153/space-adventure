import React from 'react';
import { CuteAstronaut } from './CuteAstronaut';
import { Sparkles, Compass, Rocket, Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../utils/audio';

interface StartScreenProps {
  onStart: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStart,
  audioEnabled,
  onToggleAudio,
}) => {
  const handleStart = () => {
    sounds.playClick();
    onStart();
  };

  return (
    <div
      id="start-screen"
      className="relative min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-8 overflow-hidden bg-radial from-indigo-950 via-slate-950 to-black text-white"
    >
      {/* Cosmic background twinkling stars & nebulas */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/5 w-72 h-72 rounded-full bg-cyan-600/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Top Bar with Audio Control */}
      <header className="w-full max-w-4xl flex justify-end items-center z-20">
        <button
          id="btn-toggle-sound-start"
          onClick={onToggleAudio}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-xs sm:text-sm text-slate-300 transition-all cursor-pointer shadow-md"
          title={audioEnabled ? '關閉音效' : '開啟音效'}
        >
          {audioEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          <span>{audioEnabled ? '音效開啟' : '靜音中'}</span>
        </button>
      </header>

      {/* Main Center Content */}
      <main className="w-full max-w-2xl flex flex-col items-center text-center my-auto z-10 py-6">
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-semibold tracking-wide mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
          <span>太空探險科普小遊戲</span>
        </div>

        {/* Large Game Title */}
        <h1
          id="main-game-title"
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-400 drop-shadow-[0_4px_24px_rgba(34,211,238,0.4)] mb-3"
        >
          星球大探索
        </h1>

        {/* Subtitle from requirement */}
        <p className="text-lg sm:text-2xl font-black text-amber-300 drop-shadow-sm max-w-2xl mb-4 px-2 leading-relaxed">
          配合立體影片《外星異世界》，請各位一起來探索這個外星異世界吧
        </p>

        {/* Cute Floating Chibi Astronaut */}
        <div className="my-6 relative flex items-center justify-center">
          <div className="absolute -inset-6 bg-cyan-400/20 rounded-full blur-2xl animate-pulse" />
          <CuteAstronaut expression="normal" size="xl" floating={true} />
        </div>

        {/* Gameplay Instruction snippet */}
        <div className="bg-slate-900/90 border-2 border-slate-700 rounded-3xl p-5 sm:p-7 max-w-xl backdrop-blur-md shadow-2xl mb-8">
          <p className="text-base sm:text-xl font-bold text-slate-100 leading-relaxed">
            選擇你的探索任務，前往不同星球尋找目標。
            <br />
            但要小心氧氣有限，完成任務後記得活著回到地球！
          </p>
        </div>

        {/* Enter Game Button */}
        <button
          id="btn-enter-game"
          onClick={handleStart}
          className="group relative inline-flex items-center justify-center gap-3 px-10 sm:px-14 py-4 sm:py-5 rounded-2xl font-black text-xl sm:text-2xl text-slate-950 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-400 shadow-[0_6px_25px_rgba(251,191,36,0.5)] hover:shadow-[0_8px_35px_rgba(251,191,36,0.8)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border-2 border-amber-200"
        >
          <Rocket className="w-7 h-7 sm:w-8 sm:h-8 text-slate-900 group-hover:-translate-y-1 transition-transform" />
          <span>進入遊戲</span>
        </button>
      </main>

      {/* Footer Info */}
      <footer className="w-full text-center text-xs text-slate-500 z-10">
        電腦滑鼠點擊 • 手機/平板觸控 • 支援響應式螢幕
      </footer>
    </div>
  );
};
