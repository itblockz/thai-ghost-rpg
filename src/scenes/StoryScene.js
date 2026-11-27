import Phaser from 'phaser';
import { ZOOM, setupCamera, FONT_FAMILY, TEXT_METRICS } from '../display.js';
import { registerSprites } from '../art/sprites.js';
import { STORY } from '../data/story.js';
import { ALLIES } from '../data/units.js';
import { play } from '../audio/sfx.js';

const FONT = { fontFamily: FONT_FAMILY, color: '#fff', resolution: ZOOM, ...TEXT_METRICS };
const CHAR_MS = 35;

// Picture-book pages: art on top, typewriter text below. Tap = finish text / next page.
export class StoryScene extends Phaser.Scene {
  constructor() { super('Story'); }

  create(data) {
    setupCamera(this);
    registerSprites(this);
    this.pages = data.keys.flatMap(k => STORY[k] || []);
    this.next = data.next;
    this.i = -1;

    this.add.rectangle(180, 320, 360, 640, 0x07060f);
    this.art = this.add.image(180, 210, 'bg_night');
    this.frame = this.add.graphics();
    this.text = this.add.text(180, 470, '', { ...FONT, fontSize: '19px', align: 'center', lineSpacing: 6, wordWrap: { width: 310 } }).setOrigin(0.5, 0);
    this.gift = this.add.text(180, 430, '', { ...FONT, fontSize: '15px', color: '#ffe066' }).setOrigin(0.5);
    this.more = this.add.text(330, 610, '▼', { ...FONT, fontSize: '16px', color: '#9999bb' }).setOrigin(0.5);
    this.tweens.add({ targets: this.more, y: 616, yoyo: true, repeat: -1, duration: 400, ease: 'Stepped', easeParams: [1] });

    this.input.on('pointerdown', () => this.tap());
    this.showPage(0);
  }

  tap() {
    if (this.typing) { this.finishTyping(); return; }
    play('click');
    this.showPage(this.i + 1);
  }

  showPage(i) {
    if (i >= this.pages.length) return this.done();
    this.i = i;
    const page = this.pages[i];

    // art
    this.frame.clear();
    if (page.art) {
      const tex = this.textures.get(page.art).getSourceImage();
      const wide = tex.width >= 60;
      const scale = wide ? 340 / tex.width : Math.min(14, 200 / tex.height);
      this.tweens.killTweensOf(this.art);
      this.art.setTexture(page.art).setScale(scale).setVisible(true).setAlpha(0).setY(210);
      this.tweens.add({ targets: this.art, alpha: 1, duration: 400, ease: 'Stepped', easeParams: [3], onComplete: () => {
        // gentle life: figures float, scenes flicker like lamplight
        if (wide) this.tweens.add({ targets: this.art, alpha: 0.82, yoyo: true, repeat: -1, duration: 1300, ease: 'Stepped', easeParams: [2] });
        else this.tweens.add({ targets: this.art, y: 200, yoyo: true, repeat: -1, duration: 1100, ease: 'Stepped', easeParams: [2] });
      } });
      if (wide) {
        const h = tex.height * scale;
        this.frame.lineStyle(4, 0x55557a).strokeRect(180 - 172, 210 - h / 2 - 2, 344, h + 4);
      }
    } else {
      this.art.setVisible(false);
    }

    // new retainer
    this.gift.setText('');
    if (page.recruit) {
      const team = this.registry.get('team') || [];
      if (!team.includes(page.recruit)) this.registry.set('team', [...team, page.recruit]);
      this.gift.setText(`ได้บริวาร: ${ALLIES[page.recruit].name}`);
      play('ward');
    }

    // typewriter text
    this.full = page.text;
    this.shown = 0;
    this.text.setText('');
    this.more.setVisible(false);
    this.typing = this.time.addEvent({
      delay: CHAR_MS, repeat: this.full.length - 1,
      callback: () => {
        this.shown++;
        this.text.setText(this.full.slice(0, this.shown));
        if (this.shown >= this.full.length) this.finishTyping();
      },
    });
  }

  finishTyping() {
    if (this.typing) { this.typing.remove(); this.typing = null; }
    this.text.setText(this.full);
    this.more.setVisible(true);
  }

  done() {
    this.input.removeAllListeners();
    this.scene.start(this.next.scene, this.next.data);
  }
}
