import Phaser from 'phaser';
import { player } from '../state.js';

const T = 40; // tile size
// 9 x 13 map: # wall/tree, . ground, ~ water, h house, k krasue
const MAP = [
  '#########',
  '#..h..#.#',
  '#.......#',
  '#.~~..k.#',
  '#.~~....#',
  '#.......#',
  '#..#..h.#',
  '#.......#',
  '#.k...#.#',
  '#.......#',
  '#.h.....#',
  '#...@...#',
  '#########',
];
const FONT = { fontFamily: 'sans-serif' };

export class WorldScene extends Phaser.Scene {
  constructor() { super('World'); }

  create(data) {
    this.moving = false;
    this.defeated = this.registry.get('defeated') || new Set();
    this.enemies = [];
    MAP.forEach((row, y) => [...row].forEach((c, x) => {
      const px = x * T + T / 2, py = y * T + T / 2;
      this.add.rectangle(px, py, T, T, 0x1d2b1d).setStrokeStyle(1, 0x223322);
      if (c === '#') this.add.text(px, py, '🌴', { fontSize: '28px' }).setOrigin(0.5);
      if (c === '~') this.add.rectangle(px, py, T, T, 0x1a3355);
      if (c === 'h') this.add.text(px, py, '🛖', { fontSize: '28px' }).setOrigin(0.5);
      if (c === 'k' && !this.defeated.has(`${x},${y}`)) {
        const e = this.add.text(px, py, '👻', { fontSize: '28px' }).setOrigin(0.5);
        this.tweens.add({ targets: e, y: py - 4, yoyo: true, repeat: -1, duration: 700 });
        this.enemies.push({ x, y, sprite: e });
      }
      if (c === '@' && !data?.pos) this.pos = { x, y };
    }));
    if (data?.pos) this.pos = data.pos;
    this.hero = this.add.text(this.pos.x * T + T / 2, this.pos.y * T + T / 2, '🧑', { fontSize: '28px' }).setOrigin(0.5);

    this.hud = this.add.text(352, 528, '', { ...FONT, fontSize: '13px', color: '#fff', align: 'right' }).setOrigin(1, 0);
    this.updateHud();
    this.makeDpad();
    this.keys = this.input.keyboard.addKeys('UP,DOWN,LEFT,RIGHT,W,A,S,D');
    this.held = null;
  }

  updateHud() {
    this.hud.setText(`${player.name}\nHP ${player.hp}/${player.maxHp}  EXP ${player.exp}`);
  }

  makeDpad() {
    const cx = 70, cy = 582, s = 38;
    const dirs = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
    const arrows = { up: '▲', down: '▼', left: '◀', right: '▶' };
    for (const [k, [dx, dy]] of Object.entries(dirs)) {
      const b = this.add.rectangle(cx + dx * s, cy + dy * (s - 8), s - 2, s - 12, 0xffffff, 0.15)
        .setStrokeStyle(2, 0xffffff, 0.4).setInteractive();
      this.add.text(b.x, b.y, arrows[k], { fontSize: '20px', color: '#fff' }).setOrigin(0.5);
      b.on('pointerdown', () => (this.held = [dx, dy]));
      b.on('pointerup', () => (this.held = null));
      b.on('pointerout', () => (this.held = null));
    }
    this.add.text(260, 580, 'เดินไปชนผี\nเพื่อต่อสู้', { ...FONT, fontSize: '14px', color: '#aaa', align: 'center' }).setOrigin(0.5, 0);
  }

  update() {
    if (this.moving) return;
    const k = this.keys;
    let d = this.held;
    if (k.UP.isDown || k.W.isDown) d = [0, -1];
    else if (k.DOWN.isDown || k.S.isDown) d = [0, 1];
    else if (k.LEFT.isDown || k.A.isDown) d = [-1, 0];
    else if (k.RIGHT.isDown || k.D.isDown) d = [1, 0];
    if (d) this.tryMove(d[0], d[1]);
  }

  tryMove(dx, dy) {
    const nx = this.pos.x + dx, ny = this.pos.y + dy;
    const c = MAP[ny]?.[nx];
    if (!c || '#~h'.includes(c)) return;
    this.moving = true;
    this.pos = { x: nx, y: ny };
    this.tweens.add({
      targets: this.hero, x: nx * T + T / 2, y: ny * T + T / 2, duration: 140,
      onComplete: () => {
        this.moving = false;
        const e = this.enemies.find(e => e.x === nx && e.y === ny);
        if (e) {
          this.held = null;
          this.cameras.main.flash(250, 255, 0, 80);
          this.time.delayedCall(260, () => this.scene.start('Battle', { monster: 'krasue', key: `${nx},${ny}`, pos: this.pos }));
        }
      },
    });
  }
}
