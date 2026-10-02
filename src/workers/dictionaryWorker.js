/**
 * Web Worker for Off-Thread Dictionary Fuzzy Search
 * Prevents UI stutter (keeps 60/120 FPS) when querying large N1 vocabulary datasets.
 */

self.onmessage = function (e) {
  const { id, query, entries, limit = 20 } = e.data;
  if (!query || !entries || entries.length === 0) {
    self.postMessage({ id, results: [] });
    return;
  }

  const q = query.trim().toLowerCase();
  const results = [];

  for (let i = 0; i < entries.length; i++) {
    const item = entries[i];
    if (!item) continue;

    const kanjiMatch = item.kanji && item.kanji.includes(q);
    const kanaMatch = item.kana && item.kana.includes(q);
    const romajiMatch = item.romaji && item.romaji.toLowerCase().includes(q);
    const meaningMatch = item.meaning && item.meaning.toLowerCase().includes(q);

    if (kanjiMatch || kanaMatch || romajiMatch || meaningMatch) {
      // Calculate relevance score
      let score = 0;
      if (item.kanji === q || item.kana === q) score += 100;
      else if (item.kanji && item.kanji.startsWith(q)) score += 50;
      else if (item.kana && item.kana.startsWith(q)) score += 40;
      else score += 10;

      results.push({ item, score });
      if (results.length >= limit * 2) break;
    }
  }

  results.sort((a, b) => b.score - a.score);
  const finalItems = results.slice(0, limit).map((r) => r.item);

  self.postMessage({ id, results: finalItems });
};
