// The game is designed at 360x640 "game units". To stay sharp on high-DPI phones,
// the canvas is created at the real screen pixel size (360*ZOOM x 640*ZOOM)
// and every scene's camera zooms by ZOOM, so scenes keep using 360x640 coordinates.
export const W = 360, H = 640;
const fit = Math.min(window.innerWidth / W, window.innerHeight / H);
// capped at 3: a 4x canvas (1440x2560) is heavy for phone browsers; 3x is still sharp
export const ZOOM = Math.min(3, Math.max(1, Math.ceil(fit * (window.devicePixelRatio || 1))));

export function setupCamera(scene) {
  scene.cameras.main.setZoom(ZOOM).centerOn(W / 2, H / 2);
}


// UI font (bundled via @fontsource/kanit, Thai + Latin, 400/700).
export const FONT_FAMILY = '"Kanit", sans-serif';

// Numbers use a pixel font with equal-width digits (VT323) so they line up and match the pixel art.
// It runs small, so sizes are scaled up ~1.4x to sit level with Kanit text.
export const numFont = (px, color = '#ffffff') => ({ fontFamily: '"VT323", monospace', fontSize: `${Math.round(px * 1.4)}px`, color, resolution: ZOOM, padding: { top: 2, bottom: 2 } });

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

// Idle "breathing": swap between a sprite's base frame and its <key>_idle2 frame on a fixed beat.
// Same beat as the battle screen so characters feel alive everywhere.
export const IDLE_MS = 420;
export function idleFrames(scene, img, key) {
  if (!scene.textures.exists(`${key}_idle2`)) return null;
  let alt = false;
  return scene.time.addEvent({ delay: IDLE_MS, loop: true, callback: () => {
    alt = !alt;
    img.setTexture(alt ? `${key}_idle2` : key);
  } });
}

// One art pixel = PX screen points, for every sprite, icon and effect.
export const PX = 2;
// Backgrounds are still drawn on the old 120-wide grid and shown at 3pt per pixel until they are redrawn at 180 wide.
export const BG_PX = 3;
