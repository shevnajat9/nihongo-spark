import React, { useState, useEffect } from 'react';
import { bousaiTerms, yasashiiNihongoPairs, bousaiRucksackChecklist, bousaiQuizData } from '../data/bousai';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function BousaiStudy() {
  const [activeTab, setActiveTab] = useState('terms'); // 'terms' | 'yasashii' | 'rucksack' | 'quiz'
  const [selectedTermId, setSelectedTermId] = useState(bousaiTerms[0].id);

  // Rucksack Checklist state (persisted to localStorage)
  const [checklist, setChecklist] = useState(() => {
    try {
      const saved = localStorage.getItem('nihongo_spark_bousai_checklist');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return bousaiRucksackChecklist.map(item => ({ id: item.id, checked: false }));
  });

  useEffect(() => {
    try {
      localStorage.setItem('nihongo_spark_bousai_checklist', JSON.stringify(checklist));
    } catch {
      // ignore
    }
  }, [checklist]);

  const toggleChecklistItem = (id) => {
    setChecklist(prev =>
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const activeTerm = bousaiTerms.find(t => t.id === selectedTermId) || bousaiTerms[0];

  // Synthesize Web Audio Emergency Alert Chime (Offline, no external file needed)
  const playEmergencyChime = () => {
    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtxClass();
      if (ctx.state === 'suspended') ctx.resume();

      const tones = [
        { freq: 440, start: 0, duration: 0.25 },
        { freq: 554.37, start: 0.25, duration: 0.25 },
        { freq: 659.25, start: 0.5, duration: 0.35 }
      ];

      tones.forEach(t => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(t.freq, ctx.currentTime + t.start);

        gain.gain.setValueAtTime(0.2, ctx.currentTime + t.start);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t.start + t.duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + t.start);
        osc.stop(ctx.currentTime + t.start + t.duration);
      });
    } catch {
      // Fallback
    }
  };

  // Native Speech Audio
  const playNativeAudio = (text, rate = 0.95) => {
    playJapaneseSpeech(text, { rate });
  };

  // Calculate readiness percentage
  const totalItems = bousaiRucksackChecklist.length;
  const checkedCount = checklist.filter(c => c.checked).length;
  const readinessPct = Math.round((checkedCount / totalItems) * 100);

  // Quiz handlers
  const handleAnswerSelect = (idx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    if (idx === bousaiQuizData[quizIdx].correctIdx) {
      setScore(s => s + 1);
    }
  };

  const handleNextQuiz = () => {
    if (quizIdx + 1 < bousaiQuizData.length) {
      setQuizIdx(i => i + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizIdx(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER SECTION */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(245, 158, 11, 0.15))',
        border: '1px solid rgba(239, 68, 68, 0.3)',
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
            <span style={{ fontSize: '1.8rem' }}>🚨</span>
            <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc', fontWeight: 800 }}>
              Bahasa Tanggap Bencana & Yasashii Nihongo (防災)
            </h1>
            <span style={{
              background: 'rgba(239, 68, 68, 0.25)',
              color: '#f87171',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: '1px solid rgba(239, 68, 68, 0.4)'
            }}>
              Siaga Krisis 72 Jam
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', maxWidth: '650px' }}>
            Pahami bunyi sirine dan siaran darurat gempa/tsunami NHK, baca pengumuman krisis dalam standar bahasa Jepang sederhana (やさしい日本語), dan siapkan tas ransel siaga Anda.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '0.25rem', gap: '0.25rem' }}>
          {[
            { id: 'terms', label: '🚨 Istilah Darurat' },
            { id: 'yasashii', label: '📢 Yasashii Nihongo' },
            { id: 'rucksack', label: '🎒 Tas Siaga 72 Jam' },
            { id: 'quiz', label: '🎯 Kuis Mitigasi' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? '#ef4444' : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#94a3b8',
                border: 'none',
                borderRadius: '8px',
                padding: '0.45rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: ISTILAH DARURAT BENCANA */}
      {activeTab === 'terms' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {/* Terms List Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
              Pilih Istilah Mitigasi Bencana:
            </div>
            {bousaiTerms.map((term) => {
              const isSelected = term.id === selectedTermId;
              return (
                <div
                  key={term.id}
                  onClick={() => setSelectedTermId(term.id)}
                  style={{
                    background: isSelected ? 'rgba(239, 68, 68, 0.18)' : 'var(--card-bg, #1e293b)',
                    border: `1.5px solid ${isSelected ? '#ef4444' : 'rgba(255, 255, 255, 0.06)'}`,
                    borderRadius: '10px',
                    padding: '0.8rem 1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 800, color: isSelected ? '#f87171' : '#f8fafc' }}>
                        {term.kanji}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#ef4444', background: 'rgba(239, 68, 68, 0.15)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                        {term.level}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                      {term.meaning}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>➔</span>
                </div>
              );
            })}
          </div>

          {/* Active Detail Card */}
          <div style={{
            background: 'var(--card-bg, #1e293b)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem'
          }}>
            {/* Header info & Audio Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.8rem' }}>
              <div>
                <div style={{ fontSize: '0.85rem', color: '#f87171', fontWeight: 600, marginBottom: '0.2rem' }}>
                  {activeTerm.furigana} ({activeTerm.romaji})
                </div>
                <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#f8fafc', fontWeight: 800 }}>
                  {activeTerm.kanji}
                </h2>
                <div style={{ fontSize: '1rem', color: '#fbbf24', fontWeight: 600, marginTop: '0.2rem' }}>
                  {activeTerm.meaning}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={playEmergencyChime}
                  title="Simulasi nada lonceng peringatan darurat"
                  style={{
                    background: 'rgba(239, 68, 68, 0.2)',
                    color: '#f87171',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    borderRadius: '8px',
                    padding: '0.5rem 0.8rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <span>🔔</span>
                  <span>Nada Alarm</span>
                </button>

                <button
                  onClick={() => playNativeAudio(activeTerm.kanji)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '0.5rem 0.8rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  🔊 Baca
                </button>
              </div>
            </div>

            {/* In-depth explanation */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.25)',
              borderLeft: '4px solid #ef4444',
              borderRadius: '4px 8px 8px 4px',
              padding: '1rem',
              fontSize: '0.9rem',
              color: '#cbd5e1',
              lineHeight: 1.6
            }}>
              <strong style={{ color: '#f87171' }}>⚠️ Protokol Resmi & Makna Bencana:</strong>
              <div style={{ marginTop: '0.4rem' }}>{activeTerm.explanation}</div>
            </div>

            {/* Yasashii Nihongo version */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase' }}>
                  Versi Bahasa Jepang Sederhana (やさしい日本語):
                </span>
                <button
                  onClick={() => playNativeAudio(activeTerm.yasashiiNihongo, 0.88)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: '#34d399' }}
                >
                  🔊
                </button>
              </div>
              <div style={{ fontSize: '1.1rem', color: '#f8fafc', fontWeight: 600 }}>
                {activeTerm.yasashiiNihongo}
              </div>
            </div>

            {/* Recommended Action Steps */}
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Langkah Tanggap Cepat:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {activeTerm.actionSteps.map((step, idx) => (
                  <div key={idx} style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '0.6rem 0.9rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    color: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{ color: '#ef4444', fontWeight: 800 }}>•</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STANDAR YASASHII NIHONGO (PERBANDINGAN SIARAN DARURAT) */}
      {activeTab === 'yasashii' && (
        <div style={{
          background: 'var(--card-bg, #1e293b)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          <div>
            <h2 style={{ margin: '0 0 0.3rem 0', fontSize: '1.3rem', color: '#f8fafc', fontWeight: 700 }}>
              📢 Standar Bahasa Jepang Sederhana Saat Krisis (やさしい日本語)
            </h2>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#94a3b8' }}>
              Pemerintah Jepang dan stasiun TV NHK merilis siaran darurat dalam <em>Yasashii Nihongo</em> agar warga asing, lansia, dan anak-anak dapat memahami instruksi evakuasi tanpa bingung oleh kanji/istilah birokrasi yang rumit.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {yasashiiNihongoPairs.map((pair) => (
              <div
                key={pair.id}
                style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: '#ef4444',
                    background: 'rgba(239, 68, 68, 0.15)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px'
                  }}>
                    Topik: {pair.topic}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#a7f3d0', fontWeight: 600 }}>
                    {pair.meaning}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                  {/* Formal NHK side */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    padding: '0.9rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700 }}>
                        SIARAN FORMAL (NHK / PEMERINTAH)
                      </span>
                      <button
                        onClick={() => playNativeAudio(pair.formalNHK, 0.9)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}
                      >
                        🔊
                      </button>
                    </div>
                    <div style={{ fontSize: '1.1rem', color: '#cbd5e1', fontWeight: 600 }}>
                      {pair.formalNHK}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
                      {pair.formalReading}
                    </div>
                  </div>

                  {/* Yasashii Nihongo side */}
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1.5px solid #10b981',
                    borderRadius: '10px',
                    padding: '0.9rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 800 }}>
                        YASASHII NIHONGO (やさしい日本語 ✨)
                      </span>
                      <button
                        onClick={() => playNativeAudio(pair.yasashii, 0.88)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: '#34d399' }}
                      >
                        🔊
                      </button>
                    </div>
                    <div style={{ fontSize: '1.2rem', color: '#f8fafc', fontWeight: 800 }}>
                      {pair.yasashii}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#86efac', marginTop: '0.3rem' }}>
                      💡 {pair.keyDifferences}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TAS SIAGA BENCANA 72 JAM (CHECKLIST) */}
      {activeTab === 'rucksack' && (
        <div style={{
          background: 'var(--card-bg, #1e293b)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#f8fafc', fontWeight: 700 }}>
                🎒 Checklist Ransel Siaga Bencana 72 Jam (非常持ち出し袋)
              </h2>
              <span style={{
                background: readinessPct >= 80 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                color: readinessPct >= 80 ? '#34d399' : '#fbbf24',
                padding: '0.3rem 0.8rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 800
              }}>
                Kesiapan: {readinessPct}% ({checkedCount}/{totalItems})
              </span>
            </div>
            <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
              Bantuan SAR dan logistik kota membutuhkan waktu minimal 72 jam (3 hari) setelah gempa dahsyat. Centang barang-barang yang sudah Anda siapkan di ransel rumah Anda:
            </p>
          </div>

          {/* Progress bar */}
          <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${readinessPct}%`,
              background: readinessPct >= 80 ? '#10b981' : '#f59e0b',
              transition: 'width 0.3s ease'
            }} />
          </div>

          {/* Checklist items */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.7rem' }}>
            {bousaiRucksackChecklist.map((item) => {
              const checked = checklist.find(c => c.id === item.id)?.checked || false;
              return (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  style={{
                    background: checked ? 'rgba(16, 185, 129, 0.15)' : 'rgba(0, 0, 0, 0.25)',
                    border: `1.5px solid ${checked ? '#10b981' : 'rgba(255, 255, 255, 0.08)'}`,
                    borderRadius: '10px',
                    padding: '0.85rem 1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {}} // handled by parent div
                    style={{ width: '18px', height: '18px', accentColor: '#10b981', cursor: 'pointer' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: checked ? '#f8fafc' : '#cbd5e1' }}>
                      {item.label}
                    </div>
                    {item.essential && (
                      <span style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 700 }}>
                        ★ Wajib Ada
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: KUIS MITIGASI BENCANA */}
      {activeTab === 'quiz' && (
        <div style={{
          background: 'var(--card-bg, #1e293b)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {!quizFinished ? (
            <>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
                  Soal {quizIdx + 1} dari {bousaiQuizData.length}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: 700 }}>
                  Skor: {score}
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${((quizIdx + 1) / bousaiQuizData.length) * 100}%`,
                  background: '#ef4444',
                  transition: 'width 0.3s ease'
                }} />
              </div>

              {/* Question */}
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.5 }}>
                ❓ {bousaiQuizData[quizIdx].question}
              </div>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {bousaiQuizData[quizIdx].options.map((opt, oIdx) => {
                  let btnBg = 'rgba(255, 255, 255, 0.04)';
                  let btnBorder = 'rgba(255, 255, 255, 0.1)';
                  let btnColor = '#f8fafc';

                  if (selectedAnswer !== null) {
                    if (oIdx === bousaiQuizData[quizIdx].correctIdx) {
                      btnBg = 'rgba(16, 185, 129, 0.25)';
                      btnBorder = '#10b981';
                      btnColor = '#34d399';
                    } else if (selectedAnswer === oIdx) {
                      btnBg = 'rgba(239, 68, 68, 0.25)';
                      btnBorder = '#ef4444';
                      btnColor = '#f87171';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleAnswerSelect(oIdx)}
                      style={{
                        background: btnBg,
                        border: `1.5px solid ${btnBorder}`,
                        borderRadius: '10px',
                        padding: '0.85rem 1.1rem',
                        textAlign: 'left',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: btnColor,
                        cursor: selectedAnswer === null ? 'pointer' : 'default',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next */}
              {selectedAnswer !== null && (
                <div style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  borderLeft: `4px solid ${selectedAnswer === bousaiQuizData[quizIdx].correctIdx ? '#10b981' : '#ef4444'}`,
                  borderRadius: '4px 8px 8px 4px',
                  padding: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.8rem'
                }}>
                  <div style={{ fontSize: '0.88rem', color: '#cbd5e1', maxWidth: '650px' }}>
                    💡 <strong>Prosedur Keselamatan:</strong> {bousaiQuizData[quizIdx].explanation}
                  </div>

                  <button
                    onClick={handleNextQuiz}
                    style={{
                      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.55rem 1.25rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {quizIdx + 1 < bousaiQuizData.length ? 'Soal Berikutnya ➔' : 'Lihat Hasil ➔'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '3rem' }}>🚨🎒</div>
              <h2 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc', fontWeight: 800 }}>
                Kuis Mitigasi Bencana Selesai!
              </h2>
              <p style={{ margin: 0, fontSize: '1rem', color: '#94a3b8' }}>
                Skor Anda: <strong style={{ color: '#ef4444', fontSize: '1.3rem' }}>{score} / {bousaiQuizData.length}</strong>
              </p>
              <button
                onClick={handleRestartQuiz}
                style={{
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.7rem 1.8rem',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  marginTop: '0.5rem'
                }}
              >
                🔄 Ulangi Latihan
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
