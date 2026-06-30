"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/lib/constants";
import { AuthButton } from "@/components/AuthButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAuthStore } from "@/store/auth";

export interface NavLabels {
  logo: string;
  ariaLabel: string;
  pokemon: string;
  types: string;
  moves: string;
  items: string;
  pokemonOfTheDay: string;
  favorites: string;
  login: string;
  profile: string;
}

interface NavProps {
  labels: NavLabels;
  locale: Locale;
}

export function Nav({ labels, locale }: NavProps) {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);

  const navLinks = [
    { href: `/${locale}/pokemon`, label: labels.pokemon },
    { href: `/${locale}/types`, label: labels.types },
    { href: `/${locale}/moves`, label: labels.moves },
    { href: `/${locale}/items`, label: labels.items },
    { href: `/${locale}/pokemon-of-the-day`, label: labels.pokemonOfTheDay },
    {
      href: user ? `/${locale}/favorites` : `/${locale}/login`,
      activePath: `/${locale}/favorites`,
      label: labels.favorites,
    },
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
          {navLinks.map(({ href, activePath, label }) => {
            const matchPath = activePath ?? href;
            const active = pathname === matchPath || pathname.startsWith(matchPath + "/");
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

        <LanguageSwitcher locale={locale} />

        <AuthButton locale={locale} loginLabel={labels.login} profileLabel={labels.profile} />
      </div>
    </header>
  );
}
