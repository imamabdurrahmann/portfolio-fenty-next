"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const isCV = window.location.pathname === '/cv';
    if (isCV) {
      setLoading(false);
      return;
    }

    // Force hide scrollbar during load
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = "auto";
          }, 600); // Wait briefly at 100%
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 1; // Random jump for realism
      });
    }, 30);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100vh", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "#050505", zIndex: 99999,
            display: "flex", justifyContent: "center", alignItems: "center",
            flexDirection: "column",
            borderBottomRightRadius: "30vh", borderBottomLeftRadius: "30vh"
          }}
        >
          <motion.h1 
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            style={{ 
              color: "#fff", fontFamily: "var(--font-heading)", 
              fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "0.05em",
              marginBottom: "1rem", fontWeight: 300, textTransform: "uppercase"
            }}
          >
            Fenty Fetria
          </motion.h1>
          <motion.div 
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            style={{ color: "#666", fontSize: "1rem", letterSpacing: "0.3em", fontFamily: "'Inter', sans-serif" }}
          >
            {count}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
