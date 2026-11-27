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
    { art: 'heir', text: 'ผู้สืบทอดวิชากำตะเกียงแน่น\n\'ท่าน\' คือใคร…' },
    { art: 'art_shrine', text: 'ใครกันที่เปิดประตูหิมพานต์' },
    { art: null, end: true, text: 'จบบทที่ ๑\nคืนเดือนดับ' },
  ],
};
