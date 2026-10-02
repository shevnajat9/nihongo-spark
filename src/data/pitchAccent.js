// Database Kontur Nada Suara (Tokyo Pitch Accent / 高低アクセント)
// Menampilkan pola nada (Heiban, Atamadaka, Nakadaka, Odaka) dengan visualisasi tangga nada

export const pitchAccentPairs = [
  {
    id: 'hashi',
    term: 'はし (Hashi)',
    meaningOverview: 'Sumpit vs Jembatan vs Ujung',
    variants: [
      {
        word: '箸',
        reading: 'はし',
        romaji: 'HA-shi',
        meaning: 'Sumpit makan',
        patternType: 'Atamadaka (頭高型)',
        accentMora: 1,
        // High, Low
        moras: [
          { kana: 'は', pitch: 'high' },
          { kana: 'し', pitch: 'low' }
        ],
        particleDrop: 'low',
        example: '箸でラーメンを食べる。(Makan ramen dengan sumpit.)'
      },
      {
        word: '橋',
        reading: 'はし',
        romaji: 'ha-SHI [ga]',
        meaning: 'Jembatan penyeberangan',
        patternType: 'Odaka (尾高型)',
        accentMora: 2,
        moras: [
          { kana: 'は', pitch: 'low' },
          { kana: 'し', pitch: 'high' }
        ],
        particleDrop: 'drop', // Drops on particle: ha-SHI ga (low)
        example: '大きな橋を渡る。(Menyeberangi jembatan besar.)'
      },
      {
        word: '端',
        reading: 'はし',
        romaji: 'ha-SHI',
        meaning: 'Ujung / Tepi',
        patternType: 'Heiban (平板型)',
        accentMora: 0,
        moras: [
          { kana: 'は', pitch: 'low' },
          { kana: 'し', pitch: 'high' }
        ],
        particleDrop: 'high', // Stays high: ha-SHI-GA
        example: '道の端を歩く。(Berjalan di tepi jalan.)'
      }
    ]
  },
  {
    id: 'ame',
    term: 'あめ (Ame)',
    meaningOverview: 'Hujan vs Permen Manis',
    variants: [
      {
        word: '雨',
        reading: 'あめ',
        romaji: 'A-me',
        meaning: 'Hujan air',
        patternType: 'Atamadaka (頭高型)',
        accentMora: 1,
        moras: [
          { kana: 'あ', pitch: 'high' },
          { kana: 'め', pitch: 'low' }
        ],
        particleDrop: 'low',
        example: '外は雨が降っています。(Di luar sedang turun hujan.)'
      },
      {
        word: '飴',
        reading: 'あめ',
        romaji: 'a-ME',
        meaning: 'Permen manis',
        patternType: 'Heiban (平板型)',
        accentMora: 0,
        moras: [
          { kana: 'あ', pitch: 'low' },
          { kana: 'め', pitch: 'high' }
        ],
        particleDrop: 'high',
        example: '甘い飴をなめる。(Mengemut permen manis.)'
      }
    ]
  },
  {
    id: 'hana',
    term: 'はな (Hana)',
    meaningOverview: 'Hidung vs Bunga',
    variants: [
      {
        word: '鼻',
        reading: 'はな',
        romaji: 'ha-NA',
        meaning: 'Hidung manusia/hewan',
        patternType: 'Heiban (平板型)',
        accentMora: 0,
        moras: [
          { kana: 'は', pitch: 'low' },
          { kana: 'な', pitch: 'high' }
        ],
        particleDrop: 'high',
        example: '花粉で鼻がムズムズする。(Hidung gatal karena serbuk bunga.)'
      },
      {
        word: '花',
        reading: 'はな',
        romaji: 'ha-NA [ga]',
        meaning: 'Bunga mekar',
        patternType: 'Odaka (尾高型)',
        accentMora: 2,
        moras: [
          { kana: 'は', pitch: 'low' },
          { kana: 'な', pitch: 'high' }
        ],
        particleDrop: 'drop',
        example: '春に桜の花が咲く。(Bunga sakura mekar di musim semi.)'
      }
    ]
  },
  {
    id: 'nihongo',
    term: 'にほんご (Nihongo)',
    meaningOverview: 'Bahasa Jepang',
    variants: [
      {
        word: '日本語',
        reading: 'にほんご',
        romaji: 'ni-HON-GO',
        meaning: 'Bahasa Jepang',
        patternType: 'Heiban (平板型 - Pola 0)',
        accentMora: 0,
        moras: [
          { kana: 'に', pitch: 'low' },
          { kana: 'ほ', pitch: 'high' },
          { kana: 'ん', pitch: 'high' },
          { kana: 'ご', pitch: 'high' }
        ],
        particleDrop: 'high',
        example: '日本語を毎日勉強しています。(Saya belajar bahasa Jepang setiap hari.)'
      }
    ]
  },
  {
    id: 'arigatou',
    term: 'ありがとう (Arigatou)',
    meaningOverview: 'Terima Kasih',
    variants: [
      {
        word: '有難う',
        reading: 'ありがとう',
        romaji: 'a-RI-GA-tou',
        meaning: 'Terima kasih (Ucapan syukur)',
        patternType: 'Nakadaka (中高型 - Pola 2/3)',
        accentMora: 2,
        moras: [
          { kana: 'あ', pitch: 'low' },
          { kana: 'り', pitch: 'high' },
          { kana: 'が', pitch: 'high' },
          { kana: 'と', pitch: 'low' },
          { kana: 'う', pitch: 'low' }
        ],
        particleDrop: 'low',
        example: '親切にしてくれてありがとう。(Terima kasih telah bersikap ramah.)'
      }
    ]
  }
];
