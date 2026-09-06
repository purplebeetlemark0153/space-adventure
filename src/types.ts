export type MissionType = 'plant' | 'animal' | 'explore10';

export type EventType =
  | 'none'           // 無事發生 (4)
  | 'oxygen'         // 發現氧氣 (4) (+2 or +3)
  | 'volcano'        // 火山爆發 (2) (-2)
  | 'plant'          // 發現外星植物 (1)
  | 'cute_animal'    // 發現可愛外星動物 (2)
  | 'wild_animal'    // 遇到凶暴外星動物 (2) (-1)
  | 'gravity_repel'; // 引力無法著陸 (2) (forced move, -1)

export interface PlanetData {
  id: string;              // 'earth' or 'planet-1' to 'planet-17'
  name: string;            // '地球' or 'XX-XXX'
  isEarth: boolean;
  x: number;               // 0 - 100 percentage coordinates for map
  y: number;               // 0 - 100 percentage coordinates for map
  themeColor: string;      // Planet aesthetic visual theme
  ring?: boolean;          // Has planetary ring
  event: EventType;        // Assigned once at game start
  oxygenBonus?: number;    // 2 or 3 if event is 'oxygen'
  visited: boolean;        // Tracked per alien planet
}

export type GamePhase = 'start' | 'mission_select' | 'playing' | 'victory' | 'game_over';

export interface GameState {
  gameStarted: boolean;
  selectedMission: MissionType | null;
  playerLocation: string; // 'earth' or planet id
  oxygen: number;
  visitedPlanets: string[]; // planet ids visited
  planetNames: Record<string, string>;
  planetEvents: Record<string, EventType>;
  plantDNA: boolean;
  animalDNA: boolean;
  exploredCount: number;
  gameStatus: 'playing' | 'victory' | 'gameOver';
  astronautExpression: 'normal' | 'happy' | 'shocked' | 'dizzy';
  latestEventMessage: string;
  isMoving: boolean;
}
