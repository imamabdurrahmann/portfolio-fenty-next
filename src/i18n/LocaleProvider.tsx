"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type Locale = "en" | "id";

type Translations = {
  [key in Locale]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.services": "Services",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "nav.connect": "Let's Connect",
    // Hero
    "hero.label": "Architect & Interior Designer",
    "hero.subtitle": "Creating thoughtful spaces that blend modern aesthetics with functional elegance.",
    "hero.viewProjects": "View Projects",
    "hero.downloadCV": "Download CV",
    "hero.discover": "Discover More",
    // About
    "about.label": "About Me",
    "about.title": "Designing Spaces That Inspire",
    "about.quote": "Architecture is not just about buildings — it's about the stories they tell.",
    "about.desc1": "I am an architect and interior designer passionate about creating spaces that are not only visually beautiful, but also functional and sustainable.",
    "about.desc2": "With experience from academic world to professional projects, I believe that every design should reflect the unique character of its users while being responsive to its environmental context.",
    "about.yearsExp": "Years Experience",
    "about.projectsCompleted": "Projects Completed",
    "about.happyClients": "Happy Clients",
    // Projects
    "projects.label": "Portfolio",
    "projects.title": "Selected Works",
    "projects.filterAll": "All",
    "projects.filterResidential": "Residential",
    "projects.filterCommercial": "Commercial",
    "projects.filterInterior": "Interior",
    "projects.backToProjects": "← Back to Projects",
    "projects.caseStudy": "Case Study",
    "projects.client": "Client",
    "projects.location": "Location",
    "projects.year": "Year",
    "projects.role": "Role",
    // Services
    "services.label": "What I Offer",
    "services.title": "Services",
    "services.arch.title": "Architectural Design",
    "services.arch.desc": "Architecture design from concept to construction documents, focusing on modern aesthetics and sustainability.",
    "services.int.title": "Interior Design",
    "services.int.desc": "Interior design that combines beauty and comfort, from material selection to furniture and lighting.",
    "services.pm.title": "Project Management",
    "services.pm.desc": "Comprehensive project management, ensuring timelines and budgets are met with the best quality.",
    "services.vis.title": "3D Visualization",
    "services.vis.desc": "Photorealistic 3D visualization to help clients understand designs before construction begins.",
    "services.consult.title": "Design Consultation",
    "services.consult.desc": "Professional design consultation to help realize your dream space vision.",
    "services.reno.title": "Renovation",
    "services.reno.desc": "Transform existing spaces to be more modern, efficient, and suited to current needs.",
    // Experience
    "experience.label": "Career Path",
    "experience.title": "Experience & Education",
    "experience.yearsExp": "Years Experience",
    "experience.projectsDone": "Projects Done",
    "experience.clientsServed": "Clients Served",
    "experience.techSkills": "Technical Skills",
    // Contact
    "contact.label": "Get In Touch",
    "contact.title": "Let's Work Together",
    "contact.desc": "Have a project or idea you want to realize? I'm always open for discussion and new collaborations.",
    "contact.email": "Email",
    "contact.location": "Location",
    "contact.subject": "Subject",
    "contact.yourName": "Your Name",
    "contact.yourEmail": "Your Email",
    "contact.tellProject": "Tell me about your project...",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.sent": "Message Sent ✓",
    "contact.failed": "Failed. Check API setup.",
    "contact.error": "Error. Try Again.",
    // Footer
    "footer.copyright": "© 2026 All rights reserved.",
  },
  id: {
    // Navigation
    "nav.home": "Beranda",
    "nav.about": "Tentang",
    "nav.projects": "Proyek",
    "nav.services": "Layanan",
    "nav.experience": "Pengalaman",
    "nav.contact": "Kontak",
    "nav.connect": "Mari Terhubung",
    // Hero
    "hero.label": "Arsitek & Desainer Interior",
    "hero.subtitle": "Menciptakan ruang penuh makna yang memadukan estetika modern dengan keanggunan fungsional.",
    "hero.viewProjects": "Lihat Proyek",
    "hero.downloadCV": "Unduh CV",
    "hero.discover": "Temukan Lebih Banyak",
    // About
    "about.label": "Tentang Saya",
    "about.title": "Merancang Ruang yang Menginspirasi",
    "about.quote": "Arsitektur bukan hanya tentang bangunan — tapi tentang cerita yang mereka sampaikan.",
    "about.desc1": "Saya arsitek dan desainer interior yang passionate dalam menciptakan ruang yang tidak hanya indah secara visual, tetapi juga fungsional dan berkelanjutan.",
    "about.desc2": "Dengan pengalaman dari dunia akademik hingga proyek profesional, saya percaya bahwa setiap desain harus mencerminkan karakter unik penghuninya sekaligus responsif terhadap konteks lingkungannya.",
    "about.yearsExp": "Tahun Pengalaman",
    "about.projectsCompleted": "Proyek Selesai",
    "about.happyClients": "Klien Puas",
    // Projects
    "projects.label": "Portofolio",
    "projects.title": "Karya Pilihan",
    "projects.filterAll": "Semua",
    "projects.filterResidential": "Residensial",
    "projects.filterCommercial": "Komersial",
    "projects.filterInterior": "Interior",
    "projects.backToProjects": "← Kembali ke Proyek",
    "projects.caseStudy": "Studi Kasus",
    "projects.client": "Klien",
    "projects.location": "Lokasi",
    "projects.year": "Tahun",
    "projects.role": "Peran",
    // Services
    "services.label": "Yang Saya Tawarkan",
    "services.title": "Layanan",
    "services.arch.title": "Desain Arsitektur",
    "services.arch.desc": "Perancangan arsitektur dari konsep hingga dokumen konstruksi, dengan fokus pada estetika modern dan keberlanjutan.",
    "services.int.title": "Desain Interior",
    "services.int.desc": "Desain interior yang memadukan keindahan dan kenyamanan, dari pemilihan material hingga furnitur dan pencahayaan.",
    "services.pm.title": "Manajemen Proyek",
    "services.pm.desc": "Manajemen proyek menyeluruh, memastikan timeline dan budget terpenuhi dengan kualitas terbaik.",
    "services.vis.title": "Visualisasi 3D",
    "services.vis.desc": "Visualisasi 3D fotorealistik untuk membantu klien memahami desain sebelum konstruksi dimulai.",
    "services.consult.title": "Konsultasi Desain",
    "services.consult.desc": "Konsultasi desain profesional untuk membantu mewujudkan visi ruang impian Anda.",
    "services.reno.title": "Renovasi",
    "services.reno.desc": "Transformasi ruang yang sudah ada menjadi lebih modern, efisien, dan sesuai dengan kebutuhan terkini.",
    // Experience
    "experience.label": "Jalur Karir",
    "experience.title": "Pengalaman & Pendidikan",
    "experience.yearsExp": "Tahun Pengalaman",
    "experience.projectsDone": "Proyek Selesai",
    "experience.clientsServed": "Klien Dilayani",
    "experience.techSkills": "Keahlian Teknis",
    // Contact
    "contact.label": "Hubungi Saya",
    "contact.title": "Mari Bekerja Sama",
    "contact.desc": "Punya proyek atau ide yang ingin diwujudkan? Saya selalu terbuka untuk diskusi dan kolaborasi baru.",
    "contact.email": "Email",
    "contact.location": "Lokasi",
    "contact.subject": "Subjek",
    "contact.yourName": "Nama Anda",
    "contact.yourEmail": "Email Anda",
    "contact.tellProject": "Ceritakan tentang proyek Anda...",
    "contact.send": "Kirim Pesan",
    "contact.sending": "Mengirim...",
    "contact.sent": "Pesan Terkirim ✓",
    "contact.failed": "Gagal. Cek setup API.",
    "contact.error": "Error. Coba lagi.",
    // Footer
    "footer.copyright": "© 2026 Hak cipta dilindungi.",
  }
};

type LocaleContextType = {
  locale: Locale;
  toggleLocale: () => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("fenty-locale") as Locale;
    if (saved && (saved === "en" || saved === "id")) {
      setLocale(saved);
    }
  }, []);

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "id" : "en";
    setLocale(newLocale);
    localStorage.setItem("fenty-locale", newLocale);
  };

  const t = (key: string) => {
    return translations[locale][key] || key;
  };

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
