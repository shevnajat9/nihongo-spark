import React, { useState } from 'react';
import { dialectRegions, dialectDictionary, dialectQuizData } from '../data/dialects';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function DialectLab() {
  const [activeTab, setActiveTab] = useState('dictionary'); // 'dictionary' | 'converter' | 'quiz'
  const [searchTerm, setSearchTerm] = useState('');

  // Converter state
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [isUsingCustom, setIsUsingCustom] = useState(false);

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Audio player
  const playNativeAudio = (text, rate = 1.0) => {
    playJapaneseSpeech(text, { rate });
  };

  // Preset sentences for the converter
  const CONVERTER_PRESETS = [
    {
      standard: '本当に美味しいですね。',
      kansai: 'ほんまに美味いなぁ！めっちゃええ味しとる！',
      hakata: 'ばり美味しいばい！ちかっぱ美味か！',
      meaning: 'Sungguh enak sekali ya.',
      nuanceKansai: 'Menggunakan "honma ni" + penutup "naa/shitoru".',
      nuanceHakata: 'Menggunakan kata penguat "bari" + partikel penegas "bai".'
    },
    {
      standard: 'そんなことをしたらダメだよ。',
      kansai: 'そんなことしたらあかんて！何考えてんねん！',
      hakata: 'そんなことしたらいかんたい！やめときー！',
      meaning: 'Jangan lakukan hal seperti itu, tidak boleh!',
      nuanceKansai: 'Menggunakan kata sakti Kansai "akan" (ダメ).',
      nuanceHakata: 'Menggunakan "ikan" + partikel penegas Kyushu "tai".'
    },
    {
      standard: '今、何をしているの？',
      kansai: '今、何してんねん？',
      hakata: '今、何しよーと？',
      meaning: 'Kamu lagi ngapain sekarang?',
      nuanceKansai: 'Akhiran pertanyaan khas Osaka "shiten nen?".',
      nuanceHakata: 'Akhiran intonasi tanya manis Fukuoka "shiyooto?".'
    },
    {
      standard: 'だから言ったでしょう！',
      kansai: 'せやから言うたやんか！',
      hakata: 'やけん言うたろーが！',
      meaning: 'Tuh kan, makanya sudah kubilang tadi!',
      nuanceKansai: '"Dakara" ➔ "Seyakara", "Itta" ➔ "Yuuta".',
      nuanceHakata: '"Dakara" ➔ "Yaken/Daken".'
    },
    {
      standard: 'すみません、これいくらですか？',
      kansai: 'おっちゃん、これなんぼ？安してーな！',
      hakata: 'すみません、これなんぼですか？',
      meaning: 'Permisi, ini harganya berapa ya?',
      nuanceKansai: 'Penggunaan kata tanya harga "nanbo" khas pedagang pasar Kansai.',
      nuanceHakata: 'Kombinasi "nanbo" dengan keramahan khas Hakata.'
    },
    {
      standard: 'あなたのことが好きです。',
      kansai: 'あんたのことがめっちゃ好きやねん！',
      hakata: 'あんたのこと、好いとうよ。',
      meaning: 'Aku menyukaimu.',
      nuanceKansai: 'Ungkapan cinta populer Osaka: "Suki yanen".',
      nuanceHakata: 'Ungkapan cinta khas Fukuoka yang sangat terkenal di drama: "Suitou yo".'
    }
  ];

  // Dynamic Rule Converter for custom input
  const convertCustomToDialects = (text) => {
    if (!text) return { kansai: '', hakata: '' };

    let k = text;
    let h = text;

    // Kansai replacement rules
    k = k.replace(/本当に/g, 'ほんまに')
         .replace(/だめ|ダメ/g, 'あかん')
         .replace(/いけない/g, 'あかん')
         .replace(/だから/g, 'せやから')
         .replace(/違う/g, 'ちゃう')
         .replace(/知らない/g, '知らん')
         .replace(/わからない|分からない/g, 'わからへん')
         .replace(/とても|すごく/g, 'めっちゃ')
         .replace(/いくら/g, 'なんぼ')
         .replace(/いいよ/g, 'ええよ')
         .replace(/している/g, 'してんねん')
         .replace(/です/g, 'やで')
         .replace(/だよ/g, 'やで')
         .replace(/だね/g, 'やなぁ');

    // Hakata replacement rules
    h = h.replace(/本当に/g, 'ばり')
         .replace(/とても|すごく/g, 'ばり')
         .replace(/だめ|ダメ/g, 'いかん')
         .replace(/だから/g, 'やけん')
         .replace(/しているの/g, 'しよーと')
         .replace(/している/g, 'しとー')
         .replace(/知らない/g, '知らんばい')
         .replace(/いいよ/g, 'よかよ')
         .replace(/だよ/g, 'ばい')
         .replace(/です/g, 'たい');

    return { kansai: k, hakata: h };
  };

  // Filtered dictionary
  const filteredDict = dialectDictionary.filter(item =>
    item.standard.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.kansai.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.hakata.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Quiz actions
  const handleAnswerSelect = (idx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    if (idx === dialectQuizData[quizIdx].correctIdx) {
      setScore(s => s + 1);
    }
  };

  const handleNextQuiz = () => {
    if (quizIdx + 1 < dialectQuizData.length) {
      setQuizIdx(i => i + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizIdx(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  const currentPresetData = CONVERTER_PRESETS[selectedPresetIdx];
  const customConverted = convertCustomToDialects(customInput);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER SECTION */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(236, 72, 153, 0.15))',
        border: '1px solid rgba(249, 115, 22, 0.3)',
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
            <span style={{ fontSize: '1.8rem' }}>🗾</span>
            <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc', fontWeight: 800 }}>
              Laboratorium Dialek Daerah (方言ラボ)
            </h1>
            <span style={{
              background: 'rgba(249, 115, 22, 0.25)',
              color: '#fb923c',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: '1px solid rgba(249, 115, 22, 0.4)'
            }}>
              Kansai & Hakata Hougen
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', maxWidth: '650px' }}>
            Jepang memiliki ragam dialek budaya yang sangat kaya! Kenali perbedaan Bahasa Standar Tokyo dengan Kansai-ben (Osaka/Kyoto) dan Hakata-ben (Fukuoka) lewat kamus perbandingan, konverter interaktif, dan kuis budaya.
          </p>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '0.25rem', gap: '0.25rem' }}>
          {[
            { id: 'dictionary', label: '📖 Kamus Dialek' },
            { id: 'converter', label: '🔄 Konverter Dialek' },
            { id: 'quiz', label: '🏮 Kuis Budaya' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'var(--primary, #6366f1)' : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#94a3b8',
                border: 'none',
                borderRadius: '8px',
                padding: '0.45rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* REGIONAL CARDS OVERVIEW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {dialectRegions.map((region) => (
          <div
            key={region.id}
            style={{
              background: 'var(--card-bg, #1e293b)',
              border: `1.5px solid ${region.color}40`,
              borderRadius: '14px',
              padding: '1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{region.emoji}</span>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: region.color }}>
                  {region.name}
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', background: 'rgba(255, 255, 255, 0.05)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                {region.subregion}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4 }}>
              {region.description}
            </p>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              {region.keyFeatures.map((feat, idx) => (
                <div key={idx}>• {feat}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* TAB 1: KAMUS PERBANDINGAN DIALEK */}
      {activeTab === 'dictionary' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Search Bar */}
          <div style={{
            background: 'var(--card-bg, #1e293b)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}>
            <span style={{ fontSize: '1.1rem' }}>🔍</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari kata (contoh: だから, あかん, 本当に, 違う)..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: '#f8fafc',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Dictionary List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {filteredDict.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'var(--card-bg, #1e293b)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                    {item.meaning}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>ID: {item.id}</span>
                </div>

                {/* 3 Columns Comparison */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '0.8rem'
                }}>
                  {/* Tokyo Standard */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '0.8rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8' }}>TOKYO (標準語)</span>
                      <button
                        onClick={() => playNativeAudio(item.standard, 0.9)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
                      >
                        🔊
                      </button>
                    </div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f1f5f9' }}>{item.standard}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.standardReading}</div>
                  </div>

                  {/* Kansai-ben */}
                  <div style={{
                    background: 'rgba(249, 115, 22, 0.1)',
                    border: '1px solid rgba(249, 115, 22, 0.3)',
                    borderRadius: '10px',
                    padding: '0.8rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fb923c' }}>KANSAI (関西弁 🐙)</span>
                      <button
                        onClick={() => playNativeAudio(item.kansai, 0.9)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
                      >
                        🔊
                      </button>
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f97316' }}>{item.kansai}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{item.kansaiReading}</div>
                  </div>

                  {/* Hakata-ben */}
                  <div style={{
                    background: 'rgba(236, 72, 153, 0.1)',
                    border: '1px solid rgba(236, 72, 153, 0.3)',
                    borderRadius: '10px',
                    padding: '0.8rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f472b6' }}>HAKATA (博多弁 🍜)</span>
                      <button
                        onClick={() => playNativeAudio(item.hakata, 0.9)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
                      >
                        🔊
                      </button>
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ec4899' }}>{item.hakata}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{item.hakata}</div>
                  </div>
                </div>

                {/* Example in Context */}
                {item.example && (
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '8px',
                    padding: '0.6rem 0.9rem',
                    fontSize: '0.82rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    color: '#cbd5e1'
                  }}>
                    <div><strong>Std:</strong> {item.example.standard}</div>
                    <div><strong style={{ color: '#fb923c' }}>Kansai:</strong> {item.example.kansai}</div>
                    <div><strong style={{ color: '#f472b6' }}>Hakata:</strong> {item.example.hakata}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: KONVERTER DIALEK REAL-TIME */}
      {activeTab === 'converter' && (
        <div style={{
          background: 'var(--card-bg, #1e293b)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#f8fafc', fontWeight: 700 }}>
                🔄 Konverter Kalimat Standar ➔ Dialek Kansai & Hakata
              </h2>
              <button
                onClick={() => setIsUsingCustom(!isUsingCustom)}
                style={{
                  background: isUsingCustom ? '#8b5cf6' : 'rgba(255, 255, 255, 0.08)',
                  color: isUsingCustom ? '#fff' : '#cbd5e1',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  padding: '0.4rem 0.9rem',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {isUsingCustom ? '📋 Pilih Kalimat Preset' : '✏️ Mode Teks Bebas Kustom'}
              </button>
            </div>
            <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
              Lihat bagaimana sebuah kalimat standar Tokyo berubah rasa, intonasi, dan partikelnya saat diucapkan oleh orang Osaka atau Fukuoka.
            </p>
          </div>

          {/* Preset Buttons or Custom Input */}
          {!isUsingCustom ? (
            <div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 600 }}>
                Pilih Kalimat Preset:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem' }}>
                {CONVERTER_PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPresetIdx(idx)}
                    style={{
                      background: selectedPresetIdx === idx ? 'rgba(249, 115, 22, 0.2)' : 'rgba(0, 0, 0, 0.25)',
                      border: `1.5px solid ${selectedPresetIdx === idx ? '#f97316' : 'rgba(255, 255, 255, 0.08)'}`,
                      borderRadius: '10px',
                      padding: '0.65rem 0.85rem',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: selectedPresetIdx === idx ? '#fb923c' : '#f8fafc' }}>
                      {p.standard}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{p.meaning}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#c084fc', fontWeight: 600 }}>
                Ketik kalimat bahasa Jepang baku (contoh mengandung: 本当に, だめ, だから, 違う, 知らない, です...):
              </label>
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Contoh: 本当に美味しい料理だから、知らない人に教えたいです。"
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '10px',
                  padding: '0.8rem 1rem',
                  fontSize: '1.05rem',
                  color: '#f8fafc'
                }}
              />
            </div>
          )}

          {/* Results Comparison Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem'
          }}>
            {/* Standard Tokyo Source */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '0.8rem'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8' }}>
                    🏢 BAHASA STANDAR (TOKYO)
                  </span>
                  <button
                    onClick={() => playNativeAudio(!isUsingCustom ? currentPresetData.standard : customInput, 0.95)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                  >
                    🔊
                  </button>
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.5 }}>
                  {!isUsingCustom ? currentPresetData.standard : (customInput || '（Silakan ketik teks di atas）')}
                </div>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                {!isUsingCustom ? currentPresetData.meaning : 'Artikulasi standar buku teks & siaran berita NHK.'}
              </div>
            </div>

            {/* Kansai-ben Output */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(234, 88, 12, 0.08))',
              border: '1.5px solid rgba(249, 115, 22, 0.4)',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '0.8rem'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fb923c' }}>
                    🐙 KANSAI-BEN (OSAKA / KYOTO)
                  </span>
                  <button
                    onClick={() => playNativeAudio(!isUsingCustom ? currentPresetData.kansai : customConverted.kansai, 0.95)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                  >
                    🔊
                  </button>
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffedd5', lineHeight: 1.5 }}>
                  {!isUsingCustom ? currentPresetData.kansai : (customConverted.kansai || '—')}
                </div>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#fed7aa' }}>
                💡 {!isUsingCustom ? currentPresetData.nuanceKansai : 'Sentuhan kehangatan dan komedi ramah khas Kansai.'}
              </div>
            </div>

            {/* Hakata-ben Output */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(219, 39, 119, 0.08))',
              border: '1.5px solid rgba(236, 72, 153, 0.4)',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '0.8rem'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f472b6' }}>
                    🍜 HAKATA-BEN (FUKUOKA / KYUSHU)
                  </span>
                  <button
                    onClick={() => playNativeAudio(!isUsingCustom ? currentPresetData.hakata : customConverted.hakata, 0.95)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                  >
                    🔊
                  </button>
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fce7f3', lineHeight: 1.5 }}>
                  {!isUsingCustom ? currentPresetData.hakata : (customConverted.hakata || '—')}
                </div>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#fbcfe8' }}>
                💡 {!isUsingCustom ? currentPresetData.nuanceHakata : 'Intonasi lembut nan menggemaskan ala pemuda Kyushu.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: KUIS BUDAYA & DIALEK */}
      {activeTab === 'quiz' && (
        <div style={{
          background: 'var(--card-bg, #1e293b)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {!quizFinished ? (
            <>
              {/* Header Progress */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
                  Soal {quizIdx + 1} dari {dialectQuizData.length}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#fb923c', fontWeight: 700 }}>
                  Skor: {score}
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${((quizIdx + 1) / dialectQuizData.length) * 100}%`,
                  background: '#f97316',
                  transition: 'width 0.3s ease'
                }} />
              </div>

              {/* Dialect Phrase Card */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                borderRadius: '14px',
                padding: '1.5rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.6rem'
              }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#fb923c',
                  background: 'rgba(249, 115, 22, 0.15)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '6px'
                }}>
                  {dialectQuizData[quizIdx].dialect}
                </span>

                <button
                  onClick={() => playNativeAudio(dialectQuizData[quizIdx].audioText, 0.95)}
                  style={{
                    background: 'linear-gradient(135deg, #f97316, #ea580c)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '0.55rem 1.3rem',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    marginTop: '0.3rem'
                  }}
                >
                  <span>🔊</span>
                  <span>Putar Audio Dialek</span>
                </button>

                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.4rem' }}>
                  {dialectQuizData[quizIdx].phrase}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  {dialectQuizData[quizIdx].romaji}
                </div>
              </div>

              {/* Question Title */}
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#cbd5e1' }}>
                ❓ {dialectQuizData[quizIdx].question}
              </div>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {dialectQuizData[quizIdx].options.map((opt, oIdx) => {
                  let btnBg = 'rgba(255, 255, 255, 0.04)';
                  let btnBorder = 'rgba(255, 255, 255, 0.1)';
                  let btnColor = '#f8fafc';

                  if (selectedAnswer !== null) {
                    if (oIdx === dialectQuizData[quizIdx].correctIdx) {
                      btnBg = 'rgba(16, 185, 129, 0.25)';
                      btnBorder = '#10b981';
                      btnColor = '#34d399';
                    } else if (selectedAnswer === oIdx) {
                      btnBg = 'rgba(239, 68, 68, 0.25)';
                      btnBorder = '#ef4444';
                      btnColor = '#f87171';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleAnswerSelect(oIdx)}
                      style={{
                        background: btnBg,
                        border: `1.5px solid ${btnBorder}`,
                        borderRadius: '10px',
                        padding: '0.85rem 1.1rem',
                        textAlign: 'left',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: btnColor,
                        cursor: selectedAnswer === null ? 'pointer' : 'default',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Next */}
              {selectedAnswer !== null && (
                <div style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  borderLeft: `4px solid ${selectedAnswer === dialectQuizData[quizIdx].correctIdx ? '#10b981' : '#ef4444'}`,
                  borderRadius: '4px 8px 8px 4px',
                  padding: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.8rem'
                }}>
                  <div style={{ fontSize: '0.88rem', color: '#cbd5e1', maxWidth: '650px' }}>
                    💡 <strong>Fakta Budaya:</strong> {dialectQuizData[quizIdx].explanation}
                  </div>

                  <button
                    onClick={handleNextQuiz}
                    style={{
                      background: 'linear-gradient(135deg, #f97316, #ea580c)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.55rem 1.25rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {quizIdx + 1 < dialectQuizData.length ? 'Soal Berikutnya ➔' : 'Lihat Hasil ➔'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '3rem' }}>🐙🍜</div>
              <h2 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc', fontWeight: 800 }}>
                Kuis Dialek Budaya Jepang Selesai!
              </h2>
              <p style={{ margin: 0, fontSize: '1rem', color: '#94a3b8' }}>
                Skor Anda: <strong style={{ color: '#fb923c', fontSize: '1.3rem' }}>{score} / {dialectQuizData.length}</strong>
              </p>
              <button
                onClick={handleRestartQuiz}
                style={{
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.7rem 1.8rem',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  marginTop: '0.5rem'
                }}
              >
                🔄 Ulangi Kuis Dialek
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
