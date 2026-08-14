import React, { useState, useEffect } from 'react';
import { useLevelData } from '../data/loader';
import { loadProgress, saveProgress, reviewItem, isDue, getMasteryStatus, MASTERY_LABELS } from '../utils/srs';
import { markChecklistDone } from '../utils/checklist';

const PROGRESS_KEY = 'nihongo_spark_vocab_progress';
const DAILY_GOAL = 5;
const getVocabId = (item) => `${item.level}__${item.word}`;

export default function VocabStudy({ currentLevel, studyStats, setStudyStats }) {
  const { data, loading } = useLevelData(currentLevel);
  const vocabData = data ? data.vocab : []; // array level aktif (lazy-load)
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'bookmarked', or 'due'
  const [bookmarks, setBookmarks] = useState([]);
  const [flippedCards, setFlippedCards] = useState({}); // tracking flipped status of cards by index
  const [progress, setProgress] = useState({});
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [reviewFeedback, setReviewFeedback] = useState({}); // { [index]: 'yes' | 'no' | null }

  // Slideshow (Flashcard) Mode states
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'slideshow'
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isSlideFlipped, setIsSlideFlipped] = useState(false);

  useEffect(() => {
    // Load bookmarked words from localStorage
    const saved = localStorage.getItem('nihongo_spark_vocab_bookmarks');
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
    setProgress(loadProgress(PROGRESS_KEY));
    
    // Load auto-speak setting
    const savedAutoSpeak = localStorage.getItem('nihongo_spark_auto_speak');
    if (savedAutoSpeak) {
      setAutoSpeak(savedAutoSpeak === 'true');
    }
  }, []);

  const handleReview = (item, remembered, e, cardIndex) => {
    if (e) e.stopPropagation();
    const id = getVocabId(item);
    const updated = reviewItem(progress, id, remembered);
    setProgress(updated);
    saveProgress(PROGRESS_KEY, updated);

    // Lacak jumlah kosakata yang direview hari ini untuk menyelesaikan
    // checklist "Pelajari 5 Kosakata" secara otomatis berdasarkan aktivitas nyata.
    if (setStudyStats && studyStats) {
      const today = new Date().toDateString();
      const sameDay = studyStats.vocabReviewDate === today;
      const newCount = (sameDay ? (studyStats.vocabReviewCount || 0) : 0) + 1;
      let updatedStats = { ...studyStats, vocabReviewDate: today, vocabReviewCount: newCount };

      if (newCount >= DAILY_GOAL) {
        updatedStats = markChecklistDone(updatedStats, 'vocab');
      }

      setStudyStats(updatedStats);
      localStorage.setItem('nihongo_spark_stats', JSON.stringify(updatedStats));
    }

    // Feedback visual: balik kartu kembali ke depan + flash animasi
    if (cardIndex !== undefined) {
      setReviewFeedback(prev => ({ ...prev, [cardIndex]: remembered ? 'yes' : 'no' }));
      setFlippedCards(prev => ({ ...prev, [cardIndex]: false }));
      setTimeout(() => {
        setReviewFeedback(prev => ({ ...prev, [cardIndex]: null }));
      }, 700);
    }
  };

  const handleSlideshowReview = (item, remembered) => {
    // Jalankan review dasar
    handleReview(item, remembered);

    // Otomatis geser ke slide berikutnya setelah jeda singkat
    setTimeout(() => {
      setIsSlideFlipped(false);
      if (currentSlideIdx < filteredVocab.length - 1) {
        setCurrentSlideIdx(prev => prev + 1);
        if (autoSpeak) {
          const nextItem = filteredVocab[currentSlideIdx + 1];
          if (nextItem) {
            speak(nextItem.word);
          }
        }
      } else {
        alert('🎉 Luar biasa! Anda telah menyelesaikan semua kartu kosakata di sesi ini!');
        setViewMode('grid');
        setCurrentSlideIdx(0);
      }
    }, 300);
  };

  const dueCount = vocabData.filter(v => isDue(progress, getVocabId(v))).length;

  const toggleBookmark = (wordObj, e) => {
    if (e) e.stopPropagation(); // prevent card flip when clicking bookmark
    let updated;
    const isBookmarked = bookmarks.some(b => b.word === wordObj.word);
    
    if (isBookmarked) {
      updated = bookmarks.filter(b => b.word !== wordObj.word);
    } else {
      updated = [...bookmarks, wordObj];
    }
    
    setBookmarks(updated);
    localStorage.setItem('nihongo_spark_vocab_bookmarks', JSON.stringify(updated));
  };

  const speak = (text, e) => {
    if (e) e.stopPropagation(); // prevent card flip
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCardFlip = (index) => {
    setFlippedCards(prev => {
      const nextState = !prev[index];
      if (autoSpeak) {
        const item = filteredVocab[index];
        if (item) {
          // Speak the example if flipping to the back, otherwise speak the word
          speak(nextState ? (item.example || item.word) : item.word);
        }
      }
      return {
        ...prev,
        [index]: nextState
      };
    });
  };

  // Filter vocabulary by current JLPT level, search query, bookmark, or review status
  const filteredVocab = vocabData.filter(item => {
    if (filterMode === 'all' && item.level !== currentLevel) return false;
    
    if (filterMode === 'bookmarked') {
      const isBookmarked = bookmarks.some(b => b.word === item.word);
      if (!isBookmarked) return false;
    }

    if (filterMode === 'due' && !isDue(progress, getVocabId(item))) return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.word.toLowerCase().includes(q) ||
        item.reading.toLowerCase().includes(q) ||
        item.romaji.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q)
      );
    }

    return true;
  });

  // Keyboard controls for Anki-style slideshow mode
  useEffect(() => {
    if (viewMode !== 'slideshow') return;

    const handleKeyDown = (e) => {
      const activeItem = filteredVocab[currentSlideIdx];
      if (!activeItem) return;

      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        setIsSlideFlipped(prev => {
          const nextState = !prev;
          if (autoSpeak) {
            speak(nextState ? (activeItem.example || activeItem.word) : activeItem.word);
          }
          return nextState;
        });
      } else if (e.code === 'ArrowLeft' || e.code === 'Digit1') {
        e.preventDefault();
        if (isSlideFlipped) {
          handleSlideshowReview(activeItem, false);
        }
      } else if (e.code === 'ArrowRight' || e.code === 'Digit2') {
        e.preventDefault();
        if (isSlideFlipped) {
          handleSlideshowReview(activeItem, true);
        }
      } else if (e.code === 'Escape') {
        e.preventDefault();
        setViewMode('grid');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, currentSlideIdx, isSlideFlipped, autoSpeak, filteredVocab, handleSlideshowReview]);

  const handleStartSlideshow = () => {
    if (filteredVocab.length === 0) return;
    setCurrentSlideIdx(0);
    setIsSlideFlipped(false);
    setViewMode('slideshow');
    // Auto speak first word if setting is on
    if (autoSpeak && filteredVocab[0]) {
      speak(filteredVocab[0].word);
    }
  };

  if (loading) {
    return (
      <div className="vocab-view">
        <div className="glass-panel" style={{ textAlign: 'center', padding: '2.5rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>⏳ Memuat kosakata level {currentLevel}…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vocab-view">
      {/* ── HEADER & NAVIGATION ── */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            Kosakata <span className="text-gradient">Mojigoi</span> ({currentLevel}) 🗂️
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Belajar kosakata menggunakan kartu flashcard interaktif. Klik kartu untuk melihat terjemahan dan kalimat contoh.
          </p>
          {studyStats && (
            <p style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginTop: '0.5rem' }}>
              {studyStats.vocabReviewDate === new Date().toDateString()
                ? `Progres hari ini: ${Math.min(studyStats.vocabReviewCount || 0, DAILY_GOAL)}/${DAILY_GOAL} kosakata direview`
                : `Progres hari ini: 0/${DAILY_GOAL} kosakata direview`}
            </p>
          )}
        </div>

        {viewMode === 'grid' && (
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              fontSize: '0.8rem', 
              color: 'var(--text-secondary)', 
              cursor: 'pointer', 
              background: 'rgba(255,255,255,0.03)', 
              padding: '0.4rem 0.8rem', 
              borderRadius: '30px', 
              border: '1px solid var(--glass-border)',
              userSelect: 'none'
            }}>
              <input 
                type="checkbox" 
                checked={autoSpeak} 
                onChange={(e) => {
                  setAutoSpeak(e.target.checked);
                  localStorage.setItem('nihongo_spark_auto_speak', e.target.checked ? 'true' : 'false');
                }}
                style={{ cursor: 'pointer' }}
              />
              🔊 Putar Otomatis
            </label>
            <button
              className={`kana-tab-btn ${filterMode === 'all' ? 'active' : ''}`}
              onClick={() => { setFilterMode('all'); setSearchQuery(''); }}
            >
              Semua Kata
            </button>
            <button
              className={`kana-tab-btn ${filterMode === 'due' ? 'active' : ''}`}
              onClick={() => { setFilterMode('due'); setSearchQuery(''); }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              🔁 Perlu Diulang {dueCount > 0 && <span className="due-count-pill">{dueCount}</span>}
            </button>
            <button
              className={`kana-tab-btn ${filterMode === 'bookmarked' ? 'active' : ''}`}
              onClick={() => { setFilterMode('bookmarked'); setSearchQuery(''); }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              ★ Ditandai ({bookmarks.length})
            </button>
          </div>
        )}
      </div>

      {/* ── SLIDESHOW VIEW (MODE FLASHCARD) ── */}
      {viewMode === 'slideshow' && filteredVocab.length > 0 && (
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '600px', margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>
              KARTU {currentSlideIdx + 1} DARI {filteredVocab.length}
            </span>
            <button 
              className="quiz-exit-btn" 
              onClick={() => setViewMode('grid')}
              style={{ padding: '0.2rem 0.8rem', background: 'rgba(255,255,255,0.03)' }}
            >
              Keluar Mode Slideshow (Esc)
            </button>
          </div>

          {/* Progress Bar */}
          <div className="quiz-progress-bar" style={{ height: '6px' }}>
            <div 
              className="quiz-progress-fill" 
              style={{ width: `${((currentSlideIdx + 1) / filteredVocab.length) * 100}%` }}
            />
          </div>

          {/* Slideshow Card */}
          <div 
            className="vocab-card-container" 
            onClick={() => setIsSlideFlipped(prev => !prev)}
            style={{ width: '100%', height: '320px', cursor: 'pointer' }}
          >
            <div className={`vocab-card ${isSlideFlipped ? 'flipped' : ''}`}>
              
              {/* FRONT */}
              <div className="card-front glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    padding: '3px 8px', 
                    borderRadius: '30px', 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    color: 'var(--text-secondary)'
                  }}>
                    {filteredVocab[currentSlideIdx].partOfSpeech}
                  </span>
                  <span className={`mastery-badge ${getMasteryStatus(progress, getVocabId(filteredVocab[currentSlideIdx]))}`}>
                    {MASTERY_LABELS[getMasteryStatus(progress, getVocabId(filteredVocab[currentSlideIdx]))]}
                  </span>
                </div>

                <div className="jp-word text-gradient" style={{ fontSize: '3.5rem', margin: '1.5rem 0 0.5rem 0' }}>
                  {filteredVocab[currentSlideIdx].word}
                </div>
                <div className="word-reading" style={{ fontSize: '1.3rem' }}>
                  {filteredVocab[currentSlideIdx].reading} ({filteredVocab[currentSlideIdx].romaji})
                </div>

                <div className="card-actions" style={{ marginTop: 'auto' }}>
                  <button
                    className="audio-btn"
                    onClick={(e) => speak(filteredVocab[currentSlideIdx].word, e)}
                    title="Dengarkan pengucapan"
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  </button>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Klik atau tekan Spasi untuk membalik</span>
                </div>
              </div>

              {/* BACK */}
              <div className="card-back glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, justifyContent: 'center', width: '100%' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Arti</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '700', color: 'white', marginBottom: '0.75rem' }}>
                    {filteredVocab[currentSlideIdx].meaning}
                  </div>
                  
                  {filteredVocab[currentSlideIdx].example && (
                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '0.75rem', textAlign: 'left' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>Contoh Kalimat</div>
                      <div style={{ fontFamily: 'var(--font-jp)', fontSize: '1.05rem', fontWeight: '500', color: 'var(--accent-cyan)' }}>
                        {filteredVocab[currentSlideIdx].example}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                        {filteredVocab[currentSlideIdx].exampleReading}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        {filteredVocab[currentSlideIdx].exampleMeaning}
                      </div>
                    </div>
                  )}
                </div>

                <div className="card-actions" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '0.5rem', width: '100%', marginTop: '0.5rem' }}>
                  <button
                    className="audio-btn"
                    onClick={(e) => speak(filteredVocab[currentSlideIdx].example || filteredVocab[currentSlideIdx].word, e)}
                    title="Dengarkan contoh"
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

          {/* Action buttons or keyboard help */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem', width: '100%' }}>
            {isSlideFlipped ? (
              <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                <button 
                  className="review-btn review-btn-no" 
                  onClick={() => handleSlideshowReview(filteredVocab[currentSlideIdx], false)}
                  style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', fontSize: '0.95rem' }}
                >
                  Belum Hafal (1)
                </button>
                <button 
                  className="review-btn review-btn-yes" 
                  onClick={() => handleSlideshowReview(filteredVocab[currentSlideIdx], true)}
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

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem' }}>
              <span>Pintasan Keyboard:</span>
              <span>[Spasi] Balik · [1] Belum Hafal · [2] Sudah Hafal · [Esc] Keluar</span>
            </div>
          </div>

        </div>
      )}

      {/* ── GRID VIEW ── */}
      {viewMode === 'grid' && (
        <>
          {/* Search & Actions Bar */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div className="search-bar" style={{ flex: 1, margin: 0 }}>
              <input
                type="text"
                className="search-input"
                placeholder="Cari berdasarkan Kanji, Hiragana, Romaji, atau Terjemahan..."
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

            {filteredVocab.length > 0 && (
              <button 
                className="start-quiz-btn" 
                onClick={handleStartSlideshow}
                style={{ margin: 0, padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                🎂 Mulai Flashcard ({filteredVocab.length} kata)
              </button>
            )}
          </div>

          {filteredVocab.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>Tidak ada kosakata yang ditemukan.</p>
              <p style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
                {filterMode === 'bookmarked' 
                  ? 'Anda belum menandai kata apa pun di level ini.' 
                  : filterMode === 'due'
                  ? 'Tidak ada kata yang perlu diulang saat ini. Kerja bagus!'
                  : 'Cobalah gunakan kata kunci pencarian yang berbeda.'}
              </p>
            </div>
          ) : (
            <div className="study-grid">
              {filteredVocab.map((item, index) => {
                const isFlipped = !!flippedCards[index];
                const isBookmarked = bookmarks.some(b => b.word === item.word);
                const vocabId = getVocabId(item);
                const mastery = getMasteryStatus(progress, vocabId);

                return (
                  <div
                    key={index}
                    className={`vocab-card-container${reviewFeedback[index] === 'yes' ? ' review-flash-yes' : reviewFeedback[index] === 'no' ? ' review-flash-no' : ''}`}
                    onClick={() => handleCardFlip(index)}
                  >
                    <div className={`vocab-card ${isFlipped ? 'flipped' : ''}`}>
                      
                      {/* CARD FRONT */}
                      <div className="card-front glass-panel">
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span style={{ 
                              fontSize: '0.75rem', 
                              padding: '3px 8px', 
                              borderRadius: '30px', 
                              background: 'rgba(255, 255, 255, 0.05)', 
                              color: 'var(--text-secondary)',
                              border: '1px solid var(--glass-border)'
                            }}>
                              {item.partOfSpeech}
                            </span>
                            <span className={`mastery-badge ${mastery}`}>{MASTERY_LABELS[mastery]}</span>
                          </div>
                          <button
                            className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
                            onClick={(e) => toggleBookmark(item, e)}
                            title={isBookmarked ? 'Hapus bookmark' : 'Simpan kata'}
                            aria-label={isBookmarked ? `Hapus bookmark untuk ${item.word}` : `Simpan kata ${item.word}`}
                            aria-pressed={isBookmarked}
                          >
                            <svg width="20" height="20" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          </button>
                        </div>

                        <div className="jp-word text-gradient">{item.word}</div>
                        <div className="word-reading">{item.reading} ({item.romaji})</div>

                        <div className="card-actions">
                          <button
                            className="audio-btn"
                            onClick={(e) => speak(item.word, e)}
                            title="Dengarkan pengucapan"
                            aria-label={`Dengarkan pengucapan ${item.word}`}
                          >
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                            </svg>
                          </button>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Klik untuk arti</span>
                        </div>
                      </div>

                      {/* CARD BACK */}
                      <div className="card-back glass-panel">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, justifyContent: 'center', width: '100%' }}>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Arti</div>
                          <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'white', marginBottom: '0.5rem' }}>{item.meaning}</div>
                          
                          {item.example && (
                            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '0.5rem', textAlign: 'left' }}>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>Contoh Kalimat</div>
                              <div style={{ fontFamily: 'var(--font-jp)', fontSize: '0.95rem', fontWeight: '500', color: 'var(--accent-cyan)' }}>
                                {item.example}
                              </div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                                {item.exampleReading}
                              </div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                                {item.exampleMeaning}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="card-actions" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '0.5rem', marginTop: '0.25rem', width: '100%' }}>
                          <button
                            className="audio-btn"
                            onClick={(e) => speak(item.example || item.word, e)}
                            title="Dengarkan kalimat"
                            aria-label="Dengarkan kalimat contoh"
                          >
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                            </svg>
                          </button>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Klik untuk balik</span>
                        </div>

                        <div className="review-buttons" style={{ marginTop: '0.6rem', width: '100%' }}>
                          <button
                            className="review-btn review-btn-no"
                            onClick={(e) => handleReview(item, false, e, index)}
                          >
                            Belum Hafal
                          </button>
                          <button
                            className="review-btn review-btn-yes"
                            onClick={(e) => handleReview(item, true, e, index)}
                          >
                            Sudah Hafal
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
