import { ZOOM, FONT_FAMILY, TEXT_METRICS, PX, numFont } from '../display.js';
import { RARITIES, CHARM_TYPES, charmStatIcon } from '../data/charms.js';
import { SPRITES } from '../art/sprites.js';

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
    [3, 5, 3, 1].forEach((w, row) => g.fillStyle(r.hex).fillRect(gx + (5 - w) / 2 * PX, y + (row - 2) * PX, w * PX, PX));
    [3].forEach((w, row) => g.fillStyle(0xffffff, 0.45).fillRect(gx + (5 - w) / 2 * PX, y + (row - 2) * PX, w * PX, PX));
    gx += 6 * PX;
  }
  return [t, g];
}

// What a charm does, as 8x8 pictures and numbers: ❤+N, ✊+N, shield ×N (opening turns),
// or the conditions a ยันต์ wards off, each crossed out.
export function charmEffect(scene, x, y, c) {
  const objs = [];
  const icon = (k, ix) => objs.push(scene.add.image(ix, y, k).setScale(PX));
  const stat = charmStatIcon(c);
  if (stat) { icon(stat, x + 12); objs.push(scene.add.text(x + 30, y, `+${c.value}`, numFont(15)).setOrigin(0, 0.5)); }
  else if (c.type === 'prakam') { icon('mini_shield', x + 12); objs.push(scene.add.text(x + 30, y, `×${c.value}`, numFont(15)).setOrigin(0, 0.5)); }
  else if (c.type === 'yant') {
    c.wards.forEach((w, i) => {
      const ix = x + 12 + i * 36;
      icon(w === 'stun' ? 'mini_drag' : 'mini_blind', ix);
      const g = scene.add.graphics();
      for (let k = 0; k < 8; k++) g.fillStyle(0xff4455).fillRect(ix - 4 * PX + k * PX, y + 3 * PX - k * PX, PX, PX);
      objs.push(g);
    });
  }
  return objs;
}

// The head of a retainer's sprite, cropped, at the shared pixel size — "who wears this".
export function headOf(scene, x, y, key, rows = 12) {
  const grid = SPRITES[key];
  const top = grid.findIndex(r => /[^.]/.test(r));
  const img = scene.add.image(x, y, key).setScale(PX).setOrigin(0.5, (top + rows / 2) / grid.length);
  img.setCrop(0, top * (img.width / grid[0].length), img.width, rows * (img.height / grid.length));
  return img;
}
