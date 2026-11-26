// Pixel art drawn as character grids. Each char = one color from PALETTE, '.' = transparent.
export const PALETTE = {
  k: '#141414', s: '#e8c9a0', e: '#d01030', m: '#7a1020', r: '#c0283a', p: '#ff6688',
  h: '#2a1a10', f: '#f0c890', b: '#3b4a8a', c: '#d64545', d: '#f0e0d0', l: '#5a3a20',
};

export const SPRITES = {
  krasue: [
    '....kkkkkkkk....',
    '...kkkkkkkkkk...',
    '..kkkkkkkkkkkk..',
    '..kksssssssskk..',
    '..kkseesseeskk..',
    '..kksssssssskk..',
    '..kkssmmmmsskk..',
    '..kk.ssssss.kk..',
    '..kk..rrrr..kk..',
    '..k..rpprr...k..',
    '..k..rrprr...k..',
    '.....rr.rpr.....',
    '.....r..rr......',
    '.....p...r......',
    '.........p......',
    '................',
  ],
};

/** Register every sprite as a Phaser texture (1px per cell; scale when displaying). */
export function registerSprites(scene) {
  for (const [key, rows] of Object.entries(SPRITES)) {
    if (scene.textures.exists(key)) continue;
    const tex = scene.textures.createCanvas(key, rows[0].length, rows.length);
    const ctx = tex.getContext();
    rows.forEach((row, y) => [...row].forEach((ch, x) => {
      if (PALETTE[ch]) { ctx.fillStyle = PALETTE[ch]; ctx.fillRect(x, y, 1, 1); }
    }));
    tex.refresh();
  }
}
