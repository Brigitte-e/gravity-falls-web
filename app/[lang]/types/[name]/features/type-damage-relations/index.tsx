import Link from "next/link";
import { DEFAULT_TYPE_COLOR, TYPE_COLORS } from "@/lib/constants";
import type { PokemonType, NamedResource } from "@/types";
import type { Locale } from "@/lib/constants";

interface DamageRelationLabel {
  key: string;
  label: string;
}

interface Props {
  type: PokemonType;
  locale: Locale;
  typeNameMap: Record<string, string>;
  sectionTitle: string;
  damageRelationLabels: DamageRelationLabel[];
  emptyLabel: string;
}

function TypeBadge({
  type,
  locale,
  typeNameMap,
}: {
  type: NamedResource;
  locale: Locale;
  typeNameMap: Record<string, string>;
}) {
  return (
    <Link
      href={`/${locale}/types/${type.name}`}
      className="rounded-full px-3 py-1 text-xs font-bold uppercase text-white transition-opacity hover:opacity-80"
      style={{ backgroundColor: TYPE_COLORS[type.name] ?? DEFAULT_TYPE_COLOR }}
    >
      {typeNameMap[type.name] ?? type.name}
    </Link>
  );
}

export function TypeDamageRelations({
  type,
  locale,
  typeNameMap,
  sectionTitle,
  damageRelationLabels,
  emptyLabel,
}: Props) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-pk-yellow/60 mb-4">
        {sectionTitle}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {damageRelationLabels.map(({ key, label }) => {
          const items = type.damage_relations[key as keyof typeof type.damage_relations] as NamedResource[];
          return (
            <div key={key}>
              <p className="text-xs text-muted-foreground mb-2">{label}</p>
              {items.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {items.map((t) => (
                    <TypeBadge key={t.name} type={t} locale={locale} typeNameMap={typeNameMap} />
                  ))}
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">{emptyLabel}</span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
