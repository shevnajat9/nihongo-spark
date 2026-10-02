import React, { useState, useEffect, useRef } from 'react';
const ArrowLeft = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
);
const Users = ({ className = 'w-6 h-6' }) => (
  <svg className={className} width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
);
const Zap = ({ className = 'w-6 h-6' }) => (
  <svg className={className} width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
);
const Bot = ({ className = 'w-6 h-6' }) => (
  <svg className={className} width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M8 15h.01M16 15h.01"/></svg>
);
const Trophy = ({ className = 'w-8 h-8' }) => (
  <svg className={className} width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 21h8m-4-4v4M6 4h12a2 2 0 012 2v2a6 6 0 01-6 6h-4a6 6 0 01-6-6V6a2 2 0 012-2zM4 6H2a2 2 0 00-2 2 4 4 0 004 4h2M20 6h2a2 2 0 012 2 4 4 0 01-4 4h-2"/></svg>
);
const Share2 = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>
);
const Copy = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
);
const Check = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
);
const RotateCcw = ({ className = 'w-4 h-4' }) => (
  <svg className={className} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 4v6h6M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
);
import { P2PPeer } from '../utils/webrtcPeer';

const DUEL_QUESTIONS = [
  {
    q: 'Manakah kanji untuk kata 「ねこ」(Kucing)?',
    options: ['犬', '猫', '鳥', '魚'],
    correct: 1
  },
  {
    q: 'Pola ~たことがある (~ta koto ga aru) digunakan untuk...',
    options: ['Menyatakan rencana masa depan', 'Menyatakan pengalaman lampau', 'Menyatakan larangan', 'Menyatakan harapan'],
    correct: 1
  },
  {
    q: 'Arti dari ungkapan 「ごめんなさい」 adalah...',
    options: ['Terima kasih', 'Selamat tinggal', 'Mohon maaf', 'Sama-sama'],
    correct: 2
  },
  {
    q: 'Partikel penunjuk objek langsung pada kata kerja transitif adalah...',
    options: ['に', 'で', 'を', 'へ'],
    correct: 2
  },
  {
    q: 'Kanji 「雨」(Ame) melambangkan...',
    options: ['Matahari', 'Hujan', 'Salju', 'Angin'],
    correct: 1
  },
  {
    q: 'Bentuk sopan desu-masu dari 「する」(Suru) adalah...',
    options: ['します', 'されます', 'できます', 'すます'],
    correct: 0
  },
  {
    q: 'Sinonim bahasa Jepang untuk 「きれいです」 adalah...',
    options: ['美しい (utsukushii)', '高い (takai)', '速い (hayai)', '冷たい (tsumetai)'],
    correct: 0
  },
  {
    q: 'Partikel untuk menunjukkan tempat berlangsungnya suatu kegiatan aktif adalah...',
    options: ['に', 'で', 'へ', 'と'],
    correct: 1
  },
  {
    q: 'Bentuk te dari kata kerja 「書く」(Kaku) adalah...',
    options: ['書いて', '書いで', '書って', '書きて'],
    correct: 0
  },
  {
    q: 'Ungkapan 「お疲れ様でした」(Otsukaresama deshita) diucapkan ketika...',
    options: ['Baru tiba di tempat kerja', 'Selesai bekerja bersama / pulang kantor', 'Sebelum makan', 'Meminta bantuan'],
    correct: 1
  }
];

export default function P2PQuizDuel({ onBack }) {
  const [mode, setMode] = useState('lobby'); // 'lobby', 'host_setup', 'guest_setup', 'playing', 'finished'
  const [opponentType, setOpponentType] = useState('ai'); // 'ai' or 'p2p'
  const [peerState, setPeerState] = useState('disconnected'); // 'disconnected', 'connecting', 'connected'

  // WebRTC setup tokens
  const [hostOffer, setHostOffer] = useState('');
  const [guestAnswer, setGuestAnswer] = useState('');
  const [pastedCode, setPastedCode] = useState('');
  const [copied, setCopied] = useState(false);

  // Match State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [opponentQIndex, setOpponentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const peerRef = useRef(null);
  const aiIntervalRef = useRef(null);

  // Initialize P2P
  const initPeer = () => {
    if (peerRef.current) peerRef.current.cleanup();

    peerRef.current = new P2PPeer(
      (data) => handlePeerMessage(data),
      (status) => setPeerState(status)
    );
  };

  const handlePeerMessage = (data) => {
    if (data.type === 'START_MATCH') {
      startMatch();
    } else if (data.type === 'SCORE_UPDATE') {
      setOpponentScore(data.score);
      setOpponentQIndex(data.qIndex);
      if (data.qIndex >= DUEL_QUESTIONS.length && currentQIndex >= DUEL_QUESTIONS.length) {
        setMode('finished');
      }
    }
  };

  const handleCreateHost = async () => {
    initPeer();
    setOpponentType('p2p');
    setMode('host_setup');
    const offer = await peerRef.current.createHostOffer();
    setHostOffer(offer);
  };

  const handleJoinGuest = () => {
    initPeer();
    setOpponentType('p2p');
    setMode('guest_setup');
  };

  const handleConnectGuest = async () => {
    if (!pastedCode.trim()) return;
    const answer = await peerRef.current.createGuestAnswer(pastedCode.trim());
    setGuestAnswer(answer);
  };

  const handleHostFinalize = async () => {
    if (!pastedCode.trim() || !peerRef.current) return;
    await peerRef.current.acceptGuestAnswer(pastedCode.trim());
    setPeerState('connected');
  };

  const startMatch = () => {
    setCurrentQIndex(0);
    setMyScore(0);
    setOpponentScore(0);
    setOpponentQIndex(0);
    setSelectedAnswer(null);
    setMode('playing');

    if (peerRef.current && opponentType === 'p2p') {
      peerRef.current.send({ type: 'START_MATCH' });
    }

    // If AI opponent, run bot simulation
    if (opponentType === 'ai') {
      startAiSimulation();
    }
  };

  const startAiSimulation = () => {
    if (aiIntervalRef.current) clearInterval(aiIntervalRef.current);

    let aiQ = 0;
    let aiSc = 0;

    aiIntervalRef.current = setInterval(() => {
      aiQ += 1;
      // AI has ~80% accuracy with realistic thinking speed
      if (Math.random() < 0.8) {
        aiSc += 10;
      }
      setOpponentQIndex(aiQ);
      setOpponentScore(aiSc);

      if (aiQ >= DUEL_QUESTIONS.length) {
        clearInterval(aiIntervalRef.current);
      }
    }, 2800);
  };

  useEffect(() => {
    return () => {
      if (peerRef.current) peerRef.current.cleanup();
      if (aiIntervalRef.current) clearInterval(aiIntervalRef.current);
    };
  }, []);

  const handleAnswer = (optionIdx) => {
    if (selectedAnswer !== null || currentQIndex >= DUEL_QUESTIONS.length) return;

    setSelectedAnswer(optionIdx);
    const isCorrect = optionIdx === DUEL_QUESTIONS[currentQIndex].correct;
    const newScore = isCorrect ? myScore + 10 : myScore;
    const nextQ = currentQIndex + 1;

    setMyScore(newScore);

    if (peerRef.current && opponentType === 'p2p') {
      peerRef.current.send({
        type: 'SCORE_UPDATE',
        score: newScore,
        qIndex: nextQ
      });
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setCurrentQIndex(nextQ);
      if (nextQ >= DUEL_QUESTIONS.length) {
        setMode('finished');
        if (aiIntervalRef.current) clearInterval(aiIntervalRef.current);
      }
    }, 800);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentQ = DUEL_QUESTIONS[currentQIndex] || DUEL_QUESTIONS[0];

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
              <Zap className="w-6 h-6 text-amber-500" />
              <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-amber-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
                P2P Quiz Duel: 1v1 Battle Real-Time
              </h1>
            </div>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Duel adu kecepatan & ketepatan menjawab kuis bahasa Jepang browser-to-browser via WebRTC
            </p>
          </div>
        </div>
      </div>

      {/* Lobby Selection */}
      {mode === 'lobby' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border-2 border-indigo-500/40 shadow-lg flex flex-col justify-between space-y-6">
            <div>
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-950/60 rounded-2xl flex items-center justify-center text-indigo-600 mb-4">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Duel Melawan AI Shadow Rival</h3>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2">
                Main langsung secara instan tanpa perlu menunggu teman. Bertanding melawan bot pintar Kenji yang memiliki akurasi ~80%.
              </p>
            </div>
            <button
              onClick={() => {
                setOpponentType('ai');
                startMatch();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold rounded-xl shadow transition"
            >
              Mulai Duel vs AI Sekarang ⚡
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border-2 border-purple-500/40 shadow-lg flex flex-col justify-between space-y-6">
            <div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950/60 rounded-2xl flex items-center justify-center text-purple-600 mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Duel 1v1 Lawan Teman (WebRTC)</h3>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2">
                Koneksi P2P serverless langsung antar peramban. Buat ruang duel dan bagikan kode undangan ke temanmu.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCreateHost}
                className="flex-1 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-xl shadow transition text-xs sm:text-sm"
              >
                Buat Ruang (Host)
              </button>
              <button
                onClick={handleJoinGuest}
                className="flex-1 py-3.5 border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/40 font-extrabold rounded-xl transition text-xs sm:text-sm"
              >
                Gabung Ruang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Host Setup Modal/View */}
      {mode === 'host_setup' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-xl space-y-4">
          <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-purple-500" /> Host: Bagikan Kode Undangan ke Teman
          </h3>
          <p className="text-xs text-gray-500">
            Salin kode koneksi di bawah dan kirim ke lawan mainmu:
          </p>

          <div className="relative">
            <textarea
              readOnly
              rows={3}
              value={hostOffer || 'Sedang menyiapkan token WebRTC...'}
              className="w-full p-3 font-mono text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700"
            />
            <button
              onClick={() => copyToClipboard(hostOffer)}
              className="absolute top-2 right-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-bold flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Tersalin' : 'Salin'}
            </button>
          </div>

          <div className="pt-2">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
              Lalu, tempelkan Kode Balasan (Answer) dari temanmu di sini:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={pastedCode}
                onChange={(e) => setPastedCode(e.target.value)}
                placeholder="Tempel kode balasan di sini..."
                className="flex-1 p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs bg-white dark:bg-gray-900"
              />
              <button
                onClick={handleHostFinalize}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition"
              >
                Hubungkan & Mulai
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <span className="text-xs text-gray-400">
              Status P2P: <b className={peerState === 'connected' ? 'text-emerald-500' : 'text-amber-500'}>{peerState}</b>
            </span>
            <button
              onClick={startMatch}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow"
            >
              Mulai Pertandingan Langsung
            </button>
          </div>
        </div>
      )}

      {/* Guest Setup Modal/View */}
      {mode === 'guest_setup' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-xl space-y-4">
          <h3 className="text-lg font-black text-gray-900 dark:text-white">
            Gabung Sebagai Guest (Pemain 2)
          </h3>
          <div>
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
              1. Tempel Kode Penawaran (Offer) dari Host:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={pastedCode}
                onChange={(e) => setPastedCode(e.target.value)}
                placeholder="Tempel kode tawaran Host di sini..."
                className="flex-1 p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs bg-white dark:bg-gray-900"
              />
              <button
                onClick={handleConnectGuest}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl"
              >
                Buat Kode Balasan
              </button>
            </div>
          </div>

          {guestAnswer && (
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">
                2. Salin kode balasan ini dan berikan kembali ke Host:
              </label>
              <div className="relative">
                <textarea
                  readOnly
                  rows={3}
                  value={guestAnswer}
                  className="w-full p-3 font-mono text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700"
                />
                <button
                  onClick={() => copyToClipboard(guestAnswer)}
                  className="absolute top-2 right-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Tersalin' : 'Salin'}
                </button>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
            <button
              onClick={startMatch}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow"
            >
              Mulai Bertanding
            </button>
          </div>
        </div>
      )}

      {/* Active Battle Arena */}
      {mode === 'playing' && (
        <div className="space-y-6">
          {/* Dual Progress Bars HUD */}
          <div className="grid grid-cols-2 gap-4 bg-gray-900 p-4 md:p-6 rounded-3xl border border-gray-800 text-white shadow-xl">
            {/* Player 1 (You) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-extrabold">
                <span className="text-emerald-400">Kamu (Player 1)</span>
                <span className="text-lg font-black">{myScore} Pts</span>
              </div>
              <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${(currentQIndex / DUEL_QUESTIONS.length) * 100}%` }}
                />
              </div>
              <span className="text-[11px] text-gray-400">Soal {Math.min(DUEL_QUESTIONS.length, currentQIndex + 1)} / {DUEL_QUESTIONS.length}</span>
            </div>

            {/* Player 2 (Opponent) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-extrabold">
                <span className="text-red-400">{opponentType === 'ai' ? 'Kenji Bot (Rival)' : 'Lawan (Player 2)'}</span>
                <span className="text-lg font-black">{opponentScore} Pts</span>
              </div>
              <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-red-500 h-full transition-all duration-300"
                  style={{ width: `${(opponentQIndex / DUEL_QUESTIONS.length) * 100}%` }}
                />
              </div>
              <span className="text-[11px] text-gray-400">Soal {Math.min(DUEL_QUESTIONS.length, opponentQIndex)} / {DUEL_QUESTIONS.length}</span>
            </div>
          </div>

          {/* Question Card */}
          {currentQIndex < DUEL_QUESTIONS.length ? (
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-xl space-y-6">
              <div className="flex items-center justify-between text-xs font-bold text-gray-400">
                <span>Soal #{currentQIndex + 1}</span>
                <span className="text-amber-500 font-extrabold">+10 Poin jika benar</span>
              </div>

              <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white leading-relaxed">
                {currentQ.q}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQ.options.map((opt, idx) => {
                  const isChosen = selectedAnswer === idx;
                  const isCorrect = idx === currentQ.correct;

                  let style = 'bg-gray-50 dark:bg-gray-900/60 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/30';
                  if (selectedAnswer !== null) {
                    if (isChosen && isCorrect) style = 'bg-emerald-500 text-white border-emerald-500';
                    else if (isChosen && !isCorrect) style = 'bg-red-500 text-white border-red-500';
                    else if (isCorrect) style = 'bg-emerald-600 text-white border-emerald-600';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedAnswer !== null}
                      onClick={() => handleAnswer(idx)}
                      className={`p-4 rounded-2xl border-2 font-bold text-sm text-left transition-all duration-200 ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700">
              <p className="text-base font-bold text-gray-700 dark:text-gray-300">
                Menunggu lawan menyelesaikan soal terakhir...
              </p>
            </div>
          )}
        </div>
      )}

      {/* Finished Screen */}
      {mode === 'finished' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center mx-auto shadow-lg">
            <Trophy className="w-8 h-8 text-white" />
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
              {myScore > opponentScore
                ? '🏆 KAMU MENANG DUEL!'
                : myScore === opponentScore
                ? '🤝 HASIL IMBANG / DRAW!'
                : '🥈 LAWAN UNGGUL KALI INI!'}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Duel selesai dengan total 10 soal uji refleks bahasa Jepang
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span className="text-xs font-bold text-emerald-600">Skor Kamu</span>
              <p className="text-3xl font-black text-emerald-700 dark:text-emerald-200">{myScore} Pts</p>
            </div>
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800">
              <span className="text-xs font-bold text-red-600">Skor Lawan</span>
              <p className="text-3xl font-black text-red-700 dark:text-red-200">{opponentScore} Pts</p>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={startMatch}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold rounded-xl shadow transition"
            >
              <RotateCcw className="w-4 h-4" /> Rematch (Tanding Ulang)
            </button>
            <button
              onClick={() => setMode('lobby')}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 font-bold rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Kembali ke Lobi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
