// Pixel art drawn as character grids. Each char = one color from PALETTE, '.' = transparent.
export const PALETTE = {
  k: '#141414', s: '#e8c9a0', e: '#d01030', m: '#7a1020', r: '#c0283a', p: '#ff6688',
  h: '#2a1a10', w: '#ffffff', v: '#c8d0d8', g: '#d4a020', o: '#7a4a20', n: '#5d4d6e', y: '#ffe066', a: '#888899', f: '#f0c890', b: '#3b4a8a', c: '#d64545', d: '#f0e0d0', l: '#5a3a20',
  // finer-grid additions
  N: '#2e2440', L: '#8a7aa0', K: '#0e0a14', H: '#2a2238', Q: '#e8d8c8', S: '#b8a898', R: '#7a1030',
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

/** Battle backdrops on the shared grid: 120x214 art px, shown at PX (3) = full 360 width. */
const BG_W = 120, BG_H = 214, HORIZON = 107; // full screen height; ground runs under the buttons
function sky(px, W, bands, until) {
  for (let y = 0; y < until; y++) for (let x = 0; x < W; x++) {
    const f = y / until * (bands.length - 1), i = Math.floor(f);
    px(x, y, bands[Math.min(bands.length - 1, f - i + ((x + y) % 2 ? 0.25 : -0.25) > 0.5 ? i + 1 : i)]);
  }
}
const STARS = [[10, 8], [27, 19], [44, 5], [63, 15], [83, 4], [100, 21], [112, 9], [19, 32], [73, 27], [54, 38], [6, 47]];

/** Night forest by an old pavilion: moon, roof silhouette, pines, fog, grass. */
function drawBackdrop(scene) {
  canvasArt(scene, 'bg_night', BG_W, BG_H, (px, rect, W, H) => {
    sky(px, W, ['#0b0820', '#120b2c', '#1a1036', '#221440', '#2a1846'], HORIZON);
    STARS.forEach(([x, y]) => px(x, y, '#8a86b0'));
    // moon with soft rim and two craters
    for (let y = -9; y <= 9; y++) for (let x = -9; x <= 9; x++) {
      const d = x * x + y * y;
      if (d <= 81) px(101 + x, 40 + y, d > 64 ? '#bdb48a' : '#e8e0b0');
    }
    px(98, 37, '#cfc596'); px(99, 37, '#cfc596'); px(104, 44, '#cfc596');
    // pavilion (ศาลา): stacked roof, spire, posts
    const roof = '#07050f';
    for (let y = 0; y < 19; y++) rect(24 - y - 5, 70 + y, 2 * (y + 5) + 1, 1, roof);
    rect(24, 64, 1, 6, roof);
    rect(5, 89, 39, 3, roof);
    for (let x = 6; x <= 42; x += 9) rect(x, 92, 2, HORIZON - 92, roof);
    // pines
    const tree = (cx, top, w) => {
      for (let y = top; y < HORIZON; y++) {
        const t = y - top, half = t < w * 2.4 ? Math.floor(t / 2.4) + 1 : 1;
        rect(cx - half, y, 2 * half + 1, 1, (t % 6 === 5 && half > 2) ? '#0c0818' : '#060410');
      }
    };
    tree(85, 53, 11); tree(107, 61, 10); tree(64, 75, 9);
    // ground with grass flecks
    for (let y = HORIZON; y < H; y++) for (let x = 0; x < W; x++)
      px(x, y, (x * 7 + y * 3) % 11 === 0 ? '#1c2a1c' : (x * 5 + y * 11) % 23 === 0 ? '#233523' : y < HORIZON + 5 ? '#0d140f' : '#111a13');
    // fog band
    for (let y = 99; y < 118; y++) for (let x = 0; x < W; x++)
      if (Math.sin(x / 8 + y * 0.75) + Math.sin(x / 15) > 0.6 && (x + y) % 2 === 0) px(x, y, '#3a3a55');
  });
}

/** Village at night: red-lit sky, shut stilt houses, dirt yard, red haze. */
function drawVillageBackdrop(scene) {
  canvasArt(scene, 'bg_village', BG_W, BG_H, (px, rect, W, H) => {
    sky(px, W, ['#0b0820', '#160a26', '#22102c', '#2e1430', '#3a1830'], HORIZON);
    STARS.slice(0, 7).forEach(([x, y]) => px(x, y, '#7a6a90'));
    // red glow over the treetops
    for (let y = -21; y <= 21; y++) for (let x = -21; x <= 21; x++) {
      const d = Math.sqrt(x * x + y * y);
      if (d < 21 && (d < 6 || (x + y) % 2 === 0)) px(93 + x, 35 + y, d < 4 ? '#ff6688' : d < 10 ? '#8a1830' : '#3a0c22');
    }
    const tree = (cx, top) => { for (let y = top; y < 88; y++) { const h = Math.min(9, Math.floor((y - top) / 2) + 1); rect(cx - h, y, 2 * h + 1, 1, '#08040e'); } };
    tree(13, 48); tree(48, 56); tree(83, 51); tree(112, 45);
    // stilt houses: roof, wall with plank lines, shut windows, stilts
    const house = (x, w, top) => {
      for (let y = 0; y < 11; y++) rect(x - y, top + y, w + 2 * y, 1, y === 10 ? '#1c1022' : '#0e0814');
      rect(x - 7, top + 11, w + 14, 13, '#150c1a');
      for (let yy = top + 13; yy < top + 24; yy += 3) rect(x - 7, yy, w + 14, 1, '#120a16');
      rect(x + 1, top + 15, 5, 5, '#050208'); rect(x + w - 6, top + 15, 5, 5, '#050208');
      for (let i = 0; i < 4; i++) rect(x - 5 + i * Math.floor((w + 10) / 3), top + 24, 2, HORIZON - top - 24, '#0e0814');
    };
    house(11, 18, 66); house(53, 21, 61); house(96, 16, 69);
    for (let y = HORIZON; y < H; y++) for (let x = 0; x < W; x++)
      px(x, y, (x * 5 + y * 3) % 13 === 0 ? '#2e2220' : (x * 3 + y * 7) % 29 === 0 ? '#3a2a26' : y < HORIZON + 5 ? '#151010' : '#1c1414');
    for (let y = 99; y < 115; y++) for (let x = 0; x < W; x++)
      if (Math.sin(x / 7 + y * 0.75) + Math.sin(x / 12) > 0.7 && (x + y) % 2 === 0) px(x, y, '#3a1a2a');
  });
}

/** Title art (90x160, shown at 4x): a cracked Thai gate leaking light from the other side. */
function drawTitleArt(scene) {
  // drawn natively on the shared grid: 120x213 art px = full screen at PX
  canvasArt(scene, 'art_gate', 120, 213, (px, rect, W, H) => {
    const C = 60, GROUND = 173;
    sky(px, W, ['#06051a', '#0b0820', '#120b2c', '#1a1036', '#221440'], GROUND);
    [[8, 5], [24, 16], [93, 8], [112, 20], [13, 40], [107, 45], [40, 4], [76, 12], [5, 67], [115, 69], [28, 58], [98, 90]].forEach(([x, y]) => px(x, y, '#8a86b0'));
    // light from the other side, haloing the gate
    for (let y = -54; y <= 54; y++) for (let x = -46; x <= 46; x++) {
      const d = Math.sqrt(x * x + (y * 0.8) ** 2);
      if (d < 46 && (d < 19 || (x + y) % 2 === 0)) px(C + x, 131 + y, d < 19 ? '#3a2850' : d < 32 ? '#261a40' : '#1a1232');
    }
    const dark = '#0a0612', trim = '#3a2a40', gold = '#8a6a30', goldHi = '#c8a050';
    // tiered spire (ยอดปราสาท) with gold eaves and upturned corner finials
    rect(C - 1, 38, 2, 9, gold); px(C - 1, 37, goldHi);
    for (let t = 0; t < 4; t++) {
      const top = 47 + t * 11, half = 5 + t * 5;
      for (let y = 0; y < 11; y++) { const h = half + Math.floor(y / 2); rect(C - h, top + y, 2 * h, 1, dark); }
      const eave = half + 5;
      rect(C - eave - 1, top + 10, 2 * eave + 2, 1, gold);
      px(C - eave - 2, top + 9, goldHi); px(C + eave + 1, top + 9, goldHi); // ช่อฟ้า-like tips
      for (let x = C - half + 2; x < C + half - 2; x += 4) px(x, top + 6, trim);
    }
    // lintel and pillars
    rect(26, 91, 68, 7, dark); rect(26, 91, 68, 1, goldHi); rect(26, 97, 68, 1, gold);
    for (let x = 30; x < 92; x += 6) px(x, 94, gold);
    rect(30, 98, 10, GROUND - 98, dark); rect(80, 98, 10, GROUND - 98, dark);
    rect(31, 98, 1, GROUND - 98, trim); rect(88, 98, 1, GROUND - 98, trim);
    rect(29, GROUND - 4, 12, 4, trim); rect(79, GROUND - 4, 12, 4, trim);
    // door panels with studs
    rect(40, 98, 19, GROUND - 98, '#140c1c'); rect(61, 98, 19, GROUND - 98, '#140c1c');
    for (let y = 104; y < GROUND - 3; y += 13) { rect(43, y, 13, 1, '#22162a'); rect(64, y, 13, 1, '#22162a'); }
    for (let y = 110; y < GROUND - 6; y += 13) { px(44, y, gold); px(54, y, gold); px(65, y, gold); px(75, y, gold); }
    // jagged crack of light between the doors
    let cx = C;
    for (let y = 98; y < GROUND; y++) {
      if (y % 5 === 0) cx += ((y * 7) % 3) - 1;
      cx = Math.max(C - 2, Math.min(C + 2, cx));
      rect(cx - 1, y, 3, 1, '#c8a8ff'); px(cx, y, '#ffffff');
      if (y === 112 || y === 135 || y === 156) { rect(cx + 2, y, 5, 1, '#a080e0'); px(cx + 7, y - 1, '#a080e0'); }
      if (y === 123 || y === 147) { rect(cx - 6, y, 5, 1, '#a080e0'); px(cx - 7, y + 1, '#a080e0'); }
    }
    // ground and a stone path leading to the gate
    for (let y = GROUND; y < H; y++) for (let x = 0; x < W; x++) px(x, y, (x * 7 + y * 3) % 11 === 0 ? '#1c2a1c' : (x * 5 + y * 11) % 23 === 0 ? '#233523' : '#0d140f');
    for (let y = GROUND; y < H; y++) { const h = 11 + Math.floor((y - GROUND) / 2); rect(C - h, y, 2 * h, 1, (y % 4) ? '#1c1626' : '#241c30'); }
    for (let y = GROUND; y < GROUND + 14; y++) for (let x = C - 7; x < C + 8; x++) if ((x + y) % 2 === 0) px(x, y, '#5a4880');
  });
}

/** Story illustrations (procedural pixel art). */
function canvasArt(scene, key, W, H, draw, outW = W) {
  if (scene.textures.exists(key)) return;
  // draw at the design size; if outW differs, re-grid with nearest sampling so the
  // result still sits on whole art pixels at the shared pixel size
  const src = document.createElement('canvas');
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
  // story scenes drawn natively on the shared grid: 114x88 art px (342x264 pt)
  canvasArt(scene, 'art_shrine', 114, 88, (px, rect, W, H) => {
    rect(0, 0, W, H, '#0a0814');
    for (let y = 0; y < 38; y++) for (let x = 0; x < W; x++) if ((x * 13 + y * 7) % 53 === 0) px(x, y, '#3a3660');
    // lantern glow
    for (let y = -28; y <= 28; y++) for (let x = -28; x <= 28; x++) {
      const d = Math.sqrt(x * x + y * y);
      if (d < 28 && (d < 13 || (x + y) % 2 === 0)) px(57 + x, 43 + y, d < 13 ? '#3a2a18' : '#22180f');
    }
    // roof with a lighter eave line and rafter ends
    for (let y = 0; y < 13; y++) rect(13 - y, 7 + y, W - 26 + 2 * y, 1, '#1a1020');
    rect(0, 20, W, 4, '#2a1a24'); rect(0, 20, W, 1, '#3a2632');
    for (let x = 4; x < W; x += 9) rect(x, 24, 2, 2, '#2a1a24');
    // pillars
    rect(10, 24, 6, 50, '#2a1a24'); rect(W - 16, 24, 6, 50, '#2a1a24');
    rect(11, 24, 1, 50, '#3a2632'); rect(W - 15, 24, 1, 50, '#3a2632');
    // floor boards
    rect(0, 74, W, 14, '#1c1418');
    for (let x = 0; x < W; x += 8) rect(x, 74, 1, 14, '#140e12');
    // empty mat
    rect(40, 68, 34, 6, '#4a3a22'); rect(40, 68, 34, 1, '#5e4a2c');
    for (let x = 42; x < 72; x += 4) px(x, 71, '#3e3020');
    // lantern on its cord
    rect(56, 24, 1, 10, '#555');
    rect(53, 34, 7, 9, '#d08a30'); rect(54, 35, 5, 7, '#ffd070'); rect(53, 43, 7, 1, '#7a4a20'); rect(53, 33, 7, 1, '#7a4a20');
    // fallen note on the mat
    rect(61, 65, 7, 4, '#d8c8a0'); px(62, 66, '#5a4a3a'); px(64, 66, '#5a4a3a'); px(66, 67, '#5a4a3a');
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
  canvasArt(scene, 'art_village', 114, 88, (px, rect, W, H) => {
    sky(px, W, ['#0b0820', '#140c2a', '#1a1030'], 71);
    // red glow
    for (let y = -18; y <= 18; y++) for (let x = -18; x <= 18; x++) {
      const d = Math.sqrt(x * x + y * y);
      if (d < 18 && (d < 5 || (x + y) % 2 === 0)) px(86 + x, 18 + y, d < 4 ? '#ff6688' : d < 9 ? '#a01830' : '#4a0c20');
    }
    const tree = (cx, top) => { for (let y = top; y < 66; y++) { const h = Math.min(8, Math.floor((y - top) / 2) + 1); rect(cx - h, y, 2 * h + 1, 1, '#06040c'); } };
    tree(10, 23); tree(38, 30); tree(71, 28); tree(102, 25);
    // stilt houses: roof, plank wall, shut windows, stilts
    const house = (x, w) => {
      for (let y = 0; y < 10; y++) rect(x - y, 38 + y, w + 2 * y, 1, y === 9 ? '#1a1020' : '#0d0912');
      rect(x - 5, 48, w + 10, 13, '#120d18');
      for (let yy = 50; yy < 61; yy += 3) rect(x - 5, yy, w + 10, 1, '#0f0a14');
      rect(x + 2, 52, 5, 5, '#05030a'); rect(x + w - 7, 52, 5, 5, '#05030a');
      for (let i = 0; i < 4; i++) rect(x - 4 + i * Math.floor((w + 8) / 3), 61, 2, 10, '#0d0912');
    };
    house(15, 18); house(56, 20); house(92, 15);
    rect(0, 71, W, 17, '#0c140e');
    for (let y = 71; y < H; y++) for (let x = 0; x < W; x++) if ((x * 7 + y * 3) % 13 === 0) px(x, y, '#1c2a1c');
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
  if (!scene.textures.exists('art_forest')) {
    const src = scene.textures.get('bg_night').getSourceImage();
    const t = scene.textures.createCanvas('art_forest', BG_W, 118);
    t.getContext().drawImage(src, 0, 0, BG_W, 118, 0, 0, BG_W, 118);
    t.refresh(); t.setFilter(1);
  }
  drawStoryArt(scene);
  drawVillageBackdrop(scene);
  drawTitleArt(scene);
  drawPixelShapes(scene);
  for (const key of ['kumarn', 'kongkoi', 'krasue']) {
    const rows = SPRITES[key], n = rows.length;
    SPRITES[`${key}_ko`] = rows[0].split('').map((_, x) => Array.from({ length: n }, (_, y) => rows[n - 1 - y][x]).join(''));
  }
  for (const key of Object.keys(SPRITES)) {
    if (key.startsWith('fx_') && !SPRITES[`${key}@2`]) SPRITES[`${key}@2`] = scale2x(SPRITES[key]);
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
