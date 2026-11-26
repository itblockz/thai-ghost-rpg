// Ghosts use the same skills as the player (see skills.js).
// Each turn a ghost uses its strongest skill that is off cooldown.
// reward: item the player receives after defeating this ghost.
export const MONSTERS = {
  kongkoi: {
    name: 'ผีกองกอย', sprite: 'kongkoi', hp: 18, skills: ['scratch'], reward: 'takrut',
    lore: 'ผีป่าตัวเล็ก ขาเดียว ชอบแกล้งคนหลงป่า',
  },
  krasue: {
    name: 'กระสือ', sprite: 'krasue', hp: 30, skills: ['bite', 'spit'],
    lore: 'หัวหญิงสาวลอยได้ มีไส้ห้อยระย้า ออกหากินยามดึก',
  },
};

// Fight order for the demo.
export const STAGES = ['kongkoi', 'krasue'];
