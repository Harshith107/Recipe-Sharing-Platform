"use server";
import { toast } from "sonner";

export async function deleteRecipe(id: string) {
  try {
    const res = await fetch(`/api/recipes/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("🍲 Recipe Exorcised Successfully!");
      return true;
    } else {
      toast.error("💀 Failed to Exorcise the Recipe!");
      return false;
    }
  } catch (error) {
    console.log("Curse Error:", error);
    toast.error("💀 Internal Curse Technique Failed");
    return false;
  }
}
