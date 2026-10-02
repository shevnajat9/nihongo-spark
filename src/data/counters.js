// Database Satuan Hitung Benda Jepang (Joshuushi / 助数詞)
// Lengkap dengan aturan fonetik (Sokuon/Rendaku), tabel 1-10, contoh benda, dan soal drill.

export const countersData = [
  {
    id: 'tsu',
    kanji: 'つ',
    name: 'Tsu (Umum / Abstrak)',
    category: 'Benda Umum & Abstrak',
    description: 'Satuan hitung bilangan asli Jepang (Wago) untuk benda umum, ide, pertanyaan, usia anak kecil (1-9). Maksimal sampai 10 (Too).',
    examples: ['Apel', 'Jeruk', 'Ide', 'Pertanyaan', 'Kado', 'Rencana'],
    soundRules: 'Memakai sistem wago (hitotsu, futatsu...). Di atas 10 biasanya beralih ke satuan -ko (個) atau angka biasa.',
    readings: {
      1: { kanji: '一つ', kana: 'ひとつ', romaji: 'hitotsu', note: 'Bentuk wago reguler' },
      2: { kanji: '二つ', kana: 'ふたつ', romaji: 'futatsu', note: 'Bentuk wago reguler' },
      3: { kanji: '三つ', kana: 'みっつ', romaji: 'mittsu', note: 'Sokuon (konsonan ganda)' },
      4: { kanji: '四つ', kana: 'よっつ', romaji: 'yottsu', note: 'Sokuon (bukan yon)' },
      5: { kanji: '五つ', kana: 'いつつ', romaji: 'itsutsu', note: 'Bentuk wago reguler' },
      6: { kanji: '六つ', kana: 'むっつ', romaji: 'muttsu', note: 'Sokuon' },
      7: { kanji: '七つ', kana: 'ななつ', romaji: 'nanatsu', note: 'Bentuk wago reguler' },
      8: { kanji: '八つ', kana: 'やっつ', romaji: 'yattsu', note: 'Sokuon' },
      9: { kanji: '九つ', kana: 'ここのつ', romaji: 'kokonotsu', note: 'Bentuk wago reguler' },
      10: { kanji: '十', kana: 'とお', romaji: 'too', note: 'Khusus: tanpa akhiran tsu!' },
      question: { kanji: '幾つ', kana: 'いくつ', romaji: 'ikutsu', note: 'Berapa banyak?' }
    }
  },
  {
    id: 'hon',
    kanji: '本',
    name: 'Hon (Benda Panjang & Silinder)',
    category: 'Bentuk Fisik Panjang',
    description: 'Untuk benda silindris, panjang, dan memanjang seperti pena, botol, payung, pisang, pohon, jalur kereta, film/video, panggilan telepon.',
    examples: ['Pulpen', 'Pensil', 'Botol', 'Payung', 'Pohon', 'Kereta', 'Panggilan Telepon', 'Video YouTube'],
    soundRules: 'Perubahan bunyi intensif: Sokuon p-sound (1, 6, 8, 10: -ppon) dan Rendaku b-sound (3, ??: -bon).',
    readings: {
      1: { kanji: '一本', kana: 'いっぽん', romaji: 'ippon', irregular: 'sokuon', note: 'Sokuon + p-sound' },
      2: { kanji: '二本', kana: 'にほん', romaji: 'nihon', note: 'Reguler h-sound' },
      3: { kanji: '三本', kana: 'さんぼん', romaji: 'sanbon', irregular: 'rendaku', note: 'Rendaku (b-sound)' },
      4: { kanji: '四本', kana: 'よんほん', romaji: 'yonhon', note: 'Reguler yon + hon' },
      5: { kanji: '五本', kana: 'ごほん', romaji: 'gohon', note: 'Reguler' },
      6: { kanji: '六本', kana: 'ろっぽん', romaji: 'roppon', irregular: 'sokuon', note: 'Sokuon + p-sound' },
      7: { kanji: '七本', kana: 'ななほん', romaji: 'nanahon', note: 'Umumnya nanahon' },
      8: { kanji: '八本', kana: 'はっぽん', romaji: 'happon', irregular: 'sokuon', note: 'Sokuon + p-sound (bisa juga hachihon)' },
      9: { kanji: '九本', kana: 'きゅうほん', romaji: 'kyuuhon', note: 'Reguler' },
      10: { kanji: '十本', kana: 'じゅっぽん / じっぽん', romaji: 'juppon / jippon', irregular: 'sokuon', note: 'Sokuon + p-sound' },
      question: { kanji: '何本', kana: 'なんぼん', romaji: 'nanbon', irregular: 'rendaku', note: 'Rendaku: nanbon?' }
    }
  },
  {
    id: 'mai',
    kanji: '枚',
    name: 'Mai (Benda Tipis & Rata)',
    category: 'Bentuk Fisik Rata',
    description: 'Untuk benda tipis, lembaran, dan rata seperti kertas, piring, baju/kaos, foto, tiket, kartu, uang kertas, pizza.',
    examples: ['Kertas', 'Tiket', 'Baju / Kaos', 'Piring', 'Foto', 'Kartu Kredit', 'Uang Kertas'],
    soundRules: 'Sangat teratur! Tidak ada perubahan sokuon ataupun rendaku. Hanya pasangkan angka + mai.',
    readings: {
      1: { kanji: '一枚', kana: 'いちまい', romaji: 'ichimai', note: 'Reguler' },
      2: { kanji: '二枚', kana: 'にまい', romaji: 'nimai', note: 'Reguler' },
      3: { kanji: '三枚', kana: 'さんまい', romaji: 'sanmai', note: 'Reguler' },
      4: { kanji: '四枚', kana: 'よんまい', romaji: 'yonmai', note: 'Yon + mai' },
      5: { kanji: '五枚', kana: 'ごまい', romaji: 'gomai', note: 'Reguler' },
      6: { kanji: '六枚', kana: 'ろくまい', romaji: 'rokumai', note: 'Reguler' },
      7: { kanji: '七枚', kana: 'ななまい', romaji: 'nanamai', note: 'Nanamai' },
      8: { kanji: '八枚', kana: 'はちまい', romaji: 'hachimai', note: 'Reguler' },
      9: { kanji: '九枚', kana: 'きゅうまい', romaji: 'kyuumai', note: 'Reguler' },
      10: { kanji: '十枚', kana: 'じゅうまい', romaji: 'juumai', note: 'Reguler' },
      question: { kanji: '何枚', kana: 'なんまい', romaji: 'nanmai', note: 'Berapa lembar?' }
    }
  },
  {
    id: 'ko',
    kanji: '個',
    name: 'Ko (Benda Kecil & Bulat/Kotak)',
    category: 'Benda Fisik Kecil',
    description: 'Untuk benda 3 dimensi kecil, buah bulat, telur, batu, permen, bola, kotak pembungkus, penghapus, dan item konkret.',
    examples: ['Apel', 'Telur', 'Permen', 'Penghapus', 'Bola', 'Batu', 'Stroberi'],
    soundRules: 'Perubahan bunyi sokuon pada 1, 6, 8, 10 (-kko). 3 tetap sanko.',
    readings: {
      1: { kanji: '一個', kana: 'いっこ', romaji: 'ikko', irregular: 'sokuon', note: 'Sokuon (ikko)' },
      2: { kanji: '二個', kana: 'にこ', romaji: 'niko', note: 'Reguler' },
      3: { kanji: '三個', kana: 'さんこ', romaji: 'sanko', note: 'Reguler' },
      4: { kanji: '四個', kana: 'よんこ', romaji: 'yonko', note: 'Yon + ko' },
      5: { kanji: '五個', kana: 'ごこ', romaji: 'goko', note: 'Reguler' },
      6: { kanji: '六個', kana: 'ろっこ', romaji: 'rokko', irregular: 'sokuon', note: 'Sokuon (rokko)' },
      7: { kanji: '七個', kana: 'ななこ', romaji: 'nanako', note: 'Nanako' },
      8: { kanji: '八個', kana: 'はっこ', romaji: 'hakko', irregular: 'sokuon', note: 'Sokuon (hakko / hachiko)' },
      9: { kanji: '九個', kana: 'きゅうこ', romaji: 'kyuuko', note: 'Reguler' },
      10: { kanji: '十個', kana: 'じゅっこ / じっこ', romaji: 'jukko / jikko', irregular: 'sokuon', note: 'Sokuon (jukko)' },
      question: { kanji: '何個', kana: 'なんこ', romaji: 'nanko', note: 'Berapa buah?' }
    }
  },
  {
    id: 'hai',
    kanji: '杯',
    name: 'Hai (Gelas, Cangkir, Mangkuk Berisi)',
    category: 'Wadah Minuman/Makanan',
    description: 'Untuk cangkir kopi, gelas air, mangkuk sup/ramen, sendok takar cair.',
    examples: ['Cangkir Kopi', 'Segelas Air', 'Semangkuk Ramen', 'Segelas Bir', 'Sendok Teh'],
    soundRules: 'Mengikuti pola h-sound: Sokuon p-sound (1, 6, 8, 10: -ppai) dan Rendaku b-sound (3: sanbai, nanbai).',
    readings: {
      1: { kanji: '一杯', kana: 'いっぱい', romaji: 'ippai', irregular: 'sokuon', note: 'Ippai (juga bermakna: penuh/banyak)' },
      2: { kanji: '二杯', kana: 'にはい', romaji: 'nihai', note: 'Reguler' },
      3: { kanji: '三杯', kana: 'さんばい', romaji: 'sanbai', irregular: 'rendaku', note: 'Rendaku (sanbai)' },
      4: { kanji: '四杯', kana: 'よんはい', romaji: 'yonhai', note: 'Yonhai' },
      5: { kanji: '五杯', kana: 'ごはい', romaji: 'gohai', note: 'Reguler' },
      6: { kanji: '六杯', kana: 'ろっぱい', romaji: 'roppai', irregular: 'sokuon', note: 'Sokuon (roppai)' },
      7: { kanji: '七杯', kana: 'ななはい', romaji: 'nanahai', note: 'Nanahai' },
      8: { kanji: '八杯', kana: 'はっぱい', romaji: 'happai', irregular: 'sokuon', note: 'Sokuon (happai)' },
      9: { kanji: '九杯', kana: 'きゅうはい', romaji: 'kyuuhai', note: 'Reguler' },
      10: { kanji: '十杯', kana: 'じゅっぱい / じっぱい', romaji: 'juppai / jippai', irregular: 'sokuon', note: 'Sokuon (juppai)' },
      question: { kanji: '何杯', kana: 'なんばい', romaji: 'nanbai', irregular: 'rendaku', note: 'Rendaku (nanbai?)' }
    }
  },
  {
    id: 'hiki',
    kanji: '匹',
    name: 'Hiki (Hewan Kecil, Serangga, Ikan)',
    category: 'Makhluk Hidup',
    description: 'Untuk binatang berukuran kecil hingga menengah yang bisa digendong manusia: anjing, kucing, ikan, serangga, tikus, katak.',
    examples: ['Kucing', 'Anjing', 'Ikan Mas', 'Nyamuk', 'Kelinci (kadang)', 'Tikus'],
    soundRules: 'Mengikuti pola h-sound: Sokuon p-sound (1, 6, 8, 10: -ppiki) dan Rendaku b-sound (3: sanbiki, nanbiki).',
    readings: {
      1: { kanji: '一匹', kana: 'いっぴき', romaji: 'ippiki', irregular: 'sokuon', note: 'Sokuon (ippiki)' },
      2: { kanji: '二匹', kana: 'にひき', romaji: 'nihiki', note: 'Reguler' },
      3: { kanji: '三匹', kana: 'さんびき', romaji: 'sanbiki', irregular: 'rendaku', note: 'Rendaku (sanbiki)' },
      4: { kanji: '四匹', kana: 'よんひき', romaji: 'yonhiki', note: 'Yonhiki' },
      5: { kanji: '五匹', kana: 'ごひき', romaji: 'gohiki', note: 'Reguler' },
      6: { kanji: '六匹', kana: 'ろっぴき', romaji: 'roppiki', irregular: 'sokuon', note: 'Sokuon (roppiki)' },
      7: { kanji: '七匹', kana: 'ななひき', romaji: 'nanahiki', note: 'Nanahiki' },
      8: { kanji: '八匹', kana: 'はっぴき', romaji: 'happiki', irregular: 'sokuon', note: 'Sokuon (happiki)' },
      9: { kanji: '九匹', kana: 'きゅうひき', romaji: 'kyuuhiki', note: 'Reguler' },
      10: { kanji: '十匹', kana: 'じゅっぴき / じっぴき', romaji: 'juppiki / jippiki', irregular: 'sokuon', note: 'Sokuon (juppiki)' },
      question: { kanji: '何匹', kana: 'なんびき', romaji: 'nanbiki', irregular: 'rendaku', note: 'Rendaku (nanbiki?)' }
    }
  },
  {
    id: 'tou',
    kanji: '頭',
    name: 'Tou (Hewan Besar)',
    category: 'Makhluk Hidup',
    description: 'Untuk hewan berukuran besar yang melebihi ukuran manusia: sapi, kuda, gajah, singa, beruang, ikan paus.',
    examples: ['Sapi', 'Kuda', 'Gajah', 'Singa', 'Ikan Paus', 'Beruang'],
    soundRules: 'Sangat teratur dengan akhiran -tou (ittou, nitou, santou, yontou...). 1 ada sokuon (ittou).',
    readings: {
      1: { kanji: '一頭', kana: 'いっとう', romaji: 'ittou', irregular: 'sokuon', note: 'Sokuon (ittou)' },
      2: { kanji: '二頭', kana: 'にごとう', romaji: 'nitou', note: 'Nitou' },
      3: { kanji: '三頭', kana: 'さんとう', romaji: 'santou', note: 'Santou' },
      4: { kanji: '四頭', kana: 'よんとう', romaji: 'yontou', note: 'Yontou' },
      5: { kanji: '五頭', kana: 'ごとう', romaji: 'gotou', note: 'Reguler' },
      6: { kanji: '六頭', kana: 'ろくとう', romaji: 'rokutou', note: 'Rokutou' },
      7: { kanji: '七頭', kana: 'ななとう', romaji: 'nanatou', note: 'Nanatou' },
      8: { kanji: '八頭', kana: 'はっとう', romaji: 'hattou', irregular: 'sokuon', note: 'Hattou / Hachitou' },
      9: { kanji: '九頭', kana: 'きゅうとう', romaji: 'kyuutou', note: 'Reguler' },
      10: { kanji: '十頭', kana: 'じゅっとう', romaji: 'juttou', irregular: 'sokuon', note: 'Juttou' },
      question: { kanji: '何頭', kana: 'なんとう', romaji: 'nantou', note: 'Berapa ekor besar?' }
    }
  },
  {
    id: 'dai',
    kanji: '台',
    name: 'Dai (Kendaraan, Mesin & Elektronik)',
    category: 'Mesin & Kendaraan',
    description: 'Untuk mobil, sepeda motor, sepeda, laptop, komputer, kulkas, televisi, mesin pabrik.',
    examples: ['Mobil', 'Motor', 'Sepeda', 'Komputer / Laptop', 'Smartphone', 'Televisi', 'Kulkas'],
    soundRules: 'Teratur! Angka + dai (ichidai, nidai, sandai, yondai...).',
    readings: {
      1: { kanji: '一台', kana: 'いちだい', romaji: 'ichidai', note: 'Reguler' },
      2: { kanji: '二台', kana: 'にだい', romaji: 'nidai', note: 'Reguler' },
      3: { kanji: '三台', kana: 'さんだい', romaji: 'sandai', note: 'Reguler' },
      4: { kanji: '四台', kana: 'よんだい', romaji: 'yondai', note: 'Yondai' },
      5: { kanji: '五台', kana: 'ごだい', romaji: 'godai', note: 'Reguler' },
      6: { kanji: '六台', kana: 'ろくだい', romaji: 'rokudai', note: 'Reguler' },
      7: { kanji: '七台', kana: 'ななだい', romaji: 'nanadai', note: 'Nanadai' },
      8: { kanji: '八台', kana: 'はちだい', romaji: 'hachidai', note: 'Hachidai' },
      9: { kanji: '九台', kana: 'きゅうだい', romaji: 'kyuudai', note: 'Reguler' },
      10: { kanji: '十台', kana: 'じゅうだい', romaji: 'juudai', note: 'Reguler' },
      question: { kanji: '何台', kana: 'なんだい', romaji: 'nandai', note: 'Berapa unit?' }
    }
  },
  {
    id: 'satsu',
    kanji: '冊',
    name: 'Satsu (Buku, Majalah & Jilid)',
    category: 'Publikasi & Cetak',
    description: 'Untuk buku, komik/manga, kamus, novel, majalah, buku catatan berpenjilid.',
    examples: ['Buku Pelajaran', 'Manga / Komik', 'Novel', 'Kamus', 'Majalah', 'Buku Tulis'],
    soundRules: 'Perubahan bunyi sokuon pada 1, 8, 10: issatsu, hassatsu, jussatsu.',
    readings: {
      1: { kanji: '一冊', kana: 'いっさつ', romaji: 'issatsu', irregular: 'sokuon', note: 'Sokuon (issatsu)' },
      2: { kanji: '二冊', kana: 'にさつ', romaji: 'nisatsu', note: 'Reguler' },
      3: { kanji: '三冊', kana: 'さんさつ', romaji: 'sansatsu', note: 'Reguler' },
      4: { kanji: '四冊', kana: 'よんさつ', romaji: 'yonsatsu', note: 'Yonsatsu' },
      5: { kanji: '五冊', kana: 'ごさつ', romaji: 'gosatsu', note: 'Reguler' },
      6: { kanji: '六冊', kana: 'ろくさつ', romaji: 'rokusatsu', note: 'Rokusatsu' },
      7: { kanji: '七冊', kana: 'ななさつ', romaji: 'nanasatsu', note: 'Nanasatsu' },
      8: { kanji: '八冊', kana: 'はっさつ', romaji: 'hassatsu', irregular: 'sokuon', note: 'Sokuon (hassatsu)' },
      9: { kanji: '九冊', kana: 'きゅうさつ', romaji: 'kyuusatsu', note: 'Reguler' },
      10: { kanji: '十冊', kana: 'じゅっさつ', romaji: 'jussatsu', irregular: 'sokuon', note: 'Sokuon (jussatsu)' },
      question: { kanji: '何冊', kana: 'なんさつ', romaji: 'nansatsu', note: 'Berapa jilid/buku?' }
    }
  },
  {
    id: 'nin',
    kanji: '人',
    name: 'Nin (Orang / Manusia)',
    category: 'Manusia',
    description: 'Untuk menghitung manusia/orang. CATATAN PENTING: 1 dan 2 orang menggunakan bentuk wago khusus (Hitori, Futari)!',
    examples: ['Siswa', 'Karyawan', 'Teman', 'Dokter', 'Turis', 'Keluarga'],
    soundRules: 'Bentuk khusus: 1 orang (Hitori), 2 orang (Futari), 4 orang (Yonin - bukan yonnin/shinin). Selebihnya angka + nin.',
    readings: {
      1: { kanji: '一人', kana: 'ひとり', romaji: 'hitori', irregular: 'special', note: 'Bentuk khusus wago (Hitori)' },
      2: { kanji: '二人', kana: 'ふたり', romaji: 'futari', irregular: 'special', note: 'Bentuk khusus wago (Futari)' },
      3: { kanji: '三人', kana: 'さんにん', romaji: 'sannin', note: 'Sannin' },
      4: { kanji: '四人', kana: 'よにん', romaji: 'yonin', irregular: 'special', note: 'Yonin (pantang: shinin artinya orang mati!)' },
      5: { kanji: '五人', kana: 'ごにん', romaji: 'gonin', note: 'Reguler' },
      6: { kanji: '六人', kana: 'ろくにん', romaji: 'rokunin', note: 'Reguler' },
      7: { kanji: '七人', kana: 'しちにん / ななにん', romaji: 'shichinin / nananin', note: 'Bisa shichinin atau nananin' },
      8: { kanji: '八人', kana: 'はちにん', romaji: 'hachinin', note: 'Hachinin' },
      9: { kanji: '九人', kana: 'きゅうにん / くにん', romaji: 'kyuunin / kunin', note: 'Umumnya kyuunin' },
      10: { kanji: '十人', kana: 'じゅうにん', romaji: 'juunin', note: 'Juunin' },
      question: { kanji: '何人', kana: 'なんにん', romaji: 'nannin', note: 'Berapa orang?' }
    }
  },
  {
    id: 'kai_floor',
    kanji: '階',
    name: 'Kai / Gai (Lantai Gedung)',
    category: 'Tingkat Bangunan',
    description: 'Untuk tingkat atau lantai bangunan bertingkat. Lantai 3 mengalami Rendaku (Sangai).',
    examples: ['Lantai 1 Mal', 'Lantai 3 Apartemen', 'Lantai Bawah Tanah'],
    soundRules: 'Sokuon pada 1, 8, 10 (ikkai, hakkai, jukkai). Rendaku pada 3 (sangai).',
    readings: {
      1: { kanji: '一階', kana: 'いっかい', romaji: 'ikkai', irregular: 'sokuon', note: 'Ikkai' },
      2: { kanji: '二階', kana: 'にかい', romaji: 'nikai', note: 'Nikai' },
      3: { kanji: '三階', kana: 'さんがい', romaji: 'sangai', irregular: 'rendaku', note: 'Rendaku: sangai (g-sound)' },
      4: { kanji: '四階', kana: 'よんかい', romaji: 'yonkai', note: 'Yonkai' },
      5: { kanji: '五階', kana: 'ごかい', romaji: 'gokai', note: 'Gokai' },
      6: { kanji: '六階', kana: 'ろっかい', romaji: 'rokkai', irregular: 'sokuon', note: 'Rokkai' },
      7: { kanji: '七階', kana: 'ななかい', romaji: 'nanakai', note: 'Nanakai' },
      8: { kanji: '八階', kana: 'はっかい', romaji: 'hakkai', irregular: 'sokuon', note: 'Hakkai' },
      9: { kanji: '九階', kana: 'きゅうかい', romaji: 'kyuukai', note: 'Kyuukai' },
      10: { kanji: '十階', kana: 'じゅっかい', romaji: 'jukkai', irregular: 'sokuon', note: 'Jukkai' },
      question: { kanji: '何階', kana: 'なんがい / なんかい', romaji: 'nangai / nankai', irregular: 'rendaku', note: 'Umumnya nangai' }
    }
  },
  {
    id: 'sai',
    kanji: '歳 / 才',
    name: 'Sai (Usia / Umur)',
    category: 'Usia Manusia',
    description: 'Untuk menghitung umur seseorang. 20 tahun memiliki sebutan khusus: Hatachi (二十歳)!',
    examples: ['Umur Bayi', 'Umur Pelajar', 'Ulang Tahun ke-20 (Hatachi)'],
    soundRules: 'Sokuon pada 1 (issai), 8 (hassai), 10 (jussai). Khusus: 20 tahun = Hatachi (二十歳).',
    readings: {
      1: { kanji: '一歳', kana: 'いっさい', romaji: 'issai', irregular: 'sokuon', note: 'Issai' },
      2: { kanji: '二歳', kana: 'にさい', romaji: 'nisai', note: 'Nisai' },
      3: { kanji: '三歳', kana: 'さんさい', romaji: 'sansai', note: 'Sansai' },
      4: { kanji: '四歳', kana: 'よんさい', romaji: 'yonsai', note: 'Yonsai' },
      5: { kanji: '五歳', kana: 'ごさい', romaji: 'gosai', note: 'Gosai' },
      6: { kanji: '六歳', kana: 'ろくさい', romaji: 'rokusai', note: 'Rokusai' },
      7: { kanji: '七歳', kana: 'ななさい', romaji: 'nanasai', note: 'Nanasai' },
      8: { kanji: '八歳', kana: 'はっさい', romaji: 'hassai', irregular: 'sokuon', note: 'Hassai' },
      9: { kanji: '九歳', kana: 'きゅうさい', romaji: 'kyuusai', note: 'Kyuusai' },
      10: { kanji: '十歳', kana: 'じゅっさい', romaji: 'jussai', irregular: 'sokuon', note: 'Jussai' },
      20: { kanji: '二十歳', kana: 'はたち', romaji: 'hatachi', irregular: 'special', note: 'Khusus usia 20 tahun (Hatachi)' },
      question: { kanji: '何歳', kana: 'なんさい', romaji: 'nansai', note: 'Berapa umur? (Sopan: Oikutsu)' }
    }
  },
  {
    id: 'soku',
    kanji: '足',
    name: 'Soku (Pasang Alas Kaki)',
    category: 'Sepatu & Kaos Kaki',
    description: 'Untuk sepasang sepatu, kaos kaki, sandal, bakiak.',
    examples: ['Sepatu', 'Kaos Kaki', 'Sandal Rumah', 'Sneakers'],
    soundRules: 'Sokuon pada 1 (issoku), 8 (hassoku), 10 (jussoku). Rendaku pada 3 (sanzoku).',
    readings: {
      1: { kanji: '一足', kana: 'いっそく', romaji: 'issoku', irregular: 'sokuon', note: 'Issoku' },
      2: { kanji: '二足', kana: 'にそく', romaji: 'nisoku', note: 'Nisoku' },
      3: { kanji: '三足', kana: 'さんぞく', romaji: 'sanzoku', irregular: 'rendaku', note: 'Rendaku (sanzoku)' },
      4: { kanji: '四足', kana: 'よんそく', romaji: 'yonsoku', note: 'Yonsoku' },
      5: { kanji: '五足', kana: 'ごそく', romaji: 'gosoku', note: 'Gosoku' },
      6: { kanji: '六足', kana: 'ろくそく', romaji: 'rokusoku', note: 'Rokusoku' },
      7: { kanji: '七足', kana: 'ななそく', romaji: 'nanasoku', note: 'Nanasoku' },
      8: { kanji: '八足', kana: 'はっそく', romaji: 'hassoku', irregular: 'sokuon', note: 'Hassoku' },
      9: { kanji: '九足', kana: 'きゅうそく', romaji: 'kyuusoku', note: 'Kyuusoku' },
      10: { kanji: '十足', kana: 'じゅっそく', romaji: 'jussoku', irregular: 'sokuon', note: 'Jussoku' },
      question: { kanji: '何足', kana: 'なんぞく', romaji: 'nanzoku', irregular: 'rendaku', note: 'Rendaku (nanzoku)' }
    }
  },
  {
    id: 'wa',
    kanji: '羽',
    name: 'Wa (Burung & Kelinci)',
    category: 'Unggas & Kelinci',
    description: 'Untuk unggas (burung, ayam, bebek, penguin) dan secara tradisional kelinci karena telinganya yang menyerupai sayap.',
    examples: ['Burung Merpati', 'Ayam', 'Bebek', 'Penguin', 'Kelinci'],
    soundRules: 'Rendaku opsional pada 3 (sanwa / sanba) dan sokuon pada 1, 6, 8 (ichiwa/ippa, rokuwa/roppa). Standar modern lebih sering ichiwa, niwa, sanwa.',
    readings: {
      1: { kanji: '一羽', kana: 'いちわ', romaji: 'ichiwa', note: 'Ichiwa (atau ippa)' },
      2: { kanji: '二羽', kana: 'にわ', romaji: 'niwa', note: 'Niwa' },
      3: { kanji: '三羽', kana: 'さんわ / さんば', romaji: 'sanwa / sanba', note: 'Sanwa atau sanba' },
      4: { kanji: '四羽', kana: 'よんわ', romaji: 'yonwa', note: 'Yonwa' },
      5: { kanji: '五羽', kana: 'ごわ', romaji: 'gowa', note: 'Gowa' },
      6: { kanji: '六羽', kana: 'ろくわ / ろっぱ', romaji: 'rokuwa / roppa', note: 'Rokuwa' },
      7: { kanji: '七羽', kana: 'ななわ', romaji: 'nanawa', note: 'Nanawa' },
      8: { kanji: '八羽', kana: 'はちわ / はっぱ', romaji: 'hachiwa / happa', note: 'Hachiwa' },
      9: { kanji: '九羽', kana: 'きゅうわ', romaji: 'kyuuwa', note: 'Kyuuwa' },
      10: { kanji: '十羽', kana: 'じゅうわ / じっぱ', romaji: 'juuwa / jippa', note: 'Juuwa' },
      question: { kanji: '何羽', kana: 'なんわ / なんば', romaji: 'nanwa / nanba', note: 'Nanwa?' }
    }
  }
];

// Interactive Quiz Questions for Counters
export const counterQuizzes = [
  {
    id: 'cq-1',
    question: 'Untuk menghitung 3 botol minuman dingin di restoran, pengucapan yang benar adalah...',
    options: ['さんぼん (三本)', 'さんほん (三本)', 'さんぽん (三本)', 'みっつ (三つ)'],
    correctIndex: 0,
    explanation: 'Pada satuan 本 (hon), angka 3 mengalami Rendaku (pergeseran bunyi voiced) sehingga dibaca さんぼん (sanbon).'
  },
  {
    id: 'cq-2',
    question: 'Bagaimana cara menyebut "1 orang" dan "2 orang" dalam bahasa Jepang?',
    options: ['いちにん (一人) & ににん (二人)', 'ひとり (一人) & ふたり (二人)', 'いっこ (一個) & にこ (二個)', 'ひとつ (一つ) & ふたつ (二つ)'],
    correctIndex: 1,
    explanation: '1 dan 2 orang memakai bentuk wago khusus: 一人 = ひとり (Hitori) dan 二人 = ふたり (Futari).'
  },
  {
    id: 'cq-3',
    question: 'Satuan hitung yang paling tepat untuk 5 lembar tiket bioskop adalah...',
    options: ['ごほん (五本)', 'ごさつ (五冊)', 'ごまい (五枚)', 'ごだい (五台)'],
    correctIndex: 2,
    explanation: '枚 (mai) digunakan khusus untuk benda tipis dan rata seperti tiket, kertas, pakaian, dan foto.'
  },
  {
    id: 'cq-4',
    question: 'Pengucapan untuk "6 ekor kucing kecil" yang benar adalah...',
    options: ['ろくひき (六匹)', 'ろっぴき (六匹)', 'ろくびき (六匹)', 'むっつ (六つ)'],
    correctIndex: 1,
    explanation: 'Pada satuan 匹 (hiki), angka 6 mengalami Sokuon menjadi ろっぴき (roppiki).'
  },
  {
    id: 'cq-5',
    question: 'Untuk menyebut usia "20 tahun", istilah khusus yang digunakan adalah...',
    options: ['にじゅっさい (二十歳)', 'はたち (二十歳)', 'にさい (二歳)', 'はっさい (八歳)'],
    correctIndex: 1,
    explanation: 'Usia 20 tahun di Jepang adalah batas usia kedewasaan tradisional (Seijin) dan disebut secara khusus sebagai はたち (Hatachi).'
  },
  {
    id: 'cq-6',
    question: 'Jika kamu ingin pergi ke "Lantai 3" di gedung pertokoan, kamu akan menyebut...',
    options: ['さんかい (三階)', 'さんがい (三階)', 'さんぽん (三本)', 'みっかい (三階)'],
    correctIndex: 1,
    explanation: 'Pada satuan tingkat lantai 階 (kai), angka 3 mengalami Rendaku menjadi さんがい (sangai).'
  },
  {
    id: 'cq-7',
    question: 'Satuan hitung apa yang digunakan untuk 2 unit mobil atau komputer?',
    options: ['にまい (二枚)', 'にだい (二台)', 'にほん (二本)', 'にさつ (二冊)'],
    correctIndex: 1,
    explanation: '台 (dai) digunakan untuk menghitung kendaraan, mesin, komputer, dan perangkat elektronik.'
  },
  {
    id: 'cq-8',
    question: 'Bagaimana pengucapan yang benar untuk "1 cangkir kopi"?',
    options: ['いっぱつ (一発)', 'いっぱい (一杯)', 'いっぴき (一匹)', 'いっぽん (一本)'],
    correctIndex: 1,
    explanation: 'Cangkir/gelas menggunakan 杯 (hai) yang mengalami sokuon pada angka 1 menjadi いっぱい (ippai).'
  }
];
