/**
 * Data Detail Karakter Hiragana & Katakana untuk Pembelajaran Urutan Coretan & Menulis
 * Dilengkapi jumlah coretan (kakusuu), tips kaligrafi (tome, hane, harai), dan contoh kosakata.
 */

export const hiraganaDetails = [
  // A-dan
  {
    kana: 'あ',
    romaji: 'a',
    row: 'a',
    strokeCount: 3,
    strokeTips: 'Coretan 1 mendatar ke kanan. Coretan 2 melengkung vertikal membelah tengah. Coretan 3 melingkar spiral ke kanan bawah dengan sapuan lembut.',
    examples: [
      { word: 'ありがとう', reading: 'arigatou', meaning: 'Terima kasih' },
      { word: 'あめ', reading: 'ame', meaning: 'Hujan / Permen' }
    ]
  },
  {
    kana: 'い',
    romaji: 'i',
    row: 'a',
    strokeCount: 2,
    strokeTips: 'Coretan 1 melengkung ke kiri dengan sedikit kaitan (hane) di ujungnya. Coretan 2 di kanan lebih pendek tanpa kaitan.',
    examples: [
      { word: 'いぬ', reading: 'inu', meaning: 'Anjing' },
      { word: 'いちご', reading: 'ichigo', meaning: 'Stroberi' }
    ]
  },
  {
    kana: 'う',
    romaji: 'u',
    row: 'a',
    strokeCount: 2,
    strokeTips: 'Coretan 1 garis miring pendek di atas. Coretan 2 membentuk lengkungan bulat seperti telinga menghadap kanan.',
    examples: [
      { word: 'うみ', reading: 'umi', meaning: 'Laut' },
      { word: 'うま', reading: 'uma', meaning: 'Kuda' }
    ]
  },
  {
    kana: 'え',
    romaji: 'e',
    row: 'a',
    strokeCount: 2,
    strokeTips: 'Coretan 1 titik/garis miring pendek. Coretan 2 ditarik terus-menerus tanpa putus: mendatar, turun diagonal, naik, lalu mendatar di dasar.',
    examples: [
      { word: 'えき', reading: 'eki', meaning: 'Stasiun kereta' },
      { word: 'えんぴつ', reading: 'enpitsu', meaning: 'Pensil' }
    ]
  },
  {
    kana: 'お',
    romaji: 'o',
    row: 'a',
    strokeCount: 3,
    strokeTips: 'Coretan 1 mendatar. Coretan 2 turun ke bawah lalu melingkar besar. Coretan 3 titik di sisi kanan atas.',
    examples: [
      { word: 'おちゃ', reading: 'ocha', meaning: 'Teh Jepang' },
      { word: 'お金', reading: 'okane', meaning: 'Uang' }
    ]
  },

  // KA-dan
  {
    kana: 'か',
    romaji: 'ka',
    row: 'ka',
    strokeCount: 3,
    strokeTips: 'Coretan 1 ditarik ke kanan lalu melengkung ke bawah dengan kaitan (hane). Coretan 2 memotong diagonal. Coretan 3 titik di kanan luar.',
    examples: [
      { word: 'かさ', reading: 'kasa', meaning: 'Payung' },
      { word: 'かわ', reading: 'kawa', meaning: 'Sungai' }
    ]
  },
  {
    kana: 'き',
    romaji: 'ki',
    row: 'ka',
    strokeCount: 4,
    strokeTips: 'Dua garis mendatar agak miring ke atas (coretan 1 & 2), dipotong coretan 3 diagonal dengan kaitan, ditutup lengkungan bawah terpisah (coretan 4).',
    examples: [
      { word: 'きつね', reading: 'kitsune', meaning: 'Rubah' },
      { word: 'きのこ', reading: 'kinoko', meaning: 'Jamur' }
    ]
  },
  {
    kana: 'く',
    romaji: 'ku',
    row: 'ka',
    strokeCount: 1,
    strokeTips: 'Satu coretan berkesinambungan membentuk sudut tumpul lancip menghadap kiri (<).',
    examples: [
      { word: 'くるま', reading: 'kuruma', meaning: 'Mobil' },
      { word: 'くも', reading: 'kumo', meaning: 'Awan' }
    ]
  },
  {
    kana: 'け',
    romaji: 'ke',
    row: 'ka',
    strokeCount: 3,
    strokeTips: 'Coretan 1 vertikal di kiri dengan kaitan (hane). Coretan 2 mendatar di kanan. Coretan 3 melengkung vertikal memotong coretan 2.',
    examples: [
      { word: 'けいたい', reading: 'keitai', meaning: 'Ponsel' },
      { word: 'けむり', reading: 'kemuri', meaning: 'Asap' }
    ]
  },
  {
    kana: 'こ',
    romaji: 'ko',
    row: 'ka',
    strokeCount: 2,
    strokeTips: 'Coretan 1 mendatar di atas sedikit melengkung dengan kaitan tipis. Coretan 2 mendatar di bawah sejajar melengkung ke atas.',
    examples: [
      { word: 'こども', reading: 'kodomo', meaning: 'Anak-anak' },
      { word: 'こおり', reading: 'koori', meaning: 'Es' }
    ]
  },

  // SA-dan
  {
    kana: 'さ',
    romaji: 'sa',
    row: 'sa',
    strokeCount: 3,
    strokeTips: 'Mirip huruf き tapi hanya memiliki 1 garis mendatar (coretan 1), dipotong coretan 2, lalu lengkungan terpisah di bawah (coretan 3).',
    examples: [
      { word: 'さくら', reading: 'sakura', meaning: 'Bunga sakura' },
      { word: 'さかな', reading: 'sakana', meaning: 'Ikan' }
    ]
  },
  {
    kana: 'し',
    romaji: 'shi',
    row: 'sa',
    strokeCount: 1,
    strokeTips: 'Satu coretan vertikal turun lalu melengkung ke kanan atas menyerupai kail pancing.',
    examples: [
      { word: 'しま', reading: 'shima', meaning: 'Pulau' },
      { word: 'しろ', reading: 'shiro', meaning: 'Putih' }
    ]
  },
  {
    kana: 'す',
    romaji: 'su',
    row: 'sa',
    strokeCount: 2,
    strokeTips: 'Coretan 1 mendatar. Coretan 2 turun vertikal membentuk simpul lingkaran kecil di tengah lalu meluncur ke kiri bawah.',
    examples: [
      { word: 'すし', reading: 'sushi', meaning: 'Sushi' },
      { word: 'すいか', reading: 'suika', meaning: 'Semangka' }
    ]
  },
  {
    kana: 'せ',
    romaji: 'se',
    row: 'sa',
    strokeCount: 3,
    strokeTips: 'Coretan 1 mendatar panjang. Coretan 2 vertikal kanan berbelok ke kiri. Coretan 3 vertikal kiri memotong coretan 1.',
    examples: [
      { word: 'せんせい', reading: 'sensei', meaning: 'Guru' },
      { word: 'せかい', reading: 'sekai', meaning: 'Dunia' }
    ]
  },
  {
    kana: 'そ',
    romaji: 'so',
    row: 'sa',
    strokeCount: 1,
    strokeTips: 'Satu coretan zigzag tanpa putus: tarik ke kanan, miring ke kiri bawah, lalu buat lengkungan setengah lingkaran ke kanan di bawah.',
    examples: [
      { word: 'そら', reading: 'sora', meaning: 'Langit' },
      { word: 'そば', reading: 'soba', meaning: 'Mi soba' }
    ]
  },

  // TA-dan
  {
    kana: 'た',
    romaji: 'ta',
    row: 'ta',
    strokeCount: 4,
    strokeTips: 'Coretan 1 mendatar, coretan 2 miring memotong. Coretan 3 & 4 seperti huruf こ kecil di bagian kanan.',
    examples: [
      { word: 'たまご', reading: 'tamago', meaning: 'Telur' },
      { word: 'たいよう', reading: 'taiyou', meaning: 'Matahari' }
    ]
  },
  {
    kana: 'ち',
    romaji: 'chi',
    row: 'ta',
    strokeCount: 2,
    strokeTips: 'Coretan 1 mendatar pendek. Coretan 2 turun vertikal miring memotong lalu berputar membuat perut melingkar besar.',
    examples: [
      { word: 'ちず', reading: 'chizu', meaning: 'Peta' },
      { word: 'ちから', reading: 'chikara', meaning: 'Kekuatan' }
    ]
  },
  {
    kana: 'つ',
    romaji: 'tsu',
    row: 'ta',
    strokeCount: 1,
    strokeTips: 'Satu coretan berkesinambungan mendatar pendek di kiri atas lalu melengkung melingkar besar ke kanan bawah.',
    examples: [
      { word: 'つき', reading: 'tsuki', meaning: 'Bulan' },
      { word: 'つくえ', reading: 'tsukue', meaning: 'Meja belajar' }
    ]
  },
  {
    kana: 'て',
    romaji: 'te',
    row: 'ta',
    strokeCount: 1,
    strokeTips: 'Satu coretan mendatar ke kanan lalu berbelok melengkung ke kiri bawah seperti busur setengah lingkaran.',
    examples: [
      { word: 'てがみ', reading: 'tegami', meaning: 'Surat' },
      { word: 'てんき', reading: 'tenki', meaning: 'Cuaca' }
    ]
  },
  {
    kana: 'と',
    romaji: 'to',
    row: 'ta',
    strokeCount: 2,
    strokeTips: 'Coretan 1 garis miring pendek ke kanan bawah. Coretan 2 melengkung setengah lingkaran seperti huruf C menghadap kiri.',
    examples: [
      { word: 'とり', reading: 'tori', meaning: 'Burung' },
      { word: 'ともだち', reading: 'tomodachi', meaning: 'Teman' }
    ]
  },

  // NA-dan
  {
    kana: 'な',
    romaji: 'na',
    row: 'na',
    strokeCount: 4,
    strokeTips: 'Coretan 1 mendatar, coretan 2 miring memotong. Coretan 3 titik di kanan atas. Coretan 4 vertikal membentuk simpul melingkar di bawah.',
    examples: [
      { word: 'なつ', reading: 'natsu', meaning: 'Musim panas' },
      { word: 'なまえ', reading: 'namae', meaning: 'Nama' }
    ]
  },
  {
    kana: 'に',
    romaji: 'ni',
    row: 'na',
    strokeCount: 3,
    strokeTips: 'Coretan 1 vertikal di kiri dengan kaitan tipis. Coretan 2 & 3 mendatar sejajar di sebelah kanan (seperti huruf こ).',
    examples: [
      { word: 'にほん', reading: 'nihon', meaning: 'Jepang' },
      { word: 'にじ', reading: 'niji', meaning: 'Pelangi' }
    ]
  },
  {
    kana: 'ぬ',
    romaji: 'nu',
    row: 'na',
    strokeCount: 2,
    strokeTips: 'Coretan 1 miring ke kanan bawah. Coretan 2 melengkung besar membungkus coretan 1 dan membentuk simpul kecil di ekor kanan.',
    examples: [
      { word: 'ぬいぐるみ', reading: 'nuigurumi', meaning: 'Boneka' },
      { word: 'ぬま', reading: 'numa', meaning: 'Rawa' }
    ]
  },
  {
    kana: 'ね',
    romaji: 'ne',
    row: 'na',
    strokeCount: 2,
    strokeTips: 'Coretan 1 garis lurus vertikal di kiri. Coretan 2 zigzag lalu melengkung ke kanan dan berakhir dengan simpul melingkar.',
    examples: [
      { word: 'ねこ', reading: 'neko', meaning: 'Kucing' },
      { word: 'ねつ', reading: 'netsu', meaning: 'Demam' }
    ]
  },
  {
    kana: 'の',
    romaji: 'no',
    row: 'na',
    strokeCount: 1,
    strokeTips: 'Satu coretan berkesinambungan: miring ke bawah dari kanan atas, lalu melingkar besar ke kanan atas dan turun melengkung.',
    examples: [
      { word: 'のみもの', reading: 'nomimono', meaning: 'Minuman' },
      { word: 'のり', reading: 'nori', meaning: 'Rumput laut' }
    ]
  },

  // HA-dan
  {
    kana: 'は',
    romaji: 'ha',
    row: 'ha',
    strokeCount: 3,
    strokeTips: 'Coretan 1 vertikal di kiri dengan kaitan. Coretan 2 mendatar di kanan. Coretan 3 vertikal memotong coretan 2 lalu membuat simpul melingkar di bawah.',
    examples: [
      { word: 'はな', reading: 'hana', meaning: 'Bunga / Hidung' },
      { word: 'はし', reading: 'hashi', meaning: 'Sumpit / Jembatan' }
    ]
  },
  {
    kana: 'ひ',
    romaji: 'hi',
    row: 'ha',
    strokeCount: 1,
    strokeTips: 'Satu coretan: mendatar pendek, turun melengkung ke bawah seperti huruf U lebar, lalu naik dan turun pendek di kanan.',
    examples: [
      { word: 'ひかり', reading: 'hikari', meaning: 'Cahaya' },
      { word: 'ひこうき', reading: 'hikouki', meaning: 'Pesawat terbang' }
    ]
  },
  {
    kana: 'ふ',
    romaji: 'fu',
    row: 'ha',
    strokeCount: 4,
    strokeTips: 'Coretan 1 titik di atas. Coretan 2 garis melengkung berliku di tengah. Coretan 3 & 4 titik kiri dan kanan mengapit.',
    examples: [
      { word: 'ふね', reading: 'fune', meaning: 'Kapal laut' },
      { word: 'ふじさん', reading: 'fujisan', meaning: 'Gunung Fuji' }
    ]
  },
  {
    kana: 'へ',
    romaji: 'he',
    row: 'ha',
    strokeCount: 1,
    strokeTips: 'Satu coretan berbentuk bukit segitiga: naik miring pendek lalu turun miring lebih panjang ke kanan bawah.',
    examples: [
      { word: 'へや', reading: 'heya', meaning: 'Kamar' },
      { word: 'へび', reading: 'hebi', meaning: 'Ular' }
    ]
  },
  {
    kana: 'ほ',
    romaji: 'ho',
    row: 'ha',
    strokeCount: 4,
    strokeTips: 'Mirip は tapi memiliki 2 garis mendatar di kanan, dan garis vertikal ke-3 TIDAK menembus garis mendatar pertama.',
    examples: [
      { word: 'ほし', reading: 'hoshi', meaning: 'Bintang' },
      { word: 'ほん', reading: 'hon', meaning: 'Buku' }
    ]
  },

  // MA-dan
  {
    kana: 'ま',
    romaji: 'ma',
    row: 'ma',
    strokeCount: 3,
    strokeTips: 'Dua garis mendatar sejajar (coretan 1 & 2), dipotong coretan vertikal 3 yang menembus garis atas lalu membuat simpul melingkar di bawah.',
    examples: [
      { word: 'まち', reading: 'machi', meaning: 'Kota' },
      { word: 'まど', reading: 'mado', meaning: 'Jendela' }
    ]
  },
  {
    kana: 'み',
    romaji: 'mi',
    row: 'ma',
    strokeCount: 2,
    strokeTips: 'Coretan 1 mendatar, miring ke kiri bawah, membuat simpul melingkar, lalu mendatar ke kanan. Coretan 2 garis miring memotong di kanan.',
    examples: [
      { word: 'みず', reading: 'mizu', meaning: 'Air' },
      { word: 'みち', reading: 'michi', meaning: 'Jalan' }
    ]
  },
  {
    kana: 'む',
    romaji: 'mu',
    row: 'ma',
    strokeCount: 3,
    strokeTips: 'Coretan 1 mendatar pendek. Coretan 2 vertikal membuat simpul bulat di kiri lalu ditarik ke kanan atas dengan kaitan. Coretan 3 titik di kanan atas.',
    examples: [
      { word: 'むし', reading: 'mushi', meaning: 'Serangga' },
      { word: 'むら', reading: 'mura', meaning: 'Desa' }
    ]
  },
  {
    kana: 'め',
    romaji: 'me',
    row: 'ma',
    strokeCount: 2,
    strokeTips: 'Coretan 1 miring ke kanan bawah. Coretan 2 melengkung besar membungkus dari atas ke bawah mirip ぬ tapi TANPA simpul di ekor.',
    examples: [
      { word: 'めがね', reading: 'megane', meaning: 'Kacamata' },
      { word: 'めいし', reading: 'meishi', meaning: 'Kartu nama' }
    ]
  },
  {
    kana: 'も',
    romaji: 'mo',
    row: 'ma',
    strokeCount: 3,
    strokeTips: 'Coretan 1 vertikal melengkung menyerupai kail pancing (mirip し). Coretan 2 & 3 dua garis mendatar memotong badan kail.',
    examples: [
      { word: 'もり', reading: 'mori', meaning: 'Hutan' },
      { word: 'もも', reading: 'momo', meaning: 'Buah persik' }
    ]
  },

  // YA-dan
  {
    kana: 'や',
    romaji: 'ya',
    row: 'ya',
    strokeCount: 3,
    strokeTips: 'Coretan 1 melengkung ke kanan atas lalu turun dengan kaitan. Coretan 2 garis miring pendek di kiri atas. Coretan 3 garis miring panjang memotong.',
    examples: [
      { word: 'やま', reading: 'yama', meaning: 'Gunung' },
      { word: 'やさい', reading: 'yasai', meaning: 'Sayuran' }
    ]
  },
  {
    kana: 'ゆ',
    romaji: 'yu',
    row: 'ya',
    strokeCount: 2,
    strokeTips: 'Coretan 1 turun vertikal, melingkar ke kanan bawah lalu naik melengkung. Coretan 2 garis vertikal lurus memotong di tengah.',
    examples: [
      { word: 'ゆき', reading: 'yuki', meaning: 'Salju' },
      { word: 'ゆめ', reading: 'yume', meaning: 'Mimpi' }
    ]
  },
  {
    kana: 'よ',
    romaji: 'yo',
    row: 'ya',
    strokeCount: 2,
    strokeTips: 'Coretan 1 mendatar pendek di kiri atas. Coretan 2 vertikal turun memotong garis 1 lalu membuat simpul melingkar di bawah.',
    examples: [
      { word: 'よる', reading: 'yoru', meaning: 'Malam' },
      { word: 'ようふく', reading: 'youfuku', meaning: 'Pakaian Barat' }
    ]
  },

  // RA-dan
  {
    kana: 'ら',
    romaji: 'ra',
    row: 'ra',
    strokeCount: 2,
    strokeTips: 'Coretan 1 titik garis miring pendek di atas. Coretan 2 melengkung ke kanan bawah menyerupai angka 5 terbalik.',
    examples: [
      { word: 'らいおん', reading: 'raion', meaning: 'Singa' },
      { word: 'らくだ', reading: 'rakuda', meaning: 'Unta' }
    ]
  },
  {
    kana: 'り',
    romaji: 'ri',
    row: 'ra',
    strokeCount: 2,
    strokeTips: 'Coretan 1 vertikal pendek di kiri dengan kaitan tipis. Coretan 2 vertikal lebih panjang di kanan melengkung lembut ke bawah.',
    examples: [
      { word: 'りんご', reading: 'ringo', meaning: 'Apel' },
      { word: 'りす', reading: 'risu', meaning: 'Tupai' }
    ]
  },
  {
    kana: 'る',
    romaji: 'ru',
    row: 'ra',
    strokeCount: 1,
    strokeTips: 'Satu coretan berkesinambungan mirip angka 3, tetapi di ujung akhir bawah ditutup dengan simpul melingkar kecil.',
    examples: [
      { word: 'るす', reading: 'rusu', meaning: 'Sedang keluar/tidak ada di rumah' },
      { word: 'るび', reading: 'rubi', meaning: 'Teks furigana' }
    ]
  },
  {
    kana: 'れ',
    romaji: 're',
    row: 'ra',
    strokeCount: 2,
    strokeTips: 'Coretan 1 vertikal lurus di kiri. Coretan 2 zigzag lalu melengkung ke kanan dengan ujung melengkung keluar ke atas.',
    examples: [
      { word: 'れきし', reading: 'rekishi', meaning: 'Sejarah' },
      { word: 'れいぞうこ', reading: 'reizouko', meaning: 'Kulkas' }
    ]
  },
  {
    kana: 'ろ',
    romaji: 'ro',
    row: 'ra',
    strokeCount: 1,
    strokeTips: 'Satu coretan persis seperti huruf る, tetapi TANPA simpul melingkar di ujung bawah (terbuka seperti angka 3).',
    examples: [
      { word: 'ろうそく', reading: 'rousoku', meaning: 'Lilin' },
      { word: 'ろく', reading: 'roku', meaning: 'Enam (6)' }
    ]
  },

  // WA-dan & N
  {
    kana: 'わ',
    romaji: 'wa',
    row: 'wa',
    strokeCount: 2,
    strokeTips: 'Coretan 1 vertikal lurus. Coretan 2 zigzag lalu membentuk perut melengkung besar ke kanan (mirip れ tapi membulat lembut).',
    examples: [
      { word: 'わたし', reading: 'watashi', meaning: 'Saya' },
      { word: 'わに', reading: 'wani', meaning: 'Buaya' }
    ]
  },
  {
    kana: 'を',
    romaji: 'wo',
    row: 'wa',
    strokeCount: 3,
    strokeTips: 'Coretan 1 mendatar. Coretan 2 miring memotong berbelok ke kanan. Coretan 3 melengkung seperti huruf C memotong di bawah. Hanya dipakai sebagai partikel objek.',
    examples: [
      { word: 'パンを食べる', reading: 'pan o taberu', meaning: 'Makan roti' },
      { word: '本を読む', reading: 'hon o yomu', meaning: 'Membaca buku' }
    ]
  },
  {
    kana: 'ん',
    romaji: 'n',
    row: 'wa',
    strokeCount: 1,
    strokeTips: 'Satu coretan berkesinambungan menyerupai huruf alfabet "n" bergaya kursif melengkung lembut.',
    examples: [
      { word: 'おんがく', reading: 'ongaku', meaning: 'Musik' },
      { word: 'にほん', reading: 'nihon', meaning: 'Jepang' }
    ]
  }
];

export const katakanaDetails = [
  // A-dan
  {
    kana: 'ア',
    romaji: 'a',
    row: 'a',
    strokeCount: 2,
    strokeTips: 'Coretan 1 mendatar ke kanan lalu berbelok miring ke kiri bawah. Coretan 2 melengkung miring ke kiri bawah dari tengah coretan 1.',
    examples: [
      { word: 'アイス', reading: 'aisu', meaning: 'Es krim' },
      { word: 'アニメ', reading: 'anime', meaning: 'Animasi Jepang' }
    ]
  },
  {
    kana: 'イ',
    romaji: 'i',
    row: 'a',
    strokeCount: 2,
    strokeTips: 'Coretan 1 miring ke kiri bawah. Coretan 2 garis lurus vertikal ke bawah menempel pada coretan 1.',
    examples: [
      { word: 'インド', reading: 'indo', meaning: 'India' },
      { word: 'インク', reading: 'inku', meaning: 'Tinta' }
    ]
  },
  {
    kana: 'ウ',
    romaji: 'u',
    row: 'a',
    strokeCount: 3,
    strokeTips: 'Coretan 1 titik vertikal pendek di atas. Coretan 2 titik vertikal pendek di kiri bawah. Coretan 3 mendatar lalu melengkung tajam ke kiri bawah.',
    examples: [
      { word: 'ウエハース', reading: 'uehaasu', meaning: 'Wafer' },
      { word: 'ウイルス', reading: 'uirusu', meaning: 'Virus' }
    ]
  },
  {
    kana: 'エ',
    romaji: 'e',
    row: 'a',
    strokeCount: 3,
    strokeTips: 'Coretan 1 garis mendatar atas. Coretan 2 vertikal di tengah. Coretan 3 garis mendatar dasar yang lebih panjang.',
    examples: [
      { word: 'エレベーター', reading: 'erebeetaa', meaning: 'Lift / Elevator' },
      { word: 'エアコン', reading: 'eakon', meaning: 'AC (Pendingin ruangan)' }
    ]
  },
  {
    kana: 'オ',
    romaji: 'o',
    row: 'a',
    strokeCount: 3,
    strokeTips: 'Coretan 1 mendatar. Coretan 2 vertikal memotong dengan kaitan tajam ke kiri. Coretan 3 garis miring diagonal di sisi kiri bawah.',
    examples: [
      { word: 'オレンジ', reading: 'orenji', meaning: 'Jeruk' },
      { word: 'オリーブ', reading: 'oriibu', meaning: 'Zaitun' }
    ]
  },

  // KA-dan
  {
    kana: 'カ',
    romaji: 'ka',
    row: 'ka',
    strokeCount: 2,
    strokeTips: 'Bentuknya sama persis seperti radikal kanji 力 (chikara) atau huruf か tanpa titik luar.',
    examples: [
      { word: 'カメラ', reading: 'kamera', meaning: 'Kamera' },
      { word: 'カフェ', reading: 'kafe', meaning: 'Kafe' }
    ]
  },
  {
    kana: 'キ',
    romaji: 'ki',
    row: 'ka',
    strokeCount: 3,
    strokeTips: 'Dua garis mendatar miring ke atas (coretan 1 & 2), dipotong satu garis diagonal miring ke kiri bawah (coretan 3).',
    examples: [
      { word: 'キー', reading: 'kii', meaning: 'Kunci' },
      { word: 'キャンプ', reading: 'kyanpu', meaning: 'Berkemah' }
    ]
  },
  {
    kana: 'ク',
    romaji: 'ku',
    row: 'ka',
    strokeCount: 2,
    strokeTips: 'Coretan 1 miring ke kiri bawah. Coretan 2 mendatar ke kanan lalu melengkung panjang ke kiri bawah.',
    examples: [
      { word: 'クラス', reading: 'kurasu', meaning: 'Kelas' },
      { word: 'クッキー', reading: 'kukkii', meaning: 'Kukis' }
    ]
  },
  {
    kana: 'ケ',
    romaji: 'ke',
    row: 'ka',
    strokeCount: 3,
    strokeTips: 'Coretan 1 miring ke kiri bawah. Coretan 2 mendatar menempel coretan 1. Coretan 3 melengkung memotong ke kiri bawah.',
    examples: [
      { word: 'ケーキ', reading: 'keeki', meaning: 'Kue' },
      { word: 'ケチャップ', reading: 'kechappu', meaning: 'Saus tomat' }
    ]
  },
  {
    kana: 'コ',
    romaji: 'ko',
    row: 'ka',
    strokeCount: 2,
    strokeTips: 'Coretan 1 mendatar ke kanan lalu berbelok vertikal ke bawah. Coretan 2 mendatar di bagian dasar menutup sudut.',
    examples: [
      { word: 'コーヒー', reading: 'koohii', meaning: 'Kopi' },
      { word: 'コイン', reading: 'koin', meaning: 'Koin' }
    ]
  },

  // SA-dan
  {
    kana: 'サ',
    romaji: 'sa',
    row: 'sa',
    strokeCount: 3,
    strokeTips: 'Coretan 1 mendatar panjang. Coretan 2 vertikal pendek di kiri memotong. Coretan 3 vertikal di kanan memotong melengkung ke kiri.',
    examples: [
      { word: 'サラダ', reading: 'sarada', meaning: 'Salad' },
      { word: 'サッカー', reading: 'sakkaa', meaning: 'Sepak bola' }
    ]
  },
  {
    kana: 'シ',
    romaji: 'shi',
    row: 'sa',
    strokeCount: 3,
    strokeTips: 'PENTING: Coretan 1 & 2 adalah dua titik miring vertikal. Coretan 3 ditarik DARI BAWAH KIRI NAIK KE ATAS KANAN (berlawanan arah dengan ツ).',
    examples: [
      { word: 'シャツ', reading: 'shatsu', meaning: 'Kemeja' },
      { word: 'シャワー', reading: 'shawaa', meaning: 'Mandi pancuran' }
    ]
  },
  {
    kana: 'ス',
    romaji: 'su',
    row: 'sa',
    strokeCount: 2,
    strokeTips: 'Coretan 1 mendatar ke kanan lalu melengkung ke kiri bawah. Coretan 2 garis miring menyilang ke kanan bawah.',
    examples: [
      { word: 'スポーツ', reading: 'supootsu', meaning: 'Olahraga' },
      { word: 'スープ', reading: 'suupu', meaning: 'Sup' }
    ]
  },
  {
    kana: 'セ',
    romaji: 'se',
    row: 'sa',
    strokeCount: 2,
    strokeTips: 'Coretan 1 mendatar lalu vertikal berbelok ke kiri dengan kaitan. Coretan 2 garis vertikal lurus di kanan memotong.',
    examples: [
      { word: 'セーター', reading: 'seetaa', meaning: 'Baju hangat' },
      { word: 'ゼロ', reading: 'zero', meaning: 'Nol' }
    ]
  },
  {
    kana: 'ソ',
    romaji: 'so',
    row: 'sa',
    strokeCount: 2,
    strokeTips: 'PENTING: Coretan 1 titik miring di atas. Coretan 2 ditarik DARI ATAS KANAN TURUN KE KIRI BAWAH (berbeda arah dengan ン).',
    examples: [
      { word: 'ソファ', reading: 'sofa', meaning: 'Sofa' },
      { word: 'ソース', reading: 'soosu', meaning: 'Saus' }
    ]
  },

  // TA-dan
  {
    kana: 'タ',
    romaji: 'ta',
    row: 'ta',
    strokeCount: 3,
    strokeTips: 'Coretan 1 miring ke kiri. Coretan 2 mendatar ke kanan lalu melengkung ke kiri bawah. Coretan 3 garis miring kecil memotong di dalam.',
    examples: [
      { word: 'タクシー', reading: 'takushii', meaning: 'Taksi' },
      { word: 'タオル', reading: 'taoru', meaning: 'Handuk' }
    ]
  },
  {
    kana: 'チ',
    romaji: 'chi',
    row: 'ta',
    strokeCount: 3,
    strokeTips: 'Coretan 1 mendatar pendek agak miring. Coretan 2 mendatar lebih panjang di bawahnya. Coretan 3 melengkung memotong ke kiri bawah.',
    examples: [
      { word: 'チーズ', reading: 'chiizu', meaning: 'Keju' },
      { word: 'チーム', reading: 'chiimu', meaning: 'Tim' }
    ]
  },
  {
    kana: 'ツ',
    romaji: 'tsu',
    row: 'ta',
    strokeCount: 3,
    strokeTips: 'PENTING: Coretan 1 & 2 adalah dua titik mendatar di atas. Coretan 3 ditarik DARI ATAS KANAN MENUKIK KE KIRI BAWAH (lawan dari シ).',
    examples: [
      { word: 'ツアー', reading: 'tsuaa', meaning: 'Tur wisata' },
      { word: 'ツナ', reading: 'tsuna', meaning: 'Ikan tuna' }
    ]
  },
  {
    kana: 'テ',
    romaji: 'te',
    row: 'ta',
    strokeCount: 3,
    strokeTips: 'Coretan 1 mendatar pendek. Coretan 2 mendatar lebih panjang di bawahnya. Coretan 3 melengkung ke kiri bawah dari tengah garis 2.',
    examples: [
      { word: 'テレビ', reading: 'terebi', meaning: 'Televisi' },
      { word: 'テスト', reading: 'tesuto', meaning: 'Ujian' }
    ]
  },
  {
    kana: 'ト',
    romaji: 'to',
    row: 'ta',
    strokeCount: 2,
    strokeTips: 'Coretan 1 garis lurus vertikal dari atas ke bawah. Coretan 2 garis miring pendek ke kanan bawah menempel di tengah.',
    examples: [
      { word: 'トマト', reading: 'tomato', meaning: 'Tomat' },
      { word: 'トイレ', reading: 'toire', meaning: 'Toilet' }
    ]
  },

  // NA-dan
  {
    kana: 'ナ',
    romaji: 'na',
    row: 'na',
    strokeCount: 2,
    strokeTips: 'Coretan 1 mendatar. Coretan 2 miring ke kiri bawah memotong garis 1 (mirip bentuk salib miring).',
    examples: [
      { word: 'ナイフ', reading: 'naifu', meaning: 'Pisau' },
      { word: 'ナット', reading: 'natto', meaning: 'Mur baut' }
    ]
  },
  {
    kana: 'ニ',
    romaji: 'ni',
    row: 'na',
    strokeCount: 2,
    strokeTips: 'Dua garis mendatar sejajar (atas lebih pendek, bawah lebih panjang), persis seperti kanji 二 (dua).',
    examples: [
      { word: 'ニュース', reading: 'nyuusu', meaning: 'Berita' },
      { word: 'ネクタイ', reading: 'nekutai', meaning: 'Dasi' }
    ]
  },
  {
    kana: 'ヌ',
    romaji: 'nu',
    row: 'na',
    strokeCount: 2,
    strokeTips: 'Coretan 1 mendatar ke kanan lalu miring ke kiri bawah. Coretan 2 titik miring memotong di sudut kanan.',
    examples: [
      { word: 'ヌードル', reading: 'nuudoru', meaning: 'Mi instan' },
      { word: 'カヌー', reading: 'kanuu', meaning: 'Kano' }
    ]
  },
  {
    kana: 'ネ',
    romaji: 'ne',
    row: 'na',
    strokeCount: 4,
    strokeTips: 'Coretan 1 titik di atas. Coretan 2 zigzag ke bawah. Coretan 3 vertikal lurus. Coretan 4 titik miring di kanan bawah.',
    examples: [
      { word: 'ネット', reading: 'netto', meaning: 'Internet / Jaring' },
      { word: 'ノート', reading: 'nooto', meaning: 'Buku catatan' }
    ]
  },
  {
    kana: 'ノ',
    romaji: 'no',
    row: 'na',
    strokeCount: 1,
    strokeTips: 'Satu garis sapuan miring melengkung lembut dari kanan atas ke kiri bawah.',
    examples: [
      { word: 'ノート', reading: 'nooto', meaning: 'Buku catatan' },
      { word: 'ノルマ', reading: 'noruma', meaning: 'Target kuota' }
    ]
  },

  // HA-dan
  {
    kana: 'ハ',
    romaji: 'ha',
    row: 'ha',
    strokeCount: 2,
    strokeTips: 'Dua garis miring membuka ke bawah: coretan 1 miring ke kiri, coretan 2 miring ke kanan (mirip kanji 八).',
    examples: [
      { word: 'ハンバーガー', reading: 'hanbaagaa', meaning: 'Burger' },
      { word: 'ハム', reading: 'hamu', meaning: 'Daging ham' }
    ]
  },
  {
    kana: 'ヒ',
    romaji: 'hi',
    row: 'ha',
    strokeCount: 2,
    strokeTips: 'Coretan 1 mendatar pendek ke kanan. Coretan 2 vertikal turun membelok ke kanan lalu naik sedikit.',
    examples: [
      { word: 'ヒーター', reading: 'hiitaa', meaning: 'Pemanas ruangan' },
      { word: 'ヒーロー', reading: 'hiiroo', meaning: 'Pahlawan' }
    ]
  },
  {
    kana: 'フ',
    romaji: 'fu',
    row: 'ha',
    strokeCount: 1,
    strokeTips: 'Satu coretan: mendatar ke kanan lalu berbelok melengkung ke kiri bawah.',
    examples: [
      { word: 'フォーク', reading: 'fooku', meaning: 'Garpu' },
      { word: 'フルーツ', reading: 'furuutsu', meaning: 'Buah-buahan' }
    ]
  },
  {
    kana: 'ヘ',
    romaji: 'he',
    row: 'ha',
    strokeCount: 1,
    strokeTips: 'Bentuk dan coretannya persis sama dengan hiragana へ: naik miring pendek lalu turun miring lebih panjang.',
    examples: [
      { word: 'ヘルメット', reading: 'herumetto', meaning: 'Helm' },
      { word: 'ヘリコプター', reading: 'herikoputaa', meaning: 'Helikopter' }
    ]
  },
  {
    kana: 'ホ',
    romaji: 'ho',
    row: 'ha',
    strokeCount: 4,
    strokeTips: 'Coretan 1 mendatar. Coretan 2 vertikal dengan kaitan tajam di dasar. Coretan 3 & 4 dua garis miring mengapit di kiri dan kanan.',
    examples: [
      { word: 'ホテル', reading: 'hoteru', meaning: 'Hotel' },
      { word: 'ホワイト', reading: 'howaito', meaning: 'Putih' }
    ]
  },

  // MA-dan
  {
    kana: 'マ',
    romaji: 'ma',
    row: 'ma',
    strokeCount: 2,
    strokeTips: 'Coretan 1 mendatar ke kanan lalu miring ke kiri bawah. Coretan 2 titik miring pendek menempel di tengah.',
    examples: [
      { word: 'マスク', reading: 'masuku', meaning: 'Masker' },
      { word: 'マイク', reading: 'maiku', meaning: 'Mikrofon' }
    ]
  },
  {
    kana: 'ミ',
    romaji: 'mi',
    row: 'ma',
    strokeCount: 3,
    strokeTips: 'Tiga garis miring pendek sejajar dari atas ke bawah (semua miring ke kanan bawah).',
    examples: [
      { word: 'ミルク', reading: 'miruku', meaning: 'Susu' },
      { word: 'ミント', reading: 'minto', meaning: 'Daun mint' }
    ]
  },
  {
    kana: 'ム',
    romaji: 'mu',
    row: 'ma',
    strokeCount: 2,
    strokeTips: 'Coretan 1 miring ke kiri bawah lalu mendatar ke kanan. Coretan 2 titik miring di kanan bawah.',
    examples: [
      { word: 'ムービー', reading: 'muubii', meaning: 'Film' },
      { word: 'ムード', reading: 'muudo', meaning: 'Suasana / Mood' }
    ]
  },
  {
    kana: 'メ',
    romaji: 'me',
    row: 'ma',
    strokeCount: 2,
    strokeTips: 'Coretan 1 miring ke kiri bawah. Coretan 2 miring ke kanan bawah memotong tepat di tengah (seperti tanda silang X miring).',
    examples: [
      { word: 'メール', reading: 'meeru', meaning: 'Email / Surat elektronik' },
      { word: 'メニュー', reading: 'menyuu', meaning: 'Menu' }
    ]
  },
  {
    kana: 'モ',
    romaji: 'mo',
    row: 'ma',
    strokeCount: 3,
    strokeTips: 'Dua garis mendatar sejajar (coretan 1 & 2), dipotong coretan 3 vertikal yang berbelok ke kanan di bawahnya.',
    examples: [
      { word: 'モデル', reading: 'moderu', meaning: 'Model' },
      { word: 'モノレール', reading: 'monoreeru', meaning: 'Monorel' }
    ]
  },

  // YA-dan
  {
    kana: 'ヤ',
    romaji: 'ya',
    row: 'ya',
    strokeCount: 2,
    strokeTips: 'Coretan 1 mendatar ke kanan lalu melengkung ke kiri bawah. Coretan 2 garis vertikal lurus memotong di kanan.',
    examples: [
      { word: 'ヤクルト', reading: 'yakuruto', meaning: 'Yakult' },
      { word: 'ヤシ', reading: 'yashi', meaning: 'Pohon kelapa' }
    ]
  },
  {
    kana: 'ユ',
    romaji: 'yu',
    row: 'ya',
    strokeCount: 2,
    strokeTips: 'Coretan 1 vertikal turun lalu berbelok mendatar ke kanan. Coretan 2 garis mendatar di bawah yang lebih panjang.',
    examples: [
      { word: 'ユーモア', reading: 'yuumoa', meaning: 'Humor' },
      { word: 'ユニフォーム', reading: 'yunihoomu', meaning: 'Seragam' }
    ]
  },
  {
    kana: 'ヨ',
    romaji: 'yo',
    row: 'ya',
    strokeCount: 3,
    strokeTips: 'Coretan 1 mendatar lalu turun ke bawah. Coretan 2 mendatar di tengah. Coretan 3 mendatar di dasar menutup bentuk (seperti huruf E terbalik).',
    examples: [
      { word: 'ヨーグルト', reading: 'yooguruto', meaning: 'Yoghurt' },
      { word: 'ヨーロッパ', reading: 'yooroppa', meaning: 'Eropa' }
    ]
  },

  // RA-dan
  {
    kana: 'ラ',
    romaji: 'ra',
    row: 'ra',
    strokeCount: 2,
    strokeTips: 'Coretan 1 mendatar pendek di atas. Coretan 2 vertikal turun lalu melengkung lembut ke kiri bawah.',
    examples: [
      { word: 'ラジオ', reading: 'rajio', meaning: 'Radio' },
      { word: 'ラーメン', reading: 'raamen', meaning: 'Mie ramen' }
    ]
  },
  {
    kana: 'リ',
    romaji: 'ri',
    row: 'ra',
    strokeCount: 2,
    strokeTips: 'Dua garis vertikal: kiri lebih pendek, kanan lebih panjang (hampir sama seperti hiragana り tetapi garisnya lebih kaku lurus).',
    examples: [
      { word: 'リーダー', reading: 'riidaa', meaning: 'Pemimpin / Leader' },
      { word: 'リンゴ', reading: 'ringo', meaning: 'Apel' }
    ]
  },
  {
    kana: 'ル',
    romaji: 'ru',
    row: 'ra',
    strokeCount: 2,
    strokeTips: 'Coretan 1 miring ke kiri bawah. Coretan 2 garis vertikal di kanan yang melengkung ke atas di ujungnya (kaitan hane).',
    examples: [
      { word: 'ルール', reading: 'ruuru', meaning: 'Aturan' },
      { word: 'ルビー', reading: 'rubii', meaning: 'Batu rubi' }
    ]
  },
  {
    kana: 'レ',
    romaji: 're',
    row: 'ra',
    strokeCount: 1,
    strokeTips: 'Satu coretan berkesinambungan: garis vertikal turun ke bawah lalu menyudut tajam naik ke kanan atas.',
    examples: [
      { word: 'レモン', reading: 'remon', meaning: 'Lemon' },
      { word: 'レストラン', reading: 'resutoran', meaning: 'Restoran' }
    ]
  },
  {
    kana: 'ロ',
    romaji: 'ro',
    row: 'ra',
    strokeCount: 3,
    strokeTips: 'Membentuk bujur sangkar kotak sempurna: coretan 1 vertikal kiri, coretan 2 mendatar lalu turun kanan, coretan 3 mendatar di dasar menutup kotak.',
    examples: [
      { word: 'ロボット', reading: 'robotto', meaning: 'Robot' },
      { word: 'ロシア', reading: 'roshia', meaning: 'Rusia' }
    ]
  },

  // WA-dan & N
  {
    kana: 'ワ',
    romaji: 'wa',
    row: 'wa',
    strokeCount: 2,
    strokeTips: 'Coretan 1 vertikal pendek di kiri atas. Coretan 2 mendatar ke kanan lalu melengkung ke kiri bawah (mirip フ tapi ada tiang kiri).',
    examples: [
      { word: 'ワイン', reading: 'wain', meaning: 'Anggur / Wine' },
      { word: 'ワイシャツ', reading: 'waishatsu', meaning: 'Kemeja kerja' }
    ]
  },
  {
    kana: 'ヲ',
    romaji: 'wo',
    row: 'wa',
    strokeCount: 3,
    strokeTips: 'Coretan 1 mendatar pendek. Coretan 2 mendatar memotong melengkung ke kiri bawah. Coretan 3 garis miring kecil di kanan bawah.',
    examples: [
      { word: 'ヲタク', reading: 'wotaku', meaning: 'Otaku (penggemar fanatik)' }
    ]
  },
  {
    kana: 'ン',
    romaji: 'n',
    row: 'wa',
    strokeCount: 2,
    strokeTips: 'PENTING: Coretan 1 titik miring di kiri. Coretan 2 ditarik DARI KIRI BAWAH MELAYANG NAIK KE KANAN ATAS (lawan dari ソ).',
    examples: [
      { word: 'パン', reading: 'pan', meaning: 'Roti' },
      { word: 'サンドイッチ', reading: 'sandoicchi', meaning: 'Roti lapis' }
    ]
  }
];
