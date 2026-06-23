export function formatGold(amount) {
  if (amount == null) return '—';
  return amount.toLocaleString() + 'g';
}

export function formatTime(hours) {
  if (hours < 24) return `${hours}h`;
  const days = Math.round(hours / 16 * 10) / 10;
  return `${days}d`;
}

export function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getSeasonEmoji(season) {
  const map = { spring: '🌸', summer: '☀️', fall: '🍂', winter: '❄️' };
  return map[season.toLowerCase()] || '';
}

export function getCategoryColor(category) {
  const map = {
    crops: 'green',
    fish: 'blue',
    forage: 'gold',
    minerals: 'purple',
    artifacts: 'brown',
    recipe: 'red',
    food: 'gold',
    tool: 'blue',
  };
  return map[category] || 'green';
}

export function getRarityStars(rarity) {
  const map = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };
  return '⭐'.repeat(map[rarity] || 1);
}

export function createElement(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  for (const [key, val] of Object.entries(attrs)) {
    if (key === 'className') el.className = val;
    else if (key.startsWith('data-')) el.setAttribute(key, val);
    else if (key === 'style' && typeof val === 'object') Object.assign(el.style, val);
    else el[key] = val;
  }
  for (const child of children) {
    if (typeof child === 'string') el.appendChild(document.createTextNode(child));
    else el.appendChild(child);
  }
  return el;
}

export function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export function getPriorityColor(p) {
  const colors = { '🔴': '#d94040', '🟡': '#f0c040', '🟢': '#5fa83a' };
  return colors[p] || '#666';
}

export function getPriorityLabel(p) {
  const labels = { '🔴': 'High Priority', '🟡': 'Medium Priority', '🟢': 'Nice to Know' };
  return labels[p] || '';
}

export function renderPriorityBadge(p) {
  return `<span style="display:inline-flex;align-items:center;gap:2px;font-size:0.65rem;font-weight:700;color:${getPriorityColor(p)}">${p} ${getPriorityLabel(p)}</span>`;
}

export function getPhaseColor(phaseId) {
  const colors = { early: '#5fa83a', mid: '#f0c040', end: '#d94040' };
  return colors[phaseId] || '#666';
}

export function getSeasonName(emoji) {
  const names = { '🌸': 'Spring', '☀': 'Summer', '🍂': 'Fall', '❄': 'Winter', '🌿': 'Greenhouse' };
  return names[emoji] || '';
}

export function formatGoldCompact(amount) {
  if (amount == null) return '—';
  if (amount >= 1000000) return (amount / 1000000).toFixed(1) + 'M';
  if (amount >= 1000) return (amount / 1000).toFixed(1) + 'K';
  return amount + 'g';
}
