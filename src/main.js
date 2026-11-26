import Phaser from 'phaser';
import { BattleScene } from './scenes/BattleScene.js';

// Map (WorldScene) is kept in the repo but not loaded yet — focusing on combat first.
new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#0b0b1a',
  pixelArt: true,
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: 360, height: 640 },
  scene: [BattleScene],
});
