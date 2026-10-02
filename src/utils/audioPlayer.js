/**
 * Nihongo Spark - Universal Japanese Audio Engine
 * Mengatasi kendala audio hening/bisu di Linux, browser mobile, dan lingkungan tanpa paket speech-dispatcher.
 *
 * Arsitektur Audio Multi-Layer:
 * Layer 1A: Local Vite /api/tts Proxy (Bebas CORS, Bebas Referer Blocking, Cache Cepat)
 * Layer 1B: Direct High-Quality Google TTS CDN (dengan <meta name="referrer" content="no-referrer">)
 * Layer 2: Web SpeechSynthesis API dengan auto-unpause & voice matching (ja-JP)
 * Layer 3: Web Audio API Synthesizer (Acoustic confirmation chime) jika offline total tanpa mesin TTS
 */

let currentAudio = null;
let audioContext = null;

// Audio context unlock on first user gesture
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    try {
      if (!audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) audioContext = new AudioCtx();
      }
      if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
      }
    } catch {
      // ignore
    }
  };
  ['click', 'touchstart', 'keydown'].forEach(evt => {
    window.addEventListener(evt, unlockAudio, { once: true, passive: true });
  });
}

/**
 * Membersihkan string teks bahasa Jepang dari tag HTML / furigana brackets
 * agar diucapkan secara wajar oleh mesin TTS.
 */
export function sanitizeForSpeech(raw) {
  if (!raw || typeof raw !== 'string') return '';
  return raw
    .replace(/<rt>.*?<\/rt>/gi, '') // hapus elemen rt
    .replace(/<rp>.*?<\/rp>/gi, '') // hapus elemen rp
    .replace(/<[^>]+>/g, '') // hapus tag html lain
    .replace(/([一-龯々]+)\[(.*?)\]/g, '$2') // ubah 漢字[かんじ] -> かんじ
    .replace(/\[(.*?)\]/g, '$1') // bersihkan kurung siku sisa
    .replace(/[(（].*?[)）]/g, '') // bersihkan kurung bulat terjemahan
    .trim();
}

/**
 * Hentikan pemutaran audio yang sedang berjalan
 */
export function stopJapaneseSpeech() {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {
      // ignore
    }
    currentAudio = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
}

/**
 * Main play function for Japanese speech
 * @param {string} text - Japanese text to speak
 * @param {object} options - { rate: number, onEnd: function }
 */
export function playJapaneseSpeech(text, options = {}) {
  if (!text || typeof text !== 'string') return;
  const cleanText = sanitizeForSpeech(text);
  if (!cleanText) return;

  const rate = options.rate || 1.0;
  const onEnd = options.onEnd || null;

  // Stop any ongoing speech
  stopJapaneseSpeech();

  // Try Layer 1: Online Native Japanese Audio Stream
  if (typeof navigator !== 'undefined' && navigator.onLine !== false) {
    const encoded = encodeURIComponent(cleanText.slice(0, 180));
    
    // Urutan percobaan: 1. Local Proxy (/api/tts), 2. Direct CDN
    const audioSources = [
      `/api/tts?q=${encoded}`,
      `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encoded}`
    ];

    let currentSrcIndex = 0;

    const tryPlaySource = () => {
      if (currentSrcIndex >= audioSources.length) {
        // Kedua online stream gagal -> Lanjut ke Layer 2
        fallbackToSpeechSynthesis(cleanText, rate, onEnd);
        return;
      }

      const src = audioSources[currentSrcIndex];
      const audio = new Audio(src);
      currentAudio = audio;
      audio.playbackRate = Math.max(0.5, Math.min(2.0, rate));

      let hasEndedOrFailed = false;

      audio.onended = () => {
        if (!hasEndedOrFailed) {
          hasEndedOrFailed = true;
          currentAudio = null;
          if (onEnd) onEnd();
        }
      };

      audio.onerror = () => {
        if (!hasEndedOrFailed) {
          hasEndedOrFailed = true;
          currentAudio = null;
          currentSrcIndex++;
          tryPlaySource();
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (!hasEndedOrFailed) {
            hasEndedOrFailed = true;
            currentAudio = null;
            currentSrcIndex++;
            tryPlaySource();
          }
        });
      }
    };

    tryPlaySource();
    return;
  }

  // Fallback to Layer 2
  fallbackToSpeechSynthesis(cleanText, rate, onEnd);
}

/**
 * Layer 2: Web Speech Synthesis API dengan Linux fix
 */
function fallbackToSpeechSynthesis(text, rate, onEnd) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    fallbackToWebAudioChime(onEnd);
    return;
  }

  try {
    // Linux Chrome bug fix: resume if paused or stuck
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = rate;

    // Try finding an installed Japanese voice
    const voices = window.speechSynthesis.getVoices();
    let hasJaVoice = false;
    if (voices && voices.length > 0) {
      const jaVoice = voices.find(
        (v) => (v.lang && (v.lang.startsWith('ja') || v.lang.includes('JP'))) ||
               (v.name && v.name.toLowerCase().includes('japan'))
      );
      if (jaVoice) {
        utterance.voice = jaVoice;
        hasJaVoice = true;
      }
    }

    let finished = false;
    const finish = () => {
      if (!finished) {
        finished = true;
        if (onEnd) onEnd();
      }
    };

    utterance.onend = finish;
    utterance.onerror = () => {
      fallbackToWebAudioChime(onEnd);
    };

    window.speechSynthesis.speak(utterance);

    // Timeout safety net jika browser tidak memiliki voice dan diam membisu
    setTimeout(() => {
      if (!finished) {
        if (!hasJaVoice || !window.speechSynthesis.speaking) {
          fallbackToWebAudioChime(onEnd);
        } else if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }
    }, 800);
  } catch {
    fallbackToWebAudioChime(onEnd);
  }
}

/**
 * Layer 3: Web Audio API gentle acoustic tone confirmation
 * Memberikan umpan balik nada dengar jika seluruh layer TTS tidak merespons.
 */
function fallbackToWebAudioChime(onEnd) {
  try {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioContext = new AudioCtx();
    }
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
    if (audioContext) {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, audioContext.currentTime + 0.15); // E5
      gain.gain.setValueAtTime(0.2, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start();
      osc.stop(audioContext.currentTime + 0.3);
    }
  } catch {
    // ignore
  }

  if (onEnd) {
    setTimeout(onEnd, 300);
  }
}

// Global alias for compatibility
export const speakText = playJapaneseSpeech;
