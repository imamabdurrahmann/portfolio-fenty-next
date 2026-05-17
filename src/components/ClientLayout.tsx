"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    // Loader hanya di-trigger sekali saat initial render (karena Nextjs SPA)
    const loader = document.getElementById("loader");
    if (loader && !loader.classList.contains("hidden")) {
      setTimeout(() => {
        loader.classList.add("hidden");
      }, 1500);
    }

    const moveCursor = (e: MouseEvent) => {
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }
      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.animate(
          { left: `${e.clientX}px`, top: `${e.clientY}px` },
          { duration: 500, fill: "forwards" }
        );
      }
    };
    window.addEventListener("mousemove", moveCursor);

    const handleScroll = () => {
      const nav = document.getElementById("nav");
      nav?.classList.toggle("scrolled", window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Observer dijalankan ulang setiap ganti halaman
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    
    revealElements.forEach((el) => {
      el.classList.remove("visible"); 
      revealObserver.observe(el);
    });

    // Reset hover elements
    const hoverElements = document.querySelectorAll("a, button, .project-card, .service-card");
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => cursorOutlineRef.current?.classList.add("hover"));
      el.addEventListener("mouseleave", () => cursorOutlineRef.current?.classList.remove("hover"));
    });

    // Scroll top automatically handled by Nextjs Link, but ensure clean state
    return () => {
      revealObserver.disconnect();
    }
  }, [pathname]);

  const toggleNav = () => setNavOpen(!navOpen);

  return (
    <>
      <div className="noise-overlay"></div>
      <div className="cursor-dot" ref={cursorDotRef}></div>
      <div className="cursor-outline" ref={cursorOutlineRef}></div>

      <div className="loader" id="loader">
        <div className="loader-name">
          <span style={{ animationDelay: "0.1s" }}>D</span>
          <span style={{ animationDelay: "0.15s" }}>W</span>
          <span style={{ animationDelay: "0.2s" }}>I</span>
          <span style={{ animationDelay: "0.25s" }}>&nbsp;</span>
          <span style={{ animationDelay: "0.3s" }}>F</span>
          <span style={{ animationDelay: "0.35s" }}>E</span>
          <span style={{ animationDelay: "0.4s" }}>N</span>
          <span style={{ animationDelay: "0.45s" }}>T</span>
          <span style={{ animationDelay: "0.5s" }}>Y</span>
        </div>
        <div className="loader-line"></div>
      </div>

      <nav className={`nav ${pathname !== '/' ? 'scrolled' : ''}`} id="nav">
        <Link href="/" className="nav-logo">
          FENTY<span>.</span>
        </Link>
        <div className={`nav-links ${navOpen ? "open" : ""}`} id="navLinks">
          <Link href="/" onClick={() => setNavOpen(false)} style={{ color: pathname === '/' ? 'var(--accent)' : '' }}>Home</Link>
          <Link href="/about" onClick={() => setNavOpen(false)} style={{ color: pathname.includes('about') ? 'var(--accent)' : '' }}>About</Link>
          <Link href="/projects" onClick={() => setNavOpen(false)} style={{ color: pathname.includes('projects') ? 'var(--accent)' : '' }}>Projects</Link>
          <Link href="/services" onClick={() => setNavOpen(false)} style={{ color: pathname.includes('services') ? 'var(--accent)' : '' }}>Services</Link>
          <Link href="/experience" onClick={() => setNavOpen(false)} style={{ color: pathname.includes('experience') ? 'var(--accent)' : '' }}>Experience</Link>
          <Link href="/contact" className="nav-cta" onClick={() => setNavOpen(false)}>Contact</Link>
        </div>
        <button
          className={`nav-hamburger ${navOpen ? "active" : ""}`}
          onClick={toggleNav}
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      <main style={{ minHeight: "100vh" }}>
        {children}
      </main>

      {pathname !== '/' && (
        <footer className="footer">
          <p className="footer-copy">&copy; 2026 Dwi Fenty Fetria. All rights reserved.</p>
          <div className="footer-links">
            <Link href="/about">About</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </footer>
      )}
    </>
  );
}
