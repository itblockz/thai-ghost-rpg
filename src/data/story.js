// Story pages. Each page: { art, text, recruit? }
//   art     – texture key. Wide art (backdrops) fills the top half; small sprites are shown large.
//   text    – 1–3 short lines. Archaic but easy to read.
//   recruit – retainer id that joins the team on this page.
export const STORY = {
  intro: [
    { art: 'art_shrine', text: 'คืนเดือนดับ…\nประตูสู่แดนลี้ลับแตกออก' },
    { art: 'art_shrine', text: 'อาจารย์หายไป\nเหลือเพียงตะเกียงที่ยังอุ่น' },
    { art: 'heir', text: 'ศิษย์ผู้สืบทอดวิชา\nยกตะเกียงของอาจารย์ขึ้น' },
    { art: 'art_note', text: '"จงพากุมารทองไปด้วย"' },
    { art: 'kumarn', text: 'กุมารทองมายืนข้างกาย', recruit: 'kumarn' },
  ],
  forest: [
    { art: 'art_forest', text: 'เสียงกระโดดตุบ ๆ…\nไม่ใช่ตัวเดียว' },
  ],
  afterKongkoi: [
    { art: 'kongkoi', text: 'ผีกองกอยตัวหนึ่งหมอบลง ยอมสยบ' },
    { art: 'heir', text: 'ผู้สืบทอดวิชาเสกคาถา…' },
    { art: 'kongkoi', text: 'สะกดผีกองกอยไว้เป็นบริวาร', recruit: 'kongkoi' },
    { art: 'art_note', text: 'บันทึกอาจารย์:\n"หัวลอยจะสูดลมก่อนพ่น\nจงกางกันภัยให้ผู้ที่มันจ้อง"' },
  ],
  village: [
    { art: 'art_village', text: 'หมู่บ้านเงียบสนิท\nทุกเรือนลงกลอน' },
    { art: 'art_village', text: 'แสงแดงวูบวาบเหนือยอดไม้…' },
  ],
  ending: [
    { art: 'krasue', text: 'กระสือร่ำไห้…' },
    { art: 'krasue', text: '"อาจารย์เจ้า…\nอยู่กับ \'ท่าน\' แล้ว"' },
    { art: 'krasue', text: '"ข้าเองก็อยากรู้ว่า \'ท่าน\' คือใคร\nให้ข้าตามไปด้วยเถิด"' },
    { art: 'krasue', text: 'กระสือลอยมาอยู่ข้างกาย', recruit: 'krasue' },
    { art: 'heir', text: 'ผู้สืบทอดวิชากำตะเกียงแน่น\n\'ท่าน\' คือใคร…' },
    { art: 'art_shrine', text: 'ใครกันที่เปิดประตูหิมพานต์' },
    { art: null, end: true, text: 'จบบรรพที่ ๑\nคืนเดือนดับ' },
  ],
  // ---- บทที่ ๒ — ลำน้ำมืด ----
  pier: [
    { art: 'art_pier', text: 'ตามรอย \'ท่าน\' มาถึงท่าน้ำ\nน้ำนิ่งผิดปกติ' },
    { art: 'phrai', text: 'หญิงผมเปียกโผล่ขึ้นจากน้ำ…\nมิใช่ตนเดียว' },
  ],
  afterPier: [
    { art: 'art_pier', text: 'ผีพรายทั้งสองตนจมหายลงใต้น้ำ' },
    { art: 'phrai', text: 'ครู่หนึ่ง ตนหนึ่งโผล่ขึ้นมาอีก\nผมเปียกปรกหน้า ก้มหัวให้' },
    { art: 'phrai', text: 'ผีพรายยอมเป็นบริวาร', recruit: 'phrai' },
    { art: 'heir', text: 'ผู้สืบทอดวิชาลงเรือ\nพายออกกลางลำน้ำ' },
  ],
  river: [
    { art: 'art_river', text: 'กลางน้ำมีดวงไฟวับแวม\nเรียกให้พายตามไป' },
  ],
  afterRiver: [
    { art: 'khamot', text: 'ดวงไฟหยุดวูบวาบ\nลอยลงแทบเท้า' },
    { art: 'heir', text: 'ผู้สืบทอดวิชาเสกคาถา…' },
    { art: 'khamot', text: 'ผีโขมดยอมส่องทางให้\nเป็นบริวาร', recruit: 'khamot' },
    { art: 'art_note', text: 'บันทึกอาจารย์:\n"นาคพ่นพิษใส่บริวารทุกตน\nกางกันภัยได้แต่ตนเดียว ที่เหลือจงรักษา"' },
  ],
  nagaGate: [
    { art: 'art_naga', text: 'ใต้น้ำลึกมีวังเก่า\nราวบันไดเป็นนาค' },
    { art: 'naga', text: '"ผู้ใดบังอาจ\nล่วงเข้าเขตแดนของข้า"' },
  ],
  ending2: [
    { art: 'naga', text: 'นาคขดตัวลง\nยอมรับในฝีมือ' },
    { art: 'naga', text: '"อาจารย์เจ้าผ่านทางนี้ไป\nมุ่งสู่ป่าหิมพานต์"' },
    { art: 'heir', text: 'ผู้สืบทอดวิชามองไปยังขอบฟ้า…' },
    { art: null, end: true, text: 'จบบรรพที่ ๒\nลำน้ำมืด' },
  ],
  // ---- บรรพที่ ๓ — ป่าช้าวัดร้าง ----
  gate3: [
    { art: 'art_gate3', text: 'กลางป่ามีวัดร้าง\nประตูผุพังเปิดอ้าอยู่' },
    { art: 'krahang', text: 'ผีกระหังฝูงหนึ่งโฉบลงมาขวางทาง' },
  ],
  afterGate3: [
    { art: 'krahang', text: 'ผีกระหังตนหนึ่งร่วงลงพื้น\nกระด้งสองใบยังสั่นระริก' },
    { art: 'krahang', text: 'มันก้มหัวยอมเป็นบริวาร', recruit: 'krahang' },
    { art: 'art_note', text: 'บันทึกอาจารย์:\n"ป่าช้าแห่งนี้ผีชุม\nฆ่าเท่าไรก็ไม่หมด"' },
  ],
  yard: [
    { art: 'art_yard', text: 'ลานป่าช้าเต็มไปด้วยเจดีย์บรรจุกระดูก\nเงาดำเคลื่อนไหวไปมา' },
  ],
  afterYard: [
    { art: 'heir', text: 'ผู้สืบทอดวิชาเห็นแสงเทียน\nในศาลาสวดศพ' },
  ],
  hall: [
    { art: 'art_hall', text: 'ในศาลามีเสียงเคี้ยวกรอบแกรบ…' },
    { art: 'pop', text: 'ผีปอบหันมา ลิ้นยาวห้อยลงถึงอก' },
  ],
  afterHall: [
    { art: 'pop', text: 'ผีปอบทรุดลง ท้องยังร้องโครกคราก' },
    { art: 'pop', text: 'ผู้สืบทอดวิชาโยนไข่ต้มให้ฟองหนึ่ง\nมันกลืนแล้วยอมตามมา', recruit: 'pop' },
    { art: 'art_note', text: 'บันทึกอาจารย์:\n"เปรตในโบสถ์หิวไม่รู้อิ่ม\nดูดได้แม้อาคมของขลัง\nอย่าพึ่งของชิ้นเดียว"' },
  ],
  temple: [
    { art: 'art_temple', text: 'โบสถ์ร้างมืดสนิท\nบางสิ่งสูงเท่าต้นตาลยืนอยู่ข้างใน' },
    { art: 'pret', text: '"หิว… หิวเหลือเกิน…"' },
  ],
  ending3: [
    { art: 'pret', text: 'เปรตทรุดลง\nเสียงหิวโหยค่อย ๆ เงียบไป' },
    { art: 'pret', text: '"อาจารย์เจ้าทำบุญให้ข้า\nแล้วเดินลึกเข้าป่าหิมพานต์"' },
    { art: 'heir', text: 'รอยเท้าอาจารย์ยังใหม่อยู่…' },
    { art: null, end: true, text: 'จบบรรพที่ ๓\nป่าช้าวัดร้าง' },
  ],
};
