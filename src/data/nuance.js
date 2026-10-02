// Database Nuansa Kata Serupa (Tsukaiwake) & Kamus Onomatope (Giongo / Gitaigo)

export const tsukaiwakePairs = [
  {
    id: 'shiru-wakaru',
    pair: '知る (Shiru) vs 分かる (Wakaru)',
    theme: 'Mengetahui vs Memahami',
    conceptA: {
      word: '知る (Shiru)',
      core: 'Menerima informasi atau fakta baru dari luar ke dalam memori.',
      exampleGood: '彼の電話番号を知っています。(Saya tahu nomor teleponnya.) ⭕',
      exampleBad: '彼の電話番号が分かります。(Kurang tepat jika sekadar tahu fakta)'
    },
    conceptB: {
      word: '分かる (Wakaru)',
      core: 'Memahami esensi, logika, makna, atau dapat membedakan.',
      exampleGood: '数学の解き方が分かります。(Saya paham cara mengerjakan matematika ini.) ⭕',
      exampleBad: '数学の解き方を知っています。(Hanya tahu rumusnya ada, belum tentu paham nalar pengerjaannya)'
    },
    summary: 'Ingat: "Shiru" untuk kepemilikan informasi/fakta, sedangkan "Wakaru" untuk pemahaman nalar internal.'
  },
  {
    id: 'omou-kangaeru',
    pair: '思う (Omou) vs 考える (Kangaeru)',
    theme: 'Merasa Spontan vs Berpikir Logis',
    conceptA: {
      word: '思う (Omou)',
      core: 'Perasaan spontan, kesan emosional, atau opini subyektif dari hati.',
      exampleGood: '明日は雨が降ると思う。(Saya rasa besok akan hujan.) ⭕',
      exampleBad: '明日は雨が降ると考える。(Terlalu kaku seperti analisis meteorologi)'
    },
    conceptB: {
      word: '考える (Kangaeru)',
      core: 'Proses berpikir sistematis, merumuskan rencana, menimbang pro dan kontra.',
      exampleGood: '将来の進路について真剣に考えています。(Saya sedang memikirkan arah karir masa depan secara serius.) ⭕',
      exampleBad: '将来の進路について思っています。(Terlalu dangkal/hanya terlintas sesaat)'
    },
    summary: '"Omou" adalah gerak perasaan (hati), sedangkan "Kangaeru" adalah olah pikir sistematis (otak).'
  },
  {
    id: 'kirei-utsukushii',
    pair: '綺麗 (Kirei) vs 美しい (Utsukushii)',
    theme: 'Cantik/Bersih Visual vs Keindahan Luhur Mendalam',
    conceptA: {
      word: '綺麗 (Kirei)',
      core: 'Bersih tanpa kotoran, rapi, atau cantik menarik sehari-hari.',
      exampleGood: '部屋を綺麗に掃除しました。(Saya membersihkan kamar sampai bersih.) ⭕',
      exampleBad: '部屋を美しく掃除しました。(Terdengar sangat tidak natural)'
    },
    conceptB: {
      word: '美しい (Utsukushii)',
      core: 'Keindahan mendalam, puitis, menggetarkan jiwa, atau karya seni murni.',
      exampleGood: '富士山の雪景色は息をのむほど美しい。(Pemandangan salju Gunung Fuji begitu indah memukau hingga menahan napas.) ⭕',
      exampleBad: '美しい部屋。(Terlalu berlebihan jika hanya kamar kos biasa)'
    },
    summary: '"Kirei" untuk bersih dan rapi sehari-hari, "Utsukushii" untuk estetika alam dan seni yang megah.'
  },
  {
    id: 'aida-aidani',
    pair: '間に (Aida ni) vs 間 (Aida)',
    theme: 'Titik Waktu Momen vs Sepanjang Durasi',
    conceptA: {
      word: '間 (Aida)',
      core: 'Suatu aksi berlangsung terus-menerus selama SELURUH rentang waktu.',
      exampleGood: '夏休みの間、ずっと祖母の家に滞在していました。(Selama seluruh liburan musim panas, saya tinggal di rumah nenek.) ⭕',
      exampleBad: ''
    },
    conceptB: {
      word: '間に (Aida ni)',
      core: 'Suatu aksi sesaat terjadi pada SATU MOMEN di tengah rentang waktu.',
      exampleGood: '留守の間に、荷物が届きました。(Saat saya sedang tidak di rumah, ada paket tiba.) ⭕',
      exampleBad: ''
    },
    summary: 'Partikel に (ni) mengunci satu momen titik waktu tertentu di dalam periode.'
  }
];

export const onomatopoeiaList = [
  {
    word: 'ドキドキ',
    romaji: 'doki-doki',
    category: 'Perasaan & Hati',
    meaning: 'Jantung berdegup kencang karena gugup, cemas, atau jatuh cinta',
    icon: '💓',
    example: '面接の直前、心臓がドキドキしました。',
    reading: 'めんせつの ちょくぜん、しんぞうが ドキドキ しました。',
    exampleMeaning: 'Tepat sebelum wawancara, jantung saya berdegup kencang.'
  },
  {
    word: 'ワクワク',
    romaji: 'waku-waku',
    category: 'Perasaan & Hati',
    meaning: 'Bersemangat gembira dan tidak sabar menantikan hal menyenangkan',
    icon: '🤩',
    example: '明日から日本旅行なので、とてもワクワクしています。',
    reading: 'あしたから にほんりょこうなので、とても ワクワク しています。',
    exampleMeaning: 'Karena besok mulai liburan ke Jepang, saya sangat bersemangat.'
  },
  {
    word: 'ペラペラ',
    romaji: 'pera-pera',
    category: 'Kemampuan Bahasa',
    meaning: 'Fasih, lancar, mengalir saat berbicara bahasa asing',
    icon: '🗣️',
    example: '彼女は一年で日本語がペラペラになりました。',
    reading: 'かのじょは いちねんで にほんごが ペラペラに なりました。',
    exampleMeaning: 'Dia menjadi sangat lancar berbicara bahasa Jepang dalam setahun.'
  },
  {
    word: 'ギリギリ',
    romaji: 'giri-giri',
    category: 'Waktu & Kondisi',
    meaning: 'Nyaris mepet batas waktu terakhir atau batas toleransi',
    icon: '⏱️',
    example: '電車の発車時刻にギリギリ間に合いました。',
    reading: 'でんしゃの はっしゃじこくに ギリギリ まにあいました。',
    exampleMeaning: 'Saya nyaris saja tepat waktu mengejar jadwal keberangkatan kereta.'
  },
  {
    word: 'イライラ',
    romaji: 'ira-ira',
    category: 'Perasaan & Hati',
    meaning: 'Kesal, jengkel, tidak sabar karena terganggu sesuatu',
    icon: '😤',
    example: '電車が遅れてイライラしてしまいました。',
    reading: 'でんしゃが おくれて イライラ してしまいました。',
    exampleMeaning: 'Saya jadi merasa kesal karena keretanya terlambat.'
  },
  {
    word: 'ホッと',
    romaji: 'hotto',
    category: 'Perasaan & Hati',
    meaning: 'Lega, bernapas lega setelah kecemasan berakhir',
    icon: '😌',
    example: '試験に合格したと聞いて、ホッと安心しました。',
    reading: 'しけんに ごうかくしたと きいて、ホッと あんしんしました。',
    exampleMeaning: 'Mendengar bahwa saya lulus ujian, saya merasa sangat lega.'
  },
  {
    word: 'ザーザー',
    romaji: 'zaa-zaa',
    category: 'Suara Alam',
    meaning: 'Suara hujan lebat yang mengguyur deras',
    icon: '🌧️',
    example: '外は雨がザーザー降っています。',
    reading: 'そとは あめが ザーザー ふっています。',
    exampleMeaning: 'Di luar hujan sedang turun dengan sangat deras.'
  },
  {
    word: 'モチモチ',
    romaji: 'mochi-mochi',
    category: 'Tekstur Makanan',
    meaning: 'Kenyal, lembut, elastis saat dikunyah (seperti mochi atau boba)',
    icon: '🍡',
    example: 'このうどんはコシがあってモチモチしています。',
    reading: 'この うどんは コシが あって モチモチ しています。',
    exampleMeaning: 'Mie udon ini mantap dan teksturnya sangat kenyal nikmat.'
  },
  {
    word: 'フワフワ',
    romaji: 'fuwa-fuwa',
    category: 'Tekstur & Sentuhan',
    meaning: 'Empuk, lembut, mengembang ringan (pancake, awan, kapas)',
    icon: '🥞',
    example: '焼きたてのスフレパンケーキはフワフワです。',
    reading: 'やきたての スフレパンケーキは フワフワです。',
    exampleMeaning: 'Pancake souffle yang baru matang sangatlah empuk dan lembut.'
  },
  {
    word: 'ニコニコ',
    romaji: 'niko-niko',
    category: 'Ekspresi Wajah',
    meaning: 'Tersenyum ramah berseri-seri penuh kehangatan',
    icon: '😊',
    example: '店員さんはいつもニコニコ挨拶してくれます。',
    reading: 'てんいんさんは いつも ニコニコ あいさつしてくれます。',
    exampleMeaning: 'Pelayan toko selalu menyapa dengan tersenyum ramah.'
  }
];
