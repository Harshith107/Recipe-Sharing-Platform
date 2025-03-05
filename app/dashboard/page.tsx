"use client";
import { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { useToast } from "@/components/ui/toasts";
import RecipeCard from '../../components/RecipeCard';
import EditRecipeModal from "@/components/EditRecipeModal";


type Recipe = {
  _id: string;
  title: string;
  description: string;
  image: string;
  chef: string;
};

export default function Dashboard() {
  const { user } = useUser();
  const { showToast } = useToast();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetchRecipes();
  }, [search]);

  const fetchRecipes = async () => {
    try {
      const url = search ? `/api/recipes?search=${search}` : "/api/recipes";
      const res = await fetch(url, { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setRecipes(data);
    } catch (error) {
      showToast("❌ Error Fetching Recipes");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!title || !description) {
      showToast("🔥 Missing Ingredients, Chef!");
      return;
    }

    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, image }),
      });

      if (res.ok) {
        showToast("🍲 Recipe Cooked!");
        setTitle("");
        setDescription("");
        setImage("");
        fetchRecipes();
      } else {
        showToast("💀 Failed to Upload");
      }
    } catch (error) {
      console.error("Internal Curse Error:", error);
      showToast("💀 Curse Technique: Internal Error");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("💀 Are you sure you want to delete this cursed recipe?");
    if (confirmed) {
      try {
        const res = await fetch(`/api/recipes/${id}`, { method: "DELETE" });
        if (res.ok) {
          showToast("🔥 Cursed Recipe Deleted");
          fetchRecipes();
        } else {
          showToast("💀 Failed to Delete");
        }
      } catch (error) {
        console.error("Internal Curse Error:", error);
        showToast("💀 Curse Technique: Internal Error");
      }
    }
  };

  const handleEdit = () => {
    showToast("Edit Feature Coming...");
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-6 p-10 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <a href="/dashboard/my-recipes" className="text-purple-500 hover:underline">
  View My Cursed Recipes 🔥🍜
</a>

      
      <div className="flex items-center justify-between w-full max-w-3xl">
        <h1 className="text-4xl font-bold">
          Welcome Chef {user?.username ?? "Anonymous Cursed Chef"} 🔥🍳
        </h1>
        <UserButton />
      </div>

      <a href="/dashboard/profile" className="text-purple-500 hover:underline">
        Go to Profile Page 🔥
      </a>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Recipes 🔍"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full max-w-lg bg-black text-white"
      />

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-black p-6 rounded-lg">
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-4 w-full bg-black text-white"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-4 w-full bg-black text-white"
        />
        <input
          type="text"
          placeholder="Image URL (Optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 mb-4 w-full bg-black text-white"
        />
        <button type="submit" className="bg-purple-600 hover:bg-purple-800 text-white px-4 py-2 rounded">
          Cook Recipe 🔥
        </button>
      </form>

      {/* Recipes List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            title={recipe.title}
            description={recipe.description}
            onDelete={() => handleDelete(recipe._id)}
            onEdit={handleEdit}
          />
        ))}
      </div>
      <EditRecipeModal />
    </div>
  );
}
