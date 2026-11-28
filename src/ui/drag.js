import { PX } from '../display.js';
import { play } from '../audio/sfx.js';

// Drag-and-drop as a shortcut on top of tapping: a zone can be tapped (tap fires on release, if it was
// not dragged) or dragged a little way to lift a copy of its picture. While dragging, every place it
// may land glows gold; let go over one and onDrop runs, anywhere else the copy slides home and nothing
// changes. Nothing that loses things for good (ปลุกเสก, ทิ้ง) is ever done by dragging.
//
// opts: { key: texture to lift, tap(), targets(): [{ x, y, w, h, drop() }] }
export function tapOrDrag(scene, zone, opts) {
  scene.input.dragDistanceThreshold = 12;
  zone.setInteractive({ useHandCursor: true, draggable: true });
  let dragging = false, ghost = null, glow = null, list = [];
  zone.on('pointerup', () => { if (!dragging) opts.tap?.(); });
  zone.on('dragstart', p => {
    dragging = true;
    list = opts.targets();
    play('click');
    ghost = scene.add.image(p.worldX, p.worldY, opts.key).setScale(PX).setAlpha(0.85).setDepth(30);
    glow = scene.add.graphics().setDepth(29);
    glow.lineStyle(PX, 0xffdd55);
    list.forEach(t => glow.strokeRect(t.x - t.w / 2, t.y - t.h / 2, t.w, t.h));
  });
  zone.on('drag', p => ghost?.setPosition(p.worldX, p.worldY));
  zone.on('dragend', p => {
    const hit = list.find(t => Math.abs(p.worldX - t.x) <= t.w / 2 && Math.abs(p.worldY - t.y) <= t.h / 2);
    glow?.destroy(); glow = null;
    const g = ghost; ghost = null;
    // reset after this release has been seen by pointerup (so it is not also taken as a tap)
    scene.time.delayedCall(0, () => { dragging = false; });
    if (hit) { g?.destroy(); hit.drop(); return; }
    if (g) scene.tweens.add({ targets: g, x: zone.x, y: zone.y, alpha: 0, duration: 180, onComplete: () => g.destroy() });
  });
  return zone;
}
