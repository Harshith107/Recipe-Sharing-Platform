import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.div
      className="w-full h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-center"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <h1 className="text-6xl font-black tracking-tight animate-pulse">
        🔥 The Cursed Kitchen
      </h1>
      <p className="text-lg mt-4">
        Share Cursed Recipes, Cook Malicious Dishes & Exorcise Hunger 💀🍜
      </p>
    </motion.div>
  );
}
