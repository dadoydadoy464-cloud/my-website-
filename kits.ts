export type KitItem = {
  id: string;
  amount: number;
  enchants?: string[];
  name?: string;
  lore?: string[];
  slot?: number; // 0-8 hotbar, 9-35 inventory
  offhand?: boolean;
  potion?: string[];
};

export type KitStats = { damage: number; defense: number; mobility: number; sustain: number };

export type Kit = {
  key: string;
  name: string;
  display: string;
  tier: "MYTHIC" | "LEGENDARY" | "EPIC" | "RANK" | "FREE";
  rankLabel: string;
  permission: string;
  price: number;
  cooldownSeconds: number;
  guiSlot: number;
  icon: string;
  tagline: string;
  description: string;
  colors: { from: string; to: string; accent: string; soft: string };
  stats: KitStats;
  armor: { helmet: KitItem; chest: KitItem; legs: KitItem; boots: KitItem };
  items: KitItem[];
  perks: string[];
  actions: { label: string; command: string }[];
  featured?: boolean;
  players: string;
};

const P = (e: string, l: number) => `${e};${l}`;

/* ------------------------------------------------------------------ DEMON */
const demon: Kit = {
  key: "demon",
  name: "Demon Kit",
  display: "&4&lDEMON KIT",
  tier: "MYTHIC",
  rankLabel: "Requires &4DEMON &7rank",
  permission: "playerkits2.kit.demon",
  price: 25000,
  cooldownSeconds: 21600,
  guiSlot: 11,
  icon: "DEMON_BLADE",
  tagline: "Infernal crystal-pvp monster",
  description:
    "The most aggressive loadout on the server. Permanent fire immunity, an Infernal Edge that melts armour durability and enough crystals to flatten a 5-man gank squad.",
  colors: { from: "#7f1d1d", to: "#ef4444", accent: "#fca5a5", soft: "rgba(239,68,68,0.16)" },
  stats: { damage: 97, defense: 88, mobility: 62, sustain: 90 },
  armor: {
    helmet: { id: "NETHERITE_HELMET", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 4), P("DURABILITY", 3), P("MENDING", 1), P("RESPIRATION", 3)], name: "&4Demon Crown" },
    chest: { id: "NETHERITE_CHESTPLATE", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 4), P("DURABILITY", 3), P("MENDING", 1), P("THORNS", 3)], name: "&4Demon Carapace" },
    legs: { id: "NETHERITE_LEGGINGS", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 4), P("DURABILITY", 3), P("MENDING", 1)], name: "&cDemon Greaves" },
    boots: { id: "NETHERITE_BOOTS", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 4), P("DURABILITY", 3), P("MENDING", 1), P("SOUL_SPEED", 3)], name: "&4Demon Treads" },
  },
  items: [
    { id: "TOTEM_OF_UNDYING", amount: 1, offhand: true, name: "&4Soul Chain" },
    { id: "DEMON_BLADE", amount: 1, slot: 0, enchants: [P("DAMAGE_ALL", 5), P("FIRE_ASPECT", 2), P("SWEEPING_EDGE", 3), P("DURABILITY", 3)], name: "&4&lInfernal Edge" },
    { id: "END_CRYSTAL", amount: 64, slot: 1, name: "&cHellfire Crystal" },
    { id: "OBSIDIAN", amount: 64, slot: 2 },
    { id: "GOLDEN_APPLE", amount: 64, slot: 3 },
    { id: "ENCHANTED_GOLDEN_APPLE", amount: 8, slot: 4 },
    { id: "ENDER_PEARL", amount: 16, slot: 5 },
    { id: "POTION_STRENGTH", amount: 1, slot: 6, potion: ["INCREASE_DAMAGE;1;9600"] },
    { id: "WATER_BUCKET", amount: 1, slot: 7 },
    { id: "TOTEM_OF_UNDYING", amount: 1, slot: 8 },
    { id: "END_CRYSTAL", amount: 64, slot: 9 },
    { id: "OBSIDIAN", amount: 64, slot: 10 },
    { id: "GOLDEN_APPLE", amount: 64, slot: 11 },
    { id: "TOTEM_OF_UNDYING", amount: 8, slot: 12, name: "&6Undying Charm" },
    { id: "CRYING_OBSIDIAN", amount: 32, slot: 13 },
    { id: "ENDER_PEARL", amount: 16, slot: 14 },
    { id: "COBWEB", amount: 16, slot: 15 },
    { id: "SPLASH_HEAL", amount: 3, slot: 16, potion: ["HEAL;1;1"] },
    { id: "LAVA_BUCKET", amount: 1, slot: 17 },
  ],
  perks: [
    "Permanent &4Fire Resistance &7while the kit is equipped",
    "&4Infernal Edge&7: Sharpness V + Fire Aspect II + Sweeping Edge III",
    "Full &8Netherite &7Prot IV / Unbreaking III / Mending set",
    "Cosmetic &cdemon horn hat &7+ ember particle trail",
  ],
  actions: [
    { label: "Fire immunity (permanent)", command: "effect give %player% fire_resistance 999999 0 true" },
    { label: "Ember trail cosmetics", command: "cosmetic give %player% trail ember 999999" },
    { label: "Broadcast", command: 'bc &4%player% &7forged the &c&lDEMON KIT&7!' },
  ],
  featured: true,
  players: "1.2k",
};

/* ----------------------------------------------------------------- SATURN */
const saturn: Kit = {
  key: "saturn",
  name: "Saturn Kit",
  display: "&5&lSATURN KIT",
  tier: "LEGENDARY",
  rankLabel: "Requires &5SATURN &7rank",
  permission: "playerkits2.kit.saturn",
  price: 18500,
  cooldownSeconds: 28800,
  guiSlot: 12,
  icon: "SATURN_BLADE",
  tagline: "Zero-gravity mobility king",
  description:
    "Control the sky and the arena floor. Riptide trident, slow-falling immunity and a shield that orbits you like a ring. Hard-counters crystal campers who hide on pillars.",
  colors: { from: "#4c1d95", to: "#8b5cf6", accent: "#c4b5fd", soft: "rgba(139,92,246,0.16)" },
  stats: { damage: 82, defense: 90, mobility: 99, sustain: 74 },
  armor: {
    helmet: { id: "NETHERITE_HELMET", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 4), P("DURABILITY", 3), P("MENDING", 1), P("RESPIRATION", 3)], name: "&5Saturn Halo" },
    chest: { id: "NETHERITE_CHESTPLATE", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 4), P("DURABILITY", 3), P("MENDING", 1), P("PROTECTION_BLAST", 4)], name: "&5Ring Bearer Plate" },
    legs: { id: "NETHERITE_LEGGINGS", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 4), P("DURABILITY", 3), P("MENDING", 1), P("SWIFT_SNEAK", 3)], name: "&dOrbit Greaves" },
    boots: { id: "NETHERITE_BOOTS", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 4), P("FEATHER_FALLING", 4), P("DEPTH_STRIDER", 3), P("MENDING", 1)], name: "&5Gravity Well" },
  },
  items: [
    { id: "SHIELD", amount: 1, offhand: true, enchants: [P("DURABILITY", 3)], name: "&5Saturn's Ring" },
    { id: "SATURN_BLADE", amount: 1, slot: 0, enchants: [P("DAMAGE_ALL", 5), P("SWEEPING_EDGE", 3), P("KNOCKBACK", 1), P("MENDING", 1)], name: "&5&lRingcutter" },
    { id: "TRIDENT", amount: 1, slot: 1, enchants: [P("RIPTIDE", 3), P("LOYALTY", 3), P("IMPALING", 5), P("MENDING", 1)], name: "&5Lunar Trident" },
    { id: "END_CRYSTAL", amount: 32, slot: 2 },
    { id: "OBSIDIAN", amount: 64, slot: 3 },
    { id: "GOLDEN_APPLE", amount: 32, slot: 4 },
    { id: "ENCHANTED_GOLDEN_APPLE", amount: 4, slot: 5 },
    { id: "POTION_SLOWFALL", amount: 1, slot: 6, potion: ["SLOW_FALLING;1;3600"] },
    { id: "FIREWORK_ROCKET", amount: 16, slot: 7 },
    { id: "TOTEM_OF_UNDYING", amount: 1, slot: 8 },
    { id: "ELYTRA", amount: 1, slot: 9, enchants: [P("DURABILITY", 3), P("MENDING", 1)], name: "&5Wings of Saturn" },
    { id: "ENDER_PEARL", amount: 32, slot: 10 },
    { id: "OBSIDIAN", amount: 64, slot: 11 },
    { id: "TOTEM_OF_UNDYING", amount: 6, slot: 12 },
    { id: "COBWEB", amount: 24, slot: 13 },
    { id: "GOLDEN_APPLE", amount: 32, slot: 14 },
    { id: "SPLASH_SLOW", amount: 4, slot: 15, potion: ["SLOW;4;400"] },
    { id: "EXPERIENCE_BOTTLE", amount: 32, slot: 16 },
  ],
  perks: [
    "No fall damage for &d60s &7after claiming (Gravity Well)",
    "&5Riptide III Trident &7+ Elytra for insane repositioning",
    "Orbital &fShield &7with Unbreaking III in the off-hand",
    "Cosmetic &dring halo &7+ /fly in the spawn hub",
  ],
  actions: [
    { label: "Slow falling (60s)", command: "effect give %player% slow_falling 1200 0 true" },
    { label: "Speed II (60s)", command: "effect give %player% speed 1200 1 true" },
    { label: "Broadcast", command: 'bc &5%player% &7entered orbit with the &d&lSATURN KIT&7!' },
  ],
  featured: true,
  players: "980",
};

/* -------------------------------------------------------------------- GOD */
const god: Kit = {
  key: "god",
  name: "God Kit",
  display: "&6&lGOD KIT",
  tier: "LEGENDARY",
  rankLabel: "Requires &6GOD &7rank",
  permission: "playerkits2.kit.god",
  price: 30000,
  cooldownSeconds: 86400,
  guiSlot: 14,
  icon: "GOD_BLADE",
  tagline: "Maxed everything, once a day",
  description:
    "Every slot maxed. God armor with Thorns, 16 notch apples, 128 crystals and a Nether Star that makes you the raid boss. 24 hour cooldown because it breaks the meta.",
  colors: { from: "#a16207", to: "#fbbf24", accent: "#fde68a", soft: "rgba(251,191,36,0.16)" },
  stats: { damage: 100, defense: 100, mobility: 70, sustain: 100 },
  armor: {
    helmet: { id: "NETHERITE_HELMET", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 4), P("DURABILITY", 3), P("MENDING", 1), P("RESPIRATION", 3), P("PROTECTION_FIRE", 4)], name: "&6Crown of Divinity" },
    chest: { id: "NETHERITE_CHESTPLATE", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 4), P("DURABILITY", 3), P("MENDING", 1), P("THORNS", 3)], name: "&6Aegis of God" },
    legs: { id: "NETHERITE_LEGGINGS", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 4), P("DURABILITY", 3), P("MENDING", 1), P("PROTECTION_BLAST", 4)], name: "&6Divine Greaves" },
    boots: { id: "NETHERITE_BOOTS", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 4), P("DURABILITY", 3), P("MENDING", 1), P("FEATHER_FALLING", 4), P("DEPTH_STRIDER", 3)], name: "&6Sandals of Light" },
  },
  items: [
    { id: "TOTEM_OF_UNDYING", amount: 1, offhand: true, name: "&6Divine Totem" },
    { id: "GOD_BLADE", amount: 1, slot: 0, enchants: [P("DAMAGE_ALL", 5), P("FIRE_ASPECT", 2), P("KNOCKBACK", 2), P("SWEEPING_EDGE", 3), P("LOOT_BONUS_MOBS", 3), P("MENDING", 1)], name: "&6&lAureate Reaver" },
    { id: "END_CRYSTAL", amount: 64, slot: 1 },
    { id: "OBSIDIAN", amount: 64, slot: 2 },
    { id: "ENCHANTED_GOLDEN_APPLE", amount: 16, slot: 3 },
    { id: "GOLDEN_APPLE", amount: 64, slot: 4 },
    { id: "ENDER_PEARL", amount: 16, slot: 5 },
    { id: "POTION_STRENGTH", amount: 1, slot: 6, potion: ["INCREASE_DAMAGE;1;9600"] },
    { id: "POTION_REGEN", amount: 1, slot: 7, potion: ["REGENERATION;1;9600"] },
    { id: "TOTEM_OF_UNDYING", amount: 1, slot: 8, name: "&6God Charm" },
    { id: "END_CRYSTAL", amount: 64, slot: 9 },
    { id: "OBSIDIAN", amount: 64, slot: 10 },
    { id: "NETHER_STAR", amount: 1, slot: 11, name: "&6&lBeacon of God", lore: ["&7Right-click to activate", "&7a 30 block resistance field."] },
    { id: "ENCHANTED_GOLDEN_APPLE", amount: 8, slot: 12 },
    { id: "GOLDEN_APPLE", amount: 64, slot: 13 },
    { id: "TOTEM_OF_UNDYING", amount: 16, slot: 14 },
    { id: "ENDER_PEARL", amount: 16, slot: 15 },
    { id: "EXPERIENCE_BOTTLE", amount: 64, slot: 16 },
    { id: "GOLD_BLOCK", amount: 32, slot: 17 },
    { id: "CRYING_OBSIDIAN", amount: 32, slot: 18 },
  ],
  perks: [
    "&6Absorption IV &7+ Regeneration II applied on claim",
    "&6Aureate Reaver&7: Sharpness V, Fire Aspect II, Knockback II",
    "&e16 Enchanted Golden Apples &7and 16 totems of undying",
    "&6Golden aura cosmetics &7+ /godaura toggle",
  ],
  actions: [
    { label: "Absorption IV (5m)", command: "effect give %player% absorption 6000 3 true" },
    { label: "Regeneration II (2m)", command: "effect give %player% regeneration 2400 1 true" },
    { label: "Hearts to 20 + feed", command: "feed %player%" },
    { label: "Broadcast", command: 'bc &6%player% &7ascended with the &e&lGOD KIT&7!' },
  ],
  featured: true,
  players: "760",
};

/* -------------------------------------------------------------------- MVP */
const mvp: Kit = {
  key: "mvp",
  name: "MVP Kit",
  display: "&b&lMVP KIT",
  tier: "EPIC",
  rankLabel: "Requires &bMVP &7rank",
  permission: "playerkits2.kit.mvp",
  price: 9500,
  cooldownSeconds: 10800,
  guiSlot: 15,
  icon: "DIAMOND_SWORD",
  tagline: "Diamond value, 3h cooldown",
  description:
    "The workhorse kit for ranked ladder grinders. Full diamond with Prot IV chest, a stack of crystals and enough gaps to outlast anyone in a heal trade.",
  colors: { from: "#155e75", to: "#22d3ee", accent: "#a5f3fc", soft: "rgba(34,211,238,0.14)" },
  stats: { damage: 74, defense: 76, mobility: 68, sustain: 72 },
  armor: {
    helmet: { id: "DIAMOND_HELMET", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 3), P("DURABILITY", 3)], name: "&bMVP Visor" },
    chest: { id: "DIAMOND_CHESTPLATE", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 4), P("DURABILITY", 3), P("MENDING", 1)], name: "&bMVP Plate" },
    legs: { id: "DIAMOND_LEGGINGS", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 3), P("DURABILITY", 3)], name: "&bMVP Leggings" },
    boots: { id: "DIAMOND_BOOTS", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 3), P("FEATHER_FALLING", 4), P("DURABILITY", 3)], name: "&bMVP Boots" },
  },
  items: [
    { id: "SHIELD", amount: 1, offhand: true, enchants: [P("DURABILITY", 3)], name: "&bMVP Bulwark" },
    { id: "DIAMOND_SWORD", amount: 1, slot: 0, enchants: [P("DAMAGE_ALL", 4), P("FIRE_ASPECT", 1), P("SWEEPING_EDGE", 3), P("DURABILITY", 3)], name: "&b&lMVP Fang" },
    { id: "END_CRYSTAL", amount: 32, slot: 1 },
    { id: "OBSIDIAN", amount: 32, slot: 2 },
    { id: "GOLDEN_APPLE", amount: 32, slot: 3 },
    { id: "ENDER_PEARL", amount: 8, slot: 4 },
    { id: "POTION_HEAL", amount: 1, slot: 5, potion: ["HEAL;1;1"] },
    { id: "WATER_BUCKET", amount: 1, slot: 6 },
    { id: "TOTEM_OF_UNDYING", amount: 1, slot: 7 },
    { id: "GOLDEN_CARROT", amount: 16, slot: 8 },
    { id: "GOLDEN_APPLE", amount: 32, slot: 9 },
    { id: "END_CRYSTAL", amount: 16, slot: 10 },
    { id: "OBSIDIAN", amount: 32, slot: 11 },
    { id: "TOTEM_OF_UNDYING", amount: 4, slot: 12 },
    { id: "COBWEB", amount: 8, slot: 13 },
    { id: "ENDER_PEARL", amount: 8, slot: 14 },
  ],
  perks: [
    "Claimable every &b3 hours",
    "&bDiamond &7Prot IV chest + Feather Falling IV boots",
    "Access to &b/craft&7, &b/ec &7and &b/enderchest",
    "&bx1.5 &7coin multiplier on kills",
  ],
  actions: [
    { label: "Speed I (2m)", command: "effect give %player% speed 2400 0 true" },
    { label: "Broadcast", command: 'bc &b%player% &7claimed the &3&lMVP KIT&7!' },
  ],
  players: "3.4k",
};

/* -------------------------------------------------------------------- VIP */
const vip: Kit = {
  key: "vip",
  name: "VIP Kit",
  display: "&a&lVIP KIT",
  tier: "RANK",
  rankLabel: "Requires &aVIP &7rank",
  permission: "playerkits2.kit.vip",
  price: 4500,
  cooldownSeconds: 14400,
  guiSlot: 20,
  icon: "EMERALD_BLADE",
  tagline: "Emerald starter upgrade",
  description:
    "Your first real upgrade from iron. Emerald Blade with Sharpness III, a diamond chest to stop one-taps crits and pearls so you can finally chase people down.",
  colors: { from: "#14532d", to: "#22c55e", accent: "#bbf7d0", soft: "rgba(34,197,94,0.14)" },
  stats: { damage: 55, defense: 58, mobility: 52, sustain: 50 },
  armor: {
    helmet: { id: "IRON_HELMET", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 2), P("DURABILITY", 2)], name: "&aVIP Helm" },
    chest: { id: "DIAMOND_CHESTPLATE", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 2), P("DURABILITY", 2)], name: "&aVIP Guard" },
    legs: { id: "IRON_LEGGINGS", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 2), P("DURABILITY", 2)], name: "&aVIP Leggings" },
    boots: { id: "IRON_BOOTS", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 2), P("FEATHER_FALLING", 2)], name: "&aVIP Boots" },
  },
  items: [
    { id: "SHIELD", amount: 1, offhand: true, name: "&aVIP Shield" },
    { id: "EMERALD_BLADE", amount: 1, slot: 0, enchants: [P("DAMAGE_ALL", 3), P("KNOCKBACK", 1), P("DURABILITY", 2)], name: "&a&lEmerald Blade" },
    { id: "OBSIDIAN", amount: 16, slot: 1 },
    { id: "GOLDEN_APPLE", amount: 16, slot: 2 },
    { id: "ENDER_PEARL", amount: 4, slot: 3 },
    { id: "COBWEB", amount: 8, slot: 4 },
    { id: "WATER_BUCKET", amount: 1, slot: 5 },
    { id: "STEAK", amount: 16, slot: 6 },
    { id: "APPLE", amount: 16, slot: 7 },
    { id: "BREAD", amount: 16, slot: 8 },
    { id: "GOLDEN_APPLE", amount: 16, slot: 9 },
    { id: "ENDER_PEARL", amount: 4, slot: 10 },
    { id: "EMERALD_BLOCK", amount: 8, slot: 11 },
  ],
  perks: [
    "Claimable every &a4 hours",
    "&aEmerald Blade &7with Sharpness III + Knockback I",
    "Access to &a/hat&7, &a/nick &7and 2 extra homes",
    "&ax1.25 &7coin multiplier on kills",
  ],
  actions: [{ label: "Broadcast", command: "bc &a%player% &7claimed the &2&lVIP KIT&7!" }],
  players: "6.8k",
};

/* ----------------------------------------------------------------- FREE */
const rookie: Kit = {
  key: "rookie",
  name: "Rookie Kit",
  display: "&f&lROOKIE KIT",
  tier: "FREE",
  rankLabel: "&7Free for everyone",
  permission: "",
  price: 0,
  cooldownSeconds: 43200,
  guiSlot: 4,
  icon: "IRON_SWORD",
  tagline: "Free starter loadout",
  description:
    "Everyone gets this one. Iron gear, a few gaps and two pearls so you can at least run. Enough to learn crystal timings before you buy a rank.",
  colors: { from: "#334155", to: "#94a3b8", accent: "#e2e8f0", soft: "rgba(148,163,184,0.12)" },
  stats: { damage: 32, defense: 30, mobility: 34, sustain: 24 },
  armor: {
    helmet: { id: "IRON_HELMET", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 1)] },
    chest: { id: "IRON_CHESTPLATE", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 1)] },
    legs: { id: "IRON_LEGGINGS", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 1)] },
    boots: { id: "IRON_BOOTS", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 1)] },
  },
  items: [
    { id: "IRON_SWORD", amount: 1, slot: 0, enchants: [P("DAMAGE_ALL", 1)] },
    { id: "IRON_AXE", amount: 1, slot: 1 },
    { id: "GOLDEN_APPLE", amount: 4, slot: 2 },
    { id: "ENDER_PEARL", amount: 2, slot: 3 },
    { id: "COBWEB", amount: 4, slot: 4 },
    { id: "WATER_BUCKET", amount: 1, slot: 5 },
    { id: "STEAK", amount: 8, slot: 6 },
    { id: "BREAD", amount: 8, slot: 7 },
    { id: "APPLE", amount: 8, slot: 8 },
  ],
  perks: ["No rank needed", "Claimable every &f12 hours", "Great for learning crystal timings"],
  actions: [],
  players: "all",
};

const archer: Kit = {
  key: "archer",
  name: "Archer Kit",
  display: "&6&lARCHER KIT",
  tier: "FREE",
  rankLabel: "&7Free for everyone",
  permission: "",
  price: 1200,
  cooldownSeconds: 21600,
  guiSlot: 5,
  icon: "BOW",
  tagline: "Bow + webs, for the patient",
  description:
    "Infinite arrows, Punch II to yeet people off edges and a stack of cobwebs for the classic trap. Free, but only every 6 hours.",
  colors: { from: "#7c2d12", to: "#f59e0b", accent: "#fde68a", soft: "rgba(245,158,11,0.12)" },
  stats: { damage: 48, defense: 26, mobility: 60, sustain: 30 },
  armor: {
    helmet: { id: "IRON_HELMET", amount: 1, enchants: [P("PROTECTION_PROJECTILE", 2)] },
    chest: { id: "LEATHER_CHESTPLATE", amount: 1, enchants: [P("PROTECTION_ENVIRONMENTAL", 2)] },
    legs: { id: "IRON_LEGGINGS", amount: 1, enchants: [P("PROTECTION_PROJECTILE", 1)] },
    boots: { id: "IRON_BOOTS", amount: 1, enchants: [P("FEATHER_FALLING", 2)] },
  },
  items: [
    { id: "BOW", amount: 1, slot: 0, enchants: [P("POWER", 4), P("PUNCH", 2), P("INFINITY", 1), P("FLAME", 1)], name: "&6Longshot" },
    { id: "ARROW", amount: 64, slot: 1 },
    { id: "COBWEB", amount: 64, slot: 2 },
    { id: "GOLDEN_APPLE", amount: 8, slot: 3 },
    { id: "ENDER_PEARL", amount: 4, slot: 4 },
    { id: "IRON_SWORD", amount: 1, slot: 5, enchants: [P("DAMAGE_ALL", 2)] },
    { id: "WATER_BUCKET", amount: 1, slot: 6 },
    { id: "STEAK", amount: 16, slot: 7 },
    { id: "SPECTRAL_ARROW", amount: 16, slot: 8 },
  ],
  perks: ["No rank needed", "&6Infinity Bow &7with Power IV + Punch II", "x64 cobwebs for trapping"],
  actions: [],
  players: "2.1k",
};

export const KITS: Kit[] = [demon, saturn, god, mvp, vip, rookie, archer];

export const TIER_ORDER: Record<Kit["tier"], number> = {
  MYTHIC: 0,
  LEGENDARY: 1,
  EPIC: 2,
  RANK: 3,
  FREE: 4,
};

export function kitByKey(key: string): Kit | undefined {
  return KITS.find((k) => k.key === key);
}

export function cooldownLabel(seconds: number): string {
  if (seconds <= 0) return "no cooldown";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  if (m) return `${m}m`;
  return `${seconds}s`;
}

export function itemSlots(kit: Kit): (KitItem | null)[] {
  const slots: (KitItem | null)[] = Array(36).fill(null);
  for (const it of kit.items) {
    const s = it.slot ?? 0;
    if (s >= 0 && s < 36) slots[s] = it;
  }
  return slots;
}

export function offhandItem(kit: Kit): KitItem | undefined {
  return kit.items.find((i) => i.offhand);
}
