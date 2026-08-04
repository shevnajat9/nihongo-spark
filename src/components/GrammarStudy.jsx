import React, { useState } from 'react';
import { grammarData } from '../data/grammar';

export default function GrammarStudy({ currentLevel }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter grammar by current level and search query
  const filteredGrammar = grammarData.filter(item => {
    if (item.level !== currentLevel) return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.pattern.toLowerCase().includes(q) ||
        item.structure.toLowerCase().includes(q) ||
        item.explanation.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="grammar-view">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          Tata Bahasa <span className="text-gradient">Grammar</span> ({currentLevel}) 📝
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Pelajari struktur kalimat bahasa Jepang tingkat {currentLevel}. Dilengkapi penjelasan rumus dan kalimat contoh interaktif.
        </p>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Cari pola kalimat, rumus, atau penjelasan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredGrammar.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>Tidak ada pola tata bahasa yang ditemukan.</p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>Silakan gunakan kata kunci pencarian yang lain.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1.5rem' }}>
          {filteredGrammar.map((item, idx) => (
            <div key={idx} className="glass-panel grammar-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', padding: '4px 10px', borderRadius: '30px', background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                  JLPT {item.level}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pola #{idx + 1}</span>
              </div>

              <div className="grammar-pattern">{item.pattern}</div>
              
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>Rumus / Struktur</div>
                <div className="grammar-structure">{item.structure}</div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>Penjelasan</div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: '1.6' }}>{item.explanation}</p>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.8rem' }}>Kalimat Contoh (例文)</div>
                <div className="grammar-ex-sentences">
                  {item.examples.map((ex, exIdx) => (
                    <div key={exIdx} className="ex-sentence-item">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="ex-jp">{ex.sentence}</div>
                        <button
                          className="audio-btn"
                          onClick={() => speak(ex.sentence)}
                          title="Dengarkan pelafalan"
                        >
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                          </svg>
                        </button>
                      </div>
                      <div className="ex-reading">{ex.reading}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{ex.romaji}</div>
                      <div className="ex-meaning">{ex.meaning}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
