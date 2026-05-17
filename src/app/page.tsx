"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
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
    <section className="hero" id="hero">
      <div className="hero-bg" style={{ backgroundImage: "url('img/hero.png')" }}></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <p className="hero-label">Architect &amp; Interior Designer</p>
        <h1 className="hero-title">
          Dwi Fenty<br />Fetria
        </h1>
        <p className="hero-subtitle">
          Creating thoughtful spaces that blend modern aesthetics with functional elegance.
        </p>
        <div className="hero-buttons">
          <Link href="/projects" className="btn btn-primary">
            View Projects
          </Link>
          <a href="/cv" target="_blank" rel="noreferrer" className="btn btn-outline">
            Download CV
          </a>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Discover More</span>
        <div className="hero-scroll-line"></div>
      </div>
    </section>
  );
}
