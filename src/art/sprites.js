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
  // ---- animation frames: <unit>_idle2 (breathing), _wind (anticipation), _atk (strike) ----
  kongkoi_idle2: [
    '................',
    '................',
    '.....nnnnnn.....',
    '....nnnnnnnn....',
    '...nnwennwenn...',
    '...nnnnnnnnnn...',
    '....nnmmmmnn....',
    '.....nnnnnn.....',
    '....nnnnnnnn....',
    '...n.nnnnnn.n...',
    '...n.nnnnnn.n...',
    '.....nnnnnn.....',
    '......nnnn......',
    '.......nn.......',
    '......nnnn......',
    '................',
  ],
  kongkoi_wind: [
    '................',
    '................',
    '................',
    '..n..nnnnnn..n..',
    '..n.nnnnnnnn.n..',
    '..nnnwennwennn..',
    '...nnnnnnnnnn...',
    '....nnmmmmnn....',
    '.....nnnnnn.....',
    '....nnnnnnnn....',
    '.....nnnnnn.....',
    '.....nnnnnn.....',
    '......nnnn......',
    '......nnnn......',
    '.....nnnnnn.....',
    '................',
  ],
  kongkoi_atk: [
    '.....nnnnnn.....',
    '....nnnnnnnn....',
    '...nnwennwenn...',
    '...nnnnnnnnnn...',
    '....nnmeemnn....',
    'w...nnmmmmnn...w',
    'wn...nnnnnn...nw',
    '.nn.nnnnnnnn.nn.',
    '...nnnnnnnnnn...',
    '.....nnnnnn.....',
    '.....nnnnnn.....',
    '......nnnn......',
    '......n..n......',
    '.....n....n.....',
    '................',
    '................',
  ],
  krasue_idle2: [
    '....kkkkkkkk....',
    '...kkkkkkkkkk...',
    '..kkkkkkkkkkkk..',
    '..kksssssssskk..',
    '..kkseesseeskk..',
    '..kksssssssskk..',
    '..kkssmmmmsskk..',
    '..kk.ssssss.kk..',
    '..kk..rrrr..kk..',
    '..k...rrppr..k..',
    '..k...rprrr..k..',
    '.....rpr.rr.....',
    '......rr..r.....',
    '......r...p.....',
    '......p.........',
    '................',
  ],
  krasue_wind: [
    '................',
    '....kkkkkkkk....',
    '...kkkkkkkkkk...',
    '..kkkkkkkkkkkk..',
    '.kkssssssssssk..',
    '.kksekssskeskk..',
    '.kkssssssssssk..',
    '.kksssmmmmssskk.',
    '.kk.sssssssss.k.',
    '.k....rrrr....k.',
    '.....rpprr......',
    '.....rrprr......',
    '....rr.rpr......',
    '....r...rr......',
    '....p....r......',
    '.........p......',
  ],
  krasue_atk: [
    '....kkkkkkkk....',
    '...kkkkkkkkkk...',
    '..kkkkkkkkkkkk..',
    '..kksssssssskk..',
    '..kkseesseeskk..',
    '..kksssssssskk..',
    '..kksmmmmmmskk..',
    '..kksmwmmwmskk..',
    '..kksmmmmmmskk..',
    '..kk.ssssss.kk..',
    '..k...rrrr...k..',
    '..k..rpprr...k..',
    '.....rrprr......',
    '.....rr.rpr.....',
    '.....r...rr.....',
    '.....p....p.....',
  ],
  // กุมารทอง at 32x32 (trial of a finer grid; other units are still 16x16)
  kumarn: [
    '................................',
    '................................',
    '................................',
    '................................',
    '..............kkkk..............',
    '.............kkkkkk.............',
    '.............kkkkkk.............',
    '..............gyyg..............',
    '...........oooooooooo...........',
    '..........oggggggggggo..........',
    '.........ogyygggggggggo.........',
    '.........ogyggggggggggo.........',
    '.........oggkkggggkkggo.........',
    '.........oggkwggggkwggo.........',
    '.........ogcggggggggcgo.........',
    '.........ogggggmmgggggo.........',
    '..........ooggggggggoo..........',
    '.............oggggo.............',
    '.........ooggyyyyyyggoo.........',
    '........oggggggyyggggggo........',
    '.......ogg.oggggggggo.ggo.......',
    '.......ogg.oggggggggo.ggo.......',
    '.......ogg.oggggggggo.ggo.......',
    '.......ogg.orrrrrrrro.ggo.......',
    '........oo.orrrrrrrro.oo........',
    '..........orrrrrrrrrro..........',
    '..........orrrrmmrrrro..........',
    '..........orrro..orrro..........',
    '...........oggo..oggo...........',
    '...........oggo..oggo...........',
    '...........oggo..oggo...........',
    '..........ooggo..oggoo..........',
  ],
  kumarn_idle2: [
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '..............kkkk..............',
    '.............kkkkkk.............',
    '.............kkkkkk.............',
    '..............gyyg..............',
    '...........oooooooooo...........',
    '..........oggggggggggo..........',
    '.........ogyygggggggggo.........',
    '.........ogyggggggggggo.........',
    '.........oggkkggggkkggo.........',
    '.........oggkwggggkwggo.........',
    '.........ogcggggggggcgo.........',
    '.........ogggggmmgggggo.........',
    '..........ooggggggggoo..........',
    '.............oggggo.............',
    '.........ooggyyyyyyggoo.........',
    '........oggggggyyggggggo........',
    '.......ogg.oggggggggo.ggo.......',
    '.......ogg.oggggggggo.ggo.......',
    '.......ogg.oggggggggo.ggo.......',
    '.......ogg.orrrrrrrro.ggo.......',
    '........oo.orrrrrrrro.oo........',
    '..........orrrrrrrrrro..........',
    '..........orrrrmmrrrro..........',
    '..........orrro..orrro..........',
    '...........oggo..oggo...........',
    '...........oggo..oggo...........',
    '..........ooggo..oggoo..........',
  ],
  kumarn_wind: [
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '..............kkkk..............',
    '.............kkkkkk.............',
    '.............kkkkkk.............',
    '..............gyyg..............',
    '...........oooooooooo...........',
    '..........oggggggggggo..........',
    '.........ogyygggggggggo.........',
    '.........ogyggggggggggo.........',
    '.........oggkkggggkkggo.........',
    '.........oggkwggggkwggo.........',
    '.........ogcggggggggcgo.........',
    '.........ogggggmmgggggo.........',
    '..........ooggggggggoo..........',
    '.............oggggo.............',
    '.........ooggyyyyyyggoo.........',
    '........oggggggyyggggggo........',
    '.......gg..oggggggggo..gg.......',
    '.......ogo.oggggggggo.ogo.......',
    '.......oggooggggggggooggo.......',
    '.......ogg.orrrrrrrro.ggo.......',
    '........oo.orrrrrrrro.oo........',
    '..........orrrrrrrrrro..........',
    '..........orrro..orrro..........',
    '..........oggo....oggo..........',
    '.........ooggo....oggoo.........',
  ],
  kumarn_atk: [
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '..............kkkk..............',
    '.............kkkkkk.............',
    '.............kkkkkk.............',
    '..............gyyg..............',
    '...........oooooooooo...........',
    '..........oggggggggggo..........',
    '.........ogyygggggggggo.........',
    '.........ogyggggggggggo.........',
    '.........oggkkggggkkggo.........',
    '.........oggkwggggkwggo.........',
    '.........ogcggggggggcgo.........',
    '.........ogggggmmgggggo.........',
    '..........ooggggggggoo..........',
    '.............oggggo.............',
    '.........ooggyyyyyyggoo.........',
    '.....ooooggggggyyggggggoooo.....',
    '.....ygggggoggggggggogggggy.....',
    '.....ooooo.oggggggggo.ooooo.....',
    '...........oggggggggo...........',
    '...........orrrrrrrro...........',
    '...........orrrrrrrro...........',
    '..........orrrrrrrrrro..........',
    '..........orrrrmmrrrro..........',
    '..........orrro..orrro..........',
    '..........oggo....oggo..........',
    '.........oggo......oggo.........',
    '........ooggo......oggoo........',
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
  icon_ram: [
    '...yy...',
    '..yyyy..',
    '.yyyyyy.',
    'w.yyyy..',
    '.w.yy...',
    'w.......',
    '.w......',
    '........',
  ],
  icon_frenzy: [
    'w.w.w...',
    'w.w.w...',
    '.w.w.w..',
    '.w.w.w..',
    '..w.w.w.',
    '..e.e.e.',
    '...e.e.e',
    '........',
  ],
  icon_target: [
    '..eeee..',
    '.e....e.',
    'e..ee..e',
    'e.eeee.e',
    'e.eeee.e',
    'e..ee..e',
    '.e....e.',
    '..eeee..',
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


/** Village battle backdrop (90x110, shown at 4x): red-lit sky, shut stilt houses, dirt yard. */
function drawVillageBackdrop(scene) {
  canvasArt(scene, 'bg_village', 90, 110, (px, rect, W, H) => {
    const bands = ['#0b0820', '#160a26', '#22102c', '#2e1430', '#3a1830'];
    for (let y = 0; y < 80; y++) for (let x = 0; x < W; x++) {
      const f = y / 80 * (bands.length - 1), i = Math.floor(f);
      px(x, y, bands[Math.min(bands.length - 1, f - i + ((x + y) % 2 ? 0.25 : -0.25) > 0.5 ? i + 1 : i)]);
    }
    [[6, 5], [24, 9], [41, 3], [58, 12], [86, 4], [12, 20]].forEach(([x, y]) => px(x, y, '#7a6a90'));
    // red glow over the treetops
    for (let y = -16; y <= 16; y++) for (let x = -16; x <= 16; x++) {
      const d = Math.sqrt(x * x + y * y);
      if (d < 16 && (d < 5 || (x + y) % 2 === 0)) px(70 + x, 26 + y, d < 3 ? '#ff6688' : d < 8 ? '#8a1830' : '#3a0c22');
    }
    // trees behind houses
    const tree = (cx, top) => { for (let y = top; y < 66; y++) { const h = Math.min(7, Math.floor((y - top) / 2) + 1); rect(cx - h, y, 2 * h + 1, 1, '#08040e'); } };
    tree(10, 36); tree(36, 42); tree(62, 38); tree(84, 34);
    // stilt houses
    const house = (x, w, top) => {
      for (let y = 0; y < 8; y++) rect(x - y, top + y, w + 2 * y, 1, '#0e0814');
      rect(x - 5, top + 8, w + 10, 10, '#150c1a');
      rect(x + 1, top + 11, 4, 4, '#050208'); rect(x + w - 5, top + 11, 4, 4, '#050208');
      for (let i = 0; i < 4; i++) rect(x - 4 + i * Math.floor((w + 8) / 3), top + 18, 1, 80 - top - 18, '#0e0814');
    };
    house(8, 14, 50); house(40, 16, 46); house(72, 12, 52);
    // dirt yard
    for (let y = 80; y < H; y++) for (let x = 0; x < W; x++) px(x, y, (x * 5 + y * 3) % 13 === 0 ? '#2e2220' : y < 84 ? '#151010' : '#1c1414');
    // red haze near the ground
    for (let y = 74; y < 86; y++) for (let x = 0; x < W; x++) if (Math.sin(x / 5 + y) + Math.sin(x / 9) > 0.7 && (x + y) % 2 === 0) px(x, y, '#3a1a2a');
  });
}

/** Title art (90x160, shown at 4x): a cracked Thai gate leaking light from the other side. */
function drawTitleArt(scene) {
  canvasArt(scene, 'art_gate', 90, 160, (px, rect, W, H) => {
    const bands = ['#06051a', '#0b0820', '#120b2c', '#1a1036', '#221440'];
    for (let y = 0; y < 130; y++) for (let x = 0; x < W; x++) {
      const f = y / 130 * (bands.length - 1), i = Math.floor(f);
      px(x, y, bands[Math.min(bands.length - 1, f - i + ((x + y) % 2 ? 0.25 : -0.25) > 0.5 ? i + 1 : i)]);
    }
    [[6, 4], [18, 12], [70, 6], [84, 15], [10, 30], [80, 34], [30, 3], [57, 9], [4, 50], [86, 52]].forEach(([x, y]) => px(x, y, '#8a86b0'));
    // light from the other side, haloing the gate
    for (let y = -40; y <= 40; y++) for (let x = -34; x <= 34; x++) {
      const d = Math.sqrt(x * x + (y * 0.8) ** 2);
      if (d < 34 && (d < 14 || (x + y) % 2 === 0)) px(45 + x, 98 + y, d < 14 ? '#3a2850' : d < 24 ? '#261a40' : '#1a1232');
    }
    const dark = '#0a0612', trim = '#3a2a40', gold = '#8a6a30';
    // tiered spire (ยอดปราสาท)
    rect(44, 30, 2, 6, gold);
    for (let t = 0; t < 4; t++) {
      const top = 36 + t * 8, half = 4 + t * 4;
      for (let y = 0; y < 8; y++) { const h = half + Math.floor(y / 2); rect(45 - h, top + y, 2 * h, 1, dark); }
      rect(45 - half - 4, top + 7, 2 * half + 8, 1, trim);
    }
    // lintel and pillars
    rect(20, 68, 50, 5, dark); rect(20, 68, 50, 1, gold);
    rect(23, 73, 7, 57, dark); rect(60, 73, 7, 57, dark);
    rect(24, 73, 1, 57, trim); rect(65, 73, 1, 57, trim);
    // door panels
    rect(30, 73, 14, 57, '#140c1c'); rect(46, 73, 14, 57, '#140c1c');
    for (let y = 78; y < 128; y += 10) { rect(32, y, 10, 1, '#22162a'); rect(48, y, 10, 1, '#22162a'); }
    // jagged crack of light between the doors
    let cx = 45;
    for (let y = 73; y < 130; y++) {
      if (y % 4 === 0) cx += ((y * 7) % 3) - 1;
      cx = Math.max(43, Math.min(47, cx));
      rect(cx - 1, y, 3, 1, '#c8a8ff'); px(cx, y, '#ffffff');
      if (y === 84 || y === 101 || y === 117) { rect(cx + 2, y, 4, 1, '#a080e0'); px(cx + 6, y - 1, '#a080e0'); }
      if (y === 92 || y === 110) { rect(cx - 5, y, 4, 1, '#a080e0'); px(cx - 6, y + 1, '#a080e0'); }
    }
    // ground and path
    for (let y = 130; y < H; y++) for (let x = 0; x < W; x++) px(x, y, (x * 7 + y * 3) % 11 === 0 ? '#1c2a1c' : '#0d140f');
    for (let y = 130; y < H; y++) { const h = 8 + Math.floor((y - 130) / 2); rect(45 - h, y, 2 * h, 1, (y % 3) ? '#1c1626' : '#241c30'); }
    // light spilling on the path
    for (let y = 130; y < 140; y++) for (let x = 40; x < 51; x++) if ((x + y) % 2 === 0) px(x, y, '#5a4880');
  });
}

/** Story illustrations (procedural pixel art). */
function canvasArt(scene, key, W, H, draw) {
  if (scene.textures.exists(key)) return;
  const tex = scene.textures.createCanvas(key, W, H);
  const c = tex.getContext();
  const px = (x, y, col) => { c.fillStyle = col; c.fillRect(x, y, 1, 1); };
  const rect = (x, y, w, h, col) => { c.fillStyle = col; c.fillRect(x, y, w, h); };
  draw(px, rect, W, H);
  tex.refresh();
  tex.setFilter(1);
}

function drawStoryArt(scene) {
  // Empty temple pavilion at night, a lantern still glowing, an empty mat.
  canvasArt(scene, 'art_shrine', 90, 70, (px, rect, W, H) => {
    rect(0, 0, W, H, '#0a0814');
    for (let y = 0; y < 30; y++) for (let x = 0; x < W; x++) if ((x * 13 + y * 7) % 53 === 0) px(x, y, '#3a3660');
    // lantern glow
    for (let y = -22; y <= 22; y++) for (let x = -22; x <= 22; x++) {
      const d = Math.sqrt(x * x + y * y);
      if (d < 22 && (d < 10 || (x + y) % 2 === 0)) px(45 + x, 34 + y, d < 10 ? '#3a2a18' : '#22180f');
    }
    // roof
    for (let y = 0; y < 10; y++) rect(10 - y, 6 + y, W - 20 + 2 * y, 1, '#1a1020');
    rect(0, 16, W, 3, '#2a1a24');
    // pillars
    rect(8, 19, 5, 40, '#2a1a24'); rect(W - 13, 19, 5, 40, '#2a1a24');
    // floor
    rect(0, 59, W, 11, '#1c1418');
    for (let x = 0; x < W; x += 6) rect(x, 59, 1, 11, '#140e12');
    // empty mat
    rect(32, 54, 26, 5, '#4a3a22'); rect(32, 54, 26, 1, '#5e4a2c');
    // lantern
    rect(44, 19, 1, 8, '#555'); rect(42, 27, 5, 7, '#d08a30'); rect(43, 28, 3, 5, '#ffd070'); rect(42, 34, 5, 1, '#7a4a20');
    // fallen note on the mat
    rect(48, 52, 5, 3, '#d8c8a0'); px(49, 53, '#5a4a3a'); px(51, 53, '#5a4a3a');
  });

  // Torn paper note with scribbled lines.
  canvasArt(scene, 'art_note', 40, 30, (px, rect, W, H) => {
    for (let y = 2; y < H - 2; y++) for (let x = 3; x < W - 3; x++) {
      const torn = (x === 3 || x === W - 4) && (y * 7) % 5 < 2;
      const tornTop = y === 2 && (x * 5) % 7 < 3;
      if (!torn && !tornTop) px(x, y, (x + y) % 9 === 0 ? '#c8b890' : '#dccca0');
    }
    for (let line = 0; line < 5; line++) {
      const y = 7 + line * 4, len = 26 - (line === 4 ? 12 : (line * 3) % 7);
      for (let x = 7; x < 7 + len; x++) if ((x * 3 + line) % 5 !== 0) px(x, y + ((x + line) % 3 === 0 ? -1 : 0), '#3a2a20');
    }
    // dark stain
    for (let y = 18; y < 25; y++) for (let x = 26; x < 33; x++) if ((x - 29) ** 2 + (y - 21) ** 2 < 10) px(x, y, '#6a2a20');
  });

  // Silent village on stilts; a red light glowing above the trees.
  canvasArt(scene, 'art_village', 90, 70, (px, rect, W, H) => {
    for (let y = 0; y < H; y++) rect(0, y, W, 1, y < 20 ? '#0b0820' : y < 40 ? '#140c2a' : '#1a1030');
    // red glow
    for (let y = -14; y <= 14; y++) for (let x = -14; x <= 14; x++) {
      const d = Math.sqrt(x * x + y * y);
      if (d < 14 && (d < 4 || (x + y) % 2 === 0)) px(68 + x, 14 + y, d < 3 ? '#ff6688' : d < 7 ? '#a01830' : '#4a0c20');
    }
    // trees
    const tree = (cx, top) => { for (let y = top; y < 52; y++) { const h = Math.min(6, Math.floor((y - top) / 2) + 1); rect(cx - h, y, 2 * h + 1, 1, '#06040c'); } };
    tree(8, 18); tree(30, 24); tree(56, 22); tree(80, 20);
    // stilt houses
    const house = (x, w) => {
      for (let y = 0; y < 8; y++) rect(x - y, 30 + y, w + 2 * y, 1, '#0d0912'); // roof
      rect(x - 4, 38, w + 8, 10, '#120d18');
      rect(x + 2, 41, 4, 4, '#05030a'); rect(x + w - 6, 41, 4, 4, '#05030a'); // shut windows
      for (let i = 0; i < 4; i++) rect(x - 3 + i * Math.floor((w + 6) / 3), 48, 1, 8, '#0d0912'); // stilts
    };
    house(12, 14); house(44, 16); house(72, 12);
    rect(0, 56, W, 14, '#0c140e');
    for (let x = 0; x < W; x++) if ((x * 7) % 11 === 0) px(x, 56, '#1c2a1c');
  });
}

/** Pixel-grid glow disc (18x18, dithered rim) and thin ring (16x16) — tint and scale by whole steps. */
function drawPixelShapes(scene) {
  canvasArt(scene, 'px_disc', 18, 18, (px) => {
    for (let y = 0; y < 18; y++) for (let x = 0; x < 18; x++) {
      const d = Math.hypot(x - 8.5, y - 8.5);
      if (d < 6 || (d < 9 && (x + y) % 2 === 0)) px(x, y, '#ffffff');
    }
  });
  canvasArt(scene, 'px_ring', 16, 16, (px) => {
    for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) {
      const d = Math.hypot(x - 7.5, y - 7.5);
      if (d > 6 && d < 7.6) px(x, y, '#ffffff');
    }
  });
}

/** Register every sprite as a Phaser texture (1px per cell; scale when displaying). */
export function registerSprites(scene) {
  drawBackdrop(scene);
  drawStoryArt(scene);
  drawVillageBackdrop(scene);
  drawTitleArt(scene);
  drawPixelShapes(scene);
  for (const key of ['kumarn', 'kongkoi', 'krasue']) {
    const rows = SPRITES[key], n = rows.length;
    SPRITES[`${key}_ko`] = rows[0].split('').map((_, x) => Array.from({ length: n }, (_, y) => rows[n - 1 - y][x]).join(''));
  }
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
