"use client";
import { useEffect } from "react";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";

import Marquee from "@/components/Marquee";
import { useLocale } from "@/i18n/LocaleProvider";

export default function Home() {
  const { t } = useLocale();
  
  useEffect(() => {
    const handleScroll = () => {
      const heroBg = document.querySelector(".hero-bg") as HTMLElement;
      if (heroBg) {
        heroBg.style.transform = `scale(1.1) translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section className="hero" id="hero">
        <div className="hero-bg" style={{ backgroundImage: "url('img/hero.png')" }}></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-label">{t("hero.label")}</p>
          <h1 className="hero-title">
            Dwi Fenty<br />Fetria
          </h1>
          <p className="hero-subtitle">
            {t("hero.subtitle")}
          </p>
          <div className="hero-buttons">
            <Magnetic>
              <Link href="/projects" className="btn btn-primary">
                {t("hero.viewProjects")}
              </Link>
            </Magnetic>
            <Magnetic>
              <a href="/cv" target="_blank" rel="noreferrer" className="btn btn-outline">
                {t("hero.downloadCV")}
              </a>
            </Magnetic>
          </div>
        </div>
        <div className="hero-scroll">
          <span>{t("hero.discover")}</span>
          <div className="hero-scroll-line"></div>
        </div>
      </section>
      <Marquee />
    </>
  );
}
