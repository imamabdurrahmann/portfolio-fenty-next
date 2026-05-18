"use client";
import React from "react";
import { motion } from "framer-motion";

const skills = [
  "AutoCAD",
  "SketchUp",
  "Lumion",
  "V-Ray",
  "Enscape",
  "Revit",
  "3ds Max",
  "Photoshop",
  "CorelDRAW",
  "Illustrator",
];

export default function Marquee() {
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="marquee-track"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {skills.map((skill, index) => (
              <div key={index} className="marquee-item">
                <span className="marquee-dot" />
                {skill}
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
