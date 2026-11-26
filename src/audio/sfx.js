// Retro sound effects synthesized with Web Audio — no audio files needed.
// iOS only allows audio after a user tap, so call unlockAudio() from a tap handler.
let ctx = null;
let muted = false;
try { muted = localStorage.getItem('muted') === '1'; } catch { /* storage unavailable */ }

export function unlockAudio() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume();
}

export function isMuted() { return muted; }
export function toggleMute() {
  muted = !muted;
  try { localStorage.setItem('muted', muted ? '1' : '0'); } catch { /* ignore */ }
  return muted;
}

function out(vol) {
  const g = ctx.createGain();
  g.gain.value = vol;
  g.connect(ctx.destination);
  return g;
}

function tone({ type = 'square', from, to = from, dur, vol = 0.15, at = 0 }) {
  const t = ctx.currentTime + at;
  const o = ctx.createOscillator();
  const g = out(vol);
  o.type = type;
  o.frequency.setValueAtTime(from, t);
  o.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g);
  o.start(t);
  o.stop(t + dur);
}

function noise({ dur, vol = 0.2, freq = 2000, toFreq = freq, at = 0, type = 'bandpass' }) {
  const t = ctx.currentTime + at;
  const len = Math.floor(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const f = ctx.createBiquadFilter();
  f.type = type;
  f.frequency.setValueAtTime(freq, t);
  f.frequency.exponentialRampToValueAtTime(toFreq, t + dur);
  const g = out(vol);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  src.connect(f).connect(g);
  src.start(t);
}

const SOUNDS = {
  slash: () => noise({ dur: 0.18, vol: 0.35, freq: 1200, toFreq: 6000 }),
  hit: () => { tone({ type: 'sine', from: 180, to: 50, dur: 0.18, vol: 0.4 }); noise({ dur: 0.08, vol: 0.2, freq: 800, type: 'lowpass' }); },
  scratch: () => [0, 0.07, 0.14].forEach(at => noise({ dur: 0.06, vol: 0.25, freq: 3000, toFreq: 1500, at })),
  hurt: () => tone({ type: 'sawtooth', from: 220, to: 90, dur: 0.25, vol: 0.15 }),
  laugh: () => [0, 0.09, 0.18].forEach((at, i) => tone({ type: 'square', from: 900 - i * 60, to: 700 - i * 60, dur: 0.07, vol: 0.06, at })),
  win: () => [523, 659, 784, 1046].forEach((f, i) => tone({ from: f, dur: 0.15, vol: 0.12, at: i * 0.1 })),
  lose: () => [392, 330, 262, 196].forEach((f, i) => tone({ type: 'triangle', from: f, dur: 0.3, vol: 0.18, at: i * 0.2 })),
  ward: () => [660, 880, 1320].forEach((f, i) => tone({ type: 'triangle', from: f, dur: 0.25, vol: 0.1, at: i * 0.05 })),
  block: () => { tone({ type: 'square', from: 1200, to: 900, dur: 0.12, vol: 0.12 }); tone({ type: 'triangle', from: 1800, dur: 0.3, vol: 0.08, at: 0.05 }); },
  growl: () => { tone({ type: 'sawtooth', from: 90, to: 60, dur: 0.5, vol: 0.18 }); noise({ dur: 0.5, vol: 0.12, freq: 300, type: 'lowpass' }); },
  chomp: () => { noise({ dur: 0.07, vol: 0.35, freq: 1500, type: 'bandpass' }); tone({ type: 'square', from: 200, to: 80, dur: 0.12, vol: 0.15, at: 0.02 }); },
  splash: () => { noise({ dur: 0.45, vol: 0.3, freq: 600, toFreq: 200, type: 'lowpass' }); [0.1, 0.2, 0.32].forEach(at => noise({ dur: 0.05, vol: 0.15, freq: 900, at })); },
  click: () => tone({ from: 600, to: 900, dur: 0.05, vol: 0.08 }),
};

export function play(name) {
  if (muted || !ctx || !SOUNDS[name]) return;
  try { SOUNDS[name](); } catch { /* never let audio break the game */ }
}
