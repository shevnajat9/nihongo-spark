// Audit presisi: cek entri yang masih sama persis dengan sumber EN mentah.
// (isAscii tidak bisa membedakan EN vs ID — keduanya Latin.)
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const RAW = path.join(__dirname, 'raw');
const DATA = path.join(__dirname, '..', 'src', 'data');

function parseTab(file) {
  const out = {};
  fs.readFileSync(file, 'utf-8').split(/\r?\n/).forEach((line) => {
    if (!line || line.startsWith('question')) return;
    const [q, a] = line.split('\t');
    if (!q || !a) return;
    // clean identik dengan transform_vocab.cjs (termasuk entity &amp;)
    const clean = (s) =>
      s
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .trim();
    out[clean(q)] = clean(a);
  });
  return out;
}

(async () => {
  for (const lv of ['n5', 'n4', 'n3', 'n2', 'n1']) {
    const L = lv.toUpperCase();
    const raw = parseTab(path.join(RAW, `vocab-${lv}-kanji-eng.tab`));
    const mod = await import(pathToFileURL(path.join(DATA, `vocab_${lv}.js`)).href);
    const arr = mod[`vocab${L}`];
    const baru = arr.filter((v) => v.example === null);
    const stillEn = baru.filter((v) => v.meaning && v.meaning === raw[v.word]).length;
    console.log(`vocab ${L}: masih EN ${stillEn}/${baru.length}`);

    const gRaw = JSON.parse(fs.readFileSync(path.join(RAW, `grammar-${lv}.json`), 'utf-8'));
    const gMap = new Map(gRaw.map((g) => [g.pattern, g.meaning_en]));
    const gMod = await import(pathToFileURL(path.join(DATA, `grammar_${lv}.js`)).href);
    const gArr = gMod[`grammar${L}`];
    const gStill = gArr.filter((g) => g.explanation === gMap.get(g.pattern)).length;
    console.log(`grammar ${L}: explanation masih EN ${gStill}/${gArr.length}`);
  }
})();
