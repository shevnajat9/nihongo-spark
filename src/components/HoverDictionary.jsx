import React, { useState, useEffect, useRef, useCallback } from 'react';
import { lookupDictionary, saveWordToSRS } from '../utils/dictionary';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function HoverDictionary({ currentLevel = 'N5' }) {
  const [isEnabled, setIsEnabled] = useState(() => {
    return localStorage.getItem('nihongo_spark_hover_dict') !== 'false';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0, visible: false });
  const [results, setResults] = useState({ vocab: [], kanji: [], query: '' });
  const [loading, setLoading] = useState(false);
  const [savedIds, setSavedIds] = useState(new Set());
  const [showManualSearch, setShowManualSearch] = useState(false);

  const tooltipRef = useRef(null);

  // Toggle setting
  const toggleEnabled = () => {
    const next = !isEnabled;
    setIsEnabled(next);
    localStorage.setItem('nihongo_spark_hover_dict', String(next));
    if (!next) {
      setPosition(prev => ({ ...prev, visible: false }));
    }
  };

  // Play audio
  const playAudio = (text) => {
    playJapaneseSpeech(text, { rate: 0.9 });
  };

  // Perform lookup
  const handleLookup = useCallback(async (text) => {
    if (!text || text.trim().length === 0) return;
    setLoading(true);
    try {
      const res = await lookupDictionary(text.trim(), currentLevel);
      setResults(res);
    } catch (err) {
      console.error('Dictionary search failed:', err);
    } finally {
      setLoading(false);
    }
  }, [currentLevel]);

  // Save to SRS
  const handleSave = (item) => {
    saveWordToSRS(item);
    const key = item.word || item.kanji;
    setSavedIds(prev => new Set(prev).add(key));
  };

  // Listen to text selection across the page
  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseUp = () => {
      // Don't trigger if selection inside tooltip or manual search modal
      if (tooltipRef.current && tooltipRef.current.contains(document.activeElement)) return;

      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;

      const text = selection.toString().trim();
      // Japanese characters regex: Hiragana, Katakana, Kanji, or punctuation
      const hasJapanese = /[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/.test(text);

      if (text.length > 0 && text.length <= 15 && hasJapanese) {
        try {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          if (rect.width > 0 || rect.height > 0) {
            // Position popup above or below selection
            const x = Math.min(Math.max(16, rect.left + rect.width / 2), window.innerWidth - 320);
            const y = rect.bottom + 10 + window.scrollY;

            setPosition({ x, y, visible: true });
            handleLookup(text);
          }
        } catch {
          // ignore selection errors
        }
      }
    };

    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.toString().trim().length === 0) {
        // Only hide if not clicking inside tooltip
      }
    };

    const handleClickOutside = (e) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
        setPosition(prev => ({ ...prev, visible: false }));
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEnabled, handleLookup]);

  return (
    <>
      {/* FLOATING ACTION BUTTON & QUICK SEARCH DOCK */}
      <div style={{
        position: 'fixed',
        bottom: '5.5rem',
        right: '1.25rem',
        zIndex: 9990,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.5rem'
      }}>
        {/* Quick Search Button */}
        <button
          onClick={() => setShowManualSearch(true)}
          title="Buka Kamus Pop-up Cepat (Yomitan Look-up)"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white',
            border: 'none',
            borderRadius: '9999px',
            padding: '0.6rem 1rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease'
          }}
        >
          <span>🔍</span>
          <span>Kamus Cepat</span>
        </button>

        {/* Hover Mode Status Badge */}
        <button
          onClick={toggleEnabled}
          title={isEnabled ? 'Klik untuk nonaktifkan tooltip Yomitan saat seleksi teks' : 'Klik untuk aktifkan tooltip Yomitan saat seleksi teks'}
          style={{
            background: isEnabled ? 'rgba(16, 185, 129, 0.2)' : 'rgba(100, 116, 139, 0.3)',
            color: isEnabled ? '#10b981' : '#94a3b8',
            border: `1px solid ${isEnabled ? '#10b981' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: '9999px',
            padding: '0.3rem 0.75rem',
            fontSize: '0.72rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}
        >
          <span style={{ fontSize: '0.65rem' }}>{isEnabled ? '●' : '○'}</span>
          <span>Yomitan: {isEnabled ? 'Aktif' : 'Nonaktif'}</span>
        </button>
      </div>

      {/* FLOATING SELECTION TOOLTIP (YOMITAN STYLE) */}
      {position.visible && (results.vocab.length > 0 || results.kanji.length > 0 || loading) && (
        <div
          ref={tooltipRef}
          style={{
            position: 'absolute',
            left: `${position.x}px`,
            top: `${position.y}px`,
            zIndex: 9999,
            width: '320px',
            maxWidth: '90vw',
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '14px',
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 15px rgba(99, 102, 241, 0.2)',
            padding: '1rem',
            color: '#f8fafc',
            transform: 'translateX(-50%)',
            animation: 'fadeInUp 0.15s ease-out'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.85rem' }}>📖</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary, #6366f1)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Kamus Yomitan
              </span>
            </div>
            <button
              onClick={() => setPosition(p => ({ ...p, visible: false }))}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '1.1rem',
                lineHeight: 1,
                padding: '2px 6px'
              }}
            >
              ×
            </button>
          </div>

          {loading ? (
            <div style={{ padding: '1rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
              Mencari data kata...
            </div>
          ) : (
            <div style={{ maxHeight: '350px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Vocab Results */}
              {results.vocab.map((v, idx) => {
                const isSaved = savedIds.has(v.word);
                return (
                  <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '10px', padding: '0.75rem', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                          <span style={{ fontSize: '1.35rem', fontWeight: 700, color: '#38bdf8' }}>
                            {v.word}
                          </span>
                          <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                            【{v.reading}】
                          </span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.1rem' }}>
                          {v.romaji} • <span style={{ color: '#fbbf24' }}>{v.level || 'JLPT'}</span> {v.partOfSpeech && `• ${v.partOfSpeech}`}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.3rem' }}>
                        <button
                          onClick={() => playAudio(v.word || v.reading)}
                          title="Dengarkan Audio"
                          style={{
                            background: 'rgba(56, 189, 248, 0.15)',
                            color: '#38bdf8',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                            borderRadius: '6px',
                            padding: '0.3rem 0.5rem',
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                          }}
                        >
                          🔊
                        </button>
                        <button
                          onClick={() => handleSave(v)}
                          title={isSaved ? 'Tersimpan di SRS' : 'Simpan ke Review SRS'}
                          style={{
                            background: isSaved ? 'rgba(16, 185, 129, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                            color: isSaved ? '#10b981' : '#a5b4fc',
                            border: `1px solid ${isSaved ? '#10b981' : 'rgba(99, 102, 241, 0.4)'}`,
                            borderRadius: '6px',
                            padding: '0.3rem 0.5rem',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          {isSaved ? '✓ SRS' : '+ SRS'}
                        </button>
                      </div>
                    </div>

                    <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: '#f1f5f9' }}>
                      {v.meaning}
                    </div>

                    {v.example && (
                      <div style={{ marginTop: '0.4rem', padding: '0.4rem 0.5rem', background: 'rgba(0,0,0,0.25)', borderRadius: '6px', fontSize: '0.78rem' }}>
                        <div style={{ color: '#e2e8f0' }}>{v.example}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>{v.exampleMeaning}</div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Kanji Results */}
              {results.kanji.map((k, idx) => {
                const isSaved = savedIds.has(k.kanji);
                return (
                  <div key={idx} style={{ background: 'rgba(239, 68, 68, 0.08)', borderRadius: '10px', padding: '0.75rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ fontSize: '1.6rem', fontWeight: 700, color: '#f87171' }}>
                          {k.kanji}
                        </span>
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fecaca' }}>
                            {Array.isArray(k.meanings) ? k.meanings.join(', ') : k.meaning}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                            {k.strokes} coretan • <span style={{ color: '#f59e0b' }}>{k.level || 'Kanji'}</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.3rem' }}>
                        <button
                          onClick={() => playAudio(k.kunyomi?.[0] || k.onyomi?.[0] || k.kanji)}
                          style={{
                            background: 'rgba(248, 113, 113, 0.15)',
                            color: '#f87171',
                            border: '1px solid rgba(248, 113, 113, 0.3)',
                            borderRadius: '6px',
                            padding: '0.3rem 0.5rem',
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                          }}
                        >
                          🔊
                        </button>
                        <button
                          onClick={() => handleSave(k)}
                          style={{
                            background: isSaved ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                            color: isSaved ? '#10b981' : '#fca5a5',
                            border: `1px solid ${isSaved ? '#10b981' : 'rgba(239, 68, 68, 0.4)'}`,
                            borderRadius: '6px',
                            padding: '0.3rem 0.5rem',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          {isSaved ? '✓ SRS' : '+ SRS'}
                        </button>
                      </div>
                    </div>

                    {/* Onyomi & Kunyomi */}
                    <div style={{ marginTop: '0.4rem', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                      {k.onyomi && k.onyomi.length > 0 && (
                        <div>
                          <span style={{ color: '#94a3b8' }}>音読み: </span>
                          <span style={{ color: '#fed7aa', fontWeight: 500 }}>{k.onyomi.join('、')}</span>
                        </div>
                      )}
                      {k.kunyomi && k.kunyomi.length > 0 && (
                        <div>
                          <span style={{ color: '#94a3b8' }}>訓読み: </span>
                          <span style={{ color: '#bfdbfe', fontWeight: 500 }}>{k.kunyomi.join('、')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {results.vocab.length === 0 && results.kanji.length === 0 && (
                <div style={{ textAlign: 'center', padding: '1rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                  Tidak ditemukan definisi tepat untuk "<strong>{results.query}</strong>".
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* MANUAL QUICK SEARCH MODAL */}
      {showManualSearch && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '1rem'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowManualSearch(false);
          }}
        >
          <div style={{
            background: '#0f172a',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '520px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            maxHeight: '85vh'
          }}>
            {/* Modal Header */}
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.25rem' }}>🔍</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#f8fafc' }}>Kamus Pop-up Cepat (Yomitan)</h3>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8' }}>Ketik kata Kanji, Kana, Romaji, atau seleksi teks di layar</p>
                </div>
              </div>
              <button
                onClick={() => setShowManualSearch(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.4rem', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            {/* Search Input */}
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <form onSubmit={(e) => { e.preventDefault(); handleLookup(searchQuery); }} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Ketik kanji / kana / romaji (cth: 食べる, nihon, 桜)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'var(--primary, #6366f1)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1.25rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cari
                </button>
              </form>
            </div>

            {/* Results List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {loading && <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>Mencari...</div>}

              {!loading && results.vocab.length === 0 && results.kanji.length === 0 && results.query && (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                  Tidak ada hasil untuk "{results.query}".
                </div>
              )}

              {/* Vocab Items */}
              {results.vocab.map((v, idx) => {
                const isSaved = savedIds.has(v.word);
                return (
                  <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
                          <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#38bdf8' }}>{v.word}</span>
                          <span style={{ fontSize: '1rem', color: '#cbd5e1' }}>【{v.reading}】</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                          {v.romaji} • <span style={{ color: '#fbbf24', fontWeight: 600 }}>{v.level}</span> {v.partOfSpeech && `• ${v.partOfSpeech}`}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button
                          onClick={() => playAudio(v.word || v.reading)}
                          style={{
                            background: 'rgba(56, 189, 248, 0.15)',
                            color: '#38bdf8',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                            borderRadius: '8px',
                            padding: '0.4rem 0.6rem',
                            cursor: 'pointer'
                          }}
                        >
                          🔊
                        </button>
                        <button
                          onClick={() => handleSave(v)}
                          style={{
                            background: isSaved ? 'rgba(16, 185, 129, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                            color: isSaved ? '#10b981' : '#a5b4fc',
                            border: `1px solid ${isSaved ? '#10b981' : 'rgba(99, 102, 241, 0.4)'}`,
                            borderRadius: '8px',
                            padding: '0.4rem 0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          {isSaved ? '✓ Tersimpan SRS' : '+ Review SRS'}
                        </button>
                      </div>
                    </div>

                    <div style={{ marginTop: '0.6rem', fontSize: '0.95rem', color: '#f1f5f9', fontWeight: 500 }}>
                      {v.meaning}
                    </div>

                    {v.example && (
                      <div style={{ marginTop: '0.6rem', padding: '0.6rem 0.8rem', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '8px', fontSize: '0.85rem' }}>
                        <div style={{ color: '#e2e8f0', marginBottom: '0.2rem' }}>{v.example}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{v.exampleMeaning}</div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Kanji Items */}
              {results.kanji.map((k, idx) => {
                const isSaved = savedIds.has(k.kanji);
                return (
                  <div key={idx} style={{ background: 'rgba(239, 68, 68, 0.06)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <span style={{ fontSize: '2rem', fontWeight: 700, color: '#f87171' }}>{k.kanji}</span>
                        <div>
                          <div style={{ fontSize: '1rem', fontWeight: 600, color: '#fecaca' }}>
                            {Array.isArray(k.meanings) ? k.meanings.join(', ') : k.meaning}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                            {k.strokes} coretan • <span style={{ color: '#f59e0b', fontWeight: 600 }}>{k.level}</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button
                          onClick={() => playAudio(k.kunyomi?.[0] || k.onyomi?.[0] || k.kanji)}
                          style={{
                            background: 'rgba(248, 113, 113, 0.15)',
                            color: '#f87171',
                            border: '1px solid rgba(248, 113, 113, 0.3)',
                            borderRadius: '8px',
                            padding: '0.4rem 0.6rem',
                            cursor: 'pointer'
                          }}
                        >
                          🔊
                        </button>
                        <button
                          onClick={() => handleSave(k)}
                          style={{
                            background: isSaved ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                            color: isSaved ? '#10b981' : '#fca5a5',
                            border: `1px solid ${isSaved ? '#10b981' : 'rgba(239, 68, 68, 0.4)'}`,
                            borderRadius: '8px',
                            padding: '0.4rem 0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          {isSaved ? '✓ Tersimpan SRS' : '+ Review SRS'}
                        </button>
                      </div>
                    </div>

                    <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', fontSize: '0.82rem' }}>
                      {k.onyomi && k.onyomi.length > 0 && (
                        <div>
                          <span style={{ color: '#94a3b8' }}>音読み: </span>
                          <span style={{ color: '#fed7aa', fontWeight: 600 }}>{k.onyomi.join('、')}</span>
                        </div>
                      )}
                      {k.kunyomi && k.kunyomi.length > 0 && (
                        <div>
                          <span style={{ color: '#94a3b8' }}>訓読み: </span>
                          <span style={{ color: '#bfdbfe', fontWeight: 600 }}>{k.kunyomi.join('、')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
