import React, { useState, useEffect, useRef } from 'react';
import { getKanjiDecomposition } from '../data/radicals';

export default function KanjiStrokeViewer({ kanjiChar, strokeCount, meanings = [] }) {
  const [svgPaths, setSvgPaths] = useState([]);
  const [activeStrokeIdx, setActiveStrokeIdx] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1); // 0.6x (slow), 1x (normal), 1.5x (fast)
  const [loadingSvg, setLoadingSvg] = useState(false);
  const timerRef = useRef(null);

  const decomposition = getKanjiDecomposition(kanjiChar);

  // Fetch KanjiVG SVG strokes for exact stroke order
  useEffect(() => {
    if (!kanjiChar) return;
    let alive = true;
    setLoadingSvg(true);
    setActiveStrokeIdx(-1);
    setIsPlaying(false);

    const codePoint = kanjiChar.codePointAt(0);
    const hex = codePoint.toString(16).padStart(5, '0');
    const url = `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg/kanji/${hex}.svg`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('SVG not found');
        return res.text();
      })
      .then(xmlText => {
        if (!alive) return;
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlText, 'image/svg+xml');
        const paths = Array.from(doc.querySelectorAll('path')).map(p => p.getAttribute('d')).filter(Boolean);
        if (paths.length > 0) {
          setSvgPaths(paths);
          setActiveStrokeIdx(paths.length); // Show full character by default
        } else {
          setSvgPaths([]);
        }
      })
      .catch(() => {
        if (alive) setSvgPaths([]);
      })
      .finally(() => {
        if (alive) setLoadingSvg(false);
      });

    return () => {
      alive = false;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [kanjiChar]);

  // Stroke player playback loop
  useEffect(() => {
    if (!isPlaying || svgPaths.length === 0) return;

    const delay = Math.round(900 / speed);
    timerRef.current = setInterval(() => {
      setActiveStrokeIdx(prev => {
        if (prev >= svgPaths.length) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, delay);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, svgPaths.length, speed]);

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (activeStrokeIdx >= svgPaths.length) {
        setActiveStrokeIdx(1);
      }
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStrokeIdx(svgPaths.length > 0 ? svgPaths.length : -1);
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    setActiveStrokeIdx(prev => Math.min(svgPaths.length, prev + 1));
  };

  const handleStepBack = () => {
    setIsPlaying(false);
    setActiveStrokeIdx(prev => Math.max(1, prev - 1));
  };

  return (
    <div className="kanji-stroke-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* ── STROKE ORDER CANVAS & PLAYER ── */}
      <div className="glass-panel" style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(15, 23, 42, 0.65)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--accent-cyan)' }}>
            Animasi Urutan Goresan (筆順 Hitsujun)
          </span>
          <span style={{
            fontSize: '0.78rem',
            padding: '2px 8px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.06)',
            color: 'var(--text-secondary)'
          }}>
            {activeStrokeIdx > 0 && svgPaths.length > 0
              ? `Coretan ${activeStrokeIdx} dari ${svgPaths.length}`
              : `${strokeCount || '?'} Total Coretan`}
          </span>
        </div>

        {/* Kanji Square with Traditional Crosshair Guidelines */}
        <div style={{
          position: 'relative',
          width: '240px',
          height: '240px',
          background: '#090d16',
          border: '2px solid rgba(139, 92, 246, 0.4)',
          borderRadius: '16px',
          boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.6)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Dashed Crosshair Lines (Genkouyoushi) */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '1px dashed rgba(255, 255, 255, 0.12)' }} />
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, borderLeft: '1px dashed rgba(255, 255, 255, 0.12)' }} />
            <div style={{ position: 'absolute', inset: '20px', border: '1px dashed rgba(255, 255, 255, 0.05)', borderRadius: '8px' }} />
          </div>

          {loadingSvg ? (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Memuat goresan...</div>
          ) : svgPaths.length > 0 ? (
            <svg viewBox="0 0 109 109" style={{ width: '100%', height: '100%' }}>
              {svgPaths.map((d, i) => {
                const isVisible = i < activeStrokeIdx;
                const isCurrent = i === activeStrokeIdx - 1;

                return (
                  <path
                    key={i}
                    d={d}
                    fill="none"
                    stroke={isCurrent ? '#06b6d4' : isVisible ? '#f8fafc' : 'rgba(255, 255, 255, 0.08)'}
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transition: 'stroke 0.25s ease',
                      filter: isCurrent ? 'drop-shadow(0 0 4px #06b6d4)' : 'none'
                    }}
                  />
                );
              })}
            </svg>
          ) : (
            // Offline / SVG fallback: high-resolution font rendering
            <div style={{
              fontFamily: 'var(--font-jp)',
              fontSize: '8.5rem',
              fontWeight: '500',
              color: 'var(--text-primary)',
              lineHeight: 1,
              userSelect: 'none'
            }}>
              {kanjiChar}
            </div>
          )}
        </div>

        {/* Player Controls Bar */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          marginTop: '1.25rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <button
            type="button"
            className="filter-btn"
            onClick={handleStepBack}
            disabled={activeStrokeIdx <= 1}
            title="Langkah coretan sebelumnya"
            style={{ padding: '6px 12px', borderRadius: '10px' }}
          >
            ⏮ Mundur
          </button>

          <button
            type="button"
            className="start-quiz-btn"
            onClick={handlePlayPause}
            style={{ margin: 0, padding: '6px 18px', fontSize: '0.9rem' }}
          >
            {isPlaying ? '⏸ Jeda' : '▶ Putar'}
          </button>

          <button
            type="button"
            className="filter-btn"
            onClick={handleStepForward}
            disabled={activeStrokeIdx >= svgPaths.length}
            title="Langkah coretan berikutnya"
            style={{ padding: '6px 12px', borderRadius: '10px' }}
          >
            Maju ⏭
          </button>

          <button
            type="button"
            className="filter-btn"
            onClick={handleReset}
            title="Tampilkan bentuk penuh"
            style={{ padding: '6px 12px', borderRadius: '10px' }}
          >
            🔄 Reset
          </button>

          {/* Speed Selector */}
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="glass-panel"
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              color: 'var(--text-primary)',
              border: '1px solid var(--glass-border)',
              padding: '6px 10px',
              borderRadius: '10px',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            <option value={0.6}>0.6x Lambat</option>
            <option value={1}>1.0x Normal</option>
            <option value={1.5}>1.5x Cepat</option>
          </select>
        </div>
      </div>

      {/* ── RADICAL DECOMPOSITION & MNEMONIC ── */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#c4b5fd', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Dekomposisi Radikal (部首 Bushu)
          </span>
          <span style={{
            fontSize: '0.75rem',
            padding: '2px 8px',
            borderRadius: '8px',
            background: 'rgba(139, 92, 246, 0.15)',
            color: '#c4b5fd',
            border: '1px solid rgba(139, 92, 246, 0.3)'
          }}>
            Radikal: {decomposition.radical.char} ({decomposition.radical.name})
          </span>
        </div>

        {/* Component breakdown chips */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {decomposition.components.map((comp, idx) => (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                fontSize: '0.82rem'
              }}
            >
              <span style={{ fontFamily: 'var(--font-jp)', fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                {comp.char}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: '600', color: 'white', fontSize: '0.75rem' }}>{comp.name}</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{comp.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mnemonic Story Box */}
        <div style={{
          background: 'rgba(139, 92, 246, 0.08)',
          border: '1px solid rgba(139, 92, 246, 0.25)',
          padding: '0.9rem',
          borderRadius: '12px'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#c4b5fd', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            💡 Kisah Mnemonik untuk Menghafal:
          </div>
          <p style={{ color: 'var(--text-primary)', fontSize: '0.92rem', lineHeight: '1.55', margin: 0 }}>
            {decomposition.mnemonic}
          </p>
        </div>

        {meanings.length > 0 && (
          <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Arti Kanji: <strong style={{ color: 'white' }}>{meanings.join(', ')}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
