/**
 * Nihongo Spark - Dataset Pasangan Verba Transitif & Intransitif (自動詞・他動詞)
 * Meliputi level JLPT N5, N4, N3, dan N2 dengan partikel utama (が vs を),
 * contoh kalimat berfurigana, dan pola pergeseran bunyi (sound shift rules).
 */

export const JIDOUSHI_RULES = [
  {
    pattern: '-aru (自動詞) vs -eru (他動詞)',
    desc: 'Verba berakhiran -aru adalah intransitif (kejadian spontan), sedangkan pasangan -eru adalah transitif (tindakan sengaja).',
    examples: '閉まる (tertutup) vs 閉める (menutup), 始まる (dimulai) vs 始める (memulai), 止まる (berhenti) vs 止める (menghentikan)'
  },
  {
    pattern: '-u (自動詞) vs -eru (他動詞)',
    desc: 'Verba berakhiran -u adalah intransitif, sedangkan akhiran -eru adalah transitif.',
    examples: '開く (terbuka) vs 開ける (membuka), つく (menyala) vs つける (menyalakan), 届く (sampai) vs 届ける (mengantarkan)'
  },
  {
    pattern: '-eru (自動詞) vs -asu (他動詞)',
    desc: 'Verba berakhiran -eru adalah intransitif, sedangkan akhiran -asu adalah transitif.',
    examples: '出る (keluar) vs 出す (mengeluarkan), 逃げる (kabur) vs 逃がす (melepaskan), 冷える (menjadi dingin) vs 冷やす (mendinginkan)'
  },
  {
    pattern: '-ieru / -eru (自動詞) vs -esu / -su (他動詞)',
    desc: 'Akhiran -su hampir SELALU transitif (他動詞) dan memerlukan partikel を.',
    examples: '消える (padam) vs 消す (memadamkan), 壊れる (rusak) vs 壊す (merusakkan), 直る (sembuh) vs 直す (menyembuhkan)'
  },
  {
    pattern: '-iru (自動詞) vs -osu (他動詞)',
    desc: 'Verba berakhiran -iru adalah intransitif, sedangkan -osu adalah transitif.',
    examples: '落ちる (jatuh) vs 落とす (menjatuhkan), 降りる (turun) vs 降ろす (menurunkan), 起きる (bangun) vs 起こす (membangunkan)'
  }
];

export const JIDOUSHI_PAIRS = [
  // ── N5 LEVEL ──
  {
    id: 'door-open',
    level: 'N5',
    category: 'Pintu & Jendela',
    pattern: '-u vs -eru',
    jidoushi: {
      kanji: '開く',
      reading: 'あく',
      romaji: 'aku',
      meaning: 'terbuka (spontan/keadaan)',
      particle: 'が',
      example: '自動ドアが開きます。',
      exampleReading: 'じどうドアがあきます。',
      exampleMeaning: 'Pintu otomatis terbuka.'
    },
    tadoushi: {
      kanji: '開ける',
      reading: 'あける',
      romaji: 'akeru',
      meaning: 'membuka (disengaja)',
      particle: 'を',
      example: '田中さんが窓を開けます。',
      exampleReading: 'たなかさんがまどをあけます。',
      exampleMeaning: 'Tanaka-san membuka jendela.'
    }
  },
  {
    id: 'door-close',
    level: 'N5',
    category: 'Pintu & Jendela',
    pattern: '-aru vs -eru',
    jidoushi: {
      kanji: '閉まる',
      reading: 'しまる',
      romaji: 'shimaru',
      meaning: 'tertutup (spontan/keadaan)',
      particle: 'が',
      example: '強風でドアが閉まりました。',
      exampleReading: 'きょうふうでドアがしまりました。',
      exampleMeaning: 'Karena angin kencang, pintu tertutup.'
    },
    tadoushi: {
      kanji: '閉める',
      reading: 'しめる',
      romaji: 'shimeru',
      meaning: 'menutup (disengaja)',
      particle: 'を',
      example: '寝る前にドアを閉めてください。',
      exampleReading: 'ねるまえにドアをしめてください。',
      exampleMeaning: 'Tolong tutup pintu sebelum tidur.'
    }
  },
  {
    id: 'light-on',
    level: 'N5',
    category: 'Lampu & Listrik',
    pattern: '-u vs -eru',
    jidoushi: {
      kanji: 'つく',
      reading: 'つく',
      romaji: 'tsuku',
      meaning: 'menyala (spontan)',
      particle: 'が',
      example: '電気がつきました。',
      exampleReading: 'でんきがつきました。',
      exampleMeaning: 'Lampunya sudah menyala.'
    },
    tadoushi: {
      kanji: 'つける',
      reading: 'つける',
      romaji: 'tsukeru',
      meaning: 'menyalakan (disengaja)',
      particle: 'を',
      example: '部屋の明かりをつけてください。',
      exampleReading: 'へやのあかりをつけてください。',
      exampleMeaning: 'Tolong nyalakan lampu kamar.'
    }
  },
  {
    id: 'light-off',
    level: 'N5',
    category: 'Lampu & Listrik',
    pattern: '-eru vs -su',
    jidoushi: {
      kanji: '消える',
      reading: 'きえる',
      romaji: 'kieru',
      meaning: 'padam / mati (spontan)',
      particle: 'が',
      example: '停電で明かりが消えました。',
      exampleReading: 'ていでんであかりがきえました。',
      exampleMeaning: 'Lampu padam karena mati listrik.'
    },
    tadoushi: {
      kanji: '消す',
      reading: 'けす',
      romaji: 'kesu',
      meaning: 'memadamkan / mematikan',
      particle: 'を',
      example: '出かける前にテレビを消します。',
      exampleReading: 'でかけるまえにテレビをけします。',
      exampleMeaning: 'Saya mematikan televisi sebelum keluar rumah.'
    }
  },
  {
    id: 'enter-exit',
    level: 'N5',
    category: 'Gerak & Arah',
    pattern: '-u vs -eru',
    jidoushi: {
      kanji: '入る',
      reading: 'はいる',
      romaji: 'hairu',
      meaning: 'masuk (intransitif)',
      particle: 'が / に',
      example: '部屋にお風呂が入っています。',
      exampleReading: 'へやにおふろがはいっています。',
      exampleMeaning: 'Di dalam kamar ada kamar mandi.'
    },
    tadoushi: {
      kanji: '入れる',
      reading: 'いれる',
      romaji: 'ireru',
      meaning: 'memasukkan (transitif)',
      particle: 'を',
      example: '財布にお金を入れます。',
      exampleReading: 'さいふにおかねをいれます。',
      exampleMeaning: 'Saya memasukkan uang ke dalam dompet.'
    }
  },
  {
    id: 'out-takeout',
    level: 'N5',
    category: 'Gerak & Arah',
    pattern: '-eru vs -asu',
    jidoushi: {
      kanji: '出る',
      reading: 'でる',
      romaji: 'deru',
      meaning: 'keluar (intransitif)',
      particle: 'が / から',
      example: 'ポケットから鍵が出ました。',
      exampleReading: 'ポケットからかぎがでました。',
      exampleMeaning: 'Kuncinya keluar dari saku.'
    },
    tadoushi: {
      kanji: '出す',
      reading: 'だす',
      romaji: 'dasu',
      meaning: 'mengeluarkan / mengumpulkan',
      particle: 'を',
      example: '宿題を先生に出します。',
      exampleReading: 'しゅくだいをせんせいにだします。',
      exampleMeaning: 'Saya mengumpulkan PR kepada guru.'
    }
  },
  {
    id: 'stop-halt',
    level: 'N5',
    category: 'Kendaraan & Gerak',
    pattern: '-aru vs -eru',
    jidoushi: {
      kanji: '止まる',
      reading: 'とまる',
      romaji: 'tomaru',
      meaning: 'berhenti (spontan)',
      particle: 'が',
      example: '駅の前にバスが止まります。',
      exampleReading: 'えきのまえにバスがとまります。',
      exampleMeaning: 'Bus berhenti di depan stasiun.'
    },
    tadoushi: {
      kanji: '止める',
      reading: 'とめる',
      romaji: 'tomeru',
      meaning: 'menghentikan / memarkir',
      particle: 'を',
      example: 'ここに車を止めないでください。',
      exampleReading: 'ここにくるまをとめないでください。',
      exampleMeaning: 'Tolong jangan parkir mobil di sini.'
    }
  },
  {
    id: 'start-begin',
    level: 'N5',
    category: 'Waktu & Kegiatan',
    pattern: '-aru vs -eru',
    jidoushi: {
      kanji: '始まる',
      reading: 'はじまる',
      romaji: 'hajimaru',
      meaning: 'dimulai (spontan)',
      particle: 'が',
      example: '午後一時から授業が始まります。',
      exampleReading: 'ごごいちじからじゅぎょうがはじまります。',
      exampleMeaning: 'Pelajaran dimulai jam 1 siang.'
    },
    tadoushi: {
      kanji: '始める',
      reading: 'はじめる',
      romaji: 'hajimeru',
      meaning: 'memulai (disengaja)',
      particle: 'を',
      example: '先生が授業を始めました。',
      exampleReading: 'せんせいがじゅぎょうをはじめました。',
      exampleMeaning: 'Guru memulai pelajaran.'
    }
  },
  {
    id: 'end-finish',
    level: 'N5',
    category: 'Waktu & Kegiatan',
    pattern: '-aru vs -eru',
    jidoushi: {
      kanji: '終わる',
      reading: 'おわる',
      romaji: 'owaru',
      meaning: 'berakhir / selesai (spontan)',
      particle: 'が',
      example: '会議がやっと終わりました。',
      exampleReading: 'かいぎがやっとおわりました。',
      exampleMeaning: 'Rapat akhirnya berakhir.'
    },
    tadoushi: {
      kanji: '終える',
      reading: 'おえる',
      romaji: 'oeru',
      meaning: 'menyelesaikan (disengaja)',
      particle: 'を',
      example: '仕事を５時までに終えます。',
      exampleReading: 'しごとをごじまでにおえます。',
      exampleMeaning: 'Saya menyelesaikan pekerjaan sebelum jam 5.'
    }
  },
  {
    id: 'wake-rouse',
    level: 'N5',
    category: 'Kondisi & Manusia',
    pattern: '-iru vs -osu',
    jidoushi: {
      kanji: '起きる',
      reading: 'おきる',
      romaji: 'okiru',
      meaning: 'bangun (spontan)',
      particle: 'が',
      example: '赤ちゃんが朝６時に起きました。',
      exampleReading: 'あかちゃんがあさろくじにおきました。',
      exampleMeaning: 'Bayi bangun pada jam 6 pagi.'
    },
    tadoushi: {
      kanji: '起こす',
      reading: 'おこす',
      romaji: 'okosu',
      meaning: 'membangunkan (disengaja)',
      particle: 'を',
      example: '母が毎朝私を起こします。',
      exampleReading: 'ははがまいあさわたしをおこします。',
      exampleMeaning: 'Ibu membangunkan saya setiap pagi.'
    }
  },

  // ── N4 LEVEL ──
  {
    id: 'drop-fall',
    level: 'N4',
    category: 'Benda & Kondisi',
    pattern: '-iru vs -osu',
    jidoushi: {
      kanji: '落ちる',
      reading: 'おちる',
      romaji: 'ochiru',
      meaning: 'jatuh (sendirinya)',
      particle: 'が',
      example: '木からリンゴが落ちました。',
      exampleReading: 'きからリンゴがおちました。',
      exampleMeaning: 'Apel jatuh dari pohon.'
    },
    tadoushi: {
      kanji: '落とす',
      reading: 'おとす',
      romaji: 'otosu',
      meaning: 'menjatuhkan (sengaja / tidak sengaja)',
      particle: 'を',
      example: '道で財布を落としてしまいました。',
      exampleReading: 'みちでさいふをおとしてしまいました。',
      exampleMeaning: 'Saya tanpa sengaja menjatuhkan dompet di jalan.'
    }
  },
  {
    id: 'break-shatter',
    level: 'N4',
    category: 'Benda & Kerusakan',
    pattern: '-eru vs -su',
    jidoushi: {
      kanji: '壊れる',
      reading: 'こわれる',
      romaji: 'kowareru',
      meaning: 'rusak (keadaan)',
      particle: 'が',
      example: 'パソコンが壊れました。',
      exampleReading: 'パソコンがこわれました。',
      exampleMeaning: 'Laptop saya rusak.'
    },
    tadoushi: {
      kanji: '壊す',
      reading: 'こわす',
      romaji: 'kowasu',
      meaning: 'merusakkan (pelaku)',
      particle: 'を',
      example: '弟がおもちゃを壊しました。',
      exampleReading: 'おとうとがおもちゃをこわしました。',
      exampleMeaning: 'Adik laki-laki merusakkan mainan.'
    }
  },
  {
    id: 'break-crack',
    level: 'N4',
    category: 'Benda & Kerusakan',
    pattern: '-eru vs -asu',
    jidoushi: {
      kanji: '割れる',
      reading: 'われる',
      romaji: 'wareru',
      meaning: 'pecah / terbelah',
      particle: 'が',
      example: 'コップが割れてしまいました。',
      exampleReading: 'コップがわれてしまいました。',
      exampleMeaning: 'Gelasnya pecah.'
    },
    tadoushi: {
      kanji: '割る',
      reading: 'わる',
      romaji: 'waru',
      meaning: 'memecahkan / membelah',
      particle: 'を',
      example: '卵を割ってフライパンに入れます。',
      exampleReading: 'たまごをわってフライパンにいれます。',
      exampleMeaning: 'Pecahkan telur lalu masukkan ke wajan.'
    }
  },
  {
    id: 'dirty-stain',
    level: 'N4',
    category: 'Kebersihan',
    pattern: '-eru vs -asu',
    jidoushi: {
      kanji: '汚れる',
      reading: 'よごれる',
      romaji: 'yogoreru',
      meaning: 'menjadi kotor (keadaan)',
      particle: 'が',
      example: '泥で白い服が汚れました。',
      exampleReading: 'どろでしろいふくがよごれました。',
      exampleMeaning: 'Baju putih menjadi kotor terkena lumpur.'
    },
    tadoushi: {
      kanji: '汚す',
      reading: 'よごす',
      romaji: 'yogosu',
      meaning: 'mengotori (pelaku)',
      particle: 'を',
      example: '部屋を汚さないでください。',
      exampleReading: 'へやをよごさないでください。',
      exampleMeaning: 'Tolong jangan kotori kamar.'
    }
  },
  {
    id: 'heal-fix',
    level: 'N4',
    category: 'Kesehatan & Perbaikan',
    pattern: '-u vs -su',
    jidoushi: {
      kanji: '直る',
      reading: 'なおる',
      romaji: 'naoru',
      meaning: 'sembuh / pulih / membaik',
      particle: 'が',
      example: '薬を飲んで風邪が直りました。',
      exampleReading: 'くすりをのんでかぜがなおりました。',
      exampleMeaning: 'Setelah minum obat, flu saya sembuh.'
    },
    tadoushi: {
      kanji: '直す',
      reading: 'なおす',
      romaji: 'naosu',
      meaning: 'memperbaiki / menyembuhkan',
      particle: 'を',
      example: '時計屋さんが時計を直してくれました。',
      exampleReading: 'とけいやさんがとけいをなおしてくれました。',
      exampleMeaning: 'Tukang jam telah memperbaiki jam saya.'
    }
  },
  {
    id: 'boil-water',
    level: 'N4',
    category: 'Dapur & Masakan',
    pattern: '-u vs -asu',
    jidoushi: {
      kanji: '沸く',
      reading: 'わく',
      romaji: 'waku',
      meaning: 'mendidih (keadaan air)',
      particle: 'が',
      example: 'お湯が沸きましたよ。',
      exampleReading: 'おゆがわきましたよ。',
      exampleMeaning: 'Air panasnya sudah mendidih lho.'
    },
    tadoushi: {
      kanji: '沸かす',
      reading: 'わかす',
      romaji: 'wakasu',
      meaning: 'mendidihkan / menjerang air',
      particle: 'を',
      example: 'お茶を飲むためにお湯を沸かします。',
      exampleReading: 'おちゃをのむためにおゆをわかします。',
      exampleMeaning: 'Saya mendidihkan air untuk minum teh.'
    }
  },
  {
    id: 'cool-chill',
    level: 'N4',
    category: 'Dapur & Suhu',
    pattern: '-eru vs -asu',
    jidoushi: {
      kanji: '冷える',
      reading: 'ひえる',
      romaji: 'hieru',
      meaning: 'menjadi dingin (suhu/benda)',
      particle: 'が',
      example: '夜になると手足が冷えます。',
      exampleReading: 'よるになるとてあしがひえます。',
      exampleMeaning: 'Ketika malam tiba, tangan dan kaki terasa dingin.'
    },
    tadoushi: {
      kanji: '冷やす',
      reading: 'ひやす',
      romaji: 'hiyasu',
      meaning: 'mendinginkan (disengaja)',
      particle: 'を',
      example: 'スイカを冷蔵庫で冷やします。',
      exampleReading: 'スイカをれいぞうこでひやします。',
      exampleMeaning: 'Saya mendinginkan semangka di dalam kulkas.'
    }
  },
  {
    id: 'warm-heat',
    level: 'N4',
    category: 'Dapur & Suhu',
    pattern: '-aru vs -eru',
    jidoushi: {
      kanji: '温まる',
      reading: 'あたたまる',
      romaji: 'atatamaru',
      meaning: 'menjadi hangat (tubuh/keadaan)',
      particle: 'が',
      example: '温泉に入って体が温まりました。',
      exampleReading: 'おんせんにはいってからだがあたたまりました。',
      exampleMeaning: 'Setelah berendam di pemandian air panas, tubuh menjadi hangat.'
    },
    tadoushi: {
      kanji: '温める',
      reading: 'あたためる',
      romaji: 'atatameru',
      meaning: 'menghangatkan (disengaja)',
      particle: 'を',
      example: 'スープをレンジで温めます。',
      exampleReading: 'スープをレンジであたためます。',
      exampleMeaning: 'Saya menghangatkan sup dengan microwave.'
    }
  },
  {
    id: 'find-discover',
    level: 'N4',
    category: 'Keberadaan & Pencarian',
    pattern: '-aru vs -eru',
    jidoushi: {
      kanji: '見つかる',
      reading: 'みつかる',
      romaji: 'mitsukaru',
      meaning: 'ditemukan / ketemu (keadaan)',
      particle: 'が',
      example: '失くした鍵が無事に見つかりました。',
      exampleReading: 'なくしたかぎがぶじにみつかりました。',
      exampleMeaning: 'Kunci yang hilang sudah ditemukan dengan selamat.'
    },
    tadoushi: {
      kanji: '見つける',
      reading: 'みつける',
      romaji: 'mitsukeru',
      meaning: 'menemukan (tindakan aktif)',
      particle: 'を',
      example: '公園で四つ葉のクローバーを見つけました。',
      exampleReading: 'こうえんでよつばのクローバーをみつけました。',
      exampleMeaning: 'Saya menemukan semanggi berdaun empat di taman.'
    }
  },
  {
    id: 'deliver-reach',
    level: 'N4',
    category: 'Kurir & Pengiriman',
    pattern: '-u vs -eru',
    jidoushi: {
      kanji: '届く',
      reading: 'とどく',
      romaji: 'todoku',
      meaning: 'sampai / tiba (paket/surat)',
      particle: 'が',
      example: '日本から荷物が届きました。',
      exampleReading: 'にほんからにもつがとどきました。',
      exampleMeaning: 'Paket kiriman dari Jepang telah tiba.'
    },
    tadoushi: {
      kanji: '届ける',
      reading: 'とどける',
      romaji: 'todokeru',
      meaning: 'mengantarkan / menyerahkan',
      particle: 'を',
      example: '拾った財布を交番に届けます。',
      exampleReading: 'ひろったさいふをこうばんにとどけます。',
      exampleMeaning: 'Saya menyerahkan dompet yang ditemukan ke pos polisi.'
    }
  },

  // ── N3 LEVEL ──
  {
    id: 'burn-flame',
    level: 'N3',
    category: 'Api & Panas',
    pattern: '-eru vs -asu',
    jidoushi: {
      kanji: '燃える',
      reading: 'もえる',
      romaji: 'moeru',
      meaning: 'terbakar (spontan)',
      particle: 'が',
      example: '山火事で森が燃えています。',
      exampleReading: 'やまかじでもりがもえています。',
      exampleMeaning: 'Hutan terbakar karena kebakaran gunung.'
    },
    tadoushi: {
      kanji: '燃やす',
      reading: 'もやす',
      romaji: 'moyasu',
      meaning: 'membakar (disengaja)',
      particle: 'を',
      example: '落ち葉を集めて燃やします。',
      exampleReading: 'おちばをあつめてもやします。',
      exampleMeaning: 'Mengumpulkan daun-daun gugur lalu membakarnya.'
    }
  },
  {
    id: 'increase-grow',
    level: 'N3',
    category: 'Jumlah & Statistik',
    pattern: '-eru vs -asu',
    jidoushi: {
      kanji: '増える',
      reading: 'ふえる',
      romaji: 'fueru',
      meaning: 'bertambah / meningkat (alami)',
      particle: 'が',
      example: '外国人の観光客が増えました。',
      exampleReading: 'がいこくじんのかんこうきゃくがふえました。',
      exampleMeaning: 'Jumlah wisatawan asing bertambah.'
    },
    tadoushi: {
      kanji: '増やす',
      reading: 'ふやす',
      romaji: 'fuyasu',
      meaning: 'menambah / meningkatkan (disengaja)',
      particle: 'を',
      example: '貯金を少しずつ増やします。',
      exampleReading: 'ちょきんをすこしずつふやします。',
      exampleMeaning: 'Saya menambah tabungan sedikit demi sedikit.'
    }
  },
  {
    id: 'decrease-drop',
    level: 'N3',
    category: 'Jumlah & Statistik',
    pattern: '-eru vs -asu',
    jidoushi: {
      kanji: '減る',
      reading: 'へる',
      romaji: 'heru',
      meaning: 'berkurang (alami)',
      particle: 'が',
      example: '雨が降らなくて川の水が減りました。',
      exampleReading: 'あめがふらなくてかわのみずがへりました。',
      exampleMeaning: 'Air sungai berkurang karena tidak turun hujan.'
    },
    tadoushi: {
      kanji: '減らす',
      reading: 'へらす',
      romaji: 'herasu',
      meaning: 'mengurangi (disengaja)',
      particle: 'を',
      example: '健康のために塩分を減らします。',
      exampleReading: 'けんこうのためにえんぶんをへらします。',
      exampleMeaning: 'Saya mengurangi kadar garam demi kesehatan.'
    }
  },
  {
    id: 'change-alter',
    level: 'N3',
    category: 'Kondisi & Transformasi',
    pattern: '-aru vs -eru',
    jidoushi: {
      kanji: '変わる',
      reading: 'かわる',
      romaji: 'kawaru',
      meaning: 'berubah (spontan)',
      particle: 'が',
      example: '信号が青に変わりました。',
      exampleReading: 'しんごうがあおにかわりました。',
      exampleMeaning: 'Lampu lalu lintas berubah menjadi hijau.'
    },
    tadoushi: {
      kanji: '変える',
      reading: 'かえる',
      romaji: 'kaeru',
      meaning: 'mengubah / mengganti (disengaja)',
      particle: 'を',
      example: '気分を変えるために散歩します。',
      exampleReading: 'きぶんをかえるためにさんぽします。',
      exampleMeaning: 'Saya jalan-jalan untuk mengubah suasana hati.'
    }
  },
  {
    id: 'gather-assemble',
    level: 'N3',
    category: 'Sosial & Manusia',
    pattern: '-aru vs -eru',
    jidoushi: {
      kanji: '集まる',
      reading: 'あつまる',
      romaji: 'atsumaru',
      meaning: 'berkumpul (orang banyak)',
      particle: 'が',
      example: '駅前に多くの人が集まりました。',
      exampleReading: 'えきまえにおおくのひとがあつまりました。',
      exampleMeaning: 'Banyak orang berkumpul di depan stasiun.'
    },
    tadoushi: {
      kanji: '集める',
      reading: 'あつめる',
      romaji: 'atsumeru',
      meaning: 'mengumpulkan (koleksi/data)',
      particle: 'を',
      example: '子供のころ切手を集めていました。',
      exampleReading: 'こどものころきってをあつめていました。',
      exampleMeaning: 'Waktu kecil saya mengoleksi prangko.'
    }
  },
  {
    id: 'cure-heal-disease',
    level: 'N3',
    category: 'Kesehatan & Tubuh',
    pattern: '-u vs -su',
    jidoushi: {
      kanji: '治る',
      reading: 'なおる',
      romaji: 'naoru',
      meaning: 'sembuh (penyakit/luka)',
      particle: 'が',
      example: '傷がすっかり治りました。',
      exampleReading: 'きずがすっかりなおりました。',
      exampleMeaning: 'Lukanya telah sembuh total.'
    },
    tadoushi: {
      kanji: '治す',
      reading: 'なおす',
      romaji: 'naosu',
      meaning: 'menyembuhkan (dokter/obat)',
      particle: 'を',
      example: '医者が患者の病気を治します。',
      exampleReading: 'いしゃがかんじゃのびょうきをなおします。',
      exampleMeaning: 'Dokter menyembuhkan penyakit pasien.'
    }
  },

  // ── N2 LEVEL ──
  {
    id: 'escape-release',
    level: 'N2',
    category: 'Hewan & Penahanan',
    pattern: '-eru vs -asu',
    jidoushi: {
      kanji: '逃げる',
      reading: 'にげる',
      romaji: 'nigeru',
      meaning: 'kabur / melarikan diri',
      particle: 'が',
      example: '泥棒が裏口から逃げました。',
      exampleReading: 'どろぼうがうらぐちからにげました。',
      exampleMeaning: 'Pencuri itu melarikan diri lewat pintu belakang.'
    },
    tadoushi: {
      kanji: '逃がす',
      reading: 'にがす',
      romaji: 'nigasu',
      meaning: 'melepaskan / membiarkan lolos',
      particle: 'を',
      example: '捕まえた魚を海に逃がしました。',
      exampleReading: 'つかまえたさかなをうみににがしました。',
      exampleMeaning: 'Saya melepaskan ikan yang ditangkap kembali ke laut.'
    }
  },
  {
    id: 'spill-overflow',
    level: 'N2',
    category: 'Cairan & Wadah',
    pattern: '-eru vs -asu',
    jidoushi: {
      kanji: 'こぼれる',
      reading: 'こぼれる',
      romaji: 'koboreru',
      meaning: 'tumpah (sendirinya)',
      particle: 'が',
      example: 'コップから水がこぼれました。',
      exampleReading: 'コップからみずがこぼれました。',
      exampleMeaning: 'Air tumpah dari gelas.'
    },
    tadoushi: {
      kanji: 'こぼす',
      reading: 'こぼす',
      romaji: 'kobosu',
      meaning: 'menumpahkan (tidak sengaja)',
      particle: 'を',
      example: '机の上にコーヒーをこぼしてしまいました。',
      exampleReading: 'つくえのうえにコーヒーをこぼしてしまいました。',
      exampleMeaning: 'Saya tak sengaja menumpahkan kopi di atas meja.'
    }
  },
  {
    id: 'hide-conceal',
    level: 'N2',
    category: 'Tindakan & Posisi',
    pattern: '-eru vs -su',
    jidoushi: {
      kanji: '隠れる',
      reading: 'かくれる',
      romaji: 'kakureru',
      meaning: 'bersembunyi (spontan)',
      particle: 'が',
      example: '猫がベッドの下に隠れました。',
      exampleReading: 'ねこがベッドのしたにかくれません。',
      exampleMeaning: 'Kucing itu bersembunyi di bawah ranjang.'
    },
    tadoushi: {
      kanji: '隠す',
      reading: 'かくす',
      romaji: 'kakusu',
      meaning: 'menyembunyikan (disengaja)',
      particle: 'を',
      example: 'サプライズプレゼントをクローゼットに隠します。',
      exampleReading: 'サプライズプレゼントをクローゼットにかくします。',
      exampleMeaning: 'Saya menyembunyikan hadiah kejutan di lemari.'
    }
  },
  {
    id: 'connect-link',
    level: 'N2',
    category: 'Jaringan & Hubungan',
    pattern: '-aru vs -gu',
    jidoushi: {
      kanji: 'つながる',
      reading: 'つながる',
      romaji: 'tsunagaru',
      meaning: 'tersambung / terhubung',
      particle: 'が',
      example: 'インターネットがなかなかつながりません。',
      exampleReading: 'インターネットがなかなかつながりません。',
      exampleMeaning: 'Internetnya tak kunjung tersambung.'
    },
    tadoushi: {
      kanji: 'つなぐ',
      reading: 'つなぐ',
      romaji: 'tsunagu',
      meaning: 'menyambungkan / menghubungkan',
      particle: 'を',
      example: 'パソコンにケーブルをつなぎます。',
      exampleReading: 'パソコンにケーブルをつなぎます。',
      exampleMeaning: 'Saya menyambungkan kabel ke laptop.'
    }
  }
];
