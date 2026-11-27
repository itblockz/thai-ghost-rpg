// The game is designed at 360x640 "game units". To stay sharp on high-DPI phones,
// the canvas is created at the real screen pixel size (360*ZOOM x 640*ZOOM)
// and every scene's camera zooms by ZOOM, so scenes keep using 360x640 coordinates.
export const W = 360, H = 640;
const fit = Math.min(window.innerWidth / W, window.innerHeight / H);
export const ZOOM = Math.min(4, Math.max(1, Math.ceil(fit * (window.devicePixelRatio || 1))));

export function setupCamera(scene) {
  scene.cameras.main.setZoom(ZOOM).centerOn(W / 2, H / 2);
}


// UI font (bundled via @fontsource/kanit, Thai + Latin, 400/700).
export const FONT_FAMILY = '"Kanit", sans-serif';

// Thai stacks vowels + tone marks above letters (e.g. สิ้, ทธิ์). Phaser measures text height
// with a Latin test string, so on Safari the top marks get clipped. Measure with tall Thai
// clusters and add a little top padding so nothing is cut off.
export const TEXT_METRICS = { testString: '|MÉqgyสิ้ทธิ์ปั้ญฐ', padding: { top: 4, bottom: 2 } };

// Pixel-style float: move in whole art pixels, one step every stepMs, ping-ponging
// 0 → steps → 0. Even timing keeps it crisp without looking jerky.
export function pixelBob(scene, obj, px, steps, stepMs) {
  const base = obj.y;
  let i = 0;
  return scene.time.addEvent({ delay: stepMs, loop: true, callback: () => {
    i = (i + 1) % (steps * 2);
    obj.y = base - (i <= steps ? i : steps * 2 - i) * px;
  } });
}

// Fade in evenly spaced steps (like palette fades on old consoles).
export const stepped = n => ({ ease: 'Stepped', easeParams: [n] });
