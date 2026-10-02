import { useState, useEffect, useRef } from 'react';
import { soundscape } from '../utils/soundscapes';

const zenKotowaza = [
  {
    kanji: '一期一会',
    kana: 'いちごいちえ',
    meaning: 'Satu momen, satu pertemuan.',
    commentary: 'Hargai setiap detik belajar dan setiap orang yang kita temui, karena momen saat ini tak akan pernah terulang kembali.',
  },
  {
    kanji: '七転び八起き',
    kana: 'ななころびやおき',
    meaning: 'Tujuh kali jatuh, delapan kali bangkit.',
    commentary: 'Belajar kanji dan bahasa Jepang adalah proses ketekunan. Jangan takut salah dalam latihan, bangkitlah lebih kuat.',
  },
  {
    kanji: '温故知新',
    kana: 'おんこちしん',
    meaning: 'Mengkaji masa lalu untuk memahami hal baru.',
    commentary: 'Kuasai dasar-dasar tata bahasa lama dengan mendalam agar pemahaman tingkat lanjut terasa mudah dan intuitif.',
  },
  {
    kanji: '初心忘るべからず',
    kana: 'しょしんわするべからず',
    meaning: 'Jangan pernah melupakan niat awal saat pertama kali memulai.',
    commentary: 'Ingat kembali antusiasme dan impian hari pertamamu memutuskan belajar bahasa Jepang.',
  },
  {
    kanji: '継続は力なり',
    kana: 'けいぞくはちからなり',
    meaning: 'Konsistensi adalah kunci kekuatan sejati.',
    commentary: '15 menit belajar setiap hari jauh lebih dahsyat daripada 5 jam maraton sekali dalam sebulan.',
  },
];

export default function ZenStudyMode() {
  // Timer State
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Soundscape State
  const [rainActive, setRainActive] = useState(false);
  const [rainVol, setRainVol] = useState(0.5);
  const [cicadaActive, setCicadaActive] = useState(false);
  const [cicadaVol, setCicadaVol] = useState(0.4);
  const [bambooActive, setBambooActive] = useState(false);
  const [bambooVol, setBambooVol] = useState(0.6);

  // Zen Kotowaza State
  const [kotowazaIndex, setKotowazaIndex] = useState(0);

  const timerRef = useRef(null);

  // Cleanup sounds on unmount
  useEffect(() => {
    return () => {
      soundscape.stopAll();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Timer Tick
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            soundscape.playSingingBowl(0.8);
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
  }, [isRunning]);

  const handleSetDuration = (min) => {
    setIsRunning(false);
    setTimerMinutes(min);
    setTimeLeft(min * 60);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timerMinutes * 60);
  };

  // Sound handlers
  const handleToggleRain = () => {
    const next = !rainActive;
    setRainActive(next);
    soundscape.toggleRain(next, rainVol);
  };

  const handleChangeRainVol = (vol) => {
    setRainVol(vol);
    if (rainActive) soundscape.toggleRain(true, vol);
  };

  const handleToggleCicada = () => {
    const next = !cicadaActive;
    setCicadaActive(next);
    soundscape.toggleCicada(next, cicadaVol);
  };

  const handleChangeCicadaVol = (vol) => {
    setCicadaVol(vol);
    if (cicadaActive) soundscape.toggleCicada(true, vol);
  };

  const handleToggleBamboo = () => {
    const next = !bambooActive;
    setBambooActive(next);
    soundscape.toggleBamboo(next, bambooVol);
  };

  const handleChangeBambooVol = (vol) => {
    setBambooVol(vol);
    if (bambooActive) soundscape.toggleBamboo(true, vol);
  };

  const handlePlayBell = () => {
    soundscape.playSingingBowl(0.7);
  };

  const handleStopAllSounds = () => {
    setRainActive(false);
    setCicadaActive(false);
    setBambooActive(false);
    soundscape.stopAll();
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentKotowaza = zenKotowaza[kotowazaIndex];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-color, #1e293b)' }}>
          🧘 Mode Zen Study & Suasana Tradisional (禅学習・環境音)
        </h2>
        <p style={{ margin: '6px 0 0', color: 'var(--subtext-color, #64748b)', fontSize: '0.92rem' }}>
          Ruang fokus hening bebas distraksi dengan synthesizer audio alam Jepang murni (100% offline).
        </p>
      </div>

      {/* Main Focus Area */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: '24px',
          padding: '36px 24px',
          color: '#ffffff',
          boxShadow: '0 8px 30px rgba(15, 23, 42, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        {/* Preset Selector */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { label: 'Pomodoro (25m)', min: 25 },
            { label: 'Review Kilat (15m)', min: 15 },
            { label: 'Fokus Dalam (50m)', min: 50 },
            { label: 'Istirahat (5m)', min: 5 },
          ].map((preset) => (
            <button
              key={preset.min}
              onClick={() => handleSetDuration(preset.min)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: timerMinutes === preset.min ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.2)',
                background: timerMinutes === preset.min ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                color: timerMinutes === preset.min ? '#38bdf8' : '#cbd5e1',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Big Digital Countdown Clock */}
        <div
          style={{
            fontSize: '5.2rem',
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '4px',
            textShadow: '0 0 25px rgba(56, 189, 248, 0.4)',
            color: '#f8fafc',
          }}
        >
          {formatTime(timeLeft)}
        </div>

        {/* Timer Control Buttons */}
        <div style={{ display: 'flex', gap: '14px' }}>
          <button
            onClick={() => setIsRunning(!isRunning)}
            style={{
              padding: '12px 32px',
              borderRadius: '12px',
              border: 'none',
              background: isRunning ? '#f59e0b' : '#38bdf8',
              color: '#0f172a',
              fontWeight: 700,
              fontSize: '1.05rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)',
              transition: 'all 0.15s',
            }}
          >
            {isRunning ? '⏸️ Jeda' : '▶️ Mulai Fokus'}
          </button>
          <button
            onClick={handleResetTimer}
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'rgba(255,255,255,0.08)',
              color: '#fff',
              fontSize: '0.95rem',
              cursor: 'pointer',
            }}
          >
            🔄 Reset
          </button>
          <button
            onClick={handlePlayBell}
            title="Dentangkan genta meditasi"
            style={{
              padding: '12px 18px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'rgba(255,255,255,0.08)',
              color: '#fbbf24',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            🔔 Dentang Genta
          </button>
        </div>
      </div>

      {/* Ambient Synthesized Soundscapes Mixer */}
      <div
        style={{
          background: 'var(--card-bg, #ffffff)',
          borderRadius: '18px',
          padding: '24px',
          border: '1px solid var(--border-color, #e2e8f0)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-color, #1e293b)' }}>
              🎧 Synthesizer Suasana Tradisional Jepang
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Dihasilkan secara matematis melalui Web Audio API tanpa mendownload aset audio
            </span>
          </div>

          {(rainActive || cicadaActive || bambooActive) && (
            <button
              onClick={handleStopAllSounds}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #fca5a5',
                background: '#fef2f2',
                color: '#dc2626',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              🔇 Heningkan Semua
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {/* Sound 1: Rain */}
          <div
            style={{
              padding: '16px',
              borderRadius: '12px',
              background: rainActive ? '#eff6ff' : '#f8fafc',
              border: rainActive ? '1.5px solid #3b82f6' : '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>🌧️</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Hujan Kuil Kyoto</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>寺院の雨 (Filtered Noise)</div>
                </div>
              </div>
              <button
                onClick={handleToggleRain}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: rainActive ? '#2563eb' : '#cbd5e1',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                }}
              >
                {rainActive ? 'Aktif' : 'Mati'}
              </button>
            </div>
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>
                <span>Volume</span>
                <span>{Math.round(rainVol * 100)}%</span>
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={rainVol}
                onChange={(e) => handleChangeRainVol(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#2563eb' }}
              />
            </div>
          </div>

          {/* Sound 2: Bamboo Knock */}
          <div
            style={{
              padding: '16px',
              borderRadius: '12px',
              background: bambooActive ? '#f0fdf4' : '#f8fafc',
              border: bambooActive ? '1.5px solid #10b981' : '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>🎋</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Bambu Shishi-odoshi</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>鹿威し (Air & Ketukan Kayu)</div>
                </div>
              </div>
              <button
                onClick={handleToggleBamboo}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: bambooActive ? '#10b981' : '#cbd5e1',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                }}
              >
                {bambooActive ? 'Aktif' : 'Mati'}
              </button>
            </div>
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>
                <span>Volume</span>
                <span>{Math.round(bambooVol * 100)}%</span>
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={bambooVol}
                onChange={(e) => handleChangeBambooVol(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#10b981' }}
              />
            </div>
          </div>

          {/* Sound 3: Summer Cicadas */}
          <div
            style={{
              padding: '16px',
              borderRadius: '12px',
              background: cicadaActive ? '#fffbeb' : '#f8fafc',
              border: cicadaActive ? '1.5px solid #f59e0b' : '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>🦗</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Jangkrik Higurashi</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>夏の蝉の声 (Oscillator LFO)</div>
                </div>
              </div>
              <button
                onClick={handleToggleCicada}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: cicadaActive ? '#f59e0b' : '#cbd5e1',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                }}
              >
                {cicadaActive ? 'Aktif' : 'Mati'}
              </button>
            </div>
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>
                <span>Volume</span>
                <span>{Math.round(cicadaVol * 100)}%</span>
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={cicadaVol}
                onChange={(e) => handleChangeCicadaVol(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#f59e0b' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Zen Kotowaza Card */}
      <div
        style={{
          background: 'var(--card-bg, #ffffff)',
          borderRadius: '16px',
          padding: '22px 26px',
          border: '1px solid var(--border-color, #e2e8f0)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, minWidth: '260px' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#3b82f6', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
            Peribahasa Zen Hari Ini (今日の四字熟語)
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <span style={{ fontSize: '2rem', fontFamily: 'serif', fontWeight: 700, color: 'var(--text-color, #0f172a)' }}>
              {currentKotowaza.kanji}
            </span>
            <span style={{ fontSize: '0.95rem', color: '#64748b' }}>
              ({currentKotowaza.kana})
            </span>
          </div>
          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#334155', marginTop: '6px' }}>
            "{currentKotowaza.meaning}"
          </div>
          <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px', lineHeight: 1.4 }}>
            {currentKotowaza.commentary}
          </div>
        </div>

        <button
          onClick={() => setKotowazaIndex((prev) => (prev + 1) % zenKotowaza.length)}
          style={{
            padding: '10px 16px',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            background: 'var(--card-bg, #f8fafc)',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          🔀 Peribahasa Lain
        </button>
      </div>
    </div>
  );
}
