/**
 * Database Cloze Test Dinamis & Drill Partikel Kontekstual (穴埋め問題 / Cloze Sentences)
 * Soal rumpang kontekstual menguji active recall partikel (は, が, に, で, を, へ, より, と) dan bentuk konjugasi.
 */

export const clozeSentencesData = [
  // ==========================================
  // LEVEL N5
  // ==========================================
  {
    id: 'cloze-1',
    level: 'N5',
    type: 'particle',
    beforeBlank: 'きのう、レストラン',
    afterBlank: '友達と昼ご飯を食べました。',
    target: 'で',
    options: ['で', 'に', 'を', 'へ'],
    fullSentence: 'きのう、レストランで友達と昼ご飯を食べました。',
    reading: 'きのう、レストランで ともだちと ひるごはんを たべました。',
    translation: 'Kemarin, saya makan siang bersama teman di restoran.',
    ruleExplanation: 'Tempat terjadinya sebuah aksi aktif (makan, belajar, bekerja) wajib menggunakan partikel で (de). Partikel に hanya digunakan untuk lokasi keberadaan statis (います/あります) atau tujuan akhir.'
  },
  {
    id: 'cloze-2',
    level: 'N5',
    type: 'particle',
    beforeBlank: '机の上',
    afterBlank: '猫がいます。',
    target: 'に',
    options: ['に', 'で', 'を', 'は'],
    fullSentence: '机の上に猫がいます。',
    reading: 'つくえの うえに ねこが います。',
    translation: 'Di atas meja ada seekor kucing.',
    ruleExplanation: 'Titik lokasi keberadaan makhluk hidup (いる) atau benda mati (ある) selalu ditandai dengan partikel に (ni).'
  },
  {
    id: 'cloze-3',
    level: 'N5',
    type: 'particle',
    beforeBlank: '毎朝、７時半',
    afterBlank: '家を出ます。',
    target: 'に',
    options: ['に', 'で', 'を', 'から'],
    fullSentence: '毎朝、７時半に家を出ます。',
    reading: 'まいあさ、しちじはんに いえを でます。',
    translation: 'Setiap pagi, saya keluar rumah pada pukul 07.30.',
    ruleExplanation: 'Keterangan waktu yang berupa angka spesifik (jam, tanggal, hari) wajib ditempeli partikel に (ni).'
  },
  {
    id: 'cloze-4',
    level: 'N5',
    type: 'particle',
    beforeBlank: 'わたしは日本語',
    afterBlank: '少し話せます。',
    target: 'が',
    options: ['が', 'を', 'に', 'で'],
    fullSentence: 'わたしは日本語が少し話せます。',
    reading: 'わたしは にほんごが すこし はなせます。',
    translation: 'Saya bisa sedikit berbicara bahasa Jepang.',
    ruleExplanation: 'Kemampuan potensial (話せる, できる, わかる) menggunakan partikel が (ga) untuk menandai objek kemampuan, bukan partikel を.'
  },
  {
    id: 'cloze-5',
    level: 'N5',
    type: 'conjugation',
    beforeBlank: '音楽を',
    afterBlank: 'ながら、部屋の掃除をします。',
    target: '聞き',
    options: ['聞き', '聞いて', '聞く', '聞かない'],
    fullSentence: '音楽を聞きながら、部屋の掃除をします。',
    reading: 'おんがくを ききながら、へやの そうじを します。',
    translation: 'Sambil mendengarkan musik, saya membersihkan kamar.',
    ruleExplanation: 'Pola simultan 〜ながら (sambil) menempel pada bentuk akar kata kerja (Masu-stem tanpa masu): 聞きます $\\rightarrow$ 聞き + ながら.'
  },

  // ==========================================
  // LEVEL N4
  // ==========================================
  {
    id: 'cloze-6',
    level: 'N4',
    type: 'particle',
    beforeBlank: 'レポートは金曜日',
    afterBlank: '提出してください。',
    target: 'までに',
    options: ['までに', 'まで', 'から', 'より'],
    fullSentence: 'レポートは金曜日までに提出してください。',
    translation: 'Tolong kumpulkan laporannya paling lambat sebelum hari Jumat.',
    ruleExplanation: 'Tenggat batas waktu penyerahan aksi tunggal (deadline) menggunakan までに (sebelum/paling lambat). Sedangkan まで menandai durasi yang terus berlanjut hingga waktu tersebut.'
  },
  {
    id: 'cloze-7',
    level: 'N4',
    type: 'particle',
    beforeBlank: 'バスより電車',
    afterBlank: '早いです。',
    target: 'のほうが',
    options: ['のほうが', 'より', 'ほど', 'から'],
    fullSentence: 'バスより電車のほうが早いです。',
    reading: 'バスより でんしゃの ほうが はやいです。',
    translation: 'Dibandingkan bus, kereta lebih cepat.',
    ruleExplanation: 'Pola perbandingan komparatif: [A] より [B] のほうが [Kata Sifat] (B lebih daripada A).'
  },
  {
    id: 'cloze-8',
    level: 'N4',
    type: 'conjugation',
    beforeBlank: '窓が',
    afterBlank: 'あります。',
    target: '開けて',
    options: ['開けて', '開いて', '開く', '開けた'],
    fullSentence: '窓が開けてあります。',
    reading: 'まどが あけて あります。',
    translation: 'Jendela sengaja dibuka (dalam kondisi dibiarkan terbuka untuk tujuan tertentu).',
    explanation: 'Pola 〜てある menunjukkan hasil dari aksi yang sengaja dilakukan manusia dan memerlukan kata kerja transitif (他動詞): 開ける $\\rightarrow$ 開けてあります. (Jika kondisi otomatis alami: 窓が開いています).'
  },
  {
    id: 'cloze-9',
    level: 'N4',
    type: 'particle',
    beforeBlank: 'この本を田中さん',
    afterBlank: '借りました。',
    target: 'に',
    options: ['に', 'を', 'へ', 'で'],
    fullSentence: 'この本を田中さんに借りました。',
    reading: 'この ほんを たなかさんに かりました。',
    translation: 'Saya meminjam buku ini dari Saudara Tanaka.',
    ruleExplanation: 'Pihak sumber pemberi saat menerima atau meminjam (もらう, 借りる, 習う) ditandai dengan partikel に (atau から).'
  },

  // ==========================================
  // LEVEL N3
  // ==========================================
  {
    id: 'cloze-10',
    level: 'N3',
    type: 'particle',
    beforeBlank: '努力したに',
    afterBlank: '、結果は出なかった。',
    target: 'もかかわらず',
    options: ['もかかわらず', 'ついて', '対して', '関して'],
    fullSentence: '努力したにもかかわらず、結果は出なかった。',
    reading: 'どりょくしたにも かかわらず、けっかは でなかった。',
    translation: 'Meskipun telah berusaha keras, hasilnya tidak kunjung terlihat.',
    ruleExplanation: 'Pola kontradiksi resmi N3: 〜にもかかわらず (Meskipun / Terlepas dari fakta bahwa...).'
  },
  {
    id: 'cloze-11',
    level: 'N3',
    type: 'particle',
    beforeBlank: 'このアニメは子供',
    afterBlank: '大人にも愛されている。',
    target: 'ばかりか',
    options: ['ばかりか', 'ながら', 'くらい', 'ほど'],
    fullSentence: 'このアニメは子供ばかりか大人にも愛されている。',
    reading: 'この アニメは こども ばかりか おとなにも あいされている。',
    translation: 'Anime ini bukan hanya disukai anak-anak, melainkan orang dewasa pun mencintainya.',
    ruleExplanation: 'Pola penambahan eskalasi N3: 〜ばかりか〜も (Bukan cuma A, tapi bahkan B juga).'
  },
  {
    id: 'cloze-12',
    level: 'N3',
    type: 'conjugation',
    beforeBlank: 'スープが温かい',
    afterBlank: '召し上がってください。',
    target: 'うちに',
    options: ['うちに', 'あいだに', 'までに', 'から'],
    fullSentence: 'スープが温かいうちに召し上がってください。',
    reading: 'スープが あたたかいうちに めしあがってください。',
    translation: 'Silakan dinikmati selagi supnya masih hangat.',
    ruleExplanation: 'Pola urgensi sebelum kondisi berubah lenyap: Kata sifat い + うちに (Selagi/mumpung masih hangat).'
  },

  // ==========================================
  // LEVEL N2
  // ==========================================
  {
    id: 'cloze-13',
    level: 'N2',
    type: 'particle',
    beforeBlank: '理由の如何',
    afterBlank: '、遅刻は一切認められません。',
    target: 'によらず',
    options: ['によらず', 'に即して', 'に際して', 'に反して'],
    fullSentence: '理由の如何によらず、遅刻は一切認められません。',
    reading: 'りゆうの いかんに よらず、ちこくは いっさい みとめられません。',
    translation: 'Apa pun alasannya (terlepas dari bagaimana alasannya), keterlambatan sama sekali tidak ditoleransi.',
    ruleExplanation: 'Pola resmi N2: Nomina + の如何によらず / の如何にかかわらず (Tanpa mempedulikan / apa pun kondisinya).'
  },
  {
    id: 'cloze-14',
    level: 'N2',
    type: 'particle',
    beforeBlank: '長年の夢',
    afterBlank: '、ついに自分の会社を設立した。',
    target: 'がかなって',
    options: ['がかなって', 'をかなって', 'にかかって', 'をこめて'],
    fullSentence: '長年の夢がかなって、ついに自分の会社を設立した。',
    reading: 'ながねんの ゆめが かなって、ついに じぶんの かいしゃを せつりつした。',
    translation: 'Impian bertahun-tahun terwujud, akhirnya saya mendirikan perusahaan sendiri.',
    ruleExplanation: 'Kata kerja intransitif かなう (terwujud) berpasangan dengan partikel が: 夢がかなう (bukan 夢を).'
  },

  // ==========================================
  // LEVEL N1
  // ==========================================
  {
    id: 'cloze-15',
    level: 'N1',
    type: 'particle',
    beforeBlank: '法律の専門家で',
    afterBlank: '、その条文の解釈は困難を極めた。',
    target: 'あればこそ',
    options: ['あればこそ', 'あるまいし', 'あっての', 'あるがゆえに'],
    fullSentence: '法律の専門家であればこそ、その条文の解釈は困難を極めた。',
    reading: 'ほうりつの せんもんかで あればこそ、その じょうぶんの かいしゃくは こんなんを きわめた。',
    translation: 'Justru karena mereka adalah para pakar hukumlah, penafsiran pasal tersebut menjadi luar biasa rumit.',
    ruleExplanation: 'Pola penegasan alasan mutlak N1: 〜あればこそ (Justru karena merupakan...).'
  },
  {
    id: 'cloze-16',
    level: 'N1',
    type: 'conjugation',
    beforeBlank: 'どんなに苦しくても、最後まで',
    afterBlank: 'ものか。',
    target: 'あきらめる',
    options: ['あきらめる', 'あきらめない', 'あきらめて', 'あきらめた'],
    fullSentence: 'どんなに苦しくても、最後まであきらめるものか。',
    reading: 'どんなに くるしくても、さいごまで あきらめるものか。',
    translation: 'Sesulit apa pun itu, mana sudi saya menyerah sampai akhir!',
    ruleExplanation: 'Pola penolakan tekad keras 〜ものか menempel pada bentuk kamus positif (辞書形): あきらめる + ものか (Secara harfiah: "Apakah saya akan menyerah? Tentu tidak akan pernah!").'
  }
];
