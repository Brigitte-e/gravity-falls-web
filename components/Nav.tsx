"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { LOCALES } from "@/lib/constants";
import type { Locale } from "@/lib/constants";

export interface NavLabels {
  logo: string;
  ariaLabel: string;
  pokemon: string;
  types: string;
  moves: string;
  items: string;
  pokemonOfTheDay: string;
  favorites: string;
}

interface NavProps {
  labels: NavLabels;
  locale: Locale;
}

export function Nav({ labels, locale }: NavProps) {
  const pathname = usePathname();

  const navLinks = [
    { href: `/${locale}/pokemon`, label: labels.pokemon },
    { href: `/${locale}/types`, label: labels.types },
    { href: `/${locale}/moves`, label: labels.moves },
    { href: `/${locale}/items`, label: labels.items },
    { href: `/${locale}/pokemon-of-the-day`, label: labels.pokemonOfTheDay },
    { href: `/${locale}/favorites`, label: labels.favorites },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-pk-darker/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
        <Link
          href={`/${locale}/pokemon`}
          className="flex items-center gap-2 text-xl font-bold text-pk-yellow shrink-0"
        >
          <span className="text-2xl" aria-hidden="true">⚡</span>
          {labels.logo}
        </Link>

        <nav aria-label={labels.ariaLabel} className="flex items-center gap-1 overflow-x-auto flex-1">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                  active
                    ? "bg-pk-red text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-0.5 rounded-lg border border-border p-0.5 shrink-0">
          {LOCALES.map((lang) => (
            <Link
              key={lang}
              href={pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${lang}`)}
              className={cn(
                "rounded-md px-2 py-0.5 text-xs font-semibold transition-colors",
                lang === locale
                  ? "bg-pk-red text-white"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-pressed={lang === locale}
            >
              {lang.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
