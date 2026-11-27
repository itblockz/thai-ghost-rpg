import Phaser from 'phaser';
import { ZOOM, setupCamera, FONT_FAMILY, TEXT_METRICS, PX, idleFrames, numFont } from '../display.js';
import { registerSprites } from '../art/sprites.js';
import { ALLIES, ENEMIES, STAGES } from '../data/units.js';
import { SKILLS, skillFacts } from '../data/skills.js';
import { currentTeam } from '../flow.js';
import { play } from '../audio/sfx.js';
import { applyCharm } from '../data/charms.js';

const FONT = { fontFamily: FONT_FAMILY, color: '#fff', resolution: ZOOM, ...TEXT_METRICS };
const TEAM_SLOTS = 3;
const ENEMY_Y = 100, TEAM_Y = 492, PANEL_TOP = 160, PANEL_BOTTOM = 430, BTN_Y = 588;
const slots = n => (n === 1 ? [180] : n === 2 ? [105, 255] : [65, 180, 295]);

// Before each fight. Laid out like the battlefield (enemies above, team below);
// tap anyone to read them in the middle panel. No pop-ups.
export class PrepScene extends Phaser.Scene {
  constructor() { super('Prep'); }

  create(data) {
    setupCamera(this);
    registerSprites(this);
    this.stage = data?.stage ?? 0;
    this.startData = data;
    const stage = STAGES[this.stage];

    this.add.image(180, 0, stage.bg || 'bg_night').setOrigin(0.5, 0).setScale(PX);
    this.add.rectangle(180, 320, 360, 640, 0x07060f, 0.35);
    this.add.text(180, 24, 'ศัตรูเบื้องหน้า', { ...FONT, fontSize: '16px', color: '#ff99aa', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);

    this.marker = this.add.graphics().setDepth(5);
    this.tweens.add({ targets: this.marker, alpha: 0.4, yoyo: true, repeat: -1, duration: 500, ease: 'Sine.inOut' });
    this.panelObjs = [];

    // enemies where they will stand in the fight; duplicates share one description
    const counts = {};
    stage.enemies.forEach(id => { counts[id] = (counts[id] || 0) + 1; });
    const ex = slots(stage.enemies.length);
    const picks = stage.enemies.map((id, i) => this.figure(ex[i], ENEMY_Y, ENEMIES[id], () => this.show(ENEMIES[id], counts[id], ex[i], ENEMY_Y, 'enemy')));

    // team row: one place per retainer you have (up to 3), positioned exactly as in the fight
    const team = currentTeam(this).slice(0, TEAM_SLOTS);
    const tx = slots(team.length);
    team.forEach((id, i) => this.figure(tx[i], TEAM_Y, ALLIES[id], () => this.show(ALLIES[id], 1, tx[i], TEAM_Y, 'ally', id)));

    // start (same style as the battle buttons)
    this.panel(this.add.graphics(), 180, BTN_Y, 332, 80, 0x3d3d5e, 0xffdd55);
    this.add.text(180, BTN_Y, 'ออกศึก', { ...FONT, fontSize: '26px', fontStyle: 'bold' }).setOrigin(0.5);
    this.add.zone(180, BTN_Y, 332, 80).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => { play('click'); this.scene.start('Battle', { stage: this.stage, first: !!data?.first, retry: !!data?.retry }); });

    // back to the map
    const back = this.add.text(14, 24, '‹ แผนที่', { ...FONT, fontSize: '15px', color: '#ccccee', stroke: '#000', strokeThickness: 4 }).setOrigin(0, 0.5)
      .setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); this.scene.start('Map'); });
    back.setPadding(6, 6, 6, 6);

    picks[0]();
  }

  figure(x, y, def, onPick) {
    const img = this.add.image(x, y, def.sprite).setScale(PX);
    idleFrames(this, img, def.sprite);
    this.add.zone(x, y, 100, 100).setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); onPick(); });
    return onPick;
  }

  // Fill the middle panel with one unit: name, HP, lore, then every skill with all its numbers.
  show(def, count, x, y, side, allyId = null, tab = 'skills') {
    this.current = [def, count, x, y, side, allyId];
    this.panelObjs.forEach(o => o.destroy());
    const objs = this.panelObjs = [];
    const add = o => (objs.push(o), o);
    const enemy = side === 'enemy';

    // selection brackets, like target brackets in battle
    const m = this.marker.clear().fillStyle(enemy ? 0xff7790 : 0xffdd55);
    const h = 52, k = 12;
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => {
      const cx = x + sx * h, cy = y + sy * h;
      m.fillRect(Math.min(cx, cx - sx * k), cy - (sy > 0 ? 3 : 0), k, 3);
      m.fillRect(cx - (sx > 0 ? 3 : 0), Math.min(cy, cy - sy * k), 3, k);
    });

    add(this.panel(this.add.graphics(), 180, (PANEL_TOP + PANEL_BOTTOM) / 2, 332, PANEL_BOTTOM - PANEL_TOP, 0x161424, enemy ? 0xaa6677 : 0xb89a50));
    add(this.add.text(30, PANEL_TOP + 20, count > 1 ? `${def.name} ×${count}` : def.name, { ...FONT, fontSize: '20px', fontStyle: 'bold' }).setOrigin(0, 0.5));
    // the unit as it will fight: base stats plus any worn charm
    const u = { hp: def.hp, maxHp: def.hp, atk: def.atk || 0 };
    if (allyId) { const bag = this.registry.get('bag') || []; applyCharm(u, bag.find(c => c.id === (this.registry.get('gear') || {})[allyId])); }
    // stats as small pictures: heart = ขวัญ, fist = กำลัง (right-aligned)
    this.iconNums(330, PANEL_TOP + 20, def.atk ? [['mini_hp', u.maxHp], ['mini_atk', u.atk]] : [['mini_hp', u.maxHp]], add);
    add(this.add.rectangle(180, PANEL_TOP + 62, 300, 2, 0x44445e));
    if (allyId) {
      // charms are managed on the roster screen
      add(this.add.text(30, PANEL_TOP + 44, 'จัดบริวารและของขลัง ›', { ...FONT, fontSize: '13px', color: '#ffe08a' }).setOrigin(0, 0.5).setPadding(4, 6, 4, 6)
        .setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); this.scene.start('Roster', { sel: allyId, back: { scene: 'Prep', data: this.startData } }); }));
    } else {
      add(this.add.text(30, PANEL_TOP + 44, def.lore || '', { ...FONT, fontSize: '12px', color: '#a8a8c8' }).setOrigin(0, 0.5));
    }

    let ry = PANEL_TOP + 68;
    const seen = new Set(this.registry.get('seen') || []);
    for (const sid of def.skills) {
      const s = SKILLS[sid];
      // enemy skills stay unknown (???) until witnessed in a fight
      const known = !!allyId || seen.has(sid);
      // each skill sits in its own card; cooldown in that card's top-right corner
      add(this.add.text(94, ry + 4, known ? s.name : '?', { ...FONT, fontSize: '16px', fontStyle: 'bold' }).setOrigin(0, 0).setDepth(1));
      const facts = add(this.add.text(94, ry + 23, known ? s.desc : '', { ...FONT, fontSize: '12px', color: '#ccccee', wordWrap: { width: 228 }, lineSpacing: 0 }).setOrigin(0, 0).setDepth(1));
      const rowH = Math.max(54, 29 + facts.height);
      add(this.panel(this.add.graphics(), 180, ry + rowH / 2, 312, rowH - 4, 0x201c30, 0x2e2a40));
      if (known && s.cooldown) {
        // 6pt (two art pixels) clear of the card's inner edge on top and right, like the skill icon on the left
        const t = add(this.add.text(324, ry + 26, String(s.cooldown), numFont(15)).setOrigin(1, 0.5).setDepth(1));
        add(this.add.image(324 - t.width - 16, ry + 26, 'mini_cd').setScale(PX).setDepth(1)); }
      const icon = add(this.add.image(60, ry + rowH / 2, s.icon).setScale(PX).setDepth(1));
      if (!known) icon.setTintFill(0x2a2a3a);
      ry += rowH;
    }
  }

  // Right-aligned row of [8x8 icon, number] pairs, e.g. ❤ 28  ✊ 4.
  iconNums(right, y, pairs, add) {
    let x = right;
    for (const [key, n] of [...pairs].reverse()) {
      const t = add(this.add.text(x, y, String(n), numFont(15)).setOrigin(1, 0.5));
      x -= t.width + 4;
      add(this.add.image(x - 12, y, key).setScale(PX));
      x -= 34;
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
