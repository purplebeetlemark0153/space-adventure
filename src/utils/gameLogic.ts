import { EventType, PlanetData } from '../types';

// Fixed coordinates and visual themes for Earth + 17 Alien Planets
// Configured to strictly match the spatial layout in XXX.jpg:
// - Earth at bottom-left
// - 17 Alien Planets distributed across the upper region
// Map coordinates normalized to 0-100%
export const FIXED_PLANET_LAYOUT = [
  // Earth (Bottom-Left starting base, as designated in XXX.jpg)
  { id: 'earth', name: '地球', isEarth: true, x: 18, y: 78, themeColor: '#38bdf8', ring: false },

  // 17 Alien Planets distributed in the upper region as shown in XXX.jpg:
  // Row 1: Top tier across (5 planets)
  { id: 'p1', isEarth: false, x: 9, y: 10, themeColor: '#f43f5e', ring: true },
  { id: 'p2', isEarth: false, x: 36, y: 9, themeColor: '#fb923c', ring: false },
  { id: 'p3', isEarth: false, x: 51, y: 9, themeColor: '#a855f7', ring: true },
  { id: 'p4', isEarth: false, x: 70, y: 9, themeColor: '#34d399', ring: false },
  { id: 'p5', isEarth: false, x: 86, y: 9, themeColor: '#facc15', ring: false },

  // Row 2: Upper-middle tier (4 planets)
  { id: 'p6', isEarth: false, x: 23, y: 16, themeColor: '#38bdf8', ring: false },
  { id: 'p7', isEarth: false, x: 49, y: 20, themeColor: '#ec4899', ring: true },
  { id: 'p8', isEarth: false, x: 65, y: 21, themeColor: '#a3e635', ring: false },
  { id: 'p9', isEarth: false, x: 82, y: 20, themeColor: '#06b6d4', ring: false },

  // Row 3: Mid-left tier (2 planets)
  { id: 'p10', isEarth: false, x: 14, y: 25, themeColor: '#fb7185', ring: false },
  { id: 'p11', isEarth: false, x: 29, y: 29, themeColor: '#c084fc', ring: true },

  // Row 4: Lower-middle tier across (6 planets, sloping on the right)
  { id: 'p12', isEarth: false, x: 11, y: 37, themeColor: '#2dd4bf', ring: false },
  { id: 'p13', isEarth: false, x: 44, y: 36, themeColor: '#f59e0b', ring: false },
  { id: 'p14', isEarth: false, x: 56, y: 33, themeColor: '#6366f1', ring: false },
  { id: 'p15', isEarth: false, x: 70, y: 33, themeColor: '#10b981', ring: true },
  { id: 'p16', isEarth: false, x: 81, y: 34, themeColor: '#e879f9', ring: false },
  { id: 'p17', isEarth: false, x: 92, y: 42, themeColor: '#f97316', ring: false },
];

// Generate a random XX-XXX name (e.g. MA-381, XY-987, AB-245)
export function generatePlanetName(existingNames: Set<string>): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let name = '';
  do {
    const l1 = letters[Math.floor(Math.random() * letters.length)];
    const l2 = letters[Math.floor(Math.random() * letters.length)];
    const num = Math.floor(100 + Math.random() * 900); // 100-999
    name = `${l1}${l2}-${num}`;
  } while (existingNames.has(name));
  existingNames.add(name);
  return name;
}

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate the 17 planets with shuffled events according to exact game specifications:
// 1. 無事發生: 4
// 2. 發現氧氣: 4 (+2 or +3)
// 3. 火山爆發: 2
// 4. 發現外星植物: 1
// 5. 發現可愛外星動物: 2
// 6. 遇到凶暴外星動物: 2
// 7. 引力無法著陸: 2
// Total = 4 + 4 + 2 + 1 + 2 + 2 + 2 = 17
export function initializePlanets(): PlanetData[] {
  // Event pool setup
  const eventPool: Array<{ event: EventType; oxygenBonus?: number }> = [
    { event: 'none' },
    { event: 'none' },
    { event: 'none' },
    { event: 'none' },

    { event: 'oxygen', oxygenBonus: Math.random() < 0.5 ? 2 : 3 },
    { event: 'oxygen', oxygenBonus: Math.random() < 0.5 ? 2 : 3 },
    { event: 'oxygen', oxygenBonus: Math.random() < 0.5 ? 2 : 3 },
    { event: 'oxygen', oxygenBonus: Math.random() < 0.5 ? 2 : 3 },

    { event: 'volcano' },
    { event: 'volcano' },

    { event: 'plant' },

    { event: 'cute_animal' },
    { event: 'cute_animal' },

    { event: 'wild_animal' },
    { event: 'wild_animal' },

    { event: 'gravity_repel' },
    { event: 'gravity_repel' },
  ];

  const shuffledEvents = shuffleArray(eventPool);
  const usedNames = new Set<string>();

  return FIXED_PLANET_LAYOUT.map((layoutItem, index) => {
    if (layoutItem.isEarth) {
      return {
        id: layoutItem.id,
        name: '地球',
        isEarth: true,
        x: layoutItem.x,
        y: layoutItem.y,
        themeColor: layoutItem.themeColor,
        ring: layoutItem.ring,
        event: 'none',
        visited: true, // Earth is the starting point
      };
    }

    // Alien planet
    const eventItem = shuffledEvents[index - 1]; // index 0 is Earth
    const name = generatePlanetName(usedNames);

    return {
      id: layoutItem.id,
      name,
      isEarth: false,
      x: layoutItem.x,
      y: layoutItem.y,
      themeColor: layoutItem.themeColor,
      ring: layoutItem.ring,
      event: eventItem.event,
      oxygenBonus: eventItem.oxygenBonus,
      visited: false,
    };
  });
}

// Find nearest unvisited alien planet for Event 7 (Gravity Repel)
// Technical criteria: Euclidean distance in fixed layout among unvisited alien planets
export function findNearestUnvisitedAlienPlanet(
  currentPlanetId: string,
  allPlanets: PlanetData[],
  visitedIds: string[]
): PlanetData | null {
  const current = allPlanets.find((p) => p.id === currentPlanetId);
  if (!current) return null;

  const candidatePlanets = allPlanets.filter(
    (p) => !p.isEarth && p.id !== currentPlanetId && !visitedIds.includes(p.id)
  );

  if (candidatePlanets.length === 0) {
    // If no unvisited alien planets exist, return earth
    return allPlanets.find((p) => p.isEarth) || null;
  }

  let nearest: PlanetData = candidatePlanets[0];
  let minDistanceSq = Number.MAX_VALUE;

  for (const candidate of candidatePlanets) {
    const dx = candidate.x - current.x;
    const dy = candidate.y - current.y;
    const distSq = dx * dx + dy * dy;

    if (distSq < minDistanceSq) {
      minDistanceSq = distSq;
      nearest = candidate;
    }
  }

  return nearest;
}
