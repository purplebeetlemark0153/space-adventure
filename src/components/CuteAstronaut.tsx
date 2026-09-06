import React from 'react';
import { motion } from 'motion/react';

interface CuteAstronautProps {
  expression?: 'normal' | 'happy' | 'shocked' | 'dizzy';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  floating?: boolean;
  className?: string;
}

export const CuteAstronaut: React.FC<CuteAstronautProps> = ({
  expression = 'normal',
  size = 'md',
  floating = true,
  className = '',
}) => {
  // Enlarged base size map across all screens
  const sizeMap = {
    sm: { width: 92, height: 106 },
    md: { width: 136, height: 156 },
    lg: { width: 200, height: 230 },
    xl: { width: 280, height: 322 },
    '2xl': { width: 350, height: 402 },
  };

  const { width, height } = sizeMap[size];

  // Dynamic animation variants based on expression:
  // - Happy: Energetic celebratory jump & bounce with joyful tilts
  // - Shocked: Comical panic trembling, jagged vibration & startle jitter
  // - Dizzy: Gentle zero-gravity limp drift while soul floats upward
  // - Normal: Whimsical gentle float
  const getBodyAnimation = () => {
    if (!floating && expression === 'normal') return {};

    switch (expression) {
      case 'happy':
        return {
          y: [0, -26, 0, -16, 0],
          rotate: [-7, 7, -5, 5, 0],
          scale: [1, 1.08, 0.96, 1.05, 1],
          transition: {
            duration: 1.25,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          },
        };
      case 'shocked':
        return {
          x: [-7, 7, -5, 5, -3, 3, -1, 1, 0],
          y: [-12, 4, -6, 2, 0],
          rotate: [-4, 4, -3, 3, 0],
          transition: {
            duration: 0.5,
            repeat: Infinity,
            ease: 'linear' as const,
          },
        };
      case 'dizzy':
        return {
          y: [0, 4, 0],
          rotate: [-10, -6, -10],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          },
        };
      case 'normal':
      default:
        return floating
          ? {
              y: [0, -8, 0],
              rotate: [0, 3, -3, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut' as const,
              },
            }
          : {};
    }
  };

  return (
    <motion.div
      animate={getBodyAnimation()}
      style={{ width, height }}
      className={`relative inline-block select-none pointer-events-none drop-shadow-xl ${className}`}
    >
      <svg
        viewBox="0 0 140 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Spacesuit Gradient - Soft creamy white with cute shading */}
          <linearGradient id="suitGrad" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#f0fdf4" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          {/* Opaque Reflective Gold/Amber Visor (No face inside, rich candy shine) */}
          <linearGradient id="goldVisorGrad" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="25%" stopColor="#f59e0b" />
            <stop offset="65%" stopColor="#d97706" />
            <stop offset="90%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          {/* Visor Outer Rim Metallic Bezel */}
          <linearGradient id="visorRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Backpack Gradient */}
          <linearGradient id="packGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* Helmet Glow highlight */}
          <radialGradient id="helmetShine" cx="30%" cy="25%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* Cute Soul Ghost Gradient */}
          <linearGradient id="soulGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* ========================================================================= */}
        {/* DEFEAT / DIZZY: CUTE LITTLE SOUL & CUTE CHIBI SKULL FLOATING OUT          */}
        {/* ========================================================================= */}
        {expression === 'dizzy' && (
          <motion.g
            id="cute-soul-animation"
            animate={{
              y: [-2, -28, -44, -32, -2],
              x: [0, 8, -6, 4, 0],
              opacity: [0.75, 1, 0.9, 1, 0.75],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Ethereal Glow behind the soul */}
            <circle cx="70" cy="22" r="22" fill="#38bdf8" fillOpacity="0.25" filter="blur(6px)" />

            {/* --- CUTE SOUL BODY (幽靈小靈魂) --- */}
            <path
              d="M52 28 C50 14 60 4 70 4 C80 4 90 14 88 28 C87 36 82 38 78 35 C75 32 72 38 70 38 C68 38 65 32 62 35 C58 38 53 36 52 28 Z"
              fill="url(#soulGrad)"
              stroke="#bae6fd"
              strokeWidth="1.5"
            />

            {/* Cute Soul's tiny ghost arms */}
            <path d="M52 20 C46 19 44 24 49 26" fill="none" stroke="#bae6fd" strokeWidth="2" strokeLinecap="round" />
            <path d="M88 20 C94 19 96 24 91 26" fill="none" stroke="#bae6fd" strokeWidth="2" strokeLinecap="round" />

            {/* Cute Soul's peaceful smiling face */}
            {/* Round dot eyes */}
            <circle cx="63" cy="16" r="2.2" fill="#0369a1" />
            <circle cx="77" cy="16" r="2.2" fill="#0369a1" />
            {/* Eye twinkles */}
            <circle cx="63.7" cy="15.3" r="0.8" fill="#ffffff" />
            <circle cx="77.7" cy="15.3" r="0.8" fill="#ffffff" />
            {/* Rosy blushing pink cheeks */}
            <circle cx="58" cy="20" r="3.2" fill="#f472b6" fillOpacity="0.8" />
            <circle cx="82" cy="20" r="3.2" fill="#f472b6" fillOpacity="0.8" />
            {/* Sweet curved happy smile */}
            <path d="M67 20 Q70 23 73 20" fill="none" stroke="#0369a1" strokeWidth="1.5" strokeLinecap="round" />

            {/* --- CUTE CHIBI SKULL (超萌小骷髏) --- */}
            <g transform="translate(86, 0)">
              {/* Golden Angel Halo over the cute skull */}
              <ellipse cx="14" cy="2" rx="10" ry="3.5" fill="none" stroke="#facc15" strokeWidth="1.8" />

              {/* Cute Round Skull Head */}
              <path
                d="M4 14 C4 8 8 4 14 4 C20 4 24 8 24 14 C24 18 22 20 20 21 L20 25 C20 26 18 27 14 27 C10 27 8 26 8 25 L8 21 C6 20 4 18 4 14 Z"
                fill="#ffffff"
                stroke="#94a3b8"
                strokeWidth="1.5"
              />

              {/* Big Anime Eyes (Round & cute, definitely not scary) */}
              <circle cx="10" cy="13" r="3.2" fill="#1e293b" />
              <circle cx="18" cy="13" r="3.2" fill="#1e293b" />
              {/* Big cute sparkles inside eyes */}
              <circle cx="10.8" cy="12" r="1.3" fill="#ffffff" />
              <circle cx="18.8" cy="12" r="1.3" fill="#ffffff" />

              {/* Cute Pink Blushing Cheeks on skull */}
              <ellipse cx="7" cy="16" rx="2" ry="1.2" fill="#fb7185" fillOpacity="0.85" />
              <ellipse cx="21" cy="16" rx="2" ry="1.2" fill="#fb7185" fillOpacity="0.85" />

              {/* Tiny inverted heart nose */}
              <path d="M13.5 17 L14 16 L14.5 17 Z" fill="#64748b" />

              {/* Cute tiny toothy smile */}
              <path d="M11 23 L11 25 M14 23 L14 25 M17 23 L17 25" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
            </g>

            {/* Floating soul bubble sparkles */}
            <circle cx="50" cy="38" r="2.5" fill="#38bdf8" fillOpacity="0.8" />
            <circle cx="94" cy="35" r="3" fill="#facc15" fillOpacity="0.8" />
            <circle cx="42" cy="16" r="1.8" fill="#e0f2fe" />
          </motion.g>
        )}

        {/* ========================================================================= */}
        {/* ASTRONAUT BODY ELEMENTS                                                   */}
        {/* ========================================================================= */}

        {/* --- BACKPACK & CANDY OXYGEN CYLINDERS --- */}
        <rect
          x="38"
          y="72"
          width="64"
          height="50"
          rx="16"
          fill="url(#packGrad)"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        {/* Dual rounded cute oxygen cylinders */}
        <rect x="43" y="76" width="16" height="34" rx="8" fill="#38bdf8" />
        <rect x="46" y="80" width="7" height="22" rx="3.5" fill="#ffffff" fillOpacity="0.5" />
        <rect x="81" y="76" width="16" height="34" rx="8" fill="#38bdf8" />
        <rect x="84" y="80" width="7" height="22" rx="3.5" fill="#ffffff" fillOpacity="0.5" />

        {/* Cute wobbling antenna with glowing bubble tip */}
        <line x1="70" y1="42" x2="70" y2="28" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
        <circle cx="70" cy="26" r="6.5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
        <circle cx="68" cy="24" r="2.5" fill="#ffffff" />

        {/* --- LEGS & BOOTS (CHUBBY ROUNDED 2-HEAD PROPORTIONS) --- */}
        {expression === 'happy' ? (
          /* Joyful high kick / jump: Left leg grounded, right leg kicked high with joy! */
          <g id="legs-happy">
            {/* Left leg */}
            <rect x="46" y="122" width="20" height="24" rx="10" fill="url(#suitGrad)" stroke="#cbd5e1" strokeWidth="2" transform="rotate(-6 56 122)" />
            <ellipse cx="50" cy="148" rx="13" ry="7" fill="#0284c7" />
            <ellipse cx="50" cy="147" rx="8" ry="3.5" fill="#38bdf8" />

            {/* Right leg playfully kicking high in the air! */}
            <rect x="74" y="118" width="20" height="25" rx="10" fill="url(#suitGrad)" stroke="#cbd5e1" strokeWidth="2" transform="rotate(28 84 118)" />
            <ellipse cx="102" cy="138" rx="13" ry="7" fill="#0284c7" transform="rotate(28 102 138)" />
            <ellipse cx="102" cy="137" rx="8" ry="3.5" fill="#38bdf8" transform="rotate(28 102 137)" />
          </g>
        ) : expression === 'shocked' ? (
          /* Splayed knock-kneed trembling legs in extreme panic */
          <g id="legs-shocked">
            <rect x="42" y="124" width="20" height="24" rx="10" fill="url(#suitGrad)" stroke="#cbd5e1" strokeWidth="2" transform="rotate(12 52 124)" />
            <ellipse cx="56" cy="148" rx="13" ry="7" fill="#f43f5e" />

            <rect x="78" y="124" width="20" height="24" rx="10" fill="url(#suitGrad)" stroke="#cbd5e1" strokeWidth="2" transform="rotate(-12 88 124)" />
            <ellipse cx="84" cy="148" rx="13" ry="7" fill="#f43f5e" />
          </g>
        ) : (
          /* Normal chubby relaxed moon boots */
          <g id="legs-normal">
            <rect x="46" y="124" width="20" height="24" rx="10" fill="url(#suitGrad)" stroke="#cbd5e1" strokeWidth="2" />
            <ellipse cx="56" cy="148" rx="13" ry="7" fill="#475569" />
            <ellipse cx="56" cy="147" rx="7" ry="3" fill="#64748b" />

            <rect x="74" y="124" width="20" height="24" rx="10" fill="url(#suitGrad)" stroke="#cbd5e1" strokeWidth="2" />
            <ellipse cx="84" cy="148" rx="13" ry="7" fill="#475569" />
            <ellipse cx="84" cy="147" rx="7" ry="3" fill="#64748b" />
          </g>
        )}

        {/* --- SUIT BODY (CHUBBY & ROUNDED) --- */}
        <rect
          x="42"
          y="90"
          width="56"
          height="42"
          rx="21"
          fill="url(#suitGrad)"
          stroke="#cbd5e1"
          strokeWidth="2"
        />

        {/* Cute Chest Tech Badge: Space Planet & Stars Emblem */}
        <rect x="54" y="99" width="32" height="18" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        {/* Cute Golden Star Badge */}
        <path
          d="M70 102 L71.5 106 L76 106.5 L72.5 109.5 L73.5 114 L70 111.5 L66.5 114 L67.5 109.5 L64 106.5 L68.5 106 Z"
          fill="#facc15"
        />
        <circle cx="59" cy="108" r="2.2" fill="#38bdf8" />
        <circle cx="81" cy="108" r="2.2" fill="#4ade80" />

        {/* --- ARMS & GESTURES (DRAMATIC CONTRAST: HAPPY VS SHOCKED) --- */}
        {expression === 'happy' ? (
          /* ======================================================== */
          /* HAPPY: CELEBRATORY DOUBLE HANDS RAISED HIGH IN THE AIR   */
          /* ======================================================== */
          <g id="arms-happy">
            {/* Left Arm high in the air */}
            <path
              d="M44 100 C30 90 14 62 24 50 C32 40 44 68 50 92"
              fill="url(#suitGrad)"
              stroke="#cbd5e1"
              strokeWidth="2.5"
            />
            {/* Left Glove with cute thumb up! */}
            <circle cx="22" cy="46" r="10.5" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            {/* Thumb */}
            <ellipse cx="28" cy="40" rx="4" ry="6" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" transform="rotate(30 28 40)" />
            <circle cx="21" cy="45" r="4" fill="#ffffff" fillOpacity="0.5" />

            {/* Right Arm high in the air */}
            <path
              d="M96 100 C110 90 126 62 116 50 C108 40 96 68 90 92"
              fill="url(#suitGrad)"
              stroke="#cbd5e1"
              strokeWidth="2.5"
            />
            {/* Right Glove with cute thumb up! */}
            <circle cx="118" cy="46" r="10.5" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            {/* Thumb */}
            <ellipse cx="112" cy="40" rx="4" ry="6" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" transform="rotate(-30 112 40)" />
            <circle cx="117" cy="45" r="4" fill="#ffffff" fillOpacity="0.5" />

            {/* HAPPY CELEBRATION BURST FX: Golden stars, sparkles & music note */}
            {/* Golden Star Left */}
            <path
              d="M8 32 L10.5 24 L18 22 L10.5 19 L8 12 L5.5 19 L-2 22 L5.5 24 Z"
              fill="#facc15"
              transform="translate(10, 4) scale(0.9)"
            />
            {/* Cyan Sparkle Right */}
            <path
              d="M8 32 L10.5 24 L18 22 L10.5 19 L8 12 L5.5 19 L-2 22 L5.5 24 Z"
              fill="#38bdf8"
              transform="translate(112, 4) scale(0.9)"
            />
            {/* Little Pink Star */}
            <path
              d="M6 24 L7.5 18 L13 16.5 L7.5 14 L6 9 L4.5 14 L-1 16.5 L4.5 18 Z"
              fill="#f472b6"
              transform="translate(64, -2) scale(0.85)"
            />
            {/* Happy Little Music Note */}
            <path
              d="M32 20 L32 10 L40 8 L40 14 M32 14 A 3 3 0 1 1 28 17 A 3 3 0 0 1 32 14"
              fill="#facc15"
              stroke="#f59e0b"
              strokeWidth="1.2"
            />
          </g>
        ) : expression === 'shocked' ? (
          /* ======================================================== */
          /* SHOCKED: HANDS CLUTCHING HELMET IN SHEER PANIC (😱)      */
          /* ======================================================== */
          <g id="arms-shocked">
            {/* Left Arm clutching the side of the helmet */}
            <path
              d="M44 102 C28 98 22 72 32 58 C38 52 46 62 48 76"
              fill="url(#suitGrad)"
              stroke="#cbd5e1"
              strokeWidth="2.5"
            />
            {/* Left Glove frantically clutching the left cheek of helmet */}
            <circle cx="34" cy="58" r="11" fill="#f43f5e" stroke="#be123c" strokeWidth="2" />
            <circle cx="33" cy="57" r="4.5" fill="#ffffff" fillOpacity="0.45" />

            {/* Right Arm clutching the other side of the helmet */}
            <path
              d="M96 102 C112 98 118 72 108 58 C102 52 94 62 92 76"
              fill="url(#suitGrad)"
              stroke="#cbd5e1"
              strokeWidth="2.5"
            />
            {/* Right Glove frantically clutching the right cheek of helmet */}
            <circle cx="106" cy="58" r="11" fill="#f43f5e" stroke="#be123c" strokeWidth="2" />
            <circle cx="107" cy="57" r="4.5" fill="#ffffff" fillOpacity="0.45" />

            {/* SHOCKED COMICAL PANIC FX: Giant sweat drops & panic marks */}
            {/* Big Cartoon Sweat Drops splashing outward */}
            <path
              d="M18 42 C12 36 10 48 18 52 C24 54 28 48 22 42 Z"
              fill="#38bdf8"
              stroke="#0284c7"
              strokeWidth="1.5"
            />
            <path
              d="M122 42 C128 36 130 48 122 52 C116 54 112 48 118 42 Z"
              fill="#38bdf8"
              stroke="#0284c7"
              strokeWidth="1.5"
            />

            {/* Dramatic Cartoon Lightning / Panic Tremor Zaps */}
            <path
              d="M12 72 L6 80 L14 82 L8 92"
              fill="none"
              stroke="#facc15"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M128 72 L134 80 L126 82 L132 92"
              fill="none"
              stroke="#facc15"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Giant Exclamation Marks Jumping over Head */}
            <g transform="translate(63, 2)">
              <rect x="0" y="0" width="4.5" height="13" rx="2.2" fill="#facc15" stroke="#d97706" strokeWidth="1" />
              <circle cx="2.25" cy="17.5" r="2.4" fill="#facc15" stroke="#d97706" strokeWidth="1" />
            </g>
            <g transform="translate(73, 0)">
              <rect x="0" y="0" width="5" height="15" rx="2.5" fill="#f43f5e" stroke="#be123c" strokeWidth="1" />
              <circle cx="2.5" cy="20" r="2.6" fill="#f43f5e" stroke="#be123c" strokeWidth="1" />
            </g>
          </g>
        ) : expression === 'dizzy' ? (
          /* Dizzy: Limp, dangling arms floating in zero-g */
          <g id="arms-dizzy">
            <path
              d="M44 98 C30 110 26 132 36 134 C44 136 48 118 50 106"
              fill="url(#suitGrad)"
              stroke="#cbd5e1"
              strokeWidth="2"
            />
            <circle cx="36" cy="134" r="9" fill="#94a3b8" />

            <path
              d="M96 98 C110 110 114 132 104 134 C96 136 92 118 90 106"
              fill="url(#suitGrad)"
              stroke="#cbd5e1"
              strokeWidth="2"
            />
            <circle cx="104" cy="134" r="9" fill="#94a3b8" />
          </g>
        ) : (
          /* Normal: Friendly, rounded chubby floating arms */
          <g id="arms-normal">
            <path
              d="M42 98 C28 106 26 120 36 122 C44 124 48 112 50 104"
              fill="url(#suitGrad)"
              stroke="#cbd5e1"
              strokeWidth="2"
            />
            <circle cx="35" cy="122" r="9.5" fill="#0284c7" />

            <path
              d="M98 98 C112 106 114 120 104 122 C96 124 92 112 90 104"
              fill="url(#suitGrad)"
              stroke="#cbd5e1"
              strokeWidth="2"
            />
            <circle cx="105" cy="122" r="9.5" fill="#0284c7" />
          </g>
        )}

        {/* --- OVERSIZED CUTE ROUNDED HELMET (BIG & CHUBBY) --- */}
        <circle cx="70" cy="58" r="36" fill="url(#suitGrad)" stroke="#cbd5e1" strokeWidth="2.5" />
        <ellipse cx="60" cy="36" rx="20" ry="10" fill="url(#helmetShine)" />

        {/* --- HELMET NECK RING --- */}
        <rect x="48" y="88" width="44" height="9" rx="4.5" fill="#94a3b8" stroke="#64748b" strokeWidth="1.5" />

        {/* --- VISOR: OPAQUE REFLECTIVE AMBER/GOLD METALLIC SHIELD (NO FACE VISIBLE) --- */}
        {/* Outer visor bezel rim */}
        <rect
          x="40"
          y="37"
          width="60"
          height="42"
          rx="21"
          fill="url(#visorRimGrad)"
          stroke="#334155"
          strokeWidth="2"
        />

        {/* Opaque Reflective Golden Mirror Shield (Completely covers face) */}
        <rect
          x="43"
          y="40"
          width="54"
          height="36"
          rx="18"
          fill="url(#goldVisorGrad)"
        />

        {/* Glossy Curved Horizon Specular Reflection */}
        <path
          d="M 52 46 Q 70 41 88 47 Q 85 53 70 48 Q 55 49 52 46 Z"
          fill="#ffffff"
          fillOpacity="0.9"
        />

        {/* Secondary Lower Crescent Reflection */}
        <path
          d="M 53 64 Q 70 59 87 65 Q 84 70 70 65 Q 56 66 53 64 Z"
          fill="#fef08a"
          fillOpacity="0.45"
        />

        {/* Cute 4-Point Star Glint on the Visor corner (✦) */}
        <path
          d="M 85 50 L 86.5 45 L 88 50 L 93 51.5 L 88 53 L 86.5 58 L 85 53 L 80 51.5 Z"
          fill="#ffffff"
          fillOpacity="0.95"
        />
      </svg>
    </motion.div>
  );
};
