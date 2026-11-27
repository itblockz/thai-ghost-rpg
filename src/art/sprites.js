// Pixel art drawn as character grids. Each char = one color from PALETTE, '.' = transparent.
export const PALETTE = {
  k: '#141414', s: '#e8c9a0', e: '#d01030', m: '#7a1020', r: '#c0283a', p: '#ff6688',
  h: '#2a1a10', w: '#ffffff', v: '#c8d0d8', g: '#d4a020', o: '#7a4a20', n: '#5d4d6e', y: '#ffe066', a: '#888899', f: '#f0c890', b: '#3b4a8a', c: '#d64545', d: '#f0e0d0', l: '#5a3a20',
  // finer-grid additions
  N: '#2e2440', L: '#8a7aa0', K: '#0e0a14', H: '#2a2238', Q: '#e8d8c8', S: '#b8a898', R: '#7a1030',
  // chapter 2: water, ghost-fire, naga scales
  Z: '#c8d8e8', Y: '#8a9ab8', U: '#1e3a6a', I: '#3a6ab0', J: '#9ac8f0', P: '#ff8a30', O: '#b8400e', G: '#2e8a3a', E: '#6ad84a', F: '#163a1c', T: '#e8c050',
};

export const SPRITES = {
  // ---- animation frames: <unit>_idle2 (breathing), _wind (anticipation), _atk (strike) ----
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
  // ghosts redrawn on the finer grid (kongkoi 32x32, krasue 48x48 — bosses get a bigger grid, same pixel size)
  // victory poses
  kumarn_cheer: [
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
    '........yy.oooooooooo.yy........',
    '.......og.oggggggggggo.go.......',
    '......og.ogyygggggggggo.go......',
    '......og.ogyggggggggggo.go......',
    '......og.oggkkggggkkggo.go......',
    '......og.oggkwggggkwggo.go......',
    '......og.ogcggggggggcgo.go......',
    '......og.ogggggmmgggggo.go......',
    '..........ooggggggggoo..........',
    '.............oggggo.............',
    '.........ooggyyyyyyggoo.........',
    '........oggggggyyggggggo........',
    '..........oggggggggggo..........',
    '..........oggggggggggo..........',
    '..........orrrrrrrrrro..........',
    '..........orrrrrrrrrro..........',
    '..........orrrrmmrrrro..........',
    '..........orrro..orrro..........',
    '..........oggo....oggo..........',
    '.........oggo......oggo.........',
    '........ooggo......oggoo........',
  ],
  // กระสือ on the standard 32x32 character grid
  // icons: hand-drawn on the standard 16x16 icon grid
  icon_ram: [
    '................',
    '.........kkk....',
    '........kkkkk...',
    '.......oyggggo..',
    'w.....oygggggo..',
    '.ww..oygkggkgo..',
    '...ww.ogggggggo.',
    'wwww..oggcggcgo.',
    '.....ooggggmggo.',
    '..www.ooggggggo.',
    '.......oooooooo.',
    'ww.....orrrrro..',
    '..www..orrrrro..',
    '.......ogg.ggo..',
    '.......oo..oo...',
    '................',
  ],
  icon_shield: [
    '................',
    '..oooooooooooo..',
    '.oyyyyyyggggggo.',
    '.oyggggggggggmo.',
    '.oygggyyyygggmo.',
    '.oyggyrrrrygggo.',
    '.oyggyrppryggmo.',
    '.oyggyrrrrygggo.',
    '.oygggyyyyggmmo.',
    '..oygggggggggo..',
    '..oyggggggggmo..',
    '...oyggggggmo...',
    '....oyggggmo....',
    '.....oyggmo.....',
    '......oooo......',
    '................',
  ],
  icon_claw: [
    '................',
    '..........w.....',
    '.........wv..w..',
    '....w...wv..wv..',
    '...wv..wv..wv...',
    '..wv..wv..wv....',
    '..v..wv..wv.....',
    '....wv..wv......',
    '...wv..wv.......',
    '..wv..wv........',
    '..v..wv.........',
    '....wv..........',
    '....v...........',
    '................',
    '................',
    '................',
  ],
  icon_frenzy: [
    '.........w...w..',
    '....w...wv..wv..',
    '...wv..wv..wv...',
    '..wv..wv..wv..w.',
    '..v..wv..wv..wv.',
    '....wv..wv..wv..',
    '...wv..wv..wv...',
    '..wv..wv..wv....',
    '..r..wr..wr.....',
    '....wr..wr..r...',
    '...wr..rr..rr...',
    '..rr..rr..rr....',
    '..r..rr..rr.....',
    '....rr..rr......',
    '....r...r.......',
    '................',
  ],
  icon_fang: [
    '................',
    '...kkkkkkkkkk...',
    '..kRRRRRRRRRRk..',
    '.kRwwRwRRwRwwRk.',
    '.kRwwRRRRRRwwRk.',
    '.kRwRRRRRRRRwRk.',
    '.kRRRRmmmmRRRRk.',
    '.kRRRmmmmmmRRRk.',
    '.kRRRRmmmmRRRRk.',
    '.kRwRRRRRRRRwRk.',
    '.kRwwRRRRRRwwRk.',
    '.kRwwRwRRwRwwRk.',
    '..kRRRRRRRRRRk..',
    '...kkkkkkkkkk...',
    '................',
    '................',
  ],
  icon_spit: [
    '................',
    '..........p.....',
    '.....rr.....r...',
    '....rppr..r..p..',
    '...rpprr....rr..',
    '..rpprr..pr.....',
    '..rprr..rppr....',
    '..rrr..rprrr..r.',
    '.rrr..rprr...rp.',
    '.rr..rprr....rr.',
    '.r..rprr..r.....',
    '...rrrr..rpr....',
    '..rrr....rr.....',
    '..rr............',
    '.rr.............',
    '................',
  ],
  icon_target: [
    '................',
    '.....eeeeee.....',
    '...ee..ee..ee...',
    '..e....ee....e..',
    '..e....ee....e..',
    '.e.....ee.....e.',
    '.e....eeee....e.',
    '.eeeeeewweeeeee.',
    '.eeeeeewweeeeee.',
    '.e....eeee....e.',
    '.e.....ee.....e.',
    '..e....ee....e..',
    '..e....ee....e..',
    '...ee..ee..ee...',
    '.....eeeeee.....',
    '................',
  ],
  icon_next: [
    '................',
    '.......kk.......',
    '.......kwk......',
    '.......kwwk.....',
    '.kkkkkkkwwwk....',
    '.kwwwwwwwwwwk...',
    '.kwwwwwwwwwwwk..',
    '.kwwwwwwwwwwwwk.',
    '.kwwwwwwwwwwwwk.',
    '.kwwwwwwwwwwwk..',
    '.kwwwwwwwwwwk...',
    '.kkkkkkkwwwk....',
    '.......kwwk.....',
    '.......kwk......',
    '.......kk.......',
    '................',
  ],
  icon_retry: [
    '................',
    '.....kkkkkk.k...',
    '...kkwwwwwwkwk..',
    '..kwwkkkkkkwwk..',
    '.kwwk.....kwwk..',
    '.kwk.....kwwwk..',
    'kwwk.....kkkkk..',
    'kwk.............',
    'kwk.............',
    'kwwk.........k..',
    '.kwk........kwk.',
    '.kwwk......kwwk.',
    '..kwwkkkkkkwwk..',
    '...kkwwwwwwkk...',
    '.....kkkkkk.....',
    '................',
  ],
  icon_sound_on: [
    '................',
    '.......k........',
    '......kwk....w..',
    '.....kwwk..w..w.',
    '.kkkkwwwk...w.w.',
    '.kwwwwwwk.w..w.w',
    '.kwwwwwwk..w.w.w',
    '.kwwwwwwk..w.w.w',
    '.kwwwwwwk..w.w.w',
    '.kwwwwwwk.w..w.w',
    '.kkkkwwwk...w.w.',
    '.....kwwk..w..w.',
    '......kwk....w..',
    '.......k........',
    '................',
    '................',
  ],
  icon_sound_off: [
    '................',
    '.......k........',
    '......kwk.......',
    '.....kwwk.......',
    '.kkkkwwwk.......',
    '.kwwwwwwk.e...e.',
    '.kwwwwwwk..e.e..',
    '.kwwwwwwk...e...',
    '.kwwwwwwk..e.e..',
    '.kwwwwwwk.e...e.',
    '.kkkkwwwk.......',
    '.....kwwk.......',
    '......kwk.......',
    '.......k........',
    '................',
    '................',
  ],
  icon_clock: [
    '................',
    '....oooooooo....',
    '...oyggggggyo...',
    '....oyggggyo....',
    '....oddddddo....',
    '.....oddddo.....',
    '......oddo......',
    '.......oo.......',
    '.......oo.......',
    '......oyyo......',
    '.....oyyyyo.....',
    '....oyyyyyyo....',
    '....oyyyyyyo....',
    '...oyggggggyo...',
    '....oooooooo....',
    '................',
  ],
  icon_danger: [
    '................',
    '.......kk.......',
    '......keek......',
    '......keek......',
    '.....keeeek.....',
    '.....kewwek.....',
    '....keewweek....',
    '....keewweek....',
    '...keeewweeek...',
    '...keeewweeek...',
    '..keeeeeeeeeek..',
    '..keeeewweeeek..',
    '.keeeeewweeeeek.',
    '.keeeeeeeeeeeek.',
    '.kkkkkkkkkkkkkk.',
    '................',
  ],
  icon_dmg: [
    '................',
    '.............kk.',
    '............kwk.',
    '...........kwvk.',
    '..........kwvk..',
    '.........kwvk...',
    '........kwvk....',
    '.......kwvk.....',
    '..kk..kwvk......',
    '..kgkkwvk.......',
    '...kgovk........',
    '....kogk........',
    '...kokgk........',
    '..kok.kgk.......',
    '..kk...kk.......',
    '................',
  ],
  // ghosts filling the 32x32 grid
  // ผีกระหัง — flies on two winnowing baskets (กระด้ง)
  krahang: [
    '................................',
    '................................',
    '................................',
    '............kkkkkkkk............',
    '...........k.hhhhhh.k...........',
    '...........k.llllll.k...........',
    '...........kllllllllk...........',
    '...........kleelleelk...........',
    '............llllllll............',
    '............llllllll............',
    '....kkkkkkk..lwkkwl..kkkkkkk....',
    '..kkgoogoogkk.llll.kkgoogoogkk..',
    '..kgofgffgook......kgofgffgook..',
    '.kgofgffgffkllllllllkfgffgffgfk.',
    '.kfogffgffgkllolllllkgffgffgofk.',
    '.kfgffgfllllllolllllllllffgfogk.',
    '..koogffgfokllolllllkogffgfogk..',
    '..kkgoogoogkllolllllkgoogoogkk..',
    '....kkkkkkkkllolllllkkkkkkkk....',
    '...........kllolllllk...........',
    '............kllllllk............',
    '............krrrrrrk............',
    '............krrrrrrk............',
    '............klrllrlk............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '.............kk..kk.............',
    '................................',
  ],
  krahang_idle2: [
    '................................',
    '................................',
    '................................',
    '............kkkkkkkk............',
    '...........k.hhhhhh.k...........',
    '...........k.llllll.k...........',
    '...........kllllllllk...........',
    '...........kleelleelk...........',
    '............llllllll............',
    '............llllllll............',
    '.............lwkkwl.............',
    '..............llll..............',
    '....kkkkkkk..........kkkkkkk....',
    '..kkgoogoogkllllllllkgoogoogkk..',
    '..kgofgffgokllolllllkofgffgook..',
    '.kgofgffgffkllolllllkfgffgffgfk.',
    '.kfogffgllllllolllllllllgffgofk.',
    '.kfgffgffgfkllolllllkffgffgfogk.',
    '..koogffgfokllolllllkogffgfogk..',
    '..kkgoogoogkllolllllkgoogoogkk..',
    '....kkkkkkk.kllllllk.kkkkkkk....',
    '............krrrrrrk............',
    '............krrrrrrk............',
    '............klrllrlk............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '.............kk..kk.............',
    '................................',
  ],
  krahang_wind: [
    '................................',
    '................................',
    '................................',
    '............kkkkkkkk............',
    '...........k.hhhhhh.k...........',
    '...........k.llllll.k...........',
    '...kkkkkkk.kllllllllk.kkkkkkk...',
    '.kkgoogoogkkleelleelkkgoogoogkk.',
    '.kgofgffgookllllllllkgofgffgook.',
    'kgofgffgffgfllllllllgofgffgffgfk',
    'kfogffgffgofklwkkwlkfogffgffgofk',
    'kfgffgffgfogk.llll.kfgffgffgfogk',
    '.koogffgfogk........koogffgfogk.',
    '.kkgoogollllllllllllllllogoogkk.',
    '...kkkkkkk.kllolllllk.kkkkkkk...',
    '...........kllolllllk...........',
    '...........kllolllllk...........',
    '...........kllolllllk...........',
    '...........kllolllllk...........',
    '...........kllolllllk...........',
    '............kllllllk............',
    '............krrrrrrk............',
    '............krrrrrrk............',
    '............klrllrlk............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '.............kk..kk.............',
    '................................',
  ],
  krahang_atk: [
    '................................',
    '................................',
    '................................',
    '............kkkkkkkk............',
    '...........k.hhhhhh.k...........',
    '...........k.llllll.k...........',
    '...........kllllllllk...........',
    '...........kleelleelk...........',
    '............llllllll............',
    '............llllllll............',
    '.............lwkkwl.............',
    '..............llll..............',
    '................................',
    '...........kllllllllk...........',
    '.....kkkkkkkllolllllkkkkkkk.....',
    '...kkgoogookllolllllkoogoogkk...',
    '...kgofgffgkllolllllkfgffgook...',
    '..kgofgfllllllolllllllllgffgfk..',
    '..kfogffgffkllolllllkffgffgofk..',
    '..kfgffgffgkllolllllkfgffgfogk..',
    '...koogffgfokllllllkogffgfogk...',
    '...kkgoogoogkrrrrrrkgoogoogkk...',
    '.....kkkkkkkkrrrrrrkkkkkkkk.....',
    '............klrllrlk............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '....Z..Z..Z..Zl.ZlkZ..Z..Z......',
    '.....Z..Z..Z.kZ..Zk.Z..Z..Z.....',
    '.............kl..lk.............',
    '.............kk..kk.............',
    '................................',
  ],
  krahang_cheer: [
    '................................',
    '................................',
    '................................',
    '............kkkkkkkk............',
    '...........k.hhhhhh.k...........',
    '...........k.llllll.k...........',
    '...........kllllllllk...........',
    '....kkkkkkkkleelleelkkkkkkkk....',
    '..kkgoogoogkllllllllkgoogoogkk..',
    '..kgofgffgoollllllllgofgffgook..',
    '.kgofgffgffgflwkkwlgofgffgffgfk.',
    '.kfogffgffgofkllllkfogffgffgofk.',
    '.kfgffgffgfogk....kfgffgffgfogk.',
    '..koogffllllllllllllllllfgfogk..',
    '..kkgoogoogkllolllllkgoogoogkk..',
    '....kkkkkkkkllolllllkkkkkkkk....',
    '...........kllolllllk...........',
    '...........kllolllllk...........',
    '...........kllolllllk...........',
    '...........kllolllllk...........',
    '............kllllllk............',
    '............krrrrrrk............',
    '............krrrrrrk............',
    '............klrllrlk............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '.............kl..lk.............',
    '.............kk..kk.............',
    '................................',
  ],
  icon_flap: [
    '................',
    '.....kkkkk......',
    '...kkfgfgfkk....',
    '..kfgfofofgfk...',
    '..kgfofgfofgk...',
    '..kfgfofofgfk...',
    '...kkfgfgfkk....',
    '.....kkkkk......',
    '................',
    '.ZZZZZZ.........',
    '.......ZZZ......',
    '..ZZZZZZZZZZ....',
    '............ZZ..',
    '.ZZZZZZZZ.......',
    '.........ZZZ....',
    '................',
  ],
  icon_whack: [
    '.......y........',
    '...y...y...y....',
    '....y..y..y.....',
    '.....kkkkk......',
    '...kkfgfgfkk....',
    '..kfgfofofgfk...',
    '.kgfofgfgfofgk..',
    '.kfgofgfgfogfk..',
    '.kgfofgfgfofgk..',
    '..kfgfofofgfk...',
    '...kkfgfgfkk....',
    '.....kkkkk......',
    '..y.........y...',
    '.y...........y..',
    '................',
    '................',
  ],
  // chapter 3: ผีปอบ, ผีเปรต, map stops and skill icons
  node_gate: [
    '................',
    '................',
    '................',
    '.kkkkkkkkkkkkkk.',
    '..oooooooooooo..',
    '..oooooooooooo..',
    '...ll......ll...',
    '...llkkkkkkll...',
    '...llkkkkkkll...',
    '...llkkkkkkll...',
    '...llkkkakkll...',
    '...llkkkkkkll...',
    '...llkkkkkkll...',
    '...llkkkkkkll...',
    '...llkkkkkkll...',
    '................',
  ],
  node_yard: [
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '........kk......',
    '........aa......',
    '...kk..aaaa.....',
    '...aa...aa..kk..',
    '..aaaa..aa..aa..',
    '...aa...aa.aaaa.',
    '...aa...aa..aa..',
    '.GGGGGGGGGGGGGG.',
    '................',
  ],
  node_hall: [
    '................',
    '................',
    '.....nnnnnn.....',
    '....nnnnnnnn....',
    '...nnnnnnnnnn...',
    '..nnnnnnnnnnnn..',
    '.nnnnnnnnnnnnnn.',
    '...NNNNNNNNNN...',
    '...NNNNNNNNNN...',
    '...NNNkkkkNNN...',
    '...NNNkPPkNNN...',
    '...NNNkkkkNNN...',
    '...NNNkkkkNNN...',
    '...NNNkkkkNNN...',
    '................',
    '................',
  ],
  node_temple: [
    '.......TT.......',
    '.......TT.......',
    '.......TT.......',
    '......nnnn......',
    '.....nnnnnn.....',
    '....nnnnnnnn....',
    '....nnnnnnnn....',
    '...nnnnnnnnnn...',
    '..nnnnnnnnnnnn..',
    '..nnnnnnnnnnnn..',
    '.nnnnnnnnnnnnnn.',
    'nnnnnnnnnnnnnnnn',
    '...NNNNkkNNNN...',
    '...NNNNkkNNNN...',
    '...NNNNkkNNNN...',
    '................',
  ],
  icon_devour: [
    '................',
    '................',
    '................',
    '......kkkkk.....',
    '....kkkkkkkkk...',
    '...kkkkkkkkkkk..',
    '..kwwwwwwwwwwkk.',
    '..kkwkwkwkwkwkk.',
    '..kkeeeeeeeekkk.',
    '..kwwwwwwwwwwkk.',
    '..kwkwkwkwkwkkk.',
    '...kkkkkkkkkkk..',
    '....kkkkkkkkk...',
    '......kkkkk..e..',
    '..............e.',
    '................',
  ],
  icon_smash: [
    '................',
    '......kkkkk.....',
    '....kkLLLLLkk...',
    '...kkLLLLLLLkk..',
    '...kLLLLLLLLLk..',
    '..kLLLLLLLLLLLk.',
    '..kLLLLLLLLLLLk.',
    '..kLLLLLLLLLLLk.',
    '..kLLLLLLLLLLLk.',
    '..kLLLLLLLLLLLk.',
    '...kLLLLLLLLLk..',
    '...kkLLLLLLLkk..',
    '....LLLLLLLLk...',
    '....LLLLLLLL....',
    '.y............y.',
    '...y....y....y..',
  ],
  icon_hunger: [
    '................',
    '.T....kkkkk...T.',
    '....kknnnnnkk...',
    '...knnnnnnnnnk..',
    '..knnnnnnnnnnnk.',
    '..knnnnkkknnnnk.',
    '.knnnnkkkkknnnnk',
    '.knnnkkkkkkknnnk',
    '.knnnkkkekkknnnk',
    '.knnnkkkkkkknnnk',
    '.knnnnkkkkknnnnk',
    '..knnnnkkknnnnk.',
    '..knnnnnnnnnnnk.',
    '...knnnnnnnnnk..',
    '.T..kknnnnnkk.T.',
    '......kkkkk.....',
  ],
  icon_seal: [
    '................',
    '................',
    '....kkkkkkkk....',
    '...kddddddddk...',
    '...keddddddek...',
    '...kdeddddedk...',
    '...kddeddeddk...',
    '...kdddeedddk...',
    '...kdddeedddk...',
    '...kddeddeddk...',
    '...kdeddddedk...',
    '...keddddddek...',
    '...kddddddddk...',
    '....kkkkkkkk....',
    '................',
    '................',
  ],
  // ผีปอบ (32x32) and ผีเปรต (48x48: a boss stands bigger), redrawn
  pop: [
    '................................',
    '................................',
    '................................',
    '..............kkkkk.............',
    '............kkaaaaakk...........',
    '...........kaaaaaaaaak..........',
    '..........kaaaaaaaaaaak.........',
    '.........kaaaaSSSSSaaaak........',
    '........kaaaaSSSSSSSaaaak.......',
    '........kaaaSSkSSfkfSaaak.......',
    '........kaaaSSeSffeffaaak.......',
    '........kaaaSSSSfffffaaak.......',
    '........kaaaSSSSfffffaaak.......',
    '........kaaaSSSSfffffaaak.......',
    '........kakaaSSkkkfffakak.......',
    '........kakaaaSSpfffaakak.......',
    '........kakakaaapaaakakak.......',
    '.....kkkkakakanapanakakakkk.....',
    '....kSSSSSSanannpananSSaSSSk....',
    '....kSSSSSSaLLLneannnSSaSSSk....',
    '...kwkwkwnLLLLLLLnnnnnnwnwkwk...',
    '...kwkwkwnLLLLLLLnnnnnnwnwkwk...',
    '....k.knnLLLLLLLLNNNNNnnnnkk....',
    '......knnLLLLLLLNNNNNNNnnnk.....',
    '......knnLLLLLLNNNNNNNNNnnk.....',
    '......knnLLLLLLNNNNNNNNNnnk.....',
    '......knnLLLLLLNNNNNNNNNnnk.....',
    '.......knnLLLLLNNNNNNNNNnk......',
    '.......knnLLLLLNNNNNNNNNnk......',
    '........knnnLLLnNNNNNNNnk.......',
    '.........kknnnnnnNNNNNkk........',
    '.........knkknnnknnnkknk........',
  ],
  pop_idle2: [
    '................................',
    '................................',
    '................................',
    '................................',
    '..............kkkkk.............',
    '............kkaaaaakk...........',
    '...........kaaaaaaaaak..........',
    '..........kaaaaaaaaaaak.........',
    '.........kaaaaSSSSSaaaak........',
    '........kaaaaSSSSSSSaaaak.......',
    '........kaaaSSkSSfkfSaaak.......',
    '........kaaaSSeSffeffaaak.......',
    '........kaaaSSSSfffffaaak.......',
    '........kaaaSSSSfffffaaak.......',
    '........kaaaSSSSfffffaaak.......',
    '........kakaaSSkkkfffakak.......',
    '........kakaaaSSpfffaakak.......',
    '........kakakaaapaaakakak.......',
    '.....kkkkakakanapanakakakkk.....',
    '....kSSSSSSanannpananSSaSSSk....',
    '....kSSSSSSaLLLneannnSSaSSSk....',
    '...kwkwkwnLLLLLLLnnnnnnwnwkwk...',
    '...kwkwkwnLLLLLLLnnnnnnwnwkwk...',
    '....k.knnLLLLLLLLNNNNNnnnnkk....',
    '......knnLLLLLLLNNNNNNNnnnk.....',
    '......knnLLLLLLNNNNNNNNNnnk.....',
    '......knnLLLLLLNNNNNNNNNnnk.....',
    '......knnLLLLLLNNNNNNNNNnnk.....',
    '.......knnLLLLLNNNNNNNNNnk......',
    '.......knnLLLLLNNNNNNNNNnk......',
    '........knnnLLLnNNNNNNNnk.......',
    '.........knnknnnkNnNkNnk........',
  ],
  // ผีเปรต standing tall
  pret: [
    '......................kkkkk.....................',
    '.....................kLLLLLk....................',
    '....................kLQQQLLLk...................',
    '...................kLLQQQLLLLk..................',
    '...................kLLeQQLeLLk..................',
    '...................kLLLLLLLLLk..................',
    '....................kLLLkLLLk...................',
    '.....................kLLLLLk....................',
    '......................kQLLk.....................',
    '......................kQLLk.....................',
    '......................kQLLk.....................',
    '......................kQLLk.....................',
    '......................kQLLk.....................',
    '......................kQLLk.....................',
    '......................kQLLk.....................',
    '......................kQLLk.....................',
    '......................kQLLk.....................',
    '...................kkkkQLLkkkk..................',
    '...............kkkkLLLLLLLLLLLkkkk..............',
    '..............kLLLkLnnnnnnnnnLkLLLk.............',
    '..............kLLLkLLLLLLLLLLLkLLLk.............',
    '..............kLLLkLnnnnnnnnnLkLLLk.............',
    '..............kLLLkLLLLLLLLLLLkLLLk.............',
    '..............kLLLkLnnnnnnnnnLkLLLk.............',
    '..............kLLLkLLLLLLLLLLLkLLLk.............',
    '..............kLLLkLnnnnnnnnnLkLLLk.............',
    '..............kLLLkLLLLLLLLLLLkLLLk.............',
    '..............kLLLLLQQQQQLLLLLLLLLk.............',
    '..............kLLLLQQQQQQQLLLLLLLLk.............',
    '..............kLLLLQQQQQQQLLLLLLLLk.............',
    '..............kLLLLQQQQQQQLLLLLLLLk.............',
    '..............kLLLLLQQQQQLLLLLLLLLk.............',
    '..............kLLLLLLLLLLLLLLLLLLLk.............',
    '..............kLLLLLLLLLLLLLLLLLLLk.............',
    '.............kLQLLLLLLLLLLLLLLLQLLLk............',
    '............kLQQQLLLNLLLLLLLNLQQQLLLk...........',
    '............kLQQQLLLNNNNNNNNNLQQQLLLk...........',
    '............kLQQQLLLNNNNNNNNNLQQQLLLk...........',
    '............kLLQLLLLNkkNkkNLLLLQLLLLk...........',
    '............kLLLLLLLLk.k..kLLLLLLLLLk...........',
    '.............kLLLLLLLk....kLLkLLLLLk............',
    '.............kwLwLwLLk....kLLkwLwLwk............',
    '.............kwkwkwLLk....kLLkwkwkwk............',
    '.............kwkwkwLLk....kLLkwkwkwk............',
    '..............k.k.kLLk....kLLkk.k.k.............',
    '.................kkLLk....kLLkk.................',
    '................kLLLLk....kLLLLk................',
    '.................kkkk......kkkk.................',
  ],
  pret_idle2: [
    '................................................',
    '......................kkkkk.....................',
    '.....................kLLLLLk....................',
    '....................kLQQQLLLk...................',
    '...................kLLQQQLLLLk..................',
    '...................kLLeQQLeLLk..................',
    '...................kLLLLLLLLLk..................',
    '....................kLLLkLLLk...................',
    '.....................kLLLLLk....................',
    '......................kQLLk.....................',
    '......................kQLLk.....................',
    '......................kQLLk.....................',
    '......................kQLLk.....................',
    '......................kQLLk.....................',
    '......................kQLLk.....................',
    '......................kQLLk.....................',
    '......................kQLLk.....................',
    '......................kQLLk.....................',
    '...................kkkkQLLkkkk..................',
    '...............kkkkLLLLLLLLLLLkkkk..............',
    '..............kLLLkLnnnnnnnnnLkLLLk.............',
    '..............kLLLkLLLLLLLLLLLkLLLk.............',
    '..............kLLLkLnnnnnnnnnLkLLLk.............',
    '..............kLLLkLLLLLLLLLLLkLLLk.............',
    '..............kLLLkLnnnnnnnnnLkLLLk.............',
    '..............kLLLkLLLLLLLLLLLkLLLk.............',
    '..............kLLLkLnnnnnnnnnLkLLLk.............',
    '..............kLLLLLLLLLLLLLLLLLLLk.............',
    '..............kLLLLQQQQQQQLLLLLLLLk.............',
    '..............kLLLLQQQQQQQLLLLLLLLk.............',
    '..............kLLLLQQQQQQQLLLLLLLLk.............',
    '..............kLLLLLQQQQQLLLLLLLLLk.............',
    '..............kLLLLLLLLLLLLLLLLLLLk.............',
    '..............kLLLLLLLLLLLLLLLLLLLk.............',
    '..............kLLLNLLLLLLLLLLLNLLLk.............',
    '.............kLQLLLNNLLLLLLLNNLQLLLk............',
    '............kLQQQLLLNNNNNNNNNLQQQLLLk...........',
    '............kLQQQLLLNNNNNNNNNLQQQLLLk...........',
    '............kLQQQLLLNkkNkkNLLLQQQLLLk...........',
    '............kLLQLLLLLk.k..kLLLLQLLLLk...........',
    '............kLLLLLLLLk....kLLLLLLLLLk...........',
    '.............kLLLLLLLk....kLLkLLLLLk............',
    '.............kwLwLwLLk....kLLkwLwLwk............',
    '.............kwkwkwLLk....kLLkwkwkwk............',
    '.............kwkwkwLLk....kLLkwkwkwk............',
    '..............k.kkkLLk....kLLkk.k.k.............',
    '................kLLLLk....kLLLLk................',
    '.................kkkk......kkkk.................',
  ],
  kongkoi: [
    '................................',
    '................................',
    '................................',
    '................................',
    '.............NNNNNN.............',
    '..........NNNNNNNNNNNN..........',
    '.........NNNNNNNNNNNNNN.........',
    '........NNNNLNNNNNNNNNNN........',
    '........NNNnLnnnnnnnnNNN........',
    '........NNnLnnnnnnnnnnNN........',
    '........NnnweennnneewnnN........',
    '........NnnneennnneennnN........',
    '........NnnnnnnnnnnnnnnN........',
    '........NnnnnmmmmmmnnnnN........',
    '........NNnnnmwnnwmnnnNN........',
    '........NNNnnmmmmmmnnNNN........',
    '........NNNNnnnnnnnNNNNN........',
    '.............NnnnnN.............',
    '........NNNLnnnnnnnnnNNN........',
    '.......NLnNNLnnnnnnnNNnLN.......',
    '.......NLn.NLnnnnnnnN.nLN.......',
    '.......NLn.NLnnnnnnnN.nLN.......',
    '.......Nn..NLnnnnnnnN..nN.......',
    '.......Nn...NLnnnnnN...nN.......',
    '.......ww....NLnnnN....ww.......',
    '.......w.....NLnnnN.....w.......',
    '..............NLnN..............',
    '..............NLnN..............',
    '..............NLnN..............',
    '..............NLnN..............',
    '..............NnnN..............',
    '.............NNLnNN.............',
  ],
  kongkoi_idle2: [
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '.............NNNNNN.............',
    '..........NNNNNNNNNNNN..........',
    '.........NNNNNNNNNNNNNN.........',
    '........NNNNLNNNNNNNNNNN........',
    '........NNNnLnnnnnnnnNNN........',
    '........NNnLnnnnnnnnnnNN........',
    '........NnnweennnneewnnN........',
    '........NnnneennnneennnN........',
    '........NnnnnnnnnnnnnnnN........',
    '........NnnnnmmmmmmnnnnN........',
    '........NNnnnmwnnwmnnnNN........',
    '........NNNnnmmmmmmnnNNN........',
    '........NNNNnnnnnnnNNNNN........',
    '.............NnnnnN.............',
    '........NNNLnnnnnnnnnNNN........',
    '.......NLnNNLnnnnnnnNNnLN.......',
    '.......NLn.NLnnnnnnnN.nLN.......',
    '.......NLn.NLnnnnnnnN.nLN.......',
    '.......Nn..NLnnnnnnnN..nN.......',
    '.......Nn...NLnnnnnN...nN.......',
    '.......ww....NLnnnN....ww.......',
    '.......w.....NLnnnN.....w.......',
    '..............NLnN..............',
    '..............NLnN..............',
    '..............NLnN..............',
    '..............NnnN..............',
    '.............NNLnNN.............',
  ],
  kongkoi_wind: [
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '.............NNNNNN.............',
    '..........NNNNNNNNNNNN..........',
    '.........NNNNNNNNNNNNNN.........',
    '........NNNNLNNNNNNNNNNN........',
    '........NNNnLnnnnnnnnNNN........',
    '........NNnLnnnnnnnnnnNN........',
    '........NnnweennnneewnnN........',
    '........NnnneennnneennnN........',
    '........NnnnnnnnnnnnnnnN........',
    '........NnnnnmmmmmmnnnnN........',
    '........NNnnnmwnnwmnnnNN........',
    '........NNNnnmmmmmmnnNNN........',
    '........NNNNnnnnnnnNNNNN........',
    '.............NnnnnN.............',
    '......ww.NNLnnnnnnnnnNN.ww......',
    '.......NnNNLnnnnnnnnNNnN........',
    '.......NLnNLnnnnnnnnNnLN........',
    '...........NLnnnnnnnN...........',
    '.............NLnnnN.............',
    '.............NLnnnN.............',
    '..............NLnN..............',
    '..............NLnN..............',
    '..............NnnN..............',
    '.............NNLnNN.............',
  ],
  kongkoi_atk: [
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '.............NNNNNN.............',
    '..........NNNNNNNNNNNN..........',
    '.........NNNNNNNNNNNNNN.........',
    '........NNNNLNNNNNNNNNNN........',
    '........NNNnLnnnnnnnnNNN........',
    '........NNnLnnnnnnnnnnNN........',
    '........NnnweennnneewnnN........',
    '........NnnneennnneennnN........',
    '........NnnnmmmmmmmmnnnN........',
    '........NnnnmwmmmmwmnnnN........',
    '........NNnnmmmmmmmmnnNN........',
    '........NNNnnmwmmwmnnNNN........',
    '........NNNNnnnnnnnNNNNN........',
    '.............NnnnnN.............',
    '.....wwNNNNLnnnnnnnnnNNNNww.....',
    '.....wLLLLnNLnnnnnnnNnLLLLw.....',
    '...........NLnnnnnnnN...........',
    '...........NLnnnnnN.............',
    '.............NLnnnN.............',
    '.............NLnnnN.............',
    '..............NLnN..............',
    '..............NLnN..............',
    '..............NLnN..............',
    '..............NnnN..............',
    '.............NNLnNN.............',
  ],
  kongkoi_cheer: [
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '.............NNNNNN.............',
    '..........NNNNNNNNNNNN..........',
    '......w..NNNNNNNNNNNNNN..w......',
    '.....Nn.NNNNLNNNNNNNNNNN.nN.....',
    '.....Nn.NNNnLnnnnnnnnNNN.nN.....',
    '.....Nn.NNnLnnnnnnnnnnNN.nN.....',
    '.....Nn.NnnweennnneewnnN.nN.....',
    '.....Nn.NnnneennnneennnN.nN.....',
    '.....Nn.NnnnmmmmmmmmnnnN.nN.....',
    '.....Nn.NnnnmwmmmmwmnnnN.nN.....',
    '........NNnnmmmmmmmmnnNN........',
    '........NNNnnmwmmwmnnNNN........',
    '........NNNNnnnnnnnNNNNN........',
    '.............NnnnnN.............',
    '........NNNLnnnnnnnnnNNN........',
    '..........NNLnnnnnnnNN..........',
    '...........NLnnnnnnnN...........',
    '............NLnnnnnN............',
    '.............NLnnnN.............',
    '..............NLnN..............',
    '..............NLnN..............',
    '..............NLnN..............',
    '..............NLnN..............',
    '..............NnnN..............',
    '.............NNLnNN.............',
  ],
  krasue: [
    '................................',
    '..........KKKKHKKKKHKK..........',
    '........HKKKKHKKKKHKKKKH........',
    '.......HKKKKHKKKKHKKKKHKK.......',
    '......HKKKKHKKKKHKKKKHKKKK......',
    '.....HKKKKHKKKKHKKKKHKKKKHK.....',
    '....HKKKKHKKKKKKKKKKKKKKHKKK....',
    '...HKKKKHKKKKKKKKKKKKKKHKKKKH...',
    '...KKKKHKKQQKQQKQQKSSKHKKKKHK...',
    '...KKKHKKKQQQQQQQQSSSSKKKKHKK...',
    '...KKHKKKQQQQQQQQQSSSSSKKHKKK...',
    '...KHKKKKQQQQQQQQQSSSSSKHKKKK...',
    '...HKKKKHQQweeQQQQeewSSHKKKKH...',
    '...KKKKHKQQQmQQQQQSmSSSKKKKHK...',
    '...KKKHKKQQQQQQQQQSSSSSKKKHKK...',
    '...KKHKKKQQQQQQQQQSSSSSKKHKKK...',
    '...KHKKKKHQQQQQQQQSSSSKKHKKKK...',
    '....KKKKHKQQQmmmmmmSSSKHKKKKH...',
    '....KKKHKKKQQQQmmQSSSKHKKKK.....',
    '....KK.KKKKHQQQQQQSSKHKKKKHK....',
    '....KHKKKKHKKKQQQQKKHKKKKHKK....',
    '....HKKKK.KKrRRrRRrRKK.KHKK.....',
    '....KK.KH...RRrRRrRR...H.KKK....',
    '....KKKHK..p..R..R..R..KKKKH....',
    '....KKHK...r..p..p..r...KKH.....',
    '.....H.K....r..r.r...p...HK.....',
    '.....KKK....R.R.R....R..HKK.....',
    '............pr.r....r...........',
    '............p..p...r............',
    '...........R....R.p.............',
    '...........r.....r..............',
    '.................r.r............',
  ],
  krasue_idle2: [
    '................................',
    '..........KKKKHKKKKHKK..........',
    '........HKKKKHKKKKHKKKKH........',
    '.......HKKKKHKKKKHKKKKHKK.......',
    '......HKKKKHKKKKHKKKKHKKKK......',
    '.....HKKKKHKKKKHKKKKHKKKKHK.....',
    '....HKKKKHKKKKKKKKKKKKKKHKKK....',
    '...HKKKKHKKKKKKKKKKKKKKHKKKKH...',
    '...KKKKHKKQQKQQKQQKSSKHKKKKHK...',
    '...KKKHKKKQQQQQQQQSSSSKKKKHKK...',
    '...KKHKKKQQQQQQQQQSSSSSKKHKKK...',
    '...KHKKKKQQQQQQQQQSSSSSKHKKKK...',
    '...HKKKKHQQweeQQQQeewSSHKKKKH...',
    '...KKKKHKQQQmQQQQQSmSSSKKKKHK...',
    '...KKKHKKQQQQQQQQQSSSSSKKKHKK...',
    '...KKHKKKQQQQQQQQQSSSSSKKHKKK...',
    '...KHKKKKHQQQQQQQQSSSSKKHKKKK...',
    '....KKKKHKQQQmmmmmmSSSKHKKKKH...',
    '....KKKHKKKQQQQmmQSSSKHKKKK.....',
    '....KK.KKKKHQQQQQQSSKHKKKKHK....',
    '....KHKKKKHKKKQQQQKKHKKKKHKK....',
    '....HKKKK.KKrRRrRRrRKK.KHKK.....',
    '....KK.KH...RRrRRrRR...H.KKK....',
    '....KKKHK..p..R..R..R..KKKKH....',
    '....KKHK...r..p..p..r...KKH.....',
    '.....H.K...r.r..r...p....HK.....',
    '.....KKK...R.R..R..R....HKK.....',
    '..........p.r....rr.............',
    '.........r...p....r.............',
    '........R.....R...pR............',
    '...............r....r...........',
    '....................rr..........',
  ],
  krasue_wind: [
    '................................',
    '..........KKKKHKKKKHKK..........',
    '........HKKKKHKKKKHKKKKH........',
    '.......HKKKKHKKKKHKKKKHKK.......',
    '......HKKKKHKKKKHKKKKHKKKK......',
    '.....HKKKKHKKKKHKKKKHKKKKHK.....',
    '....HKKKKHKKKKKKKKKKKKKKHKKK....',
    '...HKKKKHKKKKKKKKKKKKKKHKKKKH...',
    '...KKKKHKKQQKQQKQQKSSKHKKKKHK...',
    '...KKKHKKQQQQQQQQQSSSSSKKKHKK...',
    '...KKHKKKQQQQQQQQQSSSSSKKHKKK...',
    '...KHKKKQQQQQQQQQQSSSSSSHKKKK...',
    '...HKKKKQQQeeeQQQQeeeSSSKKKKH...',
    '...KKKKHQQQQQQQQQQSSSSSSKKKHK...',
    '...KKKHKQQQQQQQQQQSSSSSSKKHKK...',
    '...KKHKKKQQQQQQQQQSSSSSKKHKKK...',
    '...KHKKKKQQQQQQQQQSSSSSKHKKKK...',
    '....KKKKHKQQQQQRRQSSSSKHKKKKH...',
    '....KKKHKKQQQQQQQQSSSSHKKKK.....',
    '....KK.KKKKQQQQQQQSSSHKKKKHK....',
    '....KHKKKKHKKQQQQQSKHKKKKHKK....',
    '....HKKKK.KKrRRrRRrRKK.KHKK.....',
    '....KK.KH...RRrRRrRR...H.KKK....',
    '....KKKHK..p..R..R..R..KKKKH....',
    '....KKHK...r..p..p..r...KKH.....',
    '.....H.K....r.r.r...p....HK.....',
    '.....KKK....RR..R...R...HKK.....',
    '...........pr...r..r............',
    '..........r.p...p.r.............',
    '.........R..R....pR.............',
    '.............r...r.r............',
    '...................rr...........',
  ],
  krasue_atk: [
    '................................',
    '..........KKKKHKKKKHKK..........',
    '........HKKKKHKKKKHKKKKH........',
    '.......HKKKKHKKKKHKKKKHKK.......',
    '......HKKKKHKKKKHKKKKHKKKK......',
    '.....HKKKKHKKKKHKKKKHKKKKHK.....',
    '....HKKKKHKKKKKKKKKKKKKKHKKK....',
    '...HKKKKHKKKKKKKKKKKKKKHKKKKH...',
    '...KKKKHKKQQKQQKQQKSSKHKKKKHK...',
    '...KKKHKKKQQQQQQQQSSSSKKKKHKK...',
    '...KKHKKKQQQQQQQQQSSSSSKKHKKK...',
    '...KHKKKKQQQQQQQQQSSSSSKHKKKK...',
    '...HKKKKHQQweeQQQQeewSSHKKKKH...',
    '...KKKKHKQQQmQQQQQSmSSSKKKKHK...',
    '...KKKHKKQQQQQQQQQSSSSSKKKHKK...',
    '...KKHKKKQQQRRRRRRRRSSSKKHKKK...',
    '...KHKKKKHQQmwmmmmwmSSKKHKKKK...',
    '....KKKKHKQQmmmmmmmmSSKHKKKKH...',
    '....KKKHKKKQmmmmmmmmSKHKKKK.....',
    '....KK.KKKKHmwmmmmwmKHKKKKHK....',
    '....KHKKKKHKRRRRRRRRHKKKKHKK....',
    '....HKKKK.KKrRRrRRrRKK.KHKK.....',
    '....KK.KH...RRrRRrRR...H.KKK....',
    '....KKKHK..p..R..R..R..KKKKH....',
    '....KKHK...r..p..p..r...KKH.....',
    '.....H.K....r.r.r....p...HK.....',
    '.....KKK....R.R.R....R..HKK.....',
    '............pr.r....r...........',
    '...........rp..p...r............',
    '..........RR....R.p.............',
    '............r....rr.............',
    '.................r..r...........',
  ],
  // a fallen retainer's spirit, hovering above them (not gone, only out)
  fx_soul: [
    '................',
    '......wwww......',
    '.....wwwwww.....',
    '....wwvvvvww....',
    '....wvvbbvvw....',
    '....wvbbbbvw....',
    '....wvvbbvvw....',
    '.....wvvvvw.....',
    '......wvvw......',
    '.......wvw......',
    '........vw......',
    '.......vw.......',
    '......vv........',
    '.......v........',
    '................',
    '................',
  ],
  // map nodes (16x16)
  node_shrine: [
    '................',
    '.......gg.......',
    '......kggk......',
    '.....kkkkkk.....',
    '....kkkkkkkk....',
    '...kkkkkkkkkk...',
    '..yggggggggggy..',
    '....oo....oo....',
    '....oo.yy.oo....',
    '....oo.yy.oo....',
    '....oo....oo....',
    '..oooooooooooo..',
    '..llllllllllll..',
    '................',
    '................',
    '................',
  ],
  node_forest: [
    '................',
    '.....N......N...',
    '....NnN....NnN..',
    '...NnnnN..NnnnN.',
    '...NNnNN..NNnNN.',
    '..NnnnnnNNnnnnnN',
    '..NNNnNNNNNNnNNN',
    '.NnnnnnnNnnnnnnN',
    '.NNNNnNNNNNNnNNN',
    '.....o.....o....',
    '.....o.....o....',
    '..N..o..N..o....',
    '.NnN.o.NnN.o....',
    '.NNN...NNN......',
    '..o.....o.......',
    '................',
  ],
  node_village: [
    '................',
    '......kkkk......',
    '.....kkkkkk.....',
    '....kkkkkkkk....',
    '...kkkkkkkkkk...',
    '..kkkkkkkkkkkk..',
    '...oooooooooo...',
    '...oaaooooaao...',
    '...oaaooooaao...',
    '...oooooooooo...',
    '...l..l..l..l...',
    '...l..l..l..l...',
    '...l..l..l..l...',
    '................',
    '......p.........',
    '.....ppp........',
  ],
  node_lock: [
    '................',
    '.....aaaaaa.....',
    '....a......a....',
    '....a......a....',
    '....a......a....',
    '..aaaaaaaaaaaa..',
    '..avvvvvvvvvva..',
    '..avvvvkkvvvva..',
    '..avvvvkkvvvva..',
    '..avvvvvkvvvva..',
    '..avvvvvkvvvva..',
    '..avvvvvvvvvva..',
    '..aaaaaaaaaaaa..',
    '................',
    '................',
    '................',
  ],
  // ผู้สืบทอดวิชา — the hero: the master's young disciple, in white, carrying the master's lantern
  heir: [
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '.............kkkkkk.............',
    '............kkkkkkkk............',
    '...........kkkkkkkkkk...........',
    '...........kksssssskk...........',
    '...........kssssssssk...........',
    '...........sskksskkss...........',
    '...........ssssssssss...........',
    '...........ssssmmssss...........',
    '............oossssoo............',
    '..............ssss..............',
    '........o..wwwwwwwwww...........',
    '........o.wwwwwwwwwwww..........',
    '.......ooowvwwwwwwwwvw..........',
    '......ogyyovwwwwwwwwvw..........',
    '......oyyyovwwwwwwwwvs..........',
    '......ogyyo.rrrrrrrr.s..........',
    '.......ooo..wwwwwwww............',
    '............wvwwwwvw............',
    '............wwwvvwww............',
    '............www..www............',
    '............ww....ww............',
    '............ww....ww............',
    '............oo....oo............',
  ],
  heir_idle2: [
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '.............kkkkkk.............',
    '............kkkkkkkk............',
    '...........kkkkkkkkkk...........',
    '...........kksssssskk...........',
    '...........kssssssssk...........',
    '...........sskksskkss...........',
    '...........ssssssssss...........',
    '...........ssssmmssss...........',
    '............oossssoo............',
    '..............ssss..............',
    '........o..wwwwwwwwww...........',
    '........o.wwwwwwwwwwww..........',
    '.......ooowvwwwwwwwwvw..........',
    '......ogyyovwwwwwwwwvw..........',
    '......oyyyovwwwwwwwwvs..........',
    '......ogyyo.rrrrrrrr.s..........',
    '.......ooo..wwwwwwww............',
    '............wvwwwwvw............',
    '............wwwvvwww............',
    '............ww....ww............',
    '............ww....ww............',
    '............oo....oo............',
  ],
  heir_walk1: [
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '.............kkkkkk.............',
    '............kkkkkkkk............',
    '...........kkkkkkkkkk...........',
    '...........kksssssskk...........',
    '...........kssssssssk...........',
    '...........sskksskkss...........',
    '...........ssssssssss...........',
    '...........ssssmmssss...........',
    '............oossssoo............',
    '........o.....ssss..............',
    '........o..wwwwwwwwww...........',
    '.......ooowwwwwwwwwwww..........',
    '......ogyyovwwwwwwwwvw..........',
    '......oyyyovwwwwwwwwvw..........',
    '......ogyyovwwwwwwwwvs..........',
    '.......ooos.rrrrrrrr.s..........',
    '............wwwwwwww............',
    '............wvwwwwvw............',
    '............wwwvvwww............',
    '............ww....ww............',
    '............ww.....ww...........',
    '............oo.....oo...........',
  ],
  heir_walk2: [
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '.............kkkkkk.............',
    '............kkkkkkkk............',
    '...........kkkkkkkkkk...........',
    '...........kksssssskk...........',
    '...........kssssssssk...........',
    '...........sskksskkss...........',
    '...........ssssssssss...........',
    '...........ssssmmssss...........',
    '............oossssoo............',
    '........o.....ssss..............',
    '........o..wwwwwwwwww...........',
    '.......ooowwwwwwwwwwww..........',
    '......ogyyovwwwwwwwwvw..........',
    '......oyyyovwwwwwwwwvw..........',
    '......ogyyovwwwwwwwwvs..........',
    '.......ooos.rrrrrrrr.s..........',
    '............wwwwwwww............',
    '............wvwwwwvw............',
    '............wwwvvwww............',
    '............ww....ww............',
    '...........ww....ww.............',
    '...........oo....oo.............',
  ],
  // บทที่ ๒: ผีพราย, ผีโขมด (also a retainer), นาค
  phrai: [
    '................................',
    '................................',
    '.............KHKKKH.............',
    '...........KKHKKKHKKK...........',
    '..........KKHKKKHKKKHK..........',
    '.........KKHKKKHKKKHKKK.........',
    '........KKHKKKHKKKHKKKHK........',
    '........KHKKKKKKKKKKKHKK........',
    '........HKKKZZZZZYYYHKKK........',
    '.......KKHKZZZZZZYYYYKKKH.......',
    '.......KHKHZkJZZZYJkYKKHK.......',
    '.......HKKKZZZZZZYYYYHHKK.......',
    '.......KKHKZZZZZZYYYYKKKH.......',
    '.......KHKKZZZZZZYYYYKKHK.......',
    '.......HKKHKZZRRRRYYKKHKK.......',
    '.......KKH.KZZZZZYYYK.KKH.......',
    '.......KHK...ZZZZYY...KHK.......',
    '.......HKK...vvvvYY...HKK.......',
    '.......KKHZ..vvvvYY..ZKKH.......',
    '.......KHKZ.vvvvvYYY.ZKHK.......',
    '.......HKKZ.vvvvvYYY.ZHKK.......',
    '.......KKHZvvvvvvYYYYZKKH.......',
    '.......KHKZvvvvvvYYYYZKHK.......',
    '..........ZvvvvvvYYYYZ..........',
    '..........ZvvvvvvYYYYZ..........',
    '...JIUIIUIIJJIUIIUIIJJIUIIUII...',
    '...IUIIUIJJJIUIIUIJJJIUIIUIJJ...',
    '..IUIIUIJJIIUIIUIJJIIUIIUIJJII..',
    '..UIIUIIUIIUIIUIIUIIUIIUIIUIIU..',
    '..IIUIIUIIUIIUIIUIIUIIUIIUIIUI..',
    '.IIUIIUIIUIIUIIUIIUIIUIIUIIUIIU.',
    '.IUIIUIIUIIUIIUIIUIIUIIUIIUIIUI.',
  ],
  phrai_idle2: [
    '................................',
    '................................',
    '.............KHKKKH.............',
    '...........KKHKKKHKKK...........',
    '..........KKHKKKHKKKHK..........',
    '.........KKHKKKHKKKHKKK.........',
    '........KKHKKKHKKKHKKKHK........',
    '........KHKKKKKKKKKKKHKK........',
    '........HKKKZZZZZYYYHKKK........',
    '.......KKHKZZZZZZYYYYKKKH.......',
    '.......KHKHZkJZZZYJkYKKHK.......',
    '.......HKKKZZZZZZYYYYHHKK.......',
    '.......KKHKZZZZZZYYYYKKKH.......',
    '.......KHKKZZZZZZYYYYKKHK.......',
    '.......HKKHKZZRRRRYYKKHKK.......',
    '.......KKH.KZZZZZYYYK.KKH.......',
    '.......KHK...ZZZZYY...KHK.......',
    '.......HKK...vvvvYY...HKK.......',
    '.......KKHZ..vvvvYY..ZKKH.......',
    '.......KHKZ.vvvvvYYY.ZKHK.......',
    '.......HKKZ.vvvvvYYY.ZHKK.......',
    '.......KKHZvvvvvvYYYYZKKH.......',
    '.......KHKZvvvvvvYYYYZKHK.......',
    '..........ZvvvvvvYYYYZ..........',
    '..........ZvvvvvvYYYYZ..........',
    '...IIUIIJJJUIIUIIJJJUIIUIIJJJ...',
    '...IUIIJJJUIIUIIJJIUIIUIIJJIU...',
    '..IUIJJJIUIIUIJJJIUIIUIJJJIUII..',
    '..UIIUIIUIIUIIUIIUIIUIIUIIUIIU..',
    '..IIUIIUIIUIIUIIUIIUIIUIIUIIUI..',
    '.IIUIIUIIUIIUIIUIIUIIUIIUIIUIIU.',
    '.IUIIUIIUIIUIIUIIUIIUIIUIIUIIUI.',
  ],
  phrai_wind: [
    '................................',
    '................................',
    '................................',
    '.............HKKKHK.............',
    '...........KHKKKHKKKH...........',
    '..........KHKKKHKKKHKK..........',
    '.........KHKKKHKKKHKKKH.........',
    '........KHKKKHKKKHKKKHKK........',
    '........HKKKKKKKKKKKHKKK........',
    '........KKKHZZZZZYYYKKKH........',
    '.......KHKHZZZZZZYYYYKKHK.......',
    '.......wKKKZkkZZZYkkYHHKw.......',
    '.......ZKHKZZZZZZYYYYKKKZ.......',
    '.......ZHKKZZZZZZYYYYKKHZ.......',
    '.......ZKKHZZZZZZYYYYKHKZ.......',
    '.......ZKHKKZZRRRRYYKHKKZ.......',
    '.......ZHK.KZZZZZYYYH.KHZ.......',
    '.......ZKK...ZZZZYY...HKZ.......',
    '.......ZKH...vvvvYY...KKZ.......',
    '.......ZHK...vvvvYY...KHZ.......',
    '.......HKK..vvvvvYYY..HKK.......',
    '.......KKH..vvvvvYYY..KKH.......',
    '.......KHK.vvvvvvYYYY.KHK.......',
    '...........vvvvvvYYYY...........',
    '..........vvvvvvvYYYYY..........',
    '...IIUIIUJJJIIUIIUJJJIIUIIUJJ...',
    '...IUIIUJJJIIUIIUJJJIIUIIUJJJ...',
    '..IUIIUJJUIIUIIUJJUIIUIIUJJUII..',
    '..UIIUIIUIIUIIUIIUIIUIIUIIUIIU..',
    '..IIUIIUIIUIIUIIUIIUIIUIIUIIUI..',
    '.IIUIIUIIUIIUIIUIIUIIUIIUIIUIIU.',
    '.IUIIUIIUIIUIIUIIUIIUIIUIIUIIUI.',
  ],
  phrai_atk: [
    '................................',
    '................................',
    '.............KHKKKH.............',
    '...........KKHKKKHKKK...........',
    '..........KKHKKKHKKKHK..........',
    '.........KKHKKKHKKKHKKK.........',
    '........KKHKKKHKKKHKKKHK........',
    '........KHKKKKKKKKKKKHKK........',
    '........HKKKZZZZZYYYHKKK........',
    '.......KKHKZZZZZZYYYYKKKH.......',
    '.......KHKHZkJZZZYJkYKKHK.......',
    '.......HKKKZZZZZZYYYYHHKK.......',
    '.......KKHKZZZZZZYYYYKKKH.......',
    '.......KHKKZZZkkkkYYYKKHK.......',
    '.......HKKHKZZkkkkYYKKHKK.......',
    '.......KKH.KZZZZZYYYK.KKH.......',
    '.......KHK...ZZZZYY...KHK.......',
    '.......HKK...vvvvYY...HKK.......',
    '..w....KKH...vvvvYY...KKH....w..',
    '...ZZZZZZZZ.vvvvvYYY.ZZZZZZZZ...',
    '..w....HKK..vvvvvYYY..HKK....w..',
    '.......KKH.vvvvvvYYYY.KKH.......',
    '.......KHK.vvvvvvYYYY.KHK.......',
    '..........vvvvvvvYYYYY..........',
    '..........vvvvvvvYYYYY..........',
    '...JIUIIUIJJJIUIIUIJJJIUIIUIJ...',
    '...IUIIUIJJIIUIIUIJJIIUIIUIJJ...',
    '..IUIIUJJJIIUIIUJJJIIUIIUJJJII..',
    '..UIIUIIUIIUIIUIIUIIUIIUIIUIIU..',
    '..IIUIIUIIUIIUIIUIIUIIUIIUIIUI..',
    '.IIUIIUIIUIIUIIUIIUIIUIIUIIUIIU.',
    '.IUIIUIIUIIUIIUIIUIIUIIUIIUIIUI.',
  ],
  khamot: [
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '..........OO.....OO.............',
    '.........OOO....OOO....O........',
    '.........OOOO...OOOO...O........',
    '........OOOOO..OOOOO..OO........',
    '........OOOOOOOOOOOOOOOO........',
    '........OOOOOOOOOOOOOOOO........',
    '........OOOOOOPPPPOOOOOO........',
    '........OOOOPPPPPPPPOOOO........',
    '........OOOPPyyyyyyPPOOO........',
    '........OOPPyyyyyyyyPPOO........',
    '........OOPyyyywwyyyyPOO........',
    '........OOPykkwwwwkkyPOO........',
    '........OPPykkwwwwkkyPPO........',
    '........OOPyyywwwwyyyPOO........',
    '........OOPyyyywwyyyyPOO........',
    '.........OPPyyyOOyyyPPO.........',
    '.........OOPPyyyyyyPPOO.........',
    '..........OOPPPPPPPPOO..........',
    '...........OOOPPPPOOO...........',
    '.............OOOOOO.............',
    '................................',
    '................................',
    '......................P.........',
    '............P...................',
    '................................',
    '................................',
    '...............P................',
  ],
  khamot_idle2: [
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '........OO.....OO.....OO........',
    '........OO....OOO....OOO........',
    '........OOO...OOOO...OOO........',
    '........OOO..OOOOO..OOOO........',
    '........OOOOOOOOOOOOOOOO........',
    '........OOOOOOOOOOOOOOOO........',
    '........OOOOOOPPPPOOOOOO........',
    '........OOOOPPPPPPPPOOOO........',
    '........OOOPPyyyyyyPPOOO........',
    '........OOPPyyyyyyyyPPOO........',
    '........OOPyyyywwyyyyPOO........',
    '........OOPykkwwwwkkyPOO........',
    '........OPPykkwwwwkkyPPO........',
    '........OOPyyywwwwyyyPOO........',
    '........OOPyyyywwyyyyPOO........',
    '.........OPPyyyOOyyyPPO.........',
    '.........OOPPyyyyyyPPOO.........',
    '..........OOPPPPPPPPOO..........',
    '...........OOOPPPPOOO...........',
    '.............OOOOOO.............',
    '................................',
    '.........P......................',
    '................................',
    '................................',
    '...................P............',
    '................................',
    '................................',
  ],
  khamot_wind: [
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '..........O.....OO..............',
    '..........O.....OO..............',
    '..........OO...OOOO.............',
    '..........OO...OOOO.............',
    '..........OOO.OOOOOO.O..........',
    '..........OOOOOOOOOOOO..........',
    '..........OOOOOOOOOOOO..........',
    '..........OOOPPPPPPOOO..........',
    '..........OOPyyyyyyPOO..........',
    '..........OPyyyyyyyyPO..........',
    '..........OPOOwwwwOOPO..........',
    '..........OPyywwwwyyPO..........',
    '..........OPyywwwwyyPO..........',
    '..........OPyyyyyyyyPO..........',
    '..........OOPyyOOyyPOO..........',
    '...........OOPPPPPPOO...........',
    '............OOOOOOOO............',
    '..............OOOO..............',
    '................................',
    '................................',
    '.........P......................',
    '................................',
    '................................',
    '...................P............',
    '................................',
    '................................',
  ],
  khamot_atk: [
    '................................',
    '................................',
    '................................',
    '.........OO.....OO.....OO.......',
    '.........OOO....OOO....OOO......',
    '........OOOO...OOOO...OOOO......',
    '........OOOOO..OOOOO..OOOO......',
    '......OOOOOOOOOOOOOOOOOOOO......',
    '......OOOOOOOOOOOOOOOOOOOO......',
    '......OOOOOOOOOPPOOOOOOOOO......',
    '......OOOOOOPPPPPPPPOOOOOO......',
    '......OOOOPPPPyyyyPPPPOOOO......',
    '......OOOPPPyyyyyyyyPPPOOO......',
    '......OOOPPyyyyyyyyyyPPOOO......',
    '......OOPPyyyyyyyyyyyyPPOO......',
    '......OOPPyyyywwwwyyyyPPOO......',
    '......OOPPyykkwwwwkkyyPPOO......',
    '......OPPyyykkwwwwkkyyyPPO......',
    '......OOPPyyywwwwwwyyyPPOO......',
    '......OOPPyyyywwwwyyyyPPOO......',
    '.......OPPyyyyOOOOyyyyPPO.......',
    '.......OOPPyyyOOOOyyyPPOO.......',
    '.......OOPPPyyyyyyyyPPPOO.......',
    '........OOPPPPyyyyPPPPOO........',
    '.........OOOPPPPPPPPOOO.........',
    '...........OOOOPPOOOO...........',
    '.............OOOOOO.............',
    '......................P.........',
    '............P...................',
    '................................',
    '................................',
    '...............P................',
  ],
  khamot_cheer: [
    '................................',
    '................................',
    '................................',
    '.........OO.....OO.....OO.......',
    '........OOO....OOO....OOO.......',
    '........OOOO...OOOO...OOOO......',
    '.......OOOOO..OOOOO..OOOOO......',
    '......OOOOOOOOOOOOOOOOOOOO......',
    '......OOOOOOOOOOOOOOOOOOOO......',
    '......OOOOOOOOOPPOOOOOOOOO......',
    '......OOOOOOPPPPPPPPOOOOOO......',
    '......OOOOPPPPyyyyPPPPOOOO......',
    '......OOOPPPyyyyyyyyPPPOOO......',
    '......OOOPPyyyyyyyyyyPPOOO......',
    '......OOPPyyyyyyyyyyyyPPOO......',
    '......OOPPyyyOwwwwOyyyPPOO......',
    '......OOPPyyOwOwwOwOyyPPOO......',
    '......OPPyyyywwwwwwyyyyPPO......',
    '......OOPPyyywwwwwwyyyPPOO......',
    '......OOPPyyyywwwwyyyyPPOO......',
    '.......OPPyyyyOOOOyyyyPPO.......',
    '.......OOPPyyyyyyyyyyPPOO.......',
    '.......OOPPPyyyyyyyyPPPOO.......',
    '........OOPPPPyyyyPPPPOO........',
    '.........OOOPPPPPPPPOOO.........',
    '...........OOOOPPOOOO...........',
    '.............OOOOOO.............',
    '......................P.........',
    '............P...................',
    '................................',
    '................................',
    '...............P................',
  ],
  naga: [
    '................................',
    '............g...g...g...........',
    '..........g.g.g.g.g.g...........',
    '..........T.T.T.T.T.T...........',
    '..........TgTgTGTGTgTg..........',
    '............GGGGGGGG............',
    '...........GGGGGGGGGG...........',
    '..........GGeGGGGGGeGG..........',
    '..........GGGGGGGGGGGG..........',
    '..........EEEEEEEEEEEE..........',
    '...........EEFFFFFFEE...........',
    '............EEEEeEEE............',
    '.............GEeEeGT............',
    '...............GGGGGGT..........',
    '...............GGGGGGT..........',
    '................GGGGGGT.........',
    '................GGGGGGT.........',
    '................GGGGGGT.........',
    '...............GGGGGGT..........',
    '..............GGGGGGT...........',
    '............GGGGGGT.............',
    '..........GGGGGGGTGFGG..........',
    '.......GFGGGGFGGGGFGGGGFG.......',
    '.....GGFGGGGFGGGGFGGGGFGGGG.....',
    '.....GFGGGGFGGGGFGGGGFGGGGF.....',
    '.....FGGGGFGGGGFGGGGFGGGGFG.....',
    '....FGTTTTTTTTTTTTTTTTTTTGGG....',
    '..GFGGGGFGGGGFGGGGFGGGGFGGGGFG..',
    '..FGGGGFGGGGFGGGGFGGGGFGGGGFGG..',
    '..GGGGFGGGGFGGGGFGGGGFGGGGFGGG..',
    '....GFGGGGFGGGGFGGGGFGGGGFGG....',
    '.......TTTTTTTTTTTTTTTTTT.......',
  ],
  naga_idle2: [
    '................................',
    '............g...g...g...........',
    '..........g.g.g.g.g.g...........',
    '..........T.T.T.T.T.T...........',
    '..........TgTgTGTGTgTg..........',
    '............GGGGGGGG............',
    '...........GGGGGGGGGG...........',
    '..........GGeGGGGGGeGG..........',
    '..........GGGGGGGGGGGG..........',
    '..........EEEEEEEEEEEE..........',
    '...........EEFFFFFFEE...........',
    '............EEEEeEEET...........',
    '..............EeEeGGGT..........',
    '................GGGGGGT.........',
    '................GGGGGGT.........',
    '................GGGGGGT.........',
    '...............GGGGGGT..........',
    '..............GGGGGGT...........',
    '.............GGGGGGT............',
    '............GGGGGGT.............',
    '..........GGGGGGT...............',
    '.........GGGGGGTGGGFGG..........',
    '.......GFGGGGFGGGGFGGGGFG.......',
    '.....GGFGGGGFGGGGFGGGGFGGGG.....',
    '.....GFGGGGFGGGGFGGGGFGGGGF.....',
    '.....FGGGGFGGGGFGGGGFGGGGFG.....',
    '....FGTTTTTTTTTTTTTTTTTTTGGG....',
    '..GFGGGGFGGGGFGGGGFGGGGFGGGGFG..',
    '..FGGGGFGGGGFGGGGFGGGGFGGGGFGG..',
    '..GGGGFGGGGFGGGGFGGGGFGGGGFGGG..',
    '....GFGGGGFGGGGFGGGGFGGGGFGG....',
    '.......TTTTTTTTTTTTTTTTTT.......',
  ],
  naga_wind: [
    '................................',
    '................................',
    '................................',
    '................................',
    '............g...g...g...........',
    '..........g.g.g.g.g.g...........',
    '..........T.T.T.T.T.T...........',
    '..........TgTgTGTGTgTg..........',
    '............GGGGGGGG............',
    '...........GGGGGGGGGG...........',
    '..........GGeGGGGGGeGG..........',
    '..........GGGGGGGGGGGG..........',
    '..........EEEEEEEEEEEE..........',
    '...........EEEEEEEEEE...........',
    '............EEEEEEEE............',
    '..............EEEEGGGT..........',
    '................GGGGGGT.........',
    '................GGGGGGT.........',
    '...............GGGGGGT..........',
    '..............GGGGGGT...........',
    '............GGGGGGT.............',
    '..........GGGGGGGTGFGG..........',
    '.......GFGGGGFGGGGFGGGGFG.......',
    '.....GGFGGGGFGGGGFGGGGFGGGG.....',
    '.....GFGGGGFGGGGFGGGGFGGGGF.....',
    '.....FGGGGFGGGGFGGGGFGGGGFG.....',
    '....FGTTTTTTTTTTTTTTTTTTTGGG....',
    '..GFGGGGFGGGGFGGGGFGGGGFGGGGFG..',
    '..FGGGGFGGGGFGGGGFGGGGFGGGGFGG..',
    '..GGGGFGGGGFGGGGFGGGGFGGGGFGGG..',
    '....GFGGGGFGGGGFGGGGFGGGGFGG....',
    '.......TTTTTTTTTTTTTTTTTT.......',
  ],
  naga_atk: [
    '............g...g...g...........',
    '..........g.g.g.g.g.g...........',
    '..........T.T.T.T.T.T...........',
    '..........TgTgTGTGTgTg..........',
    '............GGGGGGGG............',
    '...........GGGGGGGGGG...........',
    '..........GGeGGGGGGeGG..........',
    '..........GGGGGGGGGGGG..........',
    '..........EEEEEEEEEEEE..........',
    '...........ERRRRRRRRE...........',
    '............mwmmmmwm............',
    '............mmmmmmmmT...........',
    '............mmmmmmmmGT..........',
    '...............GGGGGGT..........',
    '..............E.GGEGGGT.........',
    '................EGGGGGT.........',
    '...............EGGGGGGT.........',
    '...............GGGGGGT..........',
    '..............GGGGGGT...........',
    '.............GGGGGGT............',
    '............GGGGGGT.............',
    '..........GGGGGGTGGFGG..........',
    '.......GFGGGGFGGGGFGGGGFG.......',
    '.....GGFGGGGFGGGGFGGGGFGGGG.....',
    '.....GFGGGGFGGGGFGGGGFGGGGF.....',
    '.....FGGGGFGGGGFGGGGFGGGGFG.....',
    '....FGTTTTTTTTTTTTTTTTTTTGGG....',
    '..GFGGGGFGGGGFGGGGFGGGGFGGGGFG..',
    '..FGGGGFGGGGFGGGGFGGGGFGGGGFGG..',
    '..GGGGFGGGGFGGGGFGGGGFGGGGFGGG..',
    '....GFGGGGFGGGGFGGGGFGGGGFGG....',
    '.......TTTTTTTTTTTTTTTTTT.......',
  ],
  // chapter 2 icons and map nodes
  icon_drag: [
    '................',
    '......ZZ........',
    '.....ZZZZ.......',
    '.....Z.ZZ.......',
    '....ZZ.ZZ.......',
    '....ZZZZZ.......',
    '.....ZZZ........',
    '.....ZZZ........',
    '..J..ZZZ..J.....',
    '.JIJ.ZZZ.JIJ....',
    'JIIIJZZZJIIIJ...',
    'IIIIIIIIIIIIIJ..',
    'UIIJIIIIIJIIIIJ.',
    'UUIIIIJIIIIIJIIU',
    '.UUUIIIIIIIIIUU.',
    '...UUUUUUUUUU...',
  ],
  // auto battle: a play mark in a gold ring (second frame: light runs round the ring)
  icon_auto: [
    '.....kkkkkk.....',
    '...kkTTTTTTkk...',
    '..kTTkkkkkkTTk..',
    '.kTkk......kkTk.',
    '.kTk..kk.....kTk',
    'kTk...kwk....kTk',
    'kTk...kwwk...kTk',
    'kTk...kwwwk..kTk',
    'kTk...kwwwk..kTk',
    'kTk...kwwk...kTk',
    'kTk...kwk....kTk',
    '.kTk..kk....kTk.',
    '.kTkk......kkTk.',
    '..kTTkkkkkkTTk..',
    '...kkTTTTTTkk...',
    '.....kkkkkk.....',
  ],
  icon_auto2: [
    '.....kkkkkk.....',
    '...kkTTyyTTkk...',
    '..kTTkkkkkkTTk..',
    '.kTkk......kkTk.',
    '.kTk..kk.....kTk',
    'kTk...kwk....kyk',
    'kTk...kwwk...kyk',
    'kyk...kwwwk..kTk',
    'kyk...kwwwk..kTk',
    'kTk...kwwk...kTk',
    'kTk...kwk....kTk',
    '.kTk..kk....kTk.',
    '.kTkk......kkTk.',
    '..kTTkkkkkkTTk..',
    '...kkTTyyTTkk...',
    '.....kkkkkk.....',
  ],
  // speed: a swift feather
  icon_spd: [
    '................',
    '...........kkk..',
    '.........kkZZZk.',
    '........kZZJZZk.',
    '.......kZZJZZk..',
    '......kZZJZZZk..',
    '.....kZZJZZZk...',
    '....kZZJZZZk....',
    '....kZJZZZk.....',
    '...kZJZZZk......',
    '...kJZZkk.......',
    '..kJkkk.........',
    '.kJk............',
    'kJk..k.k.k......',
    'kk..k.k.k.......',
    '................',
  ],
  icon_poison: [
    '................',
    '.......kk.......',
    '......kEEk......',
    '......kEEk......',
    '.....kEEEEk.....',
    '.....kEwEEk.....',
    '....kEwEEEEk....',
    '....kEEEEEGk....',
    '...kEEEEEEGGk...',
    '...kEEEEEGGGk...',
    '...kEEEEGGGFk...',
    '...kGEEGGGGFk...',
    '....kGGGGGFk....',
    '.....kFFFFk.....',
    '......kkkk......',
    '................',
  ],
  icon_blind: [
    '................',
    '.......P........',
    '......PP...P....',
    '.....PPyP.PP....',
    '....PPyyPPyP....',
    '....PyywyyyP....',
    '...OPywwwyPO....',
    '...OPyywyyPO....',
    '....OPyyyPO.....',
    '.....OPPPO......',
    '......OOO.......',
    '..kkkkkkkkkkkk..',
    '.kwwwwkkkkwwwwk.',
    '.kwwwkkkkkkwwwk.',
    '..kkkkkkkkkkkk..',
    '................',
  ],
  icon_heal: [
    '................',
    '.......P........',
    '......PyP.......',
    '.....PyyyP......',
    '....PyywyyP.....',
    '....PywwwyP.....',
    '....OPyyyPO.....',
    '.....OPPPO......',
    '.......E........',
    '.....E.E.E......',
    '....EEEEEEE.....',
    '....EEEEEEE.....',
    '.....EEEEE......',
    '......EEE.......',
    '.......E........',
    '................',
  ],
  icon_venom: [
    '................',
    '.GG.............',
    'GEEG.....E......',
    'GEEEG..E...E....',
    '.GEEGG....E..E..',
    '..GGEEG.E...E...',
    '....GEEE..E...E.',
    '.....GEEEE.E..E.',
    '......GEEEEE.E..',
    '.....E.GEEEEE..E',
    '...E..E.GEEEE.E.',
    '.E..E..E..GEE...',
    '...E..E..E......',
    '.E...E..E..E....',
    '...E....E.......',
    '................',
  ],
  node_pier: [
    '................',
    '................',
    '..oooooooooooo..',
    '..gggggggggggg..',
    '..o..o..o..o.o..',
    '..o..o..o..o.o..',
    '..o..o..o..o.o..',
    'JIIoIIoIIoIIoIIJ',
    'IIIoIIoIIoIIoIII',
    'IJIIIIIIIJIIIIIJ',
    'IIIIJIIIIIIIJIII',
    'UIIIIIIJIIIIIIIU',
    'UUIIIIIIIIIIIIUU',
    '.UUUUUUUUUUUUUU.',
    '................',
    '................',
  ],
  node_river: [
    '................',
    '.........P......',
    '........PyP.....',
    '.........P......',
    '................',
    '..J.............',
    '.JIJ.......J....',
    'JIIIJ.....JIJ...',
    'IIIIIJ...JIIIJ..',
    'IIIIIIJJJIIIIIJ.',
    'UIIIIIIIIIIIIIII',
    'UUIIIIJIIIIIJIIU',
    '.UUUIIIIIIIIIUU.',
    '...UUUUUUUUUU...',
    '................',
    '................',
  ],
  node_naga: [
    '.......T........',
    '.....T.T.T......',
    '.....TTTTT......',
    '....GGGGGGG.....',
    '....GeGGGeG.....',
    '....GGGGGGG.....',
    '.....EEEEE......',
    '.......GG.......',
    '........GG......',
    '.......GG.......',
    '......GG........',
    '..GGGGGGGGGGGG..',
    '.GTTTTTTTTTTTTG.',
    'GGGGGGGGGGGGGGGG',
    '.UUIIIIIIIIIIUU.',
    '...UUUUUUUUUU...',
  ],
  // ของขลัง (16x16)
  charm_takrut: [
    '................',
    '..r..........r..',
    '...r........r...',
    '....r......r....',
    '.....r....r.....',
    '......r..r......',
    '...oooooooooo...',
    '..ogyyyyyyyyyo..',
    '..oggkgkgkggyo..',
    '..ogggggggggyo..',
    '..oggkgkgkggyo..',
    '..oggggggggggo..',
    '...oooooooooo...',
    '................',
    '................',
    '................',
  ],
  charm_fang: [
    '.......rr.......',
    '......r..r......',
    '.....r....r.....',
    '.....r....r.....',
    '......r..r......',
    '.......oo.......',
    '......owwo......',
    '......owwvo.....',
    '.....owwwvo.....',
    '.....owwwvo.....',
    '.....owwvo......',
    '.....owwvo......',
    '......owvo......',
    '......owo.......',
    '.......o........',
    '................',
  ],
  charm_prakam: [
    '................',
    '.....oo..oo.....',
    '....olo..olo....',
    '...oo......oo...',
    '..olo......olo..',
    '..oo........oo..',
    '.olo........olo.',
    '.oo..........oo.',
    '.olo........olo.',
    '..oo........oo..',
    '..olo......olo..',
    '...oo......oo...',
    '....olo..olo....',
    '.....oorroo.....',
    '.......rr.......',
    '.......rr.......',
  ],
  // ขนนกการเวก: a bright feather of the karawek bird (speed)
  charm_feather: [
    '................',
    '...........kk...',
    '..........kTTk..',
    '.........kTPPk..',
    '........kTPePk..',
    '.......kTPeePk..',
    '......kTPeePk...',
    '.....kTPeePTk...',
    '.....kTPePTk....',
    '....kTPPPTk.....',
    '....kTPTTk......',
    '...kTTkkk.......',
    '..kokk..........',
    '.kok............',
    '.kk.............',
    '................',
  ],
  // ตะกรุดมหาลาภ: a gold-wrapped scroll charm with a lucky coin
  charm_lucky: [
    '................',
    '......kkk.......',
    '.....k.r.k......',
    '......kkk.......',
    '....kkkkkkk.....',
    '...kTTTTTTTk....',
    '...kTgTgTgTk....',
    '...kTTTTTTTk....',
    '...kgTgTgTgk....',
    '...kTTTTTTTk....',
    '....kkkkkkk.....',
    '.........kkkk...',
    '........kTyyTk..',
    '........kyTTyk..',
    '........kTyyTk..',
    '.........kkkk...',
  ],
  // เบี้ยแก้: a cowrie shell charm bound with red thread
  charm_bia: [
    '.......rr.......',
    '......r..r......',
    '....kkkrrkkk....',
    '...kQQQQQQQQk...',
    '..kQQddddddQQk..',
    '..kQdddddddddk..',
    '.kQddkkkkkkddQk.',
    '.kQdkdkdkdkddQk.',
    '.kQdkkkkkkkddQk.',
    '.kQddkdkdkdkdQk.',
    '.kQddkkkkkkddQk.',
    '..kQdddddddddk..',
    '..kQQddddddQQk..',
    '...kQQQQQQQQk...',
    '....kkkkkkkk....',
    '................',
  ],
  // ของเซ่น (offerings)
  off_egg: [
    '................',
    '......kkkk......',
    '.....kwwwwk.....',
    '....kwwwwwwk....',
    '...kwwwwwwwwk...',
    '...kwwyyyywwk...',
    '..kwwyyTTyyvwk..',
    '..kwwyTTTTyvwk..',
    '..kwwyTTTTyvvk..',
    '..kwwwyyyyvvvk..',
    '...kwwwwwvvvk...',
    '...kkvvvvvvkk...',
    '..kkookkkkkookk.',
    '.koooooooooooook',
    '..kkkkkkkkkkkkk.',
    '................',
  ],
  off_red: [
    '......kkkk......',
    '......kaak......',
    '......kkkk......',
    '.....kccrrk.....',
    '....kccrrrrk....',
    '....kcrrrrrk....',
    '...kccrrrrrrk...',
    '...kcrwrrrrrk...',
    '...kcrwrrrrrk...',
    '...kcrrrrrrrk...',
    '...kccrrrrrrk...',
    '...kcrrrrrrmk...',
    '...kcrrrrrmmk...',
    '....kmmmmmmk....',
    '.....kkkkkk.....',
    '................',
  ],
  off_baisri: [
    '.......kk.......',
    '......kwwk......',
    '......kwpk......',
    '.....kGGGGk.....',
    '.....kwwwwk.....',
    '....kGGEGGGk....',
    '....kwpwwpwk....',
    '...kGGGEGGGGk...',
    '...kwwwwwwwwk...',
    '..kGGEGGGGEGGk..',
    '..kwpwwpwwpwwk..',
    '.kGGGGGGGGGGGGk.',
    '.kkoooooooooookk',
    '..kooooooooook..',
    '...kkkkkkkkkk...',
    '................',
  ],
  charm_yant: [
    '................',
    '..dddddddddddd..',
    '..dccccccccccd..',
    '..dc........cd..',
    '..dc.rrrrrr.cd..',
    '..dc.r.rr.r.cd..',
    '..dc.rrrrrr.cd..',
    '..dc...rr...cd..',
    '..dc.rrrrrr.cd..',
    '..dc.r....r.cd..',
    '..dc.rrrrrr.cd..',
    '..dc........cd..',
    '..dccccccccccd..',
    '..dddddddddddd..',
    '..d.d.d..d.d.d..',
    '................',
  ],
  // inline icons beside numbers (16x16, like every icon), and a 'missed' popup icon
  icon_hp: [
    '................',
    '..kkkk....kkkk..',
    '.kcccck..kcrrrk.',
    'kcwwccrkkcrrrrrk',
    'kcwccrrrrrrrrrmk',
    'kccrrrrrrrrrrrmk',
    'krrrrrrrrrrrrrmk',
    'krrrrrrrrrrrrmmk',
    '.krrrrrrrrrrrmk.',
    '..krrrrrrrrrmk..',
    '...krrrrrrrmk...',
    '....krrrrrmk....',
    '.....krrrmk.....',
    '......krmk......',
    '.......kk.......',
    '................',
  ],
  icon_atk: [
    '................',
    '....kkkkkkkk....',
    '...kfssksskssk..',
    '..kfssskssksssk.',
    '..kssssksskssskk',
    '..kssssksskssssk',
    '.kkkkkkkkkkkkssk',
    'kfsssssssssksssk',
    'ksssssssssksssSk',
    'kSsssssssssssSSk',
    '.kSSssssssssSSk.',
    '..kSSSSssSSSSk..',
    '...kkSSSSSSkk...',
    '....kosssssk....',
    '....kkkkkkkk....',
    '................',
  ],
  icon_cd: [
    '................',
    '..kkkkkkkkkkkk..',
    '..koooooooooOk..',
    '...kQyyyyyyQk...',
    '...kQyyyyyyQk...',
    '....kQyyyyQk....',
    '.....kQyyQk.....',
    '......kyyk......',
    '......kQQk......',
    '.....kQ..Qk.....',
    '....kQ..y.Qk....',
    '...kQ..yyy.Qk...',
    '...kQyyyyyyQk...',
    '..koooooooooOk..',
    '..kkkkkkkkkkkk..',
    '................',
  ],
  icon_miss: [
    '................',
    '................',
    '..ee.........ee.',
    '...eekkkkkk.ee..',
    '...keewwwwwee...',
    '..kwweekkweewk..',
    '.kwwwweekeewwwk.',
    'kwwwwkkeeekwwwwk',
    '.kwwwwkeeewwwwk.',
    '..kwwweekeewwk..',
    '...kkeewwweek...',
    '....eekkkkkee...',
    '...ee.......ee..',
    '..ee.........ee.',
    '................',
    '................',
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
};

/** Battle backdrops on the shared 2pt grid: 180x320 art px = the whole 360x640 screen. */
const BG_W = 180, BG_H = 320, HORIZON = 160; // ground runs under the buttons
// the old 120-wide layouts, re-placed on the finer grid (shapes are then drawn at full detail)
const k = v => Math.round(v * 1.5);
function sky(px, W, bands, until) {
  for (let y = 0; y < until; y++) for (let x = 0; x < W; x++) {
    const f = y / until * (bands.length - 1), i = Math.floor(f);
    px(x, y, bands[Math.min(bands.length - 1, f - i + ((x + y) % 2 ? 0.25 : -0.25) > 0.5 ? i + 1 : i)]);
  }
}
const STARS = [[15, 12], [40, 28], [66, 7], [94, 22], [124, 6], [150, 31], [168, 13], [28, 48], [110, 40], [81, 57], [9, 70], [136, 60], [57, 84]];
// a star: one pixel, or a tiny cross for the bright ones
const star = (px, [x, y], col, i) => { px(x, y, col); if (i % 4 === 0) { px(x - 1, y, col); px(x + 1, y, col); px(x, y - 1, col); px(x, y + 1, col); px(x, y, '#ffffff'); } };
// filled disc with a rim colour
function disc(px, cx, cy, r, fill, rim) {
  for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) {
    const d = x * x + y * y;
    if (d <= r * r) px(cx + x, cy + y, d > (r - 1.5) ** 2 ? rim : fill);
  }
}
// glow: solid core, dithered falloff
function glow(px, cx, cy, r, core, cols) {
  for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) {
    const d = Math.sqrt(x * x + y * y);
    if (d < r && (d < core || (x + y) % 2 === 0)) px(cx + x, cy + y, cols[Math.min(cols.length - 1, Math.floor(d / r * cols.length))]);
  }
}

/** Night forest by an old pavilion: moon, roof silhouette, pines, fog, grass. */
function drawBackdrop(scene) {
  canvasArt(scene, 'bg_night', BG_W, BG_H, (px, rect, W, H) => {
    sky(px, W, ['#0b0820', '#120b2c', '#1a1036', '#221440', '#2a1846'], HORIZON);
    STARS.forEach((s, i) => star(px, s, '#8a86b0', i));
    // moon with soft rim and craters
    disc(px, 152, 60, 14, '#e8e0b0', '#bdb48a');
    [[147, 55, 2], [156, 66, 1], [150, 64, 1]].forEach(([x, y, r]) => disc(px, x, y, r, '#cfc596', '#cfc596'));
    // pavilion (ศาลา): stacked roof, spire, posts
    const roof = '#07050f', edge = '#120c1e';
    for (let y = 0; y < 28; y++) rect(36 - y - 7, 105 + y, 2 * (y + 7) + 1, 1, y === 27 ? edge : roof);
    rect(35, 94, 2, 11, roof); px(36, 93, roof);
    rect(7, 133, 59, 4, roof); rect(7, 133, 59, 1, edge);
    for (let x = 9; x <= 63; x += 13) rect(x, 137, 3, HORIZON - 137, roof);
    // pines with branch tiers
    const tree = (cx, top, w) => {
      for (let y = top; y < HORIZON; y++) {
        const t = y - top, half = t < w * 3.6 ? Math.floor(t / 2.4) + 1 : 1;
        const tier = t % 9;
        rect(cx - half + (tier > 6 ? 2 : 0), y, 2 * half + 1 - (tier > 6 ? 4 : 0), 1, (tier === 8 && half > 3) ? '#0c0818' : '#060410');
      }
    };
    tree(128, 80, 11); tree(160, 92, 10); tree(96, 112, 9); tree(176, 120, 6);
    // ground with grass flecks and blades
    for (let y = HORIZON; y < H; y++) for (let x = 0; x < W; x++)
      px(x, y, (x * 7 + y * 3) % 17 === 0 ? '#1c2a1c' : (x * 5 + y * 11) % 31 === 0 ? '#233523' : y < HORIZON + 8 ? '#0d140f' : '#111a13');
    for (let x = 3; x < W; x += 7) { const y = HORIZON + 10 + (x * 13) % 140; px(x, y, '#2a402a'); px(x, y - 1, '#2a402a'); px(x + 1, y - 2, '#22361f'); }
    // fog band
    for (let y = 148; y < 177; y++) for (let x = 0; x < W; x++)
      if (Math.sin(x / 12 + y * 0.5) + Math.sin(x / 22) > 0.6 && (x + y) % 2 === 0) px(x, y, '#3a3a55');
  });
}

/** Village at night: red-lit sky, shut stilt houses, dirt yard, red haze. */
function drawVillageBackdrop(scene) {
  canvasArt(scene, 'bg_village', BG_W, BG_H, (px, rect, W, H) => {
    sky(px, W, ['#0b0820', '#160a26', '#22102c', '#2e1430', '#3a1830'], HORIZON);
    STARS.slice(0, 9).forEach((s, i) => star(px, s, '#7a6a90', i));
    // red glow over the treetops (the krasue's light)
    glow(px, 140, 52, 32, 9, ['#ff6688', '#8a1830', '#5a1028', '#3a0c22']);
    const tree = (cx, top) => { for (let y = top; y < 132; y++) { const h = Math.min(14, Math.floor((y - top) / 2) + 1); rect(cx - h, y, 2 * h + 1, 1, (y - top) % 8 === 7 ? '#0d0714' : '#08040e'); } };
    tree(20, 72); tree(72, 84); tree(124, 76); tree(168, 68);
    // stilt houses: roof, wall with plank lines, shut windows, stilts
    const house = (x, w, top) => {
      for (let y = 0; y < 16; y++) rect(x - y, top + y, w + 2 * y, 1, y === 15 ? '#1c1022' : '#0e0814');
      rect(x - 10, top + 16, w + 20, 20, '#150c1a');
      for (let yy = top + 19; yy < top + 36; yy += 4) rect(x - 10, yy, w + 20, 1, '#120a16');
      rect(x + 2, top + 22, 7, 7, '#050208'); rect(x + w - 9, top + 22, 7, 7, '#050208');
      rect(x + 5, top + 22, 1, 7, '#150c1a'); rect(x + w - 6, top + 22, 1, 7, '#150c1a');
      for (let i = 0; i < 4; i++) rect(x - 8 + i * Math.floor((w + 16) / 3), top + 36, 3, HORIZON - top - 36, '#0e0814');
      rect(x - 6, top + 46, w + 12, 2, '#0e0814'); // cross-brace under the floor
    };
    house(17, 27, 99); house(80, 31, 92); house(144, 24, 104);
    for (let y = HORIZON; y < H; y++) for (let x = 0; x < W; x++)
      px(x, y, (x * 5 + y * 3) % 19 === 0 ? '#2e2220' : (x * 3 + y * 7) % 41 === 0 ? '#3a2a26' : y < HORIZON + 8 ? '#151010' : '#1c1414');
    for (let y = 148; y < 172; y++) for (let x = 0; x < W; x++)
      if (Math.sin(x / 10 + y * 0.5) + Math.sin(x / 18) > 0.7 && (x + y) % 2 === 0) px(x, y, '#3a1a2a');
  });
}

/** Chapter 2 backdrops: a pier at night, the open river, the naga's water palace. */
function water(px, W, H, top, deep = '#0e1e3a', mid = '#16305a', hi = '#3a6ab0') {
  for (let y = top; y < H; y++) for (let x = 0; x < W; x++) {
    const ripple = Math.sin(x / 7 + y * 0.9) + Math.sin(x / 16 - y * 0.5);
    px(x, y, ripple > 1.4 && (x + y) % 2 === 0 ? hi : y < top + 9 || (x * 3 + y) % 11 === 0 ? mid : deep);
  }
}
function drawRiverBackdrops(scene) {
  canvasArt(scene, 'bg_pier', BG_W, BG_H, (px, rect, W, H) => {
    sky(px, W, ['#0b0820', '#120b2c', '#1a1036', '#1c1a40'], 144);
    STARS.forEach((s, i) => star(px, s, '#8a86b0', i));
    disc(px, 45, 45, 12, '#e8e0b0', '#bdb48a');
    disc(px, 41, 42, 2, '#cfc596', '#cfc596');
    // far bank treeline
    for (let x = 0; x < W; x++) { const h = 9 + Math.round(4 * Math.sin(x / 6) + 3 * Math.sin(x / 13)); rect(x, 144 - h, 1, h, '#07060f'); }
    water(px, W, H, 144);
    // moon's reflection
    for (let y = 150; y < 225; y += 4) rect(39 + ((y * 7) % 7), y, 12 - ((y * 3) % 6), 1, '#8a8a70');
    // pier: planks on posts, reaching out from the right
    rect(99, 180, 81, 9, '#3a2a1c'); rect(99, 180, 81, 1, '#5a4430'); rect(99, 188, 81, 1, '#2a1e14');
    for (let x = 102; x < W; x += 10) rect(x, 180, 1, 9, '#2a1e14');
    for (let x = 105; x < W; x += 21) { rect(x, 189, 4, 45, '#2a1e14'); rect(x, 189, 1, 45, '#3a2a1c'); }
    // lantern post at the pier's end
    rect(108, 147, 3, 33, '#2a1e14');
    glow(px, 109, 143, 14, 0, ['#4a3018', '#2a1c14']);
    rect(104, 138, 12, 10, '#d08a30'); rect(106, 140, 8, 6, '#ffd070'); rect(103, 137, 14, 1, '#7a4a20'); rect(103, 148, 14, 1, '#7a4a20');
  });
  canvasArt(scene, 'bg_river', BG_W, BG_H, (px, rect, W, H) => {
    sky(px, W, ['#07101e', '#0b1628', '#101e34', '#14243c'], 135);
    STARS.slice(0, 10).forEach((s, i) => star(px, s, '#7a8ab0', i));
    for (let x = 0; x < W; x++) { const h = 6 + Math.round(3 * Math.sin(x / 9)); rect(x, 135 - h, 1, h, '#050a12'); }
    water(px, W, H, 135, '#0a1a30', '#12284a', '#2a5a90');
    // drifting mist bands
    for (let y = 126; y < 180; y++) for (let x = 0; x < W; x++) if (Math.sin(x / 13 + y * 0.4) + Math.sin(x / 25) > 1.1 && (x + y) % 2 === 0) px(x, y, '#3a4a66');
    // ghost-fires flickering over the water, each with a dim reflection
    [[30, 105], [78, 93], [144, 111], [120, 87]].forEach(([x, y]) => {
      glow(px, x, y, 6, 0, ['#4a2a1a', '#2a1a1a']);
      rect(x - 2, y - 2, 5, 5, '#b8400e'); rect(x - 1, y - 3, 3, 1, '#b8400e'); rect(x - 1, y - 1, 3, 3, '#ff8a30'); px(x, y, '#ffe066');
      for (let r = 0; r < 3; r++) rect(x - 2 + r, y + 40 + r * 4, 5 - r * 2, 1, '#5a3020');
    });
    // reeds at the edges
    for (let x = 0; x < W; x++) if (x < 21 || x > 159) for (let y = 225 + ((x * 7) % 18); y < H; y++) if ((x * 5) % 3 === 0) px(x, y, (y + x) % 9 === 0 ? '#2a5a32' : '#1a3a22');
  });
  canvasArt(scene, 'bg_naga', BG_W, BG_H, (px, rect, W, H) => {
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const f = y / H;
      px(x, y, (x + y) % 2 && f < 0.5 ? '#06161a' : f < 0.25 ? '#071a1e' : f < 0.55 ? '#0a2226' : '#0c2a2a');
    }
    // light falling from the surface
    for (let y = 0; y < 180; y++) for (let x = 0; x < W; x++) if (Math.sin(x / 9 + y / 37) > 0.85 && (x + y) % 3 === 0) px(x, y, '#1a4a4a');
    // rising bubbles
    [[20, 150], [24, 120], [22, 90], [158, 170], [162, 132], [156, 100], [70, 40], [112, 60]].forEach(([x, y]) => { px(x, y, '#3a7a7a'); px(x + 1, y, '#3a7a7a'); px(x, y - 1, '#5a9a9a'); });
    // palace silhouette: tiered roofs with gold eaves
    const C = 90;
    for (let t = 0; t < 3; t++) {
      const top = 45 + t * 18, half = 15 + t * 13;
      for (let y = 0; y < 18; y++) rect(C - half - Math.floor(y / 2), top + y, 2 * (half + Math.floor(y / 2)), 1, '#041012');
      rect(C - half - 12, top + 17, 2 * half + 24, 1, '#8a6a30');
      px(C - half - 13, top + 16, '#e8c050'); px(C + half + 12, top + 16, '#e8c050');
    }
    rect(C - 1, 33, 3, 12, '#8a6a30'); px(C, 32, '#e8c050');
    rect(C - 45, 99, 90, 60, '#041012');
    for (let x = C - 40; x < C + 40; x += 12) rect(x, 104, 2, 55, '#06181a');
    rect(C - 9, 120, 18, 39, '#1a4a3a'); rect(C - 9, 120, 18, 2, '#2a6a4a');
    // naga stair rails, gold and green scales
    for (const dir of [-1, 1]) for (let i = 0; i < 45; i++) {
      const x = C + dir * (21 + i), y = 159 + i;
      rect(Math.min(x, x + dir * 3), y, 4, 3, i % 6 ? (i % 2 ? '#2e8a3a' : '#257a30') : '#e8c050');
    }
    // floor
    for (let y = 204; y < H; y++) for (let x = 0; x < W; x++) px(x, y, (x * 7 + y * 3) % 17 === 0 ? '#16302a' : '#0c2220');
  });
  // chapter 2 map: the river winding down the middle
  canvasArt(scene, 'art_map2', BG_W, BG_H, (px, rect, W, H) => {
    land(px, W, H);
    for (let y = 0; y < H; y++) {
      const cx = 90 + Math.round(Math.sin(y / 33) * 39), w = 21 + Math.round(Math.sin(y / 13) * 3);
      for (let x = cx - w; x <= cx + w; x++) px(x, y, Math.abs(x - cx) > w - 3 ? '#1a2a3a' : (x + y) % 9 ? '#16223a' : '#243a5a');
    }
  });
  // story crops (sky-and-shore part) for picture-book pages: 171x132, the story frame's size
  for (const [key, src, top] of [['art_pier', 'bg_pier', 80], ['art_river', 'bg_river', 60], ['art_naga', 'bg_naga', 30]]) storyCrop(scene, key, src, top);
}
function storyCrop(scene, key, src, top) {
  if (scene.textures.exists(key)) return;
  const t = scene.textures.createCanvas(key, 171, 132);
  t.getContext().drawImage(scene.textures.get(src).getSourceImage(), 4, top, 171, 132, 0, 0, 171, 132);
  t.refresh(); t.setFilter(1);
}
// night countryside seen from above
function land(px, W, H) {
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const n = Math.sin(x / 13 + y / 19) + Math.sin(x / 7 - y / 10) * 0.5;
    px(x, y, n > 0.9 ? '#132016' : n > 0.2 ? '#0f1a12' : (x + y) % 2 ? '#0c140e' : '#0d1610');
  }
}

/** Chapter map: night countryside seen from above. */
function drawMapArt(scene) {
  canvasArt(scene, 'art_map', BG_W, BG_H, (px, rect, W, H) => {
    land(px, W, H);
    // a river winding down the right side
    for (let y = 0; y < H; y++) {
      const cx = 150 + Math.round(Math.sin(y / 27) * 12);
      for (let x = cx - 6; x <= cx + 6; x++) px(x, y, Math.abs(x - cx) > 4 ? '#1a2a3a' : (x + y) % 7 ? '#16223a' : '#243a5a');
    }
    // scattered pines
    const pine = (cx, cy) => { for (let t = 0; t < 10; t++) rect(cx - Math.floor(t / 2), cy + t, 2 * Math.floor(t / 2) + 1, 1, t % 4 === 3 ? '#0a1a0e' : '#06120a'); rect(cx, cy + 10, 1, 2, '#2a1a10'); };
    [[12, 30], [30, 60], [18, 105], [45, 150], [9, 195], [27, 255], [66, 30], [105, 60], [120, 180], [90, 225], [60, 285], [126, 279], [99, 105], [18, 300]].forEach(([x, y]) => pine(x, y));
  });
}


/** Chapter 3 — the abandoned temple and its cremation ground (180x320 on the 2pt grid). */
function drawTempleBackdrops(scene) {
  const night = (px, W, until) => sky(px, W, ['#07060f', '#0c0a18', '#120e20', '#181228', '#1e1630'], until);
  const ground = (px, W, H, top, a, b, c) => { for (let y = top; y < H; y++) for (let x = 0; x < W; x++) px(x, y, (x * 7 + y * 3) % 17 === 0 ? a : (x * 5 + y * 11) % 29 === 0 ? b : c); };
  const tree = (rect, cx, top, w, bottom, col) => { for (let y = top; y < bottom; y++) { const h = Math.min(w, Math.floor((y - top) / 2) + 1); rect(cx - h, y, 2 * h + 1, 1, (y - top) % 9 === 8 ? '#0a0812' : col); } };
  const fog = (px, W, y0, y1, col) => { for (let y = y0; y < y1; y++) for (let x = 0; x < W; x++) if (Math.sin(x / 11 + y * 0.45) + Math.sin(x / 23) > 0.8 && (x + y) % 2 === 0) px(x, y, col); };
  // ประตูวัด: a crumbling temple gate in the forest, a pale moon behind
  canvasArt(scene, 'bg_gate3', BG_W, BG_H, (px, rect, W, H) => {
    night(px, W, HORIZON);
    STARS.forEach((s, i) => star(px, s, '#6a6690', i));
    disc(px, 40, 52, 13, '#d8d0b0', '#a8a088');
    [12, 46, 150, 172].forEach((x, i) => tree(rect, x, 60 + (i % 2) * 14, 14, HORIZON, '#05040a'));
    // gate: roof, two pillars, dark doorway, cracks
    for (let y = 0; y < 14; y++) rect(90 - 30 - y, 88 + y, 60 + 2 * y, 1, y === 13 ? '#2a1e28' : '#140e18');
    rect(66, 102, 8, 58, '#1c1420'); rect(106, 102, 8, 58, '#1c1420'); rect(67, 102, 1, 58, '#2a2030'); rect(107, 102, 1, 58, '#2a2030');
    rect(74, 108, 32, 52, '#040306');
    [[70, 120], [70, 136], [110, 116]].forEach(([x, y]) => { px(x, y, '#3a2e40'); px(x + 1, y + 1, '#3a2e40'); });
    ground(px, W, H, HORIZON, '#1c1c24', '#24242e', '#101016');
    for (let y = HORIZON; y < HORIZON + 40; y++) { const h = 16 + (y - HORIZON); rect(90 - h, y, 2 * h, 1, (y % 5) ? '#1a1820' : '#222030'); }
    fog(px, W, 148, 176, '#2e2c44');
  });
  // ลานป่าช้า: bone stupas, dead trees, will-o'-wisps
  canvasArt(scene, 'bg_yard', BG_W, BG_H, (px, rect, W, H) => {
    night(px, W, HORIZON);
    STARS.slice(0, 9).forEach((s, i) => star(px, s, '#6a6690', i));
    // bare dead trees
    [[20, 70], [160, 80]].forEach(([x, top]) => { rect(x, top, 3, HORIZON - top, '#08060c'); for (let i = 0; i < 4; i++) { const y = top + 6 + i * 9, d = i % 2 ? 1 : -1; for (let k = 0; k < 10; k++) px(x + 1 + d * k, y - Math.floor(k / 2), '#08060c'); } });
    // stupas (เจดีย์) of different heights
    const stupa = (cx, base, h) => { for (let y = 0; y < h; y++) { const w = Math.max(1, Math.round((y / h) * 7)); rect(cx - w, base - h + y, 2 * w + 1, 1, y % 6 === 5 ? '#4a4858' : '#3a3846'); } rect(cx - 9, base, 19, 4, '#2e2c38'); };
    stupa(52, 150, 40); stupa(92, 146, 52); stupa(132, 152, 34); stupa(70, 158, 22);
    // wisps
    [[40, 100], [118, 92], [150, 120]].forEach(([x, y]) => { rect(x - 1, y - 1, 3, 3, '#3a6ab0'); px(x, y, '#c8e0ff'); });
    ground(px, W, H, HORIZON, '#1e2a1e', '#26341f', '#0e140e');
    fog(px, W, 140, 178, '#2a3a3a');
  });
  // ศาลาสวดศพ: an open funeral pavilion lit by a candle, a coffin on trestles
  canvasArt(scene, 'bg_hall', BG_W, BG_H, (px, rect, W, H) => {
    rect(0, 0, W, H, '#09070e');
    for (let y = 0; y < 90; y++) for (let x = 0; x < W; x++) if ((x * 13 + y * 7) % 71 === 0) px(x, y, '#3a3660');
    glow(px, 90, 120, 60, 22, ['#3a2a18', '#2e2216', '#1a120c']);
    for (let y = 0; y < 22; y++) rect(10 - y + 10, 40 + y, W - 40 + 2 * y, 1, y % 6 === 5 ? '#22142a' : '#170e1e');
    rect(0, 62, W, 7, '#2a1a24'); rect(0, 62, W, 1, '#3a2632');
    rect(16, 69, 10, 92, '#2a1a24'); rect(W - 26, 69, 10, 92, '#2a1a24');
    // coffin
    rect(56, 128, 68, 18, '#3a2416'); rect(56, 128, 68, 2, '#5a3a20'); rect(60, 146, 4, 14, '#2a1a10'); rect(116, 146, 4, 14, '#2a1a10');
    // candles
    [[44, 132], [136, 132]].forEach(([x, y]) => { rect(x, y, 3, 10, '#e8e0d0'); rect(x, y - 3, 3, 3, '#ff8a30'); px(x + 1, y - 4, '#ffe066'); });
    ground(px, W, H, HORIZON, '#1c1418', '#241a1e', '#140e12');
    for (let x = 0; x < W; x += 12) rect(x, HORIZON, 1, H - HORIZON, '#0e0a0e');
  });
  // โบสถ์ร้าง: the ruined ordination hall, a tall shape in the dark doorway
  canvasArt(scene, 'bg_temple', BG_W, BG_H, (px, rect, W, H) => {
    night(px, W, HORIZON);
    STARS.slice(0, 7).forEach((s, i) => star(px, s, '#5a5680', i));
    const C = 90;
    for (let t = 0; t < 3; t++) { const top = 36 + t * 20, half = 18 + t * 16; for (let y = 0; y < 20; y++) rect(C - half - Math.floor(y / 2), top + y, 2 * (half + Math.floor(y / 2)), 1, '#100c16'); rect(C - half - 12, top + 19, 2 * half + 24, 1, '#5a4a30'); }
    rect(C - 1, 24, 3, 12, '#5a4a30');
    rect(C - 52, 96, 104, 64, '#0c0a10');
    for (let x = C - 46; x < C + 46; x += 15) rect(x, 100, 4, 60, '#16121c');
    rect(C - 14, 112, 28, 48, '#020203');
    // eyes in the doorway
    px(C - 4, 120, '#d01030'); px(C + 4, 120, '#d01030');
    ground(px, W, H, HORIZON, '#1a1820', '#22202a', '#0e0c12');
    fog(px, W, 150, 176, '#24223a');
  });
  // chapter 3 map: forest round the temple grounds, a path of old flagstones
  canvasArt(scene, 'art_map3', BG_W, BG_H, (px, rect, W, H) => {
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const n = Math.sin(x / 13 + y / 19) + Math.sin(x / 7 - y / 10) * 0.5;
      px(x, y, n > 0.9 ? '#16141e' : n > 0.2 ? '#121018' : (x + y) % 2 ? '#0e0c14' : '#100e16');
    }
    // temple wall (a broken rectangle)
    for (let x = 30; x < 150; x++) { if (x % 23 > 2) { px(x, 100, '#2e2a3a'); px(x, 260, '#2e2a3a'); } }
    for (let y = 100; y < 260; y++) { if (y % 29 > 2) { px(30, y, '#2e2a3a'); px(150, y, '#2e2a3a'); } }
    // dead trees
    [[10, 30], [160, 60], [20, 200], [165, 210], [80, 290], [140, 300], [60, 40]].forEach(([x, y]) => { rect(x, y, 1, 10, '#2a2234'); px(x - 1, y + 2, '#2a2234'); px(x + 1, y + 4, '#2a2234'); });
  });
  for (const [key, src, top] of [['art_gate3', 'bg_gate3', 40], ['art_yard', 'bg_yard', 50], ['art_hall', 'bg_hall', 40], ['art_temple', 'bg_temple', 20]]) storyCrop(scene, key, src, top);
}

function drawTitleArt(scene) {
  canvasArt(scene, 'art_gate', BG_W, BG_H, (px, rect, W, H) => {
    const C = 90, GROUND = 260;
    sky(px, W, ['#06051a', '#0b0820', '#120b2c', '#1a1036', '#221440'], GROUND);
    [[12, 8], [36, 24], [140, 12], [168, 30], [20, 60], [160, 68], [60, 6], [114, 18], [8, 100], [172, 104], [42, 87], [147, 135], [90, 20]].forEach((s, i) => star(px, s, '#8a86b0', i));
    // light from the other side, haloing the gate
    for (let y = -81; y <= 81; y++) for (let x = -69; x <= 69; x++) {
      const d = Math.sqrt(x * x + (y * 0.8) ** 2);
      if (d < 69 && (d < 28 || (x + y) % 2 === 0)) px(C + x, 197 + y, d < 28 ? '#3a2850' : d < 48 ? '#261a40' : '#1a1232');
    }
    const dark = '#0a0612', trim = '#3a2a40', gold = '#8a6a30', goldHi = '#c8a050';
    // tiered spire (ยอดปราสาท) with gold eaves and upturned corner finials
    rect(C - 1, 57, 3, 14, gold); px(C, 56, goldHi); px(C, 55, goldHi);
    for (let t = 0; t < 4; t++) {
      const top = 71 + t * 16, half = 7 + t * 8;
      for (let y = 0; y < 16; y++) { const h = half + Math.floor(y / 2); rect(C - h, top + y, 2 * h + 1, 1, dark); }
      const eave = half + 8;
      rect(C - eave - 1, top + 15, 2 * eave + 3, 1, gold);
      rect(C - eave - 3, top + 13, 2, 2, goldHi); rect(C + eave + 2, top + 13, 2, 2, goldHi); // ช่อฟ้า-like tips
      for (let x = C - half + 3; x < C + half - 2; x += 5) { px(x, top + 9, trim); px(x, top + 10, trim); }
    }
    // lintel and pillars
    rect(39, 137, 103, 10, dark); rect(39, 137, 103, 1, goldHi); rect(39, 146, 103, 1, gold);
    for (let x = 45; x < 138; x += 8) { px(x, 141, gold); px(x + 1, 142, gold); }
    rect(45, 147, 15, GROUND - 147, dark); rect(121, 147, 15, GROUND - 147, dark);
    rect(47, 147, 1, GROUND - 147, trim); rect(133, 147, 1, GROUND - 147, trim);
    rect(43, GROUND - 6, 19, 6, trim); rect(119, GROUND - 6, 19, 6, trim);
    // door panels with studs
    rect(60, 147, 30, GROUND - 147, '#140c1c'); rect(91, 147, 30, GROUND - 147, '#140c1c');
    for (let y = 156; y < GROUND - 4; y += 19) { rect(64, y, 22, 1, '#22162a'); rect(95, y, 22, 1, '#22162a'); }
    for (let y = 165; y < GROUND - 9; y += 19) [66, 82, 97, 113].forEach(x => { px(x, y, gold); px(x + 1, y, goldHi); });
    // jagged crack of light between the doors
    let cx = C;
    for (let y = 147; y < GROUND; y++) {
      if (y % 7 === 0) cx += ((y * 7) % 3) - 1;
      cx = Math.max(C - 3, Math.min(C + 3, cx));
      rect(cx - 1, y, 3, 1, '#c8a8ff'); px(cx, y, '#ffffff');
      if (y === 168 || y === 202 || y === 234) { rect(cx + 2, y, 8, 1, '#a080e0'); px(cx + 10, y - 1, '#a080e0'); }
      if (y === 184 || y === 220) { rect(cx - 9, y, 8, 1, '#a080e0'); px(cx - 10, y + 1, '#a080e0'); }
    }
    // ground and a stone path leading to the gate
    for (let y = GROUND; y < H; y++) for (let x = 0; x < W; x++) px(x, y, (x * 7 + y * 3) % 17 === 0 ? '#1c2a1c' : (x * 5 + y * 11) % 31 === 0 ? '#233523' : '#0d140f');
    for (let y = GROUND; y < H; y++) { const h = 16 + Math.floor((y - GROUND) / 2); rect(C - h, y, 2 * h + 1, 1, (y % 6) ? '#1c1626' : '#241c30'); }
    for (let y = GROUND; y < GROUND + 21; y++) for (let x = C - 10; x < C + 11; x++) if ((x + y) % 2 === 0) px(x, y, '#5a4880');
  });
}


/** Story portraits drawn at 64x64 on the shared grid (128pt): richer than the 32x32 field sprites. */
function drawPortraits(scene) {

  // shared helpers for the portraits below
  const ell = (px, cx, cy, rx, ry, col) => { for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) if ((x * x) / (rx * rx) + (y * y) / (ry * ry) <= 1) px(cx + x, cy + y, col); };
  const outlined = (px, cx, cy, rx, ry, col, K = '#141018') => { ell(px, cx, cy, rx + 1, ry + 1, K); ell(px, cx, cy, rx, ry, col); };
  const glowAt = (px, cx, cy, r, cols) => { for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) { const d = Math.hypot(x, y); if (d < r && (x + y) % 2 === 0) px(cx + x, cy + y, cols[Math.min(cols.length - 1, Math.floor(d / r * cols.length))]); } };
  const eyes = (px, rect, lx, rx, y, iris, K = '#141018') => { [lx, rx].forEach(x => { rect(x, y, 4, 4, K); rect(x + 1, y + 1, 2, 2, iris); px(x + 1, y + 1, '#ffffff'); }); };

  // ผีกระหัง — dark-skinned man flying on two winnowing baskets, red eyes, red loincloth.
  for (const [key, f] of [['p_krahang', 0], ['p_krahang_idle2', 1]]) canvasArt(scene, key, 64, 64, (px, rect) => {
    const K = '#141018', s = '#5a3a20', sH = '#7a4a20', sD = '#3a2414';
    const basket = (cx, cy, rx, ry) => {
      ell(px, cx, cy, rx + 1, ry + 1, K);
      for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) {
        const d = (x * x) / (rx * rx) + (y * y) / (ry * ry);
        if (d <= 1) px(cx + x, cy + y, d > 0.8 ? '#8a6a30' : (x + y) % 3 === 0 ? '#d4a020' : Math.abs(d - 0.4) < 0.08 ? '#7a4a20' : '#f0c890');
      }
    };
    // baskets as wings, flapping
    basket(13, 30 - f * 4, 12, 7); basket(51, 30 - f * 4, 12, 7);
    // arms holding them
    rect(20, 32 - f * 2, 8, 3, s); rect(36, 32 - f * 2, 8, 3, s);
    // body
    outlined(px, 32, 38, 8, 10, s); ell(px, 29, 35, 3, 5, sH); ell(px, 36, 41, 3, 5, sD);
    // red loincloth and legs
    rect(25, 46, 15, 5, '#c0283a'); rect(25, 50, 15, 1, '#7a1020'); rect(28, 51, 3, 4, '#c0283a'); rect(34, 51, 3, 4, '#c0283a');
    rect(27, 51, 3, 11, K); rect(28, 51, 1, 10, s); rect(35, 51, 3, 11, K); rect(36, 51, 1, 10, s);
    // head
    outlined(px, 32, 18, 8, 9, s); ell(px, 35, 20, 3, 6, sD); ell(px, 29, 14, 3, 2, sH);
    rect(25, 9, 15, 4, '#1a1414'); px(28, 10, '#3a2e30');
    // glowing red eyes, grin
    eyes(px, rect, 26, 34, 15, '#d01030');
    rect(28, 23, 9, 2, K); px(29, 23, '#ffffff'); px(35, 23, '#ffffff');
    // wind under the wings
    [[4, 44], [10, 48], [50, 46], [56, 50]].forEach(([x, y]) => rect(x, y + f, 6, 1, '#c8d8e8'));
  });

  // ผีปอบ — wild-haired hag, hungry red eyes, long tongue, clawed hands.
  for (const [key, f] of [['p_pop', 0], ['p_pop_idle2', 1]]) canvasArt(scene, key, 64, 64, (px, rect) => {
    const K = '#141018', skin = '#b8a898', skinS = '#8a7a70', hair = '#888899', hairD = '#5a5a6a';
    outlined(px, 32, 54, 20, 12, '#3a2e48'); for (let x = 14; x < 52; x += 5) rect(x, 60, 3, 4, '#2e2440');
    // hair mass
    outlined(px, 32, 24, 18, 18, hair); for (let i = 0; i < 9; i++) rect(14 + i * 4, 30, 3, 14 + (i * 5) % 9, i % 2 ? hair : hairD);
    // face
    outlined(px, 32, 26, 10, 12, skin); ell(px, 37, 28, 4, 8, skinS);
    rect(24, 14, 17, 5, hair);
    eyes(px, rect, 25, 35, 23, '#d01030'); rect(24, 21, 7, 1, hairD); rect(34, 21, 7, 1, hairD);
    rect(28, 33, 9, 3, K); rect(31, 35, 3, 10 + f * 2, '#ff6688'); rect(31, 44 + f * 2, 3, 1, '#c0283a');
    // claws reaching
    [[10, 46], [54, 46]].forEach(([x, y]) => { outlined(px, x, y - f, 4, 4, skin); [-3, 0, 3].forEach(d => rect(x + d, y + 4 - f, 1, 4, '#e8e0d0')); });
  });

  // ผีเปรต — towering, gaunt, a tiny mouth on a long neck, enormous hands.
  for (const [key, f] of [['p_pret', 0], ['p_pret_idle2', 1]]) canvasArt(scene, key, 64, 64, (px, rect) => {
    const K = '#141018', s = '#8a7aa0', sD = '#5d4d6e', sH = '#b0a0c8';
    glowAt(px, 32, 30, 30, ['#24182e', '#1a1224', '#120c1a']);
    // swollen belly, ragged robe
    outlined(px, 32, 54, 16, 10, s); rect(18, 54, 29, 10, '#2e2440'); for (let x = 18; x < 47; x += 4) rect(x, 62, 2, 2, K);
    // long thin neck
    rect(29, 12 + f, 7, 36, K); rect(30, 12 + f, 5, 36, s); rect(30, 12 + f, 1, 36, sH);
    // small head
    outlined(px, 32, 9 + f, 7, 6, s); ell(px, 35, 10 + f, 3, 4, sD);
    rect(27, 7 + f, 3, 3, K); px(28, 8 + f, '#d01030'); rect(35, 7 + f, 3, 3, K); px(36, 8 + f, '#d01030');
    px(32, 13 + f, K);
    // huge hands hanging low
    [[9, 50], [55, 50]].forEach(([x, y]) => { outlined(px, x, y - f, 6, 8, s); ell(px, x + 2, y + 2 - f, 2, 4, sD); [-4, -1, 2, 5].forEach(d => rect(x + d, y + 8 - f, 1, 5, '#e8e0d0')); });
    rect(16, 40, 13, 3, s); rect(36, 40, 13, 3, s);
  });

  // กุมารทอง — golden child spirit: topknot (จุก) with a gold ring, round face, red cloth, sitting cross-legged.
  for (const [key, f] of [['p_kumarn', 0], ['p_kumarn_idle2', 1]]) canvasArt(scene, key, 64, 64, (px, rect) => {
    const K = '#141018', g = '#d4a020', gS = '#a87818', gH = '#ffe066', red = '#c0283a', redD = '#7a1020';
    glowAt(px, 32, 34, 30, ['#3a2c10', '#2a200c', '#1c160a']);
    // legs crossed + red cloth
    outlined(px, 32, 56, 20, 7, g); ell(px, 32, 56, 20, 7, gS); ell(px, 32, 55, 18, 5, g);
    outlined(px, 32, 50, 12, 7, red); for (let x = 22; x < 43; x += 3) px(x, 52, redD);
    // body
    outlined(px, 32, 40, 11, 10, g); ell(px, 36, 42, 6, 7, gS); ell(px, 30, 37, 5, 5, gH);
    // arms with hands together (wai)
    outlined(px, 24, 42, 3, 6, g); outlined(px, 40, 42, 3, 6, g); outlined(px, 32, 36 - f, 3, 4, gH);
    // head
    outlined(px, 32, 21, 11, 11, g); ell(px, 37, 23, 5, 7, gS); ell(px, 28, 17, 4, 3, gH);
    // topknot with ring
    outlined(px, 32, 7, 4, 4, '#1a1414'); rect(29, 10, 7, 2, gH); px(31, 5, '#3a2e30');
    // face
    eyes(px, rect, 25, 35, 19 + f * 0, '#1a1414');
    px(32, 25, gS); rect(30, 28, 5, 1, redD); px(31, 29, red); px(32, 29, red);
    rect(23, 24, 2, 1, '#e86a50'); rect(40, 24, 2, 1, '#e86a50');
  });

  // ผีกองกอย — one-legged forest imp: grey-violet skin, wild hair, red eyes, grin with fangs, long claws.
  for (const [key, f] of [['p_kongkoi', 0], ['p_kongkoi_idle2', 1]]) canvasArt(scene, key, 64, 64, (px, rect) => {
    const K = '#141018', s = '#6a5a80', sS = '#4a3e5e', sH = '#8a7aa0', hair = '#1e1626';
    // one leg and foot (hopping)
    outlined(px, 32, 58 - f, 4, 6, sS); outlined(px, 35, 63 - f, 6, 2, sS);
    // body hunched
    outlined(px, 32, 44 - f, 12, 11, s); ell(px, 37, 47 - f, 6, 7, sS); ell(px, 28, 40 - f, 5, 4, sH);
    // arms with claws
    outlined(px, 17, 44 - f, 4, 8, s); outlined(px, 47, 44 - f, 4, 8, s);
    [[13, 52], [16, 53], [19, 52], [44, 52], [47, 53], [50, 52]].forEach(([x, y]) => { rect(x, y - f, 1, 4, '#e8e0d0'); px(x, y + 4 - f, K); });
    // head + wild hair
    for (let i = 0; i < 9; i++) { const x = 18 + i * 3.5, h = 6 + (i * 5) % 7; rect(Math.round(x), 8 - f + (i % 2) * 2, 3, h, hair); }
    outlined(px, 32, 22 - f, 13, 11, s); ell(px, 38, 24 - f, 6, 8, sS); ell(px, 27, 18 - f, 5, 3, sH);
    rect(19, 12 - f, 26, 4, hair);
    // big red eyes, brows
    eyes(px, rect, 24, 36, 18 - f, '#d01030'); rect(23, 16 - f, 6, 1, hair); rect(35, 16 - f, 6, 1, hair);
    // grin with fangs
    rect(25, 27 - f, 14, 4, K); rect(26, 28 - f, 12, 2, '#7a1020');
    [[26, 27], [29, 27], [34, 27], [37, 27]].forEach(([x, y]) => rect(x, y - f, 2, 2, '#ffffff'));
    // pointed ears
    rect(16, 18 - f, 3, 2, s); px(15, 17 - f, s); rect(45, 18 - f, 3, 2, s); px(48, 17 - f, s);
  });

  // กระสือ — a woman's floating head, long black hair, red lips, entrails glowing beneath.
  for (const [key, f] of [['p_krasue', 0], ['p_krasue_idle2', 1]]) canvasArt(scene, key, 64, 64, (px, rect) => {
    const K = '#141018', skin = '#f0d8d0', skinS = '#c8a8a8', hair = '#120c14', hairH = '#2e2236';
    glowAt(px, 32, 46, 20, ['#5a1028', '#3a0c20', '#22081a']);
    // entrails: heart, lungs, dangling gut with red glow
    outlined(px, 32, 40, 5, 4, '#c0283a'); ell(px, 30, 39, 2, 1, '#ff6688');
    outlined(px, 25, 42, 3, 5, '#8a1830'); outlined(px, 39, 42, 3, 5, '#8a1830');
    for (let y = 45; y < 62; y++) { const x = 32 + Math.round(Math.sin((y + f * 2) / 2.5) * 3); px(x, y, '#ff6688'); px(x + 1, y, '#c0283a'); px(x - 1, y, K); }
    for (let y = 46; y < 58; y++) { const x = 26 + Math.round(Math.sin((y - f * 2) / 3) * 2); px(x, y, '#c0283a'); }
    for (let y = 46; y < 55; y++) { const x = 38 + Math.round(Math.sin((y + f) / 3) * 2); px(x, y, '#c0283a'); }
    // long hair framing the face
    outlined(px, 32, 19, 15, 16, hair); for (let y = 24; y < 40; y++) { rect(17, y, 4, 1, hair); rect(43, y, 4, 1, hair); }
    for (let y = 6; y < 30; y += 4) px(22 + (y % 3), y, hairH);
    // face
    outlined(px, 32, 21, 9, 12, skin); ell(px, 37, 23, 3, 8, skinS);
    rect(23, 8, 18, 7, hair); px(27, 11, hairH);
    // eyes: dark, red-rimmed, staring
    eyes(px, rect, 25, 35, 18, '#d01030');
    rect(24, 17, 6, 1, hair); rect(34, 17, 6, 1, hair);
    // red lips, a drip of blood
    rect(29, 28, 7, 2, '#c0283a'); px(31, 28, '#ff6688'); rect(33, 30, 1, 2 + f, '#c0283a');
  });

  // ผีพราย — drowned woman under the pier: pale, soaked hair over the face, rising from dark water.
  for (const [key, f] of [['p_phrai', 0], ['p_phrai_idle2', 1]]) canvasArt(scene, key, 64, 64, (px, rect) => {
    const K = '#141018', skin = '#c8d8e0', skinS = '#98acb8', hair = '#0e1218', hairH = '#22303a';
    // body in a pale wet dress
    outlined(px, 32, 54, 15, 12, '#a8b8c8'); ell(px, 38, 56, 6, 9, '#8898a8');
    // reaching arms
    outlined(px, 14, 40 + f, 3, 10, skin); outlined(px, 50, 40 + f, 3, 10, skin);
    [11, 13, 15, 17].forEach(x => rect(x, 28 + f, 1, 4, skin)); [47, 49, 51, 53].forEach(x => rect(x, 28 + f, 1, 4, skin));
    // head and hair hanging in wet strands
    outlined(px, 32, 22, 10, 12, skin); ell(px, 37, 24, 4, 8, skinS);
    // soaked hair: a crown over the head, long strands down both sides, a few wet locks across the face
    outlined(px, 32, 15, 11, 7, hair);
    for (let y = 15; y < 48; y++) { rect(20, y, 5, 1, (y % 5) ? hair : hairH); rect(39, y, 5, 1, (y % 4) ? hair : hairH); }
    [[26, 20], [29, 22], [31, 18]].forEach(([x, len]) => rect(x, 14, 2, len, hair));
    // one eye glinting between the locks, a pale downturned mouth
    rect(34, 22, 4, 3, K); rect(35, 23, 2, 1, '#e8f0ff');
    rect(33, 30, 4, 1, '#5a6a78'); px(32, 31, '#5a6a78');
    // water around the waist with ripples and drips
    for (let y = 52; y < 64; y++) for (let x = 0; x < 64; x++) if ((x + y + f) % 7 === 0 || (y > 55 && (x * 3 + y) % 5 === 0)) px(x, y, y < 55 ? '#3a6ab0' : '#16305a');
    rect(6, 52, 52, 1, '#9ac8f0');
    [[20, 46], [44, 48]].forEach(([x, y]) => { px(x, y + f * 2, '#9ac8f0'); px(x, y + 1 + f * 2, '#3a6ab0'); });
  });

  // ผีโขมด — will-o'-the-wisp: a living flame with a face, sparks drifting up.
  for (const [key, f] of [['p_khamot', 0], ['p_khamot_idle2', 1]]) canvasArt(scene, key, 64, 64, (px, rect) => {
    const K = '#141018';
    glowAt(px, 32, 34, 28, ['#5a2a10', '#3a1c0e', '#22120a']);
    // flame tongues (alternating heights per frame)
    [[18, 14, 8], [26, 6, 10], [33, 2, 12], [40, 8, 10], [47, 15, 8]].forEach(([x, top, w], i) => {
      const t = top + ((i + f) % 2) * 3;
      for (let y = t; y < 36; y++) { const half = Math.min(w / 2, Math.floor((y - t) / 2) + 1); rect(x - half, y, half * 2, 1, '#b8400e'); }
    });
    outlined(px, 32, 36, 16, 16, '#d04a10'); ell(px, 32, 37, 13, 13, '#ff8a30'); ell(px, 32, 39, 9, 9, '#ffd070'); ell(px, 31, 40, 5, 5, '#fff0b0');
    // face in the fire
    rect(25, 34, 4, 5, K); rect(35, 34, 4, 5, K); px(26, 35, '#ffffff'); px(36, 35, '#ffffff');
    rect(29, 43, 6, 2 + f, K);
    // sparks
    [[12, 10], [52, 6], [8, 30], [56, 26], [20, 4]].forEach(([x, y], i) => { const yy = y + ((i + f) % 2) * 3; rect(x, yy, 2, 2, '#ff8a30'); px(x, yy, '#ffe066'); });
  });

  // นาค — great serpent king: green scales, gold crown and crest, coiled, forked tongue.
  for (const [key, f] of [['p_naga', 0], ['p_naga_idle2', 1]]) canvasArt(scene, key, 64, 64, (px, rect) => {
    const K = '#141018', g = '#2e8a3a', gS = '#1f6a2a', gH = '#6ad84a', belly = '#e8c050', gold = '#e8c050', goldD = '#8a6a30';
    // coils
    outlined(px, 32, 56, 26, 7, gS); ell(px, 32, 55, 24, 5, g);
    for (let x = 10; x < 56; x += 4) px(x, 54 + (x % 8 === 2 ? 1 : 0), gH);
    outlined(px, 30, 46, 18, 6, g); ell(px, 30, 47, 15, 3, belly);
    // neck rising in an S
    for (let y = 22; y < 46; y++) { const cx = 34 + Math.round(Math.sin(y / 6) * 4); ell(px, cx, y, 7, 1, K); }
    for (let y = 22; y < 46; y++) { const cx = 34 + Math.round(Math.sin(y / 6) * 4); rect(cx - 6, y, 12, 1, g); rect(cx - 2, y, 5, 1, belly); if (y % 4 === 0) px(cx - 4, y, gH); }
    // head
    outlined(px, 32, 18, 11, 8, g); ell(px, 37, 20, 5, 5, gS); ell(px, 27, 15, 4, 2, gH);
    // crown (มงกุฎ) with points and crest
    rect(23, 6, 18, 5, gold); for (let i = 0; i < 5; i++) rect(24 + i * 4, 1 + (i % 2) * 2, 2, 5, gold);
    rect(23, 10, 18, 1, goldD); [26, 32, 38].forEach(x => px(x, 8, '#d01030'));
    // eyes and tongue
    eyes(px, rect, 25, 35, 15, '#d01030');
    rect(31, 26, 2, 4 + f, '#d01030'); px(30, 30 + f, '#d01030'); px(33, 30 + f, '#d01030');
  });
  // ทายาท — the master's young disciple: cropped hair, white shirt, red sash, holding the master's lantern.
  // Two frames: the lantern flame flickers.
  for (const [key, flame] of [['p_heir', 0], ['p_heir_idle2', 1]]) {
    canvasArt(scene, key, 64, 64, (px, rect) => {
      const K = '#141018', skin = '#e8c9a0', skinS = '#c89a74', skinD = '#a8785a', hair = '#1a1414', hairH = '#3a2e30';
      const shirt = '#f0ece4', shirtS = '#c8c4d0', shirtD = '#9a96a8', sash = '#c0283a', sashD = '#7a1020';
      const disc = (cx, cy, rx, ry, col) => { for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) if ((x * x) / (rx * rx) + (y * y) / (ry * ry) <= 1) px(cx + x, cy + y, col); };
      // lantern glow behind (dithered)
      for (let y = -16; y <= 16; y++) for (let x = -16; x <= 16; x++) { const d = Math.hypot(x, y); if (d < 16 && (x + y) % 2 === 0) px(14 + x, 46 + y, d < 8 ? '#5a3a18' : '#3a2814'); }
      // body: shoulders and shirt (outline first)
      disc(33, 60, 22, 17, K);
      disc(33, 60, 21, 16, shirt);
      for (let y = 46; y < 64; y++) for (let x = 12; x < 55; x++) if ((x - 33) ** 2 / 441 + (y - 60) ** 2 / 256 <= 1 && x > 44) px(x, y, (x + y) % 2 ? shirtS : shirt);
      rect(46, 50, 1, 14, shirtD); rect(20, 52, 1, 12, shirtD);
      // collar (Thai round-neck shirt) and buttons
      for (let x = -5; x <= 5; x++) px(33 + x, 44 + Math.round(Math.abs(x) * 0.5), shirtD);
      [50, 55, 60].forEach(y => px(33, y, shirtD));
      // red sash across the chest
      for (let i = 0; i < 26; i++) { const x = 18 + i, y = 46 + Math.round(i * 0.62); rect(x, y, 2, 4, i % 5 === 4 ? sashD : sash); }
      // neck
      rect(29, 37, 9, 7, K); rect(30, 37, 7, 7, skinS); rect(30, 42, 7, 1, skinD);
      // head: outline, face, cheek shade
      disc(33, 25, 12, 14, K);
      disc(33, 25, 11, 13, skin);
      for (let y = 14; y < 39; y++) for (let x = 40; x < 45; x++) if ((x - 33) ** 2 / 121 + (y - 25) ** 2 / 169 <= 1) px(x, y, skinS);
      // ears
      disc(21, 26, 2, 3, K); disc(21, 26, 1, 2, skinS); disc(45, 26, 2, 3, K); disc(45, 26, 1, 2, skinS);
      // hair: short crop with a side part
      // (a little fuller than the skull, so the crop has volume)
      disc(33, 22, 13, 12, K);
      for (let y = 10; y < 24; y++) for (let x = 20; x < 47; x++) {
        const inHair = (x - 33) ** 2 / 144 + (y - 22) ** 2 / 121 <= 1;
        const fringe = y < 17 || (y < 22 && (x < 24 || x > 42)) || (y < 19 && x > 33 && x < 41);
        if (inHair && fringe) px(x, y, (x === 30 && y < 17) || (y === 12 && x > 34 && x < 40) ? hairH : hair);
      }
      // face below the hairline (redrawn over the hair outline)
      for (let y = 17; y < 39; y++) for (let x = 22; x < 45; x++) {
        const inFace = (x - 33) ** 2 / 121 + (y - 25) ** 2 / 169 <= 1;
        const fringe = (y < 22 && (x < 24 || x > 42)) || (y < 19 && x > 33 && x < 41);
        if (inFace && !fringe) px(x, y, x > 40 ? skinS : skin);
      }
      // brows, eyes (with a light in them), nose, mouth
      rect(26, 21, 5, 1, hair); rect(36, 21, 5, 1, hair);
      rect(27, 24, 3, 3, K); px(28, 24, '#ffffff'); rect(37, 24, 3, 3, K); px(38, 24, '#ffffff');
      px(33, 28, skinD); px(34, 29, skinD);
      rect(31, 32, 5, 1, '#8a3a3a'); px(32, 33, '#a85050'); px(33, 33, '#a85050');
      px(25, 30, '#e8a890'); px(41, 30, '#e8a890');
      // hand raised, holding the lantern by its ring
      disc(19, 41, 4, 3, K); disc(19, 41, 3, 2, skin);
      rect(14, 36, 1, 4, '#555566');
      // lantern: cap, glass, flame, base
      rect(8, 39, 13, 2, '#7a4a20'); rect(9, 41, 11, 12, '#d08a30'); rect(10, 42, 9, 10, flame ? '#ffe080' : '#ffd070');
      rect(13, 44 - flame, 3, 6 + flame, '#fff0b0'); px(14, 43 - flame, '#ffffff');
      rect(8, 53, 13, 2, '#7a4a20');
      rect(9, 41, 1, 12, '#a86a28'); rect(18, 41, 1, 12, '#a86a28');
    });
  }
}

/** Story illustrations (procedural pixel art). */
function canvasArt(scene, key, W, H, draw, outW = W) {
  if (scene.textures.exists(key)) return;
  // draw at the design size; if outW differs, re-grid with nearest sampling so the
  // result still sits on whole art pixels at the shared pixel size
  // one shared scratch canvas for all art (iOS Safari caps total canvas memory)
  const src = canvasArt.scratch ||= document.createElement('canvas');
  src.width = W; src.height = H;
  const c = src.getContext('2d');
  const px = (x, y, col) => { c.fillStyle = col; c.fillRect(x, y, 1, 1); };
  const rect = (x, y, w, h, col) => { c.fillStyle = col; c.fillRect(x, y, w, h); };
  draw(px, rect, W, H);
  const outH = Math.round(H * outW / W);
  const tex = scene.textures.createCanvas(key, outW, outH);
  const o = tex.getContext();
  o.imageSmoothingEnabled = false;
  o.drawImage(src, 0, 0, W, H, 0, 0, outW, outH);
  tex.refresh();
  tex.setFilter(1);
}

function drawStoryArt(scene) {
  // Empty temple pavilion at night, a lantern still glowing, an empty mat.
  // story scenes drawn natively on the shared 2pt grid: 171x132 art px (342x264 pt)
  canvasArt(scene, 'art_shrine', 171, 132, (px, rect, W, H) => {
    rect(0, 0, W, H, '#0a0814');
    for (let y = 0; y < 57; y++) for (let x = 0; x < W; x++) if ((x * 13 + y * 7) % 71 === 0) px(x, y, (x + y) % 3 ? '#3a3660' : '#6a669a');
    // lantern glow
    glow(px, 85, 64, 42, 19, ['#3a2a18', '#2e2216', '#22180f']);
    // roof with a lighter eave line and rafter ends
    for (let y = 0; y < 19; y++) rect(19 - y, 10 + y, W - 38 + 2 * y, 1, y % 5 === 4 ? '#22142a' : '#1a1020');
    rect(0, 29, W, 6, '#2a1a24'); rect(0, 29, W, 1, '#3a2632'); rect(0, 34, W, 1, '#1e1218');
    for (let x = 5; x < W; x += 13) rect(x, 35, 3, 3, '#2a1a24');
    // pillars
    rect(15, 35, 9, 76, '#2a1a24'); rect(W - 24, 35, 9, 76, '#2a1a24');
    rect(16, 35, 1, 76, '#3a2632'); rect(W - 23, 35, 1, 76, '#3a2632');
    // floor boards
    rect(0, 111, W, 21, '#1c1418'); rect(0, 111, W, 1, '#2a1e22');
    for (let x = 0; x < W; x += 12) rect(x, 111, 1, 21, '#140e12');
    // empty mat with woven pattern
    rect(60, 102, 51, 9, '#4a3a22'); rect(60, 102, 51, 1, '#5e4a2c');
    for (let x = 62; x < 109; x += 3) px(x, 106 + (x % 2), '#3e3020');
    // lantern on its cord
    rect(84, 35, 1, 15, '#555566');
    rect(79, 50, 11, 14, '#d08a30'); rect(81, 52, 7, 10, '#ffd070'); rect(83, 54, 3, 6, '#fff0b0');
    rect(79, 64, 11, 1, '#7a4a20'); rect(79, 49, 11, 1, '#7a4a20'); rect(84, 65, 1, 3, '#7a4a20');
    // fallen note on the mat
    rect(91, 97, 11, 6, '#d8c8a0'); [[93, 99], [95, 99], [97, 99], [99, 100], [93, 101], [96, 101]].forEach(([x, y]) => px(x, y, '#5a4a3a'));
  });

  // Torn paper note with scribbled lines (64x48 on the shared 2pt grid).
  canvasArt(scene, 'art_note', 64, 48, (px, rect, W, H) => {
    for (let y = 3; y < H - 3; y++) for (let x = 4; x < W - 4; x++) {
      const torn = (x <= 5 || x >= W - 6) && (y * 7) % 5 < 2 && (x === 4 || x === W - 5 || (y * 3) % 4 === 0);
      const tornTop = y <= 4 && (x * 5) % 7 < 3 && (y === 3 || x % 2 === 0);
      if (!torn && !tornTop) px(x, y, (x + y) % 11 === 0 ? '#c8b890' : (x * 3 + y) % 17 === 0 ? '#e6d8b0' : '#dccca0');
    }
    // a fold down the middle
    for (let y = 5; y < H - 4; y++) px(32, y, '#cbbb90');
    for (let line = 0; line < 6; line++) {
      const y = 11 + line * 5, len = 44 - (line === 5 ? 22 : (line * 5) % 11);
      for (let x = 10; x < 10 + len; x++) if ((x * 3 + line) % 7 !== 0) px(x, y + ((x + line) % 4 === 0 ? -1 : 0), '#3a2a20');
    }
    // dark stain
    for (let y = 28; y < 42; y++) for (let x = 40; x < 56; x++) {
      const d = (x - 47) ** 2 + (y - 34) ** 2;
      if (d < 26) px(x, y, d < 10 ? '#5a2018' : '#6a2a20');
    }
  });

  // Silent village on stilts; a red light glowing above the trees (171x132).
  canvasArt(scene, 'art_village', 171, 132, (px, rect, W, H) => {
    sky(px, W, ['#0b0820', '#140c2a', '#1a1030'], 107);
    glow(px, 129, 27, 27, 8, ['#ff6688', '#a01830', '#6a1028', '#4a0c20']);
    const tree = (cx, top) => { for (let y = top; y < 99; y++) { const h = Math.min(12, Math.floor((y - top) / 2) + 1); rect(cx - h, y, 2 * h + 1, 1, (y - top) % 8 === 7 ? '#0b0712' : '#06040c'); } };
    tree(15, 34); tree(57, 45); tree(106, 42); tree(153, 37);
    // stilt houses: roof, plank wall, shut windows, stilts
    const house = (x, w) => {
      for (let y = 0; y < 15; y++) rect(x - y, 57 + y, w + 2 * y, 1, y === 14 ? '#1a1020' : '#0d0912');
      rect(x - 8, 72, w + 16, 20, '#120d18');
      for (let yy = 75; yy < 92; yy += 4) rect(x - 8, yy, w + 16, 1, '#0f0a14');
      rect(x + 3, 78, 7, 7, '#05030a'); rect(x + w - 10, 78, 7, 7, '#05030a');
      for (let i = 0; i < 4; i++) rect(x - 6 + i * Math.floor((w + 12) / 3), 92, 3, 15, '#0d0912');
    };
    house(22, 27); house(84, 30); house(138, 22);
    rect(0, 107, W, 25, '#0c140e');
    for (let y = 107; y < H; y++) for (let x = 0; x < W; x++) if ((x * 7 + y * 3) % 19 === 0) px(x, y, '#1c2a1c');
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

/** Dithered oval glow (w x h art px). */
export function pixelOval(scene, w, h) {
  const key = `px_oval_${w}x${h}`;
  canvasArt(scene, key, w, h, (px) => {
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const d = Math.hypot((x - (w - 1) / 2) / (w / 2), (y - (h - 1) / 2) / (h / 2));
      if (d < 0.6 || (d < 1 && (x + y) % 2 === 0)) px(x, y, '#ffffff');
    }
  });
  return key;
}

/** Thin ring of diameter n (one art pixel thick). */
export function pixelRing(scene, n) {
  const key = `px_ring_${n}`;
  canvasArt(scene, key, n, n, (px) => {
    const c = (n - 1) / 2, r = n / 2;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const d = Math.hypot(x - c, y - c);
      if (d > r - 1.6 && d < r) px(x, y, '#ffffff');
    }
  });
  return key;
}

/** Glow disc sized to a sprite grid (n x n), dithered rim; drawn once per size. */
export function pixelDisc(scene, n) {
  const key = `px_disc_${n}`;
  canvasArt(scene, key, n, n, (px) => {
    const c = (n - 1) / 2, r = n / 2;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const d = Math.hypot(x - c, y - c);
      if (d < r * 0.66 || (d < r && (x + y) % 2 === 0)) px(x, y, '#ffffff');
    }
  });
  return key;
}

/** Scale2x: doubles a grid while rounding diagonals, so icons gain real detail at the shared pixel size. */
function scale2x(rows) {
  const h = rows.length, w = rows[0].length, at = (x, y) => (x < 0 || y < 0 || x >= w || y >= h ? '.' : rows[y][x]);
  const out = Array.from({ length: h * 2 }, () => []);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const P = at(x, y), A = at(x, y - 1), B = at(x + 1, y), C = at(x - 1, y), D = at(x, y + 1);
    let e0 = P, e1 = P, e2 = P, e3 = P;
    if (C === A && C !== D && A !== B) e0 = A;
    if (A === B && A !== C && B !== D) e1 = B;
    if (D === C && D !== B && C !== A) e2 = C;
    if (B === D && B !== A && D !== C) e3 = D;
    out[2 * y].push(e0, e1); out[2 * y + 1].push(e2, e3);
  }
  return out.map(r => r.join(''));
}

/** Register every sprite as a Phaser texture (1px per cell; scale when displaying). */
export function registerSprites(scene) {
  drawBackdrop(scene);
  // story's forest page: the sky-and-treeline part of the battle backdrop
  storyCrop(scene, 'art_forest', 'bg_night', 40);
  drawStoryArt(scene);
  drawPortraits(scene);
  drawVillageBackdrop(scene);
  drawTitleArt(scene);
  drawMapArt(scene);
  drawRiverBackdrops(scene);
  drawTempleBackdrops(scene);
  drawPixelShapes(scene);
  // knocked-out (lying) frames for every unit, including chapter 2's
  for (const key of ['kumarn', 'kongkoi', 'krasue', 'phrai', 'khamot', 'naga', 'krahang', 'pop', 'pret']) {
    if (SPRITES[`${key}_ko`]) continue;
    const rows = SPRITES[key], n = rows.length;
    SPRITES[`${key}_ko`] = rows[0].split('').map((_, x) => Array.from({ length: n }, (_, y) => rows[n - 1 - y][x]).join(''));
  }
  // story portraits (p_<unit>) are hand-drawn at 64x64 in drawPortraits
  for (const key of Object.keys(SPRITES)) {
    // never upscale an upscale: '@2' keys used to be doubled again on every scene, exhausting phone memory
    if (key.startsWith('fx_') && !key.includes('@') && !SPRITES[`${key}@2`]) SPRITES[`${key}@2`] = scale2x(SPRITES[key]);
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
