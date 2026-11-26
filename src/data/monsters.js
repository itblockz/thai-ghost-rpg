// `intent` is shown one turn BEFORE the move happens.
// Each monster has a repeating move pattern. A 'charge' move announces the next 'special'.
export const MONSTERS = {
  krasue: {
    name: 'กระสือ', sprite: 'krasue', hp: 40,
    pattern: ['bite', 'charge', 'special'],
    moves: {
      bite: { text: 'กระสือพุ่งเข้ากัด!', intent: '👁️ ตาหน้า: กระสือจะกัด (5–6)', dmg: [5, 6] },
      charge: { text: 'กระสือสูดลมหายใจลึก... ไส้เรืองแสงแดง!', intent: '😮 ตาหน้า: กระสือจะสูดลมหายใจ', dmg: [0, 0] },
      special: { text: 'กระสือพ่นไส้ใส่!', intent: '⚠️ ตาหน้า: พ่นไส้! (18) ป้องกันได้', danger: true, dmg: [18, 18], blockable: true },
    },
  },
};
