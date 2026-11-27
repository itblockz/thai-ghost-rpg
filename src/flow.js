import { STAGES, STARTING_TEAM, ENEMIES } from './data/units.js';
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
  scene.registry.set('seen', []);
  scene.registry.set('bench', []);
  scene.scene.start('Story', { keys: ['intro'], next: { scene: 'Map' } });
}

export function continueGame(scene) {
  const p = loadProgress();
  if (!p) return startNewGame(scene);
  scene.registry.set('team', p.team);
  scene.registry.set('cleared', Math.min(p.cleared, STAGES.length));
  scene.registry.set('bag', p.bag);
  scene.registry.set('gear', p.gear);
  scene.registry.set('bench', p.bench);
  // saves from before the ??? system: foes of stages already cleared count as known
  const known = new Set(p.seen);
  STAGES.slice(0, p.cleared).forEach(s => s.enemies.forEach(id => ENEMIES[id].skills.forEach(k => known.add(k))));
  scene.registry.set('seen', [...known]);
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

// Who actually goes into battle: the team minus anyone told to sit out (always at least one).
// Fewer fighters = shorter rounds, handy when farming an easy stage.
export function fightingTeam(scene) {
  const bench = new Set(scene.registry.get('bench') || []);
  const team = currentTeam(scene).slice(0, 3);
  const going = team.filter(id => !bench.has(id));
  return going.length ? going : team.slice(0, 1);
}
