/**
 * Database Pasangan Kanji Mirip & Jebakan Ujian (類似漢字 / Rui-ji Kanji Trap Breaker)
 * Mencakup pasangan dan trio kanji yang kerap mengecoh peserta JLPT dari N5 hingga N1.
 */

export const ruijiKanjiData = [
  // ==========================================
  // LEVEL N5 / N4
  // ==========================================
  {
    id: 'ruiji-1',
    level: 'N5',
    title: '待 vs 持 vs 特',
    category: 'Radikal Kiri Berbeda (彳 vs 扌 vs 牜)',
    summary: 'Ketiganya berbagi komponen kanan 寺 (kuil/waktu), namun radikal kirinya menentukan makna secara total: orang berjalan (彳), tangan (扌), atau lembu kurban (牜).',
    kanjis: [
      {
        char: '待',
        reading: 'タイ / ま・つ (tai / matsu)',
        meaning: 'Menunggu',
        radical: '彳 (gyouninben - langkah / jalan)',
        radicalRole: 'Berdiri di jalan menunggu seseorang.',
        difference: 'Radikal kiri memiliki 2 goresan serong (彳), melambangkan kaki melangkah di jalan.',
        mnemonic: 'Berdiri di tepi jalan (彳) dekat kuil (寺) untuk MENUNGGU teman.',
        examples: [
          { word: '待つ', reading: 'まつ', meaning: 'menunggu' },
          { word: '期待', reading: 'きたい', meaning: 'harapan / ekspektasi' },
          { word: '招待', reading: 'しょうたい', meaning: 'undangan' }
        ]
      },
      {
        char: '持',
        reading: 'ジ / も・つ (ji / motsu)',
        meaning: 'Membawa / Memegang / Memiliki',
        radical: '扌 (tehen - tangan)',
        radicalRole: 'Tangan yang memegang atau membawa sesuatu.',
        difference: 'Radikal kiri adalah 扌 (bentuk ringkas dari 手 - tangan).',
        mnemonic: 'Menggunakan tangan (扌) untuk MEMBAWA persembahan ke kuil (寺).',
        examples: [
          { word: '持つ', reading: 'もつ', meaning: 'membawa / memegang' },
          { word: '気持ち', reading: 'きもち', meaning: 'perasaan' },
          { word: '支持', reading: 'しじ', meaning: 'dukungan' }
        ]
      },
      {
        char: '特',
        reading: 'トク (toku)',
        meaning: 'Spesial / Khusus',
        radical: '牜 (ushihen - sapi / lembu)',
        radicalRole: 'Lembu jantan pilihan istimewa untuk ritual kuil.',
        difference: 'Radikal kiri adalah 牜 (sapi dengan garis miring ke atas).',
        mnemonic: 'Sapi jantan (牜) yang SPESIAL dipersembahkan di kuil (寺).',
        examples: [
          { word: '特に', reading: 'とくに', meaning: 'khususnya / terutama' },
          { word: '特別', reading: 'とくべつ', meaning: 'spesial / istimewa' },
          { word: '特徴', reading: 'とくちょう', meaning: 'ciri khas / karakteristik' }
        ]
      }
    ],
    drillQuestions: [
      {
        prompt: 'Pilihlah kanji yang tepat untuk kalimat: 「荷物を＿＿＿ちます。」 (Membawa barang bawaan)',
        target: '持',
        options: ['待', '持', '特'],
        explanation: 'Membawa atau memegang menggunakan tangan (扌) $\\rightarrow$ 持つ (motsu).'
      },
      {
        prompt: 'Pilihlah kanji yang tepat: 「駅の前で友達を＿＿＿つ。」 (Menunggu teman di depan stasiun)',
        target: '待',
        options: ['待', '持', '特'],
        explanation: 'Menunggu di jalan (彳) $\\rightarrow$ 待つ (matsu).'
      },
      {
        prompt: 'Pilihlah kanji yang tepat: 「＿＿＿別な日」 (Hari yang istimewa/spesial)',
        target: '特',
        options: ['待', '持', '特'],
        explanation: 'Istimewa / khusus adalah 特別 (tokubetsu) dengan kanji 特.'
      }
    ]
  },
  {
    id: 'ruiji-2',
    level: 'N5',
    title: '右 vs 左',
    category: 'Arah & Goresan Awal (Kanan vs Kiri)',
    summary: 'Bentuknya hampir sama dengan atap dan garis silang, namun huruf di bawahnya berbeda: 口 (mulut untuk kanan) vs 工 (alat ukur/tangan kiri).',
    kanjis: [
      {
        char: '右',
        reading: 'ウ・ユウ / みぎ (u, yuu / migi)',
        meaning: 'Kanan',
        radical: '口 (kuchi - mulut)',
        radicalRole: 'Tangan kanan membawa makanan ke mulut.',
        difference: 'Goresan bawah adalah 口 (kotak mulut). Urutan coretan dimulai dari garis miring 丿 lalu mendatar 一.',
        mnemonic: 'Tangan KANAN menyuapkan nasi ke mulut (口).',
        examples: [
          { word: '右手', reading: 'みぎて', meaning: 'tangan kanan' },
          { word: '右側', reading: 'みぎがわ', meaning: 'sebelah kanan' },
          { word: '左右', reading: 'さゆう', meaning: 'kiri dan kanan / kendali' }
        ]
      },
      {
        char: '左',
        reading: 'サ / ひだり (sa / hidari)',
        meaning: 'Kiri',
        radical: '工 (kou - kerja / alat)',
        radicalRole: 'Tangan kiri memegang perkakas pertukangan.',
        difference: 'Goresan bawah adalah 工. Urutan coretan dimulai dari garis mendatar 一 lalu miring ke kiri 丿.',
        mnemonic: 'Tangan KIRI memegang penggaris siku pertukangan (工).',
        examples: [
          { word: '左手', reading: 'ひだりて', meaning: 'tangan kiri' },
          { word: '左側', reading: 'ひだりがわ', meaning: 'sebelah kiri' },
          { word: '左折', reading: 'させつ', meaning: 'belok kiri' }
        ]
      }
    ],
    drillQuestions: [
      {
        prompt: 'Manakah kanji untuk "Kiri" (Hidari)?',
        target: '左',
        options: ['右', '左'],
        explanation: 'Kiri (hidari) memiliki komponen perkakas 工 di bawahnya $\\rightarrow$ 左.'
      },
      {
        prompt: 'Manakah kanji untuk "Kanan" (Migi)?',
        target: '右',
        options: ['右', '左'],
        explanation: 'Kanan (migi) memiliki komponen mulut 口 di bawahnya $\\rightarrow$ 右.'
      }
    ]
  },
  {
    id: 'ruiji-3',
    level: 'N5',
    title: '日 vs 白 vs 目',
    category: 'Garis Pembeda Kotak Vertikal',
    summary: 'Kotak matahari (日), kotak ditambah titik atas menjadi putih (白), dan kotak ditambah 2 garis dalam menjadi mata (目).',
    kanjis: [
      {
        char: '日',
        reading: 'ニチ・ジツ / ひ・び・か (nichi / hi)',
        meaning: 'Hari / Matahari',
        radical: '日 (hi - matahari)',
        radicalRole: 'Bentuk piringan matahari dengan 1 garis pusat.',
        difference: 'Hanya memiliki 1 garis horisontal di dalam kotak.',
        mnemonic: 'Matahari bulat bersinar satu hari penuh.',
        examples: [
          { word: '日曜日', reading: 'にちようび', meaning: 'hari Minggu' },
          { word: '毎日', reading: 'まいにち', meaning: 'setiap hari' },
          { word: '日本', reading: 'にほん', meaning: 'Jepang' }
        ]
      },
      {
        char: '白',
        reading: 'ハク / しろ・しろい (haku / shiro, shiroi)',
        meaning: 'Putih',
        radical: '白 (shiro - putih)',
        radicalRole: 'Sepercik cahaya putih bersinar di atas matahari.',
        difference: 'Memiliki 1 tetesan/goresan kecil di puncak kotak (丿).',
        mnemonic: 'Sinar fajar menyembul di atas matahari, warnanya PUTIH.',
        examples: [
          { word: '白い', reading: 'しろい', meaning: 'putih' },
          { word: '面白い', reading: 'おもしろい', meaning: 'menarik' },
          { word: '告白', reading: 'こくはく', meaning: 'menyatakan cinta / pengakuan' }
        ]
      },
      {
        char: '目',
        reading: 'モク / め (moku / me)',
        meaning: 'Mata',
        radical: '目 (me - mata)',
        radicalRole: 'Dua garis iris dan pupil di dalam bola mata.',
        difference: 'Memiliki 2 garis horisontal di dalam kotak (total 5 goresan).',
        mnemonic: 'Bola mata tegak dengan dua garis kelopak mata.',
        examples: [
          { word: '目', reading: 'め', meaning: 'mata' },
          { word: '目的', reading: 'もくてき', meaning: 'tujuan' },
          { word: '目次', reading: 'もくじ', meaning: 'daftar isi' }
        ]
      }
    ],
    drillQuestions: [
      {
        prompt: 'Pilihlah kanji untuk kata sifat "Shiroi" (Putih): 「＿＿＿い猫」',
        target: '白',
        options: ['日', '白', '目'],
        explanation: 'Putih adalah 白い (shiroi), memiliki coretan titik di atas kotak.'
      },
      {
        prompt: 'Pilihlah kanji untuk mata: 「＿＿＿が痛い」 (Mata sakit)',
        target: '目',
        options: ['日', '白', '目'],
        explanation: 'Mata adalah 目 (me), memiliki 2 garis di dalam kotak.'
      }
    ]
  },
  {
    id: 'ruiji-4',
    level: 'N5',
    title: '牛 vs 午 vs 年',
    category: 'Garis Vertikal Menembus Atas',
    summary: 'Perhatikan apakah garis vertikal tegak menembus garis paling atas atau berhenti di bawahnya.',
    kanjis: [
      {
        char: '牛',
        reading: 'ギュウ / うし (gyuu / ushi)',
        meaning: 'Sapi / Lembu',
        radical: '牛 (ushi - sapi)',
        radicalRole: 'Tanduk sapi yang menembus ke atas.',
        difference: 'Garis vertikal MENEMBUS keluar garis horisontal teratas (membentuk tanduk sapi).',
        mnemonic: 'Sapi (牛) punya tanduk yang menonjol menembus ke atas kepala.',
        examples: [
          { word: '牛肉', reading: 'ぎゅうにく', meaning: 'daging sapi' },
          { word: '牛乳', reading: 'ぎゅうにゅう', meaning: 'susu sapi' },
          { word: '子牛', reading: 'こうし', meaning: 'anak sapi' }
        ]
      },
      {
        char: '午',
        reading: 'ゴ (go)',
        meaning: 'Siang / Tengah Hari (Zodiak Kuda)',
        radical: '十 (juu - sepuluh)',
        radicalRole: 'Garis vertikal rata tidak menembus.',
        difference: 'Garis vertikal TIDAK menembus garis atas (rata di batas horisontal).',
        mnemonic: 'Matahari siang tepat di batas langit, tidak menembus keluar.',
        examples: [
          { word: '午前', reading: 'ごぜん', meaning: 'pagi / AM' },
          { word: '午後', reading: 'ごご', meaning: 'siang-sore / PM' },
          { word: '正午', reading: 'しょうご', meaning: 'tepat tengah hari' }
        ]
      },
      {
        char: '年',
        reading: 'ネン / とし (nen / toshi)',
        meaning: 'Tahun',
        radical: '干 (kan - kering / pelindung)',
        radicalRole: 'Karakter majemuk panen tahunan.',
        difference: 'Memiliki goresan tambahan di bawah dengan kaki vertikal panjang.',
        mnemonic: 'Panen padi yang dirayakan setiap satu TAHUN sekali.',
        examples: [
          { word: '今年', reading: 'ことし', meaning: 'tahun ini' },
          { word: '来年', reading: 'らいねん', meaning: 'tahun depan' },
          { word: '年齢', reading: 'ねんれい', meaning: 'usia / umur' }
        ]
      }
    ],
    drillQuestions: [
      {
        prompt: 'Pilihlah kanji untuk susu sapi: 「＿＿＿乳を飲む」',
        target: '牛',
        options: ['牛', '午', '年'],
        explanation: 'Susu sapi adalah 牛乳 (gyuunyuu). Kanji 牛 memiliki tanduk yang menembus garis atas.'
      },
      {
        prompt: 'Pilihlah kanji untuk PM (siang/sore): 「＿＿＿後３時」',
        target: '午',
        options: ['牛', '午', '年'],
        explanation: 'Sore hari adalah 午後 (gogo). Kanji 午 tidak menembus garis atas.'
      }
    ]
  },
  {
    id: 'ruiji-5',
    level: 'N5',
    title: '休 vs 体',
    category: 'Goresan Kanan (Pohon 木 vs Akar/Tubuh 本)',
    summary: 'Sama-sama memiliki radikal orang di kiri (亻), namun bagian kanannya adalah pohon (木) vs akar pokok (本).',
    kanjis: [
      {
        char: '休',
        reading: 'キュウ / やす・む (kyuu / yasumu)',
        meaning: 'Istirahat / Libur',
        radical: '亻 (ninben - orang)',
        radicalRole: 'Orang bersandar di samping pohon.',
        difference: 'Sisi kanan adalah 木 (pohon polos tanpa garis bawah).',
        mnemonic: 'Seorang (亻) bersandar di batang pohon (木) untuk BERISTIRAHAT.',
        examples: [
          { word: '休み', reading: 'やすみ', meaning: 'libur / istirahat' },
          { word: '休日', reading: 'きゅうじつ', meaning: 'hari libur' },
          { word: '休憩', reading: 'きゅうけい', meaning: 'istirahat sejenak' }
        ]
      },
      {
        char: '体',
        reading: 'タイ・テイ / からだ (tai / karada)',
        meaning: 'Tubuh / Badan',
        radical: '亻 (ninben - orang)',
        radicalRole: 'Fondasi dasar dari seorang manusia.',
        difference: 'Sisi kanan adalah 本 (buku/fondasi, memiliki garis horisontal pendek di pangkal).',
        mnemonic: 'Fondasi pokok (本) dari seorang manusia (亻) adalah TUBUHNYA.',
        examples: [
          { word: '体', reading: 'からだ', meaning: 'tubuh / badan' },
          { word: '体力', reading: 'たいりょく', meaning: 'stamina / tenaga fisik' },
          { word: '体重', reading: 'たいじゅう', meaning: 'berat badan' }
        ]
      }
    ],
    drillQuestions: [
      {
        prompt: 'Pilihlah kanji untuk badan/tubuh: 「＿＿＿の調子が悪い」',
        target: '体',
        options: ['休', '体'],
        explanation: 'Badan / fisik adalah 体 (karada) dengan sisi kanan 本.'
      },
      {
        prompt: 'Pilihlah kanji untuk istirahat/libur: 「日曜日にお＿＿＿みを取る」',
        target: '休',
        options: ['休', '体'],
        explanation: 'Istirahat adalah 休み (yasumi) dengan sisi kanan 木.'
      }
    ]
  },
  {
    id: 'ruiji-6',
    level: 'N4',
    title: '土 vs 士',
    category: 'Panjang Garis Atas vs Garis Bawah',
    summary: 'Jebakan legendaris! Apakah garis atas yang lebih panjang atau garis bawahnya?',
    kanjis: [
      {
        char: '土',
        reading: 'ド・ト / つち (do, to / tsuchi)',
        meaning: 'Tanah / Bumi',
        radical: '土 (tsuchi - tanah)',
        radicalRole: 'Gumpalan tanah di atas permukaan bumi yang lebar.',
        difference: 'Garis atas LEBIH PENDEK dari garis bawah (alas bumi di bawah lebar).',
        mnemonic: 'Tanaman tumbuh dari tanah dengan alas bumi (garis bawah) yang kokoh dan panjang.',
        examples: [
          { word: '土曜日', reading: 'どようび', meaning: 'hari Sabtu' },
          { word: '土地', reading: 'とち', meaning: 'sebidang tanah' },
          { word: 'お土産', reading: 'おみやげ', meaning: 'oleh-oleh' }
        ]
      },
      {
        char: '士',
        reading: 'シ (shi)',
        meaning: 'Ksatria / Pria Terhormat / Profesional',
        radical: '士 (samurai - ksatria)',
        radicalRole: 'Bahu ksatria yang tegap dan lebar.',
        difference: 'Garis atas LEBIH PANJANG dari garis bawah (bahu ksatria lebar, pinggang ramping).',
        mnemonic: 'Bahu seorang samurai (garis atas) LEBIH LEBAR daripada pinggangnya.',
        examples: [
          { word: '武士', reading: 'ぶし', meaning: 'samurai / ksatria' },
          { word: '弁護士', reading: 'べんごし', meaning: 'pengacara' },
          { word: '博士', reading: 'はかせ / はくし', meaning: 'doktor / profesor' }
        ]
      }
    ],
    drillQuestions: [
      {
        prompt: 'Pilihlah kanji untuk pengacara (Bengoshi): 「弁護＿＿＿」',
        target: '士',
        options: ['土', '士'],
        explanation: 'Ksatria / profesi terhormat adalah 士 (bahu atas lebih lebar) $\\rightarrow$ 弁護士.'
      },
      {
        prompt: 'Pilihlah kanji untuk hari Sabtu (Doyoubi): 「＿＿＿曜日」',
        target: '土',
        options: ['土', '士'],
        explanation: 'Tanah adalah 土 (garis alas bawah lebih panjang) $\\rightarrow$ 土曜日.'
      }
    ]
  },
  {
    id: 'ruiji-7',
    level: 'N4',
    title: '未 vs 末',
    category: 'Cabang Atas Pohon (Pendek vs Panjang)',
    summary: 'Pohon dengan dahan atas belum tumbuh penuh (未) vs pohon dengan dahan atas paling ujung yang melebar (末).',
    kanjis: [
      {
        char: '未',
        reading: 'ミ / いま・だ (mi / imada)',
        meaning: 'Belum / Tidak sempurna',
        radical: '木 (ki - pohon)',
        radicalRole: 'Dahan atas pohon yang masih kuncup dan belum mekar penuh.',
        difference: 'Garis horisontal atas LEBIH PENDEK daripada garis kedua di bawahnya.',
        mnemonic: 'Dahan atas masih PENDEK karena BELUM (未) tumbuh dewasa.',
        examples: [
          { word: '未来', reading: 'みらい', meaning: 'masa depan' },
          { word: '未定', reading: 'みてい', meaning: 'belum diputuskan' },
          { word: '未満', reading: 'みまん', meaning: 'kurang dari / di bawah' }
        ]
      },
      {
        char: '末',
        reading: 'マツ・バツ / すえ (matsu, batsu / sue)',
        meaning: 'Ujung / Akhir',
        radical: '木 (ki - pohon)',
        radicalRole: 'Puncak dahan paling atas pohon yang melebar keluar.',
        difference: 'Garis horisontal atas LEBIH PANJANG daripada garis kedua di bawahnya.',
        mnemonic: 'Ujung dahan paling atas memanjang LEBIH PANJANG di AKHIR (末) pohon.',
        examples: [
          { word: '週末', reading: 'しゅうまつ', meaning: 'akhir pekan (weekend)' },
          { word: '月末', reading: 'げつまつ', meaning: 'akhir bulan' },
          { word: '年末', reading: 'ねんまつ', meaning: 'akhir tahun' }
        ]
      }
    ],
    drillQuestions: [
      {
        prompt: 'Pilihlah kanji untuk masa depan (Mirai): 「＿＿＿来の夢」',
        target: '未',
        options: ['未', '末'],
        explanation: 'Masa depan (belum datang) adalah 未来 (mirai) dengan garis atas lebih PENDEK.'
      },
      {
        prompt: 'Pilihlah kanji untuk akhir pekan (Shuumatsu): 「週＿＿＿に旅行する」',
        target: '末',
        options: ['未', '末'],
        explanation: 'Akhir / ujung adalah 末 (matsu) dengan garis atas lebih PANJANG.'
      }
    ]
  },
  {
    id: 'ruiji-8',
    level: 'N4',
    title: '買 vs 売',
    category: 'Membeli (Ada Jaring/Uang) vs Menjual (Keluar/Diberikan)',
    summary: '買 (membeli) menyerap barang ke dalam keranjang, sedangkan 売 (menjual) memiliki ksatria/tanda keluar di atasnya.',
    kanjis: [
      {
        char: '買',
        reading: 'バイ / か・う (bai / kau)',
        meaning: 'Membeli',
        radical: '貝 (kai - kerang / uang kuno)',
        radicalRole: 'Jaring (罒) yang mengumpulkan uang kerang (貝).',
        difference: 'Atasnya adalah jaring 罒 (me-kotak horizontal) dan bawahnya kerang 貝.',
        mnemonic: 'Membawa uang kerang (貝) dalam jaring (罒) untuk MEMBELI barang.',
        examples: [
          { word: '買う', reading: 'かう', meaning: 'membeli' },
          { word: '買い物', reading: 'かいもの', meaning: 'berbelanja' },
          { word: '購買', reading: 'こうばい', meaning: 'pembelian' }
        ]
      },
      {
        char: '売',
        reading: 'バイ / う・る (bai / uru)',
        meaning: 'Menjual',
        radical: '士 (samurai) + 兀',
        radicalRole: 'Mengeluarkan barang dagangan keluar toko.',
        difference: 'Atasnya adalah 士 (ksatria) dan bawahnya kaki yang melangkah keluar.',
        mnemonic: 'Seorang ksatria (士) melangkah pergi untuk MENJUAL hasil karyanya.',
        examples: [
          { word: '売る', reading: 'うる', meaning: 'menjual' },
          { word: '売り切れ', reading: 'うりきれ', meaning: 'terjual habis (sold out)' },
          { word: '売店', reading: 'ばいてん', meaning: 'kios / stan jualan' }
        ]
      }
    ],
    drillQuestions: [
      {
        prompt: 'Pilihlah kanji untuk "Membeli" (Kau): 「スーパーで野菜を＿＿＿う。」',
        target: '買',
        options: ['買', '売'],
        explanation: 'Membeli adalah 買う (kau) dengan komponen kerang uang 貝 di bawah jaring 罒.'
      },
      {
        prompt: 'Pilihlah kanji untuk "Terjual Habis" (Urikire): 「チケットは＿＿＿り切れです。」',
        target: '売',
        options: ['買', '売'],
        explanation: 'Menjual adalah 売る (uru) $\\rightarrow$ 売り切れ (urikire).'
      }
    ]
  },

  // ==========================================
  // LEVEL N3
  // ==========================================
  {
    id: 'ruiji-9',
    level: 'N3',
    title: '析 vs 折',
    category: 'Radikal Kiri: Kayu (木) vs Tangan (扌)',
    summary: '析 (menganalisis/memotong kayu jadi serpihan) vs 折 (melipat atau mematahkan menggunakan tangan).',
    kanjis: [
      {
        char: '析',
        reading: 'セキ (seki)',
        meaning: 'Menganalisis / Membelah / Membedah',
        radical: '木 (ki - kayu / pohon)',
        radicalRole: 'Kayu yang dibelah kapak menjadi bagian-bagian kecil.',
        difference: 'Sisi kiri adalah 木 (kayu). Bagian kanan adalah kapak (斤).',
        mnemonic: 'Membelah kayu (木) dengan kapak (斤) untuk MENGANALISIS seratnya.',
        examples: [
          { word: '分析', reading: 'ぶんせき', meaning: 'analisis' },
          { word: '解析', reading: 'かいせき', meaning: 'analisis komputasi / uraian' }
        ]
      },
      {
        char: '折',
        reading: 'セツ / お・る・お・れる (setsu / oru, oreru)',
        meaning: 'Melipat / Patah / Menekuk',
        radical: '扌 (tehen - tangan)',
        radicalRole: 'Tangan mematahkan atau melipat ranting dengan kapak.',
        difference: 'Sisi kiri adalah 扌 (tangan).',
        mnemonic: 'Menggunakan tangan (扌) untuk MELIPAT kertas origami atau mematahkan ranting.',
        examples: [
          { word: '折り紙', reading: 'おりがみ', meaning: 'origami (kertas lipat)' },
          { word: '骨折', reading: 'こっせつ', meaning: 'patah tulang' },
          { word: '右折', reading: 'うせつ', meaning: 'belok kanan' }
        ]
      }
    ],
    drillQuestions: [
      {
        prompt: 'Pilihlah kanji untuk "Analisis Data" (Bunseki): 「データを分＿＿＿する。」',
        target: '析',
        options: ['析', '折'],
        explanation: 'Analisis adalah 分析 (bunseki) dengan radikal kayu 木.'
      },
      {
        prompt: 'Pilihlah kanji untuk "Patah Tulang" (Kossetsu): 「スキーで骨＿＿＿した。」',
        target: '折',
        options: ['析', '折'],
        explanation: 'Patah atau terlipat adalah 折 (oru/setsu) dengan radikal tangan 扌.'
      }
    ]
  },
  {
    id: 'ruiji-10',
    level: 'N3',
    title: '測 vs 側 vs 則',
    category: 'Varian Radikal Inti (則 - Aturan/Standar)',
    summary: 'Ketiganya berakar dari 則 (aturan potong): ditambah air (氵) jadi ukur kedalaman, ditambah orang (亻) jadi sisi samping.',
    kanjis: [
      {
        char: '測',
        reading: 'ソク / はか・る (soku / hakaru)',
        meaning: 'Mengukur (Kedalaman/Air/Perkiraan)',
        radical: '氵 (sanzui - air)',
        radicalRole: 'Mengukur tingkat kedalaman permukaan air.',
        difference: 'Memiliki radikal 氵 (tiga tetes air) di sebelah kiri.',
        mnemonic: 'Mencelupkan tongkat ke dalam air (氵) sesuai aturan (則) untuk MENGUKUR kedalaman.',
        examples: [
          { word: '測定', reading: 'そくてい', meaning: 'pengukuran' },
          { word: '予測', reading: 'よそく', meaning: 'prediksi / prakiraan' },
          { word: '測る', reading: 'はかる', meaning: 'mengukur' }
        ]
      },
      {
        char: '側',
        reading: 'ソク / かわ・がわ (soku / kawa, gawa)',
        meaning: 'Sisi / Sebelah / Samping',
        radical: '亻 (ninben - orang)',
        radicalRole: 'Orang yang berdiri di sisi samping.',
        difference: 'Memiliki radikal orang (亻) di sebelah kiri.',
        mnemonic: 'Seorang (亻) yang berdiri di SISI / SAMPING batas aturan (則).',
        examples: [
          { word: '右側', reading: 'みぎがわ', meaning: 'sisi kanan' },
          { word: '外側', reading: 'そとがわ', meaning: 'sisi luar' },
          { word: '側面', reading: 'そくめん', meaning: 'aspek / sisi samping' }
        ]
      },
      {
        char: '則',
        reading: 'ソク (soku)',
        meaning: 'Aturan / Hukum / Kaidah',
        radical: '刂 (rittou - pisau/pedang)',
        radicalRole: 'Mengukir aturan resmi pada bejana uang kerang (貝) dengan pisau (刂).',
        difference: 'Tidak memiliki radikal tambahan di kirinya (hanya 貝 + 刂).',
        mnemonic: 'Pisau (刂) mengukir hukum aturan resmi pada kerang (貝).',
        examples: [
          { word: '規則', reading: 'きそく', meaning: 'peraturan / regulasi' },
          { word: '原則', reading: 'げんそく', meaning: 'prinsip dasar' },
          { word: '反則', reading: 'はんそく', meaning: 'pelanggaran aturan' }
        ]
      }
    ],
    drillQuestions: [
      {
        prompt: 'Pilihlah kanji untuk prediksi/perkiraan: 「結果を予＿＿＿する。」',
        target: '測',
        options: ['測', '側', '則'],
        explanation: 'Prediksi adalah 予測 (yosoku), menggunakan kanji mengukur 測 (radikal air).'
      },
      {
        prompt: 'Pilihlah kanji untuk peraturan (Kisoku): 「学校の規＿＿＿を守る。」',
        target: '則',
        options: ['測', '側', '則'],
        explanation: 'Aturan adalah 規則 (kisoku) dengan kanji 則.'
      },
      {
        prompt: 'Pilihlah kanji untuk sisi kiri (Hidarigawa): 「左＿＿＿通行」',
        target: '側',
        options: ['測', '側', '則'],
        explanation: 'Sisi / sebelah adalah 側 (gawa) dengan radikal orang 亻.'
      }
    ]
  },
  {
    id: 'ruiji-11',
    level: 'N3',
    title: '輪 vs 輸',
    category: 'Sisi Kanan: Bundar (侖) vs Mengangkut (兪)',
    summary: 'Sama-sama memiliki kendaraan 車 di kiri, namun sisi kanannya berbeda tujuan: lingkaran roda (侖) vs pengangkutan ekspor/impor (兪).',
    kanjis: [
      {
        char: '輪',
        reading: 'リン / わ (rin / wa)',
        meaning: 'Roda / Lingkaran / Cincin',
        radical: '車 (kuruma - kendaraan)',
        radicalRole: 'Roda melingkar kendaraan.',
        difference: 'Sisi kanan adalah 侖 (atap 亼 +冊 berkas buku yang diikat melingkar).',
        mnemonic: 'Roda kendaraan (車) yang berputar melingkar rapi.',
        examples: [
          { word: '車輪', reading: 'しゃりん', meaning: 'roda kendaraan' },
          { word: '指輪', reading: 'ゆびわ', meaning: 'cincin jari' },
          { word: '五輪', reading: 'ごりん', meaning: 'Olimpiade (lima cincin)' }
        ]
      },
      {
        char: '輸',
        reading: 'ユ・シュ (yu / shu)',
        meaning: 'Mengangkut / Mengirimkan (Ekspor-Impor)',
        radical: '車 (kuruma - kendaraan)',
        radicalRole: 'Kendaraan pengangkut kapal/logistik.',
        difference: 'Sisi kanan adalah 兪 (mengosongkan kapal dan memindahkan muatan).',
        mnemonic: 'Kendaraan (車) membawa barang kiriman keluar negeri.',
        examples: [
          { word: '輸入', reading: 'ゆにゅう', meaning: 'impor' },
          { word: '輸出', reading: 'ゆしゅつ', meaning: 'ekspor' },
          { word: '輸送', reading: 'ゆそう', meaning: 'transportasi / logistik' }
        ]
      }
    ],
    drillQuestions: [
      {
        prompt: 'Pilihlah kanji untuk ekspor (Yushutsu): 「日本の車を＿＿＿出する。」',
        target: '輸',
        options: ['輪', '輸'],
        explanation: 'Ekspor adalah 輸出 (yushutsu) dengan kanji transportasi 輸.'
      },
      {
        prompt: 'Pilihlah kanji untuk cincin (Yubiwa): 「ダイヤの指＿＿＿を買う。」',
        target: '輪',
        options: ['輪', '輸'],
        explanation: 'Cincin melingkar adalah 指輪 (yubiwa) dengan kanji roda/lingkaran 輪.'
      }
    ]
  },
  {
    id: 'ruiji-12',
    level: 'N3',
    title: '経 vs 軽',
    category: 'Benang (糸) vs Kendaraan (車)',
    summary: 'Bagian kanan sama-sama 𢀖 (jalur lurus melintas), namun kirinya adalah benang rajut (経) vs gerobak ringan (軽).',
    kanjis: [
      {
        char: '経',
        reading: 'ケイ・キョウ / へ・る (kei / heru)',
        meaning: 'Melewati / Benang Bujur / Mengelola (Ekonomi)',
        radical: '糸 (ito - benang)',
        radicalRole: 'Benang bujur yang membentang lurus melintasi tenunan.',
        difference: 'Radikal kiri adalah 糸 (benang).',
        mnemonic: 'Benang (糸) membentang melintasi waktu: MELEWATI pengalaman dan mengelola EKONOMI.',
        examples: [
          { word: '経済', reading: 'けいざい', meaning: 'ekonomi' },
          { word: '経験', reading: 'けいけん', meaning: 'pengalaman' },
          { word: '経営', reading: 'けいえい', meaning: 'manajemen bisnis' }
        ]
      },
      {
        char: '軽',
        reading: 'ケイ / かる・い (kei / karui)',
        meaning: 'Ringan / Tidak berat',
        radical: '車 (kuruma - kendaraan)',
        radicalRole: 'Kendaraan atau gerobak yang melaju enteng/ringan.',
        difference: 'Radikal kiri adalah 車 (kendaraan/gerobak).',
        mnemonic: 'Kendaraan (車) yang melaju cepat karena muatannya RINGAN.',
        examples: [
          { word: '軽い', reading: 'かるい', meaning: 'ringan' },
          { word: '気軽に', reading: 'きがるに', meaning: 'tanpa ragu / dengan santai' },
          { word: '軽食', reading: 'けいしょく', meaning: 'makanan ringan (snack)' }
        ]
      }
    ],
    drillQuestions: [
      {
        prompt: 'Pilihlah kanji untuk pengalaman (Keiken): 「日本での＿＿＿験」',
        target: '経',
        options: ['経', '軽'],
        explanation: 'Pengalaman adalah 経験 (keiken) dengan radikal benang 糸.'
      },
      {
        prompt: 'Pilihlah kanji untuk ringan (Karui): 「このカバンはとても＿＿＿い。」',
        target: '軽',
        options: ['経', '軽'],
        explanation: 'Ringan adalah 軽い (karui) dengan radikal kendaraan 車.'
      }
    ]
  },

  // ==========================================
  // LEVEL N2 / N1
  // ==========================================
  {
    id: 'ruiji-13',
    level: 'N1',
    title: '微 vs 徴',
    category: 'Goresan Tengah: Garis Miring Gunung vs Garis Gunung & Titik',
    summary: 'Dua kanji N1 paling sering tertukar di ujian! 微 (halus/samar) memiliki komponen orang kecil di tengah, sedangkan 徴 (rekrut/tanda) memiliki komponen gunung melengkung.',
    kanjis: [
      {
        char: '微',
        reading: 'ビ (bi)',
        meaning: 'Halus / Samar / Sangat Kecil / Lemah',
        radical: '彳 (gyouninben - langkah)',
        radicalRole: 'Langkah kaki orang kecil yang samar.',
        difference: 'Di tengah ada 山 (gunung) kecil dengan satu garis serong ke bawah (儿/人 kecil). Total 13 goresan.',
        mnemonic: 'Melangkah (彳) sangat perlahan mengamati hal yang amat SAMAR dan HALUS.',
        examples: [
          { word: '微妙', reading: 'びみょう', meaning: 'meragukan / samar / tricky' },
          { word: '微笑み', reading: 'ほほえみ', meaning: 'senyuman tipis / lembut' },
          { word: '顕微鏡', reading: 'けんびきょう', meaning: 'mikroskop' }
        ]
      },
      {
        char: '徴',
        reading: 'チョウ (chou)',
        meaning: 'Tanda / Indikasi / Merekrut / Memungut',
        radical: '彳 (gyouninben - langkah)',
        radicalRole: 'Petugas melangkah mencari tanda atau mengumpulkan pajak.',
        difference: 'Di tengah ada 山 (gunung) dengan garis lurus 王 di bawahnya (bukan orang kecil). Total 14 goresan.',
        mnemonic: 'Petugas berjalan (彳) mendaki gunung (山) mencari TANDA-TANDA (徴) musuh.',
        examples: [
          { word: '特徴', reading: 'とくちょう', meaning: 'ciri khas / karakteristik' },
          { word: '象徴', reading: 'しょうちょう', meaning: 'simbol / lambang' },
          { word: '徴収', reading: 'ちょうしゅう', meaning: 'pungutan pajak / biaya' }
        ]
      }
    ],
    drillQuestions: [
      {
        prompt: 'Pilihlah kanji untuk ciri khas (Tokuchou): 「商品の特＿＿＿を説明する。」',
        target: '徴',
        options: ['微', '徴'],
        explanation: 'Ciri khas / karakteristik adalah 特徴 (tokuchou) dengan kanji 徴.'
      },
      {
        prompt: 'Pilihlah kanji untuk situasi rumit/samar (Bimyou): 「ニュアンスが＿＿＿妙だ。」',
        target: '微',
        options: ['微', '徴'],
        explanation: 'Samar / halus adalah 微妙 (bimyou) dengan kanji 微.'
      }
    ]
  },
  {
    id: 'ruiji-14',
    level: 'N2',
    title: '換 vs 喚',
    category: 'Tangan (扌) vs Mulut (口)',
    summary: 'Keduanya berakar dari 奐 (berubah/terang): digerakkan dengan tangan untuk menukar barang (換) vs bersuara lewat mulut untuk memanggil (喚).',
    kanjis: [
      {
        char: '換',
        reading: 'カン / か・える (kan / kaeru)',
        meaning: 'Menukar / Mengganti',
        radical: '扌 (tehen - tangan)',
        radicalRole: 'Tangan yang mengambil dan menukar objek.',
        difference: 'Radikal kiri adalah 扌 (tangan).',
        mnemonic: 'Menggunakan tangan (扌) untuk MENUKAR uang atau barang.',
        examples: [
          { word: '交換', reading: 'こうかん', meaning: 'pertukaran / barter' },
          { word: '乗り換え', reading: 'のりかえ', meaning: 'transit / ganti kereta' },
          { word: '換気', reading: 'かんき', meaning: 'ventilasi / pergantian udara' }
        ]
      },
      {
        char: '喚',
        reading: 'カン (kan)',
        meaning: 'Berteriak / Memanggil / Menggugah',
        radical: '口 (kuchi - mulut)',
        radicalRole: 'Mulut yang berteriak lantang.',
        difference: 'Radikal kiri adalah 口 (mulut).',
        mnemonic: 'Membuka mulut (口) lebar-lebar untuk BERTERIAK dan MEMANGGIL bantuan.',
        examples: [
          { word: '喚起', reading: 'かんき', meaning: 'membangkitkan (perhatian/kesadaran)' },
          { word: '叫喚', reading: 'きょうかん', meaning: 'jeritan histeris' },
          { word: '召喚', reading: 'しょうかん', meaning: 'pemanggilan resmi / summon' }
        ]
      }
    ],
    drillQuestions: [
      {
        prompt: 'Pilihlah kanji untuk bertukar pendapat (Koukan): 「意見を交＿＿＿する。」',
        target: '換',
        options: ['換', '喚'],
        explanation: 'Menukar adalah 交換 (koukan) dengan radikal tangan 扌.'
      },
      {
        prompt: 'Pilihlah kanji untuk menggugah perhatian (Chuui Kanki): 「注意を＿＿＿起する。」',
        target: '喚',
        options: ['換', '喚'],
        explanation: 'Memanggil / menggugah adalah 喚起 (kanki) dengan radikal mulut 口.'
      }
    ]
  },
  {
    id: 'ruiji-15',
    level: 'N1',
    title: '徹 vs 撤',
    category: 'Jalan (彳) vs Tangan (扌)',
    summary: 'Bagian tengah dan kanan identik (育 + 攵): melangkah tuntas hingga akhir (徹) vs menarik tangan membatalkan (撤).',
    kanjis: [
      {
        char: '徹',
        reading: 'テツ (tetsu)',
        meaning: 'Tuntas / Menembus / Menyeluruh Sepanjang Waktu',
        radical: '彳 (gyouninben - jalan / melangkah)',
        radicalRole: 'Terus berjalan maju hingga menembus garis akhir.',
        difference: 'Radikal kiri adalah 彳 (jalan/kaki melangkah).',
        mnemonic: 'Terus melangkah (彳) menembus malam sampai TUNTAS pagi hari.',
        examples: [
          { word: '徹夜', reading: 'てつや', meaning: 'begadang semalaman' },
          { word: '徹底', reading: 'てってい', meaning: 'tuntas / menyeluruh' },
          { word: '初志貫徹', reading: 'しょしかんてつ', meaning: 'teguh menjalankan niat awal sampai selesai' }
        ]
      },
      {
        char: '撤',
        reading: 'テツ (tetsu)',
        meaning: 'Menarik Mundur / Membatalkan / Membongkar',
        radical: '扌 (tehen - tangan)',
        radicalRole: 'Tangan menarik kembali apa yang sudah dipasang.',
        difference: 'Radikal kiri adalah 扌 (tangan).',
        mnemonic: 'Mengulurkan tangan (扌) untuk MENARIK MUNDUR pasukan atau MEMBATALKAN kebijakan.',
        examples: [
          { word: '撤回', reading: 'てっかい', meaning: 'pembatalan / pencabutan ucapan' },
          { word: '撤退', reading: 'てったい', meaning: 'mundur (pasukan/bisnis)' },
          { word: '撤去', reading: 'てっきょ', meaning: 'pembongkaran fasilitas' }
        ]
      }
    ],
    drillQuestions: [
      {
        prompt: 'Pilihlah kanji untuk begadang semalaman (Tetsuya): 「試験のために＿＿＿夜する。」',
        target: '徹',
        options: ['徹', '撤'],
        explanation: 'Menembus malam adalah 徹夜 (tetsuya) dengan radikal jalan 彳.'
      },
      {
        prompt: 'Pilihlah kanji untuk menarik mundur pasukan (Tettai): 「危険な地域から＿＿＿退する。」',
        target: '撤',
        options: ['徹', '撤'],
        explanation: 'Menarik mundur / mencabut adalah 撤退 (tettai) dengan radikal tangan 扌.'
      }
    ]
  },
  {
    id: 'ruiji-16',
    level: 'N1',
    title: '己 vs 已 vs 巳',
    category: 'Celah Ketinggian Garis Kiri Bawah',
    summary: 'Trio jebakan maut level tertinggi! Perhatikan apakah celah di sebelah kiri terbuka penuh (己), setengah tertutup (已), atau tertutup rapat (巳).',
    kanjis: [
      {
        char: '己',
        reading: 'コ・キ / おのれ (ko, ki / onore)',
        meaning: 'Diri Sendiri',
        radical: '己 (onore - diri sendiri)',
        radicalRole: 'Celah terbuka lebar di kiri atas.',
        difference: 'Garis bawah TERBUKA SEPENUHNYA (tidak naik sama sekali ke atas).',
        mnemonic: 'Diri sendiri (己) yang terbuka jujur tanpa rahasia.',
        examples: [
          { word: '自己', reading: 'じこ', meaning: 'diri sendiri (self)' },
          { word: '利己的', reading: 'りこてき', meaning: 'egoistis / mementingkan diri' },
          { word: '知己', reading: 'ちき', meaning: 'sahabat akrab / kenalan dekat' }
        ]
      },
      {
        char: '已',
        reading: 'イ / すで・に (i / sude ni)',
        meaning: 'Sudah / Berhenti',
        radical: '己',
        radicalRole: 'Garis bawah naik setengah jalan.',
        difference: 'Garis bawah naik SETENGAH jalan menutupi celah kiri.',
        mnemonic: 'Garis sudah naik setengah jalan, berarti SUDAH (已) hampir selesai.',
        examples: [
          { word: '既に', reading: 'すでに', meaning: 'sudah (bentuk resmi)' },
          { word: '已むを得ない', reading: 'やむをえない', meaning: 'tak terelakkan / mau tidak mau' }
        ]
      },
      {
        char: '巳',
        reading: 'シ / み (shi / mi)',
        meaning: 'Ular (Zodiak Jepang / Shinto)',
        radical: '己',
        radicalRole: 'Garis bawah naik menutup rapat.',
        difference: 'Celah kiri TERTUTUP RAPAT SEPENUHNYA.',
        mnemonic: 'Ular (巳) yang melingkar menutup rapat tubuhnya.',
        examples: [
          { word: '巳年', reading: 'みどし', meaning: 'tahun Ular' },
          { word: '巳刻', reading: 'みのこく', meaning: 'jam ular (pukul 9-11 pagi)' }
        ]
      }
    ],
    drillQuestions: [
      {
        prompt: 'Pilihlah kanji untuk pengenalan diri (Jikoshoukai): 「自＿＿＿紹介」',
        target: '己',
        options: ['己', '已', '巳'],
        explanation: 'Diri sendiri adalah 自己 (jiko) dengan kanji 己 (celah terbuka penuh).'
      },
      {
        prompt: 'Pilihlah kanji untuk ungkapan tak terelakkan: 「＿＿＿むを得ない」',
        target: '已',
        options: ['己', '已', '巳'],
        explanation: 'Tak terelakkan adalah 已むを得ない (yamu o enai), garis naik setengah jalan.'
      }
    ]
  },
  {
    id: 'ruiji-17',
    level: 'N2',
    title: '棒 vs 捧',
    category: 'Kayu (木) vs Tangan (扌)',
    summary: 'Sisi kanan sama-sama 奉 (mempersembahkan kepada atasan), namun kirinya membedakan tongkat kayu keras (棒) vs tangan menyembah (捧).',
    kanjis: [
      {
        char: '棒',
        reading: 'ボウ (bou)',
        meaning: 'Tongkat / Batang / Garis Lurus',
        radical: '木 (ki - kayu)',
        radicalRole: 'Kayu panjang yang dijadikan tongkat.',
        difference: 'Radikal kiri adalah 木 (kayu).',
        mnemonic: 'Kayu (木) lurus yang dipegang sebagai TONGKAT.',
        examples: [
          { word: '泥棒', reading: 'どろぼう', meaning: 'pencuri' },
          { word: '棒グラフ', reading: 'ぼうぐらふ', meaning: 'diagram batang' },
          { word: '棒読み', reading: 'ぼうよみ', meaning: 'membaca datar tanpa intonasi' }
        ]
      },
      {
        char: '捧',
        reading: 'ホウ / ささ・げる (hou / sasageru)',
        meaning: 'Mempersembahkan / Mendedikasikan',
        radical: '扌 (tehen - tangan)',
        radicalRole: 'Dua tangan mengangkat persembahan dengan hormat.',
        difference: 'Radikal kiri adalah 扌 (tangan).',
        mnemonic: 'Menggunakan kedua tangan (扌) untuk MEMPERSEMBAHKAN persembahan suci (奉).',
        examples: [
          { word: '捧げる', reading: 'ささげる', meaning: 'mempersembahkan / membaktikan' },
          { word: '捧呈', reading: 'ほうてい', meaning: 'penyerahan tanda penghargaan' }
        ]
      }
    ],
    drillQuestions: [
      {
        prompt: 'Pilihlah kanji untuk pencuri (Dorobou): 「泥＿＿＿が入った！」',
        target: '棒',
        options: ['棒', '捧'],
        explanation: 'Pencuri adalah 泥棒 (dorobou) dengan kanji tongkat 棒 (radikal kayu 木).'
      },
      {
        prompt: 'Pilihlah kanji untuk mendedikasikan hidup: 「一生を研究に＿＿＿げる。」',
        target: '捧',
        options: ['棒', '捧'],
        explanation: 'Mempersembahkan / mendedikasikan adalah 捧げる (sasageru) dengan radikal tangan 扌.'
      }
    ]
  },
  {
    id: 'ruiji-18',
    level: 'N2',
    title: '治 vs 冶',
    category: 'Tiga Tetes Air (氵) vs Dua Titik Es (冫)',
    summary: '治 (mengatur / menyembuhkan penyakit dengan obat cair) vs 冶 (melebur logam membeku seperti es).',
    kanjis: [
      {
        char: '治',
        reading: 'ジ・チ / おさ・める・なお・る (ji, chi / osameru, naoru)',
        meaning: 'Mengatur / Memerintah / Menyembuhkan',
        radical: '氵 (sanzui - air)',
        radicalRole: 'Air mengalir tertib diatur oleh kanal.',
        difference: 'Radikal kiri adalah 氵 (3 tetes air).',
        mnemonic: 'Mengatur aliran air (氵) agar negeri aman dan penyakit SEMBUH.',
        examples: [
          { word: '政治', reading: 'せいじ', meaning: 'politik' },
          { word: '治療', reading: 'ちりょう', meaning: 'pengobatan / terapi medis' },
          { word: '治る', reading: 'なおる', meaning: 'sembuh (dari sakit)' }
        ]
      },
      {
        char: '冶',
        reading: 'ヤ (ya)',
        meaning: 'Melebur Logam / Metalurgi',
        radical: '冫 (nisui - es / beku)',
        radicalRole: 'Bahan logam didinginkan membeku setelah dicetak.',
        difference: 'Radikal kiri adalah 冫 (2 titik es / nisui).',
        mnemonic: 'Logam cair didinginkan dengan es (冫) dalam proses metalurgi.',
        examples: [
          { word: '冶金', reading: 'やきん', meaning: 'metalurgi (peleburan logam)' },
          { word: '陶冶', reading: 'とうや', meaning: 'membina kepribadian / menggembleng' }
        ]
      }
    ],
    drillQuestions: [
      {
        prompt: 'Pilihlah kanji untuk politik (Seiji): 「国の政＿＿＿」',
        target: '治',
        options: ['治', '冶'],
        explanation: 'Politik / ketertiban adalah 政治 (seiji) dengan radikal air 氵.'
      },
      {
        prompt: 'Pilihlah kanji untuk peleburan logam (Yakin): 「＿＿＿金学」',
        target: '冶',
        options: ['治', '冶'],
        explanation: 'Peleburan logam adalah 冶金 (yakin) dengan radikal es 冫 (2 tetes).'
      }
    ]
  }
];
