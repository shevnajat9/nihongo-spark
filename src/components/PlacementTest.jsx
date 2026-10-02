import React, { useState } from 'react';
const ArrowLeft = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
);
const Target = ({ className = 'w-6 h-6' }) => (
  <svg className={className} width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);
const Award = ({ className = 'w-8 h-8' }) => (
  <svg className={className} width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/></svg>
);
const CheckCircle2 = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M9 12l2 2 4-4"/></svg>
);
const ChevronRight = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
);
const RotateCcw = ({ className = 'w-4 h-4' }) => (
  <svg className={className} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 4v6h6M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
);
const Sparkles = ({ className = 'w-8 h-8' }) => (
  <svg className={className} width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M8.757 15.243l-2.121 2.121m12.728 0l-2.121-2.121M8.757 8.757L6.636 6.636"/></svg>
);

// Pool of adaptive diagnostic questions calibrated across JLPT levels & categories
const QUESTION_BANK = {
  n5: [
    {
      id: 'n5-1',
      level: 'N5',
      category: 'Kanji',
      q: 'Arti dari kanji 「時」 pada kata 「時間」(jikan) adalah...',
      options: ['Tempat', 'Waktu', 'Orang', 'Uang'],
      correct: 1
    },
    {
      id: 'n5-2',
      level: 'N5',
      category: 'Grammar',
      q: 'Partikel yang tepat: 「毎朝コーヒー ___ 飲みます」',
      options: ['を', 'に', 'で', 'が'],
      correct: 0
    },
    {
      id: 'n5-3',
      level: 'N5',
      category: 'Vocab',
      q: 'Kata 「つくえ」(tsukue) memiliki arti...',
      options: ['Kursi', 'Meja', 'Pintu', 'Jendela'],
      correct: 1
    }
  ],
  n4: [
    {
      id: 'n4-1',
      level: 'N4',
      category: 'Grammar',
      q: 'Pola 「〜たほうがいいです」 digunakan untuk...',
      options: ['Memberikan saran / anjuran', 'Meminta izin', 'Menyatakan larangan keras', 'Mengungkapkan masa lalu'],
      correct: 0
    },
    {
      id: 'n4-2',
      level: 'N4',
      category: 'Kanji',
      q: 'Cara baca kanji 「集合する」 adalah...',
      options: ['しゅうごうする', 'しゅうあいする', 'しゅうかくする', 'じゅうごうする'],
      correct: 0
    },
    {
      id: 'n4-3',
      level: 'N4',
      category: 'Reading',
      q: '「明日雨が降ったら、試合は中止になります。」 Kalimat ini berarti...',
      options: ['Pertandingan tetap jalan walau hujan', 'Jika besok hujan, pertandingan dibatalkan', 'Kemarin hujan lebat saat tanding', 'Besok pasti tidak akan hujan'],
      correct: 1
    }
  ],
  n3: [
    {
      id: 'n3-1',
      level: 'N3',
      category: 'Grammar',
      q: 'Pola 「〜わけではない」 mengekspresikan...',
      options: ['Bukan berarti... / tidak sepenuhnya...', 'Pasti benar 100%', 'Tidak mungkin terjadi', 'Harus segera dilakukan'],
      correct: 0
    },
    {
      id: 'n3-2',
      level: 'N3',
      category: 'Vocab',
      q: 'Arti dari kata sifat 「厄介」(yakkai) adalah...',
      options: ['Murah hati', 'Merepotkan / rumit', 'Menyenangkan', 'Sangat indah'],
      correct: 1
    },
    {
      id: 'n3-3',
      level: 'N3',
      category: 'Kanji',
      q: 'Kombinasi kanji 「環境」(kankyou) bermakna...',
      options: ['Pemerintahan', 'Lingkungan hidup / sekitar', 'Perdagangan dunia', 'Pendidikan sekolah'],
      correct: 1
    }
  ],
  n2: [
    {
      id: 'n2-1',
      level: 'N2',
      category: 'Grammar',
      q: 'Pola 「〜に際して」 memiliki arti yang serupa dengan...',
      options: ['〜のときに (pada waktu / menjelang momentum penting)', '〜のせいで (akibat kesalahan)', '〜のかわりに (sebagai pengganti)', '〜にもかかわらず (meskipun)'],
      correct: 0
    },
    {
      id: 'n2-2',
      level: 'N2',
      category: 'Vocab',
      q: 'Frasa 「見当がつかない」(kentou ga tsukanai) berarti...',
      options: ['Tidak punya gambaran / tidak bisa menebak sama sekali', 'Tidak bisa melihat jarak jauh', 'Tidak menemukan jalan pulang', 'Tidak punya uang sisa'],
      correct: 0
    },
    {
      id: 'n2-3',
      level: 'N2',
      category: 'Reading',
      q: '「彼の実力は周囲も認めざるを得ない。」 Maksud tersirat dari kalimat ini adalah...',
      options: ['Orang sekitar meremehkannya', 'Orang sekitar terpaksa mengakui kehebatannya', 'Dia tidak memiliki kemampuan apa-apa', 'Dia menolak diakui orang lain'],
      correct: 1
    }
  ],
  n1: [
    {
      id: 'n1-1',
      level: 'N1',
      category: 'Grammar',
      q: 'Pola 「〜を皮切りに」 bermakna...',
      options: ['Mengakhiri rangkaian acara', 'Diawali oleh satu peristiwa lalu disusul peristiwa serupa beruntun', 'Menyembunyikan fakta utama', 'Memotong pembicaraan orang'],
      correct: 1
    },
    {
      id: 'n1-2',
      level: 'N1',
      category: 'Kanji',
      q: 'Cara baca kanji 「巧み」 yang tepat adalah...',
      options: ['たくみ (takumi)', 'くるしみ (kurushimi)', 'あやしみ (ayashimi)', 'いとなみ (itonami)'],
      correct: 0
    },
    {
      id: 'n1-3',
      level: 'N1',
      category: 'Vocab',
      q: 'Makna dari ungkapan sastra 「手持ち無沙汰」(temochibusata) adalah...',
      options: ['Sangat sibuk tiada henti', 'Merasa bosan karena tak ada yang bisa dikerjakan', 'Kehilangan pegangan hidup', 'Kekurangan modal usaha'],
      correct: 1
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

  // Active Question
  const [activeQuestion, setActiveQuestion] = useState(null);

  const startTest = () => {
    setUsedQuestionIds([]);
    setQuestionCount(1);
    setAnswersHistory([]);
    setSelectedOption(null);
    setCurrentLevelIdx(1); // start at N4

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
    }, 700);
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
    let desc = 'Kamu memahami dasar-dasar alfabet dan tata bahasa esensial. Mulailah dari kosakata dan kanji N5 untuk membangun fondasi kokoh!';

    if (correctWeighted >= 35) {
      recommendedLevel = 'N1';
      title = 'Tingkat Mahir / Fluent (N1)';
      desc = 'Penguasaan nuansa bahasa, peribahasa, dan struktur kalimat sastramu sangat tinggi. Fokus pada pengasahan ekspresi bisnis & idiom langka!';
    } else if (correctWeighted >= 26) {
      recommendedLevel = 'N2';
      title = 'Pra-Mahir / Menengah Atas (N2)';
      desc = 'Kamu memiliki pemahaman tata bahasa kompleks dan bacaan koran yang baik. Tingkatkan perbendaharaan kanji jukugo dan keigo formal!';
    } else if (correctWeighted >= 18) {
      recommendedLevel = 'N3';
      title = 'Jembatan Menengah (N3)';
      desc = 'Kamu sudah melampaui fase dasar! Mulailah memperdalam konjugasi bersyarat, percakapan natural, dan nuansa partikel afektif.';
    } else if (correctWeighted >= 10) {
      recommendedLevel = 'N4';
      title = 'Dasar Menengah (N4)';
      desc = 'Pemahaman kalimat dasar dan partikelmu sudah terbentuk. Lanjutkan ke bentuk te-form, kalimat pasif/kausatif, dan kanji harian.';
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
      totalCorrect,
      breakdown
    };
  };

  const result = calculateResult();

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6 text-teal-500" />
              <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Tes Penempatan Level Adaptif (CAT Diagnostic)
              </h1>
            </div>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Sistem diagnostik terkomputerisasi yang menyesuaikan tingkat kesulitan secara real-time (N5 - N1)
            </p>
          </div>
        </div>
      </div>

      {/* Intro Screen */}
      {testState === 'intro' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              Temukan Titik Awal Belajar yang Paling Tepat
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Bingung harus mulai belajar dari N5, N4, atau langsung ke N3? Tes CAT ini terdiri dari 12 pertanyaan cerdas. Soal akan otomatis menjadi lebih sulit saat Anda menjawab benar, dan menyesuaikan bila keliru.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <span className="text-xs font-bold text-teal-600 uppercase">12 Soal Cepat</span>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Estimasi waktu ~4-5 menit saja</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <span className="text-xs font-bold text-teal-600 uppercase">4 Pilar Kompetensi</span>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Kanji, Kosakata, Tata Bahasa, & Membaca</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <span className="text-xs font-bold text-teal-600 uppercase">Rencana Belajar</span>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Rekomendasi modul langsung sekali klik</p>
            </div>
          </div>

          <button
            onClick={startTest}
            className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold text-base rounded-2xl shadow-lg transition"
          >
            Mulai Tes Diagnostik Sekarang 🎯
          </button>
        </div>
      )}

      {/* Active Testing Screen */}
      {testState === 'testing' && activeQuestion && (
        <div className="space-y-4">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
            <span>Soal {questionCount} dari {TOTAL_QUESTIONS}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              Kesulitan Soal Saat Ini: {activeQuestion.level} ({activeQuestion.category})
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-teal-500 h-full transition-all duration-300"
              style={{ width: `${(questionCount / TOTAL_QUESTIONS) * 100}%` }}
            />
          </div>

          {/* Question Box */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-lg space-y-6">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white leading-relaxed">
              {activeQuestion.q}
            </h2>

            <div className="space-y-3">
              {activeQuestion.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === activeQuestion.correct;

                let btnStyle = 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 text-gray-800 dark:text-gray-200 hover:border-teal-500 hover:bg-teal-50/40 dark:hover:bg-teal-950/30';
                if (selectedOption !== null) {
                  if (isSelected && isCorrect) btnStyle = 'border-emerald-500 bg-emerald-500 text-white';
                  else if (isSelected && !isCorrect) btnStyle = 'border-red-500 bg-red-500 text-white';
                  else if (isCorrect) btnStyle = 'border-emerald-600 bg-emerald-600 text-white';
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedOption !== null}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-sm md:text-base transition-all duration-200 flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOption !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Result Screen */}
      {testState === 'result' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-500 flex items-center justify-center mx-auto shadow-md">
              <Award className="w-8 h-8 text-white" />
            </div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-teal-600 dark:text-teal-400 block">
              Hasil Analisis Kemampuan Adaptif
            </span>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">
              Rekomendasi Level: <span className="text-teal-600 dark:text-teal-400">{result.recommendedLevel}</span>
            </h2>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
              {result.title}
            </p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
              {result.desc}
            </p>
          </div>

          {/* Competency Breakdown Bars */}
          <div className="bg-gray-50 dark:bg-gray-900/60 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Pemetaan Skor Berdasarkan Kompetensi:
            </h4>
            {Object.entries(result.breakdown).map(([cat, score]) => (
              <div key={cat} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
                  <span>{cat}</span>
                  <span>{score}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Action Recommendations */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Rekomendasi Modul Pertama Anda:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => onNavigateToModule && onNavigateToModule('vocab')}
                className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-teal-500 text-left flex items-center justify-between group transition"
              >
                <div>
                  <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Kosakata {result.recommendedLevel}</p>
                  <p className="text-xs text-gray-500">Kuasai target kata kunci level ini</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-teal-500 group-hover:translate-x-1 transition" />
              </button>

              <button
                onClick={() => onNavigateToModule && onNavigateToModule('grammar')}
                className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-teal-500 text-left flex items-center justify-between group transition"
              >
                <div>
                  <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Tata Bahasa {result.recommendedLevel}</p>
                  <p className="text-xs text-gray-500">Pelajari pola kalimat esensial</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-teal-500 group-hover:translate-x-1 transition" />
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={startTest}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 font-bold text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <RotateCcw className="w-4 h-4" /> Ulangi Tes
            </button>
            <button
              onClick={onBack}
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow transition"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
