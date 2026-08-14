// Perbaikan presisi: translate HANYA entri yang artinya masih sama persis
// dengan sumber EN mentah (bandingkan dengan raw), lalu tulis balik.
// Pakai: node scripts/translate_leftovers.cjs [vocab|grammar] — default keduanya.
const fs = require('fs');
const path = require('path');
const { translateText, mapConcurrent } = require('./translate_level.cjs');

const RAW = path.join(__dirname, 'raw');
const DATA = path.join(__dirname, '..', 'src', 'data');
const LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1'];

function loadJsArray(file) {
  const raw = fs.readFileSync(file, 'utf-8');
  const start = raw.indexOf('[');
  const end = raw.lastIndexOf(']');
  return { arr: JSON.parse(raw.slice(start, end + 1)), exportName: (raw.match(/export const (\w+) =/) || [])[1] };
}

function writeJsArray(file, arr, exportName) {
  fs.writeFileSync(file, `export const ${exportName} = ${JSON.stringify(arr, null, 1)};\n`, 'utf-8');
}

function parseTab(file) {
  const out = {};
  fs.readFileSync(file, 'utf-8').split(/\r?\n/).forEach((line) => {
    if (!line || line.startsWith('question')) return;
    const [q, a] = line.split('\t');
    if (!q || !a) return;
    const clean = (s) =>
      s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim();
    out[clean(q)] = clean(a);
  });
  return out;
}

async function fixVocab(lv) {
  const raw = parseTab(path.join(RAW, `vocab-${lv}-kanji-eng.tab`));
  const file = path.join(DATA, `vocab_${lv}.js`);
  const { arr, exportName } = loadJsArray(file);
  const work = arr.filter((v) => v.example === null && v.meaning && v.meaning === raw[v.word]);
  await mapConcurrent(work, async (v) => {
    v.meaning = await translateText(v.meaning);
  });
  writeJsArray(file, arr, exportName);
  console.log(`vocab ${lv.toUpperCase()}: ${work.length} di-translate ulang`);
  return work.length;
}

async function fixGrammar(lv) {
  const raw = JSON.parse(fs.readFileSync(path.join(RAW, `grammar-${lv}.json`), 'utf-8'));
  const gMap = new Map(raw.map((g) => [g.pattern, g]));
  const file = path.join(DATA, `grammar_${lv}.js`);
  const { arr, exportName } = loadJsArray(file);
  const work = [];
  arr.forEach((g) => {
    const r = gMap.get(g.pattern);
    if (!r) return;
    if (g.explanation === r.meaning_en) work.push({ g, field: 'explanation' });
    if (g.structure === r.formation) work.push({ g, field: 'structure' });
    (g.examples || []).forEach((ex, i) => {
      if (ex.meaning === (r.examples[i] || {}).english) work.push({ ex, field: 'meaning' });
    });
  });
  await mapConcurrent(work, async (item) => {
    if (item.ex) item.ex.meaning = await translateText(item.ex.meaning);
    else item.g[item.field] = await translateText(item.g[item.field]);
  });
  writeJsArray(file, arr, exportName);
  console.log(`grammar ${lv.toUpperCase()}: ${work.length} teks di-translate ulang`);
  return work.length;
}

async function main() {
  const targets = process.argv.slice(2).length ? process.argv.slice(2) : ['vocab', 'grammar'];
  let total = 0;
  for (const lv of LEVELS) {
    if (targets.includes('vocab')) total += await fixVocab(lv);
    if (targets.includes('grammar')) total += await fixGrammar(lv);
  }
  console.log(`\nSelesai. Total: ${total} entri di-translate ulang.`);
}

main().catch((e) => {
  console.error('GAGAL:', e.message);
  process.exit(1);
});
