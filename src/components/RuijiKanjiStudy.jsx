import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ruijiKanjiData } from '../data/ruijiKanji';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function RuijiKanjiStudy() {
  const [activeTab, setActiveTab] = useState('explorer'); // 'explorer' | 'drill' | 'saved'
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('nihongo_spark_ruiji_saved');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // SPEED DRILL STATE
  const [drillActive, setDrillActive] = useState(false);
  const [drillIndex, setDrillIndex] = useState(0);
  const [drillList, setDrillList] = useState([]);
  const [timeLeft, setTimeLeft] = useState(5);
  const [drillScore, setDrillScore] = useState(0);
  const [drillStreak, setDrillStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [drillFinished, setDrillFinished] = useState(false);
  const timerRef = useRef(null);

  // Audio Playback
  const playAudio = (text) => {
    playJapaneseSpeech(text, { rate: 0.85 });
  };

  // Web Audio Sound Effects for Drill
  const playSoundEffect = (isCorrect) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (isCorrect) {
        // High harmonic chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } else {
        // Low error buzz
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, audioCtx.currentTime);
        osc.frequency.setValueAtTime(120, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      }
    } catch {
      // AudioContext fallback
    }
  };

  // Toggle Bookmark
  const toggleSave = (id) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('nihongo_spark_ruiji_saved', JSON.stringify(next));
      return next;
    });
  };

  // Filtered Groups
  const filteredGroups = ruijiKanjiData.filter((group) => {
    const matchLevel = selectedLevel === 'ALL' || group.level === selectedLevel;
    const matchSearch =
      searchQuery === '' ||
      group.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.kanjis.some(
        (k) =>
          k.char.includes(searchQuery) ||
          k.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
          k.reading.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchLevel && matchSearch;
  });

  const savedGroups = ruijiKanjiData.filter((group) => savedIds.includes(group.id));

  // Initialize Speed Drill
  const startDrill = () => {
    const allQuestions = [];
    const pool = selectedLevel === 'ALL' 
      ? ruijiKanjiData 
      : ruijiKanjiData.filter((g) => g.level === selectedLevel);

    pool.forEach((group) => {
      if (group.drillQuestions) {
        group.drillQuestions.forEach((q) => {
          allQuestions.push({
            ...q,
            groupTitle: group.title,
            level: group.level
          });
        });
      }
    });

    // Shuffle questions
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
    setDrillList(shuffled);
    setDrillIndex(0);
    setDrillScore(0);
    setDrillStreak(0);
    setBestStreak(0);
    setSelectedAnswer(null);
    setDrillFinished(false);
    setDrillActive(true);
    setTimeLeft(5);
  };

  const handleAnswer = useCallback((chosenChar, isTimeout = false) => {
    if (selectedAnswer !== null) return;
    clearInterval(timerRef.current);

    const currentQ = drillList[drillIndex];
    if (!currentQ) return;
    const isCorrect = !isTimeout && chosenChar === currentQ.target;

    setSelectedAnswer({
      chosen: chosenChar,
      isCorrect,
      isTimeout
    });

    if (isCorrect) {
      playSoundEffect(true);
      setDrillScore((s) => s + 10 + drillStreak * 2);
      setDrillStreak((prev) => {
        const next = prev + 1;
        if (next > bestStreak) setBestStreak(next);
        return next;
      });
    } else {
      playSoundEffect(false);
      setDrillStreak(0);
    }
  }, [selectedAnswer, drillList, drillIndex, drillStreak, bestStreak]);

  // Drill Timer Effect
  useEffect(() => {
    if (!drillActive || drillFinished || selectedAnswer !== null) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(null, true); // Timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [drillActive, drillFinished, selectedAnswer, handleAnswer]);

  const nextQuestion = () => {
    if (drillIndex + 1 < drillList.length) {
      setDrillIndex((i) => i + 1);
      setSelectedAnswer(null);
      setTimeLeft(5);
    } else {
      setDrillFinished(true);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>
      
      {/* HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(245, 158, 11, 0.15))',
        border: '1px solid rgba(239, 68, 68, 0.3)',
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
              background: 'linear-gradient(135deg, #ef4444, #f59e0b)',
              color: '#fff',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '6px',
              letterSpacing: '0.5px'
            }}>
              FASE 5 · FITUR 23
            </span>
            <span style={{ fontSize: '0.85rem', color: '#fca5a5', fontWeight: 600 }}>
              Pencegah Jebakan Mojigoi JLPT
            </span>
          </div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.5px' }}>
            Jebakan Kanji Mirip <span style={{ color: '#f87171' }}>(類似漢字 Rui-ji Kanji)</span>
          </h1>
          <p style={{ margin: '0.4rem 0 0', color: '#94a3b8', fontSize: '0.9rem', maxWidth: '650px', lineHeight: 1.5 }}>
            Bongkar kanji yang bentuknya hampir kembar melalui komparasi radikal pembeda kontras, jembatan keledai logika, dan latihan refleks mata 5-detik.
          </p>
        </div>

        {/* Quick Mode Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(15, 23, 42, 0.6)', padding: '4px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => { setActiveTab('explorer'); setDrillActive(false); }}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'explorer' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'transparent',
              color: activeTab === 'explorer' ? '#fff' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            🔍 Eksplorasi ({ruijiKanjiData.length})
          </button>
          <button
            onClick={() => { setActiveTab('drill'); startDrill(); }}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'drill' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'transparent',
              color: activeTab === 'drill' ? '#000' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            ⚡ Speed Drill 5s
          </button>
          <button
            onClick={() => { setActiveTab('saved'); setDrillActive(false); }}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'saved' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'transparent',
              color: activeTab === 'saved' ? '#fff' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            ⭐ Ditandai ({savedIds.length})
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: EKSPLORASI JEBAKAN (VISUAL DIFF & MNEMONIK) */}
      {/* ============================================================== */}
      {activeTab === 'explorer' && (
        <>
          {/* Filter Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: selectedLevel === lvl ? '#f87171' : 'rgba(255, 255, 255, 0.1)',
                    background: selectedLevel === lvl ? 'rgba(239, 68, 68, 0.25)' : 'rgba(15, 23, 42, 0.6)',
                    color: selectedLevel === lvl ? '#fff' : '#94a3b8',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', minWidth: '260px' }}>
              <input
                type="text"
                placeholder="Cari kanji / arti / romaji..."
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

          {/* List of Groups */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {filteredGroups.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '12px' }}>
                Tidak ditemukan pasangan kanji mirip yang sesuai pencarian.
              </div>
            ) : (
              filteredGroups.map((group) => {
                const isSaved = savedIds.includes(group.id);
                return (
                  <div
                    key={group.id}
                    style={{
                      background: 'rgba(15, 23, 42, 0.65)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.25rem',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                      transition: 'border-color 0.2s ease'
                    }}
                  >
                    {/* Card Top Meta */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{
                          background: 'rgba(239, 68, 68, 0.2)',
                          color: '#f87171',
                          fontWeight: 800,
                          fontSize: '0.75rem',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          border: '1px solid rgba(239, 68, 68, 0.4)'
                        }}>
                          {group.level}
                        </span>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
                          {group.title}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: '4px' }}>
                          {group.category}
                        </span>
                      </div>

                      <button
                        onClick={() => toggleSave(group.id)}
                        title={isSaved ? 'Hapus dari koleksi sulit' : 'Tandai sebagai kanji sulit'}
                        style={{
                          background: isSaved ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid',
                          borderColor: isSaved ? '#f59e0b' : 'rgba(255, 255, 255, 0.1)',
                          color: isSaved ? '#fbbf24' : '#94a3b8',
                          borderRadius: '8px',
                          padding: '0.35rem 0.75rem',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        {isSaved ? '★ Ditandai' : '☆ Simpan'}
                      </button>
                    </div>

                    {/* Summary Context */}
                    <p style={{ margin: 0, fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5, background: 'rgba(0, 0, 0, 0.25)', padding: '0.6rem 0.9rem', borderRadius: '8px', borderLeft: '3px solid #ef4444' }}>
                      💡 <strong>Kunci Pembeda:</strong> {group.summary}
                    </p>

                    {/* Side-by-side Kanji Comparison Columns */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(auto-fit, minmax(${group.kanjis.length > 2 ? '240px' : '300px'}, 1fr))`,
                      gap: '1rem'
                    }}>
                      {group.kanjis.map((k, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: 'rgba(30, 41, 59, 0.5)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '12px',
                            padding: '1.25rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.8rem'
                          }}
                        >
                          {/* Top Kanji Char & Audio */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                              <span style={{ fontSize: '3rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1 }}>
                                {k.char}
                              </span>
                              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8' }}>
                                {k.meaning}
                              </span>
                            </div>

                            <button
                              onClick={() => playAudio(k.char)}
                              title="Dengarkan pelafalan kanji"
                              style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                border: '1px solid rgba(56, 189, 248, 0.3)',
                                background: 'rgba(56, 189, 248, 0.1)',
                                color: '#38bdf8',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: '1rem'
                              }}
                            >
                              🔊
                            </button>
                          </div>

                          {/* Reading & Radical Info */}
                          <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                            <div><strong>Bacaan:</strong> {k.reading}</div>
                            <div style={{ marginTop: '0.2rem' }}>
                              <strong>Radikal:</strong> <span style={{ color: '#fca5a5' }}>{k.radical}</span>
                            </div>
                          </div>

                          {/* Visual Differentiator Pill */}
                          <div style={{
                            background: 'rgba(239, 68, 68, 0.12)',
                            border: '1px solid rgba(239, 68, 68, 0.25)',
                            borderRadius: '8px',
                            padding: '0.6rem',
                            fontSize: '0.8rem',
                            color: '#fecaca',
                            lineHeight: 1.45
                          }}>
                            🎯 <strong>Pembeda:</strong> {k.difference}
                          </div>

                          {/* Mnemonic Story */}
                          <div style={{
                            background: 'rgba(245, 158, 11, 0.08)',
                            border: '1px solid rgba(245, 158, 11, 0.2)',
                            borderRadius: '8px',
                            padding: '0.6rem',
                            fontSize: '0.8rem',
                            color: '#fef08a',
                            lineHeight: 1.45
                          }}>
                            🧠 <strong>Jembatan Keledai:</strong> {k.mnemonic}
                          </div>

                          {/* Example Compound Words (Jukugo) */}
                          <div style={{ marginTop: '0.2rem' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                              Contoh Kosakata:
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                              {k.examples.map((ex, eIdx) => (
                                <div
                                  key={eIdx}
                                  onClick={() => playAudio(ex.word)}
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '0.35rem 0.55rem',
                                    background: 'rgba(0, 0, 0, 0.2)',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '0.82rem'
                                  }}
                                  title="Klik untuk dengarkan"
                                >
                                  <div>
                                    <span style={{ fontWeight: 700, color: '#f8fafc', marginRight: '0.4rem' }}>{ex.word}</span>
                                    <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>({ex.reading})</span>
                                  </div>
                                  <span style={{ color: '#cbd5e1', fontSize: '0.78rem' }}>{ex.meaning}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

      {/* ============================================================== */}
      {/* TAB 2: SPEED DRILL 5-DETIK (REFLEKS MATA JLPT) */}
      {/* ============================================================== */}
      {activeTab === 'drill' && (
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '20px',
          padding: '2rem',
          maxWidth: '750px',
          margin: '0 auto',
          width: '100%',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.35)'
        }}>
          {!drillFinished && drillList.length > 0 ? (
            <div>
              {/* Top Stats Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ background: '#f59e0b', color: '#000', fontWeight: 800, fontSize: '0.75rem', padding: '3px 8px', borderRadius: '6px' }}>
                    SOAL {drillIndex + 1} / {drillList.length}
                  </span>
                  <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                    {drillList[drillIndex].level} · {drillList[drillIndex].groupTitle}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.9rem', color: '#fbbf24', fontWeight: 700 }}>
                    🔥 Streak: {drillStreak}x
                  </div>
                  <div style={{ fontSize: '1rem', color: '#f8fafc', fontWeight: 800 }}>
                    Skor: <span style={{ color: '#38bdf8' }}>{drillScore}</span>
                  </div>
                </div>
              </div>

              {/* Progress & Countdown Timer Bar */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                  <span>Waktu Tersisa:</span>
                  <span style={{ color: timeLeft <= 2 ? '#ef4444' : '#f59e0b', fontWeight: 800 }}>
                    {timeLeft} Detik
                  </span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${(timeLeft / 5) * 100}%`,
                      background: timeLeft <= 2 ? 'linear-gradient(90deg, #ef4444, #dc2626)' : 'linear-gradient(90deg, #f59e0b, #eab308)',
                      transition: 'width 1s linear'
                    }}
                  />
                </div>
              </div>

              {/* Question Prompt */}
              <div style={{
                background: 'rgba(30, 41, 59, 0.7)',
                padding: '1.5rem',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                textAlign: 'center',
                marginBottom: '1.75rem'
              }}>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                  Deteksi kanji yang tepat secepat mungkin:
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.5 }}>
                  {drillList[drillIndex].prompt}
                </div>
              </div>

              {/* Answer Choices (Kanji Buttons) */}
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${drillList[drillIndex].options.length}, 1fr)`, gap: '1rem', marginBottom: '1.5rem' }}>
                {drillList[drillIndex].options.map((optChar, oIdx) => {
                  const isChosen = selectedAnswer?.chosen === optChar;
                  const isTarget = optChar === drillList[drillIndex].target;
                  let btnBg = 'rgba(30, 41, 59, 0.8)';
                  let btnBorder = 'rgba(255, 255, 255, 0.15)';
                  let btnColor = '#f8fafc';

                  if (selectedAnswer !== null) {
                    if (isTarget) {
                      btnBg = 'rgba(16, 185, 129, 0.25)';
                      btnBorder = '#10b981';
                      btnColor = '#34d399';
                    } else if (isChosen && !isTarget) {
                      btnBg = 'rgba(239, 68, 68, 0.25)';
                      btnBorder = '#ef4444';
                      btnColor = '#f87171';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={selectedAnswer !== null}
                      onClick={() => handleAnswer(optChar)}
                      style={{
                        padding: '1.5rem 1rem',
                        fontSize: '3rem',
                        fontWeight: 800,
                        borderRadius: '16px',
                        border: `2px solid ${btnBorder}`,
                        background: btnBg,
                        color: btnColor,
                        cursor: selectedAnswer === null ? 'pointer' : 'default',
                        transition: 'all 0.15s ease',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      {optChar}
                    </button>
                  );
                })}
              </div>

              {/* Result Feedback Banner */}
              {selectedAnswer !== null && (
                <div style={{
                  background: selectedAnswer.isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  border: `1px solid ${selectedAnswer.isCorrect ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)'}`,
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  marginBottom: '1.5rem',
                  animation: 'fadeIn 0.2s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: selectedAnswer.isCorrect ? '#34d399' : '#f87171' }}>
                      {selectedAnswer.isCorrect ? '⭕ BENAR! Refleks luar biasa!' : selectedAnswer.isTimeout ? '⏰ WAKTU HABIS!' : '❌ SALAH / TERJEBAK!'}
                    </div>
                    {selectedAnswer.isCorrect && (
                      <span style={{ fontSize: '0.85rem', color: '#fbbf24', fontWeight: 700 }}>
                        +{10 + (drillStreak - 1) * 2} Poin
                      </span>
                    )}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                    {drillList[drillIndex].explanation}
                  </p>
                </div>
              )}

              {/* Next Button */}
              {selectedAnswer !== null && (
                <button
                  onClick={nextQuestion}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: '#000',
                    fontSize: '1rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  {drillIndex + 1 < drillList.length ? 'Soal Berikutnya ➔' : 'Lihat Hasil Akhir 🏆'}
                </button>
              )}
            </div>
          ) : drillFinished ? (
            /* FINISHED STATE */
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>
                {drillScore >= 80 ? '👑' : drillScore >= 50 ? '🥈' : '📚'}
              </div>
              <h2 style={{ margin: '0 0 0.5rem', color: '#f8fafc', fontSize: '1.6rem' }}>
                Latihan Refleks Selesai!
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Anda berhasil menyelesaikan 10 soal tantangan deteksi kanji mirip berkecepatan 5 detik.
              </p>

              {/* Stats Box */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                background: 'rgba(30, 41, 59, 0.5)',
                padding: '1.25rem',
                borderRadius: '12px',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Total Skor</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b' }}>{drillScore}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Best Streak</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#38bdf8' }}>{bestStreak}x</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Evaluasi</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: drillScore >= 70 ? '#34d399' : '#f87171', marginTop: '0.3rem' }}>
                    {drillScore >= 80 ? 'Master' : drillScore >= 50 ? 'Hebat' : 'Perlu Latihan'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  onClick={startDrill}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ⚡ Main Lagi (Acak Soal)
                </button>
                <button
                  onClick={() => setActiveTab('explorer')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  🔍 Kembali ke Eksplorasi
                </button>
              </div>
            </div>
          ) : (
            /* EMPTY/INIT STATE */
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: '#94a3b8' }}>Memuat bank soal drill...</p>
              <button
                onClick={startDrill}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Mulai Speed Drill ➔
              </button>
            </div>
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
              Kanji Jebakan yang Ditandai ({savedGroups.length})
            </h3>
            {savedGroups.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('Hapus semua kanji yang ditandai?')) {
                    setSavedIds([]);
                    localStorage.removeItem('nihongo_spark_ruiji_saved');
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

          {savedGroups.length === 0 ? (
            <div style={{
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px dashed rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '3rem',
              textAlign: 'center',
              color: '#94a3b8'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
              <h4 style={{ margin: '0 0 0.4rem', color: '#f8fafc' }}>Belum ada kanji yang ditandai</h4>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>
                Buka tab <strong>Eksplorasi</strong> dan klik tombol <strong>☆ Simpan</strong> pada kanji jebakan yang sering membuat Anda bingung.
              </p>
            </div>
          ) : (
            savedGroups.map((group) => (
              <div
                key={group.id}
                style={{
                  background: 'rgba(15, 23, 42, 0.65)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', fontWeight: 800, fontSize: '0.75rem', padding: '2px 8px', borderRadius: '6px' }}>
                      {group.level}
                    </span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc' }}>
                      {group.title}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleSave(group.id)}
                    style={{
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: 'none',
                      color: '#f87171',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    Hapus
                  </button>
                </div>

                <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}>
                  💡 {group.summary}
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {group.kanjis.map((k, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'rgba(30, 41, 59, 0.6)',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        flex: '1 1 200px'
                      }}
                    >
                      <span style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc' }}>{k.char}</span>
                      <div style={{ fontSize: '0.8rem' }}>
                        <div style={{ fontWeight: 700, color: '#38bdf8' }}>{k.meaning}</div>
                        <div style={{ color: '#94a3b8' }}>{k.reading}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
