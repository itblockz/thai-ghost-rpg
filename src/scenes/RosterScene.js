import Phaser from 'phaser';
import { ZOOM, setupCamera, FONT_FAMILY, TEXT_METRICS, PX, BG_PX, idleFrames, numFont } from '../display.js';
import { registerSprites } from '../art/sprites.js';
import { ALLIES } from '../data/units.js';
import { SKILLS } from '../data/skills.js';
import { RARITIES, CHARM_TYPES, applyCharm } from '../data/charms.js';
import { charmTitle, charmEffect, headOf } from '../ui/charmUi.js';
import { currentTeam } from '../flow.js';
import { saveFrom } from '../save.js';
import { play } from '../audio/sfx.js';

const FONT = { fontFamily: FONT_FAMILY, color: '#fff', resolution: ZOOM, ...TEXT_METRICS };
const PER_PAGE = 12;
const RARITY_ORDER = { mythic: 0, rare: 1, common: 2 };
const slots = n => (n === 1 ? [180] : n === 2 ? [105, 255] : [65, 180, 295]);

// จัดบริวาร: every retainer in full, and the whole bag of charms — look before you wear, page through,
// throw away. Opened from the map or the prep screen (and returns there).
export class RosterScene extends Phaser.Scene {
  constructor() { super('Roster'); }

  create(data) {
    setupCamera(this);
    registerSprites(this);
    this.back = data?.back || { scene: 'Map' };
    this.ids = currentTeam(this);
    this.sel = data?.sel && this.ids.includes(data.sel) ? data.sel : this.ids[0];
    this.page = data?.page || 0;
    this.picked = null;      // charm id under inspection
    this.confirmDrop = null; // charm id awaiting a second tap to throw away

    this.add.rectangle(180, 320, 360, 640, 0x0b0b1a);
    this.add.image(180, 0, 'art_map').setOrigin(0.5, 0).setScale(BG_PX).setAlpha(0.25);
    this.add.text(180, 26, 'บริวาร', { ...FONT, fontSize: '20px', fontStyle: 'bold', color: '#ffe08a' }).setOrigin(0.5);
    this.add.text(14, 26, '‹ กลับ', { ...FONT, fontSize: '15px', color: '#ccccee' }).setOrigin(0, 0.5).setPadding(6, 6, 6, 6)
      .setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); this.scene.start(this.back.scene, this.back.data); });

    // retainer row
    this.marker = this.add.graphics().setDepth(5);
    const xs = slots(this.ids.length);
    this.ids.forEach((id, i) => {
      const img = this.add.image(xs[i], 104, ALLIES[id].sprite).setScale(PX);
      idleFrames(this, img, ALLIES[id].sprite);
      this.add.zone(xs[i], 104, 100, 100).setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); this.sel = id; this.picked = null; this.pickedSkill = null; this.redraw(); });
    });
    this.xs = xs;
    this.objs = [];
    this.redraw();
  }

  bag() { return this.registry.get('bag') || []; }
  gear() { return { ...(this.registry.get('gear') || {}) }; }
  setGear(g) { this.registry.set('gear', g); saveFrom(this); }

  redraw() {
    this.objs.forEach(o => o.destroy());
    const objs = this.objs = [];
    const add = o => (objs.push(o), o);
    const id = this.sel, def = ALLIES[id], bag = this.bag(), gear = this.gear();

    // brackets on the chosen retainer
    const x0 = this.xs[this.ids.indexOf(id)], m = this.marker.clear().fillStyle(0xffdd55);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => {
      const cx = x0 + sx * 52, cy = 104 + sy * 52;
      m.fillRect(Math.min(cx, cx - sx * 12), cy - (sy > 0 ? 3 : 0), 12, 3);
      m.fillRect(cx - (sx > 0 ? 3 : 0), Math.min(cy, cy - sy * 12), 3, 12);
    });

    // ---- the retainer: name & stats, lore, skills (icon over name), and one charm slot ----
    const worn = bag.find(c => c.id === gear[id]);
    const u = { hp: def.hp, maxHp: def.hp, atk: def.atk || 0 };
    applyCharm(u, worn);
    add(this.panel(this.add.graphics(), 180, 252, 332, 160, 0x161424, 0xb89a50));
    add(this.add.text(30, 190, def.name, { ...FONT, fontSize: '20px', fontStyle: 'bold' }).setOrigin(0, 0.5));
    this.iconNums(330, 190, [['icon_hp', u.maxHp], ['icon_atk', u.atk]], add);
    add(this.add.text(30, 213, def.lore, { ...FONT, fontSize: '12px', color: '#a8a8c8', wordWrap: { width: 300 } }).setOrigin(0, 0.5));
    def.skills.forEach((sid, i) => {
      const x = 58 + i * 66;
      add(this.add.image(x, 262, SKILLS[sid].icon).setScale(PX));
      add(this.add.text(x, 300, SKILLS[sid].name, { ...FONT, fontSize: '11px', color: this.pickedSkill === sid ? '#ffe08a' : '#ccccee' }).setOrigin(0.5));
      // tap a skill to read it in the panel below
      add(this.add.zone(x, 272, 62, 76).setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); this.pickedSkill = sid; this.picked = null; this.redraw(); }));
    });
    // the single charm slot: its frame says "one" without words; empty shows +
    const sx = 288, sy = 268;
    add(this.panel(this.add.graphics(), sx, sy, 62, 62, worn ? 0x2a2418 : 0x121020, worn ? RARITIES[worn.rarity].hex : 0x44445e));
    if (worn) {
      add(this.add.image(sx, sy, CHARM_TYPES[worn.type].icon).setScale(PX));
      add(this.add.zone(sx, sy, 62, 62).setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); this.picked = worn.id; this.pickedSkill = null; this.confirmDrop = null; this.redraw(); }));
    } else {
      add(this.add.text(sx, sy, '+', { ...FONT, fontSize: '28px', color: '#55557a' }).setOrigin(0.5));
    }

    // ---- the bag ----
    const list = [...bag].sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity] || CHARM_TYPES[a.type].name.localeCompare(CHARM_TYPES[b.type].name) || b.value - a.value);
    const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    this.page = Math.min(this.page, pages - 1);
    add(this.add.text(30, 352, `ย่าม (${bag.length})`, { ...FONT, fontSize: '15px', fontStyle: 'bold', color: '#ffe08a' }).setOrigin(0, 0.5));
    if (pages > 1) {
      add(this.add.text(330, 352, `${this.page + 1}/${pages}`, { ...FONT, fontSize: '13px', color: '#aaaacc' }).setOrigin(1, 0.5));
      const flip = (label, x, d) => add(this.add.text(x, 352, label, { ...FONT, fontSize: '22px', fontStyle: 'bold', color: '#ffe08a' }).setOrigin(0.5).setPadding(8, 2, 8, 2)
        .setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); this.page = (this.page + d + pages) % pages; this.picked = null; this.redraw(); }));
      flip('‹', 250, -1); flip('›', 290, 1);
    }
    const pageItems = list.slice(this.page * PER_PAGE, (this.page + 1) * PER_PAGE);
    for (let i = pageItems.length; i < PER_PAGE; i++) {
      const x = 40 + (i % 6) * 56, y = 400 + Math.floor(i / 6) * 56;
      add(this.panel(this.add.graphics(), x, y, 52, 52, 0x100e1a, 0x26263a));
    }
    const wornBy = Object.fromEntries(Object.entries(gear).map(([k, v]) => [v, k]));
    list.slice(this.page * PER_PAGE, (this.page + 1) * PER_PAGE).forEach((c, i) => {
      const x = 40 + (i % 6) * 56, y = 400 + Math.floor(i / 6) * 56;
      const g = add(this.add.graphics());
      this.panel(g, x, y, 52, 52, this.picked === c.id ? 0x4a4020 : 0x1e1c2a, this.picked === c.id ? 0xffffff : RARITIES[c.rarity].hex);
      add(this.add.image(x, y, CHARM_TYPES[c.type].icon).setScale(PX).setAlpha(wornBy[c.id] && wornBy[c.id] !== id ? 0.45 : 1));
      if (wornBy[c.id]) add(this.add.text(x + 20, y - 18, wornBy[c.id] === id ? '✓' : '•', { ...FONT, fontSize: '13px', fontStyle: 'bold', color: wornBy[c.id] === id ? '#88dd99' : '#ccccee', stroke: '#000', strokeThickness: 3 }).setOrigin(0.5));
      add(this.add.zone(x, y, 52, 52).setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); this.picked = c.id; this.pickedSkill = null; this.confirmDrop = null; this.redraw(); }));
    });

    // ---- the charm under inspection: look first, then wear or throw away ----
    const c = bag.find(b => b.id === this.picked);
    if (c) {
      add(this.panel(this.add.graphics(), 180, 556, 332, 82, 0x1a1626, RARITIES[c.rarity].hex));
      charmTitle(this, 30, 540, c).forEach(add);
      charmEffect(this, 30, 574, c).forEach(add);
      // who wears it, as their face (nobody: nothing)
      const owner = wornBy[c.id];
      if (owner) add(headOf(this, 210, 556, ALLIES[owner].sprite));
      if (owner === id) this.button(add, 290, 540, 80, 26, 'ถอด', 0x2a2a3a, 0x8888aa, () => { const g = this.gear(); delete g[id]; this.setGear(g); this.redraw(); });
      if (owner !== id) this.button(add, 290, 540, 80, 26, 'สวม', 0x3d3d5e, 0xffdd55, () => {
        const g = this.gear(); for (const k in g) if (g[k] === c.id) delete g[k]; g[id] = c.id; this.setGear(g); this.redraw();
      });
      const confirming = this.confirmDrop === c.id;
      this.button(add, 290, 572, 80, 26, confirming ? 'ทิ้งแน่?' : 'ทิ้ง', confirming ? 0x5a2d3a : 0x2a2a3a, confirming ? 0xff7790 : 0x8888aa, () => {
        if (!confirming) { this.confirmDrop = c.id; return this.redraw(); }
        const g = this.gear(); for (const k in g) if (g[k] === c.id) delete g[k];
        this.registry.set('bag', this.bag().filter(b => b.id !== c.id));
        this.picked = null; this.confirmDrop = null; this.setGear(g); this.redraw();
      });
    } else if (this.pickedSkill && def.skills.includes(this.pickedSkill)) {
      const sk = SKILLS[this.pickedSkill];
      add(this.panel(this.add.graphics(), 180, 556, 332, 82, 0x161424, 0xb89a50));
      add(this.add.text(30, 534, sk.name, { ...FONT, fontSize: '15px', fontStyle: 'bold', color: '#ffe08a' }).setOrigin(0, 0.5));
      if (sk.cooldown) { // same inset as the prep screen's skill cards
        const t = add(this.add.text(324, 540, String(sk.cooldown), numFont(15)).setOrigin(1, 0.5));
        add(this.add.image(324 - t.width - 20, 540, 'icon_cd').setScale(PX));
      }
      add(this.add.text(30, 552, sk.desc, { ...FONT, fontSize: '12px', color: '#ccccee', wordWrap: { width: 300 }, lineSpacing: 2 }).setOrigin(0, 0));
    } else {
      add(this.panel(this.add.graphics(), 180, 556, 332, 82, 0x121020, 0x33334a));
      add(this.add.text(180, 556, bag.length ? 'แตะฤทธิ์หรือของขลังเพื่อดูรายละเอียด' : 'แตะฤทธิ์เพื่ออ่าน ชนะศึกเพื่อรับของขลัง', { ...FONT, fontSize: '13px', color: '#8888aa' }).setOrigin(0.5));
    }
  }

  // a charm's effect: stat charms as icon + number, others as words

  button(add, x, y, w, h, label, fill, border, onTap) {
    add(this.panel(this.add.graphics(), x, y, w, h, fill, border));
    add(this.add.text(x, y, label, { ...FONT, fontSize: h < 30 ? '13px' : '15px', fontStyle: 'bold' }).setOrigin(0.5));
    add(this.add.zone(x, y, w, h).setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); onTap(); }));
  }

  iconNums(right, y, pairs, add) {
    let x = right;
    for (const [key, n] of [...pairs].reverse()) {
      const t = add(this.add.text(x, y, String(n), numFont(15)).setOrigin(1, 0.5));
      x -= t.width + 4;
      add(this.add.image(x - 16, y, key).setScale(PX));
      x -= 42;
    }
  }

  panel(g, x, y, w, h, fill, border, u = PX) {
    const l = x - w / 2, t = y - h / 2;
    g.fillStyle(0x000000).fillRect(l + u, t, w - 2 * u, h).fillRect(l, t + u, w, h - 2 * u);
    g.fillStyle(border).fillRect(l + 2 * u, t + u, w - 4 * u, h - 2 * u).fillRect(l + u, t + 2 * u, w - 2 * u, h - 4 * u);
    g.fillStyle(fill).fillRect(l + 2 * u, t + 2 * u, w - 4 * u, h - 4 * u);
    return g;
  }
}
