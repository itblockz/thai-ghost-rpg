import Phaser from 'phaser';
import { player } from '../state.js';
import { MONSTERS } from '../data/monsters.js';

const FONT = { fontFamily: 'sans-serif', color: '#fff' };
const dmg = (atk, def) => Math.max(1, atk - def + Phaser.Math.Between(-2, 2));

export class BattleScene extends Phaser.Scene {
  constructor() { super('Battle'); }

  create(data) {
    this.data_ = data;
    this.m = { ...MONSTERS[data.monster] };
    this.m.maxHp = this.m.hp;
    this.busy = false;
    this.guard = false;

    this.add.rectangle(180, 200, 360, 400, 0x140a1e);
    this.mSprite = this.add.text(180, 170, this.m.emoji, { fontSize: '96px' }).setOrigin(0.5);
    this.tweens.add({ targets: this.mSprite, y: 160, yoyo: true, repeat: -1, duration: 900 });
    this.mName = this.add.text(180, 50, '', { ...FONT, fontSize: '20px' }).setOrigin(0.5);
    this.pText = this.add.text(16, 300, '', { ...FONT, fontSize: '16px' });
    this.log = this.add.text(16, 340, '', { ...FONT, fontSize: '16px', wordWrap: { width: 328 } });

    this.buttons = [
      this.btn(70, 520, '⚔️ โจมตี', () => this.attack()),
      this.btn(180, 520, '🛡️ ป้องกัน', () => this.defend()),
      this.btn(290, 520, '🏃 หนี', () => this.run()),
    ];
    this.say(`${this.m.name} ปรากฏตัว!`);
    this.refresh();
  }

  btn(x, y, label, fn) {
    const r = this.add.rectangle(x, y, 100, 64, 0x33334d).setStrokeStyle(2, 0x8888cc).setInteractive();
    this.add.text(x, y, label, { ...FONT, fontSize: '16px' }).setOrigin(0.5);
    r.on('pointerdown', () => { if (!this.busy) fn(); });
    return r;
  }

  say(t) { this.log.setText(t); }
  refresh() {
    this.mName.setText(`${this.m.name}  HP ${Math.max(0, this.m.hp)}/${this.m.maxHp}`);
    this.pText.setText(`${player.name}  HP ${Math.max(0, player.hp)}/${player.maxHp}`);
  }

  attack() {
    const d = dmg(player.atk, this.m.def);
    this.m.hp -= d;
    this.tweens.add({ targets: this.mSprite, alpha: 0.2, yoyo: true, duration: 80, repeat: 1 });
    this.say(`คุณโจมตี ${this.m.name} เสียหาย ${d}`);
    this.endTurn();
  }
  defend() { this.guard = true; this.say('คุณตั้งท่าป้องกัน'); this.endTurn(); }
  run() {
    if (Math.random() < 0.5) {
      this.say('หนีสำเร็จ!');
      this.busy = true;
      this.time.delayedCall(700, () => this.scene.start('World', { pos: this.data_.pos }));
    } else { this.say('หนีไม่พ้น!'); this.endTurn(); }
  }

  endTurn() {
    this.busy = true;
    this.refresh();
    this.time.delayedCall(700, () => {
      if (this.m.hp <= 0) return this.win();
      let d = dmg(this.m.atk, player.def);
      if (this.guard) d = Math.ceil(d / 2);
      this.guard = false;
      player.hp -= d;
      this.cameras.main.shake(150, 0.01);
      this.say(`${this.m.name} พุ่งเข้ากัด! เสียหาย ${d}`);
      this.refresh();
      if (player.hp <= 0) return this.time.delayedCall(800, () => this.scene.start('GameOver'));
      this.busy = false;
    });
  }

  win() {
    player.exp += this.m.exp;
    const set = this.registry.get('defeated') || new Set();
    set.add(this.data_.key);
    this.registry.set('defeated', set);
    this.mSprite.setVisible(false);
    this.say(`ปราบ ${this.m.name} สำเร็จ! ได้ ${this.m.exp} EXP`);
    this.time.delayedCall(1200, () => this.scene.start('World', { pos: this.data_.pos }));
  }
}
