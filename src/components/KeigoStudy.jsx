import React, { useState } from 'react';
import { keigoVerbs, interviewEtiquette, interviewQA } from '../data/keigo';
import { RubyText } from '../utils/furigana';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function KeigoStudy() {
  const [activeTab, setActiveTab] = useState('matrix'); // 'matrix' | 'interview' | 'quiz'

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);

  const playAudio = (text) => {
    playJapaneseSpeech(text, { rate: 0.88 });
  };

  const keigoQuizzes = [
    {
      question: 'Klien Anda (Bapak Sato) menanyakan perihal kehadiran direktur Anda. Kalimat yang tepat untuk diucapkan kepada klien adalah...',
      options: [
        '社長はただいま席にいらっしゃいません。',
        '社長の山田はただいま席を外しております。',
        '山田社長はご飯を召し上がっています。',
        '山田さんは今日来ません。'
      ],
      correctIndex: 1,
      explanation: 'Kepada orang luar/klien, kita merendahkan pihak sendiri (Kenjougo) dengan tidak memakai san/sama (cukup sebut nama "Yamada") dan kata kerja おります (oru - bentuk kenjou dari iru).'
    },
    {
      question: 'Saat mempersilakan tamu penting untuk mencicipi hidangan kue dan teh, ungkapan Sonkeigo yang benar adalah...',
      options: [
        'どうぞいただいてください。',
        'どうぞ召し上がってください。',
        'どうぞ食べてください。',
        'どうぞ申してください。'
      ],
      correctIndex: 1,
      explanation: 'Untuk menghormati tindakan makan tamu/lawan bicara, gunakan Sonkeigo 召し上がる (Meshiagaru).'
    },
    {
      question: 'Ketika kamu hendak berkunjung ke kantor rekan bisnis besok pagi jam 10, kalimat yang tepat adalah...',
      options: [
        '明日10時にいらっしゃいます。',
        '明日10時に伺います (参ります)。',
        '明日10時にご覧になります。',
        '明日10時においでになります。'
      ],
      correctIndex: 1,
      explanation: 'Karena tindakan pergi/berkunjung dilakukan oleh diri sendiri ke pihak rekan bisnis, gunakan Kenjougo 伺う (ukagau) atau 参る (mairu).'
    }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(168, 85, 247, 0.15))',
        border: '1px solid rgba(236, 72, 153, 0.3)',
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
            <span style={{ fontSize: '1.8rem' }}>🙇</span>
            <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc', fontWeight: 800 }}>
              Spesialisasi Keigo (敬語) & Simulator Wawancara (面接)
            </h1>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', maxWidth: '650px' }}>
            Pahami batas tegas antara Sonkeigo (menghormati lawan bicara) dan Kenjougo (merendahkan diri sendiri), serta kuasai tata krama wawancara kerja profesional Jepang.
          </p>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '0.25rem', gap: '0.25rem' }}>
          <button
            onClick={() => setActiveTab('matrix')}
            style={{
              background: activeTab === 'matrix' ? '#ec4899' : 'transparent',
              color: activeTab === 'matrix' ? '#fff' : '#94a3b8',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            📊 Matriks Keigo
          </button>
          <button
            onClick={() => setActiveTab('interview')}
            style={{
              background: activeTab === 'interview' ? '#ec4899' : 'transparent',
              color: activeTab === 'interview' ? '#fff' : '#94a3b8',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            💼 Wawancara Kerja
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            style={{
              background: activeTab === 'quiz' ? '#ec4899' : 'transparent',
              color: activeTab === 'quiz' ? '#fff' : '#94a3b8',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            🎯 Kuis Keigo
          </button>
        </div>
      </div>

      {/* TAB 1: KEIGO MATRIX */}
      {activeTab === 'matrix' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Explanation Box */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '12px', padding: '1rem' }}>
              <div style={{ fontWeight: 800, color: '#38bdf8', marginBottom: '0.2rem' }}>
                🌟 Sonkeigo (尊敬語) — Mengangkat Lawan Bicara
              </div>
              <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                Dipakai khusus saat membicarakan tindakan atasan, klien, guru, atau pihak eksternal. DILARANG dipakai untuk tindakan diri sendiri!
              </div>
            </div>

            <div style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '12px', padding: '1rem' }}>
              <div style={{ fontWeight: 800, color: '#c084fc', marginBottom: '0.2rem' }}>
                🙇 Kenjougo (謙譲語) — Merendahkan Diri Sendiri
              </div>
              <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                Dipakai untuk tindakan diri sendiri, keluarga, atau rekan sekantor di depan orang lain untuk menunjukkan kerendahan hati.
              </div>
            </div>
          </div>

          {/* Verb Matrix Cards */}
          <div style={{
            background: 'var(--card-bg, #1e293b)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            overflow: 'hidden'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'rgba(0, 0, 0, 0.3)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8' }}>
                    <th style={{ padding: '0.9rem 1.25rem' }}>Kata Kerja Asli</th>
                    <th style={{ padding: '0.9rem 1rem', color: '#38bdf8' }}>Sonkeigo (尊敬語)</th>
                    <th style={{ padding: '0.9rem 1rem', color: '#c084fc' }}>Kenjougo (謙譲語)</th>
                    <th style={{ padding: '0.9rem 1rem' }}>Audio</th>
                  </tr>
                </thead>
                <tbody>
                  {keigoVerbs.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                      <td style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>
                        <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
                          {item.base}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                          {item.meaning}
                        </div>
                      </td>

                      <td style={{ padding: '1rem', background: 'rgba(56, 189, 248, 0.03)' }}>
                        <div style={{ fontWeight: 700, color: '#7dd3fc' }}>
                          {item.sonkeigo}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                          {item.exampleSonkei}
                        </div>
                      </td>

                      <td style={{ padding: '1rem', background: 'rgba(168, 85, 247, 0.03)' }}>
                        <div style={{ fontWeight: 700, color: '#d8b4fe' }}>
                          {item.kenjougo}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                          {item.exampleKenjou}
                        </div>
                      </td>

                      <td style={{ padding: '1rem', whiteSpace: 'nowrap' }}>
                        <button
                          onClick={() => playAudio(item.sonkeigo.split(' / ')[0])}
                          title="Dengarkan Sonkeigo"
                          style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            color: '#e2e8f0',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '0.35rem 0.6rem',
                            cursor: 'pointer'
                          }}
                        >
                          🔊
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERVIEW SIMULATOR */}
      {activeTab === 'interview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Etiquette Rules */}
          <div style={{
            background: 'var(--card-bg, #1e293b)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '1.5rem'
          }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.15rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🚪</span>
              <span>Tata Krama Masuk Ruangan & Ojigi (入室とお辞儀のマナー)</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {interviewEtiquette.map((et, i) => (
                <div key={i} style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', padding: '1rem', borderLeft: '4px solid #ec4899' }}>
                  <div style={{ fontWeight: 700, color: '#f8fafc', marginBottom: '0.2rem' }}>
                    {et.step}
                  </div>
                  <div style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                    ✅ <strong>Kaidah:</strong> {et.rule}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#f87171', marginTop: '0.2rem' }}>
                    ❌ <strong>Pantangan:</strong> {et.ngRule}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Interview Questions & Ideal Answers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#f8fafc' }}>
              4 Pertanyaan Inti Wawancara & Respon Terbaik
            </h3>

            {interviewQA.map((qa) => (
              <div
                key={qa.id}
                style={{
                  background: 'var(--card-bg, #1e293b)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8' }}>
                      {qa.question}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.1rem' }}>
                      {qa.meaning}
                    </div>
                  </div>

                  <button
                    onClick={() => playAudio(qa.idealResponse)}
                    style={{
                      background: 'rgba(56, 189, 248, 0.15)',
                      color: '#38bdf8',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      borderRadius: '8px',
                      padding: '0.4rem 0.8rem',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <span>🔊</span>
                    <span>Putar Audio</span>
                  </button>
                </div>

                <div style={{ fontSize: '0.82rem', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.1)', padding: '0.4rem 0.8rem', borderRadius: '6px' }}>
                  🎯 <strong>Kiat Pewawancara:</strong> {qa.keyPoints}
                </div>

                {/* Japanese Response Script */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  borderRadius: '10px',
                  padding: '1rem',
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color: '#f8fafc'
                }}>
                  <RubyText text={qa.idealResponse} reading={qa.reading} />
                </div>

                <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  🇮🇩 <em>{qa.indonesian}</em>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: KEIGO QUIZ */}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              Soal {quizIndex + 1} dari {keigoQuizzes.length}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#ec4899', fontWeight: 700 }}>
              Skor: {quizScore}
            </span>
          </div>

          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.5, marginBottom: '1.5rem' }}>
            {keigoQuizzes[quizIndex].question}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {keigoQuizzes[quizIndex].options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = keigoQuizzes[quizIndex].correctIndex === idx;

              let bg = 'rgba(255, 255, 255, 0.04)';
              let border = 'rgba(255, 255, 255, 0.1)';

              if (selectedAnswer !== null) {
                if (isCorrect) {
                  bg = 'rgba(16, 185, 129, 0.2)';
                  border = '#10b981';
                } else if (isSelected) {
                  bg = 'rgba(239, 68, 68, 0.2)';
                  border = '#ef4444';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={selectedAnswer !== null}
                  onClick={() => {
                    setSelectedAnswer(idx);
                    if (idx === keigoQuizzes[quizIndex].correctIndex) {
                      setQuizScore(s => s + 1);
                    }
                  }}
                  style={{
                    background: bg,
                    border: `1.5px solid ${border}`,
                    borderRadius: '10px',
                    padding: '1rem',
                    textAlign: 'left',
                    color: '#f8fafc',
                    fontSize: '0.92rem',
                    fontWeight: 500,
                    cursor: selectedAnswer === null ? 'pointer' : 'default',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {selectedAnswer !== null && (
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderLeft: `4px solid ${selectedAnswer === keigoQuizzes[quizIndex].correctIndex ? '#10b981' : '#ef4444'}`,
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ fontSize: '0.88rem', color: '#f1f5f9', lineHeight: 1.5 }}>
                💡 {keigoQuizzes[quizIndex].explanation}
              </div>
              <div style={{ marginTop: '0.8rem', textAlign: 'right' }}>
                <button
                  onClick={() => {
                    setSelectedAnswer(null);
                    if (quizIndex + 1 < keigoQuizzes.length) {
                      setQuizIndex(i => i + 1);
                    } else {
                      setQuizIndex(0);
                      setQuizScore(0);
                    }
                  }}
                  style={{
                    background: '#ec4899',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem 1.25rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {quizIndex + 1 < keigoQuizzes.length ? 'Soal Berikutnya →' : 'Ulangi Kuis 🔄'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
