// Synthesizer Web Audio API untuk Suasana Alam Zen Jepang (100% Offline, Tanpa File Audio Eksternal)

class SoundscapeSynthesizer {
  constructor() {
    this.ctx = null;
    this.rainNode = null;
    this.cicadaNode = null;
    this.bambooTimer = null;
    this.masterGain = null;
    this.rainGain = null;
    this.cicadaGain = null;
    this.bambooGain = null;
    this.isRainPlaying = false;
    this.isCicadaPlaying = false;
    this.isBambooPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // 1. Kyoto Temple Rain (Pink noise filtered)
  toggleRain(active, volume = 0.5) {
    this.init();
    if (active) {
      if (this.isRainPlaying) {
        if (this.rainGain) this.rainGain.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.1);
        return;
      }
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      // Lowpass filter for soft rain
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      this.rainGain = this.ctx.createGain();
      this.rainGain.gain.setValueAtTime(volume, this.ctx.currentTime);

      noise.connect(filter);
      filter.connect(this.rainGain);
      this.rainGain.connect(this.masterGain);

      noise.start();
      this.rainNode = noise;
      this.isRainPlaying = true;
    } else {
      if (this.rainNode) {
        try {
          this.rainNode.stop();
          this.rainNode.disconnect();
        } catch {
          // ignore
        }
        this.rainNode = null;
      }
      this.isRainPlaying = false;
    }
  }

  // 2. Japanese Summer Cicadas (蝉 - Higurashi)
  toggleCicada(active, volume = 0.4) {
    this.init();
    if (active) {
      if (this.isCicadaPlaying) {
        if (this.cicadaGain) this.cicadaGain.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.1);
        return;
      }

      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(4400, this.ctx.currentTime);

      // Tremolo LFO for cicada rhythmic pulse
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(5.5, this.ctx.currentTime);

      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(300, this.ctx.currentTime);
      lfo.connect(osc.frequency);

      this.cicadaGain = this.ctx.createGain();
      this.cicadaGain.gain.setValueAtTime(volume * 0.35, this.ctx.currentTime);

      osc.connect(this.cicadaGain);
      this.cicadaGain.connect(this.masterGain);

      osc.start();
      lfo.start();

      this.cicadaNode = { osc, lfo };
      this.isCicadaPlaying = true;
    } else {
      if (this.cicadaNode) {
        try {
          this.cicadaNode.osc.stop();
          this.cicadaNode.lfo.stop();
          this.cicadaNode.osc.disconnect();
          this.cicadaNode.lfo.disconnect();
        } catch {
          // ignore
        }
        this.cicadaNode = null;
      }
      this.isCicadaPlaying = false;
    }
  }

  // 3. Shishi-odoshi Bamboo Knock (鹿威し) - plays once every ~7 seconds
  triggerBambooKnock(volume = 0.6) {
    this.init();
    const t = this.ctx.currentTime;

    // Resonant wooden knock
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.12);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.16);

    // Water trickling splash after knock
    const splashBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.3, this.ctx.sampleRate);
    const data = splashBuffer.getChannelData(0);
    for (let i = 0; i < splashBuffer.length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / splashBuffer.length);
    }

    const splash = this.ctx.createBufferSource();
    splash.buffer = splashBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, t + 0.1);
    filter.Q.setValueAtTime(3, t + 0.1);

    const splashGain = this.ctx.createGain();
    splashGain.gain.setValueAtTime(volume * 0.4, t + 0.1);
    splashGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    splash.connect(filter);
    filter.connect(splashGain);
    splashGain.connect(this.masterGain);

    splash.start(t + 0.1);
  }

  toggleBamboo(active, volume = 0.6) {
    if (active) {
      if (this.isBambooPlaying) return;
      this.isBambooPlaying = true;
      this.triggerBambooKnock(volume);
      this.bambooTimer = setInterval(() => {
        this.triggerBambooKnock(volume);
      }, 7500);
    } else {
      if (this.bambooTimer) {
        clearInterval(this.bambooTimer);
        this.bambooTimer = null;
      }
      this.isBambooPlaying = false;
    }
  }

  // 4. Zen Singing Bowl (磬子・鈴)
  playSingingBowl(volume = 0.7) {
    this.init();
    const t = this.ctx.currentTime;

    const freqs = [432, 864, 1296];
    const decays = [4.5, 3.2, 2.0];
    const amps = [0.6, 0.25, 0.15];

    freqs.forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(volume * amps[idx], t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + decays[idx]);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + decays[idx]);
    });
  }

  stopAll() {
    this.toggleRain(false);
    this.toggleCicada(false);
    this.toggleBamboo(false);
  }
}

export const soundscape = new SoundscapeSynthesizer();
