import { STAGES, STARTING_TEAM } from './data/units.js';
import { loadProgress, clearProgress } from './save.js';

// Journey flow: Title → intro → (story before → prep → fight → story after) per stage → Title.

export function startNewGame(scene) {
  clearProgress();
  scene.registry.set('team', []);
  scene.scene.start('Story', { keys: ['intro', STAGES[0].before], next: { scene: 'Prep', data: { stage: 0 } } });
}

// After winning stage i: its "after" story, then the next stage's "before" story, then the fight.
export function afterVictory(scene, i) {
  const next = STAGES[i + 1];
  if (next) scene.scene.start('Story', { keys: [STAGES[i].after, next.before], next: { scene: 'Prep', data: { stage: i + 1 } } });
  else { clearProgress(); scene.scene.start('Story', { keys: [STAGES[i].after], next: { scene: 'Title' } }); }
}

export function currentTeam(scene) {
  const team = scene.registry.get('team');
  return team && team.length ? team : [...STARTING_TEAM];
}

// Pick up where the saved journey left off: straight to that fight's prep screen.
export function continueGame(scene) {
  const p = loadProgress();
  if (!p || !STAGES[p.stage]) return startNewGame(scene);
  scene.registry.set('team', p.team);
  scene.scene.start('Prep', { stage: p.stage });
}
