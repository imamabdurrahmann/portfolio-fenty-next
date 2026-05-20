"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/i18n/LocaleProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
  const [activeTab, setActiveTab] = useState("all");
  const { t } = useLocale();

  const handleFilter = (category: string) => {
    setActiveTab(category);
  };

  const projects = [
    { id: "rumah-tropis-modern", category: "residential", title: "Rumah Tropis Modern", meta: "Jakarta Selatan — 2024", img: "/img/project-1.png", delay: 0 },
    { id: "urban-living-space", category: "interior", title: "Urban Living Space", meta: "Bandung — 2024", img: "/img/project-2.png", delay: 0.1 },
    { id: "office-tower", category: "commercial", title: "Office Tower Concept", meta: "Surabaya — 2023", img: "/img/project-3.png", delay: 0.2 },
    { id: "minimalist-kitchen", category: "interior", title: "Minimalist Kitchen Design", meta: "Jakarta — 2023", img: "/img/project-4.png", delay: 0.3 },
    { id: "villa-harmoni", category: "residential", title: "Villa Harmoni", meta: "Bali — 2022", img: "/img/project-1.png", delay: 0 },
    { id: "co-working-hub", category: "commercial", title: "Co-Working Hub", meta: "Yogyakarta — 2022", img: "/img/project-3.png", delay: 0.1 },
  ];

  const filteredProjects = projects.filter(
    (p) => activeTab === "all" || p.category === activeTab
  );

  return (
    <section className="section projects" id="projects" style={{ minHeight: '100vh' }}>
      <div className="projects-header">
        <div>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="section-label">{t("projects.label")}</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="section-title">{t("projects.title")}</motion.h2>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="section-divider"></motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="filter-tabs">
          <button className={`filter-tab ${activeTab === "all" ? "active" : ""}`} onClick={() => handleFilter("all")}>{t("projects.filterAll")}</button>
          <button className={`filter-tab ${activeTab === "residential" ? "active" : ""}`} onClick={() => handleFilter("residential")}>{t("projects.filterResidential")}</button>
          <button className={`filter-tab ${activeTab === "commercial" ? "active" : ""}`} onClick={() => handleFilter("commercial")}>{t("projects.filterCommercial")}</button>
          <button className={`filter-tab ${activeTab === "interior" ? "active" : ""}`} onClick={() => handleFilter("interior")}>{t("projects.filterInterior")}</button>
        </motion.div>
      </div>
      <motion.div layout className="projects-grid">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p, idx) => (
            <motion.div
              layout
              key={p.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Link href={`/projects/${p.id}`} className="project-card" style={{ display: 'block' }}>
                <motion.div layoutId={`project-img-${p.id}`} style={{ width: '100%', height: '100%', minHeight: '400px', position: 'relative' }}>
                  <Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover' }} className="project-card-image" priority={idx < 4} />
                </motion.div>
                <div className="project-card-overlay">
                  <span className="project-card-category">{p.category}</span>
                  <h3 className="project-card-title">{p.title}</h3>
                  <p className="project-card-meta">{p.meta}</p>
                </div>
                <div className="project-card-arrow">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
