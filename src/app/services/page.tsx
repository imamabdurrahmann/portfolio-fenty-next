"use client";
import { useLocale } from "@/i18n/LocaleProvider";
import HoverImageReveal from "@/components/HoverImageReveal";

export default function Services() {
  const { t } = useLocale();

  const services = [
    { key: "arch", img: "/img/project-1.png", id: "01" },
    { key: "int", img: "/img/project-2.png", id: "02" },
    { key: "pm", img: "/img/project-3.png", id: "03" },
    { key: "vis", img: "/img/project-4.png", id: "04" },
    { key: "consult", img: "/img/project-1.png", id: "05" },
    { key: "reno", img: "/img/project-2.png", id: "06" },
  ];

  return (
    <section className="section services" id="services" style={{ minHeight: '100vh', paddingTop: '150px' }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p className="section-label reveal">{t("services.label")}</p>
        <h2 className="section-title reveal reveal-delay-1" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginBottom: '4rem' }}>{t("services.title")}</h2>
        
        <div className="services-list reveal reveal-delay-2">
          {services.map((svc, idx) => (
            <HoverImageReveal key={svc.key} img={svc.img} className="service-list-item">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
                <span style={{ 
                  fontFamily: 'var(--font-label)', 
                  fontSize: '0.8rem', 
                  color: 'var(--accent)',
                  fontWeight: 600,
                  marginTop: '0.5rem'
                }}>
                  {svc.id}
                </span>
                <h3 className="service-list-title">
                  {/* @ts-expect-error dynamic key */}
                  {t(`services.${svc.key}.title`)}
                </h3>
              </div>
              <p className="service-list-desc">
                {/* @ts-expect-error dynamic key */}
                {t(`services.${svc.key}.desc`)}
              </p>
            </HoverImageReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
