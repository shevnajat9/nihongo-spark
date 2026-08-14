// Bank ungkapan → respons untuk soal 聴解 即時応答 (quick response).
// Dipakai oleh generator soal listening; level = tingkat kesulitan pasangan.
// format: { level, prompt, response, promptMeaning, responseMeaning }

export const quickResponseData = [
  // ── N5 ──
  { level: 'N5', prompt: 'ありがとうございます。', response: 'どういたしまして。', promptMeaning: 'Terima kasih.', responseMeaning: 'Sama-sama.' },
  { level: 'N5', prompt: 'すみません、今何時ですか。', response: '三時です。', promptMeaning: 'Maaf, sekarang jam berapa?', responseMeaning: 'Jam tiga.' },
  { level: 'N5', prompt: 'お茶をください。', response: 'はい、どうぞ。', promptMeaning: 'Tolong berikan saya teh.', responseMeaning: 'Ya, silakan.' },
  { level: 'N5', prompt: 'また来週会いましょう。', response: 'はい、また来週。', promptMeaning: 'Sampai jumpa lagi minggu depan.', responseMeaning: 'Ya, sampai minggu depan.' },
  { level: 'N5', prompt: 'これはいくらですか。', response: '五百円です。', promptMeaning: 'Berapa harga ini?', responseMeaning: 'Lima ratus yen.' },
  { level: 'N5', prompt: 'トイレはどこですか。', response: 'あそこです。', promptMeaning: 'Di mana toiletnya?', responseMeaning: 'Di sana.' },
  { level: 'N5', prompt: 'お名前は何ですか。', response: '田中です。', promptMeaning: 'Siapa nama Anda?', responseMeaning: 'Saya Tanaka.' },
  { level: 'N5', prompt: '明日、暇ですか。', response: 'はい、暇です。', promptMeaning: 'Besok Anda senggang?', responseMeaning: 'Ya, senggang.' },
  { level: 'N5', prompt: 'これをください。', response: 'かしこまりました。', promptMeaning: 'Tolong yang ini.', responseMeaning: 'Baiklah, siap.' },
  { level: 'N5', prompt: '写真を撮ってもいいですか。', response: 'いいですよ。', promptMeaning: 'Boleh saya mengambil foto?', responseMeaning: 'Boleh.' },
  { level: 'N5', prompt: '今日はありがとうございました。', response: 'いいえ、こちらこそ。', promptMeaning: 'Terima kasih atas hari ini.', responseMeaning: 'Tidak, sayalah yang berterima kasih.' },
  { level: 'N5', prompt: 'コーヒーとお茶、どちらがいいですか。', response: 'コーヒーがいいです。', promptMeaning: 'Kopi atau teh, mana yang Anda mau?', responseMeaning: 'Saya mau kopi.' },

  // ── N4 ──
  { level: 'N4', prompt: '道に迷ってしまったんですが。', response: '地図を見せてください。', promptMeaning: 'Saya tersesat…', responseMeaning: 'Tolong tunjukkan petanya.' },
  { level: 'N4', prompt: 'この漢字の読み方が分かりません。', response: '辞書で調べましょう。', promptMeaning: 'Saya tidak tahu cara baca kanji ini.', responseMeaning: 'Mari kita cari di kamus.' },
  { level: 'N4', prompt: '熱があるんです。', response: '病院へ行ったほうがいいですよ。', promptMeaning: 'Saya demam.', responseMeaning: 'Sebaiknya Anda ke rumah sakit.' },
  { level: 'N4', prompt: 'お弁当を持ってきましたか。', response: 'はい、持ってきました。', promptMeaning: 'Apakah Anda membawa bekal?', responseMeaning: 'Ya, saya bawa.' },
  { level: 'N4', prompt: 'この電車は新宿に止まりますか。', response: 'いいえ、止まりません。', promptMeaning: 'Apakah kereta ini berhenti di Shinjuku?', responseMeaning: 'Tidak, tidak berhenti.' },
  { level: 'N4', prompt: 'コピー機はどこにありますか。', response: '二階にあります。', promptMeaning: 'Di mana mesin fotokopinya?', responseMeaning: 'Ada di lantai dua.' },
  { level: 'N4', prompt: '手伝いましょうか。', response: 'ありがとうございます。助かります。', promptMeaning: 'Mau saya bantu?', responseMeaning: 'Terima kasih, itu sangat membantu.' },
  { level: 'N4', prompt: 'ご飯を食べましたか。', response: 'いいえ、まだです。', promptMeaning: 'Apakah Anda sudah makan?', responseMeaning: 'Belum, belum makan.' },

  // ── N3 ──
  { level: 'N3', prompt: '来週の会議は何時に始まりますか。', response: '十時からです。', promptMeaning: 'Rapat minggu depan mulai jam berapa?', responseMeaning: 'Mulai jam sepuluh.' },
  { level: 'N3', prompt: 'この書類、いつまでに出せばいいですか。', response: '金曜日までにお願いします。', promptMeaning: 'Sampai kapan dokumen ini harus dikumpulkan?', responseMeaning: 'Mohon sebelum hari Jumat.' },
  { level: 'N3', prompt: '駅までどうやって行きますか。', response: 'バスで行けますよ。', promptMeaning: 'Bagaimana cara ke stasiun?', responseMeaning: 'Anda bisa naik bus.' },
  { level: 'N3', prompt: '部長、企画書を見ていただけますか。', response: 'ちょっと待ってください。', promptMeaning: 'Pak, boleh saya minta Anda melihat proposal ini?', responseMeaning: 'Tunggu sebentar.' },
  { level: 'N3', prompt: 'レポートの締め切りを延ばしてもらえますか。', response: 'では、来週までにしてください。', promptMeaning: 'Bisakah deadline laporan diperpanjang?', responseMeaning: 'Kalau begitu, sampai minggu depan saja.' },
  { level: 'N3', prompt: '新しくできた店、行ってみましたか。', response: 'まだ行っていないんです。', promptMeaning: 'Sudah coba toko yang baru buka itu?', responseMeaning: 'Belum, saya belum pergi.' },

  // ── N2 ──
  { level: 'N2', prompt: 'お忙しいところすみませんが、少しお時間よろしいですか。', response: 'はい、大丈夫ですよ。', promptMeaning: 'Maaf mengganggu di tengah kesibukan, ada waktu sebentar?', responseMeaning: 'Ya, tidak apa-apa.' },
  { level: 'N2', prompt: 'この問題について、ご意見をお聞かせください。', response: 'そうですね。私の考えでは…', promptMeaning: 'Mohon pendapat Anda tentang masalah ini.', responseMeaning: 'Hmm, menurut pendapat saya…' },
  { level: 'N2', prompt: '契約書の内容を確認させていただいてもよろしいでしょうか。', response: 'もちろんです。どうぞ。', promptMeaning: 'Boleh saya memeriksa isi kontraknya?', responseMeaning: 'Tentu saja, silakan.' },
  { level: 'N2', prompt: '出張は来月に変更してもいいですか。', response: 'かしこまりました。手配いたします。', promptMeaning: 'Boleh saya ubah perjalanan dinas ke bulan depan?', responseMeaning: 'Baik, akan saya atur.' },
  { level: 'N2', prompt: 'この資料、コピーして配ってもらえますか。', response: '承知しました。すぐにやります。', promptMeaning: 'Bisakah materi ini difotokopi dan dibagikan?', responseMeaning: 'Siap, segera saya kerjakan.' },
  { level: 'N2', prompt: 'プレゼンの準備はできていますか。', response: 'はい、問題ありません。', promptMeaning: 'Apakah persiapan presentasi sudah selesai?', responseMeaning: 'Ya, tidak ada masalah.' },

  // ── N1 ──
  { level: 'N1', prompt: 'ご迷惑をおかけして申し訳ございません。', response: 'いえ、お気になさらないでください。', promptMeaning: 'Mohon maaf telah merepotkan Anda.', responseMeaning: 'Tidak, jangan khawatir.' },
  { level: 'N1', prompt: 'この度はご厚意を賜り、誠にありがとうございます。', response: 'お役に立てて光栄です。', promptMeaning: 'Terima kasih banyak atas kebaikan Anda kali ini.', responseMeaning: 'Saya merasa terhormat bisa membantu.' },
  { level: 'N1', prompt: '結論から申し上げますと、計画は白紙に戻すべきだと考えます。', response: '私も同じ意見です。', promptMeaning: 'Kesimpulannya, menurut saya rencana harus dikembalikan ke awal.', responseMeaning: 'Saya sependapat dengan Anda.' },
  { level: 'N1', prompt: '本日の会議はこれで終了させていただきます。', response: 'お疲れさまでした。', promptMeaning: 'Rapat hari ini saya akhiri sekian.', responseMeaning: 'Terima kasih atas kerja kerasnya.' },
];
