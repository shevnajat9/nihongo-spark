// Japanese Visual Syntax Parser (文分解エンジン)
// Mengurai kalimat bahasa Jepang menjadi komponen sintaksis berwarna

export const PRESET_SENTENCES = [
  {
    level: 'N5',
    sentence: '私は毎朝七時に公園で犬と散歩します。',
    reading: 'わたしは まいあさ しちじに こうえんで いぬと さんぽします。',
    meaning: 'Saya berjalan-jalan dengan anjing di taman setiap pagi jam 7.'
  },
  {
    level: 'N4',
    sentence: '田中さんは昨日図書館で借りた本をもう全部読みました。',
    reading: 'たなかさんは きのう としょかんで かりた ほんを もう ぜんぶ よみました。',
    meaning: 'Pak Tanaka sudah membaca seluruh buku yang ia pinjam di perpustakaan kemarin.'
  },
  {
    level: 'N3',
    sentence: '部長に頼まれた書類を明日の午後までに提出しなければなりません。',
    reading: 'ぶちょうに たのまれた しょるいを あしたの ごごまでに ていしゅつしなければ なりません。',
    meaning: 'Saya harus mengumpulkan dokumen yang diminta oleh manajer sebelum besok siang.'
  },
  {
    level: 'N2',
    sentence: '最新の技術開発によって、環境問題に対する人々の意識が高まりつつあります。',
    reading: 'さいしんの ぎじゅつかいはつによって、かんきょうもんだいに たいする ひとびとの いしきが たかまりつつあります。',
    meaning: 'Berkat perkembangan teknologi mutakhir, kesadaran masyarakat terhadap masalah lingkungan sedang meningkat.'
  }
];

const PARTICLES = [
  { char: 'は', role: 'Topik Utama (主題)', desc: 'Menandai topik pembicaraan utama ("Mengenai/Adapun...")', color: '#818cf8', type: 'topic' },
  { char: 'が', role: 'Subjek Penegas (主語)', desc: 'Menandai subjek pelaku atau fokus penegasan eksklusif', color: '#38bdf8', type: 'subject' },
  { char: 'を', role: 'Objek Langsung (目的語)', desc: 'Menandai sasaran penderita dari kata kerja transitif', color: '#34d399', type: 'object' },
  { char: 'に', role: 'Waktu / Arah / Titik (時・方向)', desc: 'Menandai waktu spesifik, target penerima, atau arah', color: '#fbbf24', type: 'time_place' },
  { char: 'で', role: 'Tempat / Sarana (場所・手段)', desc: 'Menandai lokasi terjadinya kegiatan atau alat/sarana transportasi', color: '#f59e0b', type: 'time_place' },
  { char: 'と', role: 'Penyertaan / Bersama (並立・共同)', desc: 'Menandai teman/mitra bersama ("dengan") atau daftar benda', color: '#a78bfa', type: 'partner' },
  { char: 'へ', role: 'Arah Tujuan (方向)', desc: 'Menandai arah pergerakan menuju tempat tujuan', color: '#f472b6', type: 'direction' },
  { char: 'から', role: 'Titik Awal / Asal (起点)', desc: 'Menandai waktu atau tempat dimulainya sesuatu ("dari")', color: '#2dd4bf', type: 'time_place' },
  { char: 'まで', role: 'Batas Akhir (着点)', desc: 'Menandai batas akhir waktu atau tempat ("sampai / hingga")', color: '#2dd4bf', type: 'time_place' },
  { char: 'より', role: 'Perbandingan (比較)', desc: 'Menandai titik pembanding ("dibandingkan dengan")', color: '#fb7185', type: 'comparison' },
  { char: 'も', role: 'Penambahan / Juga (同類)', desc: 'Menandai makna "juga / pun"', color: '#c084fc', type: 'addition' }
];

/**
 * Parse Japanese sentence into syntactic chunks
 */
export function parseJapaneseSyntax(sentence) {
  if (!sentence || typeof sentence !== 'string') return [];
  const clean = sentence.trim();
  if (!clean) return [];

  const chunks = [];
  let buffer = '';

  for (let i = 0; i < clean.length; i++) {
    // Check 2-char particles first
    const twoChars = clean.slice(i, i + 2);
    const particle2 = PARTICLES.find(p => p.char === twoChars);

    if (particle2) {
      if (buffer) {
        chunks.push({
          text: buffer,
          particle: particle2,
          fullChunk: buffer + particle2.char,
          type: particle2.type
        });
        buffer = '';
      }
      i++; // skip next char
      continue;
    }

    // Check 1-char particles
    const oneChar = clean[i];
    const particle1 = PARTICLES.find(p => p.char === oneChar);

    if (particle1) {
      if (buffer) {
        chunks.push({
          text: buffer,
          particle: particle1,
          fullChunk: buffer + particle1.char,
          type: particle1.type
        });
        buffer = '';
      } else {
        buffer += oneChar;
      }
      continue;
    }

    // Punctuation check
    if (oneChar === '。' || oneChar === '、' || oneChar === '！' || oneChar === '？') {
      if (buffer) {
        chunks.push({
          text: buffer,
          particle: null,
          fullChunk: buffer,
          type: 'predicate'
        });
        buffer = '';
      }
      continue;
    }

    buffer += oneChar;
  }

  // Remaining buffer (usually the final verb / predicate)
  if (buffer) {
    chunks.push({
      text: buffer,
      particle: null,
      fullChunk: buffer,
      type: 'predicate'
    });
  }

  return chunks;
}
