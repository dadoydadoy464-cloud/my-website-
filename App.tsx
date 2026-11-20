import { useMemo, useRef, useState } from "react";
import { KITS, TIER_ORDER, cooldownLabel, type Kit } from "./data/kits";
import { KitCard } from "./components/KitCard";
import { KitModal } from "./components/KitModal";
import { ConfigBuilder } from "./components/ConfigBuilder";
import { ItemIcon } from "./components/ItemIcon";
import { DEFAULT_OPTIONS, type GenOptions } from "./lib/config";
import { useCopy } from "./lib/useCopy";
import arenaBg from "./assets/arena.jpg";

const IP = "play.cpvp.network";

const NAV = [
  { href: "#kits", label: "Kit list" },
  { href: "#ranks", label: "Ranks" },
  { href: "#config", label: "Config" },
  { href: "#install", label: "Install" },
];

const FILTERS = [
  { id: "all", label: "All kits" },
  { id: "rank", label: "Rank kits" },
  { id: "free", label: "Free" },
  { id: "top", label: "Featured" },
] as const;

const SORTS = [
  { id: "tier", label: "Sort: tier" },
  { id: "damage", label: "Sort: damage" },
  { id: "price", label: "Sort: price" },
  { id: "cooldown", label: "Sort: cooldown" },
] as const;

function SectionTitle({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <span className="pixel text-[9px] text-sky-400/80">{kicker}</span>
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-[14px] leading-relaxed text-white/45">{sub}</p>}
    </div>
  );
}

export default function App() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("tier");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Kit | null>(null);
  const [opts, setOpts] = useState<GenOptions>(DEFAULT_OPTIONS);
  const [highlight, setHighlight] = useState<string | null>(null);
  const { copied, copy } = useCopy();
  const configRef = useRef<HTMLDivElement>(null);

  const kits = useMemo(() => {
    let list = [...KITS];
    if (filter === "rank") list = list.filter((k) => !!k.permission);
    if (filter === "free") list = list.filter((k) => !k.permission);
    if (filter === "top") list = list.filter((k) => k.featured);
    const q = query.trim().toLowerCase();
    if (q)
      list = list.filter((k) =>
        [k.name, k.tagline, k.description, k.tier, ...k.items.map((i) => i.id)]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    list.sort((a, b) => {
      if (sort === "damage") return b.stats.damage - a.stats.damage;
      if (sort === "price") return b.price - a.price;
      if (sort === "cooldown") return a.cooldownSeconds - b.cooldownSeconds;
      return TIER_ORDER[a.tier] - TIER_ORDER[b.tier] || b.stats.damage - a.stats.damage;
    });
    return list;
  }, [filter, sort, query]);

  const sendToConfig = (key: string) => {
    setOpen(null);
    setHighlight(key);
    setOpts((o) => ({
      ...o,
      overrides: { ...o.overrides, [key]: { ...o.overrides[key], enabled: true } },
    }));
    window.setTimeout(
      () => configRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      120,
    );
  };

  const rankKits = KITS.filter((k) => k.featured);

  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      {/* ---------------- NAV ---------------- */}
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#05060a]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-md border border-rose-500/40 bg-gradient-to-br from-rose-600/40 to-black">
              <ItemIcon item="DEMON_BLADE" className="h-6 w-6" />
            </span>
            <span className="pixel text-[12px] text-white">
              CPVP<span className="text-rose-500">.kits</span>
            </span>
          </a>
          <nav className="ml-4 hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-md px-3 py-2 text-[12px] font-semibold text-white/45 transition-colors hover:bg-white/5 hover:text-white"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <button
            onClick={() => copy(IP, "ip")}
            className="ml-auto flex items-center gap-2 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 transition-colors hover:bg-emerald-400/20"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="font-mono text-[11px] text-emerald-200">{IP}</span>
            <span className="pixel text-[8px] text-emerald-300/70">
              {copied === "ip" ? "COPIED!" : "COPY"}
            </span>
          </button>
        </div>
      </header>

      {/* ---------------- HERO ---------------- */}
      <section id="top" className="relative overflow-hidden border-b border-white/8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.28]"
          style={{ backgroundImage: `url(${arenaBg})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,6,10,.55) 0%, rgba(5,6,10,.86) 45%, #05060a 100%), radial-gradient(ellipse at 20% 30%, rgba(244,63,94,.12), transparent 60%)",
          }}
        />
        <div className="grid-floor absolute inset-0 opacity-60" />
        <div className="scanlines absolute inset-0 opacity-30" />
        <div
          className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(244,63,94,.18), transparent 65%)" }}
        />
        <div
          className="absolute -right-40 bottom-0 h-[420px] w-[520px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,.16), transparent 65%)" }}
        />
        {[
          { item: "END_CRYSTAL", top: "16%", left: "6%", delay: "0s" },
          { item: "GOLDEN_APPLE", top: "62%", left: "12%", delay: "1.4s" },
          { item: "TOTEM_OF_UNDYING", top: "24%", right: "9%", delay: ".7s" },
          { item: "ENDER_PEARL", top: "70%", right: "16%", delay: "2.1s" },
        ].map((f) => (
          <div
            key={f.item}
            className="animate-floaty pointer-events-none absolute hidden opacity-40 lg:block"
            style={{ top: f.top, left: f.left, right: f.right, animationDelay: f.delay }}
          >
            <ItemIcon item={f.item} className="h-14 w-14" enchanted />
          </div>
        ))}

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" />
              <span className="font-mono text-[10px] tracking-wider text-white/50 uppercase">
                1.21 crystal pvp · playerkits2 · 7 kits loaded
              </span>
            </div>
            <h1 className="text-5xl leading-[1.05] font-black tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block text-white">CRUSH THE</span>
              <span
                className="block bg-gradient-to-r from-rose-500 via-amber-400 to-violet-500 bg-clip-text text-transparent"
                style={{ WebkitTextStroke: "0px" }}
              >
                CRYSTAL META
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/50">
              Every CPVP kit, itemised slot by slot — Demon, Saturn, God, MVP and VIP. Hover the
              inventories, tune the cooldowns, then copy a ready-to-paste{" "}
              <span className="font-mono text-emerald-300/90">kits.yml</span> for PlayerKits2.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#kits"
                className="rounded-md border border-rose-500/50 bg-gradient-to-b from-rose-600/70 to-rose-900/70 px-5 py-3 text-[12px] font-bold tracking-widest uppercase text-white transition-transform hover:-translate-y-[2px]"
                style={{ textShadow: "0 2px 0 rgba(0,0,0,.5)" }}
              >
                Browse the kit list
              </a>
              <a
                href="#config"
                className="rounded-md border border-white/12 bg-black/50 px-5 py-3 text-[12px] font-bold tracking-widest text-white/70 uppercase transition-colors hover:border-white/30 hover:text-white"
              >
                Generate kits.yml
              </a>
            </div>

            <div className="mt-12 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { k: "Kits", v: String(KITS.length) },
                { k: "Ranks", v: "5" },
                { k: "Total items", v: String(KITS.reduce((n, k) => n + k.items.length + 4, 0)) },
                { k: "Uptime", v: "99.9%" },
              ].map((s) => (
                <div key={s.k} className="rounded-lg border border-white/8 bg-black/40 px-3 py-3">
                  <div className="pixel text-[14px] text-white">{s.v}</div>
                  <div className="mt-1 text-[9px] tracking-[0.15em] text-white/35 uppercase">{s.k}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* marquee strip */}
        <div className="relative border-t border-white/8 bg-black/60 py-3">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4">
            {rankKits.map((k) => (
              <span key={k.key} className="flex items-center gap-2">
                <ItemIcon item={k.icon} className="h-5 w-5" enchanted />
                <span className="pixel text-[8px]" style={{ color: k.colors.accent }}>
                  {k.name.replace(" Kit", "").toUpperCase()}
                </span>
                <span className="font-mono text-[10px] text-white/25">
                  {cooldownLabel(k.cooldownSeconds)}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- KIT LIST ---------------- */}
      <section id="kits" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionTitle
          kicker="// KIT LIST"
          title="Pick your poison"
          sub="Click any kit to open the full 36-slot loadout, armour set, enchants and on-claim commands."
        />

        <div className="mb-8 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`pixel rounded border px-3 py-2 text-[8px] transition-colors ${
                filter === f.id
                  ? "border-sky-400/50 bg-sky-400/10 text-sky-200"
                  : "border-white/8 bg-black/40 text-white/35 hover:text-white/70"
              }`}
            >
              {f.label}
            </button>
          ))}
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search items — crystal, totem, pearl…"
              className="w-[220px] rounded border border-white/10 bg-black/50 px-3 py-2 font-mono text-[11px] text-white/80 outline-none placeholder:text-white/25 focus:border-sky-400/60"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof SORTS)[number]["id"])}
              className="rounded border border-white/10 bg-black/50 px-3 py-2 text-[11px] text-white/60 outline-none focus:border-sky-400/60"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id} className="bg-[#0b0d14]">
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {kits.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 bg-black/30 p-12 text-center">
            <p className="pixel text-[10px] text-white/30">NO KITS MATCH THAT SEARCH</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {kits.map((k, i) => (
              <KitCard key={k.key} kit={k} index={i} onOpen={() => setOpen(k)} />
            ))}
          </div>
        )}
      </section>

      {/* ---------------- RANK LADDER ---------------- */}
      <section id="ranks" className="relative border-y border-white/8 bg-[#070810] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            kicker="// RANK LADDER"
            title="Which rank unlocks what"
            sub="Same ladder as the store. Every rank keeps the kits below it, with faster cooldowns as you climb."
          />
          <div className="overflow-x-auto rounded-xl border border-white/8 bg-black/40">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="border-b border-white/8 text-[9px] tracking-[0.18em] text-white/30 uppercase">
                  <th className="px-4 py-3 font-bold">Kit</th>
                  <th className="px-4 py-3 font-bold">Tier</th>
                  <th className="px-4 py-3 font-bold">Rank</th>
                  <th className="px-4 py-3 font-bold">Cooldown</th>
                  <th className="px-4 py-3 font-bold">Price</th>
                  <th className="px-4 py-3 font-bold">Power</th>
                  <th className="px-4 py-3 font-bold">Permission node</th>
                </tr>
              </thead>
              <tbody>
                {KITS.map((k) => {
                  const power = Math.round((k.stats.damage + k.stats.defense + k.stats.mobility + k.stats.sustain) / 4);
                  return (
                    <tr
                      key={k.key}
                      className="cursor-pointer border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.03]"
                      onClick={() => setOpen(k)}
                    >
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-3">
                          <ItemIcon item={k.icon} className="h-7 w-7" enchanted />
                          <span className="text-[13px] font-bold" style={{ color: k.colors.accent }}>
                            {k.name}
                          </span>
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="pixel rounded border px-2 py-1 text-[7px]"
                          style={{
                            color: k.colors.accent,
                            borderColor: `${k.colors.to}55`,
                            background: k.colors.soft,
                          }}
                        >
                          {k.tier}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[12px] text-white/50">
                        {k.permission ? k.name.replace(" Kit", "").toUpperCase() : "Everyone"}
                      </td>
                      <td className="px-4 py-3 font-mono text-[12px] text-white/50">
                        {cooldownLabel(k.cooldownSeconds)}
                      </td>
                      <td className="px-4 py-3 font-mono text-[12px] text-amber-200/70">
                        {k.price === 0 ? "—" : `${k.price.toLocaleString()}c`}
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-2">
                          <span className="h-1.5 w-20 overflow-hidden rounded-full bg-black/70">
                            <span
                              className="block h-full rounded-full"
                              style={{ width: `${power}%`, background: k.colors.to }}
                            />
                          </span>
                          <span className="pixel text-[8px] text-white/50">{power}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-white/30">
                        {k.permission || "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---------------- CONFIG GENERATOR ---------------- */}
      <section id="config" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionTitle
          kicker="// PLAYKITS2 CONFIG"
          title="Forge your kits.yml"
          sub="Toggle the kits and behaviours you want, tune the cooldowns, then copy the generated PlayerKits2 config straight into your server."
        />
        <div ref={configRef}>
          <ConfigBuilder opts={opts} setOpts={setOpts} highlight={highlight} />
        </div>
      </section>

      {/* ---------------- INSTALL ---------------- */}
      <section id="install" className="border-y border-white/8 bg-[#070810] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            kicker="// INSTALL"
            title="60-second setup"
            sub="PlayerKits2 runs on Spigot, Paper and forks from 1.8 up to 1.21+."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                n: "01",
                t: "Drop the jar",
                c: "plugins/PlayerKits2.jar",
                d: "Restart once so the plugin generates its folder and default kits.yml.",
              },
              {
                n: "02",
                t: "Paste your kits",
                c: "plugins/PlayerKits2/kits.yml",
                d: "Copy the generated YAML from above over the existing file.",
              },
              {
                n: "03",
                t: "Reload in game",
                c: "/playerkits reload",
                d: "Then open the GUI with /kit and check every slot renders correctly.",
              },
              {
                n: "04",
                t: "Grant the ranks",
                c: "/lp group demon permission set playerkits2.kit.demon true",
                d: "Give each rank its node, or leave permissions off for free kits.",
              },
            ].map((s) => (
              <div key={s.n} className="relative overflow-hidden rounded-xl border border-white/8 bg-[#0b0d14] p-5">
                <span className="pixel absolute top-3 right-4 text-[18px] text-white/5">{s.n}</span>
                <h3 className="pixel text-[10px] text-sky-300/80">{s.t}</h3>
                <code className="mt-3 block break-all rounded border border-white/8 bg-black/60 px-2 py-1.5 font-mono text-[10px] text-emerald-200/80">
                  {s.c}
                </code>
                <p className="mt-3 text-[12px] leading-relaxed text-white/45">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {[
              {
                q: "Can I edit a kit in game instead?",
                a: "Yes. Fill your inventory with the exact loadout and run /kit create <name> configurable — the plugin writes the item section for you. Use the generated YAML as a starting point.",
              },
              {
                q: "How do I make a kit one-time only?",
                a: "Flip the one_time toggle in the config generator. It writes one_time: true and PlayerKits2 swaps the display item to the one_time variant after the first claim.",
              },
              {
                q: "Why does auto_armor matter for CPVP?",
                a: "Crystal pvp is decided in the first two seconds. auto_armor instantly equips the helmet/chest/legs/boots so there is no gap where a crystal can one-tap an unarmoured player.",
              },
              {
                q: "Are cooldowns stored even after restart?",
                a: "They are saved to flat-file player data every player_data_save_time seconds (300 by default) and instantly on quit. Enable the MySQL block in config.yml if you run a network.",
              },
            ].map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-white/8 bg-[#0b0d14] px-5 py-4 open:border-white/15"
              >
                <summary className="cursor-pointer list-none text-[13px] font-bold text-white/80 marker:hidden">
                  <span className="mr-2 text-rose-400 transition-transform group-open:rotate-90 inline-block">▸</span>
                  {f.q}
                </summary>
                <p className="mt-3 pl-5 text-[12px] leading-relaxed text-white/45">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="relative overflow-hidden py-14">
        <div className="grid-floor absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-8 border-b border-white/8 pb-8 sm:flex-row sm:items-center">
            <div>
              <h3 className="pixel text-[14px] text-white">JOIN THE ARENA</h3>
              <p className="mt-3 text-[12px] text-white/40">
                Crystal pvp · 1.21 · no pay-to-win past VIP · kits reset every season
              </p>
            </div>
            <button
              onClick={() => copy(IP, "ip2")}
              className="rounded-md border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 font-mono text-[13px] text-emerald-200 transition-colors hover:bg-emerald-400/20"
            >
              {copied === "ip2" ? "✔ copied to clipboard" : IP}
            </button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] text-white/25">
            <span>© {new Date().getFullYear()} CPVP Network — fan-made kit list & config tool.</span>
            <span className="font-mono">Not affiliated with Mojang or PlayerKits2.</span>
            <a href="#top" className="ml-auto transition-colors hover:text-white/60">
              back to top ↑
            </a>
          </div>
        </div>
      </footer>

      {open && (
        <KitModal kit={open} onClose={() => setOpen(null)} onSendToConfig={sendToConfig} />
      )}
    </div>
  );
}
