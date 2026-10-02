/**
 * Simulator Suara Lingkungan & Bising Nyata (Environmental Audio Filter)
 * Memanfaatkan Web Audio API (BiquadFilter, Convolver, Gain, dan Pink Noise Synthesizer)
 * untuk mensimulasikan kondisi pendengaran nyata di Jepang (Stasiun Kereta, Interkom, Kafe/Izakaya).
 */

class EnvironmentalAudioManager {
  constructor() {
    this.currentPreset = 'studio'; // 'studio' | 'station' | 'intercom' | 'izakaya'
    this.audioCtx = null;
    this.bgSource = null;
    this.bgGain = null;
    this.isBgPlaying = false;
  }

  getAudioContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  getAvailablePresets() {
    return [
      {
        id: 'studio',
        name: 'Studio Kedap Suara (Default)',
        icon: '🎙️',
        description: 'Audio studio jernih tanpa gema atau distorsi (standar materi rekaman buku teks).'
      },
      {
        id: 'station',
        name: 'Pengumuman Stasiun Shinjuku',
        icon: '🚆',
        description: 'Akustik peron stasiun dengan gema reverb panjang dan desis roda kereta lewat.'
      },
      {
        id: 'intercom',
        name: 'Interkom Rumah / Telepon',
        icon: '🚪',
        description: 'Filter bandpass 300Hz–3kHz khas speaker pintu saat menerima kurir atau telepon.'
      },
      {
        id: 'izakaya',
        name: 'Ramai Kafe & Izakaya',
        icon: '🏮',
        description: 'Suara latar samar orang mengobrol dan denting gelas di kedai makan Jepang.'
      }
    ];
  }

  setPreset(presetId) {
    this.currentPreset = presetId;
    if (this.isBgPlaying) {
      this.startBackgroundSound(presetId);
    }
  }

  getPreset() {
    return this.currentPreset;
  }

  // Synthesize background environmental ambiance using Web Audio API (Offline & lightweight)
  startBackgroundSound(presetId = this.currentPreset, volume = 0.15) {
    this.stopBackgroundSound();
    if (presetId === 'studio') return;

    try {
      const ctx = this.getAudioContext();
      this.bgGain = ctx.createGain();
      this.bgGain.gain.setValueAtTime(volume, ctx.currentTime);
      this.bgGain.connect(ctx.destination);

      if (presetId === 'station') {
        // Low rumble of train + distant station track echo
        const bufferSize = ctx.sampleRate * 3;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99 * b0 + white * 0.05;
          b1 = 0.95 * b1 + white * 0.05;
          b2 = 0.90 * b2 + white * 0.05;
          output[i] = (b0 + b1 + b2) * 0.5;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(250, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(this.bgGain);
        whiteNoise.start();
        this.bgSource = whiteNoise;
        this.isBgPlaying = true;
      } else if (presetId === 'intercom') {
        // Subtle intercom electric line hum (50Hz hum + hiss)
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(60, ctx.currentTime); // 60Hz AC line buzz

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.08, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(this.bgGain);
        osc.start();
        this.bgSource = osc;
        this.isBgPlaying = true;
      } else if (presetId === 'izakaya') {
        // Pink noise filtered to mimic gentle background chatter & acoustic hum
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.08;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800, ctx.currentTime);
        filter.Q.setValueAtTime(0.8, ctx.currentTime);

        noise.connect(filter);
        filter.connect(this.bgGain);
        noise.start();
        this.bgSource = noise;
        this.isBgPlaying = true;
      }
    } catch {
      // Audio fallback
    }
  }

  stopBackgroundSound() {
    if (this.bgSource) {
      try {
        this.bgSource.stop();
        this.bgSource.disconnect();
      } catch {
        // ignore
      }
      this.bgSource = null;
    }
    this.isBgPlaying = false;
  }
}

export const envAudio = new EnvironmentalAudioManager();
