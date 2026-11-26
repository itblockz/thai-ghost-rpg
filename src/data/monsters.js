// Ghosts use the same skills as the player (see skills.js).
// Each turn a ghost uses its strongest skill that is off cooldown.
export const MONSTERS = {
  kongkoi: {
    name: 'ผีกองกอย', sprite: 'kongkoi', hp: 18, skills: ['scratch'],
    lore: 'ผีป่าตัวเล็ก ขาเดียว ชอบแกล้งคนหลงป่า',
  },
  krasue: {
    name: 'กระสือ', sprite: 'krasue', hp: 36, skills: ['bite', 'spit'],
    lore: 'หัวหญิงสาวลอยได้ มีไส้ห้อยระย้า ออกหากินยามดึก',
  },
};

// Demo journey: each stage = story before the fight, the ghost, story after.
export const STAGES = [
  { before: 'forest', monster: 'kongkoi', after: 'afterKongkoi' },
  { before: 'village', monster: 'krasue', after: 'ending' },
];
