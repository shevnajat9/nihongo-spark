import React, { useState, useEffect, useRef, useCallback } from 'react';
import { hiraganaDetails, katakanaDetails } from '../data/kanaDetails';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function KanaStrokePractice({ initialKana = 'あ', initialType = 'hiragana', onBackToChart }) {
  const [kanaType, setKanaType] = useState(initialType || 'hiragana');
  const [selectedKanaChar, setSelectedKanaChar] = useState(initialKana || 'あ');
  const [selectedRow, setSelectedRow] = useState('all');

  // Stroke Viewer State
  const [svgPaths, setSvgPaths] = useState([]);
  const [svgNumbers, setSvgNumbers] = useState([]);
  const [activeStrokeIdx, setActiveStrokeIdx] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [loadingSvg, setLoadingSvg] = useState(false);
  const timerRef = useRef(null);

  // Canvas Drawing State
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState([]);
  const [currentStroke, setCurrentStroke] = useState([]);
  const [brushSize, setBrushSize] = useState(10);
  const [brushColor, setBrushColor] = useState('#1e293b'); // Sumi ink
  const [showWatermark, setShowWatermark] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [evalResult, setEvalResult] = useState(null);

  const kanaList = kanaType === 'hiragana' ? hiraganaDetails : katakanaDetails;
  const currentKana = kanaList.find(k => k.kana === selectedKanaChar) || kanaList[0];

  // Filter rows
  const rowOptions = [
    { id: 'all', label: 'Semua (46)' },
    { id: 'a', label: 'あ行 (A, I, U, E, O)' },
    { id: 'ka', label: 'か行 (Ka, Ki, Ku, Ke, Ko)' },
    { id: 'sa', label: 'さ行 (Sa, Shi, Su, Se, So)' },
    { id: 'ta', label: 'た行 (Ta, Chi, Tsu, Te, To)' },
    { id: 'na', label: 'な行 (Na, Ni, Nu, Ne, No)' },
    { id: 'ha', label: 'は行 (Ha, Hi, Fu, He, Ho)' },
    { id: 'ma', label: 'ま行 (Ma, Mi, Mu, Me, Mo)' },
    { id: 'ya', label: 'や行 (Ya, Yu, Yo)' },
    { id: 'ra', label: 'ら行 (Ra, Ri, Ru, Re, Ro)' },
    { id: 'wa', label: 'わ行 (Wa, Wo, N)' }
  ];

  const filteredKanaList = kanaList.filter(k => selectedRow === 'all' ? true : k.row === selectedRow);

  // Fetch KanjiVG SVG strokes for exact stroke order
  useEffect(() => {
    if (!currentKana || !currentKana.kana) return;
    let alive = true;
    setLoadingSvg(true);
    setActiveStrokeIdx(-1);
    setIsPlaying(false);

    const codePoint = currentKana.kana.codePointAt(0);
    const hex = codePoint.toString(16).padStart(5, '0');
    const url = `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg/kanji/${hex}.svg`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('SVG not found');
        return res.text();
      })
      .then(xmlText => {
        if (!alive) return;
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlText, 'image/svg+xml');
        const paths = Array.from(doc.querySelectorAll('path')).map(p => p.getAttribute('d')).filter(Boolean);
        const numbers = Array.from(doc.querySelectorAll('text')).map(t => ({
          text: t.textContent,
          transform: t.getAttribute('transform'),
          x: t.getAttribute('x') || 0,
          y: t.getAttribute('y') || 0
        }));

        if (paths.length > 0) {
          setSvgPaths(paths);
          setSvgNumbers(numbers);
          setActiveStrokeIdx(paths.length); // Tampilkan utuh secara default
        } else {
          setSvgPaths([]);
          setSvgNumbers([]);
        }
      })
      .catch(() => {
        if (alive) {
          setSvgPaths([]);
          setSvgNumbers([]);
        }
      })
      .finally(() => {
        if (alive) setLoadingSvg(false);
      });

    return () => {
      alive = false;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentKana]);

  // Stroke animation playback loop
  useEffect(() => {
    if (!isPlaying || svgPaths.length === 0) return;

    const delay = Math.round(950 / speed);
    timerRef.current = setInterval(() => {
      setActiveStrokeIdx(prev => {
        if (prev >= svgPaths.length) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, delay);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, svgPaths.length, speed]);

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (activeStrokeIdx >= svgPaths.length) {
        setActiveStrokeIdx(1);
      }
      setIsPlaying(true);
    }
  };

  const handleResetStrokes = () => {
    setIsPlaying(false);
    setActiveStrokeIdx(svgPaths.length > 0 ? svgPaths.length : -1);
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    setActiveStrokeIdx(prev => Math.min(svgPaths.length, prev + 1));
  };

  const handleStepBack = () => {
    setIsPlaying(false);
    setActiveStrokeIdx(prev => Math.max(1, prev - 1));
  };

  // Redraw canvas whenever strokes, watermark, grid, or character changes
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Bersihkan kanvas
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Gambar Garis Kotak Buku Kotak Jepang (Genkouyoushi Grid)
    if (showGrid) {
      ctx.save();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);

      // Garis tengah horizontal & vertikal
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);

      // Garis diagonal silang
      ctx.moveTo(0, 0);
      ctx.lineTo(width, height);
      ctx.moveTo(width, 0);
      ctx.lineTo(0, height);
      ctx.stroke();

      // Bingkai luar
      ctx.setLineDash([]);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, width, height);
      ctx.restore();
    }

    // Gambar bayangan watermark untuk latihan jiplak (Tracing Guide)
    if (showWatermark && currentKana) {
      ctx.save();
      ctx.font = `bold ${Math.floor(height * 0.72)}px "Klee One", "Hiragino Mincho ProN", "Yu Mincho", serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(203, 213, 225, 0.7)'; // faint grey ink
      ctx.fillText(currentKana.kana, width / 2, height / 2 + 10);
      ctx.restore();
    }

    // Gambar coretan yang sudah dibuat
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    strokes.forEach((stroke) => {
      if (!stroke || stroke.length < 2) return;
      ctx.save();
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) {
        const xc = (stroke[i].x + stroke[i - 1].x) / 2;
        const yc = (stroke[i].y + stroke[i - 1].y) / 2;
        ctx.quadraticCurveTo(stroke[i - 1].x, stroke[i - 1].y, xc, yc);
      }
      ctx.lineTo(stroke[stroke.length - 1].x, stroke[stroke.length - 1].y);
      ctx.stroke();
      ctx.restore();
    });

    // Gambar coretan aktif saat mouse/jari bergerak
    if (currentStroke.length > 1) {
      ctx.save();
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
      ctx.beginPath();
      ctx.moveTo(currentStroke[0].x, currentStroke[0].y);
      for (let i = 1; i < currentStroke.length; i++) {
        const xc = (currentStroke[i].x + currentStroke[i - 1].x) / 2;
        const yc = (currentStroke[i].y + currentStroke[i - 1].y) / 2;
        ctx.quadraticCurveTo(currentStroke[i - 1].x, currentStroke[i - 1].y, xc, yc);
      }
      ctx.lineTo(currentStroke[currentStroke.length - 1].x, currentStroke[currentStroke.length - 1].y);
      ctx.stroke();
      ctx.restore();
    }
  }, [strokes, currentStroke, showGrid, showWatermark, currentKana, brushColor, brushSize]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // Handle pointer coordinates
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = e.clientX;
    let clientY = e.clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const pos = getCoordinates(e);
    setCurrentStroke([pos]);
  };

  const handlePointerMove = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const pos = getCoordinates(e);
    setCurrentStroke((prev) => [...prev, pos]);
  };

  const handlePointerUp = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    setIsDrawing(false);
    if (currentStroke.length > 0) {
      setStrokes((prev) => [...prev, currentStroke]);
      setCurrentStroke([]);
    }
  };

  const handleClear = () => {
    setStrokes([]);
    setCurrentStroke([]);
    setEvalResult(null);
  };

  const handleUndo = () => {
    setStrokes((prev) => prev.slice(0, -1));
    setEvalResult(null);
  };

  // Evaluate writing accuracy
  const handleEvaluate = () => {
    if (strokes.length === 0) {
      setEvalResult({
        score: 0,
        stars: 0,
        grade: 'まだです (Belum ada coretan)',
        feedback: 'Kanvas masih kosong. Silakan tulis atau jiplak huruf kana pada kanvas terlebih dahulu.',
        color: '#ef4444'
      });
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Render ghost template off-screen
    const offCanvas = document.createElement('canvas');
    offCanvas.width = width;
    offCanvas.height = height;
    const offCtx = offCanvas.getContext('2d');
    offCtx.fillStyle = '#ffffff';
    offCtx.fillRect(0, 0, width, height);
    offCtx.font = `bold ${Math.floor(height * 0.72)}px "Klee One", "Hiragino Mincho ProN", "Yu Mincho", serif`;
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillStyle = '#000000';
    offCtx.fillText(currentKana.kana, width / 2, height / 2 + 10);

    const templateData = offCtx.getImageData(0, 0, width, height).data;
    const currentData = ctx.getImageData(0, 0, width, height).data;

    let targetBlackPixels = 0;
    let matchingPixels = 0;
    let extraPixels = 0;

    for (let i = 0; i < templateData.length; i += 16) { // Sample every 4th pixel for speed
      const isTarget = templateData[i] < 128; // Hitam di template
      const isDrawn = currentData[i] < 128 || currentData[i + 1] < 128 || currentData[i + 2] < 128; // Tinta user

      if (isTarget) {
        targetBlackPixels++;
        if (isDrawn) matchingPixels++;
      } else if (isDrawn) {
        extraPixels++;
      }
    }

    const coverage = targetBlackPixels > 0 ? (matchingPixels / targetBlackPixels) * 100 : 0;
    const penalty = targetBlackPixels > 0 ? (extraPixels / (targetBlackPixels * 1.5)) * 25 : 0;
    const finalScore = Math.max(15, Math.min(100, Math.round(coverage - penalty + (strokes.length >= (currentKana.strokeCount || 1) ? 10 : 0))));

    let grade = '';
    let feedback = '';
    let stars = 1;
    let color = '#3b82f6';

    if (finalScore >= 88) {
      stars = 3;
      grade = '素晴らしい！ (Sangat Sempurna)';
      feedback = 'Bentuk huruf proporsional dan sapuan coretan sangat rapi sesuai panduan.';
      color = '#10b981';
    } else if (finalScore >= 70) {
      stars = 2;
      grade = '上手！ (Bagus Sekali)';
      feedback = 'Bentuk kana sudah terbaca jelas dan mantap. Pertahankan konsistensi tarikan garis!';
      color = '#3b82f6';
    } else {
      stars = 1;
      grade = 'もう少し！ (Terus Berlatih)';
      feedback = 'Perhatikan titik awal tarikan dan arah lengkungan huruf sesuai animasi coretan di samping.';
      color = '#f59e0b';
    }

    setEvalResult({
      score: finalScore,
      stars,
      grade,
      feedback,
      color
    });
  };

  const handleDownloadShodo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `shodo_kana_${currentKana.kana}_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Navigasi prev/next
  const currentIndex = kanaList.findIndex(k => k.kana === currentKana.kana);
  const handlePrevKana = () => {
    if (currentIndex > 0) {
      setSelectedKanaChar(kanaList[currentIndex - 1].kana);
      handleClear();
    }
  };

  const handleNextKana = () => {
    if (currentIndex < kanaList.length - 1) {
      setSelectedKanaChar(kanaList[currentIndex + 1].kana);
      handleClear();
    }
  };

  const handleSelectKana = (char) => {
    setSelectedKanaChar(char);
    handleClear();
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER SECTION */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(99, 102, 241, 0.15))',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            {onBackToChart && (
              <button
                onClick={onBackToChart}
                className="btn-secondary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                ← Kembali ke Tabel
              </button>
            )}
            <span style={{ fontSize: '0.85rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '6px', background: '#ec4899', color: '#fff' }}>
              Fitur Coretan & Menulis Kana
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0, color: 'var(--text-color, #1e293b)' }}>
            ✍️ Latihan Urutan Coretan Kana (書き順・手書き練習)
          </h2>
          <p style={{ margin: '0.4rem 0 0 0', color: 'var(--text-secondary, #64748b)', fontSize: '0.95rem' }}>
            Pelajari urutan coretan resmi (*kakushun*) dari sumber vektor KanjiVG dan latih kelenturan tangan Anda di kanvas digital.
          </p>
        </div>

        {/* Tipe Selector: Hiragana vs Katakana */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.06)', padding: '4px', borderRadius: '10px' }}>
          <button
            onClick={() => {
              setKanaType('hiragana');
              setSelectedKanaChar('あ');
              handleClear();
            }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              background: kanaType === 'hiragana' ? 'var(--accent-primary, #6366f1)' : 'transparent',
              color: kanaType === 'hiragana' ? '#fff' : 'inherit',
              transition: 'all 0.2s'
            }}
          >
            Hiragana (平仮名)
          </button>
          <button
            onClick={() => {
              setKanaType('katakana');
              setSelectedKanaChar('ア');
              handleClear();
            }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              background: kanaType === 'katakana' ? 'var(--accent-cyan, #06b6d4)' : 'transparent',
              color: kanaType === 'katakana' ? '#fff' : 'inherit',
              transition: 'all 0.2s'
            }}
          >
            Katakana (片仮名)
          </button>
        </div>
      </div>

      {/* FILTER BARIS & NAVIGASI HURUF CEPAT */}
      <div className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Baris:</span>
            {rowOptions.map(row => (
              <button
                key={row.id}
                onClick={() => setSelectedRow(row.id)}
                style={{
                  fontSize: '0.8rem',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: selectedRow === row.id ? 'var(--accent-primary)' : 'rgba(150, 150, 150, 0.2)',
                  background: selectedRow === row.id ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                  color: selectedRow === row.id ? 'var(--accent-primary)' : 'inherit',
                  cursor: 'pointer'
                }}
              >
                {row.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handlePrevKana}
              disabled={currentIndex <= 0}
              className="btn-secondary"
              style={{ padding: '0.3rem 0.7rem', fontSize: '0.85rem', opacity: currentIndex <= 0 ? 0.5 : 1 }}
            >
              ◀ Huruf Sebelumnya
            </button>
            <button
              onClick={handleNextKana}
              disabled={currentIndex >= kanaList.length - 1}
              className="btn-secondary"
              style={{ padding: '0.3rem 0.7rem', fontSize: '0.85rem', opacity: currentIndex >= kanaList.length - 1 ? 0.5 : 1 }}
            >
              Huruf Selanjutnya ▶
            </button>
          </div>
        </div>

        {/* Horizontal Mini Grid Bar */}
        <div style={{
          display: 'flex',
          gap: '0.4rem',
          overflowX: 'auto',
          paddingBottom: '0.3rem',
          scrollbarWidth: 'thin'
        }}>
          {filteredKanaList.map(item => (
            <button
              key={item.kana}
              onClick={() => handleSelectKana(item.kana)}
              style={{
                minWidth: '42px',
                height: '46px',
                padding: '0.2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: selectedKanaChar === item.kana ? 'var(--accent-primary)' : 'rgba(150, 150, 150, 0.2)',
                background: selectedKanaChar === item.kana ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.2))' : 'rgba(255,255,255,0.03)',
                cursor: 'pointer',
                transform: selectedKanaChar === item.kana ? 'scale(1.05)' : 'none',
                transition: 'all 0.15s'
              }}
            >
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{item.kana}</span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{item.romaji}</span>
            </button>
          ))}
        </div>
      </div>

      {/* MAIN TWO-COLUMN STUDIO: STROKE VIEWER & DRAWING CANVAS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 1.1fr)', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* KOLOM KIRI: STROKE ORDER VIEWER & CALLIGRAPHY TIPS */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Urutan Coretan Resmi (書き順)
              </span>
              <h3 style={{ margin: '0.2rem 0 0 0', fontSize: '1.3rem' }}>
                Karakter 「{currentKana.kana}」 ({currentKana.romaji})
              </h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                background: 'rgba(99, 102, 241, 0.12)',
                color: 'var(--accent-primary)',
                padding: '0.3rem 0.6rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}>
                {currentKana.strokeCount || svgPaths.length || 1} Coretan (画)
              </span>
              <button
                onClick={() => playJapaneseSpeech(currentKana.kana)}
                className="btn-secondary"
                style={{ padding: '0.35rem 0.6rem', fontSize: '0.9rem' }}
                title="Dengarkan pengucapan asli"
              >
                🔊 Suara
              </button>
            </div>
          </div>

          {/* Stroke SVG Display Frame */}
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1 / 1',
            maxWidth: '340px',
            margin: '0 auto',
            background: '#ffffff',
            borderRadius: '12px',
            border: '2px solid #e2e8f0',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)'
          }}>
            {/* Guide Grid */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 109 109">
              <line x1="54.5" y1="0" x2="54.5" y2="109" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="54.5" x2="109" y2="54.5" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="0" x2="109" y2="109" stroke="#f8fafc" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="109" y1="0" x2="0" y2="109" stroke="#f8fafc" strokeWidth="1" strokeDasharray="2 2" />
            </svg>

            {loadingSvg ? (
              <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                <span>Memuat coretan vektor...</span>
              </div>
            ) : svgPaths.length > 0 ? (
              <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 109 109">
                {/* Background faint full character */}
                {svgPaths.map((d, idx) => (
                  <path
                    key={`bg-${idx}`}
                    d={d}
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}

                {/* Rendered active strokes up to activeStrokeIdx */}
                {svgPaths.slice(0, activeStrokeIdx).map((d, idx) => {
                  const isCurrent = idx === activeStrokeIdx - 1;
                  return (
                    <path
                      key={`active-${idx}`}
                      d={d}
                      fill="none"
                      stroke={isCurrent ? '#dc2626' : '#1e293b'}
                      strokeWidth={isCurrent ? '7' : '6'}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  );
                })}

                {/* Render stroke numbers */}
                {svgNumbers.slice(0, activeStrokeIdx).map((numObj, idx) => (
                  <g key={`num-${idx}`} transform={numObj.transform}>
                    <circle cx="0" cy="-3" r="5.5" fill="#dc2626" />
                    <text
                      x="0"
                      y="0"
                      fill="#ffffff"
                      fontSize="7"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      {numObj.text}
                    </text>
                  </g>
                ))}
              </svg>
            ) : (
              /* Fallback display */
              <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <span style={{ fontSize: '7rem', color: '#1e293b', fontFamily: '"Klee One", "Yu Mincho", serif' }}>
                  {currentKana.kana}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Preview Grafis</span>
              </div>
            )}
          </div>

          {/* Stroke Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button onClick={handleResetStrokes} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} title="Reset ke awal">
                🔄 Reset
              </button>
              <button onClick={handleStepBack} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} title="Mundur 1 coretan">
                ⏮ Coretan {Math.max(1, activeStrokeIdx - 1)}
              </button>
              <button
                onClick={handlePlayPause}
                style={{
                  padding: '0.4rem 1.1rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  borderRadius: '8px',
                  border: 'none',
                  background: isPlaying ? '#ef4444' : 'var(--accent-primary)',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                {isPlaying ? '⏸ Jeda' : '▶ Putar Animasi'}
              </button>
              <button onClick={handleStepForward} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} title="Maju 1 coretan">
                Coretan {Math.min(svgPaths.length, activeStrokeIdx + 1)} ⏭
              </button>
            </div>

            {/* Speed Control */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <span>Kecepatan:</span>
              {[0.6, 1.0, 1.5, 2.0].map(s => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  style={{
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: speed === s ? 'var(--accent-primary)' : 'rgba(150,150,150,0.2)',
                    background: speed === s ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                    color: speed === s ? 'var(--accent-primary)' : 'inherit',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Stroke Calligraphy Tips */}
          <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '8px', padding: '0.85rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <h4 style={{ margin: '0 0 0.3rem 0', fontSize: '0.9rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px' }}>
              💡 Tips Coretan & Lekukan
            </h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {currentKana.strokeTips || 'Ikuti nomor urut coretan secara berurutan. Perhatikan titik henti (tome) dan kaitan (hane).'}
            </p>
          </div>

          {/* Sample Vocabulary */}
          {currentKana.examples && currentKana.examples.length > 0 && (
            <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '8px', padding: '0.85rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--accent-cyan)' }}>
                📖 Contoh Kosakata dengan Huruf Ini
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {currentKana.examples.map((ex, i) => (
                  <div
                    key={i}
                    onClick={() => playJapaneseSpeech(ex.word)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.4rem 0.6rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                    title="Klik untuk dengarkan suara kosakata ini"
                  >
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '0.95rem', marginRight: '0.5rem' }}>{ex.word}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>({ex.reading})</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{ex.meaning}</span>
                      <span style={{ fontSize: '0.85rem' }}>🔊</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* KOLOM KANAN: HANDWRITING PRACTICE CANVAS */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Kanvas Menulis Digital
              </span>
              <h3 style={{ margin: '0.2rem 0 0 0', fontSize: '1.3rem' }}>
                Tulis / Jiplak 「{currentKana.kana}」
              </h3>
            </div>

            {/* Grid & Watermark Toggles */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showWatermark}
                  onChange={(e) => setShowWatermark(e.target.checked)}
                />
                Jiplak (Watermark)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showGrid}
                  onChange={(e) => setShowGrid(e.target.checked)}
                />
                Garis Kotak
              </label>
            </div>
          </div>

          {/* Interactive Drawing Canvas */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
              border: '2px solid #cbd5e1',
              touchAction: 'none',
              background: '#ffffff'
            }}>
              <canvas
                ref={canvasRef}
                width={340}
                height={340}
                onMouseDown={handlePointerDown}
                onMouseMove={handlePointerMove}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
                onTouchStart={handlePointerDown}
                onTouchMove={handlePointerMove}
                onTouchEnd={handlePointerUp}
                style={{ display: 'block', cursor: 'crosshair' }}
              />
            </div>
          </div>

          {/* Brush Tools Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            {/* Color Palette */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Tinta:</span>
              {[
                { name: 'Sumi', color: '#1e293b' },
                { name: 'Ai', color: '#2563eb' },
                { name: 'Akane', color: '#dc2626' },
                { name: 'Midori', color: '#059669' }
              ].map(c => (
                <button
                  key={c.color}
                  onClick={() => setBrushColor(c.color)}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: c.color,
                    border: brushColor === c.color ? '2px solid #fff' : '2px solid transparent',
                    outline: brushColor === c.color ? `2px solid ${c.color}` : 'none',
                    cursor: 'pointer'
                  }}
                  title={c.name}
                />
              ))}
            </div>

            {/* Brush Size */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Kuas:</span>
              {[
                { size: 6, label: 'Halus' },
                { size: 10, label: 'Sedang' },
                { size: 16, label: 'Tebal' },
                { size: 22, label: 'Fude' }
              ].map(b => (
                <button
                  key={b.size}
                  onClick={() => setBrushSize(b.size)}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: brushSize === b.size ? 'var(--accent-primary)' : 'rgba(150,150,150,0.2)',
                    background: brushSize === b.size ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                    color: brushSize === b.size ? 'var(--accent-primary)' : 'inherit',
                    cursor: 'pointer'
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons: Undo, Clear, Evaluate, Download */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleUndo}
              disabled={strokes.length === 0}
              className="btn-secondary"
              style={{ flex: 1, minWidth: '80px', padding: '0.5rem', fontSize: '0.85rem', opacity: strokes.length === 0 ? 0.5 : 1 }}
            >
              ↩️ Undo
            </button>
            <button
              onClick={handleClear}
              disabled={strokes.length === 0}
              className="btn-secondary"
              style={{ flex: 1, minWidth: '80px', padding: '0.5rem', fontSize: '0.85rem', opacity: strokes.length === 0 ? 0.5 : 1 }}
            >
              🗑️ Hapus
            </button>
            <button
              onClick={handleDownloadShodo}
              disabled={strokes.length === 0}
              className="btn-secondary"
              style={{ flex: 1, minWidth: '100px', padding: '0.5rem', fontSize: '0.85rem', opacity: strokes.length === 0 ? 0.5 : 1 }}
              title="Simpan gambar coretan Anda sebagai PNG"
            >
              💾 Simpan PNG
            </button>
            <button
              onClick={handleEvaluate}
              style={{
                flex: 2,
                minWidth: '140px',
                padding: '0.5rem 1rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#fff',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
              }}
            >
              ⭐ Nilai Tulisan Saya
            </button>
          </div>

          {/* Evaluation Result Feedback Card */}
          {evalResult && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${evalResult.color}`,
              borderRadius: '10px',
              padding: '1rem',
              animation: 'fadeIn 0.3s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 700, fontSize: '1.05rem', color: evalResult.color }}>
                  {evalResult.grade}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>
                    {'⭐'.repeat(evalResult.stars)}
                  </span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: evalResult.color }}>
                    ({evalResult.score}%)
                  </span>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {evalResult.feedback}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
