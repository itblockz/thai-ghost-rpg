// Progress kept in this browser: how many stages are cleared and who is in the team.
// Every access is guarded — private mode or blocked storage just means "no save".
const KEY = 'himmapan-save-v1';

export function saveProgress(cleared, team) {
  try { localStorage.setItem(KEY, JSON.stringify({ cleared, team })); } catch { /* ignore */ }
}

export function loadProgress() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (!s || !Array.isArray(s.team)) return null;
    // older saves stored the stage you were up to; that equals stages cleared
    const cleared = Number.isInteger(s.cleared) ? s.cleared : Number.isInteger(s.stage) ? s.stage : null;
    return cleared == null ? null : { cleared, team: s.team };
  } catch { return null; }
}

export function clearProgress() {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
}
