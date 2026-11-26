import Phaser from 'phaser';
import { MONSTERS } from '../data/monsters.js';
import { ITEMS, STARTING_ITEMS } from '../data/items.js';
import { STATUSES } from '../data/statuses.js';
import { registerSprites } from '../art/sprites.js';
import { ZOOM, setupCamera } from '../display.js';
import { play, isMuted, toggleMute } from '../audio/sfx.js';

const FONT = { fontFamily: 'sans-serif', color: '#fff', resolution: ZOOM };
const MX = 180, MY = 200; // monster position
const HX = 300, HY = 436; // first-person hand (bottom of battle area)
const BTN_Y = 505;

export class BattleScene extends Phaser.Scene {
  constructor() { super('Battle'); }

  create() {
    registerSprites(this);
    setupCamera(this);
    const def = MONSTERS.kongkoi;
    this.m = { ...def, maxHp: def.hp, turn: 0, statuses: new Set() };
    this.p = { name: 'หมอผีน้อย', hp: 30, maxHp: 30, statuses: new Set(), cd: {} };
    this.busy = false;

    this.add.image(180, 0, 'bg_night').setOrigin(0.5, 0).setScale(4);
    this.glow = this.add.circle(MX, MY, 95, 0xff3060, 0.12);
    this.mSprite = this.add.image(MX, MY, def.sprite).setScale(11);
    this.tweens.add({ targets: [this.mSprite, this.glow], y: '-=8', yoyo: true, repeat: -1, duration: 900, ease: 'Sine.inOut' });
    this.intentIcon = this.add.image(MX, 85, 'icon_claw').setScale(4);
    this.intentNum = this.add.text(MX, 85, '', { ...FONT, fontSize: '28px', fontStyle: 'bold', stroke: '#000', strokeThickness: 5 }).setOrigin(0, 0.5);

    this.mBar = this.bar(30, 20, def.name);
    this.pBar = this.bar(30, 585, this.p.name);

    // First-person view: our hand holding the knife.
    this.hand = this.add.image(HX, HY, 'hand_knife').setOrigin(0.5, 1).setScale(7);
    this.tweens.add({ targets: this.hand, y: HY + 6, yoyo: true, repeat: -1, duration: 1100, ease: 'Sine.inOut' });
    this.fxSlash = this.add.image(MX, MY, 'fx_slash').setScale(7).setAlpha(0);
    this.fxClaw = this.add.image(170, 330, 'fx_claw').setScale(6).setAlpha(0);

    const muteKey = () => (isMuted() ? 'icon_sound_off' : 'icon_sound_on');
    const mute = this.add.image(338, 78, muteKey()).setScale(3.5).setInteractive({ useHandCursor: true });
    mute.on('pointerdown', () => { toggleMute(); mute.setTexture(muteKey()); });

    const skills = STARTING_ITEMS.map(id => ({ id, icon: ITEMS[id].icon, ...ITEMS[id].skill }));
    const n = skills.length, w = n === 1 ? 220 : 155;
    this.btns = skills.map((s, i) => this.skillBtn(180 + (i - (n - 1) / 2) * 170, BTN_Y, s, w));
    this.refresh();
  }

  // ---------- UI ----------
  bar(x, y, label) {
    const name = this.add.text(x, y, label, { ...FONT, fontSize: '15px' });
    const st = this.add.container(x + name.width + 14, y + 9);
    this.add.rectangle(x - 3, y + 19, 306, 20, 0x000000).setOrigin(0, 0);
    this.add.rectangle(x - 1, y + 21, 302, 16, 0x8888aa).setOrigin(0, 0);
    this.add.rectangle(x, y + 22, 300, 14, 0x333344).setOrigin(0, 0);
    const fill = this.add.rectangle(x, y + 22, 300, 14, 0x55cc66).setOrigin(0, 0);
    const num = this.add.text(x + 300, y, '', { ...FONT, fontSize: '15px' }).setOrigin(1, 0);
    return { fill, num, st, x, y };
  }

  skillBtn(x, y, s, w) {
    const g = this.add.graphics();
    const r = this.add.zone(x, y, w, 130).setInteractive({ useHandCursor: true });
    const icon = this.add.image(x, y - 28, s.icon).setScale(5);
    const name = this.add.text(x, y + 22, s.name, { ...FONT, fontSize: '22px' }).setOrigin(0.5);
    const dmgIcon = this.add.image(x - 14, y + 47, 'icon_dmg').setScale(2.5);
    const hint = this.add.text(x - 2, y + 47, String(s.dmg), { ...FONT, fontSize: '17px', color: '#d0d0ee' }).setOrigin(0, 0.5);
    const cdText = this.add.text(x, y, '', { ...FONT, fontSize: '56px', fontStyle: 'bold' }).setOrigin(0.5);
    const b = { s, r, g, x, y, w, h: 130, parts: [icon, name, dmgIcon, hint], cdText, pressed: false };
    r.on('pointerdown', () => {
      if (this.busy || this.p.cd[s.id]) return;
      b.pressed = true; this.drawBtn(b);
      this.useSkill(s);
    });
    r.on('pointerup', () => { b.pressed = false; this.drawBtn(b); });
    r.on('pointerout', () => { b.pressed = false; this.drawBtn(b); });
    return b;
  }

  // Panel with notched (pixel-style) corners.
  pixelPanel(g, x, y, w, h, fill, border, u = 4) {
    const l = x - w / 2, t = y - h / 2;
    g.fillStyle(0x000000).fillRect(l + u, t, w - 2 * u, h).fillRect(l, t + u, w, h - 2 * u);
    g.fillStyle(border).fillRect(l + 2 * u, t + u, w - 4 * u, h - 2 * u).fillRect(l + u, t + 2 * u, w - 2 * u, h - 4 * u);
    g.fillStyle(fill).fillRect(l + 2 * u, t + 2 * u, w - 4 * u, h - 4 * u);
    g.fillStyle(0xffffff, 0.12).fillRect(l + 2 * u, t + 2 * u, w - 4 * u, u); // top highlight
  }

  drawBtn(b) {
    const cd = this.p.cd[b.s.id] || 0;
    b.g.clear();
    this.pixelPanel(b.g, b.x, b.y + (b.pressed ? 3 : 0), b.w, b.h, cd ? 0x1e1e2a : b.pressed ? 0x4a4a70 : 0x33334d, cd ? 0x444455 : 0x8888cc);
  }

  popup(x, y, text, color = '#fff', size = 34) {
    const t = this.add.text(x, y, text, { ...FONT, fontSize: `${size}px`, fontStyle: 'bold', color, stroke: '#000', strokeThickness: 5 }).setOrigin(0.5);
    this.tweens.add({ targets: t, y: y - 50, alpha: 0, duration: 1000, ease: 'Cubic.out', onComplete: () => t.destroy() });
  }


  setBar(b, c) {
    const ratio = Math.max(0, c.hp) / c.maxHp;
    this.tweens.add({ targets: b.fill, width: 300 * ratio, duration: 250 });
    b.fill.setFillStyle(ratio > 0.5 ? 0x55cc66 : ratio > 0.25 ? 0xddbb33 : 0xdd4444);
    b.num.setText(`${Math.max(0, c.hp)}/${c.maxHp}`);
    b.st.removeAll(true);
    [...c.statuses].forEach((k, i) => b.st.add(this.add.image(i * 30, 0, STATUSES[k].icon).setScale(3)));
  }

  refresh() {
    this.setBar(this.mBar, this.m);
    this.setBar(this.pBar, this.p);
    this.btns.forEach(b => {
      const cd = this.p.cd[b.s.id] || 0;
      this.drawBtn(b);
      b.parts.forEach(p => p.setAlpha(cd ? 0.25 : 1));
      b.cdText.setText(cd ? String(cd) : '');
    });
    this.showIntent();
  }

  // Icon above the monster telling what it will do next turn.
  showIntent() {
    const mv = this.m.moves[this.nextMove()];
    const fizzles = mv.needs && !this.m.statuses.has(mv.needs);
    const parts = [this.intentIcon, this.intentNum];
    this.tweens.killTweensOf(parts);
    parts.forEach(o => o.setAlpha(1).setVisible(true));
    this.intentIcon.setScale(4);
    this.intentNum.setScale(1);
    const icon = fizzles ? 'icon_stun' : mv.icon;
    const num = !fizzles && mv.dmg ? String(mv.dmg) : '';
    this.intentIcon.setTexture(icon);
    this.intentNum.setText(num).setColor(mv.danger && !fizzles ? '#ff4466' : '#ffffff');
    // center icon + number as a group
    const total = 32 + (num ? 8 + this.intentNum.width : 0);
    this.intentIcon.setX(MX - total / 2 + 16);
    this.intentNum.setX(MX - total / 2 + 40);
    if (mv.danger && !fizzles) this.tweens.add({ targets: parts, scale: '*=1.25', yoyo: true, repeat: -1, duration: 300 });
    this.glow.setFillStyle(0xff3060, this.m.statuses.has('charge') ? 0.5 : 0.12);
  }

  nextMove() { return this.m.pattern[this.m.turn % this.m.pattern.length]; }

  // ---------- turn logic ----------
  useSkill(s) {
    this.busy = true;
    // +1 because cooldowns tick down at the end of the monster's turn
    if (s.cooldown) this.p.cd[s.id] = s.cooldown + 1;

    this.animSlash(() => {
      this.m.hp -= s.dmg;
      this.popup(MX, MY - 20, `-${s.dmg}`, '#ffdd55');
      if (s.removes && this.m.statuses.delete(s.removes)) {
        this.time.delayedCall(250, () => this.popup(MX, MY + 40, `ล้าง${STATUSES[s.removes].name}!`, '#66ccff', 28));
      }
      this.setBar(this.mBar, this.m);
      this.showIntent();
      this.time.delayedCall(700, () => (this.m.hp <= 0 ? this.end(true) : this.monsterTurn()));
    });
  }

  // ---------- animations ----------
  // Hand thrusts up, a slash streak crosses the ghost, ghost flashes and is knocked back.
  animSlash(onHit) {
    this.tweens.add({
      targets: this.hand, x: HX - 60, y: HY - 90, angle: -35, duration: 120, ease: 'Cubic.out',
      onStart: () => play('slash'),
      onComplete: () => {
        this.fxSlash.setAlpha(1).setScale(5);
        this.tweens.add({ targets: this.fxSlash, scale: 7, alpha: 0, duration: 260, ease: 'Cubic.out' });
        this.mSprite.setTintFill(0xffffff);
        this.time.delayedCall(90, () => this.mSprite.clearTint());
        this.tweens.add({ targets: this.mSprite, x: MX + 14, y: '-=10', duration: 70, yoyo: true });
        play('hit');
        onHit();
        this.tweens.add({ targets: this.hand, x: HX, y: HY, angle: 0, duration: 250, ease: 'Sine.out' });
      },
    });
  }

  // Ghost lunges at the camera, claw marks rip across the screen.
  animMonsterAttack(danger, onHit) {
    let hit = false; // onYoyo fires once per tweened property — only apply the hit once
    this.tweens.add({
      targets: this.mSprite, scale: 11 * 1.6, y: MY + 60, duration: 160, ease: 'Cubic.in', yoyo: true,
      onStart: () => play('laugh'),
      onYoyo: () => {
        if (hit) return;
        hit = true;
        play('scratch');
        this.fxClaw.setAlpha(1).setScale(danger ? 8 : 6);
        this.tweens.add({ targets: this.fxClaw, alpha: 0, duration: 500, delay: 150 });
        this.tweens.add({ targets: this.hand, y: HY + 40, duration: 80, yoyo: true });
        play('hurt');
        onHit();
      },
    });
  }

  monsterTurn() {
    const mv = this.m.moves[this.nextMove()];
    this.m.turn++;
    if (mv.dmg && !(mv.needs && !this.m.statuses.has(mv.needs))) {
      this.animMonsterAttack(mv.danger, () => this.resolveMonsterMove(mv));
    } else {
      this.resolveMonsterMove(mv);
    }
  }

  resolveMonsterMove(mv) {
    if (mv.needs && !this.m.statuses.has(mv.needs)) {
      this.popup(MX, MY - 20, mv.fizzle, '#ffffff', 28);
    } else {
      if (mv.needs) this.m.statuses.delete(mv.needs);
      if (mv.addStatus) {
        this.m.statuses.add(mv.addStatus);
        this.popup(MX, MY - 20, STATUSES[mv.addStatus].name, '#ff8899', 30);
      }
      if (mv.dmg) {
        this.p.hp -= mv.dmg;
        this.popup(280, 575, `-${mv.dmg}`, '#ff5566', mv.danger ? 48 : 34);
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
    this.tweens.killTweensOf([this.intentIcon, this.intentNum]);
    this.intentIcon.setVisible(false); this.intentNum.setVisible(false);
    if (won) {
      play('win');
      // ghost dissolves into rising pixels
      for (let i = 0; i < 40; i++) {
        const px = this.add.rectangle(MX + Phaser.Math.Between(-70, 70), MY + Phaser.Math.Between(-80, 80), 8, 8, Phaser.Math.RND.pick([0x5d4d6e, 0xffffff, 0xd01030]));
        this.tweens.add({ targets: px, y: px.y - Phaser.Math.Between(60, 160), alpha: 0, duration: Phaser.Math.Between(500, 1100), onComplete: () => px.destroy() });
      }
      this.tweens.add({ targets: [this.mSprite, this.glow], alpha: 0, duration: 400 });
    } else {
      play('lose');
      const red = this.add.rectangle(180, 320, 360, 640, 0x660011, 0);
      this.tweens.add({ targets: red, fillAlpha: 0.55, duration: 900 });
    }
    this.add.image(180, 250, won ? 'icon_star' : 'icon_danger').setScale(7);
    this.add.text(180, 310, won ? 'ชนะ!' : 'แพ้...', { ...FONT, fontSize: '40px', fontStyle: 'bold', stroke: '#000', strokeThickness: 6 }).setOrigin(0.5);
    this.btns.forEach(b => { b.r.disableInteractive(); b.g.setVisible(false); b.parts.forEach(p => p.setVisible(false)); b.cdText.setVisible(false); });
    this.pixelPanel(this.add.graphics(), 180, BTN_Y, 240, 90, won ? 0x2d5a3a : 0x5a2d3a, 0xffffff);
    this.add.image(110, BTN_Y, 'icon_retry').setScale(4);
    this.add.text(135, BTN_Y, 'สู้อีกครั้ง', { ...FONT, fontSize: '24px' }).setOrigin(0, 0.5);
    const r = this.add.zone(180, BTN_Y, 240, 90).setInteractive({ useHandCursor: true });
    r.on('pointerdown', () => { play('click'); this.scene.restart(); });
  }
}
