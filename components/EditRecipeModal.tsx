"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEditModal } from "@/lib/store";
import { useToast } from "@/components/ui/toasts";
import { useState } from "react";

export default function EditRecipeModal() {
  const { isOpen, selectedRecipe, closeModal } = useEditModal();
  const { showToast } = useToast();

  const [title, setTitle] = useState(selectedRecipe?.title || "");
  const [description, setDescription] = useState(selectedRecipe?.description || "");

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/recipes/${selectedRecipe._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        showToast("🍲 Recipe Enhanced!");
        closeModal();
      } else {
        showToast("💀 Failed to Upgrade Curse");
      }
    } catch (error) {
      showToast("💀 Internal Curse Technique Error");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Cursed Recipe 🔥</DialogTitle>
        </DialogHeader>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full bg-black text-white"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full bg-black text-white"
        />
        <button onClick={handleSave} className="bg-purple-600 hover:bg-purple-800 text-white p-2 rounded">
          Save Curse 🔥
        </button>
      </DialogContent>
    </Dialog>
  );
}
