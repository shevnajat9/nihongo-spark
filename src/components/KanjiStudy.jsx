import React, { useState, useRef, useEffect } from 'react';
import { kanjiData } from '../data/kanji';
import { loadProgress, saveProgress, reviewItem, getMasteryStatus, MASTERY_LABELS } from '../utils/srs';

const PROGRESS_KEY = 'nihongo_spark_kanji_progress';
const getKanjiId = (item) => `${item.level}__${item.kanji}`;

export default function KanjiStudy({ currentLevel }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKanji, setSelectedKanji] = useState(null);
  const [progress, setProgress] = useState({});
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    setProgress(loadProgress(PROGRESS_KEY));
  }, []);

  const handleReview = (item, remembered) => {
    const id = getKanjiId(item);
    const updated = reviewItem(progress, id, remembered);
    setProgress(updated);
    saveProgress(PROGRESS_KEY, updated);
  };

  // Filter Kanji by level and search query
  const filteredKanji = kanjiData.filter(item => {
    if (item.level !== currentLevel) return false;
    
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.kanji.includes(q) ||
        item.meanings.some(m => m.toLowerCase().includes(q)) ||
        item.kunyomi.some(k => k.toLowerCase().includes(q)) ||
        item.onyomi.some(o => o.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Canvas drawing logic
  useEffect(() => {
    if (selectedKanji && canvasRef.current) {
      initCanvas();
    }
  }, [selectedKanji]);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid guidelines (faint dotted lines)
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    // Horizontal center line
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    
    // Vertical center line
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    
    ctx.setLineDash([]); // Reset line dash for drawing

    // Draw faint background Kanji for tracing
    ctx.font = 'bold 160px "Noto Sans JP", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(selectedKanji.kanji, canvas.width / 2, canvas.height / 2 + 10);
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    // Handle Touch vs Mouse
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const coords = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    isDrawingRef.current = true;
    ctx.strokeStyle = '#06b6d4'; // Cyan glowing brush
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();
    const coords = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const clearCanvas = () => {
    initCanvas();
  };

  return (
    <div className="kanji-view">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          Pembelajaran <span className="text-gradient">Kanji</span> ({currentLevel}) 🏮
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Kuasai Kanji per level. Klik kanji untuk membuka detail bacaan, senyawa kata (Jukugo), dan kanvas latihan menulis.
        </p>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Cari kanji berdasarkan arti, Onyomi, atau Kunyomi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="search-clear-btn"
            onClick={() => setSearchQuery('')}
            aria-label="Hapus pencarian"
            title="Hapus pencarian"
          >
            ×
          </button>
        )}
      </div>

      {filteredKanji.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>Tidak ada Kanji yang ditemukan.</p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>Silakan gunakan kata kunci pencarian yang lain.</p>
        </div>
      ) : (
        <div className="kanji-grid">
          {filteredKanji.map((item, idx) => {
            const mastery = getMasteryStatus(progress, getKanjiId(item));
            return (
              <div
                key={idx}
                className="glass-panel kanji-card"
                onClick={() => setSelectedKanji(item)}
                style={{ position: 'relative' }}
              >
                {mastery !== 'new' && (
                  <span
                    className={`mastery-badge ${mastery}`}
                    style={{ position: 'absolute', top: '8px', right: '8px', fontSize: '0.6rem', padding: '2px 6px' }}
                  >
                    {MASTERY_LABELS[mastery]}
                  </span>
                )}
                <span className="kanji-char text-gradient">{item.kanji}</span>
                <span className="kanji-meaning">{item.meanings[0]}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* KANJI DETAIL MODAL */}
      {selectedKanji && (
        <div className="modal-overlay" onClick={() => setSelectedKanji(null)}>
          <div className="glass-panel kanji-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedKanji(null)} aria-label="Tutup detail kanji">×</button>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.8rem', padding: '4px 10px', borderRadius: '30px', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>
                JLPT {selectedKanji.level}
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '700', marginTop: '0.5rem' }}>Detail Kanji</h2>
            </div>

            <div className="modal-layout">
              {/* Practice Writing Pad (Canvas) */}
              <div className="canvas-container">
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Gambarkan Kanji Pada Kotak</div>
                <canvas
                  ref={canvasRef}
                  width="260"
                  height="260"
                  className="drawing-canvas"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
                <div className="review-buttons" style={{ width: '100%' }}>
                  <button
                    className="review-btn review-btn-no"
                    onClick={() => handleReview(selectedKanji, false)}
                  >
                    Belum Hafal
                  </button>
                  <button
                    className="review-btn review-btn-yes"
                    onClick={() => handleReview(selectedKanji, true)}
                  >
                    Sudah Hafal
                  </button>
                </div>
                <div className="canvas-buttons">
                  <button className="canvas-btn canvas-btn-clear" onClick={clearCanvas}>
                    Hapus Coretan
                  </button>
                  <button 
                    className="canvas-btn" 
                    style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#c084fc', border: '1px solid rgba(139, 92, 246, 0.3)' }}
                    onClick={() => speak(selectedKanji.kanji)}
                    aria-label={`Dengarkan pelafalan kanji ${selectedKanji.kanji}`}
                  >
                    🔊 Pelafalan
                  </button>
                </div>
              </div>

              {/* Kanji Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-jp)', fontWeight: '700', color: 'white' }}>{selectedKanji.kanji}</h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)', fontWeight: '600' }}>
                    {selectedKanji.meanings.join(', ')}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Kun'yomi</div>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', fontFamily: 'var(--font-jp)', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                      {selectedKanji.kunyomi.length > 0 ? selectedKanji.kunyomi.join(', ') : '-'}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>On'yomi</div>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', fontFamily: 'var(--font-jp)', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                      {selectedKanji.onyomi.length > 0 ? selectedKanji.onyomi.join(', ') : '-'}
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Jumlah Goresan</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                    {selectedKanji.strokes} Goresan (Strokes)
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>Senyawa Kata (Jukugo)</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {selectedKanji.examples.map((ex, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 255, 255, 0.02)', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                        <span 
                          style={{ fontFamily: 'var(--font-jp)', fontSize: '1.05rem', fontWeight: '600', color: 'white', cursor: 'pointer' }}
                          onClick={() => speak(ex.word)}
                          title="Klik untuk suara"
                          role="button"
                          tabIndex={0}
                          aria-label={`Dengarkan pelafalan ${ex.word}`}
                        >
                          {ex.word} <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--text-secondary)' }}>({ex.reading})</span>
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>{ex.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
