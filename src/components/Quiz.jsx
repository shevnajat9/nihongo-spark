import React, { useState } from 'react';
import { useLevelData } from '../data/loader';
import { markChecklistDone } from '../utils/checklist';
import { loadProgress, saveProgress, reviewItem, isDue } from '../utils/srs';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function Quiz({ currentLevel, studyStats, setStudyStats }) {
  const { data, loading } = useLevelData(currentLevel);
  const vocabData = data ? data.vocab : [];
  const kanjiData = data ? data.kanji : [];
  const grammarData = data ? data.grammar : [];
  const [isPlaying, setIsPlaying] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizMode, setQuizMode] = useState('normal'); // 'normal' | 'due'
  const [autoSpeak, setAutoSpeak] = useState(() => {
    return localStorage.getItem('nihongo_spark_auto_speak') === 'true';
  });

  // Sound generator using Web Audio API
  const playSound = (type) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.start();
        setTimeout(() => { osc.frequency.setValueAtTime(880, ctx.currentTime); }, 100);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
        osc.stop(ctx.currentTime + 0.45);
      }
    } catch (err) {
      console.warn('Web Audio API not supported:', err);
    }
  };

  // Speak text in Japanese using universal audio player
  const speak = (text, e) => {
    if (e) e.stopPropagation();
    playJapaneseSpeech(text, { rate: 0.85 });
  };

  // Build question pool — mode 'due' fokus ke item yang waktunya diulang per srs.js
  const buildPool = (mode) => {
    const vocabProgress = loadProgress('nihongo_spark_vocab_progress');
    const kanjiProgress = loadProgress('nihongo_spark_kanji_progress');

    let levelVocab = vocabData.filter(v => v.level === currentLevel);
    let levelKanji = kanjiData.filter(k => k.level === currentLevel);

    if (mode === 'due') {
      const dueVocab = levelVocab.filter(v => isDue(vocabProgress, `${v.level}__${v.word}`));
      const dueKanji = levelKanji.filter(k => isDue(kanjiProgress, `${k.level}__${k.kanji}`));
      if (dueVocab.length + dueKanji.length > 0) {
        levelVocab = dueVocab;
        levelKanji = dueKanji;
      }
    }

    const levelGrammar = grammarData.filter(g => g.level === currentLevel);
    const pool = [];

    // 1. Vocabulary translation questions
    levelVocab.forEach(v => {
      const otherMeanings = vocabData
        .filter(x => x.word !== v.word)
        .map(x => x.meaning);
      const shuffledOthers = otherMeanings.sort(() => 0.5 - Math.random()).slice(0, 3);
      pool.push({
        type: 'VOCABULARY',
        question: `Apa arti dari kosakata "${v.word}" (${v.reading})?`,
        correct: v.meaning,
        options: [v.meaning, ...shuffledOthers].sort(() => 0.5 - Math.random()),
        // SRS integration
        srsKey: 'nihongo_spark_vocab_progress',
        srsId: `${v.level}__${v.word}`,
        // Feedback
        word: v.word,
        example: v.example || null,
        exampleReading: v.exampleReading || null,
        exampleMeaning: v.exampleMeaning || null,
      });
    });

    // 2. Kanji meaning questions
    levelKanji.forEach(k => {
      const otherMeanings = kanjiData
        .filter(x => x.kanji !== k.kanji)
        .map(x => x.meanings[0]);
      const shuffledOthers = otherMeanings.sort(() => 0.5 - Math.random()).slice(0, 3);
      pool.push({
        type: 'KANJI MEANING',
        question: `Apa arti utama dari Kanji "${k.kanji}"?`,
        correct: k.meanings[0],
        options: [k.meanings[0], ...shuffledOthers].sort(() => 0.5 - Math.random()),
        srsKey: 'nihongo_spark_kanji_progress',
        srsId: `${k.level}__${k.kanji}`,
        word: k.kanji,
        example: k.examples?.[0] ? `${k.examples[0].word} (${k.examples[0].reading})` : null,
        exampleMeaning: k.examples?.[0]?.meaning || null,
      });
    });

    // 3. Kanji reading questions
    levelKanji.forEach(k => {
      const allReadings = [...k.kunyomi, ...k.onyomi];
      if (allReadings.length === 0) return;
      const correctReading = allReadings[0];
      const otherReadings = kanjiData
        .filter(x => x.kanji !== k.kanji)
        .flatMap(x => [...x.kunyomi, ...x.onyomi])
        .filter(r => r !== correctReading);
      const shuffledOthers = otherReadings.sort(() => 0.5 - Math.random()).slice(0, 3);
      pool.push({
        type: 'KANJI READING',
        question: `Bagaimana salah satu cara membaca Kanji "${k.kanji}"?`,
        correct: correctReading,
        options: [correctReading, ...shuffledOthers].sort(() => 0.5 - Math.random()),
        srsKey: 'nihongo_spark_kanji_progress',
        srsId: `${k.level}__${k.kanji}`,
        word: k.kanji,
      });
    });

    // 4. Grammar particle fill-in-the-blank
    levelGrammar.forEach(g => {
      g.examples.forEach(ex => {
        const particles = ['は', 'が', 'を', 'に', 'へ', 'と', 'で', 'の'];
        let replaced = false;
        let questionText = ex.sentence;
        let correctParticle = '';
        for (let p of particles) {
          if (ex.sentence.includes(p)) {
            questionText = ex.sentence.replace(p, ' ___ ');
            correctParticle = p;
            replaced = true;
            break;
          }
        }
        if (replaced) {
          const wrongOptions = particles.filter(p => p !== correctParticle).sort(() => 0.5 - Math.random()).slice(0, 3);
          pool.push({
            type: 'GRAMMAR PARTICLES',
            question: `Isi bagian yang kosong: "${questionText}"`,
            correct: correctParticle,
            options: [correctParticle, ...wrongOptions].sort(() => 0.5 - Math.random()),
            srsKey: null,
            example: ex.sentence || null,
          });
        }
      });
    });

    return pool;
  };

  const generateQuiz = (mode = 'normal') => {
    if (!data) return;
    setQuizMode(mode);
    const pool = buildPool(mode);
    const selected = pool.sort(() => 0.5 - Math.random()).slice(0, 5);
    setQuestions(selected);
    setCurrentIdx(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedOption(null);
    setQuizFinished(false);
    setIsPlaying(true);
  };

  const handleOptionSelect = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const currentQ = questions[currentIdx];
    const isCorrect = option === currentQ.correct;

    if (isCorrect) {
      setScore(prev => prev + 1);
      playSound('correct');
    } else {
      playSound('wrong');
    }

    // ✅ SRS Integration: update progress vocab/kanji berdasarkan hasil jawaban
    if (currentQ.srsKey && currentQ.srsId) {
      const progress = loadProgress(currentQ.srsKey);
      const updated = reviewItem(progress, currentQ.srsId, isCorrect);
      saveProgress(currentQ.srsKey, updated);
    }

    // ✅ Auto Speak trigger on quiz answer
    if (autoSpeak) {
      speak(currentQ.example || currentQ.word);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizFinished(true);
    setIsPlaying(false);
    let updatedStats = { ...studyStats, totalQuizzes: (studyStats.totalQuizzes || 0) + 1 };
    updatedStats = markChecklistDone(updatedStats, 'quiz');
    setStudyStats(updatedStats);
    localStorage.setItem('nihongo_spark_stats', JSON.stringify(updatedStats));
  };

  // Hitung item due untuk tampilan tombol mode review
  const vocabProgress = loadProgress('nihongo_spark_vocab_progress');
  const kanjiProgress = loadProgress('nihongo_spark_kanji_progress');
  const dueVocabCount = vocabData.filter(v => v.level === currentLevel && isDue(vocabProgress, `${v.level}__${v.word}`)).length;
  const dueKanjiCount = kanjiData.filter(k => k.level === currentLevel && isDue(kanjiProgress, `${k.level}__${k.kanji}`)).length;
  const totalDue = dueVocabCount + dueKanjiCount;

  const currentQ = questions[currentIdx];

  if (loading) {
    return (
      <div className="quiz-view">
        <div className="glass-panel" style={{ textAlign: 'center', padding: '2.5rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>⏳ Memuat soal level {currentLevel}…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-view">
      {/* ── LAYAR AWAL ── */}
      {!isPlaying && !quizFinished && (
        <div className="glass-panel quiz-welcome">
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            Latihan Kuis <span className="text-gradient">Nihongo</span> 🏆
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
            Uji pemahaman Anda untuk level <strong style={{ color: 'var(--accent-cyan)' }}>{currentLevel}</strong>. Kuis terdiri dari 5 pertanyaan pilihan ganda dari Kosakata, Kanji, dan Tata Bahasa.
          </p>

          <label style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '0.5rem', 
            fontSize: '0.85rem', 
            color: 'var(--text-secondary)', 
            cursor: 'pointer', 
            margin: '1.5rem auto -0.5rem auto',
            userSelect: 'none',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '0.4rem 1rem',
            borderRadius: '30px',
            border: '1px solid var(--glass-border)'
          }}>
            <input 
              type="checkbox" 
              checked={autoSpeak} 
              onChange={(e) => {
                setAutoSpeak(e.target.checked);
                localStorage.setItem('nihongo_spark_auto_speak', e.target.checked ? 'true' : 'false');
              }}
              style={{ cursor: 'pointer' }}
            />
            🔊 Putar Suara Contoh Otomatis
          </label>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '2rem' }}>
            <button className="start-quiz-btn" onClick={() => generateQuiz('normal')}>
              🎲 Mulai Kuis Acak
            </button>

            {totalDue > 0 && (
              <button
                className="start-quiz-btn"
                style={{
                  background: 'linear-gradient(135deg, rgba(244,63,94,0.25) 0%, rgba(251,113,133,0.15) 100%)',
                  border: '1px solid rgba(244,63,94,0.4)',
                  color: '#fda4af'
                }}
                onClick={() => generateQuiz('due')}
              >
                🔁 Ulang Item Due ({totalDue} item)
              </button>
            )}
          </div>

          {totalDue > 0 && (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.75rem', textAlign: 'center' }}>
              Ada <strong style={{ color: '#fda4af' }}>{totalDue}</strong> item yang waktunya diulang agar tidak terlupakan.
            </p>
          )}
        </div>
      )}

      {/* ── LAYAR KUIS ── */}
      {isPlaying && questions.length > 0 && currentQ && (
        <div className="glass-panel quiz-container">
          <div className="quiz-header">
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>
              PERTANYAAN {currentIdx + 1} DARI {questions.length}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {quizMode === 'due' && (
                <span style={{
                  fontSize: '0.75rem',
                  background: 'rgba(244,63,94,0.15)',
                  color: '#fda4af',
                  padding: '2px 8px',
                  borderRadius: '30px',
                  border: '1px solid rgba(244,63,94,0.3)'
                }}>
                  🔁 Mode Review
                </span>
              )}
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                Level {currentLevel}
              </span>
              <button
                className="quiz-exit-btn"
                onClick={() => { setIsPlaying(false); setQuestions([]); }}
                aria-label="Batalkan kuis"
              >
                Batalkan
              </button>
            </div>
          </div>

          <div className="quiz-progress-bar">
            <div
              className="quiz-progress-fill"
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="quiz-question-box">
            <div className="quiz-question-type">{currentQ.type}</div>
            <div className="quiz-question">{currentQ.question}</div>
          </div>

          <div className="quiz-options">
            {currentQ.options.map((option, idx) => {
              let btnClass = '';
              if (isAnswered) {
                if (option === currentQ.correct) btnClass = 'correct';
                else if (option === selectedOption) btnClass = 'wrong';
              }
              return (
                <button
                  key={idx}
                  className={`quiz-option-btn ${btnClass}`}
                  onClick={() => handleOptionSelect(option)}
                  disabled={isAnswered}
                >
                  <span>{option}</span>
                  {btnClass === 'correct' && <span className="quiz-option-icon correct" aria-label="Jawaban benar">✓</span>}
                  {btnClass === 'wrong' && <span className="quiz-option-icon wrong" aria-label="Jawaban salah">✗</span>}
                </button>
              );
            })}
          </div>

          {/* ✅ Feedback + Contoh Kalimat setelah menjawab */}
          {isAnswered && (
            <div className={`quiz-feedback-box ${selectedOption === currentQ.correct ? 'feedback-correct' : 'feedback-wrong'}`}>
              <div className="quiz-feedback-header">
                {selectedOption === currentQ.correct
                  ? <span>✓ Benar! Progress SRS diperbarui ↑</span>
                  : <span>✗ Salah — Jawaban benar: <strong>{currentQ.correct}</strong>. Progress SRS diperbarui ↓</span>
                }
              </div>

              {currentQ.example && (
                <div className="quiz-feedback-example">
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>
                    Contoh Kalimat
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-jp)', fontSize: '1rem', color: 'var(--accent-cyan)', fontWeight: '600' }}>
                        {currentQ.example}
                      </div>
                      {currentQ.exampleReading && (
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.2rem' }}>
                          {currentQ.exampleReading}
                        </div>
                      )}
                      {currentQ.exampleMeaning && (
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                          {currentQ.exampleMeaning}
                        </div>
                      )}
                    </div>
                    <button
                      className="audio-btn"
                      onClick={(e) => speak(currentQ.example, e)}
                      title="Dengarkan kalimat"
                      aria-label="Dengarkan kalimat contoh"
                      style={{ flexShrink: 0, marginTop: '2px' }}
                    >
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {isAnswered && (
            <button className="quiz-next-btn" onClick={handleNext}>
              {currentIdx < questions.length - 1 ? 'Pertanyaan Berikutnya →' : 'Selesaikan Kuis'}
            </button>
          )}
        </div>
      )}

      {/* ── LAYAR HASIL ── */}
      {quizFinished && (
        <div className="glass-panel quiz-welcome quiz-finished">
          <div style={{ fontSize: '4.5rem', marginBottom: '1rem' }}>
            {score >= 4 ? '🏆' : '💪'}
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            Kuis Selesai!
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Skor Anda adalah <strong style={{ fontSize: '1.5rem', color: 'var(--accent-cyan)' }}>{score}</strong> dari <strong>{questions.length}</strong> pertanyaan.
          </p>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            ✓ Progress SRS vocab & kanji telah diperbarui otomatis berdasarkan jawaban Anda.
          </p>

          <div style={{ margin: '1.5rem auto 2.5rem', maxWidth: '280px', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Evaluasi Guru:</div>
            <p style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
              {score === 5 && 'Luar biasa! Penguasaan materi sempurna! 🌟'}
              {score === 4 && 'Bagus sekali! Hampir sempurna! Keep it up! 👍'}
              {score === 3 && 'Kerja bagus, pelajari kembali beberapa materi. 📖'}
              {score < 3 && 'Ayo tingkatkan porsi belajar harian Anda! Semangat! 🔥'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="canvas-btn canvas-btn-clear" style={{ padding: '0.75rem 2rem', borderRadius: '30px' }} onClick={() => setQuizFinished(false)}>
              Kembali
            </button>
            <button className="start-quiz-btn" style={{ margin: 0, padding: '0.75rem 2rem' }} onClick={() => generateQuiz(quizMode)}>
              Coba Lagi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
