// One skill format for both sides (player items and ghosts).
// A skill is a list of effects applied in order. Add new effect types only when a skill needs them.
//   { damage: n }  – deal n damage to the opponent
export const SKILLS = {
  cut: { name: 'ฟันมีดหมอ', icon: 'icon_dmg', cooldown: 0, effects: [{ damage: 6 }] },
  scratch: { name: 'ตะกุย', icon: 'icon_claw', cooldown: 0, effects: [{ damage: 3 }] },
};

