// Contoh kalimat dari Tatoeba untuk vocab yang belum punya contoh.
// Pemakaian: node scripts/fetch_examples.cjs [n5|n4|n3|n2|n1 ...] — default semua
// Alur per kata:
//   1. Tatoeba search (query = kata, filter trans_to=eng, limit 20)
//   2. Pilih kalimat terbaik: mengandung kata, panjang 8–45, ada terjemahan EN, cenderung pendek
//   3. Reading hiragana via kuromoji; arti contoh = terjemahan EN → ID (Google)
// Resume-friendly: entri yang sudah punya example dilewati.
const fs = require('fs');
const path = require('path');
const { translateText } = require('./translate_level.cjs');
const { readingFor } = require('./generate_readings.cjs');

const DATA = path.join(__dirname, '..', 'src', 'data');

const FETCH_CONCURRENCY = 5; // Tatoeba — latency ~1.3s/req, paralel 5 ≈ 0.26s/kata
const CHECKPOINT_EVERY = 50; // tulis progres berkala biar aman dihentikan/dilanjutkan
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function loadJsArray(file) {
  const raw = fs.readFileSync(file, 'utf-8');
  const start = raw.indexOf('[');
  const end = raw.lastIndexOf(']');
  return { arr: JSON.parse(raw.slice(start, end + 1)), exportName: (raw.match(/export const (\w+) =/) || [])[1] };
}

function writeJsArray(file, arr, exportName) {
  fs.writeFileSync(file, `export const ${exportName} = ${JSON.stringify(arr, null, 1)};\n`, 'utf-8');
}

async function searchTatoeba(word) {
  const url = `https://tatoeba.org/en/api_v0/search?from=jpn&query=${encodeURIComponent(word)}&to=eng&trans_to=eng&limit=50&sort=relevance`;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'NihongoSpark/1.0 (learning app)' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json.results || [];
    } catch {
      if (attempt === 2) return null;
      await sleep(1500 * attempt);
    }
  }
  return null;
}

// Pilih kalimat terbaik: mengandung kata, 6–50 karakter, ada terjemahan EN, prefer pendek.
function pickBest(results, word) {
  const candidates = (results || []).filter((r) => {
    const t = r.text || '';
    if (!t.includes(word)) return false;
    if (t.length < 6 || t.length > 50) return false;
    const eng = r.translations && r.translations[0] && r.translations[0].find((tr) => tr.lang === 'eng');
    if (!eng || !eng.text) return false;
    return true;
  });
  if (!candidates.length) return null;
  candidates.sort((a, b) => a.text.length - b.text.length);
  const best = candidates[0];
  const eng = best.translations[0].find((tr) => tr.lang === 'eng');
  return { sentence: best.text, eng: eng.text, id: best.id };
}

async function processLevel(lv) {
  const file = path.join(DATA, `vocab_${lv}.js`);
  const { arr, exportName } = loadJsArray(file);
  const work = arr.filter((v) => !v.example); // resume: skip yang sudah punya contoh
  let found = 0;
  let processed = 0;
  let consecutiveFail = 0;

  for (let i = 0; i < work.length; i += FETCH_CONCURRENCY) {
    const chunk = work.slice(i, i + FETCH_CONCURRENCY);
    const results = await Promise.all(
      chunk.map(async (v) => {
        const res = await searchTatoeba(v.word);
        if (res === null) return { failed: true, ok: false }; // request gagal (rate-limit/dll)
        const best = pickBest(res, v.word);
        if (best) {
          v.example = best.sentence;
          v.exampleReading = await readingFor(best.sentence);
          v.exampleMeaning = await translateText(best.eng);
          found++;
          return { failed: false, ok: true };
        }
        return { failed: false, ok: false }; // sukses tapi tidak ada kalimat cocok
      })
    );
    // Adaptive backoff: hanya request yang GAGAL dihitung sebagai sinyal rate-limit.
    const failures = results.filter((r) => r.failed).length;
    consecutiveFail = failures > 0 ? consecutiveFail + failures : 0;
    if (consecutiveFail >= 10) {
      const pause = consecutiveFail >= 25 ? 120000 : 30000;
      console.log(`  ⏸ rate-limit: jeda ${pause / 1000}s (${consecutiveFail} gagal beruntun)...`);
      await sleep(pause);
      consecutiveFail = 0;
    } else {
      await sleep(150);
    }

    processed += chunk.length;
    // checkpoint: simpan progres berkala (aman di-kill & dilanjutkan)
    if (processed % CHECKPOINT_EVERY < FETCH_CONCURRENCY) {
      writeJsArray(file, arr, exportName);
      console.log(`  ${lv.toUpperCase()}: ${processed}/${work.length} diproses (${found} contoh)...`);
    }
  }

  writeJsArray(file, arr, exportName);
  const stillNull = arr.filter((v) => !v.example).length;
  console.log(`[${lv.toUpperCase()}] ${found} contoh ditambahkan | masih kosong: ${stillNull}`);
  return found;
}

async function main() {
  const levels = process.argv.slice(2).length ? process.argv.slice(2) : ['n5', 'n4', 'n3', 'n2', 'n1'];
  let total = 0;
  for (const lv of levels) {
    total += await processLevel(lv);
  }
  console.log(`\nSelesai. Total contoh ditambahkan: ${total}`);
}

main().catch((e) => {
  console.error('GAGAL:', e.message);
  process.exit(1);
});
