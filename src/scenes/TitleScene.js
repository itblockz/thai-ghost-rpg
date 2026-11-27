import Phaser from 'phaser';
import { ZOOM, setupCamera, pixelBob, stepped, idleFrames, PX, BG_PX, FONT_FAMILY, TEXT_METRICS } from '../display.js';
import { registerSprites, pixelOval } from '../art/sprites.js';
import { unlockAudio, play } from '../audio/sfx.js';
import { startNewGame, continueGame } from '../flow.js';
import { loadProgress } from '../save.js';

const FONT = { fontFamily: FONT_FAMILY, color: '#fff', resolution: ZOOM, ...TEXT_METRICS };

// Tap-to-start screen: also unlocks audio on iOS.
export class TitleScene extends Phaser.Scene {
  constructor() { super('Title'); }
  create() {
    setupCamera(this);
    registerSprites(this);
    this.add.image(180, 0, 'art_gate').setOrigin(0.5, 0).setScale(BG_PX);
    // the crack breathes
    const glow = this.add.image(180, 405, pixelOval(this, 24, 78)).setScale(BG_PX).setTint(0xb090ff).setAlpha(0.2).setBlendMode(Phaser.BlendModes.ADD);
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
    // the heir, a silhouette facing the gate
    const heir = this.add.image(180, 572, 'heir').setScale(PX).setTintFill(0x05030a);
    idleFrames(this, heir, 'heir');
    this.add.text(180, 52, 'ประตูหิมพานต์', { ...FONT, fontSize: '40px', fontStyle: 'bold', color: '#ff5577', stroke: '#000', strokeThickness: 6 }).setOrigin(0.5);
    this.add.text(180, 92, 'บรรพที่ ๑ — คืนเดือนดับ', { ...FONT, fontSize: '17px', color: '#ccccee', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
    const saved = loadProgress();
    const go = fn => () => { unlockAudio(); play('click'); fn(this); };
    if (!saved) {
      const t = this.add.text(180, 618, 'แตะเพื่อเริ่มเดินทาง', { ...FONT, fontSize: '20px', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
      this.tweens.add({ targets: t, alpha: 0.3, yoyo: true, repeat: -1, duration: 700, ease: 'Sine.inOut' });
      this.input.once('pointerdown', go(startNewGame));
      return;
    }
    // a journey is saved: continue it, or start over
    this.button(180, 560, 300, 56, 'เดินทางต่อ', 0x3d3d5e, 0xffdd55, go(continueGame));
    this.button(180, 616, 300, 40, 'เริ่มใหม่', 0x1e1e2a, 0x55557a, go(startNewGame), '15px');
  }

  button(x, y, w, h, label, fill, border, onTap, size = '19px') {
    const g = this.add.graphics(), u = PX, l = x - w / 2, t = y - h / 2;
    g.fillStyle(0x000000).fillRect(l + u, t, w - 2 * u, h).fillRect(l, t + u, w, h - 2 * u);
    g.fillStyle(border).fillRect(l + 2 * u, t + u, w - 4 * u, h - 2 * u).fillRect(l + u, t + 2 * u, w - 2 * u, h - 4 * u);
    g.fillStyle(fill).fillRect(l + 2 * u, t + 2 * u, w - 4 * u, h - 4 * u);
    this.add.text(x, y, label, { ...FONT, fontSize: size, fontStyle: 'bold' }).setOrigin(0.5);
    this.add.zone(x, y, w, h).setInteractive({ useHandCursor: true }).once('pointerdown', onTap);
  }
}
