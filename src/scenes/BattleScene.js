import Phaser from 'phaser';
import { MONSTERS } from '../data/monsters.js';
import { registerSprites } from '../art/sprites.js';
import { ZOOM, setupCamera } from '../display.js';

const FONT = { fontFamily: 'sans-serif', color: '#fff', resolution: ZOOM };
const PLAYER = { name: 'หมอผีน้อย', hp: 30, atk: [5, 7] };

export class BattleScene extends Phaser.Scene {
  constructor() { super('Battle'); }

  create() {
    registerSprites(this);
    setupCamera(this);
    const def = MONSTERS.krasue;
    this.m = { ...def, maxHp: def.hp, turn: 0 };
    this.p = { ...PLAYER, maxHp: PLAYER.hp };
    this.busy = false;

    this.add.rectangle(180, 210, 360, 420, 0x140a1e);
    // monster
    this.glow = this.add.circle(180, 175, 95, 0xff3060, 0.12);
    this.mSprite = this.add.image(180, 175, def.sprite).setScale(11);
    this.tweens.add({ targets: [this.mSprite, this.glow], y: '-=8', yoyo: true, repeat: -1, duration: 900, ease: 'Sine.inOut' });
    this.mBar = this.bar(30, 40, def.name);
    this.intent = this.add.text(180, 300, '', { ...FONT, fontSize: '16px', color: '#ff6688' }).setOrigin(0.5);

    // player
    this.pBar = this.bar(30, 335, this.p.name);
    this.log = this.add.text(180, 395, '', { ...FONT, fontSize: '16px', align: 'center', wordWrap: { width: 320 } }).setOrigin(0.5, 0);

    this.btns = [
      this.btn(95, 545, '⚔️ โจมตี', 'ความเสียหาย 5–7', () => this.act('attack')),
      this.btn(265, 545, '🛡️ ป้องกัน', 'ลดความเสียหายครึ่งหนึ่ง\nกันท่าไม้ตายได้หมด', () => this.act('defend')),
    ];
    this.say(`${def.name}ลอยออกมาจากความมืด!`);
    this.showIntent();
    this.refresh();
  }

  bar(x, y, label) {
    const t = this.add.text(x, y, label, { ...FONT, fontSize: '14px' });
    this.add.rectangle(x, y + 22, 300, 14, 0x333344).setOrigin(0, 0);
    const fill = this.add.rectangle(x, y + 22, 300, 14, 0x55cc66).setOrigin(0, 0);
    const num = this.add.text(x + 300, y, '', { ...FONT, fontSize: '14px' }).setOrigin(1, 0);
    return { fill, num, t };
  }

  btn(x, y, label, hint, fn) {
    const r = this.add.rectangle(x, y, 160, 100, 0x33334d).setStrokeStyle(3, 0x8888cc).setInteractive();
    const t = this.add.text(x, y - 18, label, { ...FONT, fontSize: '22px' }).setOrigin(0.5);
    const h = this.add.text(x, y + 22, hint, { ...FONT, fontSize: '13px', color: '#d0d0ee', align: 'center' }).setOrigin(0.5);
    r.on('pointerdown', () => { if (!this.busy) { r.setFillStyle(0x4a4a70); fn(); } });
    r.on('pointerup', () => r.setFillStyle(0x33334d));
    r.on('pointerout', () => r.setFillStyle(0x33334d));
    return { r, t, h };
  }

  say(t) { this.log.setText(t); }

  setBar(b, hp, max) {
    const ratio = Math.max(0, hp) / max;
    this.tweens.add({ targets: b.fill, width: 300 * ratio, duration: 250 });
    b.fill.setFillStyle(ratio > 0.5 ? 0x55cc66 : ratio > 0.25 ? 0xddbb33 : 0xdd4444);
    b.num.setText(`${Math.max(0, hp)}/${max}`);
  }

  refresh() {
    this.setBar(this.mBar, this.m.hp, this.m.maxHp);
    this.setBar(this.pBar, this.p.hp, this.p.maxHp);
  }

  nextMove() { return this.m.pattern[this.m.turn % this.m.pattern.length]; }

  // Tell the player what the monster will do next turn.
  showIntent() {
    const next = this.m.moves[this.nextMove()];
    this.intent.setText(next.intent).setColor(next.danger ? '#ff5577' : '#ccccee').setAlpha(1);
    this.glow.setFillStyle(0xff3060, next.danger ? 0.45 : 0.12);
    if (next.danger) this.tweens.add({ targets: this.intent, alpha: 0.4, yoyo: true, repeat: 3, duration: 200 });
  }

  act(choice) {
    this.busy = true;
    const guarding = choice === 'defend';
    if (choice === 'attack') {
      const d = Phaser.Math.Between(...this.p.atk);
      this.m.hp -= d;
      this.tweens.add({ targets: this.mSprite, alpha: 0.2, yoyo: true, duration: 70, repeat: 1 });
      this.say(`คุณฟาดด้วยไม้เท้า! ${this.m.name}เสียหาย ${d}`);
    } else {
      this.say('คุณตั้งท่าป้องกัน พนมมือสวดมนต์...');
    }
    this.refresh();
    this.time.delayedCall(800, () => (this.m.hp <= 0 ? this.end(true) : this.monsterTurn(guarding)));
  }

  monsterTurn(guarding) {
    const key = this.nextMove();
    const mv = this.m.moves[key];
    this.m.turn++;
    let d = Phaser.Math.Between(...mv.dmg);
    let msg = mv.text;
    if (d > 0 && guarding) {
      if (mv.blockable) { d = 0; msg += '\nแต่คุณป้องกันได้ทั้งหมด! 🛡️'; }
      else { d = Math.ceil(d / 2); msg += `\nคุณป้องกันไว้ได้ครึ่งหนึ่ง เสียหาย ${d}`; }
    } else if (d > 0) msg += `\nคุณเสียหาย ${d}`;
    if (d > 0) { this.p.hp -= d; this.cameras.main.shake(key === 'special' ? 300 : 150, key === 'special' ? 0.02 : 0.008); }
    this.say(msg);

    this.showIntent();

    this.refresh();
    if (this.p.hp <= 0) return this.time.delayedCall(900, () => this.end(false));
    this.busy = false;
  }

  end(won) {
    this.busy = true;
    this.intent.setText('');
    if (won) this.tweens.add({ targets: [this.mSprite, this.glow], alpha: 0, scale: '+=2', duration: 600 });
    this.say(won ? `ปราบ${this.m.name}สำเร็จ! 🎉` : `คุณถูก${this.m.name}เล่นงานจนสลบ...`);
    this.btns.forEach(b => { b.r.setVisible(false); b.t.setVisible(false); b.h.setVisible(false); });
    const r = this.add.rectangle(180, 545, 240, 80, won ? 0x2d5a3a : 0x5a2d3a).setStrokeStyle(3, 0xffffff).setInteractive();
    this.add.text(180, 545, won ? '🔁 สู้อีกครั้ง' : '🔁 ลองใหม่', { ...FONT, fontSize: '22px' }).setOrigin(0.5);
    r.on('pointerdown', () => this.scene.restart());
  }
}
