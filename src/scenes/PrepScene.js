import Phaser from 'phaser';
import { ZOOM, setupCamera, FONT_FAMILY, TEXT_METRICS, PX, idleFrames } from '../display.js';
import { registerSprites } from '../art/sprites.js';
import { ALLIES, ENEMIES, STAGES } from '../data/units.js';
import { SKILLS, skillFacts } from '../data/skills.js';
import { currentTeam } from '../flow.js';
import { play } from '../audio/sfx.js';
import { saveProgress } from '../save.js';

const FONT = { fontFamily: FONT_FAMILY, color: '#fff', resolution: ZOOM, ...TEXT_METRICS };
const TEAM_SLOTS = 3;
const ENEMY_Y = 112, TEAM_Y = 488, PANEL_TOP = 178, PANEL_BOTTOM = 424, BTN_Y = 588;
const slots = n => (n === 1 ? [180] : n === 2 ? [105, 255] : [65, 180, 295]);

// Before each fight. Laid out like the battlefield (enemies above, team below);
// tap anyone to read them in the middle panel. No pop-ups.
export class PrepScene extends Phaser.Scene {
  constructor() { super('Prep'); }

  create(data) {
    setupCamera(this);
    registerSprites(this);
    this.stage = data?.stage ?? 0;
    const stage = STAGES[this.stage];
    saveProgress(this.stage, currentTeam(this)); // reaching a fight is the checkpoint

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
    team.forEach((id, i) => this.figure(tx[i], TEAM_Y, ALLIES[id], () => this.show(ALLIES[id], 1, tx[i], TEAM_Y, 'ally')));

    // start (same style as the battle buttons)
    this.panel(this.add.graphics(), 180, BTN_Y, 332, 80, 0x3d3d5e, 0xffdd55);
    this.add.text(180, BTN_Y, 'เข้าสู้', { ...FONT, fontSize: '26px', fontStyle: 'bold' }).setOrigin(0.5);
    this.add.zone(180, BTN_Y, 332, 80).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => { play('click'); this.scene.start('Battle', { stage: this.stage, retry: !!data?.retry }); });

    picks[0]();
  }

  figure(x, y, def, onPick) {
    const img = this.add.image(x, y, def.sprite).setScale(PX);
    idleFrames(this, img, def.sprite);
    this.add.zone(x, y, 100, 100).setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); onPick(); });
    return onPick;
  }

  // Fill the middle panel with one unit: name, HP, lore, then every skill with all its numbers.
  show(def, count, x, y, side) {
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
    add(this.add.text(330, PANEL_TOP + 20, `ขวัญ ${def.hp}`, { ...FONT, fontSize: '16px', color: '#88dd99' }).setOrigin(1, 0.5));
    add(this.add.text(30, PANEL_TOP + 44, def.lore || '', { ...FONT, fontSize: '12px', color: '#a8a8c8' }).setOrigin(0, 0.5));
    add(this.add.rectangle(180, PANEL_TOP + 62, 300, 2, 0x44445e));

    let ry = PANEL_TOP + 72;
    for (const sid of def.skills) {
      const s = SKILLS[sid];
      add(this.add.text(84, ry, s.name, { ...FONT, fontSize: '16px', fontStyle: 'bold' }).setOrigin(0, 0));
      const facts = add(this.add.text(84, ry + 22, skillFacts(s).join(' · '), { ...FONT, fontSize: '12px', color: '#ccccee', wordWrap: { width: 236 }, lineSpacing: 2 }).setOrigin(0, 0));
      const rowH = Math.max(54, 26 + facts.height);
      add(this.add.image(50, ry + 26, s.icon).setScale(PX));
      ry += rowH;
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
