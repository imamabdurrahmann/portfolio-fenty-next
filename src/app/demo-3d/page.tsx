"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import TiltCard3D from "@/components/TiltCard3D";
import { useLocale } from "@/i18n/LocaleProvider";

export default function Demo3DPage() {
  const { t } = useLocale();
  const [deviceInfo, setDeviceInfo] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (isTouch) {
        setDeviceInfo("Perangkat Sentuh (Mobile/Tablet)");
      } else {
        setDeviceInfo("Perangkat Desktop (Mouse)");
      }
    }
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "120px 24px 80px 24px",
      background: "radial-gradient(circle at 50% 50%, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
      position: "relative"
    }}>
      <div style={{ maxWidth: "600px", textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 400,
          color: "var(--text-primary)",
          marginBottom: "16px"
        }}>
          Demo Animasi 3D Tilt
        </h1>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          color: "var(--text-secondary)",
          lineHeight: "1.6",
          marginBottom: "24px"
        }}>
          Demo kartu dengan efek 3D Parallaks mendalam. Pada desktop, kartu mengikuti arah kursor mouse.
          Pada mobile, kartu dapat diputar dengan menggeser jari Anda atau menggunakan giroskop handphone.
        </p>
        <div style={{
          display: "inline-block",
          background: "rgba(201, 169, 110, 0.1)",
          border: "1px solid rgba(201, 169, 110, 0.2)",
          borderRadius: "8px",
          padding: "8px 16px",
          fontSize: "12px",
          color: "var(--accent)",
          fontWeight: 500
        }}>
          Terdeteksi: <strong>{deviceInfo || "Mendeteksi..."}</strong>
        </div>
      </div>

      <TiltCard3D
        title="Modern Minimalist Villa"
        category="Architecture Design"
        description="Sebuah rancangan hunian villa modern dengan konsep menyatu dengan alam, pencahayaan alami maksimal, dan tata ruang terbuka."
        imgSrc="/img/proyek-rumah-ibu-yorin/5.png"
        badge="Featured Project"
      />

      <div style={{ marginTop: "60px" }}>
        <Link href="/" className="btn btn-outline" style={{ display: "inline-block" }}>
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
