// Progress kept in this browser: which fight you are up to and who is in your team.
// Every access is guarded — private mode or blocked storage just means "no save".
const KEY = 'himmapan-save-v1';

export function saveProgress(stage, team) {
  try { localStorage.setItem(KEY, JSON.stringify({ stage, team })); } catch { /* ignore */ }
}

export function loadProgress() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    return s && Number.isInteger(s.stage) && Array.isArray(s.team) ? s : null;
  } catch { return null; }
}

export function clearProgress() {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
}
