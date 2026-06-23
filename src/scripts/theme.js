export function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('sdv-theme') || 'light';
  document.documentElement.setAttribute('data-theme', stored);
  toggle.textContent = stored === 'dark' ? '🌙' : '☀️';

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('sdv-theme', next);
    toggle.textContent = next === 'dark' ? '🌙' : '☀️';
  });
}
