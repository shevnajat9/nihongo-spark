import React, { useState } from 'react';
import { JIDOUSHI_PAIRS, JIDOUSHI_RULES } from '../data/jidoushi';
import { RubyText, FuriganaModeSelector } from '../utils/furigana';
import ConjugationModal from './ConjugationModal';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function JidoushiStudy({ currentLevel }) {
  const [activeTab, setActiveTab] = useState('pairs'); // 'pairs' | 'quiz' | 'rules'
  const [selectedLevel, setSelectedLevel] = useState(currentLevel || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [conjugatingVerb, setConjugatingVerb] = useState(null);

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnsweredCount, setQuizAnsweredCount] = useState(0);

  const speak = (text, e) => {
    if (e) e.stopPropagation();
    playJapaneseSpeech(text, { rate: 0.85 });
  };

  // Categories extraction
  const categories = ['all', ...new Set(JIDOUSHI_PAIRS.map(p => p.category))];

  // Filtering
  const filteredPairs = JIDOUSHI_PAIRS.filter(pair => {
    if (selectedLevel !== 'all' && pair.level !== selectedLevel) return false;
    if (selectedCategory !== 'all' && pair.category !== selectedCategory) return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const jMatch =
        pair.jidoushi.kanji.toLowerCase().includes(q) ||
        pair.jidoushi.reading.toLowerCase().includes(q) ||
        pair.jidoushi.meaning.toLowerCase().includes(q);
      const tMatch =
        pair.tadoushi.kanji.toLowerCase().includes(q) ||
        pair.tadoushi.reading.toLowerCase().includes(q) ||
        pair.tadoushi.meaning.toLowerCase().includes(q);
      return jMatch || tMatch;
    }
    return true;
  });

  // Quiz generation from pairs
  const currentQuizPair = JIDOUSHI_PAIRS[quizIndex % JIDOUSHI_PAIRS.length];
  // Alternating between guessing Jidoushi or Tadoushi
  const isJidoushiQuestion = quizIndex % 2 === 0;
  const targetObj = isJidoushiQuestion ? currentQuizPair.jidoushi : currentQuizPair.tadoushi;

  const handleQuizAnswer = (chosenKanji) => {
    if (selectedAnswer !== null) return;
    const isCorrect = chosenKanji === targetObj.kanji;
    setSelectedAnswer({
      chosen: chosenKanji,
      isCorrect,
      explanation: isJidoushiQuestion
        ? `Tepat! Karena aksi terjadi spontan/alami pada subjek, menggunakan 自動詞 (${targetObj.kanji}) dengan partikel ${targetObj.particle}.`
        : `Tepat! Karena aksi dilakukan secara sengaja oleh pelaku terhadap objek, menggunakan 他動詞 (${targetObj.kanji}) dengan partikel ${targetObj.particle}.`
    });
    setQuizAnsweredCount(prev => prev + 1);
    if (isCorrect) setQuizScore(prev => prev + 1);
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setQuizIndex(prev => (prev + 1) % JIDOUSHI_PAIRS.length);
  };

  return (
    <div className="jidoushi-container">
      {/* ── HEADER ── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '0.5rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.4rem' }}>
            Transitif vs Intransitif <span className="text-gradient">(自動詞・他動詞)</span> ⚖️
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '680px', lineHeight: '1.5', fontSize: '0.92rem' }}>
            Kunci membedakan partikel <strong>が (otomatis/spontan)</strong> dan <strong>を (tindakan sengaja pelaku)</strong> dalam bahasa Jepang.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <FuriganaModeSelector />
        </div>
      </div>

      {/* ── NAVIGATION MODES ── */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingBottom: '0.5rem',
        flexWrap: 'wrap'
      }}>
        <button
          type="button"
          className={`filter-btn ${activeTab === 'pairs' ? 'active' : ''}`}
          onClick={() => setActiveTab('pairs')}
          style={{ padding: '6px 14px', borderRadius: '12px' }}
        >
          📖 Daftar Pasangan ({filteredPairs.length})
        </button>
        <button
          type="button"
          className={`filter-btn ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
          style={{ padding: '6px 14px', borderRadius: '12px' }}
        >
          🎯 Kuis Kilat が vs を
        </button>
        <button
          type="button"
          className={`filter-btn ${activeTab === 'rules' ? 'active' : ''}`}
          onClick={() => setActiveTab('rules')}
          style={{ padding: '6px 14px', borderRadius: '12px' }}
        >
          💡 Rumus Perubahan Bunyi (5 Pola)
        </button>
      </div>

      {/* ── TAB 1: PAIRS EXPLORER ── */}
      {activeTab === 'pairs' && (
        <>
          {/* Filters Bar */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div className="search-bar" style={{ flex: 1, margin: 0, minWidth: '220px' }}>
              <input
                type="text"
                className="search-input"
                placeholder="Cari kata (contoh: 開く, akeru, pintu, menutup)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Hapus pencarian"
                >
                  ×
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {['all', 'N5', 'N4', 'N3', 'N2'].map(lvl => (
                <button
                  key={lvl}
                  type="button"
                  className={`filter-btn ${selectedLevel === lvl ? 'active' : ''}`}
                  onClick={() => setSelectedLevel(lvl)}
                  style={{ fontSize: '0.8rem', padding: '4px 10px' }}
                >
                  {lvl === 'all' ? 'Semua Level' : lvl}
                </button>
              ))}
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="glass-panel"
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                color: 'var(--text-primary)',
                border: '1px solid var(--glass-border)',
                padding: '6px 12px',
                borderRadius: '12px',
                fontSize: '0.85rem'
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'Semua Kategori' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Pair Cards Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {filteredPairs.length === 0 ? (
              <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <p>Tidak ada pasangan verba yang cocok dengan filter Anda.</p>
              </div>
            ) : (
              filteredPairs.map((pair) => (
                <div key={pair.id} className="jidoushi-pair-card glass-panel">
                  {/* Pair Header Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '20px',
                    display: 'flex',
                    gap: '0.5rem',
                    zIndex: 2
                  }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '8px',
                      background: 'var(--accent-primary)',
                      color: 'white',
                      letterSpacing: '0.5px'
                    }}>
                      {pair.level}
                    </span>
                    <span style={{
                      fontSize: '0.72rem',
                      padding: '2px 8px',
                      borderRadius: '8px',
                      background: 'rgba(20, 27, 44, 0.95)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-muted)'
                    }}>
                      {pair.category} · Pola: {pair.pattern}
                    </span>
                  </div>

                  {/* LEFT: JIDOUSHI (自動詞 - Intransitif) */}
                  <div className="jidoushi-side">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="particle-pill-ga">が</span>
                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--accent-cyan)' }}>
                          自動詞 (Intransitif)
                        </span>
                      </div>
                      <button
                        type="button"
                        className="conjugate-trigger-btn"
                        onClick={() => setConjugatingVerb({
                          word: pair.jidoushi.kanji,
                          reading: pair.jidoushi.reading,
                          meaning: pair.jidoushi.meaning
                        })}
                        title="Lihat tabel konjugasi kata kerja ini"
                      >
                        ⚡ Konjugasi
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <div>
                        <div style={{ fontSize: '1.6rem', fontWeight: '700', color: 'white' }}>
                          <RubyText text={pair.jidoushi.kanji} reading={pair.jidoushi.reading} />
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
                          {pair.jidoushi.reading} ({pair.jidoushi.romaji})
                        </div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '500', color: 'white', marginTop: '0.2rem' }}>
                          {pair.jidoushi.meaning}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="audio-btn"
                        onClick={(e) => speak(pair.jidoushi.example || pair.jidoushi.kanji, e)}
                        title="Dengarkan pengucapan & contoh"
                        style={{ width: '32px', height: '32px' }}
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                      </button>
                    </div>

                    {/* Example Sentence */}
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.25)',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(6, 182, 212, 0.15)',
                      marginTop: 'auto'
                    }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                        Contoh Kalimat:
                      </div>
                      <div style={{ fontSize: '0.98rem', fontWeight: '500', color: 'white' }}>
                        <RubyText text={pair.jidoushi.example} reading={pair.jidoushi.exampleReading} />
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                        {pair.jidoushi.exampleMeaning}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: TADOUSHI (他動詞 - Transitif) */}
                  <div className="tadoushi-side">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="particle-pill-wo">を</span>
                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#fbbf24' }}>
                          他動詞 (Transitif)
                        </span>
                      </div>
                      <button
                        type="button"
                        className="conjugate-trigger-btn"
                        onClick={() => setConjugatingVerb({
                          word: pair.tadoushi.kanji,
                          reading: pair.tadoushi.reading,
                          meaning: pair.tadoushi.meaning
                        })}
                        title="Lihat tabel konjugasi kata kerja ini"
                      >
                        ⚡ Konjugasi
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <div>
                        <div style={{ fontSize: '1.6rem', fontWeight: '700', color: 'white' }}>
                          <RubyText text={pair.tadoushi.kanji} reading={pair.tadoushi.reading} />
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#fbbf24' }}>
                          {pair.tadoushi.reading} ({pair.tadoushi.romaji})
                        </div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '500', color: 'white', marginTop: '0.2rem' }}>
                          {pair.tadoushi.meaning}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="audio-btn"
                        onClick={(e) => speak(pair.tadoushi.example || pair.tadoushi.kanji, e)}
                        title="Dengarkan pengucapan & contoh"
                        style={{ width: '32px', height: '32px' }}
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                      </button>
                    </div>

                    {/* Example Sentence */}
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.25)',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(245, 158, 11, 0.15)',
                      marginTop: 'auto'
                    }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                        Contoh Kalimat:
                      </div>
                      <div style={{ fontSize: '0.98rem', fontWeight: '500', color: 'white' }}>
                        <RubyText text={pair.tadoushi.example} reading={pair.tadoushi.exampleReading} />
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                        {pair.tadoushi.exampleMeaning}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* ── TAB 2: INTERACTIVE QUIZ MODE ── */}
      {activeTab === 'quiz' && (
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '720px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Pertanyaan #{quizIndex + 1} ({currentQuizPair.level} · {currentQuizPair.category})
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--accent-cyan)' }}>
              Skor: {quizScore} / {quizAnsweredCount}
            </span>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Pilih kata kerja yang tepat untuk mengisi kalimat berikut:
            </div>

            <div style={{
              fontSize: '1.4rem',
              fontWeight: '600',
              color: 'white',
              background: 'rgba(0,0,0,0.3)',
              padding: '1.25rem',
              borderRadius: '14px',
              border: '1px solid var(--glass-border)',
              margin: '1rem 0'
            }}>
              {targetObj.example.replace(targetObj.kanji, '【 ? 】')}
            </div>

            <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Arti: "{targetObj.exampleMeaning}"
            </div>

            <div style={{ marginTop: '0.75rem' }}>
              <span style={{
                fontSize: '0.85rem',
                padding: '4px 12px',
                borderRadius: '20px',
                background: isJidoushiQuestion ? 'rgba(6, 182, 212, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                color: isJidoushiQuestion ? 'var(--accent-cyan)' : '#fbbf24',
                fontWeight: '600'
              }}>
                Petunjuk Partikel: {targetObj.particle} ({isJidoushiQuestion ? 'Aksi Otomatis / Hasil Keadaan' : 'Aksi Disengaja Pelaku'})
              </span>
            </div>
          </div>

          {/* Options */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            {[currentQuizPair.jidoushi, currentQuizPair.tadoushi]
              .sort(() => (quizIndex % 3 === 0 ? 1 : -1))
              .map((verbChoice) => {
                const isChosen = selectedAnswer && selectedAnswer.chosen === verbChoice.kanji;
                const isRight = selectedAnswer && verbChoice.kanji === targetObj.kanji;

                let btnBg = 'rgba(255, 255, 255, 0.05)';
                let btnBorder = 'var(--glass-border)';

                if (selectedAnswer) {
                  if (isRight) {
                    btnBg = 'rgba(16, 185, 129, 0.2)';
                    btnBorder = 'var(--accent-emerald)';
                  } else if (isChosen && !isRight) {
                    btnBg = 'rgba(244, 63, 94, 0.2)';
                    btnBorder = 'var(--accent-rose)';
                  }
                }

                return (
                  <button
                    key={verbChoice.kanji}
                    type="button"
                    disabled={selectedAnswer !== null}
                    onClick={() => handleQuizAnswer(verbChoice.kanji)}
                    style={{
                      background: btnBg,
                      border: `1px solid ${btnBorder}`,
                      padding: '1.25rem',
                      borderRadius: '14px',
                      color: 'white',
                      cursor: selectedAnswer === null ? 'pointer' : 'default',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ fontSize: '1.4rem', fontWeight: '700' }}>
                      <RubyText text={verbChoice.kanji} reading={verbChoice.reading} />
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {verbChoice.reading} · {verbChoice.meaning}
                    </span>
                  </button>
                );
              })}
          </div>

          {/* Quiz Feedback & Next Button */}
          {selectedAnswer && (
            <div style={{
              background: selectedAnswer.isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
              border: `1px solid ${selectedAnswer.isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)'}`,
              padding: '1rem',
              borderRadius: '12px',
              marginBottom: '1.25rem'
            }}>
              <div style={{
                fontWeight: '700',
                color: selectedAnswer.isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)',
                marginBottom: '0.25rem'
              }}>
                {selectedAnswer.isCorrect ? '✅ Jawaban Benar!' : '❌ Kurang Tepat!'}
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', margin: 0 }}>
                {selectedAnswer.explanation}
              </p>
            </div>
          )}

          {selectedAnswer && (
            <button
              type="button"
              className="start-quiz-btn"
              onClick={handleNextQuiz}
              style={{ width: '100%', margin: 0 }}
            >
              Soal Berikutnya ➔
            </button>
          )}
        </div>
      )}

      {/* ── TAB 3: RULES SUMMARY ── */}
      {activeTab === 'rules' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--accent-cyan)' }}>
              Aturan & Pola Perubahan Bunyi (Jidoushi vs Tadoushi)
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              Meskipun ada beberapa perkecualian, sekitar 85% pasangan kata kerja transitif dan intransitif dalam bahasa Jepang
              mengikuti salah satu dari 5 pola fonetik berikut:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
            {JIDOUSHI_RULES.map((rule, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ fontWeight: '700', color: '#c4b5fd', fontSize: '1.05rem' }}>
                  Pola #{idx + 1}: {rule.pattern}
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', margin: 0, lineHeight: '1.5' }}>
                  {rule.desc}
                </p>
                <div style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  padding: '0.6rem 0.8rem',
                  borderRadius: '8px',
                  border: '1px solid var(--glass-border)',
                  fontSize: '0.82rem',
                  color: 'var(--accent-cyan)',
                  marginTop: 'auto'
                }}>
                  Contoh: {rule.examples}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conjugation Modal on Demand */}
      {conjugatingVerb && (
        <ConjugationModal
          verbItem={conjugatingVerb}
          onClose={() => setConjugatingVerb(null)}
        />
      )}
    </div>
  );
}
