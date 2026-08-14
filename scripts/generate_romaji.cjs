// Fase 2 — Generate romaji (Hepburn) dari reading hiragana untuk semua vocab.
// Pemakaian: node scripts/generate_romaji.cjs [n5|n4|n3|n2|n1 ...] — default semua
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'src', 'data');

// mapping kana → romaji (Hepburn dasar)
const SMALL = { ぁ: 'a', ぃ: 'i', ぅ: 'u', ぇ: 'e', ぉ: 'o' };
const BASE = {
  あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o',
  か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko',
  さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so',
  た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to',
  な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no',
  は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho',
  ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo',
  や: 'ya', ゆ: 'yu', よ: 'yo',
  ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro',
  わ: 'wa', を: 'o', ん: 'n',
  が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go',
  ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo',
  だ: 'da', ぢ: 'ji', づ: 'zu', で: 'de', ど: 'do',
  ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo',
  ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po',
  ゔ: 'vu', ー: '',
};
// yōon: き/に/ひ/み/り/ぎ/び/ぴ → +ya/yu/yo (kya, nya…)
//       し/ち/じ       → +a/u/o   (sha, cha, ja — tanpa y)
const YOON_KEEP_Y = { き: 'k', に: 'n', ひ: 'h', み: 'm', り: 'r', ぎ: 'g', び: 'b', ぴ: 'p' };
const YOON_DROP_Y = { し: 'sh', ち: 'ch', じ: 'j' };
const YOON_TAIL_KEEP = { ゃ: 'ya', ゅ: 'yu', ょ: 'yo' };
const YOON_TAIL_DROP = { ゃ: 'a', ゅ: 'u', ょ: 'o' };

function kanaToRomaji(kana) {
  // katakana → hiragana dulu (ペン → ぺん), lalu petakan
  const hira = kana.replace(/[\u30a1-\u30f6]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
  let out = '';
  for (let i = 0; i < hira.length; i++) {
    const c = hira[i];
    if (SMALL[c]) { out += SMALL[c]; continue; }
    if (c === 'っ' && i + 1 < hira.length) {
      // sokuon: gandakan konsonan awal suku berikut
      const next = hira[i + 1];
      const nextRomaji = BASE[next];
      if (nextRomaji && nextRomaji.length > 0) {
        const ch = nextRomaji[0];
        out += (ch === 'c' ? 't' : ch); // っち → tchi
      }
      continue;
    }
    if (YOON_KEEP_Y[c] && YOON_TAIL_KEEP[hira[i + 1]]) {
      out += YOON_KEEP_Y[c] + YOON_TAIL_KEEP[hira[i + 1]];
      i++;
      continue;
    }
    if (YOON_DROP_Y[c] && YOON_TAIL_DROP[hira[i + 1]]) {
      out += YOON_DROP_Y[c] + YOON_TAIL_DROP[hira[i + 1]];
      i++;
      continue;
    }
    if (BASE[c]) out += BASE[c];
  }
  return out;
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
  const levels = process.argv.slice(2).length ? process.argv.slice(2) : ['n5', 'n4', 'n3', 'n2', 'n1'];
  for (const lv of levels) {
    const file = path.join(DATA, `vocab_${lv}.js`);
    const { arr, exportName } = loadJsArray(file);
    let filled = 0;
    for (const v of arr) {
      if (v.reading) {
        const romaji = kanaToRomaji(v.reading);
        if (romaji) {
          v.romaji = romaji; // selalu hitung ulang dari reading (sumber kebenaran)
          filled++;
        }
      }
    }
    writeJsArray(file, arr, exportName);
    console.log(`vocab ${lv.toUpperCase()}: ${filled} romaji diisi`);
  }
  console.log('Selesai.');
}

if (require.main === module) {
  main();
}
