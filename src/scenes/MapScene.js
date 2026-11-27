import Phaser from 'phaser';
import { ZOOM, setupCamera, FONT_FAMILY, TEXT_METRICS, PX, idleFrames, pixelBob } from '../display.js';
import { registerSprites, pixelDisc } from '../art/sprites.js';
import { STAGES } from '../data/units.js';
import { cleared, currentTeam, playStage } from '../flow.js';
import { saveProgress } from '../save.js';
import { play } from '../audio/sfx.js';

const FONT = { fontFamily: FONT_FAMILY, color: '#fff', resolution: ZOOM, ...TEXT_METRICS };
const START = [180, 140];          // the master's shrine, where the journey began
const NEXT_CHAPTER = [180, 500];   // locked until chapter 2 exists

// Chapter map: the path from the shrine through each stage. Cleared stages can be replayed;
// the next one is open; anything beyond is hidden. Reaching the map is the save point.
export class MapScene extends Phaser.Scene {
  constructor() { super('Map'); }

  create(data) {
    setupCamera(this);
    registerSprites(this);
    const done = cleared(this);
    saveProgress(done, currentTeam(this));

    this.add.image(180, 0, 'art_map').setOrigin(0.5, 0).setScale(PX);
    this.add.text(180, 30, 'บทที่ ๑ — คืนเดือนดับ', { ...FONT, fontSize: '18px', fontStyle: 'bold', color: '#ffccd5', stroke: '#000', strokeThickness: 5 }).setOrigin(0.5);

    // the path, as dotted pixel steps between stops
    const stops = [START, ...STAGES.map(s => s.map), NEXT_CHAPTER];
    const path = this.add.graphics();
    for (let i = 0; i < stops.length - 1; i++) {
      const [x1, y1] = stops[i], [x2, y2] = stops[i + 1];
      const lit = i <= done; // walked or walkable
      const n = Math.floor(Math.hypot(x2 - x1, y2 - y1) / 12);
      for (let k = 1; k < n; k++) {
        const x = Math.round((x1 + (x2 - x1) * k / n) / PX) * PX, y = Math.round((y1 + (y2 - y1) * k / n) / PX) * PX;
        path.fillStyle(lit ? 0xc8a050 : 0x3a3a4a).fillRect(x - 3, y - 3, 6, 6);
      }
    }

    // stops
    this.node(START, 'node_shrine', 'ศาลาอาจารย์', 'done');
    STAGES.forEach((s, i) => {
      const state = i < done ? 'done' : i === done ? 'next' : 'locked';
      this.node(s.map, state === 'locked' ? 'node_lock' : s.node, state === 'locked' ? '' : s.name, state, () => this.go(i));
    });
    const chapterDone = done >= STAGES.length;
    this.node(NEXT_CHAPTER, 'node_lock', chapterDone ? 'บทที่ ๒ · เร็ว ๆ นี้' : '', 'locked');

    // the companion stands where the journey has reached
    const here = data?.arrived != null ? STAGES[data.arrived].map : done === 0 ? START : STAGES[Math.min(done, STAGES.length) - 1].map;
    this.walker = this.add.image(here[0] + 48, here[1] - 8, 'kumarn').setScale(PX).setDepth(5);
    idleFrames(this, this.walker, 'kumarn');

    this.add.text(180, 610, chapterDone ? 'ผ่านบทที่ ๑ แล้ว · แตะด่านเพื่อเล่นซ้ำ' : 'แตะด่านเพื่อออกเดินทาง', { ...FONT, fontSize: '13px', color: '#bbbbdd', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
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

  // walk to the chosen stop in whole-pixel steps, then set off
  go(i) {
    if (this.busy) return;
    this.busy = true;
    play('click');
    const [x, y] = STAGES[i].map;
    this.tweens.add({
      targets: this.walker, x: x + 48, y: y - 8, duration: 500, ease: 'Stepped', easeParams: [8],
      onComplete: () => this.time.delayedCall(150, () => playStage(this, i)),
    });
  }
}
