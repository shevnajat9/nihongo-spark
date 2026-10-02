import React, { useState, useMemo } from 'react';
import { clozeSentencesData } from '../data/clozeSentences';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function ClozeSentenceDrill() {
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL'); // 'ALL' | 'particle' | 'conjugation'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [stats, setStats] = useState({
    correct: 0,
    total: 0,
    streak: 0
  });

  // Filtered Question List
  const filteredQuestions = useMemo(() => {
    return clozeSentencesData.filter((q) => {
      const matchLevel = selectedLevel === 'ALL' || q.level === selectedLevel;
      const matchType = selectedType === 'ALL' || q.type === selectedType;
      return matchLevel && matchType;
    });
  }, [selectedLevel, selectedType]);

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Web Audio Sound Effects
  const playSfx = (isCorrect) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (isCorrect) {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(175, ctx.currentTime);
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

  // Speech Audio
  const playAudio = (text) => {
    playJapaneseSpeech(text, { rate: 0.9 });
  };

  const handleOptionSelect = (optionText) => {
    if (selectedAnswer !== null || !currentQ) return;
    const isCorrect = optionText === currentQ.target;
    setSelectedAnswer(optionText);
    playSfx(isCorrect);

    setStats((prev) => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1,
      streak: isCorrect ? prev.streak + 1 : 0
    }));

    if (currentQ.fullSentence) {
      playAudio(currentQ.fullSentence);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setCurrentIndex(0);
    }
    setSelectedAnswer(null);
  };

  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>
      
      {/* HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(6, 182, 212, 0.15))',
        border: '1px solid rgba(16, 185, 129, 0.3)',
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
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '6px',
              letterSpacing: '0.5px'
            }}>
              FASE 5 · FITUR 28
            </span>
            <span style={{ fontSize: '0.85rem', color: '#6ee7b7', fontWeight: 600 }}>
              Active Recall Partikel & Konjugasi
            </span>
          </div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.5px' }}>
            Cloze Test Partikel & Konjugasi <span style={{ color: '#34d399' }}>(穴埋め問題)</span>
          </h1>
          <p style={{ margin: '0.4rem 0 0', color: '#94a3b8', fontSize: '0.9rem', maxWidth: '650px', lineHeight: 1.5 }}>
            Uji refleks memilih partikel presisi (は, が, に, で, を, までに...) dan akhiran bentuk kata kerja langsung di tengah kalimat utuh.
          </p>
        </div>

        {/* Score & Streak Badges */}
        <div style={{ display: 'flex', gap: '1rem', background: 'rgba(15, 23, 42, 0.6)', padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Akurasi</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399' }}>{accuracy}%</div>
          </div>
          <div style={{ width: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Streak</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fbbf24' }}>🔥 {stats.streak}x</div>
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        {/* Level Filters */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8', marginRight: '0.2rem' }}>Level:</span>
          {['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => { setSelectedLevel(lvl); setCurrentIndex(0); setSelectedAnswer(null); }}
              style={{
                padding: '0.35rem 0.8rem',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: selectedLevel === lvl ? '#34d399' : 'rgba(255, 255, 255, 0.1)',
                background: selectedLevel === lvl ? 'rgba(16, 185, 129, 0.25)' : 'rgba(15, 23, 42, 0.6)',
                color: selectedLevel === lvl ? '#6ee7b7' : '#94a3b8',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Type Filters */}
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            onClick={() => { setSelectedType('ALL'); setCurrentIndex(0); setSelectedAnswer(null); }}
            style={{
              padding: '0.35rem 0.8rem',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: selectedType === 'ALL' ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)',
              background: selectedType === 'ALL' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.4)',
              color: selectedType === 'ALL' ? '#38bdf8' : '#94a3b8',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            Semua Tipe
          </button>
          <button
            onClick={() => { setSelectedType('particle'); setCurrentIndex(0); setSelectedAnswer(null); }}
            style={{
              padding: '0.35rem 0.8rem',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: selectedType === 'particle' ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)',
              background: selectedType === 'particle' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.4)',
              color: selectedType === 'particle' ? '#38bdf8' : '#94a3b8',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            Drill Partikel (助詞)
          </button>
          <button
            onClick={() => { setSelectedType('conjugation'); setCurrentIndex(0); setSelectedAnswer(null); }}
            style={{
              padding: '0.35rem 0.8rem',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: selectedType === 'conjugation' ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)',
              background: selectedType === 'conjugation' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.4)',
              color: selectedType === 'conjugation' ? '#38bdf8' : '#94a3b8',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            Drill Konjugasi (活用)
          </button>
        </div>
      </div>

      {/* QUESTION INTERACTIVE CARD */}
      {currentQ ? (
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
          {/* Top Question Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{
                background: 'rgba(16, 185, 129, 0.2)',
                color: '#34d399',
                fontWeight: 800,
                fontSize: '0.75rem',
                padding: '2px 8px',
                borderRadius: '6px',
                border: '1px solid rgba(16, 185, 129, 0.35)'
              }}>
                {currentQ.level}
              </span>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Soal {currentIndex + 1} dari {filteredQuestions.length}
              </span>
            </div>

            <span style={{ fontSize: '0.78rem', color: '#a5b4fc', background: 'rgba(99, 102, 241, 0.15)', padding: '2px 8px', borderRadius: '5px' }}>
              {currentQ.type === 'particle' ? 'Drill Partikel' : 'Drill Konjugasi'}
            </span>
          </div>

          {/* Main Cloze Sentence Box */}
          <div style={{
            background: 'rgba(30, 41, 59, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '1.45rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.6 }}>
              <span>{currentQ.beforeBlank}</span>
              <span style={{
                display: 'inline-block',
                margin: '0 0.5rem',
                padding: '2px 14px',
                borderRadius: '8px',
                border: selectedAnswer !== null
                  ? (selectedAnswer === currentQ.target ? '2px solid #10b981' : '2px solid #ef4444')
                  : '2px dashed #34d399',
                background: selectedAnswer !== null
                  ? (selectedAnswer === currentQ.target ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)')
                  : 'rgba(16, 185, 129, 0.1)',
                color: selectedAnswer !== null ? '#f8fafc' : '#34d399',
                fontWeight: 800,
                minWidth: '70px',
                textAlign: 'center'
              }}>
                {selectedAnswer !== null ? currentQ.target : '＿＿＿'}
              </span>
              <span>{currentQ.afterBlank}</span>
            </div>

            <div style={{ fontSize: '0.95rem', color: '#94a3b8', fontStyle: 'italic' }}>
              "{currentQ.translation}"
            </div>
          </div>

          {/* 4 Answer Option Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {currentQ.options.map((optText, idx) => {
              const isChosen = selectedAnswer === optText;
              const isTarget = optText === currentQ.target;
              let bg = 'rgba(30, 41, 59, 0.8)';
              let border = 'rgba(255, 255, 255, 0.12)';
              let textClr = '#f8fafc';

              if (selectedAnswer !== null) {
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
                  key={idx}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleOptionSelect(optText)}
                  style={{
                    padding: '1.25rem 1rem',
                    borderRadius: '14px',
                    border: `2px solid ${border}`,
                    background: bg,
                    color: textClr,
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    cursor: selectedAnswer === null ? 'pointer' : 'default',
                    transition: 'all 0.15s ease',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {optText}
                </button>
              );
            })}
          </div>

          {/* Feedback & Rule Explanation Box */}
          {selectedAnswer !== null && (
            <div style={{
              background: selectedAnswer === currentQ.target ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
              border: `1px solid ${selectedAnswer === currentQ.target ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)'}`,
              borderRadius: '14px',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              animation: 'fadeIn 0.2s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: selectedAnswer === currentQ.target ? '#34d399' : '#f87171' }}>
                  {selectedAnswer === currentQ.target ? '⭕ Tepat Sekali! Pilihan partikel/konjugasi benar!' : '❌ Belum Tepat!'}
                </div>

                <button
                  onClick={() => playAudio(currentQ.fullSentence)}
                  style={{
                    background: 'rgba(56, 189, 248, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    color: '#38bdf8',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  🔊 Audio Kalimat Utuh
                </button>
              </div>

              <div style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                <strong>💡 Kaidah Tata Bahasa:</strong><br />
                {currentQ.ruleExplanation}
              </div>

              <button
                onClick={handleNext}
                style={{
                  alignSelf: 'flex-end',
                  padding: '0.65rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  marginTop: '0.5rem'
                }}
              >
                Soal Berikutnya ➔
              </button>
            </div>
          )}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
          Tidak ada soal yang sesuai dengan filter yang dipilih.
        </div>
      )}
    </div>
  );
}
