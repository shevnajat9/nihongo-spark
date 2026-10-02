import React from 'react';
import { alignRubySegments, useFuriganaMode } from './furiganaHelper';

/**
 * RubyText Component
 * Renders Japanese text with native HTML <ruby> and <rt> tags.
 * Respects 'always', 'hover', and 'hide' display modes.
 */
export function RubyText({ text, reading, mode: propMode, className = '', style = {} }) {
  const [hookMode] = useFuriganaMode();
  const activeMode = propMode || hookMode;

  if (!text) return null;

  const segments = alignRubySegments(text, reading);

  return (
    <span
      className={`furigana-text furigana-mode-${activeMode} ${className}`}
      style={{
        display: 'inline',
        fontFamily: 'var(--font-jp, "Noto Sans JP", sans-serif)',
        lineHeight: activeMode === 'hide' ? '1.6' : '2.1',
        verticalAlign: 'baseline',
        ...style
      }}
    >
      {segments.map((seg, idx) => {
        if (seg.isKanji && seg.reading) {
          return (
            <ruby key={idx} className="ruby-tag">
              {seg.text}
              <rt className="ruby-rt">{seg.reading}</rt>
            </ruby>
          );
        }
        return <span key={idx}>{seg.text}</span>;
      })}
    </span>
  );
}

/**
 * FuriganaModeSelector Component
 * Compact toggle button / selector for navbar and study headers
 */
export function FuriganaModeSelector({ compact = false }) {
  const [mode, setMode] = useFuriganaMode();

  const modes = [
    { key: 'always', label: 'Selalu', icon: 'ふ', title: 'Furigana Tampil Selalu' },
    { key: 'hover', label: 'Hover', icon: '👆', title: 'Furigana Tampil Saat Diarahkan' },
    { key: 'hide', label: 'Sembunyi', icon: '漢', title: 'Sembunyikan Furigana (Uji Daya Ingat)' }
  ];

  return (
    <div
      className="furigana-selector glass-panel"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 4px',
        borderRadius: '20px',
        gap: '2px',
        fontSize: '0.78rem'
      }}
      role="group"
      aria-label="Mode Furigana"
    >
      <span
        style={{
          padding: '0 6px',
          color: 'var(--text-muted)',
          fontWeight: '600',
          fontSize: '0.72rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}
      >
        振
      </span>
      {modes.map((m) => {
        const isActive = mode === m.key;
        return (
          <button
            key={m.key}
            type="button"
            className={`furigana-btn ${isActive ? 'active' : ''}`}
            onClick={() => setMode(m.key)}
            title={m.title}
            style={{
              background: isActive ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-cyan))' : 'transparent',
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              border: 'none',
              padding: compact ? '3px 8px' : '4px 10px',
              borderRadius: '16px',
              cursor: 'pointer',
              fontWeight: isActive ? '600' : '400',
              fontSize: '0.75rem',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>{m.icon}</span>
            {!compact && <span>{m.label}</span>}
          </button>
        );
      })}
    </div>
  );
}

export const FuriganaText = RubyText;
export default RubyText;
