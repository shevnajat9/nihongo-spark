import React, { useState } from 'react';
import { parseJapaneseSyntax, PRESET_SENTENCES } from '../utils/syntaxParser';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function SyntaxParserViewer() {
  const [inputSentence, setInputSentence] = useState(PRESET_SENTENCES[0].sentence);
  const [activeChunkIdx, setActiveChunkIdx] = useState(null);

  const parsedChunks = parseJapaneseSyntax(inputSentence);

  const playAudio = (text) => {
    playJapaneseSpeech(text, { rate: 0.88 });
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.15), rgba(56, 189, 248, 0.15))',
        border: '1px solid rgba(129, 140, 248, 0.3)',
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
            <span style={{ fontSize: '1.8rem' }}>🧩</span>
            <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc', fontWeight: 800 }}>
              Pemecah Struktur Kalimat Visual (文分解 Visual Syntax Parser)
            </h1>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', maxWidth: '650px' }}>
            Urai kalimat panjang bertingkat menjadi blok warna terstruktur (Topik, Waktu, Tempat, Objek, Partikel, dan Predikat).
          </p>
        </div>

        <button
          onClick={() => playAudio(inputSentence)}
          style={{
            background: 'var(--primary, #6366f1)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '0.55rem 1.1rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <span>🔊</span>
          <span>Dengarkan Kalimat</span>
        </button>
      </div>

      {/* INPUT & PRESETS */}
      <div style={{
        background: 'var(--card-bg, #1e293b)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>
            Ketik atau Tempel Kalimat Bahasa Jepang:
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Contoh Preset:</span>
            {PRESET_SENTENCES.map((p, i) => (
              <button
                key={i}
                onClick={() => setInputSentence(p.sentence)}
                style={{
                  background: inputSentence === p.sentence ? '#6366f1' : 'rgba(255, 255, 255, 0.06)',
                  color: inputSentence === p.sentence ? '#fff' : '#cbd5e1',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.25rem 0.6rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {p.level}
              </button>
            ))}
          </div>
        </div>

        <textarea
          rows={2}
          value={inputSentence}
          onChange={(e) => setInputSentence(e.target.value)}
          placeholder="Masukkan kalimat Jepang apa saja di sini..."
          style={{
            width: '100%',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '10px',
            padding: '0.85rem 1rem',
            color: 'white',
            fontSize: '1.15rem',
            fontWeight: 500,
            lineHeight: 1.6,
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* SYNTACTIC BLOCKS DISPLAY */}
      <div style={{
        background: 'var(--card-bg, #1e293b)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#cbd5e1' }}>
          Visualisasi Blok Sintaksis (Klik blok untuk melihat fungsi tata bahasanya):
        </div>

        {/* Visual Blocks Flex Container */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
          {parsedChunks.map((chunk, idx) => {
            const isSelected = idx === activeChunkIdx;
            const p = chunk.particle;
            const blockColor = p ? p.color : '#f43f5e';
            const roleName = p ? p.role : 'Predikat / Verba Akhir (述語)';

            return (
              <div
                key={idx}
                onClick={() => setActiveChunkIdx(idx)}
                style={{
                  background: isSelected ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  border: `2px solid ${isSelected ? blockColor : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '12px',
                  padding: '0.6rem 1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.4rem',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? `0 0 15px ${blockColor}44` : 'none'
                }}
              >
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>
                  {chunk.text}
                </span>

                {p && (
                  <span style={{
                    fontSize: '1.1rem',
                    fontWeight: 900,
                    color: p.color,
                    background: `${p.color}22`,
                    padding: '0.1rem 0.4rem',
                    borderRadius: '6px',
                    border: `1px solid ${p.color}55`
                  }}>
                    {p.char}
                  </span>
                )}

                <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>
                  [{roleName.split(' ')[0]}]
                </span>
              </div>
            );
          })}
        </div>

        {/* ACTIVE CHUNK DETAIL INSPECTOR */}
        {activeChunkIdx !== null && parsedChunks[activeChunkIdx] && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.35), rgba(15, 23, 42, 0.5))',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '12px',
            padding: '1.25rem',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            {(() => {
              const ch = parsedChunks[activeChunkIdx];
              const p = ch.particle;
              return (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#f8fafc' }}>
                        {ch.fullChunk}
                      </span>
                      {p && (
                        <span style={{
                          background: `${p.color}22`,
                          color: p.color,
                          border: `1px solid ${p.color}55`,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 700
                        }}>
                          Partikel 【{p.char}】: {p.role}
                        </span>
                      )}
                      {!p && (
                        <span style={{
                          background: 'rgba(244, 63, 94, 0.2)',
                          color: '#fb7185',
                          border: '1px solid rgba(244, 63, 94, 0.4)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 700
                        }}>
                          Predikat / Verba Penutup Kalimat
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => playAudio(ch.fullChunk)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: '#e2e8f0',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.3rem 0.6rem',
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      🔊 Dengarkan Blok
                    </button>
                  </div>

                  <div style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                    {p ? (
                      <div>
                        💡 <strong>Fungsi Sintaksis:</strong> {p.desc}
                      </div>
                    ) : (
                      <div>
                        💡 <strong>Fungsi Sintaksis:</strong> Predikat utama yang menentukan waktu (lampau/sekarang), sopan-santun (Desu/Masu vs Kasual), dan afirmatif/negatif kalimat.
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* GRAMMATICAL FLOW GUIDE (SOV) */}
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: '10px', padding: '1rem', border: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.82rem', color: '#94a3b8' }}>
          📌 <strong>Pola Kalimat Bahasa Jepang (SOV):</strong> Bahasa Jepang menempatkan kata kerja/predikat selalu di paling akhir kalimat. Posisi keterangan waktu dan tempat di tengah bersifat fleksibel selama partikel penandanya melekat dengan tepat pada katanya.
        </div>
      </div>
    </div>
  );
}
