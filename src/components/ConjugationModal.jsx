import React, { useState, useEffect } from 'react';
import { conjugateVerb } from '../utils/conjugator';
import { RubyText } from '../utils/furigana';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function ConjugationModal({ verbItem, onClose }) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const activeVerb = verbItem ? verbItem.word : '';
  const activeReading = verbItem ? verbItem.reading : '';
  const activeMeaning = verbItem ? verbItem.meaning : '';

  const conjugationData = conjugateVerb(activeVerb, activeReading, activeMeaning);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const speak = (text) => {
    playJapaneseSpeech(text, { rate: 0.85 });
  };

  if (!conjugationData) return null;

  const filteredForms = selectedFilter === 'all'
    ? conjugationData.forms
    : conjugationData.forms.filter(f => f.category.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <div className="conjugation-modal-overlay" onClick={onClose}>
      <div
        className="conjugation-modal-card glass-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Konjugasi kata kerja ${activeVerb}`}
      >
        {/* MODAL HEADER */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(15, 23, 42, 0.5)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '700', margin: 0 }}>
                <RubyText text={activeVerb} reading={activeReading} />
              </h2>
              <span style={{
                fontSize: '0.8rem',
                padding: '3px 10px',
                borderRadius: '20px',
                background: 'rgba(139, 92, 246, 0.2)',
                color: '#c4b5fd',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                fontWeight: '600'
              }}>
                {conjugationData.groupName}
              </span>
              <button
                type="button"
                className="audio-btn"
                onClick={() => speak(activeVerb)}
                title="Dengarkan kata dasar"
                style={{ width: '32px', height: '32px' }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              </button>
            </div>
            {activeMeaning && (
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Arti: <strong style={{ color: 'var(--text-primary)' }}>{activeMeaning}</strong>
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="search-clear-btn"
            style={{ fontSize: '1.5rem', width: '36px', height: '36px' }}
            aria-label="Tutup jendela konjugasi"
          >
            ×
          </button>
        </div>

        {/* FILTER & QUICK SEARCH TOOLBAR */}
        <div style={{
          padding: '0.75rem 1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(8, 11, 17, 0.4)'
        }}>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'Semua Bentuk (11)' },
              { id: 'N5', label: 'N5 Dasar' },
              { id: 'N4', label: 'N4 Menengah' },
              { id: 'N3', label: 'N3 Lanjutan' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                className={`filter-btn ${selectedFilter === tab.id ? 'active' : ''}`}
                onClick={() => setSelectedFilter(tab.id)}
                style={{ fontSize: '0.78rem', padding: '4px 10px', borderRadius: '12px' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Tekan <kbd className="kbd-badge" style={{ margin: '0 2px' }}>Esc</kbd> untuk menutup
          </div>
        </div>

        {/* CONJUGATION LIST */}
        <div className="conjugation-grid">
          {filteredForms.map((item) => (
            <div key={item.id} className="conjugation-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '600', color: 'var(--accent-cyan)', fontSize: '0.92rem' }}>
                  {item.name}
                </span>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-muted)'
                }}>
                  {item.category}
                </span>
              </div>

              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>
                {item.desc}
              </p>

              {/* Main Positive Form */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.25)',
                padding: '0.6rem 0.8rem',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                marginTop: '0.2rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Positif / Bentuk Utama
                    </div>
                    <div style={{ fontSize: '1.15rem', fontWeight: '600', color: 'white' }}>
                      <RubyText text={item.positive} reading={item.reading} />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="audio-btn"
                    onClick={() => speak(item.positive)}
                    title={`Dengarkan ${item.positive}`}
                    style={{ width: '28px', height: '28px' }}
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Negative or Past if available */}
              {(item.negative || item.past) && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: item.negative && item.past ? '1fr 1fr' : '1fr',
                  gap: '0.4rem',
                  fontSize: '0.8rem'
                }}>
                  {item.negative && (
                    <div style={{
                      background: 'rgba(244, 63, 94, 0.05)',
                      padding: '0.4rem 0.6rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(244, 63, 94, 0.15)'
                    }}>
                      <div style={{ fontSize: '0.68rem', color: '#fda4af' }}>Negatif:</div>
                      <div style={{ fontWeight: '500', color: '#fff', fontSize: '0.95rem' }}>
                        <RubyText text={item.negative} reading={item.negReading} />
                      </div>
                    </div>
                  )}

                  {item.past && (
                    <div style={{
                      background: 'rgba(16, 185, 129, 0.05)',
                      padding: '0.4rem 0.6rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(16, 185, 129, 0.15)'
                    }}>
                      <div style={{ fontSize: '0.68rem', color: '#6ee7b7' }}>Lampau:</div>
                      <div style={{ fontWeight: '500', color: '#fff', fontSize: '0.95rem' }}>
                        <RubyText text={item.past} reading={item.pastReading} />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* MODAL FOOTER */}
        <div style={{
          padding: '0.9rem 1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          background: 'rgba(15, 23, 42, 0.4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <span>Nihongo Spark Katsuyou Engine (五段・一段・カ変・サ変)</span>
          <button
            type="button"
            className="start-quiz-btn"
            onClick={onClose}
            style={{ margin: 0, padding: '0.4rem 1.25rem', fontSize: '0.85rem' }}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
