// Database Keigo Spesialisasi (敬語) & Simulator Wawancara Kerja (面接 Mensaitsu)

export const keigoVerbs = [
  {
    base: '行く (Iku)',
    meaning: 'Pergi',
    sonkeigo: 'いらっしゃる / おいでになる',
    kenjougo: '参る (まいる) / 伺う (うかがう)',
    teineigo: '行きます',
    exampleSonkei: '社長は明日大阪へいらっしゃいます。(Direktur besok pergi ke Osaka.)',
    exampleKenjou: '明日10時に御社へ伺います。(Saya akan datang/berkunjung ke kantor Anda besok jam 10.)'
  },
  {
    base: '来る (Kuru)',
    meaning: 'Datang',
    sonkeigo: 'いらっしゃる / お見えになる',
    kenjougo: '参る (まいる)',
    teineigo: '来ます',
    exampleSonkei: 'お客様がお見えになりました。(Tamu terhormat telah datang.)',
    exampleKenjou: '田中がすぐに参ります。(Tanaka dari pihak kami akan segera datang.)'
  },
  {
    base: 'いる (Iru)',
    meaning: 'Ada / Berada (Makhluk Hidup)',
    sonkeigo: 'いらっしゃる',
    kenjougo: 'おる',
    teineigo: 'います',
    exampleSonkei: '部長は会議室にいらっしゃいますか。(Apakah Bapak Manajer ada di ruang rapat?)',
    exampleKenjou: '私は終日オフィスにおります。(Saya akan berada di kantor seharian penuh.)'
  },
  {
    base: '言う (Iu)',
    meaning: 'Berkata / Mengatakan',
    sonkeigo: 'おっしゃる',
    kenjougo: '申す (もうす) / 申し上げる',
    teineigo: '言います',
    exampleSonkei: '先ほど佐藤様がおっしゃった通りです。(Sesuai dengan yang dikatakan oleh Bapak Sato tadi.)',
    exampleKenjou: '田中と申します。(Saya bernama Tanaka / Saya dipanggil Tanaka.)'
  },
  {
    base: '食べる / 飲む (Taberu/Nomu)',
    meaning: 'Makan / Minum',
    sonkeigo: '召し上がる (めしあがる)',
    kenjougo: 'いただく',
    teineigo: '食べます / 飲みます',
    exampleSonkei: 'どうぞ温かいうちに召し上がってください。(Silakan dinikmati selagi masih hangat.)',
    exampleKenjou: 'お土産を美味しくいただきました。(Saya telah menikmati oleh-olehnya dengan lezat.)'
  },
  {
    base: '見る (Miru)',
    meaning: 'Melihat',
    sonkeigo: 'ご覧になる (ごらんになる)',
    kenjougo: '拝見する (はいけんする)',
    teineigo: '見ます',
    exampleSonkei: 'こちらの資料をご覧ください。(Silakan melihat dokumen berikut ini.)',
    exampleKenjou: 'メールを拝見いたしました。(Saya telah membaca/melihat email Anda.)'
  },
  {
    base: '知っている (Shitte iru)',
    meaning: 'Mengetahui / Kenal',
    sonkeigo: 'ご存知です (ごぞんじです)',
    kenjougo: '存じております / 存じ上げます',
    teineigo: '知っています',
    exampleSonkei: 'この件はご存知でしょうか。(Apakah Anda mengetahui perihal ini?)',
    exampleKenjou: 'その件はよく存じております。(Saya mengetahui hal tersebut dengan baik.)'
  },
  {
    base: 'する (Suru)',
    meaning: 'Melakukan',
    sonkeigo: 'なさる / される',
    kenjougo: 'いたす',
    teineigo: 'します',
    exampleSonkei: '休日は何をなさいますか。(Apa yang Anda lakukan saat hari libur?)',
    exampleKenjou: '私がご案内いたします。(Saya yang akan memandu Anda.)'
  },
  {
    base: '会う (Au)',
    meaning: 'Bertemu',
    sonkeigo: 'お会いになる',
    kenjougo: 'お目にかかる (おめにかかる)',
    teineigo: '会います',
    exampleSonkei: '先生にお会いになりましたか。(Apakah Anda sudah bertemu dengan Guru?)',
    exampleKenjou: '本日お目にかかれて光栄です。(Suatu kehormatan bisa bertemu dengan Bapak hari ini.)'
  }
];

// Interview Simulation Steps & Questions
export const interviewEtiquette = [
  {
    step: '1. Ketuk Pintu (ノック)',
    rule: 'Ketuk pintu tepat 3 KALI secara teratur (Ton-Ton-Ton).',
    ngRule: 'DILARANG mengetuk 2 kali! 2 ketukan secara tradisi hanya dipakai untuk mengecek apakah toilet kosong (Toilet Knock).'
  },
  {
    step: '2. Membuka Pintu & Salam',
    rule: 'Setelah mendengar suara "どうぞ (Douzo)" dari dalam, buka pintu dengan tenang, pandang penguji, lalu ucapkan: 「失礼いたします (Shitsurei itashimasu)」.',
    ngRule: 'Jangan membelakangi penguji saat menutup pintu! Putar tubuh 45 derajat menyamping.'
  },
  {
    step: '3. Membungkuk Hormat (お辞儀 Ojigi)',
    rule: 'Berdiri di samping kursi (sisi kiri atau kanan), bungkuk 30 derajat (敬礼 Keirei) sambil menyebut nama dan asal negara. Tunggu dipersilakan "お掛けください", jawab "失礼します", baru duduk tegak.',
    ngRule: 'Dilarang langsung duduk sebelum dipersilakan oleh pewawancara!'
  }
];

export const interviewQA = [
  {
    id: 'int-1',
    question: '自己紹介をお願いします。(Jikoshoukai o onegaishimasu)',
    meaning: 'Silakan perkenalkan diri Anda.',
    keyPoints: 'Ringkas dalam 1 menit: Nama, negara asal, riwayat pendidikan/kerja, dan motivasi singkat.',
    idealResponse: 'はじめまして。インドネシアから参りました［氏名］と申します。母国の大学で情報工学を専攻し、卒業後はWebエンジニアとして2年間開発に従事してまいりました。本日は私の強みであるチーム開発力と粘り強さを精一杯お伝えできればと思っております。どうぞよろしくお願いいたします。',
    reading: 'はじめまして。インドネシアから まいりました［しめい］と もうします。ぼこくの だいがくで じょうほうこうがくを せんこうし、そつぎょうごは Webエンジニアとして にねんかん かいはつに じゅうじして まいりました。ほんじつは わたしの つよみである チームかいはつりょくと ねばりづよさを せいいっぱい おつたえできればと おもっております。どうぞ よろしく おねがいいたします。',
    indonesian: 'Senang bertemu dengan Anda. Nama saya [Nama] berasal dari Indonesia. Di universitas saya mengambil jurusan teknik informatika, dan setelah lulus saya bekerja selama 2 tahun sebagai Web Engineer. Hari ini saya berharap dapat menyampaikan kekuatan saya dalam kerja sama tim dan kegigihan sebaik mungkin. Mohon bimbingan dan kerja samanya.'
  },
  {
    id: 'int-2',
    question: 'なぜ日本で働きたいのですか。(Naze Nihon de hatarakitai no desu ka)',
    meaning: 'Mengapa Anda ingin bekerja di Jepang?',
    keyPoints: 'Fokus pada standar kualitas kerja, teknologi, etos kerja profesional Jepang, bukan sekadar suka anime.',
    idealResponse: '日本のものづくりの高い品質管理と、細部まで妥協しない職人精神に強く感銘を受けたからです。母国でも日本の製品は高い信頼を得ており、私自身も最先端の現場で技術を磨き、両国の架け橋として貢献したいと考えております。',
    reading: 'にほんの ものづくりの たかい ひんしつかんりと、さいぶまで だきょうしない しょくにんせいしんに つよく かんめいを うけたからです。ぼこくでも にほんの せいひんは たかい しんらいを えており、わたしじしんも さいせんたんの げんばで ぎじゅつを みがき、りょうこくの かけはしとして こうけんしたいと かんがえております。',
    indonesian: 'Karena saya sangat terkesan dengan standar kontrol kualitas tinggi manufaktur Jepang dan semangat pantang berkompromi terhadap detail. Di negara saya pun produk Jepang memiliki kepercayaan tinggi, dan saya ingin mengasah keahlian di lingkungan kerja terdepan serta berkontribusi menjadi jembatan antara kedua negara.'
  },
  {
    id: 'int-3',
    question: 'あなたの長所と短所は何ですか。(Anata no chousho to tansho wa nan desu ka)',
    meaning: 'Apa kelebihan dan kelemahan Anda?',
    keyPoints: 'Kelemahan harus diikuti dengan solusi konkret / tindakan nyata yang Anda lakukan untuk mengatasinya.',
    idealResponse: '私の長所は、目標に向かって粘り強く取り組む継続力です。一方で、短所は慎重になりすぎて決断に時間がかかる点です。そのため、現在はタスクごとに期限を明確に定め、優先順位をつけて迅速に行動するよう意識しております。',
    reading: 'わたしの ちょうしょは、もくひょうに むかって ねばりづよく とりくむ けいぞくりょくです。いっぽうで、たんしょは しんちょうになりすぎて けつだんに じかんが かかる てんです。そのため、げんざいは タスクごとに きげんを めいかくに さだめ、ゆうせんじゅんいを つけて じんそくに こうどうするよう いしきしております。',
    indonesian: 'Kelebihan saya adalah kegigihan dan konsistensi dalam mencapai target. Di sisi lain, kelemahan saya adalah terkadang terlalu berhati-hati sehingga memerlukan waktu saat mengambil keputusan. Karena itu, saat ini saya selalu menetapkan tenggat waktu yang jelas untuk tiap tugas dan memprioritaskan tindakan cepat.'
  },
  {
    id: 'int-4',
    question: '最後に何か質問はありますか。［逆質問］(Saigo ni nanika shitsumon wa arimasu ka)',
    meaning: 'Terakhir, apakah ada pertanyaan dari Anda? [Gyakushitsumon]',
    keyPoints: 'DILARANG menjawab "Tidak ada" (kesan tidak berminat)! Ajukan pertanyaan berbobot seputar persiapan sebelum mulai bekerja.',
    idealResponse: 'もしご縁をいただき入社できることになりましたら、入社日までに事前に学習や準備をしておくべき専門知識や技術はございますでしょうか。',
    reading: 'もし ごえんを いただき にゅうしゃできることに なりましたら、にゅうしゃびまでに じぜんに がくしゅうや じゅんびを しておくべき せんもんちしきや ぎじゅつは ございますでしょうか。',
    indonesian: 'Jika saya diberikan berkah kesempatan untuk bergabung dengan perusahaan ini, apakah ada pengetahuan atau keterampilan teknis khusus yang sebaiknya saya pelajari atau persiapkan sebelum tanggal masuk kerja?'
  }
];
