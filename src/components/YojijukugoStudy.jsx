import React, { useState } from 'react';
import { yojijukugoList, yojijukugoQuizData } from '../data/yojijukugo';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function YojijukugoStudy() {
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'puzzle' | 'quiz'
  const [selectedId, setSelectedId] = useState(yojijukugoList[0].id);

  // Puzzle interactive state
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [userTiles, setUserTiles] = useState([]);
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const activeItem = yojijukugoList.find(y => y.id === selectedId) || yojijukugoList[0];
  const currentPuzzle = yojijukugoQuizData[puzzleIdx];

  // Play Native Speech Audio
  const playNativeAudio = (text, rate = 0.95) => {
    playJapaneseSpeech(text, { rate });
  };

  // Puzzle handlers
  const handleTileClick = (char, origIdx) => {
    if (userTiles.some(t => t.origIdx === origIdx)) {
      // Remove tile if already picked
      setUserTiles(prev => prev.filter(t => t.origIdx !== origIdx));
      setPuzzleSolved(false);
    } else {
      const newTiles = [...userTiles, { char, origIdx }];
      setUserTiles(newTiles);
      if (newTiles.length === 4) {
        const formed = newTiles.map(t => t.char).join('');
        const target = currentPuzzle.correctOrder.join('');
        if (formed === target) {
          setPuzzleSolved(true);
        }
      }
    }
  };

  const handleResetPuzzle = () => {
    setUserTiles([]);
    setPuzzleSolved(false);
  };

  const handleNextPuzzle = () => {
    const nextIdx = (puzzleIdx + 1) % yojijukugoQuizData.length;
    setPuzzleIdx(nextIdx);
    setUserTiles([]);
    setPuzzleSolved(false);
  };

  // Quiz handlers
  const handleAnswerSelect = (idx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    if (idx === yojijukugoQuizData[quizIdx].correctIdx) {
      setScore(s => s + 1);
    }
  };

  const handleNextQuiz = () => {
    if (quizIdx + 1 < yojijukugoQuizData.length) {
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
        background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.15), rgba(180, 83, 9, 0.15))',
        border: '1px solid rgba(217, 119, 6, 0.3)',
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
            <span style={{ fontSize: '1.8rem' }}>🀄</span>
            <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc', fontWeight: 800 }}>
              Ensiklopedia Peribahasa 4 Karakter (四字熟語)
            </h1>
            <span style={{
              background: 'rgba(217, 119, 6, 0.25)',
              color: '#fbbf24',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: '1px solid rgba(217, 119, 6, 0.4)'
            }}>
              Kearifan & Sastra Jepang
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', maxWidth: '650px' }}>
            四字熟語 (Yojijukugo) adalah ungkapan bijak 4 kanji yang memadatkan filosofi mendalam, asal-usul sejarah, dan etos kehidupan bangsa Jepang.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '0.25rem', gap: '0.25rem' }}>
          {[
            { id: 'list', label: '📖 Katalog Peribahasa' },
            { id: 'puzzle', label: '🧩 Kanji Puzzle' },
            { id: 'quiz', label: '🎯 Kuis Evaluasi' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? '#d97706' : 'transparent',
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

      {/* TAB 1: KATALOG PERIBAHASA */}
      {activeTab === 'list' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {/* List Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
              Daftar Yojijukugo Kunci:
            </div>
            {yojijukugoList.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  style={{
                    background: isSelected ? 'rgba(217, 119, 6, 0.2)' : 'var(--card-bg, #1e293b)',
                    border: `1.5px solid ${isSelected ? '#d97706' : 'rgba(255, 255, 255, 0.06)'}`,
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 900, color: isSelected ? '#fbbf24' : '#f8fafc', letterSpacing: '2px' }}>
                        {item.kanji}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#fbbf24', background: 'rgba(217, 119, 6, 0.15)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                        {item.theme}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                      {item.furigana} ({item.romaji})
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
            border: '1px solid rgba(217, 119, 6, 0.3)',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            {/* Top Display: 4-Kanji Blocks */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 700, textTransform: 'uppercase' }}>
                  {activeItem.theme}
                </span>
                <div style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                  {activeItem.furigana} • {activeItem.romaji}
                </div>
              </div>

              <button
                onClick={() => playNativeAudio(activeItem.kanji)}
                style={{
                  background: 'rgba(217, 119, 6, 0.2)',
                  color: '#fbbf24',
                  border: '1px solid rgba(217, 119, 6, 0.4)',
                  borderRadius: '8px',
                  padding: '0.45rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <span>🔊</span>
                <span>Lafal Yojijukugo</span>
              </button>
            </div>

            {/* Big 4-Kanji Grid Box */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0.6rem',
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
              borderRadius: '12px'
            }}>
              {Array.from(activeItem.kanji).map((char, cIdx) => (
                <div
                  key={cIdx}
                  style={{
                    background: 'rgba(217, 119, 6, 0.15)',
                    border: '1.5px solid rgba(217, 119, 6, 0.4)',
                    borderRadius: '10px',
                    padding: '0.8rem 0.2rem',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}
                >
                  <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#f8fafc', lineHeight: 1 }}>
                    {char}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#fbbf24', marginTop: '0.4rem', fontWeight: 600 }}>
                    {activeItem.kanjiBreakdown[cIdx]?.meaning}
                  </div>
                </div>
              ))}
            </div>

            {/* Meaning & Origin Story */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.25)',
              borderLeft: '4px solid #d97706',
              borderRadius: '4px 8px 8px 4px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem'
            }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc' }}>
                💡 Makna Filosofis:
              </div>
              <div style={{ fontSize: '0.95rem', color: '#a7f3d0', fontWeight: 600 }}>
                {activeItem.meaning}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6, marginTop: '0.3rem' }}>
                <strong>Asal-Usul Sejarah:</strong> {activeItem.originStory}
              </div>
            </div>

            {/* Example in Context */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              padding: '1rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                  Contoh Penggunaan Nyata:
                </span>
                <button
                  onClick={() => playNativeAudio(activeItem.exampleSentence)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: '#fbbf24' }}
                >
                  🔊
                </button>
              </div>
              <div style={{ fontSize: '1.05rem', color: '#f8fafc', fontWeight: 600 }}>
                {activeItem.exampleSentence}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                {activeItem.exampleRomaji}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '0.2rem' }}>
                {activeItem.exampleMeaning}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KANJI PUZZLE BOX */}
      {activeTab === 'puzzle' && (
        <div style={{
          background: 'var(--card-bg, #1e293b)',
          border: '1px solid rgba(217, 119, 6, 0.3)',
          borderRadius: '16px',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          textAlign: 'center'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 800, background: 'rgba(217, 119, 6, 0.2)', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
              Tantangan Teka-Teki Kanji 4 Karakter
            </span>
            <h2 style={{ margin: '0.4rem 0 0 0', fontSize: '1.4rem', color: '#f8fafc', fontWeight: 800 }}>
              Susun 4 Kanji Menjadi Peribahasa yang Benar
            </h2>
            <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.88rem', color: '#94a3b8', maxWidth: '600px' }}>
              Petunjuk Makna: <strong>"{currentPuzzle.meaning}"</strong>
            </p>
          </div>

          {/* Target 4 Slots */}
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center' }}>
            {[0, 1, 2, 3].map((slotIdx) => {
              const tile = userTiles[slotIdx];
              return (
                <div
                  key={slotIdx}
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '12px',
                    background: tile ? 'linear-gradient(135deg, rgba(217, 119, 6, 0.3), rgba(180, 83, 9, 0.3))' : 'rgba(0, 0, 0, 0.3)',
                    border: `2px ${tile ? 'solid #d97706' : 'dashed rgba(255, 255, 255, 0.2)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    fontWeight: 900,
                    color: '#f8fafc',
                    boxShadow: tile ? '0 4px 14px rgba(217, 119, 6, 0.3)' : 'none'
                  }}
                >
                  {tile ? tile.char : ''}
                </div>
              );
            })}
          </div>

          {/* Scrambled Source Tiles */}
          <div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 600 }}>
              Klik kanji di bawah untuk memasukkan ke dalam slot:
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center' }}>
              {currentPuzzle.kanjiPuzzle.map((char, idx) => {
                const isPicked = userTiles.some(t => t.origIdx === idx);
                return (
                  <button
                    key={idx}
                    onClick={() => handleTileClick(char, idx)}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '10px',
                      background: isPicked ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)',
                      border: `1.5px solid ${isPicked ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.25)'}`,
                      color: isPicked ? '#64748b' : '#f8fafc',
                      fontSize: '1.6rem',
                      fontWeight: 900,
                      cursor: isPicked ? 'default' : 'pointer',
                      transition: 'all 0.2s ease',
                      opacity: isPicked ? 0.4 : 1
                    }}
                  >
                    {char}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action buttons & feedback */}
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button
              onClick={handleResetPuzzle}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#cbd5e1',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              🔄 Reset Susunan
            </button>
            <button
              onClick={handleNextPuzzle}
              style={{
                background: 'linear-gradient(135deg, #d97706, #b45309)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 1.2rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Soal Teka-Teki Berikutnya ➔
            </button>
          </div>

          {puzzleSolved && (
            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1.5px solid #10b981',
              borderRadius: '12px',
              padding: '1rem 1.5rem',
              color: '#34d399',
              fontWeight: 800,
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}>
              <span>🎉</span>
              <span>Luar Biasa! Susunan Peribahasa「{currentPuzzle.correctOrder.join('')}」Tepat Sekali!</span>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: KUIS EVALUASI MAKNA */}
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
                  Soal {quizIdx + 1} dari {yojijukugoQuizData.length}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#fbbf24', fontWeight: 700 }}>
                  Skor: {score}
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${((quizIdx + 1) / yojijukugoQuizData.length) * 100}%`,
                  background: '#d97706',
                  transition: 'width 0.3s ease'
                }} />
              </div>

              {/* Question */}
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.5 }}>
                ❓ {yojijukugoQuizData[quizIdx].question}
              </div>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {yojijukugoQuizData[quizIdx].options.map((opt, oIdx) => {
                  let btnBg = 'rgba(255, 255, 255, 0.04)';
                  let btnBorder = 'rgba(255, 255, 255, 0.1)';
                  let btnColor = '#f8fafc';

                  if (selectedAnswer !== null) {
                    if (oIdx === yojijukugoQuizData[quizIdx].correctIdx) {
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
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        color: btnColor,
                        cursor: selectedAnswer === null ? 'pointer' : 'default',
                        transition: 'all 0.2s ease',
                        letterSpacing: '1px'
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
                  borderLeft: `4px solid ${selectedAnswer === yojijukugoQuizData[quizIdx].correctIdx ? '#10b981' : '#ef4444'}`,
                  borderRadius: '4px 8px 8px 4px',
                  padding: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.8rem'
                }}>
                  <div style={{ fontSize: '0.88rem', color: '#cbd5e1', maxWidth: '650px' }}>
                    💡 <strong>Bedah Kanji:</strong> {yojijukugoQuizData[quizIdx].explanation}
                  </div>

                  <button
                    onClick={handleNextQuiz}
                    style={{
                      background: 'linear-gradient(135deg, #d97706, #b45309)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.55rem 1.25rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {quizIdx + 1 < yojijukugoQuizData.length ? 'Soal Berikutnya ➔' : 'Lihat Hasil ➔'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '3rem' }}>🀄✨</div>
              <h2 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc', fontWeight: 800 }}>
                Kuis Peribahasa Yojijukugo Selesai!
              </h2>
              <p style={{ margin: 0, fontSize: '1rem', color: '#94a3b8' }}>
                Skor Anda: <strong style={{ color: '#fbbf24', fontSize: '1.3rem' }}>{score} / {yojijukugoQuizData.length}</strong>
              </p>
              <button
                onClick={handleRestartQuiz}
                style={{
                  background: 'linear-gradient(135deg, #d97706, #b45309)',
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
                🔄 Ulangi Kuis
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
