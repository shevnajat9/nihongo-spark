// Stage B — Transform vocab N5–N3:
// 1. Parse deck tabs (kanji-eng = kata + arti EN; kanji-hiragana = reading)
// 2. Merge dengan vocab.js lama (kata kana-only + entri yang sudah punya contoh/arti ID)
// 3. Reading hilang → fallback kuromoji; POS → kuromoji tokenizer
// Output: src/data/vocab_n5.js, vocab_n4.js, vocab_n3.js (format sama dengan vocab.js lama)
const fs = require('fs');
const path = require('path');
const { readingFor, posFor } = require('./generate_readings.cjs');

const RAW = path.join(__dirname, 'raw');
const DATA = path.join(__dirname, '..', 'src', 'data');

// ── parser tabs: baris "question\tanswer" dengan HTML span ──
function parseTab(file) {
  const out = [];
  const lines = fs.readFileSync(file, 'utf-8').split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.startsWith('question')) continue;
    const [q, a] = line.split('\t');
    if (!q || !a) continue;
    const clean = (s) =>
      s
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .trim();
    out.push({ q: clean(q), a: clean(a) });
  }
  return out;
}

// ── baca vocab lama (basis merge) ──
function loadOldVocab() {
  const raw = fs.readFileSync(path.join(DATA, 'vocab.js'), 'utf-8');
  return JSON.parse(raw.slice(raw.indexOf('['), raw.lastIndexOf(']') + 1));
}

async function buildLevel(lv) {
  const LEVEL = lv.toUpperCase();
  const eng = parseTab(path.join(RAW, `vocab-${lv}-kanji-eng.tab`));
  const hiraMap = new Map(parseTab(path.join(RAW, `vocab-${lv}-hiragana.tab`)).map((x) => [x.q, x.a]));

  const oldLv = loadOldVocab().filter((v) => v.level === LEVEL);
  const oldWords = new Set(oldLv.map((v) => v.word));

  const result = [];
  const used = new Set();

  // 1) entri lama dulu (sudah punya arti ID + contoh kalimat)
  for (const v of oldLv) {
    result.push({ ...v });
    used.add(v.word);
  }

  // 2) entri baru dari tabs
  let readingFallback = 0;
  let posUnknown = 0;
  for (const x of eng) {
    if (used.has(x.q)) continue;
    used.add(x.q);

    let reading = hiraMap.get(x.q) || null;
    if (!reading) {
      reading = await readingFor(x.q); // fallback kuromoji (kata tanpa entri deck hiragana)
      if (reading) readingFallback++;
    }
    const pos = await posFor(x.q);

    result.push({
      word: x.q,
      reading: reading || null,
      romaji: '',
      level: LEVEL,
      partOfSpeech: pos,
      meaning: x.a, // EN mentah — diterjemahkan di Stage E
      example: null,
      exampleReading: null,
      exampleMeaning: null,
    });
  }

  console.log(
    `[${LEVEL}] total ${result.length} (lama ${oldLv.length} + baru ${result.length - oldLv.length}) | reading fallback kuromoji: ${readingFallback} | tanpa reading: ${result.filter((v) => !v.reading).length}`
  );
  return result;
}

async function main() {
  for (const lv of ['n5', 'n4', 'n3']) {
    const entries = await buildLevel(lv);
    const file = path.join(DATA, `vocab_${lv}.js`);
    const content = `export const vocab${lv.toUpperCase()} = ${JSON.stringify(entries, null, 1)};\n`;
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`  → ${file} (${(Buffer.byteLength(content) / 1024).toFixed(0)} KB)`);
  }
  console.log('\nTransform vocab selesai.');
}

main().catch((e) => {
  console.error('GAGAL:', e.message);
  process.exit(1);
});
