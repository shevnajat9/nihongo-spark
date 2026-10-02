/**
 * Database Manga Dialogue Reader & Wakamono Kotoba (マンガ対話 & 若者言葉)
 * Menampilkan strip cerita komik 4-panel (4コマ) dengan balon kata interaktif,
 * membedah partikel akhir emosional (終助詞: ね, よ, さ, ぞ, ぜ, わ, かしら) dan bahasa gaul pemuda Jepang.
 */

export const yonkomaStories = [
  {
    id: 'story-1',
    title: 'Episode 1: Ujian JLPT & Keberuntungan (テストとワンチャン)',
    description: 'Kenji dan Yuka sedang mengobrol di kantin sekolah setelah tryout ujian JLPT.',
    theme: 'Bahasa Gaul & Partikel Maskulin/Feminin',
    panels: [
      {
        panelNum: 1,
        sceneDesc: 'Kantin sekolah, Kenji mengeluh sambil memegang lembar ujian.',
        sfx: 'ズーン (Zuuun - Suasana murung)',
        speaker: 'Kenji',
        avatar: '👦',
        bubble: 'うわー、今日の読解テスト、マジでヤバかったぜ！全然時間足りなかったさ。',
        romaji: 'Uwaa, kyou no dokkai tesuto, maji de yabakatta ze! Zenzen jikan tarinakatta sa.',
        meaning: 'Waduh, tes membaca hari ini beneran gawat parah bro! Sama sekali nggak cukup waktunya tahu.',
        focusParticles: [
          { word: 'マジで (Maji de)', type: 'Wakamono Kotoba', note: 'Bahasa gaul pemuda yang berarti "beneran / seriusan" (asal kata dari 真面目 - majime).' },
          { word: 'ヤバい (Yabai)', type: 'Wakamono Kotoba', note: 'Kata multi-makna populer: bisa berarti "gawat/berbahaya" atau "keren gila".' },
          { word: '〜ぜ (ze)', type: 'Partikel Akhir (終助詞)', note: 'Partikel maskulin gaul untuk menunjukkan antusiasme, ketegasan, atau gaya santai pemuda.' },
          { word: '〜さ (sa)', type: 'Partikel Akhir (終助詞)', note: 'Pengisi kalimat santai untuk memberi jeda atau penjelasan ringan tanpa menggurui.' }
        ]
      },
      {
        panelNum: 2,
        sceneDesc: 'Yuka tersenyum sambil menyeruput teh matcha.',
        sfx: 'ニコッ (Niko - Senyum ramah)',
        speaker: 'Yuka',
        avatar: '👧',
        bubble: 'そうね。最後の長文は難しかったわ。でも、漢字はバッチリだったんじゃないかしら？',
        romaji: 'Sou ne. Saigo no choubun wa muzukashikatta wa. Demo, kanji wa bacchiri dattan ja nai kashira?',
        meaning: 'Iya ya. Bacaan panjang terakhir memang sulit lho. Tapi, kanjinya beres kan menurutmu?',
        focusParticles: [
          { word: '〜ね (ne)', type: 'Partikel Akhir (終助詞)', note: 'Mencari kesepakatan dan membangun rasa empati bersama lawan bicara ("iya kan").' },
          { word: '〜わ (wa)', type: 'Partikel Akhir (終助詞)', note: 'Partikel afektif bernuansa lembut khas penutur wanita (atau kasual Kansai).' },
          { word: '〜かしら (kashira)', type: 'Partikel Akhir (終助詞)', note: 'Bertanya-tanya pada diri sendiri dengan intonasi halus ("...nggak ya?").' }
        ]
      },
      {
        panelNum: 3,
        sceneDesc: 'Kenji mengepalkan tangan penuh optimisme absurd.',
        sfx: 'カッ (Ka! - Mata berbinar)',
        speaker: 'Kenji',
        avatar: '👦',
        bubble: '勘でマークした部分、ワンチャン全問正解してるかもだぞ！',
        romaji: 'Kan de maaku shita bubun, wanchan zenmon seikai shiteru kamo da zo!',
        meaning: 'Bagian yang kutembak pakai insting, siapa tahu ada kesempatan kecil benar semua lho bro!',
        focusParticles: [
          { word: 'ワンチャン (Wanchan)', type: 'Wakamono Kotoba', note: 'Singkatan dari "One Chance" (ada secercah peluang / siapa tahu bisa berhasil).' },
          { word: '〜ぞ (zo)', type: 'Partikel Akhir (終助詞)', note: 'Partikel maskulin tegas yang menyatakan tekad kuat, rasa percaya diri, atau peringatan.' }
        ]
      },
      {
        panelNum: 4,
        sceneDesc: 'Yuka tertawa melihat optimisme Kenji.',
        sfx: 'クスッ (Kusu - Tertawa kecil)',
        speaker: 'Yuka',
        avatar: '👧',
        bubble: 'あはは、草生えるわ！その自信はどこから来るのよ。',
        romaji: 'Ahaha, kusa haeru wa! Sono jishin wa doko kara kuru no yo.',
        meaning: 'Hahaha, ngakak banget deh! Dari mana datangnya rasa percaya diri itu sih.',
        focusParticles: [
          { word: '草生える (Kusa haeru)', type: 'Wakamono Kotoba', note: 'Bahasa internet/slang "ngakak" (karena tawa "w" di internet menyerupai rumput tumbuh www).' },
          { word: '〜のよ (no yo)', type: 'Partikel Akhir (終助詞)', note: 'Kombinasi penjelasan ramah (no) dan penegasan ekspresif (yo).' }
        ]
      }
    ]
  },
  {
    id: 'story-2',
    title: 'Episode 2: Konser Idola & Nostalgia (推し活とエモい夜)',
    description: 'Yuka dan temannya pulang malam sehabis menonton konser live idola favorit mereka.',
    theme: 'Subkultur Populer & Afeksi Emosional',
    panels: [
      {
        panelNum: 1,
        sceneDesc: 'Stasiun malam hari, lampu gemerlap, Yuka memegang lightstick.',
        sfx: 'キラキラ (Kira-kira - Berbinar-binar)',
        speaker: 'Yuka',
        avatar: '👧',
        bubble: '今日のライブ、私の推しが目の前で歌ってくれて、ガチで泣いちゃったよ！',
        romaji: 'Kyou no raibu, watashi no oshi ga me no mae de utatte kurete, gachi de naichatta yo!',
        meaning: 'Konser hari ini, idola favoritku bernyanyi tepat di depanku, aku beneran menangis terharu lho!',
        focusParticles: [
          { word: '推し (Oshi)', type: 'Wakamono Kotoba', note: 'Idola, karakter, atau figur favorit yang didukung dan dicintai sepenuh hati.' },
          { word: 'ガチで (Gachi de)', type: 'Wakamono Kotoba', note: 'Berasal dari istilah sumo (Gachinko), bermakna "sungguhan / tanpa sandiwara / 100% serius".' },
          { word: '〜よ (yo)', type: 'Partikel Akhir (終助詞)', note: 'Memberi informasi baru dengan penegasan hangat kepada pendengar.' }
        ]
      },
      {
        panelNum: 2,
        sceneDesc: 'Kenji mengangguk-angguk sambil memandang langit senja.',
        sfx: 'フッ (Fu - Menghela napas tenang)',
        speaker: 'Kenji',
        avatar: '👦',
        bubble: 'あのアンコール曲、学生時代を思い出してなんだかエモいよな。',
        romaji: 'Ano ankooru kyoku, gakusei jidai o omoidashite nandaka emoi yo na.',
        meaning: 'Lagu encore itu mengingatkanku pada masa sekolah dulu, rasanya syahdu dan emosional banget ya.',
        focusParticles: [
          { word: 'エモい (Emoi)', type: 'Wakamono Kotoba', note: 'Dari bahasa Inggris "Emotional", mendeskripsikan perasaan syahdu, puitis, rindu, atau melankolis.' },
          { word: '〜よな (yo na)', type: 'Partikel Akhir (終助詞)', note: 'Kombinasi berbagi perasaan (yo) dan gumaman reflektif meminta persetujuan batin (na).' }
        ]
      },
      {
        panelNum: 3,
        sceneDesc: 'Yuka menatap poster konser di dinding stasiun.',
        sfx: 'ウルッ (Uru - Mata berkaca-kaca)',
        speaker: 'Yuka',
        avatar: '👧',
        bubble: '明日からまた仕事だけど、これで当分頑張れるよね！',
        romaji: 'Ashita kara mata shigoto dakedo, kore de toubun ganbareru yo ne!',
        meaning: 'Besok sudah harus kerja lagi sih, tapi berkat ini kita bisa semangat untuk beberapa waktu ke depan kan ya!',
        focusParticles: [
          { word: '〜よね (yo ne)', type: 'Partikel Akhir (終助詞)', note: 'Mengonfirmasi keyakinan bersama: menyampaikan opini sekaligus memastikan pendengar sepakat.' }
        ]
      },
      {
        panelNum: 4,
        sceneDesc: 'Keduanya tos tangan dan melangkah menuju peron kereta.',
        sfx: 'パチッ (Pachi - Tepukan tangan)',
        speaker: 'Kenji',
        avatar: '👦',
        bubble: 'おう！次のツアーも絶対連番で参戦しようぜ！',
        romaji: 'Ou! Tsugi no tsuaa mo zettai renban de sansen shiyou ze!',
        meaning: 'Sip! Tur konser berikutnya kita berdua wajib beli tiket berdampingan lagi ya!',
        focusParticles: [
          { word: '連番 (Renban)', type: 'Wakamono Kotoba', note: 'Nomor kursi tiket konser yang berurutan/berdampingan.' },
          { word: '〜ぜ (ze)', type: 'Partikel Akhir (終助詞)', note: 'Ajakan akrab maskulin dengan kobaran semangat kawan sebaya.' }
        ]
      }
    ]
  }
];

export const particleEncyclopedia = [
  {
    particle: 'ね (ne)',
    nuance: 'Empati & Menuntut Kesepakatan',
    gender: 'Netral (Pria & Wanita)',
    description: 'Menciptakan keharmonisan percakapan dengan mengajak lawan bicara mengangguk setuju ("iya kan? / betapa...").',
    sample: '今日はいい天気ですね。(Hari ini cuacanya cerah ya.)'
  },
  {
    particle: 'よ (yo)',
    nuance: 'Penyampai Informasi Baru & Penegasan',
    gender: 'Netral',
    description: 'Memberi tahu fakta yang belum diketahui pendengar, atau menegaskan sikap pembicara ("lho / lho ya").',
    sample: '明日は雨が降るよ。(Besok hujan lho.)'
  },
  {
    particle: 'さ (sa)',
    nuance: 'Santai & Jeda Pembicaraan Kasual',
    gender: 'Cenderung Pria / Pemuda',
    description: 'Memberikan nuansa obrolan santai, sering dipakai di tengah atau akhir kalimat agar terdengar rileks ("tahu kan / ya begitulah").',
    sample: 'そんなこと言われてもさ、困るよ。(Mau dibilang begitu pun kan, aku jadi repot.)'
  },
  {
    particle: 'ぞ (zo)',
    nuance: 'Tekad Kuat & Peringatan Tegas',
    gender: 'Maskulin (Pria)',
    description: 'Banyak ditemukan di anime shounen (Naruto, Luffy). Digunakan untuk menyemangati diri sendiri atau memperingatkan kawan/musuh.',
    sample: '負けないぞ！(Aku tidak akan kalah!)'
  },
  {
    particle: 'ぜ (ze)',
    nuance: 'Keren, Ajakan Gaul, & Antusiasme',
    gender: 'Maskulin (Pria)',
    description: 'Memberi kesan keren dan bersahabat antar pemuda pria ("ayo bro / lho kawan").',
    sample: 'ラーメン食いに行こうぜ！(Ayo pergi makan ramen bro!)'
  },
  {
    particle: 'わ (wa)',
    nuance: 'Keanggunan Lembut & Nada Feminin',
    gender: 'Cenderung Wanita (Tokyo) / Netral (Kansai)',
    description: 'Melembutkan penegasan kalimat agar terdengar elegan dan ramah. Di Kansai digunakan luas oleh pria maupun wanita.',
    sample: '私、もう帰るわ。(Aku pulang duluan ya.)'
  },
  {
    particle: 'かしら (kashira)',
    nuance: 'Pertanyaan Halus Pada Diri Sendiri',
    gender: 'Feminin (Wanita)',
    description: 'Bentuk lembut dari "ka na". Menyatakan rasa ingin tahu atau keraguan batin secara santun.',
    sample: '雨、降るかしら。(Hujan bakal turun nggak ya?)'
  }
];
