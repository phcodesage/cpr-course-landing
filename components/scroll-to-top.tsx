"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTopSection = () => {
    const topSection = document.getElementById("overview");

    if (topSection) {
      topSection.scrollIntoView({ behavior: "auto", block: "start" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 140);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTopSection}
      className={`fixed bottom-5 right-5 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-brand-navy text-white shadow-[0_18px_42px_rgba(5,38,77,0.35)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-7 sm:right-7 ${
        isVisible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}