import React, { useState } from 'react';
import { tsukaiwakePairs, onomatopoeiaList } from '../data/nuance';
import { RubyText } from '../utils/furigana';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function NuanceStudy() {
  const [activeTab, setActiveTab] = useState('tsukaiwake'); // 'tsukaiwake' | 'onomatopoeia' | 'quiz'
  const [activeCategory, setActiveCategory] = useState('ALL');

  // Quiz State
  const [quizIdx, setQuizIdx] = useState(0);
  const [chosenAnswer, setChosenAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const categories = ['ALL', 'Perasaan & Hati', 'Kemampuan Bahasa', 'Waktu & Kondisi', 'Tekstur Makanan', 'Suara Alam', 'Tekstur & Sentuhan'];

  const filteredOnomatopoeia = onomatopoeiaList.filter(o =>
    activeCategory === 'ALL' ? true : o.category === activeCategory
  );

  const playAudio = (text) => {
    playJapaneseSpeech(text, { rate: 0.9 });
  };

  const nuanceQuizzes = [
    {
      question: 'Kalimat manakah yang paling natural saat Anda mengetahui nomor telepon seseorang?',
      options: [
        '彼の電話番号を知っています。',
        '彼の電話番号が分かります。',
        '彼の電話番号を考えています。',
        '彼の電話番号が綺麗です。'
      ],
      correctIndex: 0,
      explanation: 'Mengetahui fakta atau data eksternal (nomor telepon, alamat) menggunakan 知る (Shiru), bukan 分かる.'
    },
    {
      question: 'Ekspresi onomatope yang tepat saat Anda merasa cemas dan jantung berdegup kencang sebelum ujian adalah...',
      options: [
        'ペラペラ (Pera-pera)',
        'ドキドキ (Doki-doki)',
        'モチモチ (Mochi-mochi)',
        'ザーザー (Zaa-zaa)'
      ],
      correctIndex: 1,
      explanation: 'ドキドキ (Doki-doki) menggambarkan degup jantung yang cepat akibat gugup atau cemas.'
    },
    {
      question: 'Untuk mendeskripsikan pemandangan alam matahari terbit di puncak gunung yang megah dan menggetarkan hati, kata yang paling tepat adalah...',
      options: [
        '綺麗な景色',
        '美しい景色',
        '知っている景色',
        'ギリギリな景色'
      ],
      correctIndex: 1,
      explanation: '美しい (Utsukushii) digunakan untuk keindahan estetik alam yang megah dan mendalam.'
    }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.15), rgba(99, 102, 241, 0.15))',
        border: '1px solid rgba(20, 184, 166, 0.3)',
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
            <span style={{ fontSize: '1.8rem' }}>🎭</span>
            <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc', fontWeight: 800 }}>
              Nuansa Kata (使い分け) & Kamus Onomatope (オノマトペ)
            </h1>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', maxWidth: '650px' }}>
            Pahami perbedaan halus kata-kata yang tampak serupa dan kuasai kata bunyi & sensasi perasaan khas orang Jepang.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '0.25rem', gap: '0.25rem' }}>
          <button
            onClick={() => setActiveTab('tsukaiwake')}
            style={{
              background: activeTab === 'tsukaiwake' ? '#14b8a6' : 'transparent',
              color: activeTab === 'tsukaiwake' ? '#000' : '#94a3b8',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            ⚖️ Nuansa Kata
          </button>
          <button
            onClick={() => setActiveTab('onomatopoeia')}
            style={{
              background: activeTab === 'onomatopoeia' ? '#14b8a6' : 'transparent',
              color: activeTab === 'onomatopoeia' ? '#000' : '#94a3b8',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            ✨ Onomatope ({onomatopoeiaList.length})
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            style={{
              background: activeTab === 'quiz' ? '#14b8a6' : 'transparent',
              color: activeTab === 'quiz' ? '#000' : '#94a3b8',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            🎯 Kuis Nuansa
          </button>
        </div>
      </div>

      {/* TAB 1: TSUKAIWAKE (NUANSA KATA SERUPA) */}
      {activeTab === 'tsukaiwake' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {tsukaiwakePairs.map((pair) => (
            <div
              key={pair.id}
              style={{
                background: 'var(--card-bg, #1e293b)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.6rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#f8fafc', fontWeight: 800 }}>
                  {pair.pair}
                </h3>
                <span style={{
                  background: 'rgba(20, 184, 166, 0.2)',
                  color: '#2dd4bf',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '6px'
                }}>
                  {pair.theme}
                </span>
              </div>

              {/* Side-by-side comparison */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {/* Concept A */}
                <div style={{ background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '12px', padding: '1.2rem' }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#38bdf8', marginBottom: '0.3rem' }}>
                    {pair.conceptA.word}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.75rem' }}>
                    {pair.conceptA.core}
                  </div>
                  <div style={{ fontSize: '0.88rem', color: '#f8fafc', background: 'rgba(0,0,0,0.25)', padding: '0.6rem 0.8rem', borderRadius: '8px' }}>
                    {pair.conceptA.exampleGood}
                  </div>
                  {pair.conceptA.exampleBad && (
                    <div style={{ fontSize: '0.8rem', color: '#f87171', marginTop: '0.4rem' }}>
                      ❌ {pair.conceptA.exampleBad}
                    </div>
                  )}
                </div>

                {/* Concept B */}
                <div style={{ background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '12px', padding: '1.2rem' }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#c084fc', marginBottom: '0.3rem' }}>
                    {pair.conceptB.word}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.75rem' }}>
                    {pair.conceptB.core}
                  </div>
                  <div style={{ fontSize: '0.88rem', color: '#f8fafc', background: 'rgba(0,0,0,0.25)', padding: '0.6rem 0.8rem', borderRadius: '8px' }}>
                    {pair.conceptB.exampleGood}
                  </div>
                  {pair.conceptB.exampleBad && (
                    <div style={{ fontSize: '0.8rem', color: '#f87171', marginTop: '0.4rem' }}>
                      ❌ {pair.conceptB.exampleBad}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Key Takeaway */}
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', padding: '0.6rem 1rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                💡 <strong>Kaidah Utama:</strong> {pair.summary}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: ONOMATOPOEIA DICTIONARY */}
      {activeTab === 'onomatopoeia' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? '#14b8a6' : 'rgba(255, 255, 255, 0.05)',
                  color: activeCategory === cat ? '#000' : '#cbd5e1',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '9999px',
                  padding: '0.35rem 0.9rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {cat === 'ALL' ? 'Semua Kategori' : cat}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {filteredOnomatopoeia.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--card-bg, #1e293b)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.75rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.6rem' }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>
                          {item.word}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                          {item.romaji}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => playAudio(item.word)}
                      title="Dengarkan Audio"
                      style={{
                        background: 'rgba(20, 184, 166, 0.15)',
                        color: '#2dd4bf',
                        border: '1px solid rgba(20, 184, 166, 0.3)',
                        borderRadius: '6px',
                        padding: '0.35rem 0.6rem',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      🔊
                    </button>
                  </div>

                  <div style={{ marginTop: '0.6rem', fontSize: '0.9rem', fontWeight: 600, color: '#2dd4bf' }}>
                    {item.meaning}
                  </div>
                </div>

                <div style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  borderRadius: '8px',
                  padding: '0.6rem 0.8rem',
                  fontSize: '0.85rem'
                }}>
                  <div style={{ color: '#f8fafc', marginBottom: '0.2rem' }}>
                    <RubyText text={item.example} reading={item.reading} />
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                    {item.exampleMeaning}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: QUIZ */}
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
              Soal {quizIdx + 1} dari {nuanceQuizzes.length}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#14b8a6', fontWeight: 700 }}>
              Skor: {score}
            </span>
          </div>

          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.5, marginBottom: '1.5rem' }}>
            {nuanceQuizzes[quizIdx].question}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {nuanceQuizzes[quizIdx].options.map((opt, idx) => {
              const isSelected = chosenAnswer === idx;
              const isCorrect = nuanceQuizzes[quizIdx].correctIndex === idx;

              let bg = 'rgba(255, 255, 255, 0.04)';
              let border = 'rgba(255, 255, 255, 0.1)';

              if (chosenAnswer !== null) {
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
                  disabled={chosenAnswer !== null}
                  onClick={() => {
                    setChosenAnswer(idx);
                    if (idx === nuanceQuizzes[quizIdx].correctIndex) {
                      setScore(s => s + 1);
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
                    cursor: chosenAnswer === null ? 'pointer' : 'default',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {chosenAnswer !== null && (
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderLeft: `4px solid ${chosenAnswer === nuanceQuizzes[quizIdx].correctIndex ? '#10b981' : '#ef4444'}`,
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ fontSize: '0.88rem', color: '#f1f5f9', lineHeight: 1.5 }}>
                💡 {nuanceQuizzes[quizIdx].explanation}
              </div>
              <div style={{ marginTop: '0.8rem', textAlign: 'right' }}>
                <button
                  onClick={() => {
                    setChosenAnswer(null);
                    if (quizIdx + 1 < nuanceQuizzes.length) {
                      setQuizIdx(i => i + 1);
                    } else {
                      setQuizIdx(0);
                      setScore(0);
                    }
                  }}
                  style={{
                    background: '#14b8a6',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem 1.25rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {quizIdx + 1 < nuanceQuizzes.length ? 'Soal Berikutnya →' : 'Ulangi Kuis 🔄'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
