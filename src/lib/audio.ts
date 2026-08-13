let ctx: AudioContext | null = null;
let hum: OscillatorNode | null = null;
let humGain: GainNode | null = null;
let muted = true;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

export function isMuted() {
  return muted;
}

export function setMuted(next: boolean) {
  muted = next;
  if (muted) stopHum();
  else startHum();
}

export function toggleMuted() {
  setMuted(!muted);
  return muted;
}

export function startHum() {
  if (muted) return;
  const ac = getCtx();
  if (!ac || hum) return;
  void ac.resume();
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = "sine";
  osc.frequency.value = 68;
  g.gain.value = 0.012;
  osc.connect(g);
  g.connect(ac.destination);
  osc.start();
  hum = osc;
  humGain = g;
}

export function stopHum() {
  try {
    hum?.stop();
  } catch {
    /* already stopped */
  }
  hum?.disconnect();
  humGain?.disconnect();
  hum = null;
  humGain = null;
}

export function playSpark() {
  if (muted) return;
  const ac = getCtx();
  if (!ac) return;
  void ac.resume();
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = "square";
  osc.frequency.value = 920;
  g.gain.value = 0.03;
  osc.connect(g);
  g.connect(ac.destination);
  osc.frequency.exponentialRampToValueAtTime(180, ac.currentTime + 0.09);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.11);
  osc.start();
  osc.stop(ac.currentTime + 0.12);
}

export function playStrike() {
  if (muted) return;
  const ac = getCtx();
  if (!ac) return;
  void ac.resume();
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = "sawtooth";
  osc.frequency.value = 140;
  g.gain.value = 0.05;
  osc.connect(g);
  g.connect(ac.destination);
  osc.frequency.exponentialRampToValueAtTime(40, ac.currentTime + 0.28);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.32);
  osc.start();
  osc.stop(ac.currentTime + 0.34);
}
