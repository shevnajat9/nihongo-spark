// Stage D — Transform grammar dari jkindrix/japanese-language-data (N5-N3):
// mapping ke format grammar.js app + reading hiragana via kuromoji untuk tiap contoh.
const fs = require('fs');
const path = require('path');
const { readingFor } = require('./generate_readings.cjs');

const RAW = path.join(__dirname, 'raw');
const DATA = path.join(__dirname, '..', 'src', 'data');

async function buildLevel(lv) {
  const LEVEL = lv.toUpperCase();
  const src = JSON.parse(fs.readFileSync(path.join(RAW, `grammar-${lv}.json`), 'utf-8'));

  const out = [];
  let noReading = 0;
  let totalEx = 0;

  for (const g of src) {
    const examples = [];
    for (const ex of g.examples || []) {
      totalEx++;
      const reading = await readingFor(ex.japanese);
      if (!reading) noReading++;
      examples.push({
        sentence: ex.japanese,
        reading: reading || null,
        romaji: '',
        meaning: ex.english || '',
      });
    }

    out.push({
      pattern: g.pattern,
      level: LEVEL,
      structure: g.formation || '',
      explanation: g.meaning_en || '',
      note: g.meaning_detailed || '', // referensi EN (panjang), tidak diterjemahkan
      formality: g.formality || '',
      related: g.related || [],
      sources: g.sources || [],
      examples,
    });
  }

  console.log(`[${LEVEL}] ${out.length} pola | ${totalEx} contoh | tanpa reading: ${noReading}`);
  return out;
}

async function main() {
  // Pemakaian: node scripts/transform_grammar.cjs [n5|n4|n3|n2|n1 ...] — default semua
  const levels = process.argv.slice(2).length ? process.argv.slice(2) : ['n5', 'n4', 'n3', 'n2', 'n1'];
  for (const lv of levels) {
    const entries = await buildLevel(lv);
    const file = path.join(DATA, `grammar_${lv}.js`);
    const content = `export const grammar${lv.toUpperCase()} = ${JSON.stringify(entries, null, 1)};\n`;
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`  → ${file} (${(Buffer.byteLength(content) / 1024).toFixed(0)} KB)`);
  }
  console.log('\nTransform grammar selesai.');
}

main().catch((e) => {
  console.error('GAGAL:', e.message);
  process.exit(1);
});
