import React, { useState } from 'react';
import { hiragana, katakana } from '../data/kana';
import { playJapaneseSpeech } from '../utils/audioPlayer';
import KanaStrokePractice from './KanaStrokePractice';

export default function KanaChart() {
  const [viewMode, setViewMode] = useState('chart'); // 'chart' | 'practice'
  const [activeTab, setActiveTab] = useState('hiragana');
  const [selectedKanaForPractice, setSelectedKanaForPractice] = useState('あ');

  const speak = (text) => {
    playJapaneseSpeech(text, { rate: 0.85 });
  };

  const handleOpenPractice = (kanaChar, e) => {
    if (e) e.stopPropagation();
    setSelectedKanaForPractice(kanaChar);
    setViewMode('practice');
  };

  const currentChart = activeTab === 'hiragana' ? hiragana : katakana;

  if (viewMode === 'practice') {
    return (
      <div className="kana-view">
        <KanaStrokePractice
          initialKana={selectedKanaForPractice}
          initialType={activeTab}
          onBackToChart={() => setViewMode('chart')}
        />
      </div>
    );
  }

  return (
    <div className="kana-view">
      {/* HEADER SECTION */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            Tabel Huruf <span className="text-gradient">Kana</span> 📖
          </h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Dasar belajar bahasa Jepang. Klik kartu untuk dengar audio, atau klik ikon kuas (✍️) untuk latihan urutan coretan.
          </p>
        </div>

        {/* View Mode Toggle: Tabel vs Latihan Coretan */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '10px' }}>
          <button
            onClick={() => setViewMode('chart')}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              background: viewMode === 'chart' ? 'var(--accent-primary)' : 'transparent',
              color: viewMode === 'chart' ? '#fff' : 'inherit'
            }}
          >
            📋 Tabel Huruf
          </button>
          <button
            onClick={() => {
              setSelectedKanaForPractice(activeTab === 'hiragana' ? 'あ' : 'ア');
              setViewMode('practice');
            }}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              background: viewMode === 'practice' ? 'var(--accent-primary)' : 'transparent',
              color: viewMode === 'practice' ? '#fff' : 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ✍️ Latihan Coretan & Menulis
          </button>
        </div>
      </div>

      {/* HIRAGANA / KATAKANA SELECTOR */}
      <div className="kana-tabs" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className={`kana-tab-btn ${activeTab === 'hiragana' ? 'active' : ''}`}
            onClick={() => setActiveTab('hiragana')}
          >
            Hiragana (ひらがな)
          </button>
          <button
            className={`kana-tab-btn ${activeTab === 'katakana' ? 'active' : ''}`}
            onClick={() => setActiveTab('katakana')}
          >
            Katakana (カタカナ)
          </button>
        </div>

        <button
          onClick={() => {
            setSelectedKanaForPractice(activeTab === 'hiragana' ? 'あ' : 'ア');
            setViewMode('practice');
          }}
          className="btn-secondary"
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          ✍️ Buka Studio Coretan
        </button>
      </div>

      {/* KANA GRID */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div className="kana-grid">
          {currentChart.map((charObj, idx) => {
            if (!charObj.kana) {
              return <div key={idx} className="kana-card kana-empty"></div>;
            }
            return (
              <div
                key={idx}
                className="glass-panel kana-card"
                onClick={() => speak(charObj.kana)}
                title={`Klik untuk dengar suara: ${charObj.romaji}`}
                style={{ position: 'relative', cursor: 'pointer' }}
              >
                {/* Practice Brush Button */}
                <button
                  onClick={(e) => handleOpenPractice(charObj.kana, e)}
                  title={`Latih coretan & tulis ${charObj.kana}`}
                  style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                    padding: '2px 4px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    color: 'inherit',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                >
                  ✍️
                </button>

                <span className="kana-char text-gradient">{charObj.kana}</span>
                <span className="kana-romaji">{charObj.romaji}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* PEDAGOGICAL INFO CARDS */}
      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>💡</span> Hiragana (平仮名)
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
            Digunakan untuk menulis kata-kata asli bahasa Jepang, partikel tata bahasa, serta furigana (cara baca kanji). Terdiri dari karakter-karakter yang cenderung melengkung dan mengalir.
          </p>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>💡</span> Katakana (片仮名)
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
            Digunakan untuk menulis kata-kata serapan asing (gairaigo), nama negara asing, nama orang non-Jepang, serta onomatope. Karakternya cenderung kaku, tegas, dan lurus.
          </p>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.5rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>✍️</span> Aturan Coretan (*Kakushun*)
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
            Menulis kana dengan urutan yang benar memastikan bentuk huruf seimbang (*balance*), mudah dibaca orang Jepang, dan mempermudah membedakan pasangan mirip seperti <strong>シ vs ツ</strong> serta <strong>ソ vs ン</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
