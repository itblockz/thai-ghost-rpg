import Phaser from 'phaser';
import { ZOOM, setupCamera, FONT_FAMILY } from '../display.js';
import { registerSprites } from '../art/sprites.js';
import { unlockAudio, play } from '../audio/sfx.js';

const FONT = { fontFamily: FONT_FAMILY, color: '#fff', resolution: ZOOM };

// Tap-to-start screen: also unlocks audio on iOS.
export class TitleScene extends Phaser.Scene {
  constructor() { super('Title'); }
  create() {
    setupCamera(this);
    registerSprites(this);
    this.add.image(180, 0, 'bg_night').setOrigin(0.5, 0).setScale(4);
    this.add.image(180, 450, 'kongkoi').setScale(6).setAlpha(0.5);
    this.add.text(180, 250, 'ตำราปราบผี', { ...FONT, fontSize: '40px', fontStyle: 'bold', color: '#ff5577', stroke: '#000', strokeThickness: 6 }).setOrigin(0.5);
    const t = this.add.text(180, 360, 'แตะเพื่อเปิดตำรา', { ...FONT, fontSize: '22px', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
    this.tweens.add({ targets: t, alpha: 0.3, yoyo: true, repeat: -1, duration: 700 });
    this.input.once('pointerdown', () => {
      unlockAudio();
      play('click');
      this.scene.start('Battle');
    });
  }
}
