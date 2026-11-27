import Phaser from 'phaser';
import { ZOOM, setupCamera, FONT_FAMILY, TEXT_METRICS, PX, idleFrames, numFont } from '../display.js';
import { registerSprites } from '../art/sprites.js';
import { ALLIES } from '../data/units.js';
import { SKILLS } from '../data/skills.js';
import { RARITIES, CHARM_TYPES, applyWorn, wornIds, slotsOpen, SLOTS, enchLevel, enchPoints, ENCH_MAX } from '../data/charms.js';
import { cleared } from '../flow.js';
import { applyGrowth, levelOf, OFFERINGS, MAX_EXP, MAX_LEVEL, shownLevel } from '../data/growth.js';
import { charmTitle, charmEffect } from '../ui/charmUi.js';
import { currentTeam } from '../flow.js';
import { saveFrom } from '../save.js';
import { play } from '../audio/sfx.js';

const FONT = { fontFamily: FONT_FAMILY, color: '#fff', resolution: ZOOM, ...TEXT_METRICS };
const PER_PAGE = 12;
const RARITY_ORDER = { mythic: 0, rare: 1, common: 2 };
const slots = n => (n === 1 ? [180] : n === 2 ? [105, 255] : n === 3 ? [65, 180, 295] : [48, 136, 224, 312]);

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
    this.add.image(180, 0, 'art_map').setOrigin(0.5, 0).setScale(PX).setAlpha(0.25);
    this.add.text(180, 26, 'บริวาร', { ...FONT, fontSize: '20px', fontStyle: 'bold', color: '#ffe08a' }).setOrigin(0.5);
    this.add.text(14, 26, '‹ กลับ', { ...FONT, fontSize: '15px', color: '#ccccee' }).setOrigin(0, 0.5).setPadding(6, 6, 6, 6)
      .setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); this.scene.start(this.back.scene, this.back.data); });
    // where to farm which charm
    this.add.text(346, 26, 'คู่มือ ›', { ...FONT, fontSize: '15px', color: '#ffe08a' }).setOrigin(1, 0.5).setPadding(6, 6, 6, 6)
      .setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); this.scene.start('Guide', { back: { scene: 'Roster', data: { back: this.back, sel: this.sel } } }); });

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
  // gear as { retainer: [slot0, slot1] } (copied, normalised)
  gear() { const g = this.registry.get('gear') || {}; return Object.fromEntries(this.ids.map(k => [k, wornIds(g, k)])); }
  // take a charm off whoever wears it
  strip(g, cid) { for (const k in g) g[k] = g[k].map(x => (x === cid ? null : x)); return g; }
  setGear(g) { this.registry.set('gear', g); saveFrom(this); }

  redraw() {
    this.objs.forEach(o => o.destroy());
    const objs = this.objs = [];
    const add = o => (objs.push(o), o);
    const id = this.sel, def = ALLIES[id], bag = this.bag(), gear = this.gear();

    // brackets on the chosen retainer
    const x0 = this.xs[this.ids.indexOf(id)], m = this.marker.clear().fillStyle(0xffdd55);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => {
      const cx = x0 + sx * 40, cy = 104 + sy * 40;
      m.fillRect(Math.min(cx, cx - sx * 12), cy - (sy > 0 ? 3 : 0), 12, 3);
      m.fillRect(cx - (sx > 0 ? 3 : 0), Math.min(cy, cy - sy * 12), 3, 12);
    });

    // ---- the retainer: name & stats, lore, skills (icon over name), and one charm slot ----
    const open = slotsOpen(cleared(this));
    const worn = gear[id].map(cid => bag.find(c => c.id === cid) || null);
    if (this.slot == null || this.slot >= open) this.slot = Math.max(0, Math.min(open - 1, worn.findIndex((w, i) => !w && i < open)));
    const u = { hp: def.hp, maxHp: def.hp, atk: def.atk || 0, spd: def.spd || 10 };
    const myExp = (this.registry.get('exp') || {})[id] || 0, lvl = levelOf(myExp);
    applyGrowth(u, myExp);
    applyWorn(u, bag, gear, id);
    add(this.panel(this.add.graphics(), 180, 252, 332, 160, 0x161424, 0xb89a50));
    const nameT = add(this.add.text(30, 190, def.name, { ...FONT, fontSize: '20px', fontStyle: 'bold' }).setOrigin(0, 0.5));
    // ขั้น and a บารมี bar toward the next step, on their own line under the name
    const lvT = add(this.add.text(30, 212, lvl.lv >= MAX_LEVEL ? `ขั้น ${shownLevel(lvl.lv)} สูงสุด` : `ขั้น ${shownLevel(lvl.lv)}`, { ...FONT, fontSize: '12px', color: '#ffe08a' }).setOrigin(0, 0.5));
    const bx = 38 + lvT.width;
    add(this.add.rectangle(bx, 213, 90, 6, 0x2a2440).setOrigin(0, 0.5));
    add(this.add.rectangle(bx, 213, lvl.need ? Math.round(90 * lvl.into / lvl.need / 2) * 2 : 90, 6, 0xffe08a).setOrigin(0, 0.5));
    this.iconNums(330, 190, [['icon_hp', u.maxHp], ['icon_atk', u.atk], ['icon_spd', u.spd]], add);
    add(this.add.text(30, 232, def.lore, { ...FONT, fontSize: '12px', color: '#a8a8c8', wordWrap: { width: 300 } }).setOrigin(0, 0.5));
    def.skills.forEach((sid, i) => {
      const x = 58 + i * 66;
      add(this.add.image(x, 262, SKILLS[sid].icon).setScale(PX));
      add(this.add.text(x, 300, SKILLS[sid].name, { ...FONT, fontSize: '11px', color: this.pickedSkill === sid ? '#ffe08a' : '#ccccee' }).setOrigin(0.5));
      // tap a skill to read it in the panel below
      add(this.add.zone(x, 272, 62, 76).setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); this.pickedSkill = sid; this.picked = null; this.pickedOffer = null; this.redraw(); }));
    });
    // charm slots: one at first, the second opens in chapter 2 (a lock until then). The chosen slot is
    // outlined; 'สวม' puts the inspected charm there. Tap a worn charm to inspect it.
    for (let i = 0; i < SLOTS; i++) {
      const sx = 254 + i * 56, sy = 268, w = worn[i];
      const chosen = i === this.slot && i < open;
      add(this.panel(this.add.graphics(), sx, sy, 52, 52, w ? 0x2a2418 : 0x121020, chosen ? 0xffffff : w ? RARITIES[w.rarity].hex : 0x44445e));
      if (i >= open) { add(this.add.image(sx, sy, 'node_lock').setScale(PX).setAlpha(0.6)); continue; }
      if (w) add(this.add.image(sx, sy, CHARM_TYPES[w.type].icon).setScale(PX));
      else add(this.add.text(sx, sy, '+', { ...FONT, fontSize: '24px', color: '#55557a' }).setOrigin(0.5));
      add(this.add.zone(sx, sy, 54, 54).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
        play('click'); this.slot = i;
        if (w) { this.picked = w.id; this.pickedSkill = null; this.confirmDrop = null; }
        this.redraw();
      }));
    }

    // ---- the bag ----
    const list = [...bag].sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity] || CHARM_TYPES[a.type].name.localeCompare(CHARM_TYPES[b.type].name) || b.value - a.value);
    const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    this.page = Math.min(this.page, pages - 1);
    add(this.add.text(30, 352, `ย่าม (${bag.length})`, { ...FONT, fontSize: '15px', fontStyle: 'bold', color: '#ffe08a' }).setOrigin(0, 0.5));
    // ของเซ่น: tap one to feed it to the retainer above (บารมี without fighting)
    const offer = this.registry.get('offer') || {};
    Object.entries(OFFERINGS).forEach(([k, o], i) => {
      const ox = 122 + i * 42, n = offer[k] || 0;
      add(this.add.image(ox, 352, o.icon).setScale(PX).setAlpha(n ? 1 : 0.3));
      add(this.add.text(ox + 12, 362, String(n), numFont(11, n ? '#ffffff' : '#666688')).setOrigin(0, 0.5));
      add(this.add.zone(ox, 352, 40, 40).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
        play('click'); this.pickedOffer = k; this.picked = null; this.pickedSkill = null; this.enchanting = null; this.redraw();
      }));
      if (this.pickedOffer === k) add(this.add.graphics().lineStyle(PX, 0xffffff).strokeRect(ox - 20, 332, 40, 40));
    });
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
    const wornBy = {};
    for (const k in gear) gear[k].forEach(cid => { if (cid) wornBy[cid] = k; });
    list.slice(this.page * PER_PAGE, (this.page + 1) * PER_PAGE).forEach((c, i) => {
      const x = 40 + (i % 6) * 56, y = 400 + Math.floor(i / 6) * 56;
      const g = add(this.add.graphics());
      this.panel(g, x, y, 52, 52, this.picked === c.id ? 0x4a4020 : 0x1e1c2a, this.picked === c.id ? 0xffffff : RARITIES[c.rarity].hex);
      add(this.add.image(x, y, CHARM_TYPES[c.type].icon).setScale(PX).setAlpha(wornBy[c.id] && wornBy[c.id] !== id ? 0.45 : 1));
      const el = enchLevel(c.pts).l;
      if (el) add(this.add.text(x + 22, y + 18, `+${el}`, { ...numFont(11, '#c8a8ff'), stroke: '#000', strokeThickness: 3 }).setOrigin(1, 0.5));
      if (wornBy[c.id]) add(this.add.text(x + 20, y - 18, wornBy[c.id] === id ? '✓' : '•', { ...FONT, fontSize: '13px', fontStyle: 'bold', color: wornBy[c.id] === id ? '#88dd99' : '#ccccee', stroke: '#000', strokeThickness: 3 }).setOrigin(0.5));
      add(this.add.zone(x, y, 52, 52).setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); if (this.enchanting) return this.feed(c, wornBy); this.picked = c.id; this.pickedSkill = null; this.confirmDrop = null; this.redraw(); }));
    });

    // ---- the charm under inspection: look first, then wear or throw away ----
    const c = bag.find(b => b.id === this.picked);
    if (this.enchanting && !c) this.enchanting = null;
    if (c) this.pickedOffer = null;
    if (this.pickedOffer && !c) {
      // ของเซ่น: what it is, and feed it to the retainer chosen above
      const o = OFFERINGS[this.pickedOffer], n = offer[this.pickedOffer] || 0, full = myExp >= MAX_EXP;
      add(this.panel(this.add.graphics(), 180, 556, 332, 82, 0x1a1626, 0xc8a050));
      add(this.add.image(46, 548, o.icon).setScale(PX));
      add(this.add.text(70, 534, `${o.name}  (มี ${n})`, { ...FONT, fontSize: '15px', fontStyle: 'bold', color: '#ffe08a' }).setOrigin(0, 0.5));
      add(this.add.text(70, 558, `ของเซ่น ป้อนให้${def.name}`, { ...FONT, fontSize: '12px', color: '#ccccee' }).setOrigin(0, 0.5));
      add(this.add.text(70, 578, `ได้บารมี +${o.exp}`, { ...FONT, fontSize: '12px', color: '#ccccee' }).setOrigin(0, 0.5));
      if (n && !full) this.button(add, 290, 556, 80, 30, 'ป้อน', 0x3d3d5e, 0xffdd55, () => {
        const all = { ...(this.registry.get('exp') || {}) };
        const before = levelOf(all[id] || 0).lv;
        all[id] = Math.min(MAX_EXP, (all[id] || 0) + o.exp);
        this.registry.set('exp', all);
        this.registry.set('offer', { ...offer, [this.pickedOffer]: n - 1 });
        saveFrom(this); play('ward'); this.redraw();
        const up = levelOf(all[id]).lv - before;
        this.flash(up ? `ขึ้นขั้น! +${up}` : `บารมี +${o.exp}`);
      });
      else add(this.add.text(290, 556, full ? 'ขั้นสูงสุดแล้ว' : 'ไม่มีแล้ว', { ...FONT, fontSize: '12px', color: '#77779a' }).setOrigin(0.5));
    } else if (c) {
      // the charm panel is a little taller: title, effect, เสก progress, and three buttons
      add(this.panel(this.add.graphics(), 180, 547, 332, 104, 0x1a1626, this.enchanting ? 0xffffff : RARITIES[c.rarity].hex));
      charmTitle(this, 30, 514, c).forEach(add);
      const en = enchLevel(c.pts);
      if (this.enchanting) {
        add(this.add.text(30, 542, 'แตะของในย่ามเพื่อเสกเข้า', { ...FONT, fontSize: '13px', color: '#ffe08a' }).setOrigin(0, 0.5));
      } else charmEffect(this, 30, 542, c).forEach(add);
      // เสก level bar
      add(this.add.text(30, 574, en.l >= ENCH_MAX ? 'เสกเต็มแล้ว' : en.l ? `เสก ${en.l}` : 'ยังไม่เสก', { ...FONT, fontSize: '12px', color: '#ccccee' }).setOrigin(0, 0.5));
      add(this.add.rectangle(96, 574, 104, 6, 0x2a2440).setOrigin(0, 0.5));
      add(this.add.rectangle(96, 574, en.need ? Math.round(104 * en.into / en.need / 2) * 2 : 104, 6, 0xffe08a).setOrigin(0, 0.5));
      if (this.enchanting) {
        this.button(add, 282, 516, 96, 26, 'ธรรมดาทั้งหมด', 0x3d3d5e, 0xffdd55, () => this.feedAllCommon(c, wornBy));
        this.button(add, 282, 576, 96, 26, 'เสร็จ', 0x2a2a3a, 0x8888aa, () => { this.enchanting = null; this.redraw(); });
      } else {
        const owner = wornBy[c.id];
        if (owner === id) this.button(add, 290, 516, 80, 26, 'ถอด', 0x2a2a3a, 0x8888aa, () => { this.setGear(this.strip(this.gear(), c.id)); this.redraw(); });
        if (owner !== id) this.button(add, 290, 516, 80, 26, 'สวม', 0x3d3d5e, 0xffdd55, () => {
          const g = this.strip(this.gear(), c.id);
          g[id][this.slot] = c.id;
          this.setGear(g); this.redraw();
        });
        if (en.l < ENCH_MAX) this.button(add, 290, 546, 80, 26, 'ปลุกเสก', 0x3d2d5e, 0xc8a8ff, () => { this.enchanting = c.id; this.confirmDrop = null; this.redraw(); });
        const confirming = this.confirmDrop === c.id;
        this.button(add, 290, 576, 80, 26, confirming ? 'ทิ้งแน่?' : 'ทิ้ง', confirming ? 0x5a2d3a : 0x2a2a3a, confirming ? 0xff7790 : 0x8888aa, () => {
          if (!confirming) { this.confirmDrop = c.id; return this.redraw(); }
          const g = this.strip(this.gear(), c.id);
          this.registry.set('bag', this.bag().filter(b => b.id !== c.id));
          this.picked = null; this.confirmDrop = null; this.setGear(g); this.redraw();
        });
      }
    } else if (this.pickedSkill && def.skills.includes(this.pickedSkill)) {
      const sk = SKILLS[this.pickedSkill];
      add(this.panel(this.add.graphics(), 180, 556, 332, 82, 0x161424, 0xb89a50));
      add(this.add.text(30, 534, sk.name, { ...FONT, fontSize: '15px', fontStyle: 'bold', color: '#ffe08a' }).setOrigin(0, 0.5));
      if (sk.cooldown) { // same inset as the prep screen's skill cards
        const t = add(this.add.text(324, 540, String(sk.cooldown), numFont(15)).setOrigin(1, 0.5));
        add(this.add.image(324 - t.width - 20, 540, 'icon_cd').setScale(PX));
      }
      add(this.add.text(30, 552, sk.desc, { ...FONT, fontSize: '12px', color: '#ccccee', wordWrap: { width: sk.cooldown ? 256 : 300 }, lineSpacing: 2 }).setOrigin(0, 0));
    } else {
      add(this.panel(this.add.graphics(), 180, 556, 332, 82, 0x121020, 0x33334a));
      add(this.add.text(180, 556, bag.length ? 'แตะฤทธิ์หรือของขลังเพื่อดูรายละเอียด' : 'แตะฤทธิ์เพื่ออ่าน ชนะศึกเพื่อรับของขลัง', { ...FONT, fontSize: '13px', color: '#8888aa' }).setOrigin(0.5));
    }
  }

  // a charm's effect: stat charms as icon + number, others as words

  // ปลุกเสก: feed one charm into the one being consecrated (not itself, not one someone wears)
  feed(f, wornBy) {
    const main = this.bag().find(b => b.id === this.enchanting);
    if (!main || f.id === main.id) return;
    if (wornBy[f.id]) return this.flash('ของที่สวมอยู่ใช้เสกไม่ได้');
    this.consume(main, [f]);
  }
  feedAllCommon(main, wornBy) {
    const list = this.bag().filter(b => b.rarity === 'common' && b.id !== main.id && !wornBy[b.id]);
    if (!list.length) return this.flash('ไม่มีของธรรมดาที่ว่างอยู่');
    this.consume(main, list);
  }
  consume(main, feeds) {
    const pts = feeds.reduce((t, f) => t + enchPoints(f, main), 0);
    const before = enchLevel(main.pts).l;
    const gone = new Set(feeds.map(f => f.id));
    const bag = this.bag().filter(b => !gone.has(b.id)).map(b => (b.id === main.id ? { ...b, pts: (b.pts || 0) + pts } : b));
    this.registry.set('bag', bag);
    saveFrom(this);
    play('ward');
    const up = enchLevel((main.pts || 0) + pts).l - before;
    this.redraw();
    this.flash(up ? `เสกขึ้น +${up}!` : `เสก +${pts}`);
  }
  flash(text) {
    const t = this.add.text(180, 488, text, { ...FONT, fontSize: '14px', fontStyle: 'bold', color: '#ffe08a', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5).setDepth(9);
    this.tweens.add({ targets: t, y: 470, alpha: 0, duration: 1100, onComplete: () => t.destroy() });
  }

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
