import React, { useState, useEffect, useRef } from 'react';
const ArrowLeft = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
);
const Keyboard = ({ className = 'w-6 h-6' }) => (
  <svg className={className} width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 16h10"/></svg>
);
const Timer = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
);
const Award = ({ className = 'w-4 h-4' }) => (
  <svg className={className} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/></svg>
);
const Zap = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
);
const RotateCcw = ({ className = 'w-4 h-4' }) => (
  <svg className={className} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 4v6h6M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
);
const Volume2 = ({ className = 'w-4 h-4' }) => (
  <svg className={className} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5zm4.54 3.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14"/></svg>
);
const VolumeX = ({ className = 'w-4 h-4' }) => (
  <svg className={className} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5zm12 4l-6 6m0-6l6 6"/></svg>
);
const Sparkles = ({ className = 'w-8 h-8' }) => (
  <svg className={className} width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M8.757 15.243l-2.121 2.121m12.728 0l-2.121-2.121M8.757 8.757L6.636 6.636"/></svg>
);

const TYPING_TIERS = {
  n5_n4: {
    name: 'Piring Biru (Dasar N5-N4)',
    color: 'from-blue-500 to-cyan-500',
    words: [
      { kanji: '学校', kana: 'がっこう', romaji: 'gakkou', meaning: 'Sekolah' },
      { kanji: '食べる', kana: 'たべる', romaji: 'taberu', meaning: 'Makan' },
      { kanji: '友達', kana: 'ともだち', romaji: 'tomodachi', meaning: 'Teman' },
      { kanji: '先生', kana: 'せんせい', romaji: 'sensei', meaning: 'Guru' },
      { kanji: '本屋', kana: 'ほんや', romaji: 'honya', meaning: 'Toko buku' },
      { kanji: '明日', kana: 'あした', romaji: 'ashita', meaning: 'Besok' },
      { kanji: '時間', kana: 'じかん', romaji: 'jikan', meaning: 'Waktu' },
      { kanji: '電話', kana: 'でんわ', romaji: 'denwa', meaning: 'Telepon' },
      { kanji: '日本語', kana: 'にほんご', romaji: 'nihongo', meaning: 'Bahasa Jepang' },
      { kanji: '電車', kana: 'でんしゃ', romaji: 'densha', meaning: 'Kereta' }
    ]
  },
  n3_n2: {
    name: 'Piring Perak (Menengah N3-N2)',
    color: 'from-slate-600 to-indigo-600',
    words: [
      { kanji: '準備する', kana: 'じゅんびする', romaji: 'junbisuru', meaning: 'Mempersiapkan' },
      { kanji: '遠慮なく', kana: 'えんりょなく', romaji: 'enryonaku', meaning: 'Tanpa sungkan' },
      { kanji: '経験を積む', kana: 'けいけんをつむ', romaji: 'keikenwotsumu', meaning: 'Menimba pengalaman' },
      { kanji: '影響を与える', kana: 'えいきょうをあたえる', romaji: 'eikyouwoataeru', meaning: 'Memberi pengaruh' },
      { kanji: '約束を守る', kana: 'やくそくをまもる', romaji: 'yakusokuwomamoru', meaning: 'Menepati janji' },
      { kanji: '連絡を取る', kana: 'れんらくをとる', romaji: 'renrakuwotoru', meaning: 'Menghubungi' },
      { kanji: '機会を逃す', kana: 'きかいをのがす', romaji: 'kikaiwonogasu', meaning: 'Melewatkan kesempatan' },
      { kanji: '環境問題', kana: 'かんきょうもんだい', romaji: 'kankyoumondai', meaning: 'Masalah lingkungan' }
    ]
  },
  n1_master: {
    name: 'Piring Emas (Mahir N1 & Peribahasa)',
    color: 'from-amber-500 to-yellow-600',
    words: [
      { kanji: '一期一会', kana: 'いちごいちえ', romaji: 'ichigoichie', meaning: 'Pertemuan sekali seumur hidup' },
      { kanji: '臥薪嘗胆', kana: 'がしんしょうたん', romaji: 'gashinshoutan', meaning: 'Bertahan menanggung derita demi tujuan' },
      { kanji: '試行錯誤', kana: 'しこうさくご', romaji: 'shikousakugo', meaning: 'Trial and error (coba-coba)' },
      { kanji: '臨機応変', kana: 'りんきおうへん', romaji: 'rinkiouhen', meaning: 'Fleksibel beradaptasi' },
      { kanji: '十人十色', kana: 'じゅうにんといろ', romaji: 'juunintoiro', meaning: 'Setiap orang punya keunikan' },
      { kanji: '以心伝心', kana: 'いしんでんしん', romaji: 'ishindenshin', meaning: 'Saling memahami tanpa kata' },
      { kanji: '切磋琢磨', kana: 'せっさたくま', romaji: 'sessatakuma', meaning: 'Saling memacu untuk berkembang' }
    ]
  }
};

export default function IMETypingGame({ onBack }) {
  const [selectedTier, setSelectedTier] = useState('n5_n4');
  const [duration, setDuration] = useState(60); // 30, 60, 90 seconds
  const [gameState, setGameState] = useState('idle'); // 'idle', 'playing', 'finished'
  const [timeLeft, setTimeLeft] = useState(60);
  const [wordList, setWordList] = useState([]);
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [typedBuffer, setTypedBuffer] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Statistics
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const audioCtxRef = useRef(null);

  // High score in localStorage
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('nihongo_spark_typing_highscore') || '0', 10);
  });

  const playSynthTone = (freq, type = 'sine', durationSec = 0.08) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + durationSec);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + durationSec);
    } catch {
      // Audio fallback
    }
  };

  const currentWord = wordList[currentWordIdx] || null;

  // Start game handler
  const handleStartGame = () => {
    const list = [...TYPING_TIERS[selectedTier].words].sort(() => 0.5 - Math.random());
    setWordList(list);
    setCurrentWordIdx(0);
    setTypedBuffer('');
    setTotalKeystrokes(0);
    setCorrectKeystrokes(0);
    setWordsCompleted(0);
    setCombo(0);
    setMaxCombo(0);
    setTimeLeft(duration);
    setGameState('playing');

    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
  };

  // Timer loop
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  const finishGame = () => {
    setGameState('finished');
    playSynthTone(587.33, 'triangle', 0.2); // D5
    setTimeout(() => playSynthTone(880, 'triangle', 0.3), 150); // A5
  };
  const finishGameRef = useRef(finishGame);
  finishGameRef.current = finishGame;

  // Finish trigger
  useEffect(() => {
    if (gameState === 'playing' && timeLeft === 0) {
      finishGameRef.current();
    }
  }, [gameState, timeLeft]);

  // Keystroke handler
  const handleKeyDown = (e) => {
    if (gameState !== 'playing' || !currentWord) return;

    // Ignore special keys
    if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta') return;

    if (e.key === 'Backspace') {
      setTypedBuffer((prev) => prev.slice(0, -1));
      return;
    }

    const key = e.key.toLowerCase();
    if (key.length !== 1) return; // Ignore Tab, Enter, etc.

    e.preventDefault();
    setTotalKeystrokes((prev) => prev + 1);

    const targetRomaji = currentWord.romaji.toLowerCase();
    const nextCharNeeded = targetRomaji[typedBuffer.length];

    // Tolerance for 'nn' vs 'n' or variations
    const isCorrect = key === nextCharNeeded;

    if (isCorrect) {
      playSynthTone(500 + combo * 15, 'sine', 0.05);
      setCorrectKeystrokes((prev) => prev + 1);
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);

      const nextBuffer = typedBuffer + key;
      if (nextBuffer === targetRomaji) {
        // Word finished!
        playSynthTone(750, 'triangle', 0.12);
        setWordsCompleted((prev) => prev + 1);
        setTypedBuffer('');

        if (currentWordIdx + 1 < wordList.length) {
          setCurrentWordIdx((prev) => prev + 1);
        } else {
          // Reshuffle and continue until time runs out
          const reshuffled = [...TYPING_TIERS[selectedTier].words].sort(() => 0.5 - Math.random());
          setWordList(reshuffled);
          setCurrentWordIdx(0);
        }
      } else {
        setTypedBuffer(nextBuffer);
      }
    } else {
      // Missed key
      playSynthTone(180, 'sawtooth', 0.1);
      setCombo(0);
    }
  };

  // Calculations
  const accuracy = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100;
  const timeSpentSec = Math.max(1, duration - timeLeft);
  const cpm = Math.round((correctKeystrokes / timeSpentSec) * 60);
  const wpm = Math.round(cpm / 5);
  const calculatedScore = Math.round(correctKeystrokes * 10 * (accuracy / 100) + maxCombo * 25);

  // Update high score on finish
  useEffect(() => {
    if (gameState === 'finished' && calculatedScore > highScore) {
      setHighScore(calculatedScore);
      localStorage.setItem('nihongo_spark_typing_highscore', calculatedScore.toString());
    }
  }, [gameState, calculatedScore, highScore]);

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
              <Keyboard className="w-6 h-6 text-indigo-500" />
              <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                SushiDA Style: IME Typing Speed Drill
              </h1>
            </div>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Latih refleks kecepatan mengetik romaji dan konversi kata Jepangmu!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
            {soundEnabled ? 'Audio' : 'Mute'}
          </button>
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-xs font-bold text-amber-700 dark:text-amber-300">
            <Award className="w-4 h-4 text-amber-500" />
            Rekor: {highScore} Pts
          </div>
        </div>
      </div>

      {/* Mode & Config Selector (when idle) */}
      {gameState === 'idle' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 space-y-6 shadow-sm">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 block">
              Pilih Tingkat Kesulitan Kata
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.entries(TYPING_TIERS).map(([key, tier]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTier(key)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedTier === key
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                  }`}
                >
                  <div className={`w-8 h-2 rounded-full mb-2 bg-gradient-to-r ${tier.color}`} />
                  <p className="font-extrabold text-sm text-gray-900 dark:text-gray-100">{tier.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {tier.words.length} kosa kata pilihan
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 block">
              Durasi Latihan
            </label>
            <div className="flex gap-3">
              {[30, 60, 90].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setDuration(sec)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm border transition ${
                    duration === sec
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow'
                      : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {sec} Detik
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleStartGame}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-lg rounded-xl shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              🚀 Mulai Uji Ketikan (Start Typing)
            </button>
          </div>
        </div>
      )}

      {/* Active Typing Arena */}
      {gameState === 'playing' && currentWord && (
        <div
          onClick={() => inputRef.current && inputRef.current.focus()}
          className="bg-gray-900 rounded-3xl p-6 md:p-8 text-white border-2 border-indigo-700 shadow-2xl relative select-none cursor-text"
        >
          {/* Hidden input to catch mobile & desktop keystrokes seamlessly */}
          <input
            ref={inputRef}
            type="text"
            className="absolute opacity-0 pointer-events-none w-0 h-0"
            onKeyDown={handleKeyDown}
            autoFocus
          />

          {/* Top HUD */}
          <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-amber-400" />
              <span className={`text-xl font-black ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-amber-300'}`}>
                {timeLeft}s
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="text-gray-400">Kata: <b className="text-white">{wordsCompleted}</b></span>
              <span className="text-gray-400">Akurasi: <b className="text-emerald-400">{accuracy}%</b></span>
              <span className="text-gray-400">CPM: <b className="text-purple-400">{cpm}</b></span>
              <span className="text-amber-400 flex items-center gap-0.5">
                <Zap className="w-3.5 h-3.5" /> Combo: {combo}
              </span>
            </div>
          </div>

          {/* Word Presentation Display */}
          <div className="py-8 text-center space-y-4">
            {/* Furigana */}
            <p className="text-lg md:text-xl font-semibold text-indigo-300 tracking-widest">
              {currentWord.kana}
            </p>

            {/* Kanji */}
            <h2 className="text-4xl md:text-6xl font-black tracking-wider text-white">
              {currentWord.kanji}
            </h2>

            {/* Indonesian Meaning */}
            <p className="text-xs md:text-sm text-gray-400 italic">
              ( {currentWord.meaning} )
            </p>

            {/* Romaji Typing Target with Visual Highlighting */}
            <div className="pt-4 flex justify-center text-2xl md:text-3xl font-mono font-bold tracking-widest">
              {/* Already typed correctly */}
              <span className="text-emerald-400 border-b-2 border-emerald-400">
                {typedBuffer}
              </span>
              {/* Next char needed (pulsing) */}
              {currentWord.romaji.slice(typedBuffer.length, typedBuffer.length + 1) && (
                <span className="text-white bg-indigo-600/80 px-1 rounded animate-pulse">
                  {currentWord.romaji.slice(typedBuffer.length, typedBuffer.length + 1)}
                </span>
              )}
              {/* Remaining chars */}
              <span className="text-gray-600">
                {currentWord.romaji.slice(typedBuffer.length + 1)}
              </span>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500 mt-4">
            Ketik huruf romaji di keyboard Anda (Fokus otomatis aktif).
          </div>
        </div>
      )}

      {/* Game Results Screen */}
      {gameState === 'finished' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-gray-100">
              Latihan Selesai!
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Hasil performa ketikan bahasa Jepang Anda selama {duration} detik
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-800">
              <span className="text-xs text-indigo-500 dark:text-indigo-400 font-bold block">Skor Akhir</span>
              <p className="text-2xl font-black text-indigo-700 dark:text-indigo-200">{calculatedScore}</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-2xl border border-purple-100 dark:border-purple-800">
              <span className="text-xs text-purple-500 dark:text-purple-400 font-bold block">Kecepatan (WPM / CPM)</span>
              <p className="text-2xl font-black text-purple-700 dark:text-purple-200">{wpm} <span className="text-xs text-gray-500 font-normal">/ {cpm}</span></p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800">
              <span className="text-xs text-emerald-500 dark:text-emerald-400 font-bold block">Akurasi Ketikan</span>
              <p className="text-2xl font-black text-emerald-700 dark:text-emerald-200">{accuracy}%</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-100 dark:border-amber-800">
              <span className="text-xs text-amber-500 dark:text-amber-400 font-bold block">Max Combo</span>
              <p className="text-2xl font-black text-amber-700 dark:text-amber-200">{maxCombo} 🔥</p>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={handleStartGame}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow transition"
            >
              <RotateCcw className="w-4 h-4" /> Coba Lagi
            </button>
            <button
              onClick={() => setGameState('idle')}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 font-bold rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Ganti Pengaturan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
