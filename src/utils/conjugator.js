/**
 * Nihongo Spark - Japanese Verb Conjugator Engine (動詞の活用エンジン)
 * Comprehensive rule-based conjugation for Godan, Ichidan, and Irregular verbs (Kuru & Suru).
 */

// Well-known Godan verbs that end in -iru or -eru (phonetic exceptions to Ichidan pattern)
const GODAN_EXCEPTIONS = new Set([
  '帰る', 'かえる', '切る', 'きる', '知る', 'しる', '入る', 'はいる', '走る', 'はしる',
  '要る', 'いる', '減る', 'へる', '蹴る', 'ける', '滑る', 'すべる', '喋る', 'しゃべる',
  '限る', 'かぎる', '握る', 'にぎる', '焦る', 'あせる', '照る', 'てる', '散る', 'ちる',
  '遮る', 'さえぎる', '混じる', 'まじる', '弄る', 'いじる', '契る', 'ちぎる'
]);

/**
 * Determine the verb class: 'kuru' | 'suru' | 'ichidan' | 'godan'
 */
export function classifyVerb(verb, reading = '') {
  if (!verb) return 'godan';
  const clean = verb.trim();
  const cleanReading = reading.trim();

  // Kuru (くる / 来る)
  if (clean === '来る' || clean === 'くる' || cleanReading === 'くる') {
    return 'kuru';
  }

  // Suru (する / 勉強する / 散歩する, etc.)
  if (clean === 'する' || clean.endsWith('する') || cleanReading.endsWith('する')) {
    return 'suru';
  }

  // Godan exceptions ending in -eru/-iru
  if (GODAN_EXCEPTIONS.has(clean) || GODAN_EXCEPTIONS.has(cleanReading)) {
    return 'godan';
  }

  // Check for Ichidan: ends in る preceded by an /i/ or /e/ sound
  if (clean.endsWith('る')) {
    // Check preceding kana in reading if available, else in verb
    const source = cleanReading || clean;
    const len = source.length;
    if (len >= 2) {
      const prevChar = source[len - 2];
      const iOrESounds = /[いきしちにひみりぎじぢびぴえけせてねへめれげぜでべぺ]/;
      if (iOrESounds.test(prevChar)) {
        return 'ichidan';
      }
    }
    return 'godan';
  }

  return 'godan';
}

/**
 * Full Verb Conjugation Engine
 */
export function conjugateVerb(verb, reading = '', meaning = '') {
  if (!verb) return null;

  const type = classifyVerb(verb, reading);
  let groupName = 'Golongan 1 (五段動詞 Godan)';
  let groupCode = 'godan';

  if (type === 'ichidan') {
    groupName = 'Golongan 2 (一段動詞 Ichidan)';
    groupCode = 'ichidan';
  } else if (type === 'kuru') {
    groupName = 'Golongan 3 (カ変動詞 Kuru)';
    groupCode = 'kuru';
  } else if (type === 'suru') {
    groupName = 'Golongan 3 (サ変動詞 Suru)';
    groupCode = 'suru';
  }

  let forms = [];

  if (type === 'kuru') {
    const isKanji = verb.includes('来');
    const prefix = isKanji ? '来' : 'こ';
    const kiPrefix = isKanji ? '来' : 'き';
    const kuPrefix = isKanji ? '来' : 'く';

    forms = [
      {
        id: 'jisho',
        name: 'Bentuk Kamus (辞書形)',
        category: 'N5 Dasar',
        desc: 'Bentuk dasar informal / kasual percakapan sehari-hari.',
        positive: verb,
        reading: reading || 'くる',
        negative: `${prefix}ない`,
        negReading: 'こない',
        past: `${kiPrefix}た`,
        pastReading: 'きた',
        pastNegative: `${prefix}なかった`,
        pastNegReading: 'こなかった'
      },
      {
        id: 'masu',
        name: 'Bentuk Sopan (ます形)',
        category: 'N5 Dasar',
        desc: 'Bentuk standar sopan (teinei-go) untuk percakapan umum.',
        positive: `${kiPrefix}ます`,
        reading: 'きます',
        negative: `${kiPrefix}ません`,
        negReading: 'きません',
        past: `${kiPrefix}ました`,
        pastReading: 'きました',
        pastNegative: `${kiPrefix}ませんでした`,
        pastNegReading: 'きませんでした'
      },
      {
        id: 'te',
        name: 'Bentuk Sambung (て形)',
        category: 'N5 Dasar',
        desc: 'Digunakan untuk urutan kegiatan (dan...), permohonan (~てください), sedang berlangsung (~ている).',
        positive: `${kiPrefix}て`,
        reading: 'きて',
        negative: `${prefix}なくて`,
        negReading: 'こなくて'
      },
      {
        id: 'nai',
        name: 'Bentuk Negatif Kasual (ない形)',
        category: 'N5 Dasar',
        desc: 'Digunakan untuk menyatakan tidak/bukan secara kasual, larangan (~ないで), atau keharusan (~なければならない).',
        positive: `${prefix}ない`,
        reading: 'こない',
        negative: `${verb}`,
        negReading: 'くる'
      },
      {
        id: 'ta',
        name: 'Bentuk Lampau Kasual (た形)',
        category: 'N5 Dasar',
        desc: 'Digunakan untuk menyatakan hal yang sudah terjadi di masa lalu secara kasual atau pengalaman (~たことがある).',
        positive: `${kiPrefix}た`,
        reading: 'きた',
        negative: `${prefix}なかった`,
        negReading: 'こなかった'
      },
      {
        id: 'kanou',
        name: 'Bentuk Potensial / Bisa (可能形)',
        category: 'N4 Menengah',
        desc: 'Menyatakan kemampuan atau potensi (bisa datang / sanggup datang).',
        positive: `${prefix}られる`,
        reading: 'こられる',
        negative: `${prefix}られない`,
        negReading: 'こられない'
      },
      {
        id: 'ikou',
        name: 'Bentuk Ajakan / Kehendak (意向形)',
        category: 'N4 Menengah',
        desc: 'Bentuk kasual dari ~ましょう ("Ayo kita / Mari kita...").',
        positive: `${prefix}よう`,
        reading: 'こよう',
        negative: `${verb}まい`,
        negReading: 'くるまい'
      },
      {
        id: 'jouken',
        name: 'Bentuk Pengandaian (ば形 / たら形)',
        category: 'N4 Menengah',
        desc: 'Menyatakan syarat atau kondisi ("Jika/Kalau datang...").',
        positive: `${kuPrefix}れば / ${kiPrefix}たら`,
        reading: 'くれば / きたら',
        negative: `${prefix}なければ`,
        negReading: 'こなければ'
      },
      {
        id: 'meirei',
        name: 'Bentuk Perintah & Larangan (命令形・禁止形)',
        category: 'N3 Lanjutan',
        desc: 'Perintah tegas atau seruan larangan ("Ayo ke sini!" / "Jangan datang!").',
        positive: `${prefix}い`,
        reading: 'こい',
        negative: `${verb}な`,
        negReading: 'くるな'
      },
      {
        id: 'shieki',
        name: 'Bentuk Kausatif / Menyuruh (使役形)',
        category: 'N4 Menengah',
        desc: 'Menyuruh atau membiarkan seseorang datang.',
        positive: `${prefix}させる`,
        reading: 'こさせる',
        negative: `${prefix}させない`,
        negReading: 'こさせない'
      },
      {
        id: 'ukemi',
        name: 'Bentuk Pasif (受身形)',
        category: 'N4 Menengah',
        desc: 'Bentuk pasif ("didatangi" / merasa terganggu oleh kedatangan seseorang).',
        positive: `${prefix}られる`,
        reading: 'こられる',
        negative: `${prefix}られない`,
        negReading: 'こられない'
      }
    ];
  } else if (type === 'suru') {
    const base = verb.endsWith('する') ? verb.slice(0, -2) : '';
    const baseReading = reading.endsWith('する') ? reading.slice(0, -2) : '';

    forms = [
      {
        id: 'jisho',
        name: 'Bentuk Kamus (辞書形)',
        category: 'N5 Dasar',
        desc: 'Bentuk dasar informal / kasual percakapan sehari-hari.',
        positive: verb,
        reading: reading || 'する',
        negative: `${base}しない`,
        negReading: `${baseReading}しない`,
        past: `${base}した`,
        pastReading: `${baseReading}した`,
        pastNegative: `${base}しなかった`,
        pastNegReading: `${baseReading}しなかった`
      },
      {
        id: 'masu',
        name: 'Bentuk Sopan (ます形)',
        category: 'N5 Dasar',
        desc: 'Bentuk standar sopan (teinei-go) untuk percakapan umum.',
        positive: `${base}します`,
        reading: `${baseReading}します`,
        negative: `${base}しません`,
        negReading: `${baseReading}しません`,
        past: `${base}しました`,
        pastReading: `${baseReading}しました`,
        pastNegative: `${base}しませんでした`,
        pastNegReading: `${baseReading}しませんでした`
      },
      {
        id: 'te',
        name: 'Bentuk Sambung (て形)',
        category: 'N5 Dasar',
        desc: 'Digunakan untuk merangkai kalimat, permohonan (~てください), atau sedang berlangsung (~ている).',
        positive: `${base}して`,
        reading: `${baseReading}して`,
        negative: `${base}しなくて`,
        negReading: `${baseReading}しなくて`
      },
      {
        id: 'nai',
        name: 'Bentuk Negatif Kasual (ない形)',
        category: 'N5 Dasar',
        desc: 'Digunakan untuk menyatakan tidak secara kasual, larangan, atau kewajiban.',
        positive: `${base}しない`,
        reading: `${baseReading}しない`,
        negative: `${verb}`,
        negReading: reading || 'する'
      },
      {
        id: 'ta',
        name: 'Bentuk Lampau Kasual (た形)',
        category: 'N5 Dasar',
        desc: 'Menyatakan aktivitas lampau informal atau pengalaman.',
        positive: `${base}した`,
        reading: `${baseReading}した`,
        negative: `${base}しなかった`,
        negReading: `${baseReading}しなかった`
      },
      {
        id: 'kanou',
        name: 'Bentuk Potensial / Bisa (可能形)',
        category: 'N4 Menengah',
        desc: 'Menyatakan sanggup / mampu melakukan (できる).',
        positive: `${base}できる`,
        reading: `${baseReading}できる`,
        negative: `${base}できない`,
        negReading: `${baseReading}できない`
      },
      {
        id: 'ikou',
        name: 'Bentuk Ajakan / Kehendak (意向形)',
        category: 'N4 Menengah',
        desc: 'Bentuk kasual ajakan ("Mari/Ayo kita lakukan!").',
        positive: `${base}しよう`,
        reading: `${baseReading}しよう`,
        negative: `${verb}まい`,
        negReading: `${reading || 'する'}まい`
      },
      {
        id: 'jouken',
        name: 'Bentuk Pengandaian (ば形 / たら形)',
        category: 'N4 Menengah',
        desc: 'Menyatakan syarat ("Jika/Kalau melakukan...").',
        positive: `${base}すれば / ${base}したら`,
        reading: `${baseReading}すれば / ${baseReading}したら`,
        negative: `${base}しなければ`,
        negReading: `${baseReading}しなければ`
      },
      {
        id: 'meirei',
        name: 'Bentuk Perintah & Larangan (命令形・禁止形)',
        category: 'N3 Lanjutan',
        desc: 'Perintah tegas ("Lakukan!") atau larangan keras ("Jangan lakukan!").',
        positive: `${base}しろ`,
        reading: `${baseReading}しろ`,
        negative: `${verb}な`,
        negReading: `${reading || 'する'}な`
      },
      {
        id: 'shieki',
        name: 'Bentuk Kausatif / Menyuruh (使役形)',
        category: 'N4 Menengah',
        desc: 'Menyuruh atau memperbolehkan melakukan.',
        positive: `${base}させる`,
        reading: `${baseReading}させる`,
        negative: `${base}させない`,
        negReading: `${baseReading}させない`
      },
      {
        id: 'ukemi',
        name: 'Bentuk Pasif (受身形)',
        category: 'N4 Menengah',
        desc: 'Bentuk pasif ("dilakukan" / dikenai tindakan).',
        positive: `${base}される`,
        reading: `${baseReading}される`,
        negative: `${base}されない`,
        negReading: `${baseReading}されない`
      }
    ];
  } else if (type === 'ichidan') {
    // Ichidan rule: drop final 'る'
    const stem = verb.slice(0, -1);
    const stemReading = reading ? reading.slice(0, -1) : '';

    forms = [
      {
        id: 'jisho',
        name: 'Bentuk Kamus (辞書形)',
        category: 'N5 Dasar',
        desc: 'Bentuk dasar kasual percakapan sehari-hari.',
        positive: verb,
        reading: reading,
        negative: `${stem}ない`,
        negReading: stemReading ? `${stemReading}ない` : '',
        past: `${stem}た`,
        pastReading: stemReading ? `${stemReading}た` : '',
        pastNegative: `${stem}なかった`,
        pastNegReading: stemReading ? `${stemReading}なかった` : ''
      },
      {
        id: 'masu',
        name: 'Bentuk Sopan (ます形)',
        category: 'N5 Dasar',
        desc: 'Bentuk standar sopan (teinei-go) untuk percakapan sehari-hari.',
        positive: `${stem}ます`,
        reading: stemReading ? `${stemReading}ます` : '',
        negative: `${stem}ません`,
        negReading: stemReading ? `${stemReading}ません` : '',
        past: `${stem}ました`,
        pastReading: stemReading ? `${stemReading}ました` : '',
        pastNegative: `${stem}ませんでした`,
        pastNegReading: stemReading ? `${stemReading}ませんでした` : ''
      },
      {
        id: 'te',
        name: 'Bentuk Sambung (て形)',
        category: 'N5 Dasar',
        desc: 'Digunakan untuk merangkai kalimat, permohonan (~てください), atau sedang berlangsung (~ている).',
        positive: `${stem}て`,
        reading: stemReading ? `${stemReading}て` : '',
        negative: `${stem}なくて`,
        negReading: stemReading ? `${stemReading}なくて` : ''
      },
      {
        id: 'nai',
        name: 'Bentuk Negatif Kasual (ない形)',
        category: 'N5 Dasar',
        desc: 'Digunakan untuk menyangkal secara kasual ("Tidak ...").',
        positive: `${stem}ない`,
        reading: stemReading ? `${stemReading}ない` : '',
        negative: verb,
        negReading: reading
      },
      {
        id: 'ta',
        name: 'Bentuk Lampau Kasual (た形)',
        category: 'N5 Dasar',
        desc: 'Menyatakan hal yang sudah terjadi di masa lalu ("Sudah ...").',
        positive: `${stem}た`,
        reading: stemReading ? `${stemReading}た` : '',
        negative: `${stem}なかった`,
        negReading: stemReading ? `${stemReading}なかった` : ''
      },
      {
        id: 'kanou',
        name: 'Bentuk Potensial / Bisa (可能形)',
        category: 'N4 Menengah',
        desc: 'Menyatakan kesanggupan / kemampuan ("Bisa / Dapat ...").',
        positive: `${stem}られる`,
        reading: stemReading ? `${stemReading}られる` : '',
        negative: `${stem}られない`,
        negReading: stemReading ? `${stemReading}られない` : ''
      },
      {
        id: 'ikou',
        name: 'Bentuk Ajakan / Kehendak (意向形)',
        category: 'N4 Menengah',
        desc: 'Bentuk kasual ajakan / niat ("Ayo kita ...").',
        positive: `${stem}よう`,
        reading: stemReading ? `${stemReading}よう` : '',
        negative: `${verb}まい`,
        negReading: reading ? `${reading}まい` : ''
      },
      {
        id: 'jouken',
        name: 'Bentuk Pengandaian (ば形 / たら形)',
        category: 'N4 Menengah',
        desc: 'Menyatakan syarat / pengandaian ("Jika / Kalau ...").',
        positive: `${stem}れば / ${stem}たら`,
        reading: stemReading ? `${stemReading}れば / ${stemReading}たら` : '',
        negative: `${stem}なければ`,
        negReading: stemReading ? `${stemReading}なければ` : ''
      },
      {
        id: 'meirei',
        name: 'Bentuk Perintah & Larangan (命令形・禁止形)',
        category: 'N3 Lanjutan',
        desc: 'Perintah tegas kasual ("Lakukan!") atau larangan ("Jangan!").',
        positive: `${stem}ろ`,
        reading: stemReading ? `${stemReading}ろ` : '',
        negative: `${verb}な`,
        negReading: reading ? `${reading}な` : ''
      },
      {
        id: 'shieki',
        name: 'Bentuk Kausatif / Menyuruh (使役形)',
        category: 'N4 Menengah',
        desc: 'Menyuruh atau memperbolehkan orang lain berbuat.',
        positive: `${stem}させる`,
        reading: stemReading ? `${stemReading}させる` : '',
        negative: `${stem}させない`,
        negReading: stemReading ? `${stemReading}させない` : ''
      },
      {
        id: 'ukemi',
        name: 'Bentuk Pasif (受身形)',
        category: 'N4 Menengah',
        desc: 'Bentuk pasif ("dikenai" / "di-...-kan").',
        positive: `${stem}られる`,
        reading: stemReading ? `${stemReading}られる` : '',
        negative: `${stem}られない`,
        negReading: stemReading ? `${stemReading}られない` : ''
      }
    ];
  } else {
    // Godan Verbs
    // Map final char to 5 vowel columns
    const lastChar = verb.slice(-1);
    const stem = verb.slice(0, -1);
    const lastReadingChar = reading ? reading.slice(-1) : lastChar;
    const stemReading = reading ? reading.slice(0, -1) : stem;

    // Godan sound shifts: [a-dan, i-dan, u-dan, e-dan, o-dan, te/ta prefix]
    const godanTable = {
      'う': { a: 'わ', i: 'い', u: 'う', e: 'え', o: 'お', te: 'って', ta: 'った' },
      'く': { a: 'か', i: 'き', u: 'く', e: 'け', o: 'こ', te: 'いて', ta: 'いた' },
      'ぐ': { a: 'が', i: 'ぎ', u: 'ぐ', e: 'げ', o: 'ご', te: 'いで', ta: 'いだ' },
      'す': { a: 'さ', i: 'し', u: 'す', e: 'せ', o: 'そ', te: 'して', ta: 'した' },
      'つ': { a: 'た', i: 'ち', u: 'つ', e: 'て', o: 'と', te: 'って', ta: 'った' },
      'ぬ': { a: 'な', i: 'に', u: 'ぬ', e: 'ね', o: 'の', te: 'んで', ta: 'んだ' },
      'ぶ': { a: 'ば', i: 'び', u: 'ぶ', e: 'べ', o: 'ぼ', te: 'んで', ta: 'んだ' },
      'む': { a: 'ま', i: 'み', u: 'む', e: 'め', o: 'も', te: 'んで', ta: 'んだ' },
      'る': { a: 'ら', i: 'り', u: 'る', e: 'れ', o: 'ろ', te: 'って', ta: 'った' }
    };

    // Special exception: 行く (iku) -> te/ta is 行って / 行った
    const isIku = verb === '行く' || reading === 'いく';
    const row = godanTable[lastReadingChar] || godanTable['る'];

    const teSuffix = isIku ? 'って' : row.te;
    const taSuffix = isIku ? 'った' : row.ta;

    forms = [
      {
        id: 'jisho',
        name: 'Bentuk Kamus (辞書形)',
        category: 'N5 Dasar',
        desc: 'Bentuk dasar kasual percakapan sehari-hari.',
        positive: verb,
        reading: reading,
        negative: `${stem}${row.a}ない`,
        negReading: stemReading ? `${stemReading}${row.a}ない` : '',
        past: `${stem}${taSuffix}`,
        pastReading: stemReading ? `${stemReading}${taSuffix}` : '',
        pastNegative: `${stem}${row.a}なかった`,
        pastNegReading: stemReading ? `${stemReading}${row.a}なかった` : ''
      },
      {
        id: 'masu',
        name: 'Bentuk Sopan (ます形)',
        category: 'N5 Dasar',
        desc: 'Bentuk standar sopan (teinei-go) untuk percakapan sehari-hari.',
        positive: `${stem}${row.i}ます`,
        reading: stemReading ? `${stemReading}${row.i}ます` : '',
        negative: `${stem}${row.i}ません`,
        negReading: stemReading ? `${stemReading}${row.i}ません` : '',
        past: `${stem}${row.i}ました`,
        pastReading: stemReading ? `${stemReading}${row.i}ました` : '',
        pastNegative: `${stem}${row.i}ませんでした`,
        pastNegReading: stemReading ? `${stemReading}${row.i}ませんでした` : ''
      },
      {
        id: 'te',
        name: 'Bentuk Sambung (て形)',
        category: 'N5 Dasar',
        desc: 'Digunakan untuk merangkai kalimat, permohonan (~てください), atau sedang berlangsung (~ている).',
        positive: `${stem}${teSuffix}`,
        reading: stemReading ? `${stemReading}${teSuffix}` : '',
        negative: `${stem}${row.a}なくて`,
        negReading: stemReading ? `${stemReading}${row.a}なくて` : ''
      },
      {
        id: 'nai',
        name: 'Bentuk Negatif Kasual (ない形)',
        category: 'N5 Dasar',
        desc: 'Digunakan untuk menyangkal kasual ("Tidak ...").',
        positive: `${stem}${row.a}ない`,
        reading: stemReading ? `${stemReading}${row.a}ない` : '',
        negative: verb,
        negReading: reading
      },
      {
        id: 'ta',
        name: 'Bentuk Lampau Kasual (た形)',
        category: 'N5 Dasar',
        desc: 'Menyatakan kejadian masa lalu ("Sudah ...").',
        positive: `${stem}${taSuffix}`,
        reading: stemReading ? `${stemReading}${taSuffix}` : '',
        negative: `${stem}${row.a}なかった`,
        negReading: stemReading ? `${stemReading}${row.a}なかった` : ''
      },
      {
        id: 'kanou',
        name: 'Bentuk Potensial / Bisa (可能形)',
        category: 'N4 Menengah',
        desc: 'Menyatakan kemampuan / kesanggupan ("Bisa / Mampu ...").',
        positive: `${stem}${row.e}る`,
        reading: stemReading ? `${stemReading}${row.e}る` : '',
        negative: `${stem}${row.e}ない`,
        negReading: stemReading ? `${stemReading}${row.e}ない` : ''
      },
      {
        id: 'ikou',
        name: 'Bentuk Ajakan / Kehendak (意向形)',
        category: 'N4 Menengah',
        desc: 'Bentuk kasual ajakan / rencana ("Ayo kita ...").',
        positive: `${stem}${row.o}う`,
        reading: stemReading ? `${stemReading}${row.o}う` : '',
        negative: `${verb}まい`,
        negReading: reading ? `${reading}まい` : ''
      },
      {
        id: 'jouken',
        name: 'Bentuk Pengandaian (ば形 / たら形)',
        category: 'N4 Menengah',
        desc: 'Menyatakan syarat / pengandaian ("Jika / Kalau ...").',
        positive: `${stem}${row.e}ば / ${stem}${taSuffix}ら`,
        reading: stemReading ? `${stemReading}${row.e}ば / ${stemReading}${taSuffix}ら` : '',
        negative: `${stem}${row.a}なければ`,
        negReading: stemReading ? `${stemReading}${row.a}なければ` : ''
      },
      {
        id: 'meirei',
        name: 'Bentuk Perintah & Larangan (命令形・禁止形)',
        category: 'N3 Lanjutan',
        desc: 'Perintah tegas kasual ("Lakukan!") atau larangan ("Jangan!").',
        positive: `${stem}${row.e}`,
        reading: stemReading ? `${stemReading}${row.e}` : '',
        negative: `${verb}な`,
        negReading: reading ? `${reading}な` : ''
      },
      {
        id: 'shieki',
        name: 'Bentuk Kausatif / Menyuruh (使役形)',
        category: 'N4 Menengah',
        desc: 'Menyuruh atau membiarkan orang lain berbuat.',
        positive: `${stem}${row.a}せる`,
        reading: stemReading ? `${stemReading}${row.a}せる` : '',
        negative: `${stem}${row.a}せない`,
        negReading: stemReading ? `${stemReading}${row.a}せない` : ''
      },
      {
        id: 'ukemi',
        name: 'Bentuk Pasif (受身形)',
        category: 'N4 Menengah',
        desc: 'Bentuk pasif ("dikenai" / "di-...-i").',
        positive: `${stem}${row.a}れる`,
        reading: stemReading ? `${stemReading}${row.a}れる` : '',
        negative: `${stem}${row.a}れない`,
        negReading: stemReading ? `${stemReading}${row.a}れない` : ''
      }
    ];
  }

  return {
    verb,
    reading: reading || verb,
    meaning,
    groupName,
    groupCode,
    forms
  };
}
