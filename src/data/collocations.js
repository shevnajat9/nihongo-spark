/**
 * Database Kamus Kolokasi & Pasangan Kata Alami (連語 / Rengou Explorer)
 * Pasangan alami kata benda + partikel + kata kerja dalam bahasa Jepang (mencegah salah terjemahan harfiah).
 */

export const collocationsData = [
  // ==========================================
  // LEVEL N5
  // ==========================================
  {
    id: 'colloc-1',
    level: 'N5',
    category: 'Kesehatan & Tubuh',
    noun: '風邪 (kaze)',
    particle: 'を',
    verb: 'ひく (hiku)',
    collocation: '風邪をひく',
    reading: 'かぜをひく (kaze o hiku)',
    meaning: 'Masuk angin / terkena flu',
    literalTrap: '❌ 風邪が入る (kaze ga hairu) — "Angin masuk". Jangan terjemahkan "masuk angin" secara harfiah kata-per-kata!',
    exampleSentence: {
      jp: '昨日から風邪をひいて、喉が痛いです。',
      reading: 'きのうから かぜをひいて、のどが いたいです。',
      id: 'Sejak kemarin saya masuk angin dan tenggorokan saya sakit.'
    },
    formality: 'Standar',
    quiz: {
      question: 'Pilihlah kata kerja pasangan yang tepat untuk "Masuk angin": 「風邪を＿＿＿。」',
      options: ['ひく', '入る', '受ける', '取る'],
      correctIndex: 0,
      hint: 'Gunakan kata kerja ひく (hiku).'
    }
  },
  {
    id: 'colloc-2',
    level: 'N5',
    category: 'Kehidupan Sehari-hari',
    noun: '傘 (kasa)',
    particle: 'を',
    verb: 'さす (sasu)',
    collocation: '傘をさす',
    reading: 'かさをさす (kasa o sasu)',
    meaning: 'Memakai payung / membuka payung',
    literalTrap: '❌ 傘を使う (kasa o tsukau) — Terdengar aneh. Membuka/memakai payung wajib menggunakan kata kerja さす (sasu).',
    exampleSentence: {
      jp: '雨が降ってきたので、傘をさしました。',
      reading: 'あめが ふってきたので、かさを さしました。',
      id: 'Karena hujan mulai turun, saya memakai payung.'
    },
    formality: 'Standar',
    quiz: {
      question: 'Pilihlah verba yang tepat untuk "Memakai payung": 「雨だから、傘を＿＿＿。」',
      options: ['さす', '使う', '着る', '開く'],
      correctIndex: 0,
      hint: 'Kata kerja khas untuk payung adalah さす (sasu).'
    }
  },
  {
    id: 'colloc-3',
    level: 'N5',
    category: 'Kuliner & Minuman',
    noun: 'お茶 (ocha)',
    particle: 'を',
    verb: 'いれる (ireru)',
    collocation: 'お茶をいれる',
    reading: 'おちゃをいれる (ocha o ireru)',
    meaning: 'Menyeduh / membuat teh',
    literalTrap: '❌ お茶を作る (ocha o tsukuru) — Membuat teh dari daun teh menggunakan いれる (ireru / 淹れる), bukan tsukuru.',
    exampleSentence: {
      jp: 'お客さんにおいしいお茶をいれました。',
      reading: 'おきゃくさんに おいしい おちゃを いれました。',
      id: 'Saya menyeduhkan teh yang enak untuk tamu.'
    },
    formality: 'Standar',
    quiz: {
      question: 'Pilihlah verba untuk "Menyeduh teh": 「お茶を＿＿＿。」',
      options: ['いれる', '作る', '煮る', '沸かす'],
      correctIndex: 0,
      hint: 'Menyeduh teh menggunakan いれる (ireru).'
    }
  },
  {
    id: 'colloc-4',
    level: 'N5',
    category: 'Kebersihan Diri',
    noun: '歯 (ha)',
    particle: 'を',
    verb: '磨く (migaku)',
    collocation: '歯を磨く',
    reading: 'はをみがく (ha o migaku)',
    meaning: 'Menggosok gigi',
    literalTrap: '❌ 歯を洗う (ha o arau) — "Mencuci gigi". Menggosok gigi menggunakan 磨く (menggosok/mengilapkan).',
    exampleSentence: {
      jp: '寝る前に必ず歯を磨きます。',
      reading: 'ねるまえに かならず はを みがきます。',
      id: 'Sebelum tidur saya selalu menggosok gigi.'
    },
    formality: 'Standar',
    quiz: {
      question: 'Pasangan kata yang tepat untuk "Menggosok gigi" adalah...',
      options: ['歯を磨く', '歯を洗う', '歯を掃除する', '歯を取る'],
      correctIndex: 0,
      hint: 'Gunakan kata kerja 磨く (migaku).'
    }
  },
  {
    id: 'colloc-5',
    level: 'N5',
    category: 'Tidur & Mimpi',
    noun: '夢 (yume)',
    particle: 'を',
    verb: '見る (miru)',
    collocation: '夢を見る',
    reading: 'ゆめをみる (yume o miru)',
    meaning: 'Bermimpi',
    literalTrap: '❌ 夢をする / 夢がある — "Mendapat mimpi". Bahasa Jepang menggunakan "Melihat mimpi" (夢を見る).',
    exampleSentence: {
      jp: '昨夜、日本へ旅行する夢を見ました。',
      reading: 'さくや、にほんへ りょこうする ゆめを みました。',
      id: 'Tadi malam saya bermimpi bepergian ke Jepang.'
    },
    formality: 'Standar',
    quiz: {
      question: 'Bagaimana cara mengatakan "Saya bermimpi" dalam bahasa Jepang?',
      options: ['夢を見ました', '夢をしました', '夢をもらいました', '夢を作りました'],
      correctIndex: 0,
      hint: 'Bermimpi dinyatakan dengan "melihat mimpi" (見る).'
    }
  },

  // ==========================================
  // LEVEL N4
  // ==========================================
  {
    id: 'colloc-6',
    level: 'N4',
    category: 'Kerja & Waktu',
    noun: '休暇 (kyuuka)',
    particle: 'を',
    verb: '取る (toru)',
    collocation: '休暇を取る',
    reading: 'きゅうかをとる (kyuuka o toru)',
    meaning: 'Mengambil cuti / libur kerja',
    literalTrap: '❌ 休暇をもらう / 休暇をする — Di dunia kerja Jepang, cuti resmi "diambil" menggunakan 取る (toru).',
    exampleSentence: {
      jp: '来週、有給休暇を取って実家に帰ります。',
      reading: 'らいしゅう、ゆうきゅう きゅうかを とって じっかに かえります。',
      id: 'Minggu depan saya mengambil cuti berbayar untuk pulang ke kampung halaman.'
    },
    formality: 'Formal Bisnis',
    quiz: {
      question: 'Pilihlah kata yang tepat untuk "Mengambil cuti": 「休暇を＿＿＿。」',
      options: ['取る', '買う', '出す', '使う'],
      correctIndex: 0,
      hint: 'Cuti diambil dengan kata kerja 取る (toru).'
    }
  },
  {
    id: 'colloc-7',
    level: 'N4',
    category: 'Sosial & Janji',
    noun: '約束 (yakusoku)',
    particle: 'を',
    verb: '守る (mamoru)',
    collocation: '約束を守る',
    reading: 'やくそくをまもる (yakusoku o mamoru)',
    meaning: 'Menepati janji',
    literalTrap: '❌ 約束を正しくする — Menepati janji menggunakan kata kerja 守る (melindungi/menjaga), kebalikannya 破る (mengingkari).',
    exampleSentence: {
      jp: '信頼される人間になるためには、約束を守ることが大切だ。',
      reading: 'しんらいされる にんげんに なるためには、やくそくを まもることが たいせつだ。',
      id: 'Untuk menjadi orang yang dipercaya, menepati janji adalah hal yang sangat penting.'
    },
    formality: 'Standar',
    quiz: {
      question: 'Lawan kata dari "Mengingkari janji (約束を破る)" adalah...',
      options: ['約束を守る', '約束を助ける', '約束を持つ', '約束を置く'],
      correctIndex: 0,
      hint: 'Menepati janji = menjaga janji (守る).'
    }
  },
  {
    id: 'colloc-8',
    level: 'N4',
    category: 'Kesehatan',
    noun: '熱 (netsu)',
    particle: 'を',
    verb: '測る (hakaru)',
    collocation: '熱を測る',
    reading: 'ねつをはかる (netsu o hakaru)',
    meaning: 'Mengukur suhu tubuh / mengecek demam',
    literalTrap: '❌ 熱を調べる / 熱を見る — Mengukur suhu tubuh dengan termometer menggunakan 測る (hakaru).',
    exampleSentence: {
      jp: '体温計で熱を測ったら、38度もありました。',
      reading: 'たいおんけいで ねつを はかったら、さんじゅうはちども ありました。',
      id: 'Ketika saya mengukur suhu tubuh dengan termometer, ternyata demam 38 derajat.'
    },
    formality: 'Standar',
    quiz: {
      question: 'Pilihlah verba untuk "Mengukur suhu tubuh": 「熱を＿＿＿。」',
      options: ['測る', '調べる', '数える', '試す'],
      correctIndex: 0,
      hint: 'Mengukur suhu tubuh menggunakan 測る (hakaru).'
    }
  },

  // ==========================================
  // LEVEL N3
  // ==========================================
  {
    id: 'colloc-9',
    level: 'N3',
    category: 'Etiket Kantor & Bisnis',
    noun: '席 (seki)',
    particle: 'を',
    verb: '外す (hazusu)',
    collocation: '席を外す',
    reading: 'せきをはずす (seki o hazusu)',
    meaning: 'Meninggalkan tempat duduk / permisi keluar sebentar',
    literalTrap: '❌ 席を出る / 席を歩く — Ungkapan sopan kantor saat seseorang sedang tidak di mejanya adalah "seki o hazushite orimasu".',
    exampleSentence: {
      jp: '田中はただいま席を外しております。後ほど折り返しお電話いたします。',
      reading: 'たなかは ただいま せきを はずしております。のちほど おりかえし おでんわ いたします。',
      id: 'Tanaka saat ini sedang meninggalkan tempat duduk. Nanti akan segera menelepon balik.'
    },
    formality: 'Formal Bisnis',
    quiz: {
      question: 'Kalimat telepon bisnis saat rekan kerja sedang tidak di meja: 「田中はただいま席を＿＿＿おります。」',
      options: ['外して', '離れて', '忘れて', '捨てて'],
      correctIndex: 0,
      hint: 'Frasa baku bisnis: 席を外す (seki o hazusu).'
    }
  },
  {
    id: 'colloc-10',
    level: 'N3',
    category: 'Perhatian & Sikap',
    noun: '気 (ki)',
    particle: 'を',
    verb: '配る (kubaru)',
    collocation: '気を配る',
    reading: 'きをくばる (ki o kubaru)',
    meaning: 'Menaruh perhatian / memperhatikan kebutuhan orang lain',
    literalTrap: '❌ 心をあげる — Berempati dan memperhatikan orang-orang di sekeliling menggunakan 気を配る (membagikan kepedulian).',
    exampleSentence: {
      jp: '幹事として、参加者全員に気を配るように努めました。',
      reading: 'かんじとして、さんかしゃ ぜんいんに きを くばるように つとめました。',
      id: 'Sebagai panitia, saya berusaha menaruh perhatian pada semua peserta.'
    },
    formality: 'Standar',
    quiz: {
      question: 'Ungkapan untuk "Menaruh perhatian/peduli pada sekeliling": 「周囲に気を＿＿＿。」',
      options: ['配る', '送る', '売る', '投げる'],
      correctIndex: 0,
      hint: 'Gunakan kata kerja 配る (kubaru).'
    }
  },
  {
    id: 'colloc-11',
    level: 'N3',
    category: 'Firasat & Rasa',
    noun: '気 (ki)',
    particle: 'が',
    verb: 'する (suru)',
    collocation: '気がする',
    reading: 'きがする (ki ga suru)',
    meaning: 'Merasa sepertinya / ada firasat',
    literalTrap: '❌ 気持ちがある — Mengungkapkan firasat intuitif subjektif ("sepertinya...") menggunakan 気がする.',
    exampleSentence: {
      jp: 'どこかで彼に会ったことがあるような気がします。',
      reading: 'どこかで かれに あったことが あるような きが します。',
      id: 'Saya merasa sepertinya pernah bertemu dengannya di suatu tempat.'
    },
    formality: 'Standar',
    quiz: {
      question: 'Pilihlah partikel yang tepat: 「うまくいく気＿＿＿する。」',
      options: ['が', 'を', 'に', 'で'],
      correctIndex: 0,
      hint: 'Firasat intuitif: 気がする (ki ga suru).'
    }
  },
  {
    id: 'colloc-12',
    level: 'N3',
    category: 'Kecelakaan & Musibah',
    noun: '事故 (jiko)',
    particle: 'に',
    verb: '遭う (au)',
    collocation: '事故に遭う',
    reading: 'じこにあう (jiko ni au)',
    meaning: 'Mengalami / tertimpa kecelakaan',
    literalTrap: '❌ 事故をもらう / 事故に入る — Mengalami peristiwa buruk menggunakan kanji 遭う (au), bukan 会う (bertemu teman).',
    exampleSentence: {
      jp: '交通事故に遭わないように、左右をよく確認して渡りましょう。',
      reading: 'こうつう じこに あわないように、さゆうを よく かくにんして わたりましょう。',
      id: 'Agar tidak tertimpa kecelakaan lalu lintas, mari tengok kanan kiri dengan baik sebelum menyeberang.'
    },
    formality: 'Standar',
    quiz: {
      question: 'Kanji yang benar untuk "Mengalami kecelakaan" (Jiko ni au) adalah...',
      options: ['事故に遭う', '事故に会う', '事故に合う', '事故に逢う'],
      correctIndex: 0,
      hint: 'Untuk musibah/bencana, gunakan kanji 遭う.'
    }
  },

  // ==========================================
  // LEVEL N2
  // ==========================================
  {
    id: 'colloc-13',
    level: 'N2',
    category: 'Bisnis & Dokumen',
    noun: '目 (me)',
    particle: 'を',
    verb: '通す (toosu)',
    collocation: '目を通す',
    reading: 'めをとおす (me o toosu)',
    meaning: 'Membaca sepintas / memeriksa sekilas dokumen',
    literalTrap: '❌ 早く読む — Di dunia kerja Jepang, membaca sekilas laporan sebelum rapat disebut "memasukkan mata" (目を通す).',
    exampleSentence: {
      jp: '会議が始まる前に、こちらの企画書に目を通しておいてください。',
      reading: 'かいぎが はじまるまえに、こちらの きかくしょに めを とおして おいてください。',
      id: 'Sebelum rapat dimulai, tolong baca sepintas proposal perencanaan ini.'
    },
    formality: 'Formal Bisnis',
    quiz: {
      question: 'Ungkapan bisnis untuk "Membaca sekilas dokumen": 「書類に目を＿＿＿。」',
      options: ['通す', '入れる', '回す', '当てる'],
      correctIndex: 0,
      hint: 'Gunakan kata kerja 通す (toosu).'
    }
  },
  {
    id: 'colloc-14',
    level: 'N2',
    category: 'Mendengarkan & Respek',
    noun: '耳 (mimi)',
    particle: 'を',
    verb: '傾ける (katamukeru)',
    collocation: '耳を傾ける',
    reading: 'みみをかたむける (mimi o katamukeru)',
    meaning: 'Mendengarkan dengan seksama / menyimak sungguh-sungguh',
    literalTrap: '❌ 耳を使う — Ungkapan bermutu tinggi: "memiringkan telinga" (耳を傾ける) untuk mendengarkan nasihat/suara rakyat.',
    exampleSentence: {
      jp: '指導者は現場の生の声に耳を傾けるべきだ。',
      reading: 'しどうしゃは げんばの なまのこえに みみを かたむけるべきだ。',
      id: 'Seorang pemimpin seharusnya mendengarkan dengan seksama suara langsung dari lapangan.'
    },
    formality: 'Formal Bisnis',
    quiz: {
      question: 'Pilihlah verba untuk "Menyimak dengan seksama": 「他人の意見に耳を＿＿＿。」',
      options: ['傾ける', '寄せる', '倒す', '開ける'],
      correctIndex: 0,
      hint: 'Gunakan kata kerja 傾ける (katamukeru).'
    }
  },
  {
    id: 'colloc-15',
    level: 'N2',
    category: 'Tanggung Jawab',
    noun: '責任 (sekinin)',
    particle: 'を',
    verb: '負う (ou)',
    collocation: '責任を負う',
    reading: 'せきにんをおう (sekinin o ou)',
    meaning: 'Memikul tanggung jawab',
    literalTrap: '❌ 責任を持つ (umum) vs 責任を負う (memikul beban tanggung jawab moral/hukum secara resmi).',
    exampleSentence: {
      jp: 'プロジェクトのリーダーとして、すべての責任を負う覚悟です。',
      reading: 'プロジェクトの リーダーとして、すべての せきにんを おう かくごです。',
      id: 'Sebagai pemimpin proyek, saya siap memikul seluruh tanggung jawab.'
    },
    formality: 'Formal Bisnis',
    quiz: {
      question: 'Pilihlah verba formal untuk "Memikul tanggung jawab": 「責任を＿＿＿。」',
      options: ['負う', '受ける', '被る', '頼む'],
      correctIndex: 0,
      hint: 'Gunakan kata kerja 負う (ou).'
    }
  },
  {
    id: 'colloc-16',
    level: 'N2',
    category: 'Sosial & Emosi',
    noun: '愚痴 (guchi)',
    particle: 'を',
    verb: 'こぼす (kobosu)',
    collocation: '愚痴をこぼす',
    reading: 'ぐちをこぼす (guchi o kobosu)',
    meaning: 'Mengeluh / menumpahkan unek-unek kekesalan',
    literalTrap: '❌ 愚痴を言う (bisa dipahami tetapi kasual) $\\rightarrow$ Bahasa alami bermutu menggunakan こぼす (menumpahkan).',
    exampleSentence: {
      jp: 'お酒を飲むと、彼は決まって仕事の愚痴をこぼす。',
      reading: 'おさけを のむと、かれは きまって しごとの ぐちを こぼす。',
      id: 'Setiap kali minum bir, dia pasti menumpahkan keluhan tentang pekerjaannya.'
    },
    formality: 'Standar',
    quiz: {
      question: 'Pasangan alami untuk "Menumpahkan keluhan (guchi)" adalah...',
      options: ['愚痴をこぼす', '愚痴を落とす', '愚痴を流す', '愚痴を捨てる'],
      correctIndex: 0,
      hint: 'Mengeluh diibaratkan menumpahkan air: こぼす (kobosu).'
    }
  },

  // ==========================================
  // LEVEL N1
  // ==========================================
  {
    id: 'colloc-17',
    level: 'N1',
    category: 'Upaya & Perjuangan',
    noun: '手 (te)',
    particle: 'を',
    verb: '尽くす (tsukusu)',
    collocation: '手を尽くす',
    reading: 'てをつくす (te o tsukusu)',
    meaning: 'Mengerahkan segala upaya / mencoba semua cara yang memungkinkan',
    literalTrap: '❌ すべての方法を使う — Ungkapan idiomatis N1 untuk usaha medis atau krisis darurat adalah 手を尽くす.',
    exampleSentence: {
      jp: '医師団はあらゆる手を尽くしたが、患者を救うことはできなかった。',
      reading: 'いしだんは あらゆる てを つくしたが、かんじゃを すくうことは できなかった。',
      id: 'Tim dokter telah mengerahkan segala upaya, namun tidak berhasil menyelamatkan pasien.'
    },
    formality: 'Formal Tertinggi',
    quiz: {
      question: 'Pilihlah verba untuk ungkapan "Mengerahkan segala daya upaya": 「あらゆる手を＿＿＿。」',
      options: ['尽くす', '使う', '張る', '伸ばす'],
      correctIndex: 0,
      hint: 'Gunakan kata kerja 尽くす (tsukusu).'
    }
  },
  {
    id: 'colloc-18',
    level: 'N1',
    category: 'Ketegangan',
    noun: '息 (iki)',
    particle: 'を',
    verb: '殺す (korosu)',
    collocation: '息を殺す',
    reading: 'いきをころす (iki o korosu)',
    meaning: 'Menahan napas karena sangat tegang / mengheningkan diri',
    literalTrap: '❌ 息を止める (menahan napas biasa di kolam renang) vs 息を殺す (menahan desah napas agar tidak ketahuan musuh).',
    exampleSentence: {
      jp: '暗闇の中で息を殺して、犯人が通り過ぎるのを待った。',
      reading: 'くらやみの なかで いきを ころして、はんにんが とおりすぎるのを まった。',
      id: 'Dalam kegelapan saya menahan napas rapat-rapat, menunggu pelaku lewat.'
    },
    formality: 'Ekspresif Sastra',
    quiz: {
      question: 'Ungkapan tegang "Menahan napas agar tidak menimbulkan suara" adalah...',
      options: ['息を殺す', '息を止める', '息を切る', '息を抜く'],
      correctIndex: 0,
      hint: 'Idiom dramatis Jepang menggunakan kata 殺す (korosu).'
    }
  },
  {
    id: 'colloc-19',
    level: 'N1',
    category: 'Etiket Percakapan',
    noun: '口 (kuchi)',
    particle: 'を',
    verb: '挟む (hasamu)',
    collocation: '口を挟む',
    reading: 'くちをはさむ (kuchi o hasamu)',
    meaning: 'Menyela / memotong pembicaraan orang lain',
    literalTrap: '❌ 話を切る — Menyelipkan mulut di antara percakapan orang lain: 口を挟む (hasamu = menjepitkan).',
    exampleSentence: {
      jp: '大人の真剣な議論に、子供が横から口を挟むべきではない。',
      reading: 'おとなの しんけんな ぎろんに、こどもが よこから くちを はさむべきではない。',
      id: 'Dalam diskusi serius orang dewasa, anak-anak tidak seharusnya menyela dari samping.'
    },
    formality: 'Standar',
    quiz: {
      question: 'Pilihlah kata kerja untuk "Menyela pembicaraan": 「人の話に口を＿＿＿。」',
      options: ['挟む', '入れる', '置く', '刺す'],
      correctIndex: 0,
      hint: 'Gunakan kata kerja 挟む (hasamu).'
    }
  },
  {
    id: 'colloc-20',
    level: 'N1',
    category: 'Kerja Keras & Pengorbanan',
    noun: '骨 (hone)',
    particle: 'を',
    verb: '折る (oru)',
    collocation: '骨を折る',
    reading: 'ほねをおる (hone o oru)',
    meaning: 'Bersusah payah / bekerja keras berkorban demi orang lain',
    literalTrap: '❌ 骨折 (patah tulang fisik biasa) vs 骨を折る (idiom: bersusah payah demi menyelesaikan urusan sulit).',
    exampleSentence: {
      jp: '両家の仲を取り持つために、彼は大変な骨を折ってくれた。',
      reading: 'りょうけの なかを とりもつために、かれは たいへんな ほねを おってくれた。',
      id: 'Demi mendamaikan kedua keluarga, dia telah bersusah payah dengan luar biasa.'
    },
    formality: 'Ekspresif Formal',
    quiz: {
      question: 'Idiom untuk "Bersusah payah demi orang lain": 「骨を＿＿＿。」',
      options: ['折る', '削る', '曲げる', '抜く'],
      correctIndex: 0,
      hint: 'Idiom bersusah payah: 骨を折る (hone o oru).'
    }
  }
];
