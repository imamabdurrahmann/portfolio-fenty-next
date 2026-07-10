"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface TiltCard3DProps {
  title: string;
  category: string;
  description: string;
  imgSrc: string;
  badge?: string;
}

export default function TiltCard3D({ title, category, description, imgSrc, badge }: TiltCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [gyroActive, setGyroActive] = useState(false);
  const [supportGyro, setSupportGyro] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  // Detect iOS and gyroscope availability on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      setIsIOS(ios);

      if (window.DeviceOrientationEvent) {
        setSupportGyro(true);
      }
    }
  }, []);

  // Desktop Mousemove Handling
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gyroActive) return;
    if (!rectRef.current) {
      if (cardRef.current) {
        rectRef.current = cardRef.current.getBoundingClientRect();
      } else {
        return;
      }
    }

    const rect = rectRef.current;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / rect.width) - 0.5;
    const yPct = (mouseY / rect.height) - 0.5;

    const rx = -yPct * 25;
    const ry = xPct * 25;
    const gx = (mouseX / rect.width) * 100;
    const gy = (mouseY / rect.height) * 100;

    const el = cardRef.current;
    if (el) {
      el.style.setProperty('--rx', `${rx}deg`);
      el.style.setProperty('--ry', `${ry}deg`);
      el.style.setProperty('--gx', `${gx}%`);
      el.style.setProperty('--gy', `${gy}%`);
      el.style.setProperty('--tr', '0.08s cubic-bezier(0.25, 1, 0.5, 1)');
      el.style.setProperty('--o', '0.25');
    }
  };

  const handleMouseEnter = () => {
    if (gyroActive) return;
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
      cardRef.current.style.setProperty('--o', '0.25');
    }
  };

  const handleMouseLeave = () => {
    if (gyroActive) return;
    const el = cardRef.current;
    if (el) {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--gx', '50%');
      el.style.setProperty('--gy', '50%');
      el.style.setProperty('--tr', '0.6s cubic-bezier(0.25, 1, 0.3, 1)');
      el.style.setProperty('--o', '0');
    }
    rectRef.current = null;
  };

  // Mobile Touch Handling (Drag to Tilt fallback)
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (gyroActive || e.touches.length === 0) return;
    if (!rectRef.current) {
      if (cardRef.current) {
        rectRef.current = cardRef.current.getBoundingClientRect();
      } else {
        return;
      }
    }

    const touch = e.touches[0];
    const rect = rectRef.current;
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;

    const xPct = Math.max(-0.5, Math.min(0.5, (touchX / rect.width) - 0.5));
    const yPct = Math.max(-0.5, Math.min(0.5, (touchY / rect.height) - 0.5));

    const rx = -yPct * 25;
    const ry = xPct * 25;
    const gx = ((touchX / rect.width) * 100);
    const gy = ((touchY / rect.height) * 100);

    const el = cardRef.current;
    if (el) {
      el.style.setProperty('--rx', `${rx}deg`);
      el.style.setProperty('--ry', `${ry}deg`);
      el.style.setProperty('--gx', `${gx}%`);
      el.style.setProperty('--gy', `${gy}%`);
      el.style.setProperty('--tr', '0.08s cubic-bezier(0.25, 1, 0.5, 1)');
      el.style.setProperty('--o', '0.25');
    }
  };

  const handleTouchStart = () => {
    if (gyroActive) return;
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
      cardRef.current.style.setProperty('--o', '0.25');
    }
  };

  const handleTouchEnd = () => {
    if (gyroActive) return;
    const el = cardRef.current;
    if (el) {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--gx', '50%');
      el.style.setProperty('--gy', '50%');
      el.style.setProperty('--tr', '0.6s cubic-bezier(0.25, 1, 0.3, 1)');
      el.style.setProperty('--o', '0');
    }
    rectRef.current = null;
  };

  // Gyroscope Sensor orientation hook
  useEffect(() => {
    if (!gyroActive) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      let { beta, gamma } = e;
      if (beta === null || gamma === null) return;

      const targetBeta = 50; // default holding angle
      const betaDiff = Math.max(-25, Math.min(25, beta - targetBeta));
      const gammaDiff = Math.max(-25, Math.min(25, gamma));

      const rx = -(betaDiff / 25) * 25;
      const ry = (gammaDiff / 25) * 25;
      const gx = 50 + (gammaDiff / 25) * 50;
      const gy = 50 + (betaDiff / 25) * 50;

      const el = cardRef.current;
      if (el) {
        el.style.setProperty('--rx', `${rx}deg`);
        el.style.setProperty('--ry', `${ry}deg`);
        el.style.setProperty('--gx', `${gx}%`);
        el.style.setProperty('--gy', `${gy}%`);
        // Smooth transition for gyroscope to feel organic
        el.style.setProperty('--tr', '0.15s cubic-bezier(0.25, 1, 0.5, 1)');
        el.style.setProperty('--o', '0.25');
      }
    };

    const el = cardRef.current;
    if (el) {
      el.style.setProperty('--o', '0.25');
    }

    window.addEventListener("deviceorientation", handleOrientation);
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [gyroActive]);

  const toggleGyroscope = async () => {
    const el = cardRef.current;
    if (gyroActive) {
      setGyroActive(false);
      if (el) {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
        el.style.setProperty('--gx', '50%');
        el.style.setProperty('--gy', '50%');
        el.style.setProperty('--tr', '0.6s cubic-bezier(0.25, 1, 0.3, 1)');
        el.style.setProperty('--o', '0');
      }
      return;
    }

    if (
      typeof window !== "undefined" &&
      typeof DeviceOrientationEvent !== "undefined" &&
      // @ts-ignore
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      try {
        // @ts-ignore
        const permissionState = await DeviceOrientationEvent.requestPermission();
        if (permissionState === "granted") {
          setGyroActive(true);
        } else {
          alert("Izin giroskop ditolak. Menggunakan interaksi touch-drag.");
        }
      } catch (error) {
        console.error("Izin sensor diblokir oleh browser:", error);
        alert("Gagal mengaktifkan giroskop. Gunakan interaksi touch-drag.");
      }
    } else {
      setGyroActive(true);
    }
  };

  return (
    <div className="tilt-card-wrapper" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      {/* 3D Tilt Card Frame */}
      <div 
        style={{
          perspective: "1200px",
          width: "320px",
          height: "440px",
        }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            width: "100%",
            height: "100%",
            transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
            transition: "transform var(--tr, 0.6s cubic-bezier(0.25, 1, 0.3, 1))",
            transformStyle: "preserve-3d",
            position: "relative",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            background: "rgba(21, 21, 21, 0.65)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "24px",
            color: "#F5F5F0",
            willChange: "transform",
          }}
        >
          {/* Layer 0: Glow effect (follows mouse/gyro using CSS custom variables) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              background: "radial-gradient(circle 300px at var(--gx, 50%) var(--gy, 50%), rgba(201, 169, 110, var(--o, 0)) 0%, rgba(201, 169, 110, calc(var(--o, 0) * 0.2)) 50%, transparent 100%)",
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
              zIndex: 1,
              willChange: "transform, opacity",
            }}
          />

          {/* Layer 1: Badge (translateZ for parallax float) */}
          <div 
            style={{ 
              transform: "translateZ(40px)", 
              alignSelf: "flex-end",
              zIndex: 2 
            }}
          >
            {badge && (
              <span 
                style={{
                  background: "rgba(201, 169, 110, 0.15)",
                  color: "#C9A96E",
                  border: "1px solid rgba(201, 169, 110, 0.3)",
                  padding: "4px 10px",
                  borderRadius: "100px",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {badge}
              </span>
            )}
          </div>

          {/* Layer 2: Core Image (Medium Parallax) */}
          <div
            style={{
              width: "100%",
              height: "180px",
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              transform: "translateZ(60px)",
              transformStyle: "preserve-3d",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
              zIndex: 2,
            }}
          >
            <Image
              src={imgSrc}
              alt={title}
              fill
              sizes="272px"
              style={{
                objectFit: "cover",
              }}
            />
            {/* Parallax overlay inside the image */}
            <div 
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 60%)",
                transform: "translateZ(10px)",
              }}
            />
          </div>

          {/* Layer 3: Info & Text (Highest Parallax for depth) */}
          <div
            style={{
              transform: "translateZ(90px)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              zIndex: 3,
            }}
          >
            <span 
              style={{ 
                color: "#C9A96E", 
                fontSize: "11px", 
                fontWeight: 600, 
                letterSpacing: "0.1em",
                textTransform: "uppercase" 
              }}
            >
              {category}
            </span>
            <h3 
              style={{ 
                fontFamily: "var(--font-heading, serif)", 
                fontSize: "22px", 
                fontWeight: 400,
                margin: 0,
                color: "#F5F5F0"
              }}
            >
              {title}
            </h3>
            <p 
              style={{ 
                fontSize: "13px", 
                color: "#A0A0A0", 
                lineHeight: "1.5",
                margin: 0
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Control Info */}
      {supportGyro && (
        <div style={{ marginTop: "10px", textAlign: "center", zIndex: 10 }}>
          <button
            onClick={toggleGyroscope}
            style={{
              background: gyroActive ? "rgba(201, 169, 110, 0.2)" : "rgba(255, 255, 255, 0.05)",
              color: gyroActive ? "#C9A96E" : "#A0A0A0",
              border: gyroActive ? "1px solid #C9A96E" : "1px solid rgba(255, 255, 255, 0.1)",
              padding: "10px 20px",
              borderRadius: "100px",
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
            }}
          >
            {gyroActive ? "❌ Matikan Giroskop" : "✨ Aktifkan Giroskop (Goyang HP)"}
          </button>
          <p style={{ fontSize: "11px", color: "#606060", marginTop: "8px" }}>
            {gyroActive 
              ? "Goyangkan atau miringkan handphone Anda untuk melihat efek 3D." 
              : "Seret kartu dengan jari atau aktifkan tombol di atas untuk efek giroskop."
            }
          </p>
        </div>
      )}
      {!supportGyro && (
        <p style={{ fontSize: "11px", color: "#606060", marginTop: "10px" }}>
          💡 Sentuh & seret kartu di atas untuk memiringkannya secara 3D.
        </p>
      )}
    </div>
  );
}
