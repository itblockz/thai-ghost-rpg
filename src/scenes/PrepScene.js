import Phaser from 'phaser';
import { ZOOM, setupCamera, FONT_FAMILY, TEXT_METRICS, PX, idleFrames, numFont } from '../display.js';
import { registerSprites } from '../art/sprites.js';
import { ALLIES, ENEMIES, STAGES } from '../data/units.js';
import { SKILLS, skillFacts } from '../data/skills.js';
import { currentTeam, fightingTeam, MAX_FIGHTERS } from '../flow.js';
import { saveFrom } from '../save.js';
import { play } from '../audio/sfx.js';
import { applyWorn, CHARM_TYPES } from '../data/charms.js';
import { applyGrowth, levelOf } from '../data/growth.js';
import { gems } from '../ui/charmUi.js';

const FONT = { fontFamily: FONT_FAMILY, color: '#fff', resolution: ZOOM, ...TEXT_METRICS };
const TEAM_SLOTS = 4; // retainers shown (three of them can go in)
const ENEMY_Y = 100, TEAM_Y = 492, PANEL_TOP = 160, PANEL_BOTTOM = 430, BTN_Y = 588;
const slots = n => (n === 1 ? [180] : n === 2 ? [105, 255] : n === 3 ? [65, 180, 295] : [48, 136, 224, 312]);

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
    // the first (story) fight may bring a different band than later hunts
    const foes = data?.first && stage.story ? stage.story.ids : stage.enemies;
    foes.forEach(id => { counts[id] = (counts[id] || 0) + 1; });
    const ex = slots(foes.length);
    const picks = foes.map((id, i) => this.figure(ex[i], ENEMY_Y, ENEMIES[id], () => this.show(ENEMIES[id], counts[id], ex[i], ENEMY_Y, 'enemy')));

    // team row: one place per retainer you have (up to 3), positioned exactly as in the fight
    const team = currentTeam(this).slice(0, TEAM_SLOTS);
    const tx = slots(team.length);
    this.teamIds = team;
    this.teamImgs = {};
    const allyPicks = {};
    team.forEach((id, i) => { allyPicks[id] = this.figure(tx[i], TEAM_Y, ALLIES[id], () => this.show(ALLIES[id], 1, tx[i], TEAM_Y, 'ally', id)); this.teamImgs[id] = this.lastFigure; });
    this.benchMarks = team.map((id, i) => this.add.text(tx[i], TEAM_Y + 44, '✓', { ...FONT, fontSize: '16px', fontStyle: 'bold', color: '#88dd99', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5));
    this.showBench();

    // start (same style as the battle buttons)
    this.panel(this.add.graphics(), 180, BTN_Y, 332, 80, 0x3d3d5e, 0xffdd55);
    this.add.text(180, BTN_Y, 'ออกศึก', { ...FONT, fontSize: '26px', fontStyle: 'bold' }).setOrigin(0.5);
    this.add.zone(180, BTN_Y, 332, 80).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => { play('click'); this.scene.start('Battle', { stage: this.stage, first: !!data?.first, retry: !!data?.retry }); });

    // back to the map
    const back = this.add.text(14, 24, '‹ แผนที่', { ...FONT, fontSize: '15px', color: '#ccccee', stroke: '#000', strokeThickness: 4 }).setOrigin(0, 0.5)
      .setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); this.scene.start('Map'); });
    back.setPadding(6, 6, 6, 6);

    // what this stage tends to drop (tap for the charm guide)
    if (stage.drop) this.add.image(334, 26, CHARM_TYPES[stage.drop].icon).setScale(PX);
    if (stage.richDrop) gems(this, 300, 44, 'mythic'); // boss: วิเศษ more often
    this.add.text(314, 26, 'ของ ›', { ...FONT, fontSize: '12px', color: '#ffe08a', stroke: '#000', strokeThickness: 3 }).setOrigin(1, 0.5);
    this.add.zone(316, 30, 80, 52).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => { play('click'); this.scene.start('Guide', { back: { scene: 'Prep', data: this.startData } }); });

    // reopen on the retainer just moved (see swap)
    if (data?.sel && allyPicks[data.sel]) allyPicks[data.sel](); else picks[0]();
  }

  // move a retainer one place left/right in the team (also sets who acts first on a speed tie)
  swap(id, d) {
    const team = [...currentTeam(this)];
    const i = team.indexOf(id), j = i + d;
    if (j < 0 || j >= Math.min(team.length, TEAM_SLOTS)) return;
    [team[i], team[j]] = [team[j], team[i]];
    this.registry.set('team', team);
    saveFrom(this);
    this.scene.restart({ ...this.startData, sel: id });
  }

  // chosen retainers carry a ✓; the rest stand faded (they sit this one out)
  showBench() {
    const goers = fightingTeam(this);
    this.teamIds.forEach((id, i) => { const go = goers.includes(id); this.teamImgs[id].setAlpha(go ? 1 : 0.35); this.benchMarks[i].setVisible(go); });
  }

  figure(x, y, def, onPick) {
    const img = this.lastFigure = this.add.image(x, y, def.sprite).setScale(PX);
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
    const h = 40, k = 10;
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => {
      const cx = x + sx * h, cy = y + sy * h;
      m.fillRect(Math.min(cx, cx - sx * k), cy - (sy > 0 ? 3 : 0), k, 3);
      m.fillRect(cx - (sx > 0 ? 3 : 0), Math.min(cy, cy - sy * k), 3, k);
    });

    add(this.panel(this.add.graphics(), 180, (PANEL_TOP + PANEL_BOTTOM) / 2, 332, PANEL_BOTTOM - PANEL_TOP, 0x161424, enemy ? 0xaa6677 : 0xb89a50));
    const nameT = add(this.add.text(30, PANEL_TOP + 20, count > 1 ? `${def.name} ×${count}` : def.name, { ...FONT, fontSize: '20px', fontStyle: 'bold' }).setOrigin(0, 0.5));
    if (allyId) add(this.add.text(36 + nameT.width, PANEL_TOP + 22, `ขั้น ${levelOf((this.registry.get('exp') || {})[allyId] || 0).lv}`, { ...FONT, fontSize: '12px', color: '#ffe08a' }).setOrigin(0, 0.5));
    // the unit as it will fight: base stats plus any worn charm
    const u = { hp: def.hp, maxHp: def.hp, atk: def.atk || 0, spd: def.spd || 10 };
    if (allyId) { const exp = (this.registry.get('exp') || {})[allyId] || 0; applyGrowth(u, exp); applyWorn(u, this.registry.get('bag') || [], this.registry.get('gear') || {}, allyId); }
    // stats as small pictures: heart = ขวัญ, fist = กำลัง (right-aligned)
    this.iconNums(330, PANEL_TOP + 20, [['icon_hp', u.maxHp], ...(def.atk ? [['icon_atk', u.atk]] : []), ['icon_spd', u.spd]], add);
    add(this.add.rectangle(180, PANEL_TOP + 62, 300, 2, 0x44445e));
    if (allyId) {
      // charms are managed on the roster screen
      add(this.add.text(30, PANEL_TOP + 44, 'จัดบริวารและของขลัง ›', { ...FONT, fontSize: '13px', color: '#ffe08a' }).setOrigin(0, 0.5).setPadding(4, 6, 4, 6)
        .setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); this.scene.start('Roster', { sel: allyId, back: { scene: 'Prep', data: this.startData } }); }));
      // arrows beside the chosen retainer: move it left/right in the line-up
      const i = this.teamIds.indexOf(allyId);
      [[-1, x - 58], [1, x + 58]].forEach(([d, ax]) => {
        if (i + d < 0 || i + d >= this.teamIds.length) return;
        add(this.add.text(ax, y, d < 0 ? '‹' : '›', { ...FONT, fontSize: '30px', fontStyle: 'bold', color: '#ffe08a', stroke: '#000', strokeThickness: 5 }).setOrigin(0.5).setPadding(10, 8, 10, 8)
          .setDepth(6).setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); this.swap(allyId, d); }));
      });
      // choose who goes in (fewer fighters = quicker rounds); anyone not chosen rests. At least one must go.
      const bench = new Set(this.registry.get('bench') || []);
      const goers = fightingTeam(this);
      const resting = !goers.includes(allyId);
      // choosing needs a free place (three at most); leaving needs someone else still going
      const canToggle = resting ? goers.length < MAX_FIGHTERS : goers.length > 1;
      const label = resting ? (canToggle ? 'เลือกเข้าศึก' : 'ครบสามแล้ว') : '✓ เข้าศึก';
      add(this.add.text(330, PANEL_TOP + 44, label, { ...FONT, fontSize: '13px', fontStyle: 'bold', color: resting ? (canToggle ? '#ffe08a' : '#77779a') : canToggle ? '#88dd99' : '#5a8a66' }).setOrigin(1, 0.5).setPadding(4, 6, 4, 6)
        .setInteractive({ useHandCursor: canToggle }).on('pointerdown', () => {
          if (!canToggle) return;
          play('click');
          if (resting) bench.delete(allyId); else bench.add(allyId);
          this.registry.set('bench', [...bench]);
          saveFrom(this);
          this.showBench();
          this.show(...this.current);
        }));
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
      const facts = add(this.add.text(94, ry + 23, known ? s.desc : '', { ...FONT, fontSize: '12px', color: '#ccccee', wordWrap: { width: known && s.cooldown ? 186 : 228 }, lineSpacing: 0 }).setOrigin(0, 0).setDepth(1));
      const rowH = Math.max(54, 29 + facts.height);
      add(this.panel(this.add.graphics(), 180, ry + rowH / 2, 312, rowH - 4, 0x201c30, 0x2e2a40));
      if (known && s.cooldown) {
        // 6pt (two art pixels) clear of the card's inner edge on top and right, like the skill icon on the left
        const t = add(this.add.text(324, ry + 26, String(s.cooldown), numFont(15)).setOrigin(1, 0.5).setDepth(1));
        add(this.add.image(324 - t.width - 20, ry + 26, 'icon_cd').setScale(PX).setDepth(1)); }
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
