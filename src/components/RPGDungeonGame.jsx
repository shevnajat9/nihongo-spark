import React, { useState, useEffect, useRef } from 'react';

const ArrowLeft = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
);
const Swords = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2M9.5 17.5L21 6V3h-3L6.5 14.5M11 19l-6-6M8 16l-4 4M5 21l-2-2"/></svg>
);
const Shield = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);
const Heart = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="currentColor" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
);
const Zap = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
);
const Sparkles = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M8.757 15.243l-2.121 2.121m12.728 0l-2.121-2.121M8.757 8.757L6.636 6.636"/></svg>
);
const Trophy = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 21h8m-4-4v4M6 4h12a2 2 0 012 2v2a6 6 0 01-6 6h-4a6 6 0 01-6-6V6a2 2 0 012-2zM4 6H2a2 2 0 00-2 2 4 4 0 004 4h2M20 6h2a2 2 0 012 2 4 4 0 01-4 4h-2"/></svg>
);
const RotateCcw = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 4v6h6M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
);
const Volume2 = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5zm4.54 3.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14"/></svg>
);
const VolumeX = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5zm12 4l-6 6m0-6l6 6"/></svg>
);
const Flame = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>
);

// =========================================================================
// VECTOR ILLUSTRATIONS: WIDESCREEN FLOOR SCENERIES (16:9 / Cinematic)
// =========================================================================

const FloorBackgroundIllustration = ({ floor }) => {
  const commonStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 0
  };

  if (floor === 1) {
    // Floor 1: Hutan Kanji N5 (Lush Forest Canopy, Pine Ridge, Full Moon)
    return (
      <svg style={commonStyle} viewBox="0 0 1000 360" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="f1-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#02170e" />
            <stop offset="55%" stopColor="#063321" />
            <stop offset="100%" stopColor="#0a462c" />
          </linearGradient>
          <linearGradient id="f1-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a462d" />
            <stop offset="35%" stopColor="#063120" />
            <stop offset="100%" stopColor="#02140c" />
          </linearGradient>
        </defs>
        <rect width="1000" height="360" fill="url(#f1-sky)" />
        {/* Full Luminous Moon */}
        <circle cx="820" cy="65" r="42" fill="#fef08a" opacity="0.25" filter="blur(10px)" />
        <circle cx="820" cy="65" r="30" fill="#fef9c3" opacity="0.85" />
        {/* Distant Pine Mountains */}
        <path d="M-50 200 L100 90 L260 200 L440 80 L600 190 L780 70 L950 200 L1050 120 L1050 360 L-50 360 Z" fill="#042417" opacity="0.75" />
        {/* Mid-distance Forest Ridge */}
        <path d="M0 220 Q250 160 500 210 T1000 200 L1000 360 L0 360 Z" fill="#063220" />
        {/* Level Arena Ground Floor (Parallel Baseline) */}
        <path d="M0 245 Q500 235 1000 245 L1000 360 L0 360 Z" fill="url(#f1-ground)" />
        {/* Ambient Spores */}
        <circle cx="200" cy="150" r="3.5" fill="#a7f3d0" opacity="0.8" />
        <circle cx="380" cy="120" r="3" fill="#6ee7b7" opacity="0.7" />
        <circle cx="620" cy="140" r="4" fill="#fef08a" opacity="0.75" />
        <circle cx="880" cy="160" r="3" fill="#a7f3d0" opacity="0.6" />
      </svg>
    );
  }

  if (floor === 2) {
    // Floor 2: Gua Konjugasi N4 (Crystal Cavern, Stalactites, Violet/Cyan Crystals)
    return (
      <svg style={commonStyle} viewBox="0 0 1000 360" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="f2-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#100520" />
            <stop offset="55%" stopColor="#210a40" />
            <stop offset="100%" stopColor="#371266" />
          </linearGradient>
          <linearGradient id="f2-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#280c4a" />
            <stop offset="50%" stopColor="#18062e" />
            <stop offset="100%" stopColor="#0b0214" />
          </linearGradient>
        </defs>
        <rect width="1000" height="360" fill="url(#f2-sky)" />
        {/* Cave Ceiling Stalactites */}
        <polygon points="50,0 70,80 90,0" fill="#1b0a33" />
        <polygon points="160,0 190,120 220,0" fill="#140727" />
        <polygon points="340,0 360,70 380,0" fill="#200d3d" />
        <polygon points="620,0 650,110 680,0" fill="#18082e" />
        <polygon points="820,0 850,90 880,0" fill="#1b0a33" />
        {/* Glowing Crystal Clusters */}
        <polygon points="130,220 150,130 170,220" fill="#22d3ee" opacity="0.75" />
        <polygon points="160,225 175,150 190,225" fill="#a855f7" opacity="0.8" />
        <polygon points="810,210 830,120 850,210" fill="#c084fc" opacity="0.8" />
        <polygon points="840,215 855,145 875,215" fill="#38bdf8" opacity="0.7" />
        {/* Level Cavern Floor */}
        <path d="M0 240 Q500 230 1000 240 L1000 360 L0 360 Z" fill="url(#f2-ground)" />
      </svg>
    );
  }

  if (floor === 3) {
    // Floor 3: Kuil Tengu N3 (Mountaintop Twilight, Torii Gate Silhouette, Falling Momiji)
    return (
      <svg style={commonStyle} viewBox="0 0 1000 360" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="f3-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#18030c" />
            <stop offset="40%" stopColor="#570f1e" />
            <stop offset="75%" stopColor="#a81919" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="f3-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3d101c" />
            <stop offset="50%" stopColor="#240810" />
            <stop offset="100%" stopColor="#100206" />
          </linearGradient>
        </defs>
        <rect width="1000" height="360" fill="url(#f3-sky)" />
        {/* Giant Setting Sun */}
        <circle cx="500" cy="170" r="85" fill="#fef08a" opacity="0.9" />
        {/* Sacred Mountain Silhouette */}
        <path d="M220 250 L500 80 L780 250 Z" fill="#2d0812" opacity="0.85" />
        {/* Torii Gate Silhouette */}
        <g fill="#170308" opacity="0.95">
          <rect x="460" y="125" width="80" height="7" rx="2" />
          <rect x="450" y="115" width="100" height="8" rx="2" />
          <rect x="475" y="125" width="8" height="90" />
          <rect x="517" y="125" width="8" height="90" />
        </g>
        {/* Level Shrine Courtyard Floor */}
        <path d="M0 245 Q500 235 1000 245 L1000 360 L0 360 Z" fill="url(#f3-ground)" />
        {/* Falling Momiji Leaves */}
        <ellipse cx="280" cy="140" rx="7" ry="4" transform="rotate(35 280 140)" fill="#f87171" opacity="0.85" />
        <ellipse cx="720" cy="110" rx="6" ry="3.5" transform="rotate(-30 720 110)" fill="#fca5a5" opacity="0.8" />
      </svg>
    );
  }

  if (floor === 4) {
    // Floor 4: Benteng Kastil Keigo N2 (Midnight Fortress, Full Moon, Sakura Petals)
    return (
      <svg style={commonStyle} viewBox="0 0 1000 360" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="f4-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#020610" />
            <stop offset="50%" stopColor="#0a142e" />
            <stop offset="100%" stopColor="#162c52" />
          </linearGradient>
          <linearGradient id="f4-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#142347" />
            <stop offset="50%" stopColor="#0b142b" />
            <stop offset="100%" stopColor="#03060f" />
          </linearGradient>
        </defs>
        <rect width="1000" height="360" fill="url(#f4-sky)" />
        {/* Big Luminescent Full Moon */}
        <circle cx="800" cy="75" r="48" fill="#e0f2fe" opacity="0.25" filter="blur(10px)" />
        <circle cx="800" cy="75" r="36" fill="#f8fafc" opacity="0.9" />
        {/* Pagoda Silhouette */}
        <path d="M0 160 L60 135 L120 160 L120 250 L0 250 Z" fill="#070d1e" />
        <path d="M30 120 L60 100 L90 120 L90 135 L30 135 Z" fill="#070d1e" />
        <path d="M880 150 L940 120 L1000 150 L1000 250 L880 250 Z" fill="#050a17" />
        {/* Level Castle Courtyard Floor */}
        <path d="M0 240 Q500 230 1000 240 L1000 360 L0 360 Z" fill="url(#f4-ground)" />
        {/* Floating Sakura Petals */}
        <ellipse cx="300" cy="140" rx="7" ry="3.5" transform="rotate(30 300 140)" fill="#f472b6" opacity="0.85" />
        <ellipse cx="680" cy="120" rx="6" ry="3" transform="rotate(-25 680 120)" fill="#fbcfe8" opacity="0.8" />
      </svg>
    );
  }

  // Floor 5: Puncak Naga Abadi N1 (Cosmic Storm, Thunder Bolts, Golden Nebula)
  return (
    <svg style={commonStyle} viewBox="0 0 1000 360" preserveAspectRatio="none" fill="none">
      <defs>
        <linearGradient id="f5-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#140701" />
          <stop offset="45%" stopColor="#301503" />
          <stop offset="100%" stopColor="#542806" />
        </linearGradient>
        <linearGradient id="f5-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f1e03" />
          <stop offset="50%" stopColor="#220f01" />
          <stop offset="100%" stopColor="#0e0400" />
        </linearGradient>
      </defs>
      <rect width="1000" height="360" fill="url(#f5-sky)" />
      {/* Thunder Nebula Core */}
      <circle cx="500" cy="130" r="160" fill="#ea580c" opacity="0.3" filter="blur(30px)" />
      <circle cx="500" cy="115" r="80" fill="#facc15" opacity="0.4" filter="blur(20px)" />
      {/* Lightning Bolts */}
      <polyline points="380,10 360,80 395,90 350,210" stroke="#fef08a" strokeWidth="3.5" filter="drop-shadow(0 0 8px #fde047)" opacity="0.85" />
      <polyline points="620,15 600,75 630,90 590,190" stroke="#67e8f9" strokeWidth="3" filter="drop-shadow(0 0 8px #22d3ee)" opacity="0.8" />
      {/* Level Mountain Summit Ground */}
      <path d="M0 245 Q500 230 1000 245 L1000 360 L0 360 Z" fill="url(#f5-ground)" />
    </svg>
  );
};

// =========================================================================
// VECTOR SPRITE: PLAYER HERO (Proportionate Widescreen Battler)
// =========================================================================

const HeroPlayerIllustration = ({ isAttacking, isHit }) => {
  return (
    <div className="relative w-24 h-32 sm:w-28 sm:h-36 flex items-center justify-center select-none">
      <svg
        viewBox="0 0 140 170"
        className={`w-full h-full transition-transform duration-200 ${
          isAttacking
            ? 'scale-115 drop-shadow-[0_0_24px_#38bdf8]'
            : isHit
            ? 'drop-shadow-[0_0_24px_#ef4444]'
            : 'drop-shadow-[0_10px_16px_rgba(0,0,0,0.6)]'
        }`}
      >
        <defs>
          <linearGradient id="hero-coat" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3730a3" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
          <linearGradient id="hero-cape" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="hero-blade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* Character Ground Shadow */}
        <ellipse cx="68" cy="155" rx="36" ry="9" fill="#000000" opacity="0.6" filter="blur(3px)" />

        {/* Flowing Crimson Cape */}
        <path
          d={isAttacking ? "M45 70 Q10 95 8 135 Q48 120 68 105 Z" : "M45 70 Q18 95 24 140 Q56 125 68 105 Z"}
          fill="url(#hero-cape)"
          stroke="#ef4444"
          strokeWidth="1.5"
        />

        {/* Armored Boots & Legs */}
        <rect x="46" y="112" width="14" height="40" rx="6" fill="#0f172a" />
        <rect x="68" y="112" width="14" height="40" rx="6" fill="#0f172a" />
        <rect x="44" y="142" width="18" height="12" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
        <rect x="66" y="142" width="18" height="12" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />

        {/* Tamer Combat Coat / Torso */}
        <rect x="42" y="68" width="46" height="52" rx="10" fill="url(#hero-coat)" stroke="#818cf8" strokeWidth="2.5" />
        {/* Golden Shoulder Armor Epaulets */}
        <rect x="36" y="68" width="14" height="14" rx="4" fill="#f59e0b" stroke="#fef08a" strokeWidth="1.5" />
        <rect x="78" y="68" width="14" height="14" rx="4" fill="#f59e0b" stroke="#fef08a" strokeWidth="1.5" />
        {/* Belt with Kanji Talisman Buckle */}
        <rect x="40" y="98" width="50" height="8" rx="2" fill="#d97706" />
        <circle cx="65" cy="102" r="6" fill="#fef08a" stroke="#d97706" strokeWidth="1.5" />

        {/* Hero Head & Anime Skin */}
        <circle cx="65" cy="50" r="20" fill="#fed7aa" stroke="#fbbf24" strokeWidth="1" />
        {/* Rosy Cheeks */}
        <ellipse cx="54" cy="55" rx="3.5" ry="2" fill="#fca5a5" />
        <ellipse cx="76" cy="55" rx="3.5" ry="2" fill="#fca5a5" />

        {/* Anime Eyes */}
        <ellipse cx="71" cy="48" rx="3.5" ry="5" fill="#0f172a" />
        <circle cx="72" cy="46" r="1.5" fill="#ffffff" />
        <circle cx="70" cy="50" r="1" fill="#38bdf8" />

        {/* Anime Spiky Hair */}
        <path
          d="M42 45 Q30 24 50 18 Q65 8 78 16 Q94 14 88 32 Q95 40 82 50 Q65 30 42 45 Z"
          fill="#1e293b"
        />
        <polygon points="52,32 60,46 56,32" fill="#334155" />
        <polygon points="65,30 72,46 70,30" fill="#334155" />

        {/* Headband with Glowing Core Gem */}
        <path d="M46 38 Q65 34 84 39" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
        <circle cx="65" cy="37" r="3.5" fill="#38bdf8" filter="drop-shadow(0 0 5px #0284c7)" />

        {/* Drawn Katana Sword Pointing Right Towards Monster */}
        <g transform={isAttacking ? "rotate(-25 80 80)" : "rotate(12 80 80)"}>
          <path
            d="M80 80 L135 32 L132 27 L77 75 Z"
            fill="url(#hero-blade)"
            filter="drop-shadow(0 0 10px #38bdf8)"
          />
          <ellipse cx="80" cy="78" rx="4" ry="7" transform="rotate(-40 80 78)" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
          <rect x="65" y="80" width="18" height="6" rx="2" transform="rotate(-40 65 80)" fill="#78350f" stroke="#fbbf24" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// VECTOR SPRITES: EVOLVING MONSTERS (Proportionate Widescreen Battler)
// =========================================================================

const MonsterIllustration = ({ floor, isAttacking, isHit, isDefeated }) => {
  const animClasses = isAttacking
    ? 'scale-115 drop-shadow-[0_0_24px_#f97316]'
    : isHit
    ? 'brightness-200 drop-shadow-[0_0_28px_#ef4444]'
    : isDefeated
    ? 'opacity-20 scale-50 blur-sm'
    : 'drop-shadow-[0_10px_20px_rgba(0,0,0,0.65)]';

  // -------------------------------------------------------------
  // FLOOR 1 (N5): Slime Hiragana (Cute Glossy Baby Monster)
  // -------------------------------------------------------------
  if (floor === 1) {
    return (
      <div className={`relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center select-none transition-all duration-200 ${animClasses}`}>
        <svg viewBox="0 0 140 140" className="w-full h-full">
          <defs>
            <radialGradient id="slime-grad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </radialGradient>
          </defs>
          <ellipse cx="70" cy="125" rx="45" ry="11" fill="#000000" opacity="0.5" filter="blur(3px)" />
          <path
            d="M70 20 C95 20, 125 65, 122 95 C118 122, 22 122, 18 95 C15 65, 45 20, 70 20 Z"
            fill="url(#slime-grad)"
            stroke="#34d399"
            strokeWidth="3.5"
          />
          <ellipse cx="55" cy="45" rx="18" ry="10" transform="rotate(-30 55 45)" fill="#ffffff" opacity="0.6" />
          <ellipse cx="50" cy="75" rx="7" ry="10" fill="#064e3b" />
          <circle cx="48" cy="72" r="3.5" fill="#ffffff" />
          <circle cx="52" cy="79" r="1.5" fill="#ffffff" />
          <ellipse cx="86" cy="75" rx="7" ry="10" fill="#064e3b" />
          <circle cx="84" cy="72" r="3.5" fill="#ffffff" />
          <circle cx="88" cy="79" r="1.5" fill="#ffffff" />
          <ellipse cx="38" cy="88" rx="6" ry="3" fill="#f87171" opacity="0.75" />
          <ellipse cx="98" cy="88" rx="6" ry="3" fill="#f87171" opacity="0.75" />
          <path d="M60 88 Q68 98 76 88" stroke="#064e3b" strokeWidth="3" strokeLinecap="round" fill="none" />
          <polygon points="68,14 74,4 80,14" fill="#fef08a" stroke="#f59e0b" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  // -------------------------------------------------------------
  // FLOOR 2 (N4): Goblin Partikel (Mischievous Spiked Imp)
  // -------------------------------------------------------------
  if (floor === 2) {
    return (
      <div className={`relative w-28 h-32 sm:w-32 sm:h-36 flex items-center justify-center select-none transition-all duration-200 ${animClasses}`}>
        <svg viewBox="0 0 150 160" className="w-full h-full">
          <defs>
            <linearGradient id="goblin-skin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#84cc16" />
              <stop offset="100%" stopColor="#4d7c0f" />
            </linearGradient>
          </defs>
          <ellipse cx="75" cy="148" rx="42" ry="9" fill="#000000" opacity="0.5" filter="blur(3px)" />
          <rect x="18" y="55" width="14" height="70" rx="5" transform="rotate(35 18 55)" fill="#78350f" stroke="#451a03" strokeWidth="2" />
          <polygon points="20,50 15,40 28,45" fill="#e2e8f0" />
          <polygon points="45,70 55,65 42,78" fill="#e2e8f0" />
          <rect x="52" y="75" width="46" height="52" rx="12" fill="#78350f" stroke="#b45309" strokeWidth="2" />
          <rect x="50" y="100" width="50" height="7" fill="#451a03" />
          <circle cx="75" cy="55" r="28" fill="url(#goblin-skin)" stroke="#3f6212" strokeWidth="2" />
          <polygon points="48,55 12,42 45,68" fill="url(#goblin-skin)" stroke="#3f6212" strokeWidth="2" />
          <polygon points="102,55 138,42 105,68" fill="url(#goblin-skin)" stroke="#3f6212" strokeWidth="2" />
          <polygon points="62,32 58,10 68,26" fill="#d97706" />
          <polygon points="88,32 92,10 82,26" fill="#d97706" />
          <ellipse cx="64" cy="54" rx="6" ry="5" fill="#fef08a" />
          <ellipse cx="64" cy="54" rx="2" ry="4" fill="#78350f" />
          <ellipse cx="86" cy="54" rx="6" ry="5" fill="#fef08a" />
          <ellipse cx="86" cy="54" rx="2" ry="4" fill="#78350f" />
          <polygon points="75,58 72,66 78,66" fill="#3f6212" />
          <path d="M62 70 Q75 78 88 70" stroke="#1f2937" strokeWidth="3" fill="#450a0a" />
          <polygon points="66,70 69,76 72,70" fill="#ffffff" />
          <polygon points="78,70 81,76 84,70" fill="#ffffff" />
        </svg>
      </div>
    );
  }

  // -------------------------------------------------------------
  // FLOOR 3 (N3): Tengu Angin Mistis (Winged Avian Demon Lord)
  // -------------------------------------------------------------
  if (floor === 3) {
    return (
      <div className={`relative w-30 h-34 sm:w-36 sm:h-40 flex items-center justify-center select-none transition-all duration-200 ${animClasses}`}>
        <svg viewBox="0 0 170 170" className="w-full h-full">
          <defs>
            <linearGradient id="tengu-wing" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="60%" stopColor="#431407" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
          </defs>
          <ellipse cx="85" cy="155" rx="52" ry="11" fill="#000000" opacity="0.5" filter="blur(3px)" />
          <path
            d="M75 70 C30 20, 0 45, 5 95 C15 125, 45 110, 75 95 Z"
            fill="url(#tengu-wing)"
            stroke="#f87171"
            strokeWidth="1.5"
          />
          <path
            d="M95 70 C140 20, 170 45, 165 95 C155 125, 125 110, 95 95 Z"
            fill="url(#tengu-wing)"
            stroke="#f87171"
            strokeWidth="1.5"
          />
          <rect x="60" y="80" width="50" height="60" rx="10" fill="#1c1917" stroke="#dc2626" strokeWidth="2" />
          <circle cx="70" cy="85" r="4" fill="#f59e0b" />
          <circle cx="85" cy="90" r="5" fill="#f59e0b" />
          <circle cx="100" cy="85" r="4" fill="#f59e0b" />
          <circle cx="85" cy="55" r="26" fill="#dc2626" stroke="#991b1b" strokeWidth="2.5" />
          <polygon points="85,50 120,58 85,62" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="1.5" />
          <circle cx="74" cy="50" r="5" fill="#fef08a" stroke="#000000" strokeWidth="1.5" />
          <circle cx="74" cy="50" r="2" fill="#000000" />
          <circle cx="94" cy="50" r="5" fill="#fef08a" stroke="#000000" strokeWidth="1.5" />
          <circle cx="94" cy="50" r="2" fill="#000000" />
          <g transform="rotate(-25 130 90)">
            <ellipse cx="130" cy="85" rx="14" ry="24" fill="#d97706" stroke="#fde047" strokeWidth="2" />
            <line x1="130" y1="85" x2="130" y2="125" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    );
  }

  // -------------------------------------------------------------
  // FLOOR 4 (N2): Samurai Bayangan (Demonic Armored Shadow Lord)
  // -------------------------------------------------------------
  if (floor === 4) {
    return (
      <div className={`relative w-30 h-36 sm:w-36 sm:h-42 flex items-center justify-center select-none transition-all duration-200 ${animClasses}`}>
        <svg viewBox="0 0 170 180" className="w-full h-full">
          <defs>
            <linearGradient id="samurai-blade" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#7e22ce" />
            </linearGradient>
            <linearGradient id="samurai-armor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#030712" />
            </linearGradient>
          </defs>
          <ellipse cx="85" cy="165" rx="52" ry="11" fill="#000000" opacity="0.6" filter="blur(4px)" />
          <path d="M40 100 Q20 70 30 40 Q45 70 50 100 Z" fill="#7e22ce" opacity="0.5" filter="blur(4px)" />
          <path d="M130 100 Q150 70 140 40 Q125 70 120 100 Z" fill="#7e22ce" opacity="0.5" filter="blur(4px)" />
          <rect x="52" y="80" width="66" height="65" rx="10" fill="url(#samurai-armor)" stroke="#6366f1" strokeWidth="2.5" />
          <rect x="28" y="80" width="22" height="34" rx="4" fill="#312e81" stroke="#a855f7" strokeWidth="2" />
          <rect x="120" y="80" width="22" height="34" rx="4" fill="#312e81" stroke="#a855f7" strokeWidth="2" />
          <path d="M52 65 C52 35, 118 35, 118 65 L124 78 L46 78 Z" fill="#0f172a" stroke="#a855f7" strokeWidth="2.5" />
          <path d="M60 30 Q85 8 110 30 Q85 18 60 30 Z" fill="#facc15" filter="drop-shadow(0 0 6px #eab308)" />
          <ellipse cx="72" cy="62" rx="7" ry="2.5" fill="#ef4444" filter="drop-shadow(0 0 6px #dc2626)" />
          <ellipse cx="98" cy="62" rx="7" ry="2.5" fill="#ef4444" filter="drop-shadow(0 0 6px #dc2626)" />
          <line x1="25" y1="140" x2="5" y2="40" stroke="url(#samurai-blade)" strokeWidth="4" strokeLinecap="round" filter="drop-shadow(0 0 8px #c084fc)" />
          <line x1="145" y1="140" x2="165" y2="40" stroke="url(#samurai-blade)" strokeWidth="4" strokeLinecap="round" filter="drop-shadow(0 0 8px #c084fc)" />
        </svg>
      </div>
    );
  }

  // -------------------------------------------------------------
  // FLOOR 5 (N1 BOSS): Naga Mahkota Kanji (Shenlong Celestial Dragon)
  // -------------------------------------------------------------
  return (
    <div className={`relative w-36 h-40 sm:w-44 sm:h-48 flex items-center justify-center select-none transition-all duration-200 ${animClasses}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="dragon-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id="dragon-belly" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="185" rx="65" ry="12" fill="#000000" opacity="0.6" filter="blur(4px)" />
        <path
          d="M30 150 Q10 80 70 80 Q140 80 120 140 Q100 180 160 170 Q195 160 185 105"
          fill="none"
          stroke="url(#dragon-body)"
          strokeWidth="30"
          strokeLinecap="round"
          filter="drop-shadow(0 0 16px rgba(56,189,248,0.6))"
        />
        <path
          d="M30 150 Q10 80 70 80 Q140 80 120 140 Q100 180 160 170 Q195 160 185 105"
          fill="none"
          stroke="url(#dragon-belly)"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <g transform="translate(10, 10)">
          <path d="M80 50 Q60 20 40 25 M60 25 Q50 10 35 15" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" fill="none" filter="drop-shadow(0 0 6px #f59e0b)" />
          <path d="M100 50 Q120 20 140 25 M120 25 Q130 10 145 15" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" fill="none" filter="drop-shadow(0 0 6px #f59e0b)" />
          <path d="M60 55 C60 40, 120 40, 120 55 L130 85 L50 85 Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="2.5" />
          <path d="M55 75 Q15 85 5 120" stroke="#fef08a" strokeWidth="2.5" fill="none" />
          <path d="M125 75 Q165 85 175 120" stroke="#fef08a" strokeWidth="2.5" fill="none" />
          <polygon points="68,54 80,50 76,58" fill="#facc15" filter="drop-shadow(0 0 4px #eab308)" />
          <polygon points="112,54 100,50 104,58" fill="#facc15" filter="drop-shadow(0 0 4px #eab308)" />
          <polygon points="65,85 70,95 75,85" fill="#ffffff" />
          <polygon points="105,85 110,95 115,85" fill="#ffffff" />
          <circle cx="90" cy="115" r="16" fill="#fef08a" stroke="#f59e0b" strokeWidth="3" filter="drop-shadow(0 0 16px #fbbf24)" />
          <text x="90" y="121" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#78350f">漢</text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// QUESTION DATA & FLOOR CONFIG
// =========================================================================

const DUNGEON_FLOORS = [
  {
    floor: 1,
    name: 'Hutan Kanji Pemula (N5)',
    levelLabel: 'N5 Pemula',
    monster: {
      name: 'Slime Hiragana (スライム)',
      title: 'Bos Dasar N5',
      maxHp: 80,
      atk: 12,
      exp: 40,
      gold: 25,
      description: 'Makhluk lendir lucu yang menjaga gerbang kanji dan partikel dasar.'
    },
    questions: [
      {
        q: 'Arti dari kanji 「水」 adalah...',
        options: ['Api', 'Air', 'Tanah', 'Pohon'],
        correct: 1,
        exp: '「水」(mizu) berarti air.'
      },
      {
        q: 'Partikel yang tepat: 「学校 ___ 行きます」',
        options: ['を', 'へ', 'が', 'で'],
        correct: 1,
        exp: 'Partikel 「へ」(he/e) digunakan untuk menunjukkan arah tujuan pergerakan.'
      },
      {
        q: 'Cara baca kanji 「食べる」 adalah...',
        options: ['のむ', 'たべる', 'みる', 'ねる'],
        correct: 1,
        exp: '「食べる」(taberu) berarti makan.'
      },
      {
        q: 'Lawan kata dari 「大きい」(ookii) adalah...',
        options: ['小さい', '高い', '長い', '早い'],
        correct: 0,
        exp: '「小さい」(chiisai) berarti kecil.'
      },
      {
        q: 'Angka 「百」 melambangkan nilai...',
        options: ['10', '100', '1.000', '10.000'],
        correct: 1,
        exp: '「百」(hyaku) berarti seratus.'
      }
    ]
  },
  {
    floor: 2,
    name: 'Gua Konjugasi Kata Kerja (N4)',
    levelLabel: 'N4 Lanjutan',
    monster: {
      name: 'Goblin Partikel (ゴブリン)',
      title: 'Bos Konjugasi N4',
      maxHp: 110,
      atk: 16,
      exp: 70,
      gold: 50,
      description: 'Goblin usil yang mengacaukan bentuk te-form dan pola kalimat syarat.'
    },
    questions: [
      {
        q: 'Bentuk te (て形) dari kata kerja 「行く」(iku) adalah...',
        options: ['行いて', '行いで', '行って', '行きて'],
        correct: 2,
        exp: '「行く」 adalah perkecualian kelompok 1, bentuk te-nya adalah 「行って」(itte).'
      },
      {
        q: 'Pola ~なければならない (~nakereba naranai) memiliki arti...',
        options: ['Boleh dilakukan', 'Harus dilakukan', 'Jangan dilakukan', 'Pernah dilakukan'],
        correct: 1,
        exp: 'Pola ini menyatakan kewajiban/keharusan (must do).'
      },
      {
        q: 'Bentuk potensial (dapat melakukan) dari 「話す」 adalah...',
        options: ['話せる', '話される', '話させる', '話しる'],
        correct: 0,
        exp: 'Kelompok 1: bunyi su berubah menjadi seru -> 話せる (hanaseru).'
      },
      {
        q: 'Arti dari 「雨が降っています」 adalah...',
        options: ['Hujan telah reda', 'Sedang turun hujan', 'Akan turun hujan', 'Hujan kemarin'],
        correct: 1,
        exp: 'Bentuk ~te iru menandakan aktivitas yang sedang berlangsung.'
      },
      {
        q: 'Kanji 「案内する」(annai suru) bermakna...',
        options: ['Memandu / memberi info', 'Meminta maaf', 'Berpikir', 'Berbelanja'],
        correct: 0,
        exp: '「案内」(annai) berarti memandu, mengantar atau memberi petunjuk jalan.'
      }
    ]
  },
  {
    floor: 3,
    name: 'Kuil Tengu Nuansa (N3)',
    levelLabel: 'N3 Menengah',
    monster: {
      name: 'Tengu Angin Mistis (天狗)',
      title: 'Penguji Nuansa N3',
      maxHp: 140,
      atk: 20,
      exp: 110,
      gold: 80,
      description: 'Siluman burung gagak bersayap lebar penguji tata bahasa tingkat menengah.'
    },
    questions: [
      {
        q: 'Pola ~わけにはいかない (~wake ni wa ikanai) mengekspresikan...',
        options: ['Pasti tidak mungkin secara fisik', 'Tidak bisa dilakukan karena alasan moral/sosial', 'Sangat mudah dilakukan', 'Kebetulan terjadi'],
        correct: 1,
        exp: 'Menyatakan tidak bisa melakukan sesuatu karena norma sosial/tanggung jawab moral.'
      },
      {
        q: 'Arti dari kata 「遠慮する」(enryo suru) adalah...',
        options: ['Mengeluh', 'Menahan diri / sungkan', 'Menyetujui', 'Memperbaiki'],
        correct: 1,
        exp: '「遠慮」 berarti menahan diri karena rasa segan atau kesopanan.'
      },
      {
        q: 'Pola ~おかげで (~okage de) digunakan saat hasil akhirnya...',
        options: ['Buruk / merugikan', 'Positif / berkat seseorang', 'Biasa saja', 'Tidak pasti'],
        correct: 1,
        exp: '「おかげで」 berarti "berkat..." dan digunakan untuk konsekuensi bernada positif.'
      },
      {
        q: 'Kanji 「解決」(kaiketsu) memiliki arti...',
        options: ['Perpisahan', 'Penyelesaian / Solusi', 'Kerusakan', 'Perjalanan'],
        correct: 1,
        exp: '「解決」 berarti pemecahan masalah atau resolusi.'
      },
      {
        q: 'Pola ~たて (~tate) seperti 「焼きたて」(yakitate) bermakna...',
        options: ['Terbakar hangus', 'Baru saja selesai dibuat / fresh', 'Sudah dingin', 'Sedang dipanggang'],
        correct: 1,
        exp: 'V-masu + たて berarti kondisi yang baru saja selesai terjadi (freshly made).'
      }
    ]
  },
  {
    floor: 4,
    name: 'Benteng Kastil Keigo (N2)',
    levelLabel: 'N2 Pra-Mahir',
    monster: {
      name: 'Samurai Bayangan (影の武士)',
      title: 'Pendekar Cursed Blade N2',
      maxHp: 175,
      atk: 24,
      exp: 160,
      gold: 120,
      description: 'Pendekar bayangan bersenjatakan pedang ungu bermuatan keigo dan peribahasa tajam.'
    },
    questions: [
      {
        q: 'Bentuk Kenjougo (merendah) dari 「行く・来る」 adalah...',
        options: ['いらっしゃる', 'おいでになる', '参る (mairu)', '召し上がる'],
        correct: 2,
        exp: '「参る」(mairu) adalah kenjougo untuk pergi dan datang.'
      },
      {
        q: 'Pola ~を契機に (~o keiki ni) memiliki makna mirip dengan...',
        options: ['~をきっかけに (sebagai pemicu/momentum)', '~のせいで (karena salah)', '~の代わりに (sebagai pengganti)', '~にもかかわらず (meskipun)'],
        correct: 0,
        exp: '「〜を契機に」 digunakan secara formal untuk mengindikasikan titik tolak / momentum perubahan besar.'
      },
      {
        q: 'Kata 「過言ではない」(kagon de wa nai) berarti...',
        options: ['Bohong belaka', 'Tidak berlebihan jika dikatakan', 'Kata yang salah', 'Tidak perlu dibahas'],
        correct: 1,
        exp: 'Bermakna "bukanlah pernyataan yang berlebihan jika dikatakan bahwa...".'
      },
      {
        q: 'Sinonim kanji dari 「柔軟」(juunan) adalah...',
        options: ['Kaku / stubborn', 'Fleksibel / luwes', 'Keras kepala', 'Rapuh'],
        correct: 1,
        exp: '「柔軟」 bermakna fleksibel, lentur, atau dapat beradaptasi.'
      },
      {
        q: 'Pola ~ざるを得ない (~zaru o enai) memiliki arti...',
        options: ['Sangat ingin melakukan', 'Terpaksa harus melakukan', 'Sama sekali tidak boleh', 'Tidak ingin menyentuh'],
        correct: 1,
        exp: 'Menunjukkan situasi terpaksa harus melakukan sesuatu meskipun enggan.'
      }
    ]
  },
  {
    floor: 5,
    name: 'Puncak Naga Abadi (N1 Boss)',
    levelLabel: 'N1 Legendaris',
    monster: {
      name: 'Naga Mahkota Kanji (漢字神龍)',
      title: 'Kaisar Tertinggi JLPT N1',
      maxHp: 220,
      atk: 28,
      exp: 300,
      gold: 250,
      description: 'Penguasa purba langit bahasa Jepang pemegang Mutiara Kanji Abadi bertanduk emas.'
    },
    questions: [
      {
        q: 'Pola ~極まりない (~kiwamarinai) berarti...',
        options: ['Sangat / luar biasa ekstrem (ekspresi emosi)', 'Hampir tidak ada', 'Hanya sebagian kecil', 'Belum pasti'],
        correct: 0,
        exp: 'Digunakan untuk menekankan kondisi yang sangat luar biasa (ekstrem).'
      },
      {
        q: 'Yojijukugo 「臥薪嘗胆」(gashin shoutan) menggambarkan peribahasa...',
        options: ['Menyerah sebelum perang', 'Berjuang keras menahan penderitaan demi membalas dendam/mencapai tujuan', 'Hidup damai tanpa ambisi', 'Teman setia seumur hidup'],
        correct: 1,
        exp: 'Kisah Yue Fei / Goujian: tidur di atas kayu berduri dan menjilat empedu demi tekad pantang menyerah.'
      },
      {
        q: 'Cara baca kanji 「巧み」 adalah...',
        options: ['たくみ (takumi)', 'くるしみ (kurushimi)', 'あやしみ (ayashimi)', 'いとなみ (itonami)'],
        correct: 0,
        exp: '「巧み」(takumi) bermakna mahir, terampil, atau cerdik.'
      },
      {
        q: 'Bentuk arkais/sastra dari 「〜ない」 yang sering muncul di N1 adalah...',
        options: ['〜ぬ / 〜ん', '〜けり', '〜たり', '〜べし'],
        correct: 0,
        exp: 'Bentuk negatif klasik adalah ~nu / ~n (misal: 知らぬが仏 - Shiranu ga hotoke).'
      },
      {
        q: 'Pola ~を皮切りに (~o kawakiri ni) bermakna...',
        options: ['Mengakhiri sebuah acara', 'Diawali dengan... lalu berturut-turut diikuti aksi lain', 'Membatalkan rencana awal', 'Memilih yang terbaik'],
        correct: 1,
        exp: 'Bermakna diawali oleh suatu peristiwa yang memicu serentetan peristiwa serupa berikutnya.'
      }
    ]
  }
];

export default function RPGDungeonGame({ onBack }) {
  // Player state
  const [player, setPlayer] = useState(() => {
    const saved = localStorage.getItem('nihongo_spark_rpg_hero');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      level: 1,
      hp: 100,
      maxHp: 100,
      mp: 50,
      maxMp: 50,
      exp: 0,
      nextExp: 100,
      gold: 50,
      potions: 3,
      highestFloorCleared: 0
    };
  });

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentFloorIdx, setCurrentFloorIdx] = useState(0);
  const [monsterHp, setMonsterHp] = useState(DUNGEON_FLOORS[0].monster.maxHp);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [battleState, setBattleState] = useState('player_turn');
  const [battleLogs, setBattleLogs] = useState([
    'Selamat datang di JLPT Monster Arena! Kalahkan bos di setiap tingkatan untuk menguji pemahaman bahasamu.'
  ]);
  const [critAlert, setCritAlert] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [timerLeft, setTimerLeft] = useState(10);
  const [eliminatedOptions, setEliminatedOptions] = useState([]);

  // Combat Visual Effects & Motion States
  const [heroAttacking, setHeroAttacking] = useState(false);
  const [monsterAttacking, setMonsterAttacking] = useState(false);
  const [monsterHit, setMonsterHit] = useState(false);
  const [heroHit, setHeroHit] = useState(false);
  const [slashActive, setSlashActive] = useState(false);
  const [damagePopup, setDamagePopup] = useState(null);
  const [healPopup, setHealPopup] = useState(false);
  const [monsterDefeatedAnim, setMonsterDefeatedAnim] = useState(false);

  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);

  // Current floor & question data
  const currentFloor = DUNGEON_FLOORS[currentFloorIdx] || DUNGEON_FLOORS[0];
  const currentQ = currentFloor.questions[questionIdx % currentFloor.questions.length];

  // Save hero stats
  useEffect(() => {
    localStorage.setItem('nihongo_spark_rpg_hero', JSON.stringify(player));
  }, [player]);

  // Audio synthesizer for retro 16-bit RPG sounds
  const playRetroSound = (type) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;

      if (type === 'hit') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.18);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'crit') {
        [320, 560, 840].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + i * 0.05);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + i * 0.05 + 0.2);
          gain.gain.setValueAtTime(0.3, now + i * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.2);
          osc.start(now + i * 0.05);
          osc.stop(now + i * 0.05 + 0.2);
        });
      } else if (type === 'hurt') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(130, now);
        osc.frequency.linearRampToValueAtTime(50, now + 0.25);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'heal') {
        [330, 440, 550, 660].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);
          gain.gain.setValueAtTime(0.2, now + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.06 + 0.15);
          osc.start(now + idx * 0.06);
          osc.stop(now + idx * 0.06 + 0.15);
        });
      } else if (type === 'victory') {
        const notes = [440, 554, 659, 880];
        notes.forEach((freq, idx) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, now + idx * 0.12);
          g.gain.setValueAtTime(0.3, now + idx * 0.12);
          g.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.2);
          o.start(now + idx * 0.12);
          o.stop(now + idx * 0.12 + 0.2);
        });
      }
    } catch {
      // Audio context fallback
    }
  };

  // Turn timer countdown
  useEffect(() => {
    if (battleState === 'player_turn') {
      setTimerLeft(10);
      setEliminatedOptions([]);
      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setTimerLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [battleState, questionIdx, currentFloorIdx]);

  const addLog = (msg) => {
    setBattleLogs((prev) => [msg, ...prev.slice(0, 7)]);
  };

  const handleTimeOut = () => {
    addLog(`⏰ Waktu habis! Kamu ragu-ragu dalam menjawab.`);
    triggerMonsterAttack();
  };
  const handleTimeOutRef = useRef(handleTimeOut);
  handleTimeOutRef.current = handleTimeOut;

  useEffect(() => {
    if (battleState === 'player_turn' && timerLeft === 0) {
      handleTimeOutRef.current();
    }
  }, [battleState, timerLeft]);

  // Player action: Answer chosen
  const handleSelectOption = (idx) => {
    if (battleState !== 'player_turn' || eliminatedOptions.includes(idx)) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedOption(idx);
    setBattleState('answering');

    const isCorrect = idx === currentQ.correct;
    const isCritical = isCorrect && timerLeft >= 7;

    if (isCorrect) {
      const baseDmg = 25 + player.level * 4;
      const damage = isCritical ? Math.round(baseDmg * 1.8) : baseDmg;

      // 1. Hero dashes straight horizontally towards monster
      setHeroAttacking(true);

      setTimeout(() => {
        // 2. Impact on monster
        setSlashActive(true);
        setMonsterHit(true);
        setDamagePopup({
          target: 'monster',
          text: isCritical ? `⚡ CRITICAL! -${damage} DMG` : `💥 -${damage} DMG`,
          isCrit: isCritical,
          key: Date.now()
        });

        if (isCritical) {
          setCritAlert(true);
          playRetroSound('crit');
          setTimeout(() => setCritAlert(false), 1200);
          addLog(`⚡ CRITICAL STRIKE! Tebasan telak menghasilkan ${damage} DMG ke ${currentFloor.monster.name}!`);
        } else {
          playRetroSound('hit');
          addLog(`⚔️ Benar! 「${currentQ.exp}」 Seranganmu menghasilkan ${damage} DMG!`);
        }

        const nextMonsterHp = Math.max(0, monsterHp - damage);
        setMonsterHp(nextMonsterHp);

        setTimeout(() => {
          setHeroAttacking(false);
          setSlashActive(false);
          setMonsterHit(false);

          if (nextMonsterHp <= 0) {
            setMonsterDefeatedAnim(true);
            setTimeout(() => {
              setMonsterDefeatedAnim(false);
              handleMonsterDefeat();
            }, 900);
          } else {
            setTimeout(() => {
              setDamagePopup(null);
              setSelectedOption(null);
              setQuestionIdx((q) => q + 1);
              setBattleState('player_turn');
            }, 750);
          }
        }, 500);
      }, 240);
    } else {
      // Wrong answer
      playRetroSound('hurt');
      addLog(`❌ Salah! Jawaban benar: 「${currentQ.options[currentQ.correct]}」. Monster bersiap membalas!`);
      setTimeout(() => triggerMonsterAttack(), 600);
    }
  };

  // Monster retribution attack
  const triggerMonsterAttack = () => {
    setBattleState('monster_turn');
    setMonsterAttacking(true);

    setTimeout(() => {
      setHeroHit(true);
      setScreenShake(true);
      playRetroSound('hurt');

      const dmg = Math.round(currentFloor.monster.atk + Math.random() * 6 - 3);
      const newPlayerHp = Math.max(0, player.hp - dmg);

      setDamagePopup({
        target: 'hero',
        text: `💥 -${dmg} HP`,
        isCrit: false,
        key: Date.now()
      });

      addLog(`💥 ${currentFloor.monster.name} menyerangmu dengan sengit! Menerima ${dmg} DMG!`);

      setPlayer((prev) => ({
        ...prev,
        hp: newPlayerHp
      }));

      setTimeout(() => {
        setMonsterAttacking(false);
        setHeroHit(false);
        setScreenShake(false);

        if (newPlayerHp <= 0) {
          setTimeout(() => {
            setBattleState('game_over');
            addLog('💀 HP-mu habis! Kamu tumbang di dalam arena.');
          }, 800);
        } else {
          setTimeout(() => {
            setDamagePopup(null);
            setSelectedOption(null);
            setQuestionIdx((q) => q + 1);
            setBattleState('player_turn');
          }, 700);
        }
      }, 500);
    }, 280);
  };

  const handleMonsterDefeat = () => {
    playRetroSound('victory');
    setBattleState('floor_cleared');
    const gainedExp = currentFloor.monster.exp;
    const gainedGold = currentFloor.monster.gold;

    addLog(`🎉 ${currentFloor.monster.name} berhasil ditundukkan! Memperoleh +${gainedExp} EXP & +${gainedGold} Gold!`);

    setPlayer((prev) => {
      let curExp = prev.exp + gainedExp;
      let curLvl = prev.level;
      let nextExpTarget = prev.nextExp;
      let curMaxHp = prev.maxHp;
      let curMaxMp = prev.maxMp;

      if (curExp >= nextExpTarget) {
        curLvl += 1;
        curExp -= nextExpTarget;
        nextExpTarget = Math.round(nextExpTarget * 1.5);
        curMaxHp += 20;
        curMaxMp += 10;
        addLog(`⭐ LEVEL UP! Kamu naik ke Level ${curLvl}! HP & MP bertambah!`);
      }

      return {
        ...prev,
        level: curLvl,
        exp: curExp,
        nextExp: nextExpTarget,
        maxHp: curMaxHp,
        maxMp: curMaxMp,
        hp: curMaxHp,
        mp: curMaxMp,
        gold: prev.gold + gainedGold,
        highestFloorCleared: Math.max(prev.highestFloorCleared, currentFloor.floor)
      };
    });
  };

  // Skill 1: Kanjisense (Eliminates 2 wrong options, costs 15 MP)
  const handleUseKanjiSense = () => {
    if (player.mp < 15 || battleState !== 'player_turn' || eliminatedOptions.length > 0) return;
    playRetroSound('heal');
    setPlayer((p) => ({ ...p, mp: p.mp - 15 }));

    const wrongIndexes = currentQ.options
      .map((_, i) => i)
      .filter((i) => i !== currentQ.correct);

    const shuffled = wrongIndexes.sort(() => 0.5 - Math.random());
    const toEliminate = shuffled.slice(0, 2);
    setEliminatedOptions(toEliminate);
    addLog(`✨ Menggunakan Skill [Kanjisense]! Dua jawaban salah berhasil dieliminasi!`);
  };

  // Skill 2: Potion (Restores 40 HP)
  const handleUsePotion = () => {
    if (player.potions <= 0 || player.hp >= player.maxHp) return;
    playRetroSound('heal');
    setHealPopup(true);
    setTimeout(() => setHealPopup(false), 900);
    setPlayer((p) => ({
      ...p,
      potions: p.potions - 1,
      hp: Math.min(p.maxHp, p.hp + 40)
    }));
    addLog(`🧪 Meminum Ramuan Pemulih (Potion)! Memulihkan 40 HP!`);
  };

  // Buy potion from gold
  const handleBuyPotion = () => {
    if (player.gold < 30) return;
    setPlayer((p) => ({
      ...p,
      gold: p.gold - 30,
      potions: p.potions + 1
    }));
    addLog(`🛍️ Membeli 1 Ramuan Potion seharga 30 Gold.`);
  };

  const handleNextFloor = () => {
    if (currentFloorIdx < DUNGEON_FLOORS.length - 1) {
      const nextIdx = currentFloorIdx + 1;
      setCurrentFloorIdx(nextIdx);
      setMonsterHp(DUNGEON_FLOORS[nextIdx].monster.maxHp);
      setQuestionIdx(0);
      setSelectedOption(null);
      setBattleState('player_turn');
      addLog(`🚪 Melangkah ke Lantai ${DUNGEON_FLOORS[nextIdx].floor}: ${DUNGEON_FLOORS[nextIdx].name}!`);
    } else {
      setBattleState('victory');
      playRetroSound('victory');
      addLog('🏆 LUAR BIASA! Kamu telah menaklukkan seluruh Dungeon JLPT!');
    }
  };

  const handleRestartBattle = () => {
    setPlayer((p) => ({
      ...p,
      hp: p.maxHp,
      mp: p.maxMp
    }));
    setMonsterHp(currentFloor.monster.maxHp);
    setQuestionIdx(0);
    setSelectedOption(null);
    setBattleState('player_turn');
  };

  return (
    <div className={`p-4 md:p-6 max-w-5xl mx-auto space-y-6 ${screenShake ? 'rpg-shake' : ''}`}>
      {/* Scoped Animations & Digimon Battle Styles */}
      <style>{`
        @keyframes rpgHeroLunge {
          0% { transform: translateX(0) scale(1); }
          50% { transform: translateX(110px) scale(1.12); }
          100% { transform: translateX(0) scale(1); }
        }
        @keyframes rpgMonsterLunge {
          0% { transform: translateX(0) scale(1); }
          50% { transform: translateX(-110px) scale(1.12); }
          100% { transform: translateX(0) scale(1); }
        }
        @keyframes rpgSlashSweep {
          0% { transform: translate(-50%, -50%) rotate(-60deg) scale(0.2); opacity: 0; }
          30% { transform: translate(-50%, -50%) rotate(-10deg) scale(1.4); opacity: 1; filter: drop-shadow(0 0 16px #38bdf8); }
          70% { transform: translate(-50%, -50%) rotate(35deg) scale(1.7); opacity: 1; filter: drop-shadow(0 0 24px #fbbf24); }
          100% { transform: translate(-50%, -50%) rotate(60deg) scale(2); opacity: 0; }
        }
        @keyframes rpgMonsterHurt {
          0%, 100% { transform: translate(0, 0); filter: brightness(1); }
          15% { transform: translate(16px, -4px); filter: brightness(3.5) sepia(1) hue-rotate(-50deg); }
          35% { transform: translate(-16px, 4px); filter: brightness(2.5) contrast(2); }
          55% { transform: translate(10px, -2px); filter: brightness(3); }
          75% { transform: translate(-6px, 2px); }
        }
        @keyframes rpgHeroHurt {
          0%, 100% { transform: translate(0, 0); filter: brightness(1); }
          15% { transform: translate(-16px, -4px); filter: brightness(2.5) drop-shadow(0 0 16px #ef4444); }
          35% { transform: translate(16px, 4px); }
          55% { transform: translate(-10px, -2px); filter: brightness(2); }
          75% { transform: translate(6px, 2px); }
        }
        @keyframes rpgFloatDamage {
          0% { transform: translate(-50%, 0) scale(0.6); opacity: 0; }
          20% { transform: translate(-50%, -24px) scale(1.35); opacity: 1; }
          75% { transform: translate(-50%, -55px) scale(1.1); opacity: 1; }
          100% { transform: translate(-50%, -85px) scale(0.8); opacity: 0; }
        }
        @keyframes rpgHeroIdle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes rpgMonsterFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.02); }
        }
        @keyframes rpgDefeatDissolve {
          0% { transform: scale(1) rotate(0deg); opacity: 1; filter: brightness(1); }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.7; filter: brightness(3); }
          100% { transform: scale(0.1) rotate(360deg); opacity: 0; filter: blur(10px); }
        }
        @keyframes rpgPulseRing {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .rpg-shake {
          animation: rpgHeroHurt 0.4s ease-in-out;
        }
        .rpg-hero-idle {
          animation: rpgHeroIdle 2.5s ease-in-out infinite;
        }
        .rpg-hero-attack {
          animation: rpgHeroLunge 0.5s ease-in-out;
        }
        .rpg-hero-hurt {
          animation: rpgHeroHurt 0.5s ease-in-out;
        }
        .rpg-monster-float {
          animation: rpgMonsterFloat 2.8s ease-in-out infinite;
        }
        .rpg-monster-attack {
          animation: rpgMonsterLunge 0.5s ease-in-out;
        }
        .rpg-monster-hurt {
          animation: rpgMonsterHurt 0.5s ease-in-out;
        }
        .rpg-monster-defeat {
          animation: rpgDefeatDissolve 0.9s ease-in-out forwards;
        }
        .rpg-slash-arc {
          animation: rpgSlashSweep 0.45s ease-out forwards;
        }
        .rpg-damage-float {
          animation: rpgFloatDamage 0.8s ease-out forwards;
        }
      `}</style>

      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <Swords className="w-6 h-6 text-red-500" />
              <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-red-600 via-amber-500 to-purple-600 bg-clip-text text-transparent">
                JLPT Monster Duel: Turn-Based Battle
              </h1>
            </div>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Pertarungan monster ala Digimon &amp; Pokemon: tebas musuh dengan ketepatan tata bahasa dan kanji!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
            {soundEnabled ? 'Suara Aktif' : 'Bisu'}
          </button>
        </div>
      </div>

      {/* Hero Global Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 bg-gradient-to-r from-gray-900 to-indigo-950 text-white p-4 rounded-2xl shadow-lg border border-indigo-900">
        <div>
          <span className="text-[10px] uppercase font-bold text-indigo-300">Pahlawan</span>
          <p className="text-sm font-extrabold flex items-center gap-1">
            Lv. {player.level} 🗡️
          </p>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-red-300">HP (Nyawa)</span>
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            <span className="text-xs font-black">{player.hp}/{player.maxHp}</span>
          </div>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden mt-1">
            <div
              className="bg-red-500 h-full transition-all duration-300"
              style={{ width: `${(player.hp / player.maxHp) * 100}%` }}
            />
          </div>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-blue-300">MP (Mana)</span>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-blue-400 fill-blue-400" />
            <span className="text-xs font-black">{player.mp}/{player.maxMp}</span>
          </div>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden mt-1">
            <div
              className="bg-blue-500 h-full transition-all duration-300"
              style={{ width: `${(player.mp / player.maxMp) * 100}%` }}
            />
          </div>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-amber-300">EXP Progres</span>
          <p className="text-xs font-bold text-amber-200">{player.exp} / {player.nextExp}</p>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden mt-1">
            <div
              className="bg-amber-400 h-full transition-all duration-300"
              style={{ width: `${Math.min(100, (player.exp / player.nextExp) * 100)}%` }}
            />
          </div>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-yellow-300">Kantung Gold</span>
          <p className="text-xs font-bold text-yellow-400 flex items-center gap-1">
            💰 {player.gold} G
          </p>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-emerald-300">Lantai Tertinggi</span>
          <p className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            🏆 Lantai {player.highestFloorCleared || '-'}
          </p>
        </div>
      </div>

      {/* ========================================================
          WIDESCREEN DIGIMON/POKEMON-STYLE ARENA (PARALLEL SEJAJAR)
         ======================================================== */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '350px',
          minHeight: '330px',
          maxHeight: '380px',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          border: '2px solid rgba(99, 102, 241, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: '#ffffff'
        }}
      >
        {/* Widescreen Scenic Background (Stretches Full Width Behind Characters) */}
        <FloorBackgroundIllustration floor={currentFloor.floor} />

        {/* Screen Flash Overlay on Hurt */}
        {screenShake && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(239, 68, 68, 0.35)',
              zIndex: 40,
              pointerEvents: 'none'
            }}
          />
        )}

        {/* Critical Alert Overlay */}
        {critAlert && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(4px)'
            }}
          >
            <div className="text-center p-3 sm:p-5 bg-gradient-to-r from-red-600 via-amber-600 to-yellow-500 rounded-3xl border-4 border-yellow-300 shadow-2xl animate-bounce">
              <Flame className="w-8 h-8 text-yellow-200 mx-auto mb-1 animate-bounce" />
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-widest uppercase drop-shadow-md">
                CRITICAL STRIKE!
              </h2>
              <p className="text-yellow-100 font-bold text-xs">Serangan Kilat Super Efektif!</p>
            </div>
          </div>
        )}

        {/* Top Arena Header: Floor Title & Timer Bar */}
        <div
          style={{
            position: 'relative',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 1.25rem',
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-400/50">
              Lantai {currentFloor.floor} / 5
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-white">
              {currentFloor.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-300 font-semibold hidden sm:inline">Timer:</span>
            <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
              timerLeft <= 3 ? 'bg-red-600 text-white animate-ping' : 'bg-black/60 text-yellow-300 border border-yellow-400/40'
            }`}>
              ⏱️ {timerLeft}s
            </span>
          </div>
        </div>

        {/* ========================================================
            PARALLEL BATTLEFIELD STAGE: SEJAJAR BERHADAPAN
           ======================================================== */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            flex: 1,
            padding: '0.5rem 1.5rem 1rem 1.5rem',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between'
          }}
        >
          {/* =====================================
              LEFT SIDE: PLAYER HERO (TAMER)
             ===================================== */}
          <div className="flex flex-col items-center" style={{ width: '190px' }}>
            {/* Player Floating Status Plate (Above Hero) */}
            <div className="w-full bg-black/80 backdrop-blur-md rounded-xl p-2.5 border border-indigo-400/70 shadow-xl mb-2 text-left">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-black text-white flex items-center gap-1 truncate max-w-[120px]">
                  🗡️ Pahlawan Kanji
                </span>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-600">
                  Lv. {player.level}
                </span>
              </div>

              {/* HP Bar */}
              <div className="space-y-0.5">
                <div className="flex justify-between text-[9px] font-bold text-red-300">
                  <span>HP</span>
                  <span>{player.hp} / {player.maxHp}</span>
                </div>
                <div className="w-full bg-gray-950 h-2 rounded-full overflow-hidden border border-red-900/60">
                  <div
                    className="bg-gradient-to-r from-red-600 to-rose-400 h-full transition-all duration-300"
                    style={{ width: `${(player.hp / player.maxHp) * 100}%` }}
                  />
                </div>
              </div>

              {/* MP Bar */}
              <div className="space-y-0.5 mt-1">
                <div className="flex justify-between text-[9px] font-bold text-blue-300">
                  <span>MP</span>
                  <span>{player.mp} / {player.maxMp}</span>
                </div>
                <div className="w-full bg-gray-950 h-1.5 rounded-full overflow-hidden border border-blue-900/60">
                  <div
                    className="bg-blue-500 h-full transition-all duration-300"
                    style={{ width: `${(player.mp / player.maxMp) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Player Hero Battler Platform & Sprite (Facing Right ➡️) */}
            <div className="relative flex flex-col items-center">
              {/* Floating Damage / Heal on Hero */}
              {damagePopup && damagePopup.target === 'hero' && (
                <div
                  key={damagePopup.key}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 z-50 text-red-400 font-black text-xl drop-shadow-[0_4px_8px_rgba(0,0,0,1)] whitespace-nowrap rpg-damage-float"
                >
                  {damagePopup.text}
                </div>
              )}
              {healPopup && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-50 text-emerald-400 font-black text-xl drop-shadow-[0_4px_8px_rgba(0,0,0,1)] whitespace-nowrap rpg-damage-float">
                  💚 +40 HP!
                </div>
              )}

              {/* Hero Sprite */}
              <div
                className={`transition-transform duration-300 ${
                  heroAttacking ? 'rpg-hero-attack' : heroHit ? 'rpg-hero-hurt' : 'rpg-hero-idle'
                }`}
              >
                <HeroPlayerIllustration isAttacking={heroAttacking} isHit={heroHit} />
              </div>

              {/* 3D Elevated Battle Ring Under Feet */}
              <div className="relative -mt-4">
                <div
                  className="w-28 sm:w-34 h-7 rounded-[100%] bg-gradient-to-r from-indigo-950 via-blue-900 to-cyan-950 border-2 border-cyan-400/80 shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
                  style={{ animation: 'rpgPulseRing 3s ease-in-out infinite' }}
                />
              </div>
            </div>
          </div>

          {/* =====================================
              CENTER: TURN BANNER & ACTION ZONE
             ===================================== */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              textAlign: 'center',
              padding: '0 0.5rem',
              pointerEvents: 'none'
            }}
          >
            {(battleState === 'player_turn' || battleState === 'monster_turn' || battleState === 'answering') && (
              <>
                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-xl border ${
                    battleState === 'monster_turn'
                      ? 'bg-red-950/95 border-red-500 text-red-200 animate-pulse'
                      : 'bg-indigo-950/95 border-indigo-400 text-cyan-300'
                  }`}
                >
                  {battleState === 'monster_turn'
                    ? '⚠️ Monster Membalas!'
                    : battleState === 'answering'
                    ? '⚡ Menjalankan Serangan...'
                    : '▶ Giliranmu: Serang!'}
                </span>

                {/* Combat Projectile Streaks */}
                {heroAttacking && (
                  <div className="text-2xl animate-bounce mt-2 text-cyan-300 font-black">
                    ⚔️ 💨 ➡️
                  </div>
                )}
                {monsterAttacking && (
                  <div className="text-2xl animate-bounce mt-2 text-red-400 font-black">
                    ⬅️ 💨 🔥
                  </div>
                )}
              </>
            )}
          </div>

          {/* =====================================
              RIGHT SIDE: MONSTER (Facing Left ⬅️)
             ===================================== */}
          <div className="flex flex-col items-center" style={{ width: '190px' }}>
            {/* Monster Floating Status Plate (Above Monster) */}
            <div className="w-full bg-black/80 backdrop-blur-md rounded-xl p-2.5 border border-red-500/70 shadow-xl mb-2 text-left">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-black text-white truncate max-w-[120px]">
                  {currentFloor.monster.name}
                </span>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-red-950 text-red-300 border border-red-700">
                  {currentFloor.levelLabel}
                </span>
              </div>

              {/* Monster HP Bar */}
              <div className="space-y-0.5">
                <div className="flex justify-between text-[9px] font-bold text-gray-300">
                  <span>HP</span>
                  <span>{monsterHp} / {currentFloor.monster.maxHp}</span>
                </div>
                <div className="w-full bg-gray-950 h-2 rounded-full overflow-hidden border border-red-900/60">
                  <div
                    className="bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 h-full transition-all duration-300"
                    style={{ width: `${Math.max(0, (monsterHp / currentFloor.monster.maxHp) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="text-[9px] text-gray-400 mt-1 flex justify-between">
                <span>{currentFloor.monster.title}</span>
                <span className="text-red-400 font-bold">
                  {monsterAttacking ? 'Menyerang!' : monsterHit ? 'Terkena!' : monsterHp <= 0 ? 'Tumbang!' : 'Siap'}
                </span>
              </div>
            </div>

            {/* Monster Battler Platform & Sprite */}
            <div className="relative flex flex-col items-center">
              {/* Monster Floating Damage */}
              {damagePopup && damagePopup.target === 'monster' && (
                <div
                  key={damagePopup.key}
                  className={`absolute -top-8 left-1/2 -translate-x-1/2 z-50 font-black text-xl drop-shadow-[0_4px_10px_rgba(0,0,0,1)] whitespace-nowrap rpg-damage-float ${
                    damagePopup.isCrit ? 'text-yellow-300 scale-125' : 'text-amber-400'
                  }`}
                >
                  {damagePopup.text}
                </div>
              )}

              {/* Slash Arc Effect over Monster */}
              {slashActive && (
                <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center">
                  <svg className="w-36 h-36 rpg-slash-arc drop-shadow-[0_0_24px_#38bdf8]" viewBox="0 0 100 100" fill="none">
                    <path d="M10 20 Q 50 60 90 80" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" />
                    <path d="M15 25 Q 50 60 85 75" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
              )}

              {/* Monster Sprite */}
              <div
                className={`transition-transform duration-300 ${
                  monsterAttacking
                    ? 'rpg-monster-attack'
                    : monsterHit
                    ? 'rpg-monster-hurt'
                    : monsterDefeatedAnim
                    ? 'rpg-monster-defeat'
                    : 'rpg-monster-float'
                }`}
              >
                <MonsterIllustration
                  floor={currentFloor.floor}
                  isAttacking={monsterAttacking}
                  isHit={monsterHit}
                  isDefeated={monsterDefeatedAnim}
                />
              </div>

              {/* 3D Elevated Battle Ring Under Feet */}
              <div className="relative -mt-4">
                <div
                  className="w-28 sm:w-34 h-7 rounded-[100%] bg-gradient-to-r from-red-950 via-red-800 to-amber-950 border-2 border-red-500/80 shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
                  style={{ animation: 'rpgPulseRing 3.5s ease-in-out infinite' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            CENTER OVERLAYS: FLOOR CLEARED / GAME OVER / VICTORY
            Tampil tepat di tengah-tengah arena (antara Hero & Monster)
           ======================================================== */}
        {battleState === 'floor_cleared' && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 45,
              width: '90%',
              maxWidth: '350px',
              pointerEvents: 'auto'
            }}
          >
            <div className="bg-purple-950/95 backdrop-blur-md border-2 border-purple-400 rounded-2xl p-4 sm:p-5 text-center shadow-[0_0_35px_rgba(168,85,247,0.7)] animate-in zoom-in-95 duration-200">
              <div className="w-11 h-11 mx-auto mb-2 rounded-full bg-yellow-400/20 border border-yellow-400/60 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-yellow-300 animate-bounce" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                Lantai {currentFloor.floor} Ditaklukkan!
              </h3>
              <p className="text-purple-200 text-xs mt-0.5 mb-3.5">
                <span className="text-yellow-300 font-bold">{currentFloor.monster.name}</span> berhasil kamu kalahkan!
              </p>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleNextFloor}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-xs sm:text-sm rounded-xl shadow-[0_4px_16px_rgba(16,185,129,0.5)] transition transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Lanjut ke Lantai Berikutnya</span>
                  <span className="text-base">➡️</span>
                </button>
                <button
                  type="button"
                  onClick={handleRestartBattle}
                  className="w-full py-1.5 px-3 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white font-bold text-xs rounded-lg transition border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
                  <span>Ulangi Lantai Ini</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {battleState === 'game_over' && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 45,
              width: '90%',
              maxWidth: '350px',
              pointerEvents: 'auto'
            }}
          >
            <div className="bg-red-950/95 backdrop-blur-md border-2 border-red-500 rounded-2xl p-4 sm:p-5 text-center shadow-[0_0_35px_rgba(239,68,68,0.7)] animate-in zoom-in-95 duration-200">
              <div className="w-11 h-11 mx-auto mb-2 rounded-full bg-red-500/20 border border-red-400/60 flex items-center justify-center text-xl">
                💀
              </div>
              <h3 className="text-base sm:text-lg font-black text-red-200 tracking-wide">
                Kamu Gugur di Medan Tempur!
              </h3>
              <p className="text-gray-300 text-xs mt-0.5 mb-3.5">
                HP habis di Lantai {currentFloor.floor}. Evaluasi dan coba kembali!
              </p>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleRestartBattle}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-[0_4px_16px_rgba(239,68,68,0.5)] transition transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Lantai Ini</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {battleState === 'victory' && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 45,
              width: '90%',
              maxWidth: '370px',
              pointerEvents: 'auto'
            }}
          >
            <div className="bg-amber-950/95 backdrop-blur-md border-2 border-yellow-400 rounded-2xl p-4 sm:p-5 text-center shadow-[0_0_35px_rgba(234,179,8,0.7)] animate-in zoom-in-95 duration-200">
              <Sparkles className="w-9 h-9 text-yellow-300 mx-auto mb-1.5 animate-bounce" />
              <h3 className="text-base sm:text-lg font-black text-yellow-300 tracking-wide">
                GRAND MASTER JLPT!
              </h3>
              <p className="text-amber-100 text-xs mt-0.5 mb-3.5">
                Selamat! Kamu telah menaklukkan seluruh bos monster di Dungeon ini!
              </p>
              <button
                type="button"
                onClick={() => {
                  setCurrentFloorIdx(0);
                  setMonsterHp(DUNGEON_FLOORS[0].monster.maxHp);
                  setBattleState('player_turn');
                }}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 hover:from-yellow-400 hover:to-amber-300 text-gray-950 font-black text-xs sm:text-sm rounded-xl shadow-[0_4px_16px_rgba(234,179,8,0.5)] transition transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-gray-950" />
                <span>Mulai Petualangan Baru</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          JRPG COMMAND WINDOW: QUESTIONS & BATTLE ACTION CHOICES
         ======================================================== */}
      {(battleState === 'player_turn' || battleState === 'answering' || battleState === 'monster_turn') && (
        <div className="glass-panel p-5 md:p-6 rounded-2xl border-2 border-purple-500/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between text-xs text-purple-300 font-bold border-b border-white/10 pb-2">
            <span className="flex items-center gap-1.5">
              <Swords className="w-4 h-4 text-amber-400" /> Soal Kuis #{questionIdx + 1}
            </span>
            <span className="text-amber-400 font-bold">
              ⚡ Tips: Jawab cepat (&lt;3 detik) untuk tebasan Critical Strike!
            </span>
          </div>

          {/* Question Prompt */}
          <h2 className="text-lg md:text-xl font-black text-white leading-relaxed">
            {currentQ.q}
          </h2>

          {/* 4 JRPG Option Command Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {currentQ.options.map((opt, idx) => {
              const isEliminated = eliminatedOptions.includes(idx);
              const isChosen = selectedOption === idx;
              const isCorrect = idx === currentQ.correct;

              let cardStyle = {
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: 'var(--text-primary)'
              };

              if (isChosen && isCorrect) {
                cardStyle = {
                  background: 'rgba(16, 185, 129, 0.25)',
                  border: '2px solid #10b981',
                  color: '#ffffff',
                  boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
                };
              } else if (isChosen && !isCorrect) {
                cardStyle = {
                  background: 'rgba(239, 68, 68, 0.25)',
                  border: '2px solid #ef4444',
                  color: '#ffffff',
                  boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)'
                };
              } else if (selectedOption !== null && isCorrect) {
                cardStyle = {
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '2px solid #10b981',
                  color: '#34d399'
                };
              }

              if (isEliminated) {
                cardStyle = {
                  opacity: 0.3,
                  textDecoration: 'line-through',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  cursor: 'not-allowed',
                  color: '#64748b'
                };
              }

              return (
                <button
                  key={idx}
                  disabled={battleState !== 'player_turn' || isEliminated}
                  onClick={() => handleSelectOption(idx)}
                  style={cardStyle}
                  className="p-3.5 rounded-xl font-bold text-sm text-left transition-all duration-150 flex items-center justify-between group hover:border-purple-400 hover:bg-purple-900/20"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-xs text-purple-300 font-mono">
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    <span className="text-sm font-semibold">{opt}</span>
                  </div>

                  {isChosen && isCorrect && <span className="text-emerald-400 text-xs font-black">✓ CRITICAL!</span>}
                  {isChosen && !isCorrect && <span className="text-red-400 text-xs font-black">✕ MELESET</span>}
                </button>
              );
            })}
          </div>

          {/* Quick Hero Skills Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <button
                onClick={handleUseKanjiSense}
                disabled={player.mp < 15 || battleState !== 'player_turn' || eliminatedOptions.length > 0}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900/80 hover:bg-blue-800 border border-blue-500 text-xs font-bold text-blue-200 disabled:opacity-40 transition shadow-sm"
                title="Mengeliminasi 2 opsi jawaban salah (Biaya: 15 MP)"
              >
                <Zap className="w-3.5 h-3.5 text-blue-300" />
                Kanjisense (-15 MP)
              </button>

              <button
                onClick={handleUsePotion}
                disabled={player.potions <= 0 || player.hp >= player.maxHp}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-500 text-xs font-bold text-emerald-200 disabled:opacity-40 transition shadow-sm"
                title="Memulihkan 40 HP"
              >
                <Heart className="w-3.5 h-3.5 text-emerald-300" />
                Gunakan Potion ({player.potions})
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleBuyPotion}
                disabled={player.gold < 30}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-950/80 hover:bg-yellow-900 border border-yellow-600 text-xs font-bold text-yellow-300 disabled:opacity-40 transition shadow-sm"
              >
                💰 Beli Potion (30 G)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Bar Below Arena (Floor Cleared) */}
      {battleState === 'floor_cleared' && (
        <div className="glass-panel p-4 md:p-5 rounded-2xl border-2 border-emerald-500/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h4 className="text-white font-extrabold text-sm sm:text-base">Lantai {currentFloor.floor} Selesai!</h4>
              <p className="text-purple-300 text-xs">{currentFloor.monster.name} telah dikalahkan. Siap lanjut ke lantai berikutnya?</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleRestartBattle}
              className="flex-1 sm:flex-none px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-300 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulangi</span>
            </button>
            <button
              onClick={handleNextFloor}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke Lantai Berikutnya</span>
              <span>➡️</span>
            </button>
          </div>
        </div>
      )}

      {/* Action Bar Below Arena (Game Over) */}
      {battleState === 'game_over' && (
        <div className="glass-panel p-4 md:p-5 rounded-2xl border-2 border-red-500/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-400/40 flex items-center justify-center shrink-0 text-xl">
              💀
            </div>
            <div>
              <h4 className="text-white font-extrabold text-sm sm:text-base">Kamu Gugur di Lantai {currentFloor.floor}!</h4>
              <p className="text-red-300 text-xs">Evaluasi kosakata dan coba lagi untuk menaklukkan bos ini.</p>
            </div>
          </div>
          <button
            onClick={handleRestartBattle}
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Pertarungan</span>
          </button>
        </div>
      )}

      {/* Action Bar Below Arena (Victory) */}
      {battleState === 'victory' && (
        <div className="glass-panel p-4 md:p-5 rounded-2xl border-2 border-yellow-500/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/20 border border-yellow-400/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h4 className="text-white font-extrabold text-sm sm:text-base">Grand Master JLPT!</h4>
              <p className="text-yellow-300 text-xs">Semua bos di Dungeon telah berhasil kamu taklukkan.</p>
            </div>
          </div>
          <button
            onClick={() => {
              setCurrentFloorIdx(0);
              setMonsterHp(DUNGEON_FLOORS[0].monster.maxHp);
              setBattleState('player_turn');
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 hover:from-yellow-400 hover:to-amber-300 text-gray-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-gray-950" />
            <span>Mulai Petualangan Baru</span>
          </button>
        </div>
      )}

      {/* Battle Combat Log Box */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-2">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-indigo-400" /> Catatan Pertarungan (Battle Log)
        </h4>
        <div className="space-y-1 text-xs">
          {battleLogs.map((log, i) => (
            <p
              key={i}
              className={`p-1.5 rounded ${
                i === 0
                  ? 'bg-indigo-950/60 text-indigo-300 font-semibold border-l-2 border-indigo-400'
                  : 'text-gray-400'
              }`}
            >
              {log}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
