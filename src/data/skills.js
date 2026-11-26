// One skill format for both sides (player items and ghosts).
// A skill is a list of effects applied in order. Add new effect types only when a skill needs them.
//   { damage: n }   – deal n damage to the opponent
//   { block: true } – cancel all damage the user would take for the rest of this round
// target: 'enemy' (default) or 'self' — decides what the player taps to use it.
// startCooldown: cooldown the skill already has when the fight begins.
export const SKILLS = {
  cut: { name: 'ฟันมีดหมอ', icon: 'icon_dmg', cooldown: 0, effects: [{ damage: 6 }] },
  ward: { name: 'ปลุกตะกรุด', icon: 'icon_shield', cooldown: 3, target: 'self', effects: [{ block: true }] },
  scratch: { name: 'ตะกุย', icon: 'icon_claw', cooldown: 0, effects: [{ damage: 3 }] },
  bite: { name: 'กัด', icon: 'icon_fang', cooldown: 0, effects: [{ damage: 5 }] },
  spit: { name: 'พ่นไส้', icon: 'icon_spit', cooldown: 3, startCooldown: 2, effects: [{ damage: 16 }] },
};

export const skillDamage = skill => skill.effects.reduce((s, e) => s + (e.damage || 0), 0);
