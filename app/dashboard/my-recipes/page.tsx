"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import RecipeCard from "@/components/RecipeCard";
import EditRecipeModal from "@/components/EditRecipeModal";
import { editRecipe } from "@/lib/actions";

interface Recipe {
  _id: string;
  title: string;
  description: string;
  image: string;
}

export default function MyRecipes() {
  const { user } = useUser();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!user) return;

      const res = await fetch(`/api/recipes?userId=${user.id}`);
      const data = await res.json();
      setRecipes(data);
    };

    fetchRecipes();
  }, [user]);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/recipes/${id}`, { method: "DELETE" });
    if (res.ok) {
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
    }
  };

  const handleEdit = async (recipe: Recipe) => {
    const newTitle = prompt("🍲 Enter New Title:", recipe.title);
    const newDescription = prompt("📝 Enter New Description:", recipe.description);
  
    if (!newTitle || !newDescription) {
      return alert("🔥 Missing Ingredients, Chef!");
    }
  
    const success = await editRecipe(recipe._id, newTitle, newDescription, recipe.image);
  
    if (success) {
      setRecipes((prev) =>
        prev.map((r) =>
          r._id === recipe._id ? { ...r, title: newTitle, description: newDescription } : r
        )
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Recipes</h1>
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              title={recipe.title}
              description={recipe.description}
              image={recipe.image}
              onEdit={() => console.log("Edit", recipe._id)}
              onDelete={() => handleDelete(recipe._id)}
            />
          ))}
        </div>
      ) : (
        <p>No cursed recipes yet. Start conjuring! 💀🔥</p>
      )}
      <EditRecipeModal />
    </div>
  );
}
