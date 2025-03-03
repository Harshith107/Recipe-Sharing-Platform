"use client";
import { motion, useScroll } from "framer-motion";

export default function Parallax({ children }: any) {
  const { scrollY } = useScroll();

  return (
    <motion.div style={{ y: scrollY }}>
      {children}
    </motion.div>
  );
}
