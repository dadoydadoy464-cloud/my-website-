import type { ReactNode } from "react";

export const MC_COLORS: Record<string, string> = {
  "0": "#000000",
  "1": "#0000aa",
  "2": "#00aa00",
  "3": "#00aaaa",
  "4": "#aa0000",
  "5": "#aa00aa",
  "6": "#ffaa00",
  "7": "#aaaaaa",
  "8": "#555555",
  "9": "#5555ff",
  a: "#55ff55",
  b: "#55ffff",
  c: "#ff5555",
  d: "#ff55ff",
  e: "#ffff55",
  f: "#ffffff",
};

export type McSegment = {
  text: string;
  color: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  obf?: boolean;
};

/** Parse a string containing legacy &-codes into styled segments. */
export function parseMc(input: string): McSegment[] {
  const out: McSegment[] = [];
  let cur: McSegment = { text: "", color: "#ffffff" };
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if ((ch === "&" || ch === "\u00a7") && i + 1 < input.length) {
      const code = input[i + 1].toLowerCase();
      if (MC_COLORS[code]) {
        if (cur.text) out.push(cur);
        cur = { ...cur, text: "", color: MC_COLORS[code] };
        i++;
        continue;
      }
      if ("lmnkor".includes(code)) {
        if (cur.text) out.push(cur);
        cur = { ...cur, text: "" };
        if (code === "l") cur.bold = true;
        if (code === "m") cur.strike = true;
        if (code === "n") cur.underline = true;
        if (code === "o") cur.italic = true;
        if (code === "k") cur.obf = true;
        if (code === "r") cur = { text: "", color: "#ffffff" };
        i++;
        continue;
      }
    }
    cur.text += ch;
  }
  if (cur.text) out.push(cur);
  return out;
}

/** Strip &-codes, used for plain-text rendering. */
export function stripMc(input: string): string {
  return input.replace(/[&\u00a7][0-9a-fk-or]/gi, "");
}

export function McText({
  text,
  className,
  size = "text-[13px]",
}: {
  text: string;
  className?: string;
  size?: string;
}) {
  const segs = parseMc(text);
  return (
    <span className={className} style={{ fontVariantLigatures: "none" }}>
      {segs.map((s, i) => (
        <span
          key={i}
          className={`${size} ${s.obf ? "animate-blink" : ""}`}
          style={{
            color: s.color,
            fontWeight: s.bold ? 700 : 400,
            fontStyle: s.italic ? "italic" : "normal",
            textDecoration: [s.strike && "line-through", s.underline && "underline"].filter(Boolean).join(" ") || undefined,
            textShadow: "2px 2px 0 rgba(0,0,0,0.65)",
          }}
        >
          {s.text}
        </span>
      ))}
    </span>
  );
}

export function McLines({ lines, className }: { lines: string[]; className?: string }): ReactNode {
  return (
    <div className={`space-y-[3px] ${className ?? ""}`}>
      {lines.map((l, i) => (
        <div key={i} className="leading-tight">
          {l.trim() === "" ? <span className="text-[13px]">&nbsp;</span> : <McText text={l} />}
        </div>
      ))}
    </div>
  );
}
