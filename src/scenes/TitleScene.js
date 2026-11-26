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
    this.add.image(180, 0, 'bg_night').setOrigin(0.5, 0).setScale(4);
    this.add.image(130, 470, 'kumarn').setScale(5).setAlpha(0.7);
    this.add.image(240, 460, 'krasue').setScale(5).setAlpha(0.45);
    this.add.text(180, 300, 'บทที่ ๑ — คืนเดือนดับ', { ...FONT, fontSize: '17px', color: '#ccccee', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
    this.add.text(180, 250, 'ประตูหิมพานต์', { ...FONT, fontSize: '40px', fontStyle: 'bold', color: '#ff5577', stroke: '#000', strokeThickness: 6 }).setOrigin(0.5);
    const t = this.add.text(180, 380, 'แตะเพื่อเริ่มเดินทาง', { ...FONT, fontSize: '22px', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
    this.tweens.add({ targets: t, alpha: 0.3, yoyo: true, repeat: -1, duration: 700 });
    this.input.once('pointerdown', () => {
      unlockAudio();
      play('click');
      startNewGame(this);
    });
  }
}
