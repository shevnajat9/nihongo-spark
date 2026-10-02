import { useState, useEffect } from 'react';
import { playJapaneseSpeech } from '../utils/audioPlayer';

const STORAGE_KEY = 'nihongo_spark_custom_decks';

const defaultStarterDeck = {
  id: 'starter-1',
  name: 'Koleksi Kosakata Favorit Saya 🌟',
  description: 'Deck kustom awal untuk mencatat kata-kata baru yang kamu temui.',
  createdAt: new Date().toISOString(),
  cards: [
    {
      id: 'c-1',
      front: '木漏れ日',
      reading: 'こもれび (komorebi)',
      back: 'Sinar matahari yang menembus celah dedaunan pohon.',
      notes: 'Kata puitis khas Jepang yang tidak ada padanan langsungnya dalam bahasa Inggris atau Indonesia.',
      tag: 'Alam / Estetika',
    },
    {
      id: 'c-2',
      front: 'お疲れ様でした',
      reading: 'おつかれさまでした (otsukaresama deshita)',
      back: 'Terima kasih atas kerja kerasnya (ungkapan apresiasi setelah bekerja).',
      notes: 'Wajib diucapkan saat pulang kerja atau menyelesaikan proyek bersama rekan kerja.',
      tag: 'Bisnis / Harian',
    },
    {
      id: 'c-3',
      front: '生ビール',
      reading: 'なまビール (namabiiru)',
      back: 'Bir draf segar langsung dari tong (keg).',
      notes: 'Paling sering dipesan pertama kali begitu duduk di Izakaya.',
      tag: 'Kuliner',
    },
  ],
};

export default function CustomDeckManager() {
  const [decks, setDecks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [defaultStarterDeck];
    } catch {
      return [defaultStarterDeck];
    }
  });

  const [activeDeckId, setActiveDeckId] = useState(decks[0]?.id || null);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'study' | 'import'

  // New deck modal / form
  const [showNewDeckModal, setShowNewDeckModal] = useState(false);
  const [newDeckName, setNewDeckName] = useState('');
  const [newDeckDesc, setNewDeckDesc] = useState('');

  // New card modal / form
  const [showNewCardModal, setShowNewCardModal] = useState(false);
  const [cardFront, setCardFront] = useState('');
  const [cardReading, setCardReading] = useState('');
  const [cardBack, setCardBack] = useState('');
  const [cardNotes, setCardNotes] = useState('');
  const [cardTag, setCardTag] = useState('');

  // Study Flashcard State
  const [studyCardIndex, setStudyCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Import text state
  const [importText, setImportText] = useState('');
  const [importType, setImportType] = useState('json'); // 'json' | 'tsv'

  // Save to localStorage whenever decks change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    } catch (e) {
      console.error('Failed to save decks to localStorage', e);
    }
  }, [decks]);

  const activeDeck = decks.find((d) => d.id === activeDeckId) || decks[0];

  const handleCreateDeck = (e) => {
    e.preventDefault();
    if (!newDeckName.trim()) return;
    const newDeck = {
      id: `deck-${Date.now()}`,
      name: newDeckName.trim(),
      description: newDeckDesc.trim() || 'Deck kustom pribadi',
      createdAt: new Date().toISOString(),
      cards: [],
    };
    setDecks((prev) => [newDeck, ...prev]);
    setActiveDeckId(newDeck.id);
    setNewDeckName('');
    setNewDeckDesc('');
    setShowNewDeckModal(false);
  };

  const handleDeleteDeck = (deckId) => {
    if (decks.length <= 1) {
      alert('Minimal harus memiliki 1 deck!');
      return;
    }
    if (confirm('Apakah Anda yakin ingin menghapus deck ini beserta seluruh kartunya?')) {
      const remaining = decks.filter((d) => d.id !== deckId);
      setDecks(remaining);
      setActiveDeckId(remaining[0].id);
    }
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!cardFront.trim() || !cardBack.trim()) return;

    const newCard = {
      id: `card-${Date.now()}`,
      front: cardFront.trim(),
      reading: cardReading.trim(),
      back: cardBack.trim(),
      notes: cardNotes.trim(),
      tag: cardTag.trim() || 'Umum',
    };

    setDecks((prev) =>
      prev.map((d) => (d.id === activeDeckId ? { ...d, cards: [...d.cards, newCard] } : d))
    );

    setCardFront('');
    setCardReading('');
    setCardBack('');
    setCardNotes('');
    setCardTag('');
    setShowNewCardModal(false);
  };

  const handleDeleteCard = (cardId) => {
    setDecks((prev) =>
      prev.map((d) =>
        d.id === activeDeckId ? { ...d, cards: d.cards.filter((c) => c.id !== cardId) } : d
      )
    );
  };

  // Export to JSON
  const handleExportJSON = () => {
    if (!activeDeck) return;
    const jsonStr = JSON.stringify(activeDeck, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deck_${activeDeck.name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export to Anki TSV format (Front \t Back \t Tags)
  const handleExportAnkiTSV = () => {
    if (!activeDeck || activeDeck.cards.length === 0) {
      alert('Deck belum memiliki kartu untuk diekspor!');
      return;
    }
    const tsvContent = activeDeck.cards
      .map((c) => {
        const front = `${c.front}${c.reading ? ` [${c.reading}]` : ''}`;
        const back = `${c.back}${c.notes ? `<br><small>${c.notes}</small>` : ''}`;
        const tag = c.tag || 'nihongo-spark';
        return `${front}\t${back}\t${tag}`;
      })
      .join('\n');

    const blob = new Blob([tsvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anki_${activeDeck.name.replace(/\s+/g, '_')}.tsv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import handler
  const handleImportSubmit = (e) => {
    e.preventDefault();
    if (!importText.trim()) return;

    try {
      if (importType === 'json') {
        const parsed = JSON.parse(importText);
        if (!parsed.name || !Array.isArray(parsed.cards)) {
          alert('Format JSON tidak valid. Pastikan terdapat properti "name" dan array "cards".');
          return;
        }
        const importedDeck = {
          ...parsed,
          id: `deck-${Date.now()}`,
          name: `${parsed.name} (Impor)`,
        };
        setDecks((prev) => [importedDeck, ...prev]);
        setActiveDeckId(importedDeck.id);
        setViewMode('list');
        setImportText('');
        alert('Deck berhasil diimpor dari JSON!');
      } else {
        // TSV import
        const lines = importText.split('\n').filter((l) => l.trim().length > 0);
        const newCards = lines.map((line, idx) => {
          const parts = line.split('\t');
          return {
            id: `c-imp-${Date.now()}-${idx}`,
            front: parts[0] || 'Teks',
            reading: '',
            back: parts[1] || '-',
            notes: '',
            tag: parts[2] || 'AnkiImport',
          };
        });

        const newDeck = {
          id: `deck-${Date.now()}`,
          name: `Deck Impor Anki (${newCards.length} Kartu)`,
          description: 'Diimpor dari file TSV/Anki',
          createdAt: new Date().toISOString(),
          cards: newCards,
        };

        setDecks((prev) => [newDeck, ...prev]);
        setActiveDeckId(newDeck.id);
        setViewMode('list');
        setImportText('');
        alert(`Berhasil mengimpor ${newCards.length} kartu!`);
      }
    } catch (err) {
      alert(`Gagal mengimpor data: ${err.message}`);
    }
  };

  const playSpeech = (text) => {
    playJapaneseSpeech(text, { rate: 0.9 });
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-color, #1e293b)' }}>
            🗂️ Pembuat Deck Kustom & Ekspor Anki (カスタム単語帳)
          </h2>
          <p style={{ margin: '4px 0 0', color: 'var(--subtext-color, #64748b)', fontSize: '0.9rem' }}>
            Buat flashcard sendiri, atur kategori, latih memori, serta ekspor & impor format Anki / JSON.
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setViewMode('list')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: 'none',
              background: viewMode === 'list' ? 'var(--primary, #3b82f6)' : 'var(--card-bg, #f1f5f9)',
              color: viewMode === 'list' ? '#ffffff' : 'inherit',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
            }}
          >
            📋 Daftar Kartu
          </button>
          <button
            onClick={() => {
              setViewMode('study');
              setStudyCardIndex(0);
              setIsFlipped(false);
            }}
            disabled={!activeDeck || activeDeck.cards.length === 0}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: 'none',
              background: viewMode === 'study' ? '#10b981' : 'var(--card-bg, #f1f5f9)',
              color: viewMode === 'study' ? '#ffffff' : 'inherit',
              cursor: activeDeck?.cards?.length ? 'pointer' : 'not-allowed',
              fontWeight: 600,
              fontSize: '0.85rem',
              opacity: activeDeck?.cards?.length ? 1 : 0.5,
            }}
          >
            🎯 Mode Latihan ({activeDeck?.cards?.length || 0})
          </button>
          <button
            onClick={() => setViewMode('import')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: 'none',
              background: viewMode === 'import' ? '#8b5cf6' : 'var(--card-bg, #f1f5f9)',
              color: viewMode === 'import' ? '#ffffff' : 'inherit',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
            }}
          >
            📥 Impor Data
          </button>
        </div>
      </div>

      {/* Deck Selector & Info Banner */}
      <div
        style={{
          background: 'var(--card-bg, #ffffff)',
          borderRadius: '16px',
          padding: '16px 20px',
          border: '1px solid var(--border-color, #e2e8f0)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#64748b' }}>Pilih Deck:</span>
          <select
            value={activeDeckId || ''}
            onChange={(e) => {
              setActiveDeckId(e.target.value);
              setStudyCardIndex(0);
              setIsFlipped(false);
            }}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontWeight: 600,
              fontSize: '0.9rem',
              background: '#fff',
            }}
          >
            {decks.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.cards.length} kartu)
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowNewDeckModal(true)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px dashed #3b82f6',
              background: '#eff6ff',
              color: '#1d4ed8',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ➕ Deck Baru
          </button>
        </div>

        {/* Export & Actions for Active Deck */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={handleExportAnkiTSV}
            title="Ekspor format TSV kompatibel dengan aplikasi Anki Desktop/Mobile"
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#fff',
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            ⚡ Ekspor ke Anki (TSV)
          </button>
          <button
            onClick={handleExportJSON}
            title="Download cadangan JSON"
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#fff',
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            💾 Unduh JSON
          </button>
          {decks.length > 1 && (
            <button
              onClick={() => handleDeleteDeck(activeDeck.id)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                border: '1px solid #fecaca',
                background: '#fef2f2',
                color: '#dc2626',
                fontSize: '0.82rem',
                cursor: 'pointer',
              }}
            >
              🗑️
            </button>
          )}
        </div>
      </div>

      {/* Mode 1: List & Card Management */}
      {viewMode === 'list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{activeDeck.name}</h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.82rem', color: '#64748b' }}>
                {activeDeck.description}
              </p>
            </div>
            <button
              onClick={() => setShowNewCardModal(true)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: 'var(--primary, #3b82f6)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
              }}
            >
              ➕ Tambah Kartu Baru
            </button>
          </div>

          {activeDeck.cards.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 20px',
                background: 'var(--card-bg, #ffffff)',
                borderRadius: '16px',
                border: '1px dashed #cbd5e1',
                color: '#64748b',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📭</div>
              <p style={{ margin: 0, fontWeight: 600 }}>Belum ada kartu di dalam deck ini.</p>
              <p style={{ margin: '4px 0 16px', fontSize: '0.85rem' }}>
                Klik tombol "Tambah Kartu Baru" untuk mulai mengisi koleksimu!
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
              {activeDeck.cards.map((card) => (
                <div
                  key={card.id}
                  style={{
                    background: 'var(--card-bg, #ffffff)',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid var(--border-color, #e2e8f0)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          background: '#eff6ff',
                          color: '#2563eb',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontWeight: 600,
                        }}
                      >
                        {card.tag}
                      </span>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button
                          onClick={() => playSpeech(card.front)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                          title="Dengarkan pengucapan"
                        >
                          🔊
                        </button>
                        <button
                          onClick={() => handleDeleteCard(card.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: '#dc2626' }}
                          title="Hapus kartu"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    <div style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'serif', color: 'var(--text-color, #0f172a)' }}>
                      {card.front}
                    </div>
                    {card.reading && (
                      <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px' }}>
                        {card.reading}
                      </div>
                    )}
                    <div style={{ fontSize: '0.9rem', color: '#334155', marginTop: '8px', fontWeight: 500 }}>
                      {card.back}
                    </div>
                  </div>

                  {card.notes && (
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '10px', borderTop: '1px dashed #e2e8f0', paddingTop: '6px' }}>
                      💡 {card.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Flashcard Study Practice */}
      {viewMode === 'study' && activeDeck.cards.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
              Kartu {studyCardIndex + 1} dari {activeDeck.cards.length}
            </span>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '4px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                background: '#fff',
                cursor: 'pointer',
                fontSize: '0.82rem',
              }}
            >
              Selesai Latihan
            </button>
          </div>

          {/* Flashcard Flip Box */}
          {(() => {
            const currentCard = activeDeck.cards[studyCardIndex];
            return (
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                style={{
                  width: '100%',
                  maxWidth: '520px',
                  minHeight: '280px',
                  borderRadius: '20px',
                  background: 'var(--card-bg, #ffffff)',
                  border: '2px solid var(--border-color, #e2e8f0)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                  padding: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                  position: 'relative',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '6px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSpeech(currentCard.front);
                    }}
                    style={{
                      background: '#f1f5f9',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                    }}
                  >
                    🔊
                  </button>
                </div>

                {!isFlipped ? (
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                      KATA / KANJI (Klik untuk membalik)
                    </div>
                    <div style={{ fontSize: '3rem', fontFamily: 'serif', fontWeight: 700, color: 'var(--text-color, #0f172a)' }}>
                      {currentCard.front}
                    </div>
                    {currentCard.reading && (
                      <div style={{ fontSize: '1.1rem', color: '#3b82f6', marginTop: '8px' }}>
                        {currentCard.reading}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#10b981', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                      ARTI & CATATAN
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-color, #0f172a)', marginBottom: '8px' }}>
                      {currentCard.back}
                    </div>
                    {currentCard.notes && (
                      <div style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '8px', lineHeight: 1.4 }}>
                        💡 {currentCard.notes}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Navigation Controls */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={() => {
                setIsFlipped(false);
                setStudyCardIndex((prev) => (prev > 0 ? prev - 1 : activeDeck.cards.length - 1));
              }}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                background: '#fff',
                fontSize: '0.9rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              ⬅️ Sebelumnya
            </button>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              style={{
                padding: '10px 24px',
                borderRadius: '10px',
                border: 'none',
                background: '#3b82f6',
                color: '#fff',
                fontSize: '0.9rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              🔄 Balik Kartu
            </button>
            <button
              onClick={() => {
                setIsFlipped(false);
                setStudyCardIndex((prev) => (prev + 1) % activeDeck.cards.length);
              }}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                background: '#fff',
                fontSize: '0.9rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Selanjutnya ➡️
            </button>
          </div>
        </div>
      )}

      {/* Mode 3: Import Deck */}
      {viewMode === 'import' && (
        <div
          style={{
            background: 'var(--card-bg, #ffffff)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid var(--border-color, #e2e8f0)',
          }}
        >
          <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>Impor Kartu / Deck Baru</h3>
          <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: '#64748b' }}>
            Tempel teks JSON atau data dipisahkan Tab (TSV dari Anki) untuk menambahkan deck secara otomatis.
          </p>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', cursor: 'pointer' }}>
              <input
                type="radio"
                name="impType"
                checked={importType === 'json'}
                onChange={() => setImportType('json')}
              />
              Format JSON Nihongo Spark
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', cursor: 'pointer' }}>
              <input
                type="radio"
                name="impType"
                checked={importType === 'tsv'}
                onChange={() => setImportType('tsv')}
              />
              Format Anki TSV (Front [tab] Back [tab] Tag)
            </label>
          </div>

          <form onSubmit={handleImportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <textarea
              rows={8}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder={
                importType === 'json'
                  ? '{\n  "name": "Koleksi Baru",\n  "cards": [\n    { "front": "猫", "reading": "ねこ", "back": "Kucing" }\n  ]\n}'
                  : '猫\tKucing\tHewan\n犬\tAnjing\tHewan'
              }
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
              }}
            />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#8b5cf6',
                  color: '#fff',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Proses Impor
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#fff',
                  cursor: 'pointer',
                }}
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Create Deck */}
      {showNewDeckModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '16px',
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '24px',
              width: '100%',
              maxWidth: '420px',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
            }}
          >
            <h3 style={{ margin: '0 0 14px', fontSize: '1.15rem' }}>Buat Deck Baru</h3>
            <form onSubmit={handleCreateDeck} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>
                  Nama Deck *
                </label>
                <input
                  type="text"
                  required
                  value={newDeckName}
                  onChange={(e) => setNewDeckName(e.target.value)}
                  placeholder="Misal: Kosakata N3 Bab 1"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>
                  Deskripsi Singkat
                </label>
                <input
                  type="text"
                  value={newDeckDesc}
                  onChange={(e) => setNewDeckDesc(e.target.value)}
                  placeholder="Misal: Kumpulan kosakata target ujian minggu depan"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowNewDeckModal(false)}
                  style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                >
                  Buat Deck
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Card */}
      {showNewCardModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '16px',
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '24px',
              width: '100%',
              maxWidth: '460px',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
            }}
          >
            <h3 style={{ margin: '0 0 14px', fontSize: '1.15rem' }}>Tambah Kartu Baru</h3>
            <form onSubmit={handleAddCard} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>
                  Bagian Depan (Kanji / Kosakata Jepang) *
                </label>
                <input
                  type="text"
                  required
                  value={cardFront}
                  onChange={(e) => setCardFront(e.target.value)}
                  placeholder="Misal: 乾杯"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>
                  Cara Baca (Hiragana / Romaji)
                </label>
                <input
                  type="text"
                  value={cardReading}
                  onChange={(e) => setCardReading(e.target.value)}
                  placeholder="Misal: かんぱい (kanpai)"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>
                  Bagian Belakang (Arti Bahasa Indonesia) *
                </label>
                <input
                  type="text"
                  required
                  value={cardBack}
                  onChange={(e) => setCardBack(e.target.value)}
                  placeholder="Misal: Bersulang / Cheers"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>
                  Catatan Tambahan / Contoh Kalimat
                </label>
                <input
                  type="text"
                  value={cardNotes}
                  onChange={(e) => setCardNotes(e.target.value)}
                  placeholder="Misal: Sering diucapkan saat pesta nomikai"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>
                  Kategori / Label Tag
                </label>
                <input
                  type="text"
                  value={cardTag}
                  onChange={(e) => setCardTag(e.target.value)}
                  placeholder="Misal: Pesta, Percakapan, N4"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowNewCardModal(false)}
                  style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                >
                  Simpan Kartu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
