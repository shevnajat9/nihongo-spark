import React, { useState } from 'react';
import { casualSpeechRules, casualQuizData } from '../data/casualSpeech';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function CasualSpeechLab() {
  const [activeTab, setActiveTab] = useState('rules'); // 'rules' | 'converter' | 'quiz'
  const [selectedRuleId, setSelectedRuleId] = useState(casualSpeechRules[0].id);

  // Converter state
  const [inputVerbType, setInputVerbType] = useState('toku');
  const [selectedVerbPreset, setSelectedVerbPreset] = useState(0);

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const activeRule = casualSpeechRules.find(r => r.id === selectedRuleId) || casualSpeechRules[0];

  // Play Native Audio
  const playNativeAudio = (text, rate = 1.0) => {
    playJapaneseSpeech(text, { rate });
  };

  // Preset verbs for conversion simulator
  const CONVERSION_PRESETS = [
    { base: '買う (membeli)', teForm: '買って', toku: '買っとく', chau: '買っちゃう', nakya: '買わなきゃ', teru: '買ってる', chadame: '買っちゃだめ' },
    { base: '飲む (meminum)', teForm: '飲んで', toku: '飲んどく', chau: '飲んじゃう', nakya: '飲まなきゃ', teru: '飲んでる', chadame: '飲んじゃだめ' },
    { base: '食べる (makan)', teForm: '食べて', toku: '食べとく', chau: '食べちゃう', nakya: '食べなきゃ', teru: '食べてる', chadame: '食べちゃだめ' },
    { base: '行く (pergi)', teForm: '行って', toku: '行っとく', chau: '行っちゃう', nakya: '行かなきゃ', teru: '行ってる', chadame: '行っちゃだめ' },
    { base: 'する (melakukan)', teForm: 'して', toku: 'しとく', chau: 'しちゃう', nakya: 'しなきゃ', teru: 'してる', chadame: 'しちゃだめ' },
    { base: '見る (melihat)', teForm: '見て', toku: '見とく', chau: '見ちゃう', nakya: '見なきゃ', teru: '見てる', chadame: '見ちゃだめ' }
  ];

  const currentPreset = CONVERSION_PRESETS[selectedVerbPreset];

  // Handle Quiz answer
  const handleAnswerSelect = (idx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    if (idx === casualQuizData[quizIdx].correctIdx) {
      setScore(s => s + 1);
    }
  };

  const handleNextQuiz = () => {
    if (quizIdx + 1 < casualQuizData.length) {
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
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(239, 68, 68, 0.15))',
        border: '1px solid rgba(245, 158, 11, 0.3)',
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
            <span style={{ fontSize: '1.8rem' }}>💬</span>
            <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc', fontWeight: 800 }}>
              Laboratorium Kontraksi Bahasa Lisan (口語短縮形)
            </h1>
            <span style={{
              background: 'rgba(245, 158, 11, 0.25)',
              color: '#fbbf24',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: '1px solid rgba(245, 158, 11, 0.4)'
            }}>
              Bahasa Anime & Chokai
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', maxWidth: '650px' }}>
            Penutur asli Jepang jarang menggunakan bentuk baku buku teks saat mengobrol. Pahami cara 〜ておく menjadi 〜とく, 〜てしまう menjadi 〜ちゃう, dan latih pendengaran Anda agar tidak bingung saat ujian Listening JLPT!
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '0.25rem', gap: '0.25rem' }}>
          {[
            { id: 'rules', label: '📖 Pola Utama' },
            { id: 'converter', label: '⚡ Simulator' },
            { id: 'quiz', label: '🎧 Kuis Listening' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'var(--primary, #6366f1)' : 'transparent',
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

      {/* TAB 1: POLA UTAMA (RULES CATALOG) */}
      {activeTab === 'rules' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Rule Selector Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.4rem' }}>
            {casualSpeechRules.map((rule) => {
              const isSelected = rule.id === selectedRuleId;
              return (
                <button
                  key={rule.id}
                  onClick={() => setSelectedRuleId(rule.id)}
                  style={{
                    background: isSelected ? '#f59e0b' : 'rgba(255, 255, 255, 0.05)',
                    color: isSelected ? '#1e293b' : '#cbd5e1',
                    border: `1px solid ${isSelected ? '#f59e0b' : 'rgba(255, 255, 255, 0.1)'}`,
                    borderRadius: '10px',
                    padding: '0.55rem 1.1rem',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {rule.title}
                </button>
              );
            })}
          </div>

          {/* Detailed Rule Card */}
          <div style={{
            background: 'var(--card-bg, #1e293b)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
              <div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#fbbf24',
                  background: 'rgba(245, 158, 11, 0.15)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '6px'
                }}>
                  {activeRule.category}
                </span>
                <h2 style={{ margin: '0.4rem 0 0 0', fontSize: '1.4rem', color: '#f8fafc', fontWeight: 800 }}>
                  {activeRule.pattern}
                </h2>
              </div>

              {activeRule.pastTitle && (
                <div style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '0.82rem',
                  color: '#94a3b8'
                }}>
                  Bentuk Lampau: <strong style={{ color: '#fbbf24' }}>{activeRule.pastTitle}</strong>
                </div>
              )}
            </div>

            <p style={{ margin: 0, fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.6 }}>
              {activeRule.explanation}
            </p>

            <div style={{
              background: 'rgba(56, 189, 248, 0.08)',
              borderLeft: '4px solid #38bdf8',
              borderRadius: '4px 8px 8px 4px',
              padding: '0.7rem 1rem',
              fontSize: '0.85rem',
              color: '#bae6fd'
            }}>
              💡 <strong>Nuansa Komunikasi:</strong> {activeRule.nuance}
            </div>

            {/* Example Sentences */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '0.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                Contoh Perbandingan Kalimat Formal vs Singkatan Kasual:
              </div>

              {activeRule.examples.map((eg, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(0, 0, 0, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '12px',
                    padding: '1.1rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1rem',
                    alignItems: 'center'
                  }}
                >
                  {/* Formal Side */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8', background: 'rgba(255, 255, 255, 0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>
                        FORMAL (Baku)
                      </span>
                      <button
                        onClick={() => playNativeAudio(eg.formal, 0.9)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: '#94a3b8' }}
                        title="Dengarkan formal"
                      >
                        🔊
                      </button>
                    </div>
                    <div style={{ fontSize: '1.05rem', color: '#cbd5e1', fontWeight: 600 }}>
                      {eg.formal}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      {eg.romajiFormal}
                    </div>
                  </div>

                  {/* Casual Side */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: '0.72rem', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.2)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>
                        KASUAL (Singkat)
                      </span>
                      <button
                        onClick={() => playNativeAudio(eg.casual, 1.0)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: '#fbbf24' }}
                        title="Dengarkan kasual"
                      >
                        🔊
                      </button>
                    </div>
                    <div style={{ fontSize: '1.2rem', color: '#f8fafc', fontWeight: 700 }}>
                      {eg.casual}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                      {eg.romajiCasual}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#a7f3d0', marginTop: '0.2rem' }}>
                      {eg.meaning}
                    </div>
                    {eg.situation && (
                      <div style={{ fontSize: '0.72rem', color: '#64748b', fontStyle: 'italic', marginTop: '0.2rem' }}>
                        Konteks: {eg.situation}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SIMULATOR KONVERSI KASUAL */}
      {activeTab === 'converter' && (
        <div style={{
          background: 'var(--card-bg, #1e293b)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <div>
            <h2 style={{ margin: '0 0 0.3rem 0', fontSize: '1.3rem', color: '#f8fafc', fontWeight: 700 }}>
              ⚡ Simulator Transformasi Morfologi Kata Kerja
            </h2>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#94a3b8' }}>
              Pilih kata kerja dasar dan amati bagaimana morfologi akhiran berubah saat disingkat dalam berbagai pola lisan.
            </p>
          </div>

          {/* Verb Selector Buttons */}
          <div>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 600 }}>
              Pilih Contoh Kata Kerja:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {CONVERSION_PRESETS.map((v, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedVerbPreset(idx)}
                  style={{
                    background: selectedVerbPreset === idx ? 'var(--primary, #6366f1)' : 'rgba(255, 255, 255, 0.05)',
                    color: selectedVerbPreset === idx ? '#fff' : '#cbd5e1',
                    border: `1px solid ${selectedVerbPreset === idx ? 'var(--primary, #6366f1)' : 'rgba(255, 255, 255, 0.1)'}`,
                    borderRadius: '8px',
                    padding: '0.5rem 1rem',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {v.base}
                </button>
              ))}
            </div>
          </div>

          {/* Contraction Type Selector */}
          <div>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 600 }}>
              Pilih Bentuk Singkatan:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.6rem' }}>
              {[
                { id: 'toku', label: '〜とく', sub: 'Persiapan (〜ておく)' },
                { id: 'chau', label: '〜ちゃう', sub: 'Tuntas/Menyesal (〜てしまう)' },
                { id: 'nakya', label: '〜なきゃ', sub: 'Keharusan (〜なければ)' },
                { id: 'teru', label: '〜てる', sub: 'Status Sedang (〜ている)' },
                { id: 'chadame', label: '〜ちゃだめ', sub: 'Larangan (〜てはいけない)' }
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setInputVerbType(b.id)}
                  style={{
                    background: inputVerbType === b.id ? 'rgba(245, 158, 11, 0.2)' : 'rgba(0, 0, 0, 0.25)',
                    border: `1.5px solid ${inputVerbType === b.id ? '#f59e0b' : 'rgba(255, 255, 255, 0.08)'}`,
                    borderRadius: '10px',
                    padding: '0.7rem',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: inputVerbType === b.id ? '#fbbf24' : '#e2e8f0' }}>
                    {b.label}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{b.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Visual Transformation Box */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1.5px dashed rgba(245, 158, 11, 0.4)',
            borderRadius: '14px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Alur Pergeseran Fonem Lisan
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '0.8rem 1.4rem',
                borderRadius: '10px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.2rem' }}>Bentuk Baku</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#cbd5e1' }}>
                  {currentPreset.teForm}
                  {inputVerbType === 'toku' ? 'おく' : inputVerbType === 'chau' ? 'しまう' : inputVerbType === 'nakya' ? 'なければ' : inputVerbType === 'teru' ? 'いる' : 'はいけない'}
                </div>
              </div>

              <span style={{ fontSize: '1.8rem', color: '#f59e0b' }}>➔</span>

              <div style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(239, 68, 68, 0.25))',
                border: '1px solid #f59e0b',
                padding: '0.8rem 1.6rem',
                borderRadius: '10px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#fbbf24', marginBottom: '0.2rem', fontWeight: 700 }}>Bentuk Singkat Kasual</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#f8fafc' }}>
                  {currentPreset[inputVerbType]}
                </div>
              </div>
            </div>

            <button
              onClick={() => playNativeAudio(currentPreset[inputVerbType])}
              style={{
                background: 'rgba(245, 158, 11, 0.2)',
                color: '#fbbf24',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                borderRadius: '8px',
                padding: '0.5rem 1.2rem',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginTop: '0.4rem'
              }}
            >
              <span>🔊</span>
              <span>Dengarkan Pengucapan Singkat</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: KUIS LISTENING (DE-CONTRACTION DRILL) */}
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
              {/* Quiz Header & Progress */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
                  Soal {quizIdx + 1} dari {casualQuizData.length}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#fbbf24', fontWeight: 700 }}>
                  Skor: {score}
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${((quizIdx + 1) / casualQuizData.length) * 100}%`,
                  background: '#f59e0b',
                  transition: 'width 0.3s ease'
                }} />
              </div>

              {/* Spoken Sentence Display with Audio */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '1.5rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.6rem'
              }}>
                <button
                  onClick={() => playNativeAudio(casualQuizData[quizIdx].audioText, 0.95)}
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: '#1e293b',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '0.6rem 1.4rem',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                  }}
                >
                  <span>🔊</span>
                  <span>Putar Audio Kasual</span>
                </button>

                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.4rem' }}>
                  「{casualQuizData[quizIdx].casualSentence}」
                </div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  {casualQuizData[quizIdx].romaji}
                </div>
              </div>

              {/* Question */}
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#cbd5e1' }}>
                ❓ {casualQuizData[quizIdx].question}
              </div>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {casualQuizData[quizIdx].options.map((opt, oIdx) => {
                  let btnBg = 'rgba(255, 255, 255, 0.04)';
                  let btnBorder = 'rgba(255, 255, 255, 0.1)';
                  let btnColor = '#f8fafc';

                  if (selectedAnswer !== null) {
                    if (oIdx === casualQuizData[quizIdx].correctIdx) {
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
                  borderLeft: `4px solid ${selectedAnswer === casualQuizData[quizIdx].correctIdx ? '#10b981' : '#ef4444'}`,
                  borderRadius: '4px 8px 8px 4px',
                  padding: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.8rem'
                }}>
                  <div style={{ fontSize: '0.88rem', color: '#cbd5e1', maxWidth: '650px' }}>
                    💡 <strong>Penjelasan:</strong> {casualQuizData[quizIdx].explanation}
                  </div>

                  <button
                    onClick={handleNextQuiz}
                    style={{
                      background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.55rem 1.25rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {quizIdx + 1 < casualQuizData.length ? 'Soal Berikutnya ➔' : 'Lihat Hasil ➔'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '3rem' }}>🎉</div>
              <h2 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc', fontWeight: 800 }}>
                Kuis Kontraksi Bahasa Lisan Selesai!
              </h2>
              <p style={{ margin: 0, fontSize: '1rem', color: '#94a3b8' }}>
                Skor Anda: <strong style={{ color: '#fbbf24', fontSize: '1.3rem' }}>{score} / {casualQuizData.length}</strong>
              </p>
              <button
                onClick={handleRestartQuiz}
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: '#1e293b',
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
