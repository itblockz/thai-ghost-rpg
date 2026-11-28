import Phaser from 'phaser';
import { ZOOM, setupCamera, FONT_FAMILY, TEXT_METRICS, PX, idleFrames, numFont } from '../display.js';
import { registerSprites } from '../art/sprites.js';
import { ALLIES } from '../data/units.js';
import { SKILLS } from '../data/skills.js';
import { RARITIES, CHARM_TYPES, applyWorn, wornIds, slotsOpen, SLOTS, enchLevel, enchPoints, ENCH_MAX, effective } from '../data/charms.js';
import { cleared, fightingTeam } from '../flow.js';
import { applyGrowth, levelOf, OFFERINGS, MAX_EXP, MAX_LEVEL, shownLevel } from '../data/growth.js';
import { charmTitle, charmEffect } from '../ui/charmUi.js';
import { currentTeam } from '../flow.js';
import { saveFrom } from '../save.js';
import { play } from '../audio/sfx.js';
import { tapOrDrag } from '../ui/drag.js';

const FONT = { fontFamily: FONT_FAMILY, color: '#fff', resolution: ZOOM, ...TEXT_METRICS };
const PER_PAGE = 12;
const RARITY_ORDER = { mythic: 0, rare: 1, common: 2 };
const slots = n => (n === 1 ? [180] : n === 2 ? [105, 255] : n === 3 ? [65, 180, 295] : n === 4 ? [48, 136, 224, 312] : Array.from({ length: n }, (_, i) => Math.round((i + 0.5) * 360 / n / 2) * 2));

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

    // retainers: one row for up to four, else a grid of four to a row (two rows; everything below moves down)
    this.marker = this.add.graphics().setDepth(5);
    const going = new Set(fightingTeam(this));
    const grid = this.ids.length > 4, cols = grid ? 4 : this.ids.length;
    this.pos = {};
    this.ids.forEach((id, i) => {
      const x = slots(cols)[i % cols], y = grid ? 74 + Math.floor(i / cols) * 70 : 104;
      this.pos[id] = [x, y];
      const img = this.add.image(x, y, ALLIES[id].sprite).setScale(PX);
      idleFrames(this, img, ALLIES[id].sprite);
      // the ones going into the next fight carry a small ✓
      if (going.has(id) && grid) this.add.text(x + 26, y + 24, '✓', { ...FONT, fontSize: '13px', fontStyle: 'bold', color: '#88dd99', stroke: '#000', strokeThickness: 3 }).setOrigin(0.5).setDepth(6);
      this.add.zone(x, y, grid ? 80 : 100, grid ? 68 : 100).setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); this.sel = id; this.picked = null; this.pickedSkill = null; this.redraw(); });
    });
    this.oy = grid ? 36 : 0; // the panel, bag and notes sit lower under a two-row grid
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
    const [x0, y0] = this.pos[id], m = this.marker.clear().fillStyle(0xffdd55), bh = this.oy ? 34 : 40;
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => {
      const cx = x0 + sx * bh, cy = y0 + sy * bh;
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
    // outlined (the next charm tapped goes there if none is free). Empty places show a dashed frame.
    for (let i = 0; i < SLOTS; i++) {
      const sx = 254 + i * 56, sy = 268, w = worn[i];
      const chosen = i === this.slot && i < open;
      add(this.panel(this.add.graphics(), sx, sy, 52, 52, w ? 0x2a2418 : 0x121020, chosen ? 0xffffff : w ? RARITIES[w.rarity].hex : 0x44445e));
      if (i >= open) { add(this.add.image(sx, sy, 'node_lock').setScale(PX).setAlpha(0.6)); continue; }
      if (w) add(this.add.image(sx, sy, CHARM_TYPES[w.type].icon).setScale(PX));
      else { // an empty place: a dashed frame inside
        const dg = add(this.add.graphics()), l = sx - 16, t = sy - 16;
        dg.fillStyle(0x55557a);
        for (let k = 0; k < 32; k += 8) { dg.fillRect(l + k, t, 4, 2).fillRect(l + k, t + 30, 4, 2).fillRect(l, t + k, 2, 4).fillRect(l + 30, t + k, 2, 4); }
      }
      // tap a worn charm = it flies back into the bag (taken off); tap an empty place = the next charm goes there
      const tapSlot = () => {
        play('click'); this.slot = i;
        if (!w) return this.redraw();
        this.picked = w.id; this.pickedSkill = null; this.confirmDrop = null;
        this.fly(CHARM_TYPES[w.type].icon, [sx, sy + this.oy], [180, 428 + this.oy], () => { this.setGear(this.strip(this.gear(), w.id)); this.redraw(); });
      };
      const readSlot = () => { play('click'); this.slot = i; if (w) { this.picked = w.id; this.pickedSkill = null; } this.redraw(); };
      const sz = add(this.add.zone(sx, sy, 54, 54));
      // a worn charm can be dragged back down into the bag to take it off
      if (w && !this.enchanting) tapOrDrag(this, sz, { key: CHARM_TYPES[w.type].icon, tap: tapSlot, hold: readSlot,
        targets: () => [{ x: 180, y: 428 + this.oy, w: 344, h: 116, drop: () => { this.setGear(this.strip(this.gear(), w.id)); this.picked = w.id; this.redraw(); } }] });
      else sz.setInteractive({ useHandCursor: true }).on('pointerdown', tapSlot);
    }

    // ---- the bag ----
    const list = [...bag].sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity] || CHARM_TYPES[a.type].name.localeCompare(CHARM_TYPES[b.type].name) || b.value - a.value);
    const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    this.page = Math.min(this.page, pages - 1);
    if (!this.enchanting) add(this.add.text(30, 352, `ย่าม (${bag.length})`, { ...FONT, fontSize: '15px', fontStyle: 'bold', color: '#ffe08a' }).setOrigin(0, 0.5));
    // ของเซ่น: tap one to feed it to the retainer above (บารมี without fighting)
    const offer = this.registry.get('offer') || {};
    if (this.enchanting) this.filterBar(add);
    else Object.entries(OFFERINGS).forEach(([k, o], i) => {
      const ox = 122 + i * 42, n = offer[k] || 0;
      add(this.add.image(ox, 352, o.icon).setScale(PX).setAlpha(n ? 1 : 0.3));
      add(this.add.text(ox + 12, 364, String(n), { ...numFont(13, n ? '#ffffff' : '#666688'), stroke: '#000', strokeThickness: 3 }).setOrigin(0, 0.5));
      // tap to read it (and feed the retainer shown); or drag it onto any retainer above to feed that one
      tapOrDrag(this, add(this.add.zone(ox, 352, 40, 40)), { key: o.icon,
        // tap = feed the retainer shown above (it flies to them); hold = read what it is
        tap: () => { play('click'); if (!n) return; const [tx, ty] = this.pos[id]; this.fly(o.icon, [ox, 352 + this.oy], [tx, ty], () => this.feed(id, k)); },
        hold: () => { play('click'); this.pickedOffer = k; this.picked = null; this.pickedSkill = null; this.enchanting = null; this.redraw(); },
        targets: () => (n ? this.ids.map(rid => ({ x: this.pos[rid][0], y: this.pos[rid][1], w: 76, h: 66, drop: () => this.feed(rid, k) })) : []) });
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
      const chosen = this.enchanting && this.chosen?.has(c.id);
      if (chosen) add(this.add.graphics().lineStyle(PX * 2, 0xffe08a).strokeRect(x - 24, y - 24, 48, 48));
      if (chosen) add(this.add.text(x - 20, y - 18, '✓', { ...FONT, fontSize: '14px', fontStyle: 'bold', color: '#ffe08a', stroke: '#000', strokeThickness: 3 }).setOrigin(0.5));
      if (c.locked) { // a tiny padlock in the corner (drawn on the 2pt grid)
        const lg = add(this.add.graphics()), lx = x - 22, ly = y + 10;
        lg.fillStyle(0x000000).fillRect(lx, ly + 2, 12, 10).fillStyle(0xc8c8d8).fillRect(lx + 2, ly + 4, 8, 6).fillStyle(0x000000).fillRect(lx + 5, ly + 6, 2, 2);
        lg.fillStyle(0xc8c8d8).fillRect(lx + 2, ly - 2, 2, 6).fillRect(lx + 8, ly - 2, 2, 6).fillRect(lx + 2, ly - 4, 8, 2);
      }
      if (this.enchanting === c.id) add(this.panel(this.add.graphics(), x, y, 52, 52, 0x000000, 0xffffff).setAlpha(0.3));
      const el = enchLevel(c.pts).l;
      if (el) add(this.add.text(x + 22, y + 18, `+${el}`, { ...numFont(11, '#c8a8ff'), stroke: '#000', strokeThickness: 3 }).setOrigin(1, 0.5));
      if (wornBy[c.id]) add(this.add.text(x + 20, y - 18, wornBy[c.id] === id ? '✓' : '•', { ...FONT, fontSize: '13px', fontStyle: 'bold', color: wornBy[c.id] === id ? '#88dd99' : '#ccccee', stroke: '#000', strokeThickness: 3 }).setOrigin(0.5));
      // tap a charm = this retainer wears it (it flies up into a free place, else the chosen one);
      // tap one it already wears = it comes off. Hold = just read it. (During ปลุกเสก a tap chooses.)
      const readCharm = () => { play('click'); this.picked = c.id; this.pickedSkill = null; this.confirmDrop = null; this.redraw(); };
      const tapCharm = () => {
        play('click');
        if (this.enchanting) return this.toggleChoose(c, wornBy);
        this.picked = c.id; this.pickedSkill = null; this.confirmDrop = null;
        const mine = gear[id].indexOf(c.id);
        if (mine >= 0) return this.fly(CHARM_TYPES[c.type].icon, [254 + mine * 56, 268 + this.oy], [x, y + this.oy], () => { this.setGear(this.strip(this.gear(), c.id)); this.redraw(); });
        const free = gear[id].findIndex((w, si) => !w && si < open), si = free >= 0 ? free : Math.min(this.slot, open - 1);
        this.fly(CHARM_TYPES[c.type].icon, [x, y + this.oy], [254 + si * 56, 268 + this.oy], () => {
          const g = this.strip(this.gear(), c.id); g[id][si] = c.id; this.slot = si; this.setGear(g); play('ward'); this.redraw();
        });
      };
      const cz = add(this.add.zone(x, y, 52, 52));
      // drag a charm up onto a charm place to wear it there
      if (!this.enchanting) tapOrDrag(this, cz, { key: CHARM_TYPES[c.type].icon, tap: tapCharm, hold: readCharm,
        targets: () => Array.from({ length: open }, (_, si) => ({ x: 254 + si * 56, y: 268 + this.oy, w: 54, h: 54, drop: () => {
          const g = this.strip(this.gear(), c.id); g[id][si] = c.id; this.slot = si; this.picked = c.id; this.setGear(g); play('ward'); this.redraw();
        } })) });
      else cz.setInteractive({ useHandCursor: true }).on('pointerdown', tapCharm);
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

    } else if (c) {
      // the charm panel is a little taller: title, effect, เสก progress, and three buttons
      add(this.panel(this.add.graphics(), 180, 547, 332, 104, 0x1a1626, this.enchanting ? 0xffffff : RARITIES[c.rarity].hex));
      charmTitle(this, 30, 514, c).forEach(add);
      const en = enchLevel(c.pts);
      if (this.enchanting) {
        // what the chosen charms would give, before anything is used up
        const picks = bag.filter(b => this.chosen?.has(b.id));
        const pts = picks.reduce((t, f) => t + enchPoints(f, c), 0), to = enchLevel((c.pts || 0) + pts).l;
        add(this.add.text(30, 542, picks.length ? `เลือก ${picks.length} ชิ้น +${pts} แต้ม → ${to > enchLevel(c.pts).l ? `เสก ${to}` : 'ยังไม่ขึ้นขั้น'}` : 'แตะของในย่าม หรือใช้ปุ่มเลือกด่วนด้านบน', { ...FONT, fontSize: '12px', color: '#ffe08a' }).setOrigin(0, 0.5));
      } else charmEffect(this, 30, 542, c).forEach(add);
      // เสก level bar
      add(this.add.text(30, 574, en.l >= ENCH_MAX ? 'เสกเต็มแล้ว' : en.l ? `เสก ${en.l}` : 'ยังไม่เสก', { ...FONT, fontSize: '12px', color: '#ccccee' }).setOrigin(0, 0.5));
      add(this.add.rectangle(96, 574, 104, 6, 0x2a2440).setOrigin(0, 0.5));
      add(this.add.rectangle(96, 574, en.need ? Math.round(104 * en.into / en.need / 2) * 2 : 104, 6, 0xffe08a).setOrigin(0, 0.5));
      if (this.enchanting) {
        const picks = bag.filter(b => this.chosen?.has(b.id)), hasMythic = picks.some(b => b.rarity === 'mythic');
        const sure = this.confirmEnchant;
        if (picks.length) this.button(add, 290, 516, 80, 26, hasMythic && !sure ? 'เสกแน่?' : 'เสก', hasMythic && !sure ? 0x5a2d3a : 0x3d2d5e, hasMythic && !sure ? 0xff7790 : 0xc8a8ff, () => {
          if (hasMythic && !sure) { this.confirmEnchant = true; return this.redraw(); }
          this.consume(c, picks);
        });
        this.button(add, 290, 576, 80, 26, 'เสร็จ', 0x2a2a3a, 0x8888aa, () => { this.enchanting = null; this.chosen = null; this.redraw(); });
      } else {
        if (en.l < ENCH_MAX) this.button(add, 290, 546, 80, 26, 'ปลุกเสก', 0x3d2d5e, 0xc8a8ff, () => { this.enchanting = c.id; this.chosen = new Set(); this.confirmEnchant = false; this.confirmDrop = null; this.redraw(); });
        // lock: a locked charm can't be used for เสก or thrown away
        add(this.add.image(232, 514, 'node_lock').setScale(PX).setAlpha(c.locked ? 1 : 0.3));
        add(this.add.zone(232, 514, 40, 36).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
          play('click'); this.registry.set('bag', this.bag().map(b => (b.id === c.id ? { ...b, locked: !b.locked } : b))); saveFrom(this); this.redraw();
        }));
        const confirming = this.confirmDrop === c.id;
        if (c.locked) add(this.add.text(290, 576, 'ล็อกอยู่ ทิ้งไม่ได้', { ...FONT, fontSize: '11px', color: '#9999bb' }).setOrigin(0.5));
        if (!c.locked) this.button(add, 290, 576, 80, 26, confirming ? 'ทิ้งแน่?' : 'ทิ้ง', confirming ? 0x5a2d3a : 0x2a2a3a, confirming ? 0xff7790 : 0x8888aa, () => {
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
      // nothing chosen: nothing to say
    }
    // under a two-row grid of retainers, everything here sits lower
    if (this.oy) objs.forEach(o => { o.y += this.oy; });
  }

  // a copy of an icon flies from a to b (on the 2pt grid), then `then` runs — the change is seen happening
  fly(key, [ax, ay], [bx, by], then) {
    if (this.flying) return;
    this.flying = true;
    const f = this.add.image(ax, ay, key).setScale(PX).setDepth(30);
    this.tweens.add({ targets: f, x: bx, y: by, duration: 220, ease: 'Quad.inOut', onComplete: () => { f.destroy(); this.flying = false; then(); } });
  }

  // feed one ของเซ่น of kind k to retainer rid (from the ป้อน button, or dropped onto it)
  feed(rid, k) {
    const offer = this.registry.get('offer') || {}, n = offer[k] || 0, all = { ...(this.registry.get('exp') || {}) };
    if (!n || (all[rid] || 0) >= MAX_EXP) return;
    const before = levelOf(all[rid] || 0).lv;
    all[rid] = Math.min(MAX_EXP, (all[rid] || 0) + OFFERINGS[k].exp);
    this.registry.set('exp', all);
    this.registry.set('offer', { ...offer, [k]: n - 1 });
    saveFrom(this); play('ward');
    if (rid !== this.sel) { this.sel = rid; this.picked = null; this.pickedSkill = null; }
    this.pickedOffer = k;
    this.redraw();
    const up = levelOf(all[rid]).lv - before;
    this.flash(up ? `${ALLIES[rid].name} ขึ้นขั้น! +${up}` : `บารมี +${OFFERINGS[k].exp}`);
  }

  // a charm's effect: stat charms as icon + number, others as words

  // ปลุกเสก: choose charms first (nothing is used up until 'เสก'); worn and locked ones can't be chosen
  wornMap() { const g = this.gear(), m = {}; for (const k in g) g[k].forEach(cid => { if (cid) m[cid] = k; }); return m; }
  canFeed(f, worn = this.wornMap()) { return f.id !== this.enchanting && !worn[f.id] && !f.locked; }
  toggleChoose(f, worn) {
    if (f.id === this.enchanting) return;
    if (worn[f.id]) return this.flash('ของที่สวมอยู่ใช้เสกไม่ได้');
    if (f.locked) return this.flash('ของที่ล็อกไว้ใช้เสกไม่ได้');
    this.chosen ||= new Set();
    if (this.chosen.has(f.id)) this.chosen.delete(f.id); else this.chosen.add(f.id);
    this.confirmEnchant = false;
    this.redraw();
  }
  // quick choices above the bag while consecrating (they only tick; 'เสก' still has to be pressed)
  filterBar(add) {
    const main = this.bag().find(b => b.id === this.enchanting);
    if (!main) return;
    const worn = this.wornMap(), free = this.bag().filter(b => this.canFeed(b, worn));
    // the best of each kind someone wears, to find what is no better than it
    const best = {};
    this.bag().filter(b => worn[b.id]).forEach(b => { const v = b.type === 'yant' ? effective(b).wards.length : effective(b).value; best[b.type] = Math.max(best[b.type] ?? -1, v); });
    const worse = b => best[b.type] != null && (b.type === 'yant' ? effective(b).wards.length : effective(b).value) <= best[b.type];
    const chips = [
      ['ธรรมดา', b => b.rarity === 'common'],
      ['หายาก', b => b.rarity === 'rare'],
      ['ชนิดนี้', b => b.type === main.type && b.rarity !== 'mythic'],
      ['ด้อยกว่า', b => b.rarity !== 'mythic' && worse(b)],
    ];
    chips.forEach(([label, test], i) => this.chip(add, 46 + i * 44, label, () => { this.chosen ||= new Set(); free.filter(test).forEach(b => this.chosen.add(b.id)); this.confirmEnchant = false; this.redraw(); }));
    this.chip(add, 46 + 4 * 44, 'ล้าง', () => { this.chosen = new Set(); this.confirmEnchant = false; this.redraw(); });
  }
  chip(add, x, label, onTap) {
    add(this.panel(this.add.graphics(), x, 352, 42, 30, 0x2a2440, 0x8a7ab0));
    add(this.add.text(x, 352, label, { ...FONT, fontSize: '11px', color: '#e8e0ff' }).setOrigin(0.5));
    add(this.add.zone(x, 352, 44, 40).setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); onTap(); }));
  }
  consume(main, feeds) {
    const pts = feeds.reduce((t, f) => t + enchPoints(f, main), 0);
    const before = enchLevel(main.pts).l;
    this.chosen = new Set(); this.confirmEnchant = false;
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
    const t = this.add.text(180, 488 + (this.oy || 0), text, { ...FONT, fontSize: '14px', fontStyle: 'bold', color: '#ffe08a', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5).setDepth(9);
    this.tweens.add({ targets: t, y: t.y - 18, alpha: 0, duration: 1100, onComplete: () => t.destroy() });
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
