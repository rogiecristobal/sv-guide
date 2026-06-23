// ============================================================
// BUILDING DIMENSIONS (width x height in tiles)
// ============================================================
export const BLD = {
  // Coops
  COOP:        { w: 6, h: 3, icon: '🐔', label: 'Coop' },
  BIG_COOP:    { w: 6, h: 3, icon: '🐔', label: 'Big Coop' },
  DELUXE_COOP: { w: 6, h: 3, icon: '🐔', label: 'Deluxe Coop' },
  // Barns
  BARN:        { w: 7, h: 4, icon: '🐄', label: 'Barn' },
  BIG_BARN:    { w: 7, h: 4, icon: '🐄', label: 'Big Barn' },
  DELUXE_BARN: { w: 7, h: 4, icon: '🐄', label: 'Deluxe Barn' },
  // Other buildings
  SLIME_HUTCH: { w: 7, h: 4, icon: '🧪', label: 'Slime Hutch' },
  MILL:        { w: 4, h: 2, icon: '🌾', label: 'Mill' },
  FISH_POND:   { w: 5, h: 5, icon: '🐟', label: 'Fish Pond' },
  SHED:        { w: 7, h: 3, icon: '🏭', label: 'Shed' },
  BIG_SHED:    { w: 7, h: 3, icon: '🏭', label: 'Big Shed' },
  SILO:        { w: 3, h: 3, icon: '🌾', label: 'Silo' },
  WELL:        { w: 3, h: 3, icon: '🪣', label: 'Well' },
  STABLE:      { w: 4, h: 2, icon: '🐴', label: 'Stable' },
  SHIPPING_BIN:{ w: 2, h: 1, icon: '📦', label: 'Shipping Bin' },
  JUNIMO_HUT:  { w: 3, h: 2, icon: '🏡', label: 'Junimo Hut' },
  PET_BOWL:    { w: 2, h: 2, icon: '🐾', label: 'Pet Bowl' },
  // Obelisks
  OBELISK_EARTH:  { w: 3, h: 2, icon: '🗿', label: 'Earth Obelisk' },
  OBELISK_WATER:  { w: 3, h: 2, icon: '🗿', label: 'Water Obelisk' },
  OBELISK_DESERT: { w: 3, h: 2, icon: '🗿', label: 'Desert Obelisk' },
  OBELISK_ISLAND: { w: 3, h: 2, icon: '🗿', label: 'Island Obelisk' },
  GOLD_CLOCK:  { w: 3, h: 2, icon: '⏰', label: 'Gold Clock' },
  // Static (on base map — not overlaid)
  FARMHOUSE:   { w: 9, h: 5, icon: '🏠', label: 'Farmhouse' },
  GREENHOUSE:  { w: 7, h: 6, icon: '🏡', label: 'Greenhouse' },
  // Cabins
  CABIN:           { w: 5, h: 3, icon: '🏡', label: 'Cabin' },
  PLANK_CABIN:     { w: 5, h: 3, icon: '🏡', label: 'Plank Cabin' },
  LOG_CABIN:       { w: 5, h: 3, icon: '🏡', label: 'Log Cabin' },
  NEIGHBOR_CABIN:  { w: 5, h: 3, icon: '🏡', label: 'Neighbor Cabin' },
  RUSTIC_CABIN:    { w: 5, h: 3, icon: '🏡', label: 'Rustic Cabin' },
  BEACH_CABIN:     { w: 5, h: 3, icon: '🏡', label: 'Beach Cabin' },
  TRAILER_CABIN:   { w: 5, h: 3, icon: '🏡', label: 'Trailer Cabin' },
};

// ============================================================
// ITEMS (1x1 placeable objects)
// ============================================================
export const ITEM = {
  // Sprinkle
  SPRINKLER:        { icon: '💧', label: 'Sprinkler' },
  QUALITY_SPRINKLER:{ icon: '💧', label: 'Q. Sprinkler' },
  IRIDIUM_SPRINKLER:{ icon: '💎', label: 'I. Sprinkler' },
  // Scarecrows
  SCARECROW:        { icon: '🎯', label: 'Scarecrow' },
  DELUXE_SCARECROW: { icon: '🎯', label: 'Dlx Scarecrow' },
  // Crop
  PARSIP:     { icon: '🥕', label: 'Parsnip' },
  POTATO:     { icon: '🥔', label: 'Potato' },
  CAULIFLOWER:{ icon: '🥦', label: 'Cauliflower' },
  STRAWBERRY: { icon: '🍓', label: 'Strawberry' },
  MELON:      { icon: '🍈', label: 'Melon' },
  TOMATO:     { icon: '🍅', label: 'Tomato' },
  BLUEBERRY:  { icon: '🫐', label: 'Blueberry' },
  PUMPKIN:    { icon: '🎃', label: 'Pumpkin' },
  ANCIENT_FRUIT:{ icon: '🍇', label: 'Ancient Fruit' },
  // Placeable machines
  CHEST:      { icon: '📦', label: 'Chest' },
  BIG_CHEST:  { icon: '📦', label: 'Big Chest' },
  FURNACE:    { icon: '🔥', label: 'Furnace' },
  HEAVY_FURNACE:{ icon: '🔥', label: 'H. Furnace' },
  KEG:        { icon: '🛢️', label: 'Keg' },
  PRES_JAR:   { icon: '🫙', label: 'Preserves Jar' },
  CRYSTALARIUM:{ icon: '💎', label: 'Crystalarium' },
  SEED_MAKER: { icon: '🌱', label: 'Seed Maker' },
  MAYO_MACHINE:{ icon: '🥚', label: 'Mayo Machine' },
  CHEESE_PRESS:{ icon: '🧀', label: 'Cheese Press' },
  LOOM:       { icon: '🧶', label: 'Loom' },
  OIL_MAKER:  { icon: '🫒', label: 'Oil Maker' },
  BEE_HOUSE:  { icon: '🐝', label: 'Bee House' },
  TREE:       { icon: '🌳', label: 'Tree' },
  OAK_TREE:   { icon: '🌳', label: 'Oak Tree' },
  MAPLE_TREE: { icon: '🍁', label: 'Maple Tree' },
  PINE_TREE:  { icon: '🌲', label: 'Pine Tree' },
  FRUIT_TREE: { icon: '🍎', label: 'Fruit Tree' },
  LAMP_POST:  { icon: '💡', label: 'Lamp Post' },
  CAMPFIRE:   { icon: '🔥', label: 'Campfire' },
  // Paths
  WOOD_PATH:      { icon: '🟫', label: 'Wood Path' },
  COBBLE_PATH:    { icon: '⬜', label: 'Cobble Path' },
  CRYSTAL_PATH:   { icon: '💎', label: 'Crystal Path' },
  STONE_PATH:     { icon: '🪨', label: 'Stone Path' },
  GRAVEL_PATH:    { icon: '🟤', label: 'Gravel Path' },
  STEPPING_PATH:  { icon: '🪨', label: 'Stepping Path' },
  // Fences
  WOOD_FENCE:     { icon: '➖', label: 'Wood Fence' },
  STONE_FENCE:    { icon: '⬜', label: 'Stone Fence' },
  HARDWOOD_FENCE: { icon: '⬛', label: 'Hdwd Fence' },
  IRON_FENCE:     { icon: '◼️', label: 'Iron Fence' },
};

// ============================================================
// FARM DIMENSIONS & TILE COUNTS
// ============================================================
export const FARMS = {
  standard: {
    name: 'Standard Farm',
    tileW: 73, tileH: 55,
    imgW: 1280, imgH: 1071,
    tillable: 3427, buildable: 3662, unbuildable: 235,
  },
  riverland: {
    name: 'Riverland Farm',
    tileW: 73, tileH: 55,
    imgW: 1280, imgH: 1071,
    tillable: 1578, buildable: 2094, unbuildable: 516,
  },
  forest: {
    name: 'Forest Farm',
    tileW: 73, tileH: 55,
    imgW: 1280, imgH: 1071,
    tillable: 1413, buildable: 2903, unbuildable: 1490,
  },
  hilltop: {
    name: 'Hill-Top Farm',
    tileW: 73, tileH: 55,
    imgW: 1280, imgH: 1071,
    tillable: 1648, buildable: 2578, unbuildable: 930,
  },
  wilderness: {
    name: 'Wilderness Farm',
    tileW: 73, tileH: 55,
    imgW: 1280, imgH: 1071,
    tillable: 2131, buildable: 2575, unbuildable: 444,
  },
  fourCorners: {
    name: 'Four Corners Farm',
    tileW: 73, tileH: 55,
    imgW: 1280, imgH: 1318,
    tillable: 2952, buildable: 3514, unbuildable: 562,
  },
  beach: {
    name: 'Beach Farm',
    tileW: 93, tileH: 55,
    imgW: 1760, imgH: 1813,
    tillable: 2700, buildable: 4628, unbuildable: 1928,
  },
  meadowlands: {
    name: 'Meadowlands Farm',
    tileW: 73, tileH: 55,
    imgW: 1600, imgH: 1236,
    tillable: 2047, buildable: 3500, unbuildable: 1450,
  },
};

export function getFarm(id) {
  return FARMS[id] || FARMS.standard;
}

export function imgSrc(id) {
  return `/base_layout/${id === 'meadowlands' ? 'meadowsland' : id}.png`;
}

export function tilePct(id, tx, ty) {
  const f = getFarm(id);
  return { left: (tx / f.tileW) * 100, top: (ty / f.tileH) * 100 };
}

export function tileSizePct(id, tw, th) {
  const f = getFarm(id);
  return { w: (tw / f.tileW) * 100, h: (th / f.tileH) * 100 };
}

// ============================================================
// TERRAIN ICONS — emoji per terrain type
// ============================================================
export const TERRAIN_ICONS = {
  grass: '🌿', tillable: '🌱', tilled: '🟫',
  water: '🌊', cliff: '🪨', bridge: '🌉',
  path: '🟫', dirt: '🟤', sand: '⏳',
  quarry: '⛰️', hardwood: '🪵', tree: '🌳',
  berries: '🫐', green: '🌾', blue: '💧',
};

// ============================================================
// TERRAIN ZONE DEFINITIONS
// Each zone is { type, x, y, w, h } — processed in order,
// later zones override earlier ones.
// ============================================================
export const TERRAIN_ZONES = {
  standard: [
    // === Cliffs / borders ===
    { type: 'cliff', x: 0, y: 0, w: 73, h: 2 },
    { type: 'cliff', x: 0, y: 53, w: 73, h: 2 },
    { type: 'cliff', x: 0, y: 0, w: 2, h: 55 },
    { type: 'cliff', x: 71, y: 0, w: 2, h: 55 },
    // Cave area top-right
    { type: 'cliff', x: 53, y: 0, w: 6, h: 5 },
    // Small rocky outcroppings
    { type: 'cliff', x: 0, y: 29, w: 1, h: 12 },
    { type: 'cliff', x: 32, y: 0, w: 4, h: 1 },

    // === Water features ===
    // Large pond (center-right)
    { type: 'water', x: 37, y: 12, w: 7, h: 7 },
    // Small pond (bottom-left)
    { type: 'water', x: 2, y: 42, w: 4, h: 3 },
    // Bottom river
    { type: 'water', x: 0, y: 48, w: 73, h: 5 },

    // === Building pads (grass overrides tillable) ===
    { type: 'grass', x: 0, y: 13, w: 9, h: 7 },
    { type: 'grass', x: 19, y: 0, w: 7, h: 6 },

    // === Grandpa's shrine ===
    { type: 'grass', x: 7, y: 48, w: 3, h: 2 },

    // === Bridges (over water) ===
    { type: 'bridge', x: 13, y: 48, w: 3, h: 3 },
    { type: 'bridge', x: 41, y: 48, w: 3, h: 3 },

    // === Tillable fields (main farming area) ===
    { type: 'tillable', x: 2, y: 2, w: 35, h: 48 },
    { type: 'tillable', x: 44, y: 2, w: 27, h: 48 },
  ],

  riverland: [
    { type: 'cliff', x: 0, y: 0, w: 73, h: 2 },
    { type: 'cliff', x: 0, y: 53, w: 73, h: 2 },
    { type: 'cliff', x: 0, y: 0, w: 2, h: 55 },
    { type: 'cliff', x: 71, y: 0, w: 2, h: 55 },
    // Water channels splitting the map into islands
    { type: 'water', x: 0, y: 14, w: 73, h: 2 },
    { type: 'water', x: 25, y: 0, w: 2, h: 14 },
    { type: 'water', x: 25, y: 16, w: 2, h: 37 },
    { type: 'water', x: 50, y: 0, w: 2, h: 14 },
    { type: 'water', x: 50, y: 16, w: 2, h: 37 },
    { type: 'water', x: 0, y: 38, w: 73, h: 2 },
    // Small ponds on islands
    { type: 'water', x: 8, y: 3, w: 4, h: 3 },
    { type: 'water', x: 58, y: 3, w: 4, h: 3 },
    { type: 'water', x: 8, y: 44, w: 5, h: 4 },
    // Building pads (grass)
    { type: 'grass', x: 0, y: 10, w: 7, h: 4 },
    { type: 'grass', x: 27, y: 10, w: 6, h: 4 },
    // Bridges connecting islands
    { type: 'bridge', x: 23, y: 14, w: 3, h: 2 },
    { type: 'bridge', x: 48, y: 14, w: 3, h: 2 },
    { type: 'bridge', x: 23, y: 38, w: 3, h: 2 },
    { type: 'bridge', x: 48, y: 38, w: 3, h: 2 },
    { type: 'bridge', x: 10, y: 38, w: 3, h: 2 },
    // Tillable areas (islands)
    { type: 'tillable', x: 2, y: 2, w: 21, h: 12 },
    { type: 'tillable', x: 27, y: 2, w: 21, h: 12 },
    { type: 'tillable', x: 52, y: 2, w: 19, h: 12 },
    { type: 'tillable', x: 2, y: 16, w: 21, h: 22 },
    { type: 'tillable', x: 27, y: 16, w: 21, h: 22 },
    { type: 'tillable', x: 52, y: 16, w: 19, h: 22 },
    { type: 'tillable', x: 2, y: 40, w: 69, h: 13 },
  ],

  forest: [
    { type: 'cliff', x: 0, y: 0, w: 73, h: 2 },
    { type: 'cliff', x: 0, y: 53, w: 73, h: 2 },
    { type: 'cliff', x: 0, y: 0, w: 2, h: 55 },
    { type: 'cliff', x: 71, y: 0, w: 2, h: 55 },
    { type: 'cliff', x: 21, y: 0, w: 4, h: 1 },
    // Large pond bottom-center
    { type: 'water', x: 30, y: 28, w: 12, h: 9 },
    // Small pond top-right
    { type: 'water', x: 55, y: 4, w: 5, h: 4 },
    // Forest hardwood area (west side)
    { type: 'green', x: 2, y: 2, w: 16, h: 16 },
    { type: 'hardwood', x: 4, y: 4, w: 12, h: 12 },
    // Grandpa's shrine area
    { type: 'grass', x: 7, y: 48, w: 3, h: 2 },
    // Bottom river
    { type: 'water', x: 0, y: 48, w: 73, h: 5 },
    // Bridges
    { type: 'bridge', x: 13, y: 48, w: 3, h: 3 },
    { type: 'bridge', x: 41, y: 48, w: 3, h: 3 },
    // Tillable fields
    { type: 'tillable', x: 20, y: 2, w: 33, h: 24 },
    { type: 'tillable', x: 44, y: 2, w: 27, h: 24 },
    { type: 'tillable', x: 2, y: 20, w: 26, h: 26 },
    { type: 'tillable', x: 44, y: 26, w: 27, h: 22 },
    { type: 'tillable', x: 2, y: 38, w: 69, h: 10 },
  ],

  hilltop: [
    { type: 'cliff', x: 0, y: 0, w: 73, h: 2 },
    { type: 'cliff', x: 0, y: 53, w: 73, h: 2 },
    { type: 'cliff', x: 0, y: 0, w: 2, h: 55 },
    { type: 'cliff', x: 71, y: 0, w: 2, h: 55 },
    // Central hill / quarry
    { type: 'cliff', x: 28, y: 14, w: 18, h: 3 },
    { type: 'quarry', x: 30, y: 17, w: 14, h: 10 },
    { type: 'cliff', x: 28, y: 27, w: 18, h: 2 },
    // River cutting across
    { type: 'water', x: 0, y: 38, w: 28, h: 3 },
    { type: 'water', x: 46, y: 38, w: 27, h: 3 },
    // Small ponds
    { type: 'water', x: 4, y: 6, w: 4, h: 3 },
    { type: 'water', x: 60, y: 28, w: 5, h: 4 },
    { type: 'water', x: 0, y: 48, w: 73, h: 5 },
    // Building pads
    { type: 'grass', x: 0, y: 10, w: 8, h: 5 },
    { type: 'grass', x: 60, y: 6, w: 6, h: 5 },
    // Bridges
    { type: 'bridge', x: 12, y: 38, w: 3, h: 3 },
    { type: 'bridge', x: 48, y: 38, w: 3, h: 3 },
    // Tillable fields (patches around edges)
    { type: 'tillable', x: 2, y: 2, w: 26, h: 36 },
    { type: 'tillable', x: 46, y: 2, w: 25, h: 36 },
    { type: 'tillable', x: 2, y: 41, w: 69, h: 7 },
  ],

  wilderness: [
    { type: 'cliff', x: 0, y: 0, w: 73, h: 2 },
    { type: 'cliff', x: 0, y: 53, w: 73, h: 2 },
    { type: 'cliff', x: 0, y: 0, w: 2, h: 55 },
    { type: 'cliff', x: 71, y: 0, w: 2, h: 55 },
    // Large pond bottom
    { type: 'water', x: 0, y: 44, w: 24, h: 6 },
    // Medium pond center
    { type: 'water', x: 40, y: 18, w: 8, h: 6 },
    // Small decorative ponds
    { type: 'water', x: 14, y: 4, w: 3, h: 3 },
    { type: 'water', x: 58, y: 12, w: 4, h: 3 },
    // Bottom river (right side)
    { type: 'water', x: 24, y: 48, w: 49, h: 5 },
    // Building pads
    { type: 'grass', x: 0, y: 12, w: 8, h: 6 },
    { type: 'grass', x: 18, y: 0, w: 6, h: 5 },
    // Grandpa's shrine
    { type: 'grass', x: 4, y: 44, w: 3, h: 2 },
    // Bridges
    { type: 'bridge', x: 8, y: 44, w: 3, h: 3 },
    { type: 'bridge', x: 35, y: 48, w: 3, h: 3 },
    // Tillable fields
    { type: 'tillable', x: 2, y: 2, w: 38, h: 42 },
    { type: 'tillable', x: 42, y: 2, w: 29, h: 42 },
    { type: 'tillable', x: 30, y: 38, w: 43, h: 10 },
  ],

  fourCorners: [
    { type: 'cliff', x: 0, y: 0, w: 73, h: 2 },
    { type: 'cliff', x: 0, y: 53, w: 73, h: 2 },
    { type: 'cliff', x: 0, y: 0, w: 2, h: 55 },
    { type: 'cliff', x: 71, y: 0, w: 2, h: 55 },
    // Central dividing paths (4 quadrants)
    { type: 'path', x: 34, y: 0, w: 5, h: 55 },
    { type: 'path', x: 0, y: 25, w: 73, h: 5 },
    // Water features in each quadrant
    // NW quadrant pond
    { type: 'water', x: 8, y: 4, w: 6, h: 5 },
    // NE quadrant river
    { type: 'water', x: 41, y: 4, w: 6, h: 5 },
    // SW quadrant pond
    { type: 'water', x: 4, y: 34, w: 5, h: 4 },
    // SE quarry
    { type: 'quarry', x: 50, y: 34, w: 12, h: 8 },
    // Building pads
    { type: 'grass', x: 2, y: 18, w: 8, h: 5 },
    { type: 'grass', x: 40, y: 12, w: 8, h: 5 },
    // Grandpa's shrine
    { type: 'grass', x: 4, y: 48, w: 3, h: 2 },
    // Bottom river
    { type: 'water', x: 0, y: 48, w: 73, h: 5 },
    // Bridges over river
    { type: 'bridge', x: 12, y: 48, w: 3, h: 3 },
    { type: 'bridge', x: 50, y: 48, w: 3, h: 3 },
    // Tillable fields (all 4 quadrants)
    { type: 'tillable', x: 2, y: 2, w: 32, h: 23 },
    { type: 'tillable', x: 39, y: 2, w: 32, h: 23 },
    { type: 'tillable', x: 2, y: 30, w: 32, h: 18 },
    { type: 'tillable', x: 39, y: 30, w: 32, h: 18 },
  ],

  beach: [
    // Beach farm is 93×55
    { type: 'cliff', x: 0, y: 0, w: 93, h: 2 },
    { type: 'cliff', x: 0, y: 53, w: 93, h: 2 },
    { type: 'cliff', x: 0, y: 0, w: 2, h: 55 },
    { type: 'cliff', x: 91, y: 0, w: 2, h: 55 },
    // Mostly sand
    { type: 'sand', x: 2, y: 2, w: 89, h: 46 },
    // Ocean at bottom
    { type: 'water', x: 0, y: 48, w: 93, h: 5 },
    // Tide pools / small water patches
    { type: 'water', x: 60, y: 6, w: 6, h: 4 },
    { type: 'water', x: 76, y: 20, w: 5, h: 4 },
    { type: 'water', x: 10, y: 38, w: 4, h: 3 },
    // Building pad (farmhouse area)
    { type: 'grass', x: 0, y: 10, w: 10, h: 8 },
    // Supply crate area
    { type: 'grass', x: 80, y: 2, w: 10, h: 6 },
    // Tillable patches in the sand
    { type: 'tillable', x: 14, y: 4, w: 20, h: 14 },
    { type: 'tillable', x: 14, y: 20, w: 44, h: 12 },
    { type: 'tillable', x: 50, y: 4, w: 16, h: 14 },
    { type: 'tillable', x: 2, y: 32, w: 30, h: 14 },
    { type: 'tillable', x: 40, y: 34, w: 30, h: 12 },
    { type: 'tillable', x: 72, y: 2, w: 18, h: 14 },
    // Bridges over water
    { type: 'bridge', x: 20, y: 48, w: 3, h: 3 },
    { type: 'bridge', x: 55, y: 48, w: 3, h: 3 },
  ],

  meadowlands: [
    { type: 'cliff', x: 0, y: 0, w: 73, h: 2 },
    { type: 'cliff', x: 0, y: 53, w: 73, h: 2 },
    { type: 'cliff', x: 0, y: 0, w: 2, h: 55 },
    { type: 'cliff', x: 71, y: 0, w: 2, h: 55 },
    // River running through
    { type: 'water', x: 0, y: 22, w: 24, h: 3 },
    { type: 'water', x: 50, y: 22, w: 23, h: 3 },
    // Small ponds
    { type: 'water', x: 30, y: 8, w: 5, h: 4 },
    { type: 'water', x: 10, y: 36, w: 4, h: 3 },
    // Blue grass patches (meadow areas)
    { type: 'green', x: 2, y: 2, w: 16, h: 8 },
    { type: 'green', x: 50, y: 2, w: 18, h: 8 },
    { type: 'green', x: 2, y: 36, w: 14, h: 6 },
    // Building pads
    { type: 'grass', x: 0, y: 12, w: 9, h: 6 },
    { type: 'grass', x: 18, y: 0, w: 6, h: 5 },
    // Grandpa's shrine
    { type: 'grass', x: 7, y: 48, w: 3, h: 2 },
    // Bottom river
    { type: 'water', x: 0, y: 48, w: 73, h: 5 },
    // Bridges
    { type: 'bridge', x: 12, y: 22, w: 3, h: 3 },
    { type: 'bridge', x: 48, y: 22, w: 3, h: 3 },
    { type: 'bridge', x: 10, y: 48, w: 3, h: 3 },
    { type: 'bridge', x: 48, y: 48, w: 3, h: 3 },
    // Tillable fields
    { type: 'tillable', x: 20, y: 2, w: 28, h: 18 },
    { type: 'tillable', x: 2, y: 10, w: 18, h: 10 },
    { type: 'tillable', x: 52, y: 10, w: 19, h: 10 },
    { type: 'tillable', x: 2, y: 27, w: 69, h: 9 },
    { type: 'tillable', x: 2, y: 38, w: 69, h: 10 },
  ],
};
