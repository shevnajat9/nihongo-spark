import React, { useState, useRef } from 'react';
import { playJapaneseSpeech } from '../utils/audioPlayer';
const ArrowLeft = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
);
const Camera = ({ className = 'w-6 h-6' }) => (
  <svg className={className} width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
);
const Upload = ({ className = 'w-4 h-4' }) => (
  <svg className={className} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
);
const BookmarkPlus = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2zM12 7v6m-3-3h6"/></svg>
);
const Check = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
);
const Volume2 = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5zm4.54 3.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14"/></svg>
);
const Sparkles = ({ className = 'w-4 h-4' }) => (
  <svg className={className} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M8.757 15.243l-2.121 2.121m12.728 0l-2.121-2.121M8.757 8.757L6.636 6.636"/></svg>
);
const Eye = ({ className = 'w-4 h-4' }) => (
  <svg className={className} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);
const Info = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
);

const SCENARIOS = [
  {
    id: 'izakaya',
    title: '居酒屋メニュー (Menu Izakaya)',
    category: 'Kuliner & Restoran',
    imagePlaceholder: '🏮 居酒屋「さくら」のお品書き',
    bgColor: 'bg-amber-950',
    words: [
      {
        id: 'w1',
        text: '刺身盛り合わせ',
        reading: 'さしみもりあわせ (sashimi moriawase)',
        meaning: 'Aneka sashimi campur segar (salmon, tuna, kerang).',
        jlpt: 'N3',
        tag: 'Makanan',
        bbox: { x: 12, y: 18, w: 38, h: 14 }
      },
      {
        id: 'w2',
        text: '生ビール',
        reading: 'なまビール (nama biiru)',
        meaning: 'Bir draf segar langsung dari tabung tap.',
        jlpt: 'N4',
        tag: 'Minuman',
        bbox: { x: 55, y: 18, w: 32, h: 14 }
      },
      {
        id: 'w3',
        text: '焼き鳥',
        reading: 'やきとり (yakitori)',
        meaning: 'Sate ayam panggang saus tare atau garam.',
        jlpt: 'N5',
        tag: 'Makanan',
        bbox: { x: 12, y: 45, w: 30, h: 14 }
      },
      {
        id: 'w4',
        text: '枝豆',
        reading: 'えだまめ (edamame)',
        meaning: 'Kacang kedelai muda rebus bergaram gurih.',
        jlpt: 'N5',
        tag: 'Appetizer',
        bbox: { x: 55, y: 45, w: 26, h: 14 }
      },
      {
        id: 'w5',
        text: '本日のおすすめ',
        reading: 'ほんじつのおすすめ (honjitsu no osusume)',
        meaning: 'Menu rekomendasi / spesial hari ini.',
        jlpt: 'N3',
        tag: 'Info Menu',
        bbox: { x: 20, y: 72, w: 60, h: 16 }
      }
    ]
  },
  {
    id: 'station',
    title: '駅案内板 (Papan Petunjuk Stasiun)',
    category: 'Transportasi Kereta',
    imagePlaceholder: '🚇 JR 新宿駅 案内表示板',
    bgColor: 'bg-emerald-950',
    words: [
      {
        id: 's1',
        text: '東口・西口',
        reading: 'ひがしぐち・にしぐち (higashiguchi / nishiguchi)',
        meaning: 'Pintu Keluar Timur / Barat.',
        jlpt: 'N5',
        tag: 'Stasiun',
        bbox: { x: 10, y: 16, w: 38, h: 15 }
      },
      {
        id: 's2',
        text: '改札口',
        reading: 'かいさつぐち (kaisatsuguchi)',
        meaning: 'Gerbang tiket / gerbang tap kartu Suica/Pasmo.',
        jlpt: 'N4',
        tag: 'Stasiun',
        bbox: { x: 54, y: 16, w: 36, h: 15 }
      },
      {
        id: 's3',
        text: '山手線',
        reading: 'やまのてせん (yamanotesen)',
        meaning: 'Jalur lingkar kereta api Yamanote Line Tokyo.',
        jlpt: 'N4',
        tag: 'Jalur',
        bbox: { x: 10, y: 45, w: 34, h: 15 }
      },
      {
        id: 's4',
        text: '切符売り場',
        reading: 'きっぷうりば (kippu uriba)',
        meaning: 'Loket / mesin penjualan tiket kereta otomatis.',
        jlpt: 'N4',
        tag: 'Fasilitas',
        bbox: { x: 50, y: 45, w: 42, h: 15 }
      },
      {
        id: 's5',
        text: '非常口',
        reading: 'ひじょうぐち (hijouguchi)',
        meaning: 'Pintu keluar darurat evakuasi.',
        jlpt: 'N3',
        tag: 'Keselamatan',
        bbox: { x: 28, y: 72, w: 44, h: 15 }
      }
    ]
  },
  {
    id: 'road',
    title: '交通標識 (Rambu Lalu Lintas)',
    category: 'Jalan Raya & Publik',
    imagePlaceholder: '🚸 道路交通標識・歩行者案内',
    bgColor: 'bg-blue-950',
    words: [
      {
        id: 'r1',
        text: '止まれ',
        reading: 'とまれ (tomare)',
        meaning: 'Berhenti! (Bentuk imperatif perintah dari 止まる).',
        jlpt: 'N4',
        tag: 'Rambu',
        bbox: { x: 30, y: 14, w: 40, h: 18 }
      },
      {
        id: 'r2',
        text: '歩行者専用',
        reading: 'ほこうしゃせんよう (hokousha senyou)',
        meaning: 'Khusus untuk pejalan kaki.',
        jlpt: 'N2',
        tag: 'Rambu',
        bbox: { x: 15, y: 42, w: 42, h: 15 }
      },
      {
        id: 'r3',
        text: '駐車禁止',
        reading: 'ちゅうしゃきんし (chuusha kinshi)',
        meaning: 'Dilarang parkir!',
        jlpt: 'N3',
        tag: 'Larangan',
        bbox: { x: 60, y: 42, w: 32, h: 15 }
      },
      {
        id: 'r4',
        text: '踏切注意',
        reading: 'ふみきりちゅうい (fumikiri chuui)',
        meaning: 'Perhatian: Perlintasan kereta api sebidang.',
        jlpt: 'N3',
        tag: 'Peringatan',
        bbox: { x: 25, y: 70, w: 50, h: 16 }
      }
    ]
  }
];

export default function CameraKanjiScanner({ onBack }) {
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [activeWord, setActiveWord] = useState(SCENARIOS[0].words[0]);
  const [customImage, setCustomImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleSelectScenario = (sc) => {
    setSelectedScenario(sc);
    setCustomImage(null);
    setActiveWord(sc.words[0]);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      setCustomImage(event.target?.result);
      // Simulate intelligent OCR extraction from custom photo
      setTimeout(() => {
        setIsScanning(false);
        setActiveWord({
          id: 'custom-1',
          text: '準備中・営業中',
          reading: 'じゅんびちゅう / えいぎょうちゅう',
          meaning: 'Sedang Persiapan / Sedang Beroperasi buka.',
          jlpt: 'N3',
          tag: 'Toko',
          bbox: { x: 25, y: 40, w: 50, h: 20 }
        });
      }, 900);
    };
    reader.readAsDataURL(file);
  };

  const speakText = (text) => {
    playJapaneseSpeech(text, { rate: 0.9 });
  };

  const handleAddToSRS = () => {
    if (!activeWord) return;

    try {
      const STORAGE_KEY = 'nihongo_spark_custom_decks';
      const raw = localStorage.getItem(STORAGE_KEY);
      let decks = raw ? JSON.parse(raw) : [];

      if (decks.length === 0) {
        decks = [{
          id: 'deck-ocr',
          name: 'Hasil Scan Kamera & OCR 📷',
          description: 'Kosakata dari foto tanda jalan dan menu nyata',
          createdAt: new Date().toISOString(),
          cards: []
        }];
      }

      const targetDeck = decks[0];
      const newCard = {
        id: `ocr-${Date.now()}`,
        front: activeWord.text,
        reading: activeWord.reading,
        back: activeWord.meaning,
        notes: `Dipindai dari: ${selectedScenario.title}`,
        tag: activeWord.tag || 'OCR Scan'
      };

      targetDeck.cards.push(newCard);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));

      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
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
              <Camera className="w-6 h-6 text-purple-500" />
              <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Scanner Kanji Kamera / OCR Menu & Papan Jalan
              </h1>
            </div>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Pindai tanda jalan & menu nyata, dapatkan furigana interaktif, dan simpan langsung ke SRS!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow transition"
          >
            <Upload className="w-4 h-4" />
            Unggah Foto Sendiri
          </button>
        </div>
      </div>

      {/* Preset Scenarios Tabs */}
      <div>
        <label className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 block mb-2">
          Pilih Sampel Foto Nyata di Jepang:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`p-3.5 rounded-xl border text-left transition ${
                selectedScenario.id === sc.id && !customImage
                  ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-100 shadow-sm'
                  : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-300'
              }`}
            >
              <p className="font-black text-sm">{sc.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{sc.category}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Scanner Visual Viewport & Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Photo Viewport with Bounding Boxes */}
        <div className="lg:col-span-7 bg-gray-900 rounded-3xl p-4 md:p-6 border-2 border-purple-800/40 shadow-xl overflow-hidden relative">
          <div className="flex items-center justify-between text-xs text-gray-400 pb-3 mb-2 border-b border-gray-800">
            <span className="flex items-center gap-1 text-purple-300 font-bold">
              <Eye className="w-4 h-4" /> Mode Deteksi OCR Interaktif
            </span>
            <span className="text-[11px] bg-purple-900/60 px-2 py-0.5 rounded text-purple-200">
              Klik kotak hijau untuk membaca
            </span>
          </div>

          {/* Interactive Bounding Box Canvas Simulator */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-indigo-950 flex flex-col justify-center items-center select-none border border-gray-800">
            {customImage ? (
              <img
                src={customImage}
                alt="Custom uploaded"
                className="absolute inset-0 w-full h-full object-contain"
              />
            ) : (
              <div className="text-center p-6 space-y-4">
                <span className="text-5xl">{selectedScenario.words[0].tag === 'Makanan' ? '🍜' : selectedScenario.words[0].tag === 'Stasiun' ? '🚉' : '🛑'}</span>
                <p className="text-xl md:text-2xl font-black text-white/90 tracking-widest">
                  {selectedScenario.imagePlaceholder}
                </p>
                <p className="text-xs text-purple-300/80 max-w-xs mx-auto">
                  Sistem OCR mendeteksi {selectedScenario.words.length} klaster teks kanji di dalam foto ini.
                </p>
              </div>
            )}

            {/* Scanning Laser Animation */}
            {isScanning && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse top-1/2 shadow-[0_0_15px_#22d3ee]" />
            )}

            {/* Bounding Boxes Overlay */}
            {(!customImage ? selectedScenario.words : activeWord ? [activeWord] : []).map((w) => {
              const isSelected = activeWord?.id === w.id;
              return (
                <div
                  key={w.id}
                  onClick={() => setActiveWord(w)}
                  style={{
                    left: `${w.bbox.x}%`,
                    top: `${w.bbox.y}%`,
                    width: `${w.bbox.w}%`,
                    height: `${w.bbox.h}%`
                  }}
                  className={`absolute rounded-lg border-2 cursor-pointer transition-all duration-200 flex items-center justify-center backdrop-blur-[2px] ${
                    isSelected
                      ? 'border-yellow-400 bg-yellow-400/20 ring-2 ring-yellow-400/50 shadow-lg'
                      : 'border-emerald-400/80 bg-emerald-500/10 hover:bg-emerald-500/30'
                  }`}
                >
                  <span className="text-white text-xs sm:text-sm font-extrabold px-1.5 py-0.5 rounded bg-black/60 shadow tracking-wide">
                    {w.text}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 mt-3">
            <Info className="w-3.5 h-3.5 text-purple-400" />
            <span>Setiap kata berkotak hijau dapat disentuh untuk melihat analisis kanji mendalam.</span>
          </div>
        </div>

        {/* Selected Word Detail & SRS Action Box */}
        <div className="lg:col-span-5 space-y-4">
          {activeWord ? (
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-md space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700/80 pb-3">
                <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                  JLPT {activeWord.jlpt}
                </span>
                <span className="text-xs text-gray-500 font-semibold">
                  Kategori: {activeWord.tag}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                    {activeWord.text}
                  </h2>
                  <button
                    onClick={() => speakText(activeWord.text)}
                    className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900 text-purple-600 dark:text-purple-300 transition"
                    title="Dengarkan pengucapan audio asli"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-base font-bold text-purple-600 dark:text-purple-400 mt-1">
                  {activeWord.reading}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900/60 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                  Arti Kontekstual di Jepang:
                </span>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {activeWord.meaning}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleAddToSRS}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-5 h-5" />
                      Tersimpan ke Flashcard SRS!
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="w-5 h-5" />
                      Tambah ke Flashcard Custom SRS
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-gray-50 dark:bg-gray-800/40 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-400">
              Pilih salah satu teks pada foto untuk melihat bacaan furigana dan arti.
            </div>
          )}

          {/* Quick Learning Tip */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-2xl p-4 border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-200 space-y-1.5">
            <span className="font-extrabold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> Tips Belajar dari Lingkungan Asli
            </span>
            <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
              Membaca kanji dari rambu jalan, menu izakaya, dan label kemasan mempercepat pengenalan visual kanji kompleks di dunia nyata tanpa terbiasa font standar buku teks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
