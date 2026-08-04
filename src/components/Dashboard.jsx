import React, { useState, useEffect } from 'react';

export default function Dashboard({ 
  currentLevel, 
  setCurrentLevel, 
  studyStats, 
  setStudyStats, 
  completedTasks, 
  setCompletedTasks 
}) {
  const [checklist, setChecklist] = useState({
    vocab: false,
    grammar: false,
    quiz: false
  });

  // Calculate completion percentage
  const completedCount = Object.values(checklist).filter(Boolean).length;
  const percent = Math.round((completedCount / 3) * 100);

  // SVG Progress Ring calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  useEffect(() => {
    // Load checklist status from studyStats if exists
    const today = new Date().toDateString();
    if (studyStats.lastStudyDate === today) {
      setChecklist(studyStats.todayChecklist || { vocab: false, grammar: false, quiz: false });
    } else {
      // New day, reset checklist
      setChecklist({ vocab: false, grammar: false, quiz: false });
    }
  }, [studyStats]);

  const toggleChecklist = (key) => {
    const updated = { ...checklist, [key]: !checklist[key] };
    setChecklist(updated);

    // Save checklist back to statistics
    const today = new Date().toDateString();
    let updatedStats = { ...studyStats };

    // Update streak logic
    if (Object.values(updated).some(Boolean) && studyStats.lastStudyDate !== today) {
      // Check if last study was yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const isStreakContinued = studyStats.lastStudyDate === yesterday.toDateString();

      updatedStats.streak = isStreakContinued ? (studyStats.streak || 0) + 1 : 1;
      updatedStats.lastStudyDate = today;

      // Add to study calendar history
      const history = [...(studyStats.history || [])];
      if (!history.includes(today)) {
        history.push(today);
      }
      updatedStats.history = history;
    }

    updatedStats.todayChecklist = updated;
    setStudyStats(updatedStats);
    localStorage.setItem('nihongo_spark_stats', JSON.stringify(updatedStats));
  };

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
          {['N5', 'N4', 'N3', 'N2', 'N1'].map((level) => (
            <button
              key={level}
              className={`jlpt-btn ${currentLevel === level ? 'active' : ''}`}
              onClick={() => setCurrentLevel(level)}
            >
              {level}
            </button>
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
        </div>

        {/* Sidebar Panel - Checklist and Progress Ring */}
        <div className="dashboard-side flex-col" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Circular Progress */}
          <div className="glass-panel progress-container" style={{ position: 'relative' }}>
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
            
            <div className="checklist-item">
              <div 
                className={`checkbox-custom ${checklist.vocab ? 'checked' : ''}`}
                onClick={() => toggleChecklist('vocab')}
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
                onClick={() => toggleChecklist('grammar')}
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
                onClick={() => toggleChecklist('quiz')}
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
