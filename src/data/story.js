// Story pages. Each page: { art, text, recruit? }
//   art     – texture key. Wide art (backdrops) fills the top half; small sprites are shown large.
//   text    – 1–3 short lines. Archaic but easy to read.
//   recruit – retainer id that joins the team on this page.
export const STORY = {
  intro: [
    { art: 'art_shrine', text: 'คืนเดือนดับ…\nประตูที่กั้นโลกมนุษย์กับแดนลี้ลับ แตกออก' },
    { art: 'art_shrine', text: 'อาจารย์ผู้เฝ้าประตูหายไป\nเหลือเพียงตะเกียงที่ยังอุ่น' },
    { art: 'art_note', text: '"สิ่งลี้ลับจะทะลักออกมา…\nจงพากุมารทองไปด้วย"' },
    { art: 'kumarn', text: 'กุมารทองของอาจารย์ มายืนรอข้างกาย', recruit: 'kumarn' },
  ],
  forest: [
    { art: 'bg_night', text: 'ทางเข้าป่า… มีเสียงกระโดดตุบ ๆ\nไม่ใช่ตัวเดียว' },
  ],
  afterKongkoi: [
    { art: 'kongkoi', text: 'ผีกองกอยตัวหนึ่งหมอบลง ยอมสยบ' },
    { art: 'kongkoi', text: 'ผู้สืบทอดวิชาเสกคาถาสะกดไว้\nมันยอมติดตามเป็นบริวาร', recruit: 'kongkoi' },
    { art: 'art_note', text: 'ในรังของมัน มีบันทึกของอาจารย์:\n"หัวที่ลอยได้ จะสูดลมก่อนพ่นพิษ\nจงกางกันภัยให้ผู้ที่มันจ้อง"' },
  ],
  village: [
    { art: 'art_village', text: 'หมู่บ้านปลายป่าเงียบสนิท\nทุกเรือนปิดประตูลงกลอน' },
    { art: 'art_village', text: 'เหนือยอดไม้ มีแสงแดงวูบวาบ…\nกำลังลอยต่ำลงมา' },
  ],
  ending: [
    { art: 'krasue', text: 'กระสือร่ำไห้ ก่อนสิ้นฤทธิ์…' },
    { art: 'krasue', text: '"อาจารย์เจ้า…\nอยู่กับ \'ท่าน\' แล้ว"' },
    { art: 'art_shrine', text: '\'ท่าน\' คือใคร…\nและใครกันที่เปิดประตูหิมพานต์' },
    { art: null, text: 'จบบทที่ ๑ — คืนเดือนดับ\nขอบคุณที่ร่วมเดินทาง' },
  ],
};
