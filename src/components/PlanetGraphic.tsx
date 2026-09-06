import React from 'react';
import { PlanetData } from '../types';
import { Check, Lock } from 'lucide-react';

interface PlanetGraphicProps {
  planet: PlanetData;
  isCurrent: boolean;
  canClick: boolean;
  onClick: () => void;
  showEventReveal?: boolean; // only for game over or victory or debug
}

export const PlanetGraphic: React.FC<PlanetGraphicProps> = ({
  planet,
  isCurrent,
  canClick,
  onClick,
}) => {
  const isVisited = planet.visited;
  const isEarth = planet.isEarth;

  return (
    <div
      id={`planet-container-${planet.id}`}
      style={{
        left: `${planet.x}%`,
        top: `${planet.y}%`,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 select-none"
    >
      {/* Clickable Planet Button with ample touch target */}
      <button
        id={`btn-planet-${planet.id}`}
        onClick={() => {
          if (canClick) onClick();
        }}
        disabled={!canClick}
        aria-label={`前往星球 ${planet.name}${isCurrent ? '（目前位置）' : ''}${isVisited && !isEarth ? '（已探索）' : ''}`}
        className={`relative group rounded-full transition-all duration-300 flex items-center justify-center p-2.5 focus:outline-none ${
          canClick
            ? 'cursor-pointer hover:scale-115 active:scale-95'
            : isCurrent
            ? 'cursor-default'
            : 'cursor-not-allowed opacity-50 filter grayscale'
        }`}
        style={{
          // Generous touch hit area
          minWidth: isEarth ? '68px' : '52px',
          minHeight: isEarth ? '68px' : '52px',
        }}
      >
        {/* Pulsing indicator when planet is reachable / clickable */}
        {canClick && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-30 pointer-events-none"
            style={{ backgroundColor: isEarth ? '#38bdf8' : planet.themeColor }}
          />
        )}

        {/* Current position beacon */}
        {isCurrent && (
          <span className="absolute -top-3.5 px-2 py-0.5 rounded-full bg-yellow-400 text-slate-900 text-xs font-black tracking-wide shadow-md border border-white animate-bounce z-20">
            目前在此
          </span>
        )}

        {/* SVG Planet Body */}
        <div
          className={`relative rounded-full shadow-lg overflow-visible transition-transform ${
            canClick ? 'group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]' : ''
          }`}
          style={{
            width: isEarth ? '60px' : '44px',
            height: isEarth ? '60px' : '44px',
          }}
        >
          {isEarth ? (
            /* Cute Earth */
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <defs>
                <radialGradient id="earthAtmosphere" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#7dd3fc" />
                  <stop offset="60%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#0369a1" />
                </radialGradient>
              </defs>
              {/* Atmosphere Glow */}
              <circle cx="50" cy="50" r="48" fill="#38bdf8" fillOpacity="0.25" />
              {/* Ocean */}
              <circle cx="50" cy="50" r="44" fill="url(#earthAtmosphere)" />
              {/* Cute Continents */}
              <path
                d="M32 28 C38 22 52 24 56 30 C58 35 48 42 42 42 C36 42 28 34 32 28 Z"
                fill="#22c55e"
                opacity="0.9"
              />
              <path
                d="M58 45 C66 40 76 44 78 52 C79 58 72 65 64 64 C56 63 52 50 58 45 Z"
                fill="#22c55e"
                opacity="0.9"
              />
              <path
                d="M26 56 C34 52 40 60 42 68 C44 74 36 78 30 76 C24 74 22 62 26 56 Z"
                fill="#22c55e"
                opacity="0.9"
              />
              {/* Cute white cloud swirls */}
              <path
                d="M30 40 Q45 35 60 42 Q75 48 85 45"
                stroke="#ffffff"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.65"
                fill="none"
              />
              <path
                d="M20 62 Q35 68 50 62 Q65 56 78 65"
                stroke="#ffffff"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.65"
                fill="none"
              />
            </svg>
          ) : (
            /* Alien Planet */
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
              <defs>
                <radialGradient id={`grad-${planet.id}`} cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
                  <stop offset="30%" stopColor={planet.themeColor} />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0.85" />
                </radialGradient>
              </defs>

              {/* Planetary Ring (back) */}
              {planet.ring && (
                <ellipse
                  cx="50"
                  cy="50"
                  rx="62"
                  ry="18"
                  fill="none"
                  stroke={planet.themeColor}
                  strokeWidth="6"
                  opacity="0.5"
                  transform="rotate(-20 50 50)"
                />
              )}

              {/* Planet Sphere */}
              <circle cx="50" cy="50" r="44" fill={`url(#grad-${planet.id})`} />

              {/* Surface Details (Craters / bands) */}
              <circle cx="34" cy="38" r="7" fill="#000000" opacity="0.18" />
              <circle cx="64" cy="58" r="9" fill="#000000" opacity="0.18" />
              <circle cx="42" cy="72" r="5" fill="#000000" opacity="0.18" />
              <circle cx="68" cy="34" r="4" fill="#ffffff" opacity="0.25" />

              {/* Planetary Ring (front) */}
              {planet.ring && (
                <path
                  d="M -6 50 A 62 18 0 0 0 106 50"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="4"
                  opacity="0.7"
                  transform="rotate(-20 50 50)"
                />
              )}
            </svg>
          )}

          {/* Visited Status Overlay (Alien planets only) */}
          {!isEarth && isVisited && (
            <div className="absolute inset-0 rounded-full bg-slate-900/60 flex items-center justify-center backdrop-blur-[0.5px]">
              <Lock className="w-4 h-4 text-slate-300 opacity-90 drop-shadow" />
            </div>
          )}
        </div>
      </button>

      {/* Planet Name Label */}
      <div
        className={`mt-0.5 px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wider shadow border transition-all whitespace-nowrap ${
          isEarth
            ? 'bg-blue-600/90 text-white border-blue-400'
            : isVisited
            ? 'bg-slate-800/80 text-slate-400 border-slate-700'
            : canClick
            ? 'bg-slate-900/90 text-yellow-300 border-amber-400/80 ring-2 ring-yellow-400/40 font-extrabold'
            : 'bg-slate-900/80 text-slate-200 border-slate-700'
        }`}
      >
        {planet.name}
        {!isEarth && isVisited && (
          <span className="ml-1 text-[10px] text-emerald-400 font-semibold">(已探索)</span>
        )}
      </div>
    </div>
  );
};
