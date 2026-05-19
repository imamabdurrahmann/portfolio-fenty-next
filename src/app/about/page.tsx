"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useLocale } from "@/i18n/LocaleProvider";
import SplitText from "@/components/SplitText";

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
    <section className="section about" id="about" style={{ minHeight: '100vh' }}>
      <div className="about-grid">
        <div className="about-image reveal">
          <Image 
            src="/img/profile.png" 
            alt="Dwi Fenty Fetria" 
            width={600} 
            height={800} 
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            priority
          />
          <div className="about-image-frame"></div>
        </div>
        <div className="about-text">
          <p className="section-label reveal">{t("about.label")}</p>
          <SplitText text={t("about.title")} className="section-title" delay={0.2} />
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
