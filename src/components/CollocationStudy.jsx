import React, { useState, useMemo } from 'react';
import { collocationsData } from '../data/collocations';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function CollocationStudy() {
  const [activeTab, setActiveTab] = useState('explorer'); // 'explorer' | 'quiz' | 'saved'
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Bookmark State
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('nihongo_spark_colloc_saved');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizStreak, setQuizStreak] = useState(0);

  // Audio Playback
  const playAudio = (text) => {
    playJapaneseSpeech(text, { rate: 0.88 });
  };

  // Sound effect via Web Audio API
  const playSfx = (isCorrect) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (isCorrect) {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.setValueAtTime(130, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch {
      // AudioContext fallback
    }
  };

  const toggleSave = (id) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      localStorage.setItem('nihongo_spark_colloc_saved', JSON.stringify(next));
      return next;
    });
  };

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(collocationsData.map((c) => c.category));
    return ['ALL', ...Array.from(set)];
  }, []);

  // Filtered List
  const filteredList = useMemo(() => {
    return collocationsData.filter((item) => {
      const matchLevel = selectedLevel === 'ALL' || item.level === selectedLevel;
      const matchCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchSearch =
        searchQuery === '' ||
        item.collocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.reading.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.noun.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.verb.toLowerCase().includes(searchQuery.toLowerCase());
      return matchLevel && matchCategory && matchSearch;
    });
  }, [selectedLevel, selectedCategory, searchQuery]);

  const savedList = useMemo(() => {
    return collocationsData.filter((c) => savedIds.includes(c.id));
  }, [savedIds]);

  // Current Quiz item
  const quizItems = filteredList.filter((item) => item.quiz);
  const currentQuiz = quizItems[quizIndex] || quizItems[0];

  const handleQuizAnswer = (optIndex) => {
    if (selectedOption !== null || !currentQuiz) return;
    const isCorrect = optIndex === currentQuiz.quiz.correctIndex;
    setSelectedOption(optIndex);
    playSfx(isCorrect);

    if (isCorrect) {
      setQuizScore((s) => s + 10);
      setQuizStreak((st) => st + 1);
    } else {
      setQuizStreak(0);
    }
  };

  const handleNextQuiz = () => {
    if (quizIndex + 1 < quizItems.length) {
      setQuizIndex((i) => i + 1);
    } else {
      setQuizIndex(0);
    }
    setSelectedOption(null);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>
      
      {/* HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.12), rgba(14, 165, 233, 0.15))',
        border: '1px solid rgba(20, 184, 166, 0.3)',
        borderRadius: '16px',
        padding: '1.5rem 1.75rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <span style={{
              background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
              color: '#000',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '6px',
              letterSpacing: '0.5px'
            }}>
              FASE 5 · FITUR 25
            </span>
            <span style={{ fontSize: '0.85rem', color: '#5eead4', fontWeight: 600 }}>
              Anti-Terjemahan Harfiah
            </span>
          </div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.5px' }}>
            Kamus Kolokasi Alami <span style={{ color: '#2dd4bf' }}>(連語 Rengou Explorer)</span>
          </h1>
          <p style={{ margin: '0.4rem 0 0', color: '#94a3b8', fontSize: '0.9rem', maxWidth: '650px', lineHeight: 1.5 }}>
            Kuasai kombinasi wajib kata benda + partikel + kata kerja penutur asli Jepang. Jangan tertipu menerjemahkan harfiah kata-per-kata!
          </p>
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(15, 23, 42, 0.6)', padding: '4px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => setActiveTab('explorer')}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'explorer' ? 'linear-gradient(135deg, #14b8a6, #0d9488)' : 'transparent',
              color: activeTab === 'explorer' ? '#000' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            📖 Kamus Kolokasi ({collocationsData.length})
          </button>
          <button
            onClick={() => { setActiveTab('quiz'); setSelectedOption(null); }}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'quiz' ? 'linear-gradient(135deg, #0ea5e9, #0284c7)' : 'transparent',
              color: activeTab === 'quiz' ? '#fff' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            🎯 Kuis Pasangan
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'saved' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'transparent',
              color: activeTab === 'saved' ? '#000' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            ⭐ Ditandai ({savedIds.length})
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: KAMUS KOLOKASI EXPLORER */}
      {/* ============================================================== */}
      {activeTab === 'explorer' && (
        <>
          {/* Filters Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Level Buttons */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    style={{
                      padding: '0.35rem 0.8rem',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: selectedLevel === lvl ? '#2dd4bf' : 'rgba(255, 255, 255, 0.1)',
                      background: selectedLevel === lvl ? 'rgba(20, 184, 166, 0.25)' : 'rgba(15, 23, 42, 0.6)',
                      color: selectedLevel === lvl ? '#5eead4' : '#94a3b8',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div style={{ position: 'relative', minWidth: '260px' }}>
                <input
                  type="text"
                  placeholder="Cari kata benda / verba / arti..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    background: 'rgba(15, 23, 42, 0.8)',
                    color: '#f8fafc',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Kategori:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '2px 8px',
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: selectedCategory === cat ? '#0ea5e9' : 'rgba(255, 255, 255, 0.06)',
                    background: selectedCategory === cat ? 'rgba(14, 165, 233, 0.2)' : 'rgba(15, 23, 42, 0.4)',
                    color: selectedCategory === cat ? '#38bdf8' : '#94a3b8',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {filteredList.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#94a3b8', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '12px' }}>
                Tidak ditemukan pasangan kolokasi yang sesuai.
              </div>
            ) : (
              filteredList.map((item) => {
                const isSaved = savedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    style={{
                      background: 'rgba(15, 23, 42, 0.65)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)'
                    }}
                  >
                    <div>
                      {/* Top Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{
                            background: 'rgba(20, 184, 166, 0.2)',
                            color: '#2dd4bf',
                            fontWeight: 800,
                            fontSize: '0.72rem',
                            padding: '2px 6px',
                            borderRadius: '5px'
                          }}>
                            {item.level}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                            {item.category}
                          </span>
                        </div>

                        <button
                          onClick={() => toggleSave(item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: isSaved ? '#fbbf24' : '#64748b',
                            fontSize: '1.2rem',
                            cursor: 'pointer'
                          }}
                          title={isSaved ? 'Hapus bookmark' : 'Simpan ke bookmark'}
                        >
                          {isSaved ? '★' : '☆'}
                        </button>
                      </div>

                      {/* Main Collocation Headword */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <div>
                          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc' }}>
                            {item.collocation}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                            {item.reading}
                          </div>
                        </div>

                        <button
                          onClick={() => playAudio(item.collocation)}
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            border: '1px solid rgba(45, 212, 191, 0.3)',
                            background: 'rgba(20, 184, 166, 0.1)',
                            color: '#2dd4bf',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                          title="Dengarkan pelafalan"
                        >
                          🔊
                        </button>
                      </div>

                      {/* Natural Indonesian Meaning */}
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.75rem' }}>
                        🇮🇩 {item.meaning}
                      </div>

                      {/* Literal Trap Alert Box */}
                      <div style={{
                        background: 'rgba(239, 68, 68, 0.12)',
                        border: '1px solid rgba(239, 68, 68, 0.25)',
                        borderRadius: '8px',
                        padding: '0.6rem 0.8rem',
                        fontSize: '0.78rem',
                        color: '#fecaca',
                        lineHeight: 1.45,
                        marginBottom: '0.75rem'
                      }}>
                        ⚠️ <strong>Jebakan Terjemahan:</strong><br />
                        {item.literalTrap}
                      </div>

                      {/* Real Example Sentence */}
                      <div
                        onClick={() => playAudio(item.exampleSentence.jp)}
                        style={{
                          background: 'rgba(0, 0, 0, 0.25)',
                          borderRadius: '8px',
                          padding: '0.65rem 0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.25rem'
                        }}
                        title="Klik untuk dengarkan kalimat"
                      >
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
                          {item.exampleSentence.jp}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                          "{item.exampleSentence.id}"
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#64748b', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '0.5rem' }}>
                      <span>Formula: {item.noun} + <strong style={{ color: '#2dd4bf' }}>{item.particle}</strong> + {item.verb}</span>
                      <span style={{ color: '#a5b4fc' }}>{item.formality}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

      {/* ============================================================== */}
      {/* TAB 2: KUIS UJI PASANGAN KATA */}
      {/* ============================================================== */}
      {activeTab === 'quiz' && currentQuiz && (
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(14, 165, 233, 0.3)',
          borderRadius: '20px',
          padding: '2rem',
          maxWidth: '750px',
          margin: '0 auto',
          width: '100%',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.35)'
        }}>
          {/* Top Quiz Meta */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ background: '#0ea5e9', color: '#fff', fontWeight: 800, fontSize: '0.75rem', padding: '3px 8px', borderRadius: '6px' }}>
                KUIS {quizIndex + 1} / {quizItems.length}
              </span>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                {currentQuiz.level} · {currentQuiz.category}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ color: '#fbbf24', fontWeight: 700, fontSize: '0.9rem' }}>
                🔥 Streak: {quizStreak}x
              </span>
              <span style={{ color: '#f8fafc', fontWeight: 800, fontSize: '1rem' }}>
                Skor: <strong style={{ color: '#38bdf8' }}>{quizScore}</strong>
              </span>
            </div>
          </div>

          {/* Question Box */}
          <div style={{
            background: 'rgba(30, 41, 59, 0.7)',
            padding: '1.5rem',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
              Pilihlah pasangan kata yang paling alami bagi penutur asli Jepang:
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.5 }}>
              {currentQuiz.quiz.question}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#38bdf8', marginTop: '0.4rem', fontWeight: 600 }}>
              Arti: "{currentQuiz.meaning}"
            </div>
          </div>

          {/* Options Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem', marginBottom: '1.5rem' }}>
            {currentQuiz.quiz.options.map((optText, oIdx) => {
              const isChosen = selectedOption === oIdx;
              const isTarget = oIdx === currentQuiz.quiz.correctIndex;
              let bg = 'rgba(30, 41, 59, 0.8)';
              let border = 'rgba(255, 255, 255, 0.12)';
              let textClr = '#f8fafc';

              if (selectedOption !== null) {
                if (isTarget) {
                  bg = 'rgba(16, 185, 129, 0.25)';
                  border = '#10b981';
                  textClr = '#34d399';
                } else if (isChosen && !isTarget) {
                  bg = 'rgba(239, 68, 68, 0.25)';
                  border = '#ef4444';
                  textClr = '#f87171';
                }
              }

              return (
                <button
                  key={oIdx}
                  disabled={selectedOption !== null}
                  onClick={() => handleQuizAnswer(oIdx)}
                  style={{
                    padding: '1.1rem 1rem',
                    borderRadius: '12px',
                    border: `2px solid ${border}`,
                    background: bg,
                    color: textClr,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    cursor: selectedOption === null ? 'pointer' : 'default',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {optText}
                </button>
              );
            })}
          </div>

          {/* Feedback Explanation */}
          {selectedOption !== null && (
            <div style={{
              background: selectedOption === currentQuiz.quiz.correctIndex ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
              border: `1px solid ${selectedOption === currentQuiz.quiz.correctIndex ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)'}`,
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontWeight: 800, color: selectedOption === currentQuiz.quiz.correctIndex ? '#34d399' : '#f87171' }}>
                {selectedOption === currentQuiz.quiz.correctIndex ? '⭕ Tepat Sekali! Pasangan alami!' : '❌ Masih Keliru / Terjebak!'}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                {currentQuiz.literalTrap}
              </div>
            </div>
          )}

          {/* Next Button */}
          {selectedOption !== null && (
            <button
              onClick={handleNextQuiz}
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Soal Berikutnya ➔
            </button>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: DITANDAI (SAVED BOOKMARKS) */}
      {/* ============================================================== */}
      {activeTab === 'saved' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#f8fafc' }}>
              Kolokasi yang Ditandai ({savedList.length})
            </h3>
            {savedList.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('Hapus semua bookmark kolokasi?')) {
                    setSavedIds([]);
                    localStorage.removeItem('nihongo_spark_colloc_saved');
                  }
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#f87171',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Kosongkan Koleksi
              </button>
            )}
          </div>

          {savedList.length === 0 ? (
            <div style={{
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px dashed rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '3rem',
              textAlign: 'center',
              color: '#94a3b8'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
              <h4 style={{ margin: '0 0 0.4rem', color: '#f8fafc' }}>Belum ada kolokasi yang ditandai</h4>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>
                Buka tab <strong>Kamus Kolokasi</strong> dan klik ikon bintang pada pasangan kata yang ingin Anda ingat.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {savedList.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    borderRadius: '14px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc' }}>
                      {item.collocation}
                    </span>
                    <button
                      onClick={() => toggleSave(item.id)}
                      style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: 'none',
                        color: '#f87171',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#38bdf8', fontWeight: 700 }}>
                    {item.meaning}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    {item.reading}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#fca5a5', marginTop: '0.2rem' }}>
                    {item.literalTrap}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
