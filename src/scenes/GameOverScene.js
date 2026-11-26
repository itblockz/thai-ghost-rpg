import Phaser from 'phaser';
import { resetPlayer } from '../state.js';

export class GameOverScene extends Phaser.Scene {
  constructor() { super('GameOver'); }
  create() {
    this.add.text(180, 260, 'คุณถูกผีหลอกตาย...', { fontFamily: 'sans-serif', fontSize: '24px', color: '#ff5577' }).setOrigin(0.5);
    const t = this.add.text(180, 340, '[ แตะเพื่อเริ่มใหม่ ]', { fontFamily: 'sans-serif', fontSize: '18px', color: '#fff' }).setOrigin(0.5);
    this.tweens.add({ targets: t, alpha: 0.3, yoyo: true, repeat: -1, duration: 600 });
    this.input.once('pointerdown', () => {
      resetPlayer();
      this.registry.set('defeated', new Set());
      this.scene.start('World');
    });
  }
}
