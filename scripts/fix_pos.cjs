// Perbaiki partOfSpeech vocab dengan JMDict (jmdict-simplified eng-common).
// Cocokkan word/reading → entri JMDict → kode POS → kategori app.
// Kata yang tidak ketemu di JMDict tetap memakai POS lama (kuromoji).
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'src', 'data');
const JMDICT_FILE = path.join(__dirname, 'raw', 'jmdict-eng-common-3.6.2.json');

// kode JMDict → kategori app. Dalam satu sense, vs (suru-verb) didahulukan
// dari n — kata seperti 勉強/掃除 (n,vs) memang V3 di daftar JLPT.
function mapPos(codes) {
  const c = codes || [];
  if (c.some((x) => x === 'vs' || x === 'vs-c' || x === 'vs-s' || x === 'vs-i')) return 'Kata Kerja (V3)';
  if (c.some((x) => x.startsWith('v'))) return 'Kata Kerja';
  if (c.some((x) => x === 'adj-i' || x === 'adj-ix')) return 'Kata Sifat I';
  if (c.some((x) => x === 'adj-na')) return 'Kata Sifat Na';
  if (c.some((x) => x === 'adv' || x === 'adv-to')) return 'Kata Keterangan';
  if (c.some((x) => x === 'pn')) return 'Kata Ganti';
  if (c.some((x) => x === 'conj')) return 'Kata Sambung';
  if (c.some((x) => x === 'int')) return 'Kata Seru';
  if (c.some((x) => x.startsWith('n') || x === 'num' || x === 'prt' || x === 'pref' || x === 'suf')) return 'Kata Benda';
  return 'Lainnya';
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

function main() {
  const jmdict = JSON.parse(fs.readFileSync(JMDICT_FILE, 'utf-8'));
  const words = jmdict.words;

  // indeks: kanji text & kana text → entri
  const byKanji = new Map();
  const byKana = new Map();
  for (const w of words) {
    for (const k of w.kanji || []) {
      if (!byKanji.has(k.text)) byKanji.set(k.text, []);
      byKanji.get(k.text).push(w);
    }
    for (const k of w.kana || []) {
      if (!byKana.has(k.text)) byKana.set(k.text, []);
      byKana.get(k.text).push(w);
    }
  }

  const resolve = (word, reading) => {
    // 1) preferensi: pasangan kanji+reading yang cocok di entri yang sama
    const kCands = (byKanji.get(word) || []).filter((w) => !reading || (w.kana || []).some((k) => k.text === reading));
    const cand = kCands[0] || (byKanji.get(word) || [])[0] || (byKana.get(reading) || [])[0] || (byKana.get(word) || [])[0];
    if (!cand) return null;
    return mapPos(cand.sense[0] && cand.sense[0].partOfSpeech);
  };

  let totalFixed = 0;
  let totalMatched = 0;
  let totalUnmatched = 0;

  for (const lv of ['n5', 'n4', 'n3', 'n2', 'n1']) {
    const file = path.join(DATA, `vocab_${lv}.js`);
    const { arr, exportName } = loadJsArray(file);
    let matched = 0;
    let changed = 0;
    for (const v of arr) {
      const pos = resolve(v.word, v.reading);
      if (pos) {
        matched++;
        if (v.partOfSpeech !== pos) changed++;
        v.partOfSpeech = pos;
      }
    }
    writeJsArray(file, arr, exportName);
    const unmatched = arr.length - matched;
    totalFixed += changed;
    totalMatched += matched;
    totalUnmatched += unmatched;
    console.log(`[${lv.toUpperCase()}] JMDict match: ${matched}/${arr.length} | POS berubah: ${changed} | tidak ketemu: ${unmatched}`);
  }

  console.log(`\nTotal: ${totalMatched} cocok JMDict, ${totalUnmatched} tetap POS lama, ${totalFixed} POS berubah.`);
}

main();
