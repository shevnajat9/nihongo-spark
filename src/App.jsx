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

const NAV_SECTIONS = [
  {
    title: 'Pembelajaran Inti',
    icon: '📚',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { id: 'kana', label: 'Huruf Kana', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
      { id: 'kana-practice', label: 'Coretan Kana ✍️', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
      { id: 'vocab', label: 'Kosakata (Mojigoi)', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
      { id: 'kanji', label: 'Kanji', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
      { id: 'grammar', label: 'Tata Bahasa', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
      { id: 'jidoushi', label: 'Transitif vs Intransitif', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
      { id: 'counters', label: 'Satuan Hitung (助数詞)', icon: 'M7 20l4-16m2 16l4-16M6 9h14M4 15h14' }
    ]
  },
  {
    title: 'Ujian & Latihan',
    icon: '🎯',
    items: [
      { id: 'quiz', label: 'Latihan Kuis', icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 13a4 4 0 100-8 4 4 0 000 8z' },
      { id: 'jlpt', label: 'Latihan JLPT', icon: 'M5 21V3m0 2h14l-3 4 3 4H5' },
      { id: 'placement', label: 'Tes Adaptif CAT', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
      { id: 'starsentence', label: 'Susun Bintang (星文)', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
      { id: 'cloze', label: 'Cloze Drill (穴埋め)', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
      { id: 'ruiji', label: 'Jebakan Kanji Mirip', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' }
    ]
  },
  {
    title: 'Game & Interaktif',
    icon: '🎮',
    items: [
      { id: 'rpg', label: 'RPG Dungeon Boss', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
      { id: 'typing', label: 'Latihan Mengetik (寿司打)', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
      { id: 'p2pduel', label: 'P2P Quiz Duel (1v1)', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
      { id: 'manga', label: 'Komik Manga (マンガ)', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' },
      { id: 'journal', label: 'Jurnal 1 Kalimat', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' }
    ]
  },
  {
    title: 'Audio & Percakapan',
    icon: '🗣️',
    items: [
      { id: 'shadowing', label: 'Latihan Shadowing', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z' },
      { id: 'speechcoach', label: 'Pelatih Pengucapan', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z' },
      { id: 'nuance', label: 'Nuansa & Onomatope', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
      { id: 'casual', label: 'Kontraksi Kasual', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
      { id: 'dialect', label: 'Dialek Daerah (方言)', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
      { id: 'keigo', label: 'Keigo & Wawancara', icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z' }
    ]
  },
  {
    title: 'Praktis & Kehidupan',
    icon: '💼',
    items: [
      { id: 'tokutei', label: 'Kerja SSW (特定技能)', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
      { id: 'businessemail', label: 'Email Bisnis', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
      { id: 'seikatsu', label: 'Hidup di Jepang (生活)', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
      { id: 'bousai', label: 'Tanggap Bencana (防災)', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
      { id: 'yojijukugo', label: 'Peribahasa (四字熟語)', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
      { id: 'tadoku', label: 'Bacaan Bertingkat (多読)', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' }
    ]
  },
  {
    title: 'Alat Bantu & AI',
    icon: '🛠️',
    items: [
      { id: 'sensei', label: 'AI Sensei Tutor', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
      { id: 'scanner', label: 'Scanner OCR Kamera', icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' },
      { id: 'canvas', label: 'Tulis Kanji (書道)', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
      { id: 'zen', label: 'Mode Zen (禅)', icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' },
      { id: 'customdecks', label: 'Kartu Anki (単語帳)', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
      { id: 'pitch', label: 'Pitch Accent Lab', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
      { id: 'collocations', label: 'Kamus Kolokasi', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
      { id: 'grammarmatrix', label: 'Matriks Tata Bahasa', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
      { id: 'jukugotree', label: 'Pohon Jukugo (熟語)', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
      { id: 'syntax', label: 'Visual Syntax Parser', icon: 'M4 6h16M4 12h16M4 18h7' }
    ]
  }
];

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

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Close mobile drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileDrawerOpen]);

  return (
    <div className="app-container">
      
      {/* ========================================================
          MOBILE & TABLET TOP HEADER BAR (Visible < 1024px)
         ======================================================== */}
      <header className="mobile-header">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => { setActiveTab('dashboard'); setIsMobileDrawerOpen(false); }}
        >
          <div className="logo-icon-sm">Spark</div>
          <span className="font-extrabold text-sm sm:text-base text-gradient tracking-wide">
            Nihongo Spark
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick JLPT Level Cycle Pill */}
          <button
            onClick={() => {
              const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
              const nextIdx = (levels.indexOf(currentLevel) + 1) % levels.length;
              handleLevelChange(levels[nextIdx]);
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/50 text-[11px] font-black text-purple-200 active:scale-95 transition"
            title="Ketuk untuk beralih level JLPT"
          >
            <span className="text-[9px] text-purple-400">JLPT</span>
            <span className="text-cyan-300 font-bold">{currentLevel}</span>
          </button>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileDrawerOpen((prev) => !prev)}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/15 active:bg-white/20 flex items-center justify-center text-white border border-white/10 transition"
            aria-label="Buka menu navigasi"
          >
            <svg fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* ========================================================
          MOBILE NAVIGATION DRAWER & BACKDROP (< 1024px)
         ======================================================== */}
      <div 
        className={`mobile-drawer-backdrop ${isMobileDrawerOpen ? 'open' : ''}`}
        onClick={() => setIsMobileDrawerOpen(false)}
      />

      <aside className={`mobile-drawer ${isMobileDrawerOpen ? 'open' : ''}`}>
        {/* Drawer Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="logo-icon-sm">Spark</div>
            <span className="font-extrabold text-base text-gradient">Nihongo Spark</span>
          </div>
          <button
            onClick={() => setIsMobileDrawerOpen(false)}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition"
            aria-label="Tutup menu"
          >
            ✕
          </button>
        </div>

        {/* JLPT Level Picker in Drawer */}
        <div className="p-4 border-b border-white/10 bg-black/20">
          <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">
            Pilih Tingkat JLPT Aktif
          </div>
          <div className="flex gap-1.5">
            {['N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => handleLevelChange(lvl)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-black transition-all ${
                  currentLevel === lvl
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Categorized Drawer Navigation */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {NAV_SECTIONS.map((sec, secIdx) => (
            <div key={secIdx}>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider px-3 py-1 flex items-center gap-1.5">
                <span>{sec.icon}</span>
                <span>{sec.title}</span>
              </div>
              <div className="space-y-0.5 mt-1">
                {sec.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileDrawerOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                        isActive
                          ? 'bg-purple-600/30 text-white font-bold border-l-4 border-purple-500 shadow-sm'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 shrink-0 text-purple-400">
                        <path d={item.icon} />
                      </svg>
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="p-3 border-t border-white/10 text-center text-[10px] text-gray-500">
          Nihongo Spark Pro · JLPT N5-N1
        </div>
      </aside>

      {/* ========================================================
          DESKTOP SIDEBAR (Visible >= 1024px)
         ======================================================== */}
      <aside className="sidebar">
        <div className="logo" onClick={() => setActiveTab('dashboard')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">Spark</div>
          <span className="text-gradient">Nihongo Spark</span>
        </div>
        
        <nav style={{ flex: 1, overflowY: 'auto', paddingRight: '0.25rem' }}>
          <div className="space-y-4">
            {NAV_SECTIONS.map((sec, secIdx) => (
              <div key={secIdx}>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider px-3 py-1 flex items-center gap-1.5">
                  <span>{sec.icon}</span>
                  <span>{sec.title}</span>
                </div>
                <ul className="nav-links mt-1 space-y-0.5" style={{ listStyle: 'none', padding: 0 }}>
                  {sec.items.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          className={`nav-item ${isActive ? 'active' : ''}`}
                          onClick={() => setActiveTab(item.id)}
                          style={{
                            background: isActive ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                            border: 'none',
                            width: '100%',
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.6rem 0.9rem',
                            borderRadius: '10px',
                            color: isActive ? '#ffffff' : 'var(--text-secondary)',
                            fontWeight: isActive ? 700 : 500,
                            fontSize: '0.82rem',
                            cursor: 'pointer'
                          }}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                            <path d={item.icon} />
                          </svg>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {item.label}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Didukung Oleh:</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Nihongo Sensei Pro</div>
        </div>
      </aside>

      {/* ========================================================
          MOBILE BOTTOM NAVIGATION (5 Ergonomic Thumb Buttons < 768px)
         ======================================================== */}
      <nav className="mobile-bottom-nav">
        <button 
          className={`bottom-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => { setActiveTab('dashboard'); setIsMobileDrawerOpen(false); }}
          aria-label="Dashboard"
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Home</span>
        </button>

        <button 
          className={`bottom-nav-item ${activeTab === 'kana' || activeTab === 'kana-practice' ? 'active' : ''}`}
          onClick={() => { setActiveTab('kana'); setIsMobileDrawerOpen(false); }}
          aria-label="Huruf Kana"
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span>Kana</span>
        </button>

        <button 
          className={`bottom-nav-item ${activeTab === 'vocab' ? 'active' : ''}`}
          onClick={() => { setActiveTab('vocab'); setIsMobileDrawerOpen(false); }}
          aria-label="Kosakata"
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span>Kosakata</span>
        </button>

        <button 
          className={`bottom-nav-item ${activeTab === 'kanji' ? 'active' : ''}`}
          onClick={() => { setActiveTab('kanji'); setIsMobileDrawerOpen(false); }}
          aria-label="Kanji"
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <span>Kanji</span>
        </button>

        <button 
          className={`bottom-nav-item ${isMobileDrawerOpen ? 'active' : ''}`}
          onClick={() => setIsMobileDrawerOpen((prev) => !prev)}
          aria-label="Semua Menu"
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span>Menu</span>
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
