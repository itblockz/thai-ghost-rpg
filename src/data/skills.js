// One skill format for every unit (retainers and enemies).
// A skill is a list of effects applied in order. Add new effect types only when a skill needs them.
//   { damage: n }   – deal n damage to the target
//   { block: true } – the target ignores all damage for the rest of this round
//   { wait: n, takenMult?: x } – wind up: stop here and finish the remaining effects next turn.
//                    takenMult (optional, per skill) multiplies damage the user takes while winding up.
// target: 'enemy' (default) or 'ally' — decides what the player taps to use it.
// anim: attack animation — 'slash' (default for retainers), 'claw', 'bite', 'spit', 'shield'.
// useChance (enemies only): when ready, chance per turn that the enemy starts this skill.
export const SKILLS = {
  // retainers
  ram: { name: 'วิ่งชน', icon: 'icon_ram', anim: 'ram', cooldown: 0, effects: [{ damage: 6 }] },
  guard: { name: 'กางกันภัย', icon: 'icon_shield', cooldown: 3, target: 'ally', anim: 'shield', effects: [{ block: true }] },
  rake: { name: 'ตะกุย', icon: 'icon_claw', anim: 'claw', cooldown: 0, effects: [{ damage: 4 }] },
  frenzy: { name: 'ตะกุยรัว', icon: 'icon_frenzy', anim: 'frenzy', cooldown: 2, effects: [{ damage: 10 }] },
  // enemies
  scratch: { name: 'ตะกุย', icon: 'icon_claw', anim: 'claw', cooldown: 0, effects: [{ damage: 3 }] },
  bite: { name: 'กัด', icon: 'icon_fang', anim: 'bite', cooldown: 0, effects: [{ damage: 10 }] },
  spit: { name: 'พ่นไส้', icon: 'icon_spit', anim: 'spit', cooldown: 3, useChance: 0.5, effects: [{ wait: 1, takenMult: 2 }, { damage: 22 }] },
};

export const skillDamage = skill => skill.effects.reduce((s, e) => s + (e.damage || 0), 0);

// Plain-language facts for a skill, every number shown (used on the pre-battle screen).
export function skillFacts(skill) {
  const out = [];
  for (const e of skill.effects) {
    if (e.wait) out.push(`ตั้งท่า ${e.wait} ตาก่อนออกฤทธิ์`);
    if (e.takenMult > 1) out.push(`ระหว่างตั้งท่าโดนตี x${e.takenMult}`);
    if (e.damage != null) out.push(`อานุภาพ ${e.damage}`);
    if (e.block) out.push('กันการโจมตีให้พวกเดียวกัน 1 ตา');
  }
  out.push(skill.cooldown ? `พัก ${skill.cooldown} ตา` : 'ใช้ได้ทุกตา');
  return out;
}
