import React, { useState } from 'react';
import { pitchAccentPairs } from '../data/pitchAccent';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function PitchAccentLab() {
  const [selectedPairId, setSelectedPairId] = useState('hashi');

  const activePair = pitchAccentPairs.find(p => p.id === selectedPairId) || pitchAccentPairs[0];

  const playAudio = (text) => {
    playJapaneseSpeech(text, { rate: 0.85 });
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(239, 68, 68, 0.15))',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        borderRadius: '16px',
        padding: '1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🎵</span>
            <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc', fontWeight: 800 }}>
              Laboratorium Kontur Nada (Tokyo Pitch Accent / アクセント)
            </h1>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', maxWidth: '650px' }}>
            Visualisasi kontur tangga nada tinggi-rendah aksen Tokyo baku untuk membedakan arti kata kembar (*minimal pairs*) secara presisi.
          </p>
        </div>

        {/* Pattern Summary Badge */}
        <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '0.8rem', color: '#fbbf24', fontWeight: 600 }}>
          4 Pola Intonasi Tokyo Baku
        </div>
      </div>

      {/* 4 PITCH PATTERNS EDUCATION PILLARS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '0.8rem'
      }}>
        <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ fontWeight: 800, color: '#38bdf8', fontSize: '0.92rem', marginBottom: '0.2rem' }}>
            平板型 (Heiban - Pola 0)
          </div>
          <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
            Mora 1 rendah, lalu naik dan DATAR terus hingga partikel setelahnya (Contoh: さくら-が).
          </div>
        </div>

        <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ fontWeight: 800, color: '#f87171', fontSize: '0.92rem', marginBottom: '0.2rem' }}>
            頭高型 (Atamadaka - Pola 1)
          </div>
          <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
            Mora 1 TINGGI di awal, lalu langsung jatuh rendah pada mora kedua dan seterusnya (Contoh: はし [sumpit]).
          </div>
        </div>

        <div style={{ background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.25)', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ fontWeight: 800, color: '#c084fc', fontSize: '0.92rem', marginBottom: '0.2rem' }}>
            中高型 (Nakadaka - Pola 2/3)
          </div>
          <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
            Rendah di awal, naik memuncak di TENGAH, lalu turun kembali di akhir kata (Contoh: たまご).
          </div>
        </div>

        <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ fontWeight: 800, color: '#fbbf24', fontSize: '0.92rem', marginBottom: '0.2rem' }}>
            尾高型 (Odaka)
          </div>
          <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
            Rendah lalu naik tinggi di AKHIR kata, namun NADA JATUH saat partikel (が/を) disambungkan! (Contoh: はな-が [bunga]).
          </div>
        </div>
      </div>

      {/* SELECTOR OF MINIMAL PAIRS */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {pitchAccentPairs.map(p => {
          const isSelected = p.id === selectedPairId;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPairId(p.id)}
              style={{
                background: isSelected ? 'var(--primary, #6366f1)' : 'var(--card-bg, #1e293b)',
                color: isSelected ? '#fff' : '#cbd5e1',
                border: `1.5px solid ${isSelected ? '#6366f1' : 'rgba(255, 255, 255, 0.08)'}`,
                borderRadius: '10px',
                padding: '0.6rem 1.2rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {p.term} ({p.meaningOverview})
            </button>
          );
        })}
      </div>

      {/* PITCH VISUALIZER CARDS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {activePair.variants.map((variant, vIdx) => (
          <div
            key={vIdx}
            style={{
              background: 'var(--card-bg, #1e293b)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}
          >
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 900, color: '#f8fafc' }}>
                    {variant.word}
                  </span>
                  <span style={{ fontSize: '1.3rem', color: '#38bdf8', fontWeight: 600 }}>
                    【{variant.reading}】
                  </span>
                  <span style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    color: '#fbbf24',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 700
                  }}>
                    {variant.patternType}
                  </span>
                </div>
                <div style={{ fontSize: '0.92rem', color: '#cbd5e1', marginTop: '0.2rem', fontWeight: 500 }}>
                  Arti: <strong>{variant.meaning}</strong> • Romaji: <code style={{ color: '#38bdf8' }}>{variant.romaji}</code>
                </div>
              </div>

              <button
                onClick={() => playAudio(variant.reading)}
                style={{
                  background: 'rgba(56, 189, 248, 0.15)',
                  color: '#38bdf8',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <span>🔊</span>
                <span>Dengarkan Nada</span>
              </button>
            </div>

            {/* PITCH CONTOUR STEP LADDER DIAGRAM */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.35)',
              borderRadius: '12px',
              padding: '1.5rem',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginBottom: '1.5rem', borderBottom: '1px dashed rgba(255, 255, 255, 0.1)', paddingBottom: '0.3rem' }}>
                <span>NADA TINGGI (High Pitch ▲)</span>
                <span>NADA RENDAH (Low Pitch ▼)</span>
              </div>

              {/* Mora Visual Nodes */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2.5rem', minHeight: '90px' }}>
                {variant.moras.map((m, mIdx) => {
                  const isHigh = m.pitch === 'high';
                  return (
                    <div
                      key={mIdx}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transform: isHigh ? 'translateY(-20px)' : 'translateY(20px)',
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      {/* High/Low Indicator Pill */}
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: isHigh ? '#34d399' : '#94a3b8',
                        background: isHigh ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        padding: '1px 6px',
                        borderRadius: '4px'
                      }}>
                        {isHigh ? 'HIGH' : 'LOW'}
                      </span>

                      {/* Mora Bubble Node */}
                      <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        background: isHigh ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255, 255, 255, 0.08)',
                        border: `2px solid ${isHigh ? '#34d399' : 'rgba(255, 255, 255, 0.2)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.3rem',
                        fontWeight: 900,
                        color: isHigh ? '#fff' : '#cbd5e1',
                        boxShadow: isHigh ? '0 0 12px rgba(16, 185, 129, 0.4)' : 'none'
                      }}>
                        {m.kana}
                      </div>

                      <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                        Mora {mIdx + 1}
                      </span>
                    </div>
                  );
                })}

                {/* Particle Drop Indicator if applicable */}
                {variant.particleDrop && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transform: variant.particleDrop === 'high' ? 'translateY(-20px)' : 'translateY(20px)',
                    opacity: 0.6
                  }}>
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                      + が (Partikel)
                    </span>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      border: '1.5px dashed rgba(255, 255, 255, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                      color: '#cbd5e1'
                    }}>
                      が
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Example sentence */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.88rem', color: '#cbd5e1' }}>
              💬 <strong>Contoh Penggunaan:</strong> {variant.example}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
