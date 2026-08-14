// Stage C — Transform kanji full (dari kanji-data master, 1 file):
// filter jlpt_new 1-5 → format app + jukugo dari pool vocab (baru + lama).
const fs = require('fs');
const path = require('path');

const RAW = path.join(__dirname, 'raw');
const DATA = path.join(__dirname, '..', 'src', 'data');

function loadJsArray(file, exportName) {
  const raw = fs.readFileSync(file, 'utf-8');
  const start = raw.indexOf('[');
  const end = raw.lastIndexOf(']');
  return JSON.parse(raw.slice(start, end + 1));
}

// pool vocab gabungan: file baru (N5-N3) + vocab.js lama (semua level, fallback N2/N1)
function loadVocabPool() {
  const pool = [];
  for (const lv of ['n5', 'n4', 'n3']) {
    const file = path.join(DATA, `vocab_${lv}.js`);
    if (fs.existsSync(file)) pool.push(...loadJsArray(file));
  }
  pool.push(...loadJsArray(path.join(DATA, 'vocab.js')));
  // dedupe by level+word
  const seen = new Set();
  return pool.filter((v) => {
    const key = `${v.level}__${v.word}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function main() {
  const kanjiFull = JSON.parse(fs.readFileSync(path.join(RAW, 'kanji-full.json'), 'utf-8'));
  const vocabPool = loadVocabPool();
  const vocabByWord = new Map(vocabPool.map((v) => [v.word, v]));

  let total = 0;
  const perLevel = {};

  for (const char of Object.keys(kanjiFull)) {
    const item = kanjiFull[char];
    const lv = item.jlpt_new;
    if (!lv || lv < 1 || lv > 5) continue;

    // jukugo: cari kata vocab yang mengandung kanji ini (bukan kanji tunggal)
    let related = vocabPool
      .filter((v) => v.word.includes(char) && v.word !== char)
      .slice(0, 3)
      .map((v) => ({ word: v.word, reading: v.reading || '', meaning: v.meaning || '' }));

    if (related.length === 0) {
      const known = vocabByWord.get(char);
      if (known) {
        related.push({ word: char, reading: known.reading || '', meaning: known.meaning || '' });
      } else {
        related.push({
          word: char,
          reading: (item.readings_kun && item.readings_kun[0]) || (item.readings_on && item.readings_on[0]) || '',
          meaning: (item.meanings && item.meanings[0]) || '',
        });
      }
    }

    const entry = {
      kanji: char,
      level: `N${lv}`,
      meanings: item.meanings || [],
      kunyomi: item.readings_kun || [],
      onyomi: item.readings_on || [],
      strokes: item.strokes || 0,
      examples: related,
    };

    perLevel[entry.level] = perLevel[entry.level] || [];
    perLevel[entry.level].push(entry);
    total++;
  }

  for (const lv of ['N5', 'N4', 'N3', 'N2', 'N1']) {
    const entries = perLevel[lv] || [];
    const exportName = `kanji${lv}`;
    const content = `export const ${exportName} = ${JSON.stringify(entries, null, 1)};\n`;
    fs.writeFileSync(path.join(DATA, `kanji_${lv.toLowerCase()}.js`), content, 'utf-8');
    const noJukugo = entries.filter((k) => !k.examples || k.examples.length === 0).length;
    console.log(`${lv}: ${entries.length} kanji | tanpa jukugo: ${noJukugo}`);
  }
  console.log(`total: ${total} kanji`);
}

main();
