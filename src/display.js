// The game is designed at 360x640 "game units". To stay sharp on high-DPI phones,
// the canvas is created at the real screen pixel size (360*ZOOM x 640*ZOOM)
// and every scene's camera zooms by ZOOM, so scenes keep using 360x640 coordinates.
export const W = 360, H = 640;
const fit = Math.min(window.innerWidth / W, window.innerHeight / H);
export const ZOOM = Math.min(4, Math.max(1, Math.ceil(fit * (window.devicePixelRatio || 1))));

export function setupCamera(scene) {
  scene.cameras.main.setZoom(ZOOM).centerOn(W / 2, H / 2);
}

// UI font. ?font=Mitr (etc.) in the URL overrides it — handy for comparing fonts.
const FONTS = { 'Chakra Petch': true, Mitr: true, Kanit: true };
const requested = new URLSearchParams(window.location.search).get('font');
export const FONT_FAMILY = requested && FONTS[requested] ? `"${requested}"` : 'sans-serif';
