import { cooldownLabel, type Kit } from "../data/kits";
import { mat } from "../data/materials";
import { ItemIcon } from "./ItemIcon";
import { stripMc } from "../lib/mc";

const TIER_STYLE: Record<Kit["tier"], string> = {
  MYTHIC: "bg-rose-500/15 text-rose-300 border-rose-500/40",
  LEGENDARY: "bg-amber-500/15 text-amber-300 border-amber-500/40",
  EPIC: "bg-cyan-500/15 text-cyan-300 border-cyan-500/40",
  RANK: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
  FREE: "bg-slate-500/15 text-slate-300 border-slate-500/40",
};

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-[52px] shrink-0 text-[9px] font-bold tracking-widest text-white/40 uppercase">{label}</span>
      <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-black/60 ring-1 ring-white/5">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}55, ${color})` }}
        />
      </div>
      <span className="w-6 shrink-0 text-right text-[9px] font-bold text-white/50">{value}</span>
    </div>
  );
}

export function KitCard({
  kit,
  onOpen,
  index,
}: {
  kit: Kit;
  onOpen: () => void;
  index: number;
}) {
  const icon = mat(kit.icon);
  return (
    <div
      className="group animate-rise relative"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div
        className="absolute -inset-[1px] rounded-xl opacity-60 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(140deg, ${kit.colors.from}, ${kit.colors.to}, transparent 70%)` }}
      />
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-xl border border-white/5 bg-[#0b0d14] p-5"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,.05), 0 18px 40px -24px rgba(0,0,0,.9)" }}
      >
        {/* glow wash */}
        <div
          className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-90"
          style={{ background: kit.colors.soft, opacity: 0.5 }}
        />
        <div className="scanlines pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative flex items-start justify-between">
          <span
            className={`pixel rounded border px-2 py-1 text-[7px] ${TIER_STYLE[kit.tier]}`}
          >
            {kit.tier}
          </span>
          <span className="text-[10px] font-semibold tracking-wider text-white/25">
            SLOT {kit.guiSlot}
          </span>
        </div>

        <div className="relative mt-4 flex items-center gap-4">
          <div className="relative shrink-0">
            <div
              className="absolute inset-0 animate-pulse-ring rounded-lg"
              style={{ boxShadow: `0 0 30px 6px ${kit.colors.soft}` }}
            />
            <div
              className="relative grid h-16 w-16 place-items-center rounded-lg border"
              style={{
                borderColor: `${kit.colors.to}55`,
                background: `radial-gradient(circle at 50% 20%, ${kit.colors.soft}, #0b0d14 70%)`,
              }}
            >
              <ItemIcon item={kit.icon} className="h-11 w-11 animate-floaty" enchanted />
            </div>
          </div>
          <div className="min-w-0">
            <h3
              className="pixel text-[13px] leading-tight"
              style={{ color: kit.colors.accent, textShadow: `0 0 18px ${kit.colors.to}88` }}
            >
              {kit.name.replace(" Kit", "")}
            </h3>
            <p className="mt-2 text-[11px] leading-snug text-white/45">{kit.tagline}</p>
          </div>
        </div>

        <p className="relative mt-3 line-clamp-2 text-[12px] leading-relaxed text-white/55">
          {kit.description}
        </p>

        <div className="relative mt-4 space-y-[7px]">
          <StatBar label="Dmg" value={kit.stats.damage} color={kit.colors.to} />
          <StatBar label="Def" value={kit.stats.defense} color={kit.colors.to} />
          <StatBar label="Mob" value={kit.stats.mobility} color={kit.colors.to} />
          <StatBar label="Sust" value={kit.stats.sustain} color={kit.colors.to} />
        </div>

        <div className="relative mt-4 flex items-center gap-2 text-[10px]">
          <span className="rounded bg-black/50 px-2 py-1 font-semibold text-white/50 ring-1 ring-white/5">
            ⏱ {cooldownLabel(kit.cooldownSeconds)}
          </span>
          <span className="rounded bg-black/50 px-2 py-1 font-semibold text-white/50 ring-1 ring-white/5">
            {kit.price === 0 ? "FREE" : `${kit.price.toLocaleString()} coins`}
          </span>
          <span className="ml-auto text-[10px] text-white/30">{icon.name}</span>
        </div>

        <button
          onClick={onOpen}
          className="relative mt-4 w-full overflow-hidden rounded-md border px-4 py-3 text-[11px] font-bold tracking-widest uppercase transition-all duration-200 active:translate-y-[1px]"
          style={{
            borderColor: `${kit.colors.to}66`,
            background: `linear-gradient(180deg, ${kit.colors.from}dd, ${kit.colors.from}55)`,
            color: "#fff",
            textShadow: "0 2px 0 rgba(0,0,0,.5)",
          }}
        >
          <span className="relative z-10">View loadout</span>
          <span
            className="animate-sheen absolute top-0 left-0 h-full w-8 bg-white/20 blur-[2px]"
            style={{ animationDelay: `${index * 300}ms` }}
          />
        </button>
        <span className="sr-only">{stripMc(kit.display)}</span>
      </div>
    </div>
  );
}
