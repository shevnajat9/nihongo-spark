# Nihongo Spark

Aplikasi web untuk belajar bahasa Jepang, dibangun dengan **React + Vite**.

## Fitur

- **Dashboard** — ringkasan progres, streak belajar, dan checklist harian (N5–N1)
- **Huruf Kana** — chart hiragana & katakana
- **Kosakata (Mojigoi)** — latihan vocab berdasarkan level JLPT
- **Kanji** — latihan kanji per level
- **Tata Bahasa** — materi grammar per level
- **Latihan Kuis** — kuis interaktif dengan pelacakan statistik

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
