"use client";
import { useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import Image from "next/image";

export default function HoverImageReveal({ children, img, className = "" }: { children: React.ReactNode, img: string, className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true);
    updateTouchCoords(e);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    updateTouchCoords(e);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
  };

  const updateTouchCoords = (e: React.TouchEvent) => {
    if (!ref.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = ref.current.getBoundingClientRect();
    x.set(touch.clientX - rect.left);
    y.set(touch.clientY - rect.top);
  };

  return (
    <div 
      ref={ref}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{ position: "relative" }}
    >
      {children}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          scale: isHovered ? 1 : 0.8,
        }}
        style={{
          position: "absolute",
          top: 0, left: 0,
          x, y,
          translateX: "-50%", translateY: "-50%",
          pointerEvents: "none",
          zIndex: 50,
          width: "250px", height: "180px",
          overflow: "hidden",
        }}
      >
        <Image src={img} alt="Preview" fill style={{ objectFit: "cover" }} />
      </motion.div>
    </div>
  );
}
