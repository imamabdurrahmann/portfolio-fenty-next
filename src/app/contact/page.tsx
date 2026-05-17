"use client";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("Send Message");

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
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
        setStatus("Message Sent ✓");
        const btn = document.querySelector(".btn-submit") as HTMLElement;
        if (btn) btn.style.background = "#4CAF50";
        setTimeout(() => {
          setStatus("Send Message");
          if (btn) btn.style.background = "";
          form.reset();
        }, 3000);
      } else {
        setStatus("Failed. Check API setup.");
        setTimeout(() => setStatus("Send Message"), 3000);
      }
    } catch {
      setStatus("Error. Try Again.");
      setTimeout(() => setStatus("Send Message"), 3000);
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
            <a href="https://wa.me/6285366544375" target="_blank" rel="noreferrer" className="social-link" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/dwi-fenty-fetria-755543407/" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
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
          <button type="submit" className="btn btn-submit" disabled={status === "Sending..."}>{status}</button>
        </form>
      </div>
    </section>
  );
}
