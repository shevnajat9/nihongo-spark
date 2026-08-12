import React, { useState, useEffect } from 'react';
import { vocabData } from '../data/vocab';
import { loadProgress, saveProgress, reviewItem, isDue, getMasteryStatus, MASTERY_LABELS } from '../utils/srs';
import { markChecklistDone } from '../utils/checklist';

const PROGRESS_KEY = 'nihongo_spark_vocab_progress';
const DAILY_GOAL = 5;
const getVocabId = (item) => `${item.level}__${item.word}`;

export default function VocabStudy({ currentLevel, studyStats, setStudyStats }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'bookmarked', or 'due'
  const [bookmarks, setBookmarks] = useState([]);
  const [flippedCards, setFlippedCards] = useState({}); // tracking flipped status of cards by index
  const [progress, setProgress] = useState({});

  useEffect(() => {
    // Load bookmarked words from localStorage
    const saved = localStorage.getItem('nihongo_spark_vocab_bookmarks');
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
    setProgress(loadProgress(PROGRESS_KEY));
  }, []);

  const handleReview = (item, remembered, e) => {
    e.stopPropagation();
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
  };

  const dueCount = vocabData.filter(v => isDue(progress, getVocabId(v))).length;

  const toggleBookmark = (wordObj, e) => {
    e.stopPropagation(); // prevent card flip when clicking bookmark
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
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Filter vocabulary by current JLPT level, search query, bookmark, or review status
  const filteredVocab = vocabData.filter(item => {
    // Level check
    if (filterMode === 'all' && item.level !== currentLevel) return false;
    
    // Bookmark check
    if (filterMode === 'bookmarked') {
      const isBookmarked = bookmarks.some(b => b.word === item.word);
      if (!isBookmarked) return false;
    }

    // Due-for-review check (spans all levels)
    if (filterMode === 'due' && !isDue(progress, getVocabId(item))) return false;

    // Search query check
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

  return (
    <div className="vocab-view">
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

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
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
      </div>

      {/* Search Bar */}
      <div className="search-bar">
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
                className="vocab-card-container"
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, justifyContent: 'center' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Arti</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'white', marginBottom: '0.5rem' }}>{item.meaning}</div>
                      
                      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '0.5rem' }}>
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
                    </div>

                    <div className="card-actions" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
                      <button
                        className="audio-btn"
                        onClick={(e) => speak(item.example, e)}
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

                    <div className="review-buttons" style={{ marginTop: '0.6rem' }}>
                      <button
                        className="review-btn review-btn-no"
                        onClick={(e) => handleReview(item, false, e)}
                      >
                        Belum Hafal
                      </button>
                      <button
                        className="review-btn review-btn-yes"
                        onClick={(e) => handleReview(item, true, e)}
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
    </div>
  );
}
