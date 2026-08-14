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
  let done = 0, skipped = 0;
  for (const v of arr) {
    if (!isAscii(v.meaning)) { skipped++; continue; }
    v.meaning = await translateText(v.meaning);
    done++;
    await sleep(80);
  }
  writeJsArray(file, arr, exportName);
  console.log(`vocab ${lv.toUpperCase()}: ${done} diterjemahkan, ${skipped} sudah ID`);
}

async function translateKanji(lv) {
  const file = path.join(DATA, `kanji_${lv}.js`);
  const { arr, exportName } = loadJsArray(file);
  let done = 0, skipped = 0;
  for (const k of arr) {
    const newMeanings = [];
    for (const m of k.meanings || []) {
      if (!isAscii(m)) { newMeanings.push(m); skipped++; continue; }
      newMeanings.push(await translateText(m));
      done++;
      await sleep(60);
    }
    k.meanings = newMeanings;
  }
  writeJsArray(file, arr, exportName);
  console.log(`kanji ${lv.toUpperCase()}: ${done} arti diterjemahkan, ${skipped} sudah ID`);
}

async function translateGrammar(lv) {
  const file = path.join(DATA, `grammar_${lv}.js`);
  const { arr, exportName } = loadJsArray(file);
  let done = 0, skipped = 0;
  for (const g of arr) {
    if (isAscii(g.explanation)) { g.explanation = await translateText(g.explanation); done++; }
    else skipped++;
    if (isAscii(g.structure)) { g.structure = await translateText(g.structure); done++; }
    else skipped++;
    await sleep(60);
    for (const ex of g.examples || []) {
      if (isAscii(ex.meaning)) { ex.meaning = await translateText(ex.meaning); done++; }
      else skipped++;
      await sleep(60);
    }
  }
  writeJsArray(file, arr, exportName);
  console.log(`grammar ${lv.toUpperCase()}: ${done} teks diterjemahkan, ${skipped} sudah ID`);
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

main().catch((e) => {
  console.error('GAGAL:', e.message);
  process.exit(1);
});
