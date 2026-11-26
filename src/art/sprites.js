// Pixel art drawn as character grids. Each char = one color from PALETTE, '.' = transparent.
export const PALETTE = {
  k: '#141414', s: '#e8c9a0', e: '#d01030', m: '#7a1020', r: '#c0283a', p: '#ff6688',
  h: '#2a1a10', w: '#ffffff', v: '#c8d0d8', g: '#d4a020', o: '#7a4a20', n: '#5d4d6e', y: '#ffe066', a: '#888899', f: '#f0c890', b: '#3b4a8a', c: '#d64545', d: '#f0e0d0', l: '#5a3a20',
};

export const SPRITES = {
  kongkoi: [
    '................',
    '.....nnnnnn.....',
    '....nnnnnnnn....',
    '...nnwennwenn...',
    '...nnnnnnnnnn...',
    '....nnmmmmnn....',
    '.....nnnnnn.....',
    '....nnnnnnnn....',
    '...n.nnnnnn.n...',
    '..n..nnnnnn..n..',
    '.....nnnnnn.....',
    '......nnnn......',
    '.......nn.......',
    '.......nn.......',
    '......nnnn......',
    '................',
  ],
  // first-person hand holding the knife (shown at the bottom of the battle screen)
  hand_knife: [
    '............vv..',
    '...........vwv..',
    '..........vwv...',
    '.........vwv....',
    '........vwv.....',
    '.......vvv......',
    '.....gg.v.......',
    '......gg........',
    '....ffoff.......',
    '...fffofff......',
    '...ffoffff......',
    '...fffffff......',
    '....fffff.......',
    '....bbbbb.......',
    '...bbbbbbb......',
    '...bbbbbbb......',
  ],
  // effects
  fx_slash: [
    '.......................w',
    '......................wy',
    '.....................wy.',
    '....................wy..',
    '.................ywwy...',
    '................ywwy....',
    '...............ywwy.....',
    '..............ywwy......',
    '.............ywwy.......',
    '............ywwy........',
    '...........ywwy.........',
    '..........ywwy..........',
    '.........ywwy...........',
    '........ywwy............',
    '.......ywwy.............',
    '......ywwy..............',
    '.....ywwy...............',
    '....ywwy................',
    '...ywwy.................',
    '..ywwy..................',
    '...wy...................',
    '..wy....................',
    '.wy.....................',
    'wy......................',
  ],
  fx_claw: [
    '........................',
    '........................',
    '..r.............r.......',
    '..r......r......r.......',
    '..r......r......r.......',
    '..r......r......r.......',
    '...re.....re.....re.....',
    '...re.....re.....re.....',
    '...re.....re.....re.....',
    '...re.....re.....re.....',
    '...re.....re.....re.....',
    '...re.....re.....re.....',
    '....re.....re.....re....',
    '....re.....re.....re....',
    '....re.....re.....re....',
    '....re.....re.....re....',
    '....re.....re.....re....',
    '....re.....re.....re....',
    '.....re.....re.....re...',
    '.....re.....re.....re...',
    '.....re.....re.....re...',
    '.....re.....re.....re...',
    '.....re.....re.....re...',
    '.....re.....re.....re...',
    '......r......r......r...',
    '......r......r......r...',
    '......r......r......r...',
    '......r......r......r...',
    '........................',
    '........................',
  ],
  fx_jaw_top: [
    'mmmmmmmmmmmmmmmmmmmmmmmm',
    'mmmmmmmmmmmmmmmmmmmmmmmm',
    'mwwmmwwmmwwmmwwmmwwmmwwm',
    '.ww..ww..ww..ww..ww..ww.',
    '.w...w...w...w...w...w..',
    '..........................'.slice(0, 24),
  ],
  fx_jaw_bottom: [
    '..........................'.slice(0, 24),
    '..w...w...w...w...w...w.',
    '.ww..ww..ww..ww..ww..ww.',
    'mwwmmwwmmwwmmwwmmwwmmwwm',
    'mmmmmmmmmmmmmmmmmmmmmmmm',
    'mmmmmmmmmmmmmmmmmmmmmmmm',
  ],
  fx_gut: [
    '.rrr.',
    'rpprr',
    'rprrr',
    'rrrr.',
    '.rr..',
  ],
  fx_splat: [
    '...r....r...',
    '..rrr..rrr..',
    '.rrpprrrrr..',
    'rrrpprrrrrr.',
    '.rrrrrrrrrrr',
    '..rrrrrrrr..',
    '.rrr.rrrrr..',
    '..r..rr.rr..',
    '.....r...r..',
    '.....r......',
    '.....p......',
    '............',
  ],
  // UI icons (8x8)
  icon_claw: [
    'w..w..w.',
    'w..w..w.',
    '.w..w..w',
    '.w..w..w',
    '..w..w..',
    '..w..w..',
    '........',
    '........',
  ],
  icon_fang: [
    'wwwwwwww',
    'wwwwwwww',
    '.w....w.',
    '.w....w.',
    '..w..w..',
    '........',
    '........',
    '........',
  ],
  icon_charge: [
    '.rrr....',
    'r...rr..',
    '......r.',
    '..rrr...',
    '.r...rr.',
    '.......r',
    '...rr...',
    '..r..r..',
  ],
  icon_danger: [
    '..wwww..',
    '.wwwwww.',
    'weewweew',
    'wwwwwwww',
    '.wwwwww.',
    '..w.w.w.',
    '..wwww..',
    '........',
  ],
  icon_stun: [
    '...y....',
    '..yyy...',
    '...y..y.',
    '.....yyy',
    '.y....y.',
    'yyy.....',
    '.y......',
    '........',
  ],
  icon_dmg: [
    '.......v',
    '......v.',
    '.....v..',
    '..g.v...',
    '...g....',
    '..o.g...',
    '.o......',
    'o.......',
  ],
  icon_sound_on: [
    '...w....',
    '..ww.w..',
    'wwww..w.',
    'wwww..w.',
    'wwww..w.',
    '..ww.w..',
    '...w....',
    '........',
  ],
  icon_sound_off: [
    '...w....',
    '..ww....',
    'wwwwe.e.',
    'wwww.e..',
    'wwwwe.e.',
    '..ww....',
    '...w....',
    '........',
  ],
  icon_retry: [
    '..www.w.',
    '.w...ww.',
    'w...www.',
    'w.......',
    'w......w',
    '.w....w.',
    '..wwww..',
    '........',
  ],
  icon_star: [
    '...yy...',
    '...yy...',
    'yyyyyyyy',
    '.yyyyyy.',
    '..yyyy..',
    '.yy..yy.',
    'yy....yy',
    '........',
  ],
  icon_heart: [
    '.ee..ee.',
    'eeeeeeee',
    'eweeeeee',
    'eeeeeeee',
    '.eeeeee.',
    '..eeee..',
    '...ee...',
    '........',
  ],
  icon_clock: [
    '..wwww..',
    '.w..w.w.',
    'w...w..w',
    'w...ww.w',
    'w......w',
    '.w....w.',
    '..wwww..',
    '........',
  ],
  icon_shield: [
    '.gggggg.',
    'gyyyyyyg',
    'gyggggyg',
    'gyyyyyyg',
    'gyggggyg',
    '.gyyyyg.',
    '..gyyg..',
    '...gg...',
  ],
  icon_spit: [
    '.rrrr...',
    'rpprrr..',
    '.rr.rr..',
    '..r..r..',
    '..p..rr.',
    '.....r..',
    '.....p..',
    '........',
  ],
  // left hand raising the takrut (first-person)
  hand_takrut: [
    '.....kk.........',
    '....k..k........',
    '.....kk.........',
    '.....gg.........',
    '....gyyg........',
    '....gggg........',
    '....gyyg........',
    '....gggg........',
    '...ffff.........',
    '..ffffff........',
    '..ffffff........',
    '..fffff.........',
    '...ffff.........',
    '...bbbbb........',
    '..bbbbbbb.......',
    '..bbbbbbb.......',
  ],
  // item icons (12x12)
  item_takrut: [
    '....kkkk....',
    '...k....k...',
    '...k....k...',
    '....k..k....',
    '.....kk.....',
    '....gggg....',
    '....gyyg....',
    '....gggg....',
    '....gyyg....',
    '....gggg....',
    '....gyyg....',
    '....gggg....',
  ],
  item_knife: [
    '..........v.',
    '.........vv.',
    '........vwv.',
    '.......vwv..',
    '......vwv...',
    '.....vvv....',
    '...gg.v.....',
    '....gg......',
    '...oo.g.....',
    '..oo........',
    '.oo.........',
    '............',
  ],
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

/** Night battle backdrop (90x110 px, shown at 4x): sky bands, moon, temple roof, trees, fog. */
function drawBackdrop(scene) {
  if (scene.textures.exists('bg_night')) return;
  const W = 90, H = 110;
  const tex = scene.textures.createCanvas('bg_night', W, H);
  const c = tex.getContext();
  const px = (x, y, col) => { c.fillStyle = col; c.fillRect(x, y, 1, 1); };
  // sky: banded gradient with dithered edges
  const bands = ['#0b0820', '#120b2c', '#1a1036', '#221440', '#2a1846'];
  for (let y = 0; y < 80; y++) for (let x = 0; x < W; x++) {
    const f = y / 80 * (bands.length - 1);
    const i = Math.floor(f), frac = f - i;
    const dither = ((x + y) % 2 === 0 ? 0.25 : -0.25);
    px(x, y, bands[Math.min(bands.length - 1, frac + dither > 0.5 ? i + 1 : i)]);
  }
  // stars
  [[8, 6], [20, 14], [33, 4], [47, 11], [62, 3], [75, 16], [84, 7], [14, 24], [55, 20]].forEach(([x, y]) => px(x, y, '#8a86b0'));
  // moon
  for (let y = -6; y <= 6; y++) for (let x = -6; x <= 6; x++) if (x * x + y * y <= 36) px(76 + x, 30 + y, x * x + y * y > 25 ? '#bdb48a' : '#e8e0b0');
  // temple roof silhouette (ศาลา) on the left
  const roof = '#07050f';
  for (let y = 0; y < 14; y++) for (let x = -y - 4; x <= y + 4; x++) px(18 + x, 52 + y, roof);
  px(18, 49, roof); px(18, 50, roof); px(18, 51, roof); // spire
  for (let x = 4; x <= 32; x++) for (let y = 66; y < 80; y++) if ((x - 6) % 8 > 1 || y < 68) px(x, y, roof);
  // trees on the right
  const tree = (cx, top) => {
    for (let y = top; y < 80; y++) {
      const half = y < top + 18 ? Math.floor((y - top) / 2) + 1 : 1;
      for (let x = -half; x <= half; x++) px(cx + x, y, '#060410');
    }
  };
  tree(64, 40); tree(80, 46); tree(48, 56);
  // ground
  for (let y = 80; y < H; y++) for (let x = 0; x < W; x++) px(x, y, (x * 7 + y * 3) % 11 === 0 ? '#1c2a1c' : y < 84 ? '#0d140f' : '#111a13');
  // fog band
  for (let y = 74; y < 88; y++) for (let x = 0; x < W; x++) {
    const v = Math.sin(x / 6 + y) + Math.sin(x / 11) ;
    if (v > 0.6 && (x + y) % 2 === 0) px(x, y, '#3a3a55');
  }
  tex.refresh();
  tex.setFilter(1);
}

/** Register every sprite as a Phaser texture (1px per cell; scale when displaying). */
export function registerSprites(scene) {
  drawBackdrop(scene);
  for (const [key, rows] of Object.entries(SPRITES)) {
    if (scene.textures.exists(key)) continue;
    const tex = scene.textures.createCanvas(key, rows[0].length, rows.length);
    const ctx = tex.getContext();
    rows.forEach((row, y) => [...row].forEach((ch, x) => {
      if (PALETTE[ch]) { ctx.fillStyle = PALETTE[ch]; ctx.fillRect(x, y, 1, 1); }
    }));
    tex.refresh();
    tex.setFilter(1); // NEAREST: keep pixel art crisp while text stays smooth
  }
}
