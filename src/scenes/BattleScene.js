import Phaser from 'phaser';
import { MONSTERS } from '../data/monsters.js';
import { ITEMS, STARTING_ITEMS } from '../data/items.js';
import { SKILLS } from '../data/skills.js';
import { registerSprites } from '../art/sprites.js';
import { ZOOM, setupCamera } from '../display.js';
import { play, isMuted, toggleMute } from '../audio/sfx.js';

const FONT = { fontFamily: 'sans-serif', color: '#fff', resolution: ZOOM };
const MX = 180, MY = 200; // monster position
const HX = 300, HY = 436; // first-person hand (bottom of battle area)
const BTN_Y = 505;
const LONG_PRESS_MS = 400;

function storageGet(k) { try { return localStorage.getItem(k); } catch { return null; } }
function storageSet(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }

export class BattleScene extends Phaser.Scene {
  constructor() { super('Battle'); }

  create() {
    registerSprites(this);
    setupCamera(this);
    const def = MONSTERS.kongkoi;
    // Both sides share the same shape: hp, skills, cooldowns.
    this.m = { ...def, maxHp: def.hp, cd: {} };
    this.p = { name: 'หมอผีน้อย', hp: 30, maxHp: 30, cd: {} };
    this.busy = false;

    this.add.image(180, 0, 'bg_night').setOrigin(0.5, 0).setScale(4);
    this.glow = this.add.circle(MX, MY, 95, 0xff3060, 0.12);
    this.mSprite = this.add.image(MX, MY, def.sprite).setScale(11);
    this.tweens.add({ targets: [this.mSprite, this.glow], y: '-=8', yoyo: true, repeat: -1, duration: 900, ease: 'Sine.inOut' });
    this.onLongPress(this.add.zone(MX, MY, 180, 190), () => this.showMonsterCard());

    this.mBar = this.bar(30, 20, def.name);
    this.pBar = this.bar(30, 592, this.p.name);

    // First-person view: our hand holding the knife.
    this.hand = this.add.image(HX, HY, 'hand_knife').setOrigin(0.5, 1).setScale(7);
    this.tweens.add({ targets: this.hand, y: HY + 6, yoyo: true, repeat: -1, duration: 1100, ease: 'Sine.inOut' });
    this.fxSlash = this.add.image(MX, MY, 'fx_slash').setScale(7).setAlpha(0);
    this.fxClaw = this.add.image(170, 330, 'fx_claw').setScale(6).setAlpha(0);

    const muteKey = () => (isMuted() ? 'icon_sound_off' : 'icon_sound_on');
    const mute = this.add.image(338, 78, muteKey()).setScale(3.5).setInteractive({ useHandCursor: true });
    mute.on('pointerdown', () => { toggleMute(); mute.setTexture(muteKey()); });

    const items = STARTING_ITEMS.map(id => ITEMS[id]);
    const n = items.length, w = n === 1 ? 220 : 155;
    this.btns = items.map((item, i) => this.itemBtn(180 + (i - (n - 1) / 2) * 170, BTN_Y, item, w));

    // First-time hint, hidden forever after the player long-presses once.
    this.hint = storageGet('seenLongPress') ? null
      : this.add.text(180, 579, 'กดค้างเพื่อดูรายละเอียด', { ...FONT, fontSize: '12px', color: '#aaaacc' }).setOrigin(0.5);

    this.card = this.add.container(0, 0).setDepth(10).setVisible(false);
    this.refresh();
  }

  // ---------- input ----------
  // Tap → onTap, hold → onHold (card stays while finger is down).
  onLongPress(obj, onHold, onTap) {
    obj.setInteractive({ useHandCursor: true });
    let timer = null, held = false;
    obj.on('pointerdown', () => {
      held = false;
      timer = this.time.delayedCall(LONG_PRESS_MS, () => {
        held = true;
        onHold();
        if (this.hint) { this.hint.destroy(); this.hint = null; storageSet('seenLongPress', '1'); }
      });
    });
    const release = (tapped) => {
      if (timer) { timer.remove(); timer = null; }
      if (held) { this.hideCard(); held = false; } else if (tapped && onTap) onTap();
    };
    obj.on('pointerup', () => release(true));
    obj.on('pointerout', () => release(false));
  }

  // ---------- UI ----------
  bar(x, y, label) {
    this.add.text(x, y, label, { ...FONT, fontSize: '15px' });
    this.add.rectangle(x - 3, y + 19, 306, 20, 0x000000).setOrigin(0, 0);
    this.add.rectangle(x - 1, y + 21, 302, 16, 0x8888aa).setOrigin(0, 0);
    this.add.rectangle(x, y + 22, 300, 14, 0x333344).setOrigin(0, 0);
    const fill = this.add.rectangle(x, y + 22, 300, 14, 0x55cc66).setOrigin(0, 0);
    const num = this.add.text(x + 300, y, '', { ...FONT, fontSize: '15px' }).setOrigin(1, 0);
    return { fill, num };
  }

  itemBtn(x, y, item, w) {
    const skill = SKILLS[item.skill];
    const g = this.add.graphics();
    const zone = this.add.zone(x, y, w, 130);
    const icon = this.add.image(x, y - 28, item.icon).setScale(5);
    const name = this.add.text(x, y + 22, skill.name, { ...FONT, fontSize: '22px' }).setOrigin(0.5);
    const dmg = skill.effects.find(e => e.damage != null)?.damage;
    const dmgIcon = this.add.image(x - 14, y + 47, 'icon_dmg').setScale(2.5).setVisible(dmg != null);
    const hint = this.add.text(x - 2, y + 47, dmg != null ? String(dmg) : '', { ...FONT, fontSize: '17px', color: '#d0d0ee' }).setOrigin(0, 0.5);
    const cdText = this.add.text(x, y, '', { ...FONT, fontSize: '56px', fontStyle: 'bold' }).setOrigin(0.5);
    const b = { item, skillId: item.skill, zone, g, x, y, w, h: 130, parts: [icon, name, dmgIcon, hint], cdText };
    this.onLongPress(zone, () => this.showItemCard(item), () => {
      if (this.busy || this.p.cd[b.skillId]) return;
      this.playerTurn(b.skillId);
    });
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
    const cd = this.p.cd[b.skillId] || 0;
    b.g.clear();
    this.pixelPanel(b.g, b.x, b.y, b.w, b.h, cd ? 0x1e1e2a : 0x33334d, cd ? 0x444455 : 0x8888cc);
    b.parts.forEach(p => p.setAlpha(cd ? 0.25 : 1));
    b.cdText.setText(cd ? String(cd) : '');
  }

  // ---------- detail cards ----------
  // Card layout: header (icon + name + type), then stat rows (icon · label · value), then lore.
  // Keeps text short and puts numbers in a right-aligned column so they're easy to scan.
  openCard() {
    this.card.removeAll(true);
    this.cardBg = this.add.graphics();
    this.card.add([this.add.rectangle(180, 320, 360, 640, 0x000000, 0.65), this.cardBg]).setVisible(true);
    return 150; // card top
  }

  // Draw the panel once the content height is known.
  finishCard(bottom) {
    const top = 150, h = bottom - top + 14;
    this.pixelPanel(this.cardBg, 180, top + h / 2, 300, h, 0x1c1c30, 0xccccee);
  }

  cardHeader(top, iconKey, iconScale, title, type) {
    this.card.add([
      this.add.image(76, top + 48, iconKey).setScale(iconScale),
      this.add.text(124, top + 36, title, { ...FONT, fontSize: '24px', fontStyle: 'bold' }).setOrigin(0, 0.5),
      this.add.text(124, top + 64, type, { ...FONT, fontSize: '13px', color: '#9999bb' }).setOrigin(0, 0.5),
      this.add.rectangle(180, top + 96, 260, 2, 0x55557a),
    ]);
    return top + 112;
  }

  // One row: [icon] label ........ value
  cardRow(y, icon, label, value, valueColor = '#ffffff') {
    this.card.add([
      this.add.image(62, y + 11, icon).setScale(2.5),
      this.add.text(80, y + 11, label, { ...FONT, fontSize: '16px', color: '#ccccee' }).setOrigin(0, 0.5),
      this.add.text(306, y + 11, value, { ...FONT, fontSize: '18px', fontStyle: 'bold', color: valueColor }).setOrigin(1, 0.5),
    ]);
    return y + 32;
  }

  cardLore(y, lore) {
    if (!lore) return y;
    this.card.add(this.add.rectangle(180, y + 4, 260, 2, 0x55557a));
    const t = this.add.text(180, y + 16, lore, { ...FONT, fontSize: '13px', color: '#8f8fb0', align: 'center', wordWrap: { width: 250 } }).setOrigin(0.5, 0);
    this.card.add(t);
    return y + 24 + t.height;
  }

  skillRows(y, skill) {
    for (const e of skill.effects) if (e.damage != null) y = this.cardRow(y, 'icon_dmg', 'ความเสียหาย', String(e.damage), '#ffdd55');
    return this.cardRow(y, 'icon_clock', 'คูลดาวน์', skill.cooldown ? `${skill.cooldown} ตา` : 'ไม่มี');
  }

  hideCard() { this.card.setVisible(false); this.card.removeAll(true); }

  showItemCard(item) {
    const skill = SKILLS[item.skill];
    let y = this.cardHeader(this.openCard(), item.icon, 5, item.name, `ของขลัง · สกิล "${skill.name}"`);
    y = this.skillRows(y, skill);
    this.finishCard(this.cardLore(y + 6, item.lore));
  }

  showMonsterCard() {
    const m = this.m;
    let y = this.cardHeader(this.openCard(), m.sprite, 3.5, m.name, 'ผี');
    y = this.cardRow(y, 'icon_heart', 'HP', `${Math.max(0, m.hp)}/${m.maxHp}`, '#ff8899');
    for (const id of m.skills) {
      const s = SKILLS[id];
      this.card.add(this.add.text(60, y + 14, s.name, { ...FONT, fontSize: '17px', fontStyle: 'bold' }).setOrigin(0, 0.5));
      y = this.skillRows(y + 30, s);
    }
    this.finishCard(this.cardLore(y + 6, m.lore));
  }

  // ---------- feedback ----------
  popup(x, y, text, color = '#fff', size = 34) {
    const t = this.add.text(x, y, text, { ...FONT, fontSize: `${size}px`, fontStyle: 'bold', color, stroke: '#000', strokeThickness: 5 }).setOrigin(0.5);
    this.tweens.add({ targets: t, y: y - 50, alpha: 0, duration: 1000, ease: 'Cubic.out', onComplete: () => t.destroy() });
  }

  setBar(b, c) {
    const ratio = Math.max(0, c.hp) / c.maxHp;
    this.tweens.add({ targets: b.fill, width: 300 * ratio, duration: 250 });
    b.fill.setFillStyle(ratio > 0.5 ? 0x55cc66 : ratio > 0.25 ? 0xddbb33 : 0xdd4444);
    b.num.setText(`${Math.max(0, c.hp)}/${c.maxHp}`);
  }

  refresh() {
    this.setBar(this.mBar, this.m);
    this.setBar(this.pBar, this.p);
    this.btns.forEach(b => this.drawBtn(b));
  }

  // ---------- skills (shared by both sides) ----------
  applySkill(user, target, skillId) {
    const skill = SKILLS[skillId];
    if (skill.cooldown) user.cd[skillId] = skill.cooldown + 1; // +1: ticks down at end of this round
    for (const e of skill.effects) {
      if (e.damage != null) target.hp -= e.damage;
    }
    return skill;
  }

  tickCooldowns(c) { for (const k in c.cd) if (c.cd[k] > 0) c.cd[k]--; }

  pickMonsterSkill() {
    const ready = this.m.skills.filter(id => !this.m.cd[id]);
    return Phaser.Math.RND.pick(ready.length ? ready : this.m.skills);
  }

  // ---------- turns ----------
  playerTurn(skillId) {
    this.busy = true;
    this.animSlash(() => {
      const skill = this.applySkill(this.p, this.m, skillId);
      const dmg = skill.effects.reduce((s, e) => s + (e.damage || 0), 0);
      if (dmg) this.popup(MX, MY - 20, `-${dmg}`, '#ffdd55');
      this.setBar(this.mBar, this.m);
      this.time.delayedCall(700, () => (this.m.hp <= 0 ? this.end(true) : this.monsterTurn()));
    });
  }

  monsterTurn() {
    const skillId = this.pickMonsterSkill();
    this.animMonsterAttack(() => {
      const skill = this.applySkill(this.m, this.p, skillId);
      const dmg = skill.effects.reduce((s, e) => s + (e.damage || 0), 0);
      if (dmg) {
        this.popup(280, 582, `-${dmg}`, '#ff5566', 34);
        this.cameras.main.shake(150, 0.008);
      }
      this.tickCooldowns(this.p);
      this.tickCooldowns(this.m);
      this.refresh();
      if (this.p.hp <= 0) return this.time.delayedCall(900, () => this.end(false));
      this.busy = false;
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
  animMonsterAttack(onHit) {
    let hit = false; // onYoyo fires once per tweened property — only apply the hit once
    this.tweens.add({
      targets: this.mSprite, scale: 11 * 1.6, y: MY + 60, duration: 160, ease: 'Cubic.in', yoyo: true,
      onStart: () => play('laugh'),
      onYoyo: () => {
        if (hit) return;
        hit = true;
        play('scratch');
        this.fxClaw.setAlpha(1).setScale(6);
        this.tweens.add({ targets: this.fxClaw, alpha: 0, duration: 500, delay: 150 });
        this.tweens.add({ targets: this.hand, y: HY + 40, duration: 80, yoyo: true });
        play('hurt');
        onHit();
      },
    });
  }

  end(won) {
    this.busy = true;
    this.hideCard();
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
    this.btns.forEach(b => { b.zone.disableInteractive(); b.g.setVisible(false); b.parts.forEach(p => p.setVisible(false)); b.cdText.setVisible(false); });
    if (this.hint) this.hint.setVisible(false);
    this.pixelPanel(this.add.graphics(), 180, BTN_Y, 240, 90, won ? 0x2d5a3a : 0x5a2d3a, 0xffffff);
    this.add.image(110, BTN_Y, 'icon_retry').setScale(4);
    this.add.text(135, BTN_Y, 'สู้อีกครั้ง', { ...FONT, fontSize: '24px' }).setOrigin(0, 0.5);
    const r = this.add.zone(180, BTN_Y, 240, 90).setInteractive({ useHandCursor: true });
    r.on('pointerdown', () => { play('click'); this.scene.restart(); });
  }
}
