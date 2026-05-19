"use client";
import { useLocale } from "@/i18n/LocaleProvider";

export default function Experience() {
  const { t } = useLocale();

  return (
    <section className="section" id="experience" style={{ minHeight: '100vh' }}>
      <div className="experience">
        <p className="section-label reveal">{t("experience.label")}</p>
        <h2 className="section-title reveal reveal-delay-1">{t("experience.title")}</h2>
        <div className="section-divider reveal reveal-delay-2"></div>

        <div className="timeline">
          <div className="timeline-item reveal">
            <div className="timeline-dot"></div>
            <span className="timeline-year">2023 — Present</span>
            <h3>Junior Architect</h3>
            <h4>Studio Arsitektur XYZ — Jakarta</h4>
            <p>Menangani desain arsitektur untuk proyek residential dan commercial. Bertanggung jawab atas pengembangan konsep, dokumentasi konstruksi, dan koordinasi dengan tim engineering.</p>
          </div>
          <div className="timeline-item reveal">
            <div className="timeline-dot"></div>
            <span className="timeline-year">2021 — 2023</span>
            <h3>Architectural Intern</h3>
            <h4>PT Desain Nusantara — Bandung</h4>
            <p>Pengembangan desain skematik, pembuatan model 3D, dan asistensi dalam presentasi klien untuk berbagai proyek residential.</p>
          </div>
          <div className="timeline-item reveal">
            <div className="timeline-dot"></div>
            <span className="timeline-year">2017 — 2021</span>
            <h3>S1 Arsitektur</h3>
            <h4>Universitas ABC</h4>
            <p>Menyelesaikan program sarjana arsitektur dengan fokus pada desain berkelanjutan. Aktif dalam kompetisi desain mahasiswa dan organisasi arsitektur kampus.</p>
          </div>
        </div>

        <div className="skills-section reveal">
          <p className="section-label">{t("experience.techSkills")}</p>
          <div className="skills-grid">
            <span className="skill-tag">AutoCAD</span>
            <span className="skill-tag">SketchUp</span>
            <span className="skill-tag">Revit</span>
            <span className="skill-tag">3DS Max</span>
            <span className="skill-tag">V-Ray</span>
            <span className="skill-tag">Lumion</span>
            <span className="skill-tag">Photoshop</span>
            <span className="skill-tag">Illustrator</span>
            <span className="skill-tag">InDesign</span>
            <span className="skill-tag">Rhino</span>
            <span className="skill-tag">Grasshopper</span>
            <span className="skill-tag">Enscape</span>
          </div>
        </div>
      </div>
    </section>
  );
}
