import Phaser from 'phaser';
import { ALLIES, ENEMIES, STAGES } from '../data/units.js';
import { SKILLS, skillDamage } from '../data/skills.js';
import { registerSprites } from '../art/sprites.js';
import { ZOOM, setupCamera, FONT_FAMILY, TEXT_METRICS } from '../display.js';
import { play, isMuted, toggleMute } from '../audio/sfx.js';
import { afterVictory, currentTeam } from '../flow.js';

// How each unit travels to its target: dash (default), hop, float.
const MOTION = { kongkoi: 'hop', krasue: 'float' };

const FONT = { fontFamily: FONT_FAMILY, color: '#fff', resolution: ZOOM, ...TEXT_METRICS };
const ENEMY_Y = 140;   // enemy sprite centre
const ALLY_Y = 345;    // retainer sprite centre
const BTN_Y = 505;     // skill buttons
const PANEL_BOTTOM = 436;

// x positions for 1–3 units in a row
const slots = n => (n === 1 ? [180] : n === 2 ? [105, 255] : [65, 180, 295]);

function storageGet(k) { try { return localStorage.getItem(k); } catch { return null; } }
function storageSet(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }

export class BattleScene extends Phaser.Scene {
  constructor() { super('Battle'); }

  create(data) {
    registerSprites(this);
    setupCamera(this);
    this.stage = data?.stage ?? 0;
    const stage = STAGES[this.stage];
    this.busy = true;
    this.ended = false;
    this.active = null;

    this.add.image(180, 0, stage.bg || 'bg_night').setOrigin(0.5, 0).setScale(4);
    this.add.rectangle(180, 540, 360, 200, 0x0b0b1a);
    this.reticle = this.add.graphics().setDepth(4);
    this.tweens.add({ targets: this.reticle, alpha: 0.35, yoyo: true, repeat: -1, duration: 500, ease: 'Sine.inOut' });

    // ----- units -----
    const ex = slots(stage.enemies.length);
    const eScale = stage.enemies.length === 1 ? 10 : stage.enemies.length === 2 ? 7 : 5;
    this.enemies = stage.enemies.map((id, i) => {
      const def = ENEMIES[id];
      return this.makeUnit('enemy', id, def, def.name, ex[i], ENEMY_Y, eScale);
    });
    const team = currentTeam(this);
    const ax = slots(team.length);
    this.time.addEvent({ delay: 420, loop: true, callback: () => {
      for (const u of [...this.allies, ...this.enemies]) if (u.alive && (u.pose === 'idle' || u.pose === 'idle2')) this.pose(u, u.pose === 'idle' ? 'idle2' : 'idle');
    } });
    this.allies = team.map((id, i) => this.makeUnit('ally', id, ALLIES[id], ALLIES[id].name, ax[i], ALLY_Y, 5));

    const muteKey = () => (isMuted() ? 'icon_sound_off' : 'icon_sound_on');
    const mute = this.add.image(342, 18, muteKey()).setScale(3).setInteractive({ useHandCursor: true });
    mute.on('pointerdown', () => { toggleMute(); mute.setTexture(muteKey()); });

    this.turnText = this.add.text(180, 606, '', { ...FONT, fontSize: '14px', color: '#ccccee', align: 'center' }).setOrigin(0.5);
    this.btns = [];
    this.card = this.add.container(0, 0).setDepth(10).setVisible(false);
    this.input.on('pointerdown', (_p, over) => { if (!over.length) this.hideCard(); });

    this.refresh();
    this.intro(!!data?.retry);
  }

  // ---------- units ----------
  // Swap to a drawn animation frame: idle | idle2 | wind | atk (falls back to the base sprite).
  pose(u, name) {
    u.pose = name;
    const key = name === 'idle' ? u.def.sprite : `${u.def.sprite}_${name}`;
    u.sprite.setTexture(this.textures.exists(key) ? key : u.def.sprite);
  }

  // Screen shake in whole-pixel jumps.
  pixelShake(duration, amp) {
    const cam = this.cameras.main, n = Math.max(2, Math.round(duration / 40));
    this.time.addEvent({ delay: 40, repeat: n - 1, callback: () => {
      cam.setScroll(Phaser.Math.RND.pick([-amp, 0, amp]), Phaser.Math.RND.pick([-amp, 0, amp]));
    } });
    this.time.delayedCall(n * 40 + 10, () => cam.setScroll(0, 0));
  }

  // Pixel-art feel: units move in whole art pixels, never sub-pixel.
  update() {
    for (const u of [...(this.allies || []), ...(this.enemies || [])]) {
      const sp = u.sprite, st = u.scale / 2;
      sp.x = u.x + Math.round((sp.x - u.x) / st) * st;
      sp.y = u.y + Math.round((sp.y - u.y) / st) * st;
      u.glow.y = u.y + Math.round((u.glow.y - u.y) / st) * st;
    }
  }

  makeUnit(side, id, def, name, x, y, scale) {
    const u = {
      side, id, def, name, x, y, scale,
      hp: def.hp, maxHp: def.hp, skills: def.skills, cd: {}, block: false, pending: null, takenMult: 1, alive: true,
    };
    u.glow = this.add.image(x, y, 'px_disc').setScale(scale).setTint(side === 'enemy' ? 0xff3060 : 0xffd860).setAlpha(side === 'enemy' ? 0.12 : 0);
    u.sprite = this.add.image(x, y, def.sprite).setScale(scale);
    u.pose = 'idle';
    this.tweens.add({ targets: [u.sprite, u.glow], y: y - (side === 'enemy' ? 7 : 3), yoyo: true, repeat: -1, duration: side === 'enemy' ? 900 : 700, ease: 'Sine.inOut', delay: x * 3 });

    // HP bar under the sprite (no name label: the art identifies the unit)
    const by = y + scale * 8 + 10, bw = side === 'enemy' && scale >= 10 ? 220 : 92;
    this.add.rectangle(x, by + 7, bw + 4, 10, 0x000000);
    this.add.rectangle(x - bw / 2, by + 7, bw, 6, 0x333344).setOrigin(0, 0.5);
    u.bar = this.add.rectangle(x - bw / 2, by + 7, bw, 6, 0x55cc66).setOrigin(0, 0.5);
    u.barW = bw;
    u.hpText = this.add.text(x, by + 14, '', { ...FONT, fontSize: '11px', color: '#ccccee' }).setOrigin(0.5, 0);

    // enemies show their skills (cooldowns visible) under the bar
    if (side === 'enemy') {
      u.tiles = u.skills.map((sid, i) => {
        const tx = x + (i - (u.skills.length - 1) / 2) * 30, ty = by + 50;
        const g = this.add.graphics();
        const icon = this.add.image(tx, ty, SKILLS[sid].icon).setScale(2.5);
        const cdText = this.add.text(tx, ty, '', { ...FONT, fontSize: '15px', fontStyle: 'bold', stroke: '#000', strokeThickness: 3 }).setOrigin(0.5);
        this.add.zone(tx, ty, 30, 30).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.showSkillInfo(SKILLS[sid], `ฤทธิ์ของ${def.name}`));
        return { sid, g, icon, cdText, x: tx, y: ty };
      });
    }
    u.marker = this.add.image(x, y - scale * 8 - 14, 'icon_target').setScale(3).setVisible(false).setDepth(6);
    u.shieldIcon = this.add.image(x + scale * 6, y - scale * 6, 'icon_shield').setScale(3).setVisible(false).setDepth(6);

    // tap the unit = use the selected skill on it
    this.add.zone(x, y, Math.max(80, scale * 16), Math.max(90, scale * 16)).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.useSelectedOn(u));
    return u;
  }

  alive(list) { return list.filter(u => u.alive); }

  // ---------- turn flow ----------
  // A round: every living retainer acts (player chooses), then every living enemy acts.
  startRound() {
    this.queue = this.alive(this.allies);
    this.nextAllyTurn();
  }

  nextAllyTurn() {
    if (this.checkEnd()) return;
    this.active = this.queue.shift();
    while (this.active && !this.active.alive) this.active = this.queue.shift();
    if (!this.active) return this.enemyPhase();
    const ready = this.active.skills.filter(id => !this.active.cd[id]);
    this.selected = ready[0] ?? this.active.skills[0];
    this.buildButtons();
    this.busy = false;
    this.refresh();
  }

  enemyPhase() {
    this.active = null;
    this.buildButtons();
    this.busy = true;
    this.refresh();
    const order = this.alive(this.enemies);
    const step = () => {
      if (this.checkEnd()) return;
      const e = order.shift();
      if (!e) return this.endRound();
      if (!e.alive) return step();
      this.enemyAct(e, () => this.time.delayedCall(350, step));
    };
    this.time.delayedCall(400, step);
  }

  endRound() {
    for (const u of [...this.allies, ...this.enemies]) {
      u.block = false;
      u.shieldIcon.setVisible(false);
      for (const k in u.cd) if (u.cd[k] > 0) u.cd[k]--;
    }
    this.refresh();
    this.startRound();
  }

  checkEnd() {
    if (this.ended) return true;
    if (!this.alive(this.enemies).length) { this.ended = true; this.time.delayedCall(500, () => this.end(true)); return true; }
    if (!this.alive(this.allies).length) { this.ended = true; this.time.delayedCall(700, () => this.end(false)); return true; }
    return false;
  }

  // ---------- player input ----------
  select(skillId) {
    this.selected = skillId;
    this.buildButtons();
    this.refresh();
    this.showSkillInfo(SKILLS[skillId], `ฤทธิ์ของ${this.active.name}`, SKILLS[skillId].target === 'ally' ? 'top' : 'bottom');
  }

  useSelectedOn(target) {
    if (this.busy || !this.active || !target.alive || this.active.cd[this.selected]) return;
    const wantAlly = SKILLS[this.selected].target === 'ally';
    if ((target.side === 'ally') !== wantAlly) return;
    this.hideCard();
    if (!storageGet('seenTapTarget')) storageSet('seenTapTarget', '1');
    this.busy = true;
    this.drawReticle(false);
    this.perform(this.active, target, this.selected, 0, () => this.time.delayedCall(250, () => this.nextAllyTurn()));
  }

  // ---------- skills (shared by every unit) ----------
  // Runs a skill's effects from `from`. A `wait` effect pauses the skill; the rest runs on the
  // user's next turn (user.pending). Cooldown starts when the skill finishes.
  applySkill(user, target, skillId, from = 0) {
    const skill = SKILLS[skillId];
    let dealt = 0, blocked = false, mult = 1;
    for (let i = from; i < skill.effects.length; i++) {
      const e = skill.effects[i];
      if (e.wait) {
        user.pending = { skillId, next: i + 1, target };
        user.takenMult = e.takenMult || 1;
        return { skill, waiting: true };
      }
      if (e.damage != null) {
        if (target.block) blocked = true;
        else { mult = target.takenMult; const d = e.damage * mult; target.hp -= d; dealt += d; }
      }
      if (e.block) { target.block = true; target.shieldIcon.setVisible(true); }
    }
    if (skill.cooldown) user.cd[skillId] = skill.cooldown + 1; // +1: ticks down at end of this round
    return { skill, dealt, blocked, mult, waiting: false };
  }

  // Animate + apply + feedback, then call done().
  perform(user, target, skillId, from, done) {
    const skill = SKILLS[skillId];
    if (skill.effects[from]?.wait) {
      return this.animWindup(user, target, () => {
        this.applySkill(user, target, skillId, from);
        this.refresh();
        done();
      });
    }
    const kind = skill.anim || (user.side === 'ally' ? 'slash' : 'claw');
    this.animAttack(user, target, kind, () => {
      const r = this.applySkill(user, target, skillId, from);
      if (r.blocked) { this.popup(target.x, target.y - 30, 'กันไว้!', '#ffe066', 22); play('block'); }
      else if (r.dealt) {
        const heavy = r.dealt >= 12;
        this.popup(target.x, target.y - 20, `-${r.dealt}`, target.side === 'ally' ? '#ff5566' : r.mult > 1 ? '#ff7733' : '#ffdd55', heavy ? 34 : 26);
        if (r.mult > 1) this.popup(target.x, target.y + 20, 'โดนจุดอ่อน!', '#ff9944', 16);
        if (target.side === 'ally') this.pixelShake(heavy ? 300 : 120, heavy ? 8 : 4);
        target.sprite.setTintFill(0xffffff);
        this.time.delayedCall(90, () => target.alive && target.sprite.clearTint());
      }
      if (target.hp <= 0 && target.alive) this.knockOut(target);
      this.refresh();
      this.time.delayedCall(300, done);
    });
  }

  knockOut(u) {
    u.alive = false;
    u.hp = 0;
    u.pending = null;
    this.pose(u, 'idle');
    u.marker.setVisible(false);
    u.shieldIcon.setVisible(false);
    if (u.side === 'enemy') {
      for (let i = 0; i < 24; i++) {
        const px = this.add.rectangle(u.x + Phaser.Math.Between(-40, 40), u.y + Phaser.Math.Between(-50, 50), 6, 6, Phaser.Math.RND.pick([0x5d4d6e, 0xffffff, 0xd01030]));
        this.tweens.add({ targets: px, y: px.y - Phaser.Math.Between(40, 120), alpha: 0, duration: Phaser.Math.Between(400, 900), ease: 'Stepped', easeParams: [4], onComplete: () => px.destroy() });
      }
      this.tweens.add({ targets: [u.sprite, u.glow], alpha: 0, duration: 400, ease: 'Stepped', easeParams: [3] });
      (u.tiles || []).forEach(t => { t.icon.setVisible(false); t.cdText.setVisible(false); t.g.clear(); });
    } else {
      u.sprite.setTint(0x444455);
      u.sprite.setTexture(`${u.def.sprite}_ko`);
      this.tweens.add({ targets: u.sprite, alpha: 0.45, duration: 300, ease: 'Stepped', easeParams: [2] });
    }
  }

  // Enemies use their strongest ready skill. Skills with useChance only start on a lucky roll.
  pickEnemySkill(e) {
    const ready = e.skills.filter(id => !e.cd[id] && Math.random() < (SKILLS[id].useChance ?? 1));
    const pool = ready.length ? ready : e.skills.filter(id => !e.cd[id] && SKILLS[id].useChance == null);
    return (pool.length ? pool : e.skills).reduce((a, b) => (skillDamage(SKILLS[b]) > skillDamage(SKILLS[a]) ? b : a));
  }

  enemyAct(e, done) {
    const targets = this.alive(this.allies);
    if (e.pending) {
      let { skillId, next, target } = e.pending;
      e.pending = null;
      e.takenMult = 1;
      target.marker.setVisible(false);
      if (!target.alive) target = Phaser.Math.RND.pick(targets);
      return this.perform(e, target, skillId, next, done);
    }
    this.perform(e, Phaser.Math.RND.pick(targets), this.pickEnemySkill(e), 0, done);
  }

  // ---------- UI ----------
  buildButtons() {
    this.btns.forEach(b => b.parts.forEach(p => p.destroy()));
    this.btns = [];
    const u = this.active;
    if (!u) { this.turnText.setText(''); return; }
    const n = u.skills.length, w = n === 1 ? 220 : 160;
    u.skills.forEach((id, i) => {
      const x = 180 + (i - (n - 1) / 2) * 172, y = BTN_Y, s = SKILLS[id];
      const cd = u.cd[id] || 0, sel = this.selected === id && !cd;
      const g = this.add.graphics();
      this.pixelPanel(g, x, y, w, 120, cd ? 0x1e1e2a : sel ? 0x3d3d5e : 0x33334d, cd ? 0x444455 : sel ? 0xffdd55 : 0x8888cc);
      const icon = this.add.image(x, y - 14, s.icon).setScale(6);
      const name = this.add.text(x, y + 36, s.name, { ...FONT, fontSize: '20px' }).setOrigin(0.5);
      const cdText = this.add.text(x, y, cd ? String(cd) : '', { ...FONT, fontSize: '52px', fontStyle: 'bold' }).setOrigin(0.5);
      const parts = [g, icon, name, cdText];
      if (cd) [icon, name].forEach(p => p.setAlpha(0.25));
      const zone = this.add.zone(x, y, w, 120).setInteractive({ useHandCursor: true });
      zone.on('pointerdown', () => { if (this.busy) return; if (cd) this.showSkillInfo(s, `ฤทธิ์ของ${u.name}`); else this.select(id); });
      parts.push(zone);
      this.btns.push({ id, parts });
    });
    const s = SKILLS[this.selected];
    // only a first-time hint; the gold glow shows whose turn it is
    this.turnText.setText(storageGet('seenTapTarget') ? '' : (s.target === 'ally' ? 'แตะบริวารเพื่อใช้' : 'แตะศัตรูเพื่อใช้'));
  }

  // Panel with notched (pixel-style) corners.
  pixelPanel(g, x, y, w, h, fill, border, u = 4) {
    const l = x - w / 2, t = y - h / 2;
    g.fillStyle(0x000000).fillRect(l + u, t, w - 2 * u, h).fillRect(l, t + u, w, h - 2 * u);
    g.fillStyle(border).fillRect(l + 2 * u, t + u, w - 4 * u, h - 2 * u).fillRect(l + u, t + 2 * u, w - 2 * u, h - 4 * u);
    g.fillStyle(fill).fillRect(l + 2 * u, t + 2 * u, w - 4 * u, h - 4 * u);
    g.fillStyle(0xffffff, 0.12).fillRect(l + 2 * u, t + 2 * u, w - 4 * u, u);
  }

  setBar(u) {
    const ratio = Math.max(0, u.hp) / u.maxHp;
    this.tweens.add({ targets: u.bar, width: Math.round(u.barW * ratio / 4) * 4, duration: 250, ease: 'Stepped', easeParams: [3] });
    u.bar.setFillStyle(ratio > 0.5 ? 0x55cc66 : ratio > 0.25 ? 0xddbb33 : 0xdd4444);
    u.hpText.setText(`ขวัญ ${Math.max(0, u.hp)}/${u.maxHp}`);
  }

  refresh() {
    for (const u of [...this.allies, ...this.enemies]) {
      this.setBar(u);
      if (u.side === 'enemy' && u.alive) {
        u.glow.setTint(u.pending ? 0xff1030 : 0xff3060).setAlpha(u.pending ? 0.45 : 0.12);
        // winding up: the body itself burns red
        if (u.pending) u.sprite.setTint(0xff7788); else u.sprite.clearTint();
        u.tiles.forEach(t => {
          const cd = u.cd[t.sid] || 0, winding = u.pending?.skillId === t.sid;
          t.g.clear();
          this.pixelPanel(t.g, t.x, t.y, 28, 28, winding ? 0x5a1020 : 0x2a1a2e, winding ? 0xff3355 : 0xaa6677, 3);
          t.icon.setAlpha(cd ? 0.3 : 1);
          t.cdText.setText(cd ? String(cd) : '');
        });
      }
      // active retainer glows gold
      if (u.side === 'ally') u.glow.setTint(0xffd860).setAlpha(u === this.active ? 0.3 : 0);
    }
    this.drawReticle(!this.busy && !!this.active);
  }

  // Corner brackets around every valid target of the selected skill.
  drawReticle(show) {
    const g = this.reticle.clear();
    if (!show) return;
    const list = SKILLS[this.selected].target === 'ally' ? this.allies : this.enemies;
    g.fillStyle(0xffdd55);
    for (const u of this.alive(list)) {
      const h = Math.max(36, u.scale * 9), k = 12;
      const l = u.x - h, r = u.x + h, t = u.y - h, b = u.y + h;
      [[l, t, 1, 1], [r, t, -1, 1], [l, b, 1, -1], [r, b, -1, -1]].forEach(([x, y, sx, sy]) => {
        g.fillRect(Math.min(x, x + sx * k), y - (sy < 0 ? 3 : 0), k, 3);
        g.fillRect(x - (sx < 0 ? 3 : 0), Math.min(y, y + sy * k), 3, k);
      });
    }
  }

  // ---------- info panel ----------
  openCard() {
    this.card.removeAll(true);
    this.cardBg = this.add.graphics();
    this.card.add(this.cardBg).setVisible(true);
    return 0;
  }

  // where: 'bottom' = just above the buttons, 'top' = over the enemy row
  finishCard(bottom, where = 'bottom') {
    const h = bottom + 10;
    this.pixelPanel(this.cardBg, 180, h / 2, 300, h, 0x1c1c30, 0xccccee);
    this.card.y = where === 'top' ? 40 : PANEL_BOTTOM - h;
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
      if (e.block) y = this.cardRow(y, 'icon_shield', 'กันการโจมตีให้เป้า', 'ตานี้', '#ffe066');
    }
    return this.cardRow(y, 'icon_clock', 'พักวิชา', skill.cooldown ? `${skill.cooldown} ตา` : 'มิต้องพัก');
  }

  showSkillInfo(skill, type, where = 'bottom') {
    const y = this.cardHeader(this.openCard(), skill.icon, 4, skill.name, type);
    this.finishCard(this.skillRows(y, skill), where);
  }

  hideCard() { this.card.setVisible(false); this.card.removeAll(true); }

  popup(x, y, text, color = '#fff', size = 26) {
    const t = this.add.text(x, y, text, { ...FONT, fontSize: `${size}px`, fontStyle: 'bold', color, stroke: '#000', strokeThickness: 5 }).setOrigin(0.5).setDepth(8);
    this.tweens.add({ targets: t, y: y - 40, alpha: 0, duration: 1000, ease: 'Stepped', easeParams: [5], onComplete: () => t.destroy() });
  }

  // ---------- animations ----------
  // Enemy wind-up: shudders, glows red, marks its target.
  animWindup(user, target, onDone) {
    play('growl');
    this.tweens.add({ targets: user.sprite, x: user.x + 4, duration: 40, yoyo: true, repeat: 7, onComplete: () => user.sprite.setX(user.x) });
    this.pose(user, 'wind');
    target.marker.setVisible(true);
    this.tweens.add({ targets: target.marker, scale: 4, yoyo: true, repeat: 3, duration: 150, ease: 'Stepped', easeParams: [1] });
    this.time.delayedCall(400, onDone);
  }

  // User lunges toward the target, then an impact effect plays at the target.
  animAttack(user, target, kind, onHit) {
    if (kind === 'shield') {
      play('ward');
      const glow = this.add.image(target.x, target.y, 'px_disc').setScale(6).setTint(0xffd860).setAlpha(0.5).setDepth(3);
      this.tweens.add({ targets: glow, scale: 9, alpha: 0, duration: 500, ease: 'Stepped', easeParams: [3], onComplete: () => glow.destroy() });
      return this.time.delayedCall(200, onHit);
    }
    if (kind === 'spit') return this.animSpit(user, target, onHit);
    if (kind === 'ram') return this.animRam(user, target, onHit);
    const sp = user.sprite, enemy = user.side === 'enemy';
    const dx = (target.x - user.x) * 0.55, dy = (target.y - user.y) * 0.55;
    const len = Math.hypot(dx, dy) || 1;
    const back = { x: user.x - dx / len * 14, y: user.y - dy / len * 14 };
    const sx = user.scale;
    // 1) anticipation: pull back and squash
    this.tweens.add({
      targets: sp, x: back.x, y: back.y, duration: 180, ease: 'Sine.out', onStart: () => this.pose(user, 'wind'),
      onComplete: () => {
        play(enemy ? 'laugh' : 'slash');
        // 2) dash: stretched along the move, leaving after-images
        const trail = this.time.addEvent({ delay: 25, repeat: 4, callback: () => {
          const ghost = this.add.image(sp.x, sp.y, sp.texture.key).setScale(sx).setAlpha(0.35).setTint(enemy ? 0xff6080 : 0xffe08a).setDepth(sp.depth - 0.1);
          this.tweens.add({ targets: ghost, alpha: 0, duration: 200, ease: 'Stepped', easeParams: [2], onComplete: () => ghost.destroy() });
        } });
        const style = MOTION[user.id] || 'dash';
        const to = { x: user.x + dx, y: user.y + dy };
        let move;
        if (style === 'hop') {
          // ผีกองกอย: one big arcing leap, landing claws-first
          const p = { t: 0 };
          move = { targets: p, t: 1, duration: 260, ease: 'Sine.inOut',
            onUpdate: () => { sp.setPosition(user.x + dx * p.t, user.y + dy * p.t - Math.sin(p.t * Math.PI) * 70) } };
        } else if (style === 'float') {
          // กระสือ: glides in on a wavering S-curve, then snaps forward
          const p = { t: 0 };
          move = { targets: p, t: 1, duration: 420, ease: 'Quad.in',
            onUpdate: () => sp.setPosition(user.x + dx * p.t + Math.sin(p.t * Math.PI * 2) * 30, user.y + dy * p.t) };
        } else {
          move = { targets: sp, x: to.x, y: to.y, duration: 110, ease: 'Cubic.in' };
        }
        this.pose(user, 'atk');
        this.tweens.add({
          ...move,
          onComplete: () => {
            trail.remove();
            // 3) impact: effect, flash, knockback, then a brief freeze (hit-stop)
            const k = { x: target.x + dx / len * 16, y: target.y + dy / len * 16 };
            if (kind === 'frenzy') {
              this.fxFrenzy(target, onHit);
            } else {
              if (kind === 'bite') this.fxBite(target);
              else if (kind === 'claw') this.fxClaw(target);
              else this.fxSlash(target);
              if (target.side === 'ally') play('hurt');
              this.tweens.add({ targets: target.sprite, x: k.x, y: k.y, duration: 70, yoyo: true, ease: 'Quad.out', onComplete: () => target.sprite.setPosition(target.x, target.y) });
              onHit();
            }
            // 4) recovery: hold for a beat, then hop home and settle
            this.time.delayedCall(kind === 'frenzy' ? 380 : 90, () => this.tweens.add({
              targets: sp, x: user.x, y: user.y, duration: 260, ease: 'Back.out', onComplete: () => this.pose(user, 'idle'),
            }));
          },
        });
      },
    });
  }

  fxSlash(t) {
    play('hit');
    const fx = this.add.image(t.x, t.y, 'fx_slash').setScale(3).setDepth(5);
    this.tweens.add({ targets: fx, scale: 5, alpha: 0, duration: 260, ease: 'Stepped', easeParams: [2], onComplete: () => fx.destroy() });
    this.tweens.add({ targets: t.sprite, x: t.x + 8, duration: 60, yoyo: true });
  }

  fxClaw(t) {
    play('scratch');
    const fx = this.add.image(t.x, t.y, 'fx_claw').setScale(3).setDepth(5);
    this.tweens.add({ targets: fx, alpha: 0, duration: 450, delay: 120, ease: 'Stepped', easeParams: [3], onComplete: () => fx.destroy() });
  }

  // Three quick rakes from alternating angles; damage lands on the last one.
  fxFrenzy(t, onHit) {
    [false, true, false].forEach((flip, i) => this.time.delayedCall(i * 140, () => {
      play('scratch');
      const fx = this.add.image(t.x + (i - 1) * 10, t.y, 'fx_claw').setScale(i === 2 ? 4 : 3).setFlipX(flip).setDepth(5);
      this.tweens.add({ targets: fx, alpha: 0, duration: 350, delay: 80, ease: 'Stepped', easeParams: [2], onComplete: () => fx.destroy() });
      this.tweens.add({ targets: t.sprite, x: t.x + (i % 2 ? -6 : 6), duration: 50, yoyo: true });
      if (i === 2) { if (t.side === 'ally') play('hurt'); onHit(); }
    }));
  }

  // Full-body charge: crouch, dash all the way in, big thud, target knocked back, bounce home.
  animRam(user, target, onHit) {
    const s = user.sprite;
    this.tweens.add({
      targets: s, y: user.y + 6, duration: 140, ease: 'Sine.out', onStart: () => this.pose(user, 'wind'),
      onComplete: () => {
        play('rush');
        // dust trail
        for (let i = 0; i < 4; i++) this.time.delayedCall(i * 35, () => {
          const d = this.add.image(s.x, s.y + 30, 'px_disc').setScale(1).setTint(0x8a8070).setAlpha(0.6).setDepth(2);
          this.tweens.add({ targets: d, scale: 2, alpha: 0, duration: 400, ease: 'Stepped', easeParams: [2], onComplete: () => d.destroy() });
        });
        this.tweens.add({
          targets: s, x: target.x, y: target.y + 40, duration: 170, ease: 'Cubic.in', onStart: () => this.pose(user, 'atk'),
          onComplete: () => {
            play('thud');
            this.pixelShake(160, 6);
            const ring = this.add.image(target.x, target.y + 20, 'px_ring').setScale(3).setTint(0xffe9a0).setDepth(5);
            this.tweens.add({ targets: ring, scale: 7, alpha: 0, duration: 300, ease: 'Stepped', easeParams: [4], onComplete: () => ring.destroy() });
            this.tweens.add({ targets: target.sprite, y: target.y - 18, duration: 90, yoyo: true });
            onHit();
            this.tweens.add({ targets: s, x: user.x, y: user.y, duration: 260, ease: 'Back.out', onComplete: () => this.pose(user, 'idle') });
          },
        });
      },
    });
  }

  fxBite(t) {
    play('chomp');
    const top = this.add.image(t.x, t.y - 60, 'fx_jaw_top').setScale(5).setDepth(5);
    const bot = this.add.image(t.x, t.y + 60, 'fx_jaw_bottom').setScale(5).setDepth(5);
    this.tweens.add({ targets: top, y: t.y - 14, duration: 90, ease: 'Cubic.in' });
    this.tweens.add({
      targets: bot, y: t.y + 14, duration: 90, ease: 'Cubic.in',
      onComplete: () => this.tweens.add({ targets: [top, bot], alpha: 0, duration: 300, delay: 120, ease: 'Stepped', easeParams: [2], onComplete: () => { top.destroy(); bot.destroy(); } }),
    });
  }

  // Rear back, then hurl glowing guts at the target; splats drip off.
  animSpit(user, target, onHit) {
    this.tweens.add({
      targets: user.sprite, y: user.y - 15, duration: 220, ease: 'Sine.out', onStart: () => this.pose(user, 'wind'),
      onComplete: () => {
        play('splash');
        this.pose(user, 'atk');
        this.tweens.add({ targets: user.sprite, y: user.y + 20, duration: 120, yoyo: true, onComplete: () => { user.sprite.setY(user.y); this.time.delayedCall(250, () => user.alive && this.pose(user, 'idle')); } });
        for (let i = 0; i < 12; i++) {
          const gut = this.add.image(user.x, user.y + 30, 'fx_gut').setScale(3).setDepth(5);
          this.tweens.add({
            targets: gut, x: target.x + Phaser.Math.Between(-40, 40), y: target.y + Phaser.Math.Between(-40, 40), scale: Phaser.Math.Between(4, 7),
            duration: 260, delay: i * 12, ease: 'Stepped', easeParams: [5], onComplete: () => gut.destroy(),
          });
        }
        this.time.delayedCall(280, () => {
          play('hurt');
          onHit();
          for (let i = 0; i < 4; i++) {
            const sp = this.add.image(target.x + Phaser.Math.Between(-45, 45), target.y + Phaser.Math.Between(-45, 30), 'fx_splat')
              .setScale(Phaser.Math.Between(4, 6)).setDepth(5).setAlpha(0.9);
            this.tweens.add({ targets: sp, y: sp.y + 30, alpha: 0, duration: 1200, delay: 200, ease: 'Stepped', easeParams: [5], onComplete: () => sp.destroy() });
          }
        });
      },
    });
  }

  // ---------- entrance ----------
  // Darkness, enemies emerge, their names appear, then the round starts. Tap to skip.
  intro(short) {
    const veil = this.add.rectangle(180, 320, 360, 640, 0x000000, 1).setDepth(20);
    let done = false;
    const raised = this.enemies.flatMap(e => [e.sprite, e.glow]);
    const finish = () => {
      if (done) return;
      done = true;
      this.time.removeAllEvents();
      this.tweens.killTweensOf([veil, this.banner, this.bannerSub].filter(Boolean));
      raised.forEach(o => o.setDepth(0).setAlpha(1));
            this.banner?.destroy(); this.bannerSub?.destroy();
      this.banner = this.bannerSub = null;
      this.tweens.add({ targets: veil, alpha: 0, duration: 350, ease: 'Stepped', easeParams: [3], onComplete: () => veil.destroy() });
      this.startRound();
    };
    if (short) return this.time.delayedCall(10, finish);

    raised.forEach(o => o.setDepth(21).setAlpha(0));
    this.enemies.forEach(e => {
      this.tweens.add({ targets: [e.sprite, e.glow], alpha: 1, duration: 900, ease: 'Stepped', easeParams: [4] });
    });
    this.time.delayedCall(350, () => play('laugh'));
    this.time.delayedCall(700, () => {
      const counts = {};
      this.enemies.forEach(e => { counts[e.def.name] = (counts[e.def.name] || 0) + 1; });
      const title = Object.entries(counts).map(([n, c]) => (c > 1 ? `${n} ×${c}` : n)).join(' · ');
      this.banner = this.add.text(180, 300, `— ${title} —`, { ...FONT, fontSize: '28px', fontStyle: 'bold', color: '#ff5577', stroke: '#000', strokeThickness: 6 }).setOrigin(0.5).setDepth(22).setAlpha(0);
      this.bannerSub = this.add.text(180, 335, this.enemies[0].def.lore || '', { ...FONT, fontSize: '14px', color: '#ccccee', align: 'center', wordWrap: { width: 300 } }).setOrigin(0.5, 0).setDepth(22).setAlpha(0);
      this.tweens.add({ targets: [this.banner, this.bannerSub], alpha: 1, duration: 400, ease: 'Stepped', easeParams: [3] });
      play('growl');
    });
    this.time.delayedCall(2600, finish);
    this.input.once('pointerdown', finish);
  }

  // ---------- end ----------
  end(won) {
    this.busy = true;
    this.active = null;
    this.hideCard();
    this.drawReticle(false);
    this.btns.forEach(b => b.parts.forEach(p => p.destroy()));
    this.btns = [];
    this.turnText.setText('');
    if (won) play('win');
    else {
      play('lose');
      const red = this.add.rectangle(180, 320, 360, 640, 0x660011, 0).setDepth(7);
      this.tweens.add({ targets: red, fillAlpha: 0.5, duration: 900 });
    }
    this.add.image(180, 230, won ? 'icon_star' : 'icon_danger').setScale(7).setDepth(9);
    this.add.text(180, 290, won ? 'ศัตรูสิ้นฤทธิ์!' : 'บริวารหมดสิ้น…', { ...FONT, fontSize: '36px', fontStyle: 'bold', stroke: '#000', strokeThickness: 6 }).setOrigin(0.5).setDepth(9);
    const label = won ? 'เดินทางต่อ' : 'ตั้งจิตใหม่';
    const next = won ? () => afterVictory(this, this.stage) : () => this.scene.restart({ stage: this.stage, retry: true });
    this.pixelPanel(this.add.graphics().setDepth(9), 180, BTN_Y, 240, 90, won ? 0x2d5a3a : 0x5a2d3a, 0xffffff);
    this.add.image(100, BTN_Y, 'icon_retry').setScale(4).setDepth(9);
    this.add.text(125, BTN_Y, label, { ...FONT, fontSize: '24px' }).setOrigin(0, 0.5).setDepth(9);
    this.add.zone(180, BTN_Y, 240, 90).setInteractive({ useHandCursor: true }).setDepth(9)
      .on('pointerdown', () => { play('click'); next(); });
  }
}
