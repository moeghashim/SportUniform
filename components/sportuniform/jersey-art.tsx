import clsx from "clsx";
import type { CSSProperties } from "react";

export function JerseyArt({
  team,
  number,
  colors,
  compact = false,
}: {
  team: string;
  number: string;
  colors: string[];
  compact?: boolean;
}) {
  const primary = colors[0] || "#0f2d5a";
  const accent = colors[1] || "#1f68d7";
  const light = colors[2] || "#ffffff";

  return (
    <div
      className={clsx(
        "relative mx-auto flex items-center justify-center",
        compact ? "h-40 w-44" : "h-72 w-72",
      )}
      style={
        {
          "--primary": primary,
          "--accent": accent,
          "--light": light,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <div className="absolute left-4 top-8 h-20 w-12 -rotate-12 rounded-[28px_10px_12px_28px] bg-[var(--primary)] shadow-lg ring-4 ring-[var(--accent)]" />
      <div className="absolute right-4 top-8 h-20 w-12 rotate-12 rounded-[10px_28px_28px_12px] bg-[var(--primary)] shadow-lg ring-4 ring-[var(--accent)]" />
      <div className="relative flex h-[78%] w-[62%] flex-col items-center rounded-b-[34px] rounded-t-[18px] bg-[var(--primary)] pt-11 text-center shadow-2xl ring-4 ring-[var(--accent)]">
        <div className="absolute left-1/2 top-0 h-10 w-16 -translate-x-1/2 rounded-b-full border-b-4 border-[var(--accent)] bg-white" />
        <div className="max-w-[86%] truncate text-sm font-black tracking-wide text-[var(--light)] drop-shadow md:text-base">
          {team}
        </div>
        <div
          className={clsx(
            "font-black leading-none text-[var(--accent)] drop-shadow",
            compact ? "text-5xl" : "text-7xl",
          )}
        >
          {number}
        </div>
        <div className="mt-auto h-5 w-full rounded-b-[30px] bg-[var(--accent)]" />
      </div>
    </div>
  );
}
