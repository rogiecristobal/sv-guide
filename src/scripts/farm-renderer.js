import { getFarm, BLD, ITEM, TERRAIN_ICONS, TERRAIN_ZONES } from '../data/farm-data.js';

function resolveTerrain(farmId, w, h) {
  const zones = TERRAIN_ZONES[farmId] || [];
  const grid = [];
  for (let y = 0; y < h; y++) {
    const row = [];
    for (let x = 0; x < w; x++) {
      row.push({ type: 'grass' });
    }
    grid.push(row);
  }
  for (const zone of zones) {
    for (let y = zone.y; y < zone.y + zone.h && y < h; y++) {
      for (let x = zone.x; x < zone.x + zone.w && x < w; x++) {
        if (y >= 0 && x >= 0) grid[y][x] = { type: zone.type };
      }
    }
  }
  return grid;
}

export function renderAccurateFarm(containerId, layout, cellSize) {
  const container = document.getElementById(containerId);
  if (!container) return;

  cellSize = cellSize || 16;
  const farm = getFarm(layout.farmId);
  const w = farm.tileW;
  const h = farm.tileH;

  const terrain = resolveTerrain(layout.farmId, w, h);

  // Apply crop overrides
  if (layout.crops) {
    for (const c of layout.crops) {
      for (let y = c.y; y < c.y + c.h && y < h; y++) {
        for (let x = c.x; x < c.x + c.w && x < w; x++) {
          if (y >= 0 && x >= 0) terrain[y][x] = { type: 'tilled', icon: c.icon };
        }
      }
    }
  }

  // Apply path overrides
  if (layout.paths) {
    for (const p of layout.paths) {
      for (let y = p.y; y < p.y + p.h && y < h; y++) {
        for (let x = p.x; x < p.x + p.w && x < w; x++) {
          if (y >= 0 && x >= 0) terrain[y][x] = { type: 'path', icon: p.icon || TERRAIN_ICONS.path };
        }
      }
    }
  }

  // Apply item overrides (1x1 replaces cell icon, keeps terrain type)
  if (layout.items) {
    for (const it of layout.items) {
      const d = ITEM[it.id];
      if (!d) continue;
      if (it.x >= 0 && it.x < w && it.y >= 0 && it.y < h) {
        terrain[it.y][it.x] = { type: terrain[it.y][it.x].type, icon: d.icon };
      }
    }
  }

  // Set up grid
  container.style.gridTemplateColumns = `repeat(${w}, ${cellSize}px)`;
  container.style.gridTemplateRows = `repeat(${h}, ${cellSize}px)`;
  container.innerHTML = '';

  // Render terrain cells
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const t = terrain[y][x];
      const icon = t.icon || TERRAIN_ICONS[t.type] || '';
      const cell = document.createElement('div');
      cell.className = `farm-cell farm-cell-${t.type}`;
      cell.dataset.x = x;
      cell.dataset.y = y;
      cell.title = `${t.type} (${x},${y})`;
      cell.textContent = icon;
      container.appendChild(cell);
    }
  }

  // Sprinkle coverage ranges
  const SPRINKLE_RANGES = {
    '💧': 1,  // Basic sprinkler: 1 tile (4 cardinal dirs)
    '💎': 2,  // Iridium sprinkler: 2 tiles (5x5)
  };
  // Default quality sprinkler range is 1 tile (3x3)
  let sprinklerIcon = null;
  for (const it of (layout.items || [])) {
    const d = ITEM[it.id];
    if (d && (d.icon === '💧' || d.icon === '💎')) {
      sprinklerIcon = d.icon;
    }
  }

  // Build a quick lookup of sprinkler positions
  const sprinklerPositions = [];
  for (const it of (layout.items || [])) {
    const d = ITEM[it.id];
    if (d && (d.icon === '💧' || d.icon === '💎')) {
      sprinklerPositions.push({ x: it.x, y: it.y, range: SPRINKLE_RANGES[d.icon] || 1 });
    }
  }

  // After all cells are rendered, add hover listeners for sprinkler coverage
  const allCells = container.querySelectorAll('.farm-cell');
  function clearHighlights() {
    allCells.forEach(c => c.style.background = '');
  }

  for (const sp of sprinklerPositions) {
    const idx = sp.y * w + sp.x;
    const cell = allCells[idx];
    if (!cell) continue;
    cell.addEventListener('mouseenter', () => {
      clearHighlights();
      for (let dy = -sp.range; dy <= sp.range; dy++) {
        for (let dx = -sp.range; dx <= sp.range; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = sp.x + dx;
          const ny = sp.y + dy;
          if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
            const ci = ny * w + nx;
            if (allCells[ci]) {
              allCells[ci].style.background = 'rgba(74, 144, 217, 0.35)';
            }
          }
        }
      }
    });
    cell.addEventListener('mouseleave', clearHighlights);
  }

  // Render buildings (overlays spanning multiple tiles)
  if (layout.buildings) {
    for (const b of layout.buildings) {
      const d = BLD[b.id];
      if (!d) continue;
      const el = document.createElement('div');
      el.className = 'farm-building';
      el.style.gridColumn = `${b.x + 1} / span ${d.w}`;
      el.style.gridRow = `${b.y + 1} / span ${d.h}`;
      el.textContent = d.icon;
      el.title = d.label;
      container.appendChild(el);
    }
  }
}

// ============================================================
// FARM TYPE DEFAULT LAYOUTS (one per farm type for overview)
// ============================================================

export const FARM_DEFAULTS = {
  standard: {
    farmId: 'standard',
    name: 'Standard Farm',
    description: 'Balanced farm with large open fields. The classic Stardew Valley experience.',
    buildings: [
      { id: 'FARMHOUSE', x: 0, y: 8 },
      { id: 'GREENHOUSE', x: 19, y: 0 },
      { id: 'SHIPPING_BIN', x: 5, y: 20 },
      { id: 'STABLE', x: 10, y: 13 },
      { id: 'SILO', x: 17, y: 14 },
    ],
    crops: [
      { icon: '🥕', x: 2, y: 22, w: 14, h: 10 },
    ],
    paths: [
      { icon: '🟫', x: 4, y: 19, w: 1, h: 4 },
    ],
    items: [
      { id: 'CHEST', x: 0, y: 20 },
      { id: 'CAMPFIRE', x: 0, y: 22 },
    ],
  },
  riverland: {
    farmId: 'riverland',
    name: 'Riverland Farm',
    description: 'Split into islands by rivers. Great for fishing but less farming space.',
    buildings: [
      { id: 'FARMHOUSE', x: 28, y: 40 },
      { id: 'SHIPPING_BIN', x: 30, y: 45 },
      { id: 'COOP', x: 4, y: 4 },
      { id: 'BARN', x: 30, y: 4 },
      { id: 'FISH_POND', x: 54, y: 4 },
      { id: 'SILO', x: 56, y: 42 },
    ],
    crops: [
      { icon: '🥕', x: 4, y: 18, w: 10, h: 8 },
      { icon: '🍅', x: 30, y: 18, w: 10, h: 8 },
    ],
    paths: [
      { icon: '🟫', x: 28, y: 38, w: 4, h: 2 },
      { icon: '🟫', x: 2, y: 16, w: 14, h: 1 },
    ],
    items: [
      { id: 'CHEST', x: 28, y: 44 },
    ],
  },
  forest: {
    farmId: 'forest',
    name: 'Forest Farm',
    description: 'Wooded terrain with renewable hardwood stumps on the west side.',
    buildings: [
      { id: 'FARMHOUSE', x: 30, y: 38 },
      { id: 'SHIPPING_BIN', x: 32, y: 43 },
      { id: 'COOP', x: 22, y: 4 },
      { id: 'SILO', x: 30, y: 4 },
    ],
    crops: [
      { icon: '🥔', x: 46, y: 4, w: 12, h: 10 },
      { icon: '🌽', x: 4, y: 22, w: 12, h: 10 },
    ],
    paths: [
      { icon: '🟫', x: 28, y: 36, w: 4, h: 2 },
    ],
    items: [
      { id: 'CHEST', x: 30, y: 42 },
      { id: 'SCARECROW', x: 44, y: 4 },
    ],
  },
  hilltop: {
    farmId: 'hilltop',
    name: 'Hill-Top Farm',
    description: 'Rocky terrain with a central quarry. Limited farming space in patches.',
    buildings: [
      { id: 'FARMHOUSE', x: 4, y: 30 },
      { id: 'SHIPPING_BIN', x: 6, y: 35 },
      { id: 'COOP', x: 60, y: 4 },
      { id: 'SILO', x: 58, y: 10 },
      { id: 'STABLE', x: 2, y: 12 },
    ],
    crops: [
      { icon: '🥕', x: 4, y: 4, w: 12, h: 8 },
      { icon: '🍅', x: 48, y: 4, w: 12, h: 8 },
    ],
    paths: [
      { icon: '🟫', x: 2, y: 28, w: 4, h: 2 },
    ],
    items: [
      { id: 'CHEST', x: 4, y: 34 },
    ],
  },
  wilderness: {
    farmId: 'wilderness',
    name: 'Wilderness Farm',
    description: 'Monsters spawn at night. Plenty of farming land with a large pond.',
    buildings: [
      { id: 'FARMHOUSE', x: 4, y: 36 },
      { id: 'SHIPPING_BIN', x: 6, y: 41 },
      { id: 'COOP', x: 4, y: 4 },
      { id: 'BARN', x: 44, y: 4 },
      { id: 'SILO', x: 16, y: 4 },
      { id: 'FISH_POND', x: 42, y: 20 },
    ],
    crops: [
      { icon: '🥕', x: 4, y: 12, w: 16, h: 10 },
      { icon: '🍇', x: 44, y: 28, w: 14, h: 8 },
    ],
    paths: [
      { icon: '🟫', x: 2, y: 34, w: 4, h: 2 },
    ],
    items: [
      { id: 'CHEST', x: 4, y: 40 },
    ],
  },
  fourCorners: {
    farmId: 'fourCorners',
    name: 'Four Corners Farm',
    description: 'Four distinct quadrants separated by paths. Great for co-op organization.',
    buildings: [
      { id: 'FARMHOUSE', x: 4, y: 28 },
      { id: 'SHIPPING_BIN', x: 6, y: 33 },
      { id: 'COOP', x: 4, y: 4 },
      { id: 'BARN', x: 41, y: 4 },
      { id: 'SILO', x: 14, y: 4 },
      { id: 'FISH_POND', x: 55, y: 32 },
    ],
    crops: [
      { icon: '🥕', x: 4, y: 12, w: 14, h: 8 },
      { icon: '🌽', x: 41, y: 12, w: 14, h: 8 },
      { icon: '🎃', x: 4, y: 32, w: 14, h: 8 },
      { icon: '🍅', x: 41, y: 32, w: 14, h: 8 },
    ],
    paths: [
      { icon: '🟫', x: 2, y: 26, w: 4, h: 2 },
      { icon: '🟫', x: 36, y: 26, w: 4, h: 2 },
    ],
    items: [
      { id: 'CHEST', x: 4, y: 32 },
    ],
  },
  beach: {
    farmId: 'beach',
    name: 'Beach Farm',
    description: 'Sandy beach with supply crates. No sprinklers on base sand — use tillable patches.',
    buildings: [
      { id: 'FARMHOUSE', x: 0, y: 6 },
      { id: 'SHIPPING_BIN', x: 2, y: 11 },
      { id: 'COOP', x: 72, y: 2 },
      { id: 'BARN', x: 72, y: 10 },
      { id: 'FISH_POND', x: 14, y: 0 },
    ],
    crops: [
      { icon: '🥕', x: 16, y: 6, w: 12, h: 8 },
      { icon: '🍅', x: 52, y: 6, w: 10, h: 8 },
      { icon: '🌽', x: 4, y: 34, w: 14, h: 8 },
    ],
    paths: [
      { icon: '🟫', x: 2, y: 10, w: 2, h: 1 },
    ],
    items: [
      { id: 'CHEST', x: 0, y: 10 },
    ],
  },
  meadowlands: {
    farmId: 'meadowlands',
    name: 'Meadowlands Farm',
    description: 'Lush green fields with pre-existing blue grass. Ideal for ranching.',
    buildings: [
      { id: 'FARMHOUSE', x: 0, y: 8 },
      { id: 'SHIPPING_BIN', x: 2, y: 13 },
      { id: 'COOP', x: 4, y: 2 },
      { id: 'BARN', x: 52, y: 2 },
      { id: 'SILO', x: 18, y: 0 },
      { id: 'FISH_POND', x: 30, y: 10 },
    ],
    crops: [
      { icon: '🥕', x: 22, y: 4, w: 12, h: 8 },
      { icon: '🌾', x: 4, y: 30, w: 20, h: 8 },
    ],
    paths: [
      { icon: '🟫', x: 2, y: 12, w: 2, h: 1 },
    ],
    items: [
      { id: 'CHEST', x: 0, y: 12 },
    ],
  },
};

// ============================================================
// EXAMPLE LAYOUTS (phase-specific, for Standard Farm)
// ============================================================

export const LAYOUTS = {
  early: {
    farmId: 'standard',
    name: 'Early Game Farm',
    description: 'Simple setup near the farmhouse with basic crops and a starter coop.',
    buildings: [
      { id: 'COOP', x: 10, y: 14 },
      { id: 'SILO', x: 17, y: 14 },
      { id: 'SHIPPING_BIN', x: 5, y: 20 },
    ],
    crops: [
      { icon: '🥕', x: 2, y: 22, w: 12, h: 10 },
      { icon: '🍓', x: 2, y: 33, w: 8, h: 8 },
    ],
    paths: [
      { icon: '🟫', x: 4, y: 19, w: 1, h: 4 },
      { icon: '🟫', x: 2, y: 32, w: 12, h: 1 },
      { icon: '🟫', x: 14, y: 14, w: 1, h: 12 },
      { icon: '🟫', x: 10, y: 17, w: 3, h: 1 },
    ],
    items: [
      { id: 'SPRINKLER', x: 4, y: 24 },
      { id: 'SPRINKLER', x: 8, y: 24 },
      { id: 'SPRINKLER', x: 4, y: 28 },
      { id: 'SPRINKLER', x: 8, y: 28 },
      { id: 'SCARECROW', x: 2, y: 22 },
      { id: 'SCARECROW', x: 13, y: 22 },
      { id: 'CHEST', x: 0, y: 20 },
      { id: 'FURNACE', x: 0, y: 21 },
      { id: 'CAMPFIRE', x: 0, y: 22 },
    ],
  },

  mid: {
    farmId: 'standard',
    name: 'Mid Game Farm',
    description: 'Zoned layout with quality sprinklers, dedicated animal area, artisan shed, and organized paths.',
    buildings: [
      { id: 'BIG_COOP', x: 55, y: 30 },
      { id: 'BARN', x: 55, y: 36 },
      { id: 'SILO', x: 49, y: 30 },
      { id: 'SILO', x: 49, y: 34 },
      { id: 'SHED', x: 42, y: 42 },
      { id: 'FISH_POND', x: 58, y: 16 },
      { id: 'STABLE', x: 10, y: 13 },
      { id: 'WELL', x: 49, y: 26 },
      { id: 'MILL', x: 44, y: 48 },
      { id: 'SHIPPING_BIN', x: 5, y: 20 },
    ],
    crops: [
      { icon: '🥔', x: 2, y: 2, w: 25, h: 10 },
      { icon: '🍅', x: 29, y: 2, w: 8, h: 8 },
      { icon: '🌽', x: 2, y: 14, w: 16, h: 6 },
      { icon: '🫐', x: 44, y: 2, w: 12, h: 12 },
    ],
    paths: [
      { icon: '🟫', x: 2, y: 12, w: 35, h: 1 },
      { icon: '🟫', x: 18, y: 2, w: 1, h: 10 },
      { icon: '🟫', x: 2, y: 20, w: 15, h: 1 },
      { icon: '🟫', x: 4, y: 19, w: 1, h: 4 },
      { icon: '🟫', x: 44, y: 14, w: 12, h: 1 },
      { icon: '🟫', x: 55, y: 34, w: 1, h: 2 },
      { icon: '🟫', x: 42, y: 41, w: 1, h: 4 },
      { icon: '🟫', x: 42, y: 45, w: 5, h: 1 },
      { icon: '🟫', x: 44, y: 47, w: 1, h: 2 },
    ],
    items: [
      { id: 'QUALITY_SPRINKLER', x: 5, y: 4 },
      { id: 'QUALITY_SPRINKLER', x: 11, y: 4 },
      { id: 'QUALITY_SPRINKLER', x: 17, y: 4 },
      { id: 'QUALITY_SPRINKLER', x: 5, y: 8 },
      { id: 'QUALITY_SPRINKLER', x: 11, y: 8 },
      { id: 'QUALITY_SPRINKLER', x: 17, y: 8 },
      { id: 'QUALITY_SPRINKLER', x: 31, y: 4 },
      { id: 'QUALITY_SPRINKLER', x: 5, y: 16 },
      { id: 'QUALITY_SPRINKLER', x: 11, y: 16 },
      { id: 'SCARECROW', x: 1, y: 2 },
      { id: 'SCARECROW', x: 28, y: 9 },
      { id: 'SCARECROW', x: 43, y: 2 },
      { id: 'CHEST', x: 0, y: 20 },
      { id: 'FURNACE', x: 0, y: 21 },
      { id: 'KEG', x: 43, y: 43 },
      { id: 'KEG', x: 43, y: 44 },
    ],
  },

  late: {
    farmId: 'standard',
    name: 'End-Game Farm',
    description: 'Optimized layout with iridium sprinklers, ancient fruit fields, deluxe animal buildings, and all obelisks.',
    buildings: [
      { id: 'DELUXE_BARN', x: 56, y: 2 },
      { id: 'DELUXE_BARN', x: 56, y: 8 },
      { id: 'DELUXE_COOP', x: 56, y: 14 },
      { id: 'DELUXE_COOP', x: 56, y: 20 },
      { id: 'BIG_SHED', x: 2, y: 34 },
      { id: 'BIG_SHED', x: 10, y: 34 },
      { id: 'BIG_SHED', x: 18, y: 34 },
      { id: 'FISH_POND', x: 54, y: 28 },
      { id: 'FISH_POND', x: 60, y: 28 },
      { id: 'FISH_POND', x: 66, y: 28 },
      { id: 'FISH_POND', x: 54, y: 36 },
      { id: 'SLIME_HUTCH', x: 44, y: 42 },
      { id: 'MILL', x: 40, y: 48 },
      { id: 'WELL', x: 28, y: 14 },
      { id: 'OBELISK_EARTH', x: 26, y: 8 },
      { id: 'OBELISK_WATER', x: 29, y: 8 },
      { id: 'OBELISK_DESERT', x: 26, y: 10 },
      { id: 'OBELISK_ISLAND', x: 29, y: 10 },
      { id: 'GOLD_CLOCK', x: 26, y: 12 },
      { id: 'JUNIMO_HUT', x: 44, y: 4 },
      { id: 'JUNIMO_HUT', x: 56, y: 4 },
      { id: 'STABLE', x: 10, y: 13 },
      { id: 'SHIPPING_BIN', x: 5, y: 20 },
    ],
    crops: [
      { icon: '🍇', x: 2, y: 2, w: 24, h: 10 },
      { icon: '🍇', x: 28, y: 2, w: 14, h: 10 },
      { icon: '🍇', x: 2, y: 14, w: 24, h: 6 },
      { icon: '🍇', x: 28, y: 14, w: 14, h: 8 },
      { icon: '🌽', x: 2, y: 22, w: 24, h: 10 },
      { icon: '🎃', x: 28, y: 24, w: 14, h: 8 },
    ],
    paths: [
      { icon: '🟫', x: 26, y: 2, w: 1, h: 12 },
      { icon: '🟫', x: 2, y: 12, w: 24, h: 1 },
      { icon: '🟫', x: 28, y: 12, w: 14, h: 1 },
      { icon: '🟫', x: 2, y: 20, w: 24, h: 1 },
      { icon: '🟫', x: 28, y: 22, w: 14, h: 1 },
      { icon: '🟫', x: 4, y: 19, w: 1, h: 4 },
      { icon: '🟫', x: 28, y: 32, w: 14, h: 1 },
      { icon: '🟫', x: 27, y: 2, w: 1, h: 12 },
      { icon: '🟫', x: 54, y: 26, w: 12, h: 1 },
      { icon: '🟫', x: 54, y: 33, w: 6, h: 1 },
      { icon: '🟫', x: 54, y: 40, w: 1, h: 6 },
      { icon: '🟫', x: 44, y: 41, w: 1, h: 5 },
    ],
    items: [
      { id: 'IRIDIUM_SPRINKLER', x: 5, y: 4 },
      { id: 'IRIDIUM_SPRINKLER', x: 11, y: 4 },
      { id: 'IRIDIUM_SPRINKLER', x: 17, y: 4 },
      { id: 'IRIDIUM_SPRINKLER', x: 23, y: 4 },
      { id: 'IRIDIUM_SPRINKLER', x: 30, y: 4 },
      { id: 'IRIDIUM_SPRINKLER', x: 36, y: 4 },
      { id: 'IRIDIUM_SPRINKLER', x: 5, y: 8 },
      { id: 'IRIDIUM_SPRINKLER', x: 11, y: 8 },
      { id: 'IRIDIUM_SPRINKLER', x: 17, y: 8 },
      { id: 'IRIDIUM_SPRINKLER', x: 23, y: 8 },
      { id: 'IRIDIUM_SPRINKLER', x: 5, y: 16 },
      { id: 'IRIDIUM_SPRINKLER', x: 11, y: 16 },
      { id: 'IRIDIUM_SPRINKLER', x: 17, y: 16 },
      { id: 'IRIDIUM_SPRINKLER', x: 30, y: 16 },
      { id: 'IRIDIUM_SPRINKLER', x: 36, y: 16 },
      { id: 'IRIDIUM_SPRINKLER', x: 5, y: 24 },
      { id: 'IRIDIUM_SPRINKLER', x: 11, y: 24 },
      { id: 'IRIDIUM_SPRINKLER', x: 17, y: 24 },
      { id: 'IRIDIUM_SPRINKLER', x: 30, y: 26 },
      { id: 'IRIDIUM_SPRINKLER', x: 36, y: 26 },
      { id: 'DELUXE_SCARECROW', x: 1, y: 2 },
      { id: 'DELUXE_SCARECROW', x: 52, y: 2 },
      { id: 'DELUXE_SCARECROW', x: 1, y: 30 },
      { id: 'DELUXE_SCARECROW', x: 43, y: 2 },
      { id: 'BEE_HOUSE', x: 30, y: 24 },
      { id: 'BEE_HOUSE', x: 30, y: 25 },
      { id: 'BEE_HOUSE', x: 31, y: 24 },
      { id: 'BEE_HOUSE', x: 31, y: 25 },
      { id: 'CHEST', x: 0, y: 20 },
      { id: 'KEG', x: 3, y: 35 },
      { id: 'KEG', x: 4, y: 35 },
      { id: 'KEG', x: 5, y: 35 },
      { id: 'PRES_JAR', x: 11, y: 35 },
      { id: 'PRES_JAR', x: 12, y: 35 },
      { id: 'CRYSTALARIUM', x: 19, y: 35 },
      { id: 'CRYSTALARIUM', x: 20, y: 35 },
    ],
  },
};
