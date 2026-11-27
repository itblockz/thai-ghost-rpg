// ของขลัง — charms a retainer can wear (one each). Every win drops one at random.
// Each charm has a type (what it does), a rarity, and a rolled value inside that rarity's range,
// so even two charms of the same kind differ — there is always a better one to find.

export const RARITIES = {
  common: { name: 'ธรรมดา', weight: 70, color: '#c8c8d8', hex: 0x8888a0 },
  rare: { name: 'หายาก', weight: 25, color: '#6ab0ff', hex: 0x3a7ad0 },
  mythic: { name: 'วิเศษ', weight: 5, color: '#ffcc44', hex: 0xe8b030 },
};

// value ranges per rarity [min, max]
export const CHARM_TYPES = {
  takrut: { name: 'ตะกรุดโทน', icon: 'charm_takrut', range: { common: [2, 3], rare: [4, 5], mythic: [6, 8] } },
  fang: { name: 'เขี้ยวเสือ', icon: 'charm_fang', range: { common: [1, 1], rare: [2, 2], mythic: [3, 3] } },
  prakam: { name: 'ประคำไม้', icon: 'charm_prakam', range: { common: [1, 1], rare: [1, 1], mythic: [2, 2] } },
  yant: { name: 'ผ้ายันต์', icon: 'charm_yant', range: { common: [1, 1], rare: [1, 1], mythic: [2, 2] } },
  feather: { name: 'ขนนกการเวก', icon: 'charm_feather', range: { common: [1, 1], rare: [1, 2], mythic: [2, 2] } },
  // farming charms: they help only while the wearer is in the fight
  lucky: { name: 'ตะกรุดมหาลาภ', icon: 'charm_lucky', range: { common: [10, 10], rare: [15, 20], mythic: [25, 25] } }, // % chance of a second find
  bia: { name: 'เบี้ยแก้', icon: 'charm_bia', range: { common: [2, 2], rare: [3, 4], mythic: [5, 5] } }, // luck: better rarities
};

const pick = (weights) => {
  let r = Math.random() * weights.reduce((s, [, w]) => s + w, 0);
  for (const [k, w] of weights) { if ((r -= w) < 0) return k; }
  return weights[0][0];
};
const between = ([a, b]) => a + Math.floor(Math.random() * (b - a + 1));

// Where to farm: each stage favours one kind (3x as likely as each other kind);
// a boss stage (richDrop) gives no favourite kind but triples the chance of วิเศษ.
export const FAVOURED = 3, RICH_MYTHIC = 3;
// wave (ออกล่า): later waves raise the odds of rare and mythic finds
export const WAVE_BOOST = [{ rare: 1, mythic: 1 }, { rare: 1.3, mythic: 1.6 }, { rare: 1.6, mythic: 2.5 }];
// luck (เบี้ยแก้): each point raises หายาก by 5% and วิเศษ by 10% of their odds
export const luckBoost = (k, luck) => 1 + (luck || 0) * (k === 'mythic' ? 0.1 : k === 'rare' ? 0.05 : 0);
export function rollCharm(stage = {}, wave = 0, luck = 0) {
  const b = WAVE_BOOST[Math.min(wave, 2)];
  const rarity = pick(Object.entries(RARITIES).map(([k, r]) => [k, r.weight * (b[k] || 1) * luckBoost(k, luck) * (stage.richDrop && k === 'mythic' ? RICH_MYTHIC : 1)]));
  const type = pick(Object.keys(CHARM_TYPES).map(k => [k, k === stage.drop ? FAVOURED : 1]));
  const c = { id: `c${Date.now().toString(36)}${Math.floor(Math.random() * 1e4)}`, type, rarity, value: between(CHARM_TYPES[type].range[rarity]) };
  // ผ้ายันต์: value 1 wards off one condition (chosen at random), value 2 both
  if (type === 'yant') c.wards = c.value >= 2 ? ['stun', 'blind'] : [Math.random() < 0.5 ? 'stun' : 'blind'];
  return c;
}

// For stat charms, the 8x8 icon that goes with the number (scenes draw icon + '+N').
export const charmStatIcon = c => ({ takrut: 'icon_hp', fang: 'icon_atk', feather: 'icon_spd' }[c.type] || null);

// ปลุกเสก: feeding other charms into one raises its เสก level (0–10). Points per charm fed:
// common 1, rare 3, mythic 10 — doubled when it is the same kind. Each level needs more.
export const ENCH_MAX = 10;
export const enchNeed = l => 5 + 5 * l;              // points from level l to l+1
export function enchLevel(pts = 0) {
  let l = 0, left = pts;
  while (l < ENCH_MAX && left >= enchNeed(l)) { left -= enchNeed(l); l++; }
  return { l, into: l >= ENCH_MAX ? 0 : left, need: l >= ENCH_MAX ? 0 : enchNeed(l) };
}
const RARITY_PTS = { common: 1, rare: 3, mythic: 10 };
export const enchPoints = (feed, main) => RARITY_PTS[feed.rarity] * (feed.type === main.type ? 2 : 1);
// what a charm gives once its เสก level is counted in
export function effective(c) {
  const e = enchLevel(c.pts).l;
  switch (c.type) {
    case 'takrut': return { value: c.value + e };
    // the first เสก step already shows (+1 at steps 1, 3, 5…; speed at 1, 5, 9)
    case 'fang': return { value: c.value + Math.ceil(e / 2) };
    case 'feather': return { value: c.value + Math.ceil(e / 4) };
    case 'lucky': return { value: c.value + 2 * e };
    case 'bia': return { value: c.value + e };
    case 'prakam': return { value: c.value + (e >= 5 ? 1 : 0) + (e >= 10 ? 1 : 0) };
    case 'yant': return { value: c.value, wards: e >= ENCH_MAX ? ['stun', 'blind'] : c.wards };
    default: return { value: c.value };
  }
}

// What a worn charm changes on a unit at the start of a fight.
export function applyCharm(u, c) {
  if (!c) return;
  const { value, wards } = effective(c);
  if (c.type === 'takrut') { u.hp += value; u.maxHp += value; }
  if (c.type === 'fang') u.atk = (u.atk || 0) + value;
  if (c.type === 'feather') u.spd = (u.spd || 10) + value;
  if (c.type === 'lucky') u.extraFind = (u.extraFind || 0) + value;
  if (c.type === 'bia') u.luck = (u.luck || 0) + value;
  if (c.type === 'prakam') u.openBlock = (u.openBlock || 0) + value;
  if (c.type === 'yant') u.wards = new Set([...(u.wards || []), ...wards]);
}

// Charm slots: one at first, a second once chapter 2 is reached. The same kind may be worn twice.
export const SLOTS = 2;
export const slotsOpen = cleared => (cleared >= 2 ? 2 : 1);
// what a retainer wears, always as [slot0, slot1] (older saves stored a single id)
export function wornIds(gear, id) {
  const w = gear?.[id];
  const a = Array.isArray(w) ? w : w ? [w] : [];
  return [a[0] || null, a[1] || null];
}
export function applyWorn(u, bag, gear, id) {
  for (const cid of wornIds(gear, id)) if (cid) applyCharm(u, bag.find(c => c.id === cid));
}
