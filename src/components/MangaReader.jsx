import React, { useState } from 'react';
import { yonkomaStories, particleEncyclopedia } from '../data/mangaDialogues';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function MangaReader() {
  const [activeTab, setActiveTab] = useState('manga'); // 'manga' | 'particles'
  const [selectedStoryId, setSelectedStoryId] = useState(yonkomaStories[0].id);
  const [activePanelIdx, setActivePanelIdx] = useState(0);

  const activeStory = yonkomaStories.find(s => s.id === selectedStoryId) || yonkomaStories[0];

  // Play Native Speech Audio
  const playNativeAudio = (text, rate = 1.0) => {
    playJapaneseSpeech(text, { rate });
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER SECTION */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(99, 102, 241, 0.15))',
        border: '1px solid rgba(236, 72, 153, 0.3)',
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
            <span style={{ fontSize: '1.8rem' }}>💬</span>
            <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc', fontWeight: 800 }}>
              Mode Percakapan Komik (マンガ対話リーダー)
            </h1>
            <span style={{
              background: 'rgba(236, 72, 153, 0.25)',
              color: '#f472b6',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: '1px solid rgba(236, 72, 153, 0.4)'
            }}>
              Partikel Afektif & Bahasa Gaul
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', maxWidth: '650px' }}>
            Pelajari cara karakter anime & manga mengekspresikan emosi lewat partikel akhir (終助詞: ね, よ, さ, ぞ, ぜ, わ, かしら) dan bahasa gaul pemuda (若者言葉: ヤバい, ワンチャン, 草) lewat komik 4-panel interaktif.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '0.25rem', gap: '0.25rem' }}>
          {[
            { id: 'manga', label: '📖 Baca Komik 4-Panel' },
            { id: 'particles', label: '🎓 Kamus Partikel Akhir' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? '#ec4899' : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#94a3b8',
                border: 'none',
                borderRadius: '8px',
                padding: '0.45rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: BACA KOMIK 4-PANEL */}
      {activeTab === 'manga' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Episode Select Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>Pilih Episode:</span>
            {yonkomaStories.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedStoryId(s.id);
                  setActivePanelIdx(0);
                }}
                style={{
                  background: selectedStoryId === s.id ? 'rgba(236, 72, 153, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  color: selectedStoryId === s.id ? '#f472b6' : '#cbd5e1',
                  border: `1.5px solid ${selectedStoryId === s.id ? '#ec4899' : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '10px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Manga Layout: 4 Panels Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {activeStory.panels.map((panel, idx) => {
              const isSelected = activePanelIdx === idx;
              return (
                <div
                  key={panel.panelNum}
                  onClick={() => setActivePanelIdx(idx)}
                  style={{
                    background: isSelected ? 'rgba(236, 72, 153, 0.1)' : 'var(--card-bg, #1e293b)',
                    border: `2px solid ${isSelected ? '#ec4899' : 'rgba(255, 255, 255, 0.1)'}`,
                    borderRadius: '16px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 8px 30px rgba(236, 72, 153, 0.2)' : 'none'
                  }}
                >
                  {/* Panel Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        background: '#ec4899',
                        color: '#fff',
                        fontSize: '0.78rem',
                        fontWeight: 900,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '6px'
                      }}>
                        PANEL {panel.panelNum}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>
                        {panel.sceneDesc}
                      </span>
                    </div>

                    {/* SFX Onomatope Badge */}
                    <span style={{
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      color: '#fbbf24',
                      background: 'rgba(245, 158, 11, 0.15)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(245, 158, 11, 0.3)'
                    }}>
                      ⚡ {panel.sfx}
                    </span>
                  </div>

                  {/* Speech Bubble Simulation */}
                  <div style={{
                    background: '#0f172a',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    position: 'relative'
                  }}>
                    {/* Speaker Avatar */}
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2.4rem' }}>{panel.avatar}</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f472b6' }}>
                        {panel.speaker}
                      </div>
                    </div>

                    {/* Speech Text & Audio Button */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.6 }}>
                          「{panel.bubble}」
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playNativeAudio(panel.bubble, 0.95);
                          }}
                          style={{
                            background: 'rgba(236, 72, 153, 0.2)',
                            color: '#f472b6',
                            border: '1px solid rgba(236, 72, 153, 0.4)',
                            borderRadius: '8px',
                            padding: '0.35rem 0.75rem',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            whiteSpace: 'nowrap',
                            marginLeft: '0.5rem'
                          }}
                        >
                          <span>🔊</span>
                          <span>Suara Karakter</span>
                        </button>
                      </div>

                      <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.2rem' }}>
                        {panel.romaji}
                      </div>
                      <div style={{ fontSize: '0.92rem', color: '#a7f3d0', fontWeight: 500 }}>
                        Arti: {panel.meaning}
                      </div>
                    </div>
                  </div>

                  {/* Bedah Linguistik & Wakamono Kotoba Pills */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                      Bedah Partikel Afektif & Bahasa Gaul di Panel Ini:
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.5rem' }}>
                      {panel.focusParticles.map((fp, fpIdx) => (
                        <div
                          key={fpIdx}
                          style={{
                            background: 'rgba(0, 0, 0, 0.25)',
                            borderLeft: `3px solid ${fp.type === 'Wakamono Kotoba' ? '#f59e0b' : '#38bdf8'}`,
                            borderRadius: '4px 8px 8px 4px',
                            padding: '0.5rem 0.75rem',
                            fontSize: '0.82rem'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.15rem' }}>
                            <strong style={{ color: fp.type === 'Wakamono Kotoba' ? '#fbbf24' : '#38bdf8' }}>
                              {fp.word}
                            </strong>
                            <span style={{ fontSize: '0.68rem', color: '#94a3b8', background: 'rgba(255, 255, 255, 0.05)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                              {fp.type}
                            </span>
                          </div>
                          <div style={{ color: '#cbd5e1', fontSize: '0.78rem', lineHeight: 1.3 }}>
                            {fp.note}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: ENSIKLOPEDIA PARTIKEL AKHIR (SHUUJOSHI) */}
      {activeTab === 'particles' && (
        <div style={{
          background: 'var(--card-bg, #1e293b)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          <div>
            <h2 style={{ margin: '0 0 0.3rem 0', fontSize: '1.3rem', color: '#f8fafc', fontWeight: 700 }}>
              🎓 Panduan Lengkap Partikel Akhir Afektif Kalimat (終助詞 / Shūjoshi)
            </h2>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
              Di dalam manga, anime, dan pergaulan asli, 1 suku kata di akhir kalimat menentukan apakah Anda terdengar ramah, sombong, jantan, feminin, atau empati.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.9rem' }}>
            {particleEncyclopedia.map((p, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  border: '1px solid rgba(236, 72, 153, 0.2)',
                  borderRadius: '12px',
                  padding: '1.1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#f472b6' }}>
                    〜{p.particle}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#cbd5e1', background: 'rgba(255, 255, 255, 0.08)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                    {p.gender}
                  </span>
                </div>

                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fbbf24' }}>
                  Nuansa: {p.nuance}
                </div>

                <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  {p.description}
                </p>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '6px',
                  padding: '0.5rem 0.8rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '0.2rem'
                }}>
                  <span style={{ fontSize: '0.85rem', color: '#a7f3d0' }}>{p.sample}</span>
                  <button
                    onClick={() => playNativeAudio(p.sample)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}
                  >
                    🔊
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
