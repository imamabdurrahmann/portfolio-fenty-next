"use client";
import { useState } from "react";

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
        <div className="project-card reveal" data-category="residential">
          <img src="/img/project-1.png" alt="Rumah Tropis Modern" className="project-card-image" />
          <div className="project-card-overlay">
            <span className="project-card-category">Residential</span>
            <h3 className="project-card-title">Rumah Tropis Modern</h3>
            <p className="project-card-meta">Jakarta Selatan — 2024</p>
          </div>
          <div className="project-card-arrow">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" />
            </svg>
          </div>
        </div>

        <div className="project-card reveal reveal-delay-1" data-category="interior">
          <img src="/img/project-2.png" alt="Urban Living Space" className="project-card-image" />
          <div className="project-card-overlay">
            <span className="project-card-category">Interior</span>
            <h3 className="project-card-title">Urban Living Space</h3>
            <p className="project-card-meta">Bandung — 2024</p>
          </div>
          <div className="project-card-arrow">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" />
            </svg>
          </div>
        </div>

        <div className="project-card reveal reveal-delay-2" data-category="commercial">
          <img src="/img/project-3.png" alt="Office Tower Concept" className="project-card-image" />
          <div className="project-card-overlay">
            <span className="project-card-category">Commercial</span>
            <h3 className="project-card-title">Office Tower Concept</h3>
            <p className="project-card-meta">Surabaya — 2023</p>
          </div>
          <div className="project-card-arrow">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" />
            </svg>
          </div>
        </div>

        <div className="project-card reveal reveal-delay-3" data-category="interior">
          <img src="/img/project-4.png" alt="Minimalist Kitchen Design" className="project-card-image" />
          <div className="project-card-overlay">
            <span className="project-card-category">Interior</span>
            <h3 className="project-card-title">Minimalist Kitchen Design</h3>
            <p className="project-card-meta">Jakarta — 2023</p>
          </div>
          <div className="project-card-arrow">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" />
            </svg>
          </div>
        </div>

        <div className="project-card reveal" data-category="residential">
          <img src="/img/project-1.png" alt="Villa Harmoni" className="project-card-image" />
          <div className="project-card-overlay">
            <span className="project-card-category">Residential</span>
            <h3 className="project-card-title">Villa Harmoni</h3>
            <p className="project-card-meta">Bali — 2022</p>
          </div>
          <div className="project-card-arrow">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" />
            </svg>
          </div>
        </div>

        <div className="project-card reveal reveal-delay-1" data-category="commercial">
          <img src="/img/project-3.png" alt="Co-Working Hub" className="project-card-image" />
          <div className="project-card-overlay">
            <span className="project-card-category">Commercial</span>
            <h3 className="project-card-title">Co-Working Hub</h3>
            <p className="project-card-meta">Yogyakarta — 2022</p>
          </div>
          <div className="project-card-arrow">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
