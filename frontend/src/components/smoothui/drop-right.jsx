"use client";
import { motion, useReducedMotion } from "motion/react";

export function DropRight({ children, delay = 0, className = "" }) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.25, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
