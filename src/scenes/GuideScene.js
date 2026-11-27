import Phaser from 'phaser';
import { ZOOM, setupCamera, FONT_FAMILY, TEXT_METRICS, PX, numFont } from '../display.js';
import { registerSprites } from '../art/sprites.js';
import { STAGES } from '../data/units.js';
import { RARITIES, CHARM_TYPES, charmStatIcon, FAVOURED, RICH_MYTHIC } from '../data/charms.js';
import { gems } from '../ui/charmUi.js';
import { cleared } from '../flow.js';
import { play } from '../audio/sfx.js';

const FONT = { fontFamily: FONT_FAMILY, color: '#fff', resolution: ZOOM, ...TEXT_METRICS };
const RANKS = ['common', 'rare', 'mythic'];

// คู่มือของขลัง: every kind of charm, what each rarity gives, and where it drops most —
// so players know where to farm. Stages not yet reached stay hidden (?).
export class GuideScene extends Phaser.Scene {
  constructor() { super('Guide'); }

  create(data) {
    setupCamera(this);
    registerSprites(this);
    const back = data?.back || { scene: 'Map' };
    this.add.rectangle(180, 320, 360, 640, 0x0c0a16);
    this.add.text(180, 26, 'คู่มือของขลัง', { ...FONT, fontSize: '20px', fontStyle: 'bold', color: '#ffe08a' }).setOrigin(0.5);
    this.add.text(14, 26, '‹ กลับ', { ...FONT, fontSize: '15px', color: '#ccccee' }).setOrigin(0, 0.5).setPadding(6, 6, 6, 6)
      .setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); this.scene.start(back.scene, back.data); });

    const reached = cleared(this);
    const known = i => i <= reached; // the next stage counts: it is on the map already

    // the odds, in plain numbers
    const total = Object.values(RARITIES).reduce((a, r) => a + r.weight, 0);
    const pct = k => `${Math.round(RARITIES[k].weight / total * 100)}%`;
    this.add.text(180, 50, `ทุกครั้งที่ชนะ  ธรรมดา ${pct('common')}  หายาก ${pct('rare')}  วิเศษ ${pct('mythic')}`, { ...FONT, fontSize: '11px', color: '#9999bb' }).setOrigin(0.5);
    const kinds = Object.keys(CHARM_TYPES).length, fav = Math.round(FAVOURED / (FAVOURED + kinds - 1) * 100);
    let y = 62;
    // two pages: four kinds, then the rest and the boss card
    const all = Object.entries(CHARM_TYPES), PER = 4, pages = Math.ceil((all.length + 1) / PER);
    const page = Math.min(data?.page || 0, pages - 1);
    for (const [type, t] of all.slice(page * PER, page * PER + PER)) {
      const h = 100;
      this.panel(180, y + h / 2, 332, h - 6, 0x161424, 0x44445e);
      this.add.image(48, y + 24, t.icon).setScale(PX);
      const name = this.add.text(76, y + 24, t.name, { ...FONT, fontSize: '16px', fontStyle: 'bold' }).setOrigin(0, 0.5);
      // the stat it raises, once, beside the name (rows below are just numbers)
      const stat = charmStatIcon({ type });
      if (stat) this.add.image(76 + name.width + 22, y + 24, stat).setScale(PX);
      // what each rarity gives
      RANKS.forEach((rk, i) => {
        const ry = y + 46 + i * 18;
        gems(this, 30, ry, rk);
        this.value(102, ry, type, t.range[rk], rk);
      });
      // where it drops most
      const si = STAGES.findIndex(s => s.drop === type);
      this.add.text(326, y + 22, `ออกบ่อยที่ ${fav}%`, { ...FONT, fontSize: '11px', color: '#9999bb' }).setOrigin(1, 0.5);
      if (si >= 0 && known(si)) {
        this.add.image(290, y + 56, STAGES[si].node).setScale(PX);
        this.add.text(290, y + 82, STAGES[si].name, { ...FONT, fontSize: '12px', color: '#ffe08a' }).setOrigin(0.5);
      } else {
        this.add.text(290, y + 58, '?', { ...FONT, fontSize: '26px', color: '#55557a' }).setOrigin(0.5);
      }
      y += h;
    }

    if (pages > 1) {
      this.add.text(180, 618, `${page + 1}/${pages}`, { ...FONT, fontSize: '13px', color: '#aaaacc' }).setOrigin(0.5);
      const flip = (label, x, to) => this.add.text(x, 618, label, { ...FONT, fontSize: '26px', fontStyle: 'bold', color: '#ffe08a' }).setOrigin(0.5).setPadding(12, 4, 12, 4)
        .setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); this.scene.restart({ ...data, page: to }); });
      if (page > 0) flip('‹', 130, page - 1);
      if (page < pages - 1) flip('›', 230, page + 1);
    }
    if (page < pages - 1) return;
    // the boss stage: no favourite kind, but วิเศษ comes more often
    const bi = STAGES.findIndex(s => s.richDrop);
    this.panel(180, y + 36, 332, 66, 0x1e1a10, 0x8a6a30);
    if (bi >= 0 && known(bi)) {
      this.add.image(48, y + 36, STAGES[bi].node).setScale(PX);
      this.add.text(76, y + 26, STAGES[bi].name, { ...FONT, fontSize: '15px', fontStyle: 'bold', color: '#ffe08a' }).setOrigin(0, 0.5);
      this.add.text(76, y + 48, `ได้ของวิเศษบ่อยขึ้น ${RICH_MYTHIC} เท่า`, { ...FONT, fontSize: '12px', color: '#ccccee' }).setOrigin(0, 0.5);
    } else {
      this.add.text(180, y + 36, 'ยังมีที่ที่ได้ของวิเศษบ่อยกว่านี้ รอผู้กล้าไปพบ', { ...FONT, fontSize: '12px', color: '#9999bb' }).setOrigin(0.5);
    }
  }

  // one rarity's value: stat charms as icon + range, others in words
  value(x, y, type, [a, b], rk) {
    const color = RARITIES[rk].color;
    const stat = charmStatIcon({ type });
    if (stat) {
      this.add.text(x, y, a === b ? `+${a}` : `+${a}–${b}`, numFont(13, color)).setOrigin(0, 0.5);
    } else {
      const span = a === b ? `${a}` : `${a}–${b}`;
      if (type === 'lucky') return this.add.text(x, y, `ได้ของเพิ่มอีกชิ้น ${span}%`, { ...FONT, fontSize: '12px', color }).setOrigin(0, 0.5);
      if (type === 'bia') return this.add.text(x, y, `โชค +${span} แต้ม`, { ...FONT, fontSize: '12px', color }).setOrigin(0, 0.5);
      const words = type === 'prakam' ? (a > 1 ? `กันภัย ${a} ตาแรก` : 'กันภัยตาแรก') : (a > 1 ? 'กันจมน้ำและตาพร่า' : 'กันจมน้ำหรือตาพร่าอย่างหนึ่ง');
      this.add.text(x, y, words, { ...FONT, fontSize: '12px', color }).setOrigin(0, 0.5);
    }
  }

  panel(x, y, w, h, fill, border, u = PX) {
    const g = this.add.graphics(), l = x - w / 2, t = y - h / 2;
    g.fillStyle(0x000000).fillRect(l + u, t, w - 2 * u, h).fillRect(l, t + u, w, h - 2 * u);
    g.fillStyle(border).fillRect(l + 2 * u, t + u, w - 4 * u, h - 2 * u).fillRect(l + u, t + 2 * u, w - 2 * u, h - 4 * u);
    g.fillStyle(fill).fillRect(l + 2 * u, t + 2 * u, w - 4 * u, h - 4 * u);
    return g;
  }
}
