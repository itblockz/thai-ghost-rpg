import Phaser from 'phaser';
import { ZOOM, setupCamera, FONT_FAMILY, TEXT_METRICS, PX, idleFrames, numFont } from '../display.js';
import { registerSprites, pixelOval, pixelOvalDash } from '../art/sprites.js';
import { ALLIES, ENEMIES, STAGES, foeSkills } from '../data/units.js';
import { SKILLS, skillFacts } from '../data/skills.js';
import { currentTeam, fightingTeam, MAX_FIGHTERS } from '../flow.js';
import { saveFrom } from '../save.js';
import { play } from '../audio/sfx.js';
import { applyWorn, CHARM_TYPES } from '../data/charms.js';
import { applyGrowth, applyLevel, levelOf, shownLevel } from '../data/growth.js';
import { gems } from '../ui/charmUi.js';
import { tapOrDrag } from '../ui/drag.js';

const FONT = { fontFamily: FONT_FAMILY, color: '#fff', resolution: ZOOM, ...TEXT_METRICS };
// front line (the three going in, placed as in the fight), then the bench (the rest, four to a page)
const ENEMY_Y = 100, TEAM_Y = 466, BENCH_Y = 540, PANEL_TOP = 160, PANEL_BOTTOM = 430, BTN_Y = 608;
const BENCH_PAGE = 4, BENCH_X = [72, 144, 216, 288], FRONT_X = [65, 180, 295];
const slots = n => (n === 1 ? [180] : n === 2 ? [105, 255] : n === 3 ? [65, 180, 295] : n === 4 ? [48, 136, 224, 312] : Array.from({ length: n }, (_, i) => Math.round((i + 0.5) * 360 / n / 2) * 2));

// Before each fight. Laid out like the battlefield (enemies above, the three going in below, the bench under them);
// tap anyone to read them in the middle panel. No pop-ups.
export class PrepScene extends Phaser.Scene {
  constructor() { super('Prep'); }

  create(data) {
    setupCamera(this);
    registerSprites(this);
    this.stage = data?.stage ?? 0;
    this.startData = data;
    this.busy = false;
    const stage = STAGES[this.stage];

    this.add.image(180, 0, stage.bg || 'bg_night').setOrigin(0.5, 0).setScale(PX);
    this.add.rectangle(180, 320, 360, 640, 0x07060f, 0.35);
    this.add.text(180, 24, 'ศัตรูเบื้องหน้า', { ...FONT, fontSize: '16px', color: '#ff99aa', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);

    this.marker = this.add.graphics().setDepth(5);
    this.tweens.add({ targets: this.marker, alpha: 0.4, yoyo: true, repeat: -1, duration: 500, ease: 'Sine.inOut' });
    this.panelObjs = [];

    // enemies where they will stand in the fight; duplicates share one description
    const counts = {};
    // the first (story) fight may bring a different band than later hunts
    const foes = data?.first && stage.story ? stage.story.ids : stage.enemies;
    foes.forEach(id => { counts[id] = (counts[id] || 0) + 1; });
    const ex = slots(foes.length);
    const picks = foes.map((id, i) => this.figure(ex[i], ENEMY_Y, ENEMIES[id], () => this.show(ENEMIES[id], counts[id], ex[i], ENEMY_Y, 'enemy')));

    // keep the bench explicit: whoever is not in the front line rests
    const team = currentTeam(this), goers = fightingTeam(this, true);
    this.registry.set('bench', team.filter(id => !goers.includes(id)));
    this.teamIds = team;
    this.goers = goers;
    const allyPicks = {};
    // the bench sits in the shade below the front line
    this.add.rectangle(180, BENCH_Y + 4, 360, 76, 0x000000, 0.45);
    // front line: three places to stand, always drawn — a dashed ring is a free place
    this.spots = {}; // where each retainer stands: { x, y, front }
    this.places = FRONT_X.map((x, i) => {
      const taken = i < goers.length;
      const ring = this.add.image(x, TEAM_Y + 30, taken ? pixelOval(this, 28, 6) : pixelOvalDash(this, 30, 8)).setScale(PX)
        .setTint(taken ? 0x000000 : 0xffe08a).setAlpha(taken ? 0.5 : 0.7);
      return { x, ring, taken };
    });
    // nobody going: the free places pulse, asking to be filled
    if (!goers.length) this.tweens.add({ targets: this.places.map(p => p.ring), alpha: 0.2, yoyo: true, repeat: -1, duration: 500, ease: 'Sine.inOut' });
    goers.forEach((id, i) => { const x = FRONT_X[i]; this.spots[id] = { x, y: TEAM_Y, front: true }; allyPicks[id] = this.figure(x, TEAM_Y, ALLIES[id], () => this.show(ALLIES[id], 1, x, TEAM_Y, 'ally', id), id); this.spots[id].img = this.lastFigure; });
    // bench: the others, four to a page, a little faded (more so when no place is free)
    const resting = team.filter(id => !goers.includes(id));
    const pages = Math.max(1, Math.ceil(resting.length / BENCH_PAGE));
    this.benchPage = Math.min(data?.benchPage ?? Math.floor(Math.max(0, resting.indexOf(data?.sel)) / BENCH_PAGE), pages - 1);
    this.full = goers.length >= MAX_FIGHTERS;
    resting.slice(this.benchPage * BENCH_PAGE, (this.benchPage + 1) * BENCH_PAGE).forEach((id, i) => {
      this.spots[id] = { x: BENCH_X[i], y: BENCH_Y, front: false };
      allyPicks[id] = this.figure(BENCH_X[i], BENCH_Y, ALLIES[id], () => this.show(ALLIES[id], 1, BENCH_X[i], BENCH_Y, 'ally', id), id);
      this.spots[id].img = this.lastFigure.setAlpha(this.full ? 0.35 : 0.7);
    });
    if (pages > 1) [[-1, 18], [1, 342]].forEach(([d, x]) => this.add.text(x, BENCH_Y, d < 0 ? '‹' : '›', { ...FONT, fontSize: '28px', fontStyle: 'bold', color: '#ffe08a', stroke: '#000', strokeThickness: 5 }).setOrigin(0.5).setPadding(8, 10, 8, 10)
      .setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); this.scene.restart({ ...this.startData, sel: null, benchPage: (this.benchPage + d + pages) % pages }); }));

    // start (same style as the battle buttons)
    // nobody going: the button is locked until someone is tapped in
    const none = !goers.length;
    this.panel(this.add.graphics(), 180, BTN_Y, 332, 56, none ? 0x2a2a3a : 0x3d3d5e, none ? 0x55557a : 0xffdd55);
    this.add.text(180, BTN_Y, 'ออกศึก', { ...FONT, fontSize: '26px', fontStyle: 'bold', color: none ? '#66668a' : '#ffffff' }).setOrigin(0.5);
    if (!none) this.add.zone(180, BTN_Y, 332, 56).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => { play('click'); this.scene.start('Battle', { stage: this.stage, first: !!data?.first, retry: !!data?.retry }); });

    // back to the map
    const back = this.add.text(14, 24, '‹ แผนที่', { ...FONT, fontSize: '15px', color: '#ccccee', stroke: '#000', strokeThickness: 4 }).setOrigin(0, 0.5)
      .setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); this.scene.start('Map'); });
    back.setPadding(6, 6, 6, 6);

    // what this stage tends to drop (tap for the charm guide)
    if (stage.drop) this.add.image(334, 26, CHARM_TYPES[stage.drop].icon).setScale(PX);
    if (stage.richDrop) gems(this, 300, 44, 'mythic'); // boss: วิเศษ more often
    this.add.text(314, 26, 'ของ ›', { ...FONT, fontSize: '12px', color: '#ffe08a', stroke: '#000', strokeThickness: 3 }).setOrigin(1, 0.5);
    this.add.zone(316, 30, 80, 52).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => { play('click'); this.scene.start('Guide', { back: { scene: 'Prep', data: this.startData } }); });

    // reopen on the retainer just moved (see swap)
    if (data?.sel && allyPicks[data.sel]) allyPicks[data.sel](); else picks[0]();
  }

  // the one rule: tap a fighter = it hops down to rest; tap a resting one = it hops up to a free place.
  // No free place: it rises, finds nowhere to go and drops back, and the three places flash.
  toggle(id) {
    const sp = this.spots[id], img = sp.img;
    play('click');
    if (this.busy) return;
    if (sp.front) { this.busy = true; return this.hop(img, 180, BENCH_Y, () => this.rest(id)); }
    if (this.full) {
      this.tweens.add({ targets: img, y: sp.y - 14, yoyo: true, duration: 120 });
      this.places.forEach(p => this.tweens.add({ targets: p.ring, alpha: 0.1, yoyo: true, duration: 120, repeat: 1 }));
      return this.show(ALLIES[id], 1, sp.x, sp.y, 'ally', id);
    }
    this.busy = true;
    this.hop(img.setAlpha(1), FRONT_X[this.goers.length], TEAM_Y, () => this.bringIn(id));
  }

  // a little arcing jump to (x, y), then on with it
  hop(img, x, y, then) {
    const p = { t: 0 }, x0 = img.x, y0 = img.y;
    img.setDepth(20);
    this.tweens.add({ targets: p, t: 1, duration: 260, ease: 'Sine.inOut', onUpdate: () => img.setPosition(x0 + (x - x0) * p.t, y0 + (y - y0) * p.t - Math.sin(p.t * Math.PI) * 30), onComplete: then });
  }

  // put a resting retainer in: into a free place, or in the place of the fighter `out`
  bringIn(id, out = null) {
    let team = [...currentTeam(this)];
    if (out) { const i = team.indexOf(out), j = team.indexOf(id); [team[i], team[j]] = [team[j], team[i]]; }
    else { team = team.filter(x => x !== id); const last = team.indexOf(this.goers[this.goers.length - 1]); team.splice(last + 1, 0, id); }
    const goers = team.filter(x => (out ? x !== out : true) && (this.goers.includes(x) || x === id));
    this.registry.set('team', team);
    this.registry.set('bench', team.filter(x => !goers.includes(x)));
    saveFrom(this);
    this.scene.restart({ ...this.startData, sel: id, benchPage: null });
  }

  rest(id) {
    this.registry.set('bench', [...new Set([...(this.registry.get('bench') || []), id])]);
    saveFrom(this);
    this.scene.restart({ ...this.startData, sel: id, benchPage: null });
  }

  figure(x, y, def, onPick, allyId = null) {
    const img = this.lastFigure = this.add.image(x, y, def.sprite).setScale(PX);
    idleFrames(this, img, def.sprite);
    const zone = this.add.zone(x, y, y === BENCH_Y ? 72 : 100, y === BENCH_Y ? 72 : 100);
    // a retainer can also be dragged: onto a fighter (swap places), onto the bench (rest), or into a free place in front
    if (allyId) tapOrDrag(this, zone, { key: def.sprite, tap: () => this.toggle(allyId), hold: () => { play('click'); onPick(); }, targets: () => this.dropTargets(allyId) });
    else zone.setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); onPick(); });
    return onPick;
  }

  // where a dragged retainer may land
  dropTargets(id) {
    const from = this.spots[id], out = [];
    for (const [other, at] of Object.entries(this.spots)) {
      if (other === id || !at.front) continue;
      // onto a fighter: a resting one takes its place; a fighter swaps order with it
      out.push({ x: at.x, y: at.y, w: 76, h: 76, drop: () => (from.front ? this.swapWith(id, other) : this.bringIn(id, other)) });
    }
    // a free place in front (fewer than three going)
    if (!from.front && this.goers.length < MAX_FIGHTERS) out.push({ x: 180, y: TEAM_Y, w: 340, h: 76, drop: () => this.bringIn(id) });
    // down to the bench
    if (from.front) out.push({ x: 180, y: BENCH_Y, w: 340, h: 76, drop: () => this.rest(id) });
    return out;
  }

  // two fighters trade places in the front line
  swapWith(a, b) {
    const team = [...currentTeam(this)], i = team.indexOf(a), j = team.indexOf(b);
    [team[i], team[j]] = [team[j], team[i]];
    this.registry.set('team', team);
    saveFrom(this);
    this.scene.restart({ ...this.startData, sel: a });
  }

  // Fill the middle panel with one unit: name, HP, lore, then every skill with all its numbers.
  show(def, count, x, y, side, allyId = null, tab = 'skills') {
    this.current = [def, count, x, y, side, allyId];
    this.panelObjs.forEach(o => o.destroy());
    const objs = this.panelObjs = [];
    const add = o => (objs.push(o), o);
    const enemy = side === 'enemy';

    // selection brackets, like target brackets in battle
    const m = this.marker.clear().fillStyle(enemy ? 0xff7790 : 0xffdd55);
    const h = enemy ? 40 : 34, k = 10;
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => {
      const cx = x + sx * h, cy = y + sy * h;
      m.fillRect(Math.min(cx, cx - sx * k), cy - (sy > 0 ? 3 : 0), k, 3);
      m.fillRect(cx - (sx > 0 ? 3 : 0), Math.min(cy, cy - sy * k), 3, k);
    });

    add(this.panel(this.add.graphics(), 180, (PANEL_TOP + PANEL_BOTTOM) / 2, 332, PANEL_BOTTOM - PANEL_TOP, 0x161424, enemy ? 0xaa6677 : 0xb89a50));
    const nameT = add(this.add.text(30, PANEL_TOP + 20, count > 1 ? `${def.name} ×${count}` : def.name, { ...FONT, fontSize: '20px', fontStyle: 'bold' }).setOrigin(0, 0.5));
    // bosses never lose a turn (drowned, …): said up front, beside the name
    // a common foe stands at this stage's ขั้น (shown like a retainer's)
    const foeLevel = enemy && !def.boss ? STAGES[this.stage].level || 1 : 0;
    if (foeLevel) add(this.add.text(36 + nameT.width, PANEL_TOP + 22, `ขั้น ${foeLevel}`, { ...FONT, fontSize: '12px', color: '#ffe08a' }).setOrigin(0, 0.5));
    if (def.boss) add(this.add.text(38 + nameT.width, PANEL_TOP + 22, 'ไม่เสียตา', { ...FONT, fontSize: '12px', color: '#9ac8f0' }).setOrigin(0, 0.5));
    if (allyId) add(this.add.text(36 + nameT.width, PANEL_TOP + 22, `ขั้น ${shownLevel(levelOf((this.registry.get('exp') || {})[allyId] || 0).lv)}`, { ...FONT, fontSize: '12px', color: '#ffe08a' }).setOrigin(0, 0.5));
    // the unit as it will fight: base stats plus any worn charm
    const u = { hp: def.hp, maxHp: def.hp, atk: def.atk || 0, spd: def.spd || 10 };
    if (allyId) { const exp = (this.registry.get('exp') || {})[allyId] || 0; applyGrowth(u, exp); applyWorn(u, this.registry.get('bag') || [], this.registry.get('gear') || {}, allyId); }
    if (foeLevel) applyLevel(u, foeLevel);
    // stats as small pictures: heart = ขวัญ, fist = กำลัง (right-aligned)
    this.iconNums(330, PANEL_TOP + 20, [['icon_hp', u.maxHp], ...(def.atk ? [['icon_atk', u.atk]] : []), ['icon_spd', u.spd]], add);
    add(this.add.rectangle(180, PANEL_TOP + 62, 300, 2, 0x44445e));
    if (allyId) {
      // charms are managed on the roster screen
      add(this.add.text(30, PANEL_TOP + 44, 'จัดบริวารและของขลัง ›', { ...FONT, fontSize: '13px', color: '#ffe08a' }).setOrigin(0, 0.5).setPadding(4, 6, 4, 6)
        .setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); this.scene.start('Roster', { sel: allyId, back: { scene: 'Prep', data: this.startData } }); }));
    } else {
      add(this.add.text(30, PANEL_TOP + 44, def.lore || '', { ...FONT, fontSize: '12px', color: '#a8a8c8' }).setOrigin(0, 0.5));
    }

    let ry = PANEL_TOP + 68;
    const seen = new Set(this.registry.get('seen') || []);
    for (const sid of enemy ? foeSkills(def) : def.skills) {
      const s = SKILLS[sid];
      // enemy skills stay unknown (???) until witnessed in a fight
      const known = !!allyId || seen.has(sid);
      // each skill sits in its own card; cooldown in that card's top-right corner
      add(this.add.text(94, ry + 4, known ? s.name : '?', { ...FONT, fontSize: '16px', fontStyle: 'bold' }).setOrigin(0, 0).setDepth(1));
      const facts = add(this.add.text(94, ry + 23, known ? s.desc : '', { ...FONT, fontSize: '12px', color: '#ccccee', wordWrap: { width: known && s.cooldown ? 186 : 228 }, lineSpacing: 0 }).setOrigin(0, 0).setDepth(1));
      const rowH = Math.max(54, 29 + facts.height);
      add(this.panel(this.add.graphics(), 180, ry + rowH / 2, 312, rowH - 4, 0x201c30, 0x2e2a40));
      if (known && s.cooldown) {
        // 6pt (two art pixels) clear of the card's inner edge on top and right, like the skill icon on the left
        const t = add(this.add.text(324, ry + 26, String(s.cooldown), numFont(15)).setOrigin(1, 0.5).setDepth(1));
        add(this.add.image(324 - t.width - 20, ry + 26, 'icon_cd').setScale(PX).setDepth(1)); }
      const icon = add(this.add.image(60, ry + rowH / 2, s.icon).setScale(PX).setDepth(1));
      if (!known) icon.setTintFill(0x2a2a3a);
      ry += rowH;
    }
  }

  // Right-aligned row of [8x8 icon, number] pairs, e.g. ❤ 28  ✊ 4.
  iconNums(right, y, pairs, add) {
    let x = right;
    for (const [key, n] of [...pairs].reverse()) {
      const t = add(this.add.text(x, y, String(n), numFont(15)).setOrigin(1, 0.5));
      x -= t.width + 4;
      add(this.add.image(x - 16, y, key).setScale(PX));
      x -= 42;
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
