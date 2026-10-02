import React, { useState } from 'react';
import { seikatsuCategories, seikatsuTerms, seikatsuQuizData } from '../data/seikatsu';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function SeikatsuStudy() {
  const [activeTab, setActiveTab] = useState('guide'); // 'guide' | 'form' | 'quiz'
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedTermId, setSelectedTermId] = useState(seikatsuTerms[0].id);

  // Form simulation state
  const [formNameKanji, setFormNameKanji] = useState('');
  const [formNameKana, setFormNameKana] = useState('');
  const [formBirthEra, setFormBirthEra] = useState('平成 (Heisei)');
  const [formBirthYear, setFormBirthYear] = useState('10');
  const [formPurpose, setFormPurpose] = useState('住民票の写し交付 (Permohonan Salinan Juminhyo)');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const activeTerm = seikatsuTerms.find(t => t.id === selectedTermId) || seikatsuTerms[0];

  // Native Audio
  const playNativeAudio = (text, rate = 0.95) => {
    playJapaneseSpeech(text, { rate });
  };

  // Filtered terms
  const filteredTerms = seikatsuTerms.filter(item =>
    selectedCategory === 'ALL' ? true : item.category === selectedCategory
  );

  // Quiz handlers
  const handleAnswerSelect = (idx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    if (idx === seikatsuQuizData[quizIdx].correctIdx) {
      setScore(s => s + 1);
    }
  };

  const handleNextQuiz = () => {
    if (quizIdx + 1 < seikatsuQuizData.length) {
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
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(16, 185, 129, 0.15))',
        border: '1px solid rgba(59, 130, 246, 0.3)',
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
            <span style={{ fontSize: '1.8rem' }}>🏢</span>
            <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc', fontWeight: 800 }}>
              Bahasa Jepang Bertahan Hidup & Birokrasi (生活日本語)
            </h1>
            <span style={{
              background: 'rgba(59, 130, 246, 0.25)',
              color: '#60a5fa',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: '1px solid rgba(59, 130, 246, 0.4)'
            }}>
              Kesiapan Hidup di Jepang
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', maxWidth: '650px' }}>
            Panduan praktis navigasi birokrasi Balai Kota (市役所), perbankan & pos, aturan pemilahan sampah, dan sewa tempat tinggal di Jepang tanpa kendala bahasa.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '0.25rem', gap: '0.25rem' }}>
          {[
            { id: 'guide', label: '📖 Panduan Istilah' },
            { id: 'form', label: '📝 Simulasi Formulir' },
            { id: 'quiz', label: '🎯 Kuis Situasi' }
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

      {/* CATEGORY SELECTOR CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
        {seikatsuCategories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? 'ALL' : cat.id)}
              style={{
                background: isSelected ? 'rgba(59, 130, 246, 0.2)' : 'var(--card-bg, #1e293b)',
                border: `1.5px solid ${isSelected ? cat.badgeColor : 'rgba(255, 255, 255, 0.08)'}`,
                borderRadius: '12px',
                padding: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '1.3rem' }}>{cat.icon}</span>
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: isSelected ? '#60a5fa' : '#f8fafc' }}>
                  {cat.title}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4 }}>
                {cat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* TAB 1: PANDUAN ISTILAH & ROLEPLAY */}
      {activeTab === 'guide' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {/* Term List Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
              Daftar Kosakata Kunci ({filteredTerms.length}):
            </div>
            {filteredTerms.map((term) => {
              const isSelected = term.id === selectedTermId;
              return (
                <div
                  key={term.id}
                  onClick={() => setSelectedTermId(term.id)}
                  style={{
                    background: isSelected ? 'rgba(59, 130, 246, 0.18)' : 'var(--card-bg, #1e293b)',
                    border: `1.5px solid ${isSelected ? '#3b82f6' : 'rgba(255, 255, 255, 0.06)'}`,
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
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: isSelected ? '#60a5fa' : '#f8fafc' }}>
                      {term.kanji}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      {term.meaning}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>➔</span>
                </div>
              );
            })}
          </div>

          {/* Active Term Detail Card */}
          <div style={{
            background: 'var(--card-bg, #1e293b)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem'
          }}>
            {/* Header with pronunciation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.8rem' }}>
              <div>
                <div style={{ fontSize: '0.85rem', color: '#60a5fa', fontWeight: 600, marginBottom: '0.2rem' }}>
                  {activeTerm.furigana} ({activeTerm.romaji})
                </div>
                <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#f8fafc', fontWeight: 800 }}>
                  {activeTerm.kanji}
                </h2>
                <div style={{ fontSize: '1rem', color: '#34d399', fontWeight: 600, marginTop: '0.2rem' }}>
                  {activeTerm.meaning}
                </div>
              </div>

              <button
                onClick={() => playNativeAudio(activeTerm.kanji)}
                style={{
                  background: 'rgba(59, 130, 246, 0.2)',
                  color: '#93c5fd',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <span>🔊</span>
                <span>Lafal Native</span>
              </button>
            </div>

            {/* Explanation box */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.25)',
              borderLeft: '4px solid #3b82f6',
              borderRadius: '4px 8px 8px 4px',
              padding: '1rem',
              fontSize: '0.9rem',
              color: '#cbd5e1',
              lineHeight: 1.6
            }}>
              <strong style={{ color: '#60a5fa' }}>💡 Penjelasan Birokrasi & Konteks Nyata:</strong>
              <div style={{ marginTop: '0.4rem' }}>{activeTerm.explanation}</div>
            </div>

            {/* Practical Dialogue Simulation */}
            {activeTerm.dialogue && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '1.2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem'
              }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                  Simulasi Percakapan Nyata di Lokasi:
                </div>

                {/* Speaker A */}
                <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '0.8rem', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa' }}>
                      {activeTerm.dialogue.speakerA}:
                    </span>
                    <button
                      onClick={() => playNativeAudio(activeTerm.dialogue.lineA)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}
                    >
                      🔊
                    </button>
                  </div>
                  <div style={{ fontSize: '1rem', color: '#f8fafc', fontWeight: 600 }}>
                    {activeTerm.dialogue.lineA}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                    {activeTerm.dialogue.meaningA}
                  </div>
                </div>

                {/* Speaker B */}
                <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '0.8rem', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399' }}>
                      {activeTerm.dialogue.speakerB} (Anda):
                    </span>
                    <button
                      onClick={() => playNativeAudio(activeTerm.dialogue.lineB)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}
                    >
                      🔊
                    </button>
                  </div>
                  <div style={{ fontSize: '1rem', color: '#f8fafc', fontWeight: 600 }}>
                    {activeTerm.dialogue.lineB}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                    {activeTerm.dialogue.meaningB}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: SIMULASI PENGISIAN FORMULIR RESMI */}
      {activeTab === 'form' && (
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
            <h2 style={{ margin: '0 0 0.3rem 0', fontSize: '1.3rem', color: '#f8fafc', fontWeight: 700 }}>
              📝 Latihan Pengisian Formulir Permohonan Dokumen Balai Kota (申請書)
            </h2>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
              Di balai kota Jepang, Anda wajib mengisi formulir dalam huruf Katakana (Furigana) dan format penanggalan era kekaisaran (Era Reiwa 令和 / Heisei 平成). Latihlah di sini!
            </p>
          </div>

          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1.5px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '12px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {/* Field 1: Name Furigana Katakana */}
            <div>
              <label style={{ fontSize: '0.82rem', color: '#60a5fa', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                フリガナ（カタカナ） / Nama Katakana (Wajib untuk pelafalan sistem komputer):
              </label>
              <input
                type="text"
                value={formNameKana}
                onChange={(e) => setFormNameKana(e.target.value)}
                placeholder="Contoh: アグス　サントソ (Agusu Santoso)"
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  padding: '0.7rem 0.9rem',
                  color: '#f8fafc',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            {/* Field 2: Name in Alphabet/Kanji */}
            <div>
              <label style={{ fontSize: '0.82rem', color: '#60a5fa', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                氏名（アルファベット / 漢字） / Nama Lengkap Sesuai Paspor & Zairyu Card:
              </label>
              <input
                type="text"
                value={formNameKanji}
                onChange={(e) => setFormNameKanji(e.target.value)}
                placeholder="Contoh: AGUS SANTOSO"
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  padding: '0.7rem 0.9rem',
                  color: '#f8fafc',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            {/* Field 3: Japanese Era Birthday */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.8rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: '#60a5fa', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                  元号 / Era Tahun Lahir Jepang:
                </label>
                <select
                  value={formBirthEra}
                  onChange={(e) => setFormBirthEra(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '0.7rem 0.9rem',
                    color: '#f8fafc',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="平成 (Heisei)">平成 (Heisei: 1989 - 2019)</option>
                  <option value="令和 (Reiwa)">令和 (Reiwa: 2019 - Sekarang)</option>
                  <option value="昭和 (Shouwa)">昭和 (Shōwa: 1926 - 1989)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: '#60a5fa', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                  年 (Tahun ke-):
                </label>
                <input
                  type="number"
                  value={formBirthYear}
                  onChange={(e) => setFormBirthYear(e.target.value)}
                  placeholder="Contoh: 10 (Heisei 10 = 1998)"
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '0.7rem 0.9rem',
                    color: '#f8fafc',
                    fontSize: '0.95rem'
                  }}
                />
              </div>
            </div>

            {/* Field 4: Purpose */}
            <div>
              <label style={{ fontSize: '0.82rem', color: '#60a5fa', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                請求理由・用途 / Dokumen yang Diajukan:
              </label>
              <select
                value={formPurpose}
                onChange={(e) => setFormPurpose(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  padding: '0.7rem 0.9rem',
                  color: '#f8fafc',
                  fontSize: '0.9rem'
                }}
              >
                <option value="住民票の写し交付 (Permohonan Salinan Juminhyo)">住民票の写し交付 (Surat Domisili Juminhyo - Rp300¥)</option>
                <option value="国民健康保険加入届 (Pendaftaran Asuransi Kesehatan NHI)">国民健康保険加入届 (Asuransi Kesehatan Nasional)</option>
                <option value="印鑑登録証明書 (Sertifikat Cap Hanko Resmi)">印鑑登録証明書 (Sertifikat Registrasi Cap Inkan)</option>
                <option value="マイナンバーカード受取 (Pengambilan Kartu My Number)">マイナンバーカード受取 (Ambil Kartu My Number)</option>
              </select>
            </div>

            <button
              onClick={() => setFormSubmitted(true)}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                marginTop: '0.5rem'
              }}
            >
              📄 Simulasikan Penyerahan Formulir ke Loket
            </button>
          </div>

          {formSubmitted && (
            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1.5px solid #10b981',
              borderRadius: '12px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontWeight: 800 }}>
                <span>✅</span>
                <span>Formulir Berhasil Divalidasi oleh Petugas Loket Balai Kota!</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                Dokumen Anda akan segera diproses:
                <br />• <strong>Pemohon:</strong> {formNameKanji || 'AGUS SANTOSO'} ({formNameKana || 'アグス　サントソ'})
                <br />• <strong>Tahun Lahir:</strong> {formBirthEra} {formBirthYear}年
                <br />• <strong>Layanan:</strong> {formPurpose}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: KUIS SITUASI BERTAHAN HIDUP */}
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
                  Soal {quizIdx + 1} dari {seikatsuQuizData.length}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#3b82f6', fontWeight: 700 }}>
                  Skor: {score}
                </span>
              </div>

              {/* Progress Bar */}
              <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${((quizIdx + 1) / seikatsuQuizData.length) * 100}%`,
                  background: '#3b82f6',
                  transition: 'width 0.3s ease'
                }} />
              </div>

              {/* Question */}
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.5 }}>
                ❓ {seikatsuQuizData[quizIdx].question}
              </div>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {seikatsuQuizData[quizIdx].options.map((opt, oIdx) => {
                  let btnBg = 'rgba(255, 255, 255, 0.04)';
                  let btnBorder = 'rgba(255, 255, 255, 0.1)';
                  let btnColor = '#f8fafc';

                  if (selectedAnswer !== null) {
                    if (oIdx === seikatsuQuizData[quizIdx].correctIdx) {
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

              {/* Explanation & Next Button */}
              {selectedAnswer !== null && (
                <div style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  borderLeft: `4px solid ${selectedAnswer === seikatsuQuizData[quizIdx].correctIdx ? '#10b981' : '#ef4444'}`,
                  borderRadius: '4px 8px 8px 4px',
                  padding: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.8rem'
                }}>
                  <div style={{ fontSize: '0.88rem', color: '#cbd5e1', maxWidth: '650px' }}>
                    💡 <strong>Aturan Resmi Jepang:</strong> {seikatsuQuizData[quizIdx].explanation}
                  </div>

                  <button
                    onClick={handleNextQuiz}
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.55rem 1.25rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {quizIdx + 1 < seikatsuQuizData.length ? 'Soal Berikutnya ➔' : 'Lihat Hasil ➔'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '3rem' }}>🇯🇵🏛️</div>
              <h2 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc', fontWeight: 800 }}>
                Kuis Kesiapan Hidup di Jepang Selesai!
              </h2>
              <p style={{ margin: 0, fontSize: '1rem', color: '#94a3b8' }}>
                Skor Anda: <strong style={{ color: '#3b82f6', fontSize: '1.3rem' }}>{score} / {seikatsuQuizData.length}</strong>
              </p>
              <button
                onClick={handleRestartQuiz}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
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
