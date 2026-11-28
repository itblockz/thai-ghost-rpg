// spd = speed: the turn timeline gives faster units earlier and more frequent turns (8 slow … 14 quick).
// lore: what it looks like + one habit that hints how it fights; no 'ผี…' opening, no numbers;
// the same words whether it is a foe or a retainer.
// One set of numbers per creature: a ghost you fight and the same ghost as your retainer share their base
// (ขั้น 1) stats and skills. Foes are raised by their stage's ขั้น (STAGES[].level); retainers by their own.
// joinLevel: the ขั้น a retainer comes with — the ขั้น it was beaten at, +3 for being bound by the heir
// (กุมารทอง starts at 5, a gift to begin with). foeSkills: the part of its set it uses as a foe.
// Retainers (บริวาร) — the player's units. Each retainer is unique (no duplicates in the team).
export const ALLIES = {
  kumarn: {
    name: 'กุมารทอง', sprite: 'kumarn', hp: 24, atk: 4, spd: 10, skills: ['ram', 'guard'], joinLevel: 5,
    lore: 'เด็กน้อยผิวทอง ผมจุก ภักดีต่อผู้เลี้ยง',
  },
  kongkoi: {
    name: 'ผีกองกอย', sprite: 'kongkoi', hp: 14, atk: 3, spd: 12, skills: ['rake', 'frenzy'], foeSkills: ['rake'], joinLevel: 4,
    lore: 'ร่างเล็กขาเดียว กระโดดว่องไว แอบดูดเลือดหัวแม่เท้าคนหลับ',
  },
  krahang: {
    name: 'ผีกระหัง', sprite: 'krahang', hp: 18, atk: 2, spd: 13, skills: ['flap', 'whack'], joinLevel: 9,
    lore: 'ชายบินด้วยกระด้งสองใบ กระพือทีลมพัดไปทั้งแถว',
  },
  krasue: {
    name: 'กระสือ', sprite: 'krasue', hp: 26, atk: 3, spd: 9, skills: ['krasueBite', 'krasueLash'], joinLevel: 5,
    lore: 'หัวหญิงสาวลอยได้ ไส้ห้อยระย้า ออกหากินยามดึก',
  },
  phrai: {
    name: 'ผีพราย', sprite: 'phrai', hp: 22, atk: 3, spd: 10, skills: ['hairBind', 'drown'], joinLevel: 6,
    lore: 'หญิงผมยาวเปียกน้ำ ซุ่มใต้ท่าน้ำ รอคนอ่อนแรงแล้วฉุดลงไป',
  },
  pop: {
    name: 'ผีปอบ', sprite: 'pop', hp: 26, atk: 3, spd: 9, skills: ['gnaw', 'gorge'], foeSkills: ['gnaw'], joinLevel: 11,
    lore: 'ลิ้นยาวห้อยถึงอก หิวไม่รู้อิ่ม ยิ่งกินยิ่งมีแรง',
  },
  khamot: {
    name: 'ผีโขมด', sprite: 'khamot', hp: 16, atk: 2, spd: 11, skills: ['khamotEmber', 'khamotHeal', 'khamotBlind'], foeSkills: ['khamotEmber', 'khamotBlind'], joinLevel: 7,
    lore: 'ดวงไฟวับแวมเหนือน้ำ ล่อคนจนตาพร่าหลงทาง',
  },
};

// Enemies — may appear several times in one fight. The common ones are the very same creatures as above;
// bosses (นายด่าน) have their own numbers and no ขั้น (กระสือ as a boss is its full-grown form).
export const ENEMIES = {
  kongkoi: ALLIES.kongkoi,
  krahang: ALLIES.krahang,
  pop: ALLIES.pop,
  phrai: ALLIES.phrai,
  khamot: ALLIES.khamot,
  krasue: {
    name: 'กระสือ', sprite: 'krasue', hp: 90, atk: 7, spd: 9, boss: true, skills: ['krasueBite', 'krasueLash'],
    lore: 'หัวหญิงสาวลอยได้ ไส้ห้อยระย้า ออกหากินยามดึก',
  },
  naga: {
    name: 'นาค', sprite: 'naga', hp: 160, atk: 4, spd: 9, boss: true, skills: ['strike', 'venom'],
    lore: 'พญางูใหญ่เฝ้าวังใต้น้ำ เขี้ยวมีพิษร้าย',
  },
  pret: {
    name: 'ผีเปรต', sprite: 'pret', hp: 340, atk: 4, spd: 7, boss: true, skills: ['smash', 'hunger'],
    lore: 'สูงเท่าต้นตาล ปากเท่ารูเข็ม หิวโหยชั่วกัปชั่วกัลป์',
  },
};
// the skills a creature uses as a foe
export const foeSkills = def => def.foeSkills || def.skills;
// ตัวหัวหน้า (hunt wave 3, and some first fights): the same creature, more ขั้น
export const ELITE_LEVELS = 4, ELITE_LEVELS_SMALL = 2;

// Chapters group stages on the map.
export const CHAPTERS = [
  { title: 'บรรพที่ ๑ — คืนเดือนดับ', start: { name: 'ศาลาอาจารย์', node: 'node_shrine' }, map: 'art_map' },
  { title: 'บรรพที่ ๒ — ลำน้ำมืด', start: { name: 'ปลายหมู่บ้าน', node: 'node_village' }, map: 'art_map2' },
  { title: 'บรรพที่ ๓ — ป่าช้าวัดร้าง', start: { name: 'ริมป่า', node: 'node_forest' }, map: 'art_map3', next: [110, 500] },
];
export const chapterOf = i => STAGES[i]?.chapter ?? 0;

export const STARTING_TEAM = ['kumarn'];

// Journey: story before → fight → story after. level = the ขั้น of this stage's (non-boss) foes.
export const STAGES = [
  { name: 'ชายป่า', level: 1, node: 'node_forest', map: [108, 262], before: 'forest', bg: 'bg_night', enemies: ['kongkoi', 'kongkoi'], after: 'afterKongkoi', drop: 'fang' },
  { name: 'หมู่บ้าน', level: 2, node: 'node_village', map: [248, 382], before: 'village', bg: 'bg_village', enemies: ['krasue'], after: 'ending', drop: 'takrut' },
  // บทที่ ๒ — ลำน้ำมืด
  { chapter: 1, name: 'ท่าน้ำ', level: 3, node: 'node_pier', map: [112, 250], before: 'pier', bg: 'bg_pier', enemies: ['phrai', 'phrai'], after: 'afterPier', drop: 'yant' },
  { chapter: 1, name: 'กลางน้ำ', level: 4, node: 'node_river', map: [246, 360], before: 'river', bg: 'bg_river', enemies: ['khamot', 'phrai', 'khamot'], after: 'afterRiver', drop: 'prakam' },
  { chapter: 1, name: 'วังนาค', level: 5, node: 'node_naga', map: [130, 440], before: 'nagaGate', bg: 'bg_naga', enemies: ['naga'], after: 'ending2', drop: 'feather', richDrop: true },
  // บทที่ ๓ — ป่าช้าวัดร้าง
  { chapter: 2, name: 'ประตูวัด', level: 6, node: 'node_gate', map: [112, 236], before: 'gate3', bg: 'bg_gate3', enemies: ['krahang', 'krahang'], after: 'afterGate3', drop: 'feather',
    // first time through (story): a flock led by a big one — he becomes your retainer
    story: { ids: ['krahang', 'krahang', 'krahang'], elite: 1, eliteLevels: 2 } },
  { chapter: 2, name: 'ลานป่าช้า', level: 7, node: 'node_yard', map: [252, 318], before: 'yard', bg: 'bg_yard', enemies: ['krahang', 'kongkoi', 'krahang'], after: 'afterYard', drop: 'lucky',
    story: { ids: ['krahang', 'pop', 'krahang'], elite: 1, eliteLevels: 4 } },
  { chapter: 2, name: 'ศาลาสวดศพ', level: 8, node: 'node_hall', map: [104, 400], before: 'hall', bg: 'bg_hall', enemies: ['pop', 'krahang', 'pop'], after: 'afterHall', drop: 'bia' },
  { chapter: 2, name: 'โบสถ์ร้าง', level: 9, node: 'node_temple', map: [250, 440], before: 'temple', bg: 'bg_temple', enemies: ['pret'], after: 'ending3', richDrop: true },
];
