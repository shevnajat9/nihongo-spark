import React, { useState, useEffect, useRef } from 'react';
const ArrowLeft = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
);
const Swords = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2M9.5 17.5L21 6V3h-3L6.5 14.5M11 19l-6-6M8 16l-4 4M5 21l-2-2"/></svg>
);
const Shield = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);
const Heart = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="currentColor" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
);
const Zap = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
);
const Sparkles = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M8.757 15.243l-2.121 2.121m12.728 0l-2.121-2.121M8.757 8.757L6.636 6.636"/></svg>
);
const Trophy = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 21h8m-4-4v4M6 4h12a2 2 0 012 2v2a6 6 0 01-6 6h-4a6 6 0 01-6-6V6a2 2 0 012-2zM4 6H2a2 2 0 00-2 2 4 4 0 004 4h2M20 6h2a2 2 0 012 2 4 4 0 01-4 4h-2"/></svg>
);
const RotateCcw = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 4v6h6M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
);
const Volume2 = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5zm4.54 3.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14"/></svg>
);
const VolumeX = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5zm12 4l-6 6m0-6l6 6"/></svg>
);
const Flame = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>
);

// Dungeon floors with thematic monsters and JLPT question sets
const DUNGEON_FLOORS = [
  {
    floor: 1,
    name: 'Hutan Kanji Pemula (N5)',
    monster: {
      name: 'Slime Hiragana (スライム)',
      icon: '🟢',
      maxHp: 80,
      atk: 12,
      exp: 40,
      gold: 25,
      description: 'Makhluk berlendir yang hanya mengerti kanji dan partikel dasar.'
    },
    questions: [
      {
        q: 'Arti dari kanji 「水」 adalah...',
        options: ['Api', 'Air', 'Tanah', 'Pohon'],
        correct: 1,
        exp: '「水」(mizu) berarti air.'
      },
      {
        q: 'Partikel yang tepat: 「学校 ___ 行きます」',
        options: ['を', 'へ', 'が', 'で'],
        correct: 1,
        exp: 'Partikel 「へ」(he/e) digunakan untuk menunjukkan arah tujuan pergerakan.'
      },
      {
        q: 'Cara baca kanji 「食べる」 adalah...',
        options: ['のむ', 'たべる', 'みる', 'ねる'],
        correct: 1,
        exp: '「食べる」(taberu) berarti makan.'
      },
      {
        q: 'Lawan kata dari 「大きい」(ookii) adalah...',
        options: ['小さい', '高い', '長い', '早い'],
        correct: 0,
        exp: '「小さい」(chiisai) berarti kecil.'
      },
      {
        q: 'Angka 「百」 melambangkan nilai...',
        options: ['10', '100', '1.000', '10.000'],
        correct: 1,
        exp: '「百」(hyaku) berarti seratus.'
      }
    ]
  },
  {
    floor: 2,
    name: 'Gua Konjugasi Kata Kerja (N4)',
    monster: {
      name: 'Goblin Partikel (ゴブリン)',
      icon: '👺',
      maxHp: 110,
      atk: 16,
      exp: 70,
      gold: 50,
      description: 'Goblin usil yang mengacaukan bentuk te-form dan syarat kalimat.'
    },
    questions: [
      {
        q: 'Bentuk te (て形) dari kata kerja 「行く」(iku) adalah...',
        options: ['行いて', '行いで', '行って', '行きて'],
        correct: 2,
        exp: '「行く」 adalah perkecualian kelompok 1, bentuk te-nya adalah 「行って」(itte).'
      },
      {
        q: 'Pola ~なければならない (~nakereba naranai) memiliki arti...',
        options: ['Boleh dilakukan', 'Harus dilakukan', 'Jangan dilakukan', 'Pernah dilakukan'],
        correct: 1,
        exp: 'Pola ini menyatakan kewajiban/keharusan (must do).'
      },
      {
        q: 'Bentuk potensial (dapat melakukan) dari 「話す」 adalah...',
        options: ['話せる', '話される', '話させる', '話しる'],
        correct: 0,
        exp: 'Kelompok 1: bunyi su berubah menjadi seru -> 話せる (hanaseru).'
      },
      {
        q: 'Arti dari 「雨が降っています」 adalah...',
        options: ['Hujan telah reda', 'Sedang turun hujan', 'Akan turun hujan', 'Hujan kemarin'],
        correct: 1,
        exp: 'Bentuk ~te iru menandakan aktivitas yang sedang berlangsung.'
      },
      {
        q: 'Kanji 「案内する」(annai suru) bermakna...',
        options: ['Memandu / memberi info', 'Meminta maaf', 'Berpikir', 'Berbelanja'],
        correct: 0,
        exp: '「案内」(annai) berarti memandu, mengantar atau memberi petunjuk jalan.'
      }
    ]
  },
  {
    floor: 3,
    name: 'Kuil Tengu Nuansa (N3)',
    monster: {
      name: 'Tengu Angin Mistis (天狗)',
      icon: '🦅',
      maxHp: 140,
      atk: 20,
      exp: 110,
      gold: 80,
      description: 'Siluman berhidung panjang penguji tata bahasa tingkat menengah.'
    },
    questions: [
      {
        q: 'Pola ~わけにはいかない (~wake ni wa ikanai) mengekspresikan...',
        options: ['Pasti tidak mungkin secara fisik', 'Tidak bisa dilakukan karena alasan moral/sosial', 'Sangat mudah dilakukan', 'Kebetulan terjadi'],
        correct: 1,
        exp: 'Menyatakan tidak bisa melakukan sesuatu karena norma sosial/tanggung jawab moral.'
      },
      {
        q: 'Arti dari kata 「遠慮する」(enryo suru) adalah...',
        options: ['Mengeluh', 'Menahan diri / sungkan', 'Menyetujui', 'Memperbaiki'],
        correct: 1,
        exp: '「遠慮」 berarti menahan diri karena rasa segan atau kesopanan.'
      },
      {
        q: 'Pola ~おかげで (~okage de) digunakan saat hasil akhirnya...',
        options: ['Buruk / merugikan', 'Positif / berkat seseorang', 'Biasa saja', 'Tidak pasti'],
        correct: 1,
        exp: '「おかげで」 berarti "berkat..." dan digunakan untuk konsekuensi bernada positif.'
      },
      {
        q: 'Kanji 「解決」(kaiketsu) memiliki arti...',
        options: ['Perpisahan', 'Penyelesaian / Solusi', 'Kerusakan', 'Perjalanan'],
        correct: 1,
        exp: '「解決」 berarti pemecahan masalah atau resolusi.'
      },
      {
        q: 'Pola ~たて (~tate) seperti 「焼きたて」(yakitate) bermakna...',
        options: ['Terbakar hangus', 'Baru saja selesai dibuat / fresh', 'Sudah dingin', 'Sedang dipanggang'],
        correct: 1,
        exp: 'V-masu + たて berarti kondisi yang baru saja selesai terjadi (freshly made).'
      }
    ]
  },
  {
    floor: 4,
    name: 'Benteng Kastil Keigo (N2)',
    monster: {
      name: 'Samurai Bayangan (影の武士)',
      icon: '🥷',
      maxHp: 175,
      atk: 24,
      exp: 160,
      gold: 120,
      description: 'Pendekar bayangan dengan tebasan keigo dan peribahasa tajam.'
    },
    questions: [
      {
        q: 'Bentuk Kenjougo (merendah) dari 「行く・来る」 adalah...',
        options: ['いらっしゃる', 'おいでになる', '参る (mairu)', '召し上がる'],
        correct: 2,
        exp: '「参る」(mairu) adalah kenjougo untuk pergi dan datang.'
      },
      {
        q: 'Pola ~を契機に (~o keiki ni) memiliki makna mirip dengan...',
        options: ['~をきっかけに (sebagai pemicu/momentum)', '~のせいで (karena salah)', '~の代わりに (sebagai pengganti)', '~にもかかわらず (meskipun)'],
        correct: 0,
        exp: '「〜を契機に」 digunakan secara formal untuk mengindikasikan titik tolak / momentum perubahan besar.'
      },
      {
        q: 'Kata 「過言ではない」(kagon de wa nai) berarti...',
        options: ['Bohong belaka', 'Tidak berlebihan jika dikatakan', 'Kata yang salah', 'Tidak perlu dibahas'],
        correct: 1,
        exp: 'Bermakna "bukanlah pernyataan yang berlebihan jika dikatakan bahwa...".'
      },
      {
        q: 'Sinonim kanji dari 「柔軟」(juunan) adalah...',
        options: ['Kaku / stubborn', 'Fleksibel / luwes', 'Keras kepala', 'Rapuh'],
        correct: 1,
        exp: '「柔軟」 bermakna fleksibel, lentur, atau dapat beradaptasi.'
      },
      {
        q: 'Pola ~ざるを得ない (~zaru o enai) memiliki arti...',
        options: ['Sangat ingin melakukan', 'Terpaksa harus melakukan', 'Sama sekali tidak boleh', 'Tidak ingin menyentuh'],
        correct: 1,
        exp: 'Menunjukkan situasi terpaksa harus melakukan sesuatu meskipun enggan.'
      }
    ]
  },
  {
    floor: 5,
    name: 'Puncak Naga Abadi (N1 Boss)',
    monster: {
      name: 'Naga Mahkota Kanji (漢字神龍)',
      icon: '🐉',
      maxHp: 220,
      atk: 28,
      exp: 300,
      gold: 250,
      description: 'Penguasa tertinggi dungeon bahasa dengan penguasaan nuansa filosofis dan idiom langka.'
    },
    questions: [
      {
        q: 'Pola ~極まりない (~kiwamarinai) berarti...',
        options: ['Sangat / luar biasa ekstrem (ekspresi emosi)', 'Hampir tidak ada', 'Hanya sebagian kecil', 'Belum pasti'],
        correct: 0,
        exp: 'Digunakan untuk menekankan kondisi yang sangat luar biasa (ekstrem).'
      },
      {
        q: 'Yojijukugo 「臥薪嘗胆」(gashin shoutan) menggambarkan peribahasa...',
        options: ['Menyerah sebelum perang', 'Berjuang keras menahan penderitaan demi membalas dendam/mencapai tujuan', 'Hidup damai tanpa ambisi', 'Teman setia seumur hidup'],
        correct: 1,
        exp: 'Kisah Yue Fei / Goujian: tidur di atas kayu berduri dan menjilat empedu demi tekad pantang menyerah.'
      },
      {
        q: 'Cara baca kanji 「巧み」 adalah...',
        options: ['たくみ (takumi)', 'くるしみ (kurushimi)', 'あやしみ (ayashimi)', 'いとなみ (itonami)'],
        correct: 0,
        exp: '「巧み」(takumi) bermakna mahir, terampil, atau cerdik.'
      },
      {
        q: 'Bentuk arkais/sastra dari 「〜ない」 yang sering muncul di N1 adalah...',
        options: ['〜ぬ / 〜ん', '〜けり', '〜たり', '〜べし'],
        correct: 0,
        exp: 'Bentuk negatif klasik adalah ~nu / ~n (misal: 知らぬが仏 - Shiranu ga hotoke).'
      },
      {
        q: 'Pola ~を皮切りに (~o kawakiri ni) bermakna...',
        options: ['Mengakhiri sebuah acara', 'Diawali dengan... lalu berturut-turut diikuti aksi lain', 'Membatalkan rencana awal', 'Memilih yang terbaik'],
        correct: 1,
        exp: 'Bermakna diawali oleh suatu peristiwa yang memicu serentetan peristiwa serupa berikutnya.'
      }
    ]
  }
];

export default function RPGDungeonGame({ onBack }) {
  // Player state
  const [player, setPlayer] = useState(() => {
    const saved = localStorage.getItem('nihongo_spark_rpg_hero');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      level: 1,
      hp: 100,
      maxHp: 100,
      mp: 50,
      maxMp: 50,
      exp: 0,
      nextExp: 100,
      gold: 50,
      potions: 3,
      highestFloorCleared: 0
    };
  });

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentFloorIdx, setCurrentFloorIdx] = useState(0);
  const [monsterHp, setMonsterHp] = useState(DUNGEON_FLOORS[0].monster.maxHp);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [battleState, setBattleState] = useState('player_turn'); // 'player_turn', 'answering', 'monster_turn', 'victory', 'game_over', 'floor_cleared'
  const [battleLogs, setBattleLogs] = useState([
    'Selamat datang di JLPT RPG Dungeon! Kalahkan monster di setiap lantai untuk menguji kemampuan bahasamu.'
  ]);
  const [critAlert, setCritAlert] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [timerLeft, setTimerLeft] = useState(10);
  const [eliminatedOptions, setEliminatedOptions] = useState([]);

  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);

  // Current floor & question data
  const currentFloor = DUNGEON_FLOORS[currentFloorIdx] || DUNGEON_FLOORS[0];
  const currentQ = currentFloor.questions[questionIdx % currentFloor.questions.length];

  // Save hero stats
  useEffect(() => {
    localStorage.setItem('nihongo_spark_rpg_hero', JSON.stringify(player));
  }, [player]);

  // Audio synthesizer for retro RPG sounds
  const playRetroSound = (type) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'hit') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.15);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'crit') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.linearRampToValueAtTime(520, now + 0.08);
        osc.frequency.linearRampToValueAtTime(780, now + 0.2);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'hurt') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.linearRampToValueAtTime(70, now + 0.2);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'heal') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.3);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'victory') {
        // Simple 3-tone victory fanfare
        const notes = [440, 554, 659, 880];
        notes.forEach((freq, idx) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, now + idx * 0.12);
          g.gain.setValueAtTime(0.3, now + idx * 0.12);
          g.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.2);
          o.start(now + idx * 0.12);
          o.stop(now + idx * 0.12 + 0.2);
        });
      }
    } catch {
      // Audio context might fail on restricted environments
    }
  };

  // Turn timer countdown
  useEffect(() => {
    if (battleState === 'player_turn') {
      setTimerLeft(10);
      setEliminatedOptions([]);
      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setTimerLeft((prev) => {
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
  }, [battleState, questionIdx, currentFloorIdx]);

  const addLog = (msg) => {
    setBattleLogs((prev) => [msg, ...prev.slice(0, 7)]);
  };

  const handleTimeOut = () => {
    addLog(`⏰ Waktu habis! Kamu ragu-ragu dalam menjawab.`);
    triggerMonsterAttack();
  };
  const handleTimeOutRef = useRef(handleTimeOut);
  handleTimeOutRef.current = handleTimeOut;

  // Turn timeout trigger
  useEffect(() => {
    if (battleState === 'player_turn' && timerLeft === 0) {
      handleTimeOutRef.current();
    }
  }, [battleState, timerLeft]);

  const handleSelectOption = (idx) => {
    if (battleState !== 'player_turn' || eliminatedOptions.includes(idx)) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedOption(idx);
    setBattleState('answering');

    const isCorrect = idx === currentQ.correct;
    const isCritical = isCorrect && timerLeft >= 7; // Answered in <= 3 seconds

    if (isCorrect) {
      const baseDmg = 25 + player.level * 4;
      const damage = isCritical ? Math.round(baseDmg * 1.8) : baseDmg;

      if (isCritical) {
        setCritAlert(true);
        playRetroSound('crit');
        setTimeout(() => setCritAlert(false), 1200);
        addLog(`⚡ CRITICAL STRIKE! Jawaban kilat! Serangan menghasilkan ${damage} DMG ke ${currentFloor.monster.name}!`);
      } else {
        playRetroSound('hit');
        addLog(`⚔️ Benar! 「${currentQ.exp}」 Seranganmu menghasilkan ${damage} DMG!`);
      }

      const nextMonsterHp = Math.max(0, monsterHp - damage);
      setMonsterHp(nextMonsterHp);

      if (nextMonsterHp <= 0) {
        // Monster defeated
        setTimeout(() => handleMonsterDefeat(), 1000);
      } else {
        // Next question, stay player turn or slight delay
        setTimeout(() => {
          setSelectedOption(null);
          setQuestionIdx((q) => q + 1);
          setBattleState('player_turn');
        }, 1200);
      }
    } else {
      // Wrong answer
      playRetroSound('hurt');
      addLog(`❌ Salah! Jawaban benar: 「${currentQ.options[currentQ.correct]}」. Monster bersiap membalas!`);
      setTimeout(() => triggerMonsterAttack(), 1000);
    }
  };

  const triggerMonsterAttack = () => {
    setBattleState('monster_turn');
    setScreenShake(true);
    playRetroSound('hurt');
    setTimeout(() => setScreenShake(false), 400);

    const dmg = Math.round(currentFloor.monster.atk + Math.random() * 6 - 3);
    const newPlayerHp = Math.max(0, player.hp - dmg);

    addLog(`💥 ${currentFloor.monster.name} menyerangmu dengan sengit! Menerima ${dmg} DMG!`);

    setPlayer((prev) => ({
      ...prev,
      hp: newPlayerHp
    }));

    if (newPlayerHp <= 0) {
      setTimeout(() => {
        setBattleState('game_over');
        addLog('💀 HP-mu habis! Kamu tumbang di dalam dungeon.');
      }, 1000);
    } else {
      setTimeout(() => {
        setSelectedOption(null);
        setQuestionIdx((q) => q + 1);
        setBattleState('player_turn');
      }, 1200);
    }
  };

  const handleMonsterDefeat = () => {
    playRetroSound('victory');
    setBattleState('floor_cleared');
    const gainedExp = currentFloor.monster.exp;
    const gainedGold = currentFloor.monster.gold;

    addLog(`🎉 ${currentFloor.monster.name} berhasil ditundukkan! Memperoleh +${gainedExp} EXP & +${gainedGold} Gold!`);

    setPlayer((prev) => {
      let curExp = prev.exp + gainedExp;
      let curLvl = prev.level;
      let nextExpTarget = prev.nextExp;
      let curMaxHp = prev.maxHp;
      let curMaxMp = prev.maxMp;

      if (curExp >= nextExpTarget) {
        curLvl += 1;
        curExp -= nextExpTarget;
        nextExpTarget = Math.round(nextExpTarget * 1.5);
        curMaxHp += 20;
        curMaxMp += 10;
        addLog(`⭐ LEVEL UP! Kamu naik ke Level ${curLvl}! HP & MP bertambah!`);
      }

      return {
        ...prev,
        level: curLvl,
        exp: curExp,
        nextExp: nextExpTarget,
        maxHp: curMaxHp,
        maxMp: curMaxMp,
        hp: curMaxHp,
        mp: curMaxMp,
        gold: prev.gold + gainedGold,
        highestFloorCleared: Math.max(prev.highestFloorCleared, currentFloor.floor)
      };
    });
  };

  // Skill 1: Kanjisense (Eliminates 2 wrong options, costs 15 MP)
  const handleUseKanjiSense = () => {
    if (player.mp < 15 || battleState !== 'player_turn' || eliminatedOptions.length > 0) return;
    playRetroSound('heal');
    setPlayer((p) => ({ ...p, mp: p.mp - 15 }));

    const wrongIndexes = currentQ.options
      .map((_, i) => i)
      .filter((i) => i !== currentQ.correct);
    
    // Pick 2 random wrong indexes
    const shuffled = wrongIndexes.sort(() => 0.5 - Math.random());
    const toEliminate = shuffled.slice(0, 2);
    setEliminatedOptions(toEliminate);
    addLog(`✨ Menggunakan Skill [Kanjisense]! Dua jawaban salah berhasil dieliminasi!`);
  };

  // Skill 2: Potion (Restores 40 HP)
  const handleUsePotion = () => {
    if (player.potions <= 0 || player.hp >= player.maxHp) return;
    playRetroSound('heal');
    setPlayer((p) => ({
      ...p,
      potions: p.potions - 1,
      hp: Math.min(p.maxHp, p.hp + 40)
    }));
    addLog(`🧪 Meminum Ramuan Pemulih (Potion)! Memulihkan 40 HP!`);
  };

  // Buy potion from gold
  const handleBuyPotion = () => {
    if (player.gold < 30) return;
    setPlayer((p) => ({
      ...p,
      gold: p.gold - 30,
      potions: p.potions + 1
    }));
    addLog(`🛍️ Membeli 1 Ramuan Potion seharga 30 Gold.`);
  };

  const handleNextFloor = () => {
    if (currentFloorIdx < DUNGEON_FLOORS.length - 1) {
      const nextIdx = currentFloorIdx + 1;
      setCurrentFloorIdx(nextIdx);
      setMonsterHp(DUNGEON_FLOORS[nextIdx].monster.maxHp);
      setQuestionIdx(0);
      setSelectedOption(null);
      setBattleState('player_turn');
      addLog(`🚪 Melangkah ke Lantai ${DUNGEON_FLOORS[nextIdx].floor}: ${DUNGEON_FLOORS[nextIdx].name}!`);
    } else {
      setBattleState('victory');
      playRetroSound('victory');
      addLog('🏆 LUAR BIASA! Kamu telah menaklukkan seluruh Dungeon JLPT!');
    }
  };

  const handleRestartBattle = () => {
    setPlayer((p) => ({
      ...p,
      hp: p.maxHp,
      mp: p.maxMp
    }));
    setMonsterHp(currentFloor.monster.maxHp);
    setQuestionIdx(0);
    setSelectedOption(null);
    setBattleState('player_turn');
  };

  return (
    <div className={`p-4 md:p-6 max-w-5xl mx-auto space-y-6 ${screenShake ? 'animate-bounce' : ''}`}>
      {/* Top Header */}
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
              <Swords className="w-6 h-6 text-red-500" />
              <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-red-600 via-amber-500 to-purple-600 bg-clip-text text-transparent">
                JLPT RPG Dungeon: Boss Battle
              </h1>
            </div>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Kalahkan bos kanji & grammar dengan ketepatan dan kecepatan menjawab!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
            {soundEnabled ? 'Suara Aktif' : 'Bisu'}
          </button>
        </div>
      </div>

      {/* Hero Status Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 bg-gradient-to-r from-gray-900 to-indigo-950 text-white p-4 rounded-2xl shadow-lg border border-indigo-900">
        <div>
          <span className="text-[10px] uppercase font-bold text-indigo-300">Pahlawan</span>
          <p className="text-sm font-extrabold flex items-center gap-1">
            Lv. {player.level} 🗡️
          </p>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-red-300">HP (Nyawa)</span>
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            <span className="text-xs font-black">{player.hp}/{player.maxHp}</span>
          </div>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden mt-1">
            <div
              className="bg-red-500 h-full transition-all duration-300"
              style={{ width: `${(player.hp / player.maxHp) * 100}%` }}
            />
          </div>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-blue-300">MP (Mana)</span>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-blue-400 fill-blue-400" />
            <span className="text-xs font-black">{player.mp}/{player.maxMp}</span>
          </div>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden mt-1">
            <div
              className="bg-blue-500 h-full transition-all duration-300"
              style={{ width: `${(player.mp / player.maxMp) * 100}%` }}
            />
          </div>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-amber-300">EXP Progres</span>
          <p className="text-xs font-bold text-amber-200">{player.exp} / {player.nextExp}</p>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden mt-1">
            <div
              className="bg-amber-400 h-full transition-all duration-300"
              style={{ width: `${Math.min(100, (player.exp / player.nextExp) * 100)}%` }}
            />
          </div>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-yellow-300">Kantung Gold</span>
          <p className="text-xs font-bold text-yellow-400 flex items-center gap-1">
            💰 {player.gold} G
          </p>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-emerald-300">Lantai Tertinggi</span>
          <p className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            🏆 Lantai {player.highestFloorCleared || '-'}
          </p>
        </div>
      </div>

      {/* Main Battle Arena */}
      <div className="relative bg-gradient-to-b from-gray-900 via-purple-950 to-gray-950 rounded-2xl border-2 border-purple-800/50 p-6 text-white shadow-2xl overflow-hidden min-h-[460px] flex flex-col justify-between">
        {/* Critical Alert Overlay */}
        {critAlert && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-red-950/70 backdrop-blur-sm animate-pulse">
            <div className="text-center p-6 bg-red-600 rounded-3xl border-4 border-yellow-300 shadow-2xl transform scale-110">
              <Flame className="w-12 h-12 text-yellow-300 mx-auto animate-bounce" />
              <h2 className="text-3xl font-black text-white tracking-widest uppercase">CRITICAL STRIKE!</h2>
              <p className="text-yellow-200 font-bold text-sm">Serangan Cepat Super Efektif!</p>
            </div>
          </div>
        )}

        {/* Floor & Monster Display */}
        <div>
          <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
            <div>
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                Lantai {currentFloor.floor} / 5
              </span>
              <h2 className="text-lg font-bold text-amber-300">{currentFloor.name}</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Timer Giliran:</span>
              <span className={`text-base font-black px-2.5 py-0.5 rounded-full ${
                timerLeft <= 3 ? 'bg-red-500 text-white animate-ping' : 'bg-purple-900 text-purple-200'
              }`}>
                {timerLeft}s
              </span>
            </div>
          </div>

          {/* Monster Stage */}
          <div className="my-6 flex flex-col items-center justify-center text-center">
            <div className="text-6xl md:text-7xl mb-2 filter drop-shadow-[0_10px_20px_rgba(255,255,255,0.2)]">
              {currentFloor.monster.icon}
            </div>
            <h3 className="text-xl font-black text-red-400 tracking-wide">
              {currentFloor.monster.name}
            </h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto mb-3">
              {currentFloor.monster.description}
            </p>

            {/* Boss HP Bar */}
            <div className="w-full max-w-md">
              <div className="flex justify-between text-xs font-semibold mb-1 text-red-300">
                <span>HP Monster</span>
                <span>{monsterHp} / {currentFloor.monster.maxHp}</span>
              </div>
              <div className="w-full bg-gray-950 h-3 rounded-full overflow-hidden border border-red-900/60">
                <div
                  className="bg-gradient-to-r from-red-600 to-amber-500 h-full transition-all duration-300"
                  style={{ width: `${Math.max(0, (monsterHp / currentFloor.monster.maxHp) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* State: Floor Cleared */}
        {battleState === 'floor_cleared' && (
          <div className="bg-purple-900/80 border border-purple-500 rounded-xl p-6 text-center my-4">
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2 animate-bounce" />
            <h3 className="text-2xl font-black text-white">Lantai Berhasil Ditaklukkan!</h3>
            <p className="text-purple-200 text-sm mt-1 mb-4">
              Monster telah tumbang! Persiapkan dirimu untuk menghadapi tantangan berikutnya.
            </p>
            <button
              onClick={handleNextFloor}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold rounded-xl shadow-lg transition"
            >
              Lanjut ke Lantai Berikutnya ➡️
            </button>
          </div>
        )}

        {/* State: Game Over */}
        {battleState === 'game_over' && (
          <div className="bg-red-950/90 border border-red-600 rounded-xl p-6 text-center my-4">
            <h3 className="text-2xl font-black text-red-300 mb-2">Kamu Gugur di Medan Tempur!</h3>
            <p className="text-gray-300 text-sm mb-4">
              Jangan menyerah! Evaluasi kosakata dan tata bahasa, lalu bangkit kembali.
            </p>
            <button
              onClick={handleRestartBattle}
              className="flex items-center gap-2 mx-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition"
            >
              <RotateCcw className="w-4 h-4" /> Ulangi Lantai Ini
            </button>
          </div>
        )}

        {/* State: All Floors Cleared Victory */}
        {battleState === 'victory' && (
          <div className="bg-amber-950/80 border-2 border-yellow-500 rounded-xl p-8 text-center my-4">
            <Sparkles className="w-14 h-14 text-yellow-300 mx-auto mb-3" />
            <h3 className="text-3xl font-black text-yellow-300">SELAMAT! GRAND MASTER JLPT!</h3>
            <p className="text-amber-100 text-sm max-w-lg mx-auto my-3">
              Kamu telah mengalahkan Naga Mahkota Kanji N1 dan membuktikan ketangguhan bahasa Jepangmu dari dasar hingga mahir!
            </p>
            <button
              onClick={() => {
                setCurrentFloorIdx(0);
                setMonsterHp(DUNGEON_FLOORS[0].monster.maxHp);
                setBattleState('player_turn');
              }}
              className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-gray-950 font-black rounded-xl transition"
            >
              Mulai Ulang Petualangan Baru
            </button>
          </div>
        )}

        {/* Question & Answer Box */}
        {(battleState === 'player_turn' || battleState === 'answering' || battleState === 'monster_turn') && (
          <div className="bg-gray-950/90 border border-purple-700/60 rounded-xl p-4 md:p-5 mt-4">
            <div className="flex items-center justify-between text-xs text-purple-300 font-bold mb-2">
              <span>Pertanyaan Soal #{questionIdx + 1}</span>
              <span className="text-amber-400">Tips: Jawab cepat (&lt;3 detik) untuk Critical Strike!</span>
            </div>
            <p className="text-base md:text-lg font-black text-white mb-4">
              {currentQ.q}
            </p>

            {/* Answer Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentQ.options.map((opt, idx) => {
                const isEliminated = eliminatedOptions.includes(idx);
                const isChosen = selectedOption === idx;
                const isCorrect = idx === currentQ.correct;

                let btnStyle = 'bg-purple-950/60 border-purple-800 text-purple-100 hover:bg-purple-900/80';
                if (isChosen && isCorrect) {
                  btnStyle = 'bg-emerald-600 border-emerald-400 text-white';
                } else if (isChosen && !isCorrect) {
                  btnStyle = 'bg-red-600 border-red-400 text-white';
                } else if (selectedOption !== null && isCorrect) {
                  btnStyle = 'bg-emerald-700 border-emerald-500 text-white';
                }

                if (isEliminated) {
                  btnStyle = 'opacity-30 line-through bg-gray-900 border-gray-800 cursor-not-allowed text-gray-500';
                }

                return (
                  <button
                    key={idx}
                    disabled={battleState !== 'player_turn' || isEliminated}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-3 text-left font-semibold text-sm rounded-xl border transition-all duration-200 flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{idx + 1}. {opt}</span>
                    {isChosen && isCorrect && <span>✓ Benar</span>}
                    {isChosen && !isCorrect && <span>✕ Meleset</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Hero Quick Skills Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-purple-900/50">
          <div className="flex items-center gap-2">
            <button
              onClick={handleUseKanjiSense}
              disabled={player.mp < 15 || battleState !== 'player_turn' || eliminatedOptions.length > 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900/80 hover:bg-blue-800 border border-blue-600 text-xs font-bold disabled:opacity-40 transition"
              title="Mengeliminasi 2 opsi jawaban salah (Biaya: 15 MP)"
            >
              <Zap className="w-3.5 h-3.5 text-blue-300" />
              Kanjisense (-15 MP)
            </button>

            <button
              onClick={handleUsePotion}
              disabled={player.potions <= 0 || player.hp >= player.maxHp}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-600 text-xs font-bold disabled:opacity-40 transition"
              title="Memulihkan 40 HP"
            >
              <Heart className="w-3.5 h-3.5 text-emerald-300" />
              Gunakan Potion ({player.potions})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBuyPotion}
              disabled={player.gold < 30}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-950/80 hover:bg-yellow-900 border border-yellow-600 text-xs font-bold text-yellow-300 disabled:opacity-40 transition"
            >
              Beli Potion (30 G)
            </button>
          </div>
        </div>
      </div>

      {/* Battle Log Box */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-indigo-500" /> Catatan Pertarungan (Battle Log)
        </h4>
        <div className="space-y-1 text-xs">
          {battleLogs.map((log, i) => (
            <p
              key={i}
              className={`p-1.5 rounded ${
                i === 0 ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {log}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
