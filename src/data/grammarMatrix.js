/**
 * Database Matriks Komparasi Tata Bahasa Serupa (類似文法使い分けマトリクス)
 * Menjelaskan perbedaan tajam syarat gramatikal, subjek, kehendak (volition), dan nuansa emosional.
 */

export const grammarMatrixGroups = [
  {
    id: 'matrix-1',
    title: 'Larangan & Ketidakmungkinan ("Tidak Boleh / Tidak Bisa")',
    level: 'N3–N1',
    description: 'Ketiganya sering diterjemahkan "tidak boleh" atau "tidak bisa", tetapi alasan psikologis dan situasi sosialnya sangat bertolak belakang.',
    patterns: [
      {
        pattern: '〜てはいけない',
        level: 'N5–N4',
        meaning: 'Tidak boleh (Larangan Aturan / Hukum)',
        subjectRestriction: 'Ditujukan kepada orang lain / umum',
        volition: 'Verba Kehendak (Volitional)',
        formality: 'Netral / Instruksi Resmi',
        coreNuance: 'Larangan objektif berdasarkan aturan hukum, tata tertib sekolah, atau norma umum.',
        goodExample: {
          jp: 'テスト中に携帯電話を使ってはいけません。',
          id: 'Tidak boleh menggunakan ponsel selama ujian berlangsung. (⭕ Aturan resmi tertulis)'
        },
        badExample: {
          jp: '明日は大事な会議があるから、風邪をひいてはいけない。（不自然）',
          id: '❌ "Tidak boleh masuk angin" aneh memakai 〜てはいけない karena masuk angin bukan tindakan yang bisa dikontrol aturan hukum.'
        }
      },
      {
        pattern: '〜わけにはいかない',
        level: 'N3–N2',
        meaning: 'Tidak bisa / Tak mungkin (Alasan Moral / Tanggung Jawab)',
        subjectRestriction: 'Hampir selalu pembicara sendiri (Orang ke-1)',
        volition: 'Verba Kehendak (Volitional)',
        formality: 'Formal / Sopan',
        coreNuance: 'Sebenarnya ingin melakukan atau mampu secara fisik, tetapi hati nurani, rasa malu, norma sosial, atau kewajiban mencegahnya.',
        goodExample: {
          jp: '明日は大事なプレゼンがあるので、熱があっても休むわけにはいかない。',
          id: 'Besok ada presentasi penting, jadi meskipun demam, saya tak mungkin (secara tanggung jawab) bolos. (⭕)'
        },
        badExample: {
          jp: '信号が赤だから、渡るわけにはいかない。（やや不自然）',
          id: '❌ Lampu lalu lintas merah adalah larangan aturan hukum objektif biasa, lebih alami memakai 〜てはいけない atau 〜てはだめだ.'
        }
      },
      {
        pattern: '〜ものか / 〜もんか',
        level: 'N2–N1',
        meaning: 'Mana sudi! / Sama sekali tidak akan pernah!',
        subjectRestriction: 'Pembicara sendiri (Orang ke-1)',
        volition: 'Verba Kehendak (Volitional)',
        formality: 'Sangat Kasual / Emosional Kuat',
        coreNuance: 'Penolakan keras dengan nada jengkel atau tekad membara: "Mustahil saya sudi melakukan hal itu lagi!".',
        goodExample: {
          jp: 'あんなまずい店、二度と行くものか！',
          id: 'Restoran sehambar itu, mana sudi saya datang lagi untuk kedua kalinya! (⭕ Tekad emosional)'
        },
        badExample: {
          jp: '社長、この書類にサインするものですか。（不適切）',
          id: '❌ Sangat kasar dan tidak sopan jika dipakai kepada atasan atau dalam situasi formal.'
        }
      }
    ],
    drill: {
      question: 'Kalimat manakah yang paling natural saat Anda merasa tidak enak hati dan terbebani tanggung jawab untuk membatalkan janji dengan rekan kerja?',
      options: [
        '約束を破るわけにはいきません。',
        '約束を破ってはいけません。',
        '約束を破るものですか。',
        '約束を破るはずがありません。'
      ],
      correctIndex: 0,
      explanation: 'Tanggung jawab moral pribadi menggunakan 〜わけにはいかない (Saya tak mungkin mengingkari janji).'
    }
  },
  {
    id: 'matrix-2',
    title: 'Keputusan & Ketetapan ("Memutuskan / Menjadi Ketetapan")',
    level: 'N4–N3',
    description: 'Perbedaan mendasar antara usaha kebiasaan pribadi, keputusan sekali jalan, dan aturan yang ditetapkan oleh pihak luar.',
    patterns: [
      {
        pattern: '〜ようにする',
        level: 'N4',
        meaning: 'Berusaha untuk selalu...',
        subjectRestriction: 'Pembicara sendiri (Orang ke-1)',
        volition: 'Verba Kehendak (Volitional)',
        formality: 'Netral',
        coreNuance: 'Upaya sadar yang dilakukan berulang-ulang untuk membangun kebiasaan hidup baik.',
        goodExample: {
          jp: '健康のために、毎朝野菜ジュースを飲むようにしています。',
          id: 'Demi kesehatan, saya berusaha membiasakan diri minum jus sayur setiap pagi. (⭕ Kebiasaan rutin)'
        },
        badExample: {
          jp: '明日から背が高くなるようにします。（誤り）',
          id: '❌ Bertambah tinggi badan bukan tindakan kehendak yang bisa diusahakan dengan 〜ようにする.'
        }
      },
      {
        pattern: '〜ことにする',
        level: 'N4–N3',
        meaning: 'Memutuskan untuk...',
        subjectRestriction: 'Bisa orang ke-1 atau keputusan bersama',
        volition: 'Verba Kehendak (Volitional)',
        formality: 'Netral',
        coreNuance: 'Menetapkan sebuah pilihan keputusan yang konkret atas kehendak diri sendiri.',
        goodExample: {
          jp: '今年の夏休みは、どこへも行かずに家で勉強することにした。',
          id: 'Liburan musim panas tahun ini, saya memutuskan untuk tidak pergi ke mana-mana dan belajar di rumah. (⭕ Keputusan sadar)'
        },
        badExample: {
          jp: '雨が降ることにしました。（誤り）',
          id: '❌ Hujan turun adalah fenomena alam, tidak bisa diputuskan dengan 〜ことにする.'
        }
      },
      {
        pattern: '〜ことになる',
        level: 'N4–N3',
        meaning: 'Ditetapkan bahwa... / Akhirnya menjadi...',
        subjectRestriction: 'Bebas (pihak luar / regulasi)',
        volition: 'Hasil Ketetapan (Non-Volitional)',
        formality: 'Formal / Sopan',
        coreNuance: 'Keputusan telah ditentukan oleh pihak eksternal (kantor, atasan, aturan negara) tanpa campur tangan kehendak pribadi pembicara.',
        goodExample: {
          jp: '来月から大阪支社へ転勤することになりました。',
          id: 'Mulai bulan depan saya ditetapkan dipindahtugaskan ke kantor cabang Osaka. (⭕ Perintah kantor)'
        },
        badExample: {
          jp: '私はダイエットのために、甘いものを食べないことになりました。（やや不自然）',
          id: '❌ Jika diet adalah keputusan kehendak pribadi sendiri, gunakan 〜ことにしました, bukan 〜ことになりました.'
        }
      }
    ],
    drill: {
      question: 'Saat mengumumkan kepada teman bahwa kantor Anda menugaskan Anda dinas ke Tokyo minggu depan, kalimat yang tepat adalah...',
      options: [
        '来週東京へ出張することになりました。',
        '来週東京へ出張するようにしました。',
        '来週東京へ出張するわけになりました。',
        '来週東京へ出張するはずをしました。'
      ],
      correctIndex: 0,
      explanation: 'Penugasan dari atasan/perusahaan menggunakan 〜ことになる (Ditetapkan oleh pihak luar).'
    }
  },
  {
    id: 'matrix-3',
    title: 'Rentang Waktu & Batasan ("Selagi / Selama")',
    level: 'N3–N2',
    description: 'Membedakan batas waktu alami yang mendesak sebelum kondisi berubah (うちに) vs periode umum di tengah kegiatan lain (あいだに).',
    patterns: [
      {
        pattern: '〜うちに',
        level: 'N3',
        meaning: 'Selagi / Mumpung belum...',
        subjectRestriction: 'Bebas',
        volition: 'Klausa belakang berkehendak mendesak',
        formality: 'Netral',
        coreNuance: 'Harus segera bertindak sekarang selagi kondisi A masih ada. Jika terlambat, kondisi A akan hilang secara alami (makanan dingin, masih muda, belum hujan).',
        goodExample: {
          jp: 'スープが温かいうちに、早く召し上がってください。',
          id: 'Silakan segera disantap selagi supnya masih hangat. (⭕ Segera, sebelum sup mendingin)'
        },
        badExample: {
          jp: '夏休みのうちに、３日間宿題をした。（やや不自然）',
          id: '❌ Untuk sekadar menyebut rentang waktu liburan tanpa urgensi kondisi yang cepat berubah, lebih tepat 〜あいだに.'
        }
      },
      {
        pattern: '〜あいだに (間に)',
        level: 'N4–N3',
        meaning: 'Di sela-sela / Sewaktu durasi...',
        subjectRestriction: 'Subjek klausa depan dan belakang bisa berbeda',
        volition: 'Tindakan satu kali di tengah durasi',
        formality: 'Netral',
        coreNuance: 'Sebuah aksi singkat terjadi di dalam rentang waktu peristiwa lain yang memiliki durasi jelas.',
        goodExample: {
          jp: '子供が寝ている間に、部屋の掃除を済ませた。',
          id: 'Sewaktu anak sedang tidur, saya menyelesaikan berbenah kamar. (⭕ Aksi di tengah durasi)'
        },
        badExample: {
          jp: '温かい間にスープを飲んでください。（不自然）',
          id: '❌ "Selagi hangat" wajib menggunakan 〜うちに.'
        }
      },
      {
        pattern: '〜かぎり (限り)',
        level: 'N2',
        meaning: 'Selama (Syarat Mutlak)',
        subjectRestriction: 'Bebas',
        volition: 'Kondisi Prasyarat',
        formality: 'Formal / Ragam Tulis',
        coreNuance: 'Selama batas kondisi A masih terus berlanjut, maka situasi B akan tetap berlaku seutuhnya.',
        goodExample: {
          jp: '生きている限り、夢を諦めない。',
          id: 'Selama saya masih bernapas (hidup), saya tidak akan menyerah menggapai impian. (⭕ Batas mutlak)'
        },
        badExample: {
          jp: '雨の限りに家にいます。（文法誤り）',
          id: '❌ Bukan bentuk penggunaan 〜かぎり.'
        }
      }
    ],
    drill: {
      question: 'Pilihlah kalimat yang paling tepat untuk: "Mumpung masih belum lupa, mari kita catat sekarang":',
      options: [
        '忘れないうちに、メモしておこう。',
        '忘れない間に、メモしておこう。',
        '忘れない限りに、メモしておこう。',
        '忘れないようにして、メモしておこう。'
      ],
      correctIndex: 0,
      explanation: 'Urgensi sebelum ingatan lenyap secara alami menggunakan 〜うちに (Mumpung belum lupa).'
    }
  },
  {
    id: 'matrix-4',
    title: 'Kabar Angin vs Dugaan Pengamatan ("Katanya / Kelihatannya")',
    level: 'N4–N3',
    description: 'Sangat sering mengecoh pemula: beda 〜そうだ kabar angin murni tanpa opini pribadi vs 〜そうだ pengamatan visual langsung.',
    patterns: [
      {
        pattern: '〜そうだ (Kabar Angin / Denbun)',
        level: 'N4',
        meaning: 'Katanya... / Menurut kabar...',
        subjectRestriction: 'Informasi dari pihak ketiga',
        volition: 'Kamus / Bentuk Biasa + そうだ',
        formality: 'Netral',
        coreNuance: '100% meneruskan kabar yang didengar dari berita atau orang lain, tanpa dugaan penglihatan sendiri.',
        goodExample: {
          jp: '天気予報によると、明日は午後から大雨になるそうだ。',
          id: 'Menurut ramalan cuaca, katanya besok mulai siang akan hujan lebat. (⭕ Mengutip sumber)'
        },
        badExample: {
          jp: 'このケーキ、とてもおいしいそうだ。（不自然）',
          id: '❌ Jika Anda melihat kuenya langsung di etalase dan menduga rasanya enak, gunakan おいしそう (tanpa い).'
        }
      },
      {
        pattern: '〜そうだ (Dugaan Visual / Youbou)',
        level: 'N4',
        meaning: 'Kelihatannya... / Tampaknya mau...',
        subjectRestriction: 'Pengamatan mata langsung',
        volition: 'Pangkal Kata Sifat (Drop い/な) / Masu Stem + そうだ',
        formality: 'Netral',
        coreNuance: 'Kesimpulan seketika dari apa yang dilihat mata saat itu (makanan tampak enak, tali mau putus, awan tampak mau hujan).',
        goodExample: {
          jp: '今にも雨が降り出しそうな空ですね。',
          id: 'Langitnya tampak seolah-olah hujan mau segera turun kapan saja ya. (⭕ Dugaan mata)'
        },
        badExample: {
          jp: 'ニュースによると、大雨が降りそうだ。（不適切）',
          id: '❌ Mengutip berita resmi harus memakai bentuk kabar angin 〜降るそうだ.'
        }
      },
      {
        pattern: '〜らしい',
        level: 'N4–N3',
        meaning: 'Sepertinya... / Kabarnya begitu...',
        subjectRestriction: 'Kabar angin umum dengan sedikit keyakinan pembicara',
        volition: 'Bentuk Biasa + らしい',
        formality: 'Netral / Percakapan',
        coreNuance: 'Mendengar desas-desus atau melihat jejak bukti, lalu menyimpulkan secara wajar bahwa hal itu benar.',
        goodExample: {
          jp: '噂では、あの二人は来月結婚するらしいよ。',
          id: 'Gosipnya, sepertinya mereka berdua akan menikah bulan depan lho. (⭕ Desas-desus)'
        },
        badExample: {
          jp: 'このスープは熱いらしいから気をつけて。（自分で触った場合不自然）',
          id: '❌ Jika menyentuh mangkuknya sendiri secara langsung, gunakan 熱そう.'
        }
      }
    ],
    drill: {
      question: 'Anda melihat apel merah berkilau di supermarket dan berpikir "Kelihatannya manis sekali!". Kalimat yang benar:',
      options: [
        'このリンゴ、とても甘そうだ。',
        'このリンゴ、とても甘いそうだ。',
        'このリンゴ、とても甘いらしい。',
        'このリンゴ、とても甘いわけだ。'
      ],
      correctIndex: 0,
      explanation: 'Dugaan visual langsung: buang huruf い dari kata sifat 甘い $\\rightarrow$ 甘そう (tampak manis).'
    }
  }
];
