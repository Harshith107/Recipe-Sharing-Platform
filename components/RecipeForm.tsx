"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface RecipeFormProps {
  recipe?: {
    title: string;
    description: string;
  };
  onSubmit: (recipeData: { title: string; description: string }) => Promise<void>;
}

export default function RecipeForm({ recipe, onSubmit }: RecipeFormProps) {
  const [title, setTitle] = useState(recipe?.title ?? "");
  const [description, setDescription] = useState(recipe?.description ?? "");

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDescription(recipe.description);
    }
  }, [recipe]);

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("🔥 Chef! Missing Ingredients");
      return;
    }

    await onSubmit({ title, description });
    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg bg-black p-6 rounded-lg">
      <Input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 bg-black border border-purple-600 text-white"
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-4 bg-black border border-purple-600 text-white"
      />
      <Button type="submit" className="bg-purple-600 hover:bg-purple-800">
        {recipe ? "Update Recipe 📝" : "Cook Recipe 🔥"}
      </Button>
    </form>
  );
}
