const STORAGE_PREFIX = 'sdv-progress-';

export function initChecklists() {
  document.querySelectorAll('.checklist').forEach(list => {
    const checkboxes = list.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
      const key = STORAGE_PREFIX + cb.id;
      const saved = localStorage.getItem(key);
      if (saved === 'true') {
        cb.checked = true;
        cb.closest('.checklist-item')?.classList.add('checked');
      }

      cb.addEventListener('change', () => {
        localStorage.setItem(STORAGE_PREFIX + cb.id, cb.checked);
        cb.closest('.checklist-item')?.classList.toggle('checked', cb.checked);
        updateProgress(list);
      });
    });
    updateProgress(list);
  });
}

function updateProgress(list) {
  const all = list.querySelectorAll('input[type="checkbox"]');
  const checked = list.querySelectorAll('input[type="checkbox"]:checked');
  const pct = all.length > 0 ? Math.round((checked.length / all.length) * 100) : 0;

  const bar = list.closest('[data-progress]')?.querySelector('.progress-bar-fill');
  if (bar) {
    bar.style.width = pct + '%';
  }

  const label = list.closest('[data-progress]')?.querySelector('.progress-label');
  if (label) {
    label.textContent = `${checked.length}/${all.length} (${pct}%)`;
  }
}

export function resetChecklist(listId) {
  const list = document.getElementById(listId);
  if (!list) return;
  list.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
    localStorage.removeItem(STORAGE_PREFIX + cb.id);
    cb.closest('.checklist-item')?.classList.remove('checked');
  });
  updateProgress(list);
}
