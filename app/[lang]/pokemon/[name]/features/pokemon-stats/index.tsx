import { STAT_MAX } from "@/lib/constants";
import { capitalize } from "@/lib/pokeapi";
import type { StatEntry } from "@/types";

function StatBar({ name, displayName, value }: { name: string; displayName: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 text-xs text-muted-foreground uppercase tracking-wide shrink-0">
        {displayName}
      </span>
      <span className="w-8 text-xs font-bold tabular-nums text-right shrink-0">
        {value}
      </span>
      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-pk-yellow transition-all"
          style={{ width: `${(value / STAT_MAX) * 100}%` }}
        />
      </div>
    </div>
  );
}

interface Props {
  stats: StatEntry[];
  title: string;
  statNames?: Record<string, string>;
}

export function PokemonStats({ stats, title, statNames = {} }: Props) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-pk-yellow/60 mb-4">
        {title}
      </h2>
      <div className="flex flex-col gap-3">
        {stats.map(({ stat, base_stat }) => (
          <StatBar
            key={stat.name}
            name={stat.name}
            displayName={statNames[stat.name] ?? capitalize(stat.name)}
            value={base_stat}
          />
        ))}
      </div>
    </section>
  );
}
