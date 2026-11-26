import Phaser from 'phaser';
import { ZOOM, setupCamera } from '../display.js';
import { unlockAudio, play } from '../audio/sfx.js';

const FONT = { fontFamily: 'sans-serif', color: '#fff', resolution: ZOOM };

// Tap-to-start screen: also unlocks audio on iOS.
export class TitleScene extends Phaser.Scene {
  constructor() { super('Title'); }
  create() {
    setupCamera(this);
    this.add.text(180, 250, 'ตำนานผีไทย', { ...FONT, fontSize: '40px', fontStyle: 'bold', color: '#ff5577' }).setOrigin(0.5);
    const t = this.add.text(180, 360, 'แตะเพื่อเริ่ม', { ...FONT, fontSize: '22px' }).setOrigin(0.5);
    this.tweens.add({ targets: t, alpha: 0.3, yoyo: true, repeat: -1, duration: 700 });
    this.input.once('pointerdown', () => {
      unlockAudio();
      play('click');
      this.scene.start('Battle');
    });
  }
}
