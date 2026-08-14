import React, { useState, useEffect, useRef } from 'react';
import { buildJLPTTest, LEVEL_COUNTS } from '../utils/jlptGen';
import { useLevelData } from '../data/loader';
import { markChecklistDone } from '../utils/checklist';
import '../jlpt.css';

// Struktur ujian meniru JLPT asli: 4 seksi, masing-masing dengan waktu sendiri.
const SECTIONS = [
  {
    key: 'mojigoi',
    jp: '文字・語彙',
    label: 'Kosakata & Kanji',
    desc: 'Membaca kanji (問題1), penulisan kanji (問題2), pilihan kata sesuai konteks (問題3), dan arti kata (問題4).',
  },
  {
    key: 'bunpo',
    jp: '文法',
    label: 'Tata Bahasa',
    desc: 'Partikel (文法1), pola tata bahasa (文法2), dan menyusun kalimat 並べ替え (文法3).',
  },
  {
    key: 'dokkai',
    jp: '読解',
    label: 'Membaca',
    desc: 'Memahami arti kalimat pendek (短文読解).',
  },
  {
    key: 'chokai',
    jp: '聴解',
    label: 'Mendengarkan',
    desc: 'Soal dibacakan lewat audio — teks disembunyikan saat ujian, transkrip muncul di pembahasan.',
  },
];

// Durasi seksi per level (menit → detik), mengikuti alokasi waktu JLPT asli.
const LEVEL_TIMES = {
  N5: { mojigoi: 25 * 60, bunpo: 20 * 60, dokkai: 30 * 60, chokai: 30 * 60 },
  N4: { mojigoi: 30 * 60, bunpo: 25 * 60, dokkai: 35 * 60, chokai: 35 * 60 },
  N3: { mojigoi: 30 * 60, bunpo: 30 * 60, dokkai: 40 * 60, chokai: 40 * 60 },
  N2: { mojigoi: 35 * 60, bunpo: 30 * 60, dokkai: 40 * 60, chokai: 50 * 60 },
  N1: { mojigoi: 35 * 60, bunpo: 35 * 60, dokkai: 40 * 60, chokai: 55 * 60 },
};

const PASS_PCT = 60; // ambang lulus ala simulasi (skala sederhana)

export default function JLPTTest({ currentLevel, studyStats, setStudyStats }) {
  const [screen, setScreen] = useState('start'); // 'start' | 'section' | 'result'
  const [level, setLevel] = useState(currentLevel);
  const [sections, setSections] = useState([]); // [{...meta, questions: []}]
  const [sectionIdx, setSectionIdx] = useState(0);
  const [answers, setAnswers] = useState([]); // per seksi: array jawaban per soal
  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [results, setResults] = useState(null);
  const finishingRef = useRef(false);

  const { data: levelData, loading: dataLoading } = useLevelData(level);
  const activeSection = sections[sectionIdx] || null;

  // ⏱️ Hitung mundur per seksi
  useEffect(() => {
    if (screen !== 'section') return undefined;
    const id = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [screen, sectionIdx]);

  // ⏱️ Waktu habis → kumpulkan otomatis
  useEffect(() => {
    if (screen === 'section' && timeLeft === 0 && !finishingRef.current) {
      handleSectionDone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, screen]);

  const speak = (text, e) => {
    if (e) e.stopPropagation();
    if (!text || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  // 🔊 Putar audio otomatis saat soal listening tampil (dan saat pindah soal).
  useEffect(() => {
    if (screen !== 'section' || !activeSection) return undefined;
    const q = activeSection.questions[currentQ];
    if (q && q.audio && 'speechSynthesis' in window) {
      const t = setTimeout(() => speak(q.audio), 400);
      return () => clearTimeout(t);
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, sectionIdx, currentQ]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // ── Alur ujian ──

  const startTest = () => {
    if (!levelData) return;
    const built = buildJLPTTest(level, levelData);
    const times = LEVEL_TIMES[level] || LEVEL_TIMES.N5;
    const secs = SECTIONS.map((meta) => ({
      ...meta,
      seconds: times[meta.key],
      questions: built[meta.key],
    }));
    setSections(secs);
    setAnswers(secs.map((s) => s.questions.map(() => null)));
    setSectionIdx(0);
    setCurrentQ(0);
    setTimeLeft(secs[0].seconds);
    finishingRef.current = false;
    setResults(null);
    setScreen('section');
  };

  const isAnswerCorrect = (q, answer) => {
    if (answer === null || answer === undefined) return false;
    if (q.type === 'REORDER') return JSON.stringify(answer) === JSON.stringify(q.order);
    return answer === q.correct;
  };

  const handleSectionDone = () => {
    if (finishingRef.current) return;
    finishingRef.current = true;
    if (sectionIdx < SECTIONS.length - 1) {
      const next = sectionIdx + 1;
      setSectionIdx(next);
      setCurrentQ(0);
      setTimeLeft(sections[next].seconds);
      finishingRef.current = false; // seksi baru, boleh kumpul lagi
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    const secResults = sections.map((sec, si) => {
      const qs = sec.questions;
      const ans = answers[si];
      let correct = 0;
      const wrong = [];
      qs.forEach((q, qi) => {
        if (isAnswerCorrect(q, ans[qi])) correct++;
        else wrong.push({ q, chosen: ans[qi] });
      });
      return {
        key: sec.key,
        jp: sec.jp,
        label: sec.label,
        correct,
        total: qs.length,
        pct: qs.length ? Math.round((correct / qs.length) * 100) : 0,
        wrong,
      };
    });
    const totalCorrect = secResults.reduce((s, r) => s + r.correct, 0);
    const totalQ = secResults.reduce((s, r) => s + r.total, 0);
    const overall = totalQ ? Math.round((totalCorrect / totalQ) * 100) : 0;
    setResults({ sections: secResults, totalCorrect, totalQ, overall });
    setScreen('result');

    // Tandai checklist harian (quiz) — ujian selesai dihitung 1 kuis
    if (setStudyStats && studyStats) {
      const updated = markChecklistDone(studyStats, 'quiz');
      setStudyStats(updated);
      localStorage.setItem('nihongo_spark_stats', JSON.stringify(updated));
    }
  };

  // ── Interaksi jawaban ──

  const updateAnswer = (qIdx, value) => {
    setAnswers((prev) => {
      const next = prev.map((sec) => [...sec]);
      next[sectionIdx][qIdx] = value;
      return next;
    });
  };

  const selectOption = (qIdx, option) => updateAnswer(qIdx, option);

  const addToOrder = (qIdx, chunk) => {
    const current = answers[sectionIdx][qIdx] || [];
    if (current.length >= activeSection.questions[qIdx].options.length) return;
    updateAnswer(qIdx, [...current, chunk]);
  };

  const removeFromOrder = (qIdx, position) => {
    const current = answers[sectionIdx][qIdx] || [];
    updateAnswer(qIdx, current.filter((_, i) => i !== position));
  };

  const isAnswered = (qIdx) => {
    const a = answers[sectionIdx]?.[qIdx];
    if (a === null || a === undefined) return false;
    const q = activeSection.questions[qIdx];
    if (q.type === 'REORDER') return a.length === q.options.length;
    return true;
  };

  // ── Render bagian-bagian ──

  const renderOptions = (q, qIdx) => {
    if (q.type === 'REORDER') {
      const chosen = answers[sectionIdx][qIdx] || [];
      const remaining = q.options.filter((ch) => !chosen.includes(ch));
      return (
        <div className="jlpt-reorder">
          <div className="jlpt-reorder-zone">
            {chosen.length === 0 && (
              <span className="jlpt-reorder-hint">Klik bagian-bagian di bawah untuk menyusun kalimat</span>
            )}
            {chosen.map((ch, i) => (
              <button
                key={`${ch}-${i}`}
                className="jlpt-chunk jlpt-chunk-placed"
                onClick={() => removeFromOrder(qIdx, i)}
                title="Klik untuk membatalkan posisi ini"
              >
                {ch}
              </button>
            ))}
          </div>
          <div className="jlpt-chunk-pool">
            {remaining.map((ch, i) => (
              <button key={`${ch}-${i}`} className="jlpt-chunk" onClick={() => addToOrder(qIdx, ch)}>
                {ch}
              </button>
            ))}
            {remaining.length === 0 && <span className="jlpt-reorder-done">✓ Semua bagian tersusun</span>}
          </div>
        </div>
      );
    }

    return (
      <div className="quiz-options">
        {q.options.map((opt, i) => (
          <button
            key={i}
            className={`quiz-option-btn ${answers[sectionIdx][qIdx] === opt ? 'jlpt-selected' : ''}`}
            onClick={() => selectOption(qIdx, opt)}
          >
            <span>{opt}</span>
            {q.section === 'chokai' && (
              <span
                className="jlpt-opt-audio"
                onClick={(e) => { e.stopPropagation(); speak(opt, e); }}
                role="button"
                title="Dengarkan opsi"
                aria-label="Dengarkan opsi ini"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              </span>
            )}
          </button>
        ))}
      </div>
    );
  };

  const renderQuestion = (q, qIdx) => (
    <div className="glass-panel jlpt-question-card">
      <div className="quiz-question-type">{q.badge}</div>
      <div className="quiz-question">{q.question}</div>

      {q.section === 'chokai' ? (
        <div className="jlpt-audio-box">
          <button className="jlpt-audio-replay" onClick={(e) => speak(q.audio, e)}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
            Putar Audio
          </button>
          <span className="jlpt-audio-hint">🎧 Dengarkan dengan saksama. Teks baru ditampilkan di pembahasan.</span>
        </div>
      ) : (
        q.jp && (
          <div className="jlpt-question-jp">
            <span className="jp-text">{q.jp}</span>
            <button className="audio-btn" onClick={(e) => speak(q.jp, e)} title="Dengarkan" aria-label="Dengarkan teks Jepang">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            </button>
          </div>
        )
      )}

      {renderOptions(q, qIdx)}
    </div>
  );

  // ── LAYAR: mulai ──
  if (screen === 'start') {
    return (
      <div className="jlpt-view">
        <div className="glass-panel jlpt-start">
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            Ujian Simulasi <span className="text-gradient">JLPT</span> 🎌
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '560px', margin: '0 auto 1.5rem' }}>
            Latihan dengan format soal seperti ujian JLPT asli: 4 seksi berurutan dengan waktu sendiri-sendiri.
            Soal diacak dari materi level yang dipilih.
          </p>

          <div className="jlpt-level-select">
            <span className="jlpt-level-label">Pilih level:</span>
            {['N5', 'N4', 'N3', 'N2', 'N1'].map((lv) => (
              <button
                key={lv}
                className={`jlpt-level-btn ${lv === level ? 'active' : ''}`}
                onClick={() => setLevel(lv)}
              >
                {lv}
              </button>
            ))}
          </div>

          <div className="jlpt-section-cards">
            {SECTIONS.map((sec) => (
              <div key={sec.key} className="jlpt-section-card">
                <div className="jlpt-section-card-head">
                  <span className="jlpt-section-jp">{sec.jp}</span>
                  <span className="jlpt-section-label">{sec.label}</span>
                </div>
                <p>{sec.desc}</p>
                <div className="jlpt-section-time">⏱ {formatTime(LEVEL_TIMES[level]?.[sec.key] || 0)}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Total <strong style={{ color: 'var(--accent-cyan)' }}>{level}</strong>: {LEVEL_COUNTS[level].mojigoi + LEVEL_COUNTS[level].bunpo + LEVEL_COUNTS[level].dokkai + LEVEL_COUNTS[level].chokai} soal · ±{' '}
            {Math.round(Object.values(LEVEL_TIMES[level]).reduce((a, b) => a + b, 0) / 60)} menit
          </div>

          <button
            className="start-quiz-btn jlpt-start-btn"
            onClick={startTest}
            disabled={dataLoading}
            style={{ opacity: dataLoading ? 0.6 : 1, cursor: dataLoading ? 'wait' : 'pointer' }}
          >
            {dataLoading ? '⏳ Memuat data level…' : '🎌 Mulai Ujian'}
          </button>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
            Nilai lulus simulasi: ≥ {PASS_PCT}% keseluruhan. Waktu habis = seksi dikumpulkan otomatis.
          </p>
        </div>
      </div>
    );
  }

  // ── LAYAR: seksi ujian ──
  if (screen === 'section' && activeSection) {
    const qs = activeSection.questions;
    const q = qs[currentQ];
    if (!q) {
      return (
        <div className="jlpt-view">
          <div className="glass-panel" style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Tidak ada soal untuk level ini.</p>
            <button className="start-quiz-btn" style={{ marginTop: '1rem' }} onClick={() => setScreen('start')}>
              Kembali
            </button>
          </div>
        </div>
      );
    }

    const lowTime = timeLeft <= 60;

    return (
      <div className="jlpt-view">
        {/* Header seksi */}
        <div className="glass-panel jlpt-section-banner">
          <div>
            <div className="jlpt-section-title">
              <span className="jlpt-section-jp">{activeSection.jp}</span>
              <span className="jlpt-section-label">{activeSection.label}</span>
              <span className="jlpt-section-pos">
                Seksi {sectionIdx + 1} dari {SECTIONS.length}
              </span>
            </div>
            <div className="jlpt-progress-text">
              Soal {currentQ + 1} dari {qs.length}
            </div>
          </div>
          <div className={`jlpt-timer ${lowTime ? 'jlpt-timer-low' : ''}`}>
            ⏱ {formatTime(timeLeft)}
          </div>
        </div>

        {/* Palette nomor soal */}
        <div className="jlpt-palette">
          {qs.map((_, i) => (
            <button
              key={i}
              className={`jlpt-palette-btn ${i === currentQ ? 'current' : ''} ${isAnswered(i) ? 'answered' : ''}`}
              onClick={() => setCurrentQ(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {renderQuestion(q, currentQ)}

        {/* Navigasi */}
        <div className="jlpt-nav">
          <button
            className="canvas-btn canvas-btn-clear"
            onClick={() => setCurrentQ((i) => Math.max(0, i - 1))}
            disabled={currentQ === 0}
            style={{ opacity: currentQ === 0 ? 0.4 : 1 }}
          >
            ← Sebelumnya
          </button>
          {currentQ < qs.length - 1 ? (
            <button className="start-quiz-btn" onClick={() => setCurrentQ((i) => i + 1)}>
              Berikutnya →
            </button>
          ) : (
            <button className="start-quiz-btn" onClick={handleSectionDone}>
              {sectionIdx < SECTIONS.length - 1 ? 'Kumpulkan & Lanjut Seksi →' : 'Kumpulkan Ujian 🏁'}
            </button>
          )}
        </div>

        <button
          className="jlpt-exit-link"
          onClick={() => {
            if (window.confirm('Yakin ingin membatalkan ujian? Semua jawaban akan hilang.')) {
              setScreen('start');
            }
          }}
        >
          ✕ Batalkan ujian
        </button>
      </div>
    );
  }

  // ── LAYAR: hasil ──
  if (screen === 'result' && results) {
    const passed = results.overall >= PASS_PCT;
    const allWrong = results.sections.flatMap((s) => s.wrong.map((w) => ({ ...w, sec: s })));

    return (
      <div className="jlpt-view">
        <div className={`glass-panel jlpt-result-verdict ${passed ? 'pass' : 'fail'}`}>
          <div style={{ fontSize: '3.5rem' }}>{passed ? '🎉' : '📚'}</div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: '700' }}>
            {passed ? '合格 — Lulus!' : '不合格 — Belum Lulus'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
            Skor Anda: <strong style={{ fontSize: '1.4rem', color: 'var(--accent-cyan)' }}>{results.totalCorrect}</strong> dari {results.totalQ} soal ({results.overall}%)
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            Ambang lulus simulasi: {PASS_PCT}%
          </p>
        </div>

        <div className="jlpt-result-sections">
          {results.sections.map((s) => (
            <div key={s.key} className="glass-panel jlpt-result-section">
              <div className="jlpt-result-section-head">
                <span className="jlpt-section-jp">{s.jp}</span>
                <span className="jlpt-section-label">{s.label}</span>
                <span className="jlpt-result-score">
                  {s.correct}/{s.total} · {s.pct}%
                </span>
              </div>
              <div className="jlpt-result-bar">
                <div className="jlpt-result-fill" style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        {allWrong.length > 0 && (
          <div className="jlpt-review">
            <h2 style={{ fontSize: '1.1rem', fontWeight: '700', margin: '0 0 1rem' }}>
              Pembahasan Jawaban Salah ({allWrong.length})
            </h2>
            {allWrong.map(({ q, chosen, sec }, i) => (
              <div key={i} className="glass-panel jlpt-review-item">
                <div className="quiz-question-type">{sec.jp} · {q.badge}</div>
                <div className="quiz-question">{q.question}</div>
                {q.jp && <div className="jlpt-question-jp"><span className="jp-text">{q.jp}</span></div>}
                {q.section === 'chokai' && q.transcript && (
                  <div className="jlpt-review-transcript">
                    <span className="jlpt-review-transcript-label">🎧 Transkrip</span>
                    <span className="jp-text">{q.transcript}</span>
                  </div>
                )}
                {q.type === 'REORDER' && (
                  <div className="jlpt-review-reorder">
                    <div>Jawaban Anda: <span className="jlpt-review-wrong">{Array.isArray(chosen) ? chosen.join('') : '—'}</span></div>
                    <div>Jawaban benar: <span className="jlpt-review-right">{q.order.join('')}</span></div>
                  </div>
                )}
                {q.type !== 'REORDER' && (
                  <div className="jlpt-review-options">
                    {q.options.map((opt, oi) => (
                      <div
                        key={oi}
                        className={`jlpt-review-opt ${opt === q.correct ? 'right' : ''} ${opt === chosen ? 'chosen' : ''}`}
                      >
                        {opt === q.correct ? '✓ ' : opt === chosen ? '✗ ' : ''}{opt}
                      </div>
                    ))}
                  </div>
                )}
                {q.explain && (
                  <div className="jlpt-review-explain">
                    <div className="jp-text">{q.explain.example}</div>
                    {q.explain.reading && <div className="jlpt-review-reading">{q.explain.reading}</div>}
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                      {q.explain.meaning || q.explain.exampleMeaning}
                    </div>
                    {q.explain.note && (
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                        💡 {q.explain.note}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="jlpt-nav" style={{ marginTop: '1.5rem' }}>
          <button className="canvas-btn canvas-btn-clear" onClick={() => setScreen('start')}>
            ← Ganti Level
          </button>
          <button className="start-quiz-btn" onClick={startTest}>
            🔁 Ujian Ulang (Level {level})
          </button>
        </div>
      </div>
    );
  }

  return null;
}
