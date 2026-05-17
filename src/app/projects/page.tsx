"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Projects() {
  const [activeTab, setActiveTab] = useState("all");

  const handleFilter = (category: string) => {
    setActiveTab(category);
    const cards = document.querySelectorAll(".project-card");
    cards.forEach((card) => {
      if (category === "all" || (card as HTMLElement).dataset.category === category) {
        card.classList.remove("hidden");
        (card as HTMLElement).style.animation = "fadeUp 0.5s ease forwards";
      } else {
        card.classList.add("hidden");
      }
    });
  };

  const projects = [
    { id: "rumah-tropis-modern", category: "residential", title: "Rumah Tropis Modern", meta: "Jakarta Selatan — 2024", img: "/img/project-1.png", delay: "" },
    { id: "urban-living-space", category: "interior", title: "Urban Living Space", meta: "Bandung — 2024", img: "/img/project-2.png", delay: "reveal-delay-1" },
    { id: "office-tower", category: "commercial", title: "Office Tower Concept", meta: "Surabaya — 2023", img: "/img/project-3.png", delay: "reveal-delay-2" },
    { id: "minimalist-kitchen", category: "interior", title: "Minimalist Kitchen Design", meta: "Jakarta — 2023", img: "/img/project-4.png", delay: "reveal-delay-3" },
    { id: "villa-harmoni", category: "residential", title: "Villa Harmoni", meta: "Bali — 2022", img: "/img/project-1.png", delay: "" },
    { id: "co-working-hub", category: "commercial", title: "Co-Working Hub", meta: "Yogyakarta — 2022", img: "/img/project-3.png", delay: "reveal-delay-1" },
  ];

  return (
    <section className="section projects" id="projects" style={{ minHeight: '100vh' }}>
      <div className="projects-header">
        <div>
          <p className="section-label reveal">Portfolio</p>
          <h2 className="section-title reveal reveal-delay-1">Selected Works</h2>
          <div className="section-divider reveal reveal-delay-2"></div>
        </div>
        <div className="filter-tabs reveal reveal-delay-2">
          <button className={`filter-tab ${activeTab === "all" ? "active" : ""}`} onClick={() => handleFilter("all")}>All</button>
          <button className={`filter-tab ${activeTab === "residential" ? "active" : ""}`} onClick={() => handleFilter("residential")}>Residential</button>
          <button className={`filter-tab ${activeTab === "commercial" ? "active" : ""}`} onClick={() => handleFilter("commercial")}>Commercial</button>
          <button className={`filter-tab ${activeTab === "interior" ? "active" : ""}`} onClick={() => handleFilter("interior")}>Interior</button>
        </div>
      </div>
      <div className="projects-grid">
        {projects.map((p, idx) => (
          <Link href={`/projects/${p.id}`} key={idx} className={`project-card reveal ${p.delay}`} data-category={p.category}>
            <Image src={p.img} alt={p.title} width={800} height={600} className="project-card-image" />
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
        ))}
      </div>
    </section>
  );
}
