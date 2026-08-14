// Stage E — Terjemahan EN → ID untuk data level (resume-friendly).
// Pemakaian: node scripts/translate_level.cjs <vocab|kanji|grammar> [n5|n4|n3]
//   tanpa level = semua N5-N3.
// Resume: entri yang artinya sudah mengandung aksara non-ASCII dianggap sudah
// diterjemahkan dan dilewati — aman dihentikan & dijalankan ulang kapan saja.
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'src', 'data');
const LEVELS = ['n5', 'n4', 'n3'];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Teks dianggap "sudah diterjemahkan" jika mengandung karakter di luar printable ASCII
// (Latin + aksara non-ASCII). Arti Indonesia hampir selalu memuat aksara non-ASCII.
const isAscii = (s) => !/[^\u0020-\u007E]/.test(s || '');

async function translateText(text) {
  if (!text || !text.trim()) return text;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=id&dt=t&q=${encodeURIComponent(text)}`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json && json[0] && json[0][0] && json[0][0][0]) {
        return json[0][0][0].trim();
      }
      throw new Error('format tidak valid');
    } catch (e) {
      if (attempt === 3) {
        console.warn(`  ✗ gagal terjemah "${text.slice(0, 40)}": ${e.message}`);
        return text; // biarkan EN, tidak fatal
      }
      await sleep(1000 * attempt);
    }
  }
  return text;
}

// Konkurensi terbatas: 4 terbukti kena rate-limit Google (429 → retry lama),
// 1–2 paling stabil. Kegagalan per-item tidak fatal (resume di run berikutnya).
const CONCURRENCY = 2;

async function mapConcurrent(items, fn) {
  const results = [];
  for (let i = 0; i < items.length; i += CONCURRENCY) {
    const chunk = items.slice(i, i + CONCURRENCY);
    results.push(...(await Promise.all(chunk.map(fn))));
    await sleep(40);
  }
  return results;
}

function loadJsArray(file) {
  const raw = fs.readFileSync(file, 'utf-8');
  const start = raw.indexOf('[');
  const end = raw.lastIndexOf(']');
  return { arr: JSON.parse(raw.slice(start, end + 1)), exportName: (raw.match(/export const (\w+) =/) || [])[1] };
}

function writeJsArray(file, arr, exportName) {
  fs.writeFileSync(file, `export const ${exportName} = ${JSON.stringify(arr, null, 1)};\n`, 'utf-8');
}

async function translateVocab(lv) {
  const file = path.join(DATA, `vocab_${lv}.js`);
  const { arr, exportName } = loadJsArray(file);
  const work = arr.filter((v) => isAscii(v.meaning));
  await mapConcurrent(work, async (v) => {
    v.meaning = await translateText(v.meaning);
  });
  writeJsArray(file, arr, exportName);
  console.log(`vocab ${lv.toUpperCase()}: ${work.length} diterjemahkan, ${arr.length - work.length} sudah ID`);
}

async function translateKanji(lv) {
  const file = path.join(DATA, `kanji_${lv}.js`);
  const { arr, exportName } = loadJsArray(file);
  const work = [];
  arr.forEach((k) => {
    k.meanings.forEach((m, i) => {
      if (isAscii(m)) work.push({ k, i, m });
    });
  });
  await mapConcurrent(work, async (item) => {
    item.k.meanings[item.i] = await translateText(item.m);
  });
  writeJsArray(file, arr, exportName);
  console.log(`kanji ${lv.toUpperCase()}: ${work.length} arti diterjemahkan`);
}

async function translateGrammar(lv) {
  const file = path.join(DATA, `grammar_${lv}.js`);
  const { arr, exportName } = loadJsArray(file);
  const work = [];
  arr.forEach((g) => {
    if (isAscii(g.explanation)) work.push({ g, field: 'explanation' });
    if (isAscii(g.structure)) work.push({ g, field: 'structure' });
    (g.examples || []).forEach((ex) => {
      if (isAscii(ex.meaning)) work.push({ ex, field: 'meaning' });
    });
  });
  await mapConcurrent(work, async (item) => {
    if (item.ex) item.ex.meaning = await translateText(item.ex.meaning);
    else item.g[item.field] = await translateText(item.g[item.field]);
  });
  writeJsArray(file, arr, exportName);
  console.log(`grammar ${lv.toUpperCase()}: ${work.length} teks diterjemahkan`);
}

async function main() {
  const target = process.argv[2];
  const only = process.argv[3];
  const levels = only ? [only] : LEVELS;

  for (const lv of levels) {
    if (target === 'vocab') await translateVocab(lv);
    else if (target === 'kanji') await translateKanji(lv);
    else if (target === 'grammar') await translateGrammar(lv);
    else throw new Error('target harus vocab|kanji|grammar');
  }
  console.log('Selesai.');
}

if (require.main === module) {
  main().catch((e) => {
    console.error('GAGAL:', e.message);
    process.exit(1);
  });
}

// Dipakai ulang oleh translate_leftovers.cjs
module.exports = { translateText, mapConcurrent, isAscii };
