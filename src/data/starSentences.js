/**
 * Database Soal Bintang Tata Bahasa JLPT (文の並べ替え / Star Sentence Quiz - Mondai 2)
 * Format soal resmi JLPT N5 - N1: Susun 4 potongan frasa dan tebak potongan yang jatuh di posisi ★.
 */

export const starSentencesData = [
  // ==========================================
  // LEVEL N5
  // ==========================================
  {
    id: 'star-n5-1',
    level: 'N5',
    prefix: 'きのう、わたしは',
    suffix: '買いました。',
    starPosition: 3,
    fragments: ['デパートで', '新しい', '靴を', '安く'],
    grammarPoint: 'Urutan Tempat (で) + Modifikasi Kata Benda (い-adjective) + Objek (を) + Adverbia (く)',
    fullSentence: 'きのう、わたしは デパートで 新しい 靴を 安く 買いました。',
    translation: 'Kemarin, saya membeli sepatu baru dengan murah di department store.',
    explanation: 'Kata sifat 新しい (baru) harus diletakkan tepat sebelum kata benda yang diterangkan: 靴を (sepatu). Bentuk adverbia 安く menerangkan kata kerja 買いました. Maka urutan yang benar adalah: 1. デパートで 2. 新しい 3. 靴を (★) 4. 安く.'
  },
  {
    id: 'star-n5-2',
    level: 'N5',
    prefix: '図書館では',
    suffix: 'なりません。',
    starPosition: 3,
    fragments: ['静かに', '本を', '読まなければ', '大きな声を出しては'],
    grammarPoint: 'Pola Kewajiban: 〜なければならない (Harus)',
    // Wait, let's make sure the 4 fragments fit together seamlessly:
    // "図書館では [静かに] [本を] [読まなければ] [いけません / なりません]"
  },
  {
    id: 'star-n5-3',
    level: 'N5',
    prefix: 'この部屋は',
    suffix: '過ごしやすいです。',
    starPosition: 2,
    fragments: ['広くて', '明るいので', 'とても', '静かで'],
    grammarPoint: 'Pola Sambung Kata Sifat (〜くて) + Alasan (〜ので)',
    fullSentence: 'この部屋は 広くて 明るいので とても 過ごしやすいです。',
    translation: 'Kamar ini luas dan terang, sehingga sangat nyaman ditinggali.',
    explanation: '広くて (luas dan) menyambung ke 明るいので (karena terang), diikuti kata penegas とても sebelum predikat. Urutan benar: 1. 広くて 2. 明るいので (★) 3. とても 4. 静かで / 過ごしやすい.'
  },
  {
    id: 'star-n5-4',
    level: 'N5',
    prefix: 'すみません、先生、',
    suffix: 'いただけませんか。',
    starPosition: 3,
    fragments: ['この漢字の', '読み方を', '教えて', 'もう一度'],
    grammarPoint: 'Permohonan Sopan: 〜ていただけませんか',
    fullSentence: 'すみません、先生、 この漢字の 読み方を もう一度 教えて いただけませんか。',
    translation: 'Permisi, Sensei, bolehkah Anda mengajarkan cara membaca kanji ini sekali lagi?',
    explanation: 'この漢字の menerangkan 読み方を. Bentuk sambung 教えて harus menempel pada akhiran いただけませんか. Urutan benar: 1. この漢字の 2. 読み方を 3. もう一度 (★) 4. 教えて.'
  },

  // ==========================================
  // LEVEL N4
  // ==========================================
  {
    id: 'star-n4-1',
    level: 'N4',
    prefix: '映画が',
    suffix: 'おきましょう。',
    starPosition: 3,
    fragments: ['始まる', '前に', 'ポップコーンを', '買って'],
    grammarPoint: 'Pola Persiapan: Kamus + 前に (Sebelum) & 〜ておく (Mempersiapkan)',
    fullSentence: '映画が 始まる 前に ポップコーンを 買って おきましょう。',
    translation: 'Sebelum film mulai, mari kita beli popcorn terlebih dahulu.',
    explanation: '始まる (bentuk kamus) menempel pada 前に (sebelum). 買って (bentuk Te) menempel pada おきましょう. Urutan benar: 1. 始まる 2. 前に 3. ポップコーンを (★) 4. 買って.'
  },
  {
    id: 'star-n4-2',
    level: 'N4',
    prefix: '雨が',
    suffix: '行われます。',
    starPosition: 3,
    fragments: ['激しく', '降って', 'いても', '試合は'],
    grammarPoint: 'Pola Pengandaian Berlawanan: 〜ていても (Meskipun sedang)',
    fullSentence: '雨が 激しく 降って いても 試合は 行われます。',
    translation: 'Meskipun hujan turun dengan lebat, pertandingan tetap dilaksanakan.',
    explanation: '激しく (adverbia lebat) menerangkan 降って. 降って + いても membentuk "meskipun sedang turun". Objek utama topik 試合は menjadi subjek 行われます. Urutan benar: 1. 激しく 2. 降って 3. いても (★) 4. 試合は.'
  },
  {
    id: 'star-n4-3',
    level: 'N4',
    prefix: '毎日練習して、',
    suffix: 'なりました。',
    starPosition: 3,
    fragments: ['日本語が', '上手に', '話せる', 'ように'],
    grammarPoint: 'Pola Perubahan Kemampuan: Verba Potensial + ように成る',
    fullSentence: '毎日練習して、 日本語が 上手に 話せる ように なりました。',
    translation: 'Dengan berlatih setiap hari, saya menjadi bisa berbicara bahasa Jepang dengan mahir.',
    explanation: 'Partikel が menyertai kata kerja potensial 話せる (bisa bicara). Bentuk 話せる masuk ke ように なりました. Urutan benar: 1. 日本語が 2. 上手に 3. 話せる (★) 4. ように.'
  },
  {
    id: 'star-n4-4',
    level: 'N4',
    prefix: '忙しすぎて、',
    suffix: 'ありませんでした。',
    starPosition: 2,
    fragments: ['ゆっくり', 'ご飯を', '食べる', '時間も'],
    grammarPoint: 'Modifikasi Nomina Kata Kerja + Partikel も (Bahkan tidak ada waktu...)',
    fullSentence: '忙しすぎて、 ゆっくり ご飯を 食べる 時間も ありませんでした。',
    translation: 'Karena terlalu sibuk, bahkan waktu untuk makan nasi dengan santai pun tidak ada.',
    explanation: 'Bentuk kamus 食べる menerangkan 時間も (waktu untuk makan). ゆっくり menerangkan ご飯を食べる. Urutan benar: 1. ゆっくり 2. ご飯を (★) 3. 食べる 4. 時間も.'
  },

  // ==========================================
  // LEVEL N3
  // ==========================================
  {
    id: 'star-n3-1',
    level: 'N3',
    prefix: '健康のために、',
    suffix: 'ようにしている。',
    starPosition: 3,
    fragments: ['どんなに', '忙しくても', '毎日のジョギングを', '欠かさない'],
    grammarPoint: 'Pola Usaha Rutin: どんなに〜ても + 〜ないようにしている',
    fullSentence: '健康のために、 どんなに 忙しくても 毎日のジョギングを 欠かさない ようにしている。',
    translation: 'Demi kesehatan, sesibuk apa pun, saya berusaha untuk tidak melewatkan lari pagi setiap hari.',
    explanation: 'どんなに harus berpasangan dengan bentuk konsesif 忙しくても (sesibuk apa pun). 欠かさない (tidak melewatkan) menempel pada ようにしている. Urutan benar: 1. どんなに 2. 忙しくても 3. 毎日のジョギングを (★) 4. 欠かさない.'
  },
  {
    id: 'star-n3-2',
    level: 'N3',
    prefix: 'この薬は、',
    suffix: 'ことができます。',
    starPosition: 3,
    fragments: ['食後に', '飲むことによって', '胃への負担を', '減らす'],
    grammarPoint: 'Pola Sebab/Metode: 〜ことによって (Dengan cara / Melalui)',
    fullSentence: 'この薬は、 食後に 飲むことによって 胃への負担を 減らす ことができます。',
    translation: 'Obat ini, dengan diminum sesudah makan, dapat mengurangi beban pada lambung.',
    explanation: '食後に 飲むことによって (dengan diminum sesudah makan) menjadi klausa perantara, lalu 胃への負担を menjadi objek dari 減らす (mengurangi). Urutan benar: 1. 食後に 2. 飲むことによって 3. 胃への負担を (★) 4. 減らす.'
  },
  {
    id: 'star-n3-3',
    level: 'N3',
    prefix: '彼女は',
    suffix: '日本語を話す。',
    starPosition: 3,
    fragments: ['まるで', '日本人の', 'かの', 'ように'],
    grammarPoint: 'Pola Perumpamaan: まるで〜かのように (Seolah-olah seperti)',
    fullSentence: '彼女は まるで 日本人の かの ように 日本語を話す。',
    translation: 'Dia berbicara bahasa Jepang seolah-olah seperti orang Jepang asli.',
    explanation: 'Pola gramatikal baku N3: まるで + Nomina + の + かのように. Urutan benar: 1. まるで 2. 日本人の 3. かの (★) 4. ように.'
  },
  {
    id: 'star-n3-4',
    level: 'N3',
    prefix: '来週の会議の',
    suffix: 'ご連絡いたします。',
    starPosition: 2,
    fragments: ['日程に', 'ついては', 'あらためて', 'メールで'],
    grammarPoint: 'Pola Mengenai Topik: 〜について(は)',
    fullSentence: '来週の会議の 日程に ついては あらためて メールで ご連絡いたします。',
    translation: 'Mengenai jadwal rapat minggu depan, akan kami hubungi kembali melalui email.',
    explanation: '会議の 日程に ついては (mengenai jadwal). あらためて メールで (kembali lewat email) menerangkan ご連絡いたします. Urutan benar: 1. 日程に 2. ついては (★) 3. あらためて 4. メールで.'
  },

  // ==========================================
  // LEVEL N2
  // ==========================================
  {
    id: 'star-n2-1',
    level: 'N2',
    prefix: 'どんなに',
    suffix: 'わけにはいかない。',
    starPosition: 3,
    fragments: ['困難な', '状況に', 'あろうとも', '諦める'],
    grammarPoint: 'Pola Keharusan Moral: 〜わけにはいかない & Konsesif 〜うとも',
    fullSentence: 'どんなに 困難な 状況に あろうとも 諦める わけにはいかない。',
    translation: 'Bagaimanapun sulitnya situasi yang dihadapi, kita tidak boleh menyerah begitu saja.',
    explanation: 'どんなに + 困難な 状況に あろうとも (dalam situasi sesulit apa pun). Bentuk kamus 諦める (menyerah) menempel langsung pada わけにはいかない. Urutan benar: 1. 困難な 2. 状況に 3. あろうとも (★) 4. 諦める.'
  },
  {
    id: 'star-n2-2',
    level: 'N2',
    prefix: '締め切りに',
    suffix: 'せざるを得ない。',
    starPosition: 3,
    fragments: ['間に合わせる', 'ためには', '今夜は徹夜を', 'してでも'],
    grammarPoint: 'Pola Terpaksa: 〜ざるを得ない & 〜てでも (Bahkan jika harus)',
    fullSentence: '締め切りに 間に合わせる ためには 今夜は徹夜を してでも せざるを得ない。',
    translation: 'Demi mengejar tenggat waktu, malam ini saya terpaksa harus begadang.',
    explanation: '間に合わせる ためには (demi tepat waktu). 今夜は徹夜を してでも menerangkan tindakan darurat sebelum akhiran せざるを得ない. Urutan benar: 1. 間に合わせる 2. ためには 3. 今夜は徹夜を (★) 4. してでも.'
  },
  {
    id: 'star-n2-3',
    level: 'N2',
    prefix: '彼の成功は、',
    suffix: 'あったからこそだ。',
    starPosition: 3,
    fragments: ['本人の', '努力は', 'もとより', '周囲の支えが'],
    grammarPoint: 'Pola Penegasan: 〜はもとより (Jangankan... apalagi...) + 〜からこそ',
    fullSentence: '彼の成功は、 本人の 努力は もとより 周囲の支えが あったからこそだ。',
    translation: 'Keberhasilannya, jangankan usaha keras dirinya sendiri, justru karena adanya dukungan dari orang-orang sekitarnya.',
    explanation: 'Pola baku: [X] はもとより [Y] が. 本人の 努力は + もとより + 周囲の支えが. Urutan benar: 1. 本人の 2. 努力は 3. もとより (★) 4. 周囲の支えが.'
  },
  {
    id: 'star-n2-4',
    level: 'N2',
    prefix: '最近の景気悪化に',
    suffix: '社会問題となっている。',
    starPosition: 3,
    fragments: ['伴い', '若者の', '失業率が上昇し', '深刻な'],
    grammarPoint: 'Pola Seiring/Bersamaan: 〜に伴い (Seiring dengan...)',
    fullSentence: '最近の景気悪化に 伴い 若者の 失業率が上昇し 深刻な 社会問題となっている。',
    translation: 'Seiring memburuknya ekonomi belakangan ini, angka pengangguran pemuda meningkat dan menjadi masalah sosial yang serius.',
    explanation: '景気悪化に 伴い (seiring pemburukan ekonomi). 若者の 失業率が上昇し (angka pengangguran pemuda naik). 深刻な menerangkan 社会問題. Urutan benar: 1. 伴い 2. 若者の 3. 失業率が上昇し (★) 4. 深刻な.'
  },

  // ==========================================
  // LEVEL N1
  // ==========================================
  {
    id: 'star-n1-1',
    level: 'N1',
    prefix: 'あの政治家の',
    suffix: '断じて許しがたい。',
    starPosition: 3,
    fragments: ['発言は', '国民を', '愚弄する', 'ものとして'],
    grammarPoint: 'Pola Penilaian Formal: 〜ものとして & Akhiran Emosional 〜がたい',
    fullSentence: 'あの政治家の 発言は 国民を 愚弄する ものとして 断じて許しがたい。',
    translation: 'Pernyataan politisi tersebut, sebagai tindakan yang menghina rakyat, sama sekali tidak bisa dimaafkan.',
    explanation: '発言は (pernyataan) menjadi topik. 国民を 愚弄する (menghina rakyat) menerangkan ものとして (sebagai hal yang...). 断じて許しがたい (sama sekali tak termaafkan). Urutan benar: 1. 発言は 2. 国民を 3. 愚弄する (★) 4. ものとして.'
  },
  {
    id: 'star-n1-2',
    level: 'N1',
    prefix: 'プロの',
    suffix: '耐え抜くことができる。',
    starPosition: 3,
    fragments: ['アスリートで', 'あればこそ', '毎日の', '過酷な練習に'],
    grammarPoint: 'Pola Justru Karena: 〜あればこそ (Justru karena dia adalah...)',
    fullSentence: 'プロの アスリートで あればこそ 毎日の 過酷な練習に 耐え抜くことができる。',
    translation: 'Justru karena dia seorang atlet profesional, dia sanggup bertahan menghadapi latihan berat setiap hari.',
    explanation: 'プロの + アスリートで + あればこそ (justru karena atlet pro). 毎日の + 過酷な練習に (latihan keras setiap hari) menempel pada 耐え抜く (bertahan). Urutan benar: 1. アスリートで 2. あればこそ 3. 毎日の (★) 4. 過酷な練習に.'
  },
  {
    id: 'star-n1-3',
    level: 'N1',
    prefix: '時代の',
    suffix: '成長は望めない。',
    starPosition: 3,
    fragments: ['変化に', '即した', '戦略を', '打ち出さない限り'],
    grammarPoint: 'Pola Sesuai Dengan: 〜に即した & Pembatasan Kondisi 〜ない限り',
    fullSentence: '時代の 変化に 即した 戦略を 打ち出さない限り 企業の成長は望めない。',
    translation: 'Tanpa meluncurkan strategi yang sesuai dengan perubahan zaman, pertumbuhan perusahaan mustahil diharapkan.',
    explanation: '時代の 変化に 即した (yang sesuai perubahan zaman) menerangkan 戦略を. 打ち出さない限り (selama tidak meluncurkan...). Urutan benar: 1. 変化に 2. 即した 3. 戦略を (★) 4. 打ち出さない限り.'
  },
  {
    id: 'star-n1-4',
    level: 'N1',
    prefix: '彼が',
    suffix: '何一つ見つかっていない。',
    starPosition: 3,
    fragments: ['犯人である', 'ことを', '裏付ける', '決定的な証拠は'],
    grammarPoint: 'Modifikasi Klausa Majemuk N1: 〜ことを裏付ける',
    fullSentence: '彼が 犯人である ことを 裏付ける 決定的な証拠は 何一つ見つかっていない。',
    translation: 'Bukti krusial yang menguatkan bahwa dia adalah pelakunya, sama sekali belum ditemukan satupun.',
    explanation: '彼が 犯人である ことを (bahwa dia pelakunya). 裏付ける (menguatkan/membuktikan) menerangkan 決定的な証拠は (bukti krusial). Urutan benar: 1. 犯人である 2. ことを 3. 裏付ける (★) 4. 決定的な証拠は.'
  }
];
