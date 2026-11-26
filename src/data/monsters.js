// Monsters loop through `pattern`. Moves:
//  dmg        – damage dealt to the player
//  addStatus  – status the monster gives itself
//  needs      – status required; if missing the move fizzles (monster is stunned that turn)
export const MONSTERS = {
  // Tutorial ghost: one simple move every turn.
  kongkoi: {
    name: 'ผีกองกอย', sprite: 'kongkoi', hp: 18,
    pattern: ['scratch'],
    moves: {
      scratch: { icon: '🐾', dmg: 3 },
    },
  },
  // Planned 2nd ghost (needs ตะกรุด) — not used yet.
  krasue: {
    name: 'กระสือ', sprite: 'krasue', hp: 30,
    pattern: ['bite', 'inhale', 'spit'],
    moves: {
      bite: { icon: '🦷', dmg: 5 },
      inhale: { icon: '💨', addStatus: 'charge' },
      spit: { icon: '⚠️', dmg: 20, needs: 'charge', danger: true, fizzle: 'สำลัก!' },
    },
  },
};
