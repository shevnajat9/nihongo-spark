/**
 * Database Kontraksi Bahasa Lisan Jepang (口語短縮形 / Kougo Tankushukukei)
 * Berisi pola-pola singkatan gramatikal yang sangat umum dalam percakapan sehari-hari, anime, drama, dan listening ujian JLPT.
 */

export const casualSpeechRules = [
  {
    id: 'toku',
    title: '〜ておく ➔ 〜とく',
    pastTitle: '〜ておいた ➔ 〜といた',
    volitionalTitle: '〜ておこう ➔ 〜とこう',
    pattern: '〜ておく ➔ 〜とく (atau 〜どく jika bunyinya で)',
    category: 'Persiapan / Preparatory Action',
    explanation: 'Singkatan dari "melakukan sesuatu terlebih dahulu sebagai persiapan". Jika verba berakhiran 〜でおく (seperti 飲んでおく), maka disingkat menjadi 〜どく (飲んどく).',
    nuance: 'Sangat sering digunakan saat berbelanja, memesan tempat, atau mengingatkan teman.',
    examples: [
      {
        formal: '買っておきます。',
        casual: '買っとく。',
        formalPast: '買っておきました。',
        casualPast: '買っといた。',
        romajiFormal: 'Katte okimasu.',
        romajiCasual: 'Kattoku.',
        meaning: 'Saya beli duluan (sebagai persiapan).',
        situation: 'Menyiapkan camilan sebelum pesta dimulai.'
      },
      {
        formal: '席を予約しておきました。',
        casual: '席、予約しといたよ。',
        formalPast: '予約しておきました。',
        casualPast: '予約しといた。',
        romajiFormal: 'Seki o yoyaku shite okimashita.',
        romajiCasual: 'Seki, yoyaku shitoida yo.',
        meaning: 'Aku sudah pesankan meja/kursi duluan.',
        situation: 'Tiba di restoran lebih awal.'
      },
      {
        formal: '冷蔵庫で冷やしておいてください。',
        casual: '冷蔵庫で冷やしといて。',
        formalPast: '冷やしておいた。',
        casualPast: '冷やしといた。',
        romajiFormal: 'Reizouko de hiyashite oite kudasai.',
        romajiCasual: 'Reizouko de hiyashitoite.',
        meaning: 'Tolong dinginkan duluan di kulkas ya.',
        situation: 'Menaruh puding atau minuman kaleng.'
      },
      {
        formal: '薬を飲んでおきます。',
        casual: '薬、飲んどくね。',
        formalPast: '飲んでおいた。',
        casualPast: '飲んどいた。',
        romajiFormal: 'Kusuri o nonde okimasu.',
        romajiCasual: 'Kusuri, nondoku ne.',
        meaning: 'Aku minum obat dulu ya (pencegahan).',
        situation: 'Sebelum bepergian naik kapal/pesawat.'
      }
    ]
  },
  {
    id: 'chau',
    title: '〜てしまう ➔ 〜ちゃう / 〜じゃう',
    pastTitle: '〜てしまった ➔ 〜ちゃった / 〜じゃった',
    volitionalTitle: '〜てしまおう ➔ 〜ちゃおう',
    pattern: '〜てしまう ➔ 〜ちゃう (atau 〜じゃう jika bunyinya で)',
    category: 'Penyesalan / Ketidaksengajaan / Tuntas',
    explanation: 'Mengungkapkan tindakan yang tuntas sepenuhnya atau ketidaksengajaan yang disesali. Bentuk 〜でしまう berubah menjadi 〜じゃう (contoh: 飲んじゃう, 死んじゃう).',
    nuance: 'Salah satu kontraksi terpopuler dalam anime dan drama untuk ekspresi kecerobohan atau penyesalan imut.',
    examples: [
      {
        formal: '宿題を忘れてしまいました。',
        casual: '宿題、忘れちゃった！',
        formalPast: '忘れてしまいました。',
        casualPast: '忘れちゃった。',
        romajiFormal: 'Shukudai o wasurete shimaimashita.',
        romajiCasual: 'Shukudai, wasurechatta!',
        meaning: 'Aduh, PR-ku ketinggalan/terlupakan!',
        situation: 'Panik di kelas saat guru meminta buku PR.'
      },
      {
        formal: 'ケーキを全部食べてしまいました。',
        casual: 'ケーキ全部食べちゃった。',
        formalPast: '食べてしまいました。',
        casualPast: '食べちゃった。',
        romajiFormal: 'Keeki o zenbu tabete shimaimashita.',
        romajiCasual: 'Keeki zenbu tabechatta.',
        meaning: 'Aku sudah habiskan kuenya semua (menyesal/mengaku).',
        situation: 'Saat ditanya oleh adik ke mana kuenya.'
      },
      {
        formal: '電車の中で寝てしまいました。',
        casual: '電車で寝ちゃった。',
        formalPast: '寝てしまいました。',
        casualPast: '寝ちゃった。',
        romajiFormal: 'Densha no naka de nete shimaimashita.',
        romajiCasual: 'Densha de nechatta.',
        meaning: 'Aku ketiduran di dalam kereta.',
        situation: 'Hampir terlewat stasiun tujuan.'
      },
      {
        formal: '全部飲んでしまいました。',
        casual: '全部飲んじゃった。',
        formalPast: '飲んでしまいました。',
        casualPast: '飲んじゃった。',
        romajiFormal: 'Zenbu nonde shimaimashita.',
        romajiCasual: 'Zenbu nonjatta.',
        meaning: 'Sudah terminum habis semua.',
        situation: 'Mengakui jusnya sudah tandas.'
      }
    ]
  },
  {
    id: 'nakya',
    title: '〜なければならない ➔ 〜なきゃ / 〜なくちゃ',
    pastTitle: '〜なければならなかった ➔ 〜なきゃいけなかった',
    volitionalTitle: '',
    pattern: '〜なければならない ➔ 〜なきゃ / 〜なくちゃ',
    category: 'Kewajiban / Keharusan Kasual',
    explanation: 'Pemendekan dari rasa kewajiban "harus melakukan...". 〜なきゃ adalah singkatan dari 〜なければ, sedangkan 〜なくちゃ adalah singkatan dari 〜なくては (sering bernuansa ramah/sedikit feminin).',
    nuance: 'Sangat sering diucapkan sendiri saat terburu-buru mengejar waktu (misal: "Ikanakya!").',
    examples: [
      {
        formal: 'もう行かなければなりません。',
        casual: 'もう行かなきゃ！',
        formalPast: '行かなければなりませんでした。',
        casualPast: '行かなきゃダメだった。',
        romajiFormal: 'Mou ikanakereba narimasen.',
        romajiCasual: 'Mou ikanakya!',
        meaning: 'Sudah harus pergi sekarang!',
        situation: 'Melihat jam tangan saat pamit dari pertemuan.'
      },
      {
        formal: '早く起きなければなりません。',
        casual: '明日早く起きなくちゃ。',
        formalPast: '起きなければなりませんでした。',
        casualPast: '起きなきゃいけなかった。',
        romajiFormal: 'Hayaku okinakereba narimasen.',
        romajiCasual: 'Ashita hayaku okinakucha.',
        meaning: 'Besok harus bangun pagi-pagi.',
        situation: 'Menyetel alarm sebelum tidur malam.'
      },
      {
        formal: '今日中にレポートを出さなければなりません。',
        casual: '今日中にレポート出さなきゃ。',
        formalPast: '出さなければならなかった。',
        casualPast: '出さなきゃヤバかった。',
        romajiFormal: 'Kyoujuu ni repooto o dasanakereba narimasen.',
        romajiCasual: 'Kyoujuu ni repooto dasanakya.',
        meaning: 'Hari ini harus mengumpulkan laporan.',
        situation: 'Tenggat waktu tugas kuliah/kantor.'
      }
    ]
  },
  {
    id: 'teru',
    title: '〜ている ➔ 〜てる / 〜でる',
    pastTitle: '〜ていた ➔ 〜てた',
    volitionalTitle: '',
    pattern: '〜ている ➔ 〜てる (penghilangan vokal い)',
    category: 'Status Berkelanjutan / Kondisi',
    explanation: 'Dalam bahasa lisan cepat, vokal "i" pada 〜te iru hampir selalu ditelan. Bentuk lampaunya 〜te ita berubah menjadi 〜teta.',
    nuance: 'Digunakan oleh hampir 100% penutur asli dalam percakapan santai.',
    examples: [
      {
        formal: 'その映画を知っていますか？',
        casual: 'その映画知ってる？',
        formalPast: '知っていました。',
        casualPast: '知ってたよ。',
        romajiFormal: 'Sono eiga o shitte imasu ka?',
        romajiCasual: 'Sono eiga shitteru?',
        meaning: 'Kamu tahu/pernah nonton film itu?',
        situation: 'Mengobrol santai tentang bioskop.'
      },
      {
        formal: '今、何をしていますか？',
        casual: '今、何してんの？ / 何してる？',
        formalPast: '何をしていましたか？',
        casualPast: '何してたの？',
        romajiFormal: 'Ima, nani o shite imasu ka?',
        romajiCasual: 'Ima, nani shiten no? / Nani shiteru?',
        meaning: 'Lagi ngapain sekarang?',
        situation: 'Mengirim chat teks singkat via LINE.'
      },
      {
        formal: '雨が降っています。',
        casual: '雨降ってるよ。',
        formalPast: '雨が降っていました。',
        casualPast: '雨降ってた。',
        romajiFormal: 'Ame ga futte imasu.',
        romajiCasual: 'Ame futteru yo.',
        meaning: 'Di luar lagi hujan lho.',
        situation: 'Mengingatkan teman untuk membawa payung.'
      }
    ]
  },
  {
    id: 'chadame',
    title: '〜てはいけない ➔ 〜ちゃだめ / 〜ちゃいけない',
    pastTitle: '',
    volitionalTitle: '',
    pattern: '〜てはいけない ➔ 〜ちゃだめ (atau 〜じゃだめ jika bunyinya で)',
    category: 'Larangan Kasual',
    explanation: 'Partikel "te wa" menyatu menjadi "cha". Jika kalimat bernada ではいけない (seperti 飲んではいけない), menjadi じゃだめ (nonja dame).',
    nuance: 'Sangat sering diucapkan oleh orang tua kepada anak, atau antar sahabat akrab.',
    examples: [
      {
        formal: 'ここで写真を撮ってはいけません。',
        casual: 'ここで写真撮っちゃだめだよ。',
        formalPast: '',
        casualPast: '',
        romajiFormal: 'Koko de shashin o totte wa ikemasen.',
        romajiCasual: 'Koko de shashin toccha dame da yo.',
        meaning: 'Tidak boleh ambil foto di sini ya.',
        situation: 'Di dalam museum atau teater.'
      },
      {
        formal: '諦めてはいけません。',
        casual: '諦めちゃだめだ！',
        formalPast: '',
        casualPast: '',
        romajiFormal: 'Akiramete wa ikemasen.',
        romajiCasual: 'Akiramecha dame da!',
        meaning: 'Jangan menyerah!',
        situation: 'Menyemangati teman sebelum bertanding.'
      },
      {
        formal: 'まだ触ってはいけません。',
        casual: 'まだ触っちゃいけないよ。',
        formalPast: '',
        casualPast: '',
        romajiFormal: 'Mada sawatte wa ikemasen.',
        romajiCasual: 'Mada sawaccha ikenai yo.',
        meaning: 'Belum boleh disentuh ya (masih panas/basah).',
        situation: 'Panci yang baru mendidih.'
      }
    ]
  },
  {
    id: 'teiku',
    title: '〜ていく ➔ 〜てく',
    pastTitle: '〜ていった ➔ 〜てった',
    volitionalTitle: '',
    pattern: '〜ていく ➔ 〜てく',
    category: 'Arah Gerak / Menuju ke Depan',
    explanation: 'Vokal "i" pada kata kerja bantu iku dihilangkan menjadi -teku atau -tetta.',
    nuance: 'Sering dipakai saat pergi membawa sesuatu (tsureteku, motteku).',
    examples: [
      {
        formal: '傘を持っていきます。',
        casual: '傘、持ってくね。',
        formalPast: '持っていきました。',
        casualPast: '持ってった。',
        romajiFormal: 'Kasa o motte ikimasu.',
        romajiCasual: 'Kasa, motteku ne.',
        meaning: 'Aku bawa payung ya.',
        situation: 'Pamit dari rumah saat mendung.'
      },
      {
        formal: '一緒についていきます。',
        casual: '一緒についてく！',
        formalPast: 'ついていきました。',
        casualPast: 'ついてった。',
        romajiFormal: 'Issho ni tsuite ikimasu.',
        romajiCasual: 'Issho ni tsuiteku!',
        meaning: 'Aku ikut pergi bareng!',
        situation: 'Mengikuti teman ke toserba konbini.'
      }
    ]
  }
];

// Interactive quiz bank for casual speech
export const casualQuizData = [
  {
    id: 'cq-1',
    casualSentence: 'もう時間ないから、早く行かなきゃ！',
    romaji: 'Mou jikan nai kara, hayaku ikanakya!',
    audioText: 'もう時間ないから、早く行かなきゃ！',
    question: 'Bentuk baku/formal dari kalimat di atas adalah...',
    options: [
      'もう時間がないので、早く行かなければなりません。',
      'もう時間がないので、早く行っておきます。',
      'もう時間がないので、早く行ってしまいました。',
      'もう時間がないので、早く行ってはいけません。'
    ],
    correctIdx: 0,
    explanation: '「行かなきゃ」 adalah kontraksi kasual dari 「行かなければなりません」 (harus pergi).'
  },
  {
    id: 'cq-2',
    casualSentence: 'あ、やばい！スマホ家に忘れちゃった！',
    romaji: 'A, yabai! Sumaho ie ni wasurechatta!',
    audioText: 'あ、やばい！スマホ家に忘れちゃった！',
    question: 'Bentuk baku/formal dari kalimat di atas adalah...',
    options: [
      'あ、大変です！スマホを家に忘れておきました。',
      'あ、大変です！スマホを家に忘れてしまいました。',
      'あ、大変です！スマホを家に忘れてはいけません。',
      'あ、大変です！スマホを家に忘れていきます。'
    ],
    correctIdx: 1,
    explanation: '「忘れちゃった」 adalah kontraksi dari 「忘れてしまいました」 (tanpa sengaja ketinggalan/terlupakan).'
  },
  {
    id: 'cq-3',
    casualSentence: 'パーティーの飲み物、買っとくね。',
    romaji: 'Paatii no nomimono, kattoku ne.',
    audioText: 'パーティーの飲み物、買っとくね。',
    question: 'Bentuk baku/formal dari kalimat di atas adalah...',
    options: [
      'パーティーの飲み物を、買っています。',
      'パーティーの飲み物を、買ってはいけません。',
      'パーティーの飲み物を、買っておきますね。',
      'パーティーの飲み物を、買っていきます。'
    ],
    correctIdx: 2,
    explanation: '「買っとく」 adalah kontraksi dari 「買っておく」 (membeli lebih dulu sebagai persiapan).'
  },
  {
    id: 'cq-4',
    casualSentence: '山田さん、今何してるか知ってる？',
    romaji: 'Yamada-san, ima nani shiteru ka shitteru?',
    audioText: '山田さん、今何してるか知ってる？',
    question: 'Manakah bentuk formal baku kalimat di atas?',
    options: [
      '山田さんは今何をしていますか、知っていますか？',
      '山田さんは今何をしていませんか、知っていますか？',
      '山田さんは今何をしておきますか、知っていますか？',
      '山田さんは今何をしてしまいましたか、知っていますか？'
    ],
    correctIdx: 0,
    explanation: '「してる」「知ってる」 menghilangkan vokal "i" dari 「している」「知っている」.'
  },
  {
    id: 'cq-5',
    casualSentence: 'そんな危ないこと、絶対にしちゃだめ！',
    romaji: 'Sonna abunai koto, zettai ni shicha dame!',
    audioText: 'そんな危ないこと、絶対にしちゃだめ！',
    question: 'Bentuk baku/formal dari kalimat larangan di atas adalah...',
    options: [
      'そんな危ないことは、絶対にしなければなりません。',
      'そんな危ないことは、絶対にしてはいけません。',
      'そんな危ないことは、絶対にしてしまいます。',
      'そんな危ないことは、絶対にしておきます。'
    ],
    correctIdx: 1,
    explanation: '「しちゃだめ」 adalah kontraksi larangan dari 「してはいけません」 (tidak boleh dilakukan).'
  }
];
