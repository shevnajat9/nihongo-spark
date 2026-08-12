import React, { useState } from 'react';
import { vocabData } from '../data/vocab';
import { kanjiData } from '../data/kanji';
import { grammarData } from '../data/grammar';
import { markChecklistDone } from '../utils/checklist';

export default function Quiz({ currentLevel, studyStats, setStudyStats }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

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
        // High pitch happy sound (double beep)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.start();
        
        // Second beep
        setTimeout(() => {
          osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
        }, 100);
        
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'wrong') {
        // Low buzzing sound
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        osc.start();
        
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
        osc.stop(ctx.currentTime + 0.45);
      }
    } catch (err) {
      console.warn('Web Audio API not initialized/supported:', err);
    }
  };

  // Generate 5 random questions for the active level
  const generateQuiz = () => {
    const levelVocab = vocabData.filter(v => v.level === currentLevel);
    const levelKanji = kanjiData.filter(k => k.level === currentLevel);
    const levelGrammar = grammarData.filter(g => g.level === currentLevel);

    const pool = [];

    // 1. Vocabulary translations questions
    levelVocab.forEach(v => {
      // Get 3 random other vocab meanings as wrong options
      const otherMeanings = vocabData
        .filter(x => x.word !== v.word)
        .map(x => x.meaning);
      const shuffledOthers = otherMeanings.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      pool.push({
        type: 'VOCABULARY',
        question: `Apa arti dari kosakata "${v.word}" (${v.reading})?`,
        correct: v.meaning,
        options: [v.meaning, ...shuffledOthers].sort(() => 0.5 - Math.random())
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
        options: [k.meanings[0], ...shuffledOthers].sort(() => 0.5 - Math.random())
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
        options: [correctReading, ...shuffledOthers].sort(() => 0.5 - Math.random())
      });
    });

    // 4. Grammar Fill-in-the-blank questions
    levelGrammar.forEach(g => {
      g.examples.forEach(ex => {
        // Create blank space from a common particle or keyword if available
        // e.g. "机の上に本があります" -> "机の上に本__あります" (particle が)
        // Let's dynamically find "は", "が", "を", "に", "へ" and replace it
        const particles = ['は', 'が', 'を', 'に', 'へ', 'と', 'で', 'の'];
        let replaced = false;
        let questionText = ex.sentence;
        let correctParticle = '';

        for (let p of particles) {
          if (ex.sentence.includes(p)) {
            // Replace the first occurrence
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
            options: [correctParticle, ...wrongOptions].sort(() => 0.5 - Math.random())
          });
        }
      });
    });

    // Pick 5 random questions from the generated pool
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

    const isCorrect = option === questions[currentIdx].correct;
    if (isCorrect) {
      setScore(prev => prev + 1);
      playSound('correct');
    } else {
      playSound('wrong');
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

  return (
    <div className="quiz-view">
      {!isPlaying && !quizFinished && (
        <div className="glass-panel quiz-welcome">
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            Latihan Kuis <span className="text-gradient">Nihongo</span> 🏆
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
            Uji pemahaman Anda untuk level <strong style={{ color: 'var(--accent-cyan)' }}>{currentLevel}</strong>. Kuis ini terdiri dari 5 pertanyaan pilihan ganda acak dari materi Kosakata, Kanji, dan Tata Bahasa yang sedang Anda pelajari.
          </p>
          
          <button className="start-quiz-btn" onClick={generateQuiz}>
            Mulai Kuis Sekarang
          </button>
        </div>
      )}

      {isPlaying && questions.length > 0 && (
        <div className="glass-panel quiz-container">
          <div className="quiz-header">
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>
              PERTANYAAN {currentIdx + 1} DARI {questions.length}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
            <div className="quiz-question-type">{questions[currentIdx].type}</div>
            <div className="quiz-question">{questions[currentIdx].question}</div>
          </div>

          <div className="quiz-options">
            {questions[currentIdx].options.map((option, idx) => {
              let btnClass = '';
              if (isAnswered) {
                if (option === questions[currentIdx].correct) {
                  btnClass = 'correct';
                } else if (option === selectedOption) {
                  btnClass = 'wrong';
                }
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

          {isAnswered && (
            <button className="quiz-next-btn" onClick={handleNext}>
              {currentIdx < questions.length - 1 ? 'Pertanyaan Berikutnya' : 'Selesaikan Kuis'}
            </button>
          )}
        </div>
      )}

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

          <div style={{ margin: '1.5rem auto 2.5rem', maxWidth: '280px', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Evaluasi Guru:</div>
            <p style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
              {score === 5 && 'Luar biasa! Penguasaan materi yang sempurna! 🌟'}
              {score === 4 && 'Bagus sekali! Hampir sempurna! Keep it up! 👍'}
              {score === 3 && 'Kerja bagus, pelajari kembali beberapa materi yang salah. 📖'}
              {score < 3 && 'Ayo tingkatkan porsi belajar harian Anda! Semangat! 🔥'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="canvas-btn canvas-btn-clear" style={{ padding: '0.75rem 2rem', borderRadius: '30px' }} onClick={() => setQuizFinished(false)}>
              Kembali
            </button>
            <button className="start-quiz-btn" style={{ margin: 0, padding: '0.75rem 2rem' }} onClick={generateQuiz}>
              Coba Lagi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
