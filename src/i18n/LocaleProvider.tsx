"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type Locale = "en" | "id";

type Translations = {
  [key in Locale]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.services": "Services",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "nav.connect": "Let's Connect",
    "hero.label": "Architect & Interior Designer",
    "hero.subtitle": "Creating thoughtful spaces that blend modern aesthetics with functional elegance.",
    "hero.viewProjects": "View Projects",
    "hero.downloadCV": "Download CV",
    "hero.discover": "Discover More",
  },
  id: {
    "nav.home": "Beranda",
    "nav.about": "Tentang",
    "nav.projects": "Proyek",
    "nav.services": "Layanan",
    "nav.experience": "Pengalaman",
    "nav.contact": "Kontak",
    "nav.connect": "Mari Terhubung",
    "hero.label": "Arsitek & Desainer Interior",
    "hero.subtitle": "Menciptakan ruang penuh makna yang memadukan estetika modern dengan keanggunan fungsional.",
    "hero.viewProjects": "Lihat Proyek",
    "hero.downloadCV": "Unduh CV",
    "hero.discover": "Temukan Lebih Banyak",
  }
};

type LocaleContextType = {
  locale: Locale;
  toggleLocale: () => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("fenty-locale") as Locale;
    if (saved && (saved === "en" || saved === "id")) {
      setLocale(saved);
    }
  }, []);

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "id" : "en";
    setLocale(newLocale);
    localStorage.setItem("fenty-locale", newLocale);
  };

  const t = (key: string) => {
    return translations[locale][key] || key;
  };

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
