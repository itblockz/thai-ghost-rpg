// Each monster has a repeating move pattern. A 'charge' move announces the next 'special'.
export const MONSTERS = {
  krasue: {
    name: 'กระสือ', sprite: 'krasue', hp: 40,
    pattern: ['bite', 'charge', 'special'],
    moves: {
      bite: { text: 'กระสือพุ่งเข้ากัด!', dmg: [5, 6] },
      charge: { text: 'กระสือสูดลมหายใจลึก... ไส้เรืองแสงแดง!', intent: '⚠️ ตาหน้ามันจะพ่นไส้!', dmg: [0, 0] },
      special: { text: 'กระสือพ่นไส้ใส่!', dmg: [18, 18], blockable: true },
    },
  },
};
