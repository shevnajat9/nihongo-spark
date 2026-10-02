/**
 * Database Dialek Daerah Jepang (方言 / Hougen)
 * Mencakup perbandingan komprehensif antara Bahasa Standar Tokyo (標準語),
 * Dialek Kansai (関西弁 - Osaka, Kyoto, Kobe), dan Dialek Hakata (博多弁 - Fukuoka/Kyushu).
 */

export const dialectRegions = [
  {
    id: 'kansai',
    name: 'Kansai-ben (関西弁)',
    subregion: 'Osaka, Kyoto, Kobe',
    emoji: '🐙',
    color: '#f97316',
    description: 'Dialek paling terkenal dan ekspresif di Jepang. Digunakan secara luas dalam dunia komedi (Manzai), anime, dan percakapan bisnis informal.',
    keyFeatures: [
      'Negasi 〜ない berubah menjadi 〜ん / 〜へん (知らん, 行けへん)',
      'Kopula だ diganti dengan や, だから menjadi せやから',
      'Intonasi melompat di akhir kalimat dan penekanan ritmis yang hangat'
    ]
  },
  {
    id: 'hakata',
    name: 'Hakata-ben (博多弁)',
    subregion: 'Fukuoka, Kyushu',
    emoji: '🍜',
    color: '#ec4899',
    description: 'Dialek pulau Kyushu yang terkenal ramah, hangat, dan sangat populer di kalangan anak muda karena intonasi "kawaii" dan partikel khasnya.',
    keyFeatures: [
      'Pertanyaan diakhiri dengan 〜と？ (何しよーと？ = lagi ngapain?)',
      'Penegasan ramah menggunakan partikel 〜ばい atau 〜たい',
      'Kata keterangan penegas menggunakan ばり (sangat/banget)'
    ]
  },
  {
    id: 'tohoku',
    name: 'Tohoku-ben (東北弁 / ズーズー弁)',
    subregion: 'Aomori, Sendai, Akita',
    emoji: '🍎',
    color: '#10b981',
    description: 'Dialek wilayah utara pulau Honshu yang tenang dan padat fonem, sering menyingkat kata agar mulut tidak perlu terbuka lebar di cuaca dingin.',
    keyFeatures: [
      'Penggunaan partikel penegas 〜べ / 〜だべ (そうだべ)',
      'Kata ganti diri おら (ora / aku) dan penutup kalimat 〜さ (〜sa)'
    ]
  }
];

export const dialectDictionary = [
  {
    id: 'd-1',
    standard: '本当に',
    standardReading: 'ほんとうに (hontou ni)',
    kansai: 'ほんまに',
    kansaiReading: 'ほんまに (honma ni)',
    hakata: 'ほんまに / まじで',
    meaning: 'Benarkah? / Sungguh / Benar-benar',
    example: {
      standard: '本当に美味しいですね。',
      kansai: 'ほんまに美味いなぁ！',
      hakata: 'ばり美味しいばい！'
    }
  },
  {
    id: 'd-2',
    standard: 'ダメ / いけない',
    standardReading: 'だめ (dame) / いけない (ikenai)',
    kansai: 'あかん',
    kansaiReading: 'あかん (akan)',
    hakata: 'いかん / あかん',
    meaning: 'Tidak boleh / Sia-sia / Gawat',
    example: {
      standard: 'そんなことをしたらダメだよ。',
      kansai: 'そんなことしたらあかんて！',
      hakata: 'そんなことしたらいかんたい！'
    }
  },
  {
    id: 'd-3',
    standard: '違う',
    standardReading: 'ちがう (chigau)',
    kansai: 'ちゃう',
    kansaiReading: 'ちゃう (chau)',
    hakata: '違うばい / ちゃう',
    meaning: 'Bukan / Berbeda / Keliru',
    example: {
      standard: '違います、それは私のではないです。',
      kansai: 'ちゃうちゃう、それウチのちゃうで！',
      hakata: '違うとよ、それ私のやないと！'
    }
  },
  {
    id: 'd-4',
    standard: 'だから',
    standardReading: 'だから (dakara)',
    kansai: 'せやから',
    kansaiReading: 'せやから (seyakara)',
    hakata: 'やけん / だけん',
    meaning: 'Makanya / Oleh karena itu',
    example: {
      standard: 'だから言ったでしょう！',
      kansai: 'せやから言うたやんか！',
      hakata: 'やけん言うたろーが！'
    }
  },
  {
    id: 'd-5',
    standard: '知らない / 分からない',
    standardReading: 'しらない (shiranai) / わからない',
    kansai: '知らん / わからへん',
    kansaiReading: 'しらん (shiran) / わからへん',
    hakata: '知らんばい / わからん',
    meaning: 'Tidak tahu / Mana aku tahu',
    example: {
      standard: 'そんなこと私は知りません。',
      kansai: 'そんなんウチ知らんわ！',
      hakata: 'そんなこと知らんばい！'
    }
  },
  {
    id: 'd-6',
    standard: '何をしているの？',
    standardReading: 'なにをしているの？ (nani o shite iru no?)',
    kansai: '何してんの？ / 何してんねん？',
    kansaiReading: 'なにしてんねん？ (nani shiten nen?)',
    hakata: '何しよーと？',
    hakataReading: 'なにしよーと？ (nani shiyooto?)',
    meaning: 'Lagi ngapain kamu?',
    example: {
      standard: '今、何をしているの？',
      kansai: '今、何してんねん？',
      hakata: '今、何しよーと？'
    }
  },
  {
    id: 'd-7',
    standard: 'いいよ / 大丈夫だよ',
    standardReading: 'いいよ (ii yo) / だいじょうぶ',
    kansai: 'ええよ / かまへん',
    kansaiReading: 'ええよ (ee yo) / かまへん',
    hakata: 'よかよ / よかばい',
    meaning: 'Boleh kok / Tidak apa-apa / Santai saja',
    example: {
      standard: '手伝わなくてもいいよ。',
      kansai: '手伝わんでもええよ、かまへん！',
      hakata: '手伝わんでよかよ！'
    }
  },
  {
    id: 'd-8',
    standard: 'とても / すごく',
    standardReading: 'とても (totemo) / すごく (sugoku)',
    kansai: 'めっちゃ / ごっつ',
    kansaiReading: 'めっちゃ (metcha)',
    hakata: 'ばり / ちかっぱ',
    meaning: 'Sangat / Luar biasa / Banget',
    example: {
      standard: 'とても面白い映画でした。',
      kansai: 'めっちゃおもろい映画やった！',
      hakata: 'ばり面白か映画やったばい！'
    }
  },
  {
    id: 'd-9',
    standard: 'いくらですか？',
    standardReading: 'いくらですか？ (ikura desu ka?)',
    kansai: 'これ、なんぼ？',
    kansaiReading: 'これ、なんぼ？ (kore, nanbo?)',
    hakata: 'これ、なんぼね？',
    meaning: 'Ini harganya berapa?',
    example: {
      standard: 'すみません、これ全部でいくらですか？',
      kansai: 'おっちゃん、これ全部でなんぼ？まけてーな！',
      hakata: 'すみません、これなんぼですか？'
    }
  },
  {
    id: 'd-10',
    standard: '好きだよ',
    standardReading: 'すきだよ (suki da yo)',
    kansai: 'めっちゃ好きやねん',
    kansaiReading: 'すきやねん (suki yanen)',
    hakata: '好いとうよ / 好きばい',
    hakataReading: 'すいとうよ (suitou yo)',
    meaning: 'Aku menyukaimu / Aku suka ini lho',
    example: {
      standard: 'あなたのことが好きです。',
      kansai: 'あんたのことがめっちゃ好きやねん！',
      hakata: 'あんたのこと、好いとうよ。'
    }
  }
];

// Cultural Dialect Quiz Data
export const dialectQuizData = [
  {
    id: 'dq-1',
    dialect: 'Kansai-ben (Osaka)',
    phrase: '「それ、あかんて！もう知らんわ！」',
    romaji: 'Sore, akan te! Mou shiran wa!',
    audioText: 'それ、あかんて！もう知らんわ！',
    question: 'Apa arti kalimat dalam dialek Osaka di atas?',
    options: [
      'Itu tidak boleh/gawat lho! Aku nggak mau tahu lagi ya!',
      'Itu sangat bagus lho! Aku sudah tahu kok!',
      'Itu berbeda sekali! Tolong beritahu aku ya!',
      'Itu murah sekali! Aku mau beli ya!'
    ],
    correctIdx: 0,
    explanation: '「あかん」 = だめ (tidak boleh/gawat), dan 「知らん」 = 知らない (tidak tahu/masa bodoh).'
  },
  {
    id: 'dq-2',
    dialect: 'Hakata-ben (Fukuoka)',
    phrase: '「今からラーメン食べに行くばってん、何しよーと？」',
    romaji: 'Ima kara raamen tabe ni iku batten, nani shiyooto?',
    audioText: '今からラーメン食べに行くばってん、何しよーと？',
    question: 'Maksud dari pertanyaan 「何しよーと？」 dalam dialek Hakata adalah...',
    options: [
      'Kapan kamu mau makan?',
      'Sedang melakukan apa kamu sekarang?',
      'Apakah kamu suka ramen?',
      'Di mana kamu sekarang berada?'
    ],
    correctIdx: 1,
    explanation: 'Dalam dialek Hakata Fukuoka, akhiran 「〜と？」 adalah partikel tanya, dan 「何しよーと？」 berarti 「何をしているの？」 (lagi ngapain?).'
  },
  {
    id: 'dq-3',
    dialect: 'Kansai-ben (Osaka)',
    phrase: '「これ、めっちゃうまいやん！なんぼしたん？」',
    romaji: 'Kore, metcha umai yan! Nanbo shitan?',
    audioText: 'これ、めっちゃうまいやん！なんぼしたん？',
    question: 'Pertanyaan 「なんぼしたん？」 dalam situasi belanja/makan berarti...',
    options: [
      'Berapa porsinya?',
      'Berapa lama masaknya?',
      'Berapa harganya / habis uang berapa?',
      'Siapa yang memasaknya?'
    ],
    correctIdx: 2,
    explanation: '「なんぼ」 di Kansai adalah kata ganti penanya harga khas (いくら / いくらしたの？).'
  },
  {
    id: 'dq-4',
    dialect: 'Hakata-ben (Fukuoka)',
    phrase: '「この明太子、ばりうまいばい！」',
    romaji: 'Kono mentaiko, bari umai bai!',
    audioText: 'この明太子、ばりうまいばい！',
    question: 'Kata 「ばり (bari)」 pada kalimat di atas memiliki arti yang sama dengan...',
    options: [
      '少し (sukoshi / sedikit)',
      'とても / すごく (totemo / sangat/banget)',
      '辛い (karai / pedas)',
      '古い (furui / basi)'
    ],
    correctIdx: 1,
    explanation: '「ばり (bari)」 adalah kata keterangan khas Kyushu/Hakata yang bermakna "sangat" (sepadan dengan とても / めっちゃ).'
  },
  {
    id: 'dq-5',
    dialect: 'Kansai-ben (Osaka/Kyoto)',
    phrase: '「ちゃうちゃう！それ、ちゃうちゃうちゃうん？」',
    romaji: 'Chau chau! Sore, chau chau chaun?',
    audioText: 'ちゃうちゃう！それ、ちゃうちゃうちゃうん？',
    question: 'Permainan kata terkenal Osaka "Chau chau!..." di atas mempermainkan kata "bukan" dengan nama anjing Chow Chow. Inti arti kata 「ちゃう」 adalah...',
    options: [
      'Berlari (走る)',
      'Bukan / Berbeda (違う)',
      'Sama persis (同じ)',
      'Membeli (買う)'
    ],
    correctIdx: 1,
    explanation: '「ちゃう」 adalah kontraksi dialek Kansai untuk kata kerja 「違う (chigau / bukan/salah)」.'
  }
];
