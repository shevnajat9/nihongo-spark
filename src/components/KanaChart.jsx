import React, { useState } from 'react';
import { hiragana, katakana } from '../data/kana';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function KanaChart() {
  const [activeTab, setActiveTab] = useState('hiragana');

  const speak = (text) => {
    playJapaneseSpeech(text, { rate: 0.85 });
  };

  const currentChart = activeTab === 'hiragana' ? hiragana : katakana;

  return (
    <div className="kana-view">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          Tabel Huruf <span className="text-gradient">Kana</span> 📖
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Dasar belajar bahasa Jepang. Klik pada huruf untuk mendengarkan cara pengucapan (pelafalan) yang benar.
        </p>
      </div>

      <div className="kana-tabs">
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

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div className="kana-grid">
          {currentChart.map((charObj, idx) => {
            if (!charObj.kana) {
              // Empty space to preserve the layout grid of Japanese kana chart
              return <div key={idx} className="kana-card kana-empty"></div>;
            }
            return (
              <div
                key={idx}
                className="glass-panel kana-card"
                onClick={() => speak(charObj.kana)}
                title={`Pelafalan: ${charObj.romaji}`}
              >
                <span className="kana-char text-gradient">{charObj.kana}</span>
                <span className="kana-romaji">{charObj.romaji}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>💡 Hiragana (平仮名)</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Digunakan untuk menulis kata-kata asli bahasa Jepang, partikel tata bahasa, serta furigana (cara baca kanji). Terdiri dari karakter-karakter yang cenderung melengkung.
          </p>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--accent-cyan)' }}>💡 Katakana (片仮名)</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Digunakan untuk menulis kata-kata serapan asing (gairaigo), nama negara asing, nama orang non-Jepang, serta onomatope. Karakternya cenderung kaku dan lurus.
          </p>
        </div>
      </div>
    </div>
  );
}
