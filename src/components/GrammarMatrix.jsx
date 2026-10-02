import React, { useState } from 'react';
import { grammarMatrixGroups } from '../data/grammarMatrix';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function GrammarMatrix() {
  const [selectedGroupId, setSelectedGroupId] = useState(grammarMatrixGroups[0].id);
  const [activeDrillAnswer, setActiveDrillAnswer] = useState(null);

  const currentGroup = grammarMatrixGroups.find((g) => g.id === selectedGroupId) || grammarMatrixGroups[0];

  // Speech Audio
  const playAudio = (text) => {
    playJapaneseSpeech(text, { rate: 0.9 });
  };

  const handleGroupChange = (id) => {
    setSelectedGroupId(id);
    setActiveDrillAnswer(null);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>
      
      {/* HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.12), rgba(236, 72, 153, 0.15))',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        borderRadius: '16px',
        padding: '1.5rem 1.75rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <span style={{
              background: 'linear-gradient(135deg, #a855f7, #9333ea)',
              color: '#fff',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '6px',
              letterSpacing: '0.5px'
            }}>
              FASE 5 · FITUR 26
            </span>
            <span style={{ fontSize: '0.85rem', color: '#d8b4fe', fontWeight: 600 }}>
              Pembeda Nuansa Tata Bahasa
            </span>
          </div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.5px' }}>
            Matriks Komparasi Tata Bahasa <span style={{ color: '#c084fc' }}>(類似文法マトリクス)</span>
          </h1>
          <p style={{ margin: '0.4rem 0 0', color: '#94a3b8', fontSize: '0.9rem', maxWidth: '650px', lineHeight: 1.5 }}>
            Bongkar perbedaan tajam syarat gramatikal, batasan subjek, kehendak (volition), dan nuansa psikologis antara pola grammar yang artinya mirip.
          </p>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '0.6rem 1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.82rem', color: '#cbd5e1' }}>
          📐 <strong>Dimensi Uji:</strong> Subjek · Volisi · Formalitas · Jebakan ❌
        </div>
      </div>

      {/* GROUP SELECTOR BUTTONS */}
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
        {grammarMatrixGroups.map((group) => (
          <button
            key={group.id}
            onClick={() => handleGroupChange(group.id)}
            style={{
              padding: '0.6rem 1rem',
              borderRadius: '10px',
              border: '1px solid',
              borderColor: selectedGroupId === group.id ? '#c084fc' : 'rgba(255, 255, 255, 0.1)',
              background: selectedGroupId === group.id ? 'rgba(168, 85, 247, 0.25)' : 'rgba(15, 23, 42, 0.6)',
              color: selectedGroupId === group.id ? '#f3e8ff' : '#94a3b8',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {group.title}
          </button>
        ))}
      </div>

      {/* ACTIVE COMPARISON GROUP DISPLAY */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)'
      }}>
        {/* Group Header Info */}
        <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
            <span style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', fontWeight: 800, fontSize: '0.75rem', padding: '2px 8px', borderRadius: '5px' }}>
              {currentGroup.level}
            </span>
            <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc' }}>
              {currentGroup.title}
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.5 }}>
            {currentGroup.description}
          </p>
        </div>

        {/* COMPARISON MATRIX CARDS (SIDE-BY-SIDE COLUMNS) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(${currentGroup.patterns.length > 2 ? '280px' : '340px'}, 1fr))`,
          gap: '1.25rem'
        }}>
          {currentGroup.patterns.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(30, 41, 59, 0.55)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.9rem'
              }}
            >
              {/* Pattern Header */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#c084fc', background: 'rgba(168, 85, 247, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                    {item.level}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{item.formality}</span>
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc' }}>
                  {item.pattern}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', marginTop: '0.2rem' }}>
                  {item.meaning}
                </div>
              </div>

              {/* Dimensional Table Details */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.5)',
                borderRadius: '10px',
                padding: '0.75rem',
                fontSize: '0.8rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                color: '#cbd5e1'
              }}>
                <div>👤 <strong>Subjek:</strong> <span style={{ color: '#f3e8ff' }}>{item.subjectRestriction}</span></div>
                <div>🎯 <strong>Volisi:</strong> <span style={{ color: '#f3e8ff' }}>{item.volition}</span></div>
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.4rem', marginTop: '0.2rem' }}>
                  🧠 <strong>Nuansa Batin:</strong> {item.coreNuance}
                </div>
              </div>

              {/* Good Example (⭕) */}
              <div
                onClick={() => playAudio(item.goodExample.jp)}
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: '10px',
                  padding: '0.65rem 0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem'
                }}
                title="Klik untuk dengarkan audio contoh benar"
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span>⭕ Contoh Alami (Klik 🔊)</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#f8fafc', fontWeight: 600 }}>
                  {item.goodExample.jp}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  {item.goodExample.id}
                </div>
              </div>

              {/* Bad Example (❌) */}
              <div style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '10px',
                padding: '0.65rem 0.85rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem'
              }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f87171' }}>
                  ❌ Contoh Keliru / Aneh:
                </div>
                <div style={{ fontSize: '0.82rem', color: '#fecaca', fontStyle: 'italic' }}>
                  {item.badExample.jp}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4 }}>
                  {item.badExample.id}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MINI DRILL PER GROUP */}
        {currentGroup.drill && (
          <div style={{
            background: 'rgba(30, 41, 59, 0.7)',
            border: '1px solid rgba(168, 85, 247, 0.25)',
            borderRadius: '14px',
            padding: '1.25rem',
            marginTop: '0.5rem'
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#c084fc', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              🎯 Uji Pemahaman Nuansa:
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '1rem' }}>
              {currentGroup.drill.question}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.6rem', marginBottom: '0.8rem' }}>
              {currentGroup.drill.options.map((optText, oIdx) => {
                const isChosen = activeDrillAnswer === oIdx;
                const isCorrect = oIdx === currentGroup.drill.correctIndex;
                let bg = 'rgba(15, 23, 42, 0.6)';
                let border = 'rgba(255, 255, 255, 0.1)';
                let textClr = '#cbd5e1';

                if (activeDrillAnswer !== null) {
                  if (isCorrect) {
                    bg = 'rgba(16, 185, 129, 0.25)';
                    border = '#10b981';
                    textClr = '#34d399';
                  } else if (isChosen && !isCorrect) {
                    bg = 'rgba(239, 68, 68, 0.25)';
                    border = '#ef4444';
                    textClr = '#f87171';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    disabled={activeDrillAnswer !== null}
                    onClick={() => setActiveDrillAnswer(oIdx)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: `1px solid ${border}`,
                      background: bg,
                      color: textClr,
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textAlign: 'left',
                      cursor: activeDrillAnswer === null ? 'pointer' : 'default',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {optText}
                  </button>
                );
              })}
            </div>

            {activeDrillAnswer !== null && (
              <div style={{
                background: activeDrillAnswer === currentGroup.drill.correctIndex ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                border: `1px solid ${activeDrillAnswer === currentGroup.drill.correctIndex ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                borderRadius: '8px',
                padding: '0.75rem',
                fontSize: '0.82rem',
                color: '#f8fafc',
                lineHeight: 1.45
              }}>
                <strong>{activeDrillAnswer === currentGroup.drill.correctIndex ? '⭕ Tepat Sekali!' : '❌ Belum Pas!'}</strong>{' '}
                {currentGroup.drill.explanation}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
