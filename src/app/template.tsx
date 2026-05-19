"use client";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ height: "100vh", top: 0 }}
        animate={{ height: "0vh", top: 0 }}
        exit={{ height: "100vh", top: "100vh" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          background: "var(--accent)",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.4 }}
      >
        {children}
      </motion.div>
    </>
  );
}
