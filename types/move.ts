import type { NamedResource, LocalizedName, LocalizedEffect, LocalizedFlavorText } from "./common";

export interface Move {
  id: number;
  name: string;
  accuracy: number | null;
  power: number | null;
  pp: number;
  type: NamedResource;
  damage_class: NamedResource;
  names: LocalizedName[];
  effect_entries: LocalizedEffect[];
  flavor_text_entries: LocalizedFlavorText[];
}
