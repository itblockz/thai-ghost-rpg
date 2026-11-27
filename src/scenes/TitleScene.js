import Phaser from 'phaser';
import { ZOOM, setupCamera, pixelBob, stepped, idleFrames, PX, FONT_FAMILY, TEXT_METRICS } from '../display.js';
import { registerSprites, pixelOval } from '../art/sprites.js';
import { unlockAudio, play } from '../audio/sfx.js';
import { startNewGame } from '../flow.js';

const FONT = { fontFamily: FONT_FAMILY, color: '#fff', resolution: ZOOM, ...TEXT_METRICS };

// Tap-to-start screen: also unlocks audio on iOS.
export class TitleScene extends Phaser.Scene {
  constructor() { super('Title'); }
  create() {
    setupCamera(this);
    registerSprites(this);
    this.add.image(180, 0, 'art_gate').setOrigin(0.5, 0).setScale(PX);
    // the crack breathes
    const glow = this.add.image(180, 405, pixelOval(this, 24, 78)).setScale(PX).setTint(0xb090ff).setAlpha(0.2).setBlendMode(Phaser.BlendModes.ADD);
    this.tweens.add({ targets: glow, alpha: 0.06, yoyo: true, repeat: -1, duration: 1400, ...stepped(4) });
    // things slipping out through the gap
    const ghost = (key, x, y, sc, a, d) => {
      const g = this.add.image(x, y, key).setScale(sc).setAlpha(a).setTint(0xb8a0ff);
      pixelBob(this, g, sc, 3, d / 4);
      idleFrames(this, g, key);
      this.tweens.add({ targets: g, alpha: a * 0.5, yoyo: true, repeat: -1, duration: d, ...stepped(4) });
    };
    ghost('krasue', 300, 330, PX, 0.85, 1700);
    ghost('kongkoi', 50, 450, PX, 0.8, 1300);
    // the heir's companion, seen from behind as a silhouette, facing the gate
    const heir = this.add.image(180, 572, 'kumarn').setScale(PX).setTintFill(0x05030a);
    idleFrames(this, heir, 'kumarn');
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
