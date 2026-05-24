"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useLocale } from "@/i18n/LocaleProvider";

const projectOrder = [
  { id: "proyek-rumah-ibu-yorin", title: "Proyek Rumah Ibu Yorin", img: "/img/proyek-rumah-ibu-yorin/5.png" },
  { id: "publikasi-jurnal", title: "Publikasi Jurnal Arsitektur", img: "/img/publikasi-jurnal/29.png" },
  { id: "penghargaan-akademik", title: "Penghargaan Akademik (HAKI)", img: "/img/penghargaan-akademik/20.png" },
  { id: "proyek-mn-house", title: "MN House", img: "/img/proyek-mn-house/3.png" },
  { id: "proyek-rumah-betanto", title: "Rumah Betanto", img: "/img/proyek-rumah-betanto/11.png" },
  { id: "proyek-rumah-ibu-fitri", title: "Rumah Ibu Fitri", img: "/img/proyek-rumah-ibu-fitri/10.png" },
];

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { t } = useLocale();
  
  const title = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // Find current index and determine prev/next
  const currentIdx = projectOrder.findIndex(p => p.id === id);
  const prevProject = currentIdx > 0 ? projectOrder[currentIdx - 1] : null;
  const nextProject = currentIdx < projectOrder.length - 1 ? projectOrder[currentIdx + 1] : null;

  // Parallax setup
  const imageContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <>
      <section className="section" style={{ minHeight: '100vh', paddingTop: '150px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Link href="/projects" className="btn-outline" style={{ display: 'inline-block', padding: '0.5rem 1.5rem', marginBottom: '3rem', fontSize: '0.7rem' }}>
            {t("projects.backToProjects")}
          </Link>

          <p className="section-label reveal">{t("projects.caseStudy")}</p>
          <h1 className="section-title reveal reveal-delay-1" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1rem' }}>{title}</h1>
          <div className="section-divider reveal reveal-delay-2"></div>
          
          <div className="reveal reveal-delay-2" style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
            <div>
              <h4 style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{t("projects.client")}</h4>
              <p>Private Client</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{t("projects.location")}</h4>
              <p>Jakarta, Indonesia</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{t("projects.year")}</h4>
              <p>2024</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{t("projects.role")}</h4>
              <p>Lead Architect</p>
            </div>
          </div>

          <div 
            ref={imageContainerRef}
            className="reveal reveal-delay-3" 
            style={{ width: '100%', height: '600px', marginBottom: '4rem', overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}
            onClick={() => setLightboxOpen(true)}
          >
            <motion.div style={{ y, width: '100%', height: '130%' }} layoutId={`project-img-${id}`}>
              <Image 
                src={projectOrder.find(p => p.id === id)?.img || "/img/project-1.png"} 
                alt={title} 
                fill
                style={{ objectFit: 'cover' }} 
              />
            </motion.div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }} className="reveal">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 400 }}>The Challenge</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Proyek {title} ini memiliki tantangan unik dimana ruang yang tersedia sangat terbatas namun klien menginginkan kesan luas, terbuka, dan terintegrasi dengan alam. Pendekatan desain yang kami ambil berfokus pada pemanfaatan pencahayaan alami yang maksimal, sirkulasi udara silang, serta penggunaan material ramah lingkungan.
            </p>
          </div>

          {/* Prev / Next — super compact */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
            {prevProject ? (
              <a
                href={`/projects/${prevProject.id}`}
                onClick={(e) => { e.preventDefault(); router.push(`/projects/${prevProject.id}`); }}
                className="btn-outline"
                style={{ padding: '0.5rem 1.2rem', fontSize: '0.6rem', display: 'inline-block', textDecoration: 'none' }}
              >
                ← {prevProject.title}
              </a>
            ) : <span />}
            {nextProject ? (
              <a
                href={`/projects/${nextProject.id}`}
                onClick={(e) => { e.preventDefault(); router.push(`/projects/${nextProject.id}`); }}
                className="btn-outline"
                style={{ padding: '0.5rem 1.2rem', fontSize: '0.6rem', display: 'inline-block', textDecoration: 'none' }}
              >
                {nextProject.title} →
              </a>
            ) : <span />}
          </div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(5, 5, 5, 0.95)',
              zIndex: 999999,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'zoom-out'
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{ position: 'relative', width: '90vw', height: '90vh' }}
            >
              <Image 
                src={projectOrder.find(p => p.id === id)?.img || "/img/project-1.png"} 
                alt={title} 
                fill
                style={{ objectFit: 'contain' }} 
              />
            </motion.div>
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
              style={{
                position: 'absolute', top: '2rem', right: '2rem',
                background: 'none', border: 'none', color: '#fff',
                fontSize: '2rem', cursor: 'pointer', zIndex: 10
              }}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
