import React, { useState, useEffect, useRef } from 'react';
import { tadokuStories } from '../data/tadoku';
import { RubyText, FuriganaModeSelector } from '../utils/furigana';
import { playJapaneseSpeech, stopJapaneseSpeech } from '../utils/audioPlayer';

export default function TadokuReader({ currentLevel = 'N5' }) {
  const [selectedLevel, setSelectedLevel] = useState(currentLevel || 'ALL');
  const [activeStoryId, setActiveStoryId] = useState(tadokuStories[0].id);
  const [viewMode, setViewMode] = useState('reader'); // 'reader' | 'quiz' | 'vocab'

  // Reader Settings
  const [fontSize, setFontSize] = useState(1.15); // rem
  const [showTranslations, setShowTranslations] = useState(false);
  const [revealedSentenceIdx, setRevealedSentenceIdx] = useState({});

  // Audio Playback
  const [playingSentenceIndex, setPlayingSentenceIndex] = useState(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const isPlayingRef = useRef(false);

  // Speed Stopwatch
  const [timerRunning, setTimerRunning] = useState(false);
  const [readingSeconds, setReadingSeconds] = useState(0);
  const [readingWpm, setReadingWpm] = useState(null);
  const timerIntervalRef = useRef(null);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const filteredStories = tadokuStories.filter(s =>
    selectedLevel === 'ALL' ? true : s.level === selectedLevel
  );

  const activeStory = tadokuStories.find(s => s.id === activeStoryId) || tadokuStories[0];

  // Flatten sentences for audio & highlighting
  const allSentences = activeStory.paragraphs.flatMap((p, pIdx) =>
    p.sentences.map((s, sIdx) => ({ ...s, pIdx, sIdx }))
  );

  // Speech helper
  const playNativeAudio = (text, onEndCallback = null) => {
    playJapaneseSpeech(text, {
      rate: 0.9,
      onEnd: onEndCallback,
    });
  };

  const handlePlaySentence = (globalIdx) => {
    setIsPlayingAll(false);
    isPlayingRef.current = false;
    setPlayingSentenceIndex(globalIdx);
    const sent = allSentences[globalIdx];
    if (sent) {
      playNativeAudio(sent.text, () => {
        setPlayingSentenceIndex(null);
      });
    }
  };

  const handlePlayAll = () => {
    if (isPlayingAll) {
      setIsPlayingAll(false);
      isPlayingRef.current = false;
      stopJapaneseSpeech();
      setPlayingSentenceIndex(null);
      return;
    }

    setIsPlayingAll(true);
    isPlayingRef.current = true;

    const playNext = (idx) => {
      if (!isPlayingRef.current || idx >= allSentences.length) {
        setIsPlayingAll(false);
        isPlayingRef.current = false;
        setPlayingSentenceIndex(null);
        return;
      }

      setPlayingSentenceIndex(idx);
      const sent = allSentences[idx];

      playNativeAudio(sent.text, () => {
        if (!isPlayingRef.current) return;
        setTimeout(() => {
          if (isPlayingRef.current) {
            playNext(idx + 1);
          }
        }, 500);
      });
    };

    playNext(0);
  };

  // Stopwatch timer
  const handleToggleTimer = () => {
    if (timerRunning) {
      // Stop
      clearInterval(timerIntervalRef.current);
      setTimerRunning(false);
      if (readingSeconds > 3) {
        const minutes = readingSeconds / 60;
        const cpm = Math.round(activeStory.wordCount / minutes);
        setReadingWpm(cpm);
      }
    } else {
      // Start
      setReadingSeconds(0);
      setReadingWpm(null);
      setTimerRunning(true);
      timerIntervalRef.current = setInterval(() => {
        setReadingSeconds(sec => sec + 1);
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(timerIntervalRef.current);
      stopJapaneseSpeech();
    };
  }, []);

  // Reset when story changes
  useEffect(() => {
    stopJapaneseSpeech();
    clearInterval(timerIntervalRef.current);
    setTimerRunning(false);
    setReadingSeconds(0);
    setReadingWpm(null);
    setIsPlayingAll(false);
    isPlayingRef.current = false;
    setPlayingSentenceIndex(null);
    setRevealedSentenceIdx({});
    setQuizAnswers({});
    setQuizSubmitted(false);
    setViewMode('reader');
  }, [activeStoryId]);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.15))',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        borderRadius: '16px',
        padding: '1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '1.8rem' }}>📖</span>
            <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc', fontWeight: 800 }}>
              Pojok Bacaan Bertingkat (Tadoku / 多読)
            </h1>
            <span style={{
              background: 'rgba(16, 185, 129, 0.25)',
              color: '#34d399',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: '1px solid rgba(16, 185, 129, 0.4)'
            }}>
              Comprehensible Input
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', maxWidth: '600px' }}>
            Bangun intuisi bahasa Jepang melalui membaca ekstensif tanpa tekanan kamus, dengan audio narasi alami, furigana interaktif, dan kuis pemahaman.
          </p>
        </div>

        {/* Level Filters */}
        <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '0.25rem', gap: '0.25rem' }}>
          {['ALL', 'N5', 'N4', 'N3'].map(lvl => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              style={{
                background: selectedLevel === lvl ? 'var(--accent-emerald, #10b981)' : 'transparent',
                color: selectedLevel === lvl ? '#fff' : '#94a3b8',
                border: 'none',
                borderRadius: '8px',
                padding: '0.4rem 0.9rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {lvl === 'ALL' ? 'Semua' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* STORY CAROUSEL / SELECTOR */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1rem'
      }}>
        {filteredStories.map(story => {
          const isSelected = story.id === activeStoryId;
          return (
            <div
              key={story.id}
              onClick={() => setActiveStoryId(story.id)}
              style={{
                background: isSelected ? 'rgba(16, 185, 129, 0.15)' : 'var(--card-bg, #1e293b)',
                border: `2px solid ${isSelected ? '#10b981' : 'rgba(255, 255, 255, 0.08)'}`,
                borderRadius: '14px',
                padding: '1.2rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{
                    background: 'rgba(16, 185, 129, 0.2)',
                    color: '#34d399',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px'
                  }}>
                    {story.level} • {story.genre}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    ⏱️ ~{story.readTimeMinutes} menit
                  </span>
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.2rem' }}>
                  {story.title}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.6rem' }}>
                  {story.summary}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.6rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
                <span>{story.wordCount} Karakter</span>
                <span style={{ color: isSelected ? '#34d399' : '#60a5fa', fontWeight: 600 }}>
                  {isSelected ? '✓ Sedang Dibaca' : 'Buka Bacaan →'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* READER VIEW & CONTROLS DOCK */}
      <div style={{
        background: 'var(--card-bg, #1e293b)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        overflow: 'hidden'
      }}>
        {/* Navigation Bar inside reader */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          background: 'rgba(0, 0, 0, 0.2)'
        }}>
          {/* Sub-tabs */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setViewMode('reader')}
              style={{
                background: viewMode === 'reader' ? 'var(--accent-emerald, #10b981)' : 'transparent',
                color: viewMode === 'reader' ? '#fff' : '#94a3b8',
                border: 'none',
                borderRadius: '8px',
                padding: '0.45rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              📖 Teks Cerita
            </button>
            <button
              onClick={() => setViewMode('vocab')}
              style={{
                background: viewMode === 'vocab' ? 'var(--accent-emerald, #10b981)' : 'transparent',
                color: viewMode === 'vocab' ? '#fff' : '#94a3b8',
                border: 'none',
                borderRadius: '8px',
                padding: '0.45rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              ✨ Kosakata ({activeStory.vocabHighlights.length})
            </button>
            <button
              onClick={() => setViewMode('quiz')}
              style={{
                background: viewMode === 'quiz' ? 'var(--accent-emerald, #10b981)' : 'transparent',
                color: viewMode === 'quiz' ? '#fff' : '#94a3b8',
                border: 'none',
                borderRadius: '8px',
                padding: '0.45rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              🎯 Kuis Pemahaman ({activeStory.quiz.length})
            </button>
          </div>

          {/* Reader Toolbar: Audio, Furigana, Font Size, Translations */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            {/* Audio Play All */}
            <button
              onClick={handlePlayAll}
              style={{
                background: isPlayingAll ? '#ef4444' : 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.45rem 0.9rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <span>{isPlayingAll ? '⏹️ Hentikan' : '🔊 Putar Narator'}</span>
            </button>

            {/* Furigana selector */}
            <FuriganaModeSelector compact />

            {/* Toggle Translations */}
            <button
              onClick={() => setShowTranslations(!showTranslations)}
              style={{
                background: showTranslations ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                color: showTranslations ? '#38bdf8' : '#94a3b8',
                border: `1px solid ${showTranslations ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: '8px',
                padding: '0.45rem 0.75rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              🇮🇩 {showTranslations ? 'Sembunyikan Terjemahan' : 'Tampilkan Terjemahan'}
            </button>

            {/* Font size adjustment */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <button
                onClick={() => setFontSize(s => Math.max(0.95, s - 0.1))}
                style={{ background: 'rgba(255, 255, 255, 0.08)', color: 'white', border: 'none', borderRadius: '4px', width: '28px', height: '28px', cursor: 'pointer', fontSize: '0.8rem' }}
                title="Perkecil Huruf"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize(s => Math.min(1.6, s + 0.1))}
                style={{ background: 'rgba(255, 255, 255, 0.08)', color: 'white', border: 'none', borderRadius: '4px', width: '28px', height: '28px', cursor: 'pointer', fontSize: '0.9rem' }}
                title="Perbesar Huruf"
              >
                A+
              </button>
            </div>

            {/* Reading Timer */}
            <button
              onClick={handleToggleTimer}
              style={{
                background: timerRunning ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                color: timerRunning ? '#fbbf24' : '#cbd5e1',
                border: `1px solid ${timerRunning ? '#f59e0b' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: '8px',
                padding: '0.45rem 0.75rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              ⏱️ {timerRunning ? `${readingSeconds}s (Klik Stop)` : 'Uji WPM Baca'}
            </button>
          </div>
        </div>

        {/* WPM Speed Display banner if calculated */}
        {readingWpm && (
          <div style={{ background: 'rgba(16, 185, 129, 0.12)', borderBottom: '1px solid rgba(16, 185, 129, 0.2)', padding: '0.6rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
            <span style={{ color: '#34d399', fontWeight: 600 }}>
              🎉 Kecepatan membaca Anda: <strong>{readingWpm} karakter/menit</strong> (Waktu: {readingSeconds} detik)
            </span>
            <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
              {readingWpm >= 300 ? '⚡ Sangat Cepat (Level Native)' : readingWpm >= 180 ? '👍 Bagus & Lancar' : '🌱 Pertahankan, terus latihan!'}
            </span>
          </div>
        )}

        {/* TAB CONTENT: 1. READER */}
        {viewMode === 'reader' && (
          <div style={{ padding: '2rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Story Title Header */}
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.9rem', color: '#f8fafc', fontWeight: 800 }}>
                {activeStory.title}
              </h2>
              <div style={{ fontSize: '1rem', color: '#34d399', marginTop: '0.2rem' }}>
                【{activeStory.titleReading}】
              </div>
            </div>

            {/* Story Paragraphs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {activeStory.paragraphs.map((para, pIdx) => (
                <div
                  key={pIdx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    border: '1px solid rgba(255, 255, 255, 0.04)'
                  }}
                >
                  <p style={{
                    margin: 0,
                    fontSize: `${fontSize}rem`,
                    lineHeight: 2.2,
                    letterSpacing: '0.5px'
                  }}>
                    {para.sentences.map((sent) => {
                      const globalIdx = allSentences.findIndex(s => s.text === sent.text);
                      const isPlaying = globalIdx === playingSentenceIndex;
                      const isRevealed = revealedSentenceIdx[globalIdx] || showTranslations;

                      return (
                        <span
                          key={globalIdx}
                          onClick={() => handlePlaySentence(globalIdx)}
                          title="Klik untuk dengarkan kalimat ini"
                          style={{
                            background: isPlaying ? 'rgba(16, 185, 129, 0.25)' : 'transparent',
                            color: isPlaying ? '#34d399' : '#f8fafc',
                            borderRadius: '4px',
                            padding: '2px 4px',
                            cursor: 'pointer',
                            transition: 'background 0.2s ease',
                            display: 'inline'
                          }}
                        >
                          <RubyText text={sent.text} reading={sent.reading} />
                          {' '}
                          {/* Inline or collapsible sentence translation */}
                          {isRevealed && (
                            <span style={{
                              display: 'block',
                              fontSize: '0.85rem',
                              color: '#94a3b8',
                              lineHeight: 1.5,
                              marginBottom: '0.4rem',
                              fontFamily: 'sans-serif'
                            }}>
                              ↳ {sent.indonesian}
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Next Step Action */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Selesai membaca? Uji seberapa dalam pemahamanmu!
              </span>
              <button
                onClick={() => setViewMode('quiz')}
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.65rem 1.4rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Mulai Kuis Pemahaman ➔
              </button>
            </div>
          </div>
        )}

        {/* TAB CONTENT: 2. VOCABULARY HIGHLIGHTS */}
        {viewMode === 'vocab' && (
          <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {activeStory.vocabHighlights.map((v, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#38bdf8' }}>
                    {v.word}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                    【{v.reading}】
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#f8fafc', marginTop: '0.3rem', fontWeight: 500 }}>
                    {v.meaning}
                  </div>
                </div>

                <button
                  onClick={() => playNativeAudio(v.word)}
                  style={{
                    background: 'rgba(56, 189, 248, 0.15)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '8px',
                    padding: '0.4rem 0.7rem',
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  🔊
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB CONTENT: 3. COMPREHENSION QUIZ */}
        {viewMode === 'quiz' && (
          <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#f8fafc' }}>
              Kuis Pemahaman: {activeStory.title}
            </h3>

            {activeStory.quiz.map((q, qIdx) => {
              const userAnswer = quizAnswers[qIdx];
              return (
                <div
                  key={qIdx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}
                >
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', marginBottom: '1rem', lineHeight: 1.5 }}>
                    {qIdx + 1}. {q.question}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAnswer === optIdx;
                      const isCorrect = q.correctIndex === optIdx;

                      let btnBg = 'rgba(255, 255, 255, 0.04)';
                      let btnBorder = 'rgba(255, 255, 255, 0.1)';

                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnBg = 'rgba(16, 185, 129, 0.2)';
                          btnBorder = '#10b981';
                        } else if (isSelected) {
                          btnBg = 'rgba(239, 68, 68, 0.2)';
                          btnBorder = '#ef4444';
                        }
                      } else if (isSelected) {
                        btnBg = 'rgba(56, 189, 248, 0.2)';
                        btnBorder = '#38bdf8';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                          style={{
                            background: btnBg,
                            border: `1.5px solid ${btnBorder}`,
                            borderRadius: '8px',
                            padding: '0.8rem 1rem',
                            textAlign: 'left',
                            color: '#f8fafc',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            cursor: quizSubmitted ? 'default' : 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div style={{
                      marginTop: '0.8rem',
                      padding: '0.8rem',
                      background: 'rgba(0, 0, 0, 0.3)',
                      borderLeft: `3px solid ${userAnswer === q.correctIndex ? '#10b981' : '#ef4444'}`,
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      color: '#cbd5e1'
                    }}>
                      💡 {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Submit / Retake button */}
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              {!quizSubmitted ? (
                <button
                  disabled={Object.keys(quizAnswers).length < activeStory.quiz.length}
                  onClick={() => setQuizSubmitted(true)}
                  style={{
                    background: Object.keys(quizAnswers).length < activeStory.quiz.length ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #10b981, #059669)',
                    color: Object.keys(quizAnswers).length < activeStory.quiz.length ? '#94a3b8' : 'white',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.75rem 2rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: Object.keys(quizAnswers).length < activeStory.quiz.length ? 'not-allowed' : 'pointer'
                  }}
                >
                  Periksa Jawaban
                </button>
              ) : (
                <button
                  onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    padding: '0.75rem 2rem',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Ulangi Kuis
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
