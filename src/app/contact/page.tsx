"use client";

export default function Contact() {
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const btn = document.querySelector(".btn-submit") as HTMLElement;
    if (btn) {
      btn.textContent = "Message Sent ✓";
      btn.style.background = "#4CAF50";
      setTimeout(() => {
        btn.textContent = "Send Message";
        btn.style.background = "";
        (document.getElementById("contactForm") as HTMLFormElement)?.reset();
      }, 3000);
    }
  };

  return (
    <section className="section contact" id="contact" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="contact-grid">
        <div className="contact-info">
          <p className="section-label reveal">Get In Touch</p>
          <h2 className="section-title reveal reveal-delay-1">Let's Work<br />Together</h2>
          <div className="section-divider reveal reveal-delay-2"></div>
          <p className="reveal reveal-delay-2">Punya proyek atau ide yang ingin diwujudkan? Saya selalu terbuka untuk diskusi dan kolaborasi baru.</p>

          <div className="contact-detail reveal reveal-delay-3">
            <svg className="contact-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div className="contact-detail-text">
              <span>Email</span>
              <a href="mailto:fenty.fetria@email.com">fenty.fetria@email.com</a>
            </div>
          </div>

          <div className="contact-detail reveal reveal-delay-3">
            <svg className="contact-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            <div className="contact-detail-text">
              <span>WhatsApp</span>
              <a href="https://wa.me/6281234567890">+62 812 3456 7890</a>
            </div>
          </div>

          <div className="contact-detail reveal reveal-delay-4">
            <svg className="contact-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <div className="contact-detail-text">
              <span>Location</span>
              <p>Jakarta, Indonesia</p>
            </div>
          </div>

          <div className="contact-social reveal reveal-delay-4">
            <a href="#" className="social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Behance">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
              </svg>
            </a>
          </div>
        </div>

        <form className="contact-form reveal reveal-delay-1" id="contactForm" onSubmit={submitForm}>
          <div className="form-row">
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
          </div>
          <div className="form-group">
            <input type="text" placeholder="Subject" />
          </div>
          <div className="form-group">
            <textarea placeholder="Tell me about your project..." rows={5} required></textarea>
          </div>
          <button type="submit" className="btn btn-submit">Send Message</button>
        </form>
      </div>
    </section>
  );
}
