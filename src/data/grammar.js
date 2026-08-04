export const grammarData = [
  // ================= N5 GRAMMAR =================
  {
    pattern: '〜は〜です',
    level: 'N5',
    structure: 'Kata Benda [A] + は + Kata Benda [B] + です',
    explanation: 'Menyatakan bahwa A adalah B. Partikel "は" (dilafalkan "wa") adalah penanda topik kalimat.',
    examples: [
      { sentence: '私は学生です。', reading: 'わたしはがくせいです。', romaji: 'Watashi wa gakusei desu.', meaning: 'Saya adalah siswa.' },
      { sentence: 'これは本です。', reading: 'これはほんです。', romaji: 'Kore wa hon desu.', meaning: 'Ini adalah buku.' }
    ]
  },
  {
    pattern: '〜を〜ます',
    level: 'N5',
    structure: 'Kata Benda [Objek] + を + Kata Kerja [Bentuk Masu]',
    explanation: 'Partikel "を" (dilafalkan "o") menandakan objek langsung dari kata kerja tindakan.',
    examples: [
      { sentence: '水を飲みます。', reading: 'みずをのみます。', romaji: 'Mizu o nomimasu.', meaning: 'Saya minum air.' },
      { sentence: 'りんごを食べます。', reading: 'りんごをたべます。', romaji: 'Ringo o tabemasu.', meaning: 'Saya makan apel.' }
    ]
  },
  {
    pattern: '〜があります / います',
    level: 'N5',
    structure: 'Kata Benda + が + あります（benda mati） / います（makhluk hidup）',
    explanation: 'Digunakan untuk menunjukkan keberadaan suatu benda atau makhluk hidup di suatu tempat.',
    examples: [
      { sentence: '机の上に本があります。', reading: 'つくえのうえにほんがあります。', romaji: 'Tsukue no ue ni hon ga arimasu.', meaning: 'Ada buku di atas meja.' },
      { sentence: '庭に猫がいます。', reading: 'にわにねこがいます。', romaji: 'Niwa ni neko ga imasu.', meaning: 'Ada kucing di halaman.' }
    ]
  },
  {
    pattern: '〜に〜ます',
    level: 'N5',
    structure: 'Kata Benda [Tempat] + に / へ + 行きます / 来ます / 帰ります',
    explanation: 'Partikel "に" atau "へ" (dilafalkan "e") menunjukkan arah tujuan pergerakan.',
    examples: [
      { sentence: '学校へ行きます。', reading: 'がっこうへいきます。', romaji: 'Gakkou he ikimasu.', meaning: 'Pergi ke sekolah.' },
      { sentence: '日本に来ました。', reading: 'にほんにきました。', romaji: 'Nihon ni kimashita.', meaning: 'Telah datang ke Jepang.' }
    ]
  },
  {
    pattern: '〜てください',
    level: 'N5',
    structure: 'Kata Kerja [Bentuk Te] + ください',
    explanation: 'Digunakan untuk meminta tolong atau memerintahkan lawan bicara secara sopan.',
    examples: [
      { sentence: 'ここに名前を書いてください。', reading: 'ここになまえをかいてください。', romaji: 'Koko ni namae o kaite kudasai.', meaning: 'Tolong tulis nama di sini.' },
      { sentence: 'ゆっくり話してください。', reading: 'ゆっくりはなしてください。', romaji: 'Yukkuri hanashite kudasai.', meaning: 'Tolong bicara pelan-pelan.' }
    ]
  },
  {
    pattern: '〜たいです',
    level: 'N5',
    structure: 'Kata Kerja [Bentuk Masu tanpa masu] + たいです',
    explanation: 'Menyatakan keinginan pembicara untuk melakukan suatu tindakan.',
    examples: [
      { sentence: '日本料理を食べたいです。', reading: 'にほんりょうりをたべたいです。', romaji: 'Nihon ryouri o tabetai desu.', meaning: 'Saya ingin makan masakan Jepang.' },
      { sentence: '新しい車を買いたいです。', reading: 'あたらしいくるまをかいたいです。', romaji: 'Atarashii kuruma o kaitai desu.', meaning: 'Saya ingin membeli mobil baru.' }
    ]
  },

  // ================= N4 GRAMMAR =================
  {
    pattern: '〜たことがあります',
    level: 'N4',
    structure: 'Kata Kerja [Bentuk Ta] + ことがあります',
    explanation: 'Menyatakan pengalaman di masa lalu (pernah melakukan sesuatu).',
    examples: [
      { sentence: '日本へ行ったことがあります。', reading: 'にほんへいったことがあります。', romaji: 'Nihon he itta koto ga arimasu.', meaning: 'Saya pernah pergi ke Jepang.' },
      { sentence: '富士山に登ったことがあります。', reading: 'ふじさんにのぼったことがあります。', romaji: 'Fujisan ni nobotta koto ga arimasu.', meaning: 'Saya pernah mendaki Gunung Fuji.' }
    ]
  },
  {
    pattern: '〜つもりです',
    level: 'N4',
    structure: 'Kata Kerja [Kamus / Bentuk Nai] + つもりです',
    explanation: 'Menunjukkan rencana, niat, atau maksud untuk melakukan (atau tidak melakukan) sesuatu.',
    examples: [
      { sentence: '来年、日本へ留学するつもりです。', reading: 'らいねん、にほんへりゅうがくするつもりです。', romaji: 'Rainen, nihon he ryuugaku suru tsumori desu.', meaning: 'Tahun depan, saya berencana sekolah di Jepang.' },
      { sentence: 'タバコをやめるつもりです。', reading: 'たばこをやめるつもりです。', romaji: 'Tabako o yameru tsumori desu.', meaning: 'Saya berniat untuk berhenti merokok.' }
    ]
  },
  {
    pattern: '〜たほうがいいです',
    level: 'N4',
    structure: 'Kata Kerja [Bentuk Ta / Bentuk Nai] + ほうがいいです',
    explanation: 'Digunakan untuk memberikan saran atau rekomendasi secara kuat kepada lawan bicara.',
    examples: [
      { sentence: '早く寝たほうがいいですよ。', reading: 'はやくねたほうがいいですよ。', romaji: 'Hayaku neta hou ga ii desu yo.', meaning: 'Lebih baik kamu tidur awal lho.' },
      { sentence: '無理をしないほうがいいです。', reading: 'むりをしないほうがいいです。', romaji: 'Muri o shinai hou ga ii desu.', meaning: 'Lebih baik jangan memaksakan diri.' }
    ]
  },
  {
    pattern: '〜たり〜たりします',
    level: 'N4',
    structure: 'Kata Kerja [Bentuk Ta] + り + Kata Kerja [Bentuk Ta] + りします',
    explanation: 'Digunakan untuk menyebutkan beberapa contoh aktivitas secara acak (tidak berurutan secara waktu).',
    examples: [
      { sentence: '週末は本を読んだり、音楽を聞いたりします。', reading: 'しゅうまつはほんをよんだり、おんがくをきいたりします。', romaji: 'Shuumatsu wa hon o yondari, ongaku o kiitari shimasu.', meaning: 'Akhir pekan saya membaca buku, mendengarkan musik, dan sebagainya.' },
      { sentence: '旅行で写真を撮ったり、買い物をしたりしました。', reading: 'りょこうでしゃしんをとったり、かいものをしたりしました。', romaji: 'Ryokou de shashin o tottari, kaimono o shitari shimashita.', meaning: 'Saat liburan saya mengambil foto, belanja, dan sebagainya.' }
    ]
  },
  {
    pattern: '〜てもいいです',
    level: 'N4',
    structure: 'Kata Kerja [Bentuk Te] + もいいです',
    explanation: 'Digunakan untuk memberikan izin atau menanyakan apakah suatu tindakan diperbolehkan.',
    examples: [
      { sentence: 'ここに入ってもいいですか。', reading: 'ここにはいってもいいですか。', romaji: 'Koko ni haitte mo ii desu ka.', meaning: 'Bolehkah saya masuk ke sini?' },
      { sentence: '写真を撮ってもいいですよ。', reading: 'しゃしんをとってもいいですよ。', romaji: 'Shashin o totte mo ii desu yo.', meaning: 'Boleh ambil foto kok.' }
    ]
  },
  {
    pattern: '〜なければなりません',
    level: 'N4',
    structure: 'Kata Kerja [Bentuk Nai tanpa nai] + なければなりません',
    explanation: 'Menyatakan kewajiban atau keharusan untuk melakukan sesuatu.',
    examples: [
      { sentence: '毎日勉強しなければなりません。', reading: 'まいにちべんきょうしなければなりません。', romaji: 'Mainichi benkyou shinakereba narimasen.', meaning: 'Harus belajar setiap hari.' },
      { sentence: '薬を飲まなければなりません。', reading: 'くすりをのまなければなりません。', romaji: 'Kusuri o nomanakereba narimasen.', meaning: 'Harus minum obat.' }
    ]
  },

  // ================= N3 GRAMMAR =================
  {
    pattern: '〜はずです',
    level: 'N3',
    structure: 'KK Kamus / KS-I / KS-Na (+na) / KB (+no) + はずです',
    explanation: 'Menyatakan keyakinan pembicara bahwa sesuatu seharusnya terjadi berdasarkan alasan kuat (seharusnya / semestinya).',
    examples: [
      { sentence: '彼は今日忙しいはずです。', reading: 'かれはきょういそがしいはずです。', romaji: 'Kare wa kyou isogashii hazu desu.', meaning: 'Dia seharusnya sibuk hari ini.' },
      { sentence: '会議は３時に始まるはずです。', reading: 'かいぎはさんじにはじまるはずです。', romaji: 'Kaigi wa sanji ni hajimaru hazu desu.', meaning: 'Rapatnya seharusnya dimulai jam 3.' }
    ]
  },
  {
    pattern: '〜ようにする',
    level: 'N3',
    structure: 'Kata Kerja [Kamus / Bentuk Nai] + ようにする',
    explanation: 'Menunjukkan usaha yang berkelanjutan untuk membiasakan diri melakukan (atau tidak melakukan) sesuatu.',
    examples: [
      { sentence: '毎日日本語を勉強するようにしています。', reading: 'まいにちにほんごをべんきょうするようにしています。', romaji: 'Mainichi nihongo o benkyou suru you ni shite imasu.', meaning: 'Saya membiasakan diri belajar bahasa Jepang setiap hari.' },
      { sentence: '甘いものを食べないようにします。', reading: 'あまいものをたべないようにします。', romaji: 'Amai mono o tabenai you ni shimasu.', meaning: 'Saya akan berusaha untuk tidak makan makanan manis.' }
    ]
  },
  {
    pattern: '〜ために',
    level: 'N3',
    structure: 'Kata Kerja [Kamus] / Kata Benda + の + ために',
    explanation: 'Menyatakan tujuan (demi/untuk) atau alasan penyebab dari suatu hal.',
    examples: [
      { sentence: '留学のために貯金をしています。', reading: 'りゅうがくのためにちょきんをしています。', romaji: 'Ryuugaku no tame ni chokin o shite imasu.', meaning: 'Menabung untuk kepentingan sekolah ke luar negeri.' },
      { sentence: '家族のために頑張ります。', reading: 'かぞくのためにがんばります。', romaji: 'Kazoku no tame ni ganbarimasu.', meaning: 'Berjuang demi keluarga.' }
    ]
  },
  {
    pattern: '〜ながら',
    level: 'N3',
    structure: 'Kata Kerja [Bentuk Masu tanpa masu] + ながら',
    explanation: 'Menunjukkan dua tindakan yang dilakukan secara bersamaan oleh subjek yang sama (sambil...).',
    examples: [
      { sentence: '音楽を聞きながら勉強します。', reading: 'おんがくをききながらべんきょうします。', romaji: 'Ongaku o kikinagara benkyou shimasu.', meaning: 'Belajar sambil mendengarkan musik.' },
      { sentence: '歩きながらスマホを見ないでください。', reading: 'あるきながらすまほをみないでください。', romaji: 'Arukinagara sumaho o minaide kudasai.', meaning: 'Jangan melihat smartphone sambil berjalan.' }
    ]
  },
  {
    pattern: '〜ばかり',
    level: 'N3',
    structure: 'Kata Kerja [Bentuk Ta] + ばかり',
    explanation: 'Menyatakan bahwa suatu kejadian baru saja selesai dilakukan (baru saja...).',
    examples: [
      { sentence: '今起きたばかりです。', reading: 'いまおきたばかりです。', romaji: 'Ima okita bakari desu.', meaning: 'Saya baru saja bangun tidur.' },
      { sentence: '日本に来たばかりの時、日本語が分からなかった。', reading: 'にほんにきたばかりのとき、にほんごがわからなかった。', romaji: 'Nihon ni kita bakari no toki, nihongo ga wakaranakatta.', meaning: 'Saat baru saja datang ke Jepang, saya tidak paham bahasa Jepang.' }
    ]
  },
  {
    pattern: '〜ようになる',
    level: 'N3',
    structure: 'Kata Kerja [Kamus / Potensial / Bentuk Nai] + ようになる',
    explanation: 'Menunjukkan perubahan keadaan dari yang sebelumnya tidak bisa/tidak biasa menjadi bisa/biasa dilakukan.',
    examples: [
      { sentence: '日本語が話せるようになりました。', reading: 'にほんごがはなせるようになりました。', romaji: 'Nihongo ga hanaseru you ni narimashita.', meaning: 'Saya sudah menjadi bisa berbicara bahasa Jepang.' },
      { sentence: '日本に来てから、刺身を食べるようになりました。', reading: 'にほんにきてから、さしみをたべるようになりました。', romaji: 'Nihon ni kite kara, sashimi o taberu you ni narimashita.', meaning: 'Semenjak datang ke Jepang, saya menjadi biasa makan sashimi.' }
    ]
  },

  // ================= N2 GRAMMAR =================
  {
    pattern: '〜わけにはいかない',
    level: 'N2',
    structure: 'Kata Kerja [Kamus] + わけにはいかない',
    explanation: 'Menyatakan ketidakmungkinan melakukan sesuatu karena alasan moral, tanggung jawab sosial, atau perasaan sungkan.',
    examples: [
      { sentence: '明日はテストがあるので、休むわけにはいかない。', reading: 'あしたはてすとがあるので、やすむわけにはいかない。', romaji: 'Ashita wa tesuto ga aru node, yasumu wake ni wa ikanai.', meaning: 'Karena besok ada ujian, saya tidak boleh bolos.' },
      { sentence: '車で来たので、お酒を飲むわけにはいきません。', reading: 'くるまできたので、おさけをのむわけにはいきません。', romaji: 'Kuruma de kita node, osake o nomu wake ni wa ikimasen.', meaning: 'Karena datang pakai mobil, saya tidak boleh minum sake.' }
    ]
  },
  {
    pattern: '〜つつある',
    level: 'N2',
    structure: 'Kata Kerja [Bentuk Masu tanpa masu] + つつつある',
    explanation: 'Menyatakan suatu proses perubahan yang sedang berlangsung terus-menerus hingga saat ini (sedang dalam proses...).',
    examples: [
      { sentence: '日本の人口は減少しつつある。', reading: 'にほんのじんこうはげんしょうしつつある。', romaji: 'Nihon no jinkou wa genshou shitsutsu aru.', meaning: 'Populasi Jepang sedang dalam proses menurun.' },
      { sentence: '景気は回復しつつあります。', reading: 'けいきはかいふくしつつあります。', romaji: 'Keiki wa kaifuku shitsutsu arimasu.', meaning: 'Keadaan ekonomi sedang dalam proses pulih.' }
    ]
  },
  {
    pattern: '〜にともなって',
    level: 'N2',
    structure: 'Kata Kerja [Kamus] / Kata Benda + にともなって / に伴い',
    explanation: 'Menyatakan perubahan yang terjadi seiring dengan perubahan hal lain (seiring dengan...).',
    examples: [
      { sentence: '開発が進むにともなって、自然が失われていく。', reading: 'かいはつがすすむにともなって、しぜんがうしなわれていく。', romaji: 'Kaihatsu ga susumu ni tomonatte, shizen ga ushinawarete iku.', meaning: 'Seiring dengan berkembangnya pembangunan, alam perlahan hilang.' },
      { sentence: '携帯電話の普及にともない, 通信料金が下がった。', reading: 'けいたいでんわのふきゅうにともない、つうしんりょうきんがさがった。', romaji: 'Keitai denwa no fukyuu ni tomonai, tsuushin ryoukin ga sagatta.', meaning: 'Seiring dengan meratanya HP, tarif komunikasi menjadi turun.' }
    ]
  },
  {
    pattern: '〜にわたって',
    level: 'N2',
    structure: 'Kata Benda [Waktu/Tempat/Cakupan] + にわたって / にわたり',
    explanation: 'Menunjukkan rentang waktu yang lama, luas wilayah, atau besarnya skala (selama/meliputi...).',
    examples: [
      { sentence: '台風の影響で、広い範囲にわたって停電が発生した。', reading: 'たいふうのえいきょうで、ひろいはんいにわたってていでんがはっせいした。', romaji: 'Taifuu no eikyou de, hiroi hani ni watatte teiden ga hassei shimashita.', meaning: 'Akibat dampak angin topan, pemadaman listrik terjadi meliputi wilayah yang luas.' },
      { sentence: '彼は３年間にわたって研究を続けた。', reading: 'かれはさんねんかんにわたってけんきゅうをつづけた。', romaji: 'Kare wa sannenkan ni watatte kenkyuu o tsuzuketa.', meaning: 'Dia melanjutkan penelitiannya selama 3 tahun penuh.' }
    ]
  },
  {
    pattern: '〜から〜にかけて',
    level: 'N2',
    structure: 'Kata Benda [A] + から + Kata Benda [B] + にかけて',
    explanation: 'Menunjukkan batas waktu atau rentang geografis yang tidak kaku dari A sampai B (dari... hingga...).',
    examples: [
      { sentence: '今夜から明日の朝にかけて大雨が降るでしょう。', reading: 'こんやからあしたのあさにかけておおあめがふるでしょう。', romaji: 'Konya kara ashita no asa ni kakete ooame ga furu deshou.', meaning: 'Hujan lebat diperkirakan akan turun dari malam ini hingga besok pagi.' },
      { sentence: '関東地方から東北地方にかけて地震があった。', reading: 'かんとうちほうからとうほくちほうにかけてじしんがあった。', romaji: 'Kantou chihou kara touhoku chihou ni kakete jishin ga atta.', meaning: 'Gempa bumi terjadi membentang dari wilayah Kanto hingga wilayah Tohoku.' }
    ]
  },
  {
    pattern: '〜さえ〜ば',
    level: 'N2',
    structure: 'Kata Benda + さえ + KK [Bentuk Kondisional (ba)]',
    explanation: 'Menunjukkan satu-satunya syarat mutlak yang diperlukan agar suatu hal dapat terwujud (asal... saja...).',
    examples: [
      { sentence: '薬を飲みさえすれば、病気は治ります。', reading: 'くすりをのみさえすれば、びょうきはなおります。', romaji: 'Kusuri o nomi sae sureba, byouki wa naorimasu.', meaning: 'Asal minum obat saja, penyakitnya pasti sembuh.' },
      { sentence: 'あなたさえいれば、何もいらない。', reading: 'あなたさえいれば、なにもいらない。', romaji: 'Anata sae ireba, nani mo iranai.', meaning: 'Asalkan ada kamu saja, aku tidak butuh apa pun lagi.' }
    ]
  },

  // ================= N1 GRAMMAR =================
  {
    pattern: '〜ずにはいられない',
    level: 'N1',
    structure: 'Kata Kerja [Bentuk Nai tanpa nai] + ずにはいられない (*suru -> sezu)',
    explanation: 'Menyatakan dorongan emosi kuat yang tidak tertahankan, sehingga pelaku tidak bisa menahan diri untuk tidak melakukan tindakan tersebut.',
    examples: [
      { sentence: 'この映画を見ると、泣かずにはいられない。', reading: 'このえいがをみると、なかずにはいられない。', romaji: 'Kono eiga o miru to, nakazu ni wa irarenai.', meaning: 'Saat menonton film ini, saya tidak bisa menahan diri untuk tidak menangis.' },
      { sentence: '彼の昔話を聞いて、笑わずにはいられなかった。', reading: 'かれのむかしばなしをきいて、わらわずにはいられなかった。', romaji: 'Kare no mukashibanashi o kiite, warawazu ni wa irarenakatta.', meaning: 'Mendengar cerita masa lalunya, saya tidak tahan untuk tidak tertawa.' }
    ]
  },
  {
    pattern: '〜かたわら',
    level: 'N1',
    structure: 'Kata Kerja [Kamus] / Kata Benda + の + かたわら',
    explanation: 'Menyatakan bahwa di samping melakukan pekerjaan utama, seseorang juga melakukan aktivitas lain secara berkelanjutan (di samping... juga...).',
    examples: [
      { sentence: '彼は本業の仕事のかたわら、小説を書いている。', reading: 'かれはほんぎょうのしごとのかたわら、しょうせつをかいている。', romaji: 'Kare wa hongyou no shigoto no katawara, shousetsu o kaite iru.', meaning: 'Di samping pekerjaan utamanya, dia juga menulis novel.' },
      { sentence: '大学で教えるかたわら、ボランティア活動をしている。', reading: 'だいがくでおしえるかたわら、ぼらんてぃあかつどうをしている。', romaji: 'Daigaku de oshieru katawara, borantia katsudou o shite iru.', meaning: 'Di samping mengajar di universitas, ia juga melakukan kegiatan sukarelawan.' }
    ]
  },
  {
    pattern: '〜きわまりない',
    level: 'N1',
    structure: 'Kata Sifat Na (tanpa na) / Kata Sifat I + こと + きわまりない',
    explanation: 'Menyatakan derajat suatu keadaan yang sangat ekstrim atau luar biasa (amat sangat / tidak ada bandingnya - sering untuk hal negatif).',
    examples: [
      { sentence: 'そんな失礼な態度は、不愉快きわまりない。', reading: 'そんなしつれいなたいどは、ふゆかいきわまりない。', romaji: 'Sonna shitsurei na taido wa, fuyukai kiwamarinai.', meaning: 'Sikap tidak sopan seperti itu amat sangat tidak menyenangkan.' },
      { sentence: '危険極まりない行為だ。', reading: 'きけんきわまりないこういだ。', romaji: 'Kiken kiwamarinai koui da.', meaning: 'Itu adalah tindakan yang amat sangat berbahaya.' }
    ]
  },
  {
    pattern: '〜をもって',
    level: 'N1',
    structure: 'Kata Benda + をもって / をもちまして',
    explanation: 'Digunakan untuk menyatakan batasan waktu dimulainya/diakhirinya suatu acara, atau dengan menggunakan cara tertentu secara formal.',
    examples: [
      { sentence: '本日の営業は午後８時をもって終了いたします。', reading: 'ほんじつのえいぎょうはごごはちじをもってしゅうりょういたします。', romaji: 'Honjitsu no eigyou wa gogo hachiji o motte shuuryou itashimasu.', meaning: 'Operasional hari ini dinyatakan berakhir pada jam 8 malam.' },
      { sentence: '書面をもって合格通知に変えさせていただきます。', reading: 'しょめんをもってごうかくつうちにかえさせていただきます。', romaji: 'Shomen o motte goukaku tsuuchi ni kaesete itadakimasu.', meaning: 'Hasil kelulusan akan kami sampaikan melalui surat tertulis.' }
    ]
  },
  {
    pattern: '〜にあって',
    level: 'N1',
    structure: 'Kata Benda + にあって',
    explanation: 'Menyatakan suatu keadaan khusus atau situasi sulit yang menjadi latar belakang terjadinya suatu tindakan/kejadian (dalam keadaan...).',
    examples: [
      { sentence: '不況にあって、彼は会社を成長させた。', reading: 'ふきょうにあって、かれはかいしゃをせいちょうさせた。', romaji: 'Fukyou ni atte, kare wa kaisha o seichou sasetav.', meaning: 'Di tengah situasi resesi ekonomi, dia berhasil mengembangkan perusahaannya.' },
      { sentence: '緊急の事態にあっては、冷静な判断が求められる。', reading: 'きんきゅうのじたいにあっては、れいせいなはんだんがもとめられる。', romaji: 'Kinkyuu no jitai ni atte wa, reisei na handan ga motomerareru.', meaning: 'Dalam keadaan darurat, dituntut keputusan yang tenang.' }
    ]
  },
  {
    pattern: '〜を限りに',
    level: 'N1',
    structure: 'Kata Benda [Waktu] + を限りに',
    explanation: 'Menunjukkan batas akhir suatu kebiasaan atau aktivitas yang selama ini terus berlangsung (terakhir kalinya... / mulai...).',
    examples: [
      { sentence: '今日を限りに、タバコをやめます。', reading: 'きょうをかぎりに、たばこをやめます。', romaji: 'Kyou o kagiri ni, tabako o yamemasu.', meaning: 'Mulai hari ini (terakhir kalinya hari ini), saya akan berhenti merokok.' },
      { sentence: '今季の公演を限りに引退します。', reading: 'こんきのこうえんをかぎりにいんたいします。', romaji: 'Konki no kouen o kagiri ni intai shimasu.', meaning: 'Saya menyatakan pensiun setelah pementasan musim ini sebagai batas akhir.' }
    ]
  }
];
