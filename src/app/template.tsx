"use client";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  // 5 column slice wipe transition
  const columns = 5;
  
  const expand = {
    initial: { top: 0 },
    enter: (i: number) => ({ 
      top: "100vh", 
      transition: { duration: 0.6, delay: 0.05 * i, ease: [0.76, 0, 0.24, 1] } 
    }),
    exit: (i: number) => ({ 
      top: 0, 
      transition: { duration: 0.6, delay: 0.05 * i, ease: [0.76, 0, 0.24, 1] } 
    })
  };

  return (
    <>
      <div 
        style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          display: "flex", zIndex: 9999, pointerEvents: "none"
        }}
      >
        {[...Array(columns)].map((_, i) => (
          <motion.div
            key={i}
            custom={columns - i} // reverse delay for exit
            variants={expand}
            initial="initial"
            animate="enter"
            exit="exit"
            style={{
              position: "relative",
              width: "20vw",
              height: "100%",
              background: "var(--accent)"
            }}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  );
}
