import Phaser from 'phaser';
import '@fontsource/kanit/thai-400.css';
import '@fontsource/kanit/thai-700.css';
import '@fontsource/kanit/latin-400.css';
import '@fontsource/kanit/latin-700.css';

import { TitleScene } from './scenes/TitleScene.js';
import { BattleScene } from './scenes/BattleScene.js';
import { StoryScene } from './scenes/StoryScene.js';
import { W, H, ZOOM } from './display.js';

// Map (WorldScene) is kept in the repo but not loaded yet — focusing on combat first.
// Wait for web fonts so Phaser text renders with the right font.
const fontLoads = ['400 16px "Kanit"', '700 16px "Kanit"'].map(spec => document.fonts.load(spec, 'กขค123'));
Promise.all(fontLoads).catch(() => {}).then(() => new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#0b0b1a',
  antialias: true,
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: W * ZOOM, height: H * ZOOM },
  scene: [TitleScene, StoryScene, BattleScene],
}));
