"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProjectDetail() {
  const params = useParams();
  const id = params.id as string;
  
  // Format title from ID (e.g., rumah-tropis-modern -> Rumah Tropis Modern)
  const title = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <section className="section" style={{ minHeight: '100vh', paddingTop: '150px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <Link href="/projects" className="btn-outline" style={{ display: 'inline-block', padding: '0.5rem 1.5rem', marginBottom: '3rem', fontSize: '0.7rem' }}>
          ← Back to Projects
        </Link>
        
        <p className="section-label reveal">Case Study</p>
        <h1 className="section-title reveal reveal-delay-1" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1rem' }}>{title}</h1>
        <div className="section-divider reveal reveal-delay-2"></div>
        
        <div className="reveal reveal-delay-2" style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
          <div>
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Client</h4>
            <p>Private Client</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Location</h4>
            <p>Jakarta, Indonesia</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Year</h4>
            <p>2024</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Role</h4>
            <p>Lead Architect</p>
          </div>
        </div>

        <img src="/img/project-1.png" alt={title} className="reveal reveal-delay-3" style={{ width: '100%', height: '600px', objectFit: 'cover', marginBottom: '4rem' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }} className="reveal">
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 400 }}>The Challenge</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            Proyek {title} ini memiliki tantangan unik dimana ruang yang tersedia sangat terbatas namun klien menginginkan kesan luas, terbuka, dan terintegrasi dengan alam. Pendekatan desain yang kami ambil berfokus pada pemanfaatan pencahayaan alami yang maksimal, sirkulasi udara silang, serta penggunaan material ramah lingkungan.
          </p>
        </div>
      </div>
    </section>
  );
}
