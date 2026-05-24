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
    { id: "proyek-rumah-ibu-yorin", category: "residential", title: "Proyek Rumah Ibu Yorin", meta: "Residential Architecture", img: "/img/proyek-rumah-ibu-yorin/5.png", delay: 0 },
    { id: "publikasi-jurnal", category: "academic", title: "Publikasi Jurnal Arsitektur", meta: "Universitas Muhammadiyah Bengkulu", img: "/img/publikasi-jurnal/29.png", delay: 0.1 },
    { id: "penghargaan-akademik", category: "academic", title: "Penghargaan Akademik", meta: "Sertifikat Hak Kekayaan Intelektual", img: "/img/penghargaan-akademik/19.png", delay: 0.2 },
    { id: "proyek-mn-house", category: "residential", title: "MN House", meta: "Residential Architecture", img: "/img/proyek-mn-house/3.png", delay: 0.3 },
    { id: "proyek-rumah-betanto", category: "residential", title: "Proyek Rumah Betanto", meta: "Residential Architecture", img: "/img/proyek-rumah-betanto/11.png", delay: 0 },
    { id: "proyek-rumah-ibu-fitri", category: "residential", title: "Proyek Rumah Ibu Fitri", meta: "Residential Architecture", img: "/img/proyek-rumah-ibu-fitri/10.png", delay: 0.1 },
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
          <button className={`filter-tab ${activeTab === "residential" ? "active" : ""}`} onClick={() => handleFilter("residential")}>Residential</button>
          <button className={`filter-tab ${activeTab === "academic" ? "active" : ""}`} onClick={() => handleFilter("academic")}>Awards & Publications</button>
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
                <motion.div layoutId={`project-img-${p.id}`} style={{ width: '100%', aspectRatio: '16/9', position: 'relative' }}>
                  <Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover', objectPosition: 'center top' }} className="project-card-image" priority={idx < 4} />
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
