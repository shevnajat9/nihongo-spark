// Data loader — lazy-load data per level (Vite dynamic import → chunk terpisah).
// N5–N3: file data baru per level. N2/N1: fallback data lama sampai fase 2.
import { useState, useEffect } from 'react';

const cache = {};

export async function loadLevel(level) {
  if (cache[level]) return cache[level];

  let data;
  if (level === 'N5' || level === 'N4' || level === 'N3') {
    const [v, k, g] = await Promise.all([
      import(`./vocab_${level.toLowerCase()}.js`),
      import(`./kanji_${level.toLowerCase()}.js`),
      import(`./grammar_${level.toLowerCase()}.js`),
    ]);
    data = {
      level,
      vocab: v[`vocab${level}`] || [],
      kanji: k[`kanji${level}`] || [],
      grammar: g[`grammar${level}`] || [],
    };
  } else {
    // Fallback N2/N1 — data lama (fase 2 akan menggantinya)
    const [v, k, g] = await Promise.all([
      import('./vocab.js'),
      import('./kanji.js'),
      import('./grammar.js'),
    ]);
    data = {
      level,
      vocab: v.vocabData.filter((x) => x.level === level),
      kanji: k.kanjiData.filter((x) => x.level === level),
      grammar: g.grammarData.filter((x) => x.level === level),
    };
  }
  cache[level] = data;
  return data;
}

// Hook untuk komponen: { data, loading }
export function useLevelData(level) {
  const [state, setState] = useState({ data: null, loading: true });
  useEffect(() => {
    let alive = true;
    setState({ data: null, loading: true });
    loadLevel(level).then((data) => {
      if (alive) setState({ data, loading: false });
    });
    return () => {
      alive = false;
    };
  }, [level]);
  return state;
}
