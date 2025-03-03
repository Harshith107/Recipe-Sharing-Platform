"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Props {
  setRecipes: (recipes: any) => void;
}

export default function SearchBar({ setRecipes }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  async function handleSearch(e: any) {
    e.preventDefault();

    if (!search.trim()) {
      toast.error("🔥 Chef! Search can't be empty!");
      return;
    }

    try {
      router.push(`/dashboard?search=${search}`);

      const res = await fetch(`/api/recipes?search=${search}`);
      const data = await res.json();

      setRecipes(data);
      toast.success(`🔍 Found ${data.length} Cursed Recipes`);
    } catch (error) {
      toast.error("💀 Search Failed");
    }
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-lg mb-6">
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="🔍 Search Cursed Recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-black border border-purple-600 text-white"
        />
        <button
          type="submit"
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-800"
        >
          Search
        </button>
      </div>
    </form>
  );
}
