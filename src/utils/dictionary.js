// Dictionary Search & De-inflection Helper for Hover/Selection Dictionary (Yomitan style)
import { loadLevel } from '../data/loader';

// Common verb/adjective de-inflection rules
const DEINFLECTIONS = [
  // Past polite: ました -> る / う
  { suffix: 'ました', replacements: ['る', 'う', 'く', 'す', 'つ', 'ぬ', 'ふ', 'む', 'ぐ', 'ぶ'] },
  // Negative polite: ません -> る / ない
  { suffix: 'ません', replacements: ['る', 'う', 'く', 'す', 'つ', 'ぬ', 'ふ', 'む', 'ぐ', 'ぶ'] },
  // Past negative polite: ませんでした -> る / う
  { suffix: 'ませんでした', replacements: ['る', 'う', 'く', 'す', 'つ', 'ぬ', 'ふ', 'む', 'ぐ', 'ぶ'] },
  // Te-form: 
  { suffix: 'て', replacements: ['る', 'つ', 'う', 'く'] },
  { suffix: 'いて', replacements: ['く'] },
  { suffix: 'いで', replacements: ['ぐ'] },
  { suffix: 'して', replacements: ['す', 'する'] },
  { suffix: 'って', replacements: ['う', 'つ', 'る'] },
  { suffix: 'んで', replacements: ['む', 'ぶ', 'ぬ'] },
  // Ta-form:
  { suffix: 'た', replacements: ['る', 'つ', 'う', 'く'] },
  { suffix: 'いた', replacements: ['く'] },
  { suffix: 'いだ', replacements: ['ぐ'] },
  { suffix: 'した', replacements: ['す', 'する'] },
  { suffix: 'った', replacements: ['う', 'つ', 'る'] },
  { suffix: 'んだ', replacements: ['む', 'ぶ', 'ぬ'] },
  // Nai-form:
  { suffix: 'ない', replacements: ['る', 'う', 'く', 'す', 'つ', 'ぬ', 'ふ', 'む', 'ぐ', 'ぶ'] },
  { suffix: 'なかった', replacements: ['る', 'う', 'く', 'す', 'つ', 'ぬ', 'ふ', 'む', 'ぐ', 'ぶ'] },
  // Potential / Passive / Causative
  { suffix: 'れる', replacements: ['る'] },
  { suffix: 'られる', replacements: ['る'] },
  { suffix: 'せる', replacements: ['る'] },
  { suffix: 'させる', replacements: ['る'] },
  // Adjectives:
  { suffix: 'くない', replacements: ['い'] },
  { suffix: 'かった', replacements: ['い'] },
  { suffix: 'くなかった', replacements: ['い'] },
  { suffix: 'くて', replacements: ['い'] },
];

/**
 * Generate candidate dictionary forms for an inflected word
 */
export function getDeinflections(word) {
  if (!word || word.length <= 1) return [word];
  const candidates = new Set([word]);

  for (const rule of DEINFLECTIONS) {
    if (word.endsWith(rule.suffix)) {
      const stem = word.slice(0, -rule.suffix.length);
      for (const rep of rule.replacements) {
        candidates.add(stem + rep);
      }
    }
  }

  return Array.from(candidates);
}

/**
 * Search word or kanji across loaded levels or specific level
 */
export async function lookupDictionary(query, currentLevel = 'N5') {
  if (!query) return { vocab: [], kanji: [] };
  const cleanQuery = query.trim();
  if (!cleanQuery) return { vocab: [], kanji: [] };

  // Generate inflected candidates
  const candidates = getDeinflections(cleanQuery);

  // Levels to check (prioritize currentLevel, then all N5..N1)
  const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
  const sortedLevels = [currentLevel, ...levels.filter(l => l !== currentLevel)];

  const matchedVocab = [];
  const matchedKanji = [];
  const seenVocabKeys = new Set();
  const seenKanjiKeys = new Set();

  // Load levels as needed
  for (const lvl of sortedLevels) {
    try {
      const levelData = await loadLevel(lvl);
      if (!levelData) continue;

      // 1. Check Vocab
      if (levelData.vocab) {
        for (const item of levelData.vocab) {
          const key = `${item.word}-${item.reading}`;
          if (seenVocabKeys.has(key)) continue;

          // Check direct match or candidate match
          const isDirectMatch = item.word === cleanQuery || item.reading === cleanQuery || item.romaji?.toLowerCase() === cleanQuery.toLowerCase();
          const isCandidateMatch = candidates.some(c => item.word === c || item.reading === c);
          const isStartsWith = item.word.startsWith(cleanQuery) || item.reading.startsWith(cleanQuery);

          if (isDirectMatch || isCandidateMatch) {
            seenVocabKeys.add(key);
            matchedVocab.push({ ...item, matchType: isDirectMatch ? 'exact' : 'deinflected' });
          } else if (cleanQuery.length >= 2 && isStartsWith) {
            seenVocabKeys.add(key);
            matchedVocab.push({ ...item, matchType: 'prefix' });
          }

          if (matchedVocab.length >= 8) break;
        }
      }

      // 2. Check Kanji
      if (levelData.kanji) {
        for (const kItem of levelData.kanji) {
          if (seenKanjiKeys.has(kItem.kanji)) continue;

          // Check if cleanQuery contains this kanji or matches
          const isKanjiMatch = cleanQuery.includes(kItem.kanji) ||
            kItem.kunyomi?.some(k => k.replace(/[.-]/g, '') === cleanQuery) ||
            kItem.onyomi?.some(o => o.replace(/[.-]/g, '') === cleanQuery);

          if (isKanjiMatch) {
            seenKanjiKeys.add(kItem.kanji);
            matchedKanji.push(kItem);
          }

          if (matchedKanji.length >= 4) break;
        }
      }

      // If we have strong matches, no need to exhaustively load all other levels
      if (matchedVocab.length >= 5 && matchedKanji.length >= 2) break;
    } catch (err) {
      console.warn(`Error loading dictionary data for ${lvl}:`, err);
    }
  }

  // Sort vocab: exact matches first, then deinflected, then prefix
  const priority = { exact: 0, deinflected: 1, prefix: 2 };
  matchedVocab.sort((a, b) => (priority[a.matchType] ?? 3) - (priority[b.matchType] ?? 3));

  return {
    query: cleanQuery,
    vocab: matchedVocab,
    kanji: matchedKanji
  };
}

/**
 * Save word to user's custom SRS review list
 */
export function saveWordToSRS(item) {
  const STORAGE_KEY = 'nihongo_spark_saved_words';
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const wordKey = item.word || item.kanji;
    if (!existing.some(w => (w.word || w.kanji) === wordKey)) {
      existing.unshift({
        ...item,
        savedAt: new Date().toISOString(),
        box: 1,
        easeFactor: 2.5,
        interval: 1,
        repetitions: 0,
        nextReview: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      window.dispatchEvent(new CustomEvent('nihongo-spark-saved-words-updated'));
      return true;
    }
    return false; // already exists
  } catch (err) {
    console.error('Failed to save word to SRS:', err);
    return false;
  }
}
