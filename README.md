# Nihongo Spark

Aplikasi web untuk belajar bahasa Jepang, dibangun dengan **React + Vite**.

## Fitur

- **Dashboard** — ringkasan progres, streak belajar, dan checklist harian (N5–N1)
- **Huruf Kana** — chart hiragana & katakana
- **Kosakata (Mojigoi)** — latihan vocab berdasarkan level JLPT
- **Kanji** — latihan kanji per level
- **Tata Bahasa** — materi grammar per level
- **Latihan Kuis** — kuis interaktif dengan pelacakan statistik
- **Latihan JLPT** — simulasi ujian ala JLPT asli: 4 seksi (文字・語彙, 文法, 読解, 聴解) dengan jumlah soal & durasi mengikuti ujian asli (N5: 52 soal · N1: 134 soal), timer per seksi, listening via audio, & pembahasan lengkap

Progres penyimpanan lokal via `localStorage` (level & statistik belajar).

## Teknologi

- React 19
- Vite 8
- Oxlint (linting)

## Cara Menjalankan

```bash
npm install
npm run dev      # mode development
npm run build    # build produksi ke dist/
npm run preview  # preview hasil build
npm run lint     # cek lint
```

## Struktur

```
src/
  App.jsx              # router navigasi antar-fitur
  components/          # Dashboard, KanaChart, VocabStudy, KanjiStudy, GrammarStudy, Quiz
  data/                # kana.js, vocab.js, kanji.js, grammar.js
  assets/              # gambar & ikon
fetch_data.cjs / .js   # pengambilan data
translate_data.cjs     # penerjemahan data
update_all_data.cjs    # pembaruan seluruh data
```

## Lisensi

Proyek pribadi.

## Sumber Data

Data belajar diambil dari sumber terbuka dan ditransform/diterjemahkan untuk aplikasi ini:

- **Kanji** — [kanjiapi.dev](https://kanjiapi.dev/) & [kanji-data](https://github.com/davidluzgouveia/kanji-data) (daftar JLPT, on/kun-yomi, stroke)
- **Kosakata** — [jlpt-vocab-api](https://github.com/wkei/jlpt-vocab-api) (deck JLPT per level)
- **Tata Bahasa** — [japanese-language-data](https://github.com/jkindrix/japanese-language-data) oleh Justin Kindrix & kontributor, lisensi [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- **Reading hiragana** — dihasilkan dengan [kuromoji.js](https://github.com/takuyaa/kuromoji.js)
- **Terjemahan Indonesia** — Google Translate (endpoint publik), diverifikasi manual sebagian

Skrip pipeline data ada di `scripts/` (fetch → transform → translate → audit); data mentah tidak disimpan di repo.
