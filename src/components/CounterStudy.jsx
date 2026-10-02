import React, { useState } from 'react';
import { countersData, counterQuizzes } from '../data/counters';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function CounterStudy() {
  const [activeTab, setActiveTab] = useState('calc'); // 'calc' | 'matrix' | 'quiz'
  const [selectedCounterId, setSelectedCounterId] = useState('hon');
  const [inputNumber, setInputNumber] = useState(3);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const selectedCounter = countersData.find(c => c.id === selectedCounterId) || countersData[0];

  // Play Japanese speech
  const playAudio = (text) => {
    playJapaneseSpeech(text, { rate: 0.9 });
  };

  // Calculate pronunciation for input number (supports 1..99)
  const getCalculatedReading = (num, counter) => {
    if (num < 1) num = 1;
    if (num > 99) num = 99;

    // Direct match if in table
    if (counter.readings[num]) {
      return counter.readings[num];
    }

    // Special cases
    if (counter.id === 'tsu' && num > 10) {
      return {
        kanji: `${num}個`,
        kana: `${num}こ`,
        romaji: `${num} ko`,
        note: 'Di atas 10, biasanya beralih menggunakan satuan 個 (ko).'
      };
    }

    if (num === 20 && counter.id === 'sai') {
      return counter.readings[20];
    }

    // For numbers 11-99, extract tens and units
    const tens = Math.floor(num / 10);
    const units = num % 10;

    const tensKanji = ['十', '二十', '三十', '四十', '五十', '六十', '七十', '八十', '九十'][tens - 1];
    const tensKana = ['じゅう', 'にじゅう', 'さんじゅう', 'よんじゅう', 'ごじゅう', 'ろくじゅう', 'ななじゅう', 'はちじゅう', 'きゅうじゅう'][tens - 1];
    const tensRomaji = ['juu', 'nijuu', 'sanjuu', 'yonjuu', 'gojuu', 'rokujuu', 'nanajuu', 'hachijuu', 'kyuujuu'][tens - 1];

    if (units === 0) {
      // 10, 20, 30...
      const baseTen = counter.readings[10];
      if (tens === 1) return baseTen;
      return {
        kanji: `${tensKanji}${counter.kanji}`,
        kana: `${tensKana.slice(0, -4)}${baseTen.kana}`,
        romaji: `${tensRomaji} ${baseTen.romaji}`,
        irregular: baseTen.irregular,
        note: `Puluhan genap mengikuti pola angka 10: ${baseTen.kana}`
      };
    }

    // Tens + Units reading
    const unitReading = counter.readings[units] || { kanji: `${units}${counter.kanji}`, kana: `${units}${counter.kanji}`, romaji: '' };
    return {
      kanji: `${tensKanji}${unitReading.kanji}`,
      kana: `${tensKana}${unitReading.kana}`,
      romaji: `${tensRomaji} ${unitReading.romaji}`,
      irregular: unitReading.irregular,
      note: unitReading.note || 'Reguler gabungan puluhan dan satuan'
    };
  };

  const calculatedResult = getCalculatedReading(inputNumber, selectedCounter);

  // Handle Quiz selection
  const handleSelectQuizOption = (optionIndex) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex);
    if (optionIndex === counterQuizzes[quizIndex].correctIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    if (quizIndex + 1 < counterQuizzes.length) {
      setQuizIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(234, 88, 12, 0.15))',
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
            <span style={{ fontSize: '1.8rem' }}>🔢</span>
            <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc', fontWeight: 800 }}>
              Kalkulator & Satuan Hitung (助数詞 Joshuushi)
            </h1>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', maxWidth: '600px' }}>
            Kuasai 14+ satuan hitung benda Jepang, pahami mutasi fonetik (Rendaku & Sokuon), dan uji hafalanmu dengan kuis interaktif.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '0.25rem', gap: '0.25rem' }}>
          <button
            onClick={() => setActiveTab('calc')}
            style={{
              background: activeTab === 'calc' ? '#f59e0b' : 'transparent',
              color: activeTab === 'calc' ? '#000' : '#94a3b8',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            🧮 Kalkulator
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            style={{
              background: activeTab === 'matrix' ? '#f59e0b' : 'transparent',
              color: activeTab === 'matrix' ? '#000' : '#94a3b8',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            📊 Matriks 1–10
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            style={{
              background: activeTab === 'quiz' ? '#f59e0b' : 'transparent',
              color: activeTab === 'quiz' ? '#000' : '#94a3b8',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            🎯 Latihan Kuis
          </button>
        </div>
      </div>

      {/* TAB 1: KALKULATOR SATUAN HITUNG */}
      {activeTab === 'calc' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Quick Counter Grid Selection */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '0.6rem'
          }}>
            {countersData.map(c => {
              const isSelected = c.id === selectedCounterId;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCounterId(c.id)}
                  style={{
                    background: isSelected ? 'rgba(245, 158, 11, 0.2)' : 'var(--card-bg, #1e293b)',
                    border: `1.5px solid ${isSelected ? '#f59e0b' : 'rgba(255, 255, 255, 0.08)'}`,
                    borderRadius: '12px',
                    padding: '0.75rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: isSelected ? '#fbbf24' : '#f8fafc' }}>
                    {c.kanji}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: isSelected ? '#fef3c7' : '#94a3b8', fontWeight: 600, marginTop: '0.1rem' }}>
                    {c.name.split(' ')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Calculator Card */}
          <div style={{
            background: 'var(--card-bg, #1e293b)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            {/* Input Row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: 600 }}>
                  Jumlah / Angka (1–99):
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => setInputNumber(Math.max(1, inputNumber - 1))}
                    style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1rem' }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={inputNumber}
                    onChange={(e) => setInputNumber(Math.min(99, Math.max(1, parseInt(e.target.value) || 1)))}
                    style={{
                      width: '80px',
                      textAlign: 'center',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      padding: '0.45rem',
                      color: 'white',
                      fontSize: '1.2rem',
                      fontWeight: 700
                    }}
                  />
                  <button
                    onClick={() => setInputNumber(Math.min(99, inputNumber + 1))}
                    style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1rem' }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '0.4rem' }}>
                  Preset Cepat:
                </span>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  {[1, 2, 3, 4, 6, 8, 10, 20].map(p => (
                    <button
                      key={p}
                      onClick={() => setInputNumber(p)}
                      style={{
                        background: inputNumber === p ? '#f59e0b' : 'rgba(255, 255, 255, 0.06)',
                        color: inputNumber === p ? '#000' : '#e2e8f0',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.35rem 0.6rem',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Big Result Display */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '14px',
              padding: '1.75rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              {/* Phonetic Badge */}
              {calculatedResult.irregular && (
                <span style={{
                  background: calculatedResult.irregular === 'rendaku' ? 'rgba(245, 158, 11, 0.2)' :
                    calculatedResult.irregular === 'sokuon' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                  color: calculatedResult.irregular === 'rendaku' ? '#fbbf24' :
                    calculatedResult.irregular === 'sokuon' ? '#f87171' : '#818cf8',
                  padding: '0.25rem 0.8rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  border: '1px solid currentColor'
                }}>
                  {calculatedResult.irregular === 'rendaku' && '⚡ Rendaku (Pergeseran Voiced Sound)'}
                  {calculatedResult.irregular === 'sokuon' && '⚡ Sokuon (Konsonan Ganda)'}
                  {calculatedResult.irregular === 'special' && '🌟 Bentuk Khusus (Irregular / Wago)'}
                </span>
              )}

              {/* Japanese Result */}
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#fbbf24', letterSpacing: '1px' }}>
                {calculatedResult.kanji}
              </div>

              {/* Reading & Romaji */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#f8fafc' }}>
                  【{calculatedResult.kana}】
                </span>
                <span style={{ fontSize: '1rem', color: '#94a3b8' }}>
                  ({calculatedResult.romaji})
                </span>
                <button
                  onClick={() => playAudio(calculatedResult.kana || calculatedResult.kanji)}
                  title="Dengarkan Pelafalan"
                  style={{
                    background: 'rgba(245, 158, 11, 0.2)',
                    color: '#fbbf24',
                    border: '1px solid rgba(245, 158, 11, 0.4)',
                    borderRadius: '8px',
                    padding: '0.4rem 0.75rem',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  🔊
                </button>
              </div>

              {/* Note */}
              {calculatedResult.note && (
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1', background: 'rgba(0,0,0,0.25)', padding: '0.4rem 0.9rem', borderRadius: '6px' }}>
                  💡 {calculatedResult.note}
                </div>
              )}
            </div>

            {/* Counter Description & Usage */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.3rem' }}>
                {selectedCounter.name} ({selectedCounter.category})
              </div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.6rem' }}>
                {selectedCounter.description}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#e2e8f0', fontWeight: 600 }}>Contoh Benda:</span>
                {selectedCounter.examples.map((ex, i) => (
                  <span key={i} style={{ background: 'rgba(255, 255, 255, 0.08)', color: '#cbd5e1', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MATRIKS PERUBAHAN BUNYI 1–10 */}
      {activeTab === 'matrix' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Matrix Legend */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.25rem',
            fontSize: '0.8rem',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: 700, color: '#f8fafc' }}>Keterangan Warna:</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#10b981' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></span>
              Reguler
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#f87171' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f87171' }}></span>
              Sokuon (Konsonan Ganda)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#fbbf24' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fbbf24' }}></span>
              Rendaku (Voiced Sound)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#818cf8' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#818cf8' }}></span>
              Bentuk Khusus (Wago)
            </span>
          </div>

          {/* Table Container */}
          <div style={{
            background: 'var(--card-bg, #1e293b)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            overflowX: 'auto'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(0, 0, 0, 0.3)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <th style={{ padding: '0.8rem 1rem', color: '#94a3b8' }}>Satuan</th>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Tanya'].map(h => (
                    <th key={h} style={{ padding: '0.8rem 0.6rem', color: '#f8fafc', textAlign: 'center' }}>
                      {h === 'Tanya' ? '何...' : `${h}`}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {countersData.map(c => (
                  <tr key={c.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                    <td style={{ padding: '0.8rem 1rem', fontWeight: 700, color: '#fbbf24', whiteSpace: 'nowrap' }}>
                      {c.kanji} <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>({c.name.split(' ')[0]})</span>
                    </td>

                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'question'].map(num => {
                      const item = c.readings[num];
                      if (!item) return <td key={num} style={{ padding: '0.6rem', textAlign: 'center', color: '#475569' }}>-</td>;

                      let cellBg = 'rgba(255, 255, 255, 0.02)';
                      let textColor = '#e2e8f0';

                      if (item.irregular === 'sokuon') {
                        cellBg = 'rgba(239, 68, 68, 0.12)';
                        textColor = '#fca5a5';
                      } else if (item.irregular === 'rendaku') {
                        cellBg = 'rgba(245, 158, 11, 0.12)';
                        textColor = '#fde047';
                      } else if (item.irregular === 'special') {
                        cellBg = 'rgba(99, 102, 241, 0.15)';
                        textColor = '#a5b4fc';
                      }

                      return (
                        <td
                          key={num}
                          onClick={() => playAudio(item.kana)}
                          title={`${item.kanji} (${item.romaji}) - Klik untuk dengar`}
                          style={{
                            padding: '0.5rem 0.4rem',
                            textAlign: 'center',
                            background: cellBg,
                            cursor: 'pointer',
                            transition: 'all 0.1s ease',
                            borderLeft: '1px solid rgba(255, 255, 255, 0.02)'
                          }}
                        >
                          <div style={{ fontWeight: 600, color: textColor, fontSize: '0.85rem' }}>
                            {item.kanji}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                            {item.kana}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: DRILL / KUIS JOSHUUSHI */}
      {activeTab === 'quiz' && (
        <div style={{
          background: 'var(--card-bg, #1e293b)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '2rem',
          maxWidth: '680px',
          margin: '0 auto',
          width: '100%'
        }}>
          {!quizFinished ? (
            <div>
              {/* Progress Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  Soal {quizIndex + 1} dari {counterQuizzes.length}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#fbbf24', fontWeight: 600 }}>
                  Skor: {quizScore}
                </span>
              </div>

              {/* Question */}
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                {counterQuizzes[quizIndex].question}
              </div>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {counterQuizzes[quizIndex].options.map((option, idx) => {
                  const isCorrect = idx === counterQuizzes[quizIndex].correctIndex;
                  const isUserSelected = idx === selectedAnswer;

                  let optBg = 'rgba(255, 255, 255, 0.04)';
                  let optBorder = 'rgba(255, 255, 255, 0.1)';

                  if (selectedAnswer !== null) {
                    if (isCorrect) {
                      optBg = 'rgba(16, 185, 129, 0.2)';
                      optBorder = '#10b981';
                    } else if (isUserSelected) {
                      optBg = 'rgba(239, 68, 68, 0.2)';
                      optBorder = '#ef4444';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizOption(idx)}
                      disabled={selectedAnswer !== null}
                      style={{
                        background: optBg,
                        border: `1.5px solid ${optBorder}`,
                        borderRadius: '10px',
                        padding: '1rem',
                        textAlign: 'left',
                        color: '#f8fafc',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        cursor: selectedAnswer === null ? 'pointer' : 'default',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next */}
              {selectedAnswer !== null && (
                <div style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderLeft: `4px solid ${selectedAnswer === counterQuizzes[quizIndex].correctIndex ? '#10b981' : '#ef4444'}`,
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ fontSize: '0.9rem', color: '#f1f5f9', lineHeight: 1.5 }}>
                    💡 {counterQuizzes[quizIndex].explanation}
                  </div>
                  <div style={{ marginTop: '0.8rem', textAlign: 'right' }}>
                    <button
                      onClick={handleNextQuiz}
                      style={{
                        background: '#f59e0b',
                        color: '#000',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.6rem 1.25rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {quizIndex + 1 < counterQuizzes.length ? 'Lanjut ke Soal Berikutnya →' : 'Lihat Hasil Akhir'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Results */
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏆</div>
              <h2 style={{ fontSize: '1.5rem', color: '#f8fafc', margin: '0 0 0.5rem 0' }}>Latihan Selesai!</h2>
              <p style={{ color: '#94a3b8', margin: '0 0 1.5rem 0' }}>
                Kamu berhasil menjawab <strong style={{ color: '#fbbf24' }}>{quizScore}</strong> dari {counterQuizzes.length} soal dengan benar.
              </p>
              <button
                onClick={handleResetQuiz}
                style={{
                  background: '#f59e0b',
                  color: '#000',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.75rem 1.5rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Ulangi Kuis
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
