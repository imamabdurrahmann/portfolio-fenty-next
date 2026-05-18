import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { ThemeProvider } from "next-themes";
import { LocaleProvider } from "@/i18n/LocaleProvider";

export const metadata: Metadata = {
  title: "Dwi Fenty Fetria | Architect & Interior Designer",
  description: "Portfolio of Dwi Fenty Fetria — Architect and Interior Designer specializing in modern, sustainable, and elegant spaces.",
  keywords: ["Architect", "Interior Designer", "Dwi Fenty Fetria", "Jakarta", "Architecture Portfolio"],
  openGraph: {
    title: "Dwi Fenty Fetria | Architect & Interior Designer",
    description: "Creating thoughtful spaces that blend modern aesthetics with functional elegance.",
    url: "https://portfolio-fenty-next.vercel.app",
    siteName: "Dwi Fenty Fetria Portfolio",
    images: [
      {
        url: "https://portfolio-fenty-next.vercel.app/img/hero.png",
        width: 1200,
        height: 630,
        alt: "Dwi Fenty Fetria Architecture",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dwi Fenty Fetria",
    "jobTitle": "Architect & Interior Designer",
    "url": "https://portfolio-fenty-next.vercel.app",
    "image": "https://portfolio-fenty-next.vercel.app/img/profile.png",
    "sameAs": [
      "https://www.linkedin.com/in/dwi-fenty-fetria-755543407/",
      "https://www.instagram.com/dwifentyfetria"
    ],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Architecture University"
    }
  };

  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LocaleProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
          </LocaleProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
