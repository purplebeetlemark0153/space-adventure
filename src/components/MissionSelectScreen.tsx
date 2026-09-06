import React from 'react';
import { MissionType } from '../types';
import { Leaf, PawPrint, Compass, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface MissionSelectScreenProps {
  onSelectMission: (mission: MissionType) => void;
  onBackToStart: () => void;
}

export const MissionSelectScreen: React.FC<MissionSelectScreenProps> = ({
  onSelectMission,
  onBackToStart,
}) => {
  const missions: Array<{
    id: MissionType;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    border: string;
    bg: string;
    tag: string;
    difficulty: string;
    difficultyColor: string;
  }> = [
    {
      id: 'animal',
      title: '取得外星動物生命 DNA 樣本',
      description: '探索星球尋找「可愛外星動物」或小心應對「凶暴外星動物」，取得動物 DNA 樣本並平安帶回地球！',
      icon: <PawPrint className="w-9 h-9 sm:w-11 sm:h-11 text-amber-400" />,
      color: 'text-amber-300',
      border: 'border-amber-500/50 hover:border-amber-400',
      bg: 'from-amber-950/60 to-slate-900/90 hover:from-amber-900/70',
      tag: '任務一',
      difficulty: '難易度：簡單',
      difficultyColor: 'text-emerald-300 bg-emerald-950/80 border-emerald-400/50',
    },
    {
      id: 'plant',
      title: '取得外星植物生命 DNA 樣本',
      description: '在浩瀚未知的宇宙中尋找蘊含奇異生機的「外星植物」，成功採集其 DNA 樣本並活著返回地球！',
      icon: <Leaf className="w-9 h-9 sm:w-11 sm:h-11 text-emerald-400" />,
      color: 'text-emerald-300',
      border: 'border-emerald-500/50 hover:border-emerald-400',
      bg: 'from-emerald-950/60 to-slate-900/90 hover:from-emerald-900/70',
      tag: '任務二',
      difficulty: '難易度：中等',
      difficultyColor: 'text-amber-300 bg-amber-950/80 border-amber-400/50',
    },
    {
      id: 'explore10',
      title: '探索十個星球',
      description: '化身無畏的星際先驅者，成功踏足並探索至少 10 顆不同的外星星球，然後安然返回地球母星！',
      icon: <Compass className="w-9 h-9 sm:w-11 sm:h-11 text-cyan-400" />,
      color: 'text-cyan-300',
      border: 'border-cyan-500/50 hover:border-cyan-400',
      bg: 'from-cyan-950/60 to-slate-900/90 hover:from-cyan-900/70',
      tag: '任務三',
      difficulty: '難易度：困難',
      difficultyColor: 'text-rose-300 bg-rose-950/80 border-rose-400/50',
    },
  ];

  const handleSelect = (missionId: MissionType) => {
    sounds.playClick();
    onSelectMission(missionId);
  };

  return (
    <div
      id="mission-select-screen"
      className="min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-8 bg-radial from-slate-900 via-indigo-950 to-black text-white"
    >
      {/* Top Header */}
      <header className="w-full max-w-4xl flex items-center justify-between z-10 pt-2">
        <button
          onClick={() => {
            sounds.playClick();
            onBackToStart();
          }}
          className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs sm:text-sm text-slate-300 border border-slate-700 cursor-pointer transition-colors"
        >
          ← 返回首頁
        </button>
        <span className="text-xs sm:text-sm text-cyan-300/80 font-medium">星球大探索 • 任務簡報</span>
      </header>

      {/* Main Center Content */}
      <main className="w-full max-w-4xl flex flex-col items-center text-center my-auto py-6 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>出航準備</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300 mb-2">
          請選擇你的探險任務
        </h2>
        <p className="text-base sm:text-lg font-medium text-slate-200 max-w-xl mb-8">
          每位太空人出發前需選定一個任務目標。請慎選目標，並妥善規劃氧氣儲量！
        </p>

        {/* 3 Large Mission Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {missions.map((m) => (
            <button
              key={m.id}
              id={`btn-mission-${m.id}`}
              onClick={() => handleSelect(m.id)}
              className={`group text-left p-6 sm:p-7 rounded-3xl bg-gradient-to-b ${m.bg} border-2 ${m.border} transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-xl hover:shadow-2xl flex flex-col justify-between cursor-pointer focus:outline-none`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs sm:text-sm font-black bg-white/15 text-white border border-white/20">
                      {m.tag}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs sm:text-sm font-black border ${m.difficultyColor}`}>
                      {m.difficulty}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 shadow-inner group-hover:scale-110 transition-transform flex-shrink-0">
                    {m.icon}
                  </div>
                </div>

                <h3 className={`text-xl sm:text-2xl md:text-3xl font-black ${m.color} mb-3 leading-snug`}>
                  {m.title}
                </h3>

                <p className="text-sm sm:text-base font-medium text-slate-200 leading-relaxed">
                  {m.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
                <span>選擇此任務出發</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        {/* Critical Reminder Box */}
        <div className="mt-8 flex items-center gap-3 px-5 py-4 rounded-2xl bg-amber-950/50 border border-amber-500/40 text-amber-200 text-sm sm:text-base text-left max-w-3xl leading-relaxed">
          <ShieldAlert className="w-6 h-6 text-amber-400 flex-shrink-0" />
          <span>
            <strong>重要通告：</strong>
            完成任務後，仍必須<strong>活著返回地球</strong>才算勝利！若在途中或返航抵達時氧氣耗盡歸零，探險將告失敗。
          </span>
        </div>
      </main>

      <footer className="w-full text-center text-xs text-slate-500 z-10">
        初始氧氣：7 罐 • 移動消耗：每次 1 罐
      </footer>
    </div>
  );
};
