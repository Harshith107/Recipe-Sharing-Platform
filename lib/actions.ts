"use server";
import { Recipe } from "./models/recipe";
import { connectToDB } from "./mongodb";
import { toast } from "sonner";

// Fetch User Recipes
export async function fetchUserRecipes(userId: string) {
  try {
    await connectToDB();
    const recipes = await Recipe.find({ userId }).sort({ createdAt: -1 });
    return recipes;
  } catch (error) {
    console.error("Internal Curse Error:", error);
    toast.error("Failed to fetch user's cursed recipes.");
    return [];
  }
}

// Delete Recipe
export async function deleteRecipe(id: string) {
  try {
    console.log(`Deleting Recipe 🔥: /api/recipes/${id}`);
    const res = await fetch(`/api/recipes/${id}`, {
      method: "DELETE",
      cache: "no-store", 
    });
    

    if (res.ok) {
      toast.success("Recipe exorcised successfully! 🔥");
      return true;
    } else {
      const errorData = await res.json();
      console.error("Error deleting recipe:", errorData);
      toast.error("Failed to exorcise recipe.");
      return false;
    }
  } catch (error) {
    console.error("Internal Curse Error:", error);
    toast.error("Internal Curse Error: Recipe couldn't be exorcised 💀.");
    return false;
  }
}

export async function editRecipe(id: string, title: string, description: string, image?: string) {
  try {
    console.log(`✍️ Editing Recipe: ${id}`);

    const res = await fetch(`/api/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, image }),
    });

    console.log("API Response:", res.status);

    if (res.ok) {
      toast.success("🔥 Recipe Updated");
      return true;
    } else {
      const error = await res.json();
      console.error("❌ Edit Error:", error.message);
      toast.error(error.message);
      return false;
    }
  } catch (error) {
    console.error("Internal Curse Error:", error);
    toast.error("💀 Curse Technique: Internal Error");
    return false;
  }
}