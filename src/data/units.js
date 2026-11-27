// Retainers (บริวาร) — the player's units. Each retainer is unique (no duplicates in the team).
export const ALLIES = {
  kumarn: {
    name: 'กุมารทอง', sprite: 'kumarn', hp: 28, skills: ['ram', 'guard'],
    lore: 'เด็กน้อยผิวทอง ผมจุก ภักดีต่อผู้เลี้ยง',
  },
  kongkoi: {
    name: 'ผีกองกอย', sprite: 'kongkoi', hp: 20, skills: ['rake', 'frenzy'],
    lore: 'ผีป่าขาเดียว ว่องไว ขี้แกล้ง',
  },
};

// Enemies — may appear several times in one fight.
export const ENEMIES = {
  kongkoi: {
    name: 'ผีกองกอย', sprite: 'kongkoi', hp: 14, skills: ['scratch'],
    lore: 'ผีป่าตัวเล็ก ขาเดียว ชอบแกล้งคนหลงป่า',
  },
  krasue: {
    name: 'กระสือ', sprite: 'krasue', hp: 68, boss: true, skills: ['bite', 'spit'],
    lore: 'หัวหญิงสาวลอยได้ มีไส้ห้อยระย้า ออกหากินยามดึก',
  },
};

export const STARTING_TEAM = ['kumarn'];

// Chapter 1 journey: story before → fight → story after.
export const STAGES = [
  { name: 'ชายป่า', node: 'node_forest', map: [108, 262], before: 'forest', bg: 'bg_night', enemies: ['kongkoi', 'kongkoi'], after: 'afterKongkoi' },
  { name: 'หมู่บ้าน', node: 'node_village', map: [248, 382], before: 'village', bg: 'bg_village', enemies: ['krasue'], after: 'ending' },
];
