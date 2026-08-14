import React, { useState, useRef, useEffect, useCallback } from 'react';
import { kanjiData } from '../data/kanji';
import { loadProgress, saveProgress, reviewItem, isDue, getMasteryStatus, MASTERY_LABELS } from '../utils/srs';

const PROGRESS_KEY = 'nihongo_spark_kanji_progress';
const getKanjiId = (item) => `${item.level}__${item.kanji}`;

export default function KanjiStudy({ currentLevel }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKanji, setSelectedKanji] = useState(null);
  const [progress, setProgress] = useState({});
  const [reviewFeedback, setReviewFeedback] = useState(null); // 'yes' | 'no' | null
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  // Flashcard (slideshow) mode state
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'flashcard'
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'due'
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isSlideFlipped, setIsSlideFlipped] = useState(false);
  const [slideReviewFeedback, setSlideReviewFeedback] = useState(null); // 'yes' | 'no' | null

  useEffect(() => {
    setProgress(loadProgress(PROGRESS_KEY));
  }, []);

  const handleReview = (item, remembered) => {
    const id = getKanjiId(item);
    const updated = reviewItem(progress, id, remembered);
    setProgress(updated);
    saveProgress(PROGRESS_KEY, updated);
    // Flash feedback in modal
    setReviewFeedback(remembered ? 'yes' : 'no');
    setTimeout(() => setReviewFeedback(null), 700);
  };

  const handleSlideshowReview = useCallback((item, remembered) => {
    const id = getKanjiId(item);
    const updated = reviewItem(progress, id, remembered);
    setProgress(updated);
    saveProgress(PROGRESS_KEY, updated);

    // Flash feedback
    setSlideReviewFeedback(remembered ? 'yes' : 'no');
    setTimeout(() => {
      setSlideReviewFeedback(null);
      setIsSlideFlipped(false);
      setCurrentSlideIdx(prev => {
        if (prev < filteredKanji.length - 1) return prev + 1;
        // End of deck
        alert('🎉 Luar biasa! Anda telah menyelesaikan semua kartu kanji di sesi ini!');
        setViewMode('grid');
        return 0;
      });
    }, 400);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  // Filter Kanji by level, search query, and filter mode
  const filteredKanji = kanjiData.filter(item => {
    if (item.level !== currentLevel) return false;

    if (filterMode === 'due' && !isDue(progress, getKanjiId(item))) return false;

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

  const dueCount = kanjiData.filter(v => v.level === currentLevel && isDue(progress, getKanjiId(v))).length;

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
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = 'bold 160px "Noto Sans JP", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(selectedKanji.kanji, canvas.width / 2, canvas.height / 2 + 10);
  }, [selectedKanji]);

  useEffect(() => {
    if (selectedKanji && canvasRef.current) {
      initCanvas();
    }
  }, [selectedKanji, initCanvas]);

  // Keyboard controls for flashcard mode
  useEffect(() => {
    if (viewMode !== 'flashcard') return;
    const activeItem = filteredKanji[currentSlideIdx];

    const handleKeyDown = (e) => {
      if (!activeItem) return;
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        setIsSlideFlipped(prev => !prev);
      } else if ((e.code === 'ArrowLeft' || e.code === 'Digit1') && isSlideFlipped) {
        e.preventDefault();
        handleSlideshowReview(activeItem, false);
      } else if ((e.code === 'ArrowRight' || e.code === 'Digit2') && isSlideFlipped) {
        e.preventDefault();
        handleSlideshowReview(activeItem, true);
      } else if (e.code === 'Escape') {
        e.preventDefault();
        setViewMode('grid');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, currentSlideIdx, isSlideFlipped, filteredKanji, handleSlideshowReview]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const coords = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    isDrawingRef.current = true;
    ctx.strokeStyle = '#06b6d4';
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

  const stopDrawing = () => { isDrawingRef.current = false; };

  const currentItem = filteredKanji[currentSlideIdx];

  return (
    <div className="kanji-view">
      {/* ── HEADER ── */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            Pembelajaran <span className="text-gradient">Kanji</span> ({currentLevel}) 🏮
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Kuasai Kanji per level. Gunakan mode Flashcard atau klik kanji untuk detail dan latihan menulis.
          </p>
        </div>

        {viewMode === 'grid' && (
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              className={`kana-tab-btn ${filterMode === 'all' ? 'active' : ''}`}
              onClick={() => { setFilterMode('all'); setSearchQuery(''); }}
            >
              Semua Kanji
            </button>
            <button
              className={`kana-tab-btn ${filterMode === 'due' ? 'active' : ''}`}
              onClick={() => { setFilterMode('due'); setSearchQuery(''); }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              🔁 Perlu Diulang {dueCount > 0 && <span className="due-count-pill">{dueCount}</span>}
            </button>
          </div>
        )}
      </div>

      {/* ── FLASHCARD MODE ── */}
      {viewMode === 'flashcard' && filteredKanji.length > 0 && currentItem && (
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Top bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>
              KARTU {currentSlideIdx + 1} DARI {filteredKanji.length}
            </span>
            <button
              className="quiz-exit-btn"
              onClick={() => setViewMode('grid')}
              style={{ padding: '0.2rem 0.8rem', background: 'rgba(255,255,255,0.03)' }}
            >
              Keluar (Esc)
            </button>
          </div>

          {/* Progress bar */}
          <div className="quiz-progress-bar" style={{ height: '6px' }}>
            <div
              className="quiz-progress-fill"
              style={{ width: `${((currentSlideIdx + 1) / filteredKanji.length) * 100}%` }}
            />
          </div>

          {/* Card */}
          <div
            className={`vocab-card-container${slideReviewFeedback === 'yes' ? ' review-flash-yes' : slideReviewFeedback === 'no' ? ' review-flash-no' : ''}`}
            onClick={() => setIsSlideFlipped(prev => !prev)}
            style={{ width: '100%', height: '340px', cursor: 'pointer' }}
          >
            <div className={`vocab-card ${isSlideFlipped ? 'flipped' : ''}`}>

              {/* FRONT: show kanji character */}
              <div className="card-front glass-panel" style={{ padding: '2rem', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '30px', background: 'rgba(6,182,212,0.1)', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>
                    JLPT {currentItem.level}
                  </span>
                  <span className={`mastery-badge ${getMasteryStatus(progress, getKanjiId(currentItem))}`}>
                    {MASTERY_LABELS[getMasteryStatus(progress, getKanjiId(currentItem))]}
                  </span>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-jp)', fontSize: '5rem', fontWeight: '900', color: 'white', lineHeight: 1 }}>
                    {currentItem.kanji}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    {currentItem.strokes} goresan
                  </div>
                </div>

                <div className="card-actions">
                  <button
                    className="audio-btn"
                    onClick={(e) => { e.stopPropagation(); speak(currentItem.kanji); }}
                    title="Dengarkan pelafalan"
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  </button>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Klik atau tekan Spasi untuk membalik</span>
                </div>
              </div>

              {/* BACK: show readings, meanings, jukugo */}
              <div className="card-back glass-panel" style={{ padding: '1.5rem', overflowY: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, width: '100%' }}>
                  {/* Kanji + meanings */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontFamily: 'var(--font-jp)', fontSize: '3rem', fontWeight: '900', color: 'white', lineHeight: 1, flexShrink: 0 }}>
                      {currentItem.kanji}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Arti</div>
                      <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                        {currentItem.meanings.slice(0, 3).join(', ')}
                      </div>
                    </div>
                  </div>

                  {/* Readings */}
                  <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.6rem' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Kun&apos;yomi</div>
                      <div style={{ fontFamily: 'var(--font-jp)', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)', marginTop: '0.15rem' }}>
                        {currentItem.kunyomi.length > 0 ? currentItem.kunyomi.slice(0, 3).join('、') : '—'}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>On&apos;yomi</div>
                      <div style={{ fontFamily: 'var(--font-jp)', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)', marginTop: '0.15rem' }}>
                        {currentItem.onyomi.length > 0 ? currentItem.onyomi.slice(0, 3).join('、') : '—'}
                      </div>
                    </div>
                  </div>

                  {/* Jukugo */}
                  {currentItem.examples && currentItem.examples.length > 0 && (
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.6rem' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>Jukugo</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                        {currentItem.examples.slice(0, 2).map((ex, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', background: 'rgba(255,255,255,0.03)', padding: '0.3rem 0.6rem', borderRadius: '6px' }}>
                            <span
                              style={{ fontFamily: 'var(--font-jp)', fontWeight: '600', color: 'white', cursor: 'pointer' }}
                              onClick={(e) => { e.stopPropagation(); speak(ex.word); }}
                            >
                              {ex.word} <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>({ex.reading})</span>
                            </span>
                            <span style={{ color: 'var(--accent-cyan)', marginLeft: '0.5rem', flexShrink: 0 }}>{ex.meaning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="card-actions" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem', marginTop: '0.5rem', width: '100%' }}>
                  <button
                    className="audio-btn"
                    onClick={(e) => { e.stopPropagation(); speak(currentItem.kanji); }}
                    title="Dengarkan"
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  </button>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Klik kartu untuk membalik kembali</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
            {isSlideFlipped ? (
              <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                <button
                  className="review-btn review-btn-no"
                  onClick={() => handleSlideshowReview(currentItem, false)}
                  style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', fontSize: '0.95rem' }}
                >
                  Belum Hafal (1)
                </button>
                <button
                  className="review-btn review-btn-yes"
                  onClick={() => handleSlideshowReview(currentItem, true)}
                  style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', fontSize: '0.95rem' }}
                >
                  Sudah Hafal (2)
                </button>
              </div>
            ) : (
              <button
                className="start-quiz-btn"
                onClick={() => setIsSlideFlipped(true)}
                style={{ width: '100%', margin: 0 }}
              >
                Balik Kartu (Spasi)
              </button>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem' }}>
              <span>Pintasan Keyboard:</span>
              <span>[Spasi] Balik · [1] Belum Hafal · [2] Sudah Hafal · [Esc] Keluar</span>
            </div>
          </div>
        </div>
      )}

      {/* ── GRID VIEW ── */}
      {viewMode === 'grid' && (
        <>
          {/* Search & Flashcard button */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div className="search-bar" style={{ flex: 1, margin: 0 }}>
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
            {filteredKanji.length > 0 && (
              <button
                className="start-quiz-btn"
                onClick={() => { setCurrentSlideIdx(0); setIsSlideFlipped(false); setViewMode('flashcard'); }}
                style={{ margin: 0, padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                🃏 Mulai Flashcard ({filteredKanji.length} kanji)
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
              <p style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
                {filterMode === 'due'
                  ? 'Tidak ada kanji yang perlu diulang saat ini. Kerja bagus!'
                  : 'Silakan gunakan kata kunci pencarian yang lain.'}
              </p>
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
        </>
      )}

      {/* ── KANJI DETAIL MODAL ── */}
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
                <div
                  className="review-buttons"
                  style={{ width: '100%' }}
                >
                  <button
                    className={`review-btn review-btn-no${reviewFeedback === 'no' ? ' review-active-no' : ''}`}
                    onClick={() => handleReview(selectedKanji, false)}
                  >
                    Belum Hafal
                  </button>
                  <button
                    className={`review-btn review-btn-yes${reviewFeedback === 'yes' ? ' review-active-yes' : ''}`}
                    onClick={() => handleReview(selectedKanji, true)}
                  >
                    Sudah Hafal
                  </button>
                </div>
                <div className="canvas-buttons">
                  <button className="canvas-btn canvas-btn-clear" onClick={initCanvas}>
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
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Kun&apos;yomi</div>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', fontFamily: 'var(--font-jp)', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                      {selectedKanji.kunyomi.length > 0 ? selectedKanji.kunyomi.join(', ') : '-'}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>On&apos;yomi</div>
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
