import { ZOOM, FONT_FAMILY, TEXT_METRICS, PX, numFont } from '../display.js';
import { RARITIES, CHARM_TYPES, charmStatIcon } from '../data/charms.js';

const FONT = { fontFamily: FONT_FAMILY, color: '#fff', resolution: ZOOM, ...TEXT_METRICS };
const GEMS = { common: 1, rare: 2, mythic: 3 };

// Charm name in its rarity colour, followed by 1–3 pixel gems (more = rarer) instead of a word.
export function charmTitle(scene, x, y, c, size = 15) {
  const r = RARITIES[c.rarity];
  const t = scene.add.text(x, y, CHARM_TYPES[c.type].name, { ...FONT, fontSize: `${size}px`, fontStyle: 'bold', color: r.color }).setOrigin(0, 0.5);
  const g = scene.add.graphics();
  let gx = x + t.width + 8;
  // each gem a small cut-gem shape (flat top, pointed bottom)
  for (let i = 0; i < GEMS[c.rarity]; i++) {
    // colour body, lighter top facet
    [5, 7, 5, 3, 1].forEach((w, row) => g.fillStyle(r.hex).fillRect(gx + (7 - w) / 2 * PX, y + (row - 2.5) * PX, w * PX, PX));
    [5].forEach((w, row) => g.fillStyle(0xffffff, 0.45).fillRect(gx + (7 - w) / 2 * PX, y + (row - 2.5) * PX, w * PX, PX));
    gx += 8 * PX;
  }
  return [t, g];
}

// What a charm does. Base stats as picture + number (heart +N, fist +N);
// anything else as a short sentence, like a skill's description.
export function charmEffect(scene, x, y, c) {
  const stat = charmStatIcon(c);
  if (stat) return [scene.add.image(x + 16, y, stat).setScale(PX), scene.add.text(x + 38, y, `+${c.value}`, numFont(15)).setOrigin(0, 0.5)];
  return [scene.add.text(x, y, charmDesc(c), { ...FONT, fontSize: '13px', color: '#ccccee' }).setOrigin(0, 0.5)];
}
export function charmDesc(c) {
  if (c.type === 'prakam') return c.value > 1 ? `กางกันภัยตนเองใน ${c.value} ตาแรกของศึก` : 'กางกันภัยตนเองในตาแรกของศึก';
  if (c.type === 'yant') return 'ผู้สวม' + c.wards.map(w => (w === 'stun' ? 'ไม่จมน้ำ' : 'ไม่ตาพร่า')).join('และ');
  return '';
}
