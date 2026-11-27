import Phaser from 'phaser';
import { ZOOM, setupCamera, FONT_FAMILY, TEXT_METRICS, PX, idleFrames, pixelBob } from '../display.js';
import { registerSprites, pixelDisc } from '../art/sprites.js';
import { STAGES, CHAPTERS, chapterOf } from '../data/units.js';
import { cleared, currentTeam, playStage } from '../flow.js';
import { saveFrom } from '../save.js';
import { play } from '../audio/sfx.js';

const FONT = { fontFamily: FONT_FAMILY, color: '#fff', resolution: ZOOM, ...TEXT_METRICS };
const START = [180, 140];          // the master's shrine, where the journey began
const NEXT_CHAPTER = [230, 504];   // the way on to the next chapter

// Chapter map: the path from the shrine through each stage. Cleared stages can be replayed;
// the next one is open; anything beyond is hidden. Reaching the map is the save point.
export class MapScene extends Phaser.Scene {
  constructor() { super('Map'); }

  create(data) {
    setupCamera(this);
    registerSprites(this);
    const done = cleared(this);
    saveFrom(this);

    // which chapter to show: the one with the next stage to play (or the one asked for)
    const reached = chapterOf(Math.min(done, STAGES.length - 1));
    const ch = this.ch = Math.min(data?.chapter ?? (data?.arrived != null ? chapterOf(data.arrived) : reached), reached);
    const idx = STAGES.map((s, i) => i).filter(i => chapterOf(i) === ch);
    const chapter = CHAPTERS[ch];

    this.add.image(180, 0, chapter.map).setOrigin(0.5, 0).setScale(PX);
    this.add.text(180, 30, chapter.title, { ...FONT, fontSize: '18px', fontStyle: 'bold', color: '#ffccd5', stroke: '#000', strokeThickness: 5 }).setOrigin(0.5);
    // flip between chapters already reached
    const flip = (label, x, to) => this.add.text(x, 30, label, { ...FONT, fontSize: '26px', fontStyle: 'bold', color: '#ffe08a', stroke: '#000', strokeThickness: 5 }).setOrigin(0.5)
      .setPadding(8, 4, 8, 4).setInteractive({ useHandCursor: true }).on('pointerdown', () => { play('click'); this.scene.restart({ chapter: to }); });
    if (ch > 0) flip('‹', 22, ch - 1);
    if (ch < reached) flip('›', 338, ch + 1);

    // the path, as dotted pixel steps between stops
    const stops = [START, ...idx.map(i => STAGES[i].map), NEXT_CHAPTER];
    const path = this.add.graphics();
    for (let k0 = 0; k0 < stops.length - 1; k0++) {
      const [x1, y1] = stops[k0], [x2, y2] = stops[k0 + 1];
      const lit = k0 === 0 || (idx[k0 - 1] ?? Infinity) < done; // walked or walkable
      const n = Math.floor(Math.hypot(x2 - x1, y2 - y1) / 12);
      for (let k = 1; k < n; k++) {
        const x = Math.round((x1 + (x2 - x1) * k / n) / PX) * PX, y = Math.round((y1 + (y2 - y1) * k / n) / PX) * PX;
        path.fillStyle(lit ? 0xc8a050 : 0x3a3a4a).fillRect(x - 3, y - 3, 6, 6);
      }
    }

    // stops
    this.node(START, chapter.start.node, chapter.start.name, 'done');
    idx.forEach(i => {
      const s = STAGES[i], state = i < done ? 'done' : i === done ? 'next' : 'locked';
      this.node(s.map, state === 'locked' ? 'node_lock' : s.node, state === 'locked' ? '' : s.name, state, () => this.go(i));
    });
    const chapterDone = idx.every(i => i < done);
    const nextCh = CHAPTERS[ch + 1];
    if (nextCh && chapterDone) this.node(NEXT_CHAPTER, CHAPTERS[ch + 1].start.node, `ไป${nextCh.title.split(' — ')[0]}`, 'next', () => { play('click'); this.scene.restart({ chapter: ch + 1 }); });
    else this.node(NEXT_CHAPTER, 'node_lock', chapterDone ? 'บรรพถัดไปเร็ว ๆ นี้' : '', 'locked');

    // only the heir travels the map (retainers are seen on the prep screen); stands where the journey has reached
    const last = idx.filter(i => i < done).pop();
    const here = data?.arrived != null && chapterOf(data.arrived) === ch ? STAGES[data.arrived].map : last == null ? START : STAGES[last].map;
    this.party = ['heir'].map((key, i) => {
      const [ox, oy] = this.offset(i);
      const img = this.add.image(here[0] + ox, here[1] + oy, key).setScale(PX).setDepth(5 - i * 0.1);
      idleFrames(this, img, key);
      return img;
    });
    this.walker = this.party[0];

    // retainers & charms
    const g = this.add.graphics().setDepth(6), bx = 300, by = 596;
    g.fillStyle(0x000000).fillRect(bx - 50, by - 20, 100, 40).fillStyle(0xffdd55).fillRect(bx - 47, by - 17, 94, 34).fillStyle(0x3d3d5e).fillRect(bx - 44, by - 14, 88, 28);
    this.add.text(bx, by, 'บริวาร', { ...FONT, fontSize: '15px', fontStyle: 'bold' }).setOrigin(0.5).setDepth(6);
    this.add.zone(bx, by, 100, 40).setInteractive({ useHandCursor: true }).setDepth(6).on('pointerdown', () => { play('click'); this.scene.start('Roster', { back: { scene: 'Map', data: { chapter: this.ch } } }); });
    this.add.text(125, 596, chapterDone ? 'ผ่านบรรพนี้แล้ว แตะศึกเพื่อประลองซ้ำ' : 'แตะจุดหมายเพื่อออกเดินทาง', { ...FONT, fontSize: '13px', wordWrap: { width: 220 }, align: 'center', color: '#bbbbdd', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
    this.busy = false;
  }

  node([x, y], icon, label, state, onTap) {
    const glow = this.add.image(x, y, pixelDisc(this, 26)).setScale(PX)
      .setTint(state === 'next' ? 0xffd860 : state === 'done' ? 0xc8a050 : 0x444455).setAlpha(state === 'locked' ? 0.15 : 0.3);
    if (state === 'next') this.tweens.add({ targets: glow, alpha: 0.08, yoyo: true, repeat: -1, duration: 600, ease: 'Sine.inOut' });
    const img = this.add.image(x, y, icon).setScale(PX).setAlpha(state === 'locked' ? 0.5 : 1);
    if (state === 'next') pixelBob(this, img, PX, 1, 420);
    if (label) this.add.text(x, y + 38, label, { ...FONT, fontSize: '14px', fontStyle: 'bold', color: state === 'next' ? '#ffe08a' : '#ddddee', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
    if (state === 'done' && onTap) this.add.text(x - 26, y - 24, '✓', { ...FONT, fontSize: '16px', fontStyle: 'bold', color: '#88dd99', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
    if (onTap && state !== 'locked') this.add.zone(x, y, 90, 90).setInteractive({ useHandCursor: true }).on('pointerdown', onTap);
  }

  // where the heir stands beside a stop
  offset() { return [48, -8]; }

  // walk to the chosen stop in whole-pixel steps (legs swapping), then set off
  go(i) {
    if (this.busy) return;
    this.busy = true;
    play('click');
    const [x, y] = STAGES[i].map;
    let step = false;
    const legs = this.time.addEvent({ delay: 110, loop: true, callback: () => { step = !step; this.walker.setTexture(step ? 'heir_walk1' : 'heir_walk2'); } });
    this.party.forEach((p, k) => this.tweens.add({
      targets: p, x: x + this.offset(k)[0], y: y + this.offset(k)[1], duration: 600, delay: k * 90, ease: 'Stepped', easeParams: [10],
    }));
    this.time.delayedCall(600 + this.party.length * 90, () => {
      legs.remove();
      this.walker.setTexture('heir');
      this.time.delayedCall(150, () => playStage(this, i));
    });
  }
}
