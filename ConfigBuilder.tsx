import { useMemo, useState } from "react";
import { KITS, cooldownLabel } from "../data/kits";
import {
  generateCommands,
  generateConfigYaml,
  generateKitsYaml,
  kitLore,
  type GenOptions,
  type KitOverride,
} from "../lib/config";
import { ItemIcon } from "./ItemIcon";
import { McLines, McText } from "../lib/mc";
import { downloadText, useCopy } from "../lib/useCopy";

const TABS = [
  { id: "kits", file: "kits.yml", label: "kits.yml" },
  { id: "config", file: "config.yml", label: "config.yml" },
  { id: "cmds", file: "commands.txt", label: "commands" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function Toggle({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="flex w-full items-start gap-3 rounded-md border border-white/8 bg-black/40 px-3 py-2 text-left transition-colors hover:border-white/20"
    >
      <span
        className={`mt-[2px] grid h-4 w-4 shrink-0 place-items-center rounded-[3px] border text-[9px] font-black transition-colors ${
          value ? "border-emerald-400/70 bg-emerald-400/25 text-emerald-300" : "border-white/20 bg-black/50 text-transparent"
        }`}
      >
        ✓
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[11px] text-white/80">{label}</span>
        <span className="block text-[10px] leading-snug text-white/35">{hint}</span>
      </span>
    </button>
  );
}

function NumField({
  label,
  value,
  onChange,
  suffix,
  min = 0,
  max = 999999,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  min?: number;
  max?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[8px] font-bold tracking-[0.18em] text-white/35 uppercase">{label}</span>
      <span className="flex items-center gap-1">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(Math.max(min, Math.min(max, Number(e.target.value) || 0)))}
          className="w-full rounded border border-white/10 bg-black/60 px-2 py-1.5 font-mono text-[11px] text-white/85 outline-none focus:border-sky-400/60"
        />
        {suffix && <span className="text-[9px] text-white/30">{suffix}</span>}
      </span>
    </label>
  );
}

function renderCode(code: string) {
  return code.split("\n").map((line, i) => {
    let content;
    const trimmed = line.trimStart();
    if (trimmed.startsWith("#")) {
      content = <span className="text-white/25">{line}</span>;
    } else if (trimmed.startsWith("- ")) {
      const body = trimmed.slice(2);
      const quoted = body.startsWith("'");
      const [k, ...rest] = body.split(":");
      content = (
        <>
          <span className="text-white/25">{line.slice(0, line.indexOf(trimmed))}</span>
          <span className="text-rose-300/60">- </span>
          {quoted ? (
            <span className="text-amber-200/90">{body}</span>
          ) : (
            <>
              <span className="text-amber-200/90">{k}</span>
              {rest.length > 0 && <span className="text-white/30">:{rest.join(":")}</span>}
            </>
          )}
        </>
      );
    } else if (trimmed.includes(":")) {
      const idx = line.indexOf(":");
      const key = line.slice(0, idx);
      const val = line.slice(idx + 1);
      content = (
        <>
          <span className="text-sky-300">{key}</span>
          <span className="text-white/25">:</span>
          <span className="text-emerald-200/85">{val}</span>
        </>
      );
    } else {
      content = <span className="text-white/45">{line}</span>;
    }
    return (
      <div key={i} className="flex gap-3 hover:bg-white/[0.03]">
        <span className="w-8 shrink-0 text-right text-[10px] text-white/15 select-none">{i + 1}</span>
        <span className="whitespace-pre font-mono text-[11px] leading-[1.55]">{content}</span>
      </div>
    );
  });
}

export function ConfigBuilder({
  opts,
  setOpts,
  highlight,
}: {
  opts: GenOptions;
  setOpts: (o: GenOptions) => void;
  highlight: string | null;
}) {
  const [tab, setTab] = useState<TabId>("kits");
  const [openKit, setOpenKit] = useState<string>(KITS[0].key);
  const { copied, copy } = useCopy();

  const code = useMemo(() => {
    if (tab === "kits") return generateKitsYaml(opts);
    if (tab === "config") return generateConfigYaml(opts);
    return generateCommands(opts);
  }, [tab, opts]);

  const activeTab = TABS.find((t) => t.id === tab)!;
  const activeKits = KITS.filter((k) => opts.overrides[k.key]?.enabled);
  const previewKit = KITS.find((k) => k.key === highlight) ?? KITS[0];
  const lines = code.split("\n").length;

  const setOverride = (key: string, patch: Partial<KitOverride>) =>
    setOpts({ ...opts, overrides: { ...opts.overrides, [key]: { ...opts.overrides[key], ...patch } } });

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      {/* controls */}
      <div className="space-y-4">
        <div className="rounded-xl border border-white/8 bg-[#0b0d14] p-4">
          <h3 className="pixel mb-3 text-[9px] text-white/50">1 · PICK YOUR KITS</h3>
          <div className="space-y-1.5">
            {KITS.map((k) => {
              const on = opts.overrides[k.key]?.enabled;
              return (
                <div key={k.key}>
                  <button
                    onClick={() => setOverride(k.key, { enabled: !on })}
                    className={`flex w-full items-center gap-3 rounded-md border px-2.5 py-2 text-left transition-all ${
                      on ? "border-white/15 bg-white/[0.04]" : "border-white/5 bg-black/30 opacity-55 hover:opacity-90"
                    }`}
                    style={highlight === k.key ? { borderColor: `${k.colors.to}88` } : undefined}
                  >
                    <ItemIcon item={k.icon} className="h-7 w-7 shrink-0" enchanted={on} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[12px] font-bold" style={{ color: on ? k.colors.accent : "#8892a4" }}>
                        {k.name}
                      </span>
                      <span className="block font-mono text-[10px] text-white/30">
                        {cooldownLabel(opts.overrides[k.key].cooldown)} · {opts.overrides[k.key].price.toLocaleString()}c
                      </span>
                    </span>
                    <span
                      className={`grid h-4 w-4 shrink-0 place-items-center rounded-[3px] border text-[9px] font-black ${
                        on ? "border-emerald-400/70 bg-emerald-400/25 text-emerald-300" : "border-white/20 text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                  </button>
                  {openKit === k.key && on && (
                    <div className="mt-1.5 grid grid-cols-2 gap-2 rounded-md border border-white/5 bg-black/40 p-2.5">
                      <NumField
                        label="cooldown (s)"
                        value={opts.overrides[k.key].cooldown}
                        onChange={(v) => setOverride(k.key, { cooldown: v })}
                        suffix={cooldownLabel(opts.overrides[k.key].cooldown)}
                      />
                      <NumField
                        label="price"
                        value={opts.overrides[k.key].price}
                        onChange={(v) => setOverride(k.key, { price: v })}
                        suffix="coins"
                      />
                      <NumField
                        label="gui slot"
                        value={opts.overrides[k.key].guiSlot}
                        min={0}
                        max={53}
                        onChange={(v) => setOverride(k.key, { guiSlot: v })}
                      />
                      <label className="block">
                        <span className="mb-1 block text-[8px] font-bold tracking-[0.18em] text-white/35 uppercase">
                          permission
                        </span>
                        <input
                          value={opts.overrides[k.key].permission}
                          onChange={(e) => setOverride(k.key, { permission: e.target.value })}
                          className="w-full rounded border border-white/10 bg-black/60 px-2 py-1.5 font-mono text-[10px] text-white/85 outline-none focus:border-sky-400/60"
                        />
                      </label>
                    </div>
                  )}
                  {on && (
                    <button
                      onClick={() => setOpenKit(openKit === k.key ? "" : k.key)}
                      className="mt-1 ml-1 text-[9px] font-bold tracking-widest text-white/25 uppercase hover:text-white/60"
                    >
                      {openKit === k.key ? "▲ hide tuning" : "▼ tune values"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-white/8 bg-[#0b0d14] p-4">
          <h3 className="pixel mb-3 text-[9px] text-white/50">2 · KIT BEHAVIOUR</h3>
          <div className="space-y-2">
            <Toggle
              label="auto_armor"
              hint="Equip the armour set the moment the kit is claimed"
              value={opts.autoArmor}
              onChange={(v) => setOpts({ ...opts, autoArmor: v })}
            />
            <Toggle
              label="clear_inventory"
              hint="Wipe the player's inventory before the kit is given"
              value={opts.clearInventory}
              onChange={(v) => setOpts({ ...opts, clearInventory: v })}
            />
            <Toggle
              label="one_time"
              hint="Claimable once per lifetime (great for starter kits)"
              value={opts.oneTime}
              onChange={(v) => setOpts({ ...opts, oneTime: v })}
            />
            <Toggle
              label="permission_required"
              hint="Lock the rank kits behind a permission node"
              value={opts.permissionRequired}
              onChange={(v) => setOpts({ ...opts, permissionRequired: v })}
            />
          </div>
        </div>

        <div className="rounded-xl border border-white/8 bg-[#0b0d14] p-4">
          <h3 className="pixel mb-3 text-[9px] text-white/50">3 · YAML OUTPUT</h3>
          <div className="space-y-2">
            <Toggle
              label="display + lore"
              hint="Writes the GUI display item with full colour-coded lore"
              value={opts.includeDisplay}
              onChange={(v) => setOpts({ ...opts, includeDisplay: v })}
            />
            <Toggle
              label="actions"
              hint="Includes the on-claim commands (effects, cosmetics, broadcast)"
              value={opts.includeActions}
              onChange={(v) => setOpts({ ...opts, includeActions: v })}
            />
            <Toggle
              label="enchants"
              hint="Writes every enchantment line on armour and weapons"
              value={opts.includeEnchants}
              onChange={(v) => setOpts({ ...opts, includeEnchants: v })}
            />
            <Toggle
              label="custom names"
              hint="Custom item names like Infernal Edge / Ringcutter"
              value={opts.includeCustomNames}
              onChange={(v) => setOpts({ ...opts, includeCustomNames: v })}
            />
            <Toggle
              label="preview_slot"
              hint="Positions items inside the /kit preview GUI"
              value={opts.includePreviewSlots}
              onChange={(v) => setOpts({ ...opts, includePreviewSlots: v })}
            />
          </div>
        </div>
      </div>

      {/* output */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`pixel rounded border px-3 py-2 text-[8px] transition-colors ${
                tab === t.id
                  ? "border-sky-400/50 bg-sky-400/10 text-sky-200"
                  : "border-white/8 bg-black/40 text-white/35 hover:text-white/70"
              }`}
            >
              {t.label}
            </button>
          ))}
          <span className="ml-auto flex items-center gap-2">
            <span className="font-mono text-[10px] text-white/25">
              {lines} lines · {activeKits.length} kits
            </span>
            <button
              onClick={() => copy(code, activeTab.file)}
              className="pixel rounded border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 text-[8px] text-emerald-200 transition-colors hover:bg-emerald-400/20"
            >
              {copied === activeTab.file ? "COPIED!" : "COPY"}
            </button>
            <button
              onClick={() => downloadText(activeTab.file, code)}
              className="pixel rounded border border-white/15 bg-black/50 px-3 py-2 text-[8px] text-white/60 transition-colors hover:text-white"
            >
              ↓ {activeTab.file}
            </button>
          </span>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#06070c]">
          <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.02] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-2 font-mono text-[11px] text-white/35">
              plugins/PlayerKits2/{activeTab.file}
            </span>
          </div>
          <div className="max-h-[520px] overflow-auto p-4">
            <div className="min-w-max">{renderCode(code)}</div>
          </div>
        </div>

        {/* live in-game preview */}
        <div className="grid gap-4 rounded-xl border border-white/8 bg-[#0b0d14] p-4 sm:grid-cols-[auto_1fr]">
          <div className="flex items-center gap-4">
            <div
              className="grid h-16 w-16 shrink-0 place-items-center rounded-lg border"
              style={{
                borderColor: `${previewKit.colors.to}55`,
                background: `radial-gradient(circle at 50% 25%, ${previewKit.colors.soft}, #0b0d14 70%)`,
              }}
            >
              <ItemIcon item={previewKit.icon} className="h-11 w-11" enchanted />
            </div>
            <div>
              <span className="mb-1 block text-[8px] font-bold tracking-[0.18em] text-white/30 uppercase">
                In-game tooltip preview
              </span>
              <McText text={previewKit.display} size="text-[15px]" />
            </div>
          </div>
          <div
            className="rounded-md p-3"
            style={{ background: "rgba(16,0,16,.9)", border: "2px solid #2d0a63" }}
          >
            <McLines lines={kitLore(previewKit, opts)} />
          </div>
        </div>
      </div>
    </div>
  );
}
