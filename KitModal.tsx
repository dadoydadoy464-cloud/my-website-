import { useEffect, useState } from "react";
import { cooldownLabel, itemSlots, offhandItem, type Kit, type KitItem } from "../data/kits";
import { mat } from "../data/materials";
import { ItemIcon } from "./ItemIcon";
import { McLines, McText, stripMc } from "../lib/mc";
import { useCopy } from "../lib/useCopy";
import { enchantList } from "../lib/config";

type Hover = { item: KitItem; x: number; y: number } | null;

function Tooltip({ hover }: { hover: Hover }) {
  if (!hover) return null;
  const def = mat(hover.item.id);
  const ench = enchantList(hover.item);
  const x = Math.min(hover.x + 18, typeof window !== "undefined" ? window.innerWidth - 300 : 999);
  const y = Math.min(hover.y + 14, typeof window !== "undefined" ? window.innerHeight - 200 : 999);
  return (
    <div
      className="pointer-events-none fixed z-[70] w-max max-w-[280px] rounded-sm px-3 py-2"
      style={{
        left: x,
        top: y,
        background: "rgba(16,0,16,.94)",
        border: "2px solid #2d0a63",
        boxShadow: "0 0 0 2px rgba(0,0,0,.7), 0 12px 30px rgba(0,0,0,.6)",
      }}
    >
      <McText text={hover.item.name ?? `&f${def.name}`} size="text-[13px]" />
      {ench.length > 0 && (
        <div className="mt-1 space-y-[2px]">
          {ench.map((e) => (
            <div key={e} className="text-[11px] text-[#a7a7a7]" style={{ textShadow: "2px 2px 0 rgba(0,0,0,.6)" }}>
              {e}
            </div>
          ))}
        </div>
      )}
      <div className="mt-1 text-[11px] text-[#555555]">Amount: {hover.item.amount}</div>
      {hover.item.lore?.length ? (
        <div className="mt-1 border-t border-[#2d0a63] pt-1">
          <McLines lines={hover.item.lore} />
        </div>
      ) : null}
      {hover.item.offhand ? <div className="mt-1 text-[10px] text-[#55ffff]">Off-hand slot</div> : null}
    </div>
  );
}

function Slot({
  item,
  onHover,
  onLeave,
  highlight,
}: {
  item: KitItem | null;
  onHover: (h: Hover) => void;
  onLeave: () => void;
  highlight?: boolean;
}) {
  if (!item) return <div className="mc-slot opacity-45" />;
  const def = mat(item.id);
  return (
    <div
      className="mc-slot cursor-help transition-transform duration-150 hover:-translate-y-[2px]"
      style={highlight ? { borderColor: `${def.color}aa`, boxShadow: `0 0 14px ${def.color}55` } : undefined}
      onMouseMove={(e) => onHover({ item, x: e.clientX, y: e.clientY })}
      onMouseLeave={onLeave}
    >
      <ItemIcon item={item.id} className="h-[78%] w-[78%]" enchanted={!!item.enchants?.length} />
      {item.amount > 1 && (
        <span
          className="pixel absolute right-[2px] bottom-[0px] text-[8px] text-white"
          style={{ textShadow: "2px 2px 0 #000" }}
        >
          {item.amount}
        </span>
      )}
    </div>
  );
}

function StatRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-[9px] font-bold tracking-[0.18em] text-white/40 uppercase">{label}</span>
        <span className="pixel text-[9px]" style={{ color }}>
          {value}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-black/70 ring-1 ring-white/5">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}44, ${color})` }}
        />
      </div>
    </div>
  );
}

function CopyLine({ value, label }: { value: string; label: string }) {
  const { copied, copy } = useCopy();
  return (
    <button
      onClick={() => copy(value, label)}
      className="group flex w-full items-center gap-3 rounded-md border border-white/8 bg-black/45 px-3 py-2 text-left transition-colors hover:border-white/20"
    >
      <span className="w-[86px] shrink-0 text-[9px] font-bold tracking-widest text-white/35 uppercase">{label}</span>
      <code className="flex-1 truncate font-mono text-[11px] text-emerald-200/80">{value}</code>
      <span
        className={`pixel shrink-0 text-[8px] transition-colors ${
          copied === label ? "text-emerald-400" : "text-white/30 group-hover:text-white/70"
        }`}
      >
        {copied === label ? "COPIED!" : "COPY"}
      </span>
    </button>
  );
}

export function KitModal({
  kit,
  onClose,
  onSendToConfig,
}: {
  kit: Kit;
  onClose: () => void;
  onSendToConfig: (key: string) => void;
}) {
  const [hover, setHover] = useState<Hover>(null);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const slots = itemSlots(kit);
  const off = offhandItem(kit);

  useEffect(() => {
    setClaimed(false);
    setClaiming(false);
  }, [kit.key]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const doClaim = () => {
    if (claiming) return;
    setClaiming(true);
    window.setTimeout(() => {
      setClaiming(false);
      setClaimed(true);
    }, 1100);
  };

  const armor = [kit.armor.helmet, kit.armor.chest, kit.armor.legs, kit.armor.boots];
  const armorLabels = ["HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS"];

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-sm sm:p-6">
      <div className="absolute inset-0" onClick={onClose} />
      <Tooltip hover={hover} />
      <div
        className="animate-rise relative my-auto w-full max-w-5xl"
        onMouseLeave={() => setHover(null)}
      >
        <div
          className="absolute -inset-[1px] rounded-2xl"
          style={{ background: `linear-gradient(140deg, ${kit.colors.from}, ${kit.colors.to}, transparent 75%)` }}
        />
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#080a11]">
          {/* header */}
          <div
            className="relative overflow-hidden px-5 py-5 sm:px-7"
            style={{ background: `linear-gradient(100deg, ${kit.colors.from}cc, transparent 85%)` }}
          >
            <div className="scanlines pointer-events-none absolute inset-0 opacity-50" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-md border border-white/15 bg-black/40 text-white/60 transition-colors hover:border-rose-400/60 hover:text-rose-300"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="relative flex flex-wrap items-center gap-4 pr-14">
              <div
                className="grid h-16 w-16 shrink-0 place-items-center rounded-xl border"
                style={{ borderColor: `${kit.colors.to}66`, background: "rgba(0,0,0,.45)" }}
              >
                <ItemIcon item={kit.icon} className="h-11 w-11" enchanted />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <McText text={kit.display} size="text-lg sm:text-xl" />
                  <span className="pixel rounded border border-white/15 bg-black/40 px-2 py-1 text-[7px] text-white/60">
                    {kit.tier}
                  </span>
                </div>
                <p className="mt-2 text-[12px] text-white/50">
                  {kit.tagline} · ⏱ {cooldownLabel(kit.cooldownSeconds)} ·{" "}
                  {kit.price === 0 ? "free" : `${kit.price.toLocaleString()} coins`} · used by {kit.players} players
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[290px_1fr]">
            {/* left column */}
            <div className="space-y-5">
              <p className="text-[13px] leading-relaxed text-white/60">{kit.description}</p>

              <div className="space-y-3">
                <StatRow label="Damage" value={kit.stats.damage} color={kit.colors.to} />
                <StatRow label="Defense" value={kit.stats.defense} color={kit.colors.to} />
                <StatRow label="Mobility" value={kit.stats.mobility} color={kit.colors.to} />
                <StatRow label="Sustain" value={kit.stats.sustain} color={kit.colors.to} />
              </div>

              <div>
                <h4 className="pixel mb-3 text-[9px] text-white/45">ARMOR + OFF-HAND</h4>
                <div className="grid grid-cols-5 gap-2">
                  {armor.map((a, i) => (
                    <div key={armorLabels[i]} className="space-y-1">
                      <Slot item={a} onHover={setHover} onLeave={() => setHover(null)} highlight />
                      <div className="text-center text-[7px] tracking-wide text-white/25">{armorLabels[i].slice(0, 4)}</div>
                    </div>
                  ))}
                  <div className="space-y-1">
                    <Slot item={off ?? null} onHover={setHover} onLeave={() => setHover(null)} highlight />
                    <div className="text-center text-[7px] tracking-wide text-white/25">OFF</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="pixel mb-3 text-[9px] text-white/45">PERKS</h4>
                <ul className="space-y-2">
                  {kit.perks.map((p) => (
                    <li key={p} className="flex gap-2 text-[12px] leading-snug text-white/60">
                      <span style={{ color: kit.colors.to }}>▸</span>
                      <span>
                        <McText text={p} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {kit.actions.length > 0 && (
                <div>
                  <h4 className="pixel mb-3 text-[9px] text-white/45">ON-CLAIM ACTIONS</h4>
                  <div className="space-y-2">
                    {kit.actions.map((a) => (
                      <div key={a.command} className="rounded-md border border-white/8 bg-black/40 p-2">
                        <div className="text-[11px] font-semibold text-white/60">{a.label}</div>
                        <code className="mt-1 block break-all font-mono text-[10px] text-emerald-200/70">
                          {a.command}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* right column: the actual kit GUI */}
            <div>
              <div
                className="overflow-hidden rounded-lg border-2 border-[#2b2f3d]"
                style={{ background: "linear-gradient(180deg,#1b1f2b,#10131b)" }}
              >
                <div
                  className="flex items-center justify-between border-b-2 border-[#2b2f3d] px-3 py-2"
                  style={{ background: "linear-gradient(180deg,#2a2f40,#1a1e29)" }}
                >
                  <span className="pixel text-[8px] text-white/50">{stripMc(kit.display)}</span>
                  <span className="text-[9px] font-bold tracking-widest text-white/30">36 SLOTS</span>
                </div>
                <div className="p-3">
                  <div className="grid grid-cols-9 gap-1.5">
                    {slots.slice(9, 36).map((it, i) => (
                      <Slot key={i} item={it} onHover={setHover} onLeave={() => setHover(null)} />
                    ))}
                  </div>
                  <div className="my-3 h-[2px] rounded-full bg-black/60" />
                  <div className="grid grid-cols-9 gap-1.5">
                    {slots.slice(0, 9).map((it, i) => (
                      <div key={i} className="relative">
                        <Slot item={it} onHover={setHover} onLeave={() => setHover(null)} highlight={i === 0} />
                        {i === 0 && (
                          <span className="pixel absolute -top-[6px] -left-[6px] text-[7px]" style={{ color: kit.colors.to }}>
                            1
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <CopyLine label="claim" value={`/kit claim ${kit.key}`} />
                <CopyLine label="preview" value={`/kit preview ${kit.key}`} />
                {kit.permission ? (
                  <CopyLine label="perm" value={kit.permission} />
                ) : (
                  <div className="rounded-md border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-[11px] text-emerald-200/70">
                    No permission required — every player can claim this kit.
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={doClaim}
                  disabled={claiming}
                  className="relative flex-1 overflow-hidden rounded-md border px-4 py-3 text-[11px] font-bold tracking-[0.15em] uppercase transition-all active:translate-y-[1px] disabled:cursor-wait"
                  style={{
                    borderColor: `${kit.colors.to}77`,
                    background: `linear-gradient(180deg,${kit.colors.to}33,${kit.colors.from}aa)`,
                    color: "#fff",
                  }}
                >
                  {claiming ? "claiming…" : claimed ? "✔ kit claimed!" : "claim this kit"}
                  {claiming && <span className="animate-sheen absolute top-0 left-0 h-full w-10 bg-white/25" />}
                </button>
                <button
                  onClick={() => onSendToConfig(kit.key)}
                  className="flex-1 rounded-md border border-white/12 bg-black/50 px-4 py-3 text-[11px] font-bold tracking-[0.15em] text-white/70 uppercase transition-colors hover:border-white/30 hover:text-white"
                >
                  send to config →
                </button>
              </div>
              {claimed && (
                <p className="mt-2 text-center text-[11px] text-emerald-300/80">
                  Items delivered. Remember: <span className="font-mono">auto_armor</span> equips the set instantly.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
