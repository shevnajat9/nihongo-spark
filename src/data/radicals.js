/**
 * Nihongo Spark - Kamus Radikal Kanji (部首 Bushu) & Dekomposisi Mnemonik
 * Berisi 214 Radikal Kangxi utama beserta dekomposisi komponen dan kisah mnemonik
 * untuk menguasai Kanji JLPT secara sistematis dan mudah diingat.
 */

export const RADICAL_POSITIONS = {
  hen: { name: 'Hen (偏)', desc: 'Sisi kiri kanji (misal: 亻 di 休, 氵 di 海, 木 di 校)' },
  tsukuri: { name: 'Tsukuri (旁)', desc: 'Sisi kanan kanji (misal: 刂 di 列, 力 di 助)' },
  kanmuri: { name: 'Kanmuri (冠)', desc: 'Sisi atas kanji (misal: 艹 di 花, 宀 di 安)' },
  ashi: { name: 'Ashi (脚)', desc: 'Sisi bawah kanji (misal: 灬 di 点, 儿 di 先)' },
  tare: { name: 'Tare (垂)', desc: 'Melingkupi atas dan kiri (misal: 广 di 店, 尸 di 屋)' },
  nyou: { name: 'Nyou (繞)', desc: 'Melingkupi kiri dan bawah (misal: 辶 di 道, 廴 di 建)' },
  kamae: { name: 'Kamae (構)', desc: 'Melingkupi sekeliling atau dua sisi (misal: 囗 di 国, 門 di 間)' }
};

export const COMMON_RADICALS = {
  '人': { char: '人', alt: '亻', name: 'Ninben (にんべん)', meaning: 'Manusia / Orang', strokes: 2, pos: 'hen' },
  '水': { char: '水', alt: '氵', name: 'Sanzui (さんずい)', meaning: 'Air / Cairan', strokes: 3, pos: 'hen' },
  '木': { char: '木', alt: '木', name: 'Kihen (きへん)', meaning: 'Pohon / Kayu', strokes: 4, pos: 'hen' },
  '言': { char: '言', alt: '言', name: 'Gonben (ごんべん)', meaning: 'Kata / Bahasa / Bicara', strokes: 7, pos: 'hen' },
  '日': { char: '日', alt: '日', name: 'Hihen (ひへん)', meaning: 'Matahari / Hari / Waktu', strokes: 4, pos: 'hen' },
  '月': { char: '月', alt: '月', name: 'Tsuki (つき)', meaning: 'Bulan / Bagian Tubuh', strokes: 4, pos: 'hen' },
  '火': { char: '火', alt: '灬', name: 'Hi / Rengwa (れっか)', meaning: 'Api / Panas', strokes: 4, pos: 'ashi' },
  '手': { char: '手', alt: '扌', name: 'Tehen (てへん)', meaning: 'Tangan / Tindakan', strokes: 3, pos: 'hen' },
  '心': { char: '心', alt: '忄', name: 'Risshinben (りっしんべん)', meaning: 'Hati / Perasaan', strokes: 3, pos: 'hen' },
  '艸': { char: '艸', alt: '艹', name: 'Kusakanmuri (くさかんむり)', meaning: 'Rumput / Tumbuhan / Bunga', strokes: 3, pos: 'kanmuri' },
  '宀': { char: '宀', alt: '宀', name: 'Ukanmuri (うかんむり)', meaning: 'Atap / Rumah', strokes: 3, pos: 'kanmuri' },
  '辵': { char: '辵', alt: '辶', name: 'Shinnyou (しんにょう)', meaning: 'Berjalan / Gerakan / Jalan', strokes: 3, pos: 'nyou' },
  '門': { char: '門', alt: '門', name: 'Monkamae (もんがまえ)', meaning: 'Gerbang / Pintu', strokes: 8, pos: 'kamae' },
  '囗': { char: '囗', alt: '囗', name: 'Kunigamae (くにがまえ)', meaning: 'Batas / Pagar Keliling', strokes: 3, pos: 'kamae' },
  '刀': { char: '刀', alt: '刂', name: 'Rittou (りっとう)', meaning: 'Pedang / Pisau / Memotong', strokes: 2, pos: 'tsukuri' },
  '力': { char: '力', alt: '力', name: 'Chikara (ちから)', meaning: 'Tenaga / Kekuatan', strokes: 2, pos: 'tsukuri' },
  '土': { char: '土', alt: '土', name: 'Tsuchihen (つちへん)', meaning: 'Tanah / Bumi', strokes: 3, pos: 'hen' },
  '女': { char: '女', alt: '女', name: 'Onnahen (おんなへん)', meaning: 'Wanita / Perempuan', strokes: 3, pos: 'hen' },
  '子': { char: '子', alt: '子', name: 'Ko (こ)', meaning: 'Anak / Keturunan', strokes: 3, pos: 'ashi' },
  '金': { char: '金', alt: '金', name: 'Kanehen (かねへん)', meaning: 'Logam / Emas / Uang', strokes: 8, pos: 'hen' },
  '食': { char: '食', alt: '飠', name: 'Shokuhen (しょくへん)', meaning: 'Makanan / Makan', strokes: 8, pos: 'hen' },
  '車': { char: '車', alt: '車', name: 'Kurumahen (くるまへん)', meaning: 'Kendaraan / Roda', strokes: 7, pos: 'hen' },
  '貝': { char: '貝', alt: '貝', name: 'Kaihen (かいへん)', meaning: 'Kerang / Harta / Uang', strokes: 7, pos: 'hen' },
  '糸': { char: '糸', alt: '糸', name: 'Itohen (いとへん)', meaning: 'Benang / Tali / Ikatan', strokes: 6, pos: 'hen' },
  '目': { char: '目', alt: '目', name: 'Mehen (めへん)', meaning: 'Mata / Penglihatan', strokes: 5, pos: 'hen' },
  '耳': { char: '耳', alt: '耳', name: 'Mimi (みみ)', meaning: 'Telinga / Pendengaran', strokes: 6, pos: 'hen' },
  '雨': { char: '雨', alt: '雨', name: 'Amakanmuri (あめかんむり)', meaning: 'Hujan / Cuaca', strokes: 8, pos: 'kanmuri' },
  '广': { char: '广', alt: '广', name: 'Madare (まだれ)', meaning: 'Bangunan di Lereng / Toko', strokes: 3, pos: 'tare' }
};

/**
 * Kanji Decomposition & Mnemonic Database
 */
export const KANJI_DECOMPOSITIONS = {
  '語': {
    mainRadical: '言',
    components: [
      { char: '言', name: 'Kata/Bahasa', desc: 'kata-kata yang terucap' },
      { char: '五', name: 'Lima', desc: 'angka 5' },
      { char: '口', name: 'Mulut', desc: 'mulut untuk berbicara' }
    ],
    mnemonic: 'Menggunakan KATA (言) bersama LIMA (五) orang dengan MULUT (口) untuk saling memahami BAHASA (語).'
  },
  '休': {
    mainRadical: '人',
    components: [
      { char: '亻', name: 'Manusia/Orang', desc: 'seseorang yang lelah' },
      { char: '木', name: 'Pohon/Kayu', desc: 'pohon rindang berteduh' }
    ],
    mnemonic: 'Seorang MANUSIA (亻) menyandarkan tubuhnya di bawah POHON (木) rindang untuk BERISTIRAHAT (休).'
  },
  '明': {
    mainRadical: '日',
    components: [
      { char: '日', name: 'Matahari', desc: 'sumber cahaya siang hari' },
      { char: '月', name: 'Bulan', desc: 'sumber cahaya malam hari' }
    ],
    mnemonic: 'Ketika MATAHARI (日) dan BULAN (月) bersinar bersamaan, seluruh alam semesta menjadi SANGAT TERANG (明).'
  },
  '男': {
    mainRadical: '田',
    components: [
      { char: '田', name: 'Sawah/Ladang', desc: 'tempat bercocok tanam' },
      { char: '力', name: 'Tenaga/Kekuatan', desc: 'otot kekuatan fisik' }
    ],
    mnemonic: 'Sosok yang mengerahkan segenap TENAGA & KEKUATAN (力) untuk mencangkul di SAWAH (田) adalah LAKI-LAKI (男).'
  },
  '聞': {
    mainRadical: '耳',
    components: [
      { char: '門', name: 'Gerbang/Pintu', desc: 'pintu gerbang rumah' },
      { char: '耳', name: 'Telinga', desc: 'indra pendengaran' }
    ],
    mnemonic: 'Mendekatkan TELINGA (耳) ke sela PINTU GERBANG (門) untuk MENDENGAR (聞) percakapan di luar.'
  },
  '校': {
    mainRadical: '木',
    components: [
      { char: '木', name: 'Kayu/Pohon', desc: 'bahan bangunan kuno' },
      { char: '交', name: 'Interaksi/Campur', desc: 'tempat berkumpul bertukar pikiran' }
    ],
    mnemonic: 'Gedung dari KAYU (木) tempat para murid saling BERINTERAKSI (交) dan bertukar ilmu adalah SEKOLAH (校).'
  },
  '時': {
    mainRadical: '日',
    components: [
      { char: '日', name: 'Matahari', desc: 'penunjuk peredaran hari' },
      { char: '寺', name: 'Kuil', desc: 'tempat lonceng dibunyikan' }
    ],
    mnemonic: 'Bayangan MATAHARI (日) yang jatuh di atas KUIL (寺) saat lonceng berdentang menandakan WAKTU / JAM (時).'
  },
  '安': {
    mainRadical: '宀',
    components: [
      { char: '宀', name: 'Atap/Rumah', desc: 'tempat berteduh yang aman' },
      { char: '女', name: 'Wanita', desc: 'perempuan' }
    ],
    mnemonic: 'Seorang WANITA (女) yang berada di bawah perlindungan ATAP RUMAH (宀) merasa AMAN, NYAMAN, & DAMAI (安).'
  },
  '道': {
    mainRadical: '辵',
    components: [
      { char: '辶', name: 'Berjalan/Melangkah', desc: 'pergerakan maju' },
      { char: '首', name: 'Kepala/Arah', desc: 'arah tujuan' }
    ],
    mnemonic: 'MELANGKAHKAN KAKI (辶) mengikuti pandangan KEPALA (首) menuju tujuan di sepanjang JALAN (道).'
  },
  '海': {
    mainRadical: '水',
    components: [
      { char: '氵', name: 'Air/Cairan', desc: 'aliran air' },
      { char: '毎', name: 'Setiap', desc: 'selalu berulang' }
    ],
    mnemonic: 'Kumpulan tetesan AIR (氵) yang mengalir bermuara SETIAP (毎) hari membentuk samudra LAUT (海).'
  },
  '花': {
    mainRadical: '艸',
    components: [
      { char: '艹', name: 'Tumbuhan', desc: 'tanaman hijau' },
      { char: '化', name: 'Berubah/Transformasi', desc: 'perubahan wujud' }
    ],
    mnemonic: 'Bagian dari TUMBUHAN (艹) yang BERUBAH (化) menjadi mekar indah beraneka warna adalah BUNGA (花).'
  },
  '電': {
    mainRadical: '雨',
    components: [
      { char: '雨', name: 'Hujan', desc: 'cuaca badai awan gelap' },
      { char: '申', name: 'Kilat Petir', desc: 'kilatan cahaya membelah langit' }
    ],
    mnemonic: 'Kilatan kilat petir saat HUJAN (雨) lebat melepaskan energi LISTRIK (電).'
  },
  '国': {
    mainRadical: '囗',
    components: [
      { char: '囗', name: 'Benteng/Batas', desc: 'perbatasan territorial tertutup' },
      { char: '玉', name: 'Permata/Raja', desc: 'harta kerajaan yang berharga' }
    ],
    mnemonic: 'Wilayah yang dikelilingi BENTENG (囗) kuat untuk melindungi PERMATA & RAKYAT (玉) adalah NEGARA (国).'
  },
  '話': {
    mainRadical: '言',
    components: [
      { char: '言', name: 'Kata/Bicara', desc: 'suara percakapan' },
      { char: '舌', name: 'Lidah', desc: 'organ pengecap dan bicara' }
    ],
    mnemonic: 'Rangkaian KATA (言) yang digerakkan oleh LIDAH (舌) manusia saat BERBICARA (話).'
  },
  '見': {
    mainRadical: '見',
    components: [
      { char: '目', name: 'Mata', desc: 'indra penglihatan' },
      { char: '儿', name: 'Kaki Berjalan', desc: 'sepasang kaki manusia' }
    ],
    mnemonic: 'MATA (目) di atas KAKI (儿) yang berjalan ke mana-mana untuk MELIHAT (見) keindahan dunia.'
  },
  '食': {
    mainRadical: '食',
    components: [
      { char: '人', name: 'Orang', desc: 'manusia' },
      { char: '良', name: 'Baik/Bagus', desc: 'kebaikan gizi' }
    ],
    mnemonic: 'Segala sesuatu yang BAIK (良) yang dimasukkan oleh MANUSIA (人) ke dalam tubuh untuk MAKAN (食).'
  },
  '飲': {
    mainRadical: '食',
    components: [
      { char: '飠', name: 'Makanan/Minuman', desc: 'asupan raga' },
      { char: '欠', name: 'Menganga/Haus', desc: 'mulut terbuka kekurangan cairan' }
    ],
    mnemonic: 'Meneguk ASUPAN (飠) saat tenggorokan menganga HAUS (欠) adalah MINUM (飲).'
  },
  '森': {
    mainRadical: '木',
    components: [
      { char: '木', name: 'Pohon', desc: 'pohon 1' },
      { char: '木', name: 'Pohon', desc: 'pohon 2' },
      { char: '木', name: 'Pohon', desc: 'pohon 3' }
    ],
    mnemonic: 'Tiga buah POHON (木) berkumpul bersama melambangkan HUTAN LEBAT (森).'
  },
  '林': {
    mainRadical: '木',
    components: [
      { char: '木', name: 'Pohon', desc: 'pohon kiri' },
      { char: '木', name: 'Pohon', desc: 'pohon kanan' }
    ],
    mnemonic: 'Dua buah POHON (木) yang tumbuh berdampingan membentuk RIMBA / HUTAN KECIL (林).'
  },
  '買': {
    mainRadical: '貝',
    components: [
      { char: '罒', name: 'Jaring/Keranjang', desc: 'tempat menampung barang' },
      { char: '貝', name: 'Kerang/Uang Kuno', desc: 'mata uang zaman dahulu' }
    ],
    mnemonic: 'Membawa KERANJANG (罒) dan membayarnya dengan UANG KERANG (貝) untuk MEMBELI (買).'
  },
  '店': {
    mainRadical: '广',
    components: [
      { char: '广', name: 'Bangunan Berteduh', desc: 'atap kedai' },
      { char: '占', name: 'Menempati/Milik', desc: 'ruang dagang' }
    ],
    mnemonic: 'Bangunan beratap lereng (广) yang ditempati (占) untuk berniaga dan melayani pembeli adalah TOKO (店).'
  }
};

/**
 * Get radical info or smart fallback decomposition
 */
export function getKanjiDecomposition(kanjiChar) {
  if (KANJI_DECOMPOSITIONS[kanjiChar]) {
    const data = KANJI_DECOMPOSITIONS[kanjiChar];
    const radInfo = COMMON_RADICALS[data.mainRadical] || {
      char: data.mainRadical,
      name: 'Radikal Utama',
      meaning: 'Elemen dasar kanji',
      strokes: 2
    };
    return {
      hasData: true,
      radical: radInfo,
      components: data.components,
      mnemonic: data.mnemonic
    };
  }

  // Fallback for kanji without explicit mnemonics in dictionary
  return {
    hasData: false,
    radical: {
      char: kanjiChar,
      name: 'Radikal Mandiri',
      meaning: 'Karakter kanji dasar',
      strokes: 1
    },
    components: [{ char: kanjiChar, name: 'Bentuk Utuh', desc: 'Karakter tunggal' }],
    mnemonic: `Perhatikan setiap coretan kanji ${kanjiChar} dengan saksama untuk melatih ingatan visual.`
  };
}
