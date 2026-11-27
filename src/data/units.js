// spd = speed: the turn timeline gives faster units earlier and more frequent turns (8 slow … 14 quick).
// Retainers (บริวาร) — the player's units. Each retainer is unique (no duplicates in the team).
export const ALLIES = {
  kumarn: {
    name: 'กุมารทอง', sprite: 'kumarn', hp: 28, atk: 4, spd: 10, skills: ['ram', 'guard'],
    lore: 'เด็กน้อยผิวทอง ผมจุก ภักดีต่อผู้เลี้ยง',
  },
  kongkoi: {
    name: 'ผีกองกอย', sprite: 'kongkoi', hp: 20, atk: 4, spd: 13, skills: ['rake', 'frenzy'],
    lore: 'ผีป่าขาเดียว ว่องไว ขี้แกล้ง',
  },
  krahang: {
    name: 'ผีกระหัง', sprite: 'krahang', hp: 20, atk: 3, spd: 14, skills: ['flap', 'whack'],
    lore: 'ผีชายบินด้วยกระด้งสองใบ ว่องไวกว่าผีใด',
  },
  phrai: {
    name: 'ผีพราย', sprite: 'phrai', hp: 24, atk: 4, spd: 11, skills: ['hairBind', 'drown'],
    lore: 'ผีหญิงผมเปียกจากใต้ท่าน้ำ รอจังหวะคนอ่อนแรงแล้วฉุดลงน้ำ',
  },
  pop: {
    name: 'ผีปอบ', sprite: 'pop', hp: 32, atk: 3, spd: 9, skills: ['gnaw', 'gorge'],
    lore: 'ผีปอบหิวไม่รู้อิ่ม ยิ่งกัดกินยิ่งมีแรงสู้',
  },
  khamot: {
    name: 'ผีโขมด', sprite: 'khamot', hp: 18, atk: 2, spd: 12, skills: ['khamotEmber', 'khamotHeal', 'khamotBlind'],
    lore: 'ดวงไฟลอยกลางน้ำ เคยหลอกคนหลงทาง บัดนี้ส่องทางให้',
  },
};

// Enemies — may appear several times in one fight.
export const ENEMIES = {
  kongkoi: {
    name: 'ผีกองกอย', sprite: 'kongkoi', hp: 14, spd: 11, skills: ['scratch'],
    lore: 'ผีป่าตัวเล็ก ขาเดียว ชอบแกล้งคนหลงป่า',
  },
  krahang: {
    name: 'ผีกระหัง', sprite: 'krahang', hp: 20, spd: 12, skills: ['swoop'],
    lore: 'ผีบินกระพือกระด้งโฉบลงจากฟ้า',
  },
  pop: {
    name: 'ผีปอบ', sprite: 'pop', hp: 26, spd: 10, skills: ['devour'],
    lore: 'ผีสิงกินของดิบ ยิ่งกินยิ่งมีแรง',
  },
  pret: {
    name: 'ผีเปรต', sprite: 'pret', hp: 280, spd: 7, boss: true, skills: ['smash', 'hunger'],
    lore: 'เปรตสูงเท่าต้นตาล ปากเท่ารูเข็ม หิวโหยชั่วกัปชั่วกัลป์',
  },
  phrai: {
    name: 'ผีพราย', sprite: 'phrai', hp: 26, spd: 10, skills: ['grab', 'drag'],
    lore: 'ผีหญิงผมเปียก ซุ่มใต้ท่าน้ำ ดึงคนลงไปอยู่ด้วย',
  },
  khamot: {
    name: 'ผีโขมด', sprite: 'khamot', hp: 16, spd: 10, skills: ['ember', 'lure'],
    lore: 'ดวงไฟวับแวมเหนือน้ำ หลอกให้หลงทาง',
  },
  naga: {
    name: 'นาค', sprite: 'naga', hp: 140, spd: 9, boss: true, skills: ['strike', 'venom'],
    lore: 'พญางูใหญ่เฝ้าวังใต้น้ำ เกล็ดเขียวแวววาว',
  },
  krasue: {
    name: 'กระสือ', sprite: 'krasue', hp: 68, spd: 9, boss: true, skills: ['bite', 'spit'],
    lore: 'หัวหญิงสาวลอยได้ มีไส้ห้อยระย้า ออกหากินยามดึก',
  },
};

// Chapters group stages on the map.
export const CHAPTERS = [
  { title: 'บรรพที่ ๑ — คืนเดือนดับ', start: { name: 'ศาลาอาจารย์', node: 'node_shrine' }, map: 'art_map' },
  { title: 'บรรพที่ ๒ — ลำน้ำมืด', start: { name: 'ปลายหมู่บ้าน', node: 'node_village' }, map: 'art_map2' },
  { title: 'บรรพที่ ๓ — ป่าช้าวัดร้าง', start: { name: 'ริมป่า', node: 'node_forest' }, map: 'art_map3', next: [110, 500] },
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
  { chapter: 1, name: 'วังนาค', node: 'node_naga', map: [130, 440], before: 'nagaGate', bg: 'bg_naga', enemies: ['naga'], after: 'ending2', drop: 'feather', richDrop: true },
  // บทที่ ๓ — ป่าช้าวัดร้าง
  { chapter: 2, name: 'ประตูวัด', node: 'node_gate', map: [112, 236], before: 'gate3', bg: 'bg_gate3', enemies: ['krahang', 'krahang'], after: 'afterGate3', drop: 'feather',
    // first time through (story): a flock led by a big one — he becomes your retainer
    story: { ids: ['krahang', 'krahang', 'krahang'], elite: 1, eliteMult: 2.5 } },
  { chapter: 2, name: 'ลานป่าช้า', node: 'node_yard', map: [252, 318], before: 'yard', bg: 'bg_yard', enemies: ['krahang', 'kongkoi', 'krahang'], after: 'afterYard', drop: 'lucky',
    story: { ids: ['krahang', 'pop', 'krahang'], elite: 1, eliteMult: 1.2 } },
  { chapter: 2, name: 'ศาลาสวดศพ', node: 'node_hall', map: [104, 400], before: 'hall', bg: 'bg_hall', enemies: ['pop', 'krahang', 'pop'], after: 'afterHall', drop: 'bia' },
  { chapter: 2, name: 'โบสถ์ร้าง', node: 'node_temple', map: [250, 440], before: 'temple', bg: 'bg_temple', enemies: ['pret'], after: 'ending3', richDrop: true },
];
