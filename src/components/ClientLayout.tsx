"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LenisScroll from "./LenisScroll";
import Preloader from "./Preloader";
import { useLocale } from "@/i18n/LocaleProvider";
import { motion, useScroll, useSpring } from "framer-motion";
import { useTheme } from "next-themes";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const { t, locale, toggleLocale } = useLocale();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Cursor state
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    setMounted(true);
    const loader = document.getElementById("loader");
    if (loader && !loader.classList.contains("hidden")) {
      setTimeout(() => {
        loader.classList.add("hidden");
      }, 1500);
    }

    const moveCursor = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .project-card, .service-card, input, textarea')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    const handleScroll = () => {
      const nav = document.getElementById("nav");
      nav?.classList.toggle("scrolled", window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Keep IntersectionObserver for legacy .reveal elements that aren't refactored yet
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

    return () => revealObserver.disconnect();
  }, [pathname]);

  const toggleNav = () => setNavOpen(!navOpen);

  if (pathname === '/cv') {
    return <>{children}</>;
  }

  return (
    <>
      <LenisScroll />
      <Preloader />
      <div className="noise-overlay"></div>
      
      {/* Framer Motion Progress Bar */}
      <motion.div 
        className="progress-bar" 
        style={{ 
          scaleX, 
          position: "fixed", top: 0, left: 0, right: 0, height: "3px", 
          background: "var(--accent)", transformOrigin: "0%", zIndex: 10001 
        }} 
      />

      {/* Framer Motion Cursor */}
      <motion.div 
        className="cursor-dot"
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
        style={{ translateX: "-50%", translateY: "-50%" }}
      ></motion.div>
      <motion.div 
        className="cursor-outline"
        animate={{ 
          x: mousePosition.x, 
          y: mousePosition.y,
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? "rgba(201, 169, 110, 0.1)" : "transparent",
          borderColor: isHovered ? "var(--accent)" : "rgba(201, 169, 110, 0.5)"
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
        style={{ translateX: "-50%", translateY: "-50%" }}
      ></motion.div>

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
          <Link href="/" onClick={() => setNavOpen(false)} style={{ color: pathname === '/' ? 'var(--accent)' : '' }}>{t("nav.home")}</Link>
          <Link href="/about" onClick={() => setNavOpen(false)} style={{ color: pathname.includes('about') ? 'var(--accent)' : '' }}>{t("nav.about")}</Link>
          <Link href="/projects" onClick={() => setNavOpen(false)} style={{ color: pathname.includes('projects') ? 'var(--accent)' : '' }}>{t("nav.projects")}</Link>
          <Link href="/services" onClick={() => setNavOpen(false)} style={{ color: pathname.includes('services') ? 'var(--accent)' : '' }}>{t("nav.services")}</Link>
          <Link href="/experience" onClick={() => setNavOpen(false)} style={{ color: pathname.includes('experience') ? 'var(--accent)' : '' }}>{t("nav.experience")}</Link>
          <Link href="/contact" className="nav-cta" onClick={() => setNavOpen(false)}>{t("nav.contact")}</Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem' }}>
            <button 
              onClick={toggleLocale}
              className="nav-btn"
              style={{ 
                padding: '0.2rem 0.5rem', borderRadius: '4px', cursor: 'pointer',
                fontFamily: 'var(--font-label)', fontSize: '0.7rem', fontWeight: 600
              }}
            >
              {locale.toUpperCase()}
            </button>
            {mounted && (
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="nav-btn"
                style={{ 
                  padding: '0.2rem 0.5rem', borderRadius: '4px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
                )}
              </button>
            )}
          </div>

          <div className="mobile-nav-footer">
            <span className="mobile-nav-title">{t("nav.connect")}</span>
            <a href="mailto:fenty.fetria@email.com" style={{ textTransform: 'lowercase', letterSpacing: '0.05em' }}>fenty.fetria@email.com</a>
            <div className="mobile-nav-socials">
              <a href="https://wa.me/6285366544375" target="_blank" rel="noreferrer" aria-label="WhatsApp" style={{ color: '#25D366' }}>
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.12.553 4.148 1.604 5.946L.518 24l6.237-1.636C8.5 23.36 10.237 24 12.031 24c6.646 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zm0 22c-1.846 0-3.642-.497-5.228-1.44l-.375-.224-3.88 1.018 1.036-3.784-.246-.391A9.957 9.957 0 012 12.031C2 6.51 6.51 2 12.031 2 17.55 2 22 6.51 22 12.031 22 17.55 17.55 22 12.031 22zm5.518-7.536c-.302-.152-1.785-.882-2.063-.984-.277-.101-.48-.152-.681.152-.202.304-.783.984-.96 1.186-.176.202-.353.228-.655.076-.302-.152-1.275-.47-2.428-1.5-1.012-.904-1.696-2.02-1.898-2.324-.202-.304-.022-.468.129-.62.136-.137.302-.354.453-.532.152-.177.202-.304.302-.506.101-.202.051-.38-.025-.532-.076-.152-.681-1.644-.933-2.253-.245-.591-.496-.511-.681-.52-.176-.01-.378-.01-.58-.01-.202 0-.53.076-.807.38C6.98 7.37 6.173 8.13 6.173 9.674c0 1.545.832 3.038.948 3.19.116.152 2.176 3.32 5.27 4.582.736.3 1.31.48 1.76.613.738.22 1.41.188 1.942.114.6-.084 1.785-.73 2.037-1.434.252-.704.252-1.308.176-1.434-.076-.126-.277-.202-.58-.354z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/dwi-fenty-fetria-755543407/" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ color: '#0A66C2' }}>
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://www.instagram.com/dwifentyfetria" target="_blank" rel="noreferrer" aria-label="Instagram" style={{ color: '#E1306C' }}>
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
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

      {pathname !== '/cv' && (
        <footer className="footer">
          <p className="footer-copy">{t("footer.copyright")}</p>
          <div className="footer-links">
            <Link href="/about">{t("nav.about")}</Link>
            <Link href="/projects">{t("nav.projects")}</Link>
            <Link href="/contact">{t("nav.contact")}</Link>
          </div>
        </footer>
      )}
    </>
  );
}
