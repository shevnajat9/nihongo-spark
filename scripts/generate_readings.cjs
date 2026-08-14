// Helper kuromoji untuk build script data:
//  - readingFor(text)  : hiragana reading dari kalimat/kata (katakana → hiragana)
//  - posFor(word)      : part of speech akurat dari tokenizer (bukan tebakan akhiran)
// Hanya dipakai di build-time (devDependency kuromoji, tidak ikut bundle app).
const kuromoji = require('kuromoji');
const path = require('path');

let tokenizerPromise = null;

function getTokenizer() {
  if (!tokenizerPromise) {
    tokenizerPromise = new Promise((resolve, reject) => {
      kuromoji
        .builder({ dicPath: path.join(__dirname, '..', 'node_modules', 'kuromoji', 'dict') })
        .build((err, tk) => (err ? reject(err) : resolve(tk)));
    });
  }
  return tokenizerPromise;
}

// マイアサ → まいあさ (reading kuromoji selalu katakana)
function katakanaToHiragana(s) {
  return s.replace(/[\u30a1-\u30f6]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
}

const KANA = /[\u3040-\u30ff]/;

// Reading hiragana untuk teks Jepang. Tanda baca dipertahankan.
async function readingFor(text) {
  if (!text) return '';
  const tk = await getTokenizer();
  const tokens = tk.tokenize(text);
  const reading = tokens
    .map((t) => (t.reading ? katakanaToHiragana(t.reading) : t.surface_form))
    .join('');
  return KANA.test(reading) ? reading : '';
}

// POS dari token pertama (kuromoji tag: 動詞/形容詞/形容動詞/名詞+サ変接続).
async function posFor(word) {
  if (!word) return 'Kata Benda';
  const tk = await getTokenizer();
  const tokens = tk.tokenize(word);
  const t = tokens[0];
  if (!t) return 'Kata Benda';
  if (t.pos === '動詞') return 'Kata Kerja';
  if (t.pos === '形容詞') return 'Kata Sifat I';
  if (t.pos === '形容動詞') return 'Kata Sifat Na';
  if (t.pos === '名詞' && (t.pos_detail_1 === 'サ変接続' || word.endsWith('する'))) return 'Kata Kerja (V3)';
  return 'Kata Benda';
}

module.exports = { readingFor, posFor };
