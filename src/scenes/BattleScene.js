import Phaser from 'phaser';
import { MONSTERS } from '../data/monsters.js';
import { SKILLS } from '../data/skills.js';
import { STATUSES } from '../data/statuses.js';
import { registerSprites } from '../art/sprites.js';
import { ZOOM, setupCamera } from '../display.js';

const FONT = { fontFamily: 'sans-serif', color: '#fff', resolution: ZOOM };
const MX = 180, MY = 200; // monster position

export class BattleScene extends Phaser.Scene {
  constructor() { super('Battle'); }

  create() {
    registerSprites(this);
    setupCamera(this);
    const def = MONSTERS.krasue;
    this.m = { ...def, maxHp: def.hp, turn: 0, statuses: new Set() };
    this.p = { name: 'หมอผีน้อย', hp: 30, maxHp: 30, statuses: new Set(), cd: {} };
    this.busy = false;

    this.add.rectangle(180, 210, 360, 420, 0x140a1e);
    this.glow = this.add.circle(MX, MY, 95, 0xff3060, 0.12);
    this.mSprite = this.add.image(MX, MY, def.sprite).setScale(11);
    this.tweens.add({ targets: [this.mSprite, this.glow], y: '-=8', yoyo: true, repeat: -1, duration: 900, ease: 'Sine.inOut' });
    this.intent = this.add.text(MX, 85, '', { ...FONT, fontSize: '30px', fontStyle: 'bold' }).setOrigin(0.5);

    this.mBar = this.bar(30, 20, def.name);
    this.pBar = this.bar(30, 360, this.p.name);

    this.btns = SKILLS.map((s, i) => this.skillBtn(95 + i * 170, 520, s));
    this.refresh();
  }

  // ---------- UI ----------
  bar(x, y, label) {
    const name = this.add.text(x, y, label, { ...FONT, fontSize: '15px' });
    const st = this.add.text(x + name.width + 8, y - 2, '', { ...FONT, fontSize: '16px' });
    this.add.rectangle(x, y + 22, 300, 14, 0x333344).setOrigin(0, 0);
    const fill = this.add.rectangle(x, y + 22, 300, 14, 0x55cc66).setOrigin(0, 0);
    const num = this.add.text(x + 300, y, '', { ...FONT, fontSize: '15px' }).setOrigin(1, 0);
    return { fill, num, st, x, y };
  }

  skillBtn(x, y, s) {
    const r = this.add.rectangle(x, y, 155, 150, 0x33334d).setStrokeStyle(3, 0x8888cc).setInteractive();
    const icon = this.add.text(x, y - 35, s.icon, { ...FONT, fontSize: '44px' }).setOrigin(0.5);
    const name = this.add.text(x, y + 20, s.name, { ...FONT, fontSize: '20px' }).setOrigin(0.5);
    const hint = this.add.text(x, y + 50, s.hint, { ...FONT, fontSize: '15px', color: '#d0d0ee' }).setOrigin(0.5);
    const cdText = this.add.text(x, y, '', { ...FONT, fontSize: '56px', fontStyle: 'bold' }).setOrigin(0.5);
    r.on('pointerdown', () => { if (!this.busy && !this.p.cd[s.id]) this.useSkill(s); });
    return { s, r, parts: [icon, name, hint], cdText };
  }

  popup(x, y, text, color = '#fff', size = 34) {
    const t = this.add.text(x, y, text, { ...FONT, fontSize: `${size}px`, fontStyle: 'bold', color, stroke: '#000', strokeThickness: 5 }).setOrigin(0.5);
    this.tweens.add({ targets: t, y: y - 50, alpha: 0, duration: 1000, ease: 'Cubic.out', onComplete: () => t.destroy() });
  }

  statusIcons(c) { return [...c.statuses].map(k => STATUSES[k].icon).join(' '); }

  setBar(b, c) {
    const ratio = Math.max(0, c.hp) / c.maxHp;
    this.tweens.add({ targets: b.fill, width: 300 * ratio, duration: 250 });
    b.fill.setFillStyle(ratio > 0.5 ? 0x55cc66 : ratio > 0.25 ? 0xddbb33 : 0xdd4444);
    b.num.setText(`${Math.max(0, c.hp)}/${c.maxHp}`);
    b.st.setText(this.statusIcons(c));
  }

  refresh() {
    this.setBar(this.mBar, this.m);
    this.setBar(this.pBar, this.p);
    this.btns.forEach(b => {
      const cd = this.p.cd[b.s.id] || 0;
      b.r.setFillStyle(cd ? 0x1e1e2a : 0x33334d).setStrokeStyle(3, cd ? 0x444455 : 0x8888cc);
      b.parts.forEach(p => p.setAlpha(cd ? 0.25 : 1));
      b.cdText.setText(cd ? String(cd) : '');
    });
    this.showIntent();
  }

  // Icon above the monster telling what it will do next turn.
  showIntent() {
    const mv = this.m.moves[this.nextMove()];
    const fizzles = mv.needs && !this.m.statuses.has(mv.needs);
    this.tweens.killTweensOf(this.intent);
    this.intent.setAlpha(1);
    if (fizzles) {
      this.intent.setText('😵').setColor('#ffffff');
    } else {
      this.intent.setText(mv.dmg ? `${mv.icon} ${mv.dmg}` : mv.icon).setColor(mv.danger ? '#ff4466' : '#ffffff');
      if (mv.danger) this.tweens.add({ targets: this.intent, scale: 1.25, yoyo: true, repeat: -1, duration: 300 });
    }
    this.intent.setScale(1);
    this.glow.setFillStyle(0xff3060, this.m.statuses.has('charge') ? 0.5 : 0.12);
  }

  nextMove() { return this.m.pattern[this.m.turn % this.m.pattern.length]; }

  // ---------- turn logic ----------
  useSkill(s) {
    this.busy = true;
    // +1 because cooldowns tick down at the end of the monster's turn
    if (s.cooldown) this.p.cd[s.id] = s.cooldown + 1;

    this.m.hp -= s.dmg;
    this.popup(MX, MY - 20, `-${s.dmg}`, '#ffdd55');
    this.tweens.add({ targets: this.mSprite, alpha: 0.2, yoyo: true, duration: 70, repeat: 1 });
    if (s.removes && this.m.statuses.delete(s.removes)) {
      this.time.delayedCall(250, () => this.popup(MX, MY + 40, `ล้าง${STATUSES[s.removes].icon}!`, '#66ccff', 28));
    }
    this.setBar(this.mBar, this.m);
    this.showIntent();
    this.time.delayedCall(900, () => (this.m.hp <= 0 ? this.end(true) : this.monsterTurn()));
  }

  monsterTurn() {
    const mv = this.m.moves[this.nextMove()];
    this.m.turn++;
    if (mv.needs && !this.m.statuses.has(mv.needs)) {
      this.popup(MX, MY - 20, `😵 ${mv.fizzle}`, '#ffffff', 28);
    } else {
      if (mv.needs) this.m.statuses.delete(mv.needs);
      if (mv.addStatus) {
        this.m.statuses.add(mv.addStatus);
        this.popup(MX, MY - 20, STATUSES[mv.addStatus].icon, '#ffffff', 40);
      }
      if (mv.dmg) {
        this.p.hp -= mv.dmg;
        this.popup(180, 340, `-${mv.dmg}`, '#ff5566', mv.danger ? 48 : 34);
        this.cameras.main.shake(mv.danger ? 350 : 150, mv.danger ? 0.025 : 0.008);
        if (mv.danger) this.cameras.main.flash(200, 255, 40, 80);
      }
    }
    for (const k in this.p.cd) if (this.p.cd[k] > 0) this.p.cd[k]--;
    this.refresh();
    if (this.p.hp <= 0) return this.time.delayedCall(900, () => this.end(false));
    this.busy = false;
  }

  end(won) {
    this.busy = true;
    this.intent.setText('');
    this.tweens.killTweensOf(this.intent);
    if (won) this.tweens.add({ targets: [this.mSprite, this.glow], alpha: 0, scale: '+=2', duration: 600 });
    this.add.text(180, 300, won ? 'ชนะ! 🎉' : 'แพ้... 💀', { ...FONT, fontSize: '40px', fontStyle: 'bold', stroke: '#000', strokeThickness: 6 }).setOrigin(0.5);
    this.btns.forEach(b => { b.r.setVisible(false); b.parts.forEach(p => p.setVisible(false)); b.cdText.setVisible(false); });
    const r = this.add.rectangle(180, 520, 240, 90, won ? 0x2d5a3a : 0x5a2d3a).setStrokeStyle(3, 0xffffff).setInteractive();
    this.add.text(180, 520, '🔁 สู้อีกครั้ง', { ...FONT, fontSize: '24px' }).setOrigin(0.5);
    r.on('pointerdown', () => this.scene.restart());
  }
}
