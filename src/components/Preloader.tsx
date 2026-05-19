"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'counting' | 'reveal' | 'exit'>('counting');
  const countRef = useRef(0);

  useEffect(() => {
    const isCV = window.location.pathname === '/cv';
    if (isCV) {
      setLoading(false);
      return;
    }

    // Force hide scrollbar during load
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      countRef.current += Math.floor(Math.random() * 4) + 1;
      if (countRef.current >= 100) {
        countRef.current = 100;
        clearInterval(interval);
        setCount(100);
        // Phase: reveal (hold at 100% with glow)
        setTimeout(() => setPhase('reveal'), 300);
        // Phase: exit (start curtain animation)
        setTimeout(() => {
          setPhase('exit');
          setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = "auto";
          }, 1200);
        }, 1400);
        return;
      }
      setCount(countRef.current);
    }, 50);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, []);

  const firstName = "DWI";
  const middleName = "FENTY";
  const lastName = "FETRIA";

  const letterVariants: Variants = {
    hidden: { y: 120, opacity: 0, rotateX: 90 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.05,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
    exit: (i: number) => ({
      y: -60,
      opacity: 0,
      transition: {
        duration: 0.4,
        delay: i * 0.02,
        ease: [0.55, 0.055, 0.675, 0.19],
      },
    }),
  };

  const allLetters = `${firstName} ${middleName} ${lastName}`.split("");

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: "-100vh",
            borderBottomLeftRadius: "50%",
            borderBottomRightRadius: "50%",
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.05 },
          }}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "#050505",
            zIndex: 99999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Ambient glow behind text */}
          <motion.div
            animate={{
              opacity: phase === 'reveal' ? 0.4 : 0.08,
              scale: phase === 'reveal' ? 1.3 : 1,
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              position: "absolute",
              width: "500px",
              height: "300px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(201, 169, 110, 0.25) 0%, transparent 70%)",
              filter: "blur(80px)",
              pointerEvents: "none",
            }}
          />

          {/* Decorative corner lines */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "absolute",
              top: "3rem",
              left: "3rem",
              width: "60px",
              height: "1px",
              background: "rgba(201, 169, 110, 0.3)",
              transformOrigin: "left",
            }}
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "absolute",
              top: "3rem",
              left: "3rem",
              width: "1px",
              height: "60px",
              background: "rgba(201, 169, 110, 0.3)",
              transformOrigin: "top",
            }}
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "absolute",
              bottom: "3rem",
              right: "3rem",
              width: "60px",
              height: "1px",
              background: "rgba(201, 169, 110, 0.3)",
              transformOrigin: "right",
            }}
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "absolute",
              bottom: "3rem",
              right: "3rem",
              width: "1px",
              height: "60px",
              background: "rgba(201, 169, 110, 0.3)",
              transformOrigin: "bottom",
            }}
          />

          {/* Tagline top */}
          <motion.p
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 0.5, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "rgba(201, 169, 110, 0.8)",
              marginBottom: "2rem",
            }}
          >
            Portfolio
          </motion.p>

          {/* Main Name — Staggered letter animation */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              perspective: "600px",
            }}
          >
            {allLetters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(2.2rem, 6vw, 5rem)",
                  fontWeight: 400,
                  color: "#F5F5F0",
                  letterSpacing: "0.06em",
                  display: "inline-block",
                  textTransform: "uppercase",
                  marginRight: letter === " " ? "0.4em" : "0",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>

          {/* Animated progress line */}
          <div
            style={{
              position: "relative",
              width: "180px",
              height: "1px",
              background: "rgba(255,255,255,0.08)",
              marginTop: "2.5rem",
              overflow: "hidden",
              borderRadius: "1px",
            }}
          >
            <motion.div
              animate={{ width: `${count}%` }}
              transition={{ duration: 0.15, ease: "linear" }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                background: "linear-gradient(90deg, rgba(201, 169, 110, 0.3), rgba(201, 169, 110, 1))",
                borderRadius: "1px",
                boxShadow: phase === 'reveal'
                  ? "0 0 20px rgba(201, 169, 110, 0.6), 0 0 40px rgba(201, 169, 110, 0.3)"
                  : "0 0 8px rgba(201, 169, 110, 0.3)",
              }}
            />
          </div>

          {/* Counter */}
          <motion.div
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "0.3rem",
              marginTop: "1.5rem",
            }}
          >
            <motion.span
              key={count}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.15 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.6rem",
                fontWeight: 200,
                color: phase === 'reveal' ? "rgba(201, 169, 110, 1)" : "rgba(255,255,255,0.4)",
                letterSpacing: "0.1em",
                fontVariantNumeric: "tabular-nums",
                transition: "color 0.5s ease",
              }}
            >
              {count}
            </motion.span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 400,
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.05em",
              }}
            >
              %
            </span>
          </motion.div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              initial={{
                x: (i % 2 === 0 ? -1 : 1) * (100 + i * 60),
                y: (i % 3 === 0 ? -1 : 1) * (50 + i * 40),
                opacity: 0,
              }}
              animate={{
                x: (i % 2 === 0 ? -1 : 1) * (120 + i * 50),
                y: [
                  (i % 3 === 0 ? -1 : 1) * (50 + i * 40),
                  (i % 3 === 0 ? -1 : 1) * (70 + i * 30),
                  (i % 3 === 0 ? -1 : 1) * (50 + i * 40),
                ],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                width: 3 + i,
                height: 3 + i,
                borderRadius: "50%",
                background: "rgba(201, 169, 110, 0.6)",
                filter: "blur(1px)",
                pointerEvents: "none",
              }}
            />
          ))}

          {/* Bottom tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 1 }}
            style={{
              position: "absolute",
              bottom: "3rem",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.55rem",
              fontWeight: 500,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            Interior &amp; Architecture
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
