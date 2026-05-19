"use client";
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

const skills = [
  "ARCHITECTURE", "INTERIOR", "URBAN DESIGN", "MASTERPLAN", 
  "LANDSCAPE", "FURNITURE", "RENOVATION", "CONSULTING"
];

export default function Marquee() {
  const baseX = useMotionValue(0);
  const baseX2 = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const x2 = useTransform(baseX2, (v) => `${wrap(-50, 0, v)}%`);

  const directionFactor = useRef<number>(1);
  const baseVelocity = -1; // Moving left

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = 1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = -1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy * 3); 
    baseX2.set(baseX2.get() + moveBy * -3); // Moving opposite
  });

  return (
    <div className="marquee-container" style={{ overflow: "hidden", display: "flex", flexDirection: "column", width: "100%", padding: "5rem 0", background: "var(--bg-secondary)" }}>
      {/* First track - Solid text */}
      <motion.div className="marquee-content" style={{ x, display: "flex", whiteSpace: "nowrap" }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="marquee-track" style={{ display: "flex", alignItems: "center", gap: "3rem", paddingRight: "3rem" }}>
            {skills.map((skill, index) => (
              <div key={index} style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(3rem, 7vw, 6rem)",
                fontWeight: 600,
                color: "var(--text-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.02em"
              }}>
                {skill}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
      
      {/* Second track - Outline text */}
      <motion.div className="marquee-content" style={{ x: x2, display: "flex", whiteSpace: "nowrap", marginTop: "-1rem" }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="marquee-track" style={{ display: "flex", alignItems: "center", gap: "3rem", paddingRight: "3rem" }}>
            {skills.map((skill, index) => (
              <div key={index} style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(3rem, 7vw, 6rem)",
                fontWeight: 600,
                color: "transparent",
                WebkitTextStroke: "1px var(--text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.02em"
              }}>
                {skill}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
