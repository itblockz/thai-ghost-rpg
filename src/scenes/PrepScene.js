import Phaser from 'phaser';
import { ZOOM, setupCamera, FONT_FAMILY, TEXT_METRICS, PX, idleFrames } from '../display.js';
import { registerSprites } from '../art/sprites.js';
import { ALLIES, ENEMIES, STAGES } from '../data/units.js';
import { SKILLS, skillFacts } from '../data/skills.js';
import { currentTeam } from '../flow.js';
import { play } from '../audio/sfx.js';

const FONT = { fontFamily: FONT_FAMILY, color: '#fff', resolution: ZOOM, ...TEXT_METRICS };
const TEAM_SLOTS = 3;

// Before each fight: study the enemies (everything they can do), see the team, then "เข้าสู้".
export class PrepScene extends Phaser.Scene {
  constructor() { super('Prep'); }

  create(data) {
    setupCamera(this);
    registerSprites(this);
    this.stage = data?.stage ?? 0;
    const stage = STAGES[this.stage];

    this.add.image(180, 0, stage.bg || 'bg_night').setOrigin(0.5, 0).setScale(PX);
    this.add.rectangle(180, 320, 360, 640, 0x07060f, 0.72);
    this.add.text(180, 30, 'ศัตรูเบื้องหน้า', { ...FONT, fontSize: '22px', fontStyle: 'bold', color: '#ff7790' }).setOrigin(0.5);

    // one card per kind of enemy (duplicates shown as ×n)
    const counts = {};
    stage.enemies.forEach(id => { counts[id] = (counts[id] || 0) + 1; });
    let y = 56;
    for (const [id, n] of Object.entries(counts)) y = this.unitCard(y, ENEMIES[id], n, 0x2a1426, 0xaa6677) + 10;

    // team: fixed slots; empty ones shown faint (team choice comes once there are more retainers than slots)
    const team = currentTeam(this);
    const ty = Math.max(y + 12, 412);
    this.add.text(180, ty, 'บริวาร', { ...FONT, fontSize: '18px', fontStyle: 'bold', color: '#ffe08a' }).setOrigin(0.5);
    for (let i = 0; i < TEAM_SLOTS; i++) {
      const x = 180 + (i - 1) * 110, sy = ty + 66, id = team[i];
      const g = this.add.graphics();
      this.panel(g, x, sy, 102, 102, id ? 0x2e2a1c : 0x15151f, id ? 0xd4a020 : 0x33334a);
      if (!id) continue;
      const img = this.add.image(x, sy, ALLIES[id].sprite).setScale(PX);
      idleFrames(this, img, ALLIES[id].sprite);
      this.add.zone(x, sy, 102, 102).setInteractive({ useHandCursor: true })
        .on('pointerdown', () => { play('click'); this.showAlly(ALLIES[id]); });
    }
    this.add.text(180, ty + 128, 'แตะบริวารเพื่อดูฤทธิ์', { ...FONT, fontSize: '12px', color: '#9999bb' }).setOrigin(0.5);

    // start
    const by = 592;
    this.panel(this.add.graphics(), 180, by, 332, 70, 0x5a2d3a, 0xffffff);
    this.add.text(180, by, 'เข้าสู้', { ...FONT, fontSize: '26px', fontStyle: 'bold' }).setOrigin(0.5);
    this.add.zone(180, by, 332, 70).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => { play('click'); this.scene.start('Battle', { stage: this.stage, retry: !!data?.retry }); });
  }

  // Portrait + name/HP/lore, then one row per skill with every number. Returns the bottom y.
  unitCard(top, def, count, fill, border, depth = 0) {
    const objs = [];
    const g = this.add.graphics().setDepth(depth);
    objs.push(g);
    const img = this.add.image(68, top + 56, def.sprite).setScale(PX).setDepth(depth);
    objs.push(img, idleFrames(this, img, def.sprite));
    objs.push(
      this.add.text(124, top + 26, count > 1 ? `${def.name} ×${count}` : def.name, { ...FONT, fontSize: '20px', fontStyle: 'bold' }).setOrigin(0, 0.5).setDepth(depth),
      this.add.text(124, top + 52, `ขวัญ ${def.hp}`, { ...FONT, fontSize: '15px', color: '#88dd99' }).setOrigin(0, 0.5).setDepth(depth),
      this.add.text(124, top + 78, def.lore || '', { ...FONT, fontSize: '12px', color: '#bbbbdd', wordWrap: { width: 196 } }).setOrigin(0, 0.5).setDepth(depth),
    );
    // skill rows grow to fit their text, so long descriptions never spill out of the card
    let y = top + 108;
    for (const sid of def.skills) {
      const s = SKILLS[sid];
      const name = this.add.text(86, y, s.name, { ...FONT, fontSize: '16px', fontStyle: 'bold' }).setOrigin(0, 0).setDepth(depth);
      const facts = this.add.text(86, y + 22, skillFacts(s).join(' · '), { ...FONT, fontSize: '12px', color: '#ccccee', wordWrap: { width: 236 }, lineSpacing: 2 }).setOrigin(0, 0).setDepth(depth);
      const rowH = Math.max(52, 22 + facts.height + 8);
      objs.push(name, facts, this.add.image(52, y + Math.min(rowH, 52) / 2, s.icon).setScale(PX).setDepth(depth));
      y += rowH;
    }
    const h = y - top + 6;
    this.panel(g, 180, top + h / 2, 332, h, fill, border);
    this.lastCard = objs;
    return top + h;
  }

  // Retainer details over the enemy area; tap anywhere to close.
  showAlly(def) {
    this.closeAlly();
    const shade = this.add.rectangle(180, 320, 360, 640, 0x000000, 0.6).setDepth(10).setInteractive();
    this.unitCard(120, def, 1, 0x2e2a1c, 0xd4a020, 11);
    this.allyCard = [shade, ...this.lastCard];
    shade.on('pointerdown', () => this.closeAlly());
  }

  closeAlly() {
    (this.allyCard || []).forEach(o => (o.remove ? o.remove() : o.destroy()));
    this.allyCard = null;
  }

  panel(g, x, y, w, h, fill, border, u = PX) {
    const l = x - w / 2, t = y - h / 2;
    g.fillStyle(0x000000).fillRect(l + u, t, w - 2 * u, h).fillRect(l, t + u, w, h - 2 * u);
    g.fillStyle(border).fillRect(l + 2 * u, t + u, w - 4 * u, h - 2 * u).fillRect(l + u, t + 2 * u, w - 2 * u, h - 4 * u);
    g.fillStyle(fill).fillRect(l + 2 * u, t + 2 * u, w - 4 * u, h - 4 * u);
    return g;
  }
}
