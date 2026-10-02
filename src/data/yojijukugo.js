/**
 * Database Ensiklopedia Peribahasa 4 Karakter (四字熟語 / Yojijukugo)
 * Kumpulan aforisme dan peribahasa 4 kanji paling populer dalam budaya Jepang, sastra, ujian JLPT N2–N1, dan pidato resmi.
 */

export const yojijukugoList = [
  {
    id: 'y-1',
    kanji: '一期一会',
    furigana: 'いちごいちえ',
    romaji: 'Ichigo Ichie',
    theme: 'Filosofi Hidup & Zen',
    meaning: 'Setiap pertemuan adalah kesempatan sekali seumur hidup yang tak terulang.',
    kanjiBreakdown: [
      { char: '一', meaning: 'Satu' },
      { char: '期', meaning: 'Masa / Kurun waktu hidup' },
      { char: '一', meaning: 'Satu' },
      { char: '会', meaning: 'Pertemuan' }
    ],
    originStory: 'Berasal dari ajaran master upacara minum teh Sen no Rikyu (千利休). Meskipun tuan rumah dan tamu sering bertemu minum teh, hargailah pertemuan hari ini seolah-olah itu adalah satu-satunya pertemuan dalam hidup Anda.',
    exampleSentence: '今日出会った人とのご縁を、一期一会の心で大切にしたい。',
    exampleRomaji: 'Kyou deatta hito to no goen o, ichigo ichie no kokoro de taisetsu ni shitai.',
    exampleMeaning: 'Saya ingin menghargai jalinan hubungan dengan orang yang saya temui hari ini dengan semangat "ichigo ichie".'
  },
  {
    id: 'y-2',
    kanji: '十人十色',
    furigana: 'じゅうにんといろ',
    romaji: 'Jūnin Toiro',
    theme: 'Keberagaman & Manusia',
    meaning: 'Sepuluh orang memiliki sepuluh warna berbeda (setiap orang punya watak dan selera masing-masing).',
    kanjiBreakdown: [
      { char: '十', meaning: 'Sepuluh' },
      { char: '人', meaning: 'Orang' },
      { char: '十', meaning: 'Sepuluh' },
      { char: '色', meaning: 'Warna / Sifat' }
    ],
    originStory: 'Peribahasa Jepang yang mengajarkan toleransi terhadap perbedaan pandangan. Tidak ada dua manusia yang berpikir dengan cara yang identik.',
    exampleSentence: '人の好みは十人十色だから、全員を満足させるのは難しい。',
    exampleRomaji: 'Hito no konomi wa juunin toiro dakara, zen\'in o manzoku saseru no wa muzukashii.',
    exampleMeaning: 'Karena selera manusia itu berbeda-beda (juunin toiro), sulit untuk memuaskan semua orang.'
  },
  {
    id: 'y-3',
    kanji: '臨機応変',
    furigana: 'りんきおうへん',
    romaji: 'Rinki Ōhen',
    theme: 'Strategi & Adaptasi',
    meaning: 'Bertindak fleksibel dan sigap menyesuaikan diri dengan situasi lapangan.',
    kanjiBreakdown: [
      { char: '臨', meaning: 'Menghadapi' },
      { char: '機', meaning: 'Kesempatan / Situasi' },
      { char: '応', meaning: 'Merespons' },
      { char: '変', meaning: 'Perubahan' }
    ],
    originStory: 'Sangat sering digunakan dalam dunia bisnis Jepang (Job Interview / Shūkatsu) untuk menunjukkan kemampuan pemecahan masalah tanpa kaku pada buku panduan.',
    exampleSentence: 'マニュアル通りにいかないときは、臨機応変に対応してください。',
    exampleRomaji: 'Manyuaru doori ni ikanai toki wa, rinki ouhen ni taiou shite kudasai.',
    exampleMeaning: 'Ketika hal-hal tidak berjalan sesuai manual, harap respons dengan fleksibel (rinki ouhen).'
  },
  {
    id: 'y-4',
    kanji: '試行錯誤',
    furigana: 'しこうさくご',
    romaji: 'Shikō Sakugo',
    theme: 'Belajar & Inovasi',
    meaning: 'Mencoba berkali-kali dan belajar dari kesalahan (Trial and Error).',
    kanjiBreakdown: [
      { char: '試', meaning: 'Mencoba' },
      { char: '行', meaning: 'Menjalankan' },
      { char: '錯', meaning: 'Campur aduk / Luput' },
      { char: '誤', meaning: 'Kekeliruan / Salah' }
    ],
    originStory: 'Konsep dasar sains dan rekayasa di mana kegagalan dipandang sebagai data berharga menuju penemuan solusi sejati.',
    exampleSentence: '試行錯誤を繰り返して、ついに新しいアプリを完成させた。',
    exampleRomaji: 'Shikou sakugo o kurikaeshite, tsuini atarashii apuri o kansei saseta.',
    exampleMeaning: 'Setelah mengulang banyak trial and error, akhirnya berhasil menyelesaikan aplikasi baru ini.'
  },
  {
    id: 'y-5',
    kanji: '以心伝心',
    furigana: 'いしんでんしん',
    romaji: 'Ishin Denshin',
    theme: 'Hubungan & Komunikasi',
    meaning: 'Saling memahami pikiran dan perasaan batin tanpa perlu diucapkan lewat kata-kata.',
    kanjiBreakdown: [
      { char: '以', meaning: 'Dengan / Menggunakan' },
      { char: '心', meaning: 'Hati / Pikiran' },
      { char: '伝', meaning: 'Menyampaikan' },
      { char: '心', meaning: 'Hati' }
    ],
    originStory: 'Berasal dari tradisi Zen Buddhisme tentang transmisi kebenaran spiritual dari guru ke murid langsung dari hati ke hati tanpa teks tertulis.',
    exampleSentence: '長年の親友とは、言葉にしなくても以心伝心で通じ合える。',
    exampleRomaji: 'Naganen no shinyuu to wa, kotoba ni shinakutemo ishin denshin de tsuujiaeru.',
    exampleMeaning: 'Dengan sahabat karib bertahun-tahun, tanpa berkata-kata pun kami bisa saling mengerti batin satu sama lain.'
  },
  {
    id: 'y-6',
    kanji: '日進月歩',
    furigana: 'にっしんげっぽ',
    romaji: 'Nisshin Geppo',
    theme: 'Teknologi & Kemajuan',
    meaning: 'Kemajuan pesat yang terus berkembang hari demi hari dan bulan demi bulan.',
    kanjiBreakdown: [
      { char: '日', meaning: 'Hari' },
      { char: '進', meaning: 'Maju' },
      { char: '月', meaning: 'Bulan' },
      { char: '歩', meaning: 'Melangkah' }
    ],
    originStory: 'Sering dipakai saat mendeskripsikan teknologi AI, sains kedokteran, dan digitalisasi yang melesat cepat tanpa henti.',
    exampleSentence: 'AI技術は日進月歩で、毎月のように新しいモデルが登場している。',
    exampleRomaji: 'AI gijutsu wa nisshin geppo de, maitsuki no you ni atarashii moderu ga toujou shite iru.',
    exampleMeaning: 'Teknologi AI berkembang sangat pesat (nisshin geppo), hampir setiap bulan muncul model baru.'
  },
  {
    id: 'y-7',
    kanji: '四面楚歌',
    furigana: 'しめんそか',
    romaji: 'Shimen Soka',
    theme: 'Situasi Terjepit / Kritis',
    meaning: 'Terkepung musuh dari empat penjuru; terisolasi tanpa seorang pun penolong.',
    kanjiBreakdown: [
      { char: '四', meaning: 'Empat' },
      { char: '面', meaning: 'Sisi / Penjuru' },
      { char: '楚', meaning: 'Negeri Chu' },
      { char: '歌', meaning: 'Lagu / Nyanyian' }
    ],
    originStory: 'Kisah perang Han-Chu di Tiongkok kuno. Pasukan jenderal Xiang Yu dikepung di malam hari, dan dari 4 penjuru terdengar tentara musuh menyanyikan lagu tanah kelahirannya (lagu Chu), menandakan pasukannya telah kalah total.',
    exampleSentence: '味方が誰もいなくなり、まさに四面楚歌のピンチに陥った。',
    exampleRomaji: 'Mikata ga dare mo inakunari, masa ni shimen soka no pinchi ni ochiitta.',
    exampleMeaning: 'Tidak ada lagi sekutu yang tersisa, benar-benar terjebak dalam krisis terisolasi (shimen soka).'
  },
  {
    id: 'y-8',
    kanji: '起死回生',
    furigana: 'きしかいせい',
    romaji: 'Kishi Kaisei',
    theme: 'Kemenangan Dramatis',
    meaning: 'Bangkit kembali dari ambang kematian/kehancuran; membalikkan keadaan di saat paling kritis.',
    kanjiBreakdown: [
      { char: '起', meaning: 'Membangkitkan' },
      { char: '死', meaning: 'Kematian' },
      { char: '回', meaning: 'Memutar balik' },
      { char: '生', meaning: 'Kehidupan' }
    ],
    originStory: 'Istilah medis kuno untuk resep obat mujarab yang mampu menyelamatkan pasien sekarat, kini dipakai dalam olahraga dan bisnis untuk comeback dramatis.',
    exampleSentence: '試合終了直前の起死回生のゴールで、逆転勝利を収めた！',
    exampleRomaji: 'Shiai shuuryou chokuzen no kishi kaisei no gooru de, gyakuten shouri o osameta!',
    exampleMeaning: 'Lewat gol penyelamat di menit akhir, tim berhasil membalikkan keadaan menjadi kemenangan!'
  }
];

export const yojijukugoQuizData = [
  {
    id: 'yq-1',
    kanjiPuzzle: ['期', '一', '会', '一'],
    correctOrder: ['一', '期', '一', '会'],
    meaning: 'Setiap pertemuan adalah kesempatan berharga sekali seumur hidup',
    question: 'Susunlah 4 kanji di atas menjadi peribahasa Zen upacara minum teh yang bermakna "Pertemuan sekali seumur hidup":',
    options: ['一期一会', '十人十色', '以心伝心', '日進月歩'],
    correctIdx: 0,
    explanation: '一期一会 (Ichigo Ichie) terdiri dari kanji 一 (satu), 期 (masa hidup), 一 (satu), 会 (pertemuan).'
  },
  {
    id: 'yq-2',
    kanjiPuzzle: ['変', '機', '臨', '応'],
    correctOrder: ['臨', '機', '応', '変'],
    meaning: 'Menyesuaikan diri secara fleksibel sesuai situasi',
    question: 'Peribahasa yang berarti "Bertindak fleksibel sesuai kondisi lapangan tanpa kaku pada aturan" adalah...',
    options: ['試行錯誤', '臨機応変', '四面楚歌', '自業自得'],
    correctIdx: 1,
    explanation: '臨機応変 (Rinki Ōhen) adalah kemampuan menyesuaikan tindakan (応変) saat menghadapi kesempatan/situasi (臨機).'
  },
  {
    id: 'yq-3',
    kanjiPuzzle: ['色', '十', '人', '十'],
    correctOrder: ['十', '人', '十', '色'],
    meaning: 'Sepuluh orang memiliki sepuluh warna/karakter berbeda',
    question: 'Peribahasa yang menyatakan bahwa "Tiap orang memiliki selera dan kepribadian yang berbeda-beda" adalah...',
    options: ['十人十色', '起死回生', '以心伝心', '電光石火'],
    correctIdx: 0,
    explanation: '十人十色 (Jūnin Toiro) bermakna 10 orang mempunyai 10 warna/selera berbeda.'
  },
  {
    id: 'yq-4',
    kanjiPuzzle: ['誤', '行', '試', '錯'],
    correctOrder: ['試', '行', '錯', '誤'],
    meaning: 'Eksperimen mencoba dan belajar dari kesalahan (Trial and error)',
    question: 'Manakah Yojijukugo yang bermakna "Trial and Error" dalam sains dan inovasi?',
    options: ['日進月歩', '一期一会', '試行錯誤', '四面楚歌'],
    correctIdx: 2,
    explanation: '試行錯誤 (Shikō Sakugo) = 試行 (mencoba menjalankan) + 錯誤 (kekeliruan/error).'
  }
];
