// Stage A4 — Audit sumber mentah di scripts/raw/ + cek cakupan vs vocab lama.
const fs = require('fs');
const path = require('path');

const RAW = path.join(__dirname, 'raw');
const SRC = path.join(__dirname, '..', 'src');

// ── parser tabs (kanji\tartikel HTML) ──
function parseTab(file) {
  const out = [];
  const lines = fs.readFileSync(file, 'utf-8').split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.startsWith('question')) continue;
    const [q, a] = line.split('\t');
    if (!q || !a) continue;
    const clean = (s) => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
    out.push({ q: clean(q), a: clean(a) });
  }
  return out;
}

const hasKanji = (s) => /[\u4e00-\u9fff]/.test(s);

// ── vocab lama (basis merge) ──
const oldVocabRaw = fs.readFileSync(path.join(SRC, 'data', 'vocab.js'), 'utf-8');
const oldVocab = JSON.parse(oldVocabRaw.slice(oldVocabRaw.indexOf('['), oldVocabRaw.lastIndexOf(']') + 1));

console.log('═══ AUDIT SUMBER MENTAH ═══\n');

let totalNew = 0;
for (const lv of ['n5', 'n4', 'n3']) {
  const eng = parseTab(path.join(RAW, `vocab-${lv}-kanji-eng.tab`));
  const hira = parseTab(path.join(RAW, `vocab-${lv}-hiragana.tab`));
  const hiraMap = new Map(hira.map((x) => [x.q, x.a]));

  const engWords = new Set(eng.map((x) => x.q));
  const oldLv = oldVocab.filter((v) => v.level === lv.toUpperCase());
  const oldWords = new Set(oldLv.map((v) => v.word));
  const oldKanaOnly = oldLv.filter((v) => !hasKanji(v.word));

  // kata tabs yang TIDAK ada di vocab lama = entri baru yang harus dibuat
  const newWords = eng.filter((x) => !oldWords.has(x.q));
  // kata tabs yang reading-nya tidak ada di deck hiragana
  const noReading = eng.filter((x) => !hiraMap.has(x.q));

  console.log(`[${lv.toUpperCase()}]`);
  console.log(`  tabs kanji-eng : ${eng.length} kata | deck hiragana: ${hira.length}`);
  console.log(`  kata baru (tidak di vocab lama) : ${newWords.length}`);
  console.log(`  kata lama kana-only (wajib dipertahankan): ${oldKanaOnly.length}`);
  console.log(`  kata tabs tanpa reading deck     : ${noReading.length} (fallback kuromoji)`);
  if (eng[0]) console.log(`  contoh: ${eng[0].q} = ${eng[0].a.slice(0, 50)}`);
  totalNew += newWords.length;
}

console.log(`\nTotal entri baru dari tabs (N5–N3): ${totalNew}`);

// ── kanji ──
console.log('\n═══ KANJI ═══');
let totalKanji = 0;
for (const lv of [5, 4, 3, 2, 1]) {
  const list = JSON.parse(fs.readFileSync(path.join(RAW, `kanji-jlpt-${lv}.json`), 'utf-8'));
  console.log(`jlpt-${lv}: ${list.length} kanji`);
  totalKanji += list.length;
}
console.log(`total: ${totalKanji}`);

// ── grammar ──
console.log('\n═══ GRAMMAR (jkindrix) ═══');
let totalGrammar = 0;
for (const lv of ['n5', 'n4', 'n3']) {
  const d = JSON.parse(fs.readFileSync(path.join(RAW, `grammar-${lv}.json`), 'utf-8'));
  const withEx = d.filter((x) => x.examples && x.examples.length);
  const withEng = d.filter((x) => x.meaning_en);
  console.log(`${lv.toUpperCase()}: ${d.length} pola | contoh: ${withEx.length} | meaning_en: ${withEng.length}`);
  totalGrammar += d.length;
  if (d[0]) console.log(`  contoh pola: ${d[0].pattern} — ${d[0].examples[0].japanese}`);
}
console.log(`total: ${totalGrammar}`);

// ── sampel arti tabs ──
console.log('\n═══ SAMPEL ARTI (N5) ═══');
const n5eng = parseTab(path.join(RAW, 'vocab-n5-kanji-eng.tab'));
for (const x of n5eng.slice(0, 5)) console.log(`  ${x.q} → ${x.a.slice(0, 60)}`);
