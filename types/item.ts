import type { NamedResource, LocalizedName, LocalizedEffect, LocalizedFlavorText } from "./common";

export interface ItemCategory {
  id: number;
  name: string;
  names: LocalizedName[];
}

export interface Item {
  id: number;
  name: string;
  cost: number;
  category: NamedResource;
  names: LocalizedName[];
  effect_entries: LocalizedEffect[];
  flavor_text_entries: LocalizedFlavorText[];
  sprites: { default: string | null };
}
