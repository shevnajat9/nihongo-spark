// Stage A2 — Download sumber data mentah ke scripts/raw/ (gitignored).
// Sumber:
//   vocab   : wkei/jlpt-vocab-api (deck tabs: kanji-eng & kanji-hiragana)
//   kanji   : kanjiapi.dev (daftar JLPT full)
//   grammar : jkindrix/japanese-language-data (grammar-curated)
const fs = require('fs');
const path = require('path');

const RAW_DIR = path.join(__dirname, 'raw');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const SOURCES = [
  // ── vocab (N5–N3 dulu, sesuai prioritas plan) ──
  ['vocab-n5-kanji-eng.tab', 'https://raw.githubusercontent.com/wkei/jlpt-vocab-api/main/data-source/tabs/n5-vocab-kanji-eng.anki.html'],
  ['vocab-n5-hiragana.tab', 'https://raw.githubusercontent.com/wkei/jlpt-vocab-api/main/data-source/tabs/n5-vocab-kanji-hiragana.anki.html'],
  ['vocab-n4-kanji-eng.tab', 'https://raw.githubusercontent.com/wkei/jlpt-vocab-api/main/data-source/tabs/n4-vocab-kanji-eng.anki.html'],
  ['vocab-n4-hiragana.tab', 'https://raw.githubusercontent.com/wkei/jlpt-vocab-api/main/data-source/tabs/n4-vocab-kanji-hiragana.anki.html'],
  ['vocab-n3-kanji-eng.tab', 'https://raw.githubusercontent.com/wkei/jlpt-vocab-api/main/data-source/tabs/n3-vocab-kanji-eng.anki.html'],
  ['vocab-n3-hiragana.tab', 'https://raw.githubusercontent.com/wkei/jlpt-vocab-api/main/data-source/tabs/n3-vocab-kanji-hiragana.anki.html'],
  // ── kanji (full, 5 level — satu sumber) ──
  ['kanji-jlpt-5.json', 'https://kanjiapi.dev/v1/kanji/jlpt-5'],
  ['kanji-jlpt-4.json', 'https://kanjiapi.dev/v1/kanji/jlpt-4'],
  ['kanji-jlpt-3.json', 'https://kanjiapi.dev/v1/kanji/jlpt-3'],
  ['kanji-jlpt-2.json', 'https://kanjiapi.dev/v1/kanji/jlpt-2'],
  ['kanji-jlpt-1.json', 'https://kanjiapi.dev/v1/kanji/jlpt-1'],
  // ── grammar (N5–N3 dulu) ──
  ['grammar-n5.json', 'https://raw.githubusercontent.com/jkindrix/japanese-language-data/main/grammar-curated/n5.json'],
  ['grammar-n4.json', 'https://raw.githubusercontent.com/jkindrix/japanese-language-data/main/grammar-curated/n4.json'],
  ['grammar-n3.json', 'https://raw.githubusercontent.com/jkindrix/japanese-language-data/main/grammar-curated/n3.json'],
];

async function main() {
  fs.mkdirSync(RAW_DIR, { recursive: true });
  let ok = 0;
  for (const [name, url] of SOURCES) {
    const target = path.join(RAW_DIR, name);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(target, buf);
      console.log(`OK   ${name} (${(buf.length / 1024).toFixed(0)} KB)`);
      ok++;
    } catch (e) {
      console.error(`FAIL ${name}: ${e.message}`);
    }
    await sleep(150);
  }
  console.log(`\nSelesai: ${ok}/${SOURCES.length} file tersimpan di scripts/raw/`);
  process.exit(ok === SOURCES.length ? 0 : 1);
}

main();
