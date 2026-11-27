// Progress kept in this browser: stages cleared, the team, and charms (bag + who wears what).
// Every access is guarded — private mode or blocked storage just means "no save".
const KEY = 'himmapan-save-v1';

export function saveProgress(cleared, team, bag = [], gear = {}, seen = [], bench = [], exp = {}, offer = {}) {
  try { localStorage.setItem(KEY, JSON.stringify({ cleared, team, bag, gear, seen, bench, exp, offer })); } catch { /* ignore */ }
}

// Save everything the game keeps in its registry.
export function saveFrom(scene) {
  const r = scene.registry;
  saveProgress(r.get('cleared') || 0, r.get('team') || [], r.get('bag') || [], r.get('gear') || {}, r.get('seen') || [], r.get('bench') || [], r.get('exp') || {}, r.get('offer') || {});
}

export function loadProgress() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (!s || !Array.isArray(s.team)) return null;
    // older saves stored the stage you were up to; that equals stages cleared
    const cleared = Number.isInteger(s.cleared) ? s.cleared : Number.isInteger(s.stage) ? s.stage : null;
    return cleared == null ? null : { cleared, team: s.team, bag: Array.isArray(s.bag) ? s.bag : [], gear: s.gear || {}, seen: Array.isArray(s.seen) ? s.seen : [], bench: Array.isArray(s.bench) ? s.bench : [], exp: s.exp || {}, offer: s.offer || {} };
  } catch { return null; }
}

export function clearProgress() {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
}
