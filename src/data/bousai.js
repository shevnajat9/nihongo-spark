/**
 * Database Mitigasi Bencana & Bahasa Jepang Sederhana (防災 & やさしい日本語 / Bousai & Yasashii Nihongo)
 * Jepang adalah salah satu negara dengan mitigasi bencana paling maju di dunia.
 * Modul ini melatih pembelajar memahami siaran darurat gempa, tsunami, topan, serta standar "Yasashii Nihongo".
 */

export const bousaiTerms = [
  {
    id: 'b-1',
    kanji: '緊急地震速報',
    furigana: 'きんきゅうじしんそくほう',
    romaji: 'Kinkyū Jishin Sokuhō',
    level: 'Vital 🚨',
    meaning: 'Peringatan Dini Gempa Bumi Darurat (Alarm HP & TV)',
    explanation: 'Sistem deteksi gelombang primer (P-wave) Badan Meteorologi Jepang (JMA). Mengeluarkan alarm bunyi serentak di semua smartphone beberapa detik sebelum guncangan kuat (S-wave) tiba. Tindakan seketika: Jangan panik, lindungi kepala di bawah meja, jauhi kaca!',
    yasashiiNihongo: '大きな 地震（じしん）が 来ます。あわてないで、頭（あたま）を まもって ください。',
    actionSteps: [
      'まずは身の安全 (Amankan kepala di bawah meja / tas)',
      '火の始末は揺れが収まってから (Matikan kompor setelah guncangan reda, jangan saat gempa berguncang)',
      'ドアを開けて避難路を確保 (Buka sedikit pintu agar tidak macet terkunci)'
    ]
  },
  {
    id: 'b-2',
    kanji: '震度',
    furigana: 'しんど',
    romaji: 'Shindo',
    level: 'Vital 🚨',
    meaning: 'Skala Intensitas Guncangan Gempa Jepang (0 hingga 7)',
    explanation: 'Skala khusus Jepang yang mengukur seberapa kuat tanah bergoyang di lokasi tertentu (berbeda dengan Magnitudo M yang mengukur kekuatan total sumber gempa). Dimulai dari Shindo 1 (nyaris tak terasa), 3-4 (benda bergetar), 5-Jaku/5-Kyou (sulit berdiri), hingga 7 (tanah terbelah, bangunan roboh).',
    yasashiiNihongo: '地震（じしん）の ゆれの 強（つよ）さの レベル です。数字（すうじ）が 大きい ほど、強く ゆれます。',
    actionSteps: [
      '震度5弱以上: Segera buka aplikasi bencana (Yurekuru Call, NHK World, Safety Tips)',
      'Cek kebocoran gas (meteran otomatis menutup di Shindo 5)'
    ]
  },
  {
    id: 'b-3',
    kanji: '大津波警報 / 津波注意報',
    furigana: 'おおつなみけいほう / つなみちゅういほう',
    romaji: 'Ōtsunami Keihō / Tsunami Chūihō',
    level: 'Kritis 🌊',
    meaning: 'Peringatan Darurat Tsunami Besar / Siaga Tsunami',
    explanation: 'Jika gempa terjadi di laut, peringatan tsunami langsung disiarkan. "Ōtsunami Keihō" berarti gelombang diperkirakan setinggi 3 meter atau lebih. Tindakan: Lari secepat mungkin ke tempat tinggi (高台 / Takadai) atau gedung evakuasi tsunami bertingkat!',
    yasashiiNihongo: 'すぐに 高（たか）い ところへ にげてください！ 海（うみ）や 川（かわ）の 近くから はなれて ください。',
    actionSteps: [
      'Tsunami datang dalam hitungan menit, jangan menunggu melihat gelombang',
      'Tinggalkan kendaraan jika jalanan macet, lanjutkan lari dengan kaki'
    ]
  },
  {
    id: 'b-4',
    kanji: '避難所 / 避難場所',
    furigana: 'ひなんじょ / ひなんばしょ',
    romaji: 'Hinanjo / Hinanbasho',
    level: 'Penting 🏫',
    meaning: 'Titik Kumpul / Tempat Pengungsian Evakuasi Resmi',
    explanation: 'Sekolah dasar (小学校), SMP, atau balai pertemuan warga yang ditetapkan oleh pemerintah kota sebagai tempat berlindung, mendapatkan makanan ransum darurat, dan air bersih gratis.',
    yasashiiNihongo: '地震や 台風の ときに、みんなが あつまる 安全（あんぜん）な 場所（ばしょ）です。学校や 公園などです。',
    actionSteps: [
      'Cari tanda plang hijau bergambar orang berlari menuju pintu',
      'Ketahui lokasi Hinanjo terdekat dari tempat tinggal Anda sejak hari pertama tiba di Jepang'
    ]
  },
  {
    id: 'b-5',
    kanji: '非常持ち出し袋 / 防災グッズ',
    furigana: 'ひじょうもちだしぶくろ / ぼうさいぐっず',
    romaji: 'Hijō Mochidashi-bukuro / Bousai Guzzu',
    level: 'Siaga 🎒',
    meaning: 'Tas Ransel Siaga Bencana 72 Jam',
    explanation: 'Ransel darurat yang ditaruh di dekat pintu masuk rumah. Berisi persediaan bertahan hidup selama 72 jam sebelum bantuan luar tiba.',
    yasashiiNihongo: 'にげる ときに、持（も）って 行（い）く バッグ です。水（みず）、食（た）べ物（もの）、ライト などが 入（はい）って います。',
    actionSteps: [
      'Air minum min. 2 liter per orang',
      'Makanan awet / biskuit kanpan',
      'Powerbank HP & baterai cadangan',
      'Senter & peluit (fue) untuk memanggil bantuan jika tertimbun'
    ]
  },
  {
    id: 'b-6',
    kanji: '安否確認 / 災害用伝言ダイヤル (171)',
    furigana: 'あんぴかくにん / さいがいようでんごんだいやる',
    romaji: 'Anpi Kakunin / Saigai-yō Dengon Daiyaru (171)',
    level: 'Penting 📞',
    meaning: 'Konfirmasi Keselamatan Jiwa & Hotline Pesan Darurat 171',
    explanation: 'Saat bencana besar, jaringan telepon seluler biasa biasanya dibatasi agar tidak kolaps. Tekan 171 untuk merekam atau mendengarkan rekaman suara pesan keselamatan keluarga dengan memasukkan nomor telepon rumah.',
    yasashiiNihongo: '家族（かぞく）や 友だちが 無事（ぶじ）か どうか、たしかめる ことです。でんわが つながらない ときは「171」を つかいます。',
    actionSteps: [
      'Gunakan Wi-Fi gratis darurat Jepang ber-SSID: "00000JAPAN" (Five Zero Japan)',
      'Gunakan fitur Safety Check di media sosial'
    ]
  }
];

export const yasashiiNihongoPairs = [
  {
    id: 'yn-1',
    topic: 'Evakuasi Tsunami',
    formalNHK: '直ちに高台または津波避難ビルへ避難してください。',
    formalReading: 'ただちにたかだいまたはつなみひなんびるへひなんしてください。',
    yasashii: '今すぐ、高い ところへ にげてください！',
    meaning: 'Segera mengungsi ke tempat yang tinggi!',
    keyDifferences: '「直ちに」➔「今すぐ」, 「高台へ避難」➔「高いところへにげて」'
  },
  {
    id: 'yn-2',
    topic: 'Bahaya Gempa Susulan',
    formalNHK: '今後も同程度の余震に厳重に警戒してください。',
    formalReading: 'こんごもどうていどのよしんにげんじゅうにけいかいしてください。',
    yasashii: 'これから先も、同じくらいの 大きな 地震に 気をつけて ください。',
    meaning: 'Ke depannya tetap waspadalah terhadap gempa susulan berkekuatan serupa.',
    keyDifferences: '「余震」➔「あとから来る地震」, 「警戒」➔「気をつけて」'
  },
  {
    id: 'yn-3',
    topic: 'Terjadinya Kebakaran',
    formalNHK: '近隣で火災が発生しています。煙を吸わないよう移動してください。',
    formalReading: 'きんりんでかさいがはっせいしています。けむりをすわないよういどうしてください。',
    yasashii: '近くで 火事（かじ）が おきて います。けむりを すわないように、にげて ください。',
    meaning: 'Terjadi kebakaran di dekat sini. Menyingkirlah agar tidak menghirup asap.',
    keyDifferences: '「火災が発生」➔「火事がおきている」, 「移動」➔「にげて」'
  },
  {
    id: 'yn-4',
    topic: 'Pembagian Bantuan Air Bersih',
    formalNHK: '給水車が市役所前広場に配備されました。',
    formalReading: 'きゅうすいしゃがしやくしょまえひろばにはいびされました。',
    yasashii: '水（みず）を くばる 車（くるま）が、市役所（しやくしょ）の 前（まえ）に 来（き）ました。',
    meaning: 'Mobil tangki pembagian air bersih telah tiba di depan kantor balai kota.',
    keyDifferences: '「給水車」➔「水をくばる車」, 「配備されました」➔「来ました」'
  },
  {
    id: 'yn-5',
    topic: 'Warga yang Tidak Bisa Pulang',
    formalNHK: '交通機関の運休に伴い、帰宅困難者は指定の一時滞在施設へ誘導されます。',
    formalReading: 'こうつうきかんのうんきゅうにともない、きたくこんなんしゃはしていのいちじたいざいしせつへゆうどうされます。',
    yasashii: '電車が 動かないため、家に 帰ることが できない 人は、決まった 安全な 建物（たてもの）へ 行って ください。',
    meaning: 'Karena kereta berhenti, orang yang tidak bisa pulang harap menuju fasilitas penampungan sementara yang aman.',
    keyDifferences: '「運休」➔「動かない」, 「帰宅困難者」➔「家に帰れない人」'
  }
];

export const bousaiRucksackChecklist = [
  { id: 'water', label: 'Air Minum (飲料水 - 2 Liter/hari)', essential: true },
  { id: 'food', label: 'Makanan Cepat Saji / Ransum Darurat (非常食 / カンパン)', essential: true },
  { id: 'light', label: 'Senter & Baterai Cadangan (懐中電灯・電池)', essential: true },
  { id: 'whistle', label: 'Peluit Penyelamat (ホイッスル - pemanggil bantuan jika terjebak)', essential: true },
  { id: 'powerbank', label: 'Powerbank Portabel HP (モバイルバッテリー)', essential: true },
  { id: 'firstaid', label: 'Obat Pribadi & Kotak P3K (救急箱・常備薬)', essential: true },
  { id: 'cash', label: 'Uang Tunai Koin 100¥ & 10¥ (Koin untuk telepon umum saat listrik padam)', essential: false },
  { id: 'passport', label: 'Salinan Paspor & Zairyu Card (パスポート・在留カードのコピー)', essential: true },
  { id: 'gloves', label: 'Sarung Tangan Tebal (軍手 - pelindung tangan dari pecahan kaca)', essential: false },
  { id: 'blanket', label: 'Selimut Aluminium Darurat (アルミブランケット - penahan dingin)', essential: false }
];

export const bousaiQuizData = [
  {
    id: 'bq-1',
    question: 'Saat alarm "Kinkyū Jishin Sokuhō" berbunyi nyaring di HP dan guncangan gempa mulai terasa, tindakan pertama yang PALING TEPAT adalah...',
    options: [
      'Segera lari keluar rumah menuruni tangga secepat mungkin',
      'Melindungi kepala di bawah meja kokoh dan menjauh dari kaca jendela',
      'Mengambil video smartphone untuk diunggah ke media sosial',
      'Membuka kulkas untuk menyelamatkan semua makanan'
    ],
    correctIdx: 1,
    explanation: 'Prinsip nomor satu: "身の安全" (Lindungi kepala). Banyak korban cedera saat gempa disebabkan oleh kejatuhan benda dari atas atau pecahan kaca jendela.'
  },
  {
    id: 'bq-2',
    question: 'Dalam siaran darurat bahasa Jepang sederhana (Yasashii Nihongo), kalimat resmi "高台へ避難してください" diubah menjadi...',
    options: [
      '海へ行ってください (Pergilah ke laut)',
      '高いところへ にげてください (Larilah ke tempat yang tinggi)',
      '部屋で寝てください (Tidurlah di kamar)',
      '車を運転してください (Kendarailah mobil)'
    ],
    correctIdx: 1,
    explanation: 'Kata sulit "高台 (Takadai)" diganti menjadi "高いところ (Tempat tinggi)", dan kata "避難 (Hinan)" diganti kata kerja dasar "にげて (Larilah/mengungsi)".'
  },
  {
    id: 'bq-3',
    question: 'Apa nama jaringan Wi-Fi darurat gratis terpadu di seluruh Jepang yang otomatis dibuka untuk publik saat terjadi bencana besar?',
    options: [
      'JAPAN_FREE_WIFI',
      '00000JAPAN (Five Zero Japan)',
      'SHINDO_EMERGENCY',
      'DISASTER_HOTSPOT_777'
    ],
    correctIdx: 1,
    explanation: 'Semua operator telekomunikasi utama di Jepang (NTT, KDDI, SoftBank) akan serentak membuka jaringan hotspot gratis darurat dengan SSID "00000JAPAN".'
  },
  {
    id: 'bq-4',
    question: 'Berapa nomor telepon darurat "Saigai-yō Dengon Daiyaru" untuk menitipkan dan mendengarkan pesan suara keselamatan keluarga saat saluran telepon reguler sibuk?',
    options: [
      '110 (Polisi)',
      '119 (Ambulans/Damkar)',
      '171 (Pesan Suara Bencana)',
      '104 (Penerangan Nomor)'
    ],
    correctIdx: 2,
    explanation: 'Nomor 171 (dibaca "Inai" = tidak ada korban) adalah layanan hotline pesan suara darurat bencana nasional yang disediakan NTT.'
  }
];
