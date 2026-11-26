import Phaser from 'phaser';
import { MONSTERS, STAGES } from '../data/monsters.js';
import { ITEMS, STARTING_ITEMS } from '../data/items.js';
import { SKILLS, skillDamage } from '../data/skills.js';
import { registerSprites } from '../art/sprites.js';
import { ZOOM, setupCamera, FONT_FAMILY, TEXT_METRICS } from '../display.js';
import { play, isMuted, toggleMute } from '../audio/sfx.js';
import { afterVictory } from '../flow.js';

const FONT = { fontFamily: FONT_FAMILY, color: '#fff', resolution: ZOOM, ...TEXT_METRICS };
const MX = 180, MY = 200; // monster position
const HX = 300, HY = 436; // first-person hand (bottom of battle area)
const BTN_Y = 505;
const PANEL_BOTTOM = 436; // info panel sits just above the skill buttons

function storageGet(k) { try { return localStorage.getItem(k); } catch { return null; } }
function storageSet(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }

export class BattleScene extends Phaser.Scene {
  constructor() { super('Battle'); }

  create(data) {
    registerSprites(this);
    setupCamera(this);
    // Progress lives in the registry: which stage we're on and which items we own.
    this.stage = data?.stage ?? 0;
    if (!this.registry.get('items')) this.registry.set('items', [...STARTING_ITEMS]);
    const def = MONSTERS[STAGES[this.stage].monster];
    // Both sides share the same shape: hp, skills, cooldowns, block.
    // pending: a wound-up skill waiting to finish; takenMult: damage multiplier while winding up.
    this.m = { ...def, maxHp: def.hp, cd: {}, block: false, pending: null, takenMult: 1 };
    this.p = { name: 'ศิษย์หมอผี', hp: 30, maxHp: 30, cd: {}, block: false, pending: null, takenMult: 1 };
    this.busy = false;

    this.add.image(180, 0, 'bg_night').setOrigin(0.5, 0).setScale(4);
    this.glow = this.add.circle(MX, MY, 95, 0xff3060, 0.12);
    this.mSprite = this.add.image(MX, MY, def.sprite).setScale(11);
    this.tweens.add({ targets: [this.mSprite, this.glow], y: '-=8', yoyo: true, repeat: -1, duration: 900, ease: 'Sine.inOut' });
    // Tap the ghost = use the selected skill on it.
    this.add.zone(MX, MY, 190, 200).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.useSelectedOn(this.m));
    this.reticle = this.add.graphics();
    this.tweens.add({ targets: this.reticle, alpha: 0.35, yoyo: true, repeat: -1, duration: 500 });

    this.mBar = this.bar(30, 20, def.name);
    // Ghost's skills as small tiles under its HP bar (tap to read).
    this.mSkillTiles = this.m.skills.map((id, i) => this.monsterSkillTile(48 + i * 46, 84, id));
    this.pBar = this.bar(30, 592, this.p.name);

    // First-person view: our hand holding the knife.
    this.hand = this.add.image(HX, HY, 'hand_knife').setOrigin(0.5, 1).setScale(7);
    this.tweens.add({ targets: this.hand, y: HY + 6, yoyo: true, repeat: -1, duration: 1100, ease: 'Sine.inOut' });
    // Left hand that pops up when using a self skill (e.g. takrut). Hidden below the screen.
    this.offHand = this.add.image(70, HY + 140, 'hand_takrut').setOrigin(0.5, 1).setScale(7).setVisible(false);
    this.wardGlow = this.add.rectangle(180, 220, 360, 440, 0xffd860, 0);
    // Tap our own side (hand area / our HP bar) = use a self skill.
    const self = () => this.useSelectedOn(this.p);
    this.add.zone(180, 400, 360, 70).setInteractive({ useHandCursor: true }).on('pointerdown', self);
    this.add.zone(180, 605, 330, 44).setInteractive({ useHandCursor: true }).on('pointerdown', self);
    this.fxSlash = this.add.image(MX, MY, 'fx_slash').setScale(7).setAlpha(0);
    this.fxClaw = this.add.image(170, 330, 'fx_claw').setScale(6).setAlpha(0);

    const muteKey = () => (isMuted() ? 'icon_sound_off' : 'icon_sound_on');
    const mute = this.add.image(338, 78, muteKey()).setScale(3.5).setInteractive({ useHandCursor: true });
    mute.on('pointerdown', () => { toggleMute(); mute.setTexture(muteKey()); });

    const items = this.registry.get('items').map(id => ITEMS[id]);
    const n = items.length, w = n === 1 ? 220 : 155;
    this.btns = items.map((item, i) => this.itemBtn(180 + (i - (n - 1) / 2) * 170, BTN_Y, item, w));

    // First-time hint, hidden forever after the first attack.
    this.hint = storageGet('seenTapGhost') ? null
      : this.add.text(MX, 312, '', { ...FONT, fontSize: '16px', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);

    this.card = this.add.container(0, 0).setDepth(10).setVisible(false);
    // Tapping empty space closes the info panel.
    this.input.on('pointerdown', (_p, over) => { if (!over.length) this.hideCard(); });

    this.selected = items[0].skill; // basic skill pre-selected
    this.updateHint();
    this.refresh();
  }

  // ---------- input ----------
  // Generic wording: the target may not always be a ghost.
  updateHint() {
    if (!this.hint) return;
    const s = SKILLS[this.selected];
    this.hint.setText(s.target === 'self' ? `แตะตัวเองเพื่อใช้วิชา "${s.name}"` : `แตะเป้าเพื่อใช้วิชา "${s.name}"`);
  }

  select(skillId) {
    this.selected = skillId;
    this.updateHint();
    this.btns.forEach(b => this.drawBtn(b));
    this.drawReticle(true);
    const b = this.btns.find(x => x.skillId === skillId);
    this.showItemInfo(b.item);
  }

  useSelectedOn(target) {
    if (this.busy || !this.selected || this.p.cd[this.selected]) return;
    const wantSelf = SKILLS[this.selected].target === 'self';
    if ((target === this.p) !== wantSelf) return;
    this.hideCard();
    if (this.hint) { this.hint.destroy(); this.hint = null; storageSet('seenTapGhost', '1'); }
    this.playerTurn(this.selected);
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
    const hint = dmg != null
      ? this.add.text(x - 2, y + 47, String(dmg), { ...FONT, fontSize: '17px', color: '#d0d0ee' }).setOrigin(0, 0.5)
      : this.add.text(x, y + 47, 'กันทั้งหมด', { ...FONT, fontSize: '15px', color: '#d0d0ee' }).setOrigin(0.5);
    const cdText = this.add.text(x, y, '', { ...FONT, fontSize: '56px', fontStyle: 'bold' }).setOrigin(0.5);
    const b = { item, skillId: item.skill, zone, g, x, y, w, h: 130, parts: [icon, name, dmgIcon, hint], cdText };
    zone.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
      if (this.busy || this.p.cd[b.skillId]) { this.showItemInfo(item); return; }
      this.select(b.skillId);
    });
    return b;
  }

  monsterSkillTile(x, y, id) {
    const s = SKILLS[id];
    const g = this.add.graphics();
    this.drawTile(g, x, y, false);
    const icon = this.add.image(x, y, s.icon).setScale(3);
    const cdText = this.add.text(x, y, '', { ...FONT, fontSize: '20px', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
    this.add.zone(x, y, 42, 42).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.showSkillInfo(s, 'ฤทธิ์ผี'));
    return { id, g, x, y, icon, cdText };
  }

  drawTile(g, x, y, windingUp) {
    g.clear();
    this.pixelPanel(g, x, y, 38, 38, windingUp ? 0x5a1020 : 0x2a1a2e, windingUp ? 0xff3355 : 0xaa6677, 3);
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
    const sel = this.selected === b.skillId && !cd;
    this.pixelPanel(b.g, b.x, b.y, b.w, b.h, cd ? 0x1e1e2a : sel ? 0x3d3d5e : 0x33334d, cd ? 0x444455 : sel ? 0xffdd55 : 0x8888cc);
    b.parts.forEach(p => p.setAlpha(cd ? 0.25 : 1));
    b.cdText.setText(cd ? String(cd) : '');
  }

  // ---------- detail cards ----------
  // Card layout: header (icon + name + type), then stat rows (icon · label · value), then lore.
  // Keeps text short and puts numbers in a right-aligned column so they're easy to scan.
  // The info panel is built from y=0 down, then the whole container is moved so its
  // bottom sits just above the skill buttons (it never covers the buttons).
  openCard() {
    this.card.removeAll(true);
    this.cardBg = this.add.graphics();
    this.card.add(this.cardBg).setVisible(true);
    return 0;
  }

  finishCard(bottom) {
    const h = bottom + 10;
    this.pixelPanel(this.cardBg, 180, h / 2, 300, h, 0x1c1c30, 0xccccee);
    this.card.y = PANEL_BOTTOM - h;
  }

  cardHeader(top, iconKey, iconScale, title, type) {
    this.card.add([
      this.add.image(70, top + 34, iconKey).setScale(iconScale),
      this.add.text(108, top + 24, title, { ...FONT, fontSize: '21px', fontStyle: 'bold' }).setOrigin(0, 0.5),
      this.add.text(108, top + 47, type, { ...FONT, fontSize: '13px', color: '#9999bb' }).setOrigin(0, 0.5),
      this.add.rectangle(180, top + 66, 260, 2, 0x55557a),
    ]);
    return top + 74;
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

  skillRows(y, skill) {
    for (const e of skill.effects) {
      if (e.wait) y = this.cardRow(y, 'icon_clock', 'ตั้งท่าก่อน', `${e.wait} ตา`, '#ff8899');
      if (e.takenMult > 1) y = this.cardRow(y, 'icon_danger', 'ระหว่างตั้งท่าโดนตี', `x${e.takenMult}`, '#ff8899');
      if (e.damage != null) y = this.cardRow(y, 'icon_dmg', 'อานุภาพ', String(e.damage), '#ffdd55');
      if (e.block) y = this.cardRow(y, 'icon_shield', 'กันการโจมตี', 'ตานี้', '#ffe066');
    }
    return this.cardRow(y, 'icon_clock', 'พักวิชา', skill.cooldown ? `${skill.cooldown} ตา` : 'มิต้องพัก');
  }

  hideCard() { this.card.setVisible(false); this.card.removeAll(true); }

  showItemInfo(item) {
    const skill = SKILLS[item.skill];
    let y = this.cardHeader(this.openCard(), item.icon, 4, skill.name, `วิชาจาก${item.name}`);
    this.finishCard(this.skillRows(y, skill));
  }

  showSkillInfo(skill, type) {
    let y = this.cardHeader(this.openCard(), skill.icon, 4, skill.name, type);
    this.finishCard(this.skillRows(y, skill));
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
    b.num.setText(`ขวัญ ${Math.max(0, c.hp)}/${c.maxHp}`);
  }

  refresh() {
    this.setBar(this.mBar, this.m);
    this.setBar(this.pBar, this.p);
    this.btns.forEach(b => this.drawBtn(b));
    this.mSkillTiles.forEach(t => {
      const cd = this.m.cd[t.id] || 0;
      const windingUp = this.m.pending?.skillId === t.id;
      this.drawTile(t.g, t.x, t.y, windingUp);
      this.tweens.killTweensOf(t.g);
      t.g.setAlpha(1);
      if (windingUp) this.tweens.add({ targets: t.g, alpha: 0.4, yoyo: true, repeat: -1, duration: 250 });
      t.icon.setAlpha(cd ? 0.3 : 1);
      t.cdText.setText(cd ? String(cd) : '');
    });
    // ghost glows hot red while winding up
    this.glow.setFillStyle(this.m.pending ? 0xff1030 : 0xff3060, this.m.pending ? 0.45 : 0.12);
    this.drawReticle(!this.busy);
  }

  // Corner brackets around what the selected skill targets: the ghost, or our own side.
  drawReticle(show) {
    const g = this.reticle.clear();
    if (!show) return;
    const self = SKILLS[this.selected]?.target === 'self';
    const [l, r, t, b] = self ? [12, 348, 368, 630] : [MX - 85, MX + 85, MY - 95, MY + 95];
    const k = 22;
    g.fillStyle(0xffdd55);
    [[l, t, 1, 1], [r, t, -1, 1], [l, b, 1, -1], [r, b, -1, -1]].forEach(([x, y, sx, sy]) => {
      g.fillRect(Math.min(x, x + sx * k), y - (sy < 0 ? 4 : 0), k, 4);
      g.fillRect(x - (sx < 0 ? 4 : 0), Math.min(y, y + sy * k), 4, k);
    });
  }

  // ---------- skills (shared by both sides) ----------
  // Run a skill's effects from `from`. A `wait` effect pauses the skill: the rest runs on the
  // user's next turn (see user.pending). Cooldown starts when the skill finishes.
  applySkill(user, target, skillId, from = 0) {
    const skill = SKILLS[skillId];
    let dealt = 0, blocked = false, mult = 1;
    for (let i = from; i < skill.effects.length; i++) {
      const e = skill.effects[i];
      if (e.wait) {
        user.pending = { skillId, next: i + 1 };
        user.takenMult = e.takenMult || 1;
        return { skill, dealt, blocked, waiting: true };
      }
      if (e.damage != null) {
        if (target.block) blocked = true;
        else { mult = target.takenMult; const d = e.damage * mult; target.hp -= d; dealt += d; }
      }
      if (e.block) user.block = true;
    }
    if (skill.cooldown) user.cd[skillId] = skill.cooldown + 1; // +1: ticks down at end of this round
    return { skill, dealt, blocked, mult, waiting: false };
  }

  tickCooldowns(c) { for (const k in c.cd) if (c.cd[k] > 0) c.cd[k]--; }

  // Ghosts use their strongest ready skill. Skills with useChance only fire on a lucky roll,
  // so the player can't predict exactly when a big move starts.
  pickMonsterSkill() {
    const ready = this.m.skills.filter(id => !this.m.cd[id] && Math.random() < (SKILLS[id].useChance ?? 1));
    const pool = ready.length ? ready : this.m.skills.filter(id => !this.m.cd[id] && SKILLS[id].useChance == null);
    return (pool.length ? pool : this.m.skills).reduce((a, b) => (skillDamage(SKILLS[b]) > skillDamage(SKILLS[a]) ? b : a));
  }

  // ---------- turns ----------
  playerTurn(skillId) {
    this.busy = true;
    this.drawReticle(false);
    const self = SKILLS[skillId].target === 'self';
    const anim = self ? (cb) => this.animWard(cb) : (cb) => this.animSlash(cb);
    anim(() => {
      const { dealt, mult } = this.applySkill(this.p, self ? this.p : this.m, skillId);
      if (dealt) this.popup(MX, MY - 20, `-${dealt}`, mult > 1 ? '#ff7733' : '#ffdd55', mult > 1 ? 46 : 34);
      if (mult > 1) this.popup(MX, MY + 40, 'โดนจุดอ่อน!', '#ff9944', 24);
      this.setBar(this.mBar, this.m);
      this.btns.forEach(b => this.drawBtn(b));
      this.time.delayedCall(700, () => (this.m.hp <= 0 ? this.end(true) : this.monsterTurn()));
    });
  }

  monsterTurn() {
    // Finish a wound-up skill, or pick a new one.
    let skillId, from = 0;
    if (this.m.pending) {
      ({ skillId, next: from } = this.m.pending);
      this.m.pending = null;
      this.m.takenMult = 1;
    } else {
      skillId = this.pickMonsterSkill();
    }
    const skill = SKILLS[skillId];
    if (skill.effects[from]?.wait) return this.animWindup(() => {
      this.applySkill(this.m, this.p, skillId, from);
      this.popup(MX, MY + 70, `ตั้งท่า${skill.name}!`, '#ff5577', 28);
      this.endRound();
    });
    const heavy = skillDamage(skill) >= 10;
    this.animMonsterAttack(skill.anim || 'claw', heavy, () => {
      const { dealt, blocked } = this.applySkill(this.m, this.p, skillId, from);
      this.popup(MX, MY + 70, skill.name, heavy ? '#ff5577' : '#ffffff', heavy ? 30 : 22);
      if (blocked) {
        this.popup(180, 380, 'ตะกรุดกันไว้!', '#ffe066', 30);
        play('block');
      } else if (dealt) {
        this.popup(280, 582, `-${dealt}`, '#ff5566', heavy ? 46 : 34);
        this.cameras.main.shake(heavy ? 350 : 150, heavy ? 0.025 : 0.008);
        if (heavy) this.cameras.main.flash(200, 255, 40, 80);
      }
      this.endRound();
    });
  }

  endRound() {
    {
      // end of round: blocks expire, cooldowns tick
      this.p.block = false; this.m.block = false;
      this.hideWard();
      this.tickCooldowns(this.p);
      this.tickCooldowns(this.m);
      if (this.p.cd[this.selected]) this.selected = this.btns[0].skillId; // back to the basic skill
      this.busy = this.p.hp <= 0;
      this.refresh();
      if (this.p.hp <= 0) return this.time.delayedCall(900, () => this.end(false));
      this.busy = false;
    }
  }

  // Ghost shudders and growls: a big move is coming next turn.
  animWindup(onDone) {
    play('growl');
    this.tweens.add({ targets: this.mSprite, x: MX + 5, duration: 40, yoyo: true, repeat: 7, onComplete: () => this.mSprite.setX(MX) });
    this.tweens.add({ targets: this.mSprite, scale: 11 * 1.12, duration: 300, yoyo: true });
    this.time.delayedCall(350, onDone);
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
  // Left hand raises the takrut; golden light fills the screen until the round ends.
  animWard(onDone) {
    play('ward');
    this.offHand.setVisible(true);
    this.tweens.add({ targets: this.offHand, y: HY + 10, duration: 180, ease: 'Back.out' });
    this.tweens.add({ targets: this.wardGlow, fillAlpha: 0.18, duration: 200 });
    this.time.delayedCall(250, onDone);
  }

  hideWard() {
    this.tweens.add({ targets: this.offHand, y: HY + 140, duration: 250, ease: 'Sine.in', onComplete: () => this.offHand.setVisible(false) });
    this.tweens.add({ targets: this.wardGlow, fillAlpha: 0, duration: 250 });
  }

  // Ghost attack: a lunge, then an impact effect chosen by the skill's `anim`.
  animMonsterAttack(kind, heavy, onHit) {
    const impact = () => {
      this.tweens.add({ targets: this.hand, y: HY + 40, duration: 80, yoyo: true });
      play('hurt');
      onHit();
    };
    if (kind === 'spit') return this.animSpit(impact);
    let hit = false; // onYoyo fires once per tweened property — only apply the hit once
    this.tweens.add({
      targets: this.mSprite, scale: 11 * 1.6, y: MY + 60, duration: 160, ease: 'Cubic.in', yoyo: true,
      onStart: () => play('laugh'),
      onYoyo: () => {
        if (hit) return;
        hit = true;
        if (kind === 'bite') this.fxBite(); else this.fxClawMarks(heavy);
        impact();
      },
    });
  }

  fxClawMarks(heavy) {
    play('scratch');
    this.fxClaw.setAlpha(1).setScale(heavy ? 8 : 6);
    this.tweens.add({ targets: this.fxClaw, alpha: 0, duration: 500, delay: 150 });
  }

  // Two rows of teeth snap shut across the screen.
  fxBite() {
    play('chomp');
    const top = this.add.image(180, 150, 'fx_jaw_top').setScale(15).setDepth(5);
    const bot = this.add.image(180, 470, 'fx_jaw_bottom').setScale(15).setDepth(5);
    this.tweens.add({ targets: top, y: 255, duration: 90, ease: 'Cubic.in' });
    this.tweens.add({
      targets: bot, y: 345, duration: 90, ease: 'Cubic.in',
      onComplete: () => {
        this.cameras.main.shake(120, 0.012);
        this.tweens.add({ targets: [top, bot], alpha: 0, duration: 350, delay: 120, onComplete: () => { top.destroy(); bot.destroy(); } });
      },
    });
  }

  // Krasue rears back, then hurls a stream of glowing guts that splatter on the "camera".
  animSpit(impact) {
    this.tweens.add({
      targets: this.mSprite, scale: 11 * 0.85, y: MY - 20, duration: 220, ease: 'Sine.out',
      onComplete: () => {
        play('splash');
        this.tweens.add({ targets: this.mSprite, scale: 11 * 1.3, y: MY + 30, duration: 120, yoyo: true });
        for (let i = 0; i < 14; i++) {
          const gut = this.add.image(MX, MY + 40, 'fx_gut').setScale(4).setDepth(5);
          this.tweens.add({
            targets: gut, x: Phaser.Math.Between(20, 340), y: Phaser.Math.Between(180, 460), scale: Phaser.Math.Between(8, 14),
            duration: 260, delay: i * 12, ease: 'Quad.in', onComplete: () => gut.destroy(),
          });
        }
        this.time.delayedCall(280, () => {
          impact();
          // splats stick to the screen and slowly drip down
          for (let i = 0; i < 6; i++) {
            const sp = this.add.image(Phaser.Math.Between(40, 320), Phaser.Math.Between(150, 430), 'fx_splat')
              .setScale(Phaser.Math.Between(7, 11)).setAngle(Phaser.Math.Between(-20, 20)).setDepth(5).setAlpha(0.9);
            this.tweens.add({ targets: sp, y: sp.y + 50, alpha: 0, duration: 1400, delay: 300, ease: 'Sine.in', onComplete: () => sp.destroy() });
          }
        });
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
    this.add.text(180, 310, won ? 'ผีสิ้นฤทธิ์!' : 'ขวัญกระเจิง...', { ...FONT, fontSize: '40px', fontStyle: 'bold', stroke: '#000', strokeThickness: 6 }).setOrigin(0.5);
    this.btns.forEach(b => { b.zone.disableInteractive(); b.g.setVisible(false); b.parts.forEach(p => p.setVisible(false)); b.cdText.setVisible(false); });
    if (this.hint) this.hint.setVisible(false);
    this.drawReticle(false);
    this.mSkillTiles.forEach(t => { t.g.setVisible(false); t.icon.setVisible(false); t.cdText.setVisible(false); });
    // Win → continue the journey (story pages). Lose → retry this ghost.
    const label = won ? 'เดินทางต่อ' : 'ตั้งจิตใหม่';
    const next = won ? () => afterVictory(this, this.stage) : () => this.scene.restart({ stage: this.stage });
    this.pixelPanel(this.add.graphics(), 180, BTN_Y, 240, 90, won ? 0x2d5a3a : 0x5a2d3a, 0xffffff);
    this.add.image(100, BTN_Y, 'icon_retry').setScale(4);
    this.add.text(125, BTN_Y, label, { ...FONT, fontSize: '24px' }).setOrigin(0, 0.5);
    const r = this.add.zone(180, BTN_Y, 240, 90).setInteractive({ useHandCursor: true });
    r.on('pointerdown', () => { play('click'); next(); });
  }
}
