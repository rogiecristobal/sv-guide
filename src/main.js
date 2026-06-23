import { initTheme } from './scripts/theme.js';
import { showModal } from './scripts/modal.js';
import { renderAccurateFarm, LAYOUTS, FARM_DEFAULTS } from './scripts/farm-renderer.js';

import professionsData from './data/professions.json';
import monstersData from './data/monsters.json';
import moneyTiersData from './data/money-tiers.json';
import secretsData from './data/secrets.json';
import npcsData from './data/npcs.json';
import itemsData from './data/items.json';
import eventsData from './data/events-data.json';
import cropsData from './data/crops.json';
import bundlesData from './data/bundles.json';
import achievementsData from './data/achievements.json';
import milestonesData from './data/milestones.json';

document.documentElement.setAttribute('data-theme', localStorage.getItem('sdv-theme') || 'light');

let currentLayout = 'early';
let currentFarmType = 'standard';

function getCellSize() {
  const vw = window.innerWidth;
  if (vw < 480) return 8;
  if (vw < 768) return 10;
  if (vw < 1024) return 13;
  return 16;
}

function switchLayout(key) {
  currentLayout = key;
  const layout = LAYOUTS[key];
  if (!layout) return;
  const desc = layout.description + (currentFarmType !== 'standard' ? ' (on ' + currentFarmType + ' terrain)' : '');
  renderAccurateFarm('farmGridContainer', layout, getCellSize());
  document.querySelectorAll('.layout-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.layout === key);
  });
  document.getElementById('layoutName').textContent = layout.name;
  document.getElementById('layoutDesc').textContent = desc;
}

function switchFarmType(key) {
  currentFarmType = key;
  const layout = FARM_DEFAULTS[key] || FARM_DEFAULTS.standard;
  renderAccurateFarm('farmGridContainer', layout, getCellSize());
  document.querySelectorAll('.farmtype-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.farm === key);
  });
  document.getElementById('layoutName').textContent = layout.name;
  document.getElementById('layoutDesc').textContent = layout.description;
  // Deactivate phase buttons when on non-standard farm type
  if (key !== 'standard') {
    document.querySelectorAll('.layout-btn').forEach(b => b.classList.remove('active'));
  } else {
    document.querySelectorAll('.layout-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.layout === currentLayout);
    });
  }
}

function npcImgTag(npc) {
  if (!npc || !npc.img) return '<span class="text-2xl">👤</span>';
  return `<img src="${npc.img}" alt="${npc.name}" class="w-full h-full object-cover" style="border-radius:9px" loading="lazy">`;
}

function fmtBirthday(b) {
  if (!b) return '';
  if (typeof b === 'string') return b;
  const seasons = { spring:'Spring', summer:'Summer', fall:'Fall', winter:'Winter' };
  return (seasons[b.season]||b.season) + ' ' + b.day;
}

function fmtFamily(arr) {
  if (!arr) return '';
  if (Array.isArray(arr)) return arr.join(', ');
  return String(arr);
}

function renderNpcGrid() {
  const grid = document.getElementById('earlyNpcGrid');
  if (!grid) return;
  const earlyNames = ['Pierre','Robin','Clint','Marnie','Willy','Maru','Leah'];
  for (const name of earlyNames) {
    const npc = npcsData.find(x => x.name === name);
    if (!npc) continue;
    const d = document.createElement('div');
    d.className = 'text-center';
    d.innerHTML = `<div class="npc-portrait mx-auto overflow-hidden">${npcImgTag(npc)}</div><p class="text-xs mt-1 font-bold">${npc.name}</p>`;
    grid.appendChild(d);
  }
}

function renderNpcQuickGrid() {
  const container = document.getElementById('npcQuickGrid');
  if (!container) return;
  for (const n of npcsData) {
    const d = document.createElement('div');
    d.className = 'text-center cursor-pointer';
    d.onclick = () => { const el = document.getElementById('npc-'+n.slug); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}); };
    d.innerHTML = `<div class="npc-portrait mx-auto overflow-hidden">${npcImgTag(n)}</div><p class="text-[10px] font-bold mt-1">${n.name}</p><p class="text-[8px] text-[var(--text-muted)]">${fmtBirthday(n.birthday)}</p>`;
    container.appendChild(d);
  }
}

function renderNpcDetails() {
  const container = document.getElementById('npcDetailsContainer');
  if (!container) return;
  for (const n of npcsData) {
    const div = document.createElement('div');
    div.id = 'npc-'+n.slug;
    div.className = 'expandable bg-[var(--bg-card)] rounded-2xl pixel-border mb-3';
    const metaParts = [fmtBirthday(n.birthday)];
    if (n.family && n.family.length) metaParts.push('Family: '+fmtFamily(n.family));
    const meta = metaParts.filter(Boolean).join(' · ');
    div.innerHTML = `
      <button class="expandable-trigger w-full flex items-center justify-between p-4 text-left" onclick="this.parentElement.classList.toggle('open')">
        <span class="flex items-center gap-2">
          <span class="w-10 h-10 rounded-xl overflow-hidden border-2 border-[#5c3d2e] flex-shrink-0 inline-block">${npcImgTag(n)}</span>
          <span class="heading-fredoka text-lg">${n.name}</span>
          ${meta ? '<span class="text-xs text-[var(--text-muted)] hidden sm:inline">'+meta+'</span>' : ''}
        </span>
        <span class="expandable-arrow text-xl">▼</span>
      </button>
      <div class="expandable-content px-4 pb-4">
        <p class="text-xs text-[var(--text-secondary)] mb-3">${n.bio||''}</p>
        <div class="grid md:grid-cols-2 gap-4 text-xs">
          <div>${n.gifts?.love?.length ? '<p class="font-bold text-red-500 mb-1">❤️ Loves</p>'+n.gifts.love.map(g=>'<span class="inline-block bg-red-50 dark:bg-red-900/30 px-2 py-0.5 rounded mr-1 mb-1">'+g+'</span>').join('') : ''}</div>
          <div>${n.gifts?.like?.length ? '<p class="font-bold text-green-500 mb-1">👍 Likes</p>'+n.gifts.like.map(g=>'<span class="inline-block bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded mr-1 mb-1">'+g+'</span>').join('') : ''}</div>
          <div>${n.gifts?.neutral?.length ? '<p class="font-bold text-gray-500 mb-1">😐 Neutral</p>'+n.gifts.neutral.map(g=>'<span class="inline-block bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded mr-1 mb-1">'+g+'</span>').join('') : ''}</div>
          <div>${n.gifts?.dislike?.length ? '<p class="font-bold text-orange-500 mb-1">👎 Dislikes</p>'+n.gifts.dislike.map(g=>'<span class="inline-block bg-orange-50 dark:bg-orange-900/30 px-2 py-0.5 rounded mr-1 mb-1">'+g+'</span>').join('') : ''}</div>
          <div class="md:col-span-2">${n.gifts?.hate?.length ? '<p class="font-bold text-red-700 mb-1">💀 Hates</p>'+n.gifts.hate.map(g=>'<span class="inline-block bg-red-100 dark:bg-red-900/50 px-2 py-0.5 rounded mr-1 mb-1">'+g+'</span>').join('') : ''}</div>
        </div>
      </div>`;
    container.appendChild(div);
  }
}

function renderEvents() {
  const container = document.getElementById('eventsContainer');
  if (!container) return;
  const seasonColors = { '🌸 Spring':'#5fa83a', '☀ Summer':'#e07820', '🍂 Fall':'#c05020', '❄ Winter':'#4488bb' };
  const seasons = ['🌸 Spring','☀ Summer','🍂 Fall','❄ Winter'];
  for (const s of seasons) {
    const sc = seasonColors[s];
    const evs = eventsData.filter(e => e.season === s);
    if (!evs.length) continue;
    let html = `<div class="mb-5"><div class="font-bold text-sm mb-2" style="color:${sc}">${s}</div>`;
    for (const ev of evs) {
      html += `<div class="bg-[var(--bg-card)] rounded-xl p-4 pixel-border-sm mb-2 flex gap-3 items-start">
        <span class="text-2xl shrink-0">${ev.emoji}</span>
        <div><div class="font-bold text-sm">${ev.name}</div>
        <div class="text-xs" style="color:${sc}">📅 ${ev.date} · 📍 ${ev.where}</div>
        <div class="text-xs text-[var(--text-secondary)] mt-1">${ev.tips}</div></div></div>`;
    }
    html += '</div>';
    container.innerHTML += html;
  }
}

function renderCrops() {
  const container = document.getElementById('cropsContainer');
  if (!container) return;
  const seasonEmojis = ['🌸','☀','🍂','🌿'];
  const seasonLabels = ['Spring','Summer','Fall','Greenhouse'];
  for (let si = 0; si < seasonEmojis.length; si++) {
    const s = seasonEmojis[si];
    const filtered = cropsData.filter(c => c.season === s);
    if (!filtered.length) continue;
    let html = `<div class="mb-4"><div class="font-bold text-sm mb-2">${seasonLabels[si]}</div><div class="space-y-1">`;
    for (const c of filtered) {
      html += `<div class="flex justify-between items-center bg-[var(--bg-card)] rounded-lg px-3 py-2 pixel-border-sm text-xs">
        <div><span class="font-bold">${c.name}</span><span class="text-[var(--text-muted)] ml-2">💰 ${typeof c.cost === 'number' ? c.cost+'g' : c.cost} · ⏱ ${c.days}d${c.regrow ? ' (+'+c.regrow+'d regrow)' : ''}</span></div>
        <div class="text-right"><div class="font-bold text-gold">${typeof c.sellBase === 'number' ? c.sellBase+'g' : c.sellBase}</div><div class="text-[10px] text-[var(--text-muted)]">base</div></div></div>`;
    }
    html += '</div></div>';
    container.innerHTML += html;
  }
  container.innerHTML += `<div class="bg-[var(--bg-card)] rounded-xl p-4 pixel-border-sm mt-3 text-xs">
    <div class="font-bold text-gold mb-1">💡 Profit Formula</div>
    <p class="text-[var(--text-secondary)]">Profit = (Sell Price − Seed Cost) × Harvests per Season<br>
    Regrow crops = (Season Days ÷ Regrow Days) × Sell Price<br>
    <strong>Wine multiplier:</strong> Wine ≈ 3× base. With Artisan: ×4.2 vs raw crop.</p></div>`;
}

function renderBundles() {
  const container = document.getElementById('bundlesContainer');
  if (!container) return;
  const rooms = [...new Set(bundlesData.map(b => b.room))];
  let html = '';
  for (const room of rooms) {
    const items = bundlesData.filter(b => b.room === room);
    html += `<div class="mb-4"><div class="font-bold text-sm mb-2">🏛️ ${room}</div>`;
    for (const b of items) {
      html += `<div class="bg-[var(--bg-card)] rounded-lg px-3 py-2 pixel-border-sm mb-2 text-xs">
        <div class="font-bold">${b.name}</div>
        <div class="text-[var(--text-secondary)]">${b.items.map(i => i.item + (i.qty > 1 ? ' ×'+i.qty : '')).join(', ')}</div>
        <div class="text-green-600 text-[10px]">🎁 Reward: ${b.reward}</div></div>`;
    }
    html += '</div>';
  }
  container.innerHTML = html;
}

function renderMoneyTiers(targetId) {
  const container = document.getElementById(targetId);
  if (!container) return;
  let html = '';
  for (const tier of moneyTiersData) {
    html += `<div class="mb-4"><div class="flex items-center gap-2 mb-2">
      <div class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm text-black" style="background:${tier.color}">${tier.tier}</div>
      <span class="text-xs font-bold" style="color:${tier.color}">${tier.sub}</span></div>`;
    for (const item of tier.items) {
      html += `<div class="bg-[var(--bg-card)] rounded-lg px-3 py-2 pixel-border-sm mb-1 text-xs flex gap-2 items-start">
        <span class="text-lg">${item.emoji}</span>
        <div><div class="font-bold">${item.n}</div><div class="text-[var(--text-secondary)]">${item.d}</div></div></div>`;
    }
    html += '</div>';
  }
  container.innerHTML = html;
}

function renderSecrets() {
  const container = document.getElementById('secretsContainer');
  if (!container) return;
  container.innerHTML = secretsData.secrets.map(s => `
    <div class="bg-[var(--bg-card)] rounded-lg px-3 py-2 pixel-border-sm mb-2 text-xs flex gap-2 items-start">
      <span class="text-xl">${s.emoji}</span>
      <div><div class="font-bold">${s.title}</div>
      <div class="text-[var(--text-secondary)]">${s.how}</div>
      <div class="text-green-600 mt-1">✨ ${s.reward}</div></div></div>
  `).join('');
}

function renderSecretNotes() {
  const container = document.getElementById('secretNotesContainer');
  if (!container) return;
  container.innerHTML = secretsData.secretNotes.map(n => `
    <div class="bg-[var(--bg-card)] rounded-lg px-3 py-2 pixel-border-sm mb-1 text-xs flex gap-2 items-start">
      <div class="bg-purple-100 dark:bg-purple-900 rounded px-2 py-1 text-center shrink-0 min-w-[28px]">
        <div class="font-bold text-[10px] text-purple-700">#${n.n}</div>
        <div class="text-sm">${n.emoji}</div></div>
      <div><div class="font-bold">${n.title}</div>
      <div class="text-[var(--text-secondary)]">${n.reward}</div></div></div>
  `).join('');
}

function renderMonsters(targetId) {
  const container = document.getElementById(targetId);
  if (!container) return;
  const zones = [
    { id:'early', label:'1–39 (Early Mines)', color:'#5fa83a' },
    { id:'ice', label:'41–79 (Ice Mines)', color:'#3d8bbf' },
    { id:'deep', label:'80–120 (Deep Mines)', color:'#9060d0' },
    { id:'skull', label:'Skull Cavern', color:'#d94040' },
    { id:'ginger', label:'Ginger Island / Volcano', color:'#e07820' },
  ];
  let html = '<div class="space-y-1">';
  for (const z of zones) {
    const zoneMonsters = monstersData.filter(m => {
      if (z.id === 'early') return ['1–29','10–39','1–39'].includes(m.fl);
      if (z.id === 'ice') return ['41–79','50–80'].includes(m.fl);
      if (z.id === 'deep') return ['80–119','70–79','80–120'].includes(m.fl);
      if (z.id === 'skull') return m.fl === 'Skull Cavern';
      return ['Ginger Island','Volcano Dungeon'].includes(m.fl);
    });
    if (!zoneMonsters.length) continue;
    html += `<div class="mb-3"><div class="font-bold text-xs mb-1" style="color:${z.color}">⛏ ${z.label}</div>`;
    for (const m of zoneMonsters) {
      html += `<div class="monster-card bg-[var(--bg-card)] rounded-lg px-3 py-2 pixel-border-sm mb-1 text-xs flex gap-2 items-start" style="border-left-color:${z.color}">
        <img src="${m.img}" alt="${m.n}" class="w-8 h-8 object-contain shrink-0" loading="lazy">
        <div><div class="font-bold">${m.n} <span class="text-[var(--text-muted)] font-normal">HP ${m.hp}</span></div>
        <div class="flex flex-wrap gap-1 my-1">${m.drops.map(d => '<span class="text-[10px] px-1.5 py-0.5 rounded-full" style="background:'+z.color+'20;color:'+z.color+'">'+d+'</span>').join('')}</div>
        <div class="text-[var(--text-secondary)]">${m.tip}</div></div></div>`;
    }
    html += '</div>';
  }
  html += '</div>';
  container.innerHTML = html;
}

function renderProfessions() {
  const container = document.getElementById('professionsContainer');
  if (!container) return;
  let html = '<div class="card p-3 mb-3 text-xs" style="border-color:#9060d040;background:#9060d010;border-radius:8px">⚠ <strong>Choose carefully!</strong> You pick one profession at Level 5 and one at Level 10 per skill. Use the Statue of Uncertainty (Sewers) to change them for 10,000g.</div>';
  for (const p of professionsData) {
    html += `<div class="mb-4"><div class="font-bold text-sm mb-2" style="color:${p.color}">${p.emoji} ${p.skill}</div>`;
    for (const lv of p.levels) {
      html += `<div class="text-xs font-bold text-gold mb-1">Level ${lv.lv}:</div>`;
      for (const opt of lv.opts) {
        html += `<div class="bg-[var(--bg-card)] rounded-lg px-3 py-2 pixel-border-sm mb-1 text-xs" style="border-left:3px solid ${opt.best ? '#f0c040' : 'var(--text-muted)'}">
          <div class="flex items-center gap-2"><span class="font-bold ${opt.best ? 'text-gold' : ''}">${opt.name}</span>
          ${opt.best ? '<span class="text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded-full border border-gold">RECOMMENDED ★</span>' : ''}</div>
          <div class="text-green-600 text-[10px]">${opt.effect}</div>
          <div class="text-[var(--text-secondary)] text-[10px]">${opt.why}</div></div>`;
      }
    }
    html += '</div>';
  }
  container.innerHTML = html;
}

function renderMilestones() {
  const container = document.getElementById('milestonesContainer');
  if (!container) return;
  const stages = ['Early Game','First Week','Mid Game','Late Game','Endgame'];
  let html = '';
  for (const m of milestonesData) {
    html += `<div class="mb-4"><div class="font-bold text-sm">${stages[m.stage] || m.stage}: ${m.title}</div>
    <div class="text-xs text-[var(--text-secondary)] mb-2">${m.description}</div>
    <ul class="text-xs space-y-1">`;
    for (const c of m.checklist) {
      html += `<li class="flex items-start gap-2"><span class="text-green-500">✓</span> ${c}</li>`;
    }
    html += '</ul></div>';
  }
  container.innerHTML = html;
}



function renderAchievements() {
  const container = document.getElementById('achievementsChecklist');
  const label = document.getElementById('achvProgressLabel');
  const bar = document.getElementById('achvProgressBar');
  if (!container) return;
  let html = '';
  for (const a of achievementsData) {
    html += `<label class="flex items-start gap-2 cursor-pointer checklist-item py-1"><input type="checkbox" id="achv-${a.id}" class="mt-1"><span class="checklist-text text-xs"><span class="font-bold">${a.name}</span><br><span class="text-[var(--text-muted)]">${a.description} (${a.requirement})</span></span></label>`;
  }
  container.innerHTML = html;
  document.getElementById('achvCount').textContent = `(${achievementsData.length})`;
  setTimeout(() => initChecklistsSub('achievementsChecklist', label, bar), 50);
}

function renderBundlesChecklist() {
  const container = document.getElementById('bundlesChecklist');
  const label = document.getElementById('bundleProgressLabel');
  const bar = document.getElementById('bundleProgressBar');
  if (!container) return;
  let html = '';
  for (const b of bundlesData) {
    html += `<label class="flex items-start gap-2 cursor-pointer checklist-item py-1"><input type="checkbox" id="bundle-${b.id}" class="mt-1"><span class="checklist-text text-xs"><span class="font-bold">${b.name}</span> <span class="text-[var(--text-muted)]">(${b.room})</span><br><span class="text-[var(--text-muted)]">${b.items.map(i => i.item + (i.qty > 1 ? ' ×'+i.qty : '')).join(', ')} → ${b.reward}</span></span></label>`;
  }
  container.innerHTML = html;
  document.getElementById('bundleCount').textContent = `(${bundlesData.length})`;
  setTimeout(() => initChecklistsSub('bundlesChecklist', label, bar), 50);
}

function renderFishChecklist() {
  const container = document.getElementById('fishChecklist');
  if (!container) return;
  const fish = itemsData.filter(i => i.category === 'fish');
  let html = '';
  for (const f of fish) {
    html += `<label class="flex items-start gap-2 cursor-pointer checklist-item py-0.5"><input type="checkbox" id="fish-${f.id}" class="mt-1"><span class="checklist-text text-xs"><span class="font-bold">${f.name}</span> ${f.sellPrice?.base ? '— '+f.sellPrice.base+'g' : ''} <span class="text-[var(--text-muted)]">${f.season?.join(', ')||''}${f.location ? ' · '+f.location : ''}</span></span></label>`;
  }
  container.innerHTML = html;
  document.getElementById('fishCount').textContent = `(${fish.length})`;
  setTimeout(() => initChecklistsSub('fishChecklist', document.getElementById('fishProgressLabel'), document.getElementById('fishProgressBar')), 50);
}

function renderMuseumChecklist() {
  const container = document.getElementById('museumChecklist');
  const label = document.getElementById('museumProgressLabel');
  const bar = document.getElementById('museumProgressBar');
  if (!container) return;
  const minerals = itemsData.filter(i => i.category === 'mineral');
  const artifacts = itemsData.filter(i => i.category === 'artifact');
  const donations = [...minerals, ...artifacts];
  let html = '';
  for (const d of donations) {
    html += `<label class="flex items-start gap-2 cursor-pointer checklist-item py-0.5"><input type="checkbox" id="museum-${d.id}" class="mt-1"><span class="checklist-text text-xs"><span class="font-bold">${d.name}</span> <span class="text-[var(--text-muted)]">${d.category}${d.sellPrice?.base ? ' — '+d.sellPrice.base+'g' : ''}</span></span></label>`;
  }
  container.innerHTML = html;
  document.getElementById('museumCount').textContent = `(${donations.length})`;
  setTimeout(() => initChecklistsSub('museumChecklist', label, bar), 50);
}

function renderStardropChecklist() {
  const container = document.getElementById('stardropChecklist');
  if (!container) return;
  const stardrops = [
    { name: 'Old Master Cannoli', source: 'Place Sweet Gem Berry on statue in Secret Woods' },
    { name: 'Melanie (8 hearts)', source: 'Reach 8 hearts with your spouse' },
    { name: 'Krobus', source: 'Buy for 20,000g from Krobus in the Sewers' },
    { name: 'Star Token Prize', source: 'Purchase at the Stardew Valley Fair (2,000 star tokens)' },
    { name: 'Museum Reward', source: 'Donate 40+ items to the Museum (Gunther reward)' },
    { name: 'Willy\'s Gift', source: 'Catch every legendary fish and show Willy' },
    { name: 'Secret Woods Stardrop', source: 'Hidden behind a bush in the Secret Woods' },
  ];
  let html = '';
  for (let i = 0; i < stardrops.length; i++) {
    html += `<label class="flex items-start gap-2 cursor-pointer checklist-item py-1"><input type="checkbox" id="stardrop-${i}" class="mt-1"><span class="checklist-text text-xs"><span class="font-bold">${stardrops[i].name}</span><br><span class="text-[var(--text-muted)]">${stardrops[i].source}</span></span></label>`;
  }
  container.innerHTML = html;
  document.getElementById('stardropCount').textContent = `(${stardrops.length})`;
}

function initChecklistsSub(listId, labelEl, barEl) {
  const list = document.getElementById(listId);
  if (!list) return;
  const STORAGE_PREFIX = 'sdv-progress-';
  const cbs = list.querySelectorAll('input[type="checkbox"]');
  cbs.forEach(cb => {
    const key = STORAGE_PREFIX + cb.id;
    if (localStorage.getItem(key) === 'true') {
      cb.checked = true;
      cb.closest('.checklist-item')?.classList.add('checked');
    }
    cb.addEventListener('change', () => {
      localStorage.setItem(STORAGE_PREFIX + cb.id, cb.checked);
      cb.closest('.checklist-item')?.classList.toggle('checked', cb.checked);
      updateProgressSub(cbs, labelEl, barEl);
    });
  });
  updateProgressSub(cbs, labelEl, barEl);
}

function updateProgressSub(cbs, labelEl, barEl) {
  const all = cbs.length;
  const checked = [...cbs].filter(cb => cb.checked).length;
  const pct = all > 0 ? Math.round((checked / all) * 100) : 0;
  if (labelEl) labelEl.textContent = `${checked}/${all} (${pct}%)`;
  if (barEl) barEl.style.width = pct + '%';
}

function renderItemsDatabase() {
  const tableContainer = document.getElementById('itemsTableContainer');
  const searchInput = document.getElementById('itemSearch');
  const filtersContainer = document.getElementById('itemFilters');
  if (!tableContainer || !searchInput) return;

  const categories = [...new Set(itemsData.map(i => i.category).filter(Boolean))];
  let activeFilter = '';

  if (filtersContainer) {
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-chip active px-3 py-1 rounded-full text-xs font-bold bg-gold text-stone-800';
    allBtn.textContent = 'All';
    allBtn.onclick = () => { activeFilter = ''; document.querySelectorAll('#itemFilters .filter-chip').forEach(b => b.className = b.className.replace('active','').trim() + ' bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'); allBtn.className = 'filter-chip active px-3 py-1 rounded-full text-xs font-bold bg-gold text-stone-800'; renderTable(); };
    filtersContainer.appendChild(allBtn);
    for (const cat of categories) {
      const btn = document.createElement('button');
      btn.className = 'filter-chip px-3 py-1 rounded-full text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
      btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      btn.onclick = () => { activeFilter = cat; document.querySelectorAll('#itemFilters .filter-chip').forEach(b => b.className = b.className.replace('active','').trim() + ' bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'); btn.className = 'filter-chip active px-3 py-1 rounded-full text-xs font-bold bg-gold text-stone-800'; renderTable(); };
      filtersContainer.appendChild(btn);
    }
  }

  function renderTable() {
    const query = searchInput.value.toLowerCase();
    const filtered = itemsData.filter(i => {
      if (activeFilter && i.category !== activeFilter) return false;
      if (query && !i.name?.toLowerCase().includes(query) && !i.category?.toLowerCase().includes(query)) return false;
      return true;
    }).slice(0, 200);
    let html = '<table class="w-full text-xs"><thead><tr class="border-b border-gray-200 dark:border-gray-700"><th class="text-left py-2">Name</th><th class="text-left">Category</th><th class="text-right">Sell</th><th class="text-left">Season</th></tr></thead><tbody>';
    for (const i of filtered) {
      const cat = i.category ? i.category.charAt(0).toUpperCase() + i.category.slice(1) : '—';
      const season = i.season ? i.season.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ') : '—';
      const img = i.img ? `<img src="${i.img}" alt="${i.name}" class="w-5 h-5 inline-block align-middle mr-1 object-contain" loading="lazy">` : '';
      html += `<tr class="item-row border-b border-gray-100 dark:border-gray-800" onclick="showModal(\`<div class='font-bold text-lg mb-2'>${i.name}</div><div class='text-xs space-y-1'><p>Category: ${cat}</p><p>Base sell: ${i.sellPrice?.base||'—'}g</p><p>${i.description||''}</p></div>\`)"><td class="py-2 font-bold">${img}${i.name}</td><td>${cat}</td><td class="text-right">${i.sellPrice?.base||'—'}g</td><td>${season}</td></tr>`;
    }
    html += '</tbody></table><p class="text-xs text-[var(--text-muted)] mt-2">Showing ' + filtered.length + ' of ' + itemsData.length + ' items. Click a row for details.</p>';
    tableContainer.innerHTML = html;
  }

  searchInput.addEventListener('input', renderTable);
  renderTable();
}

function renderMarriageNpcs() {
  const container = document.getElementById('marriageNpcGrid');
  if (!container) return;
  const names = ['Abigail','Leah','Maru','Sam','Harvey','Sebastian'];
  for (const name of names) {
    const npc = npcsData.find(x => x.name === name);
    if (!npc) continue;
    const d = document.createElement('div');
    d.innerHTML = `<div class="npc-portrait mx-auto overflow-hidden">${npcImgTag(npc)}</div><p class="text-[10px] font-bold mt-1">${npc.name}</p>`;
    container.appendChild(d);
  }
}

function initExpandables() {
  document.querySelectorAll('.expandable').forEach(el => {
    const btn = el.querySelector('.expandable-trigger');
    const content = el.querySelector('.expandable-content');
    if (!btn || !content) return;
    btn.removeAttribute('onclick');
    let animating = false;
    btn.addEventListener('click', () => {
      if (animating) return;
      const isOpen = el.classList.contains('open');
      animating = true;
      const h = content.scrollHeight;
      function done() {
        content.removeEventListener('transitionend', done);
        content.removeEventListener('transitioncancel', done);
        content.style.height = '';
        animating = false;
      }
      content.addEventListener('transitionend', done);
      content.addEventListener('transitioncancel', done);
      if (h === 0) { done(); return; }
      if (isOpen) {
        content.style.height = h + 'px';
        requestAnimationFrame(() => {
          content.style.height = '0px';
          el.classList.remove('open');
        });
      } else {
        content.style.height = h + 'px';
        el.classList.add('open');
      }
    });
  });
}

async function init() {
  initTheme();
  window.showModal = showModal;
  window.switchLayout = switchLayout;
  window.switchFarmType = switchFarmType;

  switchLayout('early');
  renderNpcGrid();
  renderNpcQuickGrid();
  renderNpcDetails();
  renderMarriageNpcs();
  renderEvents();

  renderBundles();
  renderMoneyTiers('moneyTiersContainer');
  renderMoneyTiers('allMoneyTiersContainer');
  renderSecrets();
  renderSecretNotes();
  renderMonsters('monstersContainer');
  renderMonsters('allMonstersContainer');
  renderProfessions();
  renderMilestones();
  renderAchievements();
  renderBundlesChecklist();
  renderFishChecklist();
  renderMuseumChecklist();
  renderStardropChecklist();

  renderCrops();
  renderItemsDatabase();

  initExpandables();

  // Re-render farm grid on resize for responsive cell size
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (currentFarmType === 'standard') {
        switchLayout(currentLayout);
      } else {
        switchFarmType(currentFarmType);
      }
    }, 200);
  });

  document.querySelectorAll('.checklist[data-auto]').forEach(list => {
    const cbs = list.querySelectorAll('input[type="checkbox"]');
    const parent = list.closest('[data-progress]');
    if (!parent) return;
    const label = parent.querySelector('.progress-label');
    const bar = parent.querySelector('.progress-bar-fill');
    initChecklistsSub(list.id, label, bar);
  });
}

init().catch(err => {
  console.error('Init error:', err);
  const app = document.getElementById('app');
  if (app) app.innerHTML = `<div class="card p-8 text-center"><h2>⚠️ Failed to Load Guide</h2><p class="text-[var(--text-muted)] mt-2">${err.message}</p><button onclick="location.reload()" class="mt-4 px-4 py-2 bg-gold rounded-lg font-bold">🔄 Reload</button></div>`;
});
