import Phaser from 'phaser';
import { ZOOM, setupCamera, FONT_FAMILY, TEXT_METRICS } from '../display.js';
import { registerSprites } from '../art/sprites.js';
import { unlockAudio, play } from '../audio/sfx.js';
import { startNewGame } from '../flow.js';

const FONT = { fontFamily: FONT_FAMILY, color: '#fff', resolution: ZOOM, ...TEXT_METRICS };

// Tap-to-start screen: also unlocks audio on iOS.
export class TitleScene extends Phaser.Scene {
  constructor() { super('Title'); }
  create() {
    setupCamera(this);
    registerSprites(this);
    this.add.image(180, 0, 'art_gate').setOrigin(0.5, 0).setScale(4);
    // the crack breathes
    const glow = this.add.image(180, 405, 'px_disc').setScale(4, 13).setTint(0xb090ff).setAlpha(0.2).setBlendMode(Phaser.BlendModes.ADD);
    this.tweens.add({ targets: glow, alpha: 0.06, yoyo: true, repeat: -1, duration: 1400, ease: 'Sine.inOut' });
    // things slipping out through the gap
    const ghost = (key, x, y, sc, a, d) => {
      const g = this.add.image(x, y, key).setScale(sc).setAlpha(a).setTint(0xb8a0ff);
      this.tweens.add({ targets: g, y: y - 10, alpha: a * 0.5, yoyo: true, repeat: -1, duration: d, ease: 'Sine.inOut' });
    };
    ghost('krasue', 312, 320, 4, 0.85, 1700);
    ghost('kongkoi', 46, 450, 4, 0.8, 1300);
    // the heir's companion, seen from behind as a silhouette, facing the gate
    this.add.image(180, 572, 'kumarn').setScale(4).setTintFill(0x05030a);
    this.add.text(180, 52, 'ประตูหิมพานต์', { ...FONT, fontSize: '40px', fontStyle: 'bold', color: '#ff5577', stroke: '#000', strokeThickness: 6 }).setOrigin(0.5);
    this.add.text(180, 92, 'บทที่ ๑ — คืนเดือนดับ', { ...FONT, fontSize: '17px', color: '#ccccee', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
    const t = this.add.text(180, 618, 'แตะเพื่อเริ่มเดินทาง', { ...FONT, fontSize: '20px', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
    this.tweens.add({ targets: t, alpha: 0.3, yoyo: true, repeat: -1, duration: 700, ease: 'Sine.inOut' });
    this.input.once('pointerdown', () => {
      unlockAudio();
      play('click');
      startNewGame(this);
    });
  }
}
