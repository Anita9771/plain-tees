"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const spring = { type: "spring", stiffness: 120, damping: 18 } as const;

const headerLinks = [
  { href: "#shop", label: "Shop" },
  { href: "#quality", label: "Quality" },
  { href: "https://wa.me/2345678909876", label: "WhatsApp", external: true },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollFade, setScrollFade] = useState(false);
  const fadeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const triggerScrollFade = useCallback(() => {
    if (fadeTimeoutRef.current) {
      window.clearTimeout(fadeTimeoutRef.current);
    }
    setScrollFade(true);
    fadeTimeoutRef.current = window.setTimeout(() => setScrollFade(false), 360);
  }, []);

  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, []);

  const handleNavigate = useCallback(
    (href: string, external?: boolean) => {
      if (external) {
        window.open(href, "_blank", "noreferrer");
        setMenuOpen(false);
        return;
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        triggerScrollFade();
        targetElement.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }
      setMenuOpen(false);
    },
    [triggerScrollFade],
  );

  return (
    <header className="sticky top-0 z-40 border-b border-outline/60 bg-bg/60 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0, transition: spring }}
          className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-subtext"
        >
          <span className="h-2 w-2 rounded-full bg-accent shadow-glow" aria-hidden />
          Plain Tees
        </motion.div>

        <nav className="hidden items-center gap-8 text-sm text-subtext md:flex">
          {headerLinks.map((link) =>
            link.external ? (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2, color: "#E6E7EB" }}
                transition={spring}
                className="hover:text-text"
              >
                {link.label}
              </motion.a>
            ) : (
              <motion.button
                key={link.href}
                type="button"
                onClick={() => handleNavigate(link.href)}
                whileHover={{ y: -2, color: "#E6E7EB" }}
                transition={spring}
                className="hover:text-text"
              >
                {link.label}
              </motion.button>
            ),
          )}
        </nav>

        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-outline/50 text-subtext transition hover:border-accent hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
        >
          <span
            className={`absolute h-px w-5 bg-current transition-transform duration-300 ${
              menuOpen ? "translate-y-0 rotate-45" : "-translate-y-2"
            }`}
            aria-hidden
          />
          <span
            className={`absolute h-px w-5 bg-current transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
            aria-hidden
          />
          <span
            className={`absolute h-px w-5 bg-current transition-transform duration-300 ${
              menuOpen ? "translate-y-0 -rotate-45" : "translate-y-2"
            }`}
            aria-hidden
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-[#050607de] backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.nav
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="absolute inset-x-4 top-24 rounded-3xl border border-outline/60 bg-surface/80 p-6 text-lg text-text shadow-xl"
            >
              <ul className="space-y-4">
                {headerLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      type="button"
                      onClick={() => handleNavigate(link.href, link.external)}
                      className="flex w-full items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-left uppercase tracking-[0.3em] text-subtext transition hover:border-accent/40 hover:text-text"
                    >
                      <span>{link.label}</span>
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 0.8, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={spring}
                        className="text-xs text-accent"
                      >
                        Tap to go
                      </motion.span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {scrollFade && (
          <motion.div
            key="scroll-fade"
            className="pointer-events-none fixed inset-0 z-20 bg-gradient-to-b from-[#0E0E0E]/70 via-[#0E0E0E]/30 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            aria-hidden
          />
        )}
      </AnimatePresence>
    </header>
  );
}
