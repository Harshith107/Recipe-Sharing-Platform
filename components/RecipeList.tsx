"use client";
import { Button } from "@/components/ui/button";
import { deleteRecipe } from "@/lib/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import RecipeCard from '../components/RecipeCard';

interface Recipe {
  _id: string;
  title: string;
  description: string;
}

interface RecipeListProps {
  recipes: Recipe[];
}

export default function RecipeList({ recipes }: RecipeListProps) {
  const router = useRouter();

  async function handleDelete(id: string) {
    const confirmed = confirm("💀 Are you sure you want to delete this cursed recipe?");
    if (confirmed) {
      const success = await deleteRecipe(id);
      if (success) {
        toast.success("🔥 Cursed Recipe Deleted");
      } else {
        toast.error("💀 Failed to Delete");
      }
      router.refresh(); // Re-fetch the Data
    }
  }
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          title={recipe.title}
          description={recipe.description}
          onDelete={() => handleDelete(recipe._id)}
          onEdit={() => toast.info("Edit Feature Coming...")}
        />
      ))}
    </div>
  );
}
