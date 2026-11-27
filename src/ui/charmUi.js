import { ZOOM, FONT_FAMILY, TEXT_METRICS, PX, numFont } from '../display.js';
import { RARITIES, CHARM_TYPES, charmStatIcon, effective, enchLevel } from '../data/charms.js';

const FONT = { fontFamily: FONT_FAMILY, color: '#fff', resolution: ZOOM, ...TEXT_METRICS };
const GEMS = { common: 1, rare: 2, mythic: 3 };

// Charm name in its rarity colour, followed by 1–3 pixel gems (more = rarer) instead of a word.
export function charmTitle(scene, x, y, c, size = 15) {
  const r = RARITIES[c.rarity];
  const e = enchLevel(c.pts).l; // เสก level shown as +N after the name
  const t = scene.add.text(x, y, CHARM_TYPES[c.type].name + (e ? ` +${e}` : ''), { ...FONT, fontSize: `${size}px`, fontStyle: 'bold', color: r.color }).setOrigin(0, 0.5);
  return [t, gems(scene, x + t.width + 8, y, c.rarity)];
}

// 1–3 small cut gems (flat top, pointed bottom) in the rarity's colour.
export function gems(scene, x, y, rarity) {
  const g = scene.add.graphics(), hex = RARITIES[rarity].hex;
  for (let i = 0, gx = x; i < GEMS[rarity]; i++, gx += 8 * PX) {
    [5, 7, 5, 3, 1].forEach((w, row) => g.fillStyle(hex).fillRect(gx + (7 - w) / 2 * PX, y + (row - 2.5) * PX, w * PX, PX));
    g.fillStyle(0xffffff, 0.45).fillRect(gx + PX, y - 2.5 * PX, 5 * PX, PX);
  }
  return g;
}

// What a charm does. Base stats as picture + number (heart +N, fist +N);
// anything else as a short sentence, like a skill's description.
export function charmEffect(scene, x, y, c) {
  const stat = charmStatIcon(c);
  if (stat) return [scene.add.image(x + 16, y, stat).setScale(PX), scene.add.text(x + 38, y, `+${effective(c).value}`, numFont(15)).setOrigin(0, 0.5)];
  return [scene.add.text(x, y, charmDesc(c), { ...FONT, fontSize: '13px', color: '#ccccee' }).setOrigin(0, 0.5)];
}
export function charmDesc(c0) {
  const c = { ...c0, ...effective(c0) };
  if (c.type === 'prakam') return c.value > 1 ? `กางกันภัยตนเองใน ${c.value} ตาแรกของศึก` : 'กางกันภัยตนเองในตาแรกของศึก';
  if (c.type === 'yant') return 'ผู้สวม' + c.wards.map(w => (w === 'stun' ? 'ไม่จมน้ำ' : 'ไม่ตาพร่า')).join('และ');
  if (c.type === 'lucky') return `ชนะศึก มีโอกาส ${c.value}% ได้ของเพิ่มอีกชิ้น`;
  if (c.type === 'bia') return `โชคหนุน ${c.value} แต้ม ได้ของดีบ่อยขึ้น`;
  return '';
}
