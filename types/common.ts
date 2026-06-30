export interface NamedResource {
  name: string;
  url: string;
}

export interface LocalizedName {
  name: string;
  language: NamedResource;
}

export interface LocalizedEffect {
  effect: string;
  short_effect: string;
  language: NamedResource;
}

export interface LocalizedFlavorText {
  flavor_text?: string;
  text?: string;
  language: NamedResource;
}

export interface ListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedResource[];
}
