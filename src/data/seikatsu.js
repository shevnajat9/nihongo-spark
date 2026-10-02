/**
 * Data Bahasa Jepang Bertahan Hidup & Birokrasi (生活日本語 / Seikatsu Nihongo)
 * Mencakup 4 pilar penting kehidupan di Jepang:
 * 1. 市役所 (Balai Kota & Dokumen Resmi)
 * 2. 銀行・郵便局 (Perbankan & Pos)
 * 3. ゴミの分別 (Aturan Pilah Sampah)
 * 4. 賃貸・不動産 (Sewa Rumah & Apartemen)
 */

export const seikatsuCategories = [
  {
    id: 'shiyakusho',
    title: 'Balai Kota & Birokrasi (市役所)',
    icon: '🏛️',
    description: 'Pendaftaran alamat domisili, kartu identitas My Number, dan asuransi kesehatan nasional.',
    badgeColor: '#3b82f6'
  },
  {
    id: 'banking',
    title: 'Bank & Layanan Pos (銀行・郵便局)',
    icon: '🏦',
    description: 'Membuka rekening Yucho/MUFG, istilah mesin ATM, formulir transfer uang (furikomi), dan pos kilat.',
    badgeColor: '#10b981'
  },
  {
    id: 'gomi',
    title: 'Pilah Sampah Jepang (ゴミ分別)',
    icon: '🗑️',
    description: 'Aturan ketat pemilahan sampah bakar, non-bakar, daur ulang botol PET, dan tiket sampah besar.',
    badgeColor: '#f59e0b'
  },
  {
    id: 'chintai',
    title: 'Sewa Rumah & Kamar (賃貸・部屋探し)',
    icon: '🏠',
    description: 'Memahami uang jaminan (Shikikin), uang hadiah (Reikin), komisi agen, dan tipe denah apartemen (1K/1LDK).',
    badgeColor: '#8b5cf6'
  }
];

export const seikatsuTerms = [
  // 1. Shiyakusho
  {
    id: 's-1',
    category: 'shiyakusho',
    kanji: '住民票',
    furigana: 'じゅうみんひょう',
    romaji: 'Jūminhyō',
    meaning: 'Surat Keterangan Domisili Resmi Penduduk',
    explanation: 'Dokumen vital yang diterbitkan Balai Kota yang membuktikan alamat tinggal resmi Anda di Jepang. Sering diminta saat membuka rekening bank, melamar kerja, atau membeli nomor HP.',
    dialogue: {
      speakerA: '窓口スタッフ',
      speakerB: '外国人登録者',
      lineA: '住民票の写しを1通発行でよろしいですか？',
      lineB: 'はい、マイナンバーの記載ありでお願いします。',
      meaningA: 'Apakah Anda ingin mencetak 1 lembar salinan Jūminhyō?',
      meaningB: 'Ya, tolong sertakan pencantuman My Number ya.'
    }
  },
  {
    id: 's-2',
    category: 'shiyakusho',
    kanji: '転入届 / 転出届',
    furigana: 'てんにゅうとどけ / てんしゅつとどけ',
    romaji: 'Tennyū-todoke / Tenshutsu-todoke',
    meaning: 'Formulir Lapor Pindah Masuk / Pindah Keluar Kota',
    explanation: 'Wajib diserahkan ke balai kota maksimal 14 hari sejak pindah tempat tinggal. Tanpa surat pindah keluar (Tenshutsu Shōmeisho) dari kota lama, kota baru tidak bisa mendaftarkan alamat Anda.',
    dialogue: {
      speakerA: '窓口スタッフ',
      speakerB: '転居者',
      lineA: '前住所の転出証明書はお持ちですか？',
      lineB: 'はい、こちらが前の市役所でもらった証明書です。',
      meaningA: 'Apakah membawa Surat Keterangan Pindah Keluar dari alamat sebelumnya?',
      meaningB: 'Ya, ini surat keterangan yang saya terima dari balai kota sebelumnya.'
    }
  },
  {
    id: 's-3',
    category: 'shiyakusho',
    kanji: '国民健康保険',
    furigana: 'こくみんけんこうほけん',
    romaji: 'Kokumin Kenkō Hoken',
    meaning: 'Asuransi Kesehatan Nasional (NHI)',
    explanation: 'Asuransi wajib bagi warga non-karyawan perusahaan besar. Menanggung 70% biaya berobat di klinik/rumah sakit, sehingga pasien hanya membayar 30% dari total tagihan medis.',
    dialogue: {
      speakerA: '受付',
      speakerB: '患者',
      lineA: '保険証はお持ちですか？',
      lineB: 'はい、国民健康保険証です。よろしくお願いします。',
      meaningA: 'Apakah membawa kartu asuransi?',
      meaningB: 'Ya, ini kartu asuransi kesehatan nasional saya. Mohon bantuannya.'
    }
  },
  {
    id: 's-4',
    category: 'shiyakusho',
    kanji: 'マイナンバーカード',
    furigana: 'まいなんばーかーど',
    romaji: 'Mai Nanbā Kādo',
    meaning: 'Kartu Identitas Kependudukan Digital Jepang',
    explanation: 'Kartu chip IC berisi 12 digit nomor identifikasi tunggal. Memudahkan cetak Jūminhyō otomatis di mesin fotokopi konbini (7-Eleven/Lawson) tanpa harus antre di balai kota.',
    dialogue: {
      speakerA: 'コンビニ店員',
      speakerB: '客',
      lineA: 'コピー機で住民票が出せますよ。',
      lineB: 'マイナンバーカードがあればコンビニで出せるんですね！便利です。',
      meaningA: 'Anda bisa mencetak dokumen kependudukan di mesin fotokopi lho.',
      meaningB: 'Asal ada My Number Card bisa cetak di konbini ya! Praktis sekali.'
    }
  },

  // 2. Banking
  {
    id: 's-5',
    category: 'banking',
    kanji: '口座開設',
    furigana: 'こうざかいせつ',
    romaji: 'Kōza Kaisetsu',
    meaning: 'Pembukaan Rekening Bank',
    explanation: 'Bagi warga asing yang baru tiba kurang dari 6 bulan di Jepang, bank biasa sering menolak pembukaan rekening reguler. Bank Pos Jepang (ゆうちょ銀行 / Yūcho Ginkō) adalah pilihan paling ramah bagi pendatang baru.',
    dialogue: {
      speakerA: '銀行員',
      speakerB: '留学生',
      lineA: '口座開設ですね。在留カードと印鑑はございますか？',
      lineB: 'サインでも大丈夫でしょうか？印鑑を持っていません。',
      meaningA: 'Ingin membuka rekening ya. Apakah membawa Kartu Zairyu dan Cap Inkan/Hanko?',
      meaningB: 'Apakah boleh menggunakan tanda tangan? Saya tidak membawa cap Inkan.'
    }
  },
  {
    id: 's-6',
    category: 'banking',
    kanji: '振込',
    furigana: 'ふりこみ',
    romaji: 'Furikomi',
    meaning: 'Transfer Uang ke Rekening Lain',
    explanation: 'Metode pembayaran paling umum di Jepang untuk sewa rumah, SPP universitas, atau tagihan jasa. Wajib memperhatikan nama cabang bank (支店名 - Shitenmei) dan nomor rekening (口座番号).',
    dialogue: {
      speakerA: '案内係',
      speakerB: '客',
      lineA: '振込の手数料は時間帯によって異なります。',
      lineB: '家賃の振込をしたいのですが、ATMでできますか？',
      meaningA: 'Biaya transfer berbeda tergantung jam operasional.',
      meaningB: 'Saya ingin transfer uang sewa rumah, apakah bisa lewat ATM?'
    }
  },
  {
    id: 's-7',
    category: 'banking',
    kanji: '通帳記入',
    furigana: 'つうちょうきにゅう',
    romaji: 'Tsūchō Kinyū',
    meaning: 'Cetak / Update Buku Tabungan di Mesin ATM',
    explanation: 'Mesin ATM di Jepang dapat mencetak riwayat transaksi otomatis langsung ke buku tabungan kertas (通帳 - Tsūchō). Masukkan buku tabungan ke slot, dan mesin membalik halaman serta mencetak saldo terbaru.',
    dialogue: {
      speakerA: '画面案内',
      speakerB: '利用者',
      lineA: '通帳をお入れください。記帳中です。',
      lineB: '通帳記入が終わるまで少々お待ちください。',
      meaningA: 'Silakan masukkan buku tabungan. Sedang mencetak riwayat transaksi.',
      meaningB: 'Harap menunggu sebentar hingga pencetakan buku selesai.'
    }
  },
  {
    id: 's-8',
    category: 'banking',
    kanji: '暗証番号',
    furigana: 'あんしょうばんごう',
    romaji: 'Anshō Bangō',
    meaning: 'Nomor PIN Rahasia (4 Digit)',
    explanation: 'PIN 4 digit untuk kartu tunai ATM atau kartu kredit. Jangan gunakan tanggal lahir karena sistem bank Jepang akan otomatis menolaknya demi alasan keamanan.',
    dialogue: {
      speakerA: '銀行員',
      speakerB: '客',
      lineA: '暗証番号を4桁で設定してください。生年月日は使えません。',
      lineB: 'わかりました。入力完了しました。',
      meaningA: 'Silakan atur PIN 4 digit. Tanggal lahir tidak dapat digunakan.',
      meaningB: 'Baik, saya mengerti. Sudah selesai saya masukkan.'
    }
  },

  // 3. Gomi Bunbetsu
  {
    id: 's-9',
    category: 'gomi',
    kanji: '燃えるゴミ / 可燃ごみ',
    furigana: 'もえるごみ / かねんごみ',
    romaji: 'Moeru Gomi / Kanen Gomi',
    meaning: 'Sampah yang Dapat Dibakar',
    explanation: 'Sisa makanan (tiriskan airnya dulu!), sampah kertas, tisu, puntung rokok, daun taman, dan popok. Di banyak kota wajib memakai kantong sampah plastik khusus berbayar yang distandarisasi pemkot setempat.',
    dialogue: {
      speakerA: '大家さん',
      speakerB: '入居者',
      lineA: '燃えるゴミは毎週火曜日と金曜日の朝8時までに出してください。',
      lineB: 'はい、指定のゴミ袋に入れて出します。',
      meaningA: 'Sampah bakar harap dikeluarkan setiap Selasa dan Jumat pagi sebelum jam 8.',
      meaningB: 'Baik, saya akan taruh di dalam kantong sampah resmi yang ditentukan.'
    }
  },
  {
    id: 's-10',
    category: 'gomi',
    kanji: 'ペットボトル',
    furigana: 'ぺっとぼとる',
    romaji: 'Pettobotoru',
    meaning: 'Botol Plastik Minuman (PET)',
    explanation: 'Aturan emas daur ulang botol PET di Jepang: 1. Lepas tutup (masuk sampah plastik biasa), 2. Kupas label plastik sekelilingnya, 3. Bilas air bagian dalamnya, 4. Injak hingga pipih sebelum dibuang ke tong khusus.',
    dialogue: {
      speakerA: '近所の人',
      speakerB: '住人',
      lineA: 'ペットボトルのキャップとラベルは外してくださいね。',
      lineB: 'すみません、洗って潰してから出します！',
      meaningA: 'Tutup botol dan labelnya tolong dilepas ya.',
      meaningB: 'Maaf, saya akan bilas dan pipihkan dulu sebelum dibuang!'
    }
  },
  {
    id: 's-11',
    category: 'gomi',
    kanji: '粗大ゴミ',
    furigana: 'そだいごみ',
    romaji: 'Sodai Gomi',
    meaning: 'Sampah Berukuran Besar (Furniture / Kasur / Sepeda)',
    explanation: 'Barang berukuran lebih dari 30cm (meja, kursi, kasur, koper) tidak boleh dibuang di tempat sampah biasa. Harus telepon/daftar online ke pusat sampah kota dan membeli stiker kupon pembuangan (粗大ごみ処理券) di konbini.',
    dialogue: {
      speakerA: '粗大ゴミ受付センター',
      speakerB: '申込者',
      lineA: '電子レンジの回収ですね。A券（300円）を1枚コンビニでご購入ください。',
      lineB: '指定された収集日にシールを貼って出せばいいですか？',
      meaningA: 'Pengangkutan microwave ya. Tolong beli 1 lembar stiker kupon A (300 yen) di konbini.',
      meaningB: 'Apakah cukup menempelkan stiker dan mengeluarkannya pada hari penjemputan?'
    }
  },

  // 4. Chintai
  {
    id: 's-12',
    category: 'chintai',
    kanji: '敷金・礼金',
    furigana: 'しききん・れいきん',
    romaji: 'Shikikin / Reikin',
    meaning: 'Uang Jaminan & Uang Hadiah Pemilik Rumah',
    explanation: 'Shikikin adalah deposit jaminan kerusakan (dapat dikembalikan sebagian saat pindah). Reikin adalah uang ucapan terima kasih tradisional kepada pemilik rumah yang TIDAK BISA kembali sama sekali (biasanya 1–2 bulan uang sewa). Saat ini banyak apartemen modern berlabel "Reikin 0 (ゼロ)".',
    dialogue: {
      speakerA: '不動産仲介',
      speakerB: '部屋探し中の客',
      lineA: 'こちらの物件は敷金1ヶ月、礼金ゼロとなっております。',
      lineB: '礼金ゼロは初期費用が安く抑えられて助かりますね！',
      meaningA: 'Properti ini uang jaminannya 1 bulan sewa dan uang hadiahnya nol.',
      meaningB: 'Reikin nol sangat membantu menekan biaya awal pindahan ya!'
    }
  },
  {
    id: 's-13',
    category: 'chintai',
    kanji: '仲介手数料',
    furigana: 'ちゅうかいてすうりょう',
    romaji: 'Chūkai Tesūryō',
    meaning: 'Biaya Komisi Jasa Agen Properti',
    explanation: 'Biaya jasa yang dibayarkan kepada agen real estate yang mencarikan dan mengurus kontrak apartemen. Menurut hukum Jepang, maksimal biayanya adalah 1 bulan uang sewa + pajak.',
    dialogue: {
      speakerA: '不動産担当者',
      speakerB: '契約者',
      lineA: 'ご契約時に仲介手数料として家賃1ヶ月分を頂戴いたします。',
      lineB: '契約書の内容を確認してからお支払いします。',
      meaningA: 'Saat penandatanganan kontrak, kami meminta biaya komisi agen sebesar 1 bulan sewa.',
      meaningB: 'Saya akan membayar setelah memeriksa isi dokumen kontrak.'
    }
  },
  {
    id: 's-14',
    category: 'chintai',
    kanji: '1K / 1DK / 1LDK',
    furigana: 'わんけー / わんでぃーけー / わえるでぃーけー',
    romaji: 'Wan Kē / Wan Dī Kē / Wan Eru Dī Kē',
    meaning: 'Sistem Klasifikasi Tipe Denah Apartemen Jepang',
    explanation: 'K = Kitchen (dapur terpisah kamar tidur), DK = Dining Kitchen (ruang makan + dapur seluas 4.5–8 tatami), LDK = Living Dining Kitchen (ruang tamu luas + dapur min. 8 tatami). Angka depan menunjukkan jumlah kamar tidur.',
    dialogue: {
      speakerA: '不動産担当者',
      speakerB: '客',
      lineA: '一人暮らしなら広めの1Kか1DKが人気です。',
      lineB: '自炊をしっかりしたいので、キッチンの広い1DKを見せてください。',
      meaningA: 'Untuk tinggal sendiri, tipe 1K yang luas atau 1DK sangat populer.',
      meaningB: 'Karena saya ingin sering masak sendiri, tolong perlihatkan unit 1DK yang dapurnya lega.'
    }
  }
];

export const seikatsuQuizData = [
  {
    id: 'sq-1',
    category: 'shiyakusho',
    question: 'Berapa batas waktu maksimal bagi warga asing untuk melapor pindah alamat (Tennyū-todoke) ke Balai Kota sejak menempati tempat tinggal baru?',
    options: [
      '3 hari',
      '14 hari',
      '1 bulan',
      '90 hari'
    ],
    correctIdx: 1,
    explanation: 'Hukum kependudukan Jepang mewajibkan pelaporan perubahan alamat domisili dalam kurun waktu 14 hari sejak pindah.'
  },
  {
    id: 'sq-2',
    category: 'gomi',
    question: 'Langkah manakah yang BENAR sebelum membuang botol plastik minuman (PET bottle) di Jepang?',
    options: [
      'Membuang langsung utuh bersama isi air minumnya',
      'Membakar botol di halaman belakang rumah',
      'Melepas tutup & label, membilas bagian dalam, dan menginjaknya hingga pipih',
      'Mencampur botol PET bersama sampah kaca dan keramik'
    ],
    correctIdx: 2,
    explanation: 'Standar daur ulang PET bottle Jepang: lepaskan tutup & label pembungkus, bilas air sisa manis di dalamnya, lalu pipihkan agar tidak memakan ruang tong daur ulang.'
  },
  {
    id: 'sq-3',
    category: 'chintai',
    question: 'Apakah perbedaan mendasar antara Shikikin (敷金) dan Reikin (礼金) dalam kontrak sewa rumah di Jepang?',
    options: [
      'Shikikin untuk agen, Reikin untuk pemkot',
      'Shikikin adalah jaminan yang bisa kembali sebagian, sedangkan Reikin adalah uang hadiah yang TIDAK BISA kembali',
      'Reikin bisa dicicil tiap bulan, Shikikin dibayar saat keluar',
      'Keduanya sama persis dan wajib dikembalikan 100% oleh pemilik rumah'
    ],
    correctIdx: 1,
    explanation: 'Shikikin (敷金) berfungsi sebagai jaminan biaya perbaikan jika ada kerusakan saat pindah keluar. Reikin (礼金) adalah tradisi ucapan terima kasih kepada pemilik rumah yang sifatnya hangus.'
  },
  {
    id: 'sq-4',
    category: 'banking',
    question: 'Istilah transaksi perbankan Jepang untuk "Transfer uang ke rekening lain" adalah...',
    options: [
      'お預入れ (O-azukeire / Setor tunai)',
      'お引き出し (O-hikidashi / Tarik tunai)',
      'お振込 (O-furikomi / Transfer)',
      '残高照会 (Zandaka shoukai / Cek saldo)'
    ],
    correctIdx: 2,
    explanation: '振込 (Furikomi) adalah istilah resmi untuk transfer uang antar rekening di ATM atau teller perbankan Jepang.'
  }
];
