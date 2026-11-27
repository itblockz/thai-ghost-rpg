import Phaser from 'phaser';
import { ALLIES, ENEMIES, STAGES } from '../data/units.js';
import { SKILLS, skillDamage, skillFacts, amount } from '../data/skills.js';
import { registerSprites, pixelDisc, pixelRing } from '../art/sprites.js';
import { ZOOM, setupCamera, FONT_FAMILY, TEXT_METRICS, IDLE_MS, PX, pixelBob, numFont } from '../display.js';
import { play, isMuted, toggleMute } from '../audio/sfx.js';
import { afterVictory, fightingTeam } from '../flow.js';
import { charmTitle, charmEffect } from '../ui/charmUi.js';
import { rollCharm, applyWorn, RARITIES, CHARM_TYPES } from '../data/charms.js';
import { saveFrom } from '../save.js';

// How each unit travels to its target: dash (default), hop, float.
const MOTION = { kongkoi: 'hop', krasue: 'float' };

const FONT = { fontFamily: FONT_FAMILY, color: '#fff', resolution: ZOOM, ...TEXT_METRICS };
const ENEMY_Y = 140;   // enemy sprite centre
const ALLY_Y = 345;    // retainer sprite centre
const BTN_Y = 505;     // skill buttons
const BTN_H = 96;      // sized to a 32pt skill icon plus its name
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
    this.first = !!data?.first;
    const stage = STAGES[this.stage];
    this.busy = true;
    this.camHome = undefined;
    this.ended = false;
    this.active = null;

    this.add.image(180, 0, stage.bg || 'bg_night').setOrigin(0.5, 0).setScale(PX);
    // the backdrop runs the full screen; a dark veil keeps the button area readable
    this.add.rectangle(180, 540, 360, 200, 0x0b0b1a, 0.72);
    this.reticle = this.add.graphics().setDepth(4);
    this.tweens.add({ targets: this.reticle, alpha: 0.35, yoyo: true, repeat: -1, duration: 500, ease: 'Sine.inOut' });

    // ----- units -----
    const ex = slots(stage.enemies.length);
    const eScale = stage.enemies.length === 1 ? 10 : stage.enemies.length === 2 ? 7 : 5;
    this.enemies = stage.enemies.map((id, i) => {
      const def = ENEMIES[id];
      return this.makeUnit('enemy', id, def, def.name, ex[i], ENEMY_Y, eScale);
    });
    const team = fightingTeam(this);
    const ax = slots(team.length);
    this.time.addEvent({ delay: IDLE_MS, loop: true, callback: () => {
      // one shared beat, so every standing unit breathes in sync
      this.idlePhase = !this.idlePhase;
      for (const u of [...this.allies, ...this.enemies]) if (u.alive && (u.pose === 'idle' || u.pose === 'idle2')) this.pose(u, 'idle');
    } });
    this.allies = team.map((id, i) => this.makeUnit('ally', id, ALLIES[id], ALLIES[id].name, ax[i], ALLY_Y, 5));
    // worn charms
    const bag = this.registry.get('bag') || [], gear = this.registry.get('gear') || {};
    this.allies.forEach(u => applyWorn(u, bag, gear, u.id));
    // ประคำ: warded from the very start, renewed on the wearer's first turns
    this.allies.forEach(u => { if (u.openBlock > 0) { u.block = true; u.blockBy = u; u.shieldIcon.setVisible(true); } });
    this.initTimeline();
    this.drawOrder();

    const muteKey = () => (isMuted() ? 'icon_sound_off' : 'icon_sound_on');
    const mute = this.add.image(334, 26, muteKey()).setScale(PX).setInteractive({ useHandCursor: true });
    mute.on('pointerdown', () => { toggleMute(); mute.setTexture(muteKey()); });

    // battle speed ×1 / ×2 (remembered): animations and pauses run faster, nothing else changes
    const speedOf = () => { try { return localStorage.getItem('himmapan-speed') === '2' ? 2 : 1; } catch { return 1; } };
    const applySpeed = v => { this.time.timeScale = v; this.tweens.timeScale = v; };
    applySpeed(speedOf());
    const spd = this.add.text(302, 26, `×${speedOf()}`, numFont(16, '#ffe08a')).setOrigin(0.5).setPadding(8, 6, 8, 6).setDepth(10)
      .setInteractive({ useHandCursor: true }).on('pointerdown', () => {
        const v = speedOf() === 2 ? 1 : 2;
        try { localStorage.setItem('himmapan-speed', String(v)); } catch { /* ignore */ }
        applySpeed(v); spd.setText(`×${v}`); play('click');
      });

    // retreat to the prep screen (tap twice, so a stray tap doesn't throw the fight away)
    let sure = false;
    const flee = this.add.text(14, 26, '‹ ถอย', { ...FONT, fontSize: '15px', color: '#ccccee', stroke: '#000', strokeThickness: 4 }).setOrigin(0, 0.5).setPadding(6, 6, 6, 6).setDepth(10)
      .setInteractive({ useHandCursor: true }).on('pointerdown', () => {
        if (this.ended) return;
        play('click');
        if (!sure) { sure = true; flee.setText('‹ ถอย?').setColor('#ff7790'); this.time.delayedCall(2500, () => { sure = false; flee.setText('‹ ถอย').setColor('#ccccee'); }); return; }
        this.ended = true;
        this.scene.start('Prep', { stage: this.stage, first: this.first, retry: true });
      });

    this.turnText = this.add.text(180, 606, '', { ...FONT, fontSize: '13px', color: '#ccccee', align: 'center', wordWrap: { width: 340 } }).setOrigin(0.5);
    this.btns = [];
    this.card = this.add.container(0, 0).setDepth(10).setVisible(false);
    this.input.on('pointerdown', (_p, over) => { if (!over.length) this.hideCard(); });

    this.refresh();
    this.intro(!!data?.retry);
  }

  // ---------- units ----------
  // Swap to a drawn animation frame: idle | idle2 | wind | atk (falls back to the base sprite).
  pose(u, name) {
    // 'idle' always lands on the shared beat's frame
    if (name === 'idle' && this.idlePhase) name = 'idle2';
    u.pose = name;
    const key = name === 'idle' ? u.def.sprite : `${u.def.sprite}_${name}`;
    u.sprite.setTexture(this.textures.exists(key) ? key : u.def.sprite);
  }

  // Screen shake in whole-pixel jumps.
  pixelShake(duration, amp) {
    // the camera is zoomed and centred, so its resting scroll is not 0,0 — shake around that
    const cam = this.cameras.main, n = Math.max(2, Math.round(duration / 40));
    if (this.camHome === undefined) this.camHome = { x: cam.scrollX, y: cam.scrollY };
    const home = this.camHome;
    this.time.addEvent({ delay: 40, repeat: n - 1, callback: () => {
      cam.setScroll(home.x + Phaser.Math.RND.pick([-amp, 0, amp]), home.y + Phaser.Math.RND.pick([-amp, 0, amp]));
    } });
    this.time.delayedCall(n * 40 + 10, () => cam.setScroll(home.x, home.y));
  }

  // Pixel-art feel: units move in whole art pixels, never sub-pixel.
  update() {
    for (const u of [...(this.allies || []), ...(this.enemies || [])]) {
      const sp = u.sprite, st = sp.scaleX;
      sp.x = u.x + Math.round((sp.x - u.x) / st) * st;
      sp.y = u.y + Math.round((sp.y - u.y) / st) * st;
      u.glow.y = u.y + Math.round((u.glow.y - u.y) / st) * st;
    }
  }

  makeUnit(side, id, def, name, x, y, scale) {
    const u = {
      side, id, def, name, x, y, scale,
      hp: def.hp, maxHp: def.hp, atk: def.atk || 0, spd: def.spd || 10, skills: def.skills, cd: {}, block: false, pending: null, takenMult: 1, alive: true,
    };
    // every unit is drawn at the same pixel size; bigger creatures simply have bigger grids
    const grid = this.textures.get(def.sprite).getSourceImage().width;
    // a boss carries a wider, stronger aura
    u.glow = this.add.image(x, y, pixelDisc(this, grid + (def.boss ? 22 : 6))).setScale(PX).setTint(side === 'enemy' ? 0xff3060 : 0xffd860).setAlpha(side === 'enemy' ? 0.12 : 0);
    u.sprite = this.add.image(x, y, def.sprite).setScale(PX);
    u.scale = PX;
    u.half = grid * PX / 2;
    u.pose = 'idle';

    // HP bar under the sprite (no name label: the art identifies the unit)
    const by = y + u.half + 6, bw = 92;
    u.hud = [
      this.add.rectangle(x, by + 10, bw + 4, 16, 0x000000),
      this.add.rectangle(x - bw / 2, by + 7, bw, 6, 0x333344).setOrigin(0, 0.5),
      this.add.rectangle(x - bw / 2, by + 14, bw, 4, 0x1c2a3a).setOrigin(0, 0.5),
    ];
    u.bar = this.add.rectangle(x - bw / 2, by + 7, bw, 6, 0x55cc66).setOrigin(0, 0.5);
    u.barW = bw;
    // turn gauge under the life bar: fills toward this unit's next turn (faster units fill sooner)
    u.ctBar = this.add.rectangle(x - bw / 2, by + 14, 0, 4, 0x66ccff).setOrigin(0, 0.5);
    u.hpText = this.add.text(x, by + 19, '', numFont(12, '#ccccee')).setOrigin(0.5, 0);
    u.hud.push(u.bar, u.ctBar, u.hpText);

    // enemy skills are studied on the prep screen; the field shows only the fight itself
    u.tiles = [];
    u.marker = this.add.image(x, y - u.half - 10, 'icon_target').setScale(PX).setVisible(false).setDepth(6);
    u.statusIcon = this.add.image(x - u.half * 0.7, y - u.half * 0.7, 'icon_drag').setScale(PX).setVisible(false).setDepth(6);
    u.shieldIcon = this.add.image(x + u.half * 0.7, y - u.half * 0.7, 'icon_shield').setScale(PX).setVisible(false).setDepth(6);

    // tap the unit = use the selected skill on it
    this.add.zone(x, y, Math.max(80, u.half * 2), Math.max(90, u.half * 2)).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.useSelectedOn(u));
    return u;
  }

  alive(list) { return list.filter(u => u.alive); }

  // ---------- turn flow ----------
  // A timeline, not rounds: each unit's next turn comes 100/spd after its last one, so faster
  // units act sooner and more often. Ties go to the retainers, then left to right.
  stepOf(u) { return 100 / (u.spd || 10); }
  initTimeline() {
    [...this.allies, ...this.enemies].forEach(u => { u.next = this.stepOf(u); });
  }
  // the next n turns, as the order bar shows them (simulated forward, nobody changes)
  upcoming(n) {
    const units = this.alive([...this.allies, ...this.enemies]).map((u, i) => ({ u, t: u.next, i }));
    const out = [];
    while (out.length < n && units.length) {
      units.sort((a, b) => a.t - b.t || (a.u.side === b.u.side ? a.i - b.i : a.u.side === 'ally' ? -1 : 1));
      out.push(units[0].u);
      units[0].t += this.stepOf(units[0].u);
    }
    return out;
  }

  startRound() { this.advance(); } // first turn after the intro

  advance() {
    if (this.checkEnd()) return;
    const u = this.upcoming(1)[0];
    if (!u) return;
    this.now = u.next; // the timeline's clock: this unit's turn has come
    u.next += this.stepOf(u);
    this.beginTurn(u);
  }

  // start of a unit's own turn: its guard on others ends, its own ward renews, poison bites
  beginTurn(u) {
    this.turnOf = u;
    for (const t of [...this.allies, ...this.enemies]) if (t.blockBy === u) { t.block = false; t.blockBy = null; t.shieldIcon.setVisible(false); }
    if (u.openBlock > 0) { u.openBlock--; u.block = true; u.blockBy = u; u.shieldIcon.setVisible(true); }
    this.drawOrder();
    if (u.poison) {
      u.hp -= u.poison.damage;
      this.popup(u.x, u.y - 20, `-${u.poison.damage}`, '#88dd55', 22);
      play('splash');
      if (--u.poison.turns <= 0) u.poison = null;
      if (u.hp <= 0) { u.poison = null; this.knockOut(u); }
      this.refresh();
      return this.time.delayedCall(600, () => (u.alive ? this.takeTurn(u) : this.advance()));
    }
    this.takeTurn(u);
  }

  takeTurn(u) {
    if (this.checkEnd()) return;
    const done = () => this.endTurn(u);
    if (u.side === 'enemy') {
      this.active = null;
      this.buildButtons();
      this.busy = true;
      this.refresh();
      return this.time.delayedCall(350, () => this.enemyAct(u, () => this.time.delayedCall(300, done)));
    }
    this.active = u;
    if (u.stunned) return this.loseTurn(u, done);
    const ready = u.skills.filter(id => !u.cd[id]);
    this.selected = ready[0] ?? u.skills[0];
    this.buildButtons();
    this.busy = false;
    this.refresh();
  }

  // end of a unit's own turn: its cooldowns tick (not the one it just started)
  endTurn(u) {
    for (const k in u.cd) if (u.cd[k] > 0 && !u.fresh?.has(k)) u.cd[k]--;
    u.fresh?.clear();
    this.active = null;
    this.refresh();
    this.advance();
  }

  // turn gauges: how close each unit is to its next turn (the one acting now is full and bright)
  drawOrder() {
    if (!this.enemies || !this.allies || this.allies.some(u => u.next == null)) return;
    const now = this.now ?? 0;
    for (const u of [...this.allies, ...this.enemies]) {
      if (!u.ctBar) continue;
      const acting = u === this.turnOf && !this.ended;
      const f = acting ? 1 : Math.max(0, Math.min(1, 1 - (u.next - now) / this.stepOf(u)));
      const w = Math.round(u.barW * f / 4) * 4;
      this.tweens.add({ targets: u.ctBar, width: w, duration: 250, ease: 'Stepped', easeParams: [3] });
      u.ctBar.setFillStyle(acting ? 0xffffff : 0x66ccff);
    }
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
  }

  useSelectedOn(target) {
    if (this.busy || !this.active || !target.alive || this.active.cd[this.selected]) return;
    const wantAlly = SKILLS[this.selected].target === 'ally';
    if ((target.side === 'ally') !== wantAlly) return;
    this.hideCard();
    if (!storageGet('seenTapTarget')) storageSet('seenTapTarget', '1');
    this.busy = true;
    this.drawReticle(false);
    const u = this.active;
    this.perform(u, target, this.selected, 0, () => this.time.delayedCall(250, () => this.endTurn(u)));
  }

  // ---------- skills (shared by every unit) ----------
  // Runs a skill's effects from `from`. A `wait` effect pauses the skill; the rest runs on the
  // user's next turn (user.pending). Cooldown starts when the skill finishes.
  applySkill(user, target, skillId, from = 0) {
    const skill = SKILLS[skillId];
    let dealt = 0, blocked = false, mult = 1, healed = 0, missed = false;
    // a blinded unit's next attack misses entirely — for an area attack, every target (missAll)
    const blindNow = (user.blind || user.missAll) && skill.effects.slice(from).some(e => e.damage != null);
    if (blindNow) user.blind = false;
    for (let i = from; i < skill.effects.length; i++) {
      const e = skill.effects[i];
      if (e.wait) {
        user.pending = { skillId, next: i + 1, target };
        user.takenMult = e.takenMult || 1;
        return { skill, waiting: true };
      }
      if (e.damage != null) {
        if (blindNow) missed = true;
        else if (target.block) blocked = true;
        else { mult = target.takenMult; const d = amount(e, 'damage', user) * mult; target.hp -= d; dealt += d; }
      }
      if (e.block) { target.block = true; target.blockBy = user; target.shieldIcon.setVisible(true); }
      const warded = k => target.wards?.has(k);
      if ((e.stun && warded('stun')) || (e.blind && warded('blind'))) this.iconPop(target.x, target.y + 10, 'charm_yant');
      if (e.stun && !missed && !blocked && !warded('stun')) target.stunned = (target.stunned || 0) + e.stun;
      if (e.blind && !missed && !blocked && !warded('blind')) target.blind = true;
      // poison lingers: it bites at the start of each of the next rounds
      if (e.poison && !missed && !blocked) target.poison = { turns: e.poison.turns, damage: e.poison.damage };
      if (e.heal) { const h = Math.min(amount(e, 'heal', user), target.maxHp - target.hp); target.hp += h; healed += h; target.poison = null; }
    }
    // show the real rest count right away; the end-of-round tick skips skills used this round
    if (skill.cooldown) { user.cd[skillId] = skill.cooldown; (user.fresh ||= new Set()).add(skillId); }
    return { skill, dealt, blocked, mult, healed, missed, waiting: false };
  }

  // Animate + apply + feedback, then call done().
  perform(user, target, skillId, from, done) {
    const skill = SKILLS[skillId];
    if (user.side === 'enemy') this.see([skillId]); // an enemy skill, once witnessed, is known
    if (skill.area && !skill.effects[from]?.wait) return this.performArea(user, target, skillId, from, done);
    if (skill.effects[from]?.wait) {
      return this.animWindup(user, skill.area ? this.alive(target.side === 'ally' ? this.allies : this.enemies) : [target], () => {
        this.applySkill(user, target, skillId, from);
        this.refresh();
        done();
      });
    }
    const kind = skill.anim || (user.side === 'ally' ? 'slash' : 'claw');
    this.animAttack(user, target, kind, () => {
      const r = this.applySkill(user, target, skillId, from);
      this.feedback(target, r);
      if (target.hp <= 0 && target.alive) this.knockOut(target);
      this.refresh();
      this.time.delayedCall(300, done);
    });
  }

  // Hit every living unit on the target's side (e.g. นาค's venom). Each can be shielded separately.
  performArea(user, target, skillId, from, done) {
    const side = target.side === 'ally' ? this.allies : this.enemies;
    const hit = this.alive(side);
    play('splash');
    this.pose(user, 'atk');
    this.tweens.add({ targets: user.sprite, y: user.y + 16, yoyo: true, duration: 140, onComplete: () => user.sprite.setY(user.y) });
    hit.forEach(t => this.growFx(t.x, t.y, [20, 28, 36, 44], 0x66dd55, 0.7, 450, pixelDisc));
    this.time.delayedCall(300, () => {
      // one attack: if the user is blinded, it misses every target, not just the first
      if (user.blind) user.missAll = true;
      hit.forEach((t, i) => {
        const r = this.applySkill(user, t, skillId, from);
        if (i < hit.length - 1 && SKILLS[skillId].cooldown) delete user.cd[skillId];
        this.feedback(t, r);
        if (t.hp <= 0 && t.alive) this.knockOut(t);
      });
      user.missAll = false;
      if (SKILLS[skillId].cooldown) { user.cd[skillId] = SKILLS[skillId].cooldown; (user.fresh ||= new Set()).add(skillId); }
      this.time.delayedCall(250, () => user.alive && this.pose(user, 'idle'));
      this.refresh();
      this.time.delayedCall(500, done);
    });
  }

  // Popups/sounds/flash for one target's result.
  feedback(target, r) {
    if (r.missed) { this.iconPop(target.x, target.y - 20, 'icon_miss'); return; }
    if (r.healed) { this.popup(target.x, target.y - 20, `+${r.healed}`, '#66ee88', 26); play('ward'); }
    if (!r.dealt && !r.blocked) return;
    {
      if (r.blocked) { this.iconPop(target.x, target.y - 20, 'icon_shield'); play('block'); }
      else if (r.dealt) {
        const heavy = r.dealt >= 12;
        this.popup(target.x, target.y - 20, `-${r.dealt}`, target.side === 'ally' ? '#ff5566' : r.mult > 1 ? '#ff7733' : '#ffdd55', heavy ? 34 : 26);
        if (r.mult > 1) this.popup(target.x, target.y + 20, 'ถูกจุดอ่อน!', '#ff9944', 16);
        if (target.side === 'ally') this.pixelShake(heavy ? 300 : 120, heavy ? 8 : 4);
        target.sprite.setTintFill(0xffffff);
        this.time.delayedCall(90, () => target.alive && target.sprite.clearTint());
      }
    }
  }

  // Remember enemy skills the player has now seen (shown on the prep screen instead of ???).
  see(ids) {
    const seen = new Set(this.registry.get('seen') || []);
    const before = seen.size;
    ids.forEach(id => seen.add(id));
    if (seen.size !== before) this.registry.set('seen', [...seen]);
  }

  // A win yields one random charm, shown where the enemies stood, and saved right away.
  dropCharm() {
    const c = rollCharm(STAGES[this.stage]);
    this.registry.set('bag', [...(this.registry.get('bag') || []), c]);
    saveFrom(this);
    const r = RARITIES[c.rarity];
    const g = this.add.graphics().setDepth(9);
    this.pixelPanel(g, 180, 140, 300, 112, 0x1a1626, r.hex);
    const objs = [g,
      this.add.text(180, 102, 'ได้ของขลัง', { ...FONT, fontSize: '13px', color: '#bbbbdd' }).setOrigin(0.5).setDepth(9),
      this.add.image(70, 148, CHARM_TYPES[c.type].icon).setScale(PX).setDepth(9),
      ...charmTitle(this, 106, 132, c, 17).map(o => o.setDepth(9)),
      ...charmEffect(this, 106, 160, c).map(o => o.setDepth(9)),
    ];
    objs.forEach(o => o.setAlpha(0));
    this.tweens.add({ targets: objs, alpha: 1, duration: 400, delay: 500, ease: 'Stepped', easeParams: [4] });
    this.time.delayedCall(500, () => play(c.rarity === 'mythic' ? 'win' : 'ward'));
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
        this.tweens.add({ targets: px, y: px.y - Phaser.Math.Between(40, 120), alpha: 0, duration: Phaser.Math.Between(400, 900), onComplete: () => px.destroy() });
      }
      // a vanquished enemy leaves nothing behind: sprite, glow, HP and skill tiles all fade away
      this.tweens.add({ targets: [u.sprite, u.glow, ...u.hud], alpha: 0, duration: 400, ease: 'Stepped', easeParams: [4] });
      (u.tiles || []).forEach(t => { t.icon.setVisible(false); t.cdText.setVisible(false); t.g.clear(); });
    } else {
      u.sprite.setTint(0x444455);
      u.sprite.setTexture(`${u.def.sprite}_ko`);
      this.tweens.add({ targets: [u.sprite, ...u.hud], alpha: 0.45, duration: 300, ease: 'Stepped', easeParams: [3] });
      // a small spirit hovers over the fallen: out of the fight, not lost
      const soul = this.add.image(u.x, u.y - u.half + 6, 'fx_soul').setScale(PX).setAlpha(0).setDepth(6);
      this.tweens.add({ targets: soul, alpha: 0.8, duration: 600, delay: 300, ease: 'Stepped', easeParams: [3] });
      pixelBob(this, soul, PX, 2, 280);
    }
  }

  // Enemies use their strongest ready skill. Skills with useChance only start on a lucky roll.
  pickEnemySkill(e) {
    const rolled = e.skills.filter(id => !e.cd[id] && SKILLS[id].useChance != null && Math.random() < SKILLS[id].useChance);
    const pool = rolled.length ? rolled : e.skills.filter(id => !e.cd[id] && SKILLS[id].useChance == null);
    return (pool.length ? pool : e.skills).reduce((a, b) => (skillDamage(SKILLS[b]) > skillDamage(SKILLS[a]) ? b : a));
  }

  // A stunned unit (dragged under) sits out this turn.
  loseTurn(u, then) {
    u.stunned--;
    this.busy = true;
    this.buildButtons();
    this.iconPop(u.x, u.y - 20, 'icon_drag');
    this.tweens.add({ targets: u.sprite, y: u.y + 9, yoyo: true, duration: 260, ease: 'Stepped', easeParams: [3] });
    this.refresh();
    this.time.delayedCall(700, then);
  }

  enemyAct(e, done) {
    if (e.stunned) return this.loseTurn(e, done);
    const targets = this.alive(this.allies);
    if (e.pending) {
      let { skillId, next, target } = e.pending;
      e.pending = null;
      e.takenMult = 1;
      this.allies.forEach(a => a.marker.setVisible(false));
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
    const n = u.skills.length, w = n === 1 ? 220 : n === 2 ? 160 : 106, gap = n === 3 ? 114 : 172;
    u.skills.forEach((id, i) => {
      const x = 180 + (i - (n - 1) / 2) * gap, y = BTN_Y, s = SKILLS[id];
      const cd = u.cd[id] || 0, sel = this.selected === id && !cd;
      const g = this.add.graphics();
      this.pixelPanel(g, x, y, w, BTN_H, cd ? 0x1e1e2a : sel ? 0x3d3d5e : 0x33334d, cd ? 0x444455 : sel ? 0xffdd55 : 0x8888cc);
      const icon = this.add.image(x, y - 12, s.icon).setScale(PX);
      const name = this.add.text(x, y + 26, s.name, { ...FONT, fontSize: n === 3 ? '16px' : '20px' }).setOrigin(0.5);
      const cdText = this.add.text(x, y, cd ? String(cd) : '', { ...numFont(44), stroke: '#000', strokeThickness: 6 }).setOrigin(0.5);
      const parts = [g, icon, name, cdText];
      if (cd) [icon, name].forEach(p => p.setAlpha(0.25));
      const zone = this.add.zone(x, y, w, BTN_H).setInteractive({ useHandCursor: true });
      zone.on('pointerdown', () => { if (this.busy) return; if (cd) this.turnText.setText(`${s.name} ต้องพักฤทธิ์อีก ${cd} ตา`); else this.select(id); });
      parts.push(zone);
      this.btns.push({ id, parts });
    });
    const s = SKILLS[this.selected];
    // only a first-time hint; the gold glow shows whose turn it is
    // one line under the buttons: what the chosen skill does, and whom to tap
    this.turnText.setText(s.desc);
  }

  // Panel with notched (pixel-style) corners.
  pixelPanel(g, x, y, w, h, fill, border, u = PX) {
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
    u.hpText.setText(`${Math.max(0, u.hp)}/${u.maxHp}`);
  }

  refresh() {
    this.drawOrder?.();
    for (const u of [...this.allies, ...this.enemies]) {
      this.setBar(u);
      // lingering conditions show as a small icon on the unit's upper left
      const st = !u.alive ? null : u.stunned ? 'icon_drag' : u.blind ? 'icon_blind' : u.poison ? 'icon_poison' : null;
      u.statusIcon.setVisible(!!st);
      if (st) u.statusIcon.setTexture(st);
      if (u.side === 'enemy' && u.alive) {
        u.glow.setTint(u.pending ? 0xff1030 : 0xff3060).setAlpha(u.pending ? 0.45 : u.def.boss ? 0.28 : 0.12);
        // winding up: the body itself burns red
        if (u.pending) u.sprite.setTint(0xff7788); else u.sprite.clearTint();
        u.tiles.forEach(t => {
          const cd = u.cd[t.sid] || 0, winding = u.pending?.skillId === t.sid;
          t.g.clear();
          this.pixelPanel(t.g, t.x, t.y, 54, 54, winding ? 0x5a1020 : 0x2a1a2e, winding ? 0xff3355 : 0xaa6677, 3);
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
      const h = Math.max(36, u.half + 6), k = 12;
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
      this.add.image(70, top + 34, iconKey).setScale(PX),
      this.add.text(108, top + 24, title, { ...FONT, fontSize: '21px', fontStyle: 'bold' }).setOrigin(0, 0.5),
      this.add.text(108, top + 47, type, { ...FONT, fontSize: '13px', color: '#9999bb' }).setOrigin(0, 0.5),
      this.add.rectangle(180, top + 66, 260, 2, 0x55557a),
    ]);
    return top + 74;
  }

  cardRow(y, icon, label, value, valueColor = '#ffffff') {
    this.card.add([
      this.add.image(66, y + 22, icon).setScale(PX),
      this.add.text(98, y + 22, label, { ...FONT, fontSize: '16px', color: '#ccccee' }).setOrigin(0, 0.5),
      this.add.text(306, y + 22, value, { ...FONT, fontSize: '18px', fontStyle: 'bold', color: valueColor }).setOrigin(1, 0.5),
    ]);
    return y + 48;
  }

  skillRows(y, skill) {
    for (const e of skill.effects) {
      if (e.wait) y = this.cardRow(y, 'icon_clock', 'ตั้งท่าก่อน', `${e.wait} ตา`, '#ff8899');
      if (e.takenMult > 1) y = this.cardRow(y, 'icon_danger', 'ระหว่างตั้งท่าถูกตีแรงขึ้น', `x${e.takenMult}`, '#ff8899');
      if (e.damage != null) y = this.cardRow(y, 'icon_dmg', 'อานุภาพ', String(amount(e, 'damage', this.active)), '#ffdd55');
      if (e.block) y = this.cardRow(y, 'icon_shield', 'กันภัยให้', 'ตานี้', '#ffe066');
    }
    return this.cardRow(y, 'icon_clock', 'พักฤทธิ์', skill.cooldown ? `${skill.cooldown} ตา` : 'มิต้องพัก');
  }

  showSkillInfo(skill, type, where = 'bottom') {
    const y = this.cardHeader(this.openCard(), skill.icon, 4, skill.name, type);
    this.finishCard(this.skillRows(y, skill), where);
  }

  hideCard() { this.card.setVisible(false); this.card.removeAll(true); }

  // A status shown as a picture that rises and fades (blocked, missed, dragged under, warded).
  iconPop(x, y, key) {
    const img = this.add.image(x, y, key).setScale(PX).setDepth(8);
    this.tweens.add({ targets: img, y: y - 36, alpha: 0, duration: 1000, delay: 250, ease: 'Stepped', easeParams: [6], onComplete: () => img.destroy() });
  }

  popup(x, y, text, color = '#fff', size = 26) {
    // numbers (damage, healing) in the pixel digit font; words in Kanit
    const style = /^[+-]?\d+$/.test(text) ? { ...numFont(size, color) } : { ...FONT, fontSize: `${size}px`, fontStyle: 'bold', color };
    const t = this.add.text(x, y, text, { ...style, stroke: '#000', strokeThickness: 5 }).setOrigin(0.5).setDepth(8);
    this.tweens.add({ targets: t, y: y - 40, alpha: 0, duration: 1000, onComplete: () => t.destroy() });
  }

  // ---------- animations ----------
  // Enemy wind-up: shudders, glows red, marks its target.
  animWindup(user, targets, onDone) {
    play('growl');
    this.pose(user, 'wind');
    targets.forEach(t => {
      t.marker.setVisible(true);
      this.tweens.add({ targets: t.marker, alpha: 0.2, yoyo: true, repeat: 3, duration: 150, ease: 'Stepped', easeParams: [1], onComplete: () => t.marker.setAlpha(1) });
    });
    this.time.delayedCall(400, onDone);
  }

  // User lunges toward the target, then an impact effect plays at the target.
  animAttack(user, target, kind, onHit) {
    if (kind === 'shield') {
      play('ward');
      this.growFx(target.x, target.y, [30, 38, 46, 54], 0xffd860, 0.5, 500, pixelDisc);
      return this.time.delayedCall(200, onHit);
    }
    if (kind === 'spit') return this.animSpit(user, target, onHit);
    if (kind === 'ram') return this.animRam(user, target, onHit);
    if (kind === 'water' || kind === 'wisp' || kind === 'heal') return this.animRanged(user, target, kind, onHit);
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
          const ghost = this.add.image(sp.x, sp.y, sp.texture.key).setScale(sp.scaleX).setAlpha(0.35).setTint(enemy ? 0xff6080 : 0xffe08a).setDepth(sp.depth - 0.1);
          this.tweens.add({ targets: ghost, alpha: 0, duration: 200, onComplete: () => ghost.destroy() });
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

  // Ranged/support skills: a wisp of fire flies over, water swirls up, or a warm light settles.
  animRanged(user, target, kind, onHit) {
    this.pose(user, 'wind');
    this.time.delayedCall(160, () => {
      this.pose(user, 'atk');
      if (kind === 'heal') {
        play('ward');
        this.growFx(target.x, target.y, [18, 26, 34, 42], 0x88ff99, 0.6, 500, pixelDisc);
        this.time.delayedCall(250, () => { onHit(); this.pose(user, 'idle'); });
        return;
      }
      if (kind === 'water') {
        play('splash');
        this.growFx(target.x, target.y + 20, [14, 22, 30, 38], 0x4488ff, 0.8, 450, pixelDisc);
        this.tweens.add({ targets: target.sprite, y: target.y + 15, yoyo: true, duration: 180, ease: 'Stepped', easeParams: [3] });
        this.time.delayedCall(250, () => { onHit(); this.pose(user, 'idle'); });
        return;
      }
      // wisp
      play('slash');
      const w = this.add.image(user.x, user.y, 'fx_soul').setScale(PX).setTint(0xffaa44).setDepth(6);
      this.tweens.add({ targets: w, x: target.x, y: target.y, duration: 300, ease: 'Stepped', easeParams: [8], onComplete: () => {
        w.destroy();
        this.growFx(target.x, target.y, [10, 16, 22], 0xffaa44, 0.8, 300, pixelDisc);
        onHit();
        this.pose(user, 'idle');
      } });
    });
  }

  // An effect that grows by swapping between pre-drawn sizes (pixel size never changes), fading out.
  growFx(x, y, sizes, tint, alpha, duration, make, depth = 5) {
    const img = this.add.image(x, y, make(this, sizes[0])).setScale(PX).setTint(tint).setAlpha(alpha).setDepth(depth);
    sizes.forEach((n, i) => this.time.delayedCall(duration * i / sizes.length, () => img.setTexture(make(this, n)).setAlpha(alpha * (1 - i / sizes.length))));
    this.time.delayedCall(duration, () => img.destroy());
  }

  fxSlash(t) {
    play('hit');
    const fx = this.add.image(t.x, t.y, 'fx_slash@2').setScale(PX).setDepth(5);
    this.tweens.add({ targets: fx, alpha: 0, duration: 260, ease: 'Stepped', easeParams: [3], onComplete: () => fx.destroy() });
    this.tweens.add({ targets: t.sprite, x: t.x + 8, duration: 60, yoyo: true });
  }

  fxClaw(t) {
    play('scratch');
    const fx = this.add.image(t.x, t.y, 'fx_claw').setScale(PX).setDepth(5);
    this.tweens.add({ targets: fx, alpha: 0, duration: 450, delay: 120, onComplete: () => fx.destroy() });
  }

  // Three quick rakes from alternating angles; damage lands on the last one.
  fxFrenzy(t, onHit) {
    [false, true, false].forEach((flip, i) => this.time.delayedCall(i * 140, () => {
      play('scratch');
      const fx = this.add.image(t.x + (i - 1) * 10, t.y, 'fx_claw').setScale(PX).setFlipX(flip).setDepth(5);
      this.tweens.add({ targets: fx, alpha: 0, duration: 350, delay: 80, onComplete: () => fx.destroy() });
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
          this.growFx(s.x, s.y + 30, [4, 6, 8], 0x8a8070, 0.6, 400, pixelDisc, 2);
        });
        this.tweens.add({
          targets: s, x: target.x, y: target.y + 40, duration: 170, ease: 'Cubic.in', onStart: () => this.pose(user, 'atk'),
          onComplete: () => {
            play('thud');
            this.pixelShake(160, 6);
            this.growFx(target.x, target.y + 20, [14, 20, 26, 32, 38], 0xffe9a0, 1, 300, pixelRing);
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
    const top = this.add.image(t.x, t.y - 60, 'fx_jaw_top@2').setScale(PX).setDepth(5);
    const bot = this.add.image(t.x, t.y + 60, 'fx_jaw_bottom@2').setScale(PX).setDepth(5);
    this.tweens.add({ targets: top, y: t.y - 14, duration: 90, ease: 'Cubic.in' });
    this.tweens.add({
      targets: bot, y: t.y + 14, duration: 90, ease: 'Cubic.in',
      onComplete: () => this.tweens.add({ targets: [top, bot], alpha: 0, duration: 300, delay: 120, onComplete: () => { top.destroy(); bot.destroy(); } }),
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
          const gut = this.add.image(user.x, user.y + 30, 'fx_gut').setScale(PX).setDepth(5);
          this.tweens.add({
            targets: gut, x: target.x + Phaser.Math.Between(-40, 40), y: target.y + Phaser.Math.Between(-40, 40), 
            duration: 260, delay: i * 12, ease: 'Quad.in', onComplete: () => gut.destroy(),
          });
        }
        this.time.delayedCall(280, () => {
          play('hurt');
          onHit();
          for (let i = 0; i < 4; i++) {
            const sp = this.add.image(target.x + Phaser.Math.Between(-45, 45), target.y + Phaser.Math.Between(-45, 30), Phaser.Math.RND.pick(['fx_splat', 'fx_splat@2']))
              .setScale(PX).setDepth(5).setAlpha(0.9);
            this.tweens.add({ targets: sp, y: sp.y + 30, alpha: 0, duration: 1200, delay: 200, onComplete: () => sp.destroy() });
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
    const timers = [];
    const later = (ms, fn) => timers.push(this.time.delayedCall(ms, fn));
    const raised = this.enemies.map(e => e.sprite); // glows keep their own faint alpha (set in refresh)
    const finish = () => {
      if (done) return;
      done = true;
      timers.forEach(t => t.remove()); // only the intro's own timers — the idle beat keeps running
      this.tweens.killTweensOf([veil, this.banner, this.bannerSub].filter(Boolean));
      raised.forEach(o => o.setDepth(0).setAlpha(1));
      this.banner?.destroy(); this.bannerSub?.destroy();
      this.banner = this.bannerSub = null;
      this.tweens.add({ targets: veil, alpha: 0, duration: 350, ease: 'Stepped', easeParams: [4], onComplete: () => veil.destroy() });
      this.startRound();
    };
    if (short) return this.time.delayedCall(10, finish);

    raised.forEach(o => o.setDepth(21).setAlpha(0));
    this.enemies.forEach(e => {
      this.tweens.add({ targets: e.sprite, alpha: 1, duration: 900, ease: 'Stepped', easeParams: [5] });
    });
    later(350, () => play('laugh'));
    later(700, () => play('growl')); // names and skills were shown on the prep screen
    later(1500, finish);
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
    // no badge: the retainers tell it — survivors leap for joy (the fallen already lie still)
    if (won) this.alive(this.allies).forEach((u, i) => {
      let up = false;
      this.time.addEvent({ delay: 260, loop: true, startAt: i * 130, callback: () => {
        up = !up;
        this.pose(u, up ? 'cheer' : 'idle');
        u.pose = 'cheer'; // keep the idle beat from taking over
        u.sprite.y = u.y - (up ? PX * 4 : 0);
      } });
    });
    // a vanquished foe holds no more secrets
    if (won) this.see(this.enemies.flatMap(e => e.skills));
    if (won) this.dropCharm(); else saveFrom(this);
    this.add.text(180, 250, won ? 'ศัตรูสิ้นฤทธิ์!' : 'บริวารหมดสิ้น…', { ...FONT, fontSize: '36px', fontStyle: 'bold', stroke: '#000', strokeThickness: 6 }).setOrigin(0.5).setDepth(9);
    const label = won ? 'เดินทางต่อ' : 'ตั้งจิตใหม่';
    const next = won ? () => afterVictory(this, this.stage, this.first) : () => this.scene.start('Prep', { stage: this.stage, first: this.first, retry: true });
    // farming: after a replayed win, fight the same stage again straight away (same team, same charms)
    const again = won && !this.first;
    const W = again ? 196 : 332, X = again ? 346 - W / 2 : 180;
    this.pixelPanel(this.add.graphics().setDepth(9), X, BTN_Y, W, 120, won ? 0x2d5a3a : 0x5a2d3a, 0xffffff);
    this.add.image(X - W / 2 + 40, BTN_Y, won ? 'icon_next' : 'icon_retry').setScale(PX).setDepth(9);
    this.add.text(X - W / 2 + 72, BTN_Y, label, { ...FONT, fontSize: again ? '22px' : '28px' }).setOrigin(0, 0.5).setDepth(9);
    this.add.zone(X, BTN_Y, W, 120).setInteractive({ useHandCursor: true }).setDepth(9)
      .on('pointerdown', () => { play('click'); next(); });
    if (again) {
      this.pixelPanel(this.add.graphics().setDepth(9), 82, BTN_Y, 128, 120, 0x3d3d5e, 0xffdd55);
      this.add.image(82, BTN_Y - 18, 'icon_retry').setScale(PX).setDepth(9);
      this.add.text(82, BTN_Y + 26, 'สู้ซ้ำ', { ...FONT, fontSize: '20px' }).setOrigin(0.5).setDepth(9);
      this.add.zone(82, BTN_Y, 128, 120).setInteractive({ useHandCursor: true }).setDepth(9)
        .on('pointerdown', () => { play('click'); this.scene.restart({ stage: this.stage, first: false }); });
    }
  }
}
