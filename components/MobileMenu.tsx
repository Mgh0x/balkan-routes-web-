"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { cx } from "@/lib/localize";
import { useTranslation } from "@/components/LanguageProvider";

type NavItem = {
  href: string;
  label: string;
};

export function MobileMenu({
  isOpen,
  onClose,
  navItems,
  pathname,
}: {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  pathname: string;
}) {
  const { dictionary } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <div className={cx("fixed inset-0 z-50 bg-[var(--ink)] text-white transition md:hidden", "pointer-events-auto opacity-100")} aria-hidden={false}>
      <div className="container-shell flex h-20 items-center justify-between">
        <Link href="/" onClick={onClose} className="flex items-center">
          <BrandMark variant="mobile" />
        </Link>
        <button type="button" onClick={onClose} className="inline-flex h-11 w-11 items-center justify-center border border-white/20" aria-label={dictionary.nav.close}>
          <X size={20} aria-hidden="true" />
        </button>
      </div>
      <nav className="container-shell mt-10 flex flex-col gap-1" aria-label="Mobile navigation">
        {navItems.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cx("border-b border-white/10 py-5 font-display text-4xl transition", active ? "text-[var(--gold)]" : "text-white hover:text-[var(--gold)]")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="container-shell mt-10 flex flex-col gap-5">
        <LanguageSwitcher />
        <Link href="/custom-trip" onClick={onClose} className="inline-flex min-h-12 items-center justify-center bg-[var(--gold)] px-6 text-sm font-bold uppercase tracking-[0.16em] text-[var(--ink)]">
          {dictionary.nav.plan}
        </Link>
      </div>
    </div>
  );
}
