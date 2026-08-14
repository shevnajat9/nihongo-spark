import React, { useState, useEffect } from 'react';
import { useLevelData } from '../data/loader';
import { markChecklistDone, getTodayChecklist } from '../utils/checklist';

const PROGRESS_KEY = 'nihongo_spark_grammar_progress';

export default function GrammarStudy({ currentLevel, studyStats, setStudyStats }) {
  const { data, loading } = useLevelData(currentLevel);
  const grammarData = data ? data.grammar : []; // array level aktif (lazy-load)
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'unstudied' | 'studied' | 'bookmarked'
  const [progress, setProgress] = useState({});
  const [expandedCards, setExpandedCards] = useState({});

  const grammarDoneToday = studyStats ? getTodayChecklist(studyStats).grammar : false;

  // Load progress on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_KEY);
      if (saved) {
        setProgress(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load grammar progress:', e);
    }
  }, []);

  const getGrammarId = (item) => `${item.level}__${item.pattern}`;

  const saveProgressData = (updatedProgress) => {
    setProgress(updatedProgress);
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(updatedProgress));
  };

  // Mark grammar as read to update today's checklist
  const handleMarkChecklist = () => {
    if (!setStudyStats || !studyStats) return;
    const updatedStats = markChecklistDone(studyStats, 'grammar');
    setStudyStats(updatedStats);
    localStorage.setItem('nihongo_spark_stats', JSON.stringify(updatedStats));
  };

  const toggleStudied = (item, e) => {
    if (e) e.stopPropagation();
    const id = getGrammarId(item);
    const current = progress[id] || { studied: false, bookmarked: false };
    const updatedStatus = !current.studied;
    
    const updated = {
      ...progress,
      [id]: { ...current, studied: updatedStatus }
    };
    saveProgressData(updated);

    // If marked as studied, tick off the daily checklist
    if (updatedStatus && !grammarDoneToday) {
      handleMarkChecklist();
    }
  };

  const toggleBookmark = (item, e) => {
    if (e) e.stopPropagation();
    const id = getGrammarId(item);
    const current = progress[id] || { studied: false, bookmarked: false };
    
    const updated = {
      ...progress,
      [id]: { ...current, bookmarked: !current.bookmarked }
    };
    saveProgressData(updated);
  };

  const toggleCard = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter grammar by level and search query first
  const levelGrammar = grammarData.filter(item => item.level === currentLevel);

  const filteredGrammar = levelGrammar.filter(item => {
    const id = getGrammarId(item);
    const itemProg = progress[id] || { studied: false, bookmarked: false };

    // Apply Filter Tab
    if (filterMode === 'studied' && !itemProg.studied) return false;
    if (filterMode === 'unstudied' && itemProg.studied) return false;
    if (filterMode === 'bookmarked' && !itemProg.bookmarked) return false;

    // Apply Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.pattern.toLowerCase().includes(q) ||
        item.structure.toLowerCase().includes(q) ||
        item.explanation.toLowerCase().includes(q) ||
        item.examples.some(ex => ex.sentence.includes(q) || ex.meaning.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Calculate counts for badges
  const countAll = levelGrammar.length;
  const countStudied = levelGrammar.filter(item => progress[getGrammarId(item)]?.studied).length;
  const countUnstudied = countAll - countStudied;
  const countBookmarked = levelGrammar.filter(item => progress[getGrammarId(item)]?.bookmarked).length;

  const speak = (text, e) => {
    if (e) e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (loading) {
    return (
      <div className="grammar-view">
        <div className="glass-panel" style={{ textAlign: 'center', padding: '2.5rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>⏳ Memuat tata bahasa level {currentLevel}…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grammar-view">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          Tata Bahasa <span className="text-gradient">Grammar</span> ({currentLevel}) 📝
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Pelajari struktur kalimat bahasa Jepang tingkat {currentLevel}. Klik pola kalimat untuk melihat detail, penjelasan rumus, dan contoh interaktif.
        </p>
        {studyStats && (
          <p style={{ fontSize: '0.85rem', color: grammarDoneToday ? 'var(--accent-emerald)' : 'var(--accent-cyan)', marginTop: '0.5rem' }}>
            {grammarDoneToday ? '✓ Target belajar grammar hari ini sudah selesai' : 'Pelajari pola tata bahasa baru dan tandai sebagai "Sudah Dipelajari" untuk menyelesaikan target harian.'}
          </p>
        )}
      </div>

      {/* Tabs Filter */}
      <div className="grammar-tabs">
        <button 
          className={`grammar-tab-btn ${filterMode === 'all' ? 'active' : ''}`}
          onClick={() => setFilterMode('all')}
        >
          Semua Pola <span className="grammar-tab-count">{countAll}</span>
        </button>
        <button 
          className={`grammar-tab-btn ${filterMode === 'unstudied' ? 'active' : ''}`}
          onClick={() => setFilterMode('unstudied')}
        >
          Belum Dipelajari <span className="grammar-tab-count">{countUnstudied}</span>
        </button>
        <button 
          className={`grammar-tab-btn ${filterMode === 'studied' ? 'active' : ''}`}
          onClick={() => setFilterMode('studied')}
        >
          Sudah Dipelajari <span className="grammar-tab-count">{countStudied}</span>
        </button>
        <button 
          className={`grammar-tab-btn ${filterMode === 'bookmarked' ? 'active' : ''}`}
          onClick={() => setFilterMode('bookmarked')}
        >
          ★ Simpanan <span className="grammar-tab-count">{countBookmarked}</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Cari pola kalimat, rumus, penjelasan, atau kalimat contoh..."
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

      {filteredGrammar.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>Tidak ada pola tata bahasa yang ditemukan.</p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
            {filterMode !== 'all' ? 'Coba ganti tab filter atau gunakan kata kunci lain.' : 'Silakan gunakan kata kunci pencarian yang lain.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
          {filteredGrammar.map((item, idx) => {
            const id = getGrammarId(item);
            const isExpanded = !!expandedCards[id];
            const itemProg = progress[id] || { studied: false, bookmarked: false };

            return (
              <div 
                key={idx} 
                className="glass-panel grammar-accordion-card"
                onClick={() => toggleCard(id)}
              >
                {/* ACCORDION HEADER */}
                <div className="grammar-accordion-header">
                  <div className="grammar-header-left">
                    <svg 
                      className={`grammar-chevron ${isExpanded ? 'expanded' : ''}`} 
                      width="18" 
                      height="18" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      viewBox="0 0 24 24"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      padding: '2px 8px', 
                      borderRadius: '30px', 
                      background: 'rgba(139, 92, 246, 0.15)', 
                      color: 'var(--accent-primary)', 
                      fontWeight: 'bold' 
                    }}>
                      JLPT {item.level}
                    </span>
                    <span className="grammar-pattern-title">{item.pattern}</span>
                  </div>

                  <div className="grammar-header-right">
                    {itemProg.studied && (
                      <span style={{ 
                        fontSize: '0.75rem', 
                        padding: '2px 8px', 
                        borderRadius: '30px', 
                        background: 'rgba(16, 185, 129, 0.15)', 
                        color: 'var(--accent-emerald)', 
                        fontWeight: '600'
                      }}>
                        ✓ Dipelajari
                      </span>
                    )}
                    <button
                      className={`grammar-bookmark-star ${itemProg.bookmarked ? 'active' : ''}`}
                      onClick={(e) => toggleBookmark(item, e)}
                      title={itemProg.bookmarked ? 'Hapus bookmark' : 'Simpan pola kalimat'}
                      aria-label="Simpan pola kalimat"
                    >
                      <svg width="20" height="20" fill={itemProg.bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* ACCORDION BODY */}
                {isExpanded && (
                  <div className="grammar-accordion-body" onClick={(e) => e.stopPropagation()}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>Rumus / Struktur</div>
                      <div className="grammar-structure">{item.structure}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>Penjelasan</div>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: '1.6' }}>{item.explanation}</p>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.8rem' }}>Kalimat Contoh (例文)</div>
                      <div className="grammar-ex-sentences">
                        {item.examples.map((ex, exIdx) => (
                          <div key={exIdx} className="ex-sentence-item">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div className="ex-jp">{ex.sentence}</div>
                              <button
                                className="audio-btn"
                                onClick={(e) => speak(ex.sentence, e)}
                                title="Dengarkan pelafalan"
                                aria-label="Dengarkan pelafalan kalimat contoh"
                              >
                                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                                </svg>
                              </button>
                            </div>
                            <div className="ex-reading">{ex.reading}</div>
                            {ex.romaji && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{ex.romaji}</div>}
                            <div className="ex-meaning">{ex.meaning}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        className={`grammar-btn-studied ${itemProg.studied ? 'active' : ''}`}
                        onClick={(e) => toggleStudied(item, e)}
                      >
                        {itemProg.studied ? '✓ Sudah Dipelajari' : 'Tandai Sudah Dipelajari'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
