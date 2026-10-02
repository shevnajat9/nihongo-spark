// Database Pojok Bacaan Bertingkat (Tadoku Graded Readers / 多読)
// Tingkat N5–N2 mencakup dongeng klasik, kisah harian, dan adaptasi berita ringan.

export const tadokuStories = [
  // N5 - TINGKAT DASAR
  {
    id: 'td-n5-01',
    level: 'N5',
    genre: 'Dongeng Klasik (Mukashibanashi)',
    title: '桃太郎 (Momotaro)',
    titleReading: 'ももたろう',
    wordCount: 120,
    readTimeMinutes: 2,
    summary: 'Kisah anak laki-laki yang lahir dari buah persik besar dan pergi menumpas monster jahat bersama hewan sahabatnya.',
    paragraphs: [
      {
        sentences: [
          {
            text: '昔々、ある所に、おじいさんとおばあさんが住んでいました。',
            reading: 'むかしむかし、あるところに、おじいさんと おばあさんが すんでいました。',
            indonesian: 'Dahulu kala, di suatu tempat, hiduplah seorang kakek dan seorang nenek.'
          },
          {
            text: 'おじいさんは山へ柴刈りに、おばあさんは川へ洗濯に行きました。',
            reading: 'おじいさんは やまへ しばかりに、おばあさんは かわへ せんたくに いきました。',
            indonesian: 'Kakek pergi ke gunung untuk mengumpulkan kayu bakar, dan nenek pergi ke sungai untuk mencuci pakaian.'
          }
        ]
      },
      {
        sentences: [
          {
            text: 'おばあさんが川で洗濯をしていると、大きな桃がどんぶらこと流れてきました。',
            reading: 'おばあさんが かわで せんたくを していると、おおきな ももが どんぶらこと ながれてきました。',
            indonesian: 'Ketika nenek sedang mencuci di sungai, sebuah buah persik yang sangat besar hanyut terapung-apung.'
          },
          {
            text: 'おばあさんは喜んで、その桃を家に持って帰りました。',
            reading: 'おばあさんは よろこんで、その ももを いえに もって かえりました。',
            indonesian: 'Nenek sangat gembira dan membawa pulang buah persik itu ke rumah.'
          }
        ]
      },
      {
        sentences: [
          {
            text: '桃を切ると、中から元気な男の赤ちゃんが生まれました。',
            reading: 'ももを きると、なかから げんきな おとこの あかちゃんが うまれました。',
            indonesian: 'Saat buah persik itu dibelah, dari dalamnya lahir seorang bayi laki-laki yang sehat bugar.'
          },
          {
            text: '二人は赤ちゃんに「桃太郎」という名前をつけました。桃太郎はすくすく大きく育ちました。',
            reading: 'ふたりは あかちゃんに「ももたろう」という なまえを つけました。ももたろうは すくすく おおきく そだちました。',
            indonesian: 'Keduanya menamai bayi itu "Momotaro". Momotaro tumbuh besar dengan sehat dan cepat.'
          }
        ]
      }
    ],
    vocabHighlights: [
      { word: '昔々', reading: 'むかしむかし', meaning: 'dahulu kala' },
      { word: '川', reading: 'かわ', meaning: 'sungai' },
      { word: '洗濯', reading: 'せんたく', meaning: 'mencuci baju' },
      { word: '桃', reading: 'もも', meaning: 'buah persik' },
      { word: '生まれる', reading: 'うまれる', meaning: 'lahir' }
    ],
    quiz: [
      {
        question: 'おばあさんはどこで大きな桃を見つけましたか。',
        options: ['山の中 (Di dalam gunung)', '川 (Di sungai)', '海 (Di laut)', '畑 (Di ladang)'],
        correctIndex: 1,
        explanation: 'Di paragraf 2 dijelaskan bahwa nenek menemukan buah persik besar saat mencuci pakaian di sungai (川).'
      },
      {
        question: '桃の中から誰が生まれましたか。',
        options: ['犬 (Anjing)', '小さな鬼 (Monster kecil)', '元気な男の赤ちゃん (Bayi laki-laki yang sehat)', '女の子 (Anak perempuan)'],
        correctIndex: 2,
        explanation: 'Dari dalam persik lahir bayi laki-laki yang sehat yang dinamai Momotaro.'
      }
    ]
  },
  {
    id: 'td-n5-02',
    level: 'N5',
    genre: 'Kehidupan Sehari-hari',
    title: '私の一日 (Hari-Hariku)',
    titleReading: 'わたしの いちにち',
    wordCount: 110,
    readTimeMinutes: 2,
    summary: 'Cerita rutinitas harian seorang mahasiswa internasional di Tokyo.',
    paragraphs: [
      {
        sentences: [
          {
            text: '私は毎朝七時に起きます。朝ご飯にパンと卵を食べて、コーヒーを飲みます。',
            reading: 'わたしは まいあさ しちじに おきます。あさごはんに パンと たまごを たべて、コーヒーを のみます。',
            indonesian: 'Saya bangun setiap pagi jam 7. Untuk sarapan saya makan roti dan telur, lalu minum kopi.'
          },
          {
            text: '八時半に電車に乗って、日本語学校へ行きます。',
            reading: 'はちじはんに でんしゃに のって、にほんごがっこうへ いきます。',
            indonesian: 'Pada jam 8.30 saya naik kereta listrik dan pergi ke sekolah bahasa Jepang.'
          }
        ]
      },
      {
        sentences: [
          {
            text: '学校では漢字と文法をたくさん勉強します。友達と日本語で話すのはとても楽しいです。',
            reading: 'がっこうでは かんじと ぶんぽうを たくさん べんきょうします。ともだちと にほんごで はなすのは とても たのしいです。',
            indonesian: 'Di sekolah saya banyak belajar kanji dan tata bahasa. Berbicara dalam bahasa Jepang bersama teman sangat menyenangkan.'
          },
          {
            text: '夕方に家へ帰って、宿題をしてから夜十一時に寝ます。',
            reading: 'ゆうがたに いえへ かえって、しゅくだいを してから よる じゅういちじに ねます。',
            indonesian: 'Di sore hari saya pulang ke rumah, mengerjakan PR, lalu tidur pada jam 11 malam.'
          }
        ]
      }
    ],
    vocabHighlights: [
      { word: '毎朝', reading: 'まいあさ', meaning: 'setiap pagi' },
      { word: '電車', reading: 'でんしゃ', meaning: 'kereta listrik' },
      { word: '宿題', reading: 'しゅくだい', meaning: 'pekerjaan rumah (PR)' },
      { word: '楽しい', reading: 'たのしい', meaning: 'menyenangkan' }
    ],
    quiz: [
      {
        question: '主人公は何時に学校へ行くために電車に乗りますか。',
        options: ['7:00', '7:30', '8:30', '9:00'],
        correctIndex: 2,
        explanation: 'Disebutkan pada kalimat kedua: 八時半に電車に乗って (jam 8.30 naik kereta).'
      }
    ]
  },

  // N4 - TINGKAT MENENGAH DASAR
  {
    id: 'td-n4-01',
    level: 'N4',
    genre: 'Dongeng Klasik (Mukashibanashi)',
    title: '浦島太郎 (Urashima Taro)',
    titleReading: 'うらしまたろう',
    wordCount: 160,
    readTimeMinutes: 3,
    summary: 'Kisah seorang nelayan baik hati yang menyelamatkan penyu dan diajak mengunjungi Istana Naga di dasar samudra.',
    paragraphs: [
      {
        sentences: [
          {
            text: 'むかし、心優しい漁師の浦島太郎が浜辺を歩いていると、子供たちがいじめられている亀を見つけました。',
            reading: 'むかし、こころやさしい りょうしの うらしまたろうが はまべを あるいていると、こどもたちが いじめられている かめを みつけました。',
            indonesian: 'Dahulu kala, saat seorang nelayan berhati baik bernama Urashima Taro sedang berjalan di tepi pantai, ia melihat seekor kura-kura/penyu sedang diganggu oleh anak-anak.'
          },
          {
            text: '太郎は子供たちを止めて、亀を助けて海へ逃がしてやりました。',
            reading: 'たろうは こどもたちを とめて、かめを たすけて うみへ にがして やりました。',
            indonesian: 'Taro menghentikan anak-anak itu, menyelamatkan kura-kura tersebut, lalu melepaskannya kembali ke laut.'
          }
        ]
      },
      {
        sentences: [
          {
            text: '数日後、太郎が海で釣りをしていると、助けた亀がやって来て言いました。',
            reading: 'すうじつご、たろうが うみで つりを していると、たすけた かめが やってきて いいました。',
            indonesian: 'Beberapa hari kemudian, saat Taro sedang memancing di laut, kura-kura yang ia tolong datang menghampiri dan berkata.'
          },
          {
            text: '「この前のお礼に、美しい竜宮城へご案内いたします。」',
            reading: '「このまえの おれいに、うつくしい りゅうぐうじょうへ ごあんないいたします。」',
            indonesian: '"Sebagai rasa terima kasih atas yang kemarin, saya akan memandu Anda ke Istana Naga yang sangat indah."'
          },
          {
            text: '太郎は亀の背中に乗って、海の深い底にある竜宮城へと向かいました。',
            reading: 'たろうは かめの せなかに のって、うみの ふかい そこにある りゅうぐうじょうへと むかいました。',
            indonesian: 'Taro naik ke punggung kura-kura dan berangkat menuju Istana Naga yang berada di dasar laut yang dalam.'
          }
        ]
      }
    ],
    vocabHighlights: [
      { word: '漁師', reading: 'りょうし', meaning: 'nelayan' },
      { word: '浜辺', reading: 'はまべ', meaning: 'tepi pantai' },
      { word: '亀', reading: 'かめ', meaning: 'penyu / kura-kura' },
      { word: '背中', reading: 'せなか', meaning: 'punggung' },
      { word: '底', reading: 'そこ', meaning: 'dasar / bagian bawah' }
    ],
    quiz: [
      {
        question: '太郎は浜辺で何をしましたか。',
        options: ['魚をたくさん釣った', '子供たちにいじめられていた亀を助けた', '海で泳いだ', '宝箱を拾った'],
        correctIndex: 1,
        explanation: 'Taro menolong penyu yang sedang diganggu oleh anak-anak di tepi pantai.'
      }
    ]
  },

  // N3 - TINGKAT MENENGAH
  {
    id: 'td-n3-01',
    level: 'N3',
    genre: 'Budaya & Berita Ringan',
    title: '日本のコンビニ文化 (Budaya Konbini di Jepang)',
    titleReading: 'にほんの コンビニぶんか',
    wordCount: 180,
    readTimeMinutes: 3,
    summary: 'Bagaimana minimarket (konbini) 24 jam menjadi urat nadi kehidupan masyarakat modern di Jepang.',
    paragraphs: [
      {
        sentences: [
          {
            text: '日本全国には五万軒以上のコンビニがあり、年中無休で二十四時間営業しています。',
            reading: 'にほんぜんこくには ごまんけんいじょうの コンビニが あり、ねんじゅうむきゅうで にじゅうよじかん えいぎょうしています。',
            indonesian: 'Di seluruh Jepang terdapat lebih dari 50.000 gerai minimarket, yang buka 24 jam nonstop sepanjang tahun.'
          },
          {
            text: 'ただ買い物をするだけでなく、公共料金の支払いや宅配便の受け取り、ATMでの現金引き出しなど、生活に不可欠なサービスを提供しています。',
            reading: 'ただ かいものを するだけでなく、こうきょうりょうきんの しはらいや たくはいびんの うけとり、ATMでの げんきんひきだしなど、せいかつに ふかけつな サービスを ていきょうしています。',
            indonesian: 'Bukan sekadar tempat berbelanja, konbini juga menyediakan layanan krusial sehari-hari seperti pembayaran tagihan umum, pengambilan paket ekspres, hingga penarikan uang tunai di ATM.'
          }
        ]
      },
      {
        sentences: [
          {
            text: '近年では、災害が発生した際の避難支援拠点や物資補給地としての役割も高く評価されています。',
            reading: 'きんねんでは、さいがいが はっせいした さいの ひなんしえんきょてんや ぶっしほきゅうちとしての やくわりも たかく ひょうかされています。',
            indonesian: 'Dalam beberapa tahun terakhir, peran konbini sebagai pusat bantuan pengungsian dan pos pasokan logistik saat terjadi bencana alam juga dinilai sangat tinggi.'
          },
          {
            text: '食品の品質管理も徹底されており、季節ごとに新しいデザートやお弁当が開発され、外国人観光客の間でも大人気です。',
            reading: 'しょくひんの ひんしつかんりも てっていされており、きせつごとに あたらしい デザートや おべんとうが かいはつされ、がいこくじんかんこうきゃくの あいだでも だいにんきです。',
            indonesian: 'Kontrol mutu makanannya pun sangat ketat; makanan penutup dan bento baru selalu dikembangkan di tiap musim, sehingga sangat populer bahkan di kalangan wisatawan mancanegara.'
          }
        ]
      }
    ],
    vocabHighlights: [
      { word: '年中無休', reading: 'ねんじゅうむきゅう', meaning: 'buka sepanjang tahun tanpa libur' },
      { word: '公共料金', reading: 'こうきょうりょうきん', meaning: 'tagihan utilitas umum (listrik/air/gas)' },
      { word: '不可欠', reading: 'ふかけつ', meaning: 'sangat penting / tak tergantikan' },
      { word: '災害', reading: 'さいがい', meaning: 'bencana alam' },
      { word: '品質管理', reading: 'ひんしつかんり', meaning: 'manajemen kontrol kualitas' }
    ],
    quiz: [
      {
        question: '記事によると、日本のコンビニは何軒以上ありますか。',
        options: ['1万軒', '3万軒', '5万軒', '10万軒'],
        correctIndex: 2,
        explanation: 'Paragraf pertama menyebutkan: 日本全国には五万軒以上のコンビニがあり (lebih dari 50.000 gerai di seluruh Jepang).'
      },
      {
        question: '近年、災害時にコンビニはどのような役割を果たすと評価されていますか。',
        options: ['避難支援や物資補給の拠点', '消防署の代わり', '病院の代わり', '宿泊施設'],
        correctIndex: 0,
        explanation: 'Konbini berperan sebagai basis pendukung evakuasi dan pasokan logistik (避難支援拠点や物資補給地).'
      }
    ]
  }
];
