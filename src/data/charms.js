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
};

const pick = (weights) => {
  let r = Math.random() * weights.reduce((s, [, w]) => s + w, 0);
  for (const [k, w] of weights) { if ((r -= w) < 0) return k; }
  return weights[0][0];
};
const between = ([a, b]) => a + Math.floor(Math.random() * (b - a + 1));

export function rollCharm() {
  const rarity = pick(Object.entries(RARITIES).map(([k, r]) => [k, r.weight]));
  const type = pick(Object.keys(CHARM_TYPES).map(k => [k, 1]));
  const c = { id: `c${Date.now().toString(36)}${Math.floor(Math.random() * 1e4)}`, type, rarity, value: between(CHARM_TYPES[type].range[rarity]) };
  // ผ้ายันต์: value 1 wards off one condition (chosen at random), value 2 both
  if (type === 'yant') c.wards = c.value >= 2 ? ['stun', 'blind'] : [Math.random() < 0.5 ? 'stun' : 'blind'];
  return c;
}

export function charmText(c) {
  switch (c.type) {
    case 'takrut': return `ขวัญ +${c.value}`;
    case 'fang': return `กำลัง +${c.value}`;
    case 'prakam': return `กันภัยตนเอง ${c.value} ตาแรก`;
    case 'yant': return c.wards.map(w => (w === 'stun' ? 'กันจมน้ำ' : 'กันตาพร่า')).join(' และ').replace('และกันตาพร่า', 'และตาพร่า');
    default: return '';
  }
}
export const charmName = c => `${CHARM_TYPES[c.type].name} (${RARITIES[c.rarity].name})`;

// What a worn charm changes on a unit at the start of a fight.
export function applyCharm(u, c) {
  if (!c) return;
  if (c.type === 'takrut') { u.hp += c.value; u.maxHp += c.value; }
  if (c.type === 'fang') u.atk = (u.atk || 0) + c.value;
  if (c.type === 'prakam') u.openBlock = c.value;
  if (c.type === 'yant') u.wards = new Set(c.wards);
}
