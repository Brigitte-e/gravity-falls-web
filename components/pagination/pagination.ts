export function parsePageParam(page?: string | string[]): number {
  const raw = Array.isArray(page) ? page[0] : page;
  const parsed = Number.parseInt(raw ?? "", 10);
  return Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;
}

export type PageItem = number | "ellipsis";

export function getVisiblePages(current: number, totalPages: number): PageItem[] {
  if (totalPages <= 1) return [1];
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: PageItem[] = [1];
  let left = Math.max(2, current - 1);
  let right = Math.min(totalPages - 1, current + 1);

  if (current <= 3) {
    left = 2;
    right = 4;
  } else if (current >= totalPages - 2) {
    left = totalPages - 3;
    right = totalPages - 1;
  }

  if (left > 2) pages.push("ellipsis");

  for (let i = left; i <= right; i++) pages.push(i);

  if (right < totalPages - 1) pages.push("ellipsis");

  pages.push(totalPages);
  return pages;
}
