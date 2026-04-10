"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { localeNames, localeFlags, type Locale } from "@/i18n/config";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { href: "#value", label: t("value") },
    { href: "#solution", label: t("solution") },
    { href: "#flow", label: t("flow") },
    { href: "#product", label: t("product") },
    { href: "#contact", label: t("contact") },
  ];

  const locales = Object.keys(localeNames) as Locale[];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const switchLocale = (next: Locale) => {
    router.replace(pathname, { locale: next });
    setLangOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-black/10 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-0 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="relative w-16 h-10 block">
            <Image
              src="/logo-neo.png"
              alt="NEO"
              fill
              className="object-contain"
              priority
            />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-neo-white hover:text-neo-yellow transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Language Switcher */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-sm font-semibold text-neo-white hover:text-neo-yellow px-3 py-1.5 transition-colors"
              >
                <Image
                  src={localeFlags[locale]}
                  alt={locale}
                  width={18}
                  height={18}
                  className="rounded-full object-cover"
                />
                {locale.toUpperCase()}
                <ChevronDown size={13} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-32 rounded-xl border border-white/10 bg-black/80 backdrop-blur-md overflow-hidden"
                  >
                    {locales.map((l) => (
                      <button
                        key={l}
                        onClick={() => switchLocale(l)}
                        className={`flex items-center gap-2 w-full px-3 py-2.5 text-sm transition-colors ${
                          locale === l
                            ? "text-neo-yellow"
                            : "text-white/60 hover:text-white hover:bg-neo-white/10"
                        }`}
                      >
                        <Image
                          src={localeFlags[l]}
                          alt={l}
                          width={16}
                          height={16}
                          className="rounded-full object-cover"
                        />
                        {localeNames[l]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-neo-yellow"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                className="text-2xl font-bold text-white hover:text-neo-yellow transition-colors"
              >
                {link.label}
              </motion.a>
            ))}

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="w-12 h-px bg-white/10"
            />

            {/* Language switcher */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="flex gap-3"
            >
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    switchLocale(l);
                    setMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-200 ${
                    locale === l
                      ? "bg-neo-yellow text-black border-neo-yellow"
                      : "border-white/20 text-white/60 hover:border-neo-yellow/50 hover:text-neo-yellow"
                  }`}
                >
                  <Image
                    src={localeFlags[l]}
                    alt={l}
                    width={16}
                    height={16}
                    className="rounded-full object-cover"
                  />
                  {l.toUpperCase()}
                </button>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.4 }}
              className="bg-neo-yellow text-black font-bold text-lg px-8 py-3 rounded-full hover:bg-neo-gold transition-colors"
            >
              {t("cta")}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
