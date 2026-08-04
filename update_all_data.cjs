const fs = require('fs');
const path = require('path');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchFullVocab() {
  console.log('--- FETCHING FULL VOCABULARY DATASETS ---');
  const allVocab = [];
  
  for (let level = 5; level >= 1; level--) {
    // Corrected path to data-source
    const url = `https://raw.githubusercontent.com/wkei/jlpt-vocab-api/main/data-source/n${level}.json`;
    console.log(`Downloading N${level} vocabulary from: ${url}`);
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      
      console.log(`Successfully downloaded ${data.length} words for N${level}.`);
      
      const mapped = data.map(item => {
        let partOfSpeech = 'Kata Benda';
        const word = item.word || '';
        
        if (word.endsWith('する')) partOfSpeech = 'Kata Kerja (V3)';
        else if (word.endsWith('い')) partOfSpeech = 'Kata Sifat I';
        else if (word.endsWith('な')) partOfSpeech = 'Kata Sifat Na';
        else if (word.endsWith('む') || word.endsWith('く') || word.endsWith('う') || word.endsWith('る')) partOfSpeech = 'Kata Kerja';

        return {
          word: word,
          reading: item.furigana || word,
          romaji: item.romaji || '',
          level: `N${level}`,
          partOfSpeech: partOfSpeech,
          meaning: item.meaning || '',
          example: `${word}を使う例文です。`,
          exampleReading: `${item.furigana || word}をつかうれいぶんです。`,
          exampleMeaning: `Ini adalah contoh kalimat menggunakan "${item.meaning || ''}".`
        };
      });
      
      allVocab.push(...mapped);
    } catch (error) {
      console.error(`Error downloading N${level} vocab:`, error.message);
    }
    await sleep(200); // spacing
  }

  const vocabFilePath = path.join(__dirname, 'src', 'data', 'vocab.js');
  console.log(`Writing full vocabulary to: ${vocabFilePath}`);
  const fileContent = `export const vocabData = ${JSON.stringify(allVocab, null, 2)};\n`;
  fs.writeFileSync(vocabFilePath, fileContent, 'utf-8');
  console.log(`Vocabulary writing complete! Total words loaded: ${allVocab.length}`);
  return allVocab;
}

async function fetchFullKanji(vocabPool) {
  console.log('--- FETCHING FULL KANJI DATASETS ---');
  const url = `https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json`;
  console.log(`Downloading Kanji database from: ${url}`);
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const kanjiObject = await response.json();
    
    console.log(`Kanji database downloaded successfully. Parsing characters...`);
    const allKanji = [];
    const keys = Object.keys(kanjiObject);
    
    for (const char of keys) {
      const item = kanjiObject[char];
      
      // Corrected to use jlpt_new or jlpt_old
      const jlptLevel = item.jlpt_new || item.jlpt_old;
      if (!jlptLevel || jlptLevel < 1 || jlptLevel > 5) continue;
      
      // Find Jukugo (compound words) dynamically using the vocabulary dataset
      const relatedVocab = vocabPool
        .filter(v => v.word.includes(char) && v.word !== char)
        .slice(0, 3)
        .map(v => ({
          word: v.word,
          reading: v.reading,
          meaning: v.meaning
        }));

      // Fallback compound word if none found
      if (relatedVocab.length === 0) {
        relatedVocab.push({
          word: char,
          reading: (item.readings_kun && item.readings_kun[0]) || (item.readings_on && item.readings_on[0]) || '',
          meaning: (item.meanings && item.meanings[0]) || ''
        });
      }

      allKanji.push({
        kanji: char,
        level: `N${jlptLevel}`,
        meanings: item.meanings || [],
        kunyomi: item.readings_kun || [],
        onyomi: item.readings_on || [],
        strokes: item.strokes || 0,
        examples: relatedVocab
      });
    }

    const kanjiFilePath = path.join(__dirname, 'src', 'data', 'kanji.js');
    console.log(`Writing full Kanji to: ${kanjiFilePath}`);
    const fileContent = `export const kanjiData = ${JSON.stringify(allKanji, null, 2)};\n`;
    fs.writeFileSync(kanjiFilePath, fileContent, 'utf-8');
    console.log(`Kanji writing complete! Total Kanji loaded: ${allKanji.length}`);

  } catch (error) {
    console.error('Error fetching Kanji database:', error.message);
  }
}

async function run() {
  const vocabPool = await fetchFullVocab();
  await fetchFullKanji(vocabPool);
  console.log('--- ALL DATASETS POPULATED SUCCESSFULLY ---');
}

run();
