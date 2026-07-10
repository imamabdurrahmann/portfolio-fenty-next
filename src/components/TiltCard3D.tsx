"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
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
  const [gyroActive, setGyroActive] = useState(false);
  const [supportGyro, setSupportGyro] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  // Framer Motion Springs for buttery smooth rotation & movement
  const rotateX = useSpring(0, { stiffness: 120, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 20 });
  const glowX = useSpring(50, { stiffness: 150, damping: 25 });
  const glowY = useSpring(50, { stiffness: 150, damping: 25 });
  
  // Motion value for hover state (0 = not hovered/active, 1 = hovered/active)
  const isHovered = useMotionValue(0);

  // Detect iOS and gyroscope availability on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      setIsIOS(ios);

      // Check if device orientation event is supported
      if (window.DeviceOrientationEvent) {
        setSupportGyro(true);
      }
    }
  }, []);

  // Desktop Mousemove Handling
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gyroActive || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Position of mouse relative to card top-left
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Offset percentage from center (-0.5 to 0.5)
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    // Max rotation in degrees
    const maxRot = 25;
    rotateX.set(-yPct * maxRot);
    rotateY.set(xPct * maxRot);

    // Glow position (0 to 100%)
    glowX.set((mouseX / width) * 100);
    glowY.set((mouseY / height) * 100);
  };

  const handleMouseEnter = () => {
    if (gyroActive) return;
    isHovered.set(1);
  };

  const handleMouseLeave = () => {
    if (gyroActive) return;
    isHovered.set(0);
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  // Mobile Touch Handling (Drag to Tilt fallback)
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (gyroActive || !cardRef.current || e.touches.length === 0) return;

    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Position of touch relative to card top-left
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;

    // Constrain offset inside boundary (-0.5 to 0.5)
    const xPct = Math.max(-0.5, Math.min(0.5, (touchX / width) - 0.5));
    const yPct = Math.max(-0.5, Math.min(0.5, (touchY / height) - 0.5));

    const maxRot = 25;
    rotateX.set(-yPct * maxRot);
    rotateY.set(xPct * maxRot);

    glowX.set((touchX / width) * 100);
    glowY.set((touchY / height) * 100);
  };

  const handleTouchStart = () => {
    if (gyroActive) return;
    isHovered.set(1);
  };

  const handleTouchEnd = () => {
    if (gyroActive) return;
    isHovered.set(0);
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  // Gyroscope Sensor orientation hook
  useEffect(() => {
    if (!gyroActive) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      let { beta, gamma } = e;
      if (beta === null || gamma === null) return;

      // Normalization: Beta (front-back tilt, usually 45deg when holding phone)
      // Gamma (left-right tilt, usually 0deg)
      const targetBeta = 50; // default holding angle
      const betaDiff = Math.max(-25, Math.min(25, beta - targetBeta)); // clamp to [-25, 25]
      const gammaDiff = Math.max(-25, Math.min(25, gamma)); // clamp to [-25, 25]

      const maxRot = 25;
      // Map gyro pitch/roll to rotateX & rotateY
      rotateX.set(-(betaDiff / 25) * maxRot);
      rotateY.set((gammaDiff / 25) * maxRot);

      // Glow moves corresponding to tilt
      glowX.set(50 + (gammaDiff / 25) * 50);
      glowY.set(50 + (betaDiff / 25) * 50);
    };

    // Force glow overlay on during gyro
    isHovered.set(1);

    window.addEventListener("deviceorientation", handleOrientation);
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [gyroActive, rotateX, rotateY, glowX, glowY, isHovered]);

  // Requesting Gyroscope permission (specially for iOS Safari)
  const toggleGyroscope = async () => {
    if (gyroActive) {
      setGyroActive(false);
      rotateX.set(0);
      rotateY.set(0);
      glowX.set(50);
      glowY.set(50);
      isHovered.set(0);
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
      // Android / browsers without restriction
      setGyroActive(true);
    }
  };

  // Radial gradient glow template
  const glowGradient = useMotionTemplate`radial-gradient(circle 300px at ${glowX}% ${glowY}%, rgba(201, 169, 110, 0.25) 0%, rgba(201, 169, 110, 0.05) 50%, transparent 100%)`;

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
        <motion.div
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
            rotateX,
            rotateY,
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
          }}
        >
          {/* Layer 0: Glow effect (follows mouse/gyro) */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              background: glowGradient,
              opacity: isHovered,
              pointerEvents: "none",
              zIndex: 1,
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
        </motion.div>
      </div>

      {/* Mobile Control Info (only visible on mobile/touch interfaces or when giroskop is supported) */}
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
