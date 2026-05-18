"use client";
import { useEffect } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

export default function About() {
  const { t } = useLocale();

  useEffect(() => {
    const counters = document.querySelectorAll(".stat-number");
    let counterAnimated = false;
    const animateCounters = () => {
      if (counterAnimated) return;
      counters.forEach((counter) => {
        const target = parseInt((counter as HTMLElement).dataset.count || "0");
        const suffix = (counter as HTMLElement).dataset.suffix || "";
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target + suffix;
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current) + suffix;
          }
        }, 25);
      });
      counterAnimated = true;
    };

    const statsSection = document.querySelector(".about-stats");
    if (statsSection) {
      const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) animateCounters();
      }, { threshold: 0.5 });
      statsObserver.observe(statsSection);
    }
  }, []);

  return (
    <section className="section about" id="about" style={{ minHeight: '100vh', background: 'var(--bg-secondary)' }}>
      <div className="about-grid">
        <div className="about-image reveal">
          <img src="/img/profile.png" alt="Dwi Fenty Fetria" />
          <div className="about-image-frame"></div>
        </div>
        <div className="about-text">
          <p className="section-label reveal">{t("about.label")}</p>
          <h2 className="section-title reveal reveal-delay-1">
            {t("about.title")}
          </h2>
          <div className="section-divider reveal reveal-delay-2"></div>
          <h3 className="reveal reveal-delay-2">
            {t("about.quote")}
          </h3>
          <p className="reveal reveal-delay-3">
            {t("about.desc1")}
          </p>
          <p className="reveal reveal-delay-3">
            {t("about.desc2")}
          </p>
          <div className="about-stats reveal reveal-delay-4">
            <div>
              <div className="stat-number" data-count="5" data-suffix="+">0</div>
              <div className="stat-label">{t("about.yearsExp")}</div>
            </div>
            <div>
              <div className="stat-number" data-count="20" data-suffix="+">0</div>
              <div className="stat-label">{t("about.projectsCompleted")}</div>
            </div>
            <div>
              <div className="stat-number" data-count="15" data-suffix="+">0</div>
              <div className="stat-label">{t("about.happyClients")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
