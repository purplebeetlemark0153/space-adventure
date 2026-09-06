import React, { useState, useEffect, useMemo } from 'react';
import {
  PlanetData,
  MissionType,
  GameState,
  EventType,
} from '../types';
import { PlanetGraphic } from './PlanetGraphic';
import { CuteAstronaut } from './CuteAstronaut';
import { OxygenGauge } from './OxygenGauge';
import {
  initializePlanets,
  findNearestUnvisitedAlienPlanet,
} from '../utils/gameLogic';
import { sounds } from '../utils/audio';
import {
  Leaf,
  PawPrint,
  Compass,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  MapPin,
  ListFilter,
  Globe2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MainGameScreenProps {
  mission: MissionType;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  onRestartGame: () => void;
  onVictory: (finalOxygen: number, exploredCount: number) => void;
  onGameOver: (exploredCount: number, reason: string) => void;
}

// Background twinkling stars in cosmic space (Requirement: "宇宙空間 (有星星閃爍)")
const TWINKLING_STARS = [
  { id: 1, x: 5, y: 7, size: 2, delay: 0, dur: 2.8, color: '#ffffff' },
  { id: 2, x: 21, y: 5, size: 1.5, delay: 1.2, dur: 3.5, color: '#bae6fd' },
  { id: 3, x: 44, y: 6, size: 2.5, delay: 0.5, dur: 2.2, color: '#fef08a' },
  { id: 4, x: 62, y: 7, size: 1.5, delay: 1.8, dur: 4.0, color: '#ffffff' },
  { id: 5, x: 78, y: 5, size: 2, delay: 0.8, dur: 3.1, color: '#fed7aa' },
  { id: 6, x: 95, y: 12, size: 2, delay: 2.1, dur: 2.6, color: '#ffffff' },
  { id: 7, x: 17, y: 18, size: 2, delay: 0.3, dur: 3.2, color: '#e0e7ff' },
  { id: 8, x: 38, y: 22, size: 1.5, delay: 1.5, dur: 3.8, color: '#ffffff' },
  { id: 9, x: 58, y: 18, size: 2, delay: 2.4, dur: 2.9, color: '#fbcfe8' },
  { id: 10, x: 74, y: 24, size: 2.5, delay: 0.7, dur: 2.4, color: '#bae6fd' },
  { id: 11, x: 90, y: 28, size: 1.5, delay: 1.9, dur: 3.4, color: '#ffffff' },
  // Open cosmic space in middle and lower sections (as shown in sketch)
  { id: 12, x: 6, y: 50, size: 2.5, delay: 0.4, dur: 3.0, color: '#ffffff' },
  { id: 13, x: 16, y: 56, size: 2, delay: 1.7, dur: 2.7, color: '#fef08a' },
  { id: 14, x: 26, y: 46, size: 1.5, delay: 2.2, dur: 3.9, color: '#ffffff' },
  { id: 15, x: 35, y: 54, size: 3, delay: 0.9, dur: 2.5, color: '#bae6fd' },
  { id: 16, x: 46, y: 49, size: 2, delay: 1.4, dur: 3.3, color: '#ffffff' },
  { id: 17, x: 56, y: 56, size: 2.5, delay: 0.2, dur: 2.8, color: '#fef08a' },
  { id: 18, x: 65, y: 46, size: 2, delay: 2.6, dur: 3.5, color: '#e0e7ff' },
  { id: 19, x: 76, y: 54, size: 3, delay: 1.1, dur: 2.3, color: '#ffffff' },
  { id: 20, x: 87, y: 51, size: 2, delay: 1.6, dur: 3.6, color: '#fed7aa' },
  { id: 21, x: 96, y: 58, size: 2.5, delay: 0.6, dur: 2.9, color: '#bae6fd' },
  { id: 22, x: 8, y: 68, size: 2, delay: 1.3, dur: 3.4, color: '#ffffff' },
  { id: 23, x: 28, y: 70, size: 2.5, delay: 2.0, dur: 2.6, color: '#ffffff' },
  { id: 24, x: 38, y: 66, size: 2, delay: 0.5, dur: 4.1, color: '#fbcfe8' },
  { id: 25, x: 49, y: 76, size: 3, delay: 1.8, dur: 2.7, color: '#fef08a' },
  { id: 26, x: 59, y: 70, size: 2, delay: 0.8, dur: 3.2, color: '#ffffff' },
  { id: 27, x: 69, y: 78, size: 2.5, delay: 2.3, dur: 2.4, color: '#bae6fd' },
  { id: 28, x: 81, y: 72, size: 1.5, delay: 1.0, dur: 3.7, color: '#ffffff' },
  { id: 29, x: 93, y: 76, size: 2, delay: 1.5, dur: 3.1, color: '#fed7aa' },
  { id: 30, x: 33, y: 86, size: 2, delay: 0.7, dur: 3.0, color: '#ffffff' },
  { id: 31, x: 46, y: 88, size: 2.5, delay: 1.9, dur: 2.8, color: '#bae6fd' },
  { id: 32, x: 61, y: 86, size: 2, delay: 0.3, dur: 3.6, color: '#ffffff' },
  { id: 33, x: 73, y: 88, size: 2, delay: 2.5, dur: 3.3, color: '#fef08a' },
];

export const MainGameScreen: React.FC<MainGameScreenProps> = ({
  mission,
  audioEnabled,
  onToggleAudio,
  onRestartGame,
  onVictory,
  onGameOver,
}) => {
  // Initialize game session state
  // Planets generated once with fixed positions and fixed randomized events/names per run
  const [planets, setPlanets] = useState<PlanetData[]>(() => initializePlanets());
  const [oxygen, setOxygen] = useState<number>(7);
  const [playerLocation, setPlayerLocation] = useState<string>('earth');
  const [visitedPlanets, setVisitedPlanets] = useState<string[]>(['earth']);
  const [plantDNA, setPlantDNA] = useState<boolean>(false);
  const [animalDNA, setAnimalDNA] = useState<boolean>(false);
  const [exploredCount, setExploredCount] = useState<number>(0);
  const [astronautExpression, setAstronautExpression] = useState<'normal' | 'happy' | 'shocked' | 'dizzy'>('normal');
  const [eventMessage, setEventMessage] = useState<string>('太空探險正式啟動！請點擊未探索的外星星球出發。');
  const [isProcessingMove, setIsProcessingMove] = useState<boolean>(false);
  const [oxygenDeltaAnim, setOxygenDeltaAnim] = useState<{ value: number; id: number } | null>(null);

  // Mobile layout view mode: 'map' or 'list' for high usability on small screens
  const [mobileTab, setMobileTab] = useState<'map' | 'list'>('map');

  // Find current planet object
  const currentPlanet = useMemo(() => {
    return planets.find((p) => p.id === playerLocation) || planets[0];
  }, [planets, playerLocation]);

  // Check if mission goal is achieved
  const isMissionGoalAchieved = useMemo(() => {
    if (mission === 'plant') return plantDNA;
    if (mission === 'animal') return animalDNA;
    if (mission === 'explore10') return exploredCount >= 10;
    return false;
  }, [mission, plantDNA, animalDNA, exploredCount]);

  // Helper to trigger oxygen delta floating badge
  const triggerOxygenDelta = (delta: number) => {
    setOxygenDeltaAnim({ value: delta, id: Date.now() });
  };

  // Helper to execute planet event
  const executeEvent = (
    planet: PlanetData,
    oxygenAfterMove: number,
    currentVisitedList: string[],
    newExploredCount: number,
    currentPlantDNA: boolean,
    currentAnimalDNA: boolean
  ) => {
    let finalOxygen = oxygenAfterMove;
    let newPlantDNA = currentPlantDNA;
    let newAnimalDNA = currentAnimalDNA;

    switch (planet.event) {
      case 'none': {
        setEventMessage(`你抵達了 ${planet.name} 星球，無事發生。`);
        setAstronautExpression('normal');
        break;
      }

      case 'oxygen': {
        const bonus = planet.oxygenBonus || (Math.random() < 0.5 ? 2 : 3);
        finalOxygen += bonus;
        setOxygen(finalOxygen);
        triggerOxygenDelta(bonus);
        setEventMessage(`你抵達了 ${planet.name} 星球，發現這裡有氧氣！獲得 +${bonus} 個氧氣罐。`);
        setAstronautExpression('happy');
        sounds.playOxygenGain();
        break;
      }

      case 'volcano': {
        finalOxygen -= 2;
        setOxygen(finalOxygen);
        triggerOxygenDelta(-2);
        setEventMessage(`你抵達了 ${planet.name} 星球，火山爆發了，快逃！失去 2 個氧氣罐。`);
        setAstronautExpression('shocked');
        sounds.playDanger();

        if (finalOxygen <= 0) {
          setAstronautExpression('dizzy');
          setTimeout(() => {
            onGameOver(newExploredCount, `在 ${planet.name} 星球遭遇火山爆發，氧氣耗盡！`);
          }, 1200);
          return;
        }
        break;
      }

      case 'plant': {
        newPlantDNA = true;
        setPlantDNA(true);
        setEventMessage(`你抵達了 ${planet.name} 星球，這裡竟然有外星植物！成功取得「外星植物生命 DNA 樣本」！`);
        setAstronautExpression('happy');
        sounds.playSuccessDNA();
        break;
      }

      case 'cute_animal': {
        newAnimalDNA = true;
        setAnimalDNA(true);
        setEventMessage(`你抵達了 ${planet.name} 星球，這裡有可愛溫順的外星動物！成功取得「外星動物生命 DNA 樣本」！`);
        setAstronautExpression('happy');
        sounds.playSuccessDNA();
        break;
      }

      case 'wild_animal': {
        newAnimalDNA = true;
        setAnimalDNA(true);
        finalOxygen -= 1;
        setOxygen(finalOxygen);
        triggerOxygenDelta(-1);
        setEventMessage(`你抵達了 ${planet.name} 星球，糟糕，遇到凶暴的外星動物！雖然成功取得「外星動物生命 DNA 樣本」，但額外失去了 1 個氧氣罐。`);
        setAstronautExpression('shocked');
        sounds.playDanger();

        if (finalOxygen <= 0) {
          setAstronautExpression('dizzy');
          setTimeout(() => {
            onGameOver(newExploredCount, `在 ${planet.name} 星球遭遇凶暴動物後氧氣耗盡！`);
          }, 1200);
          return;
        }
        break;
      }

      case 'gravity_repel': {
        setEventMessage(`你抵達了 ${planet.name} 星球，糟糕，這裡的引力無法著陸，快閃！`);
        setAstronautExpression('shocked');
        sounds.playDanger();

        // Technical rule for gravity repel:
        // Astronaut cannot stay here. Must auto-move to the nearest unvisited alien planet.
        // This forced move costs 1 oxygen.
        const forcedNextOxygen = finalOxygen - 1;
        triggerOxygenDelta(-1);

        if (forcedNextOxygen <= 0) {
          setOxygen(0);
          setAstronautExpression('dizzy');
          setTimeout(() => {
            onGameOver(newExploredCount, `在 ${planet.name} 星球受引力推開時，氧氣耗盡！`);
          }, 1200);
          return;
        }

        const nearest = findNearestUnvisitedAlienPlanet(planet.id, planets, currentVisitedList);
        if (!nearest || nearest.isEarth) {
          // If no unvisited alien planets remain, forced retreat to earth
          setOxygen(forcedNextOxygen);
          setPlayerLocation('earth');
          setEventMessage(`你抵達了 ${planet.name} 星球引力無法著陸！強行退回地球基地（消耗 1 個氧氣罐）。`);
          return;
        }

        // Wait a brief moment to show the repel effect, then move to nearest
        setTimeout(() => {
          setOxygen(forcedNextOxygen);
          setPlayerLocation(nearest.id);
          const nextVisitedList = [...currentVisitedList, nearest.id];
          setVisitedPlanets(nextVisitedList);
          const nextExplored = newExploredCount + 1;
          setExploredCount(nextExplored);

          // Mark nearest planet as visited
          setPlanets((prev) =>
            prev.map((p) => (p.id === nearest.id ? { ...p, visited: true } : p))
          );

          // Now execute nearest planet's event!
          executeEvent(
            nearest,
            forcedNextOxygen,
            nextVisitedList,
            nextExplored,
            newPlantDNA,
            newAnimalDNA
          );
        }, 1300);
        return;
      }
    }

    setIsProcessingMove(false);
  };

  // Main interaction handler when clicking any planet
  const handlePlanetClick = (targetPlanet: PlanetData) => {
    if (isProcessingMove) return;

    // Rule: Current planet cannot be clicked
    if (targetPlanet.id === playerLocation) return;

    // Rule: Visited alien planet cannot be clicked again
    if (!targetPlanet.isEarth && visitedPlanets.includes(targetPlanet.id)) return;

    setIsProcessingMove(true);
    sounds.playMove();

    // Deduct 1 oxygen for the move
    const nextOxygen = oxygen - 1;
    triggerOxygenDelta(-1);
    setOxygen(nextOxygen);

    // Rule Check: If oxygen becomes 0 after move deduction, astronaut dies immediately!
    // "即使玩家只剩最後 1 個氧氣，並使用最後 1 個氧氣成功移動回到地球，只要氧氣變成 0，仍然算「死亡／失敗」"
    if (nextOxygen <= 0) {
      setOxygen(0);
      setAstronautExpression('dizzy');
      setPlayerLocation(targetPlanet.id);
      setEventMessage(`氧氣耗盡！太空人移動到 ${targetPlanet.name} 後力竭倒下……`);

      setTimeout(() => {
        onGameOver(
          targetPlanet.isEarth ? exploredCount : exploredCount + 1,
          targetPlanet.isEarth
            ? '雖然返回了地球，但在抵達當下氧氣正好歸零，無法存活……'
            : `在前往 ${targetPlanet.name} 的途中氧氣耗盡！`
        );
      }, 1200);
      return;
    }

    // Oxygen > 0, move succeeded!
    setPlayerLocation(targetPlanet.id);

    // Case A: Moving back to Earth
    if (targetPlanet.isEarth) {
      if (isMissionGoalAchieved) {
        // VICTORY! Completed mission + Alive + Back on Earth!
        setAstronautExpression('happy');
        setEventMessage('任務達成！太空人帶著珍貴的研究成果成功回到地球母星！');
        setTimeout(() => {
          onVictory(nextOxygen, exploredCount);
        }, 800);
      } else {
        setAstronautExpression('normal');
        setEventMessage('你返回了地球基地。任務尚未完成，請繼續探索外星星球！');
        setIsProcessingMove(false);
      }
      return;
    }

    // Case B: Moving to an alien planet
    const newVisitedList = [...visitedPlanets, targetPlanet.id];
    setVisitedPlanets(newVisitedList);
    const newExploredCount = exploredCount + 1;
    setExploredCount(newExploredCount);

    // Mark planet as visited in planets array
    setPlanets((prev) =>
      prev.map((p) => (p.id === targetPlanet.id ? { ...p, visited: true } : p))
    );

    // Execute the planet's fixed event
    executeEvent(
      targetPlanet,
      nextOxygen,
      newVisitedList,
      newExploredCount,
      plantDNA,
      animalDNA
    );
  };

  const getMissionTitle = () => {
    switch (mission) {
      case 'plant':
        return '取得外星植物生命 DNA 樣本';
      case 'animal':
        return '取得外星動物生命 DNA 樣本';
      case 'explore10':
        return '探索十個星球';
    }
  };

  const getMissionStatusText = () => {
    switch (mission) {
      case 'plant':
        return plantDNA ? '✓ 植物 DNA 已取得！請返回地球' : '尚未尋獲植物樣本';
      case 'animal':
        return animalDNA ? '✓ 動物 DNA 已取得！請返回地球' : '尚未尋獲動物樣本';
      case 'explore10':
        return exploredCount >= 10
          ? `✓ 已探索 ${exploredCount}/10 顆！請返回地球`
          : `探索進度：${exploredCount} / 10 顆`;
    }
  };

  return (
    <div
      id="main-game-screen"
      className="relative min-h-screen w-full flex flex-col justify-between bg-slate-950 text-white select-none overflow-x-hidden"
    >
      {/* Background Starfield Canvas with soft nebula lights */}
      <div className="absolute inset-0 pointer-events-none opacity-50 z-0">
        <div className="absolute top-10 left-12 w-64 h-64 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="absolute bottom-24 right-16 w-80 h-80 rounded-full bg-purple-600/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full bg-emerald-600/10 blur-3xl" />
      </div>

      {/* TOP HEADER / DASHBOARD */}
      <header
        id="game-header-bar"
        className="w-full bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-3 sm:px-6 py-2.5 z-20 flex flex-wrap items-center justify-between gap-2.5 shadow-md"
      >
        {/* Left: Game Title and Return Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center">
            <Globe2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-black text-white tracking-wide flex items-center gap-1.5">
              <span>星球大探索</span>
              <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyan-500/40">
                17外星+地球
              </span>
            </h1>
          </div>
        </div>

        {/* Center: Mission Progress Banner */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-slate-800/90 border border-slate-700 shadow-inner">
          {mission === 'plant' && <Leaf className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
          {mission === 'animal' && <PawPrint className="w-5 h-5 text-amber-400 flex-shrink-0" />}
          {mission === 'explore10' && <Compass className="w-5 h-5 text-cyan-400 flex-shrink-0" />}

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">目前任務:</span>
              <span className="text-sm sm:text-base font-black text-slate-100 truncate max-w-[170px] sm:max-w-none">
                {getMissionTitle()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs sm:text-sm font-black ${
                  isMissionGoalAchieved ? 'text-emerald-400' : 'text-amber-300'
                }`}
              >
                {getMissionStatusText()}
              </span>
              {isMissionGoalAchieved && (
                <span className="text-xs bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/40 animate-pulse font-black">
                  請回地球!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Audio control and Restart */}
        <div className="flex items-center gap-2">
          <button
            id="btn-toggle-sound-main"
            onClick={onToggleAudio}
            className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title={audioEnabled ? '關閉音效' : '開啟音效'}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
          <button
            id="btn-restart-game"
            onClick={() => {
              sounds.playClick();
              onRestartGame();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">重新開始</span>
          </button>
        </div>
      </header>

      {/* SECONDARY INFO STRIP: Exploration & DNA stats */}
      <div className="w-full bg-slate-900/60 border-b border-slate-800/80 px-4 py-1.5 z-10 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              已探索外星: <strong className="text-cyan-300">{exploredCount}</strong> / 17
            </span>
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>植物 DNA: {plantDNA ? <strong className="text-emerald-400">已取得</strong> : '未尋獲'}</span>
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1">
            <PawPrint className="w-3.5 h-3.5 text-amber-400" />
            <span>動物 DNA: {animalDNA ? <strong className="text-amber-400">已取得</strong> : '未尋獲'}</span>
          </span>
        </div>

        {/* Mobile View Toggle: Star Map vs Planet Roster */}
        <div className="sm:hidden flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
          <button
            onClick={() => setMobileTab('map')}
            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
              mobileTab === 'map' ? 'bg-cyan-600 text-white' : 'text-slate-400'
            }`}
          >
            宇宙星圖
          </button>
          <button
            onClick={() => setMobileTab('list')}
            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
              mobileTab === 'list' ? 'bg-cyan-600 text-white' : 'text-slate-400'
            }`}
          >
            星球清單 ({planets.length})
          </button>
        </div>
      </div>

      {/* MAIN GAMEPLAY AREA */}
      <main className="relative flex-1 w-full max-w-6xl mx-auto flex flex-col items-center justify-center p-2 sm:p-4 z-10 overflow-hidden min-h-[460px] sm:min-h-[540px]">
        {/* VIEW MODE 1: Interactive Star Map */}
        <div
          id="star-map-container"
          className={`relative w-full h-[480px] sm:h-[550px] md:h-[600px] rounded-3xl border border-slate-800/90 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/80 shadow-2xl overflow-hidden transition-all ${
            mobileTab === 'map' ? 'block' : 'hidden sm:block'
          }`}
        >
          {/* Cosmic Space with Twinkling Stars (Requirement: "宇宙空間 (有星星閃爍)") */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {TWINKLING_STARS.map((s) => (
              <motion.div
                key={`star-${s.id}`}
                className="absolute rounded-full shadow-sm"
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  backgroundColor: s.color,
                }}
                animate={{
                  opacity: [0.2, 0.95, 0.2],
                  scale: [0.8, 1.35, 0.8],
                }}
                transition={{
                  duration: s.dur,
                  delay: s.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Render 18 Planets (Earth + 17 Alien planets) with fixed positions */}
          {planets.map((p) => {
            const isCurrent = p.id === playerLocation;
            // Can click rule:
            // 1. Not currently at this planet
            // 2. If alien planet: must not be visited
            // 3. If Earth: always clickable unless player is already on Earth!
            const canClick = !isCurrent && (p.isEarth || !visitedPlanets.includes(p.id));

            return (
              <PlanetGraphic
                key={p.id}
                planet={p}
                isCurrent={isCurrent}
                canClick={canClick && !isProcessingMove}
                onClick={() => handlePlanetClick(p)}
              />
            );
          })}

          {/* Animated Astronaut traveling between planets */}
          <motion.div
            id="astronaut-marker"
            className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2"
            animate={{
              left: `${currentPlanet.x}%`,
              top: `${currentPlanet.y - (currentPlanet.isEarth ? 9.5 : 8)}%`,
            }}
            transition={{
              type: 'spring',
              stiffness: 90,
              damping: 18,
            }}
          >
            <div className="flex flex-col items-center">
              <CuteAstronaut
                expression={astronautExpression}
                size="sm"
                floating={!isProcessingMove}
              />
              <span className="text-xs font-black text-cyan-300 bg-slate-900/95 px-2.5 py-0.5 rounded-full border border-cyan-400 shadow-md -mt-1">
                太空人
              </span>
            </div>
          </motion.div>

          {/* Floating Oxygen Gauge in Map (bottom-right / responsive) */}
          <div className="absolute bottom-3 right-3 z-30 pointer-events-auto">
            <OxygenGauge oxygen={oxygen} deltaAnimation={oxygenDeltaAnim} />
          </div>

          {/* Hint badge on top left */}
          <div className="absolute top-3 left-3 z-20 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-[11px] text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>點擊閃爍光暈的星球即可出發</span>
          </div>
        </div>

        {/* VIEW MODE 2: Mobile Friendly Planet Roster (Clean list view with large touch cards) */}
        <div
          id="mobile-planet-roster"
          className={`w-full max-h-[460px] overflow-y-auto p-2 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2 sm:hidden ${
            mobileTab === 'list' ? 'block' : 'hidden'
          }`}
        >
          <div className="p-2 mb-2 bg-slate-800/80 rounded-xl text-xs text-slate-300 flex items-center justify-between">
            <span>手機專屬星球清單（超大點擊區）</span>
            <OxygenGauge oxygen={oxygen} deltaAnimation={oxygenDeltaAnim} />
          </div>

          {planets.map((p) => {
            const isCurrent = p.id === playerLocation;
            const canClick = !isCurrent && (p.isEarth || !visitedPlanets.includes(p.id));

            return (
              <button
                key={`list-${p.id}`}
                onClick={() => {
                  if (canClick && !isProcessingMove) {
                    handlePlanetClick(p);
                    setMobileTab('map'); // Switch back to map after selecting
                  }
                }}
                disabled={!canClick || isProcessingMove}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? 'bg-yellow-950/50 border-yellow-500/80 text-yellow-200 font-bold'
                    : canClick
                    ? p.isEarth
                      ? 'bg-blue-950/60 border-blue-400 hover:bg-blue-900/70 text-white cursor-pointer active:scale-98'
                      : 'bg-slate-800/90 border-slate-700 hover:border-cyan-400 text-slate-200 cursor-pointer active:scale-98'
                    : 'bg-slate-950/40 border-slate-800/40 text-slate-500 cursor-not-allowed opacity-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full border border-white/20 shadow flex items-center justify-center font-bold text-xs"
                    style={{ backgroundColor: p.isEarth ? '#0284c7' : p.themeColor }}
                  >
                    {p.isEarth ? '🌍' : '🪐'}
                  </div>
                  <div>
                    <div className="font-bold text-sm">
                      {p.name} {p.isEarth && '(基地)'}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isCurrent
                        ? '太空人目前位置'
                        : p.visited && !p.isEarth
                        ? '已探索完畢'
                        : '尚未探索（點擊前往）'}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  {isCurrent && (
                    <span className="px-2 py-0.5 rounded bg-yellow-400 text-slate-950 font-black text-xs">
                      目前在此
                    </span>
                  )}
                  {canClick && (
                    <span className="px-2 py-1 rounded bg-cyan-600 text-white font-bold text-xs">
                      前往 (-1 氧氣)
                    </span>
                  )}
                  {!canClick && !isCurrent && (
                    <span className="text-xs text-slate-500 font-medium">已探索</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </main>

      {/* BOTTOM EVENT LOG & INSTRUCTION NOTIFICATION PANEL (Requirement 20 & 21) */}
      <footer
        id="bottom-event-log-panel"
        className="w-full bg-slate-900/95 border-t border-slate-800 backdrop-blur-lg px-4 sm:px-8 py-4 sm:py-5 z-20 shadow-2xl"
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Astronaut Expression avatar & Event text */}
          <div className="flex items-center gap-4 w-full">
            <div className="w-22 h-22 sm:w-26 sm:h-26 flex-shrink-0 rounded-2xl bg-slate-800/90 border-2 border-slate-700 flex items-center justify-center shadow-inner overflow-visible p-1">
              <CuteAstronaut expression={astronautExpression} size="sm" floating={true} />
            </div>

            <div className="flex-1 text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                  星際探險日誌
                </span>
                <span className="text-sm font-medium text-slate-300">
                  目前位置: <strong className="text-cyan-300 font-bold">{currentPlanet.name}</strong>
                </span>
              </div>
              <p
                id="event-log-message"
                className="text-base sm:text-xl md:text-2xl font-black text-white leading-relaxed break-words drop-shadow-sm"
              >
                {eventMessage}
              </p>
            </div>
          </div>

          {/* Quick status prompt */}
          <div className="flex-shrink-0 text-right hidden lg:block bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5">
            <div className="text-xs sm:text-sm text-slate-300 font-medium">
              每次移動消耗 <strong className="text-rose-400 font-black">1</strong> 氧氣罐
            </div>
            <div className="text-xs sm:text-sm font-bold text-amber-300 mt-0.5">
              {isMissionGoalAchieved ? '✓ 任務已達成！請點擊地球返回' : '尋找目標並留意氧氣！'}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
