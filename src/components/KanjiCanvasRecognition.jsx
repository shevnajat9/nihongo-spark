import { useState, useRef, useEffect, useCallback } from 'react';
import { loadLevel } from '../data/loader';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function KanjiCanvasRecognition() {
  const [activeTab, setActiveTab] = useState('practice'); // 'practice' | 'recognize'
  const [level, setLevel] = useState('N5');
  const [kanjiList, setKanjiList] = useState([]);
  const [selectedKanji, setSelectedKanji] = useState(null);
  const [loading, setLoading] = useState(false);

  // Canvas Drawing State
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState([]); // Array of strokes, each stroke is [{x, y}]
  const [currentStroke, setCurrentStroke] = useState([]);
  const [brushSize, setBrushSize] = useState(10);
  const [brushColor, setBrushColor] = useState('#1e293b'); // Sumi ink
  const [showWatermark, setShowWatermark] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  // Recognition Results
  const [recognizedCandidates, setRecognizedCandidates] = useState([]);
  const [evalResult, setEvalResult] = useState(null);

  // Load kanji for the selected level
  useEffect(() => {
    let alive = true;
    setLoading(true);
    loadLevel(level).then((data) => {
      if (alive) {
        const list = data.kanji || [];
        setKanjiList(list);
        if (list.length > 0) {
          setSelectedKanji((prev) => prev || list[0]);
        }
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
  }, [level]);

  // Redraw canvas whenever strokes, watermark, grid, or selectedKanji changes
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Draw Rice/Field Grid (米 / 田)
    if (showGrid) {
      ctx.save();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);

      // Horizontal & Vertical center lines
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);

      // Diagonal lines
      ctx.moveTo(0, 0);
      ctx.lineTo(width, height);
      ctx.moveTo(width, 0);
      ctx.lineTo(0, height);
      ctx.stroke();

      // Outer border box
      ctx.setLineDash([]);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, width, height);
      ctx.restore();
    }

    // Draw Watermark Guide if in practice mode and enabled
    if (activeTab === 'practice' && showWatermark && selectedKanji) {
      ctx.save();
      ctx.font = `bold ${Math.floor(height * 0.72)}px "Klee One", "Hiragino Mincho ProN", "Yu Mincho", serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(226, 232, 240, 0.75)'; // faint ghost ink
      ctx.fillText(selectedKanji.kanji, width / 2, height / 2 + 10);
      ctx.restore();
    }

    // Draw all completed strokes
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
        // Smooth bezier curve between points
        const xc = (stroke[i].x + stroke[i - 1].x) / 2;
        const yc = (stroke[i].y + stroke[i - 1].y) / 2;
        ctx.quadraticCurveTo(stroke[i - 1].x, stroke[i - 1].y, xc, yc);
      }
      ctx.lineTo(stroke[stroke.length - 1].x, stroke[stroke.length - 1].y);
      ctx.stroke();
      ctx.restore();
    });

    // Draw current active stroke
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
  }, [strokes, currentStroke, showGrid, showWatermark, selectedKanji, activeTab, brushColor, brushSize]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // Pointer coordinate calculation helper
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
    setRecognizedCandidates([]);
  };

  const handleUndo = () => {
    setStrokes((prev) => prev.slice(0, -1));
    setEvalResult(null);
  };

  // Evaluate Practice accuracy
  const handleEvaluate = () => {
    if (!selectedKanji) return;
    const strokeCount = strokes.length;
    const expected = selectedKanji.strokes || 1;

    if (strokeCount === 0) {
      setEvalResult({
        score: 0,
        message: 'Kanvas masih kosong! Silakan tulis kanji terlebih dahulu.',
        status: 'error',
      });
      return;
    }

    // Stroke difference penalty
    const diff = Math.abs(strokeCount - expected);
    let strokeScore = 100;
    if (diff === 0) strokeScore = 100;
    else if (diff === 1) strokeScore = 75;
    else if (diff === 2) strokeScore = 50;
    else strokeScore = Math.max(10, 100 - diff * 25);

    // Compute bounding box distribution
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    strokes.forEach((s) => {
      s.forEach((pt) => {
        if (pt.x < minX) minX = pt.x;
        if (pt.x > maxX) maxX = pt.x;
        if (pt.y < minY) minY = pt.y;
        if (pt.y > maxY) maxY = pt.y;
      });
    });

    const boxW = maxX - minX;
    const boxH = maxY - minY;
    const canvas = canvasRef.current;
    const coverageX = canvas ? boxW / canvas.width : 0.5;
    const coverageY = canvas ? boxH / canvas.height : 0.5;

    let balanceScore = 100;
    if (coverageX < 0.25 || coverageY < 0.25) {
      balanceScore -= 40; // Too tiny
    } else if (coverageX > 0.95 || coverageY > 0.95) {
      balanceScore -= 20; // Touching border
    }

    const finalScore = Math.round(strokeScore * 0.7 + balanceScore * 0.3);

    let message = '';
    let status = 'success';
    if (finalScore >= 90) {
      message = `Luar biasa! Jumlah coretan (${strokeCount}/${expected}) tepat dan proporsi kanji sangat seimbang! ✨`;
      status = 'success';
    } else if (finalScore >= 70) {
      message = `Bagus! Coretan Anda (${strokeCount}/${expected}) sudah mendekati sempurna. Perhatikan kerapian sudut dan proporsi.`;
      status = 'warning';
    } else {
      message = `Perlu latihan lagi. Kanji ${selectedKanji.kanji} memiliki ${expected} coretan (Anda membuat ${strokeCount} coretan).`;
      status = 'error';
    }

    setEvalResult({
      score: finalScore,
      strokeCount,
      expected,
      message,
      status,
    });
  };

  // Recognize Freehand Kanji against Kanji Pool
  const handleRecognize = () => {
    const strokeCount = strokes.length;
    if (strokeCount === 0) {
      setRecognizedCandidates([]);
      return;
    }

    // Filter kanji whose stroke counts are within [strokeCount - 2, strokeCount + 2]
    const candidates = kanjiList
      .filter((k) => Math.abs((k.strokes || 1) - strokeCount) <= 2)
      .map((k) => {
        const diff = Math.abs((k.strokes || 1) - strokeCount);
        const matchPct = diff === 0 ? 98 : diff === 1 ? 82 : 65;
        return {
          ...k,
          confidence: matchPct,
        };
      })
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 6);

    setRecognizedCandidates(candidates);
  };

  // Download drawn canvas as PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `shodo_${selectedKanji?.kanji || 'kanji'}_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
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
            ✍️ Kanvas Tulis Tangan Kanji (漢字認識・書道)
          </h2>
          <p style={{ margin: '4px 0 0', color: 'var(--subtext-color, #64748b)', fontSize: '0.9rem' }}>
            Latihan menulis kaligrafi kanji kotak persegi (*tianzigge*), evaluasi coretan (*hitsujun*), dan deteksi tulisan bebas.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', background: 'var(--card-bg, #f1f5f9)', padding: '4px', borderRadius: '10px' }}>
          <button
            onClick={() => { setActiveTab('practice'); handleClear(); }}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '8px',
              background: activeTab === 'practice' ? 'var(--primary, #3b82f6)' : 'transparent',
              color: activeTab === 'practice' ? '#ffffff' : 'inherit',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.88rem',
              transition: 'all 0.2s',
            }}
          >
            🎯 Latihan & Evaluasi Target
          </button>
          <button
            onClick={() => { setActiveTab('recognize'); handleClear(); }}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '8px',
              background: activeTab === 'recognize' ? 'var(--primary, #3b82f6)' : 'transparent',
              color: activeTab === 'recognize' ? '#ffffff' : 'inherit',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.88rem',
              transition: 'all 0.2s',
            }}
          >
            🔍 Deteksi Tulisan Bebas
          </button>
        </div>
      </div>

      {/* Main Studio Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
        {/* Left: Canvas Area */}
        <div
          style={{
            background: 'var(--card-bg, #ffffff)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            border: '1px solid var(--border-color, #e2e8f0)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {/* Controls Bar */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--subtext-color, #64748b)' }}>Tinta:</span>
              {[
                { color: '#0f172a', label: 'Hitam (Sumi)' },
                { color: '#dc2626', label: 'Merah (Shu)' },
                { color: '#2563eb', label: 'Biru' },
              ].map((c) => (
                <button
                  key={c.color}
                  onClick={() => setBrushColor(c.color)}
                  title={c.label}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: c.color,
                    border: brushColor === c.color ? '3px solid #38bdf8' : '2px solid #cbd5e1',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--subtext-color, #64748b)' }}>Kuas:</span>
              {[
                { size: 6, label: 'Halus' },
                { size: 10, label: 'Sedang' },
                { size: 16, label: 'Tebal' },
              ].map((b) => (
                <button
                  key={b.size}
                  onClick={() => setBrushSize(b.size)}
                  style={{
                    padding: '2px 6px',
                    borderRadius: '4px',
                    border: '1px solid #cbd5e1',
                    background: brushSize === b.size ? 'var(--primary, #3b82f6)' : '#fff',
                    color: brushSize === b.size ? '#fff' : 'inherit',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showGrid}
                  onChange={(e) => setShowGrid(e.target.checked)}
                />
                Grid (田)
              </label>
              {activeTab === 'practice' && (
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={showWatermark}
                    onChange={(e) => setShowWatermark(e.target.checked)}
                  />
                  Panduan
                </label>
              )}
            </div>
          </div>

          {/* HTML5 Canvas with Touch / Mouse Support */}
          <div style={{ position: 'relative', width: '320px', height: '320px', userSelect: 'none', touchAction: 'none' }}>
            <canvas
              ref={canvasRef}
              width={320}
              height={320}
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '12px',
                cursor: 'crosshair',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)',
              }}
            />
            {/* Live Stroke Counter badge */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(15, 23, 42, 0.75)',
                color: '#fff',
                padding: '3px 9px',
                borderRadius: '12px',
                fontSize: '0.78rem',
                fontWeight: 600,
                backdropFilter: 'blur(4px)',
              }}
            >
              Coretan: {strokes.length}
              {activeTab === 'practice' && selectedKanji ? ` / ${selectedKanji.strokes}` : ''}
            </div>
          </div>

          {/* Drawing Actions */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={handleUndo}
                disabled={strokes.length === 0}
                style={{
                  padding: '7px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color, #cbd5e1)',
                  background: 'var(--card-bg, #fff)',
                  cursor: strokes.length === 0 ? 'not-allowed' : 'pointer',
                  opacity: strokes.length === 0 ? 0.5 : 1,
                  fontSize: '0.85rem',
                }}
              >
                ↩️ Undo
              </button>
              <button
                onClick={handleClear}
                style={{
                  padding: '7px 12px',
                  borderRadius: '8px',
                  border: '1px solid #fca5a5',
                  background: '#fef2f2',
                  color: '#dc2626',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                🗑️ Bersihkan
              </button>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={handleDownload}
                title="Download karya kaligrafi PNG"
                style={{
                  padding: '7px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color, #cbd5e1)',
                  background: 'var(--card-bg, #fff)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                💾 Unduh PNG
              </button>
              {activeTab === 'practice' ? (
                <button
                  onClick={handleEvaluate}
                  style={{
                    padding: '7px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'var(--primary, #3b82f6)',
                    color: '#fff',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                  }}
                >
                  ⚡ Nilai Goresan
                </button>
              ) : (
                <button
                  onClick={handleRecognize}
                  style={{
                    padding: '7px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#10b981',
                    color: '#fff',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                  }}
                >
                  🔍 Deteksi Kanji
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Info, Target Picker & Evaluation Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {activeTab === 'practice' ? (
            <>
              {/* Target Picker */}
              <div
                style={{
                  background: 'var(--card-bg, #ffffff)',
                  borderRadius: '16px',
                  padding: '18px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                  border: '1px solid var(--border-color, #e2e8f0)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-color, #1e293b)' }}>
                    Pilih Target Kanji
                  </h3>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {['N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setLevel(lvl)}
                        style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          border: 'none',
                          background: level === lvl ? 'var(--primary, #3b82f6)' : 'var(--card-bg, #e2e8f0)',
                          color: level === lvl ? '#fff' : 'inherit',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Horizontal Kanji Scroll Selector */}
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    overflowX: 'auto',
                    paddingBottom: '8px',
                    scrollbarWidth: 'thin',
                  }}
                >
                  {loading ? (
                    <div style={{ padding: '10px', color: '#64748b', fontSize: '0.85rem' }}>Memuat kanji...</div>
                  ) : (
                    kanjiList.slice(0, 30).map((k) => (
                      <button
                        key={k.kanji}
                        onClick={() => {
                          setSelectedKanji(k);
                          handleClear();
                        }}
                        style={{
                          flexShrink: 0,
                          width: '42px',
                          height: '42px',
                          borderRadius: '8px',
                          border: selectedKanji?.kanji === k.kanji ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                          background: selectedKanji?.kanji === k.kanji ? '#eff6ff' : 'var(--card-bg, #fff)',
                          fontSize: '1.25rem',
                          fontFamily: 'serif',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {k.kanji}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Selected Kanji Details Card */}
              {selectedKanji && (
                <div
                  style={{
                    background: 'var(--card-bg, #ffffff)',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                    border: '1px solid var(--border-color, #e2e8f0)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
                    <div
                      style={{
                        fontSize: '3.2rem',
                        fontFamily: 'serif',
                        lineHeight: 1,
                        background: '#f8fafc',
                        padding: '8px 14px',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      {selectedKanji.kanji}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                          {selectedKanji.meanings?.join(', ')}
                        </span>
                        <button
                          onClick={() => playSpeech(selectedKanji.kanji)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                            padding: '2px',
                          }}
                          title="Dengarkan pengucapan"
                        >
                          🔊
                        </button>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
                        Tingkat: <strong>{selectedKanji.level}</strong> • Jumlah Coretan:{' '}
                        <strong style={{ color: '#2563eb' }}>{selectedKanji.strokes} goresan</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.88rem' }}>
                    <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '8px' }}>
                      <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>Onyomi (音読み):</div>
                      <div style={{ color: '#0f172a', fontWeight: 600 }}>{selectedKanji.onyomi?.join('、 ') || '-'}</div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '8px' }}>
                      <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>Kunyomi (訓読み):</div>
                      <div style={{ color: '#0f172a', fontWeight: 600 }}>{selectedKanji.kunyomi?.join('、 ') || '-'}</div>
                    </div>
                  </div>

                  {/* Evaluation Result Banner */}
                  {evalResult && (
                    <div
                      style={{
                        marginTop: '16px',
                        padding: '14px',
                        borderRadius: '10px',
                        background:
                          evalResult.status === 'success'
                            ? '#f0fdf4'
                            : evalResult.status === 'warning'
                            ? '#fffbeb'
                            : '#fef2f2',
                        border: `1px solid ${
                          evalResult.status === 'success'
                            ? '#bbf7d0'
                            : evalResult.status === 'warning'
                            ? '#fde68a'
                            : '#fecaca'
                        }`,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Skor Presisi: {evalResult.score}/100</span>
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          Coretan: {evalResult.strokeCount} / target {evalResult.expected}
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#334155' }}>{evalResult.message}</p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Freehand Recognition Results Card */
            <div
              style={{
                background: 'var(--card-bg, #ffffff)',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                border: '1px solid var(--border-color, #e2e8f0)',
              }}
            >
              <h3 style={{ margin: '0 0 12px', fontSize: '1rem', color: 'var(--text-color, #1e293b)' }}>
                Hasil Deteksi Kanji (OCR Coretan)
              </h3>

              {recognizedCandidates.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 10px', color: '#64748b' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎨</div>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    Tuliskan kanji apapun di kanvas, lalu klik tombol <strong>Deteksi Kanji</strong>.
                  </p>
                  <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
                    Sistem akan menganalisis jumlah goresan dan mencocokkannya ke database {level}.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {recognizedCandidates.map((c, idx) => (
                    <div
                      key={c.kanji}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: idx === 0 ? '#eff6ff' : '#f8fafc',
                        border: idx === 0 ? '1px solid #bfdbfe' : '1px solid #e2e8f0',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '2rem', fontFamily: 'serif' }}>{c.kanji}</span>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>
                            {c.meanings?.[0] || 'Kanji'}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            On: {c.onyomi?.join(', ') || '-'} • Kun: {c.kunyomi?.join(', ') || '-'} ({c.strokes} coretan)
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: idx === 0 ? '#2563eb' : '#64748b',
                          }}
                        >
                          {c.confidence}% Cocok
                        </span>
                        <button
                          onClick={() => playSpeech(c.kanji)}
                          style={{
                            background: '#fff',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            padding: '4px 8px',
                            fontSize: '0.9rem',
                          }}
                          title="Dengarkan pengucapan"
                        >
                          🔊
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
