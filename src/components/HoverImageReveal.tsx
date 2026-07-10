"use client";
import React, { useRef } from "react";
import Image from "next/image";

export default function HoverImageReveal({ children, img, className = "" }: { children: React.ReactNode, img: string, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
      ref.current.style.setProperty('--o', '1');
      ref.current.style.setProperty('--s', '1');
      ref.current.style.setProperty('--tr', '0.35s cubic-bezier(0.16, 1, 0.3, 1)');
      ref.current.style.setProperty('--tro', '0.3s ease-out');
    }
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (el) {
      el.style.setProperty('--o', '0');
      el.style.setProperty('--s', '0.8');
      el.style.setProperty('--tr', '0.6s cubic-bezier(0.16, 1, 0.3, 1)');
      el.style.setProperty('--tro', '0.3s ease-in');
    }
    rectRef.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rectRef.current) return;
    const mx = e.clientX - rectRef.current.left;
    const my = e.clientY - rectRef.current.top;
    const el = ref.current;
    if (el) {
      el.style.setProperty('--mx', `${mx}px`);
      el.style.setProperty('--my', `${my}px`);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
      ref.current.style.setProperty('--o', '1');
      ref.current.style.setProperty('--s', '1');
      ref.current.style.setProperty('--tr', '0.35s cubic-bezier(0.16, 1, 0.3, 1)');
      ref.current.style.setProperty('--tro', '0.3s ease-out');
    }
    updateTouchCoords(e);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    updateTouchCoords(e);
  };

  const handleTouchEnd = () => {
    const el = ref.current;
    if (el) {
      el.style.setProperty('--o', '0');
      el.style.setProperty('--s', '0.8');
      el.style.setProperty('--tr', '0.6s cubic-bezier(0.16, 1, 0.3, 1)');
      el.style.setProperty('--tro', '0.3s ease-in');
    }
    rectRef.current = null;
  };

  const updateTouchCoords = (e: React.TouchEvent) => {
    if (!rectRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const mx = touch.clientX - rectRef.current.left;
    const my = touch.clientY - rectRef.current.top;
    const el = ref.current;
    if (el) {
      el.style.setProperty('--mx', `${mx}px`);
      el.style.setProperty('--my', `${my}px`);
    }
  };

  return (
    <div 
      ref={ref}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{ position: "relative" }}
    >
      {children}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0,
          transform: "translate(var(--mx, 0px), var(--my, 0px)) translate(-50%, -50%) scale(var(--s, 0.8))",
          opacity: "var(--o, 0)",
          transition: "transform var(--tr, 0.25s cubic-bezier(0.25, 1, 0.5, 1)), opacity var(--tro, 0.25s ease)",
          pointerEvents: "none",
          zIndex: 50,
          width: "250px", height: "180px",
          overflow: "hidden",
          willChange: "transform, opacity",
          borderRadius: "8px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Image src={img} alt="Preview" fill style={{ objectFit: "cover" }} />
      </div>
    </div>
  );
}
