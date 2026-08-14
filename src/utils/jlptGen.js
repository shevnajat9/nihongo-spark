// Generator soal bergaya JLPT (Japanese-Language Proficiency Test).
// Meniru format soal asli dari data aplikasi:
//   文字・語彙 (Mojigoi): 問題1 漢字読み, 問題2 表記, 問題3 文脈規定, 問題4 語義選択
//   文法 (Bunpō):        文法1 partikel, 文法2 pola tata bahasa, 文法3 並べ替え
//   読解 (Dokkai):        短文読解 (memahami arti kalimat)
//   聴解 (Chōkai):        問題1 語彙 (dengar kata → kanji), 問題2 文意 (dengar kalimat → arti),
//                         問題3 即時応答 (dengar ungkapan → respons tepat)
// Setiap fungsi mengembalikan array soal; soal kosong diskip secara aman.

import { vocabData } from '../data/vocab';
import { kanjiData } from '../data/kanji';
import { grammarData } from '../data/grammar';
import { quickResponseData } from '../data/chokai';

const HAN = /\p{Script=Han}/u;          // karakter kanji
const KANA = /[\u3040-\u30ff]/;         // hiragana & katakana
const PARTICLES = ['は', 'が', 'を', 'に', 'へ', 'と', 'で', 'の', 'から', 'まで', 'より', 'も', 'か'];
const BLANK = '＿＿＿';

// ── Jumlah soal per level mengikuti struktur ujian JLPT asli ──
export const LEVEL_COUNTS = {
  N5: { mojigoi: 20, bunpo: 12, dokkai: 8, chokai: 12 },   // total 52
  N4: { mojigoi: 28, bunpo: 15, dokkai: 12, chokai: 14 },  // total 69
  N3: { mojigoi: 32, bunpo: 22, dokkai: 28, chokai: 28 },  // total 110
  N2: { mojigoi: 36, bunpo: 21, dokkai: 21, chokai: 32 },  // total 110
  N1: { mojigoi: 45, bunpo: 26, dokkai: 26, chokai: 37 },  // total 134
};

// Komposisi tipe soal per seksi per level.
const MJ_COMP = {
  N5: { reading: 6, ortho: 6, contextual: 4, meaning: 4 },
  N4: { reading: 8, ortho: 8, contextual: 6, meaning: 6 },
  N3: { reading: 10, ortho: 10, contextual: 6, meaning: 6 },
  N2: { reading: 12, ortho: 12, contextual: 6, meaning: 6 },
  N1: { reading: 15, ortho: 15, contextual: 8, meaning: 7 },
};
const BP_COMP = {
  N5: { particle: 4, pattern: 4, reorder: 4 },
  N4: { particle: 5, pattern: 5, reorder: 5 },
  N3: { particle: 8, pattern: 6, reorder: 8 },
  N2: { particle: 8, pattern: 6, reorder: 7 },
  N1: { particle: 10, pattern: 6, reorder: 10 },
};
const CK_COMP = {
  N5: { word: 4, sentence: 4, response: 4 },
  N4: { word: 5, sentence: 5, response: 4 },
  N3: { word: 10, sentence: 10, response: 8 },
  N2: { word: 11, sentence: 11, response: 10 },
  N1: { word: 13, sentence: 13, response: 11 },
};

const LEVEL_ORDER = { N5: 0, N4: 1, N3: 2, N2: 3, N1: 4 };

// ---------- utilitas ----------

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Ambil n nilai unik dari values (opsional: kecualikan nilai exclude).
function pickDistinct(values, n, exclude) {
  const seen = new Set();
  const out = [];
  for (const v of shuffle(values)) {
    if (out.length >= n) break;
    if (exclude !== undefined && v === exclude) continue;
    if (!seen.has(v)) {
      seen.add(v);
      out.push(v);
    }
  }
  return out;
}

// Posisi kemunculan `word` dalam `sentence` yang TIDAK menempel pada kanji lain
// (mis. kata "本" tidak ikut ter-blank saat ada di dalam "日本語").
function findStandaloneIndex(sentence, word) {
  const first = sentence.indexOf(word);
  if (first === -1) return -1;
  if (!HAN.test(word)) return first;
  for (let idx = first; idx !== -1; idx = sentence.indexOf(word, idx + 1)) {
    const before = idx > 0 ? sentence[idx - 1] : '';
    const after = idx + word.length < sentence.length ? sentence[idx + word.length] : '';
    if (!(before && HAN.test(before)) && !(after && HAN.test(after))) return idx;
  }
  return -1;
}

function replaceFirst(sentence, needle, replacement) {
  const idx = findStandaloneIndex(sentence, needle);
  if (idx === -1) return sentence.includes(needle) ? sentence.replace(needle, replacement) : null;
  return sentence.slice(0, idx) + replacement + sentence.slice(idx + needle.length);
}

function dedupeByJp(items) {
  const seen = new Set();
  return items.filter((q) => {
    // REORDER & soal 聴解 tidak punya jp (teks disembunyikan saat ujian) —
    // pakai transkrip/kalimat asli sebagai key.
    let key;
    if (q.type === 'REORDER') key = `${q.type}__${q.order.join('')}`;
    else if (q.section === 'chokai') key = `${q.type}__${q.transcript}`;
    else key = `${q.type}__${q.jp}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ---------- 文字・語彙 ----------

// 問題1 漢字読み: kata kanji → pilih cara baca (hiragana) yang benar.
// `exclude` = Set kata yang sudah dipakai di seksi ini (biar tidak ada kata
// yang muncul dua kali dalam satu ujian).
export function genKanjiReading(level, n, exclude = new Set()) {
  const pool = vocabData.filter(
    (v) => v.level === level && HAN.test(v.word) && v.reading && v.reading !== v.word && !exclude.has(v.word)
  );
  const allReadings = vocabData.filter((v) => v.level === level && v.reading).map((v) => v.reading);

  return shuffle(pool).slice(0, n).map((item) => {
    exclude.add(item.word);
    return {
      type: 'KANJI_READING',
      badge: '問題1 漢字読み',
      section: 'mojigoi',
      question: 'Pilih cara baca yang benar untuk kata berikut:',
      jp: item.word,
      options: shuffle([item.reading, ...pickDistinct(allReadings, 3, item.reading)]),
      correct: item.reading,
      explain: {
        word: item.word,
        reading: item.reading,
        meaning: item.meaning,
        example: item.example,
        exampleMeaning: item.exampleMeaning,
      },
    };
  });
}

// 問題2 表記: bacaan (hiragana) → pilih penulisan kanji yang benar.
export function genOrthography(level, n, exclude = new Set()) {
  const pool = vocabData.filter(
    (v) => v.level === level && HAN.test(v.word) && v.reading && v.reading !== v.word && !exclude.has(v.word)
  );
  const allWords = vocabData.filter((v) => v.level === level && HAN.test(v.word)).map((v) => v.word);

  return shuffle(pool).slice(0, n).map((item) => {
    exclude.add(item.word);
    return {
      type: 'ORTHOGRAPHY',
      badge: '問題2 表記',
      section: 'mojigoi',
      question: 'Pilih penulisan kanji yang benar untuk bacaan berikut:',
      jp: item.reading,
      options: shuffle([item.word, ...pickDistinct(allWords, 3, item.word)]),
      correct: item.word,
      explain: {
        word: item.word,
        reading: item.reading,
        meaning: item.meaning,
        example: item.example,
        exampleMeaning: item.exampleMeaning,
      },
    };
  });
}

// 問題3 文脈規定: kalimat dengan kata yang dikosongkan → pilih kata yang tepat.
export function genContextual(level, n, exclude = new Set()) {
  const pool = vocabData.filter(
    (v) => v.level === level && v.example && v.example.includes(v.word) && v.word.length >= 1 && !exclude.has(v.word)
  );

  return shuffle(pool).slice(0, n).map((item) => {
    const blanked = replaceFirst(item.example, item.word, BLANK);
    if (blanked === null) return null;
    exclude.add(item.word);

    // Distractor: utamakan kata dengan jenis yang sama (supaya tidak ketebak dari posisi).
    let distractors = pickDistinct(
      vocabData
        .filter((v) => v.level === level && v.word !== item.word && v.partOfSpeech === item.partOfSpeech)
        .map((v) => v.word),
      3,
      item.word
    );
    if (distractors.length < 3) {
      const fallback = pickDistinct(
        vocabData.filter((v) => v.level === level && v.word !== item.word).map((v) => v.word),
        3 - distractors.length,
        item.word
      );
      distractors = [...distractors, ...fallback];
    }

    return {
      type: 'CONTEXTUAL',
      badge: '問題3 文脈規定',
      section: 'mojigoi',
      question: 'Pilih kata yang paling tepat untuk mengisi bagian yang kosong:',
      jp: blanked,
      options: shuffle([item.word, ...distractors]),
      correct: item.word,
      explain: {
        word: item.word,
        reading: item.reading,
        meaning: item.meaning,
        example: item.example,
        exampleMeaning: item.exampleMeaning,
      },
    };
  }).filter(Boolean);
}

// 問題4 語義選択: arti (bahasa Indonesia) → pilih kata yang tepat (kebalikan 文脈規定).
export function genWordMeaning(level, n, exclude = new Set()) {
  const pool = vocabData.filter(
    (v) => v.level === level && v.meaning && !exclude.has(v.word)
  );
  const allWords = vocabData.filter((v) => v.level === level).map((v) => v.word);

  return shuffle(pool).slice(0, n).map((item) => {
    exclude.add(item.word);
    return {
      type: 'WORD_MEANING',
      badge: '問題4 語義選択',
      section: 'mojigoi',
      question: 'Pilih kata yang paling tepat untuk arti berikut:',
      jp: item.meaning,
      options: shuffle([item.word, ...pickDistinct(allWords, 3, item.word)]),
      correct: item.word,
      explain: {
        word: item.word,
        reading: item.reading,
        meaning: item.meaning,
        example: item.example,
        exampleMeaning: item.exampleMeaning,
      },
    };
  });
}

export function genMojigoi(level, count = 10, exclude = new Set()) {
  const c = MJ_COMP[level] || MJ_COMP.N5;
  const qs = [
    ...genKanjiReading(level, c.reading, exclude),
    ...genOrthography(level, c.ortho, exclude),
    ...genContextual(level, c.contextual, exclude),
    ...genWordMeaning(level, c.meaning, exclude),
  ];
  // Jika ada tipe yang kekurangan (data terbatas), top-up dari 漢字読み.
  const short = count - qs.length;
  if (short > 0) qs.push(...genKanjiReading(level, short + 4, exclude));
  return dedupeByJp(qs).slice(0, count);
}

// ---------- 文法 ----------

// 文法1: partikel yang hilang dalam kalimat contoh (grammar + vocab).
export function genParticle(level, n) {
  const pool = [];

  const scan = (sentence, reading, meaning) => {
    for (const p of PARTICLES) {
      const idx = sentence.indexOf(p);
      if (idx > 0 && idx < sentence.length - 1) {
        const prev = sentence[idx - 1];
        const next = sentence[idx + 1];
        if (prev && !PARTICLES.includes(prev) && next !== '。' && next !== '、' && !PARTICLES.includes(next)) {
          pool.push({ sentence, p, idx, reading, meaning });
          break;
        }
      }
    }
  };

  grammarData
    .filter((g) => g.level === level)
    .forEach((g) => g.examples.forEach((ex) => scan(ex.sentence, ex.reading, ex.meaning)));

  vocabData
    .filter((v) => v.level === level && v.example)
    .forEach((v) => scan(v.example, v.exampleReading, v.exampleMeaning));

  return shuffle(pool).slice(0, n).map((item) => ({
    type: 'PARTICLE',
    badge: '文法1 助詞',
    section: 'bunpo',
    question: 'Pilih partikel yang tepat untuk melengkapi kalimat:',
    jp: item.sentence.slice(0, item.idx) + BLANK + item.sentence.slice(item.idx + 1),
    options: shuffle([item.p, ...pickDistinct(PARTICLES, 3, item.p)]),
    correct: item.p,
    explain: {
      word: null,
      reading: item.reading,
      meaning: item.meaning,
      example: item.sentence,
      exampleMeaning: item.meaning,
    },
  }));
}

// 文法2: pola tata bahasa yang hilang dalam kalimat contoh grammar.
export function genPattern(level, n) {
  const patterns = grammarData.filter((g) => g.level === level);
  const pool = [];

  patterns.forEach((g) => {
    // Fragmen pola yang bisa dicocokkan dengan kalimat (buang 〜 dan pemisah).
    const frags = g.pattern.replace(/〜/g, ' ').split(/[、/・\s]+/).filter((f) => f.length >= 2);
    if (!frags.length) return;
    g.examples.forEach((ex) => {
      const frag = frags.find((f) => ex.sentence.includes(f));
      if (frag) {
        pool.push({
          sentence: ex.sentence,
          frag,
          pattern: g.pattern,
          reading: ex.reading,
          meaning: ex.meaning,
          explanation: g.explanation,
        });
      }
    });
  });

  const allPatterns = patterns.map((g) => g.pattern);

  return shuffle(pool).slice(0, n).map((item) => ({
    type: 'PATTERN',
    badge: '文法2 文型',
    section: 'bunpo',
    question: 'Pilih pola tata bahasa yang tepat untuk melengkapi kalimat:',
    jp: item.sentence.replace(item.frag, BLANK),
    options: shuffle([item.pattern, ...pickDistinct(allPatterns, 3, item.pattern)]),
    correct: item.pattern,
    explain: {
      word: item.pattern,
      reading: item.reading,
      meaning: item.meaning,
      example: item.sentence,
      exampleMeaning: item.meaning,
      note: item.explanation,
    },
  }));
}

// 文法3 並べ替え: potong kalimat menjadi 3–4 bagian di batas partikel,
// lalu peserta menyusunnya kembali (klik urutan).
export function splitSentence(sentence) {
  const s = sentence.trim();
  if (s.length < 8 || s.length > 45) return null;

  // Partikel dianggap batas HANYA jika karakter setelahnya bukan kana
  // (kanji/katakana = awal kata baru). Partikel di dalam kata (はず, つもり,
  // いかない, です…) tidak boleh memotong kata.
  const candidates = [];
  for (let i = 1; i < s.length - 1; i++) {
    if (!PARTICLES.includes(s[i])) continue;
    const prev = s[i - 1];
    const next = s[i + 1];
    if (PARTICLES.includes(prev)) continue;
    if (KANA.test(next) || next === '。' || next === '、') continue;
    candidates.push(i + 1); // batas potong SETELAH partikel
  }

  // Batas setelah koma: "来年、日本へ…" → "来年、" + "日本へ…"
  for (let i = 2; i < s.length - 1; i++) {
    if (s[i] === '、' || s[i] === '，') candidates.push(i + 1);
  }

  // Batas sebelum ekor です/ます/でした…: "…学生です。" → "…学生" + "です。"
  for (const tail of ['ませんでした。', 'ましょうか。', 'でしょう。', 'でした。', 'ません。', 'ましょう。', 'ますか。', 'です。', 'ます。']) {
    if (s.endsWith(tail) && s.length - tail.length >= 2) {
      candidates.push(s.length - tail.length);
      break;
    }
  }

  const trySplits = (k) => {
    const unique = [...new Set(candidates)].filter((c) => c > 0 && c < s.length);
    if (unique.length < k) return null;
    // coba beberapa kombinasi acak; ambil yang valid
    for (let attempt = 0; attempt < 15; attempt++) {
      const combos = shuffle(unique).slice(0, k).sort((a, b) => a - b);
      const boundaries = [0, ...combos, s.length];
      const chunks = boundaries.slice(1).map((b, i) => s.slice(boundaries[i], b));
      if (chunks.length < 3 || chunks.length > 4) continue;
      if (chunks.some((c) => c.length < 1 || c.length > 14)) continue;
      if (chunks.some((c) => c === '。' || c === '、' || c.trim() === '')) continue;
      if (new Set(chunks).size !== chunks.length) continue;
      return chunks;
    }
    return null;
  };

  return trySplits(3) || trySplits(2);
}

export function genReorder(level, n) {
  const seen = new Set();
  const pool = [];

  grammarData
    .filter((g) => g.level === level)
    .forEach((g) =>
      g.examples.forEach((ex) => {
        if (seen.has(ex.sentence)) return;
        const chunks = splitSentence(ex.sentence);
        if (chunks) {
          seen.add(ex.sentence);
          pool.push({ sentence: ex.sentence, chunks, reading: ex.reading, meaning: ex.meaning });
        }
      })
    );

  vocabData
    .filter((v) => v.level === level && v.example)
    .forEach((v) => {
      if (seen.has(v.example)) return;
      const chunks = splitSentence(v.example);
      if (chunks) {
        seen.add(v.example);
        pool.push({ sentence: v.example, chunks, reading: v.exampleReading, meaning: v.exampleMeaning });
      }
    });

  return shuffle(pool).slice(0, n).map((item) => ({
    type: 'REORDER',
    badge: '文法3 並べ替え',
    section: 'bunpo',
    question: 'Susunlah bagian-bagian berikut menjadi kalimat yang benar (klik untuk memilih urutan):',
    jp: null, // jangan tampilkan kalimat utuh — itu kuncinya!
    options: shuffle(item.chunks),
    order: item.chunks,
    correct: item.chunks.join(''),
    explain: {
      word: null,
      reading: item.reading,
      meaning: item.meaning,
      example: item.sentence,
      exampleMeaning: item.meaning,
    },
  }));
}

export function genBunpo(level, count = 10) {
  const c = BP_COMP[level] || BP_COMP.N5;
  const qs = [
    ...genParticle(level, c.particle),
    ...genPattern(level, c.pattern),
    ...genReorder(level, c.reorder),
  ];
  const short = count - qs.length;
  if (short > 0) qs.push(...genParticle(level, short + 4));
  return dedupeByJp(qs).slice(0, count);
}

// ---------- 読解 ----------

// 短文読解: kalimat singkat → pilih arti yang paling tepat.
export function genShortReading(level, n) {
  const pool = vocabData.filter(
    (v) => v.level === level && v.example && v.exampleMeaning && KANA.test(v.example)
  );
  const allMeanings = vocabData
    .filter((v) => v.level === level && v.exampleMeaning)
    .map((v) => v.exampleMeaning);

  return shuffle(pool).slice(0, n).map((item) => ({
    type: 'SHORT_READING',
    badge: '短文読解',
    section: 'dokkai',
    question: 'Bacalah kalimat berikut, lalu pilih pernyataan yang paling sesuai:',
    jp: item.example,
    options: shuffle([item.exampleMeaning, ...pickDistinct(allMeanings, 3, item.exampleMeaning)]),
    correct: item.exampleMeaning,
    explain: {
      word: item.word,
      reading: item.reading,
      meaning: item.meaning,
      example: item.example,
      exampleMeaning: item.exampleMeaning,
      exampleReading: item.exampleReading,
    },
  }));
}

// ---------- 聴解 (listening — audio via SpeechSynthesis) ----------

// 問題1 語彙: dengar kata (audio) → pilih penulisan kanji yang benar.
// Teks tidak ditampilkan saat ujian; `transcript` muncul di pembahasan.
export function genListenWord(level, n) {
  const pool = vocabData.filter(
    (v) => v.level === level && HAN.test(v.word) && v.reading && v.reading !== v.word
  );
  const allWords = vocabData.filter((v) => v.level === level && HAN.test(v.word)).map((v) => v.word);

  return shuffle(pool).slice(0, n).map((item) => ({
    type: 'LISTEN_WORD',
    badge: '聴解 問題1 語彙',
    section: 'chokai',
    question: 'Dengarkan kata berikut, lalu pilih penulisan kanji yang benar:',
    audio: item.word,
    jp: null, // disembunyikan saat ujian
    transcript: item.word,
    options: shuffle([item.word, ...pickDistinct(allWords, 3, item.word)]),
    correct: item.word,
    explain: {
      word: item.word,
      reading: item.reading,
      meaning: item.meaning,
      example: item.example,
      exampleMeaning: item.exampleMeaning,
    },
  }));
}

// 問題2 文意: dengar kalimat (audio) → pilih arti yang paling tepat.
export function genListenSentence(level, n) {
  const pool = vocabData.filter(
    (v) => v.level === level && v.example && v.exampleMeaning
  );
  const allMeanings = vocabData
    .filter((v) => v.level === level && v.exampleMeaning)
    .map((v) => v.exampleMeaning);

  return shuffle(pool).slice(0, n).map((item) => ({
    type: 'LISTEN_SENTENCE',
    badge: '聴解 問題2 文意',
    section: 'chokai',
    question: 'Dengarkan kalimatnya, lalu pilih arti yang paling tepat:',
    audio: item.example,
    jp: null,
    transcript: item.example,
    options: shuffle([item.exampleMeaning, ...pickDistinct(allMeanings, 3, item.exampleMeaning)]),
    correct: item.exampleMeaning,
    explain: {
      word: item.word,
      reading: item.reading,
      meaning: item.meaning,
      example: item.example,
      exampleMeaning: item.exampleMeaning,
      exampleReading: item.exampleReading,
    },
  }));
}

// 問題3 即時応答: dengar ungkapan → pilih respons paling tepat (bank chokai.js).
export function genQuickResponse(level, n) {
  const order = LEVEL_ORDER[level] ?? 0;
  const pool = quickResponseData.filter((p) => LEVEL_ORDER[p.level] <= order);
  const allResponses = pool.map((p) => p.response);

  return shuffle(pool).slice(0, n).map((item) => ({
    type: 'QUICK_RESPONSE',
    badge: '聴解 問題3 即時応答',
    section: 'chokai',
    question: 'Dengarkan ungkapan berikut, lalu pilih respons yang paling tepat:',
    audio: item.prompt,
    jp: null,
    transcript: item.prompt,
    options: shuffle([item.response, ...pickDistinct(allResponses, 3, item.response)]),
    correct: item.response,
    explain: {
      word: null,
      reading: null,
      meaning: `${item.promptMeaning} → ${item.responseMeaning}`,
      example: `${item.prompt} → ${item.response}`,
      exampleMeaning: `${item.promptMeaning} / ${item.responseMeaning}`,
    },
  }));
}

export function genChokai(level, count = 12) {
  const c = CK_COMP[level] || CK_COMP.N5;
  const qs = [
    ...genListenWord(level, c.word),
    ...genListenSentence(level, c.sentence),
    ...genQuickResponse(level, c.response),
  ];
  const short = count - qs.length;
  if (short > 0) qs.push(...genListenSentence(level, short + 4));
  return dedupeByJp(qs).slice(0, count);
}

// ---------- paket ujian ----------

export function buildJLPTTest(level) {
  const counts = LEVEL_COUNTS[level] || LEVEL_COUNTS.N5;
  const usedWords = new Set(); // satu kata hanya muncul sekali di seksi 文字・語彙
  return {
    mojigoi: genMojigoi(level, counts.mojigoi, usedWords),
    bunpo: genBunpo(level, counts.bunpo),
    dokkai: genShortReading(level, counts.dokkai),
    chokai: genChokai(level, counts.chokai),
  };
}

// Untuk import tambahan bila komponen butuh (mis. statistik).
export { kanjiData };
