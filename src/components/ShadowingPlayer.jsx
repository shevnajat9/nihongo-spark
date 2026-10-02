import React, { useState, useEffect, useRef, useCallback } from 'react';
import { shadowingData } from '../data/shadowing';
import { FuriganaText } from '../utils/furigana';
import { envAudio } from '../utils/environmentalAudio';
import { playJapaneseSpeech, stopJapaneseSpeech } from '../utils/audioPlayer';

export default function ShadowingPlayer({ currentLevel = 'N5' }) {
  const [selectedLevel, setSelectedLevel] = useState(currentLevel || 'N5');
  const [activeDialogueId, setActiveDialogueId] = useState(() => {
    const match = shadowingData.find(d => d.level === currentLevel);
    return match ? match.id : shadowingData[0].id;
  });

  // Shadowing Phase: 1 = Listen, 2 = Synchronous, 3 = Pure Ghosting
  const [phase, setPhase] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [isLoopingLine, setIsLoopingLine] = useState(false);
  const [showMaskedScript, setShowMaskedScript] = useState(false);

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const isPlayingRef = useRef(false);
  const playTimeoutRef = useRef(null);

  // Environmental Audio Filter State (Fitur 29)
  const [envPreset, setEnvPreset] = useState('studio');
  const [isEnvNoiseActive, setIsEnvNoiseActive] = useState(false);
  const [envVolume, setEnvVolume] = useState(0.2);

  // Speed-Ramping Audio Drill State (Fitur 30)
  const [isSpeedRamping, setIsSpeedRamping] = useState(false);
  const [speedRampStage, setSpeedRampStage] = useState(0); // 0: Idle, 1: 1.0x, 2: 1.25x, 3: 1.5x, 4: 1.0x Reset
  const [speedRampSuccess, setSpeedRampSuccess] = useState(false);
  const speedRampTimeoutRef = useRef(null);

  // Filtered dialogues
  const filteredDialogues = shadowingData.filter(d =>
    selectedLevel === 'ALL' ? true : d.level === selectedLevel
  );

  const currentDialogue = shadowingData.find(d => d.id === activeDialogueId) || shadowingData[0];

  // Sync Environmental Background Noise
  useEffect(() => {
    if (isEnvNoiseActive && envPreset !== 'studio') {
      envAudio.startBackgroundSound(envPreset, envVolume);
    } else {
      envAudio.stopBackgroundSound();
    }
  }, [isEnvNoiseActive, envPreset, envVolume]);

  const handleToggleEnvNoise = () => {
    setIsEnvNoiseActive(prev => !prev);
  };

  const handleSelectEnvPreset = (presetId) => {
    setEnvPreset(presetId);
    envAudio.setPreset(presetId);
    if (presetId === 'studio') {
      setIsEnvNoiseActive(false);
      envAudio.stopBackgroundSound();
    } else {
      setIsEnvNoiseActive(true);
      envAudio.startBackgroundSound(presetId, envVolume);
    }
  };

  // Native Speech Synthesis
  const playNativeAudio = useCallback((text, speed = playbackSpeed, onEndCallback = null) => {
    playJapaneseSpeech(text, { rate: speed, onEnd: onEndCallback });
  }, [playbackSpeed]);

  // Stop Speed Ramping
  const stopSpeedRamp = useCallback(() => {
    setIsSpeedRamping(false);
    setSpeedRampStage(0);
    clearTimeout(speedRampTimeoutRef.current);
    stopJapaneseSpeech();
  }, []);

  // Speed Ramping Audio Drill (1.0x -> 1.25x -> 1.5x -> 1.0x Neuro-Deceleration)
  const startSpeedRampDrill = (lineIdx = activeLineIndex) => {
    stopSpeedRamp();
    setIsPlayingAll(false);
    isPlayingRef.current = false;
    clearTimeout(playTimeoutRef.current);
    setActiveLineIndex(lineIdx);
    setIsSpeedRamping(true);
    setSpeedRampSuccess(false);

    const line = currentDialogue.lines[lineIdx];
    if (!line) return;

    // Stage 1: 1.0x Normal
    setSpeedRampStage(1);
    playNativeAudio(line.japanese, 1.0, () => {
      speedRampTimeoutRef.current = setTimeout(() => {
        // Stage 2: 1.25x Acceleration
        setSpeedRampStage(2);
        playNativeAudio(line.japanese, 1.25, () => {
          speedRampTimeoutRef.current = setTimeout(() => {
            // Stage 3: 1.5x Hyper-Speed Challenge
            setSpeedRampStage(3);
            playNativeAudio(line.japanese, 1.5, () => {
              speedRampTimeoutRef.current = setTimeout(() => {
                // Stage 4: 1.0x Neuro-Deceleration Reset!
                setSpeedRampStage(4);
                playNativeAudio(line.japanese, 1.0, () => {
                  setSpeedRampSuccess(true);
                  speedRampTimeoutRef.current = setTimeout(() => {
                    setIsSpeedRamping(false);
                    setSpeedRampStage(0);
                  }, 4000);
                });
              }, 900);
            });
          }, 800);
        });
      }, 800);
    });
  };

  // Play Single Line
  const handlePlayLine = (idx) => {
    stopSpeedRamp();
    setActiveLineIndex(idx);
    setIsPlayingAll(false);
    isPlayingRef.current = false;
    clearTimeout(playTimeoutRef.current);

    const line = currentDialogue.lines[idx];
    if (line) {
      playNativeAudio(line.japanese, playbackSpeed, () => {
        if (isLoopingLine) {
          playTimeoutRef.current = setTimeout(() => handlePlayLine(idx), 600);
        }
      });
    }
  };

  // Play Full Dialogue with Natural Pauses
  const handlePlayAll = () => {
    stopSpeedRamp();
    if (isPlayingAll) {
      // Pause/Stop
      setIsPlayingAll(false);
      isPlayingRef.current = false;
      stopJapaneseSpeech();
      clearTimeout(playTimeoutRef.current);
      return;
    }

    setIsPlayingAll(true);
    isPlayingRef.current = true;

    const playSequence = (idx) => {
      if (!isPlayingRef.current || idx >= currentDialogue.lines.length) {
        setIsPlayingAll(false);
        isPlayingRef.current = false;
        return;
      }

      setActiveLineIndex(idx);
      const line = currentDialogue.lines[idx];

      playNativeAudio(line.japanese, playbackSpeed, () => {
        if (!isPlayingRef.current) return;
        // Pause between lines for shadowing repetition
        const pauseTime = (line.pauseMs || 800) / playbackSpeed;
        playTimeoutRef.current = setTimeout(() => {
          if (isPlayingRef.current) {
            playSequence(idx + 1);
          }
        }, pauseTime);
      });
    };

    playSequence(0);
  };

  // Stop everything when switching dialogue or unmounting
  useEffect(() => {
    stopJapaneseSpeech();
    clearTimeout(playTimeoutRef.current);
    clearTimeout(speedRampTimeoutRef.current);
    setIsPlayingAll(false);
    isPlayingRef.current = false;
    setIsSpeedRamping(false);
    setSpeedRampStage(0);
    setActiveLineIndex(0);
    setRecordedAudioUrl(null);
  }, [activeDialogueId]);

  useEffect(() => {
    return () => {
      stopJapaneseSpeech();
      clearTimeout(playTimeoutRef.current);
      clearTimeout(speedRampTimeoutRef.current);
      envAudio.stopBackgroundSound();
    };
  }, []);

  // Recording Handlers
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);
        // Stop tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      alert('Gagal mengakses mikrofon. Pastikan izin mikrofon telah diberikan pada browser.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER SECTION */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15))',
        border: '1px solid rgba(99, 102, 241, 0.3)',
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
            <span style={{ fontSize: '1.8rem' }}>🎙️</span>
            <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc', fontWeight: 800 }}>
              Latihan Shadowing (シャドーイング)
            </h1>
            <span style={{
              background: 'rgba(99, 102, 241, 0.25)',
              color: '#818cf8',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: '1px solid rgba(99, 102, 241, 0.4)'
            }}>
              Metode Penutur Asli
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', maxWidth: '600px' }}>
            Tingkatkan kelancaran berbicara, aksen nada (pitch accent), dan respons bahasa Jepang otomatis dengan metode 3-fase shadowing.
          </p>
        </div>

        {/* JLPT Level Filter Tabs */}
        <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '0.25rem', gap: '0.25rem' }}>
          {['ALL', 'N5', 'N4', 'N3'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              style={{
                background: selectedLevel === lvl ? 'var(--primary, #6366f1)' : 'transparent',
                color: selectedLevel === lvl ? '#fff' : '#94a3b8',
                border: 'none',
                borderRadius: '8px',
                padding: '0.4rem 0.9rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {lvl === 'ALL' ? 'Semua' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* 3-PHASE STEPPER SELECTOR */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem'
      }}>
        {/* Phase 1 */}
        <div
          onClick={() => setPhase(1)}
          style={{
            background: phase === 1 ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.03)',
            border: `2px solid ${phase === 1 ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)'}`,
            borderRadius: '14px',
            padding: '1.2rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8' }}>FASE 1</span>
            <span style={{ fontSize: '1.2rem' }}>🎧</span>
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.2rem' }}>
            Mendengarkan Saja (聞くだけ)
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Pahami makna kalimat, intonasi, dan jeda alami penutur tanpa perlu berbicara.
          </div>
        </div>

        {/* Phase 2 */}
        <div
          onClick={() => setPhase(2)}
          style={{
            background: phase === 2 ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255, 255, 255, 0.03)',
            border: `2px solid ${phase === 2 ? '#a855f7' : 'rgba(255, 255, 255, 0.08)'}`,
            borderRadius: '14px',
            padding: '1.2rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#c084fc' }}>FASE 2</span>
            <span style={{ fontSize: '1.2rem' }}>🗣️</span>
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.2rem' }}>
            Bersuara Sinkron (同時発話)
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Baca teks sambil bersuara serempak bersama audio pada kecepatan yang sama.
          </div>
        </div>

        {/* Phase 3 */}
        <div
          onClick={() => setPhase(3)}
          style={{
            background: phase === 3 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.03)',
            border: `2px solid ${phase === 3 ? '#f87171' : 'rgba(255, 255, 255, 0.08)'}`,
            borderRadius: '14px',
            padding: '1.2rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f87171' }}>FASE 3 (Pro)</span>
            <span style={{ fontSize: '1.2rem' }}>👤</span>
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.2rem' }}>
            Shadowing Murni (後から追う)
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Teks disamarkan! Ikuti suara penutur asli dengan jeda 0.2 detik tanpa melihat skrip.
          </div>
        </div>
      </div>

      {/* DIALOGUE PICKER & AUDIO CONTROLS BAR */}
      <div style={{
        background: 'var(--card-bg, #1e293b)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '14px',
        padding: '1.25rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        {/* Dialogue Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flex: '1 1 300px' }}>
          <label style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap' }}>
            Topik:
          </label>
          <select
            value={activeDialogueId}
            onChange={(e) => setActiveDialogueId(e.target.value)}
            style={{
              flex: 1,
              background: 'rgba(0, 0, 0, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              padding: '0.6rem 0.8rem',
              color: '#f8fafc',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            {filteredDialogues.map(d => (
              <option key={d.id} value={d.id}>
                [{d.level}] {d.title} ({d.category})
              </option>
            ))}
          </select>
        </div>

        {/* Speed Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Kecepatan:</span>
          {[0.7, 0.85, 1.0, 1.2].map(speed => (
            <button
              key={speed}
              onClick={() => setPlaybackSpeed(speed)}
              style={{
                background: playbackSpeed === speed ? 'var(--primary, #6366f1)' : 'rgba(255, 255, 255, 0.05)',
                color: playbackSpeed === speed ? '#fff' : '#94a3b8',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                padding: '0.35rem 0.6rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {speed}x
            </button>
          ))}
        </div>

        {/* Main Audio Action Buttons */}
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button
            onClick={handlePlayAll}
            style={{
              background: isPlayingAll ? '#ef4444' : 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '0.6rem 1.2rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
          >
            <span>{isPlayingAll ? '⏹️ Hentikan' : '▶️ Putar Semua Dialog'}</span>
          </button>

          <button
            onClick={() => setIsLoopingLine(!isLoopingLine)}
            title={isLoopingLine ? 'Looping kalimat aktif' : 'Looping kalimat nonaktif'}
            style={{
              background: isLoopingLine ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              color: isLoopingLine ? '#fbbf24' : '#94a3b8',
              border: `1px solid ${isLoopingLine ? '#f59e0b' : 'rgba(255, 255, 255, 0.1)'}`,
              borderRadius: '10px',
              padding: '0.6rem 0.9rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            🔁 {isLoopingLine ? 'Loop Aktif' : 'Loop'}
          </button>
        </div>
      </div>

      {/* FITUR 29: ENVIRONMENTAL AUDIO FILTER (NOISE GENERATOR) */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.75)',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        borderRadius: '14px',
        padding: '1.1rem 1.3rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem' }}>🎛️</span>
            <div>
              <span style={{ fontWeight: 700, color: '#38bdf8', fontSize: '0.95rem' }}>
                Filter Audio Lingkungan Nyata (Real Environmental Ambience)
              </span>
              <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                Simulasi kondisi kebisingan nyata di Jepang
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            {isEnvNoiseActive && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Volume Bising:</span>
                <input
                  type="range"
                  min="0.05"
                  max="0.4"
                  step="0.05"
                  value={envVolume}
                  onChange={(e) => setEnvVolume(parseFloat(e.target.value))}
                  style={{ width: '80px', accentColor: '#38bdf8', cursor: 'pointer' }}
                />
              </div>
            )}
            <button
              onClick={handleToggleEnvNoise}
              style={{
                background: isEnvNoiseActive ? '#10b981' : 'rgba(255, 255, 255, 0.08)',
                color: isEnvNoiseActive ? '#ffffff' : '#94a3b8',
                border: `1px solid ${isEnvNoiseActive ? '#059669' : 'rgba(255, 255, 255, 0.15)'}`,
                borderRadius: '8px',
                padding: '0.35rem 0.8rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {isEnvNoiseActive ? '🔊 Ambience Nyala' : '🔈 Ambience Mati'}
            </button>
          </div>
        </div>

        {/* Preset Selector Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem' }}>
          {envAudio.getAvailablePresets().map(preset => {
            const isSelected = envPreset === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => handleSelectEnvPreset(preset.id)}
                style={{
                  background: isSelected ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1.5px solid ${isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.07)'}`,
                  borderRadius: '10px',
                  padding: '0.7rem 0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                  <span style={{ fontSize: '1.1rem' }}>{preset.icon}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isSelected ? '#38bdf8' : '#e2e8f0' }}>
                    {preset.name}
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.3 }}>
                  {preset.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FITUR 30: SPEED-RAMPING AUDIO DRILL (NEURO-DECELERATION) */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(239, 68, 68, 0.1))',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        borderRadius: '14px',
        padding: '1.2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.9rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.3rem' }}>⚡</span>
              <span style={{ fontWeight: 800, color: '#f59e0b', fontSize: '1.05rem' }}>
                Neuro-Deceleration Drill (1.0x → 1.25x → 1.5x → 1.0x)
              </span>
              <span style={{
                background: 'rgba(245, 158, 11, 0.2)',
                color: '#fbbf24',
                padding: '0.15rem 0.5rem',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 700
              }}>
                Metode Neurologi
              </span>
            </div>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.82rem', color: '#cbd5e1' }}>
              Dengarkan kalimat target dari 1.0x naik bertahap ke 1.5x, lalu reset kembali ke 1.0x. Kecepatan normal akan terasa jauh lebih lambat, rileks, dan super jernih!
            </p>
          </div>

          <div>
            {!isSpeedRamping ? (
              <button
                onClick={() => startSpeedRampDrill(activeLineIndex)}
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: '#1e293b',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.6rem 1.2rem',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                }}
              >
                <span>⚡ Jalankan Speed Ramp (Kalimat #{activeLineIndex + 1})</span>
              </button>
            ) : (
              <button
                onClick={stopSpeedRamp}
                style={{
                  background: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.6rem 1.2rem',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                ⏹️ Hentikan Speed Ramp
              </button>
            )}
          </div>
        </div>

        {/* 4-STAGE ACCELERATION PROGRESS BAR */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.6rem'
        }}>
          {[
            { stage: 1, speed: '1.0x', title: '1. Pemahaman Dasar', desc: 'Tangkap pola struktur awal' },
            { stage: 2, speed: '1.25x', title: '2. Akselerasi Mora', desc: 'Latih reflek otak merespon mora' },
            { stage: 3, speed: '1.5x', title: '3. Hyper-Speed Drill', desc: 'Tantangan auditori tempo tinggi' },
            { stage: 4, speed: '1.0x', title: '4. Neuro-Deceleration ✨', desc: 'Kembali 1.0x: Terasa sangat lambat & jelas!' },
          ].map((stg) => {
            const isCurrent = isSpeedRamping && speedRampStage === stg.stage;
            const isDone = isSpeedRamping ? speedRampStage > stg.stage : speedRampSuccess;

            return (
              <div
                key={stg.stage}
                style={{
                  background: isCurrent
                    ? 'rgba(245, 158, 11, 0.25)'
                    : isDone
                    ? 'rgba(16, 185, 129, 0.15)'
                    : 'rgba(0, 0, 0, 0.25)',
                  border: `1.5px solid ${
                    isCurrent ? '#f59e0b' : isDone ? '#10b981' : 'rgba(255, 255, 255, 0.08)'
                  }`,
                  borderRadius: '10px',
                  padding: '0.6rem 0.8rem',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: isCurrent ? '#f59e0b' : isDone ? '#10b981' : '#94a3b8'
                  }}>
                    {stg.title}
                  </span>
                  <span style={{
                    background: isCurrent ? '#f59e0b' : 'rgba(255, 255, 255, 0.1)',
                    color: isCurrent ? '#000' : '#e2e8f0',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.1rem 0.4rem',
                    borderRadius: '4px'
                  }}>
                    {stg.speed}
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: isCurrent ? '#f8fafc' : '#94a3b8' }}>
                  {stg.desc}
                </div>
                {isCurrent && (
                  <div style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#f59e0b',
                    boxShadow: '0 0 10px #f59e0b'
                  }} />
                )}
              </div>
            );
          })}
        </div>

        {speedRampSuccess && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.2)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '8px',
            padding: '0.6rem 1rem',
            color: '#a7f3d0',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>✨</span>
            <span>
              <strong>Efek Neuro-Deceleration Sukses!</strong> Setelah telinga Anda dipaksa memproses pada 1.5x, tempo 1.0x sekarang terasa jauh lebih santai dan setiap suku kata terdengar terpisah dengan jelas.
            </span>
          </div>
        )}
      </div>

      {/* DIALOGUE LINES PLAYGROUND */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        {currentDialogue.lines.map((line, idx) => {
          const isActive = idx === activeLineIndex;
          const isPhase3Masked = phase === 3 && !showMaskedScript;

          return (
            <div
              key={idx}
              onClick={() => handlePlayLine(idx)}
              style={{
                background: isActive ? 'rgba(99, 102, 241, 0.12)' : 'var(--card-bg, #1e293b)',
                border: `1.5px solid ${isActive ? '#6366f1' : 'rgba(255, 255, 255, 0.06)'}`,
                borderRadius: '14px',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              {/* Speaker & Pitch Accent Tag */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{
                    background: line.speaker.includes('あなた') ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                    color: line.speaker.includes('あなた') ? '#38bdf8' : '#e2e8f0',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 700
                  }}>
                    {line.speaker}
                  </span>
                  {isActive && (
                    <span style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 600 }}>
                      ● Sedang Dimainkan
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {line.pitchHint && (
                    <span style={{
                      fontSize: '0.72rem',
                      color: '#fbbf24',
                      background: 'rgba(251, 191, 36, 0.1)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px'
                    }}>
                      🎵 {line.pitchHint}
                    </span>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); startSpeedRampDrill(idx); }}
                    title="Jalankan Speed Ramp Drill (1.0x -> 1.25x -> 1.5x -> 1.0x)"
                    style={{
                      background: 'rgba(245, 158, 11, 0.2)',
                      color: '#fbbf24',
                      border: '1px solid rgba(245, 158, 11, 0.4)',
                      borderRadius: '6px',
                      padding: '0.3rem 0.6rem',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    ⚡ Ramp
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePlayLine(idx); }}
                    style={{
                      background: 'rgba(99, 102, 241, 0.2)',
                      color: '#a5b4fc',
                      border: '1px solid rgba(99, 102, 241, 0.4)',
                      borderRadius: '6px',
                      padding: '0.3rem 0.6rem',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    🔊
                  </button>
                </div>
              </div>

              {/* Japanese Text (with Phase 3 masking capability) */}
              <div style={{
                fontSize: '1.4rem',
                fontWeight: 600,
                lineHeight: 1.8,
                color: isPhase3Masked ? 'transparent' : '#f8fafc',
                textShadow: isPhase3Masked ? '0 0 14px rgba(255,255,255,0.7)' : 'none',
                userSelect: isPhase3Masked ? 'none' : 'text',
                marginBottom: '0.4rem',
                transition: 'all 0.3s ease'
              }}>
                <FuriganaText text={line.japanese} reading={line.reading} />
              </div>

              {/* Romaji & Indonesian Meaning */}
              <div style={{
                fontSize: '0.88rem',
                color: '#94a3b8',
                marginBottom: '0.2rem',
                opacity: isPhase3Masked ? 0.3 : 1
              }}>
                {line.romaji}
              </div>
              <div style={{
                fontSize: '0.92rem',
                color: '#cbd5e1',
                fontWeight: 500,
                opacity: isPhase3Masked ? 0.3 : 1
              }}>
                {line.indonesian}
              </div>
            </div>
          );
        })}
      </div>

      {/* PHASE 3 REVEAL SCRIPT TOGGLE */}
      {phase === 3 && (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => setShowMaskedScript(!showMaskedScript)}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#e2e8f0',
              border: '1px dashed rgba(255, 255, 255, 0.25)',
              borderRadius: '8px',
              padding: '0.6rem 1.2rem',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            {showMaskedScript ? '🙈 Tutup Kembali Skrip (Uji Ingatan)' : '👁️ Intip Skrip Asli'}
          </button>
        </div>
      )}

      {/* USER VOICE RECORDING & COMPARISON LAB */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '1.5rem',
        marginTop: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
          <span style={{ fontSize: '1.3rem' }}>🔬</span>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#f8fafc' }}>
            Laboratorium Perekam Suara (Uji Perbandingan Artikulasi)
          </h3>
        </div>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
          Rekam suaramu saat mengikuti kalimat nomor {activeLineIndex + 1} lalu putar berdampingan dengan audio native untuk mengecek pelafalan dan ritme.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
          {/* Record Button */}
          {!isRecording ? (
            <button
              onClick={startRecording}
              style={{
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '0.65rem 1.25rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)'
              }}
            >
              <span>🔴</span>
              <span>Mulai Rekam Suara Saya</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              style={{
                background: '#f59e0b',
                color: '#000',
                border: 'none',
                borderRadius: '10px',
                padding: '0.65rem 1.25rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                animation: 'pulse 1s infinite'
              }}
            >
              <span>⏹️</span>
              <span>Selesai Merekam (Klik untuk Stop)</span>
            </button>
          )}

          {/* User Playback */}
          {recordedAudioUrl && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <audio src={recordedAudioUrl} controls style={{ height: '40px', borderRadius: '8px' }} />
              <button
                onClick={() => handlePlayLine(activeLineIndex)}
                style={{
                  background: 'rgba(99, 102, 241, 0.2)',
                  color: '#a5b4fc',
                  border: '1px solid rgba(99, 102, 241, 0.4)',
                  borderRadius: '8px',
                  padding: '0.5rem 0.9rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                🔊 Putar Native Ulang
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
