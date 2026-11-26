import { STAGES } from './data/monsters.js';
import { STARTING_ITEMS } from './data/items.js';

// Journey flow: Title → intro → (story before → fight → story after) per stage → Title.

export function startNewGame(scene) {
  scene.registry.set('items', [...STARTING_ITEMS]);
  scene.scene.start('Story', { keys: ['intro', STAGES[0].before], next: { scene: 'Battle', data: { stage: 0 } } });
}

// After winning stage i: its "after" story, then the next stage's "before" story, then the fight.
export function afterVictory(scene, i) {
  const next = STAGES[i + 1];
  if (next) scene.scene.start('Story', { keys: [STAGES[i].after, next.before], next: { scene: 'Battle', data: { stage: i + 1 } } });
  else scene.scene.start('Story', { keys: [STAGES[i].after], next: { scene: 'Title' } });
}
