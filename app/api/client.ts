import { API_REVALIDATE_SECONDS, POKE_API_BASE_URL } from "@/lib/constants";

export async function get<T>(path: string): Promise<T> {
  const url = path.startsWith("http") ? path : `${POKE_API_BASE_URL}${path}`;
  const res = await fetch(url, { next: { revalidate: API_REVALIDATE_SECONDS } });
  if (!res.ok) throw new Error(`PokeAPI error ${res.status}: ${path}`);
  return res.json();
}
