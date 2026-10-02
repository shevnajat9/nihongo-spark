import React, { useState } from 'react';
import { playJapaneseSpeech } from '../utils/audioPlayer';

// Pool of adaptive diagnostic questions calibrated across JLPT levels & categories
const QUESTION_BANK = {
  n5: [
    {
      id: 'n5-1',
      level: 'N5',
      category: 'Kanji',
      q: 'Arti dari kanji 「時」 pada kata 「時間」(jikan) adalah...',
      options: ['Tempat', 'Waktu', 'Orang', 'Uang'],
      correct: 1,
      explanation: 'Kanji 時 (toki/ji) berarti "waktu" atau "jam".'
    },
    {
      id: 'n5-2',
      level: 'N5',
      category: 'Grammar',
      q: 'Partikel yang tepat: 「毎朝コーヒー ___ 飲みます」',
      options: ['を (o)', 'に (ni)', 'で (de)', 'が (ga)'],
      correct: 0,
      explanation: 'Partikel を (o) digunakan untuk menandai objek penderita (apa yang diminum).'
    },
    {
      id: 'n5-3',
      level: 'N5',
      category: 'Vocab',
      q: 'Kata 「つくえ」(tsukue) memiliki arti...',
      options: ['Kursi', 'Meja', 'Pintu', 'Jendela'],
      correct: 1,
      explanation: 'つくえ (机) berarti meja belajar/kerja, sedangkan kursi adalah いす (isu).'
    }
  ],
  n4: [
    {
      id: 'n4-1',
      level: 'N4',
      category: 'Grammar',
      q: 'Pola 「〜たほうがいいです」 digunakan untuk...',
      options: ['Memberikan saran / anjuran', 'Meminta izin', 'Menyatakan larangan keras', 'Mengungkapkan masa lalu'],
      correct: 0,
      explanation: 'Bentuk Ta-form + ほうがいいです bermakna "lebih baik / disarankan untuk..."'
    },
    {
      id: 'n4-2',
      level: 'N4',
      category: 'Kanji',
      q: 'Cara baca kanji 「集合する」 adalah...',
      options: ['しゅうごうする (shuugou)', 'しゅうあいする (shuuai)', 'しゅうかくする (shuukaku)', 'じゅうごうする (juugou)'],
      correct: 0,
      explanation: '集合 (shuugou) berarti berkumpul / berkonsentrasi pada satu tempat.'
    },
    {
      id: 'n4-3',
      level: 'N4',
      category: 'Reading',
      q: '「明日雨が降ったら、試合は中止になります。」 Kalimat ini berarti...',
      options: ['Pertandingan tetap jalan walau hujan', 'Jika besok hujan, pertandingan dibatalkan', 'Kemarin hujan lebat saat tanding', 'Besok pasti tidak akan hujan'],
      correct: 1,
      explanation: 'Pola ~tara bermakna pengandaian "jika/bila", dan 中止 (chuushi) berarti pembatalan.'
    }
  ],
  n3: [
    {
      id: 'n3-1',
      level: 'N3',
      category: 'Grammar',
      q: 'Pola 「〜わけではない」 mengekspresikan...',
      options: ['Bukan berarti... / tidak sepenuhnya...', 'Pasti benar 100%', 'Tidak mungkin terjadi', 'Harus segera dilakukan'],
      correct: 0,
      explanation: 'わけではない (wake dewa nai) merupakan penyangkalan sebagian: "bukan berarti/tidak mutlak demikian".'
    },
    {
      id: 'n3-2',
      level: 'N3',
      category: 'Vocab',
      q: 'Arti dari kata sifat 「厄介」(yakkai) adalah...',
      options: ['Murah hati', 'Merepotkan / rumit', 'Menyenangkan', 'Sangat indah'],
      correct: 1,
      explanation: '厄介 (yakkai) bermakna merepotkan, menyulitkan, atau menimbulkan beban.'
    },
    {
      id: 'n3-3',
      level: 'N3',
      category: 'Kanji',
      q: 'Kombinasi kanji 「環境」(kankyou) bermakna...',
      options: ['Pemerintahan', 'Lingkungan hidup / sekitar', 'Perdagangan dunia', 'Pendidikan sekolah'],
      correct: 1,
      explanation: '環境 (kankyou) terdiri dari 環 (lingkar) dan 境 (batas/lingkungan).'
    }
  ],
  n2: [
    {
      id: 'n2-1',
      level: 'N2',
      category: 'Grammar',
      q: 'Pola 「〜に際して」 memiliki arti yang serupa dengan...',
      options: ['〜のときに (pada waktu / menjelang momentum penting)', '〜のせいで (akibat kesalahan)', '〜のかわりに (sebagai pengganti)', '〜にもかかわらず (meskipun)'],
      correct: 0,
      explanation: 'に際して (ni saishite) digunakan dalam situasi formal saat memulai atau menjelang momen penting.'
    },
    {
      id: 'n2-2',
      level: 'N2',
      category: 'Vocab',
      q: 'Frasa idiom 「見当がつかない」(kentou ga tsukanai) berarti...',
      options: ['Tidak punya gambaran / tidak bisa menebak sama sekali', 'Tidak bisa melihat jarak jauh', 'Tidak menemukan jalan pulang', 'Tidak punya uang sisa'],
      correct: 0,
      explanation: '見当 (kentou) = perkiraan/tebakan; 見当がつかない = sama sekali tak terbayang.'
    },
    {
      id: 'n2-3',
      level: 'N2',
      category: 'Reading',
      q: '「彼の実力は周囲も認めざるを得ない。」 Maksud tersirat dari kalimat ini adalah...',
      options: ['Orang sekitar meremehkannya', 'Orang sekitar terpaksa mengakui kehebatannya', 'Dia tidak memiliki kemampuan apa-apa', 'Dia menolak diakui orang lain'],
      correct: 1,
      explanation: '〜ざるを得ない (~zaru o enai) bermakna "tidak punya pilihan selain / terpaksa harus...".'
    }
  ],
  n1: [
    {
      id: 'n1-1',
      level: 'N1',
      category: 'Grammar',
      q: 'Pola tatabahasa 「〜を皮切りに」 bermakna...',
      options: ['Mengakhiri rangkaian acara', 'Diawali oleh satu peristiwa lalu disusul peristiwa serupa beruntun', 'Menyembunyikan fakta utama', 'Memotong pembicaraan orang'],
      correct: 1,
      explanation: '〜を皮切りに (~o kawakiri ni) berarti dimulai dengan suatu aksi awal yang memicu gelombang aksi berikutnya.'
    },
    {
      id: 'n1-2',
      level: 'N1',
      category: 'Kanji',
      q: 'Cara baca kanji 「巧み」 yang tepat adalah...',
      options: ['たくみ (takumi)', 'くるしみ (kurushimi)', 'あやしみ (ayashimi)', 'いとなみ (itonami)'],
      correct: 0,
      explanation: '巧み (takumi) berarti terampil, mahir, atau cerdik.'
    },
    {
      id: 'n1-3',
      level: 'N1',
      category: 'Vocab',
      q: 'Makna dari ungkapan sastra 「手持ち無沙汰」(temochibusata) adalah...',
      options: ['Sangat sibuk tiada henti', 'Merasa bosan karena tak ada yang bisa dikerjakan', 'Kehilangan pegangan hidup', 'Kekurangan modal usaha'],
      correct: 1,
      explanation: '手持ち無沙汰 (temochibusata) mendeskripsikan perasaan canggung/bosan akibat tidak memiliki kesibukan saat menunggu.'
    }
  ]
};

const LEVEL_ORDER = ['n5', 'n4', 'n3', 'n2', 'n1'];
const TOTAL_QUESTIONS = 12;

export default function PlacementTest({ onBack, onNavigateToModule }) {
  const [testState, setTestState] = useState('intro'); // 'intro', 'testing', 'result'
  const [currentLevelIdx, setCurrentLevelIdx] = useState(1); // Start at N4 baseline
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [answersHistory, setAnswersHistory] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [appliedLevel, setAppliedLevel] = useState(false);

  // Active Question
  const [activeQuestion, setActiveQuestion] = useState(null);

  const startTest = () => {
    setUsedQuestionIds([]);
    setQuestionCount(1);
    setAnswersHistory([]);
    setSelectedOption(null);
    setCurrentLevelIdx(1); // start at N4
    setAppliedLevel(false);

    const firstQ = QUESTION_BANK.n4[0];
    setActiveQuestion(firstQ);
    setUsedQuestionIds([firstQ.id]);
    setTestState('testing');
  };

  const handleSelectOption = (idx) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);

    const isCorrect = idx === activeQuestion.correct;
    const historyItem = {
      qId: activeQuestion.id,
      level: activeQuestion.level,
      category: activeQuestion.category,
      isCorrect
    };

    const newHistory = [...answersHistory, historyItem];
    setAnswersHistory(newHistory);

    // Adaptive CAT adjustment:
    // If correct -> raise difficulty (up to N1)
    // If wrong -> lower difficulty (down to N5)
    let nextLevel = currentLevelIdx;
    if (isCorrect && currentLevelIdx < LEVEL_ORDER.length - 1) {
      nextLevel = currentLevelIdx + 1;
    } else if (!isCorrect && currentLevelIdx > 0) {
      nextLevel = currentLevelIdx - 1;
    }
    setCurrentLevelIdx(nextLevel);

    setTimeout(() => {
      setSelectedOption(null);
      if (questionCount >= TOTAL_QUESTIONS) {
        // Test finished
        setTestState('result');
      } else {
        // Fetch next unasked question from target level
        const targetLevelKey = LEVEL_ORDER[nextLevel];
        const availablePool = QUESTION_BANK[targetLevelKey].filter(
          (q) => !usedQuestionIds.includes(q.id)
        );

        let nextQ;
        if (availablePool.length > 0) {
          nextQ = availablePool[Math.floor(Math.random() * availablePool.length)];
        } else {
          // Fallback to any unasked question
          const allQuestions = Object.values(QUESTION_BANK).flat();
          const fallbackPool = allQuestions.filter((q) => !usedQuestionIds.includes(q.id));
          nextQ = fallbackPool[0] || QUESTION_BANK.n3[0];
        }

        setActiveQuestion(nextQ);
        setUsedQuestionIds((prev) => [...prev, nextQ.id]);
        setQuestionCount((c) => c + 1);
      }
    }, 900);
  };

  // Diagnostic calculations
  const calculateResult = () => {
    if (answersHistory.length === 0) return { recommendedLevel: 'N5', score: 0, breakdown: {} };

    const totalCorrect = answersHistory.filter((a) => a.isCorrect).length;
    const correctWeighted = answersHistory.reduce((acc, a) => {
      const weightMap = { N5: 1, N4: 2, N3: 3, N2: 4, N1: 5 };
      return acc + (a.isCorrect ? weightMap[a.level] : 0);
    }, 0);

    let recommendedLevel = 'N5';
    let title = 'Pemula Mandiri (N5)';
    let desc = 'Kamu memahami dasar-dasar alfabet dan tata bahasa esensial. Mulailah dari kosakata dan kanji N5 untuk membangun fondasi yang kokoh!';
    let color = '#10b981';

    if (correctWeighted >= 35) {
      recommendedLevel = 'N1';
      title = 'Tingkat Mahir / Fluent (N1)';
      desc = 'Penguasaan nuansa bahasa, peribahasa sastra, dan struktur kalimat tingkat tinggimu sangat mengesankan. Fokuslah pada idiom langka dan artikel opini ilmiah!';
      color = '#ef4444';
    } else if (correctWeighted >= 26) {
      recommendedLevel = 'N2';
      title = 'Pra-Mahir / Menengah Atas (N2)';
      desc = 'Kamu memiliki pemahaman tata bahasa kompleks dan bacaan koran yang baik. Tingkatkan perbendaharaan kanji jukugo dan ekspresi keigo dunia kerja!';
      color = '#f59e0b';
    } else if (correctWeighted >= 18) {
      recommendedLevel = 'N3';
      title = 'Jembatan Menengah (N3)';
      desc = 'Kamu sudah melampaui fase dasar! Mulailah memperdalam konjugasi bersyarat, percakapan natural, dan nuansa partikel afektif.';
      color = '#6366f1';
    } else if (correctWeighted >= 10) {
      recommendedLevel = 'N4';
      title = 'Dasar Menengah (N4)';
      desc = 'Pemahaman kalimat dasar dan partikelmu sudah terbentuk. Lanjutkan ke bentuk te-form, kalimat pasif/kausatif, dan kanji harian.';
      color = '#06b6d4';
    }

    // Category breakdown
    const categories = ['Kanji', 'Vocab', 'Grammar', 'Reading'];
    const breakdown = {};
    categories.forEach((cat) => {
      const items = answersHistory.filter((a) => a.category === cat);
      const catCorrect = items.filter((a) => a.isCorrect).length;
      breakdown[cat] = items.length > 0 ? Math.round((catCorrect / items.length) * 100) : 50;
    });

    return {
      recommendedLevel,
      title,
      desc,
      color,
      totalCorrect,
      breakdown
    };
  };

  const handleApplyRecommendedLevel = (lvl) => {
    localStorage.setItem('nihongo_spark_level', lvl);
    setAppliedLevel(true);
    window.dispatchEvent(new Event('nihongo-spark-data-restored'));
  };

  const result = calculateResult();

  const getLevelBadgeColor = (lvl) => {
    switch (lvl) {
      case 'N5': return { bg: 'rgba(16, 185, 129, 0.15)', text: '#10b981', border: 'rgba(16, 185, 129, 0.3)' };
      case 'N4': return { bg: 'rgba(6, 182, 212, 0.15)', text: '#06b6d4', border: 'rgba(6, 182, 212, 0.3)' };
      case 'N3': return { bg: 'rgba(99, 102, 241, 0.15)', text: '#6366f1', border: 'rgba(99, 102, 241, 0.3)' };
      case 'N2': return { bg: 'rgba(245, 158, 11, 0.15)', text: '#f59e0b', border: 'rgba(245, 158, 11, 0.3)' };
      case 'N1': return { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' };
      default: return { bg: 'rgba(100, 116, 139, 0.15)', text: '#94a3b8', border: 'rgba(100, 116, 139, 0.3)' };
    }
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>
      
      {/* HEADER SECTION */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.18), rgba(16, 185, 129, 0.18))',
        border: '1px solid rgba(13, 148, 136, 0.3)',
        borderRadius: '16px',
        padding: '1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {onBack && (
            <button
              onClick={onBack}
              className="btn-secondary"
              style={{
                padding: '0.5rem 0.85rem',
                borderRadius: '10px',
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
              title="Kembali ke Dashboard"
            >
              ← Kembali
            </button>
          )}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span style={{ fontSize: '1.3rem' }}>🎯</span>
              <h1 style={{
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #14b8a6, #10b981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Tes Penempatan Level Adaptif (CAT Diagnostic)
              </h1>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary, #94a3b8)' }}>
              Sistem diagnostik terkomputerisasi yang menyesuaikan tingkat kesulitan secara real-time (N5 - N1)
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            padding: '0.3rem 0.7rem',
            borderRadius: '20px',
            background: 'rgba(20, 184, 166, 0.2)',
            color: '#2dd4bf',
            border: '1px solid rgba(20, 184, 166, 0.3)'
          }}>
            12 Soal Cerdas
          </span>
        </div>
      </div>

      {/* 1. INTRO SCREEN */}
      {testState === 'intro' && (
        <div className="glass-panel" style={{
          padding: '2.5rem 2rem',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          boxShadow: '0 12px 40px rgba(0,0,0,0.2)'
        }}>
          {/* Hero Banner inside card */}
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.25), rgba(16, 185, 129, 0.25))',
              border: '1px solid rgba(20, 184, 166, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              boxShadow: '0 8px 24px rgba(20, 184, 166, 0.2)'
            }}>
              ✨
            </div>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 800, margin: '0.25rem 0', color: 'var(--text-color, #f8fafc)' }}>
              Temukan Titik Awal Belajar yang Paling Tepat
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.6, margin: 0 }}>
              Bingung harus mulai belajar dari N5, N4, atau langsung ke N3? Tes CAT (*Computerized Adaptive Testing*) ini terdiri dari 12 pertanyaan cerdas. Soal akan otomatis naik level bila Anda menjawab benar, dan menyesuaikan bila keliru.
            </p>
          </div>

          {/* 3 Value Proposition Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem' }}>⚡</span>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#14b8a6' }}>12 Soal Cepat</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.5 }}>
                Hanya butuh ~4-5 menit. Algoritma adaptif memetakan kemampuan tanpa perlu ratusan soal.
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem' }}>🧭</span>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#10b981' }}>4 Pilar Kompetensi</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.5 }}>
                Menguji aspek Kanji, Kosakata (*Goi*), Tata Bahasa (*Bunpou*), dan Pemahaman Bacaan (*Dokkai*).
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem' }}>🗺️</span>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#38bdf8' }}>Rencana Belajar</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.5 }}>
                Dapatkan rekomendasi modul belajar yang pas beserta target harian sekali klik.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={startTest}
              style={{
                width: '100%',
                maxWidth: '420px',
                padding: '1.1rem 2rem',
                borderRadius: '14px',
                border: 'none',
                background: 'linear-gradient(135deg, #0d9488, #10b981)',
                color: '#ffffff',
                fontSize: '1.05rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
            >
              <span>Mulai Tes Diagnostik Sekarang</span>
              <span>🎯</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. ACTIVE TESTING SCREEN */}
      {testState === 'testing' && activeQuestion && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Progress Header Card */}
          <div className="glass-panel" style={{ padding: '1rem 1.5rem', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-color, #f8fafc)' }}>
                  Soal {questionCount} dari {TOTAL_QUESTIONS}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary, #94a3b8)' }}>
                  ({Math.round((questionCount / TOTAL_QUESTIONS) * 100)}%)
                </span>
              </div>

              {/* Dynamic Difficulty Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Tingkat Kesulitan:</span>
                {(() => {
                  const badge = getLevelBadgeColor(activeQuestion.level);
                  return (
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      background: badge.bg,
                      color: badge.text,
                      border: `1px solid ${badge.border}`,
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}>
                      Level {activeQuestion.level} · {activeQuestion.category}
                    </span>
                  );
                })()}
              </div>
            </div>

            {/* Smooth Progress Bar */}
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{
                width: `${(questionCount / TOTAL_QUESTIONS) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #14b8a6, #10b981)',
                borderRadius: '999px',
                transition: 'width 0.4s ease'
              }} />
            </div>
          </div>

          {/* Question Box */}
          <div className="glass-panel" style={{
            padding: '2rem',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            boxShadow: '0 12px 36px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
              <h2 style={{
                margin: 0,
                fontSize: '1.35rem',
                fontWeight: 700,
                lineHeight: 1.6,
                color: 'var(--text-color, #f8fafc)',
                fontFamily: 'var(--font-jp, inherit)'
              }}>
                {activeQuestion.q}
              </h2>

              <button
                onClick={() => playJapaneseSpeech(activeQuestion.q)}
                className="btn-secondary"
                style={{ padding: '0.4rem 0.7rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}
                title="Dengarkan soal dalam audio Jepang"
              >
                🔊 Audio
              </button>
            </div>

            {/* Options List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {activeQuestion.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === activeQuestion.correct;
                const optionLabel = ['A', 'B', 'C', 'D'][idx];

                let bg = 'rgba(255, 255, 255, 0.03)';
                let border = '1px solid rgba(255, 255, 255, 0.1)';
                let textColor = 'var(--text-color, #f8fafc)';
                let shadow = 'none';

                if (selectedOption !== null) {
                  if (isSelected && isCorrect) {
                    bg = 'rgba(16, 185, 129, 0.2)';
                    border = '2px solid #10b981';
                    textColor = '#34d399';
                    shadow = '0 0 16px rgba(16, 185, 129, 0.3)';
                  } else if (isSelected && !isCorrect) {
                    bg = 'rgba(239, 68, 68, 0.2)';
                    border = '2px solid #ef4444';
                    textColor = '#f87171';
                    shadow = '0 0 16px rgba(239, 68, 68, 0.3)';
                  } else if (isCorrect) {
                    bg = 'rgba(16, 185, 129, 0.15)';
                    border = '2px solid #10b981';
                    textColor = '#34d399';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedOption !== null}
                    onClick={() => handleSelectOption(idx)}
                    style={{
                      width: '100%',
                      padding: '1.1rem 1.25rem',
                      borderRadius: '14px',
                      background: bg,
                      border: border,
                      color: textColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: selectedOption !== null ? 'default' : 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: shadow
                    }}
                    onMouseEnter={(e) => {
                      if (selectedOption === null) {
                        e.currentTarget.style.borderColor = '#14b8a6';
                        e.currentTarget.style.background = 'rgba(20, 184, 166, 0.08)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedOption === null) {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                        e.currentTarget.style.transform = 'none';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <span style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: 'var(--text-secondary)'
                      }}>
                        {optionLabel}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {selectedOption !== null && isCorrect && (
                      <span style={{ color: '#10b981', fontWeight: 800, fontSize: '1.1rem' }}>✓</span>
                    )}
                    {selectedOption !== null && isSelected && !isCorrect && (
                      <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '1.1rem' }}>✕</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation reveal on answer */}
            {selectedOption !== null && activeQuestion.explanation && (
              <div style={{
                background: 'rgba(20, 184, 166, 0.08)',
                border: '1px solid rgba(20, 184, 166, 0.25)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                fontSize: '0.85rem',
                color: 'var(--text-secondary, #94a3b8)',
                lineHeight: 1.5,
                animation: 'fadeIn 0.3s ease'
              }}>
                <span style={{ fontWeight: 700, color: '#2dd4bf', marginRight: '6px' }}>Penjelasan:</span>
                {activeQuestion.explanation}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. RESULT SCREEN */}
      {testState === 'result' && (
        <div className="glass-panel" style={{
          padding: '2.5rem 2rem',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          boxShadow: '0 12px 40px rgba(0,0,0,0.2)'
        }}>
          {/* Trophy & Level Recommendation Header */}
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${result.color}33, ${result.color}66)`,
              border: `2px solid ${result.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.2rem',
              boxShadow: `0 8px 30px ${result.color}40`
            }}>
              🏆
            </div>
            
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: result.color
            }}>
              Hasil Diagnostik Kemampuan Adaptif
            </span>

            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, margin: '0.2rem 0', color: 'var(--text-color, #f8fafc)' }}>
              Rekomendasi:{' '}
              <span style={{
                background: `linear-gradient(135deg, ${result.color}, #38bdf8)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Level {result.recommendedLevel}
              </span>
            </h2>

            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-color, #f8fafc)', margin: 0 }}>
              {result.title}
            </p>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.6, margin: 0 }}>
              {result.desc}
            </p>

            <div style={{
              marginTop: '0.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '0.85rem'
            }}>
              <span>Akurasi Soal: <strong>{result.totalCorrect} / {TOTAL_QUESTIONS}</strong> Benar</span>
              <span>•</span>
              <span>Persentase: <strong>{Math.round((result.totalCorrect / TOTAL_QUESTIONS) * 100)}%</strong></span>
            </div>
          </div>

          {/* Set Level As Active Button */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => handleApplyRecommendedLevel(result.recommendedLevel)}
              disabled={appliedLevel}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                border: 'none',
                background: appliedLevel ? '#10b981' : 'linear-gradient(135deg, #0d9488, #10b981)',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: appliedLevel ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)'
              }}
            >
              {appliedLevel ? '✓ Level Telah Diterapkan ke Profil Belajar!' : `🎯 Terapkan Level ${result.recommendedLevel} ke Akun Saya`}
            </button>
          </div>

          {/* Competency Breakdown Bars */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>
              Pemetaan Skor Berdasarkan 4 Pilar Kompetensi:
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {Object.entries(result.breakdown).map(([cat, score]) => {
                const getBarColor = (s) => s >= 80 ? '#10b981' : s >= 60 ? '#38bdf8' : '#f59e0b';
                return (
                  <div key={cat} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600 }}>
                      <span>{cat === 'Vocab' ? 'Kosakata (語彙)' : cat === 'Grammar' ? 'Tata Bahasa (文法)' : cat === 'Kanji' ? 'Kanji (漢字)' : 'Membaca (読解)'}</span>
                      <span style={{ color: getBarColor(score) }}>{score}%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${score}%`,
                        height: '100%',
                        background: getBarColor(score),
                        borderRadius: '999px',
                        transition: 'width 0.6s ease'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Recommendations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>
              Rekomendasi Modul Pertama Anda:
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.85rem' }}>
              <div
                onClick={() => onNavigateToModule && onNavigateToModule('vocab')}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#14b8a6';
                  e.currentTarget.style.background = 'rgba(20, 184, 166, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                }}
              >
                <div>
                  <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-color)' }}>
                    📖 Kosakata Level {result.recommendedLevel}
                  </h5>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Kuasai target kata kunci dan frasa level ini
                  </p>
                </div>
                <span style={{ fontSize: '1.2rem', color: '#14b8a6' }}>➔</span>
              </div>

              <div
                onClick={() => onNavigateToModule && onNavigateToModule('grammar')}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#6366f1';
                  e.currentTarget.style.background = 'rgba(99, 102, 241, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                }}
              >
                <div>
                  <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-color)' }}>
                    📝 Tata Bahasa Level {result.recommendedLevel}
                  </h5>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Pelajari pola kalimat esensial dan latihan
                  </p>
                </div>
                <span style={{ fontSize: '1.2rem', color: '#6366f1' }}>➔</span>
              </div>

              <div
                onClick={() => onNavigateToModule && onNavigateToModule('jlpt')}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#06b6d4';
                  e.currentTarget.style.background = 'rgba(6, 182, 212, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                }}
              >
                <div>
                  <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-color)' }}>
                    ⏱️ Ujian Simulasi JLPT {result.recommendedLevel}
                  </h5>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Uji ketahanan waktu dengan format LJK resmi
                  </p>
                </div>
                <span style={{ fontSize: '1.2rem', color: '#06b6d4' }}>➔</span>
              </div>
            </div>
          </div>

          {/* Action Navigation */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', paddingTop: '0.5rem' }}>
            <button
              onClick={startTest}
              className="btn-secondary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              🔄 Ulangi Tes Diagnostik
            </button>
            <button
              onClick={onBack}
              style={{
                padding: '0.65rem 1.5rem',
                fontSize: '0.9rem',
                borderRadius: '10px',
                border: 'none',
                background: 'var(--accent-primary)',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Selesai & Ke Dashboard ➔
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
