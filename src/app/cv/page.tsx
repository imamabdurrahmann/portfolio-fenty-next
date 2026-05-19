"use client";
import { useEffect } from "react";

export default function CVPage() {
  useEffect(() => {
    // Memaksa mode terang/putih khusus untuk halaman CV
    document.body.classList.add("cv-print-mode");
    return () => document.body.classList.remove("cv-print-mode");
  }, []);

  return (
    <div className="cv-wrapper">
      <button 
        className="cv-print-btn" 
        onClick={() => window.print()}
      >
        🖨️ Download PDF / Print
      </button>

      <div className="cv-container">
        <header className="cv-header">
          <div>
            <h1>Dwi Fenty<br/>Fetria</h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p>Architect & Interior Designer</p>
          </div>
        </header>

        <div className="cv-body">
          {/* KOLOM KIRI */}
          <div>
            <div className="cv-section">
              <h2>Contact</h2>
              <div className="cv-contact-item">📍 Yogyakarta, Indonesia</div>
              <div className="cv-contact-item">✉️ fenty.fetria@email.com</div>
              <div className="cv-contact-item">📞 +62 853 6654 4375</div>
              <div className="cv-contact-item">🌐 portfolio-fenty.vercel.app</div>
            </div>

            <div className="cv-section">
              <h2>Education</h2>
              <div className="cv-item">
                <h3>Institut Teknologi Bandung</h3>
                <h4>B.A. Architecture | 2014 - 2018</h4>
                <p>Graduated with Honors. Focused on Sustainable and Modern Tropical Architecture.</p>
              </div>
            </div>

            <div className="cv-section">
              <h2>Skills</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', lineHeight: '2', color: '#444' }}>
                <li>▸ AutoCAD & SketchUp</li>
                <li>▸ Revit & BIM Modeling</li>
                <li>▸ Lumion & V-Ray Rendering</li>
                <li>▸ Interior Space Planning</li>
                <li>▸ Sustainable Material Sourcing</li>
                <li>▸ Project & Site Management</li>
              </ul>
            </div>
          </div>

          {/* KOLOM KANAN */}
          <div>
            <div className="cv-section">
              <h2>Profile</h2>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#333' }}>
                A highly creative and detail-oriented architect with over 6 years of experience in designing modern, sustainable residential and commercial spaces. Passionate about blending functional elegance with tropical climate responsiveness to create environments that inspire and endure.
              </p>
            </div>

            <div className="cv-section">
              <h2>Experience</h2>
              
              <div className="cv-item">
                <h3>Senior Architect</h3>
                <h4>Studio Arsitektur Modern — Jakarta | 2021 - Present</h4>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', lineHeight: '1.6', color: '#444', marginTop: '0.5rem' }}>
                  <li>Lead the design and execution of 10+ high-end residential projects across Jakarta and Bali, managing budgets up to Rp 5B.</li>
                  <li>Coordinate with MEP engineers, contractors, and interior teams to ensure design integrity from concept to handover.</li>
                  <li>Introduced sustainable material sourcing which reduced project carbon footprint by 15%.</li>
                </ul>
              </div>

              <div className="cv-item">
                <h3>Junior Architect</h3>
                <h4>PT Desain Nusantara — Bandung | 2018 - 2021</h4>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', lineHeight: '1.6', color: '#444', marginTop: '0.5rem' }}>
                  <li>Assisted in the schematic design and 3D modeling for major commercial complex developments.</li>
                  <li>Drafted construction documents and conducted routine site visits to monitor progress and quality.</li>
                  <li>Collaborated closely with principal architects on award-winning national design competitions.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
