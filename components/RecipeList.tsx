"use client";
import { Card, CardContent } from "@/components/ui/card";
import { deleteRecipe } from "@/lib/actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
      await deleteRecipe(id);
      toast.success("🔥 Cursed Recipe Deleted");
      router.refresh(); // Re-fetch the Data
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {recipes.map((recipe) => (
        <Card key={recipe._id} className="hover:scale-105 transition">
          <CardContent>
            <h2 className="text-xl font-semibold">{recipe.title}</h2>
            <p>{recipe.description}</p>

            <div className="flex justify-between items-center mt-4">
              <Button variant="destructive" onClick={() => handleDelete(recipe._id)}>
                DELETE 🔥
              </Button>
              <Button variant="outline" onClick={() => toast.info("Edit Feature Coming...")}>
                EDIT 📝
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
