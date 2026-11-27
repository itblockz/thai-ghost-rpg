import { STAGES, STARTING_TEAM } from './data/units.js';

// Journey flow: Title → intro → (story before → prep → fight → story after) per stage → Title.

export function startNewGame(scene) {
  scene.registry.set('team', []);
  scene.scene.start('Story', { keys: ['intro', STAGES[0].before], next: { scene: 'Prep', data: { stage: 0 } } });
}

// After winning stage i: its "after" story, then the next stage's "before" story, then the fight.
export function afterVictory(scene, i) {
  const next = STAGES[i + 1];
  if (next) scene.scene.start('Story', { keys: [STAGES[i].after, next.before], next: { scene: 'Prep', data: { stage: i + 1 } } });
  else scene.scene.start('Story', { keys: [STAGES[i].after], next: { scene: 'Title' } });
}

export function currentTeam(scene) {
  const team = scene.registry.get('team');
  return team && team.length ? team : [...STARTING_TEAM];
}
