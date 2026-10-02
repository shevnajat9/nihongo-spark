import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FuriganaText } from '../utils/furigana';
import { playJapaneseSpeech } from '../utils/audioPlayer';

// Target sentences with phonological focus
const SPEECH_TARGETS = [
  {
    id: 'sc-1',
    level: 'N5',
    category: 'chouon',
    categoryLabel: 'Vokal Panjang (長音)',
    japanese: '明日、病院へおじいさんと行きます。',
    reading: '明日[あした]、病院[びょういん]へおじいさんと行[い]きます。',
    romaji: 'Ashita, byouin e ojiisan to ikimasu.',
    meaning: 'Besok saya pergi ke rumah sakit bersama kakek.',
    focusTip: 'Hati-hati membedakan "byouin" (rumah sakit) vs "biyouin" (salon), dan "ojiisan" (kakek) vs "ojisan" (paman).'
  },
  {
    id: 'sc-2',
    level: 'N5',
    category: 'sokuon',
    categoryLabel: 'Konsonan Ganda (促音 っ)',
    japanese: '切符を買って、ちょっと待ってください。',
    reading: '切符[きっぷ]を買[か]って、ちょっと待[ま]ってください。',
    romaji: 'Kippu o katte, chotto matte kudasai.',
    meaning: 'Beli tiket, lalu tolong tunggu sebentar.',
    focusTip: 'Beri jeda hening 1 mora (1 ketukan napas) pada bunyi "kippu", "katte", "chotto", dan "matte".'
  },
  {
    id: 'sc-3',
    level: 'N5',
    category: 'particle',
    categoryLabel: 'Partikel Kritis (助詞)',
    japanese: '私は猫が好きですが、犬はあまり好きではありません。',
    reading: '私[わたし]は猫[ねこ]が好[す]きですが、犬[いぬ]はあまり好[す]きではありません。',
    romaji: 'Watashi wa neko ga suki desu ga, inu wa amari suki dewa arimasen.',
    meaning: 'Saya suka kucing, tapi anjing tidak begitu suka.',
    focusTip: 'Lafalkan partikel 「は」(wa) dan 「が」(ga) dengan tegas tanpa tertelan.'
  },
  {
    id: 'sc-4',
    level: 'N4',
    category: 'r_sound',
    categoryLabel: 'Artikulasi R (ラ行音)',
    japanese: '来週の料理教室の連絡を履歴書と一緒に送りました。',
    reading: '来週[らいしゅう]の料理教室[りょうりきょうしつ]の連絡[れんらく]を履歴書[りれきしょ]と一緒[いっしょ]に送[おく]りました。',
    romaji: 'Raishuu no ryouri kyoushitsu no renraku o rirekisho to issho ni okurimashita.',
    meaning: 'Saya mengirimkan pemberitahuan kelas memasak minggu depan bersama CV.',
    focusTip: 'Bunyi "R" Jepang (ra, ri, ru, re, ro) adalah sentuhan ujung lidah ke langit-langit depan (flap tap), bukan getaran "R" Indonesia tebal atau "L".'
  },
  {
    id: 'sc-5',
    level: 'N4',
    category: 'nasal_g',
    categoryLabel: 'Bunyi Sengau / Bikoudaku (鼻濁音)',
    japanese: '大学の図書館で静かに英語を勉強しています。',
    reading: '大学[だいがく]の図書館[としょかん]で静[しず]かに英語[えいご]を勉強[べんきょう]しています。',
    romaji: 'Daigaku no toshokan de shizuka ni eigo o benkyou shite imasu.',
    meaning: 'Sedang belajar bahasa Inggris dengan tenang di perpustakaan kampus.',
    focusTip: 'Huruf 「が」 dan 「ご」 di tengah kata (daigaku, eigo) sering dilafalkan agak sengau (nga, ngo) oleh penutur Tokyo.'
  },
  {
    id: 'sc-6',
    level: 'N3',
    category: 'keigo_flow',
    categoryLabel: 'Kelancaran Sonkeigo/Kenjougo',
    japanese: '田中部長はただいま外出なさっております。',
    reading: '田中部長[たなかぶちょう]はただいま外出[がいしゅつ]なさっております。',
    romaji: 'Tanaka buchou wa tadaima gaishutsu nasatte orimasu.',
    meaning: 'Manajer Tanaka saat ini sedang berada di luar kantor.',
    focusTip: 'Jaga intonasi sopan melandai halus dari "gaishutsu" ke "nasatte orimasu" tanpa patah-patah.'
  },
  {
    id: 'sc-7',
    level: 'N3',
    category: 'conversation',
    categoryLabel: 'Nuansa Natural Percakapan',
    japanese: 'もしよろしければ、この資料を確認していただけないでしょうか。',
    reading: 'もしよろしければ、この資料[しりょう]を確認[かくにん]していただけないでしょうか。',
    romaji: 'Moshi yoroshikereba, kono shiryou o kakunin shite itadakenai deshou ka.',
    meaning: 'Jika Anda berkenan, bisakah tolong memeriksa berkas ini?',
    focusTip: 'Ucapkan "kakunin shite itadakenai deshou ka" dalam satu tarikan ritme yang luwes.'
  }
];

// Levenshtein distance calculation
function calculateLevenshtein(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Clean text for phonological comparison (remove punctuation, normalize spaces)
function cleanJapaneseText(str) {
  if (!str) return '';
  return str
    .replace(/[、。！？\s.,!?-]/g, '')
    .trim();
}

export default function SpeechCoach() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedId, setSelectedId] = useState(SPEECH_TARGETS[0].id);
  const [customSentence, setCustomSentence] = useState('');
  const [isUsingCustom, setIsUsingCustom] = useState(false);

  // Speech Recognition state
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [evalResult, setEvalResult] = useState(null);

  const recognitionRef = useRef(null);

  const activeTarget = useMemo(() => {
    if (isUsingCustom) {
      return {
        id: 'custom',
        level: 'Kustom',
        categoryLabel: 'Kalimat Bebas',
        japanese: customSentence || 'こんにちは。',
        reading: customSentence || 'こんにちは。',
        romaji: '',
        meaning: 'Kalimat kustom yang dimasukkan pengguna.',
        focusTip: 'Latih pelafalan artikulasi kalimat pilihan Anda sendiri.'
      };
    }
    return SPEECH_TARGETS.find(t => t.id === selectedId) || SPEECH_TARGETS[0];
  }, [isUsingCustom, customSentence, selectedId]);

  // Check Web Speech API support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  // Native Audio Playback
  const handlePlaySample = (text) => {
    playJapaneseSpeech(text, { rate: 0.9 });
  };

  // Evaluate Transcript
  const evaluatePronunciation = (userSpeech, target) => {
    const cleanTarget = cleanJapaneseText(target);
    const cleanUser = cleanJapaneseText(userSpeech);

    if (!cleanUser) {
      setEvalResult(null);
      return;
    }

    const dist = calculateLevenshtein(cleanUser, cleanTarget);
    const maxLen = Math.max(cleanTarget.length, cleanUser.length, 1);
    const accuracy = Math.max(0, Math.round((1 - dist / maxLen) * 100));

    // Particle check: analyze common particles in target
    const criticalParticles = ['は', 'が', 'を', 'に', 'で', 'へ', 'と', 'も'];
    const particleFeedback = [];

    criticalParticles.forEach(part => {
      const targetCount = (target.match(new RegExp(part, 'g')) || []).length;
      const userCount = (userSpeech.match(new RegExp(part, 'g')) || []).length;
      if (targetCount > 0 && userCount < targetCount) {
        particleFeedback.push({
          particle: part,
          message: `Partikel「${part}」kurang terdengar atau tertelan.`
        });
      }
    });

    // Character matching breakdown
    const targetChars = Array.from(cleanTarget);
    const userChars = Array.from(cleanUser);

    const charAnalysis = targetChars.map((ch, idx) => {
      const match = userChars[idx] === ch || userSpeech.includes(ch);
      return { char: ch, match };
    });

    setEvalResult({
      accuracy,
      cleanUser,
      cleanTarget,
      charAnalysis,
      particleFeedback,
      rawSpeech: userSpeech
    });
  };

  // Start Voice Recognition
  const startListening = () => {
    setErrorMessage('');
    setInterimTranscript('');
    setFinalTranscript('');
    setEvalResult(null);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMessage('Browser ini belum mendukung Web Speech Recognition. Disarankan menggunakan Google Chrome atau Microsoft Edge.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ja-JP';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        setInterimTranscript(interim);
        if (final) {
          setFinalTranscript(final);
          evaluatePronunciation(final, activeTarget.japanese);
        }
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        if (event.error === 'no-speech') {
          setErrorMessage('Tidak ada suara terdeteksi. Silakan coba lagi lebih dekat ke mikrofon.');
        } else if (event.error === 'not-allowed') {
          setErrorMessage('Izin mikrofon ditolak oleh browser. Buka setelan browser untuk mengaktifkannya.');
        } else {
          setErrorMessage(`Terjadi kendala pengenalan suara: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      setIsListening(false);
      setErrorMessage('Gagal memulai mikrofon: ' + err.message);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Filtered targets
  const filteredTargets = SPEECH_TARGETS.filter(t =>
    selectedCategory === 'ALL' ? true : t.category === selectedCategory
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER SECTION */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(168, 85, 247, 0.15))',
        border: '1px solid rgba(236, 72, 153, 0.3)',
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
            <span style={{ fontSize: '1.8rem' }}>🎯</span>
            <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc', fontWeight: 800 }}>
              Evaluator Pelafalan Suara (発音コーチ)
            </h1>
            <span style={{
              background: 'rgba(236, 72, 153, 0.25)',
              color: '#f472b6',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: '1px solid rgba(236, 72, 153, 0.4)'
            }}>
              Web Speech AI + Levenshtein
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', maxWidth: '650px' }}>
            Bicara ke mikrofon dalam bahasa Jepang. Sistem AI akan mengevaluasi akurasi fonetik, memvalidasi mora vokal panjang, konsonan ganda, serta mendeteksi partikel yang tertelan.
          </p>
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '0.25rem', gap: '0.25rem', flexWrap: 'wrap' }}>
          {[
            { id: 'ALL', label: 'Semua' },
            { id: 'chouon', label: '長音' },
            { id: 'sokuon', label: '促音' },
            { id: 'particle', label: '助詞' },
            { id: 'r_sound', label: 'ラ行' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setIsUsingCustom(false); }}
              style={{
                background: (!isUsingCustom && selectedCategory === cat.id) ? '#ec4899' : 'transparent',
                color: (!isUsingCustom && selectedCategory === cat.id) ? '#fff' : '#94a3b8',
                border: 'none',
                borderRadius: '8px',
                padding: '0.4rem 0.8rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat.label}
            </button>
          ))}
          <button
            onClick={() => setIsUsingCustom(true)}
            style={{
              background: isUsingCustom ? '#8b5cf6' : 'transparent',
              color: isUsingCustom ? '#fff' : '#94a3b8',
              border: 'none',
              borderRadius: '8px',
              padding: '0.4rem 0.8rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            ✏️ Kustom
          </button>
        </div>
      </div>

      {/* TARGET SENTENCE SELECTOR OR CUSTOM INPUT */}
      {!isUsingCustom ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '0.8rem'
        }}>
          {filteredTargets.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedId(item.id);
                  setEvalResult(null);
                  setFinalTranscript('');
                }}
                style={{
                  background: isSelected ? 'rgba(236, 72, 153, 0.15)' : 'var(--card-bg, #1e293b)',
                  border: `1.5px solid ${isSelected ? '#ec4899' : 'rgba(255, 255, 255, 0.08)'}`,
                  borderRadius: '12px',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#f472b6',
                    background: 'rgba(236, 72, 153, 0.15)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px'
                  }}>
                    {item.categoryLabel}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{item.level}</span>
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.3rem' }}>
                  {item.japanese}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.meaning}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{
          background: 'var(--card-bg, #1e293b)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '14px',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8rem'
        }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#c084fc' }}>
            ✏️ Masukkan Kalimat Bahasa Jepang Bebas untuk Diuji:
          </label>
          <input
            type="text"
            value={customSentence}
            onChange={(e) => {
              setCustomSentence(e.target.value);
              setEvalResult(null);
            }}
            placeholder="Contoh: これは私の新しい車です。"
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              color: '#f8fafc',
              fontSize: '1.1rem'
            }}
          />
        </div>
      )}

      {/* ACTIVE TARGET CARD */}
      <div style={{
        background: 'var(--card-bg, #1e293b)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
      }}>
        {/* Top Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              background: '#ec4899',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '0.2rem 0.6rem',
              borderRadius: '6px'
            }}>
              KALIMAT TARGET
            </span>
            <span style={{ fontSize: '0.85rem', color: '#f472b6', fontWeight: 600 }}>
              {activeTarget.categoryLabel}
            </span>
          </div>

          <button
            onClick={() => handlePlaySample(activeTarget.japanese)}
            style={{
              background: 'rgba(99, 102, 241, 0.2)',
              color: '#a5b4fc',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              borderRadius: '8px',
              padding: '0.45rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <span>🔊</span>
            <span>Dengarkan Contoh Native</span>
          </button>
        </div>

        {/* Big Japanese Display */}
        <div style={{
          fontSize: '1.8rem',
          fontWeight: 700,
          color: '#f8fafc',
          lineHeight: 1.8,
          background: 'rgba(0, 0, 0, 0.2)',
          padding: '1.2rem',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <FuriganaText text={activeTarget.japanese} reading={activeTarget.reading} />
        </div>

        {/* Romaji & Meaning */}
        <div style={{ textAlign: 'center' }}>
          {activeTarget.romaji && (
            <div style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
              {activeTarget.romaji}
            </div>
          )}
          <div style={{ fontSize: '1.05rem', color: '#e2e8f0', fontWeight: 500 }}>
            {activeTarget.meaning}
          </div>
        </div>

        {/* Focus Tip */}
        <div style={{
          background: 'rgba(56, 189, 248, 0.08)',
          borderLeft: '4px solid #38bdf8',
          borderRadius: '4px 8px 8px 4px',
          padding: '0.8rem 1rem',
          fontSize: '0.85rem',
          color: '#bae6fd'
        }}>
          💡 <strong>Tips Artikulasi:</strong> {activeTarget.focusTip}
        </div>

        {/* Speech Recognition Controls */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          paddingTop: '0.5rem'
        }}>
          {!speechSupported ? (
            <div style={{ color: '#ef4444', fontSize: '0.85rem' }}>
              ⚠️ Browser Anda tidak mendukung Web Speech Recognition. Gunakan Chrome atau Edge untuk fitur evaluasi suara langsung.
            </div>
          ) : !isListening ? (
            <button
              onClick={startListening}
              style={{
                background: 'linear-gradient(135deg, #ec4899, #be185d)',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                padding: '0.85rem 2.2rem',
                fontSize: '1.05rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: '0 6px 20px rgba(236, 72, 153, 0.4)',
                transition: 'transform 0.2s ease'
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>🎙️</span>
              <span>Mulai Ucapkan Kalimat Ini</span>
            </button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
              <button
                onClick={stopListening}
                style={{
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '0.85rem 2.2rem',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  boxShadow: '0 0 25px rgba(239, 68, 68, 0.6)'
                }}
              >
                <span style={{ fontSize: '1.3rem', animation: 'spin 1.5s linear infinite' }}>🔴</span>
                <span>Sedang Mendengarkan... (Klik untuk Selesai)</span>
              </button>
              <div style={{ fontSize: '0.85rem', color: '#f472b6', fontStyle: 'italic' }}>
                {interimTranscript || 'Bicaralah sekarang dengan jelas...'}
              </div>
            </div>
          )}

          {finalTranscript && !isListening && (
            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              Transkrip rekaman: <span style={{ color: '#f8fafc', fontWeight: 600 }}>「{finalTranscript}」</span>
            </div>
          )}

          {errorMessage && (
            <div style={{ color: '#f87171', fontSize: '0.85rem', textAlign: 'center' }}>
              ⚠️ {errorMessage}
            </div>
          )}
        </div>

        {/* EVALUATION RESULTS CARD */}
        {evalResult && (
          <div style={{
            background: 'rgba(0, 0, 0, 0.35)',
            border: `1.5px solid ${evalResult.accuracy >= 80 ? '#10b981' : evalResult.accuracy >= 60 ? '#f59e0b' : '#ef4444'}`,
            borderRadius: '14px',
            padding: '1.3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: '0.5rem'
          }}>
            {/* Score Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
                  Hasil Evaluasi Artikulasi Fonetik
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc' }}>
                  {evalResult.accuracy >= 85 ? '🌟 Luar Biasa! Sangat Mirip Penutur Asli' :
                   evalResult.accuracy >= 70 ? '👍 Bagus! Artikulasi Jelas & Dipahami' :
                   evalResult.accuracy >= 50 ? '⚠️ Cukup, namun beberapa suku kata luput' :
                   '❌ Perlu Latihan Ulang Fokus Mora & Partikel'}
                </div>
              </div>

              <div style={{
                background: evalResult.accuracy >= 80 ? 'rgba(16, 185, 129, 0.2)' : evalResult.accuracy >= 60 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                border: `1px solid ${evalResult.accuracy >= 80 ? '#10b981' : evalResult.accuracy >= 60 ? '#f59e0b' : '#ef4444'}`,
                padding: '0.5rem 1.2rem',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  color: evalResult.accuracy >= 80 ? '#34d399' : evalResult.accuracy >= 60 ? '#fbbf24' : '#f87171'
                }}>
                  {evalResult.accuracy}%
                </div>
                <div style={{ fontSize: '0.72rem', color: '#cbd5e1', fontWeight: 600 }}>Akurasi Pelafalan</div>
              </div>
            </div>

            {/* Phonetic Character Breakdown */}
            <div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: 600 }}>
                Analisis Karakter per Mora:
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.35rem',
                background: 'rgba(0, 0, 0, 0.25)',
                padding: '0.8rem',
                borderRadius: '10px'
              }}>
                {evalResult.charAnalysis.map((item, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: item.match ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)',
                      color: item.match ? '#34d399' : '#f87171',
                      border: `1px solid ${item.match ? '#10b981' : '#ef4444'}`,
                      padding: '0.3rem 0.55rem',
                      borderRadius: '6px',
                      fontSize: '1.05rem',
                      fontWeight: 700
                    }}
                  >
                    {item.char}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.4rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                <span style={{ color: '#34d399' }}>● Hijau: Terdengar Tepat</span>
                <span style={{ color: '#f87171' }}>● Merah: Kurang Jelas / Tertelan</span>
              </div>
            </div>

            {/* User Speech Transcript */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '8px',
              padding: '0.8rem',
              fontSize: '0.9rem'
            }}>
              <span style={{ color: '#94a3b8', marginRight: '0.5rem' }}>Suara yang ditangkap AI:</span>
              <span style={{ color: '#f1f5f9', fontWeight: 600 }}>「{evalResult.rawSpeech}」</span>
            </div>

            {/* Particle Diagnostic Feedback */}
            {evalResult.particleFeedback.length > 0 && (
              <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '8px',
                padding: '0.8rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem'
              }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fbbf24' }}>
                  ⚠️ Diagnostik Partikel Tertelan:
                </div>
                {evalResult.particleFeedback.map((pf, idx) => (
                  <div key={idx} style={{ fontSize: '0.8rem', color: '#fef3c7' }}>
                    • {pf.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
