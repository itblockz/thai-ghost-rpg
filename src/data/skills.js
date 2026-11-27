// One skill format for every unit (retainers and enemies).
// A skill is a list of effects applied in order. Add new effect types only when a skill needs them.
//   { damage: n, scale?: k, stat?: 'atk'|'hp' } – deal n + k × the user's stat (กำลัง by default)
//   { block: true } – the target ignores all damage for the rest of this round
//   { wait: n, takenMult?: x } – wind up: stop here and finish the remaining effects next turn.
//                    takenMult (optional, per skill) multiplies damage the user takes while winding up.
//   { stun: n }    – the target loses its next n turns (dragged under water)
//   { blind: true } – the target's next damaging skill misses
//   { heal: n, scale?: k, stat?: 'atk'|'hp' } – restore n + k × stat ขวัญ (never above max)
// A skill without scale is fixed and never grows; with scale it grows with the unit's stats (and charms).
// area: true — the skill hits every living unit on the target's side.
// target: 'enemy' (default) or 'ally' — decides what the player taps to use it.
// anim: attack animation — 'slash' (default for retainers), 'claw', 'bite', 'spit', 'shield'.
// useChance (enemies only): when ready, chance per turn that the enemy starts this skill.
export const SKILLS = {
  // retainers
  ram: { name: 'วิ่งชน', icon: 'icon_ram', anim: 'ram', cooldown: 0, effects: [{ damage: 2, scale: 1 }] },
  guard: { name: 'กางกันภัย', icon: 'icon_shield', cooldown: 3, target: 'ally', anim: 'shield', effects: [{ block: true }] },
  rake: { name: 'ตะกุย', icon: 'icon_claw', anim: 'claw', cooldown: 0, effects: [{ damage: 0, scale: 1 }] },
  frenzy: { name: 'ตะกุยรัว', icon: 'icon_frenzy', anim: 'frenzy', cooldown: 2, effects: [{ damage: 2, scale: 2 }] },
  khamotEmber: { name: 'ไฟลวก', icon: 'icon_heal', anim: 'wisp', cooldown: 0, effects: [{ damage: 1, scale: 1 }] },
  khamotBlind: { name: 'ไฟหลอกตา', icon: 'icon_blind', anim: 'wisp', cooldown: 3, effects: [{ damage: 2 }, { blind: true }] },
  khamotHeal: { name: 'ไฟอุ่นใจ', icon: 'icon_heal', anim: 'heal', cooldown: 2, target: 'ally', effects: [{ heal: 5, scale: 0.2, stat: 'hp' }] },
  // enemies
  scratch: { name: 'ตะกุย', icon: 'icon_claw', anim: 'claw', cooldown: 0, effects: [{ damage: 3 }] },
  bite: { name: 'กัด', icon: 'icon_fang', anim: 'bite', cooldown: 0, effects: [{ damage: 10 }] },
  grab: { name: 'ข่วน', icon: 'icon_claw', anim: 'claw', cooldown: 0, effects: [{ damage: 5 }] },
  drag: { name: 'ดึงลงน้ำ', icon: 'icon_drag', anim: 'water', cooldown: 3, useChance: 0.45, effects: [{ damage: 5 }, { stun: 1 }] },
  lure: { name: 'ไฟหลอกทาง', icon: 'icon_blind', anim: 'wisp', cooldown: 2, useChance: 0.6, effects: [{ damage: 2 }, { blind: true }] },
  ember: { name: 'ไฟลวก', icon: 'icon_heal', anim: 'wisp', cooldown: 0, effects: [{ damage: 4 }] },
  strike: { name: 'ฉก', icon: 'icon_fang', anim: 'bite', cooldown: 0, effects: [{ damage: 9 }] },
  venom: { name: 'พ่นพิษ', icon: 'icon_venom', anim: 'venom', cooldown: 3, useChance: 0.55, area: true, effects: [{ wait: 1, takenMult: 2 }, { damage: 12 }] },
  spit: { name: 'พ่นไส้', icon: 'icon_spit', anim: 'spit', cooldown: 3, useChance: 0.5, effects: [{ wait: 1, takenMult: 2 }, { damage: 22 }] },
};

// base + scale × stat, for a unit ({ atk, maxHp }); without a unit, just the base.
const STAT = { atk: u => u?.atk || 0, hp: u => u?.maxHp || 0 };
export const amount = (e, key, u) => Math.round(e[key] + (e.scale || 0) * STAT[e.stat || 'atk'](u));
const formula = (e, key) => (e.scale ? ` (${e[key] ? `${e[key]} + ` : ''}${e.stat === 'hp' ? 'ขวัญสูงสุด' : 'กำลัง'}×${e.scale})` : '');
export const skillDamage = (skill, u) => skill.effects.reduce((s, e) => s + (e.damage != null ? amount(e, 'damage', u) : 0), 0);

// Plain-language facts for a skill, every number shown (used on the pre-battle screen).
export function skillFacts(skill, u) {
  const out = [];
  for (const e of skill.effects) {
    if (e.wait) out.push(`ตั้งท่า ${e.wait} ตาก่อนออกฤทธิ์`);
    if (e.takenMult > 1) out.push(`ระหว่างตั้งท่าถูกตีแรงขึ้น ${e.takenMult} เท่า`);
    if (e.damage != null) out.push(`อานุภาพ ${amount(e, 'damage', u)}${formula(e, 'damage')}`);
    if (e.block) out.push('กันภัยให้บริวาร 1 ตา');
    if (e.stun) out.push(`เป้าเสียตา ${e.stun} ตา`);
    if (e.blind) out.push('เป้าตาพร่า ตีครั้งหน้าพลาด');
    if (e.heal) out.push(`ฟื้นขวัญ ${amount(e, 'heal', u)}${formula(e, 'heal')}`);
  }
  if (skill.area) out.push('ใส่ทุกตน');
  out.push(skill.cooldown ? `พักฤทธิ์ ${skill.cooldown} ตา` : 'ใช้ได้ทุกตา');
  return out;
}
