import { ICON_PATHS, mat } from "../data/materials";

export function ItemIcon({
  item,
  className = "h-9 w-9",
  enchanted = false,
  glow = true,
}: {
  item: string;
  className?: string;
  enchanted?: boolean;
  glow?: boolean;
}) {
  const def = mat(item);
  const paths = ICON_PATHS[def.icon];
  return (
    <svg viewBox="0 0 32 32" className={className} style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,.6))" }} aria-hidden>
      {glow && enchanted && (
        <circle cx="16" cy="16" r="14" fill="#b06bff" opacity="0.18" />
      )}
      <path d={paths.main} fill={def.color} />
      {paths.detail && <path d={paths.detail} fill={def.accent} opacity="0.85" />}
      {paths.detail2 && (
        <path
          d={paths.detail2}
          fill="none"
          stroke={def.accent}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.8"
        />
      )}
      {enchanted && (
        <path
          d={paths.main}
          fill="none"
          stroke="#d9a6ff"
          strokeWidth="0.9"
          opacity="0.55"
        />
      )}
    </svg>
  );
}

export function ItemSlot({
  item,
  amount,
  className = "",
  label,
}: {
  item?: string;
  amount?: number;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`mc-slot group/slot relative ${className}`}
      title={label}
    >
      {item ? <ItemIcon item={item} className="h-[78%] w-[78%]" enchanted /> : null}
      {amount && amount > 1 ? (
        <span
          className="pixel absolute right-[3px] bottom-[1px] text-[8px] text-white"
          style={{ textShadow: "2px 2px 0 #000" }}
        >
          {amount}
        </span>
      ) : null}
    </div>
  );
}
