// Data loader — lazy-load data per level (Vite dynamic import → chunk terpisah).
// Semua level (N5–N1) punya file data sendiri; dimuat saat level dipilih.
import { useState, useEffect } from 'react';

const cache = {};

export async function loadLevel(level) {
  if (cache[level]) return cache[level];

  const [v, k, g] = await Promise.all([
    import(`./vocab_${level.toLowerCase()}.js`),
    import(`./kanji_${level.toLowerCase()}.js`),
    import(`./grammar_${level.toLowerCase()}.js`),
  ]);
  const data = {
    level,
    vocab: v[`vocab${level}`] || [],
    kanji: k[`kanji${level}`] || [],
    grammar: g[`grammar${level}`] || [],
  };
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
