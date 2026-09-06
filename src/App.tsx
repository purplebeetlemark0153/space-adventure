import React, { useState } from 'react';
import { GamePhase, MissionType } from './types';
import { StartScreen } from './components/StartScreen';
import { MissionSelectScreen } from './components/MissionSelectScreen';
import { MainGameScreen } from './components/MainGameScreen';
import { VictoryModal } from './components/VictoryModal';
import { GameOverModal } from './components/GameOverModal';
import { sounds } from './utils/audio';

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('start');
  const [selectedMission, setSelectedMission] = useState<MissionType | null>(null);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  // Stats recorded upon game completion
  const [finalOxygen, setFinalOxygen] = useState<number>(0);
  const [finalExploredCount, setFinalExploredCount] = useState<number>(0);
  const [gameOverReason, setGameOverReason] = useState<string>('');
  const [gameSessionKey, setGameSessionKey] = useState<number>(1);

  const toggleAudio = () => {
    sounds.enabled = !audioEnabled;
    setAudioEnabled(!audioEnabled);
  };

  const handleStartGame = () => {
    setPhase('mission_select');
  };

  const handleSelectMission = (mission: MissionType) => {
    setSelectedMission(mission);
    setGameSessionKey((prev) => prev + 1); // Fresh run key
    setPhase('playing');
  };

  const handleVictory = (oxygenRemaining: number, exploredCount: number) => {
    setFinalOxygen(oxygenRemaining);
    setFinalExploredCount(exploredCount);
    setPhase('victory');
  };

  const handleGameOver = (exploredCount: number, reason: string) => {
    setFinalExploredCount(exploredCount);
    setGameOverReason(reason);
    setPhase('game_over');
  };

  // Completely reset game state to brand new game
  const handleRestart = () => {
    setSelectedMission(null);
    setFinalOxygen(0);
    setFinalExploredCount(0);
    setGameOverReason('');
    setGameSessionKey((prev) => prev + 1);
    setPhase('start');
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 font-sans select-none antialiased">
      {phase === 'start' && (
        <StartScreen
          onStart={handleStartGame}
          audioEnabled={audioEnabled}
          onToggleAudio={toggleAudio}
        />
      )}

      {phase === 'mission_select' && (
        <MissionSelectScreen
          onSelectMission={handleSelectMission}
          onBackToStart={() => setPhase('start')}
        />
      )}

      {(phase === 'playing' || phase === 'victory' || phase === 'game_over') && selectedMission && (
        <>
          <MainGameScreen
            key={gameSessionKey}
            mission={selectedMission}
            audioEnabled={audioEnabled}
            onToggleAudio={toggleAudio}
            onRestartGame={handleRestart}
            onVictory={handleVictory}
            onGameOver={handleGameOver}
          />

          {phase === 'victory' && (
            <VictoryModal
              mission={selectedMission}
              oxygenRemaining={finalOxygen}
              exploredCount={finalExploredCount}
              onRestart={handleRestart}
            />
          )}

          {phase === 'game_over' && (
            <GameOverModal
              exploredCount={finalExploredCount}
              reason={gameOverReason}
              onRestart={handleRestart}
            />
          )}
        </>
      )}
    </div>
  );
}
