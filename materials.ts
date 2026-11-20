export type IconName =
  | "sword"
  | "axe"
  | "pickaxe"
  | "helmet"
  | "chestplate"
  | "leggings"
  | "boots"
  | "shield"
  | "bow"
  | "arrow"
  | "potion"
  | "gapple"
  | "apple"
  | "pearl"
  | "crystal"
  | "totem"
  | "cobweb"
  | "rocket"
  | "bucket"
  | "trident"
  | "elytra"
  | "block"
  | "carrot"
  | "rod"
  | "bone"
  | "star";

type PathSet = { main: string; detail?: string; detail2?: string };

/* Hand-built 32x32 pixel-ish silhouettes. main = body, detail = highlight/trim. */
export const ICON_PATHS: Record<IconName, PathSet> = {
  sword: {
    main: "M23 2 L30 9 L13 26 L6 19 Z",
    detail: "M9 16 L16 23 L12 27 L5 20 Z M3 24 L8 29 L5 32 L0 27 Z",
  },
  axe: {
    main: "M8 2 L23 6 L21 17 L11 14 Z",
    detail: "M19 10 L25 16 L12 30 L6 24 Z",
  },
  pickaxe: {
    main: "M4 10 C9 2 23 2 28 10 L24 13 C20 8 12 8 8 13 Z",
    detail: "M20 10 L25 15 L12 30 L7 25 Z",
  },
  helmet: {
    main: "M6 21 L6 14 C6 6 12 3 16 3 C20 3 26 6 26 14 L26 21 L20 21 L20 16 L12 16 L12 21 Z",
    detail: "M12 19 H20 V22 H12 Z",
  },
  chestplate: {
    main: "M7 6 L13 3 H19 L25 6 L23 14 L20 13 L20 28 L12 28 L12 13 L9 14 Z",
    detail: "M13 4 H19 L19 9 H13 Z",
  },
  leggings: {
    main: "M8 3 H24 V9 L22 29 H17 L16 16 L15 29 H10 L8 9 Z",
    detail: "M11 6 H21 V9 H11 Z",
  },
  boots: {
    main: "M9 4 H19 V17 L26 20 V28 H9 Z",
    detail: "M9 24 H26 V28 H9 Z",
  },
  shield: {
    main: "M16 2 L28 6 V17 C28 25 22 29 16 31 C10 29 4 25 4 17 V6 Z",
    detail: "M16 6 L24 9 V17 C24 22 20 25 16 27 Z",
  },
  bow: {
    main: "M11 3 C22 8 26 12 26 16 C26 20 22 24 11 29 L14 24 C21 21 22 18 22 16 C22 14 21 11 14 8 Z",
    detail: "M9 2 L12 6 L12 26 L9 30 Z",
  },
  arrow: {
    main: "M4 27 L7 24 L21 10 L26 15 L12 29 Z",
    detail: "M20 3 L29 6 L26 15 L21 10 Z",
  },
  potion: {
    main: "M13 2 H19 V7 C24 9 26 13 26 18 V25 C26 29 23 31 19 31 H13 C9 31 6 29 6 25 V18 C6 13 8 9 13 7 Z",
    detail: "M9 19 H23 V26 C23 28 21 29 19 29 H13 C11 29 9 28 9 26 Z",
  },
  gapple: {
    main: "M16 8 C22 5 27 9 27 15 C27 22 22 30 16 28 C10 30 5 22 5 15 C5 9 10 5 16 8 Z",
    detail: "M15 7 L21 2 L23 5 L17 9 Z",
  },
  apple: {
    main: "M16 9 C21 6 26 10 26 16 C26 23 21 30 16 28 C11 30 6 23 6 16 C6 10 11 6 16 9 Z",
    detail: "M15 8 L21 3 L23 6 L17 10 Z",
  },
  pearl: {
    main: "M16 3 A13 13 0 1 0 16 29 A13 13 0 1 0 16 3 Z",
    detail: "M16 8 A8 8 0 1 0 16 24 A8 8 0 1 0 16 8 Z",
    detail2: "M14 11 C18 12 20 14 20 17",
  },
  crystal: {
    main: "M16 2 L23 11 L20 26 L12 26 L9 11 Z",
    detail: "M16 6 L20 12 L18 23 L14 23 L12 12 Z",
    detail2: "M7 25 H25 L23 30 H9 Z",
  },
  totem: {
    main: "M11 2 H21 V8 L25 11 V23 L21 26 V31 H11 V26 L7 23 V11 L11 8 Z",
    detail: "M13 13 H17 V16 H13 Z M19 13 H23 V16 H19 Z",
  },
  cobweb: {
    main: "M16 1 L31 16 L16 31 L1 16 Z",
    detail: "M16 7 L25 16 L16 25 L7 16 Z",
    detail2: "M16 1 V31 M1 16 H31 M5 5 L27 27 M27 5 L5 27",
  },
  rocket: {
    main: "M11 3 H21 V15 L24 19 H8 L11 15 Z",
    detail: "M8 19 H24 L22 23 H10 Z M11 23 L16 31 L21 23 Z",
  },
  bucket: {
    main: "M7 11 L12 6 H20 L25 11 V27 H7 Z",
    detail: "M9 16 H23 V25 H9 Z",
  },
  trident: {
    main: "M13 8 H19 V31 H13 Z",
    detail: "M4 3 H8 V12 C8 14 10 15 11 15 V9 H14 V18 H6 V6 C6 4 4 4 4 3 Z M24 3 H28 C28 4 26 4 26 6 V18 H18 V9 H21 V15 C22 15 24 14 24 12 Z",
  },
  elytra: {
    main: "M16 4 C25 6 29 12 27 21 C25 28 20 30 16 28 C12 30 7 28 5 21 C3 12 7 6 16 4 Z",
    detail: "M16 8 C21 9 23 14 22 20 C21 24 18 25 16 24 Z",
  },
  block: {
    main: "M16 2 L30 9 V23 L16 30 L2 23 V9 Z",
    detail: "M16 2 L30 9 L16 16 L2 9 Z",
    detail2: "M16 16 L16 30 M16 16 L2 9 M16 16 L30 9",
  },
  carrot: {
    main: "M11 10 L24 20 L19 27 L7 15 Z",
    detail: "M9 2 L15 6 L11 11 L6 7 Z",
  },
  rod: {
    main: "M22 2 L28 8 L11 30 L4 24 Z",
    detail: "M26 10 C30 13 30 18 26 20 C28 15 25 12 23 12 Z",
  },
  bone: {
    main: "M14 8 L18 12 L10 26 L5 25 Z",
    detail: "M4 26 L9 24 L11 28 L6 30 Z M17 4 L22 8 L19 11 L15 8 Z",
  },
  star: {
    main: "M16 2 L20 12 L31 13 L23 20 L26 31 L16 25 L6 31 L9 20 L1 13 L12 12 Z",
    detail: "M16 8 L18 15 L25 16 L20 20 L22 26 L16 22 Z",
  },
};

export type MaterialDef = {
  name: string;
  icon: IconName;
  color: string;
  accent: string;
};

const M = (name: string, icon: IconName, color: string, accent: string): MaterialDef => ({
  name,
  icon,
  color,
  accent,
});

export const MATERIALS: Record<string, MaterialDef> = {
  // weapons
  NETHERITE_SWORD: M("Netherite Sword", "sword", "#5b6472", "#9aa6b8"),
  DIAMOND_SWORD: M("Diamond Sword", "sword", "#4fd8e0", "#bff6fb"),
  IRON_SWORD: M("Iron Sword", "sword", "#d7dde6", "#ffffff"),
  EMERALD_BLADE: M("Emerald Blade", "sword", "#2ee06a", "#b6ffcd"),
  SATURN_BLADE: M("Ringcutter", "sword", "#a98bff", "#e6dcff"),
  DEMON_BLADE: M("Infernal Edge", "sword", "#ff5b3c", "#ffd0a1"),
  GOD_BLADE: M("Aureate Reaver", "sword", "#ffc531", "#fff2c0"),
  NETHERITE_AXE: M("Netherite Axe", "axe", "#5b6472", "#9aa6b8"),
  DIAMOND_AXE: M("Diamond Axe", "axe", "#4fd8e0", "#bff6fb"),
  IRON_AXE: M("Iron Axe", "axe", "#d7dde6", "#ffffff"),
  TRIDENT: M("Trident", "trident", "#2fa7a0", "#a8f0e8"),
  BOW: M("Bow", "bow", "#a2703f", "#d8b784"),
  CROSSBOW: M("Crossbow", "bow", "#8a6234", "#d8b784"),
  ARROW: M("Arrow", "arrow", "#c9d2de", "#8b5a2b"),
  SPECTRAL_ARROW: M("Spectral Arrow", "arrow", "#f6e27a", "#fff8c4"),
  // armor
  NETHERITE_HELMET: M("Netherite Helmet", "helmet", "#4e5665", "#8b98ab"),
  NETHERITE_CHESTPLATE: M("Netherite Chestplate", "chestplate", "#4e5665", "#8b98ab"),
  NETHERITE_LEGGINGS: M("Netherite Leggings", "leggings", "#4e5665", "#8b98ab"),
  NETHERITE_BOOTS: M("Netherite Boots", "boots", "#4e5665", "#8b98ab"),
  DIAMOND_HELMET: M("Diamond Helmet", "helmet", "#4fd8e0", "#c9f9fd"),
  DIAMOND_CHESTPLATE: M("Diamond Chestplate", "chestplate", "#4fd8e0", "#c9f9fd"),
  DIAMOND_LEGGINGS: M("Diamond Leggings", "leggings", "#4fd8e0", "#c9f9fd"),
  DIAMOND_BOOTS: M("Diamond Boots", "boots", "#4fd8e0", "#c9f9fd"),
  IRON_HELMET: M("Iron Helmet", "helmet", "#d7dde6", "#ffffff"),
  IRON_CHESTPLATE: M("Iron Chestplate", "chestplate", "#d7dde6", "#ffffff"),
  IRON_LEGGINGS: M("Iron Leggings", "leggings", "#d7dde6", "#ffffff"),
  IRON_BOOTS: M("Iron Boots", "boots", "#d7dde6", "#ffffff"),
  TURTLE_HELMET: M("Turtle Helmet", "helmet", "#5f8f4a", "#a7d98a"),
  LEATHER_CHESTPLATE: M("Leather Tunic", "chestplate", "#9b5b34", "#c98b5e"),
  ELYTRA: M("Elytra", "elytra", "#6f5f8c", "#c0b3dd"),
  SHIELD: M("Shield", "shield", "#7a5a34", "#c0a06a"),
  // utility
  ENDER_PEARL: M("Ender Pearl", "pearl", "#2b6f62", "#8ff2d5"),
  END_CRYSTAL: M("End Crystal", "crystal", "#e86bd0", "#ffd6f7"),
  TOTEM_OF_UNDYING: M("Totem of Undying", "totem", "#e0b23c", "#9be86b"),
  GOLDEN_APPLE: M("Golden Apple", "gapple", "#ffc531", "#ffe89a"),
  ENCHANTED_GOLDEN_APPLE: M("Enchanted Golden Apple", "gapple", "#ff9bf0", "#fff3b0"),
  APPLE: M("Apple", "apple", "#d93b3b", "#7ea832"),
  GOLDEN_CARROT: M("Golden Carrot", "carrot", "#ffc531", "#ffe89a"),
  CARROT: M("Carrot", "carrot", "#e8801f", "#4f9a3a"),
  COBWEB: M("Cobweb", "cobweb", "#e8ecf5", "#ffffff"),
  FIREWORK_ROCKET: M("Firework Rocket", "rocket", "#c9c9c9", "#ff6b4a"),
  WATER_BUCKET: M("Water Bucket", "bucket", "#9a9a9a", "#3b8fe0"),
  LAVA_BUCKET: M("Lava Bucket", "bucket", "#9a9a9a", "#ff7a1a"),
  OBSIDIAN: M("Obsidian", "block", "#241b38", "#6b4fa0"),
  CRYING_OBSIDIAN: M("Crying Obsidian", "block", "#3a1f4a", "#c14bd0"),
  ENDER_CHEST: M("Ender Chest", "block", "#2b3d5c", "#8ff2d5"),
  GOLD_BLOCK: M("Gold Block", "block", "#ffc531", "#ffe89a"),
  EMERALD_BLOCK: M("Emerald Block", "block", "#2ee06a", "#b6ffcd"),
  BONE: M("Bone", "bone", "#efeadb", "#ffffff"),
  BLAZE_ROD: M("Blaze Rod", "rod", "#ffc531", "#fff0a8"),
  NETHER_STAR: M("Nether Star", "star", "#fff3b0", "#ffffff"),
  POTION_STRENGTH: M("Potion of Strength", "potion", "#d2323c", "#ff6b6b"),
  POTION_SPEED: M("Potion of Swiftness", "potion", "#7caaf5", "#bcd6ff"),
  POTION_HEAL: M("Potion of Healing", "potion", "#f03c46", "#ff9aa2"),
  POTION_SLOWFALL: M("Potion of Slow Falling", "potion", "#d8d8ff", "#f2f2ff"),
  POTION_FIRERES: M("Potion of Fire Resistance", "potion", "#e57a26", "#ffc48a"),
  POTION_REGEN: M("Potion of Regeneration", "potion", "#c92bb0", "#ff8fe0"),
  SPLASH_HEAL: M("Splash Potion of Healing", "potion", "#f03c46", "#ffd0d3"),
  SPLASH_SLOW: M("Splash Potion of Slowness", "potion", "#5c6f8a", "#a8bcd6"),
  EXPERIENCE_BOTTLE: M("Bottle o' Enchanting", "potion", "#7ee06b", "#d8ffb0"),
  BREAD: M("Bread", "carrot", "#c98b4a", "#e8bd7a"),
  STEAK: M("Steak", "block", "#a04a3a", "#d88a6a"),
};

export function mat(id: string): MaterialDef {
  return (
    MATERIALS[id] ?? {
      name: id
        .toLowerCase()
        .split("_")
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" "),
      icon: "block",
      color: "#9aa6b8",
      accent: "#e6e8f0",
    }
  );
}

export const ENCHANT_NAMES: Record<string, string> = {
  PROTECTION_ENVIRONMENTAL: "Protection",
  PROTECTION_FIRE: "Fire Protection",
  PROTECTION_PROJECTILE: "Projectile Protection",
  PROTECTION_BLAST: "Blast Protection",
  DURABILITY: "Unbreaking",
  MENDING: "Mending",
  THORNS: "Thorns",
  RESPIRATION: "Respiration",
  FEATHER_FALLING: "Feather Falling",
  DEPTH_STRIDER: "Depth Strider",
  SOUL_SPEED: "Soul Speed",
  SWIFT_SNEAK: "Swift Sneak",
  DAMAGE_ALL: "Sharpness",
  FIRE_ASPECT: "Fire Aspect",
  KNOCKBACK: "Knockback",
  SWEEPING_EDGE: "Sweeping Edge",
  LOOT_BONUS_MOBS: "Looting",
  PUNCH: "Punch",
  POWER: "Power",
  INFINITY: "Infinity",
  FLAME: "Flame",
  IMPALING: "Impaling",
  RIPTIDE: "Riptide",
  CHANNELING: "Channeling",
  LOYALTY: "Loyalty",
  UNBREAKING: "Unbreaking",
};
