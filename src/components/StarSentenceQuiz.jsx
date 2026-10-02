import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { starSentencesData } from '../data/starSentences';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function StarSentenceQuiz() {
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Question Set Filtered by Level
  const questions = useMemo(() => {
    if (selectedLevel === 'ALL') return starSentencesData;
    return starSentencesData.filter((q) => q.level === selectedLevel);
  }, [selectedLevel]);

  const currentQ = questions[currentIndex] || questions[0];

  // Shuffled fragments for current question
  const [shuffledBank, setShuffledBank] = useState([]);
  // Slots: array of 4 items [fragment1, fragment2, fragment3, fragment4] or null
  const [slots, setSlots] = useState([null, null, null, null]);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [userStats, setUserStats] = useState({
    starCorrect: 0,
    totalAttempted: 0,
    fullCorrect: 0,
    streak: 0
  });

  // Sound effect generator via Web Audio API
  const playSfx = (isCorrect) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (isCorrect) {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.setValueAtTime(140, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch {
      // AudioContext fallback
    }
  };

  // Play Speech Audio
  const playSentenceAudio = (text) => {
    playJapaneseSpeech(text, { rate: 0.9 });
  };

  // Setup current question when index or level changes
  const initQuestion = useCallback(() => {
    if (!currentQ) return;
    // Shuffle fragments with their original index tagged
    const tagged = currentQ.fragments.map((frag, origIdx) => ({
      id: `${currentQ.id}-${origIdx}`,
      text: frag,
      origIdx: origIdx + 1 // 1-indexed (1, 2, 3, 4)
    }));
    // Randomize order
    const randomized = [...tagged].sort(() => Math.random() - 0.5);
    setShuffledBank(randomized);
    setSlots([null, null, null, null]);
    setIsEvaluated(false);
  }, [currentQ]);

  useEffect(() => {
    initQuestion();
  }, [initQuestion]);

  // Click on bank chip to insert into the first empty slot
  const handleChipClick = (chip) => {
    if (isEvaluated) return;
    const emptyIndex = slots.findIndex((s) => s === null);
    if (emptyIndex === -1) return; // All full

    const newSlots = [...slots];
    newSlots[emptyIndex] = chip;
    setSlots(newSlots);

    // Remove from bank
    setShuffledBank((prev) => prev.filter((c) => c.id !== chip.id));
  };

  // Click on filled slot to unplace it back to bank
  const handleSlotClick = (slotIndex) => {
    if (isEvaluated) return;
    const chip = slots[slotIndex];
    if (!chip) return;

    const newSlots = [...slots];
    newSlots[slotIndex] = null;
    setSlots(newSlots);

    setShuffledBank((prev) => [...prev, chip]);
  };

  // Reset current slots
  const handleReset = () => {
    initQuestion();
  };

  // Check Answer
  const handleCheck = () => {
    if (slots.some((s) => s === null) || isEvaluated) return;

    // Correct fragments sequence
    const isFullCorrect = slots.every((s, idx) => s.text === currentQ.fragments[idx]);
    // The key question in JLPT: Did user put the right fragment in starPosition (1-indexed)?
    const starSlotIndex = currentQ.starPosition - 1;
    const isStarCorrect = slots[starSlotIndex]?.text === currentQ.fragments[starSlotIndex];

    setIsEvaluated(true);
    playSfx(isStarCorrect);

    setUserStats((prev) => ({
      starCorrect: isStarCorrect ? prev.starCorrect + 1 : prev.starCorrect,
      fullCorrect: isFullCorrect ? prev.fullCorrect + 1 : prev.fullCorrect,
      totalAttempted: prev.totalAttempted + 1,
      streak: isStarCorrect ? prev.streak + 1 : 0
    }));

    if (currentQ.fullSentence) {
      playSentenceAudio(currentQ.fullSentence);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const allFilled = slots.every((s) => s !== null);
  const starSlotIdx = currentQ ? currentQ.starPosition - 1 : 2;
  const isStarAnswerCorrect = isEvaluated && slots[starSlotIdx]?.text === currentQ?.fragments[starSlotIdx];
  const isFullAnswerCorrect = isEvaluated && slots.every((s, idx) => s?.text === currentQ?.fragments[idx]);

  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>
      
      {/* HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.12), rgba(99, 102, 241, 0.15))',
        border: '1px solid rgba(234, 179, 8, 0.3)',
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
              background: 'linear-gradient(135deg, #eab308, #ca8a04)',
              color: '#000',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '6px',
              letterSpacing: '0.5px'
            }}>
              FASE 5 · FITUR 24
            </span>
            <span style={{ fontSize: '0.85rem', color: '#fef08a', fontWeight: 600 }}>
              Simulasi Mondai 2 Resmi JLPT
            </span>
          </div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.5px' }}>
            Soal Bintang Tata Bahasa <span style={{ color: '#facc15' }}>(文の並べ替え ★問題)</span>
          </h1>
          <p style={{ margin: '0.4rem 0 0', color: '#94a3b8', fontSize: '0.9rem', maxWidth: '650px', lineHeight: 1.5 }}>
            Tantangan mengurutkan 4 potongan frasa gramatikal. Kunci kelulusan ujian JLPT: tentukan frasa mana yang jatuh tepat pada posisi bintang <strong>★</strong>!
          </p>
        </div>

        {/* Score Badges */}
        <div style={{ display: 'flex', gap: '1rem', background: 'rgba(15, 23, 42, 0.6)', padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Akurasi ★</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#facc15' }}>
              {userStats.totalAttempted > 0 ? Math.round((userStats.starCorrect / userStats.totalAttempted) * 100) : 0}%
            </div>
          </div>
          <div style={{ width: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Streak</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8' }}>
              🔥 {userStats.streak}x
            </div>
          </div>
        </div>
      </div>

      {/* LEVEL FILTER TABS */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8', marginRight: '0.3rem' }}>Level Soal:</span>
        {['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => {
              setSelectedLevel(lvl);
              setCurrentIndex(0);
            }}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: selectedLevel === lvl ? '#facc15' : 'rgba(255, 255, 255, 0.1)',
              background: selectedLevel === lvl ? 'rgba(234, 179, 8, 0.2)' : 'rgba(15, 23, 42, 0.6)',
              color: selectedLevel === lvl ? '#fef08a' : '#94a3b8',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* QUIZ INTERACTIVE CONTAINER */}
      {currentQ && (
        <div style={{
          background: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem'
        }}>
          {/* Question Metadata */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{
                background: 'rgba(234, 179, 8, 0.2)',
                color: '#facc15',
                fontWeight: 800,
                fontSize: '0.75rem',
                padding: '2px 8px',
                borderRadius: '6px',
                border: '1px solid rgba(234, 179, 8, 0.4)'
              }}>
                {currentQ.level}
              </span>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Soal {currentIndex + 1} dari {questions.length}
              </span>
            </div>

            <div style={{ fontSize: '0.82rem', color: '#a5b4fc', background: 'rgba(99, 102, 241, 0.15)', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
              📌 {currentQ.grammarPoint}
            </div>
          </div>

          {/* Interactive Sentence Assembly Track */}
          <div style={{
            background: 'rgba(30, 41, 59, 0.6)',
            borderRadius: '16px',
            padding: '1.75rem 1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            minHeight: '110px'
          }}>
            {/* Sentence Prefix */}
            {currentQ.prefix && (
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', whiteSpace: 'nowrap' }}>
                {currentQ.prefix}
              </span>
            )}

            {/* 4 Interactive Drop Slots */}
            {slots.map((chip, slotIdx) => {
              const isStarSlot = slotIdx + 1 === currentQ.starPosition;
              let slotBorder = isStarSlot ? '2px dashed #facc15' : '2px dashed rgba(255, 255, 255, 0.2)';
              let slotBg = isStarSlot ? 'rgba(234, 179, 8, 0.08)' : 'rgba(15, 23, 42, 0.5)';

              if (isEvaluated) {
                if (isStarSlot) {
                  slotBorder = isStarAnswerCorrect ? '2px solid #10b981' : '2px solid #ef4444';
                  slotBg = isStarAnswerCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)';
                }
              }

              return (
                <div
                  key={slotIdx}
                  onClick={() => handleSlotClick(slotIdx)}
                  style={{
                    position: 'relative',
                    minWidth: '130px',
                    height: '56px',
                    borderRadius: '12px',
                    border: slotBorder,
                    background: slotBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 0.75rem',
                    cursor: chip && !isEvaluated ? 'pointer' : 'default',
                    transition: 'all 0.15s ease'
                  }}
                  title={chip ? 'Klik untuk kembalikan frasa' : isStarSlot ? 'Posisi Bintang (★)' : `Slot ${slotIdx + 1}`}
                >
                  {/* Star Badge Indicator */}
                  {isStarSlot && (
                    <div style={{
                      position: 'absolute',
                      top: '-11px',
                      background: '#facc15',
                      color: '#000',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '1px 6px',
                      borderRadius: '4px',
                      boxShadow: '0 2px 8px rgba(250, 204, 21, 0.4)'
                    }}>
                      ★ POSISI BINTANG
                    </div>
                  )}

                  {/* Slot Number watermark if empty */}
                  {!chip && (
                    <span style={{ fontSize: '0.9rem', color: isStarSlot ? '#facc15' : 'rgba(255, 255, 255, 0.2)', fontWeight: 700 }}>
                      {isStarSlot ? '★' : slotIdx + 1}
                    </span>
                  )}

                  {/* Placed Chip */}
                  {chip && (
                    <div style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: '#f8fafc',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}>
                      <span>{chip.text}</span>
                      {!isEvaluated && (
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>✕</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Sentence Suffix */}
            {currentQ.suffix && (
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', whiteSpace: 'nowrap' }}>
                {currentQ.suffix}
              </span>
            )}
          </div>

          {/* Chips Bank (Pilihan Frasa untuk Disusun) */}
          <div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Pilih potongan frasa di bawah (klik untuk menaruh ke kotak kosong):</span>
              {!isEvaluated && slots.some((s) => s !== null) && (
                <button
                  onClick={handleReset}
                  style={{ background: 'none', border: 'none', color: '#f87171', fontSize: '0.78rem', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Reset Kotak
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {shuffledBank.map((chip, bIdx) => (
                <button
                  key={chip.id}
                  disabled={isEvaluated}
                  onClick={() => handleChipClick(chip)}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    background: 'rgba(30, 41, 59, 0.8)',
                    color: '#f8fafc',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    cursor: isEvaluated ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    transition: 'transform 0.1s ease, border-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => { if (!isEvaluated) e.currentTarget.style.borderColor = '#facc15'; }}
                  onMouseLeave={(e) => { if (!isEvaluated) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'; }}
                >
                  <span>{chip.text}</span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', background: 'rgba(255, 255, 255, 0.08)', padding: '2px 6px', borderRadius: '4px' }}>
                    #{bIdx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Button: Check Answer or Next */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            {!isEvaluated ? (
              <button
                disabled={!allFilled}
                onClick={handleCheck}
                style={{
                  flex: 1,
                  padding: '0.9rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: allFilled ? 'linear-gradient(135deg, #facc15, #ca8a04)' : 'rgba(255, 255, 255, 0.08)',
                  color: allFilled ? '#000' : '#64748b',
                  fontSize: '1rem',
                  fontWeight: 800,
                  cursor: allFilled ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s ease',
                  boxShadow: allFilled ? '0 4px 20px rgba(250, 204, 21, 0.3)' : 'none'
                }}
              >
                {allFilled ? 'Periksa Jawaban ➔' : 'Isi Semua 4 Kotak Terlebih Dahulu'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                style={{
                  flex: 1,
                  padding: '0.9rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #38bdf8, #0284c7)',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(56, 189, 248, 0.3)'
                }}
              >
                Soal Berikutnya ➔
              </button>
            )}
          </div>

          {/* Evaluation & Explanation Panel */}
          {isEvaluated && (
            <div style={{
              background: isStarAnswerCorrect ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
              border: `1px solid ${isStarAnswerCorrect ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)'}`,
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              animation: 'fadeIn 0.25s ease'
            }}>
              {/* Verdict Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{isStarAnswerCorrect ? '🎉' : '❌'}</span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.15rem', color: isStarAnswerCorrect ? '#34d399' : '#f87171', fontWeight: 800 }}>
                      {isStarAnswerCorrect ? 'Jawaban Posisi Bintang (★) Benar!' : 'Posisi Bintang (★) Kurang Tepat!'}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      {isFullAnswerCorrect ? 'Susunan 4 potongan frasa sempurna 100%!' : 'Susunan kalimat utuh masih ada yang tertukar.'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => playSentenceAudio(currentQ.fullSentence)}
                  style={{
                    background: 'rgba(56, 189, 248, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    color: '#38bdf8',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  🔊 Dengarkan Audio
                </button>
              </div>

              {/* Complete Correct Sentence & Translation */}
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem 1.25rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
                  {currentQ.fullSentence}
                </div>
                <div style={{ fontSize: '0.88rem', color: '#94a3b8', fontStyle: 'italic' }}>
                  "{currentQ.translation}"
                </div>
              </div>

              {/* Grammatical Explanation (Bunpou Kaisetsu) */}
              <div style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                <strong>💡 Pembahasan Tata Bahasa (文法解説):</strong><br />
                {currentQ.explanation}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
