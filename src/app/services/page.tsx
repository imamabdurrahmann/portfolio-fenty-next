"use client";

export default function Services() {
  return (
    <section className="section services" id="services" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
        <p className="section-label reveal">What I Offer</p>
        <h2 className="section-title reveal reveal-delay-1">Services</h2>
        <div className="section-divider reveal reveal-delay-2" style={{ margin: "0 auto 2.5rem" }}></div>
      </div>
      <div className="services-grid">
        <div className="service-card reveal">
          <svg className="service-icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.2" stroke="currentColor">
            <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
          </svg>
          <h3>Architectural Design</h3>
          <p>Perancangan arsitektur dari konsep hingga dokumen konstruksi, dengan fokus pada estetika modern dan keberlanjutan.</p>
        </div>

        <div className="service-card reveal reveal-delay-1">
          <svg className="service-icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.2" stroke="currentColor">
            <path d="M4 20h16M4 20V10M20 20V10M8 14v2M12 12v4M16 10v6M2 10l10-7 10 7" />
          </svg>
          <h3>Interior Design</h3>
          <p>Desain interior yang memadukan keindahan dan kenyamanan, dari pemilihan material hingga furnitur dan pencahayaan.</p>
        </div>

        <div className="service-card reveal reveal-delay-2">
          <svg className="service-icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.2" stroke="currentColor">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="M12 6v6l4 2" />
          </svg>
          <h3>Project Management</h3>
          <p>Manajemen proyek menyeluruh, memastikan timeline dan budget terpenuhi dengan kualitas terbaik.</p>
        </div>

        <div className="service-card reveal">
          <svg className="service-icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.2" stroke="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 3v18" />
          </svg>
          <h3>3D Visualization</h3>
          <p>Visualisasi 3D fotorealistik untuk membantu klien memahami desain sebelum konstruksi dimulai.</p>
        </div>

        <div className="service-card reveal reveal-delay-1">
          <svg className="service-icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.2" stroke="currentColor">
            <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
            <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
          </svg>
          <h3>Design Consultation</h3>
          <p>Konsultasi desain profesional untuk membantu mewujudkan visi ruang impian Anda.</p>
        </div>

        <div className="service-card reveal reveal-delay-2">
          <svg className="service-icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.2" stroke="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <h3>Renovation</h3>
          <p>Transformasi ruang yang sudah ada menjadi lebih modern, efisien, dan sesuai dengan kebutuhan terkini.</p>
        </div>
      </div>
    </section>
  );
}
