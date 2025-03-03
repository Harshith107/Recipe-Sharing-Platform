import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function CursedCard({ title, description, image }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="backdrop-blur-md bg-white/10 rounded-lg shadow-lg overflow-hidden"
    >
      <Card>
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-40 object-cover opacity-90"
          />
        )}
        <CardContent>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="mt-2">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
