import { useState, useRef, useEffect } from 'react';
import { roleplayScenarios } from '../data/aiRoleplay';
import { playJapaneseSpeech } from '../utils/audioPlayer';

// Knowledge base for Free Q&A Mode
const senseiQnAKnowledge = [
  {
    keywords: ['wa', 'ga', 'partikel', 'perbedaan', 'は', 'が'],
    title: 'Perbedaan Partikel は (wa) vs が (ga)',
    japanese: '「は」は主題（テーマ）を表し、「が」は新しい情報や特定の主語を強調します。',
    explanation:
      'Partikel は (wa) berfungsi sebagai Penanda Topik (membicarakan hal umum / informasi lama yang sudah diketahui kedua pihak). Contoh: 「私は学生です」(Tentang saya, saya adalah mahasiswa).\n\nSedangkan partikel が (ga) berfungsi sebagai Penanda Subjek Spesifik / Informasi Baru yang ditekankan. Contoh: 「誰が来ましたか？」「田中さんが来ました」(Siapa yang datang? Tanaka-lah yang datang).',
  },
  {
    keywords: ['keigo', 'sopan', 'sonkeigo', 'kenjougo', 'hormat'],
    title: 'Hierarki Keigo (Bahasa Hormat Jepang)',
    japanese: '敬語には「尊敬語」「謙譲語」「丁寧語」の3つの基本レベルがあります。',
    explanation:
      '1. 丁寧語 (Teineigo / Bahasa Halus): Bentuk です / ます untuk lawan bicara umum.\n2. 尊敬語 (Sonkeigo / Bahasa Penghormatan): Mengangkat derajat orang lain/atasan. Contoh: いらっしゃる (pergi/datang), おっしゃる (berbicara).\n3. 謙譲語 (Kenjougo / Bahasa Merendah Diri): Merendahkan diri sendiri di depan klien/atasan. Contoh: 参る (datang/pergi), 申す (berbicara).',
  },
  {
    keywords: ['kara', 'node', 'alasan', 'karena', 'から', 'ので'],
    title: 'Perbedaan から (kara) vs ので (node)',
    japanese: '「から」は主観的な理由、「ので」は客観的で丁寧な理由を表します。',
    explanation:
      'から (kara) bernuansa subjektif (pendapat atau alasan pribadi, sering dipakai saat mengajak atau memerintah: 「危ないからやめて！」).\n\nので (node) bernuansa objektif, sopan, dan berdasarkan fakta alami (sering dipakai dalam situasi formal atau meminta maaf: 「電車が遅れましたので、遅刻します」).',
  },
  {
    keywords: ['tolak', 'ajakan', 'menolak', 'chotto', '断り方'],
    title: 'Cara Menolak Ajakan / Permintaan Secara Halus di Jepang',
    japanese: '日本語では「いいえ」と直接言わず、「ちょっと…」や「都合が悪くて…」と婉曲に断ります。',
    explanation:
      'Orang Jepang jarang mengatakan 「いいえ (Tidak)」secara langsung karena dianggap terlalu kasar atau konfrontatif.\n\nContoh penolakan halus yang natural:\n• 「その日はちょっと都合が悪くて……」(Hari itu sepertinya jadwal saya agak kurang pas...)\n• 「行きたいのは山々なんですが……」(Sebenarnya saya sangat ingin ikut, namun...)',
  },
];

export default function SenseiAITutor() {
  const [activeMode, setActiveMode] = useState('roleplay'); // 'roleplay' | 'qna' | 'gec'
  const [selectedScenario, setSelectedScenario] = useState(roleplayScenarios[0]);
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [chatHistory, setChatHistory] = useState([]);
  const [customInput, setCustomInput] = useState('');
  const [showRomaji, setShowRomaji] = useState(true);
  const [showMeaning, setShowMeaning] = useState(true);

  // BYO-Key & GEC states
  const [byoKey, setByoKey] = useState(() => localStorage.getItem('nihongo_spark_byo_ai_key') || '');
  const [byoProvider, setByoProvider] = useState(() => localStorage.getItem('nihongo_spark_byo_ai_provider') || 'gemini');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState('');
  const [gecInput, setGecInput] = useState('');
  const [gecLoading, setGecLoading] = useState(false);
  const [gecResult, setGecResult] = useState(null);

  // Q&A state
  const [qnaInput, setQnaInput] = useState('');
  const [qnaHistory, setQnaHistory] = useState([
    {
      sender: 'sensei',
      text: 'Konnichiwa! Saya AI Sensei Nihongo Spark 🌸. Ada tata bahasa, partikel, atau etika percakapan Jepang yang membingungkanmu? Tanyakan apa saja di sini!',
    },
  ]);

  const chatBottomRef = useRef(null);

  // Initialize scenario
  useEffect(() => {
    if (selectedScenario) {
      setCurrentNodeId('start');
      const startNode = selectedScenario.nodes['start'];
      setChatHistory([
        {
          id: 'start-0',
          sender: 'npc',
          name: selectedScenario.npcName,
          avatar: selectedScenario.npcAvatar,
          japanese: startNode.japanese,
          romaji: startNode.romaji,
          meaning: startNode.meaning,
          grammarNote: startNode.grammarNote,
        },
      ]);
    }
  }, [selectedScenario]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, qnaHistory]);

  const playSpeech = (text) => {
    playJapaneseSpeech(text, { rate: 0.9 });
  };

  const handleSelectOption = (opt) => {
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      japanese: opt.text,
      politeLevel: opt.politeLevel,
    };

    const nextNode = selectedScenario.nodes[opt.nextId];

    if (nextNode) {
      const npcMsg = {
        id: `npc-${Date.now()}`,
        sender: 'npc',
        name: selectedScenario.npcName,
        avatar: selectedScenario.npcAvatar,
        japanese: nextNode.japanese,
        romaji: nextNode.romaji,
        meaning: nextNode.meaning,
        grammarNote: nextNode.grammarNote,
      };

      setChatHistory((prev) => [...prev, userMsg, npcMsg]);
      setCurrentNodeId(opt.nextId);
    } else {
      setChatHistory((prev) => [...prev, userMsg]);
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const text = customInput.trim();
    setCustomInput('');

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      japanese: text,
      politeLevel: 'Input Pengguna Mandiri',
    };

    // AI Sensei evaluates user custom input and offers feedback
    const feedbackMsg = {
      id: `npc-${Date.now()}`,
      sender: 'npc',
      name: 'Sensei Evaluator 🌸',
      avatar: '👩‍🏫',
      japanese: '素晴らしい挑戦ですね！',
      romaji: 'Subarashii chousen desu ne!',
      meaning: 'Usaha yang luar biasa!',
      grammarNote: `💡 Analisis Sensei: Kalimat "${text}" telah diterima. Jika dalam percakapan nyata, pastikan akhiran kalimat menggunakan 「〜です/ます」 untuk menjaga kesantunan.`,
    };

    setChatHistory((prev) => [...prev, userMsg, feedbackMsg]);
  };

  const handleResetScenario = () => {
    if (!selectedScenario) return;
    setCurrentNodeId('start');
    const startNode = selectedScenario.nodes['start'];
    setChatHistory([
      {
        id: 'start-0',
        sender: 'npc',
        name: selectedScenario.npcName,
        avatar: selectedScenario.npcAvatar,
        japanese: startNode.japanese,
        romaji: startNode.romaji,
        meaning: startNode.meaning,
        grammarNote: startNode.grammarNote,
      },
    ]);
  };

  const handleQnaSubmit = (e) => {
    e.preventDefault();
    if (!qnaInput.trim()) return;

    const query = qnaInput.trim();
    setQnaInput('');

    // Append user question
    const newHistory = [...qnaHistory, { sender: 'user', text: query }];

    // Search knowledge base
    const lower = query.toLowerCase();
    const match = senseiQnAKnowledge.find((k) =>
      k.keywords.some((kw) => lower.includes(kw.toLowerCase()))
    );

    let reply = {};
    if (match) {
      reply = {
        sender: 'sensei',
        title: match.title,
        japanese: match.japanese,
        text: match.explanation,
      };
    } else {
      reply = {
        sender: 'sensei',
        title: 'Penjelasan Sensei',
        japanese: 'ご質問ありがとうございます！',
        text: `Pertanyaan bagus mengenai "${query}"! Dalam bahasa Jepang, perhatikan selalu konteks formal vs kasual serta partikel penghubungnya. Coba gunakan fitur "Visual Syntax Parser" atau jelajahi "Nuansa Kata (Tsukaiwake)" untuk pemahaman mendalam!`,
      };
    }

    setQnaHistory([...newHistory, reply]);
  };

  const handleSaveKey = () => {
    setByoKey(tempKey.trim());
    localStorage.setItem('nihongo_spark_byo_ai_key', tempKey.trim());
    localStorage.setItem('nihongo_spark_byo_ai_provider', byoProvider);
    setShowKeyModal(false);
  };

  const handleGecSubmit = async (e) => {
    e.preventDefault();
    if (!gecInput.trim()) return;

    setGecLoading(true);
    setGecResult(null);

    const text = gecInput.trim();

    // Check if BYO-Key is available for real API call
    if (byoKey) {
      try {
        if (byoProvider === 'gemini') {
          const resp = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${byoKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [
                      {
                        text: `Kamu adalah Sensei ahli Tata Bahasa Jepang (Japanese Grammar Error Correction).
Analisis kalimat pengguna berikut: "${text}".
Format jawaban dengan:
1. Kalimat Asli: ...
2. Kalimat Alami yang Diperbaiki: ...
3. Penjelasan Kesalahan & Nuansa (dalam Bahasa Indonesia): ...
4. Tingkat Kealamian: (persen %)`
                      }
                    ]
                  }
                ]
              })
            }
          );
          const data = await resp.json();
          const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            setGecResult({
              type: 'api',
              content: replyText,
              original: text
            });
            setGecLoading(false);
            return;
          }
        } else if (byoProvider === 'openai') {
          const resp = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${byoKey}`
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
              messages: [
                {
                  role: 'system',
                  content: 'Kamu adalah Sensei ahli Tata Bahasa Jepang (Japanese Grammar Error Correction). Berikan perbaikan, penjelasan kesalahan dalam bahasa Indonesia, dan kalimat alami.'
                },
                {
                  role: 'user',
                  content: `Analisis kalimat: "${text}"`
                }
              ]
            })
          });
          const data = await resp.json();
          const replyText = data.choices?.[0]?.message?.content;
          if (replyText) {
            setGecResult({
              type: 'api',
              content: replyText,
              original: text
            });
            setGecLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('BYO API call failed, falling back to local rule-based GEC:', err);
      }
    }

    // Local Intelligent Rule-Based GEC Engine (offline / fallback)
    setTimeout(() => {
      let corrected = text;
      const notes = [];
      let naturalness = 85;

      // 1. Check particle 'ni' used as subject agent: 私に -> 私は
      if (text.includes('私に') && (text.includes('食べる') || text.includes('読む') || text.includes('行く'))) {
        corrected = corrected.replace('私に', '私は');
        notes.push('Partikel 「に」 tidak tepat digunakan sebagai subjek pelaku kata kerja aktif. Gunakan 「私は」 atau 「私が」.');
        naturalness -= 25;
      }

      // 2. Check te-form + iru vs aru: 開けてある vs 開いている
      if (text.includes('ドアが開けてある') || text.includes('ドアを開けてある')) {
        corrected = corrected.replace('ドアが開けてある', 'ドアが開いている');
        notes.push('Kondisi pintu terbuka tanpa menonjolkan siapa pelakunya lebih alami menggunakan kata kerja intransitif (自動詞): 「ドアが開いている」.');
        naturalness -= 15;
      }

      // 3. Mixing da with desu/masu:
      if (text.includes('だです') || text.includes('でしたです')) {
        corrected = corrected.replace('だです', 'です').replace('でしたです', 'でした');
        notes.push('Hindari mencampuradukkan kopula bentuk kasual 「だ」 dengan bentuk sopan 「です」.');
        naturalness -= 30;
      }

      // 4. Polite ending recommendation
      if (!text.endsWith('です') && !text.endsWith('ます') && !text.endsWith('でした') && !text.endsWith('ました') && !text.endsWith('？') && !text.endsWith('。')) {
        notes.push('Untuk percakapan umum yang sopan (Teineigo), akhiri kalimat dengan partikel atau kopula 「〜です/ます」.');
      }

      if (notes.length === 0) {
        notes.push('Struktur kalimat sudah alami dan tata bahasanya tepat! Partikel dan bentuk kata kerja terhubung dengan baik.');
        naturalness = 95;
      }

      setGecResult({
        type: 'local',
        original: text,
        corrected: corrected,
        notes: notes,
        naturalness: naturalness
      });
      setGecLoading(false);
    }, 400);
  };

  const currentNode = selectedScenario?.nodes[currentNodeId];
  const isFinished = currentNode && (!currentNode.options || currentNode.options.length === 0);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* BYO Key Modal */}
      {showKeyModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', maxWidth: '460px', width: '100%', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem', fontWeight: 800 }}>🔑 Pengaturan Bring-Your-Own-Key (BYO-Key)</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 16px' }}>
              Gunakan kunci API Google Gemini atau OpenAI Anda sendiri untuk mendapatkan koreksi tata bahasa AI tercanggih tanpa batas kuota.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Pilih Penyedia AI:</label>
                <select
                  value={byoProvider}
                  onChange={(e) => setByoProvider(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                >
                  <option value="gemini">Google Gemini (Gemini 1.5 Flash - Gratis di Google AI Studio)</option>
                  <option value="openai">OpenAI (GPT-4o mini)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>API Key:</label>
                <input
                  type="password"
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder={byoKey ? '••••••••••••••••' : 'Tempel API Key di sini (AIzaSy... / sk-...)'}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                />
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginTop: '4px' }}>
                  Kunci API disimpan hanya di peramban lokal (localStorage) Anda dan tidak pernah dikirim ke server pihak ketiga manapun.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                onClick={() => setShowKeyModal(false)}
                style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                Batal
              </button>
              <button
                onClick={handleSaveKey}
                style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', background: '#2563eb', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}
              >
                Simpan Kunci
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-color, #1e293b)' }}>
            🤖 Sensei AI Conversational Tutor (AI会話・質問)
          </h2>
          <p style={{ margin: '4px 0 0', color: 'var(--subtext-color, #64748b)', fontSize: '0.9rem' }}>
            Simulasi roleplay percakapan nyata interaktif, Q&A Sensei, & modul koreksi tata bahasa (GEC).
          </p>
        </div>

        {/* Mode Selector & BYO-Key */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', background: 'var(--card-bg, #f1f5f9)', padding: '4px', borderRadius: '10px' }}>
            <button
              onClick={() => setActiveMode('roleplay')}
              style={{
                padding: '8px 14px',
                border: 'none',
                borderRadius: '8px',
                background: activeMode === 'roleplay' ? 'var(--primary, #3b82f6)' : 'transparent',
                color: activeMode === 'roleplay' ? '#ffffff' : 'inherit',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              🎭 Roleplay
            </button>
            <button
              onClick={() => setActiveMode('qna')}
              style={{
                padding: '8px 14px',
                border: 'none',
                borderRadius: '8px',
                background: activeMode === 'qna' ? 'var(--primary, #3b82f6)' : 'transparent',
                color: activeMode === 'qna' ? '#ffffff' : 'inherit',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              💬 Tanya Q&A
            </button>
            <button
              onClick={() => setActiveMode('gec')}
              style={{
                padding: '8px 14px',
                border: 'none',
                borderRadius: '8px',
                background: activeMode === 'gec' ? 'var(--primary, #3b82f6)' : 'transparent',
                color: activeMode === 'gec' ? '#ffffff' : 'inherit',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              📝 Koreksi GEC
            </button>
          </div>

          <button
            onClick={() => {
              setTempKey(byoKey);
              setShowKeyModal(true);
            }}
            style={{
              padding: '7px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: byoKey ? '#ecfdf5' : '#f8fafc',
              color: byoKey ? '#065f46' : '#64748b',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
            title="Konfigurasi API Key Google Gemini atau OpenAI sendiri"
          >
            🔑 BYO-Key {byoKey ? '(Aktif)' : ''}
          </button>
        </div>
      </div>

      {activeMode === 'roleplay' && (
        <>
          {/* Scenario Selectors */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            {roleplayScenarios.map((sc) => (
              <div
                key={sc.id}
                onClick={() => setSelectedScenario(sc)}
                style={{
                  background: selectedScenario?.id === sc.id ? '#eff6ff' : 'var(--card-bg, #ffffff)',
                  border: selectedScenario?.id === sc.id ? '2px solid #3b82f6' : '1px solid var(--border-color, #e2e8f0)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '1.4rem' }}>{sc.emoji}</span>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{sc.title}</div>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  Level: <span style={{ color: '#2563eb', fontWeight: 600 }}>{sc.level}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Container */}
          <div
            style={{
              background: 'var(--card-bg, #ffffff)',
              borderRadius: '16px',
              border: '1px solid var(--border-color, #e2e8f0)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '480px',
            }}
          >
            {/* Chat Header / Toolbar */}
            <div
              style={{
                padding: '12px 18px',
                borderBottom: '1px solid var(--border-color, #e2e8f0)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px',
                background: '#f8fafc',
                borderRadius: '16px 16px 0 0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.4rem' }}>{selectedScenario.npcAvatar}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{selectedScenario.npcName}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{selectedScenario.description}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={showRomaji}
                    onChange={(e) => setShowRomaji(e.target.checked)}
                  />
                  Romaji
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={showMeaning}
                    onChange={(e) => setShowMeaning(e.target.checked)}
                  />
                  Artinya
                </label>
                <button
                  onClick={handleResetScenario}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    background: '#fff',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                  }}
                >
                  🔄 Ulangi
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, maxHeight: '420px', overflowY: 'auto' }}>
              {chatHistory.map((msg) => {
                const isNpc = msg.sender === 'npc';
                return (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      flexDirection: isNpc ? 'row' : 'row-reverse',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                  >
                    {isNpc && (
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          background: '#f1f5f9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.2rem',
                          flexShrink: 0,
                          border: '1px solid #e2e8f0',
                        }}
                      >
                        {msg.avatar || '🌸'}
                      </div>
                    )}

                    <div
                      style={{
                        maxWidth: '82%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isNpc ? 'flex-start' : 'flex-end',
                      }}
                    >
                      <div
                        style={{
                          background: isNpc ? '#f8fafc' : 'var(--primary, #3b82f6)',
                          color: isNpc ? '#0f172a' : '#ffffff',
                          padding: '12px 16px',
                          borderRadius: isNpc ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                          border: isNpc ? '1px solid #e2e8f0' : 'none',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>{msg.japanese}</span>
                          {isNpc && (
                            <button
                              onClick={() => playSpeech(msg.japanese)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.95rem',
                                padding: '2px',
                              }}
                              title="Dengarkan suara"
                            >
                              🔊
                            </button>
                          )}
                        </div>

                        {showRomaji && msg.romaji && (
                          <div style={{ fontSize: '0.8rem', color: isNpc ? '#64748b' : '#dbeafe', marginTop: '4px' }}>
                            {msg.romaji}
                          </div>
                        )}

                        {showMeaning && msg.meaning && (
                          <div
                            style={{
                              fontSize: '0.84rem',
                              color: isNpc ? '#334155' : '#eff6ff',
                              marginTop: '6px',
                              borderTop: isNpc ? '1px dashed #cbd5e1' : '1px dashed rgba(255,255,255,0.3)',
                              paddingTop: '4px',
                            }}
                          >
                            {msg.meaning}
                          </div>
                        )}

                        {msg.politeLevel && (
                          <div
                            style={{
                              fontSize: '0.72rem',
                              color: isNpc ? '#64748b' : '#bfdbfe',
                              marginTop: '4px',
                              fontWeight: 600,
                            }}
                          >
                            ✨ {msg.politeLevel}
                          </div>
                        )}
                      </div>

                      {/* Sensei Grammar Insight Note */}
                      {msg.grammarNote && (
                        <div
                          style={{
                            marginTop: '6px',
                            background: '#eff6ff',
                            border: '1px solid #bfdbfe',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            fontSize: '0.8rem',
                            color: '#1e3a8a',
                            lineHeight: 1.4,
                          }}
                        >
                          <strong>💡 Analisis Sensei:</strong> {msg.grammarNote}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={chatBottomRef} />
            </div>

            {/* Response Area */}
            <div
              style={{
                padding: '16px 20px',
                borderTop: '1px solid var(--border-color, #e2e8f0)',
                background: '#ffffff',
                borderRadius: '0 0 16px 16px',
              }}
            >
              {isFinished ? (
                <div style={{ textAlign: 'center', padding: '12px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981' }}>
                    🎉 Percakapan Selesai!
                  </span>
                  <p style={{ margin: '6px 0 12px', fontSize: '0.88rem', color: '#64748b' }}>
                    Kamu berhasil menyelesaikan skenario ini dengan sangat baik. Coba skenario lainnya atau ulangi untuk melatih respons berbeda!
                  </p>
                  <button
                    onClick={handleResetScenario}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'var(--primary, #3b82f6)',
                      color: '#fff',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Mulai Ulang Skenario
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Option Chips */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b' }}>
                      Pilih respon alur percakapan:
                    </div>
                    {currentNode?.options?.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectOption(opt)}
                        style={{
                          textAlign: 'left',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1px solid #bfdbfe',
                          background: '#f8fafc',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#eff6ff')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = '#f8fafc')}
                      >
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#0f172a' }}>
                            {opt.text}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            {opt.label}
                          </div>
                        </div>
                        <span
                          style={{
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background: '#e0f2fe',
                            color: '#0369a1',
                            flexShrink: 0,
                          }}
                        >
                          {opt.politeLevel}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Custom reply field */}
                  <form onSubmit={handleCustomSubmit} style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <input
                      type="text"
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="Atau ketik balasan bahasa Jepangmu sendiri..."
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                      }}
                    />
                    <button
                      type="submit"
                      disabled={!customInput.trim()}
                      style={{
                        padding: '10px 18px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#10b981',
                        color: '#fff',
                        fontWeight: 600,
                        cursor: customInput.trim() ? 'pointer' : 'not-allowed',
                        opacity: customInput.trim() ? 1 : 0.6,
                      }}
                    >
                      Kirim
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {activeMode === 'qna' && (
        /* Q&A Mode */
        <div
          style={{
            background: 'var(--card-bg, #ffffff)',
            borderRadius: '16px',
            border: '1px solid var(--border-color, #e2e8f0)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '480px',
          }}
        >
          {/* Preset Questions Chips */}
          <div style={{ padding: '14px 18px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b', alignSelf: 'center' }}>
              Topik Populer:
            </span>
            {[
              'Perbedaan は vs が',
              'Tingkatan Keigo (Sonkeigo vs Kenjougo)',
              'Bedanya から vs ので',
              'Cara Menolak Ajakan Halus',
            ].map((topic) => (
              <button
                key={topic}
                onClick={() => setQnaInput(topic)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '16px',
                  border: '1px solid #cbd5e1',
                  background: '#fff',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Q&A Chat Feed */}
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, maxHeight: '420px', overflowY: 'auto' }}>
            {qnaHistory.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: item.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '82%',
                    background: item.sender === 'user' ? 'var(--primary, #3b82f6)' : '#f8fafc',
                    color: item.sender === 'user' ? '#ffffff' : '#0f172a',
                    padding: '14px 18px',
                    borderRadius: item.sender === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                    border: item.sender === 'user' ? 'none' : '1px solid #e2e8f0',
                    lineHeight: 1.5,
                  }}
                >
                  {item.title && (
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: '#1e3a8a', marginBottom: '6px' }}>
                      {item.title}
                    </div>
                  )}
                  {item.japanese && (
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: item.sender === 'user' ? '#fff' : '#0f172a', marginBottom: '8px' }}>
                      {item.japanese}
                    </div>
                  )}
                  <div style={{ fontSize: '0.88rem', whiteSpace: 'pre-line' }}>{item.text}</div>
                </div>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          {/* Q&A Input form */}
          <form
            onSubmit={handleQnaSubmit}
            style={{
              padding: '16px 20px',
              borderTop: '1px solid var(--border-color, #e2e8f0)',
              display: 'flex',
              gap: '8px',
            }}
          >
            <input
              type="text"
              value={qnaInput}
              onChange={(e) => setQnaInput(e.target.value)}
              placeholder="Tanyakan tata bahasa, perbedaan kata, atau etika percakapan Jepang..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.9rem',
              }}
            />
            <button
              type="submit"
              disabled={!qnaInput.trim()}
              style={{
                padding: '12px 22px',
                borderRadius: '8px',
                border: 'none',
                background: 'var(--primary, #3b82f6)',
                color: '#fff',
                fontWeight: 600,
                cursor: qnaInput.trim() ? 'pointer' : 'not-allowed',
                opacity: qnaInput.trim() ? 1 : 0.6,
              }}
            >
              Tanya Sensei
            </button>
          </form>
        </div>
      )}

      {/* Grammar Error Correction (GEC) Mode */}
      {activeMode === 'gec' && (
        <div
          style={{
            background: 'var(--card-bg, #ffffff)',
            borderRadius: '16px',
            border: '1px solid var(--border-color, #e2e8f0)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '1.2rem', fontWeight: 800 }}>
                📝 Modul Koreksi Tata Bahasa (Grammar Error Correction - GEC)
              </h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                Deteksi kekeliruan partikel, ketidaksesuaian tingkat kesantunan, dan dapatkan alternatif kalimat yang lebih alami.
                {byoKey ? ` (Didukung oleh API ${byoProvider.toUpperCase()})` : ' (Mode Offline / Rule Engine Cerdas)'}
              </p>
            </div>
          </div>

          {/* Quick preset tests */}
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '6px' }}>
              Coba Contoh Kalimat Uji:
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                '私に日本語の本を読む。',
                'ドアが開けてある。',
                '今日はとても寒いですだ。',
                '私は昨日寿司を食べました。'
              ].map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => setGecInput(sample)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {/* GEC Input Form */}
          <form onSubmit={handleGecSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <textarea
              rows={3}
              value={gecInput}
              onChange={(e) => setGecInput(e.target.value)}
              placeholder="Ketik kalimat bahasa Jepang yang ingin diperiksa tata bahasanya..."
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95rem',
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
            />
            <button
              type="submit"
              disabled={gecLoading || !gecInput.trim()}
              style={{
                padding: '12px 24px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(to right, #2563eb, #7c3aed)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: gecInput.trim() && !gecLoading ? 'pointer' : 'not-allowed',
                opacity: gecInput.trim() && !gecLoading ? 1 : 0.6,
                alignSelf: 'flex-start',
              }}
            >
              {gecLoading ? '⏳ Menganalisis Kalimat...' : '✨ Periksa & Analisis Kalimat'}
            </button>
          </form>

          {/* GEC Result Card */}
          {gecResult && (
            <div
              style={{
                background: '#f8fafc',
                borderRadius: '14px',
                border: '1px solid #e2e8f0',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              {gecResult.type === 'api' ? (
                <div>
                  <h4 style={{ margin: '0 0 8px', fontSize: '1rem', fontWeight: 700, color: '#1e3a8a' }}>
                    Hasil Analisis AI Sensei:
                  </h4>
                  <div style={{ fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                    {gecResult.content}
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>
                      EVALUASI TATA BAHASA & KEALAMIAN
                    </span>
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: '20px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        background: gecResult.naturalness >= 80 ? '#ecfdf5' : '#fef3c7',
                        color: gecResult.naturalness >= 80 ? '#065f46' : '#92400e',
                      }}
                    >
                      Skor Kealamian: {gecResult.naturalness}%
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                    <div style={{ padding: '12px', background: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                        KALIMAT INPUT:
                      </span>
                      <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#334155' }}>
                        {gecResult.original}
                      </div>
                    </div>

                    <div style={{ padding: '12px', background: '#ecfdf5', borderRadius: '10px', border: '1px solid #a7f3d0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857' }}>
                          SARAN KALIMAT ALAMI:
                        </span>
                        <button
                          type="button"
                          onClick={() => playSpeech(gecResult.corrected)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                          title="Dengarkan audio"
                        >
                          🔊
                        </button>
                      </div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#065f46' }}>
                        {gecResult.corrected}
                      </div>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
                      Catatan Perbaikan dari Sensei:
                    </span>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>
                      {gecResult.notes.map((note, idx) => (
                        <li key={idx} style={{ marginBottom: '4px' }}>{note}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
