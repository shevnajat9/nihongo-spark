/**
 * Client wrapper for dictionary Web Worker
 */

let worker = null;
let queryCounter = 0;
const pendingCallbacks = new Map();

function getWorker() {
  if (typeof window === 'undefined' || typeof Worker === 'undefined') {
    return null;
  }
  if (!worker) {
    try {
      worker = new Worker(new URL('../workers/dictionaryWorker.js', import.meta.url), { type: 'module' });
      worker.onmessage = (e) => {
        const { id, results } = e.data;
        const cb = pendingCallbacks.get(id);
        if (cb) {
          cb(results);
          pendingCallbacks.delete(id);
        }
      };
    } catch {
      worker = null;
    }
  }
  return worker;
}

export function searchDictionaryWithWorker(query, entries, limit = 20) {
  return new Promise((resolve) => {
    const w = getWorker();
    if (!w) {
      // Main-thread fallback
      const q = query.trim().toLowerCase();
      const results = entries.filter((item) => {
        return (
          (item.kanji && item.kanji.includes(q)) ||
          (item.kana && item.kana.includes(q)) ||
          (item.romaji && item.romaji.toLowerCase().includes(q)) ||
          (item.meaning && item.meaning.toLowerCase().includes(q))
        );
      }).slice(0, limit);
      resolve(results);
      return;
    }

    const currentId = ++queryCounter;
    pendingCallbacks.set(currentId, resolve);
    w.postMessage({ id: currentId, query, entries, limit });
  });
}
