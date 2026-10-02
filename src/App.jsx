import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import KanaChart from './components/KanaChart';
import VocabStudy from './components/VocabStudy';
import KanjiStudy from './components/KanjiStudy';
import GrammarStudy from './components/GrammarStudy';
import Quiz from './components/Quiz';
import JLPTTest from './components/JLPTTest';
import JidoushiStudy from './components/JidoushiStudy';
import ShadowingPlayer from './components/ShadowingPlayer';
import CounterStudy from './components/CounterStudy';
import HoverDictionary from './components/HoverDictionary';
import TadokuReader from './components/TadokuReader';
import TokuteiStudy from './components/TokuteiStudy';
import KeigoStudy from './components/KeigoStudy';
import NuanceStudy from './components/NuanceStudy';
import SyntaxParserViewer from './components/SyntaxParserViewer';
import KanjiCanvasRecognition from './components/KanjiCanvasRecognition';
import PitchAccentLab from './components/PitchAccentLab';
import SenseiAITutor from './components/SenseiAITutor';
import ZenStudyMode from './components/ZenStudyMode';
import CustomDeckManager from './components/CustomDeckManager';
import RuijiKanjiStudy from './components/RuijiKanjiStudy';
import StarSentenceQuiz from './components/StarSentenceQuiz';
import CollocationStudy from './components/CollocationStudy';
import GrammarMatrix from './components/GrammarMatrix';
import JukugoTreeViewer from './components/JukugoTreeViewer';
import ClozeSentenceDrill from './components/ClozeSentenceDrill';
import SpeechCoach from './components/SpeechCoach';
import CasualSpeechLab from './components/CasualSpeechLab';
import DialectLab from './components/DialectLab';
import SeikatsuStudy from './components/SeikatsuStudy';
import BousaiStudy from './components/BousaiStudy';
import BusinessEmailBuilder from './components/BusinessEmailBuilder';
import YojijukugoStudy from './components/YojijukugoStudy';
import MangaReader from './components/MangaReader';
import RPGDungeonGame from './components/RPGDungeonGame';
import IMETypingGame from './components/IMETypingGame';
import DailyJournal from './components/DailyJournal';
import CameraKanjiScanner from './components/CameraKanjiScanner';
import P2PQuizDuel from './components/P2PQuizDuel';
import PlacementTest from './components/PlacementTest';
import KanaStrokePractice from './components/KanaStrokePractice';
import { autoRestoreIfEmpty } from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentLevel, setCurrentLevel] = useState(() => {
    return localStorage.getItem('nihongo_spark_level') || 'N5';
  });
  const [studyStats, setStudyStats] = useState(() => {
    const saved = localStorage.getItem('nihongo_spark_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    const defaultStats = {
      streak: 0,
      lastStudyDate: '',
      totalQuizzes: 0,
      history: [],
      todayChecklist: { vocab: false, grammar: false, quiz: false }
    };
    localStorage.setItem('nihongo_spark_stats', JSON.stringify(defaultStats));
    return defaultStats;
  });

  // Auto-restore and reactive listener for external data restore
  useEffect(() => {
    autoRestoreIfEmpty();

    const handleDataRestored = () => {
      const refreshedLevel = localStorage.getItem('nihongo_spark_level');
      if (refreshedLevel) setCurrentLevel(refreshedLevel);
      const refreshedStats = localStorage.getItem('nihongo_spark_stats');
      if (refreshedStats) {
        try {
          setStudyStats(JSON.parse(refreshedStats));
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('nihongo-spark-data-restored', handleDataRestored);
    return () => window.removeEventListener('nihongo-spark-data-restored', handleDataRestored);
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
      case 'kana-practice':
        return <KanaStrokePractice onBackToChart={() => setActiveTab('kana')} />;
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
      case 'jidoushi':
        return <JidoushiStudy currentLevel={currentLevel} />;
      case 'shadowing':
        return <ShadowingPlayer currentLevel={currentLevel} />;
      case 'counters':
        return <CounterStudy />;
      case 'tadoku':
        return <TadokuReader currentLevel={currentLevel} />;
      case 'tokutei':
        return <TokuteiStudy />;
      case 'keigo':
        return <KeigoStudy />;
      case 'nuance':
        return <NuanceStudy />;
      case 'syntax':
        return <SyntaxParserViewer />;
      case 'canvas':
        return <KanjiCanvasRecognition />;
      case 'pitch':
        return <PitchAccentLab />;
      case 'sensei':
        return <SenseiAITutor />;
      case 'zen':
        return <ZenStudyMode />;
      case 'customdecks':
        return <CustomDeckManager />;
      case 'ruiji':
        return <RuijiKanjiStudy />;
      case 'starsentence':
        return <StarSentenceQuiz />;
      case 'collocations':
        return <CollocationStudy />;
      case 'grammarmatrix':
        return <GrammarMatrix />;
      case 'jukugotree':
        return <JukugoTreeViewer />;
      case 'cloze':
        return <ClozeSentenceDrill />;
      case 'speechcoach':
        return <SpeechCoach />;
      case 'casual':
        return <CasualSpeechLab />;
      case 'dialect':
        return <DialectLab />;
      case 'seikatsu':
        return <SeikatsuStudy />;
      case 'bousai':
        return <BousaiStudy />;
      case 'businessemail':
        return <BusinessEmailBuilder />;
      case 'yojijukugo':
        return <YojijukugoStudy />;
      case 'manga':
        return <MangaReader />;
      case 'rpg':
        return <RPGDungeonGame onBack={() => setActiveTab('dashboard')} />;
      case 'typing':
        return <IMETypingGame onBack={() => setActiveTab('dashboard')} />;
      case 'journal':
        return <DailyJournal onBack={() => setActiveTab('dashboard')} />;
      case 'scanner':
        return <CameraKanjiScanner onBack={() => setActiveTab('dashboard')} />;
      case 'p2pduel':
        return <P2PQuizDuel onBack={() => setActiveTab('dashboard')} />;
      case 'placement':
        return <PlacementTest onBack={() => setActiveTab('dashboard')} onNavigateToModule={(tab) => setActiveTab(tab)} />;
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
                className={`nav-item ${activeTab === 'kana-practice' ? 'active' : ''}`}
                onClick={() => setActiveTab('kana-practice')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'kana-practice' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Coretan Kana ✍️
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
            <li>
              <button 
                className={`nav-item ${activeTab === 'jidoushi' ? 'active' : ''}`}
                onClick={() => setActiveTab('jidoushi')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'jidoushi' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Transitif vs Intransitif
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'shadowing' ? 'active' : ''}`}
                onClick={() => setActiveTab('shadowing')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'shadowing' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
                Latihan Shadowing
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'counters' ? 'active' : ''}`}
                onClick={() => setActiveTab('counters')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'counters' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                Satuan Hitung (助数詞)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'tadoku' ? 'active' : ''}`}
                onClick={() => setActiveTab('tadoku')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'tadoku' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Bacaan Bertingkat (多読)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'tokutei' ? 'active' : ''}`}
                onClick={() => setActiveTab('tokutei')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'tokutei' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Bahasa Jepang Kerja (SSW)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'keigo' ? 'active' : ''}`}
                onClick={() => setActiveTab('keigo')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'keigo' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
                Keigo & Wawancara (面接)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'nuance' ? 'active' : ''}`}
                onClick={() => setActiveTab('nuance')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'nuance' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Nuansa Kata & Onomatope
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'syntax' ? 'active' : ''}`}
                onClick={() => setActiveTab('syntax')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'syntax' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Visual Syntax Parser (文分解)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'canvas' ? 'active' : ''}`}
                onClick={() => setActiveTab('canvas')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'canvas' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Kanvas Tulis Kanji (書道)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'pitch' ? 'active' : ''}`}
                onClick={() => setActiveTab('pitch')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'pitch' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Visual Pitch Accent (高低)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'sensei' ? 'active' : ''}`}
                onClick={() => setActiveTab('sensei')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'sensei' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Sensei AI Tutor (AI会話)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'zen' ? 'active' : ''}`}
                onClick={() => setActiveTab('zen')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'zen' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Mode Zen Study (禅)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'customdecks' ? 'active' : ''}`}
                onClick={() => setActiveTab('customdecks')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'customdecks' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Deck Kustom & Anki (単語帳)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'ruiji' ? 'active' : ''}`}
                onClick={() => setActiveTab('ruiji')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'ruiji' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Jebakan Kanji (類似漢字)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'starsentence' ? 'active' : ''}`}
                onClick={() => setActiveTab('starsentence')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'starsentence' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Soal Bintang (★問題)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'collocations' ? 'active' : ''}`}
                onClick={() => setActiveTab('collocations')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'collocations' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Kamus Kolokasi (連語)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'grammarmatrix' ? 'active' : ''}`}
                onClick={() => setActiveTab('grammarmatrix')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'grammarmatrix' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Matriks Grammar (類似文法)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'jukugotree' ? 'active' : ''}`}
                onClick={() => setActiveTab('jukugotree')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'jukugotree' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
                Pohon Jukugo (熟語)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'cloze' ? 'active' : ''}`}
                onClick={() => setActiveTab('cloze')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'cloze' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Cloze Test (穴埋め)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'speechcoach' ? 'active' : ''}`}
                onClick={() => setActiveTab('speechcoach')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'speechcoach' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                Coach Pelafalan (発音コーチ)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'casual' ? 'active' : ''}`}
                onClick={() => setActiveTab('casual')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'casual' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Kontraksi Kasual (口語短縮形)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'dialect' ? 'active' : ''}`}
                onClick={() => setActiveTab('dialect')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'dialect' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Dialek Daerah (方言ラボ)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'seikatsu' ? 'active' : ''}`}
                onClick={() => setActiveTab('seikatsu')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'seikatsu' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Hidup di Jepang (生活日本語)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'bousai' ? 'active' : ''}`}
                onClick={() => setActiveTab('bousai')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'bousai' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Tanggap Bencana (防災)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'businessemail' ? 'active' : ''}`}
                onClick={() => setActiveTab('businessemail')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'businessemail' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Bisnis (ビジネスメール)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'yojijukugo' ? 'active' : ''}`}
                onClick={() => setActiveTab('yojijukugo')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'yojijukugo' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Peribahasa (四字熟語)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'manga' ? 'active' : ''}`}
                onClick={() => setActiveTab('manga')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'manga' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                Komik Manga (マンガ対話)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'rpg' ? 'active' : ''}`}
                onClick={() => setActiveTab('rpg')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'rpg' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                RPG Dungeon (ダンジョン)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'typing' ? 'active' : ''}`}
                onClick={() => setActiveTab('typing')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'typing' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Latihan Mengetik (寿司打)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'journal' ? 'active' : ''}`}
                onClick={() => setActiveTab('journal')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'journal' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Jurnal 1 Kalimat (一行日記)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'scanner' ? 'active' : ''}`}
                onClick={() => setActiveTab('scanner')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'scanner' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Scanner OCR (カメラ読取)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'p2pduel' ? 'active' : ''}`}
                onClick={() => setActiveTab('p2pduel')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'p2pduel' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                P2P Quiz Duel (1v1対戦)
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${activeTab === 'placement' ? 'active' : ''}`}
                onClick={() => setActiveTab('placement')}
                style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
                aria-current={activeTab === 'placement' ? 'page' : undefined}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tes Adaptif CAT (診断テスト)
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
        <button 
          className={`mobile-nav-item ${activeTab === 'jidoushi' ? 'active' : ''}`}
          onClick={() => setActiveTab('jidoushi')}
          aria-current={activeTab === 'jidoushi' ? 'page' : undefined}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          自動/他動
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'shadowing' ? 'active' : ''}`}
          onClick={() => setActiveTab('shadowing')}
          aria-current={activeTab === 'shadowing' ? 'page' : undefined}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
          </svg>
          Shadow
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'counters' ? 'active' : ''}`}
          onClick={() => setActiveTab('counters')}
          aria-current={activeTab === 'counters' ? 'page' : undefined}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
          助数詞
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'tadoku' ? 'active' : ''}`}
          onClick={() => setActiveTab('tadoku')}
          aria-current={activeTab === 'tadoku' ? 'page' : undefined}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          多読
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'tokutei' ? 'active' : ''}`}
          onClick={() => setActiveTab('tokutei')}
          aria-current={activeTab === 'tokutei' ? 'page' : undefined}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          SSW
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'keigo' ? 'active' : ''}`}
          onClick={() => setActiveTab('keigo')}
          aria-current={activeTab === 'keigo' ? 'page' : undefined}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
          敬語
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'nuance' ? 'active' : ''}`}
          onClick={() => setActiveTab('nuance')}
          aria-current={activeTab === 'nuance' ? 'page' : undefined}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          オノマトペ
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'syntax' ? 'active' : ''}`}
          onClick={() => setActiveTab('syntax')}
          aria-current={activeTab === 'syntax' ? 'page' : undefined}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          文分解
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'canvas' ? 'active' : ''}`}
          onClick={() => setActiveTab('canvas')}
          aria-current={activeTab === 'canvas' ? 'page' : undefined}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          書道
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'pitch' ? 'active' : ''}`}
          onClick={() => setActiveTab('pitch')}
          aria-current={activeTab === 'pitch' ? 'page' : undefined}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          高低
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'sensei' ? 'active' : ''}`}
          onClick={() => setActiveTab('sensei')}
          aria-current={activeTab === 'sensei' ? 'page' : undefined}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          AI Sensei
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'zen' ? 'active' : ''}`}
          onClick={() => setActiveTab('zen')}
          aria-current={activeTab === 'zen' ? 'page' : undefined}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          禅
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'customdecks' ? 'active' : ''}`}
          onClick={() => setActiveTab('customdecks')}
          aria-current={activeTab === 'customdecks' ? 'page' : undefined}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          単語帳
        </button>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        {renderActiveComponent()}
      </main>

      {/* GLOBAL HOVER / POP-UP DICTIONARY (YOMITAN STYLE) */}
      <HoverDictionary currentLevel={currentLevel} />

    </div>
  );
}
