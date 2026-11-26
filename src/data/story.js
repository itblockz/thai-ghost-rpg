// Story pages. Each page: { art, text, give? }
//   art  – texture key. Wide art (backdrops) fills the top half; small sprites are shown large.
//   text – 1–2 short lines. Archaic but easy to read.
//   give – item id the player receives on this page.
export const STORY = {
  intro: [
    { art: 'art_shrine', text: 'คืนเดือนดับ…\nลมเย็นพัดผ่านศาลาวัดร้าง' },
    { art: 'art_shrine', text: 'อาจารย์หายไป เหลือไว้เพียงตะเกียงที่ยังอุ่น\nกับบันทึกขาดวิ่นหนึ่งแผ่น' },
    { art: 'art_note', text: '"ข้าจะไปจัดการเรื่องในป่า… อย่าตามมา"' },
    { art: 'item_knife', text: 'ศิษย์คว้ามีดหมอประจำตัว\nแล้วออกตามรอยอาจารย์เข้าป่า' },
  ],
  forest: [
    { art: 'bg_night', text: 'ทางเข้าป่า… มีเสียงกระโดดตุบ ๆ อยู่ข้างหลัง' },
    { art: 'kongkoi', text: 'สิ่งที่มีขาเดียว กำลังหัวเราะคิกคัก' },
  ],
  afterKongkoi: [
    { art: 'bg_night', text: 'ในรังของผีกองกอย\nมีของที่มันขโมยมาซ่อนไว้มากมาย' },
    { art: 'item_takrut', text: 'ตะกรุดของอาจารย์!', give: 'takrut' },
    { art: 'art_note', text: 'ในตะกรุดมีบันทึกพับไว้:\n"หัวที่ลอยได้ จะสูดลมก่อนพ่นพิษ\nยามนั้นจงปลุกอาคมกันภัย"' },
  ],
  village: [
    { art: 'art_village', text: 'หมู่บ้านปลายป่าเงียบสนิท\nทุกเรือนปิดประตูลงกลอน' },
    { art: 'art_village', text: 'เหนือยอดไม้ มีแสงแดงวูบวาบ…\nกำลังลอยต่ำลงมา' },
  ],
  ending: [
    { art: 'krasue', text: 'กระสือร่ำไห้ ก่อนสิ้นฤทธิ์…' },
    { art: 'krasue', text: '"อาจารย์เจ้า…\nอยู่กับ \'ท่าน\' แล้ว"' },
    { art: null, text: 'จบเดโม\nขอบคุณที่ร่วมเดินทาง' },
  ],
};
