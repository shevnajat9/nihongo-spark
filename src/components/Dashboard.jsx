import React, { useState, useEffect, useRef } from 'react';
import { loadLevel } from '../data/loader';
import { loadProgress, isDue, getMasteryStatus, getActivityHeatmapData } from '../utils/srs';
import { getTodayChecklist } from '../utils/checklist';
import { exportBackupJson, importBackupJson } from '../utils/storage';
import { FuriganaModeSelector } from '../utils/furigana';
import {
  getHabitAlarmConfig,
  saveHabitAlarmConfig,
  requestNotificationPermission,
  triggerImmediateTestNotification,
  checkAndNotifyStreakRisk
} from '../utils/habitAlarm';
import PWAInstallPrompt from './PWAInstallPrompt';

const LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];

export default function Dashboard({ 
  currentLevel, 
  setCurrentLevel, 
  studyStats, 
  setActiveTab
}) {
  const [dueVocab, setDueVocab] = useState(0);
  const [dueKanji, setDueKanji] = useState(0);
  const [levelMastery, setLevelMastery] = useState({});
  const [backupStatus, setBackupStatus] = useState(null);
  const [isImporting, setIsImporting] = useState(false);
  const [habitAlarm, setHabitAlarm] = useState(getHabitAlarmConfig);
  const [notificationPerm, setNotificationPerm] = useState(() => {
    return typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'unsupported';
  });
  const [srsEngine, setSrsEngine] = useState(() => {
    return localStorage.getItem('nihongo_spark_srs_engine') || 'sm2';
  });
  const [testAlarmSent, setTestAlarmSent] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileRestore = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsImporting(true);
    setBackupStatus(null);
    try {
      const text = await file.text();
      const res = await importBackupJson(text);
      if (res.success) {
        setBackupStatus({
          type: 'success',
          message: `Berhasil memulihkan ${res.restoredCount} item data cadangan!`
        });
      } else {
        setBackupStatus({
          type: 'error',
          message: `Gagal memulihkan: ${res.error}`
        });
      }
    } catch (err) {
      setBackupStatus({
        type: 'error',
        message: `Gagal membaca berkas: ${err.message}`
      });
    } finally {
      setIsImporting(false);
      e.target.value = '';
    }
  };

  const handleToggleHabitAlarm = async () => {
    if (!habitAlarm.enabled) {
      const perm = await requestNotificationPermission();
      setNotificationPerm(perm);
      if (perm === 'granted') {
        const next = { ...habitAlarm, enabled: true };
        setHabitAlarm(next);
        saveHabitAlarmConfig(next);
      }
    } else {
      const next = { ...habitAlarm, enabled: false };
      setHabitAlarm(next);
      saveHabitAlarmConfig(next);
    }
  };

  const handleTestNotification = () => {
    const success = triggerImmediateTestNotification();
    if (success) {
      setTestAlarmSent(true);
      setTimeout(() => setTestAlarmSent(false), 3000);
    }
  };

  const handleToggleSrsEngine = (engine) => {
    setSrsEngine(engine);
    localStorage.setItem('nihongo_spark_srs_engine', engine);
  };

  useEffect(() => {
    // Check if streak is at risk
    checkAndNotifyStreakRisk(studyStats?.streak || 0);
  }, [studyStats]);

  useEffect(() => {
    let alive = true;
    // Muat data semua level via loader (cache setelah pertama kali).
    Promise.all(LEVELS.map(loadLevel)).then((datas) => {
      if (!alive) return;
      const allVocab = datas.flatMap((d) => d.vocab);
      const allKanji = datas.flatMap((d) => d.kanji);
      const vocabProgress = loadProgress('nihongo_spark_vocab_progress');
      const kanjiProgress = loadProgress('nihongo_spark_kanji_progress');
      setDueVocab(allVocab.filter((v) => isDue(vocabProgress, `${v.level}__${v.word}`)).length);
      setDueKanji(allKanji.filter((k) => isDue(kanjiProgress, `${k.level}__${k.kanji}`)).length);

      // Hitung persentase penguasaan (mastered) per level JLPT, gabungan vocab + kanji.
      const mastery = {};
      LEVELS.forEach((level, i) => {
        const levelVocab = datas[i].vocab;
        const levelKanji = datas[i].kanji;
        const total = levelVocab.length + levelKanji.length;
        if (total === 0) {
          mastery[level] = 0;
          return;
        }
        const masteredVocab = levelVocab.filter((v) => getMasteryStatus(vocabProgress, `${v.level}__${v.word}`) === 'mastered').length;
        const masteredKanji = levelKanji.filter((k) => getMasteryStatus(kanjiProgress, `${k.level}__${k.kanji}`) === 'mastered').length;
        mastery[level] = Math.round(((masteredVocab + masteredKanji) / total) * 100);
      });
      setLevelMastery(mastery);
    });
    return () => {
      alive = false;
    };
  }, []);

  // Checklist harian bersifat otomatis (dipicu dari aktivitas nyata di Vocab/Grammar/Quiz),
  // bukan dicentang manual, supaya progres yang ditampilkan benar-benar mencerminkan belajar.
  const checklist = getTodayChecklist(studyStats);

  // Calculate completion percentage
  const completedCount = Object.values(checklist).filter(Boolean).length;
  const percent = Math.round((completedCount / 3) * 100);

  // SVG Progress Ring calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  // Generate 28 days contribution map for premium look
  const getContributionDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 27; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      days.push({
        dateStr: d.toDateString(),
        dayNum: d.getDate(),
        studied: studyStats.history?.includes(d.toDateString()) || false
      });
    }
    return days;
  };

  const contributionDays = getContributionDays();

  return (
    <div className="dashboard-view">
      <div className="jlpt-selector-container" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Tingkat JLPT Aktif
        </h3>
        <div className="jlpt-selector">
          {LEVELS.map((level) => (
            <button
              key={level}
              className={`jlpt-btn ${currentLevel === level ? 'active' : ''}`}
              onClick={() => setCurrentLevel(level)}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="level-mastery-row">
          {LEVELS.map((level) => (
            <div key={level} className="level-mastery-item" title={`${levelMastery[level] || 0}% dikuasai di level ${level}`}>
              <div className="level-mastery-bar">
                <div className="level-mastery-fill" style={{ width: `${levelMastery[level] || 0}%` }} />
              </div>
              <span className="level-mastery-label">{level} · {levelMastery[level] || 0}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-main flex-col" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Welcome Banner */}
          <div className="glass-panel welcome-banner">
            <span className="streak-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.687 9.581c-2.316-2.22-3.834-3.528-4.687-6.581-.4 1.76-1.04 3.6-2.08 4.96-1.12 1.44-2.88 2.56-3.2 4.64-.48 3.12 1.6 6.4 5.28 6.4 3.96 0 6.6-2.8 6.08-6.4-.16-1.12-.64-2.16-1.4-3.024zM12 17.6c-1.76 0-3.2-1.44-3.2-3.2 0-1.76 1.44-3.2 3.2-3.2 1.76 0 3.2 1.44 3.2 3.2 0 1.76-1.44 3.2-3.2 3.2z" />
              </svg>
              {studyStats.streak || 0} Hari Beruntun
            </span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              Selamat Belajar, <span className="text-gradient">Gakusei!</span> 🌟
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Selamat datang di program belajar mandiri Anda. Hari ini adalah hari yang bagus untuk menguasai Kanji dan kosakata tingkat <strong style={{ color: 'var(--accent-cyan)' }}>{currentLevel}</strong> baru.
            </p>

            <div className="stats-row">
              <div className="glass-panel stat-card">
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Level Aktif</div>
                <div className="stat-val text-gradient">{currentLevel}</div>
              </div>
              <div className="glass-panel stat-card">
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Hari Belajar</div>
                <div className="stat-val text-gradient-gold">{studyStats.history?.length || 0}</div>
              </div>
              <div className="glass-panel stat-card">
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Total Quiz</div>
                <div className="stat-val" style={{ color: 'var(--accent-emerald)' }}>{studyStats.totalQuizzes || 0}</div>
              </div>
            </div>
          </div>

          {/* Spaced-Repetition Reminder */}
          {(dueVocab > 0 || dueKanji > 0) && (
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', border: '1px solid rgba(244, 63, 94, 0.25)' }}>
              <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🔁 Waktunya Mengulang!
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {dueVocab > 0 && <span>{dueVocab} kosakata</span>}
                  {dueVocab > 0 && dueKanji > 0 && ' dan '}
                  {dueKanji > 0 && <span>{dueKanji} kanji</span>} menunggu untuk diulang supaya tidak lupa.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {dueVocab > 0 && (
                  <button className="canvas-btn review-btn-no" style={{ padding: '0.6rem 1.25rem', borderRadius: '30px' }} onClick={() => setActiveTab && setActiveTab('vocab')}>
                    Ulas Kosakata
                  </button>
                )}
                {dueKanji > 0 && (
                  <button className="canvas-btn review-btn-no" style={{ padding: '0.6rem 1.25rem', borderRadius: '30px' }} onClick={() => setActiveTab && setActiveTab('kanji')}>
                    Ulas Kanji
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Activity Tracker (Heatmap style) */}
          <div className="glass-panel" style={{ padding: '1.8rem' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Kalender Keaktifan Belajar
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.6rem', maxWidth: '320px', margin: '0 auto' }}>
              {contributionDays.map((day, idx) => (
                <div
                  key={idx}
                  title={day.dateStr}
                  style={{
                    height: '38px',
                    borderRadius: '8px',
                    background: day.studied 
                      ? 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-cyan) 100%)' 
                      : 'rgba(255, 255, 255, 0.03)',
                    border: day.studied ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    color: day.studied ? 'white' : 'var(--text-secondary)',
                    boxShadow: day.studied ? '0 4px 10px rgba(139, 92, 246, 0.25)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {day.dayNum}
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
              Menampilkan keaktifan belajar Anda selama 28 hari terakhir.
            </p>
          </div>

          {/* SPOTLIGHT: TRANSITIF VS INTRANSITIF (JIDOOSHI & TADOOSHI) */}
          <div className="glass-panel" style={{
            padding: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(6, 182, 212, 0.08) 100%)'
          }}>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  background: 'var(--accent-cyan)',
                  color: '#080b11'
                }}>
                  FASE 1 BARU
                </span>
                <span style={{ fontWeight: '600', color: 'var(--accent-cyan)' }}>
                  Modul Pembeda Verba
                </span>
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'white', marginBottom: '0.3rem' }}>
                Transitif vs Intransitif (自動詞・他動詞) ⚖️
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                Kuasai perbedaan partikel <strong style={{ color: 'var(--accent-cyan)' }}>が (spontan/keadaan)</strong> vs <strong style={{ color: '#fbbf24' }}>を (tindakan sengaja)</strong> dengan 40+ pasangan kata kerja, aturan pergeseran bunyi, dan kuis kilat!
              </p>
            </div>
            <button
              type="button"
              className="start-quiz-btn"
              onClick={() => setActiveTab('jidoushi')}
              style={{ margin: 0, padding: '0.65rem 1.4rem', whiteSpace: 'nowrap' }}
            >
              Buka Modul ➔
            </button>
          </div>

          {/* FITUR 9: LATIHAN SHADOWING (シャドーイング) */}
          <div className="glass-panel" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.08))',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: '800',
                  color: '#818cf8',
                  background: 'rgba(99, 102, 241, 0.2)',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  FASE 2 BARU
                </span>
                <span style={{ fontWeight: '600', color: '#c084fc' }}>
                  Metode 3-Fase Berbicara
                </span>
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'white', marginBottom: '0.3rem' }}>
                Latihan Shadowing (シャドーイング) 🎙️
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                Latih kelancaran pelafalan, ritme kalimat, dan aksen nada alami penutur asli Jepang (N5–N3) dengan fitur rekam suara sendiri!
              </p>
            </div>
            <button
              type="button"
              className="start-quiz-btn"
              onClick={() => setActiveTab('shadowing')}
              style={{
                margin: 0,
                padding: '0.65rem 1.4rem',
                whiteSpace: 'nowrap',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
              }}
            >
              Mulai Shadowing ➔
            </button>
          </div>

          {/* FITUR 10: SATUAN HITUNG BENDA (助数詞) */}
          <div className="glass-panel" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(234, 88, 12, 0.08))',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: '800',
                  color: '#fbbf24',
                  background: 'rgba(245, 158, 11, 0.2)',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  FASE 2 BARU
                </span>
                <span style={{ fontWeight: '600', color: '#fbbf24' }}>
                  Kalkulator & Drill Fonetik
                </span>
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'white', marginBottom: '0.3rem' }}>
                Satuan Hitung Benda (助数詞 Joshuushi) 🔢
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                Kalkulator instan 1–99 untuk 14+ kategori benda, visualisasi matriks bunyi Rendaku & Sokuon, serta drill kuis objek.
              </p>
            </div>
            <button
              type="button"
              className="start-quiz-btn"
              onClick={() => setActiveTab('counters')}
              style={{
                margin: 0,
                padding: '0.65rem 1.4rem',
                whiteSpace: 'nowrap',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: '#000',
                fontWeight: 700
              }}
            >
              Buka Joshuushi ➔
            </button>
          </div>

          {/* FASE 3 SHOWCASE GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {/* Tadoku Card */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(16, 185, 129, 0.25)', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(6, 182, 212, 0.05))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#34d399', background: 'rgba(16, 185, 129, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 3</span>
                  <span style={{ fontSize: '1.2rem' }}>📖</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Bacaan Bertingkat (多読 Tadoku)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Dongeng klasik Momotaro & Urashima Taro, cerita harian, audio narasi, dan tes pemahaman bacaan.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('tadoku')}
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Mulai Membaca ➔
              </button>
            </div>

            {/* Tokutei Ginou SSW Card */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(56, 189, 248, 0.25)', background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(168, 85, 247, 0.05))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#38bdf8', background: 'rgba(56, 189, 248, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 3</span>
                  <span style={{ fontSize: '1.2rem' }}>🏥</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Bahasa Jepang Kerja (SSW)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Modul 4 sektor: Kaigo (Lansia), Restoran, Konstruksi & Manufaktur, serta IT Bisnis (Hou-Ren-So).
                </p>
              </div>
              <button
                onClick={() => setActiveTab('tokutei')}
                style={{ background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: 'white', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Buka Modul SSW ➔
              </button>
            </div>

            {/* Keigo & Mensetsu Card */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(236, 72, 153, 0.25)', background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.08), rgba(168, 85, 247, 0.05))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#f472b6', background: 'rgba(236, 72, 153, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 3</span>
                  <span style={{ fontSize: '1.2rem' }}>🙇</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Keigo & Wawancara (面接)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Matriks Sonkeigo vs Kenjougo, tata krama ketuk pintu, sudut Ojigi, dan respon wawancara kerja Jepang.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('keigo')}
                style={{ background: 'linear-gradient(135deg, #ec4899, #db2777)', color: 'white', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Latihan Keigo ➔
              </button>
            </div>

            {/* Nuance & Onomatopoeia Card */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(20, 184, 166, 0.25)', background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.08), rgba(99, 102, 241, 0.05))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#2dd4bf', background: 'rgba(20, 184, 166, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 3</span>
                  <span style={{ fontSize: '1.2rem' }}>🎭</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Nuansa Kata & Onomatope
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Beda halus Shiru vs Wakaru, Omou vs Kangaeru, serta kamus onomatope audio (doki-doki, waku-waku...).
                </p>
              </div>
              <button
                onClick={() => setActiveTab('nuance')}
                style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)', color: 'black', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Pelajari Nuansa ➔
              </button>
            </div>

            {/* FASE 4: Visual Syntax Parser */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(14, 165, 233, 0.25)', background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.08), rgba(59, 130, 246, 0.05))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#38bdf8', background: 'rgba(14, 165, 233, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 4</span>
                  <span style={{ fontSize: '1.2rem' }}>🧩</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Visual Syntax Parser (文分解)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Urai struktur kalimat bahasa Jepang menjadi blok warna SOV, subjek, objek, partikel, & predikat.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('syntax')}
                style={{ background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: 'white', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Urai Kalimat ➔
              </button>
            </div>

            {/* FASE 4: Kanji Handwriting Recognition Canvas */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(244, 63, 94, 0.25)', background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.08), rgba(236, 72, 153, 0.05))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fb7185', background: 'rgba(244, 63, 94, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 4</span>
                  <span style={{ fontSize: '1.2rem' }}>✍️</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Kanvas Tulis Tangan Kanji
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Latihan kaligrafi Shodo, evaluasi presisi coretan (*hitsujun*), dan OCR deteksi kanji tulisan bebas.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('canvas')}
                style={{ background: 'linear-gradient(135deg, #f43f5e, #e11d48)', color: 'white', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Buka Kanvas ➔
              </button>
            </div>

            {/* FASE 4: Visual Pitch Accent Lab */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(168, 85, 247, 0.25)', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(124, 58, 237, 0.05))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#c084fc', background: 'rgba(168, 85, 247, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 4</span>
                  <span style={{ fontSize: '1.2rem' }}>🎼</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Visual Pitch Accent Lab
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Pola nada Tokyo (Heiban, Atamadaka, Nakadaka, Odaka) dengan kurva visual dan pasangan minimal Ame/Ame.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('pitch')}
                style={{ background: 'linear-gradient(135deg, #a855f7, #9333ea)', color: 'white', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Pelajari Akses Nada ➔
              </button>
            </div>

            {/* FASE 4: Sensei AI Conversational Tutor */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(16, 185, 129, 0.25)', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(5, 150, 105, 0.05))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#34d399', background: 'rgba(16, 185, 129, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 4</span>
                  <span style={{ fontSize: '1.2rem' }}>🤖</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Sensei AI Tutor & Roleplay
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Simulasi percakapan nyata (Izakaya, Konbini, Koban, Rumah Sakit) dan konsultasi tata bahasa langsung.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('sensei')}
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'black', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Mulai Roleplay ➔
              </button>
            </div>

            {/* FASE 4: Zen Study Mode & Synthesizer */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(245, 158, 11, 0.25)', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(217, 119, 6, 0.05))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fbbf24', background: 'rgba(245, 158, 11, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 4</span>
                  <span style={{ fontSize: '1.2rem' }}>🧘</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Mode Zen Study & Suasana Alam
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Pomodoro fokus dengan synthesizer Web Audio (Hujan Kyoto, Shishi-odoshi, Jangkrik) 100% offline.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('zen')}
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'black', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Masuk Ruang Zen ➔
              </button>
            </div>

            {/* FASE 4: Custom Deck Creator & Anki */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(236, 72, 153, 0.25)', background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.08), rgba(219, 39, 119, 0.05))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#f472b6', background: 'rgba(236, 72, 153, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 4</span>
                  <span style={{ fontSize: '1.2rem' }}>🗂️</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Pembuat Deck Kustom & Anki
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Buat flashcard pribadi, latih memori, serta ekspor & impor file TSV kompatibel dengan Anki.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('customdecks')}
                style={{ background: 'linear-gradient(135deg, #ec4899, #db2777)', color: 'white', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Kelola Deck ➔
              </button>
            </div>

            {/* FASE 5: Jebakan Kanji Mirip (Rui-ji Trap Breaker) */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(245, 158, 11, 0.06))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#f87171', background: 'rgba(239, 68, 68, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 5 · BARU</span>
                  <span style={{ fontSize: '1.2rem' }}>🔍</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Jebakan Kanji Mirip (類似漢字)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Komparasi visual kanji kembar (待/持/特, 微/徴, 己/已/巳), mnemonik pembeda, & Speed Drill 5-detik.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('ruiji')}
                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Bongkar Jebakan ➔
              </button>
            </div>

            {/* FASE 5: Soal Bintang JLPT (Star Sentence Mondai 2) */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(234, 179, 8, 0.3)', background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(99, 102, 241, 0.06))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#facc15', background: 'rgba(234, 179, 8, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 5 · BARU</span>
                  <span style={{ fontSize: '1.2rem' }}>★</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Soal Bintang (文の並べ替え)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Simulasi format Mondai 2 ujian JLPT: susun 4 frasa acak dan tebak frasa kunci di posisi bintang (★).
                </p>
              </div>
              <button
                onClick={() => setActiveTab('starsentence')}
                style={{ background: 'linear-gradient(135deg, #eab308, #ca8a04)', color: '#000', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 800, cursor: 'pointer' }}
              >
                Latih Soal Bintang ➔
              </button>
            </div>

            {/* FASE 5: Kamus Kolokasi Alami (Rengou Explorer) */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(20, 184, 166, 0.3)', background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(14, 165, 233, 0.06))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#2dd4bf', background: 'rgba(20, 184, 166, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 5 · BARU</span>
                  <span style={{ fontSize: '1.2rem' }}>🔗</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Kamus Kolokasi (連語)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Pasangan wajib kata benda + partikel + verba penutur asli Jepang (風邪をひく, 傘をさす, 席を外す).
                </p>
              </div>
              <button
                onClick={() => setActiveTab('collocations')}
                style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)', color: '#000', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 800, cursor: 'pointer' }}
              >
                Jelajah Kolokasi ➔
              </button>
            </div>

            {/* FASE 5: Matriks Komparasi Tata Bahasa Serupa */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(168, 85, 247, 0.3)', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.06))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#c084fc', background: 'rgba(168, 85, 247, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 5 · BARU</span>
                  <span style={{ fontSize: '1.2rem' }}>📐</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Matriks Tata Bahasa (類似文法)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Komparasi tajam syarat grammar mirip (わけにはいかない vs てはいけない, うちに vs あいだに).
                </p>
              </div>
              <button
                onClick={() => setActiveTab('grammarmatrix')}
                style={{ background: 'linear-gradient(135deg, #a855f7, #9333ea)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Bandingkan Grammar ➔
              </button>
            </div>

            {/* FASE 5: Pohon Senyawa Kanji (Jukugo Lego Mindmap) */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.06))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#60a5fa', background: 'rgba(59, 130, 246, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 5 · BARU</span>
                  <span style={{ fontSize: '1.2rem' }}>🌳</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Pohon Jukugo (熟語ファミリー)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Eksplorasi kanji sebagai balok Lego pembentuk rumpun kosakata (電 $\rightarrow$ 電話, 電車, 電気, 電池...).
                </p>
              </div>
              <button
                onClick={() => setActiveTab('jukugotree')}
                style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Buka Pohon Jukugo ➔
              </button>
            </div>

            {/* FASE 5: Cloze Test Dinamis Partikel & Konjugasi */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(16, 185, 129, 0.3)', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.06))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#34d399', background: 'rgba(16, 185, 129, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 5 · BARU</span>
                  <span style={{ fontSize: '1.2rem' }}>✍️</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Cloze Test (穴埋め問題)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Latih active recall partikel presisi (は, が, に, で...) dan akhiran konjugasi di tengah kalimat nyata.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('cloze')}
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Latih Kalimat Rumpang ➔
              </button>
            </div>

            {/* FASE 6: Evaluator Pelafalan Suara (Speech Recognition & Coach) */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(236, 72, 153, 0.3)', background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.06))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#f472b6', background: 'rgba(236, 72, 153, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 6 · BARU</span>
                  <span style={{ fontSize: '1.2rem' }}>🎯</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Coach Pelafalan (発音コーチ)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Bicara langsung ke mikrofon. AI membedah akurasi fonetik Levenshtein, mora panjang/ganda, dan partikel yang tertelan.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('speechcoach')}
                style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Uji Pelafalan AI ➔
              </button>
            </div>

            {/* FASE 6: Laboratorium Kontraksi Bahasa Lisan (Kougo Tankushuku) */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(245, 158, 11, 0.3)', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(239, 68, 68, 0.06))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fbbf24', background: 'rgba(245, 158, 11, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 6 · BARU</span>
                  <span style={{ fontSize: '1.2rem' }}>💬</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Kontraksi Kasual (口語短縮形)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Bongkar rahasia singkatan penutur asli anime & chokai: 〜とく, 〜ちゃう, 〜なきゃ, 〜てる, 〜ちゃだめ!
                </p>
              </div>
              <button
                onClick={() => setActiveTab('casual')}
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#1e293b', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 800, cursor: 'pointer' }}
              >
                Buka Lab Kontraksi ➔
              </button>
            </div>

            {/* FASE 6: Laboratorium Dialek Daerah (Hougen Lab) */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(249, 115, 22, 0.3)', background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(236, 72, 153, 0.06))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fb923c', background: 'rgba(249, 115, 22, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 6 · BARU</span>
                  <span style={{ fontSize: '1.2rem' }}>🗾</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Dialek Daerah (方言ラボ)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Pelajari Kansai-ben (せやから, ほんまに, あかん) & Hakata-ben (ばり, 何しよーと？) via konverter dan kuis budaya!
                </p>
              </div>
              <button
                onClick={() => setActiveTab('dialect')}
                style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Jelajahi Dialek ➔
              </button>
            </div>

            {/* FASE 7: Modul Bahasa Jepang Bertahan Hidup (Seikatsu Nihongo & Birokrasi) */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.06))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#60a5fa', background: 'rgba(59, 130, 246, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 7 · BARU</span>
                  <span style={{ fontSize: '1.2rem' }}>🏛️</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Hidup di Jepang (生活日本語)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Navigasi balai kota (Jūminhyō, My Number), bank Yucho, aturan pilah sampah, hingga sewa rumah (Shikikin/Reikin).
                </p>
              </div>
              <button
                onClick={() => setActiveTab('seikatsu')}
                style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Pelajari Birokrasi ➔
              </button>
            </div>

            {/* FASE 7: Modul Bahasa Bencana & Tanggap Darurat (Bousai & Yasashii Nihongo) */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(245, 158, 11, 0.06))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#f87171', background: 'rgba(239, 68, 68, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 7 · BARU</span>
                  <span style={{ fontSize: '1.2rem' }}>🚨</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Tanggap Bencana (防災)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Simulasi alarm gempa, pemahaman siaran darurat krisis Yasashii Nihongo, dan checklist ransel evakuasi 72 jam.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('bousai')}
                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Siaga Bencana ➔
              </button>
            </div>

            {/* FASE 7: Generator & Praktik Email Bisnis Jepang (Business Mail) */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(99, 102, 241, 0.3)', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(59, 130, 246, 0.06))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#818cf8', background: 'rgba(99, 102, 241, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 7 · BARU</span>
                  <span style={{ fontSize: '1.2rem' }}>✉️</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Email Bisnis (ビジネスメール)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Generator template resmi izin sakit, jadwal rapat, kirim dokumen lampiran, lengkap dengan frasa baku Keigo etiket kantor.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('businessemail')}
                style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Buat Email Bisnis ➔
              </button>
            </div>

            {/* FASE 7: Ensiklopedia Peribahasa 4 Karakter (Yojijukugo Master) */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(217, 119, 6, 0.3)', background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.1), rgba(180, 83, 9, 0.06))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fbbf24', background: 'rgba(217, 119, 6, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 7 · BARU</span>
                  <span style={{ fontSize: '1.2rem' }}>🀄</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Peribahasa 4 Kanji (四字熟語)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Pelajari mutiara filosofi Jepang (一期一会, 十人十色, 臨機応変, 試行錯誤) dengan bedah kanji dan puzzle interaktif.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('yojijukugo')}
                style={{ background: 'linear-gradient(135deg, #d97706, #b45309)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Kuasai Peribahasa ➔
              </button>
            </div>

            {/* FASE 7: Mode Percakapan Komik (Manga Dialogue Reader) */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(236, 72, 153, 0.3)', background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(99, 102, 241, 0.06))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#f472b6', background: 'rgba(236, 72, 153, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 7 · BARU</span>
                  <span style={{ fontSize: '1.2rem' }}>💬</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Komik Manga (マンガ対話)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Komik strip 4-panel (4コマ) interaktif: pelajari partikel afektif (ね, よ, さ, ぞ, ぜ, わ) dan bahasa gaul pemuda (ヤバい, ワンチャン, 草).
                </p>
              </div>
              <button
                onClick={() => setActiveTab('manga')}
                style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Baca Komik Manga ➔
              </button>
            </div>

            {/* FASE 8: Mode Gamifikasi - JLPT RPG Dungeon Boss Battle */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(168, 85, 247, 0.06))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#f87171', background: 'rgba(239, 68, 68, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 8 · GAMIFIKASI</span>
                  <span style={{ fontSize: '1.2rem' }}>⚔️</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  RPG Dungeon: Boss Battle (ダンジョン)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Pertarungan turn-based retro melawan bos kanji & grammar. Jawab cepat (&lt;3s) untuk memicu Critical Strike!
                </p>
              </div>
              <button
                onClick={() => setActiveTab('rpg')}
                style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Masuki Dungeon ➔
              </button>
            </div>

            {/* FASE 8: SushiDA IME Typing Drill */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(99, 102, 241, 0.3)', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.06))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#818cf8', background: 'rgba(99, 102, 241, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 8 · MOTORIK</span>
                  <span style={{ fontSize: '1.2rem' }}>⌨️</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Latihan Mengetik IME (寿司打風)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Latih kecepatan mengetik romaji dan konversi kanji Jepang bergaya SushiDA dengan metrik WPM, CPM, dan kombo.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('typing')}
                style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Uji Ketikan IME ➔
              </button>
            </div>

            {/* FASE 8: Jurnal 1 Kalimat & Rasio Teks */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(16, 185, 129, 0.3)', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.06))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#34d399', background: 'rgba(16, 185, 129, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 8 · HABIT</span>
                  <span style={{ fontSize: '1.2rem' }}>📖</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Jurnal 1 Kalimat (一行日記)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Tantangan menulis harian mikro dengan analisis real-time rasio teks alami Jepang (30% Kanji : 65% Kana : 5% Katakana).
                </p>
              </div>
              <button
                onClick={() => setActiveTab('journal')}
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Tulis Jurnal Hari Ini ➔
              </button>
            </div>

            {/* FASE 8: Scanner Kanji Kamera / OCR */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(168, 85, 247, 0.3)', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(99, 102, 241, 0.06))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#c084fc', background: 'rgba(168, 85, 247, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 8 · OCR LENSA</span>
                  <span style={{ fontSize: '1.2rem' }}>📷</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Scanner Kanji Kamera & Menu (OCR)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Pindai foto menu izakaya, papan arah stasiun, dan rambu jalan nyata Jepang dengan furigana interaktif & simpan ke SRS!
                </p>
              </div>
              <button
                onClick={() => setActiveTab('scanner')}
                style={{ background: 'linear-gradient(135deg, #a855f7, #7e22ce)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Pindai Foto / Tanda Jalan ➔
              </button>
            </div>

            {/* FASE 8: P2P Quiz Duel WebRTC */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(245, 158, 11, 0.3)', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(239, 68, 68, 0.06))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fbbf24', background: 'rgba(245, 158, 11, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 8 · P2P DUEL</span>
                  <span style={{ fontSize: '1.2rem' }}>⚡</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  P2P Quiz Duel 1v1 (WebRTC)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Duel adu cepat 10 soal serverless browser-to-browser via WebRTC atau tanding instan melawan AI Shadow Rival Kenji.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('p2pduel')}
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Mulai Duel 1v1 ➔
              </button>
            </div>

            {/* FASE 8: Tes Adaptif Penempatan Level CAT */}
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem', border: '1px solid rgba(20, 184, 166, 0.3)', background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(59, 130, 246, 0.06))' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#2dd4bf', background: 'rgba(20, 184, 166, 0.2)', padding: '2px 6px', borderRadius: '8px' }}>FASE 8 · CAT DIAGNOSTIK</span>
                  <span style={{ fontSize: '1.2rem' }}>🎯</span>
                </div>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                  Tes Penempatan Adaptif (CAT)
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Tes diagnostik cerdas yang menyesuaikan tingkat kesulitan soal secara otomatis untuk menemukan level awal belajar Anda (N5 - N1).
                </p>
              </div>
              <button
                onClick={() => setActiveTab('placement')}
                style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Ikuti Tes Diagnostik ➔
              </button>
            </div>
          </div>

          {/* FASE 8: WEB PUSH HABIT ALARM (STREAK NOTIFICATION) */}
          <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid rgba(245, 158, 11, 0.25)', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(239, 68, 68, 0.04))' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.4rem' }}>🔔</span>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#f8fafc', fontWeight: 700 }}>
                    Alarm Pengingat Streak Belajar (Web Push Habit Alarm)
                  </h3>
                </div>
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
                  Terima notifikasi otomatis sebelum pukul 23:59 agar streak belajar harian Anda tidak pernah terputus.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.2)', padding: '6px 12px', borderRadius: '10px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Waktu Alarm:</span>
                  <input
                    type="time"
                    value={habitAlarm.targetTime}
                    onChange={(e) => {
                      const next = { ...habitAlarm, targetTime: e.target.value };
                      setHabitAlarm(next);
                      saveHabitAlarmConfig(next);
                    }}
                    style={{ background: 'transparent', border: 'none', color: '#fbbf24', fontWeight: 700, fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>

                <button
                  onClick={handleToggleHabitAlarm}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    border: 'none',
                    background: habitAlarm.enabled ? '#10b981' : 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {habitAlarm.enabled
                    ? '✓ Alarm Aktif'
                    : notificationPerm === 'denied'
                    ? 'Izin Notifikasi Diblokir'
                    : 'Aktifkan Alarm'}
                </button>

                {habitAlarm.enabled && (
                  <button
                    onClick={handleTestNotification}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(245, 158, 11, 0.4)',
                      background: 'transparent',
                      color: '#fbbf24',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    {testAlarmSent ? '✓ Notifikasi Terkirim!' : '🔔 Uji Coba'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* FASE 8: FSRS v4 ENGINE & GITHUB-STYLE ACTIVITY HEATMAP */}
          <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid rgba(99, 102, 241, 0.25)', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(16, 185, 129, 0.04))' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.4rem' }}>🧠</span>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#f8fafc', fontWeight: 700 }}>
                    Mesin SRS Adaptif & Peta Kontribusi Belajar (Activity Heatmap)
                  </h3>
                </div>
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
                  Pilih antara algoritma SM-2 klasik atau FSRS v4 modern (Difficulty, Stability, & Target Retrievability).
                </p>
              </div>

              {/* Engine Switcher */}
              <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '10px' }}>
                <button
                  onClick={() => handleToggleSrsEngine('sm2')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    background: srsEngine === 'sm2' ? '#6366f1' : 'transparent',
                    color: srsEngine === 'sm2' ? '#fff' : '#94a3b8',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  SM-2 Klasik
                </button>
                <button
                  onClick={() => handleToggleSrsEngine('fsrs')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    background: srsEngine === 'fsrs' ? '#10b981' : 'transparent',
                    color: srsEngine === 'fsrs' ? '#fff' : '#94a3b8',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  FSRS v4 (Modern)
                </button>
              </div>
            </div>

            {/* GitHub-style Heatmap Grid (Past 84 Days / 12 Weeks) */}
            <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#cbd5e1' }}>
                  Peta Aktivitas Ulasan Belajar (12 Minggu Terakhir):
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: '#94a3b8' }}>
                  <span>Sedikit</span>
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(255,255,255,0.06)' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(16, 185, 129, 0.3)' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(16, 185, 129, 0.6)' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#10b981' }} />
                  <span>Banyak</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(13px, 1fr))', gap: '5px' }}>
                {getActivityHeatmapData(84).map((day, idx) => {
                  let bg = 'rgba(255,255,255,0.06)';
                  if (day.count >= 15) bg = '#10b981';
                  else if (day.count >= 8) bg = 'rgba(16, 185, 129, 0.65)';
                  else if (day.count >= 1) bg = 'rgba(16, 185, 129, 0.35)';

                  return (
                    <div
                      key={idx}
                      title={`${day.date}: ${day.count} kartu diulas`}
                      style={{
                        aspectRatio: '1/1',
                        borderRadius: '3px',
                        background: bg,
                        cursor: 'pointer',
                        transition: 'transform 0.15s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.25)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* CADANGAN & PEMULIHAN DATA (INDEXEDDB + JSON) */}
          <div className="glass-panel backup-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  💾 Pusat Data & Cadangan Progres
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--accent-emerald)',
                    background: 'rgba(16, 185, 129, 0.12)',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontWeight: '600'
                  }}>
                    ● IndexedDB Aktif & Terlindungi
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <PWAInstallPrompt />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Furigana:</span>
                  <FuriganaModeSelector compact />
                </div>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5', margin: 0 }}>
              Progres kartu SRS, bookmark, dan statistik belajar Anda otomatis disinkronkan ke IndexedDB browser lokal.
              Anda juga dapat mengekspor atau memulihkan data melalui file <code style={{ color: 'var(--accent-cyan)' }}>.json</code> untuk dipindahkan ke perangkat lain.
            </p>

            {backupStatus && (
              <div style={{
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                fontSize: '0.85rem',
                background: backupStatus.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                color: backupStatus.type === 'success' ? '#6ee7b7' : '#fda4af',
                border: `1px solid ${backupStatus.type === 'success' ? 'var(--accent-emerald)' : 'var(--accent-rose)'}`
              }}>
                {backupStatus.message}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
              <button
                type="button"
                className="filter-btn"
                onClick={exportBackupJson}
                style={{
                  background: 'rgba(139, 92, 246, 0.15)',
                  borderColor: 'rgba(139, 92, 246, 0.4)',
                  color: '#c4b5fd',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                📥 Unduh Cadangan (.json)
              </button>

              <button
                type="button"
                className="filter-btn"
                disabled={isImporting}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  background: 'rgba(6, 182, 212, 0.15)',
                  borderColor: 'rgba(6, 182, 212, 0.4)',
                  color: 'var(--accent-cyan)',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {isImporting ? '⏳ Memulihkan...' : '📤 Pulihkan dari Berkas (.json)'}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileRestore}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </div>

        {/* Sidebar Panel - Checklist and Progress Ring */}
        <div className="dashboard-side flex-col" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Circular Progress */}
          <div className="glass-panel progress-container">
            <div className="progress-ring-wrapper">
              <svg className="circle-svg">
                <defs>
                  <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--accent-primary)" />
                    <stop offset="100%" stopColor="var(--accent-cyan)" />
                  </linearGradient>
                </defs>
                <circle className="circle-bg" cx="75" cy="75" r={radius} />
                <circle 
                  className="circle-progress" 
                  cx="75" 
                  cy="75" 
                  r={radius} 
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
              <div className="progress-text">
                <span className="progress-percent">{percent}%</span>
                <span className="progress-label">Harian</span>
              </div>
            </div>
            <h3 style={{ marginTop: '1.2rem', fontSize: '1.1rem', fontWeight: '600' }}>Target Belajar Hari Ini</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem', textAlign: 'center' }}>
              Selesaikan tugas belajar di bawah untuk melengkapi progres Anda.
            </p>
          </div>

          {/* Daily Checklist */}
          <div className="glass-panel checklist-container">
            <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              Tugas Belajar Harian
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '-0.5rem', marginBottom: '1rem' }}>
              Otomatis tercentang berdasarkan aktivitas belajar Anda yang sesungguhnya.
            </p>
            
            <div className="checklist-item">
              <div 
                className={`checkbox-custom ${checklist.vocab ? 'checked' : ''}`}
                role="status"
                aria-label={`Pelajari 5 Kosakata ${currentLevel}: ${checklist.vocab ? 'selesai' : 'belum selesai'}`}
              >
                {checklist.vocab && '✓'}
              </div>
              <span className={`checklist-text ${checklist.vocab ? 'completed' : ''}`}>
                Pelajari 5 Kosakata {currentLevel}
              </span>
            </div>

            <div className="checklist-item">
              <div 
                className={`checkbox-custom ${checklist.grammar ? 'checked' : ''}`}
                role="status"
                aria-label={`Baca 1 Pola Tata Bahasa ${currentLevel}: ${checklist.grammar ? 'selesai' : 'belum selesai'}`}
              >
                {checklist.grammar && '✓'}
              </div>
              <span className={`checklist-text ${checklist.grammar ? 'completed' : ''}`}>
                Baca 1 Pola Tata Bahasa {currentLevel}
              </span>
            </div>

            <div className="checklist-item">
              <div 
                className={`checkbox-custom ${checklist.quiz ? 'checked' : ''}`}
                role="status"
                aria-label={`Ikuti 1 Latihan Kuis: ${checklist.quiz ? 'selesai' : 'belum selesai'}`}
              >
                {checklist.quiz && '✓'}
              </div>
              <span className={`checklist-text ${checklist.quiz ? 'completed' : ''}`}>
                Ikuti 1 Latihan Kuis
              </span>
            </div>

            {percent === 100 && (
              <div style={{
                marginTop: '1.5rem',
                padding: '0.85rem',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '10px',
                textAlign: 'center',
                color: '#a7f3d0',
                fontSize: '0.9rem',
                fontWeight: '600',
                animation: 'pulse-fire 1.5s infinite alternate'
              }}>
                🎉 Selamat! Target Belajar Hari Ini Selesai!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
