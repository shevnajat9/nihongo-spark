import React, { useState, useEffect } from 'react';
const ArrowLeft = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
);
const BookOpen = ({ className = 'w-6 h-6' }) => (
  <svg className={className} width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
);
const Sparkles = ({ className = 'w-4 h-4' }) => (
  <svg className={className} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M8.757 15.243l-2.121 2.121m12.728 0l-2.121-2.121M8.757 8.757L6.636 6.636"/></svg>
);
const Calendar = ({ className = 'w-5 h-5' }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
);
const CheckCircle2 = ({ className = 'w-4 h-4' }) => (
  <svg className={className} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M9 12l2 2 4-4"/></svg>
);
const Copy = ({ className = 'w-4 h-4' }) => (
  <svg className={className} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
);
const Download = ({ className = 'w-4 h-4' }) => (
  <svg className={className} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
);
const Trash2 = ({ className = 'w-4 h-4' }) => (
  <svg className={className} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/></svg>
);
const PieChart = ({ className = 'w-4 h-4' }) => (
  <svg className={className} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z"/></svg>
);

const DAILY_PROMPTS = [
  { id: 1, theme: 'Hari ini', jp: '今日はどんな一日でしたか？', id_trans: 'Hari ini seperti apa harimu?' },
  { id: 2, theme: 'Makanan', jp: '今日食べた一番美味しかったものは何ですか？', id_trans: 'Apa makanan paling enak yang kamu makan hari ini?' },
  { id: 3, theme: 'Belajar', jp: '今日新しく覚えた日本語の言葉は何ですか？', id_trans: 'Kosakata bahasa Jepang apa yang baru kamu pelajari hari ini?' },
  { id: 4, theme: 'Cuaca & Suasana', jp: '今日の天気はどうでしたか？気分はどうですか？', id_trans: 'Bagaimana cuaca hari ini? Bagaimana perasaanmu?' },
  { id: 5, theme: 'Rasa Syukur', jp: '今日感謝したい小さな出来事は何ですか？', id_trans: 'Hal kecil apa yang ingin kamu syukuri hari ini?' },
  { id: 6, theme: 'Hobi & Hiburan', jp: '最近ハマっているアニメや映画、本は何ですか？', id_trans: 'Anime, film, atau buku apa yang sedang kamu sukai belakangan ini?' },
  { id: 7, theme: 'Rencana Besok', jp: '明日はどんな予定がありますか？', id_trans: 'Apa rencanamu untuk besok?' }
];

export default function DailyJournal({ onBack }) {
  // Load saved journals
  const [journals, setJournals] = useState(() => {
    try {
      const saved = localStorage.getItem('nihongo_spark_daily_journals');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activePromptIndex, setActivePromptIndex] = useState(() => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return dayOfYear % DAILY_PROMPTS.length;
  });

  const [sentenceInput, setSentenceInput] = useState('');
  const [translationInput, setTranslationInput] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    localStorage.setItem('nihongo_spark_daily_journals', JSON.stringify(journals));
  }, [journals]);

  const currentPrompt = DAILY_PROMPTS[activePromptIndex];

  // Character ratio analyzer
  const analyzeRatio = (text) => {
    if (!text || text.trim().length === 0) {
      return { kanji: 0, hiragana: 0, katakana: 0, others: 0, total: 0, assessment: 'Belum ada input' };
    }

    const kanjiMatches = text.match(/[\u4E00-\u9FAF\u3400-\u4DBF]/g) || [];
    const hiraganaMatches = text.match(/[\u3040-\u309F]/g) || [];
    const katakanaMatches = text.match(/[\u30A0-\u30FF]/g) || [];
    const totalJapaneseChars = kanjiMatches.length + hiraganaMatches.length + katakanaMatches.length;

    if (totalJapaneseChars === 0) {
      return { kanji: 0, hiragana: 0, katakana: 0, others: 100, total: text.length, assessment: 'Bukan karakter Jepang' };
    }

    const kanjiPct = Math.round((kanjiMatches.length / totalJapaneseChars) * 100);
    const hiraganaPct = Math.round((hiraganaMatches.length / totalJapaneseChars) * 100);
    const katakanaPct = Math.round((katakanaMatches.length / totalJapaneseChars) * 100);

    // Ideal Japanese distribution: ~30% Kanji, ~65% Hiragana, ~5% Katakana
    let assessment = 'Komposisi Seimbang & Alami ✨';
    let badgeColor = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';

    if (kanjiPct > 55) {
      assessment = 'Terlalu banyak Kanji (gaya bahasa sastra/kaku) 📜';
      badgeColor = 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
    } else if (hiraganaPct > 85) {
      assessment = 'Dominasi Hiragana (gaya anak-anak/pemula) 🧸';
      badgeColor = 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
    } else if (katakanaPct > 35) {
      assessment = 'Banyak serapan Katakana ⚡';
      badgeColor = 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300';
    }

    return {
      kanji: kanjiPct,
      hiragana: hiraganaPct,
      katakana: katakanaPct,
      totalChars: totalJapaneseChars,
      assessment,
      badgeColor
    };
  };

  const ratio = analyzeRatio(sentenceInput);

  const handleSaveEntry = (e) => {
    e.preventDefault();
    if (!sentenceInput.trim()) return;

    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      prompt: currentPrompt.jp,
      promptTrans: currentPrompt.id_trans,
      sentence: sentenceInput.trim(),
      translation: translationInput.trim(),
      stats: ratio
    };

    setJournals([newEntry, ...journals]);
    setSentenceInput('');
    setTranslationInput('');
  };

  const handleDeleteEntry = (id) => {
    setJournals(journals.filter((j) => j.id !== id));
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleExportMarkdown = () => {
    const md = `# Jurnal Harian Bahasa Jepang (一行日記)\n\n` +
      journals.map((j) => {
        const d = new Date(j.date).toLocaleDateString('id-ID', { dateStyle: 'full' });
        return `### 📅 ${d}\n- **Prompt:** ${j.prompt} (${j.promptTrans})\n- **Kalimat:** ${j.sentence}\n- **Arti:** ${j.translation || '-'}\n- **Rasio:** Kanji ${j.stats.kanji}% | Kana ${j.stats.hiragana}% | Kata ${j.stats.katakana}%\n`;
      }).join('\n---\n\n');

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ichigyou-nikki-${new Date().toISOString().slice(0, 10)}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-500" />
              <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Jurnal Harian 1 Kalimat (一行日記)
              </h1>
            </div>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Bangun konsistensi menulis harian mikro & pantau komposisi alami Kanji vs Hiragana
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {journals.length > 0 && (
            <button
              onClick={handleExportMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              title="Unduh riwayat sebagai dokumen Markdown"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              Ekspor .MD
            </button>
          )}
        </div>
      </div>

      {/* Daily Prompt Card */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-2xl p-6 shadow-md border border-emerald-800/60 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-700/60 px-2.5 py-0.5 rounded-full text-emerald-200">
              Tema Hari Ini: {currentPrompt.theme}
            </span>
            <button
              onClick={() => setActivePromptIndex((prev) => (prev + 1) % DAILY_PROMPTS.length)}
              className="text-xs text-emerald-300 hover:text-white underline font-medium"
            >
              Ganti Topik ↻
            </button>
          </div>

          <h2 className="text-xl md:text-2xl font-black text-amber-200 tracking-wide">
            {currentPrompt.jp}
          </h2>
          <p className="text-xs md:text-sm text-emerald-100">
            {currentPrompt.id_trans}
          </p>
        </div>
      </div>

      {/* Editor & Real-Time Ratio Evaluator */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm space-y-5">
        <form onSubmit={handleSaveEntry} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 block mb-1.5">
              Tulis 1 Kalimat Jepang (Gunakan Keyboard Jepang / IME)
            </label>
            <textarea
              rows={3}
              value={sentenceInput}
              onChange={(e) => setSentenceInput(e.target.value)}
              placeholder="Contoh: 今日は図書館で新しい日本語の単語をたくさん勉強しました。"
              className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium text-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 block mb-1.5">
              Arti / Catatan Bahasa Indonesia (Opsional)
            </label>
            <input
              type="text"
              value={translationInput}
              onChange={(e) => setTranslationInput(e.target.value)}
              placeholder="Hari ini saya banyak belajar kosakata bahasa Jepang baru di perpustakaan."
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Real-time Ratio Visualizer */}
          {sentenceInput.trim().length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-900/60 rounded-xl p-4 border border-gray-200 dark:border-gray-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                  <PieChart className="w-4 h-4 text-emerald-500" /> Analisis Rasio Karakter Alami
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${ratio.badgeColor}`}>
                  {ratio.assessment}
                </span>
              </div>

              {/* Progress composition bar */}
              <div className="w-full h-3 rounded-full overflow-hidden flex bg-gray-200 dark:bg-gray-700">
                <div style={{ width: `${ratio.kanji}%` }} className="bg-red-500" title={`Kanji: ${ratio.kanji}%`} />
                <div style={{ width: `${ratio.hiragana}%` }} className="bg-emerald-500" title={`Hiragana: ${ratio.hiragana}%`} />
                <div style={{ width: `${ratio.katakana}%` }} className="bg-blue-500" title={`Katakana: ${ratio.katakana}%`} />
              </div>

              {/* Composition Legend */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300">
                  <span className="font-extrabold text-sm block">{ratio.kanji}%</span>
                  <span className="text-[10px]">Kanji (Ideal: ~30%)</span>
                </div>
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
                  <span className="font-extrabold text-sm block">{ratio.hiragana}%</span>
                  <span className="text-[10px]">Hiragana (Ideal: ~65%)</span>
                </div>
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">
                  <span className="font-extrabold text-sm block">{ratio.katakana}%</span>
                  <span className="text-[10px]">Katakana (Ideal: ~5%)</span>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={!sentenceInput.trim()}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm rounded-xl shadow disabled:opacity-40 transition"
          >
            💾 Simpan Jurnal Hari Ini
          </button>
        </form>
      </div>

      {/* Past Entries Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-500" /> Riwayat Jurnal ({journals.length} entri tersimpan)
          </h3>
        </div>

        {journals.length === 0 ? (
          <div className="p-8 text-center bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-400 text-sm">
            Belum ada catatan jurnal. Mulailah menulis 1 kalimat pertamamu hari ini!
          </div>
        ) : (
          <div className="space-y-3">
            {journals.map((entry) => {
              const formattedDate = new Date(entry.date).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              });

              return (
                <div
                  key={entry.id}
                  className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-3 relative group"
                >
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-bold flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <Sparkles className="w-3.5 h-3.5" /> {formattedDate}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(entry.sentence, entry.id)}
                        className="p-1 text-gray-400 hover:text-emerald-500 transition"
                        title="Salin Kalimat"
                      >
                        {copiedId === entry.id ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition"
                        title="Hapus Entri"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Prompt: <span className="font-medium text-gray-600 dark:text-gray-300">{entry.prompt}</span>
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {entry.sentence}
                    </p>
                    {entry.translation && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">
                        {entry.translation}
                      </p>
                    )}
                  </div>

                  {entry.stats && (
                    <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-gray-700/60 text-[11px] text-gray-400">
                      <span>Rasio: <b className="text-red-500">漢字 {entry.stats.kanji}%</b> / <b className="text-emerald-500">かな {entry.stats.hiragana}%</b> / <b className="text-blue-500">カナ {entry.stats.katakana}%</b></span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
