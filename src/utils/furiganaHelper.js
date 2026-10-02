import { useState, useEffect } from 'react';

// Regex constants: Include \u3005 (Kanji iteration mark 々 like in 時々, 人々, 色々)
const KANJI_REGEX = /[\u4E00-\u9FAF\u3400-\u4DBF\u3005]/;
const KANJI_BLOCK_REGEX = /([\u4E00-\u9FAF\u3400-\u4DBF\u3005]+)/g;

/**
 * Convert Katakana to Hiragana for resilient anchor matching
 */
function katakanaToHiragana(str) {
  if (!str) return '';
  return str.replace(/[\u30A1-\u30F6]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));
}

/**
 * Align kanji words/sentences with their hiragana reading using kana anchor points.
 * Returns an array of segments: { text: string, reading?: string, isKanji: boolean }
 */
export function alignRubySegments(text, reading) {
  if (!text) return [];
  if (!reading || !KANJI_REGEX.test(text)) {
    return [{ text, isKanji: false }];
  }

  const cleanText = text.trim();
  // Strip halfwidth and fullwidth spaces from reading for matching (children's books often use wakachigaki spaces in reading)
  const cleanReading = reading.replace(/[\s\u3000]+/g, '');

  if (cleanText === cleanReading || !KANJI_REGEX.test(cleanText)) {
    return [{ text: cleanText, isKanji: false }];
  }

  const normReading = katakanaToHiragana(cleanReading);
  const tokens = cleanText.split(KANJI_BLOCK_REGEX).filter(Boolean);
  const segments = [];
  let cursor = 0;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const isKanji = KANJI_REGEX.test(token);

    if (!isKanji) {
      const normToken = katakanaToHiragana(token).replace(/[\s\u3000]+/g, '');
      let matchIdx = normReading.indexOf(normToken, cursor);
      if (matchIdx !== -1) {
        cursor = matchIdx + normToken.length;
      } else {
        // Fallback: match stripped of brackets, punctuation, and whitespace
        const stripped = normToken.replace(/[。、！？\s「」『』（）()\d]/g, '');
        if (stripped) {
          matchIdx = normReading.indexOf(stripped, cursor);
          if (matchIdx !== -1) {
            cursor = matchIdx + stripped.length;
          }
        }
      }
      segments.push({ text: token, isKanji: false });
    } else {
      const nextToken = tokens[i + 1];
      let tokenReading = '';

      if (nextToken) {
        const normNext = katakanaToHiragana(nextToken).replace(/[\s\u3000]+/g, '');
        // Kanji characters must have at least 1 mora. Start search at cursor + 1
        // to prevent collisions when kanji reading starts with the same kana as the anchor (e.g. 庭に, 日本に).
        const minMora = 1;
        let nextIdx = normReading.indexOf(normNext, cursor + minMora);

        if (nextIdx === -1) {
          const strippedNext = normNext.replace(/[。、！？\s「」『』（）()\d]/g, '');
          if (strippedNext) {
            nextIdx = normReading.indexOf(strippedNext, cursor + minMora);
          }
        }

        // Fallback search without minMora offset
        if (nextIdx === -1) {
          nextIdx = normReading.indexOf(normNext, cursor);
        }

        if (nextIdx !== -1 && nextIdx >= cursor) {
          tokenReading = cleanReading.slice(cursor, nextIdx);
          cursor = nextIdx;
        } else {
          tokenReading = cleanReading.slice(cursor);
          cursor = cleanReading.length;
        }
      } else {
        tokenReading = cleanReading.slice(cursor);
        cursor = cleanReading.length;
      }

      // Clean leading and trailing punctuation/brackets from extracted reading
      const cleanR = tokenReading.replace(/^[。、！？\s「」『』（）()]+|[。、！？\s「」『』（）()]+$/g, '');
      segments.push({
        text: token,
        reading: cleanR || null,
        isKanji: true,
      });
    }
  }

  return segments;
}

/**
 * Global Furigana Mode State Hook
 * Values: 'always' (default) | 'hover' | 'hide'
 */
export const FURIGANA_STORAGE_KEY = 'nihongo_spark_furigana_mode';

export function useFuriganaMode() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem(FURIGANA_STORAGE_KEY) || 'always';
  });

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === FURIGANA_STORAGE_KEY && e.newValue) {
        setMode(e.newValue);
      }
    };
    const handleCustomChange = (e) => {
      if (e.detail) {
        setMode(e.detail);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('furigana-mode-change', handleCustomChange);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('furigana-mode-change', handleCustomChange);
    };
  }, []);

  const changeMode = (newMode) => {
    setMode(newMode);
    localStorage.setItem(FURIGANA_STORAGE_KEY, newMode);
    window.dispatchEvent(new CustomEvent('furigana-mode-change', { detail: newMode }));
  };

  return [mode, changeMode];
}
