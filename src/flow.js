import { STAGES, STARTING_TEAM } from './data/units.js';
import { loadProgress, clearProgress } from './save.js';

// Journey flow: Title → intro story → Map. From the map:
//   a new stage:     its "before" story → Prep → Battle → its "after" story → Map
//   a cleared stage: Prep → Battle → Map (replay; no story, no new retainers)

export function startNewGame(scene) {
  clearProgress();
  scene.registry.set('team', []);
  scene.registry.set('cleared', 0);
  scene.registry.set('bag', []);
  scene.registry.set('gear', {});
  scene.scene.start('Story', { keys: ['intro'], next: { scene: 'Map' } });
}

export function continueGame(scene) {
  const p = loadProgress();
  if (!p) return startNewGame(scene);
  scene.registry.set('team', p.team);
  scene.registry.set('cleared', Math.min(p.cleared, STAGES.length));
  scene.registry.set('bag', p.bag);
  scene.registry.set('gear', p.gear);
  scene.scene.start('Map');
}

export function cleared(scene) { return scene.registry.get('cleared') || 0; }

export function playStage(scene, i) {
  const first = i >= cleared(scene);
  if (first) scene.scene.start('Story', { keys: [STAGES[i].before], next: { scene: 'Prep', data: { stage: i, first } } });
  else scene.scene.start('Prep', { stage: i, first });
}

export function afterVictory(scene, i, first) {
  if (!first) return scene.scene.start('Map');
  scene.registry.set('cleared', Math.max(cleared(scene), i + 1));
  scene.scene.start('Story', { keys: [STAGES[i].after], next: { scene: 'Map', data: { arrived: i } } });
}

export function currentTeam(scene) {
  const team = scene.registry.get('team');
  return team && team.length ? team : [...STARTING_TEAM];
}
