// ขั้น & บารมี — retainers grow a little with every win, and can be fed ของเซ่น (offerings) to grow
// without fighting (handy for a newcomer, or one who sat out). Growth is small per step and the
// steps get longer, so it never replaces charms — and there is always a next step to reach.

export const MAX_LEVEL = 30;
export const EXP_PER_WIN = 5;                        // each retainer who fought, per battle or hunt wave
export const expToNext = lv => 20 + 15 * lv;          // บารมี needed to go from ขั้น lv to lv+1

// ขั้น from total บารมี: { lv, into (บารมี into this step), need (for the next step) }
export function levelOf(exp = 0) {
  let lv = 0, left = exp;
  while (lv < MAX_LEVEL && left >= expToNext(lv)) { left -= expToNext(lv); lv++; }
  return { lv, into: lv >= MAX_LEVEL ? 0 : left, need: lv >= MAX_LEVEL ? 0 : expToNext(lv) };
}
const totalFor = lv => { let t = 0; for (let l = 0; l < lv; l++) t += expToNext(l); return t; };
export const MAX_EXP = totalFor(MAX_LEVEL);

// what each ขั้น gives: ขวัญ +1 every step, กำลัง +1 every fourth step (speed is nature, not growth).
// Measured: played straight through, bosses stay about as hard as before; ขั้น 30 takes ~90 full hunts per retainer.
export const growthOf = lv => ({ hp: lv, atk: Math.floor(lv / 4) });
export function applyGrowth(u, exp) {
  const g = growthOf(levelOf(exp).lv);
  u.hp += g.hp; u.maxHp += g.hp; u.atk = (u.atk || 0) + g.atk;
}

// ของเซ่น: fed on the roster screen
export const OFFERINGS = {
  egg: { name: 'ไข่ต้ม', exp: 10, icon: 'off_egg' },
  red: { name: 'น้ำแดง', exp: 30, icon: 'off_red' },
  baisri: { name: 'บายศรี', exp: 100, icon: 'off_baisri' },
};
// every win brings an egg; bigger offerings by chance — better in later hunt waves and from bosses
const ODDS = { plain: { red: 0.15, baisri: 0 }, w2: { red: 0.25, baisri: 0.03 }, w3: { red: 0.4, baisri: 0.08 }, boss: { red: 1, baisri: 0.2 } };
export function rollOfferings(kind = 'plain') {
  const o = ODDS[kind] || ODDS.plain, got = ['egg'];
  if (Math.random() < o.red) got.push('red');
  if (Math.random() < o.baisri) got.push('baisri');
  return got;
}
