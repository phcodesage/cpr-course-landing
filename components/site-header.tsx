"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Programs", href: "#programs" },
  { label: "Syllabus", href: "#syllabus" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`section-shell sticky top-0 z-50 transition-[padding] duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`overflow-hidden border border-white/70 backdrop-blur-xl transition-[border-radius,box-shadow,background-color] duration-300 md:rounded-full ${
          isScrolled
            ? "rounded-[22px] bg-white/92 shadow-[0_14px_36px_rgba(5,38,77,0.13)]"
            : "rounded-[26px] bg-white/82 shadow-[0_20px_55px_rgba(5,38,77,0.12)]"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-[padding,gap] duration-300 ${
            isScrolled ? "gap-2.5 px-4 py-2 sm:px-5 md:px-6" : "gap-3 px-4 py-3 sm:px-5 md:px-6"
          }`}
        >
          <a href="#overview" className="flex min-w-0 items-center gap-3 sm:gap-4" onClick={closeMenu}>
            <div
              className={`shrink-0 rounded-[22px] border border-brand-navy/8 bg-white shadow-[0_10px_24px_rgba(5,38,77,0.08)] transition-[padding] duration-300 ${
                isScrolled ? "p-1.5 sm:p-2" : "p-2"
              }`}
            >
              <Image
                src="/exceed-logo.png"
                alt="Exceed Learning Center logo"
                width={672}
                height={750}
                className={`h-auto object-contain transition-[width] duration-300 ${
                  isScrolled ? "w-[48px] sm:w-[58px]" : "w-[56px] sm:w-[70px]"
                }`}
                priority
              />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-red sm:text-[11px]">
                Exceed Learning Center
              </p>
              <p
                className={`truncate font-display font-semibold text-brand-navy transition-[margin,font-size] duration-300 ${
                  isScrolled ? "mt-0.5 text-sm sm:text-lg" : "mt-1 text-base sm:text-xl"
                }`}
              >
                CPR AND FIRST AID TRAINING
              </p>
            </div>
          </a>

          <nav className={`hidden items-center transition-[gap] duration-300 md:flex ${isScrolled ? "gap-5" : "gap-7"}`}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`font-semibold text-brand-ink/74 transition-[color,font-size] duration-300 hover:text-brand-red ${
                  isScrolled ? "text-[13px]" : "text-sm"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#programs"
              className={`hidden items-center justify-center rounded-full bg-brand-red font-bold text-white transition-[padding,font-size,transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-brand-red/92 md:inline-flex ${
                isScrolled ? "px-4 py-2 text-[13px]" : "px-5 py-2.5 text-sm"
              }`}
            >
              Choose Your Class
            </a>

            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-full border border-brand-navy/10 bg-brand-navy/4 text-brand-navy transition-[width,height,background-color] duration-300 hover:bg-brand-navy/8 md:hidden ${
                isScrolled ? "h-10 w-10" : "h-11 w-11"
              }`}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMenuOpen((current) => !current)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-navigation"
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden ${
            menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-brand-navy/10 bg-white px-4 pb-4 pt-3">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="rounded-2xl px-4 py-3 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-cream hover:text-brand-red"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <a
                href="#programs"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-brand-red px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-red/92"
                onClick={closeMenu}
              >
                Choose Your Class
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
