import React, { useState } from 'react';
import { jukugoTreesData } from '../data/jukugoTrees';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function JukugoTreeViewer() {
  const [selectedTreeId, setSelectedTreeId] = useState(jukugoTreesData[0].id);
  const currentTree = jukugoTreesData.find((t) => t.id === selectedTreeId) || jukugoTreesData[0];
  const [selectedCompound, setSelectedCompound] = useState(currentTree.compounds[0]);

  // Audio Playback
  const playAudio = (text) => {
    playJapaneseSpeech(text, { rate: 0.9 });
  };

  const handleTreeChange = (treeId) => {
    setSelectedTreeId(treeId);
    const tree = jukugoTreesData.find((t) => t.id === treeId) || jukugoTreesData[0];
    setSelectedCompound(tree.compounds[0]);
  };

  // Color map for JLPT Levels
  const getLevelColor = (lvl) => {
    switch (lvl) {
      case 'N5': return { bg: 'rgba(16, 185, 129, 0.2)', border: '#10b981', text: '#34d399' };
      case 'N4': return { bg: 'rgba(14, 165, 233, 0.2)', border: '#0ea5e9', text: '#38bdf8' };
      case 'N3': return { bg: 'rgba(234, 179, 8, 0.2)', border: '#eab308', text: '#facc15' };
      case 'N2': return { bg: 'rgba(249, 115, 22, 0.2)', border: '#f97316', text: '#fb923c' };
      case 'N1': return { bg: 'rgba(236, 72, 153, 0.2)', border: '#ec4899', text: '#f472b6' };
      default: return { bg: 'rgba(99, 102, 241, 0.2)', border: '#6366f1', text: '#818cf8' };
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>
      
      {/* HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(16, 185, 129, 0.15))',
        border: '1px solid rgba(59, 130, 246, 0.3)',
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
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              color: '#fff',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '6px',
              letterSpacing: '0.5px'
            }}>
              FASE 5 · FITUR 27
            </span>
            <span style={{ fontSize: '0.85rem', color: '#93c5fd', fontWeight: 600 }}>
              Pohon Kosakata Balok Lego
            </span>
          </div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.5px' }}>
            Pohon Senyawa Kanji <span style={{ color: '#60a5fa' }}>(熟語ファミリー Jukugo Tree)</span>
          </h1>
          <p style={{ margin: '0.4rem 0 0', color: '#94a3b8', fontSize: '0.9rem', maxWidth: '650px', lineHeight: 1.5 }}>
            Pahami kanji sebagai balok pembangun kata majemuk (Jukugo). Hafalkan satu kanji inti, kuasai belasan kosakata turunan N5 hingga N1 secara eksponensial!
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(15, 23, 42, 0.6)', padding: '0.5rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Rumpun Aktif:</span>
          <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#38bdf8' }}>{currentTree.rootKanji} ({currentTree.rootMeaning})</span>
        </div>
      </div>

      {/* ROOT KANJI SELECTOR BUTTONS */}
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8', marginRight: '0.2rem' }}>Pilih Kanji Inti:</span>
        {jukugoTreesData.map((tree) => {
          const isSelected = tree.id === selectedTreeId;
          return (
            <button
              key={tree.id}
              onClick={() => handleTreeChange(tree.id)}
              style={{
                padding: '0.55rem 1rem',
                borderRadius: '10px',
                border: '1px solid',
                borderColor: isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)',
                background: isSelected ? 'rgba(56, 189, 248, 0.25)' : 'rgba(15, 23, 42, 0.6)',
                color: isSelected ? '#f8fafc' : '#94a3b8',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>{tree.rootKanji}</span>
              <span style={{ fontSize: '0.78rem', color: isSelected ? '#bae6fd' : '#64748b' }}>({tree.rootMeaning})</span>
            </button>
          );
        })}
      </div>

      {/* MAIN TWO-COLUMN VIEW (MINDMAP + INSPECTOR) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.4fr) minmax(300px, 1fr)', gap: '1.5rem' }}>
        
        {/* LEFT COLUMN: INTERACTIVE VISUAL NODE NETWORK */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)'
        }}>
          {/* Root Card Header */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(99, 102, 241, 0.15))',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #38bdf8, #2563eb)',
                color: '#fff',
                fontSize: '2.5rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(56, 189, 248, 0.4)'
              }}>
                {currentTree.rootKanji}
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
                  {currentTree.rootMeaning}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  Bacaan: {currentTree.rootReading}
                </div>
              </div>
            </div>

            <button
              onClick={() => playAudio(currentTree.rootKanji)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                background: 'rgba(56, 189, 248, 0.1)',
                color: '#38bdf8',
                cursor: 'pointer',
                fontSize: '1.1rem'
              }}
              title="Dengarkan pelafalan"
            >
              🔊
            </button>
          </div>

          <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, background: 'rgba(0, 0, 0, 0.25)', padding: '0.6rem 0.9rem', borderRadius: '8px' }}>
            💡 {currentTree.description}
          </p>

          {/* SATELLITE NODES GRID (COMPOUND CHIPS) */}
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Cabang Senyawa Kata ({currentTree.compounds.length} Kosakata):
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
              {currentTree.compounds.map((comp, idx) => {
                const isSelected = selectedCompound?.word === comp.word;
                const colors = getLevelColor(comp.level);
                return (
                  <button
                    key={idx}
                    onClick={() => { setSelectedCompound(comp); playAudio(comp.word); }}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      border: `1.5px solid ${isSelected ? '#38bdf8' : colors.border}`,
                      background: isSelected ? 'rgba(56, 189, 248, 0.2)' : 'rgba(30, 41, 59, 0.6)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.3rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 4px 20px rgba(56, 189, 248, 0.3)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
                        {comp.word}
                      </span>
                      <span style={{
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        color: colors.text,
                        background: colors.bg,
                        padding: '1px 5px',
                        borderRadius: '4px'
                      }}>
                        {comp.level}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      {comp.reading}
                    </div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', marginTop: '0.1rem' }}>
                      {comp.meaning}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DETAIL LEGO INSPECTOR PANEL */}
        {selectedCompound && (
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '20px',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.25rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Top Meta */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: getLevelColor(selectedCompound.level).text,
                    background: getLevelColor(selectedCompound.level).bg,
                    padding: '2px 8px',
                    borderRadius: '6px'
                  }}>
                    Level {selectedCompound.level}
                  </span>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.1, marginTop: '0.4rem' }}>
                    {selectedCompound.word}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                    {selectedCompound.reading}
                  </div>
                </div>

                <button
                  onClick={() => playAudio(selectedCompound.word)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    background: 'rgba(56, 189, 248, 0.15)',
                    color: '#38bdf8',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  🔊 Lafalkan
                </button>
              </div>

              {/* Meaning */}
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#38bdf8' }}>
                🇮🇩 {selectedCompound.meaning}
              </div>

              {/* Lego Breakdown Equation Box */}
              <div style={{
                background: 'rgba(30, 41, 59, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                  🧩 Formula Balok Lego:
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#facc15' }}>
                  {selectedCompound.breakdown}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45, marginTop: '0.2rem' }}>
                  {selectedCompound.explanation}
                </div>
              </div>

              {/* Example Sentence */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '12px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                  Contoh Penggunaan:
                </div>
                <div style={{ fontSize: '0.9rem', color: '#f8fafc', lineHeight: 1.5 }}>
                  {selectedCompound.sentence}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.78rem', color: '#64748b', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.75rem' }}>
              💡 Klik cabang kata lain di sebelah kiri untuk melihat logika dekomposisinya.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
