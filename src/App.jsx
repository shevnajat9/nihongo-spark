import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import KanaChart from './components/KanaChart';
import VocabStudy from './components/VocabStudy';
import KanjiStudy from './components/KanjiStudy';
import GrammarStudy from './components/GrammarStudy';
import Quiz from './components/Quiz';
import JLPTTest from './components/JLPTTest';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentLevel, setCurrentLevel] = useState('N5');
  const [studyStats, setStudyStats] = useState({
    streak: 0,
    lastStudyDate: '',
    totalQuizzes: 0,
    history: [],
    todayChecklist: { vocab: false, grammar: false, quiz: false }
  });

  // Load level and statistics on mount
  useEffect(() => {
    const savedLevel = localStorage.getItem('nihongo_spark_level');
    if (savedLevel) {
      setCurrentLevel(savedLevel);
    }

    const savedStats = localStorage.getItem('nihongo_spark_stats');
    if (savedStats) {
      setStudyStats(JSON.parse(savedStats));
    } else {
      // Initialize if empty
      localStorage.setItem('nihongo_spark_stats', JSON.stringify(studyStats));
    }
  }, []);

  // Save level to localStorage on change
  const handleLevelChange = (level) => {
    setCurrentLevel(level);
    localStorage.setItem('nihongo_spark_level', level);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            currentLevel={currentLevel} 
            setCurrentLevel={handleLevelChange} 
            studyStats={studyStats}
            setStudyStats={setStudyStats}
            setActiveTab={setActiveTab}
          />
        );
      case 'kana':
        return <KanaChart />;
      case 'vocab':
        return (
          <VocabStudy 
            currentLevel={currentLevel} 
            studyStats={studyStats}
            setStudyStats={setStudyStats}
          />
        );
      case 'kanji':
        return <KanjiStudy currentLevel={currentLevel} />;
      case 'grammar':
        return (
          <GrammarStudy 
            currentLevel={currentLevel} 
            studyStats={studyStats}
            setStudyStats={setStudyStats}
          />
        );
      case 'quiz':
        return (
          <Quiz 
            currentLevel={currentLevel} 
            studyStats={studyStats}
            setStudyStats={setStudyStats}
          />
        );
      case 'jlpt':
        return (
          <JLPTTest 
            currentLevel={currentLevel} 
            studyStats={studyStats}
            setStudyStats={setStudyStats}
          />
        );
      default:
        return (
          <Dashboard 
            currentLevel={currentLevel} 
            setCurrentLevel={handleLevelChange} 
            studyStats={studyStats}
            setStudyStats={setStudyStats}
            setActiveTab={setActiveTab}
          />
        );
    }
  };

  return (
    <div className="app-container">
      
      {/* DESKTOP SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">Spark</div>
          <span className="text-gradient">Nihongo Spark</span>
        </div>
        
        <nav style={{ flex: 1 }}>
          <ul className="nav-links">
            <li>
              <button 
                className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'dashboard' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'kana' ? 'active' : ''}`}
                onClick={() => setActiveTab('kana')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'kana' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Huruf Kana
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'vocab' ? 'active' : ''}`}
                onClick={() => setActiveTab('vocab')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'vocab' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Kosakata (Mojigoi)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'kanji' ? 'active' : ''}`}
                onClick={() => setActiveTab('kanji')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'kanji' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Kanji
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'grammar' ? 'active' : ''}`}
                onClick={() => setActiveTab('grammar')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'grammar' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Tata Bahasa
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'quiz' ? 'active' : ''}`}
                onClick={() => setActiveTab('quiz')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'quiz' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 13a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
                Latihan Kuis
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'jlpt' ? 'active' : ''}`}
                onClick={() => setActiveTab('jlpt')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'jlpt' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 21V3m0 2h14l-3 4 3 4H5" />
                </svg>
                Latihan JLPT
              </button>
            </li>
          </ul>
        </nav>

        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Didukung Oleh:</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Nihongo Sensei Pro</div>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="mobile-nav">
        <button 
          className={`mobile-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
          aria-current={activeTab === 'dashboard' ? 'page' : undefined}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Home
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'kana' ? 'active' : ''}`}
          onClick={() => setActiveTab('kana')}
          aria-current={activeTab === 'kana' ? 'page' : undefined}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Kana
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'vocab' ? 'active' : ''}`}
          onClick={() => setActiveTab('vocab')}
          aria-current={activeTab === 'vocab' ? 'page' : undefined}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Vocab
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'kanji' ? 'active' : ''}`}
          onClick={() => setActiveTab('kanji')}
          aria-current={activeTab === 'kanji' ? 'page' : undefined}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Kanji
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'grammar' ? 'active' : ''}`}
          onClick={() => setActiveTab('grammar')}
          aria-current={activeTab === 'grammar' ? 'page' : undefined}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Grammar
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
          aria-current={activeTab === 'quiz' ? 'page' : undefined}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 13a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
          Quiz
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'jlpt' ? 'active' : ''}`}
          onClick={() => setActiveTab('jlpt')}
          aria-current={activeTab === 'jlpt' ? 'page' : undefined}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 21V3m0 2h14l-3 4 3 4H5" />
          </svg>
          JLPT
        </button>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        {renderActiveComponent()}
      </main>

    </div>
  );
}
