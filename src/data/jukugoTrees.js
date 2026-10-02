/**
 * Database Peta Pohon Senyawa Kanji (熟語ファミリー / Jukugo Tree Mindmap)
 * Visualisasi kanji inti sebagai balok Lego pembentuk rumpun kosakata bahasa Jepang.
 */

export const jukugoTreesData = [
  {
    id: 'tree-den',
    rootKanji: '電',
    rootReading: 'デン (den)',
    rootMeaning: 'Listrik / Kilat',
    description: 'Kanji petir/hujan (雨) dengan ekor kilat menyambar (申). Di era modern, kanji ini menjadi fondasi semua teknologi kelistrikan & telekomunikasi.',
    compounds: [
      {
        word: '電話',
        reading: 'でんわ (denwa)',
        meaning: 'Telepon',
        level: 'N5',
        breakdown: '電 (listrik) + 話 (bicara)',
        explanation: 'Berbicara jarak jauh menggunakan sinyal listrik.',
        sentence: '毎日家族に電話をかけます。 (Setiap hari saya menelepon keluarga.)'
      },
      {
        word: '電車',
        reading: 'でんしゃ (densha)',
        meaning: 'Kereta listrik',
        level: 'N5',
        breakdown: '電 (listrik) + 車 (kendaraan)',
        explanation: 'Kendaraan gerbong yang bergerak menggunakan daya listrik.',
        sentence: '電車に乗って会社へ通います。 (Saya naik kereta listrik pergi bekerja.)'
      },
      {
        word: '電気',
        reading: 'でんき (denki)',
        meaning: 'Listrik / Lampu',
        level: 'N5',
        breakdown: '電 (listrik) + 気 (energi/hawa)',
        explanation: 'Energi listrik atau lampu penerang ruangan.',
        sentence: '部屋を出るときは電気を消しましょう。 (Matikan lampu saat keluar ruangan.)'
      },
      {
        word: '電池',
        reading: 'でんち (denchi)',
        meaning: 'Baterai',
        level: 'N4',
        breakdown: '電 (listrik) + 池 (kolam/wadah penampung)',
        explanation: 'Wadah kolam mini penyimpan energi listrik portabel.',
        sentence: 'リモコンの電池が切れました。 (Baterai remote control habis.)'
      },
      {
        word: '電力',
        reading: 'でんりょく (denryoku)',
        meaning: 'Daya / Tenaga listrik',
        level: 'N3',
        breakdown: '電 (listrik) + 力 (kekuatan/tenaga)',
        explanation: 'Kapasitas daya keluaran energi listrik dalam watt/kwh.',
        sentence: '夏のピーク時は電力の消費が増える。 (Saat puncak musim panas konsumsi daya listrik melonjak.)'
      },
      {
        word: '発電',
        reading: 'はつでん (hatsuden)',
        meaning: 'Pembangkitan listrik',
        level: 'N3',
        breakdown: '発 (keluar/memunculkan) + 電 (listrik)',
        explanation: 'Proses memproduksi dan membangkitkan listrik di instalasi generator.',
        sentence: '太陽光で発電する家が増えている。 (Rumah yang membangkitkan listrik dengan tenaga surya kian bertambah.)'
      },
      {
        word: '電子',
        reading: 'でんし (denshi)',
        meaning: 'Elektronik / Digital',
        level: 'N2',
        breakdown: '電 (listrik) + 子 (partikel mikro)',
        explanation: 'Partikel elektron atau format digital (e-money, e-book).',
        sentence: '最近は電子マネーでの決済が主流だ。 (Belakangan ini pembayaran uang elektronik menjadi arus utama.)'
      },
      {
        word: '停電',
        reading: 'ていでん (teiden)',
        meaning: 'Mati listrik / Pemadaman',
        level: 'N2',
        breakdown: '停 (berhenti) + 電 (listrik)',
        explanation: 'Aliran listrik terhenti akibat badai atau pemeliharaan gardu.',
        sentence: '台風の影響で市内全域が停電した。 (Akibat angin topan seluruh kota mengalami mati listrik.)'
      }
    ]
  },
  {
    id: 'tree-ki',
    rootKanji: '気',
    rootReading: 'キ・ケ / き (ki)',
    rootMeaning: 'Energi / Hawa / Perasaan / Pikiran',
    description: 'Berasal dari kepulan uap nasi mengepul (气) yang melambangkan daya hidup, atmosfer alam, dan suasana hati batin manusia.',
    compounds: [
      {
        word: '元気',
        reading: 'げんき (genki)',
        meaning: 'Sehat / Bersemangat',
        level: 'N5',
        breakdown: '元 (asal mula/fondasi) + 気 (energi hidup)',
        explanation: 'Kondisi energi dasar tubuh yang prima dan sehat.',
        sentence: 'おかげさまで、とても元気です。 (Berkat doa Anda, saya sangat sehat.)'
      },
      {
        word: '天気',
        reading: 'てんき (tenki)',
        meaning: 'Cuaca',
        level: 'N5',
        breakdown: '天 (langit) + 気 (hawa/atmosfer)',
        explanation: 'Kondisi hawa atmosfer di langit bumi.',
        sentence: '今日はとても気持ちのいい天気ですね。 (Hari ini cuacanya sangat menyenangkan ya.)'
      },
      {
        word: '人気',
        reading: 'にんき (ninki)',
        meaning: 'Kepopuleran / Disukai banyak orang',
        level: 'N4',
        breakdown: '人 (orang) + 気 (hawa/daya tarik)',
        explanation: 'Daya tarik yang memikat perhatian orang banyak.',
        sentence: 'このアニメは世界中で大人気だ。 (Anime ini sangat populer di seluruh dunia.)'
      },
      {
        word: '気分',
        reading: 'きぶん (kibun)',
        meaning: 'Suasana hati / Kondisi fisik',
        level: 'N4',
        breakdown: '気 (perasaan) + 分 (bagian)',
        explanation: 'Kondisi bagian perasaan atau rasa nyaman tubuh saat itu.',
        sentence: '少し気分が悪いので横になります。 (Saya agak kurang enak badan jadi ingin berbaring.)'
      },
      {
        word: '気付く',
        reading: 'きづく (kizuku)',
        meaning: 'Menyadari',
        level: 'N3',
        breakdown: '気 (perhatian) + 付く (menempel)',
        explanation: 'Pikiran perhatian menempel pada suatu keganjilan.',
        sentence: '間違いに早く気付いてよかった。 (Syukurlah saya cepat menyadari kesalahannya.)'
      },
      {
        word: '気候',
        reading: 'きこう (kikou)',
        meaning: 'Iklim',
        level: 'N3',
        breakdown: '気 (hawa) + 候 (musim/kondisi)',
        explanation: 'Pola cuaca jangka panjang di suatu daerah geografis.',
        sentence: '日本の四季折々の気候を楽しむ。 (Menikmati iklim empat musim di Jepang.)'
      },
      {
        word: '気配',
        reading: 'けはい (kehai)',
        meaning: 'Tanda-tanda / Firasat kehadiran',
        level: 'N2',
        breakdown: '気 (hawa) + 配 (penyebaran)',
        explanation: 'Hawa kehadiran seseorang yang tercium samar-samar.',
        sentence: '人の気配がして振り返った。 (Merasakan tanda kehadiran orang, saya menoleh ke belakang.)'
      },
      {
        word: '気迫',
        reading: 'きはく (kihaku)',
        meaning: 'Semangat membara / Aura tekad kuat',
        level: 'N1',
        breakdown: '気 (energi) + 迫 (mendesak kuat)',
        explanation: 'Tekanan aura mental luar biasa dari seorang atlet atau pendekar.',
        sentence: '相手を圧倒する気迫に満ちている。 (Penuh dengan aura tekad membara yang mengintimidasi lawan.)'
      }
    ]
  },
  {
    id: 'tree-sei',
    rootKanji: '生',
    rootReading: 'セイ・ショウ / い・きる・う・まれる (sei / ikiru, umareru)',
    rootMeaning: 'Hidup / Lahir / Tumbuh',
    description: 'Kecambah muda yang baru menembus tanah subur. Menjadi akar segala hal tentang kelahiran, kehidupan, dan pendidikan.',
    compounds: [
      {
        word: '先生',
        reading: 'せんせい (sensei)',
        meaning: 'Guru / Dokter / Pengajar',
        level: 'N5',
        breakdown: '先 (terdahulu/lebih awal) + 生 (lahir/tumbuh)',
        explanation: 'Orang yang lahir dan menimba ilmu lebih awal di dunia ini.',
        sentence: '日本語の先生に質問をしました。 (Saya mengajukan pertanyaan kepada guru bahasa Jepang.)'
      },
      {
        word: '学生',
        reading: 'がくせい (gakusei)',
        meaning: 'Pelajar / Mahasiswa',
        level: 'N5',
        breakdown: '学 (belajar) + 生 (orang yang bertumbuh)',
        explanation: 'Seseorang yang mendedikasikan hidupnya untuk bertumbuh lewat belajar.',
        sentence: '私は東京の大学で学生をしています。 (Saya menjadi mahasiswa di sebuah universitas di Tokyo.)'
      },
      {
        word: '生活',
        reading: 'せいかつ (seikatsu)',
        meaning: 'Kehidupan sehari-hari',
        level: 'N4',
        breakdown: '生 (hidup) + 活 (aktivitas aktif)',
        explanation: 'Segala aktivitas dinamis harian dalam menjalani roda kehidupan.',
        sentence: '日本での生活にもすっかり慣れました。 (Saya sudah terbiasa sepenuhnya dengan kehidupan di Jepang.)'
      },
      {
        word: '生産',
        reading: 'せいさん (seisan)',
        meaning: 'Produksi / Pembuatan barang',
        level: 'N3',
        breakdown: '生 (menghidupkan) + 産 (melahirkan/menghasilkan)',
        explanation: 'Melahirkan barang-barang baru di pabrik manufaktur.',
        sentence: 'この工場では自動車を生産している。 (Pabrik ini memproduksi mobil.)'
      },
      {
        word: '一生',
        reading: 'いっしょう (isshou)',
        meaning: 'Seumur hidup',
        level: 'N3',
        breakdown: '一 (satu) + 生 (kehidupan)',
        explanation: 'Satu tarikan nafas penuh dari lahir hingga menutup mata.',
        sentence: 'この恩は一生忘れません。 (Kebaikan ini tidak akan saya lupakan seumur hidup.)'
      },
      {
        word: '生涯',
        reading: 'しょうがい (shougai)',
        meaning: 'Sepanjang hayat',
        level: 'N2',
        breakdown: '生 (hidup) + 涯 (tebing/batas cakrawala)',
        explanation: 'Batas akhir perjalanan panjang riwayat hidup seseorang.',
        sentence: '彼は生涯を研究に捧げた。 (Dia mempersembahkan sepanjang hayatnya untuk riset.)'
      },
      {
        word: '生息',
        reading: 'せいそく (seisoku)',
        meaning: 'Habitat hidup / Berkembang biak',
        level: 'N1',
        breakdown: '生 (hidup) + 息 (bernapas)',
        explanation: 'Spesies hewan atau tumbuhan yang hidup bernapas di alam liar.',
        sentence: '深海に生息する珍しい生物。 (Makhluk langka yang mendiami habitat laut dalam.)'
      }
    ]
  },
  {
    id: 'tree-shin',
    rootKanji: '心',
    rootReading: 'シン / こころ (shin / kokoro)',
    rootMeaning: 'Hati / Jiwa / Pusat Inti',
    description: 'Gambar anatomis empat bilik jantung manusia. Melambangkan pusat emosi, ketenangan jiwa, dan titik episentrum sebuah objek.',
    compounds: [
      {
        word: '安心',
        reading: 'あんしん (anshin)',
        meaning: 'Tenang / Lega hati',
        level: 'N4',
        breakdown: '安 (damai/aman) + 心 (hati)',
        explanation: 'Hati berada dalam kondisi yang damai dan terbebas dari ancaman.',
        sentence: '無事だと聞いて安心しました。 (Saya merasa lega setelah mendengar Anda selamat.)'
      },
      {
        word: '心配',
        reading: 'しんぱい (shinpai)',
        meaning: 'Khawatir / Cemas',
        level: 'N4',
        breakdown: '心 (hati) + 配 (membagikan ke sana kemari)',
        explanation: 'Pikiran hati terpecah ke mana-mana karena memikirkan nasib orang.',
        sentence: '親にあまり心配をかけたくない。 (Saya tidak ingin terlalu membuat cemas orang tua.)'
      },
      {
        word: '中心',
        reading: 'ちゅうしん (chuushin)',
        meaning: 'Titik pusat / Inti',
        level: 'N3',
        breakdown: '中 (tengah) + 心 (jantung/inti)',
        explanation: 'Jantung titik koordinat paling tengah dari sebuah kota atau lingkaran.',
        sentence: '駅の中心街は賑やかだ。 (Pusat kota di dekat stasiun sangat ramai.)'
      },
      {
        word: '熱心',
        reading: 'ねっしん (nesshin)',
        meaning: 'Antusias / Bersungguh-sungguh',
        level: 'N3',
        breakdown: '熱 (panas membara) + 心 (hati)',
        explanation: 'Hati yang menyala panas penuh gairah saat belajar atau bekerja.',
        sentence: '彼は何事にも熱心に取り組む。 (Dia mengerjakan hal apa pun dengan sungguh-sungguh.)'
      },
      {
        word: '心理',
        reading: 'しんり (shinri)',
        meaning: 'Psikologi / Kondisi kejiwaan',
        level: 'N2',
        breakdown: '心 (jiwa/batin) + 理 (hukum nalar/logika)',
        explanation: 'Ilmu logika yang mempelajari alur kerja jiwa dan pikiran manusia.',
        sentence: '消費者の心理を分析する。 (Menganalisis psikologi konsumen.)'
      },
      {
        word: '良心',
        reading: 'りょうしん (ryoushin)',
        meaning: 'Hati nurani',
        level: 'N2',
        breakdown: '良 (baik/luhur) + 心 (hati)',
        explanation: 'Kompas moral batin terdalam yang membedakan baik dan buruk.',
        sentence: '良心の呵責に苛まれる。 (Tersiksa oleh rasa bersalah hati nurani.)'
      },
      {
        word: '心血',
        reading: 'しんけつ (shinketsu)',
        meaning: 'Segenap jiwa raga / Darah dan hati',
        level: 'N1',
        breakdown: '心 (jantung) + 血 (darah)',
        explanation: 'Mencurahkan seluruh darah dan detak jantung demi sebuah karya agung.',
        sentence: '心血を注いで傑作を書き上げた。 (Mencurahkan segenap jiwa raga menuntaskan mahakarya.)'
      }
    ]
  },
  {
    id: 'tree-gaku',
    rootKanji: '学',
    rootReading: 'ガク / まな・ぶ (gaku / manabu)',
    rootMeaning: 'Belajar / Studi / Ilmu Pengetahuan',
    description: 'Anak kecil (子) di bawah naungan atap rumah perguruan yang membuka pikiran.',
    compounds: [
      {
        word: '学校',
        reading: 'がっこう (gakkou)',
        meaning: 'Sekolah',
        level: 'N5',
        breakdown: '学 (belajar) + 校 (fasilitas/gedung)',
        explanation: 'Gedung lembaga resmi tempat berkumpulnya para penuntut ilmu.',
        sentence: '毎朝８時に学校へ行きます。 (Setiap pagi jam 8 saya pergi ke sekolah.)'
      },
      {
        word: '大学',
        reading: 'だいがく (daigaku)',
        meaning: 'Universitas / Perguruan Tinggi',
        level: 'N5',
        breakdown: '大 (besar/tinggi) + 学 (studi)',
        explanation: 'Jenjang pendidikan agung untuk mendalami keilmuan spesifik.',
        sentence: '大学で経済学を専攻しています。 (Saya mengambil jurusan ekonomi di universitas.)'
      },
      {
        word: '科学',
        reading: 'かがく (kagaku)',
        meaning: 'Sains / Ilmu Pengetahuan',
        level: 'N4',
        breakdown: '科 (cabang bidang) + 学 (ilmu)',
        explanation: 'Cabang ilmu pengetahuan sistematis berbasis bukti empiris.',
        sentence: '科学技術の進歩は目覚ましい。 (Kemajuan sains dan teknologi sangat luar biasa.)'
      },
      {
        word: '留学',
        reading: 'りゅうがく (ryuugaku)',
        meaning: 'Studi di luar negeri',
        level: 'N4',
        breakdown: '留 (tinggal bermukim) + 学 (studi)',
        explanation: 'Bermukim di negeri asing demi menimba ilmu pengetahuan.',
        sentence: '来年から日本へ留学する予定です。 (Tahun depan saya berencana studi ke Jepang.)'
      },
      {
        word: '学者',
        reading: 'がくしゃ (gakusha)',
        meaning: 'Cendekiawan / Ilmuwan',
        level: 'N3',
        breakdown: '学 (ilmu) + 者 (orang)',
        explanation: 'Orang yang mengabdikan hidupnya dalam penelitian ilmiah.',
        sentence: '著名な歴史学者にインタビューした。 (Mewawancarai sejarawan terkemuka.)'
      },
      {
        word: '哲学',
        reading: 'てつがく (tetsugaku)',
        meaning: 'Filsafat',
        level: 'N2',
        breakdown: '哲 (kebijaksanaan) + 学 (ilmu)',
        explanation: 'Ilmu pencarian kebijaksanaan dasar tentang hakikat eksistensi.',
        sentence: '古代ギリシャの哲学を学ぶ。 (Mempelajari filsafat Yunani kuno.)'
      },
      {
        word: '博学',
        reading: 'はくがく (hakugaku)',
        meaning: 'Berpengetahuan luas / Ensiklopedis',
        level: 'N1',
        breakdown: '博 (luas/melimpah) + 学 (ilmu)',
        explanation: 'Seseorang yang pengetahuannya mencakup berbagai disiplin keilmuan.',
        sentence: '彼は博学多才な人物として知られる。 (Dia dikenal sebagai sosok yang berpengetahuan luas dan bertalenta tinggi.)'
      }
    ]
  }
];
