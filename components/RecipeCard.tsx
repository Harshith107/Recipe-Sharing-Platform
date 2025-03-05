import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEditModal } from "@/lib/store";

interface RecipeCardProps {
  title: string;
  description: string;
  image?: string; // Optional image
  onDelete: () => void;
  onEdit: () => void;
}

export default function RecipeCard({ title, description, image, onDelete, onEdit }: RecipeCardProps) {
  const { openModal } = useEditModal();
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="backdrop-blur-md bg-white/10 rounded-lg shadow-lg overflow-hidden"
    >
      <Card>
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-40 object-cover opacity-90"
          />
        ) : (
          <div className="w-full h-40 bg-gray-800 flex items-center justify-center text-white opacity-60">
            No Image 🔥
          </div>
        )}
        <CardContent>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="mt-2">{description}</p>
          <div className="flex gap-2 mt-4">
            <button className="bg-purple-600 px-3 py-1 rounded" onClick={() => openModal({ title, description })}>
              Edit
            </button>
            <button onClick={onDelete} className="px-4 py-1 bg-red-500 text-white rounded-md">
              Delete
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
