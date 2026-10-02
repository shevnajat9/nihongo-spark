// Database Latihan Shadowing (シャドーイング) untuk Tingkat N5, N4, N3
// Mencakup situasi percakapan harian, konbini, restoran, stasiun, hingga kantor/bisnis.

export const shadowingData = [
  // N5 - DASAR & SITUASI HARIAN
  {
    id: 'sh-n5-01',
    level: 'N5',
    category: 'Situasi Harian',
    title: 'Pemesanan di Kafe (カフェでの注文)',
    description: 'Percakapan standar memesan kopi dan makanan ringan di kafe Jepang.',
    difficulty: 'Mudah',
    lines: [
      {
        speaker: '店員 (Pelayan)',
        japanese: 'いらっしゃいませ。ご注文はお決まりですか。',
        reading: 'いらっしゃいませ。ごちゅうもんは おきまりですか。',
        romaji: 'Irasshaimase. Gochuumon wa okimari desu ka.',
        indonesian: 'Selamat datang. Apakah pesanannya sudah ditentukan?',
        pitchHint: 'Heiban (Datar lembut)',
        pauseMs: 800
      },
      {
        speaker: 'あなた (Kamu)',
        japanese: 'アイスコーヒーを一つと、チーズケーキをお願いします。',
        reading: 'アイスコーヒーを ひとつと、チーズケーキを おねがいします。',
        romaji: 'Aisu koohii o hitotsu to, chiizukeeki o onegaishimasu.',
        indonesian: 'Tolong es kopi satu dan kue keju satu.',
        pitchHint: 'Naik di hitotsu, turun di onegaishimasu',
        pauseMs: 900
      },
      {
        speaker: '店員 (Pelayan)',
        japanese: 'かしこまりました。店内でお召し上がりですか。',
        reading: 'かしこまりました。てんないで おめしあがりですか。',
        romaji: 'Kashikomarimashita. Tennai de omeshitsugari desu ka.',
        indonesian: 'Baik, dipahami. Apakah makan di tempat?',
        pitchHint: 'Nada sopan keigo standar',
        pauseMs: 800
      },
      {
        speaker: 'あなた (Kamu)',
        japanese: 'はい、ここで食べます。',
        reading: 'はい、ここで たべます。',
        romaji: 'Hai, koko de tabemasu.',
        indonesian: 'Ya, saya makan di sini.',
        pitchHint: 'Tegas dan ramah',
        pauseMs: 600
      }
    ]
  },
  {
    id: 'sh-n5-02',
    level: 'N5',
    category: 'Konbini',
    title: 'Belanja di Minimarket (コンビニでの買い物)',
    description: 'Menanggapi pertanyaan kasir konbini mengenai kantong plastik dan struk.',
    difficulty: 'Mudah',
    lines: [
      {
        speaker: '店員 (Kasir)',
        japanese: '袋にお入れしますか。',
        reading: 'ふくろに おいれしますか。',
        romaji: 'Fukuro ni oire shimasu ka.',
        indonesian: 'Apakah dimasukkan ke dalam kantong plastik?',
        pitchHint: 'Intonasi naik di akhir (ka?)',
        pauseMs: 700
      },
      {
        speaker: 'あなた (Kamu)',
        japanese: 'いえ、袋は大丈夫です。そのままお願いします。',
        reading: 'いえ、ふくろは だいじょうぶです。そのまま おねがいします。',
        romaji: 'Ie, fukuro wa daijoubu desu. Sonomama onegaishimasu.',
        indonesian: 'Tidak usah, kantong tidak perlu. Tolong biarkan begitu saja.',
        pitchHint: 'Datar sopan (Daijoubu = tidak perlu/cukup)',
        pauseMs: 850
      },
      {
        speaker: '店員 (Kasir)',
        japanese: 'お弁当温めますか。',
        reading: 'おべんとう あたためますか。',
        romaji: 'Obentou atatamemasu ka.',
        indonesian: 'Apakah bento-nya mau dihangatkan?',
        pitchHint: 'Pola intonasi cepat kasir',
        pauseMs: 700
      },
      {
        speaker: 'あなた (Kamu)',
        japanese: 'はい、温めてください。レシートもお願いします。',
        reading: 'はい、あたためてください。レシートも おねがいします。',
        romaji: 'Hai, atatamete kudasai. Reshiito mo onegaishimasu.',
        indonesian: 'Ya, tolong panaskan. Tolong struknya juga ya.',
        pitchHint: 'Ramah dan natural',
        pauseMs: 800
      }
    ]
  },
  {
    id: 'sh-n5-03',
    level: 'N5',
    category: 'Jalan & Transportasi',
    title: 'Menanyakan Jalan ke Stasiun (駅への道を聞く)',
    description: 'Menanyakan arah jalan ke orang sekitar di Tokyo dengan sopan.',
    difficulty: 'Mudah',
    lines: [
      {
        speaker: 'あなた (Kamu)',
        japanese: 'すみません、渋谷駅はどちらですか。',
        reading: 'すみません、しぶやえきは どちらですか。',
        romaji: 'Sumimasen, Shibuya-eki wa dochira desu ka.',
        indonesian: 'Permisi, stasiun Shibuya sebelah mana ya?',
        pitchHint: 'Sumimasen mengalun lembut',
        pauseMs: 800
      },
      {
        speaker: '通りすがりの人 (Pejalan Kaki)',
        japanese: 'あそこの角を右に曲がって、まっすぐ行くと見えますよ。',
        reading: 'あそこの かどを みぎに まがって、まっすぐ いくと みえますよ。',
        romaji: 'Asoko no kado o migi ni magatte, massugu iku to miemasu yo.',
        indonesian: 'Belok kanan di sudut sana, lalu kalau jalan lurus akan kelihatan.',
        pitchHint: 'Aksentuasi di magatte dan massugu',
        pauseMs: 1000
      },
      {
        speaker: 'あなた (Kamu)',
        japanese: '角を右ですね。ありがとうございます！助かりました。',
        reading: 'かどを みぎですね。ありがとうございます！たすかりました。',
        romaji: 'Kado o migi desu ne. Arigatou gozaimasu! Tasakarimashita.',
        indonesian: 'Sudut belok kanan ya. Terima kasih banyak! Sangat terbantu.',
        pitchHint: 'Berterima kasih dengan hangat',
        pauseMs: 850
      }
    ]
  },

  // N4 - PERCAKAPAN DINAMIS & RENCANA
  {
    id: 'sh-n4-01',
    level: 'N4',
    category: 'Janji Temu',
    title: 'Mengajak Teman di Akhir Pekan (週末の誘い)',
    description: 'Mengajak teman nonton film dan mencocokkan jadwal akhir pekan.',
    difficulty: 'Menengah',
    lines: [
      {
        speaker: 'ケン (Ken)',
        japanese: '今週の日曜日、何か予定ある？もしよかったら映画でも見に行かない？',
        reading: 'こんしゅうの にちようび、なにか よてい ある？もし よかったら えいがでも みに いかない？',
        romaji: 'Konshuu no nichiyoubi, nanika yotei aru? Moshi yokattara eiga demo mi ni ikanai?',
        indonesian: 'Hari Minggu ini ada rencana? Kalau kamu senggang mau pergi nonton film bareng?',
        pitchHint: 'Santai khas teman akrab (Tameguchi)',
        pauseMs: 1100
      },
      {
        speaker: 'あなた (Kamu)',
        japanese: 'いいね！ちょうど気になっていたアニメ映画があるんだ。何時に待ち合わせる？',
        reading: 'いいね！ちょうど きになっていた アニメえいがが あるんだ。なんじに まちあわせる？',
        romaji: 'Ii ne! Choudo ki ni natte ita anime eiga ga arunda. Nanji ni machiawaseru?',
        indonesian: 'Boleh banget! Pas banget ada film anime yang bikin aku penasaran. Jam berapa kumpulnya?',
        pitchHint: 'Semangat bernada positif',
        pauseMs: 1100
      },
      {
        speaker: 'ケン (Ken)',
        japanese: 'じゃあ、駅前のハチ公前広場に午後２時でどう？',
        reading: 'じゃあ、えきまえの ハチこうまえ ひろばに ごご にじで どう？',
        romaji: 'Jaa, ekimae no Hachikou-mae hiroba ni gogo niji de dou?',
        indonesian: 'Kalau begitu, bagaimana kalau jam 2 siang di alun-alun depan Hachiko depan stasiun?',
        pitchHint: 'Tawaran bersahabat',
        pauseMs: 900
      },
      {
        speaker: 'あなた (Kamu)',
        japanese: '了解！遅れないように行くね。楽しみにしてるよ！',
        reading: 'りょうかい！お理论れないように いくね。たのしみに してるよ！',
        romaji: 'Ryoukai! Okurenai you ni iku ne. Tanoshimi ni shiteru yo!',
        indonesian: 'Siap! Aku bakal usahakan jangan sampai telat. Ga sabar nih!',
        pitchHint: 'Ryoukai tegas gembira',
        pauseMs: 900
      }
    ]
  },
  {
    id: 'sh-n4-02',
    level: 'N4',
    category: 'Kesehatan & Izin',
    title: 'Izin Sakit ke Kantor/Sekolah (体調不良の連絡)',
    description: 'Menghubungi atasan atau guru untuk mengabarkan demam dan memohon izin istirahat.',
    difficulty: 'Menengah',
    lines: [
      {
        speaker: 'あなた (Kamu)',
        japanese: 'おはようございます。実はお昨晩から高熱が出てしまいまして。',
        reading: 'おはようございます。じつは さくばんから こうねつが でてしまいまして。',
        romaji: 'Ohayou gozaimasu. Jitsu wa sakuban kara kounetsu ga dete shimaimashite.',
        indonesian: 'Selamat pagi. Sebenarnya sejak tadi malam saya mengalami demam tinggi.',
        pitchHint: 'Sopan dan bernada lemah lembut',
        pauseMs: 1000
      },
      {
        speaker: '部長 (Manajer)',
        japanese: 'それは大変ですね。病院にはもう行きましたか。',
        reading: 'それは たいへんですね。びょういんには もう いきましたか。',
        romaji: 'Sore wa taihen desu ne. Byouin ni wa mou ikimashita ka.',
        indonesian: 'Wah gawat sekali ya. Apakah sudah pergi ke rumah sakit?',
        pitchHint: 'Perhatian dan prihatin',
        pauseMs: 800
      },
      {
        speaker: 'あなた (Kamu)',
        japanese: '今から受診してまいります。大変申し訳ありませんが、本日は休ませていただけますでしょうか。',
        reading: 'いまから じゅしんしてまいります。たいへん もうしわけありませんが、ほんじつは やすませて いただけますでしょうか。',
        romaji: 'Ima kara jushin shite mairimasu. Taihen moushiwake arimasen ga, honjitsu wa yasumasete itadakemasu deshou ka.',
        indonesian: 'Saya akan ke dokter sekarang. Mohon maaf sebesar-besarnya, apakah hari ini saya diizinkan beristirahat?',
        pitchHint: 'Pola keigo baku izin permohonan',
        pauseMs: 1200
      },
      {
        speaker: '部長 (Manajer)',
        japanese: '仕事のことは心配しなくていいですから、しっかり休んで治してください。',
        reading: 'しごとのことは しんぱいしなくて いいですから、しっかり やすんで なおしてください。',
        romaji: 'Shigoto no koto wa shinpai shinakute ii desu kara, shikkari yasunde naoshite kudasai.',
        indonesian: 'Masalah pekerjaan tidak perlu dikhawatirkan, istirahatlah dengan baik sampai pulih.',
        pitchHint: 'Menenangkan bawahan',
        pauseMs: 1000
      }
    ]
  },

  // N3 - BISNIS, OPINI & PERCAKAPAN NATURAL
  {
    id: 'sh-n3-01',
    level: 'N3',
    category: 'Bisnis & Telepon',
    title: 'Menerima Telepon Bisnis (ビジネス電話の対応)',
    description: 'Etiket telepon kantor Jepang: menyapa rekan bisnis, menyambungkan panggilan, atau mencatat pesan.',
    difficulty: 'Tinggi',
    lines: [
      {
        speaker: 'あなた (Resepsionis)',
        japanese: 'お電話ありがとうございます。株式会社スパークの田中と申します。',
        reading: 'おでんわ ありがとうございます。かぶしきがいしゃ スパークの たなかと もうします。',
        romaji: 'Odenwa arigatou gozaimasu. Kabushikigaisha Supaaku no Tanaka to moushimasu.',
        indonesian: 'Terima kasih telah menelepon. Dengan Tanaka dari PT Spark.',
        pitchHint: 'Kenjougo (merendah santun)',
        pauseMs: 1100
      },
      {
        speaker: '取引先 (Klien)',
        japanese: 'いつも大変お世話になっております。ABC商事の佐藤でございます。営業部の山田様はいらっしゃいますでしょうか。',
        reading: 'いつも たいへん おせわになっております。ABCしょうじの さとうで ございます。えいぎょうぶの やまださまは いらっしゃいますでしょうか。',
        romaji: 'Itsumo taihen osewa ni natte orimasu. ABC Shouji no Satou de gozaimasu. Eigyoubu no Yamada-sama wa irasshaimasu deshou ka.',
        indonesian: 'Selalu terima kasih atas kerja samanya yang baik. Saya Sato dari ABC Trading. Apakah Bapak Yamada dari divisi sales ada di tempat?',
        pitchHint: 'Sonkeigo (menghormati lawan bicara)',
        pauseMs: 1400
      },
      {
        speaker: 'あなた (Resepsionis)',
        japanese: '佐藤様、いつもお世話になっております。あいにく山田はただいま会議中でございまして、１５時頃には戻る予定です。',
        reading: 'さとうさま、いつも おせわになっております。あいにく やまだは ただいま かいぎちゅうで ございまして、じゅうごじごろには もどる よていです。',
        romaji: 'Satou-sama, itsumo osewa ni natte orimasu. Ainiku Yamada wa tadaima kaigichuu de gozaimashite, juugoji goro ni wa modoru yotei desu.',
        indonesian: 'Bapak Sato, terima kasih atas kerja samanya. Sayang sekali saat ini Bapak Yamada sedang rapat, dan dijadwalkan kembali sekitar jam 3 sore.',
        pitchHint: 'Penyebutan nama kolega sendiri tanpa san/sama',
        pauseMs: 1400
      },
      {
        speaker: 'あなた (Resepsionis)',
        japanese: '戻り次第、こちらから折り返しお電話させましょうか。',
        reading: 'もどりしだい、こちらから おりかえし おでんわ させましょうか。',
        romaji: 'Modori shidai, kochira kara orikaeshi odenwa sasemashou ka.',
        indonesian: 'Begitu beliau kembali, apakah perlu kami hubungi kembali telepon Bapak?',
        pitchHint: 'Tawaran inisiatif sopan',
        pauseMs: 1000
      }
    ]
  },
  {
    id: 'sh-n3-02',
    level: 'N3',
    category: 'Rapat & Diskusi',
    title: 'Menyampaikan Pendapat dalam Rapat (会議での意見提示)',
    description: 'Menyampaikan opini kritis secara konstruktif dan sopan tanpa menyinggung peserta lain.',
    difficulty: 'Tinggi',
    lines: [
      {
        speaker: 'あなた (Kamu)',
        japanese: 'ちょっとよろしいでしょうか。佐藤さんのご意見には基本的に賛成なのですが、納期に関して少し懸念があります。',
        reading: 'ちょっと よろしいでしょうか。さとうさんの ごいけんには きほんてきに さんせいなのですが、のうきに かんして すこし けねんが あります。',
        romaji: 'Chotto yoroshii deshou ka. Satou-san no go-iken ni wa kihonteki ni sansei na no desu ga, nouki ni kanshite sukoshi kenen ga arimasu.',
        indonesian: 'Bolehkah saya menyampaikan sepatah kata? Pada dasarnya saya setuju dengan pendapat Pak Sato, namun saya ada sedikit kekhawatiran terkait tenggat pengiriman (lead time).',
        pitchHint: 'Menggunakan buffer perkataan (Kushon Kotoba)',
        pauseMs: 1400
      },
      {
        speaker: '議長 (Pimpinan Rapat)',
        japanese: '具体的にはどのような懸念でしょうか。',
        reading: 'ぐたいてきには どのような けねんでしょうか。',
        romaji: 'Gutaiteki ni wa dono you na kenen deshou ka.',
        indonesian: 'Secara spesifik kekhawatiran seperti apa?',
        pitchHint: 'Fokus ingin tahu fakta',
        pauseMs: 800
      },
      {
        speaker: 'あなた (Kamu)',
        japanese: '現在の開発ペースを考慮しますと、品質テストの期間をもう一週間確保したほうが安全ではないかと考えております。',
        reading: 'げんざいの かいはつペースを こうりょしますと、ひんしつテストの きかんを もう いっしゅうかん かくほしたほうが あんぜんではないかと かんがえております。',
        romaji: 'Genzai no kaihatsu peesu o kouryo shimasu to, hinshitsu tesuto no kikan o mou isshuukan kakuho shita hou ga anzen dewa nai ka to kangaete orimasu.',
        indonesian: 'Jika mempertimbangkan kecepatan pengembangan saat ini, kami berpikir akan jauh lebih aman jika kita mengamankan waktu tambahan satu minggu untuk pengujian kualitas.',
        pitchHint: 'Pola anzen dewa nai ka (saran persuasif)',
        pauseMs: 1500
      }
    ]
  }
];
