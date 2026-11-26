// One skill format for both sides (player items and ghosts).
// A skill is a list of effects applied in order. Add new effect types only when a skill needs them.
//   { damage: n }  – deal n damage to the opponent
export const SKILLS = {
  cut: { name: 'ฟัน', icon: 'icon_dmg', cooldown: 0, effects: [{ damage: 6 }] },
  scratch: { name: 'ข่วน', icon: 'icon_claw', cooldown: 0, effects: [{ damage: 3 }] },
};

// Turn effects into short Thai lines for the detail card.
export function describeSkill(skill) {
  const lines = skill.effects.map(e => {
    if (e.damage != null) return `ความเสียหาย ${e.damage}`;
    return '';
  });
  lines.push(skill.cooldown ? `คูลดาวน์ ${skill.cooldown} ตา` : 'ใช้ได้ทุกตา');
  return lines.filter(Boolean);
}
