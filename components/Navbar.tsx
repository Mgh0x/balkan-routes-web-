"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileMenu } from "@/components/MobileMenu";
import { useTranslation } from "@/components/LanguageProvider";
import { cx } from "@/lib/localize";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { dictionary } = useTranslation();

  const navItems = [
    { href: "/", label: dictionary.nav.home },
    { href: "/about", label: dictionary.nav.about },
    { href: "/tours", label: dictionary.nav.tours },
    { href: "/services", label: dictionary.nav.services },
    { href: "/team", label: dictionary.nav.team },
    { href: "/blog", label: dictionary.nav.blog },
    { href: "/contact", label: dictionary.nav.contact },
  ];

  return (
    <>
      <header className="site-header fixed inset-x-0 top-0 z-40 border-b border-white/12 bg-[#070706]/90 text-white backdrop-blur-md">
        <div className="container-shell flex h-[72px] items-center justify-between gap-6">
          <Link href="/" className="flex items-center" aria-label="Skopje Routes home">
            <BrandMark />
          </Link>

          <nav className="hidden items-center gap-5 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "nav-link relative py-2 text-[0.82rem] font-semibold transition",
                    active ? "text-[var(--gold)] after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-[var(--gold)]" : "text-white/72 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <Link
              href="/custom-trip"
              className="nav-cta inline-flex min-h-10 items-center justify-center border border-[var(--gold)] bg-[var(--gold)] px-5 text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-[var(--ink)] transition hover:bg-transparent hover:text-[var(--gold)]"
            >
              {dictionary.nav.plan}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center border border-white/20 md:hidden"
            aria-label={dictionary.nav.menu}
          >
            <Menu size={21} aria-hidden="true" />
          </button>
        </div>
      </header>
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} navItems={navItems} pathname={pathname} />
    </>
  );
}
