const fs = require('fs');
const path = require('path');

// Sleep utility to prevent rate-limiting
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchVocab() {
  console.log('Fetching Vocabulary from JLPT Vocab API...');
  const allVocab = [];
  
  for (let level = 5; level >= 1; level--) {
    console.log(`Fetching N${level} vocabulary...`);
    try {
      const response = await fetch(`https://jlpt-vocab-api.vercel.app/api/words?level=${level}&limit=150`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      
      const words = data.words || [];
      console.log(`Fetched ${words.length} words for N${level}.`);
      
      // Map to our dataset structure
      const mapped = words.map(item => {
        let partOfSpeech = 'Kata Benda';
        if (item.word.endsWith('する')) partOfSpeech = 'Kata Kerja (V3)';
        else if (item.word.endsWith('い')) partOfSpeech = 'Kata Sifat I';
        else if (item.word.endsWith('な')) partOfSpeech = 'Kata Sifat Na';
        else if (item.word.endsWith('む') || item.word.endsWith('く') || item.word.endsWith('う') || item.word.endsWith('る')) partOfSpeech = 'Kata Kerja';

        return {
          word: item.word,
          reading: item.furigana || item.word,
          romaji: item.romaji || '',
          level: `N${level}`,
          partOfSpeech: partOfSpeech,
          meaning: item.meaning,
          example: `${item.word}を使う例文です。`,
          exampleReading: `${item.furigana || item.word}をつかうれいぶんです。`,
          exampleMeaning: `Ini adalah contoh kalimat menggunakan "${item.meaning}".`
        };
      });
      
      allVocab.push(...mapped);
    } catch (error) {
      console.error(`Error fetching N${level} vocab:`, error);
    }
    await sleep(200); // polite spacing
  }

  // Write to src/data/vocab.js
  const vocabFilePath = path.join(__dirname, 'src', 'data', 'vocab.js');
  const fileContent = `export const vocabData = ${JSON.stringify(allVocab, null, 2)};\n`;
  fs.writeFileSync(vocabFilePath, fileContent, 'utf-8');
  console.log(`Vocabulary saved successfully! Total words: ${allVocab.length}`);
  return allVocab;
}

async function fetchKanji(vocabPool) {
  console.log('Fetching Kanji from KanjiAPI...');
  const allKanji = [];
  
  for (let level = 5; level >= 1; level--) {
    console.log(`Fetching N${level} Kanji list...`);
    try {
      const response = await fetch(`https://kanjiapi.dev/v1/kanji/jlpt-${level}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const kanjiList = await response.json();
      
      // Take the top 50 Kanji characters for each level
      const targetKanji = kanjiList.slice(0, 50);
      console.log(`Fetching details for ${targetKanji.length} Kanji for N${level}...`);
      
      for (const char of targetKanji) {
        try {
          const detailRes = await fetch(`https://kanjiapi.dev/v1/kanji/${encodeURIComponent(char)}`);
          if (!detailRes.ok) continue;
          const details = await detailRes.json();
          
          // Find vocabulary words containing this Kanji to act as Jukugo (example compounds)
          const relatedVocab = vocabPool
            .filter(v => v.word.includes(char) && v.word !== char)
            .slice(0, 3)
            .map(v => ({
              word: v.word,
              reading: v.reading,
              meaning: v.meaning
            }));

          // Fallback example if no compound words found
          if (relatedVocab.length === 0) {
            relatedVocab.push({
              word: char,
              reading: details.kun_readings[0] || details.on_readings[0] || '',
              meaning: details.meanings[0]
            });
          }

          allKanji.push({
            kanji: details.kanji,
            level: `N${level}`,
            meanings: details.meanings,
            kunyomi: details.kun_readings,
            onyomi: details.on_readings,
            strokes: details.stroke_count,
            examples: relatedVocab
          });
        } catch (charError) {
          console.error(`Error details for kanji ${char}:`, charError);
        }
        await sleep(100); // spacing to prevent rate limiting
      }
    } catch (error) {
      console.error(`Error fetching N${level} kanji:`, error);
    }
  }

  // Write to src/data/kanji.js
  const kanjiFilePath = path.join(__dirname, 'src', 'data', 'kanji.js');
  const fileContent = `export const kanjiData = ${JSON.stringify(allKanji, null, 2)};\n`;
  fs.writeFileSync(kanjiFilePath, fileContent, 'utf-8');
  console.log(`Kanji saved successfully! Total Kanji: ${allKanji.length}`);
}

async function run() {
  const vocabPool = await fetchVocab();
  await fetchKanji(vocabPool);
  console.log('Data fetching complete!');
}

run();
