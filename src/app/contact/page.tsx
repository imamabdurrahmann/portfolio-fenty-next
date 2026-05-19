"use client";
import { useState } from "react";
import Magnetic from "@/components/Magnetic";
import { useLocale } from "@/i18n/LocaleProvider";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function Contact() {
  const { t } = useLocale();
  const [status, setStatus] = useState(t("contact.send"));
  const controls = useAnimation();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 400 * 2,
      height: 400 * 2,
      phi: 0,
      theta: 0,
      dark: 1, // Dark theme
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 4,
      baseColor: [0.1, 0.1, 0.1], // Dark gray
      markerColor: [0.78, 0.66, 0.43], // Accent color C9A96E
      glowColor: [0.05, 0.05, 0.05],
      markers: [
        { location: [-7.797068, 110.370529], size: 0.08 } // Yogyakarta
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
      },
    } as any);

    return () => globe.destroy();
  }, []);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(t("contact.sending"));
    const form = e.target as HTMLFormElement;
    const formData = {
      name: (form[0] as HTMLInputElement).value,
      email: (form[1] as HTMLInputElement).value,
      subject: (form[2] as HTMLInputElement).value,
      message: (form[3] as HTMLTextAreaElement).value,
    };
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("✅ " + t("contact.sent"));
        setTimeout(() => {
          setStatus(t("contact.send"));
          form.reset();
        }, 3000);
      } else {
        controls.start({ x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } });
        setStatus("❌ " + t("contact.failed"));
        setTimeout(() => setStatus(t("contact.send")), 3000);
      }
    } catch {
      controls.start({ x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } });
      setStatus("❌ " + t("contact.error"));
      setTimeout(() => setStatus(t("contact.send")), 3000);
    }
  };

  return (
    <section className="section contact" id="contact" style={{ minHeight: '100vh' }}>
      <div className="contact-grid">
        <div className="contact-info">
          <p className="section-label reveal">{t("contact.label")}</p>
          <h2 className="section-title reveal reveal-delay-1">{t("contact.title")}</h2>
          <div className="section-divider reveal reveal-delay-2"></div>
          <p className="reveal reveal-delay-2">{t("contact.desc")}</p>

          <div className="contact-detail reveal reveal-delay-3">
            <svg className="contact-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div className="contact-detail-text">
              <span>{t("contact.email")}</span>
              <a href="mailto:fenty.fetria@email.com">fenty.fetria@email.com</a>
            </div>
          </div>



          <div className="contact-detail reveal reveal-delay-4" style={{ alignItems: 'center', marginTop: '1rem' }}>
            <div style={{ width: '150px', height: '150px', position: 'relative', overflow: 'hidden', borderRadius: '50%', border: '1px solid var(--border-light)', flexShrink: 0 }}>
              <canvas
                ref={canvasRef}
                style={{ width: 400, height: 400, maxWidth: "100%", aspectRatio: 1, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', cursor: 'grab' }}
              />
            </div>
            <div className="contact-detail-text">
              <span>{t("contact.location")}</span>
              <p>Yogyakarta, Indonesia<br/><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>-7.797° S, 110.370° E</span></p>
            </div>
          </div>

          <div className="contact-social reveal reveal-delay-4">
            <Magnetic>
              <a href="https://wa.me/6285366544375" target="_blank" rel="noreferrer" className="social-link whatsapp" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ width: '22px', height: '22px' }}><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.12.553 4.148 1.604 5.946L.518 24l6.237-1.636C8.5 23.36 10.237 24 12.031 24c6.646 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zm0 22c-1.846 0-3.642-.497-5.228-1.44l-.375-.224-3.88 1.018 1.036-3.784-.246-.391A9.957 9.957 0 012 12.031C2 6.51 6.51 2 12.031 2 17.55 2 22 6.51 22 12.031 22 17.55 17.55 22 12.031 22zm5.518-7.536c-.302-.152-1.785-.882-2.063-.984-.277-.101-.48-.152-.681.152-.202.304-.783.984-.96 1.186-.176.202-.353.228-.655.076-.302-.152-1.275-.47-2.428-1.5-1.012-.904-1.696-2.02-1.898-2.324-.202-.304-.022-.468.129-.62.136-.137.302-.354.453-.532.152-.177.202-.304.302-.506.101-.202.051-.38-.025-.532-.076-.152-.681-1.644-.933-2.253-.245-.591-.496-.511-.681-.52-.176-.01-.378-.01-.58-.01-.202 0-.53.076-.807.38C6.98 7.37 6.173 8.13 6.173 9.674c0 1.545.832 3.038.948 3.19.116.152 2.176 3.32 5.27 4.582.736.3 1.31.48 1.76.613.738.22 1.41.188 1.942.114.6-.084 1.785-.73 2.037-1.434.252-.704.252-1.308.176-1.434-.076-.126-.277-.202-.58-.354z"/></svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://www.linkedin.com/in/dwi-fenty-fetria-755543407/" target="_blank" rel="noreferrer" className="social-link linkedin" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ width: '22px', height: '22px' }}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://www.instagram.com/dwifentyfetria" target="_blank" rel="noreferrer" className="social-link instagram" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ width: '24px', height: '24px' }}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </Magnetic>
          </div>
        </div>

        <motion.form animate={controls} className="contact-form reveal reveal-delay-1" id="contactForm" onSubmit={submitForm}>
          <div className="form-row">
            <div className="form-group">
              <input type="text" placeholder={t("contact.yourName")} required />
            </div>
            <div className="form-group">
              <input type="email" placeholder={t("contact.yourEmail")} required />
            </div>
          </div>
          <div className="form-group">
            <input type="text" placeholder={t("contact.subject")} />
          </div>
          <div className="form-group">
            <textarea placeholder={t("contact.tellProject")} rows={5} required></textarea>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="btn btn-submit" disabled={status === t("contact.sending")} style={{ background: status.includes('✅') ? '#4CAF50' : status.includes('❌') ? '#f44336' : '' }}>{status}</motion.button>
        </motion.form>
      </div>
    </section>
  );
}
