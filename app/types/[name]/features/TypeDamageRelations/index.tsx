import Link from "next/link";
import { DEFAULT_TYPE_COLOR, TYPE_DAMAGE_RELATIONS, TYPE_COLORS } from "@/lib/constants";
import { t } from "@/lib/i18n";
import type { PokemonType, NamedResource } from "@/types";

interface Props {
  type: PokemonType;
}

function TypeBadge({ type }: { type: NamedResource }) {
  return (
    <Link
      href={`/types/${type.name}`}
      className="rounded-full px-3 py-1 text-xs font-bold uppercase text-white transition-opacity hover:opacity-80"
      style={{ backgroundColor: TYPE_COLORS[type.name] ?? DEFAULT_TYPE_COLOR }}
    >
      {type.name}
    </Link>
  );
}

export function TypeDamageRelations({ type }: Props) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-pk-yellow/60 mb-4">
        {t("typeDetail.damageRelations")}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {TYPE_DAMAGE_RELATIONS.map(({ labelKey, key }) => {
          const items = type.damage_relations[key];
          return (
            <div key={labelKey}>
              <p className="text-xs text-muted-foreground mb-2">{t(labelKey)}</p>
              {items.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {items.map((type) => (
                    <TypeBadge key={type.name} type={type} />
                  ))}
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">{t("common.empty")}</span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
