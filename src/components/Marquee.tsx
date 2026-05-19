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
// Simple wrap utility (replaces @motionone/utils dependency)
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

const skills = [
  "AutoCAD", "SketchUp", "Lumion", "V-Ray", "Enscape",
  "Revit", "3ds Max", "Photoshop", "CorelDRAW", "Illustrator",
];

export default function Marquee() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // wrap from 0 to -50%. We duplicate the children so -50% looks exactly like 0%
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const directionFactor = useRef<number>(1);
  const baseVelocity = -1;

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = 1; // scroll up = right
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = -1; // scroll down = left
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy * 5); // 5 is the base speed multiplier
  });

  return (
    <div className="marquee-container" style={{ overflow: "hidden", display: "flex", width: "100%" }}>
      <motion.div className="marquee-content" style={{ x, display: "flex", whiteSpace: "nowrap" }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="marquee-track" style={{ display: "flex", alignItems: "center" }}>
            {skills.map((skill, index) => (
              <div key={index} className="marquee-item">
                <span className="marquee-dot" />
                {skill}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
