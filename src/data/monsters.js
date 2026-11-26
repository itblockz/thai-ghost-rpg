// Monsters loop through `pattern`. Moves:
//  dmg        – damage dealt to the player
//  addStatus  – status the monster gives itself
//  needs      – status required; if missing the move fizzles (monster is stunned that turn)
export const MONSTERS = {
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
