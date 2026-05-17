"use client";
import { useEffect } from "react";

export default function About() {
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
          <p className="section-label reveal">About Me</p>
          <h2 className="section-title reveal reveal-delay-1">
            Designing Spaces<br />That Inspire
          </h2>
          <div className="section-divider reveal reveal-delay-2"></div>
          <h3 className="reveal reveal-delay-2">
            "Architecture is not just about buildings — it's about the stories they tell."
          </h3>
          <p className="reveal reveal-delay-3">
            Saya Dwi Fenty Fetria, seorang arsitek dan desainer interior yang passionate dalam
            menciptakan ruang yang tidak hanya indah secara visual, tetapi juga fungsional dan berkelanjutan.
          </p>
          <p className="reveal reveal-delay-3">
            Dengan pengalaman dari dunia akademik hingga proyek profesional, saya percaya bahwa
            setiap desain harus mencerminkan karakter unik penghuninya sekaligus responsif terhadap konteks lingkungannya.
          </p>
          <div className="about-stats reveal reveal-delay-4">
            <div>
              <div className="stat-number" data-count="5" data-suffix="+">0</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div>
              <div className="stat-number" data-count="20" data-suffix="+">0</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div>
              <div className="stat-number" data-count="15" data-suffix="+">0</div>
              <div className="stat-label">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
