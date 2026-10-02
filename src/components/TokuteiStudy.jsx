import React, { useState } from 'react';
import { tokuteiSectors } from '../data/tokutei';
import { RubyText } from '../utils/furigana';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function TokuteiStudy() {
  const [activeSectorId, setActiveSectorId] = useState('kaigo');
  const [activeTab, setActiveTab] = useState('dialogue'); // 'dialogue' | 'vocab' | 'quiz'

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const activeSector = tokuteiSectors.find(s => s.id === activeSectorId) || tokuteiSectors[0];

  const playAudio = (text) => {
    playJapaneseSpeech(text, { rate: 0.9 });
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(168, 85, 247, 0.15))',
        border: '1px solid rgba(56, 189, 248, 0.3)',
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
            <span style={{ fontSize: '1.8rem' }}>💼</span>
            <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc', fontWeight: 800 }}>
              Bahasa Jepang Kerja Industri (特定技能 Tokutei Ginou / SSW)
            </h1>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', maxWidth: '650px' }}>
            Kuasai kosakata, standar keselamatan, etiket komunikasi, dan skenario percakapan nyata pada 4 sektor industri kerja Jepang.
          </p>
        </div>

        <div style={{
          background: 'rgba(56, 189, 248, 0.2)',
          color: '#38bdf8',
          padding: '0.4rem 0.8rem',
          borderRadius: '8px',
          fontSize: '0.85rem',
          fontWeight: 700,
          border: '1px solid rgba(56, 189, 248, 0.4)'
        }}>
          Siap Kerja & Ujian SSW
        </div>
      </div>

      {/* SECTOR PICKER TABS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '0.75rem'
      }}>
        {tokuteiSectors.map(sec => {
          const isSelected = sec.id === activeSectorId;
          return (
            <button
              key={sec.id}
              onClick={() => {
                setActiveSectorId(sec.id);
                setSelectedAnswers({});
                setSubmittedQuiz(false);
              }}
              style={{
                background: isSelected ? 'rgba(255, 255, 255, 0.08)' : 'var(--card-bg, #1e293b)',
                border: `2px solid ${isSelected ? sec.color : 'rgba(255, 255, 255, 0.08)'}`,
                borderRadius: '14px',
                padding: '1rem',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <span style={{ fontSize: '1.8rem' }}>{sec.icon}</span>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: isSelected ? sec.color : '#f8fafc' }}>
                  {sec.name.split(' ')[0]}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.1rem' }}>
                  {sec.name.includes('(') ? sec.name.substring(sec.name.indexOf('(')) : ''}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* SECTOR ACTIVE CARD & SUB-TABS */}
      <div style={{
        background: 'var(--card-bg, #1e293b)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        overflow: 'hidden'
      }}>
        {/* Sector Bar */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          background: 'rgba(0, 0, 0, 0.25)'
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#f8fafc', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{activeSector.icon}</span>
              <span>{activeSector.name}</span>
            </h2>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              {activeSector.description}
            </div>
          </div>

          {/* Sub Navigation */}
          <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '0.25rem', gap: '0.25rem' }}>
            <button
              onClick={() => setActiveTab('dialogue')}
              style={{
                background: activeTab === 'dialogue' ? activeSector.color : 'transparent',
                color: activeTab === 'dialogue' ? '#000' : '#94a3b8',
                border: 'none',
                borderRadius: '8px',
                padding: '0.45rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              🗣️ Dialog Kerja
            </button>
            <button
              onClick={() => setActiveTab('vocab')}
              style={{
                background: activeTab === 'vocab' ? activeSector.color : 'transparent',
                color: activeTab === 'vocab' ? '#000' : '#94a3b8',
                border: 'none',
                borderRadius: '8px',
                padding: '0.45rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              📚 Kosakata ({activeSector.vocabulary.length})
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              style={{
                background: activeTab === 'quiz' ? activeSector.color : 'transparent',
                color: activeTab === 'quiz' ? '#000' : '#94a3b8',
                border: 'none',
                borderRadius: '8px',
                padding: '0.45rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              🎯 Kuis Kasus SSW
            </button>
          </div>
        </div>

        {/* SUBTAB 1: DIALOGUE */}
        {activeTab === 'dialogue' && (
          <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {activeSector.dialogues.map((dlg, dIdx) => (
              <div key={dIdx} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
                    {dlg.title}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                    💡 Situasi: {dlg.situation}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {dlg.lines.map((line, lIdx) => (
                    <div
                      key={lIdx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px',
                        padding: '1rem 1.25rem',
                        border: '1px solid rgba(255, 255, 255, 0.06)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <span style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          color: activeSector.color,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 700
                        }}>
                          {line.speaker}
                        </span>
                        <button
                          onClick={() => playAudio(line.japanese)}
                          style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            color: '#e2e8f0',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '0.3rem 0.6rem',
                            cursor: 'pointer'
                          }}
                        >
                          🔊
                        </button>
                      </div>

                      <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f8fafc', lineHeight: 1.8 }}>
                        <RubyText text={line.japanese} reading={line.reading} />
                      </div>
                      <div style={{ fontSize: '0.88rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                        {line.indonesian}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SUBTAB 2: VOCABULARY */}
        {activeTab === 'vocab' && (
          <div style={{ padding: '1.75rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {activeSector.vocabulary.map((v, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}
              >
                <div>
                  <span style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    color: activeSector.color,
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 600
                  }}>
                    {v.category}
                  </span>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.3rem' }}>
                    {v.word}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                    【{v.reading}】• <span style={{ color: '#94a3b8' }}>{v.romaji}</span>
                  </div>
                  <div style={{ fontSize: '0.92rem', color: '#f1f5f9', fontWeight: 500, marginTop: '0.4rem' }}>
                    {v.meaning}
                  </div>
                </div>

                <button
                  onClick={() => playAudio(v.word)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    color: '#e2e8f0',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.4rem 0.65rem',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  🔊
                </button>
              </div>
            ))}
          </div>
        )}

        {/* SUBTAB 3: QUIZ */}
        {activeTab === 'quiz' && (
          <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {activeSector.quiz.map((q, qIdx) => {
              const userAnswer = selectedAnswers[qIdx];
              return (
                <div
                  key={qIdx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '1.5rem'
                  }}
                >
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {qIdx + 1}. {q.question}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAnswer === optIdx;
                      const isCorrect = q.correctIndex === optIdx;

                      let btnBg = 'rgba(255, 255, 255, 0.04)';
                      let btnBorder = 'rgba(255, 255, 255, 0.1)';

                      if (submittedQuiz) {
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
                          disabled={submittedQuiz}
                          onClick={() => setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                          style={{
                            background: btnBg,
                            border: `1.5px solid ${btnBorder}`,
                            borderRadius: '10px',
                            padding: '0.85rem 1rem',
                            textAlign: 'left',
                            color: '#f8fafc',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            cursor: submittedQuiz ? 'default' : 'pointer'
                          }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {submittedQuiz && (
                    <div style={{
                      marginTop: '1rem',
                      padding: '0.9rem',
                      background: 'rgba(0, 0, 0, 0.3)',
                      borderLeft: `4px solid ${userAnswer === q.correctIndex ? '#10b981' : '#ef4444'}`,
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      color: '#cbd5e1'
                    }}>
                      💡 {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}

            <div style={{ textAlign: 'center' }}>
              {!submittedQuiz ? (
                <button
                  disabled={Object.keys(selectedAnswers).length < activeSector.quiz.length}
                  onClick={() => setSubmittedQuiz(true)}
                  style={{
                    background: Object.keys(selectedAnswers).length < activeSector.quiz.length ? 'rgba(255, 255, 255, 0.1)' : activeSector.color,
                    color: Object.keys(selectedAnswers).length < activeSector.quiz.length ? '#94a3b8' : '#000',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.75rem 2rem',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    cursor: Object.keys(selectedAnswers).length < activeSector.quiz.length ? 'not-allowed' : 'pointer'
                  }}
                >
                  Periksa Jawaban
                </button>
              ) : (
                <button
                  onClick={() => { setSelectedAnswers({}); setSubmittedQuiz(false); }}
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
