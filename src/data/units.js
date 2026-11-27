// Retainers (บริวาร) — the player's units. Each retainer is unique (no duplicates in the team).
export const ALLIES = {
  kumarn: {
    name: 'กุมารทอง', sprite: 'kumarn', hp: 28, atk: 4, skills: ['ram', 'guard'],
    lore: 'เด็กน้อยผิวทอง ผมจุก ภักดีต่อผู้เลี้ยง',
  },
  kongkoi: {
    name: 'ผีกองกอย', sprite: 'kongkoi', hp: 20, atk: 4, skills: ['rake', 'frenzy'],
    lore: 'ผีป่าขาเดียว ว่องไว ขี้แกล้ง',
  },
  khamot: {
    name: 'ผีโขมด', sprite: 'khamot', hp: 18, atk: 2, skills: ['khamotEmber', 'khamotHeal', 'khamotBlind'],
    lore: 'ดวงไฟลอยกลางน้ำ เคยหลอกคนหลงทาง บัดนี้ส่องทางให้',
  },
};

// Enemies — may appear several times in one fight.
export const ENEMIES = {
  kongkoi: {
    name: 'ผีกองกอย', sprite: 'kongkoi', hp: 14, skills: ['scratch'],
    lore: 'ผีป่าตัวเล็ก ขาเดียว ชอบแกล้งคนหลงป่า',
  },
  phrai: {
    name: 'ผีพราย', sprite: 'phrai', hp: 26, skills: ['grab', 'drag'],
    lore: 'ผีหญิงผมเปียก ซุ่มใต้ท่าน้ำ ดึงคนลงไปอยู่ด้วย',
  },
  khamot: {
    name: 'ผีโขมด', sprite: 'khamot', hp: 16, skills: ['ember', 'lure'],
    lore: 'ดวงไฟวับแวมเหนือน้ำ หลอกให้หลงทาง',
  },
  naga: {
    name: 'นาค', sprite: 'naga', hp: 110, boss: true, skills: ['strike', 'venom'],
    lore: 'พญางูใหญ่เฝ้าวังใต้น้ำ เกล็ดเขียวแวววาว',
  },
  krasue: {
    name: 'กระสือ', sprite: 'krasue', hp: 68, boss: true, skills: ['bite', 'spit'],
    lore: 'หัวหญิงสาวลอยได้ มีไส้ห้อยระย้า ออกหากินยามดึก',
  },
};

// Chapters group stages on the map.
export const CHAPTERS = [
  { title: 'บรรพที่ ๑ — คืนเดือนดับ', start: { name: 'ศาลาอาจารย์', node: 'node_shrine' }, map: 'art_map' },
  { title: 'บรรพที่ ๒ — ลำน้ำมืด', start: { name: 'ปลายหมู่บ้าน', node: 'node_village' }, map: 'art_map2' },
];
export const chapterOf = i => STAGES[i]?.chapter ?? 0;

export const STARTING_TEAM = ['kumarn'];

// Chapter 1 journey: story before → fight → story after.
export const STAGES = [
  { name: 'ชายป่า', node: 'node_forest', map: [108, 262], before: 'forest', bg: 'bg_night', enemies: ['kongkoi', 'kongkoi'], after: 'afterKongkoi', drop: 'fang' },
  { name: 'หมู่บ้าน', node: 'node_village', map: [248, 382], before: 'village', bg: 'bg_village', enemies: ['krasue'], after: 'ending', drop: 'takrut' },
  // บทที่ ๒ — ลำน้ำมืด
  { chapter: 1, name: 'ท่าน้ำ', node: 'node_pier', map: [112, 250], before: 'pier', bg: 'bg_pier', enemies: ['phrai', 'phrai'], after: 'afterPier', drop: 'yant' },
  { chapter: 1, name: 'กลางน้ำ', node: 'node_river', map: [246, 360], before: 'river', bg: 'bg_river', enemies: ['khamot', 'phrai', 'khamot'], after: 'afterRiver', drop: 'prakam' },
  { chapter: 1, name: 'วังนาค', node: 'node_naga', map: [130, 440], before: 'nagaGate', bg: 'bg_naga', enemies: ['naga'], after: 'ending2', richDrop: true },
];
