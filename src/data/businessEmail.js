/**
 * Data Template Email Bisnis & Tata Krama Keigo (ビジネスメール & ビジネスマナー)
 * Format baku korespondensi dunia kerja Jepang yang wajib dikuasai profesional dan lulusan SSW / Gijinkoku.
 */

export const emailTemplates = [
  {
    id: 'sick-leave',
    category: 'internal',
    title: 'Izin Sakit Mendadak (体調不良による当日欠勤)',
    subjectTag: '【勤怠連絡】',
    defaultSubject: '【勤怠連絡】体調不良による本日欠勤のご連絡（氏名）',
    situation: 'Dikirim pagi hari sebelum jam kerja dimulai (maksimal 10–15 menit sebelum bel masuk) jika tiba-tiba demam atau sakit.',
    recipientType: 'Atasan Langsung / Tim Internal (上司・同僚)',
    openingGreeting: 'お疲れ様です。',
    closingGreeting: 'ご迷惑をおかけして大変申し訳ございませんが、何卒よろしくお願い申し上げます。',
    fields: [
      { key: 'bossName', label: 'Nama Atasan / Manajer', placeholder: '田中部長', defaultVal: '田中部長' },
      { key: 'senderName', label: 'Nama Anda', placeholder: '山田', defaultVal: '山田 太郎' },
      { key: 'symptom', label: 'Gejala Sakit', placeholder: '今朝から38度の高熱と頭痛があり', defaultVal: '昨夜より38度の発熱と強い倦怠感があり' },
      { key: 'hospitalPlan', label: 'Rencana ke Dokter', placeholder: '午前中に近所の病院を受診いたします', defaultVal: '午前中に近隣の内科を受診し、改めて診断結果をご報告いたします' },
      { key: 'urgencyContact', label: 'Kontak Darurat', placeholder: '急ぎの用件は携帯電話またはLINEまで', defaultVal: '緊急のご連絡は携帯電話（080-XXXX-XXXX）までお願いいたします' }
    ],
    generateBody: (f) => `${f.bossName}

お疲れ様です。${f.senderName}です。

大変恐縮ではございますが、${f.symptom}、本日は出社が困難な状況でございます。

そのため、誠に勝手ながら本日は病気休暇（有給休暇）をいただきたく存じます。
${f.hospitalPlan}。

なお、本日の業務の引き継ぎにつきましては、〇〇案件は鈴木様に共有済みでございます。
${f.urgencyContact}。

急な連絡となり、チームの皆様にご迷惑をおかけいたしますことを深くお詫び申し上げます。
何卒よろしくお願い申し上げます。

--------------------------------------------------
${f.senderName}
メール：yamada@example.com
携帯：080-XXXX-XXXX
--------------------------------------------------`
  },
  {
    id: 'meeting-request',
    category: 'external',
    title: 'Permohonan & Konfirmasi Jadwal Rapat (お打ち合わせ日程のご相談)',
    subjectTag: '【日程調整】',
    defaultSubject: '【日程調整のお願い】新規プロジェクトに関するお打ち合わせの件（株式会社Spark）',
    situation: 'Mengajukan 3 opsi kandidat jadwal pertemuan kepada klien eksternal dengan format etiket bisnis yang santun.',
    recipientType: 'Klien Eksternal (取引先・クライアント)',
    openingGreeting: 'いつも大変お世話になっております。',
    closingGreeting: 'ご多忙の折、誠に恐縮でございますが、ご検討のほど何卒よろしくお願い申し上げます。',
    fields: [
      { key: 'companyName', label: 'Nama Perusahaan Klien', placeholder: '株式会社ABC', defaultVal: '株式会社ABC' },
      { key: 'clientName', label: 'Nama Klien', placeholder: '佐藤様', defaultVal: '佐藤様' },
      { key: 'myCompany', label: 'Nama Perusahaan Anda', placeholder: '株式会社Spark', defaultVal: '株式会社Spark' },
      { key: 'senderName', label: 'Nama Anda', placeholder: '山田 太郎', defaultVal: '山田 太郎' },
      { key: 'agenda', label: 'Topik Rapat', placeholder: '新製品の導入検討について', defaultVal: '新規システム導入に関する要件定義について' },
      { key: 'dates', label: '3 Opsi Jadwal', placeholder: '10月15日(火) 14:00〜15:00', defaultVal: `・10月15日（火）14:00〜15:00
・10月17日（木）10:30〜11:30
・10月18日（金）15:00〜16:00` }
    ],
    generateBody: (f) => `${f.companyName}
${f.clientName}

いつも大変お世話になっております。
${f.myCompany}の${f.senderName}でございます。

先日は貴重なお時間をいただき、誠にありがとうございました。

さて、本日は${f.agenda}に関しまして、
一度オンライン（Zoom）にてお打ち合わせの機会を頂戴したく、ご連絡いたしました。
所要時間は45分〜1時間程度を予定しております。

つきましては、大変恐縮ではございますが、
以下の候補日の中でご都合のよろしい日時はございますでしょうか。

【候補日時】
${f.dates}

上記日程でご都合が合わない場合は、お手数をおかけいたしますが、
${f.clientName}のご都合のよろしい日時を2〜3候補ほどご教示いただけますと幸甚に存じます。

ご多忙の折、大変恐縮でございますが、何卒ご検討のほどよろしくお願い申し上げます。

--------------------------------------------------
${f.myCompany}
営業部　${f.senderName}
〒100-0001 東京都千代田区1-1-1
TEL：03-XXXX-XXXX
Email：contact@spark.jp
--------------------------------------------------`
  },
  {
    id: 'document-attachment',
    category: 'external',
    title: 'Pengiriman Dokumen Lampiran Penawaran (お見積書・資料送付の件)',
    subjectTag: '【資料送付】',
    defaultSubject: '【資料送付】お見積書ご送付の件（株式会社Spark 山田）',
    situation: 'Mengirimkan proposal, faktur invoice, atau estimasi harga penawaran (mitsumorisho) sebagai file lampiran email.',
    recipientType: 'Klien Eksternal (取引先)',
    openingGreeting: 'いつも大変お世話になっております。',
    closingGreeting: 'ご査収のほど、よろしくお願い申し上げます。',
    fields: [
      { key: 'companyName', label: 'Nama Perusahaan Klien', placeholder: '株式会社XYZ', defaultVal: '株式会社XYZ' },
      { key: 'clientName', label: 'Nama Klien', placeholder: '高橋様', defaultVal: '高橋様' },
      { key: 'myCompany', label: 'Perusahaan Anda', placeholder: '株式会社Spark', defaultVal: '株式会社Spark' },
      { key: 'senderName', label: 'Nama Anda', placeholder: '山田', defaultVal: '山田 太郎' },
      { key: 'docName', label: 'Nama Dokumen Lampiran', placeholder: '御見積書（PDF）', defaultVal: '御見積書（No.202610-01）' }
    ],
    generateBody: (f) => `${f.companyName}
${f.clientName}

いつも大変お世話になっております。
${f.myCompany}の${f.senderName}でございます。

この度は、弊社サービスにお問い合わせいただき、誠にありがとうございます。

ご依頼いただきました${f.docName}を作成いたしましたので、
本メールにPDFファイルを添付の上、お送りいたします。

【添付ファイル】
・${f.docName}.pdf

内容をご確認いただき、ご不明点やご要望などがございましたら、
お気軽にお申し付けくださいませ。

ご査収のほど、何卒よろしくお願い申し上げます。

--------------------------------------------------
${f.myCompany}
${f.senderName}
Email：contact@spark.jp
TEL：03-XXXX-XXXX
--------------------------------------------------`
  },
  {
    id: 'apology-delay',
    category: 'external',
    title: 'Permintaan Maaf Keterlambatan Pengiriman (納期の遅延に関するお詫び)',
    subjectTag: '【お詫び】',
    defaultSubject: '【お詫び】納品予定日遅延のお詫びとご報告（株式会社Spark）',
    situation: 'Permintaan maaf resmi ketika proyek/pekerjaan tidak dapat selesai sesuai jadwal awal karena kendala teknis tak terduga.',
    recipientType: 'Klien / Mitra Usaha',
    openingGreeting: '平素は格別のご高配を賜り、厚く御礼申し上げます。',
    closingGreeting: '多大なるご迷惑をおかけいたしますことを、重ねて深くお詫び申し上げます。',
    fields: [
      { key: 'companyName', label: 'Nama Perusahaan Klien', placeholder: '株式会社ABC', defaultVal: '株式会社ABC' },
      { key: 'clientName', label: 'Nama Klien', placeholder: '中村様', defaultVal: '中村様' },
      { key: 'myCompany', label: 'Nama Perusahaan Anda', placeholder: '株式会社Spark', defaultVal: '株式会社Spark' },
      { key: 'senderName', label: 'Nama Anda', placeholder: '山田', defaultVal: '山田 太郎' },
      { key: 'reason', label: 'Alasan Keterlambatan', placeholder: 'システム検証において予期せぬ不具合が判明し', defaultVal: '最終テスト段階におきまして一部仕様の不具合が発見され、改修および再検証に時間を要しておりますため' },
      { key: 'newDeadline', label: 'Jadwal Baru yang Dijanjikan', placeholder: '10月25日(金) 17:00まで', defaultVal: '10月25日（金）17:00' }
    ],
    generateBody: (f) => `${f.companyName}
${f.clientName}

平素は格別のご高配を賜り、厚く御礼申し上げます。
${f.myCompany}の${f.senderName}でございます。

この度は、予定しておりました納品につきまして、
誠に遺憾ながら納期の延期をお願いしたく、ご連絡差し上げました。

現在、制作を進めております案件におきまして、
${f.reason}。

つきましては、当初の予定日（10月20日）から
【${f.newDeadline}】まで納品を延期させていただきたく存じます。

${f.clientName}には多大なるご迷惑とご心配をおかけいたしますことを、
心より深くお詫び申し上げます。

二度とこのような事態を起こさぬよう、進行管理および品質チェックを徹底してまいります。
誠に勝手なお願いとは存じますが、何卒ご容赦いただけますようお願い申し上げます。

--------------------------------------------------
${f.myCompany}
品質管理責任者　${f.senderName}
--------------------------------------------------`
  }
];

export const keigoEmailGlossary = [
  {
    phrase: 'いつもお世話になっております。',
    furigana: 'いつもおせわになっております。',
    romaji: 'Itsumo osewa ni natte orimasu.',
    meaning: 'Terima kasih atas kerja sama yang terjalin selama ini.',
    rule: 'Salam pembuka wajib hukumnya untuk pihak eksternal/klien luar. Tidak digunakan untuk sesama kolega satu kantor.'
  },
  {
    phrase: 'お疲れ様です。',
    furigana: 'おつかれさまです。',
    romaji: 'Otsukaresama desu.',
    meaning: 'Terima kasih atas kerja keras Anda.',
    rule: 'Salam pembuka resmi untuk rekan kerja/atasan internal kantor sendiri. Jangan gunakan ご苦労様です (Gokurousama desu) karena itu hanya untuk atasan kepada bawahan.'
  },
  {
    phrase: 'ご査収のほどよろしくお願いいたします。',
    furigana: 'ごさしゅうのほどよろしくおねがいいたします。',
    romaji: 'Gosasagyuu no hodo yoroshiku onegai itashimasu.',
    meaning: 'Mohon periksa dan terima dokumen lampiran ini dengan baik.',
    rule: 'Frasa baku yang digunakan khusus saat menyertakan file lampiran (attachment/PDF/Excel).'
  },
  {
    phrase: '大変恐縮ではございますが、',
    furigana: 'たいへんきょうしゅくではございますが、',
    romaji: 'Taihen kyoushuku dewa gozaimasu ga,',
    meaning: 'Saya merasa sangat tidak enak/sungkan merepotkan Anda, namun...',
    rule: 'Kata bantal penyangga (クッション言葉 - Cushion words) untuk melembutkan permohonan atau permintaan bantuan.'
  },
  {
    phrase: '何卒よろしくお願い申し上げます。',
    furigana: 'なにとぞよろしくおねがいもうしあげます。',
    romaji: 'Nanitazo yoroshiku onegai moushiagemasu.',
    meaning: 'Atas perhatian dan kerja samanya, saya ucapkan terima kasih banyak.',
    rule: 'Frasa penutup standar kasta tertinggi dalam bisnis Jepang (kenjougo). "Nanitazo" memberi penekanan kesungguhan hati.'
  }
];
