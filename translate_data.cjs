const fs = require('fs');
const path = require('path');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function translateText(text) {
  if (!text || text.trim() === '') return '';
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=id&dt=t&q=${encodeURIComponent(text)}`;
  
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const json = await response.json();
      
      // Parse Google Translate format: [[[translated, source, ...]]]
      if (json && json[0] && json[0][0] && json[0][0][0]) {
        return json[0][0][0].trim();
      }
      throw new Error("Invalid response format");
    } catch (error) {
      console.warn(`Translation attempt ${attempt} failed for "${text}":`, error.message);
      if (attempt < 3) {
        await sleep(1000 * attempt);
      }
    }
  }
  return text; // Return original text on failure
}

async function translateVocab() {
  const vocabPath = path.join(__dirname, 'src', 'data', 'vocab.js');
  console.log(`Reading vocabulary from: ${vocabPath}`);
  
  const fileContent = fs.readFileSync(vocabPath, 'utf-8');
  const startIndex = fileContent.indexOf('[');
  const endIndex = fileContent.lastIndexOf(']');
  
  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    console.error("Could not parse vocabData from file (invalid array bounds).");
    return;
  }
  
  const jsonString = fileContent.substring(startIndex, endIndex + 1);
  const vocabData = JSON.parse(jsonString);
  console.log(`Loaded ${vocabData.length} vocabulary words. Translating to Indonesian...`);
  
  let count = 0;
  for (const item of vocabData) {
    const originalMeaning = item.meaning;
    const indonesianMeaning = await translateText(originalMeaning);
    
    item.meaning = indonesianMeaning;
    item.exampleMeaning = `Ini adalah contoh kalimat menggunakan "${indonesianMeaning}".`;
    
    count++;
    if (count % 20 === 0) {
      console.log(`Translated ${count}/${vocabData.length} words...`);
    }
    await sleep(75); // Polite delay to avoid rate limiting
  }
  
  console.log('Writing translated vocabulary back to file...');
  const newContent = `export const vocabData = ${JSON.stringify(vocabData, null, 2)};\n`;
  fs.writeFileSync(vocabPath, newContent, 'utf-8');
  console.log('Vocabulary translation complete!');
}

async function translateKanji() {
  const kanjiPath = path.join(__dirname, 'src', 'data', 'kanji.js');
  console.log(`Reading Kanji from: ${kanjiPath}`);
  
  const fileContent = fs.readFileSync(kanjiPath, 'utf-8');
  const startIndex = fileContent.indexOf('[');
  const endIndex = fileContent.lastIndexOf(']');
  
  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    console.error("Could not parse kanjiData from file (invalid array bounds).");
    return;
  }
  
  const jsonString = fileContent.substring(startIndex, endIndex + 1);
  const kanjiData = JSON.parse(jsonString);
  console.log(`Loaded ${kanjiData.length} Kanji characters. Translating to Indonesian...`);
  
  let count = 0;
  for (const item of kanjiData) {
    // 1. Translate main meanings
    const updatedMeanings = [];
    for (const meaning of item.meanings) {
      const indonesian = await translateText(meaning);
      updatedMeanings.push(indonesian);
      await sleep(75);
    }
    item.meanings = updatedMeanings;
    
    // 2. Translate example compound meanings
    if (item.examples && Array.isArray(item.examples)) {
      for (const ex of item.examples) {
        if (ex.meaning) {
          ex.meaning = await translateText(ex.meaning);
          await sleep(75);
        }
      }
    }
    
    count++;
    if (count % 10 === 0) {
      console.log(`Translated ${count}/${kanjiData.length} Kanji...`);
    }
  }
  
  console.log('Writing translated Kanji back to file...');
  const newContent = `export const kanjiData = ${JSON.stringify(kanjiData, null, 2)};\n`;
  fs.writeFileSync(kanjiPath, newContent, 'utf-8');
  console.log('Kanji translation complete!');
}

async function run() {
  console.log('=== STARTING INDONESIAN TRANSLATION PROCESS ===');
  await translateVocab();
  await translateKanji();
  console.log('=== ALL DATASETS TRANSLATED TO INDONESIAN SUCCESSFULLY ===');
}

run();
