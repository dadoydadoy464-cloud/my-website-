import { KITS, offhandItem, type Kit, type KitItem } from "../data/kits";
import { ENCHANT_NAMES, mat } from "../data/materials";
import { cooldownLabel } from "../data/kits";

export type KitOverride = {
  enabled: boolean;
  cooldown: number;
  price: number;
  guiSlot: number;
  permission: string;
};

export type GenOptions = {
  overrides: Record<string, KitOverride>;
  autoArmor: boolean;
  clearInventory: boolean;
  oneTime: boolean;
  permissionRequired: boolean;
  includeDisplay: boolean;
  includeActions: boolean;
  includeEnchants: boolean;
  includeCustomNames: boolean;
  includePreviewSlots: boolean;
};

export const DEFAULT_OPTIONS: GenOptions = {
  overrides: Object.fromEntries(
    KITS.map((k) => [
      k.key,
      {
        enabled: true,
        cooldown: k.cooldownSeconds,
        price: k.price,
        guiSlot: k.guiSlot,
        permission: k.permission,
      } as KitOverride,
    ]),
  ) as Record<string, KitOverride>,
  autoArmor: true,
  clearInventory: true,
  oneTime: false,
  permissionRequired: true,
  includeDisplay: true,
  includeActions: true,
  includeEnchants: true,
  includeCustomNames: true,
  includePreviewSlots: true,
};

const q = (s: string) => `'${s.replace(/'/g, "''")}'`;
const pad = (n: number) => " ".repeat(n);

function prettyEnchant(code: string): string {
  const [name, lvl] = code.split(";");
  return `${ENCHANT_NAMES[name] ?? name} ${lvl}`;
}



/** Human readable summary lines used inside the generated lore. */
export function kitLore(kit: Kit, opts: GenOptions): string[] {
  const armor = [kit.armor.helmet, kit.armor.chest, kit.armor.legs, kit.armor.boots];
  const off = offhandItem(kit);
  const o = opts.overrides[kit.key];
  const label = (it: KitItem) => (opts.includeCustomNames && it.name ? it.name : `&f${mat(it.id).name}`);
  const short = (it: KitItem) => {
    const top = (it.enchants ?? [])
      .filter((e) => e.startsWith("PROTECTION") || e.startsWith("DAMAGE_ALL") || e.startsWith("FEATHER"))
      .slice(0, 1)
      .map((e) => {
        const [n, l] = e.split(";");
        const nm = ENCHANT_NAMES[n] ?? n;
        return `&8(${nm.split(" ")[0]} ${l})`;
      });
    return top.join("");
  };

  const lines: string[] = ["&8&m----------------------------"];
  lines.push("&fThis kit includes:");
  const weapon = kit.items.find((i) => !i.offhand);
  if (weapon) lines.push(`&8- &7x1 ${label(weapon)} ${short(weapon)}`.trimEnd());
  for (const a of armor) lines.push(`&8- &7x1 ${label(a)} ${short(a)}`.trimEnd());
  if (off) lines.push(`&8- &7x1 ${label(off)} &8(off-hand)`);

  const counts = new Map<string, number>();
  for (const it of kit.items) {
    if (it.offhand) continue;
    counts.set(it.id, (counts.get(it.id) ?? 0) + it.amount);
  }
  const shown = [...counts.entries()].slice(0, 6);
  for (const [id, amt] of shown) {
    const isHeadline = weapon?.id === id;
    if (isHeadline) continue;
    lines.push(`&8- &7x${amt} ${mat(id).name.replace(/[^A-Za-z ]/g, "").toLowerCase()}`);
  }
  if (counts.size > 6) lines.push(`&8- &7+${counts.size - 6} more stacks`);

  lines.push("");
  lines.push(`&7Cooldown: &c${cooldownLabel(o?.cooldown ?? kit.cooldownSeconds)}`);
  lines.push(`&7Price: &e${(o?.price ?? kit.price).toLocaleString()} coins`);
  lines.push(kit.permission ? `&7Rank: &f${kit.name.replace(" Kit", "").toUpperCase()}` : "&7Rank: &aFREE");
  lines.push("");
  lines.push("&aLeft click to claim!");
  lines.push("&bRight click to preview!");
  return lines;
}

function writeItem(buf: string[], idx: number, it: KitItem, opts: GenOptions, indent: number, note?: string): number {
  buf.push(`${pad(indent)}'${idx}':${note ? `        # ${note}` : ""}`);
  buf.push(`${pad(indent + 2)}id: ${it.id}`);
  if (opts.includeCustomNames && it.name) buf.push(`${pad(indent + 2)}name: ${q(it.name)}`);
  buf.push(`${pad(indent + 2)}amount: ${it.amount}`);
  if (opts.includeEnchants && it.enchants?.length) {
    buf.push(`${pad(indent + 2)}enchants:`);
    for (const e of it.enchants) buf.push(`${pad(indent + 4)}- ${q(e)}`);
  }
  if (it.potion?.length) {
    buf.push(`${pad(indent + 2)}potion_data:`);
    buf.push(`${pad(indent + 4)}effects:`);
    for (const p of it.potion) buf.push(`${pad(indent + 6)}- ${q(p)}`);
  }
  if (it.offhand) buf.push(`${pad(indent + 2)}offhand: true`);
  if (opts.includePreviewSlots && it.slot !== undefined) buf.push(`${pad(indent + 2)}preview_slot: ${it.slot}`);
  if (it.lore?.length) {
    buf.push(`${pad(indent + 2)}lore:`);
    for (const l of it.lore) buf.push(`${pad(indent + 4)}- ${q(l)}`);
  }
  return idx + 1;
}

export function generateKitsYaml(opts: GenOptions): string {
  const active = KITS.filter((k) => opts.overrides[k.key]?.enabled);
  const buf: string[] = [];
  buf.push("# ============================================================");
  buf.push("#  PlayerKits2  |  kits.yml");
  buf.push("#  Server : CPVP Network  (crystal pvp / 1.9+ combat)");
  buf.push(`#  Kits   : ${active.map((k) => k.key).join(", ")}`);
  buf.push(`#  Made with the CPVP Kit Forge - ${new Date().toISOString().slice(0, 10)}`);
  buf.push("#  Drop into /plugins/PlayerKits2/kits.yml then /kit reload");
  buf.push("# ============================================================");
  buf.push("");
  buf.push("kits:");
  if (!active.length) {
    buf.push(`${pad(2)}# no kits selected`);
  }
  for (const kit of active) {
    const o = opts.overrides[kit.key];
    buf.push("");
    buf.push(`${pad(2)}${kit.key}:`);
    buf.push(`${pad(4)}slot: ${o.guiSlot}`);
    buf.push(`${pad(4)}permission_required: ${opts.permissionRequired && !!kit.permission}`);
    if (kit.permission && opts.permissionRequired) {
      buf.push(`${pad(4)}custom_permission: ${q(o.permission)}`);
    }
    buf.push(`${pad(4)}price: ${o.price}`);
    buf.push(`${pad(4)}cooldown: ${o.cooldown}          # ${cooldownLabel(o.cooldown)}`);
    buf.push(`${pad(4)}auto_armor: ${opts.autoArmor}`);
    buf.push(`${pad(4)}clear_inventory: ${opts.clearInventory}`);
    buf.push(`${pad(4)}one_time: ${opts.oneTime}`);
    buf.push(`${pad(4)}save_original_items: false`);
    buf.push(`${pad(4)}items:`);
    let idx = 1;
    const off = offhandItem(kit);
    if (off) idx = writeItem(buf, idx, off, opts, 6, "off-hand");
    idx = writeItem(buf, idx, kit.armor.helmet, opts, 6, "helmet");
    idx = writeItem(buf, idx, kit.armor.chest, opts, 6, "chestplate");
    idx = writeItem(buf, idx, kit.armor.legs, opts, 6, "leggings");
    idx = writeItem(buf, idx, kit.armor.boots, opts, 6, "boots");
    for (const it of kit.items.filter((i) => !i.offhand)) {
      idx = writeItem(buf, idx, it, opts, 6, it.slot !== undefined && it.slot < 9 ? `hotbar ${it.slot}` : undefined);
    }

    if (opts.includeDisplay) {
      buf.push(`${pad(4)}display:`);
      buf.push(`${pad(6)}default:`);
      buf.push(`${pad(8)}id: ${kit.icon}`);
      buf.push(`${pad(8)}amount: 1`);
      buf.push(`${pad(8)}name: ${q(kit.display)}`);
      buf.push(`${pad(8)}lore:`);
      for (const l of kitLore(kit, opts)) buf.push(`${pad(10)}- ${l.trim() === "" ? "''" : q(l)}`);
      buf.push(`${pad(8)}item_flags:`);
      buf.push(`${pad(10)}- HIDE_ATTRIBUTES`);
      if (kit.permission) {
        buf.push(`${pad(6)}no_permission:`);
        buf.push(`${pad(8)}id: BARRIER`);
        buf.push(`${pad(8)}name: ${q(kit.display)}`);
        buf.push(`${pad(8)}lore:`);
        buf.push(`${pad(10)}- ${q("&8&m----------------------------")}`);
        buf.push(`${pad(10)}- ${q("&cYou do not have access")}`);
        buf.push(`${pad(10)}- ${q("&cto this kit.")}`);
        buf.push(`${pad(10)}- ''`);
        buf.push(`${pad(10)}- ${q(`&7You need: &f${kit.name.replace(" Kit", "").toUpperCase()} &7rank.`)}`);
        buf.push(`${pad(10)}- ''`);
        buf.push(`${pad(10)}- ${q("&6/store to upgrade!")}`);
      }
      buf.push(`${pad(6)}cooldown:`);
      buf.push(`${pad(8)}id: CLOCK`);
      buf.push(`${pad(8)}name: ${q(kit.display)}`);
      buf.push(`${pad(8)}lore:`);
      buf.push(`${pad(10)}- ${q("&7You need to wait")}`);
      buf.push(`${pad(10)}- ${q("&c%time%")}`);
      buf.push(`${pad(10)}- ${q("&7to claim this kit again.")}`);
    }

    if (opts.includeActions && kit.actions.length) {
      buf.push(`${pad(4)}actions:`);
      buf.push(`${pad(6)}claim:`);
      kit.actions.forEach((a, i) => {
        buf.push(`${pad(8)}'${i + 1}':`);
        buf.push(`${pad(10)}action: ${q(`command: ${a.command}`)}`);
      });
    }
  }
  return buf.join("\n");
}

export function generateConfigYaml(opts: GenOptions): string {
  const active = KITS.filter((k) => opts.overrides[k.key]?.enabled);
  const slots = active.map((k) => opts.overrides[k.key].guiSlot).sort((a, b) => a - b);
  return [
    "# ============================================================",
    "#  PlayerKits2  |  config.yml  (CPVP Network overrides)",
    "# ============================================================",
    "",
    "inventory_size: 54",
    "preview_inventory_size: 54",
    "preview_inventory_back_item_slot: 45",
    "kit_preview: true",
    "kit_preview_back_item: true",
    "preview_inventory_requires_permission: false",
    "close_inventory_on_claim: false",
    `drop_items_if_full_inventory: ${opts.clearInventory ? "true" : "false"}`,
    `commands_before_items: false`,
    "claim_kit_short_command: true",
    "new_kit_default_save_mode_original: false",
    "auto_equip_armor: " + (opts.autoArmor ? "true" : "false"),
    "",
    "# GUI decoration",
    `inventory_pages_names:`,
    `  1: '&8Kits &7(1/2)'`,
    `  2: '&8Rank Kits &7(2/2)'`,
    "fill_item: GRAY_STAINED_GLASS_PANE",
    "kits_slots_used: " + (slots.length ? slots.join(", ") : "none"),
    "",
    "# Sounds",
    "kit_error_sound: BLOCK_NOTE_BLOCK_PLING;10;0.1",
    "kit_claim_sound: ENTITY_PLAYER_LEVELUP;10;1.5",
    "kit_page_sound: BLOCK_LAVA_POP;10;1",
    "",
    "# Data storage (flat file by default)",
    "player_data_save_time: 300",
    "mysql_database:",
    "  enabled: false",
    "  host: localhost",
    "  port: 3306",
    "  username: root",
    "  password: root",
    "  database: cpvp_kits",
    "",
    "# Cooldown summary of the kits currently in kits.yml",
    ...active.map(
      (k) => `#   ${k.key.padEnd(9)} ${cooldownLabel(opts.overrides[k.key].cooldown).padEnd(7)} price ${opts.overrides[k.key].price}`,
    ),
  ].join("\n");
}

export function generateCommands(opts: GenOptions): string {
  const active = KITS.filter((k) => opts.overrides[k.key]?.enabled);
  const out: string[] = [
    "# ============================================================",
    "#  CPVP Network — kit setup / admin commands",
    "#  Run as console or an OP. LuckPerms commands included.",
    "# ============================================================",
    "",
    "# --- PlayerKits2 -------------------------------------------------",
    "/playerkits reload",
    ...active.map((k) => `/kit create ${k.key} configurable`),
    ...active.map((k) => `/kit claim ${k.key} <player>`),
    "",
    "# --- Permissions (LuckPerms) -------------------------------------",
  ];
  for (const k of active) {
    const group = k.key === "rookie" || k.key === "archer" ? "default" : k.key;
    if (k.permission) {
      out.push(`/lp group ${group} permission set ${opts.overrides[k.key].permission} true`);
    } else {
      out.push(`# ${k.key}: no permission, granted to everyone`);
    }
    out.push(`/lp group ${group} permission set playerkits2.kit.claim true`);
  }
  out.push(
    "",
    "# --- Quick test with a single player -----------------------------",
    ...active.map((k) => `/lp user <player> permission set ${opts.overrides[k.key].permission || "playerkits2.kit." + k.key} true`),
    "",
    "# --- Crystal pvp arena world flags (WorldGuard) ------------------",
    "/rg flag spawn-pvp entry deny",
    "/rg flag crystal-arena build deny",
    "/rg flag crystal-arena pvp allow",
    "/rg flag crystal-arena tnt allow",
    "/rg flag crystal-arena enderpearl allow",
  );
  return out.join("\n");
}

export function enchantList(it: KitItem): string[] {
  return (it.enchants ?? []).map(prettyEnchant);
}
