// One skill format for every unit (retainers and enemies).
// A skill is a list of effects applied in order. Add new effect types only when a skill needs them.
//   { damage: n, scale?: k, stat?: 'atk'|'hp' } – deal n + k × the user's stat (กำลัง by default)
//   { block: true } – the target ignores all damage for the rest of this round
//   { wait: n, takenMult?: x } – wind up: stop here and finish the remaining effects next turn.
//                    takenMult (optional, per skill) multiplies damage the user takes while winding up.
//   weakMult: x on a damage effect – × x when the target is below half its ขวัญ (ผีพราย's ฉุดจม)
//   { stun: n }    – the target loses its next n turns (dragged under water)
//   { blind: true } – the target's next damaging skill misses
//   { heal: n, scale?: k, stat?: 'atk'|'hp' } – restore n + k × stat ขวัญ (never above max)
// A skill without scale is fixed and never grows; with scale it grows with the unit's stats (and charms).
// area: true — the skill hits every living unit on the target's side.
// target: 'enemy' (default) or 'ally' — decides what the player taps to use it.
// anim: attack animation — 'slash' (default for retainers), 'claw', 'bite', 'spit', 'shield'.
// desc: what the skill does, as a short folk-tale sentence (no damage numbers — players learn
//   strength from the numbers that pop up; only notably strong skills say so). Cooldown is shown apart.
// useChance (enemies only): when ready, chance per turn that the enemy starts this skill.
export const SKILLS = {
  // retainers
  ram: { name: 'วิ่งชน', desc: 'พุ่งตัวชนศัตรูหนึ่งตน ยิ่งมีกำลังยิ่งชนแรง', icon: 'icon_ram', anim: 'ram', cooldown: 0, effects: [{ damage: 2, scale: 1 }] },
  guard: { name: 'กางกันภัย', desc: 'กางอาคมคุ้มบริวารหนึ่งตน ไม่ให้ถูกทำร้ายจนถึงตาถัดไปของผู้กาง', icon: 'icon_shield', cooldown: 3, target: 'ally', anim: 'shield', effects: [{ block: true }] },
  rake: { name: 'กระโดดถีบ', desc: 'กระโดดขาเดียวถีบศัตรูหนึ่งตน ยิ่งมีกำลังยิ่งถีบแรง', icon: 'icon_kick', anim: 'kick', cooldown: 0, effects: [{ damage: 0, scale: 1 }] },
  frenzy: { name: 'ดูดเลือดหัวแม่เท้า', desc: 'เกาะหัวแม่เท้าศัตรูหนึ่งตนแล้วดูดเลือดอย่างแรง ยิ่งมีกำลังยิ่งรุนแรงทวีคูณ', icon: 'icon_toe', anim: 'suck', cooldown: 2, effects: [{ damage: 2, scale: 2 }] },
  khamotEmber: { name: 'ไฟลวก', desc: 'ปล่อยไฟลวกศัตรูหนึ่งตน ยิ่งมีกำลังยิ่งร้อน', icon: 'icon_fire', anim: 'wisp', cooldown: 0, effects: [{ damage: 1, scale: 1 }] },
  khamotBlind: { name: 'ไฟหลอกตา', desc: 'ล่อไฟวูบวาบใส่ศัตรูหนึ่งตนจนตาพร่า การโจมตีครั้งถัดไปของมันจะพลาด', icon: 'icon_blind', anim: 'wisp', cooldown: 3, effects: [{ damage: 2 }, { blind: true }] },
  khamotHeal: { name: 'ไฟอุ่นใจ', desc: 'ส่องไฟอุ่นปลอบขวัญ และถอนพิษบริวารหนึ่งตน ยิ่งมีขวัญมากยิ่งปลอบได้มาก', icon: 'icon_heal', anim: 'heal', cooldown: 2, target: 'ally', effects: [{ heal: 2, scale: 0.4, stat: 'hp' }] },
  gnaw: { name: 'แทะ', desc: 'แทะศัตรูหนึ่งตน แล้วฟื้นขวัญตนเองเท่าที่แทะได้ ยิ่งมีกำลังยิ่งแทะได้มาก', icon: 'icon_devour', anim: 'bite', cooldown: 0, effects: [{ damage: 1, scale: 1, drain: true }] },
  gorge: { name: 'ตะกละ', desc: 'ขย้ำศัตรูหนึ่งตนอย่างตะกละ ฟื้นขวัญตนเองเท่าที่กินได้ ยิ่งมีกำลังยิ่งกินมาก', icon: 'icon_devour', anim: 'bite', cooldown: 3, effects: [{ damage: 3, scale: 2, drain: true }] },
  hairBind: { name: 'ผมรัด', desc: 'สะบัดผมเปียกพันรัดศัตรูหนึ่งตน ยิ่งมีกำลังยิ่งรัดแน่น', icon: 'icon_hair', anim: 'hair', cooldown: 0, effects: [{ damage: 0, scale: 1 }] },
  drown: { name: 'ฉุดจม', desc: 'ฉุดศัตรูหนึ่งตนลงใต้น้ำ ถ้ามันเหลือขวัญไม่ถึงครึ่ง จะแรงขึ้นสองเท่า ยิ่งมีกำลังยิ่งฉุดแรง', icon: 'icon_drag', anim: 'water', cooldown: 3, effects: [{ damage: 2, scale: 1.5, weakMult: 2 }] },
  // enemies
  flap: { name: 'กระพือกระด้ง', desc: 'กระพือกระด้งเป็นลมแรงใส่ศัตรูทุกตน ยิ่งมีกำลังยิ่งแรง', icon: 'icon_flap', anim: 'flap', cooldown: 0, area: true, effects: [{ damage: 1, scale: 0.8 }] },
  whack: { name: 'ฟาดกระด้ง', desc: 'ฟาดกระด้งใส่ศัตรูหนึ่งตนอย่างแรง ยิ่งมีกำลังยิ่งฟาดแรง', icon: 'icon_whack', anim: 'ram', cooldown: 2, effects: [{ damage: 3, scale: 2 }] },
  swoop: { name: 'โฉบ', desc: 'โฉบลงตีบริวารหนึ่งตน', icon: 'icon_whack', anim: 'claw', cooldown: 0, effects: [{ damage: 5 }] },
  devour: { name: 'กินขวัญ', desc: 'กัดกินบริวารหนึ่งตน แล้วฟื้นขวัญตนเองเท่าที่กินได้', icon: 'icon_devour', anim: 'bite', cooldown: 0, effects: [{ damage: 5, drain: true }] },
  smash: { name: 'ทุบ', desc: 'ทุบบริวารหนึ่งตนด้วยมือมหึมา', icon: 'icon_smash', anim: 'claw', cooldown: 0, effects: [{ damage: 13 }] },
  hunger: { name: 'ดูดอาคม', desc: 'ดูดอาคมของขลังที่บริวารหนึ่งตนสวมผ่านปากรูเข็ม ของขลังนั้นไร้ผลจนจบศึก', icon: 'icon_hunger', anim: 'siphon', cooldown: 3, useChance: 0.5, effects: [{ damage: 8 }, { seal: true }] },
  scratch: { name: 'กระโดดถีบ', desc: 'กระโดดขาเดียวถีบบริวารหนึ่งตน', icon: 'icon_kick', anim: 'kick', cooldown: 0, effects: [{ damage: 3 }] },
  bite: { name: 'กัด', desc: 'งับบริวารหนึ่งตนจนเจ็บ', icon: 'icon_fang', anim: 'bite', cooldown: 0, effects: [{ damage: 10 }] },
  grab: { name: 'ผมรัด', desc: 'สะบัดผมเปียกพันรัดบริวารหนึ่งตน', icon: 'icon_hair', anim: 'hair', cooldown: 0, effects: [{ damage: 5 }] },
  drag: { name: 'ดึงลงน้ำ', desc: 'ฉุดบริวารหนึ่งตนลงน้ำ ผู้ที่ถูกฉุดจะจมน้ำเสียตาถัดไป', icon: 'icon_drag', anim: 'water', cooldown: 3, useChance: 0.45, effects: [{ damage: 5 }, { stun: 1 }] },
  lure: { name: 'ไฟหลอกทาง', desc: 'ล่อไฟใส่บริวารหนึ่งตนจนตาพร่า การโจมตีครั้งถัดไปจะพลาด', icon: 'icon_blind', anim: 'wisp', cooldown: 2, useChance: 0.6, effects: [{ damage: 2 }, { blind: true }] },
  ember: { name: 'ไฟลวก', desc: 'ปล่อยไฟลวกบริวารหนึ่งตน', icon: 'icon_fire', anim: 'wisp', cooldown: 0, effects: [{ damage: 4 }] },
  strike: { name: 'ฉก', desc: 'ฉกบริวารหนึ่งตนอย่างแรง', icon: 'icon_fang', anim: 'bite', cooldown: 0, effects: [{ damage: 10 }] },
  venom: { name: 'พ่นพิษ', desc: 'พ่นพิษใส่บริวารทุกตน ผู้ที่ถูกพิษจะเจ็บต่อไปอีกหลายตา', icon: 'icon_venom', anim: 'venom', cooldown: 3, useChance: 0.55, area: true, effects: [{ damage: 5 }, { poison: { turns: 3, damage: 3 } }] },
  spit: { name: 'ฟาดไส้', desc: 'ม้วนไส้หนึ่งตา แล้วฟาดใส่บริวารที่จ้องไว้อย่างแรง ระหว่างม้วนไส้จะถูกตีเจ็บกว่าปกติ', icon: 'icon_lash', anim: 'lash', cooldown: 3, useChance: 0.5, effects: [{ wait: 1, takenMult: 2 }, { damage: 22 }] },
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
    if (e.weakMult) out.push(`แรงขึ้น ${e.weakMult} เท่าเมื่อเป้าเหลือขวัญไม่ถึงครึ่ง`);
    if (e.drain) out.push('ฟื้นขวัญตนเองเท่าที่ทำได้');
    if (e.heal) out.push(`ฟื้นขวัญ ${amount(e, 'heal', u)}${formula(e, 'heal')}`);
  }
  if (skill.area) out.push('ใส่ทุกตน');
  out.push(skill.cooldown ? `พักฤทธิ์ ${skill.cooldown} ตา` : 'ใช้ได้ทุกตา');
  return out;
}
