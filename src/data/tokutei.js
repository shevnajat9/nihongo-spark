// Database Bahasa Jepang Kerja Spesifik Industri (Tokutei Ginou / SSW & Ginou Jisshuu)
// Mencakup 4 pilar sektor: Kaigo (Keperawatan), Inshoku (Restoran), Kensetsu/Seizou (Teknik/Konstruksi), IT & Bisnis

export const tokuteiSectors = [
  {
    id: 'kaigo',
    name: 'Keperawatan Lansia (介護 Kaigo)',
    icon: '🏥',
    color: '#38bdf8',
    description: 'Komunikasi empati kepada pengguna panti wreda (Riyousha), pemeriksaan tanda vital, dan prosedur keperawatan harian.',
    keywords: ['声かけ (Koe-kake)', 'バイタル (Tanda Vital)', '体位変換 (Alih Baring)', '水分補給 (Hidrasi)'],
    dialogues: [
      {
        title: 'Membantu Berpindah ke Kursi Roda (車椅子への移乗)',
        situation: 'Menyapa dan meminta izin dengan empati sebelum membantu lansia berpindah dari tempat tidur.',
        lines: [
          { speaker: '介護士 (Perawat)', japanese: '田中さん、おはようございます。体調はいかがですか。', reading: 'たなかさん、おはようございます。たいちょうは いかがですか。', indonesian: 'Pak Tanaka, selamat pagi. Bagaimana kondisi tubuh Bapak?' },
          { speaker: '田中さん (Lansia)', japanese: 'おはよう。うん、昨日はよく眠れたよ。', reading: 'おはよう。うん、きのうは よく ねむれたよ。', indonesian: 'Selamat pagi. Ya, semalam saya tidur nyenyak.' },
          { speaker: '介護士 (Perawat)', japanese: 'それはよかったです。これから食堂へ行くので、車椅子に移りましょうか。ゆっくり立ってくださいね。', reading: 'それは よかったです。これから しょくどうへ いくので、くるまいすに うつりましょうか。ゆっくり たってくださいね。', indonesian: 'Baguslah kalau begitu. Karena sekarang kita mau ke ruang makan, mari berpindah ke kursi roda ya. Tolong berdiri perlahan ya Pak.' },
          { speaker: '田中さん (Lansia)', japanese: 'はい、よろしく頼むね。', reading: 'はい、よろしく たのむね。', indonesian: 'Baik, tolong bantuannya ya.' }
        ]
      }
    ],
    vocabulary: [
      { word: '利用者', reading: 'りようしゃ', romaji: 'riyousha', meaning: 'pengguna jasa panti / lansia', category: 'Dasar' },
      { word: '体位変換', reading: 'たいいへんかん', romaji: 'taii henkan', meaning: 'mengubah posisi tidur / alih baring', category: 'Prosedur' },
      { word: '褥瘡', reading: 'じょくそう', romaji: 'jokusou', meaning: 'luka baring / decubitus ulcer', category: 'Medis' },
      { word: '水分補給', reading: 'すいぶんほきゅう', romaji: 'suibun hokyuu', meaning: 'asupan cairan / hidrasi', category: 'Nutrisi' },
      { word: '車椅子', reading: 'くるまいす', romaji: 'kurumaisu', meaning: 'kursi roda', category: 'Alat Bantu' },
      { word: '血圧', reading: 'けつあつ', romaji: 'ketsuatsu', meaning: 'tekanan darah', category: 'Tanda Vital' },
      { word: '食事介助', reading: 'しょくじかいじょ', romaji: 'shokuji kaijo', meaning: 'bantuan makan / mendampingi makan', category: 'Prosedur' }
    ],
    quiz: [
      {
        question: 'Saat hendak memindahkan posisi tidur atau membantu lansia berdiri, etiket komunikasi apa yang paling wajib dilakukan terlebih dahulu?',
        options: [
          'Langsung mengangkat tubuh pasien tanpa bicara agar cepat selesai',
          'Melakukan 声かけ (Koe-kake) yaitu menyapa dan menjelaskan tindakan dengan ramah',
          'Memanggil perawat lain untuk memegang kaki pasien',
          'Menyuruh pasien berdiri sendiri'
        ],
        correctIndex: 1,
        explanation: '声かけ (Koe-kake) adalah prinsip nomor 1 dalam Kaigo untuk memberikan rasa aman dan persetujuan dari lansia sebelum tindakan fisik dilakukan.'
      }
    ]
  },
  {
    id: 'inshoku',
    name: 'Restoran & Kuliner (外食・飲食 Inshoku)',
    icon: '🍽️',
    color: '#fbbf24',
    description: 'Bahasa pelayanan tamu (Saitai/Keigo restoran), konfirmasi alergi makanan, standar sanitasi higienis, dan penanganan kasir.',
    keywords: ['接客用語 (Etiket Layanan)', 'アレルギー (Alergen)', '賞味期限 (Best Before)', '手洗い (Sanitasi)'],
    dialogues: [
      {
        title: 'Menerima Pesanan & Memastikan Alergi (注文伺いとアレルギー確認)',
        situation: 'Pelayan restoran menyapa pelanggan dan mengonfirmasi pesanan serta alergi makanan.',
        lines: [
          { speaker: 'ホール (Pelayan)', japanese: '大変お待たせいたしました。ご注文はお決まりでしょうか。', reading: 'たいへん おまたせいたしました。ごちゅうもんは おきまりでしょうか。', indonesian: 'Mohon maaf telah membuat Anda menunggu. Apakah pesanannya sudah siap?' },
          { speaker: 'お客様 (Tamu)', japanese: '天ぷら定食を一つお願いします。あと、卵のアレルギーがあるのですが。', reading: 'てんぷらていしょくを ひとつ おねがいします。あと、たまごの アレルギーが あるのですが。', indonesian: 'Tolong set tempura satu. Dan juga, saya ada alergi telur.' },
          { speaker: 'ホール (Pelayan)', japanese: 'かしこまりました。卵を使わずに調理できるか、すぐに厨房に確認してまいります。', reading: 'かしこまりました。たまごを つかわずに ちょうりできるか、すぐに ちゅうぼうに かくにんしてまいります。', indonesian: 'Baik, saya pahami. Saya akan segera mengonfirmasi ke dapur apakah hidangan bisa dimasak tanpa menggunakan telur.' }
        ]
      }
    ],
    vocabulary: [
      { word: 'いらっしゃいませ', reading: 'いらっしゃいませ', romaji: 'irasshaimase', meaning: 'selamat datang (salam pembuka)', category: 'Pelayanan' },
      { word: '少々お待ちください', reading: 'しょうしょうおまちください', romaji: 'shoushou omachi kudasai', meaning: 'mohon tunggu sebentar', category: 'Pelayanan' },
      { word: 'お待たせいたしました', reading: 'おまたせいたしました', romaji: 'omatase itashimashita', meaning: 'terima kasih telah menunggu', category: 'Pelayanan' },
      { word: '賞味期限', reading: 'しょうみきげん', romaji: 'shoumi kigen', meaning: 'batas kualitas rasa terbaik', category: 'Sanitasi' },
      { word: '消費期限', reading: 'しょうひきげん', romaji: 'shouhi kigen', meaning: 'batas tanggal kedaluwarsa aman konsumsi', category: 'Sanitasi' },
      { word: '厨房', reading: 'ちゅうぼう', romaji: 'chuubou', meaning: 'dapur restoran', category: 'Area' },
      { word: 'アレルゲン', reading: 'アレルゲン', romaji: 'arerugen', meaning: 'zat pemicu alergi makanan', category: 'Keamanan' }
    ],
    quiz: [
      {
        question: 'Ketika menyajikan pesanan makanan ke meja tamu restoran, ucapan resmi standar yang wajib diucapkan adalah...',
        options: [
          'どうぞ食べてください (Douzo tabete kudasai)',
          'お待たせいたしました (Omatase itashimashita)',
          'ごちそうさまでした (Gochisousama deshita)',
          'ごめんなさい (Gomennasai)'
        ],
        correctIndex: 1,
        explanation: 'お待たせいたしました (Omatase itashimashita) adalah frasa sopan standar pelayan saat mengantarkan hidangan ke meja tamu.'
      }
    ]
  },
  {
    id: 'kensetsu',
    name: 'Konstruksi & Manufaktur (建設・製造 Kensetsu)',
    icon: '🏗️',
    color: '#f97316',
    description: 'Slogan keselamatan kerja, pelatihan prediksi bahaya (KYT), penyebutan alat perkakas, dan koordinasi lapangan.',
    keywords: ['安全第一 (Safety First)', '指差呼称 (Tunjuk-Sebut)', 'KYT (Prediksi Bahaya)', '保護具 (APD)'],
    dialogues: [
      {
        title: 'Apel Pagi & Tunjuk Sebut KYT (朝礼での指差呼称)',
        situation: 'Pemeriksaan APD dan komitmen keselamatan sebelum memulai pekerjaan proyek konstruksi.',
        lines: [
          { speaker: '職長 (Mandor)', japanese: '皆さん、おはようございます！本日の高所作業、安全帯よし！ヘルメットのあご紐よし！', reading: 'みなさん、おはようございます！ほんじつの こうしょさぎょう、あんぜんたいよし！ヘルメットの あごひもよし！', indonesian: 'Selamat pagi semuanya! Pekerjaan ketinggian hari ini, sabuk pengaman aman! Tali dagu helm aman!' },
          { speaker: '全員 (Semua)', japanese: 'ご安全に！安全第一で作業を開始します！よし！', reading: 'ごあんぜんに！あんぜんだいいちで さぎょうを かいしします！よし！', indonesian: 'Go-anzen ni (Salam Keselamatan)! Kita mulai pekerjaan dengan mengutamakan keselamatan! Siap!' }
        ]
      }
    ],
    vocabulary: [
      { word: '安全第一', reading: 'あんぜんだいいち', romaji: 'anzen daiichi', meaning: 'utamakan keselamatan (Safety First)', category: 'Prinsip' },
      { word: '指差呼称', reading: 'しさこしょう', romaji: 'shisa koshou', meaning: 'metode tunjuk dan sebut untuk verifikasi aman', category: 'Kaidah' },
      { word: '安全靴', reading: 'あんぜんぐつ', romaji: 'anzengutsu', meaning: 'sepatu pelindung keselamatan (Safety Shoes)', category: 'APD' },
      { word: '足場', reading: 'あしば', romaji: 'ashiba', meaning: 'perancah / scaffolding', category: 'Peralatan' },
      { word: '感電', reading: 'かんでん', romaji: 'kanden', meaning: 'sengatan listrik', category: 'Bahaya' },
      { word: '墜落・転落', reading: 'ついらく・てんらく', romaji: 'tsuiraku / tenraku', meaning: 'jatuh / tergelincir dari ketinggian', category: 'Bahaya' },
      { word: '合図', reading: 'あいず', romaji: 'aizu', meaning: 'aba-aba / sinyal komando', category: 'Kerja Tim' }
    ],
    quiz: [
      {
        question: 'Metode menunjuk objek dengan jari telunjuk sambil mengucapkan status "Yoshi!" (contoh: "Sakugouanzen, Yoshi!") di pabrik/proyek Jepang disebut...',
        options: [
          'ラジオ体操 (Radio Taisou)',
          '指差呼称 (Shisa Koshou)',
          '報連相 (Hou-Ren-So)',
          'カイゼン (Kaizen)'
        ],
        correctIndex: 1,
        explanation: '指差呼称 (Shisa Koshou / Pointing and Calling) terbukti secara ilmiah menurunkan angka kecelakaan kerja hingga 85% di industri Jepang.'
      }
    ]
  },
  {
    id: 'it_business',
    name: 'IT & Bisnis Kantor (IT・ビジネス IT & Business)',
    icon: '💻',
    color: '#a855f7',
    description: 'Etiket komunikasi kerja Hou-Ren-So, istilah rapat (Chourei/Gijiroku), alur kerja Scrum/Agile, dan terminologi teknis software.',
    keywords: ['報連相 (Hou-Ren-So)', '仕様書 (Spesifikasi)', '納期 (Deadline)', '本番環境 (Production)'],
    dialogues: [
      {
        title: 'Laporan Kemajuan Tugas (進捗の報告と相談)',
        situation: 'Programmer melaporkan kemajuan pengerjaan fitur dan kendala yang dihadapi kepada atasan.',
        lines: [
          { speaker: 'エンジニア (Engineer)', japanese: '課長、今よろしいでしょうか。ログイン機能の実装についてご相談があります。', reading: 'かちょう、いま よろしいでしょうか。ログインきのうの じっそうについて ごそうだんが あります。', indonesian: 'Pak Kabag, apakah ada waktu sebentar? Saya ingin berkonsultasi mengenai implementasi fitur login.' },
          { speaker: '課長 (Manager)', japanese: 'はい、どうぞ。進捗はどうですか。', reading: 'はい、どうぞ。しんちょくは どうですか。', indonesian: 'Ya, silakan. Bagaimana kemajuannya?' },
          { speaker: 'エンジニア (Engineer)', japanese: '基本実装は完了しましたが、外部APIの連携部分でエラーが発生しており、納期に間に合わせるための対策を検討したいです。', reading: 'きほんじっそうは かんりょうしましたが、がいぶAPIの れんけいぶぶんで エラーが はっせいしており、のうきに まにあわせるための たいさくを けんとうしたいです。', indonesian: 'Implementasi dasar sudah selesai, namun terjadi error pada bagian integrasi API eksternal, sehingga saya ingin membahas solusi agar tetap tepat deadline.' }
        ]
      }
    ],
    vocabulary: [
      { word: '報連相', reading: 'ほうれんそう', romaji: 'hou-ren-so', meaning: 'Lapor (Houkoku), Kontak (Renraku), Konsultasi (Soudan)', category: 'Bisnis' },
      { word: '納期', reading: 'のうき', romaji: 'nouki', meaning: 'tenggat waktu pengiriman / deadline', category: 'Manajemen' },
      { word: '仕様書', reading: 'しようしょ', romaji: 'shiyousho', meaning: 'dokumen spesifikasi teknis', category: 'Dokumen' },
      { word: '議事録', reading: 'ぎじろく', romaji: 'gijiroku', meaning: 'notula hasil rapat', category: 'Dokumen' },
      { word: '進捗', reading: 'しんちょく', romaji: 'shinchoku', meaning: 'progres / kemajuan pekerjaan', category: 'Manajemen' },
      { word: '本番環境', reading: 'ほんばんかんきょう', romaji: 'honban kankyou', meaning: 'server / lingkungan produksi (Production)', category: 'Teknis IT' },
      { word: '不具合', reading: 'ふぐあい', romaji: 'fuguai', meaning: 'cacat sistem / kendala teknis (bug)', category: 'Teknis IT' }
    ],
    quiz: [
      {
        question: 'Singkatan 報連相 (Hou-Ren-So) yang merupakan pilar etiket kerja nomor satu di perusahaan Jepang adalah singkatan dari...',
        options: [
          'Housou (Penyiaran), Renshuu (Latihan), Soudan (Diskusi)',
          'Houkoku (Laporan), Renraku (Hubungi/Kabar), Soudan (Konsultasi)',
          'Honki (Serius), Ren’ai (Percintaan), Souji (Bersih-bersih)',
          'Hoshou (Garansi), Renkei (Kerja sama), Souzou (Kreasi)'
        ],
        correctIndex: 1,
        explanation: 'Hou-Ren-So adalah singkatan dari 報告 (Houkoku - Lapor), 連絡 (Renraku - Mengabari), dan 相談 (Soudan - Berkonsultasi).'
      }
    ]
  }
];
